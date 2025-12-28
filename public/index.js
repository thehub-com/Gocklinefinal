function openTG(){
  window.open("https://t.me/gock_registration_bot","_blank");
}

function login(){
  const code = document.getElementById("code").value.trim();
  if(!code){
    alert("Введите код");
    return;
  }

  // ПОКА просто пускаем
  document.getElementById("login").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");

  console.log("Введён код:", code);
}
