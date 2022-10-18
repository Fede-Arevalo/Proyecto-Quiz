const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionDiv = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const scoreElement = document.querySelector(".score");

let currentQuestionIndex;
let score = 0;
let questions = [];

// Botón para comenzar el Quiz.
function startGame() {
  resetButton();
  scoreElement.innerHTML = `SCORE: <b>${(score = 0)}</b>`;
  startButton.classList.add("d-none");

  axios
    .get("https://opentdb.com/api.php?amount=10")
    .then((res) => {
      questions = res.data.results;
      currentQuestionIndex = 0;
      questionContainerElement.classList.remove("hide");
      setNextQuestion();
    })
    .catch((err) => console.error(err));
}

// Mostrar pregunta.
function showQuestion(questionObj) {
  const pregunta = questionObj.question;
  const preguntaObj = pregunta.replace(/&quot;/g, '"').replace(/&#039;/g, "'");

  questionDiv.innerText = preguntaObj;

  // Desestructuración del objeto para juntar las respuestas.
  const { correct_answer } = questionObj;
  const { incorrect_answers } = questionObj;
  const answers = [correct_answer, ...incorrect_answers];

  // Posicionar aleatoreamente de las respuestas.
  answers.sort(function (a, b) {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  });

  // Creación de botones con las respuestas.
  answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer;
    button.classList.add("btn");
    button.classList.add("btn-outline-primary");

    // Setear como respuesta correcta si en el objeto es "correct_answer:".
    if (answer == correct_answer) {
      button.dataset.correct = true;
    }

    // Al hacer click en una respuesta suma o resta puntuación.
    button.addEventListener("click", function () {
      if (button.dataset.correct == "true") {
        score++;
        scoreElement.innerHTML = `SCORE: <b>${score}</b>`;
      } else {
        if (score != 0) {
          score = score - 0.5;
          scoreElement.innerHTML = `SCORE: <b>${score}</b>`;
        } else {
          scoreElement.innerHTML = `SCORE: <b>${score}</b>`;
        }
      }
      selectAnswer();
    });
    answerButtonsElement.appendChild(button);
  });
}

// Mostrar pregunta siguiente.
function setNextQuestion() {
  resetState();
  showQuestion(questions[currentQuestionIndex]);
}

// Mostrar respuesta correcta en verde e icorrectas en rojo.
function setStatusClass(element, correct) {
  if (correct) {
    element.classList.remove("btn-outline-primary");
    element.classList.add("btn-success");
  } else {
    element.classList.remove("btn-outline-primary");
    element.classList.add("btn-danger");
  }
  element.disabled = true;
}

// Función para seleccionar respuesta.
function selectAnswer() {
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  increment();
  if (questions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("d-none");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("d-none");
    startButton.classList.replace("btn-primary", "btn-warning");

    nextButton.classList.add("d-none");
  }
}

// Botón para comenzar el Quiz.
startButton.addEventListener("click", startGame);

// Botón para siguiente pregunta.
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

// Esta función esconde el botón "Next" y quita las respuestas anteriores.
function resetState() {
  nextButton.classList.add("d-none");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

// Funciones para la "Barra de progreso".
function getProgress() {
  let d = document.getElementById("progressbar").getAttribute("aria-valuenow");
  return d;
}

function setProgress(value) {
  document.getElementById("progressbar").setAttribute("aria-valuenow", value);
  document
    .getElementById("progressbar")
    .setAttribute("style", "width: " + value + "%;");
}

function increment() {
  let i = getProgress();

  if (i < 100) {
    i++;
    setProgress((i += 9));
  }
}

function resetButton() {
  let r = getProgress();
  setProgress((r = 0));
}
