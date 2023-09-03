const quizData = [
  {
    question: 'What is python?',
    options: [' A type of coffee',' A brand of computer hardware','A programming language',' object-oriented, high-level programming language with dynamic semantics. '],
    answer: 'object-oriented, high-level programming language with dynamic semantics.',
  },
  {
    question: 'Who developed python programming language?',
    options: ['Wick van Rossum','Rasmus Lerdorf','Guido van Rossum','Niene Stom'],
    answer: 'Guido van Rossum',
  },
  {
    question: ' Is Python code compiled or interpreted?',
    options:['Python code is both compiled and interpreted',' Python code is neither compiled nor interpreted','Python code is only compiled','Python code is only interpreted'],
    answer: 'Python code is both compiled and interpreted',
  },
  {
    question:'All keywords in Python are in ____?',
    options: ['Capitalized','lower case','UPPER CASE','None of the mentioned'],
    answer: 'None of the mentioned',
  },
  {
    question: ' What will be the value of the following Python expression 4 + 3 % 5'?
    options: ['7', '2','4','1'],
    answer: '7',
  },
  {
    question: ' Which of the following is used to define a block of code in Python language?',
    options: ['Indentation','Key','Brackets','none of the mentioned'],
    answer: 'Indentation',
  },
  {
    question: 'Which keyword is used for function in Python language?',
    options: ['Function',' def','Fun','Define'],
    answer: 'def',
  },
  {
    question: ' Which of the following functions can help us to find the version of python that we are currently working on?',
    options: ['sys.version(1)','sys.version(0)','sys.version()','sys.version'],
    answer: 'sys.version',
  },
  {
    question: ' Python supports the creation of anonymous functions at runtime, using a construct called ____?',
    options: ['pi','anonymous','lambda','none of the mentioned]',
    answer: 'lambda',
  },
  {
    question: 'What does pip stand for python?',
    options: ['Pip Installs Python',' Pip Installs Packages','Preferred Installer Program',' All of the mentioned'],
    answer: 'Preferred Installer Program',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();