let userSequence = [];
let gameSequence = [];

let colors = ["orange", "pink", "yellow", "blue"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let h1 = document.querySelector("h1");

document.addEventListener("keypress", function () {
  rightSound();
  if (started == false) {
    console.log("game started");
    started = true;

    levelUp();
  }
});

function levelUp() {
  userSequence = [];
  level++;
  h1.innerText = "Welcome to the Simon Says Game";
  h2.innerText = `level ${level}`;
  let randomColorIdx = Math.floor(Math.random() * 4);
  let randomColor = colors[randomColorIdx];
  let randomBtn = document.querySelector(`.${randomColor}`);
  gameFlash(randomBtn);
  gameSequence.push(randomColor);
}

function gameFlash(randomBtn) {
  randomBtn.classList.add("flash");
  setTimeout(function () {
    randomBtn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 250);
}

let btns = document.querySelectorAll(".btn");

for (btn of btns) {
  btn.addEventListener("click", pressBtn);
}

function pressBtn(btn) {
  rightSound();
  let currBtn = this;
  userFlash(currBtn);
  currBtnColor = currBtn.getAttribute("id");
  userSequence.push(currBtnColor);

  checkIdx(userSequence.length - 1);
}

function checkIdx(index) {
  if (userSequence[index] === gameSequence[index]) {
    if (userSequence.length == gameSequence.length) {
      setTimeout(levelUp, 800);
    }
  } else {
    wrongSound();
    h2.innerText = `Game Over : Your highest level is ${level}`;
    h1.style.color = "black";
    h2.style.color = "black";
    let body = document.querySelector("body");
    body.classList.add("endGame");
    setTimeout(function () {
      body.style.backgroundColor = "white";
    }, 1000);
    resetGame();
  }
}

function rightSound() {
  let song = new Audio("./assets/duolingo.mp3");
  song.play();
}

function wrongSound() {
  let song = new Audio("./assets/buzzer-or-wrong.mp3");
  song.play();
}

function resetGame() {
  started = false;
  level = 0;
  userSequence = [];
  gameSequence = [];
}
