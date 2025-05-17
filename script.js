const slotElements = [
  document.getElementById('slot0'),
  document.getElementById('slot1'),
  document.getElementById('slot2'),
  document.getElementById('slot3')
];

let intervals = [null, null, null, null];
let stopIndex = -1; // 아직 시작 안 했다는 의미
let finalNumbers = [];

function getRandomNumber() {
  return Math.floor(Math.random() * 25) + 1;
}

function startAllRoulette() {
  finalNumbers = [];
  for (let i = 0; i < 4; i++) {
    intervals[i] = setInterval(() => {
      const num = getRandomNumber();
      slotElements[i].textContent = `${num}번`;
    }, 50);
  }
}

function stopRoulette(index) {
  clearInterval(intervals[index]);
  const final = parseInt(slotElements[index].textContent);
  finalNumbers.push(final);
}

document.getElementById('drawButton').addEventListener('click', () => {
  const button = document.getElementById('drawButton');

  if (stopIndex === -1) {
    // 처음 클릭: 룰렛 시작
    startAllRoulette();
    stopIndex = 0;
    button.textContent = `멈추기 (1)`;
  } else if (stopIndex < 4) {
    stopRoulette(stopIndex);
    stopIndex++;
    if (stopIndex < 4) {
      button.textContent = `멈추기 (${stopIndex + 1})`;
    } else {
      button.textContent = '결과 확인 중...';
      setTimeout(() => {
        const modalBody = document.getElementById('resultContent');
        modalBody.textContent = finalNumbers.map(n => `${n}번`).join(', ');

        const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
        resultModal.show();

        stopIndex = -1;
        button.textContent = '다시 시작';
      }, 800);
    }
  }
});
