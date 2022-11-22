import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(evt) {
  evt.preventDefault();

  let delayValue = Number(evt.target.elements.delay.value);
  let stepValue = Number(evt.target.elements.step.value);
  let amountValue = Number(evt.target.elements.amount.value);

  if (delayValue < 1 || stepValue < 1 || amountValue < 1) {
    Notify.failure(`❌ All values must be more than zero!`, {
      position: 'right-top',
      fontSize: '20px',
      width: '350px',
    });
    return;
  }
  for (let i = 1; i <= amountValue; i += 1) {
    createPromise(i, delayValue).then(onSuccess).catch(onError);
    delayValue += stepValue;
  }
}

function onSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
    position: 'right-top',
    fontSize: '20px',
    width: '350px',
  });
}

function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
    position: 'right-top',
    fontSize: '20px',
    width: '350px',
  });
}
