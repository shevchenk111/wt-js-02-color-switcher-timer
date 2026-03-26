const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let selectedDate = null;
let timerId = null;

startBtn.disabled = true;

flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const chosenDate = selectedDates[0];

    if (chosenDate <= new Date()) {
      alert('Будь ласка, оберіть дату у майбутньому.');
      startBtn.disabled = true;
      selectedDate = null;
      return;
    }

    selectedDate = chosenDate;
    startBtn.disabled = false;
  },
});

startBtn.addEventListener('click', () => {
  if (!selectedDate) {
    return;
  }

  startBtn.disabled = true;
  input.disabled = true;

  updateTimerValue(selectedDate - Date.now());

  timerId = setInterval(() => {
    const timeLeft = selectedDate - Date.now();

    if (timeLeft <= 0) {
      clearInterval(timerId);
      updateTimer(0, 0, 0, 0);
      return;
    }

    updateTimerValue(timeLeft);
  }, 1000);
});

function updateTimerValue(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  updateTimer(days, hours, minutes, seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  return {
    days: Math.floor(ms / day),
    hours: Math.floor((ms % day) / hour),
    minutes: Math.floor((ms % hour) / minute),
    seconds: Math.floor((ms % minute) / second),
  };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer(days, hours, minutes, seconds) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}