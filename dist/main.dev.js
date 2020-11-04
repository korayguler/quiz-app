"use strict";

var questions = document.querySelector('#question');
var aText = document.querySelector('#a-text');
var bText = document.querySelector('#b-text');
var cText = document.querySelector('#c-text');
var dText = document.querySelector('#d-text');
var control = document.querySelector('#control');
var answers = document.getElementsByName('answers');
var questionsData = [];
var counter = 0;
var score = 0;
control.addEventListener('click', function (e) {
  if (counter < questionsData.length) {
    answers.forEach(function (e) {
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
}); //fetch All Questions

(fetchQuestions = function fetchQuestions() {
  var response, questions;
  return regeneratorRuntime.async(function fetchQuestions$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch('./questions.json'));

        case 2:
          response = _context.sent;
          questions = response.json();
          questions.then(function (data) {
            questionsData = data;
            UI();
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
})(); //ui

var UI = function UI() {
  var currentData = questionsData[counter];
  if (!currentData) return;
  questions.innerText = currentData.question;
  aText.innerText = currentData.answers[0];
  bText.innerText = currentData.answers[1];
  cText.innerText = currentData.answers[2];
  dText.innerText = currentData.answers[3];
  answers.forEach(function (e, i) {
    e.value = currentData.answers[i];
  });
};

var yourScore = function yourScore(all, score) {
  var template = "<h2 id=\"your-score\">Your Score : ".concat(all, " / ").concat(score, "</h2> ");
  document.querySelector('.title').innerHTML += template;
  counter = 0;
  score = 0;
  setTimeout(function () {
    document.querySelector('#your-score').remove();
    location.reload();
  }, 2000);
};

var calculate = function calculate(selected) {
  var currentData = questionsData[counter];
  if (!currentData) return;
  var answer = String(currentData.answer).toLowerCase();
  var select = String(selected).toLowerCase();
  console.log(answer, select);
  if (answer == select) score++;
};