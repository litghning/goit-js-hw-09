import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnRef = document.querySelector('[data-start]');
const inputRef = document.querySelector('#datetime-picker');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]   ');


btnRef.addEventListener('click', () => {
    timer.start();
});
btnRef.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      const startTime = Date.now();
      const menologyTime = new Date(selectedDates[0]);
      if (menologyTime < startTime) {
          Notiflix.Notify.failure('"Please choose a date in the future".',
              {
                  clickToClose: true,
                  position: 'center',
                  backOverlay: true,
              }
              
          )
          btnRef.disabled = true;
      } else {
          btnRef.removeAttribute('disabled');
    }
  },
};

flatpickr('#datetime-picker', options);

class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
  }

  start() {
    if (this.isActive) {
      return;
    }
    const selectedTime = new Date(inputRef.value).getTime();

    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedTime - currentTime;

      if (deltaTime < 0) {  
        clearInterval(this.intervalId);
        this.isActive = false;
      } else {
        const time = this.convertMs(deltaTime);
        btnRef.disabled = true;
        this.onTick(time);
      }
    }, 1000);
  }

  convertMs(ms) {
   
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;


    const days = this.addLeadingZero(Math.floor(ms / day));

    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
   
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
  
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  } 

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new Timer({ onTick: changeValueTimer });

timer.start();

function changeValueTimer(obj) {
  daysRef.textContent = obj.days;
  hoursRef.textContent = obj.hours;
  minutesRef.textContent = obj.minutes;
  secondsRef.textContent = obj.seconds;
}