import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");

const days = document.querySelector("[data-days]");
const hours = document.querySelector("[data-hours]");
const minutes = document.querySelector("[data-minutes]");
const seconds = document.querySelector("[data-seconds]");

let selectedDate = null;
let timerId = null;

startBtn.disabled = true;

flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(dates) {
    if (dates[0] <= new Date()) {
      alert("Оберіть дату в майбутньому");
      startBtn.disabled = true;
    } else {
      selectedDate = dates[0];
      startBtn.disabled = false;
    }
  },
});

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;

  timerId = setInterval(() => {
    const diff = selectedDate - new Date();

    if (diff <= 0) {
      clearInterval(timerId);
      return;
    }

    const { d, h, m, s } = convertMs(diff);

    days.textContent = addZero(d);
    hours.textContent = addZero(h);
    minutes.textContent = addZero(m);
    seconds.textContent = addZero(s);
  }, 1000);
});

function convertMs(ms) {
  const sec = 1000;
  const min = sec * 60;
  const hr = min * 60;
  const day = hr * 24;

  return {
    d: Math.floor(ms / day),
    h: Math.floor((ms % day) / hr),
    m: Math.floor((ms % hr) / min),
    s: Math.floor((ms % min) / sec),
  };
}

function addZero(value) {
  return String(value).padStart(2, "0");
}