const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

let timeLeft = WORK_TIME;
let timer = null;
let mode = "work";

const wave1 = document.getElementById("wave1");
const wave2 = document.getElementById("wave2");
const timeEl = document.getElementById("time");
const btnIcon = document.getElementById("btnIcon");
const mainBtn = document.getElementById("mainBtn");

function formatTime(s) {
  return `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
}

function updateWater() {
  let percent = mode === "work" ? 1 - timeLeft / WORK_TIME : 1;
  let top = 100 - percent * 100;
  wave1.style.top = top + "%";
  wave2.style.top = (top + 5) + "%";
  timeEl.textContent = formatTime(timeLeft);
}

function start() {
  if (timer) return;
  btnIcon.textContent = "pause";
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateWater();
    } else {
      clearInterval(timer);
      timer = null;
      if (mode === "work") {
        mode = "break";
        timeLeft = BREAK_TIME;
        alert("Work done! Break time ☕");
      } else {
        mode = "work";
        timeLeft = WORK_TIME;
        alert("Break over! Focus again 💪");
      }
      btnIcon.textContent = "play_arrow";
      updateWater();
    }
  }, 1000);
}

function pause() {
  clearInterval(timer);
  timer = null;
  btnIcon.textContent = "play_arrow";
}

mainBtn.onclick = () => {
  timer ? pause() : start();
};

updateWater();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}







