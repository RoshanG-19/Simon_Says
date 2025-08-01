let gameSeq = [];
let userSeq = [];
const btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

let body = document.querySelector("body");
const h2 = document.querySelector("#game-screen h2");
const highScoreDisplay = document.getElementById("high-score");

let highestScore = parseInt(localStorage.getItem("highestScore")) || 0;
highScoreDisplay.innerText = `Highest Score: ${highestScore}`;

  document.getElementById("start-btn").addEventListener("click", () => {
  document.getElementById("welcome-screen").classList.add("hidden");
  document.getElementById("game-screen").classList.remove("hidden");
});

document.addEventListener("keydown", () => {
  if (!started) {
    started = true;
    levelUp();
  }
});

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  const randColor = btns[Math.floor(Math.random() * btns.length)];
  gameSeq.push(randColor);
  const btn = document.querySelector(`.${randColor}`);
  gameFlash(btn);
}

function gameFlash(btn) {
  btn.classList.add("gameflash");
  setTimeout(() => btn.classList.remove("gameflash"), 200);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => btn.classList.remove("userflash"), 100);
}

function checkAns(idx) {
  if (gameSeq[idx] === userSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
     body.style.backgroundColor="red";
    setTimeout(()=>{
    body.style.backgroundColor="initial"
    if (level > highestScore) {
      highestScore = level;
      localStorage.setItem("highestScore", highestScore);
      highScoreDisplay.innerText = `Highest Score: ${highestScore}`;
    }

    h2.innerHTML = `Game over — your score was <b>${level}</b><br>Press any key to start again!`;
    reset();

    },1000);


  
  }
}

function btnPress() {
  const btn = this;
  userFlash(btn);
  userSeq.push(btn.id);
  checkAns(userSeq.length - 1);
}

document.querySelectorAll(".btn").forEach(btn =>
  btn.addEventListener("click", btnPress)
);

function reset() {
  started = false;
  level = 0;
  userSeq = [];
  gameSeq = [];
}

