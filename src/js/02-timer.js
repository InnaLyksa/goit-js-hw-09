import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  daysTimer: document.querySelector('span[data-days]'),
  hoursTimer: document.querySelector('span[data-hours]'),
  minutesTimer: document.querySelector('span[data-minutes]'),
  secondsTimer: document.querySelector('span[data-seconds]'),
};

let inputDates = null;
const INTERVAL = 1000;
refs.startBtn.setAttribute('disabled', true);

refs.startBtn.addEventListener('click', onClickStartButton);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    inputDates = selectedDates[0];
    onInputData(inputDates);
  },
};

flatpickr('#datetime-picker', options);

function onInputData(data) {
  //   inputDates = selectedDates[0];
  if (data >= Date.now()) {
    refs.startBtn.removeAttribute('disabled');
    refs.startBtn.classList.add('js-btn-activ');
  } else {
    Notify.failure('Please choose a date in the future', {
      position: 'center-top',
      fontSize: '30px',
      width: '500px',
      cssAnimationStyle: 'from-top',
    });
  }
}

function onClickStartButton() {
  refs.startBtn.setAttribute('disabled', true);
  refs.startBtn.classList.remove('js-btn-activ');

  const timerId = setInterval(() => {
    const timeDifference = inputDates - Date.now();
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    refs.daysTimer.textContent = days;
    refs.hoursTimer.textContent = hours;
    refs.minutesTimer.textContent = minutes;
    refs.secondsTimer.textContent = seconds;

    if (timeDifference < INTERVAL) {
      clearInterval(timerId);
      Notify.success(`${inputDates} is now`, {
        position: 'center-top',
        fontSize: '30px',
        width: '500px',
        cssAnimationStyle: 'from-top',
      });
    }
  }, INTERVAL);
  //   console.log(inputDates);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
