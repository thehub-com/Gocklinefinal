/* ================== STATE ================== */
let currentUser = null;
let currentChat = null;

/* ================== LOGIN ================== */
async function login(){
  const code = document.getElementById("code").value.trim();
  if(!code) return alert("Введите код");

  const r = await fetch("/login",{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({ code })
  });

  if(!r.ok) return alert("Неверный код");

  const data = await r.json();
  currentUser = data.user;

  loginBox.classList.add("hidden");
  app.classList.remove("hidden");

  renderUser();
}

/* ================== USER ================== */
function renderUser(){
  let badge = "";
  if(currentUser.role === "admin") badge = "🛡️";
  if(currentUser.verified) badge += " ✅";

  userName.innerHTML = currentUser.username + badge;
}

/* ================== CHAT OPEN ================== */
function openChat(nick){
  currentChat = nick;
  chatTitle.innerHTML = nick;
  messages.innerHTML = "";

  app.classList.add("hidden");
  chat.classList.remove("hidden");

  requestStreak();
}

/* ================== SEND ================== */
function sendText(){
  const t = text.value.trim();
  if(!t) return;

  renderMessage({
    text:t,
    me:true,
    time:Date.now()
  });

  fetch("/message",{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({
      to:currentChat,
      text:t
    })
  });

  text.value="";
}

/* ================== RENDER MESSAGE ================== */
function renderMessage(msg){
  const el = document.createElement("div");
  el.className = "msg " + (msg.me?"me":"");

  el.innerHTML = `
    <div class="body">${msg.text}</div>
    <div class="time">${new Date(msg.time).toLocaleTimeString()}</div>
  `;

  messages.appendChild(el);
  messages.scrollTop = messages.scrollHeight;
}

/* ================== 🔥 STREAK ================== */
async function requestStreak(){
  const r = await fetch("/streak?user="+currentChat);
  if(!r.ok) return;

  const d = await r.json();
  updateFire(d.days);
}

function updateFire(days){
  let fire = document.getElementById("fire");

  if(!fire){
    fire = document.createElement("span");
    fire.id="fire";
    fire.style.marginLeft="8px";
    chatTitle.appendChild(fire);
  }

  fire.innerText = days >= 2 ? `🔥 ${days}` : "";
}

/* ================== NAV ================== */
function backMain(){
  chat.classList.add("hidden");
  app.classList.remove("hidden");
}

/* ================== SEARCH ================== */
function searchChats(){
  const q = search.value.toLowerCase();
  document.querySelectorAll(".chatItem").forEach(c=>{
    c.style.display = c.innerText.toLowerCase().includes(q)
      ? "flex"
      : "none";
  });
    }
