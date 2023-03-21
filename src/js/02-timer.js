import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dataPicker = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const counterDays = document.querySelector('[data-days]');
const counterHours = document.querySelector('[data-hours]');
const counterMinutes = document.querySelector('[data-minutes]');
const counterSeconds = document.querySelector('[data-seconds]');

dataPicker.style.fontSize = '24px';
btnStart.style.fontSize = '24px';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      btnStart.disabled = true;
      Notiflix.Report.failure('Please choose a date in the future');
    } else {
      btnStart.disabled = false;
    }
  },
};

flatpickr(dataPicker, options);

let intervalId;

btnStart.addEventListener('click', () => {
  const endDate = new Date(dataPicker.value);
  const now = options.defaultDate;

  const timeDifference = endDate - now;
  addLeadingZero(convertMs(timeDifference));

  intervalId = setInterval(() => {
    const timeDifference = endDate - new Date();
    addLeadingZero(convertMs(timeDifference));

    if (timeDifference <= 0) {
      clearInterval(intervalId);
    }
  }, 1000);
});

function addLeadingZero({ days, hours, minutes, seconds }) {
  counterDays.textContent = days.toString().padStart(2, '0');
  counterHours.textContent = hours.toString().padStart(2, '0');
  counterMinutes.textContent = minutes.toString().padStart(2, '0');
  counterSeconds.textContent = seconds.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
