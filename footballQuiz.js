const footballQuestions = [
  {
    question: "Which country has won the most FIFA World Cups?",
    answers: {
      a: "Brazil",
      b: "Germany",
      c: "Italy",
      d: "Argentina",
    },
    correctAnswer: "a",
  },
  {
    question: "Who is considered the 'King of Football'?",
    answers: {
      a: "Cristiano Ronaldo",
      b: "Pele",
      c: "Lionel Messi",
      d: "Diego Maradona",
    },
    correctAnswer: "b",
  },
  {
    question: "Which club has won the most UEFA Champions League titles?",
    answers: {
      a: "Barcelona",
      b: "Liverpool",
      c: "Real Madrid",
      d: "AC Milan",
    },
    correctAnswer: "c",
  },
  {
    question: "Which player holds the record for most goals scored in a calendar year?",
    answers: {
      a: "Cristiano Ronaldo",
      b: "Lionel Messi",
      c: "Robert Lewandowski",
      d: "Neymar",
    },
    correctAnswer: "b",
  },
];

// Variables
const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
let slides;
let currentSlide = 0;
let timer;
let timeLeft = 60;

// Build Quiz
function buildQuiz() {
  const output = [];
  footballQuestions.forEach((currentQuestion, questionNumber) => {
    const answers = [];
    for (const letter in currentQuestion.answers) {
      answers.push(
        `<label>
          <input type="radio" name="question${questionNumber}" value="${letter}">
          ${letter}: ${currentQuestion.answers[letter]}
        </label>`
      );
    }
    output.push(
      `<div class="slide">
        <div class="question">${currentQuestion.question}</div>
        <div class="answers">${answers.join("")}</div>
      </div>`
    );
  });
  quizContainer.innerHTML = output.join("");
  slides = document.querySelectorAll(".slide"); // Update slides after building
}

// Show Results
function showResults() {
  const answerContainers = quizContainer.querySelectorAll(".answers");
  let numCorrect = 0;

  footballQuestions.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if (userAnswer === currentQuestion.correctAnswer) {
      numCorrect++;
      answerContainer.style.color = "lightgreen";
    } else {
      answerContainer.style.color = "red";
    }
  });

  resultsContainer.innerHTML = `${numCorrect} out of ${footballQuestions.length}`;
  clearInterval(timer); // Stop the timer
}

// Show Slide
function showSlide(n) {
  slides[currentSlide].classList.remove("active-slide");
  slides[n].classList.add("active-slide");
  currentSlide = n;

  previousButton.style.display = currentSlide === 0 ? "none" : "inline-block";
  nextButton.style.display = currentSlide === slides.length - 1 ? "none" : "inline-block";
  submitButton.style.display = currentSlide === slides.length - 1 ? "inline-block" : "none";
}

// Next/Previous Slide
function showNextSlide() {
  showSlide(currentSlide + 1);
}
function showPreviousSlide() {
  showSlide(currentSlide - 1);
}

// Timer Functionality
function startTimer() {
  timer = setInterval(() => {
    document.getElementById("timer").textContent = timeLeft;
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timer);
      alert("Time is up!");
      showResults();
    }
  }, 1000);
}

// Initialization
buildQuiz();
showSlide(0);
startTimer();

// Event Listeners
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);
submitButton.addEventListener("click", showResults);