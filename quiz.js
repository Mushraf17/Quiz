const questions = [
    {
    question: "Which is Dulquer Salman Best Movie of all time?",
    answers: [
      { text: "a) Sita Ramam", correct: true },
      { text: "b) Charlie", correct: false },
      { text: "c) Lucky Bhaskar", correct: false },
      { text: "d) Ok Kanmani", correct: false },
    ],
  },
  {
    question: "Who is the Iron Man of Marvel Universe?",
    answers: [
      { text: "a) Chris Hemsworth", correct: false },
      { text: "b) Robert Downey Jr", correct: true },
      { text: "c) Chris Evans", correct: false },
      { text: "d) Mark Ruffalo", correct: false },
    ],
  },
  {
    question: "Which state is known as the 'Fruit Bowl' of India?",
    answers: [
      { text: "a) Assam", correct: false },
      { text: "b) Kerala", correct: false },
      { text: "c) Himachal Pradesh", correct: true },
      { text: "d) Tamil Nadu", correct: false },
    ],
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: [
      { text: "a) Mars", correct: false },
      { text: "b) Jupiter", correct: true },
      { text: "c) Saturn", correct: false },
      { text: "d) Venus", correct: false },
    ],
  },

  
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = "true";
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerText = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
