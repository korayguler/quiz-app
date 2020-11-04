const questions = document.querySelector('#question');
const aText = document.querySelector('#a-text');
const bText = document.querySelector('#b-text');
const cText = document.querySelector('#c-text');
const dText = document.querySelector('#d-text');
const control = document.querySelector('#control');
const answers = document.getElementsByName('answers');

let questionsData = [];
let counter = 0;
let score = 0;

control.addEventListener('click', (e) => {
  if (counter < questionsData.length) {
    answers.forEach((e) => {
      if (e.checked) {
        console.log(e);
        calculate(e.value);
        counter++;

        UI();
      }
    });
  } else {
    console.log(questionsData.length, score);
    yourScore(questionsData.length, score);
  }
  if (counter === questionsData.length) {
    control.innerText = 'Finish';
    control.classList.add('last');
  }

  e.preventDefault();
});

//fetch All Questions
(fetchQuestions = async () => {
  const response = await fetch('./questions.json');
  const questions = response.json();
  questions.then((data) => {
    questionsData = data;
    UI();
  });
})();

//ui
const UI = () => {
  const currentData = questionsData[counter];
  if (!currentData) return;

  questions.innerText = currentData.question;
  aText.innerText = currentData.answers[0];
  bText.innerText = currentData.answers[1];
  cText.innerText = currentData.answers[2];
  dText.innerText = currentData.answers[3];

  answers.forEach((e, i) => {
    e.value = currentData.answers[i];
  });
};

const yourScore = (all, score) => {
  const template = `<h2 id="your-score">Your Score : ${all} / ${score}</h2> `;
  document.querySelector('.title').innerHTML += template;
  counter = 0;
  score = 0;
  setTimeout(() => {
    document.querySelector('#your-score').remove();
    location.reload();
  }, 2000);
};

const calculate = (selected) => {
  const currentData = questionsData[counter];
  if (!currentData) return;
  const answer = String(currentData.answer).toLowerCase();
  const select = String(selected).toLowerCase();
  console.log(answer, select);
  if (answer == select) score++;
};
