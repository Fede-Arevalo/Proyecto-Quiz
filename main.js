const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionDiv = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const notaElement = document.querySelector(".nota");

let currentQuestionIndex;
let nota = 0;
const questions = [
  {
    category: "Entertainment: Television",
    type: "multiple",
    difficulty: "medium",
    question: "From what show is the character James Doakes? ",
    correct_answer: "Dexter",
    incorrect_answers: [
      "Marvels Daredevil",
      "Boardwalk Empire",
      "The Walking Dead",
    ],
  },
  {
    category: "Entertainment: Film",
    type: "multiple",
    difficulty: "easy",
    question: "Which of these movies did Jeff Bridges not star in?",
    correct_answer: "The Hateful Eight",
    incorrect_answers: ["Tron: Legacy", "The Giver", "True Grit"],
  },
  {
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "medium",
    question:
      "What is the full name of the protagonist from the SNES game Clock Tower?",
    correct_answer: "Jennifer Simpson",
    incorrect_answers: [
      "Jennifer Barrows",
      "Jennifer Cartwright",
      "Jennifer Maxwell",
    ],
  },
  {
    category: "Entertainment: Board Games",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which one of these is not a real game in the Dungeons Dragons series?",
    correct_answer: "Extreme Dungeons &amp; Dragons",
    incorrect_answers: [
      "Advanced Dungeons &amp; Dragons",
      "Dungeons &amp; Dragons 3.5th edition",
      "Advanced Dungeons &amp; Dragons 2nd edition",
    ],
  },
  {
    category: "Geography",
    type: "multiple",
    difficulty: "medium",
    question: "How tall is One World Trade Center in New York City?",
    correct_answer: "1,776 ft",
    incorrect_answers: ["1,888 ft", "1,225 ft", "1,960 ft"],
  },
  {
    category: "History",
    type: "multiple",
    difficulty: "hard",
    question:
      "What was the code name for the Allied invasion of Southern France on August 15th, 1944?",
    correct_answer: "Operation Dragoon",
    incorrect_answers: [
      "Operation Overlord",
      "Operation Market Garden",
      "Operation Torch",
    ],
  },
  {
    category: "Animals",
    type: "boolean",
    difficulty: "easy",
    question: "The Killer Whale is considered a type of dolphin.",
    correct_answer: "True",
    incorrect_answers: ["False"],
  },
  {
    category: "Entertainment: Japanese Anime & Manga",
    type: "boolean",
    difficulty: "easy",
    question:
      "In the To Love-Ru series, Golden Darkness is sent to kill Lala Deviluke.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Sports",
    type: "multiple",
    difficulty: "medium",
    question: "Which car manufacturer won the 2017 24 Hours of Le Mans?",
    correct_answer: "Porsche",
    incorrect_answers: ["Toyota", "Audi", "Chevrolet"],
  },
  {
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "hard",
    question:
      "Strangereal is a fictitious Earth-like world for which game series?",
    correct_answer: "Ace Combat",
    incorrect_answers: ["Jet Set Radio", "Deus Ex", "Crimson Skies"],
  },
];

// Ejemplo clase
// {
//   question: "What is 2 + 2?",
//   answers: [
//     { text: "4", correct: true },
//     { text: "22", correct: false },
//   ],
// },

function startGame() {
  startButton.classList.add("hide");
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function showQuestion(questionObj) {
  questionDiv.innerText = questionObj.question;
  //------------------------------------
  const { correct_answer } = questionObj;  
  const { incorrect_answers } = questionObj;  
  const answers = [correct_answer, ...incorrect_answers]
  //------------------------------------
  answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer;

    console.log(answer);

    if (answer == correct_answer) {
      button.dataset.correct = true;
    }

    // cuando clique una respuesta llama a la función

    button.addEventListener("click", function () {
      console.log(button.dataset.correct);
      if (button.dataset.correct == "true") {
        nota++;
        notaElement.innerHTML = "Tu puntuación: " + nota;
      } else {
        if (nota != 0) {
          nota = nota - 0.5;
          notaElement.innerHTML = "Tu puntuación: " + nota;
        } else {
          notaElement.innerHTML = "Tu puntuación: " + nota;
        }
      }

      selectAnswer();
    });

    answerButtonsElement.appendChild(button);
  });
}

function setNextQuestion() {
  resetState();
  showQuestion(questions[currentQuestionIndex]);
}

function setStatusClass(element, correct) {
  //pinta la respuesta corre e incorrecta
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function selectAnswer() {
  Array.from(answerButtonsElement.children).forEach((button) => {
    //llamamos a la función y le pasamos los botons y el botón correcto
    setStatusClass(button, button.dataset.correct);
  });
  if (questions.length > currentQuestionIndex + 1) {
    //si estamos en una pregunta que es menos que las preguuntas que quedan
    //es decir si son 10 preguntas y estamos en la 7
    //se muestra el boton siguiente porque aun quedan preguntas
    nextButton.classList.remove("hide");
  } else {
    //si no quedan preguntas porque hemos terminado (10/10)
    startButton.innerText = "Restart"; //cambiamos el texto del botón start por "restart"
    startButton.classList.remove("hide"); // volvemos a mostrar el botón start
  }
}

startButton.addEventListener("click", startGame);

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function resetState() {
  nextButton.classList.add("hide"); //escondemos el botón next
  while (answerButtonsElement.firstChild) {
    //bucle que se ejecuta si answerButtonsElemetnos
    //tiene un primer hijo
    //borramos el primer hijo de answerButtonsElements
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}
