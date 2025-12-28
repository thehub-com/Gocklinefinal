let currentChat = null;

/*
  streaks:
  {
    "nick": {
      count: number,
      lastDay: "YYYY-MM-DD"
    }
  }
*/
let streaks = JSON.parse(localStorage.getItem("streaks") || "{}");

/* ======================
   CHAT OPEN
====================== */
function openChat(nick) {
  currentChat = nick;
  document.getElementById("chatNick").innerText = nick;
  updateFireUI();
}

/* ======================
   MESSAGE SEND (имитация)
====================== */
function sendMessage() {
  if (!currentChat) return;

  updateStreak(currentChat);
  updateFireUI();

  // тут у тебя дальше обычная логика отправки сообщения
}

/* ======================
   STREAK LOGIC 🔥
====================== */
function updateStreak(nick) {
  const today = new Date().toISOString().slice(0, 10);

  if (!streaks[nick]) {
    streaks[nick] = { count: 1, lastDay: today };
  } else {
    const last = streaks[nick].lastDay;
    const diff =
      (new Date(today) - new Date(last)) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      streaks[nick].count += 1;
    } else if (diff > 1) {
      streaks[nick].count = 1;
    }

    streaks[nick].lastDay = today;
  }

  localStorage.setItem("streaks", JSON.stringify(streaks));
}

/* ======================
   FIRE UI
====================== */
function updateFireUI() {
  const fire = document.getElementById("fire");
  if (!currentChat || !streaks[currentChat]) {
    fire.classList.add("hidden");
    return;
  }

  const count = streaks[currentChat].count;

  if (count >= 2) {
    fire.innerText = `🔥 ${count}`;
    fire.classList.remove("hidden");
  } else {
    fire.classList.add("hidden");
  }
}
