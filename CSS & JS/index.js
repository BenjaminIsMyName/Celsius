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
