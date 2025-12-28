import TelegramBot from "node-telegram-bot-api";
import fs from "fs";

const TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

const CODES_FILE = "./codes.json";

function loadCodes(){
  if(!fs.existsSync(CODES_FILE)) return {};
  return JSON.parse(fs.readFileSync(CODES_FILE));
}
function saveCodes(data){
  fs.writeFileSync(CODES_FILE, JSON.stringify(data,null,2));
}
function genCode(){
  return Math.floor(100000 + Math.random()*900000).toString();
}

bot.onText(/\/start/, msg=>{
  const id = msg.from.id;
  const codes = loadCodes();

  const code = genCode();
  codes[code] = {
    tg_id: id,
    username: msg.from.username || null,
    time: Date.now()
  };

  saveCodes(codes);

  bot.sendMessage(
    id,
    `🔐 Ваш код для входа:\n\n*${code}*\n\nВернитесь на сайт и вставьте код.`,
    { parse_mode:"Markdown" }
  );
});
