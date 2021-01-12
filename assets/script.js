//Getting of the elements
const Texttotype = document.querySelectorAll(".texttotype");
const textarea = document.querySelector("#typing");
const Timervalue = document.querySelector("#timervalue");
const appointedtext = document.querySelector(".appointedtext");
const startgame = document.querySelector("#startgame");
const Wrapper = document.querySelector("#wrapper");
const nameInput = document.querySelector("#name-input");
//End of the getting dom elements

//Variables and arrays
let present = 3;
let delay = 4;
let timer = -5;
let typedValue = "";
let timeout;
let texts = [
  "Accoutrements",
  "Honorificabilitudinitatibus",
  "Grandiloquent",
  "Desideratum",
  "Equanimity",
  "Conviviality",
  "Parastratiosphecomyiastratiosphecomyiodes",
  "Penultimate",
  "Remunerative",
  "Excogitate",
  "Sesquipedalian",
  "Winebibber",
];
let PlayerName;
let marker = texts.length;
// end of the variables and arrays

//* *******************************
//*                               *
//*    START OF FUNCTIONS         *
//*                               *
//* *******************************

//function for displaying the texts in the dom
const DomDisplay = () => {
  // appointedtext.firstChild.classList.add("active");
  for (k in texts) {
    let paragh = document.createElement("p");
    paragh.innerHTML = texts[k];
    appointedtext.appendChild(paragh);
  }
};
DomDisplay();
const typingCheck = () => {
  const found = texts.findIndex((item) => item === typedValue);
  let filtered = texts.filter((item) => item !== typedValue);
  texts = filtered;
  if (found !== -1) {
    appointedtext.innerHTML = "";
    DomDisplay();
    textarea.value = "";
  }
};
//THIS FUNCTION CLEARS TIMEOUT
const clearTimer = () => {
  clearTimeout(timeout);
  startgame.disabled = false;
};
const nameCheck = () => {
  if (PlayerName === undefined || PlayerName === "" || PlayerName.length < 3) {
    startgame.disabled = true;
    textarea.disabled = true;
  } else {
    startgame.disabled = false;
    textarea.disabled = true;
  }
};
nameCheck();
const sayCongrats = () => {
  if (texts.length === 0) {
    let overallTime = marker / timer;
    let reducedTime = overallTime.toFixed(3);
    let congrats = document.createElement("p");
    let playAgain = document.createElement("button");
    congrats.innerHTML = `Congratulations ${PlayerName} you typed ${reducedTime}words per second`;
    playAgain.innerHTML = "<span>play again</span>";
    appointedtext.appendChild(congrats);
    appointedtext.appendChild(playAgain);
    playAgain.classList.add("btn-pa");
    playAgain.addEventListener("click", () => {
      location.reload();
    });
    textarea.disabled = true;
    clearTimer();
  }
};

//function to get value of the textarea and place it in the typedvalue variable
const getTyping = () => {
  typedValue = textarea.value;
};

const Ready = () => {
  Wrapper.classList.add("wrapper-ready");
};
//function to get the name value of the player
const getName = () => {
  PlayerName = nameInput.value;
};
// const alarmCountdown = () => {
//   delaytimer -= 1;
//   if (delaytimer < 1) {
//     clearTimeout(delaytimer);
//     alarm = true;
//   }
//   delaytimer = setTimeout(timerCounter, 1000);
// };
//function to iterate the timer
const timerCounter = () => {
  if (timer < -1) {
    Timervalue.innerHTML = "Get ready";
    Timervalue.style.color = "red";
  } else if (timer === -1) {
    Timervalue.innerHTML = "Time starts";
    Timervalue.style.color = "red";
  } else {
    Timervalue.innerHTML = timer + "s";
    textarea.disabled = false;
    Timervalue.style.color = "#000";
  }
  timer += 1;
  timeout = setTimeout(timerCounter, 1000);
  startgame.disabled = true;
};

//* *******************************
//*                               *
//*      END OF FUNCTIONS         *
//*                               *
//* *******************************

//adding an event listener to the dom elements
startgame.addEventListener("click", () => {
  timerCounter();
  Ready();
});
textarea.addEventListener("input", () => {
  getTyping();
  typingCheck();
  sayCongrats();
});
nameInput.addEventListener("input", () => {
  nameCheck();
  getName();
});
