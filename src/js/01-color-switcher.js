const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

let intervalId;

function changeBodyColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function startChangeColor() {
  if (!intervalId) {
    intervalId = setInterval(changeBodyColor, 1000);
    btnStart.disabled = true;
  }
}

function stopChangeColor() {
  clearInterval(intervalId);
  intervalId = null;
  btnStart.disabled = false;
}

btnStart.addEventListener('click', startChangeColor);
btnStop.addEventListener('click', stopChangeColor);
