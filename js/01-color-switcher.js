const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.body;

let timerId = null;

stopBtn.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  stopBtn.disabled = false;

  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
});