/* ================== STATE ================== */
let currentUser = null;

/* ================== LOGIN ================== */
async function login(){
  const code = document.getElementById("code").value.trim();
  if(!code){
    alert("Введите код");
    return;
  }

  try{
    const r = await fetch("/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({ code })
    });

    if(!r.ok){
      alert("Неверный код");
      return;
    }

    const data = await r.json();
    currentUser = data.user;

    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");

    document.getElementById("userName").innerText =
      currentUser.username || "User";

  }catch(e){
    alert("Ошибка сервера");
    console.error(e);
  }
}

/* ================== SEARCH ================== */
function searchChats(){
  const q = document.getElementById("search").value.toLowerCase();
  document.querySelectorAll(".chatItem").forEach(el=>{
    el.style.display = el.innerText.toLowerCase().includes(q)
      ? "flex"
      : "none";
  });
}

/* ================== PROFILE ================== */
function openProfile(){
  document.getElementById("profile").classList.remove("hidden");
  document.getElementById("profileName").innerText =
    currentUser?.username || "User";
}

function closeProfile(){
  document.getElementById("profile").classList.add("hidden");
}

/* ================== LOGOUT ================== */
function logout(){
  currentUser = null;
  document.getElementById("app").classList.add("hidden");
  document.getElementById("loginBox").classList.remove("hidden");
  document.getElementById("code").value = "";
}

/* ================== UI HELPERS ================== */
function $(id){
  return document.getElementById(id);
      }
