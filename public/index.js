function openTG(){
  window.open("https://t.me/gock_registration_bot","_blank");
}

function login(){
  const code=document.getElementById("code").value.trim();
  if(!code) return alert("Введите код");

  loginBox().style.display="none";
  app().classList.remove("hidden");
}

function openChat(nick){
  app().classList.add("hidden");
  chat().classList.remove("hidden");
  chatTitle.innerText=nick;
}

function backMain(){
  chat().classList.add("hidden");
  app().classList.remove("hidden");
}

function sendText(){
  if(!text.value) return;
  const m=document.createElement("div");
  m.className="msg me";
  m.innerText=text.value;
  messages.appendChild(m);
  text.value="";
}

function openProfile(){
  profile().classList.remove("hidden");
}

function closeProfile(){
  profile().classList.add("hidden");
}

/* shortcuts */
const loginBox=()=>document.getElementById("login");
const app=()=>document.getElementById("app");
const chat=()=>document.getElementById("chat");
const profile=()=>document.getElementById("profile");
