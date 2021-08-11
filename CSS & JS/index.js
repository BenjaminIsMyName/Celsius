function calc() {
  let cel = document.querySelectorAll("input")[0].value;
  let fahr = document.querySelectorAll("input")[1].value;
  if (cel && fahr) alert("Please reset first");
  else if (cel)
    document.querySelectorAll("input")[1].value = (cel * 9) / 5 + 32;
  else if (fahr)
    document.querySelectorAll("input")[0].value = ((fahr - 32) * 5) / 9;
}
function reset() {
  document.querySelectorAll("input")[0].value = "";
  document.querySelectorAll("input")[1].value = "";
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