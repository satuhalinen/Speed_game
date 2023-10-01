const startButton = document.querySelector("#startButton");
const endButton = document.querySelector("#endButton");
const circles = document.querySelectorAll(".circle");
const scoreDisplay = document.querySelector(".score");
const closeButton = document.querySelector(".close");
const overlay = document.querySelector(".overlay");
const startClass = document.querySelector(".startClass");
const endClass = document.querySelector(".endClass");

let score = 0;
let timer;
let pace = 1000;
let active = 0;
let rounds = 0;

function getRndInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const clickCircle = (i) => {
  if (i !== active) {
    return endGame();
  }
  rounds--;
  score += 10;
  gameVoice();
  scoreDisplay.textContent = score;
};

circles.forEach((circle, i) => {
  circle.addEventListener("click", () => clickCircle(i));
});

const enableEvents = () => {
  circles.forEach((circle) => {
    circle.style.pointerEvents = "auto";
  });
};

function beforeStart() {
  startAway();
  endAppear();
  startGame();
}
const startGame = () => {
  if (rounds >= 3) {
    return endGame();
  }

  enableEvents();

  const newActive = pickNew(active);

  circles[newActive].classList.toggle("active");
  circles[active].classList.remove("active");

  active = newActive;
  timer = setTimeout(startGame, pace);

  pace -= 10;
  rounds++;
  function pickNew(active) {
    const newActive = getRndInt(0, 4);
    if (newActive !== active) {
      return newActive;
    }
    return pickNew(active);
  }

  console.log(active);
};

const endGame = () => {
  console.log("game ended");
  clearTimeout(timer);
  modalShow();
};

const resetGame = () => {
  window.location.reload();
};

startButton.addEventListener("click", beforeStart);
endButton.addEventListener("click", endGame);

const modalShow = () => {
  modalVoice();
  let text;
  overlay.classList.toggle("visible");
  if (score < 20) {
    text = `You froze ${score} berries. The amount of berries you froze is not enough even for one winter month.`;
  } else if (score >= 20 && score < 70) {
    text = `You froze ${score} berries. The amount is enough for almost the whole winter.`;
  } else {
    text = `You froze ${score} berries. Great, you have enough berries for the whole winter.`;
  }
  advice.textContent = text;
};

closeButton.addEventListener("click", resetGame);

function startAway() {
  startClass.classList.toggle("invisible");
}

function endAppear() {
  endClass.classList.toggle("visible");
}

function gameVoice() {
  const iceSound = new Audio("ice-cube-falling-inside-a-cup-95179.mp3");
  iceSound.play();
}

function modalVoice() {
  const iceSoundEnd = new Audio("putting-ice-cubes-into-glasswav-80742.mp3");
  iceSoundEnd.play();
}
