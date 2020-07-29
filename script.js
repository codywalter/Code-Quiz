// VAR DECLARATIONS
var header = document.querySelector(".header");
var score = document.getElementById("score");
var submitButton = document.getElementById("submitButton");

var quizQuestionHeader = document.getElementById("quizQuestionHeader");
var choiceOne = document.getElementById("one");
var choiceTwo = document.getElementById("two");
var choiceThree = document.getElementById("three");
var choiceFour = document.getElementById("four");
var correct = document.getElementById("correct");
var answerResponse = document.getElementById("answerResponse");

var finalScoreIs = document.getElementById("finalScoreIs");
var quizQuestionsPage = document.getElementById("quizQuestionsPage");
var questionButton = document.querySelector(".questionButton");

var quizChallengePage = document.getElementById("quizChallengePage");
var finalScorePage = document.getElementById("finalScorePage");
var highScoreButtons = document.getElementById("highScoreButtons");

var initialButton = document.getElementById("initialButton");
var initials = document.getElementById("initials");
var initialInput = document.getElementById("initialInput");

var allDone = document.getElementById("allDone");
var allDoneButtons = document.getElementById("form-inline");

var timer = document.getElementById("timer");

// QUESTION ARRAY

var quizQuestions = [
  {
    quizQuestionHeader:
      "Which of the following type of variable is visible everywhere in your JavaScript code?",
    one: "A. Global Variable",
    two: "B. Local Variable",
    three: "C. Both of the above",
    four: "D. None of the above",
    correct: "A. Global Variable",
  },
  {
    quizQuestionHeader: "Inside which HTML element do we put the JavaScript?",
    one: "A. <script>",
    two: "B. <scripting>",
    three: "C. <js>",
    four: "D. <javascript>",
    correct: "A. <script>",
  },
  {
    quizQuestionHeader:
      "Which operator is used to assign a value to a variable?",
    one: "A. x",
    two: "B. *",
    three: "C. =",
    four: "D. -",
    correct: "C. =",
  },
  {
    quizQuestionHeader:
      "Which of the following is not a valid JavaScript variable name?",
    one: "A. _first_and_last_names",
    two: "B. 2Names",
    three: "C. firstAndLast",
    four: "D. None of the above",
    correct: "B. 2Names",
  },
  {
    quizQuestionHeader: "Which of the following is not a logical operator?",
    one: "A. !",
    two: "B. &&",
    three: "C. ||",
    four: "D. &",
    correct: "D. &",
  },
  {
    quizQuestionHeader:
      "String values must be enclosed within __________ when being assigned to variables",
    one: "A. commas",
    two: "B. curly brackets",
    three: "C. quotes",
    four: "D. parenthesis",
    correct: "C. quotes",
  },
];

var startScore = 0;
var questionIndex = 0;

// FIRST PAGE
function codeQuizChallenge() {
  quizChallengePage.style.display = "block";
  header.style.display = "block";
  quizQuestionsPage.style.display = "none";
  finalScorePage.style.display = "none";

  var startScore = 0;
  timer.textContent = "Time: " + startScore;
}

function resetVariables() {
  startScore = 0;
  questionIndex = 0;
}

function startQuiz() {
  quizChallengePage.style.display = "none";
  quizChallengePage.style.display = "block";

  secondsLeft = 80;

  var timeInterval = setInterval(function () {
    secondsLeft--;
    if (secondsLeft === 0 || quizQuestions.length === questionIndex) {
      clearInterval(timerInterval);
      showFinalScore();
    }
  }, 1000);
}

function showQuestions() {
  var q = quizQuestions[q.quizQuestionHeader];

  quizQuestionHeader.textContent = q.quizQuestionHeader;
  choiceOne.textContent = q.one;
  choiceOne.setAttribute("data-answer", q.one);
  choiceOne.textContent = q.two;
  choiceOne.setAttribute("data-answer", q.two);
  choiceOne.textContent = q.three;
  choiceOne.setAttribute("data-answer", q.three);
  choiceOne.textContent = q.four;
  choiceOne.setAttribute("data-answer", q.four);
}

showQuestions();
choiceOne.addEventListener("click", function (event) {
  checkAnswer(event);
});
choiceTwo.addEventListener("click", function (event) {
  checkAnswer(event);
});
choiceThree.addEventListener("click", function (event) {
  checkAnswer(event);
});
choiceFour.addEventListener("click", function (event) {
  checkAnswer(event);
});

function checkAnswer(event) {
  event.preventDefault();

  var answer = event.currentTarget.dataset.answer;
  var correctAnswer = null;

  if (quizQuestions[questionIndex].correct === answer) {
    correctAnswer = answer;
  }
  if (answer === correctAnswer) {
    answerResponse.textContent = "Correct!";
  } else {
    answerResponse.textContent = "Wrong!";
    secondsLeft -= 10;
    if (secondsLeft < 0) {
      secondsLeft = 0;
    }
  }
  if (quizQuestions.length === questionIndex + 1) {
    showFinalScore();
    return;
  }
  questionIndex++;
  showQuestions();
}

function showFinalScore() {
  quizQuestionsPage.style.display = "none";
  highScoreButtons.style.display = "none";
  finalScorePage.style.display = "block";
  finalScoreIs.style.display = "block";
  initials.style.display = "block";
  initialButton.style.display = "block";
  initialInput.style.display = "block";
}

var highScoreArray = [];

function showHighScores() {
  header.style.display = "none";
  allDone.style.display = "none";
  finalScoreIs.style.display = "none";
  initials.style.display = "none";
  initialButton.style.button = "none";
  initialInput.style.display = "none";
  highScoreButtons.style.display = "block";

  var getInitials = document.getElementById("initialInput").value;

  var highScoreArray = JSON.parse(localStorage.getItem("highScore")) || [];

  var localStoreageArray = { score: secondsLeft, initials: getInitials };
  highScoreArray.push(localStoreageArray);
  localStorage.setItem("highScores", JSON.stringify(highScoreArray));

  var highScore = getInitials + ": " + secondsLeft;

  $("#highScoreList").appendChild(highScores);
}

initialButton.addEventListener("click", function () {
  showHighScores();
});

goBack.addEventListener("click", function () {
  $("#highScoreList").empty();
  $("#initialInput").val("");
  resetVariables();
  codeQuizChallenge();
});

codeQuizChallenge();
