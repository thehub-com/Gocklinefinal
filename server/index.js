import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* ===== LOAD USERS ===== */
const USERS_FILE = "./server/users.json";

function loadUsers(){
  return JSON.parse(fs.readFileSync(USERS_FILE,"utf8"));
}

/* ===== LOGIN ===== */
app.post("/login",(req,res)=>{
  const { code } = req.body;
  if(!code) return res.status(400).json({error:"NO_CODE"});

  const users = loadUsers();
  const user = users[code];

  if(!user){
    return res.status(401).json({error:"INVALID_CODE"});
  }

  res.json({
    ok:true,
    user
  });
});

/* ===== HEALTH ===== */
app.get("/health",(req,res)=>{
  res.send("GockLine server OK");
});

app.listen(PORT,()=>{
  console.log("🚀 Server running on",PORT);
});
