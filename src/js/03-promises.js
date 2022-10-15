import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onStartClick);

function onStartClick(evt) {
  evt.preventDefault();
  const { delay, step, amount } = evt.currentTarget.elements;

  let delayStep = Number(delay.value);

  for (let i = 1; i <= amount.value; i += 1) {
    if (i === 1) {
      resultPromise(i, delayStep);
    } else {
      delayStep += Number(step.value);

      resultPromise(i, delayStep);
    }
  }
}
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function resultPromise(position, delay) {
  createPromise(position, delay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(
        `✅ Fulfilled promise ${position} in ${delay}ms`,
        {
          timeout: 5000,
          backOverlay: true,
        }
      );
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.success(`❌ Rejected promise ${position} in ${delay}ms`, {
        timeout: 5000,
        backOverlay: true,
      });
    });
}