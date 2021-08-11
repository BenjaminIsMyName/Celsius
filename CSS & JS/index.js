var cel = document.querySelectorAll("input")[0];
var fahr = document.querySelectorAll("input")[1];

function calc() {
  if (cel.value && fahr.value) alert("Please reset first (shortcut: R).\nTo switch to Auto Mode, press 'M' on your keyboard");
  else if (cel.value)
    fahr.value = (cel.value * 9) / 5 + 32;
  else if (fahr.value)
    cel.value = ((fahr.value - 32) * 5) / 9;
}
function reset() {
  cel.value = "";
  fahr.value = "";
}
// toggle dark and light theme 
function theme() {
  let ball = document.querySelector(".ball");
  // move the ball in the toggle etc
  ball.classList.toggle("night");
  // change the theme, add to body the "dark" class
  document.querySelector("body").classList.toggle("dark");
}
// used by onClick
function setLocalStorage() {
  theme();
  if (document.body.classList.contains("dark"))
  localStorage.setItem("darkMode", 1);
  else localStorage.setItem("darkMode", 0);
}
// get localStorage item for 'darkMode'
var darkMode = localStorage.getItem("darkMode");
// if localStorage was set to 1 (dark mode on), change to dark mode
if (darkMode == 1) theme();
// if no localStorage was set - check if the prefers-color-scheme is dark. if so, call the "theme" function to change the theme
else if (
  darkMode != 0 &&
  matchMedia &&
  matchMedia("(prefers-color-scheme: dark)").matches
)
  theme();

// event listener to update the prefers-color-scheme changes:
matchMedia("(prefers-color-scheme: dark)").addEventListener(
  "change",
  checkIfNeedsUpdate
);
// if event listener from ^^^ found a change to the prefers-color-scheme, check if the current mode is different
function checkIfNeedsUpdate(e) {
  // if the new prefers-color-scheme is dark and the website is also already dark, do nothing
  if (e.matches && document.querySelector("body").classList.contains("dark"))
    return;
  // if the new prefers-color-scheme is light and the website is also already light, do nothing
  if (!e.matches && !document.querySelector("body").classList.contains("dark"))
    return;

  // if you got here, go change the theme
  theme(); 
  // delete localStorage, we follow the system's theme now (until he clicks on the ball)
  localStorage.removeItem("darkMode");
}
document.addEventListener('keydown', keyFunc);

var auto = false;
function keyFunc(c) {
  if (c.key == 'm') {
    auto = !auto;
    if (auto) {
      alert("Auto Mode is on")
      cel.addEventListener("input", fromCel);
      fahr.addEventListener("input", FromFahr);
    }
    else {
      cel.removeEventListener("input", fromCel)
      fahr.removeEventListener("input", FromFahr)
      alert("Auto Mode is off")
    }
  }
  else if (c.key == "Enter" && !auto)
    calc();
  else if (c.key == "r")
    setTimeout(reset, 20);
}

function fromCel() {
    if (cel.value == "")
      fahr.value = "";
    else
  fahr.value = (cel.value * 9) / 5 + 32;
}

function FromFahr() {
  // console.log(e.target.value)
  if (fahr.value == "")
    cel.value = "";
  else
  cel.value = ((fahr.value - 32) * 5) / 9;
}
