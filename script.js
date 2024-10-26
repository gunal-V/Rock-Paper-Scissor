let score = JSON.parse(localStorage.getItem("score")) || {
  win: 0,
  lose: 0,
  tie: 0,
};

emoji = { Rock: "&#9994", Paper: "&#9995", Scissor: "&#9996" };

function pickComputeMove(){
  map = { 1: "Rock", 2: "Paper", 3: "Scissor" };
  let randomNumber = Math.ceil(Math.random() * 3);
  return map[randomNumber];
}

function startGame(userChoice) {
  document.querySelector(".js-moves-container").classList.remove("invisible");

  const computerChoice = pickComputeMove();
  let result = "Lost";
  score.lose += 1;
  if (userChoice === computerChoice) {
    result = "Tied";
    score.tie += 1;
    score.lose -= 1;
  }
  if (
    (userChoice == map[1] && computerChoice == map[3]) ||
    (userChoice == map[2] && computerChoice == map[1]) ||
    (userChoice == map[3] && computerChoice == map[2])
  ) {
    result = "Won";
    score.win += 1;
    score.lose -= 1;
  }

  document.querySelector(".myChoice").innerHTML = emoji[userChoice];
  document.querySelector(".computerChoice").innerHTML = emoji[computerChoice];
  document.querySelector(".result").innerHTML = result;

  displayResult();
}

function displayResult() {
  localStorage.setItem("score", JSON.stringify(score));
  document.querySelector(
    ".score"
  ).innerHTML = `win: ${score.win} lose: ${score.lose} tie: ${score.tie}`;
}

let isAutoPlaying = false;
let intervalId;
function autoPlay(){
  if(isAutoPlaying){
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.autoPlayButton').innerHTML = "Auto Play";
    return;
  }
  intervalId = setInterval( function(){
    const playerChoice = pickComputeMove();
    startGame(playerChoice);
  }, 1000);
  isAutoPlaying = true;
  document.querySelector('.autoPlayButton').innerHTML = "Stop Auto Play";
}