const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionDiv = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const notaElement = document.querySelector(".nota");

let currentQuestionIndex;
let nota = 0;
let questions = [];

// Botón para comenzar el Quiz.
function startGame() {
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
  questionDiv.innerText = questionObj.question;

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
        nota++;
        notaElement.innerHTML = `SCORE: <b>${nota}</b>`;
      } else {
        if (nota != 0) {
          nota = nota - 0.5;
          notaElement.innerHTML = `SCORE: <b>${nota}</b>`;
        } else {
          notaElement.innerHTML = `SCORE: <b>${nota}</b>`;
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
  //pinta la respuesta corre e incorrecta
  console.log(element);
  if (correct) {
    // element.remove("btn")
    element.classList.remove("btn-outline-primary");
    element.classList.add("btn-success");
  } else {
    // element.remove("btn")
    element.classList.remove("btn-outline-primary");
    element.classList.add("btn-danger");
  }
  element.disabled = true;
}

// Función para seleccionar respuesta.
function selectAnswer() {
  Array.from(answerButtonsElement.children).forEach((button) => {
    //llamamos a la función y le pasamos los botons y el botón correcto
    setStatusClass(button, button.dataset.correct);
  });
  if (questions.length > currentQuestionIndex + 1) {
    //si estamos en una pregunta que es menos que las preguuntas que quedan
    //es decir si son 10 preguntas y estamos en la 7
    //se muestra el boton siguiente porque aun quedan preguntas
    nextButton.classList.remove("d-none");
  } else {
    //si no quedan preguntas porque hemos terminado (10/10)
    startButton.innerText = "Restart"; //cambiamos el texto del botón start por "restart"
    startButton.classList.remove("d-none");
    startButton.classList.replace("btn-primary", "btn-warning");

    // volvemos a mostrar el botón start
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
  nextButton.classList.add("d-none"); //escondemos el botón next
  while (answerButtonsElement.firstChild) {
    //bucle que se ejecuta si answerButtonsElemetnos
    //tiene un primer hijo
    //borramos el primer hijo de answerButtonsElements
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}
