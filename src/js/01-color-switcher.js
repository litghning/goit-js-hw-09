const refs = {
  startBtn: document.querySelector('[data-start'),
  stopBtn: document.querySelector('[data-stop'),
};
let intervalId = null;
refs.startBtn.addEventListener('click', () => {
  intervalId = setInterval(() => {
    addBgColorForBody();
  }, 800);
  startTime();
  addBgColorForBody();
})
refs.stopBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  stopTime();
})
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function startTime() {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
}
function stopTime() {
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
}

function addBgColorForBody() {
  document.body.style.backgroundColor = getRandomHexColor();
}
