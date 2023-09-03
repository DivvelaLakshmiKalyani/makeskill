const quizData = [
  {
    question: 'What is Java?',
    options: [' A type of coffee',' A brand of computer hardware','A programming language','A platform-independent language known for its object-oriented features'],
    answer: 'A platform-independent language known for its object-oriented features',
  },
  {
    question: 'What is the purpose of the public static void main(String[] args) method in Java?',
    options: ['It serves as the entry point for a Java program.',' It is used to declare variables.', 'It is a method for printing output.','It defines a constructor for a class.'],
    answer: 'It serves as the entry point for a Java program.',
  },
  {
    question: 'How do you declare a variable in Java?',

    options:['Using the var keyword followed by the variable name.', 'By using the let keyword followed by the variable name.', 'By specifying the data type and variable name.', 'By only mentioning the variable name.'],
    answer: 'By specifying the data type and variable name.',
  },
  {
    question: 'Who invented Java Programming?',
    options: ['Guido van Rossum', 'James Gosling', 'Dennis Ritchie', 'Bjarne Stroustrup'],
    answer: 'James Gosling',
  },
  {
    question: 'Which component is used to compile, debug and execute the java programs?',
    options: ['JRE', 'JIT','JDK','JVM'],
    answer: 'JDK',
  },
  {
    question: 'Which of these cannot be used for a variable name in Java?',
    options: ['identifier & keyword','identifier','keyword','none of the mentioned'],
    answer: 'keyword',
  },
  {
    question: 'What is the extension of java code files??',
    options: ['.js','.txt','.class','.java',],
    answer: '.java',
  },
  {
    question: 'Which environment variable is used to set the java path?',
    options: ['MAVEN_Path','JavaPATH','JAVA','JAVA_HOME'],
    answer: 'JAVA_HOME',
  },
  {
    question: 'Which of the following is not an OOPS concept in Java?',
    options: ['Polymorphism',
'Inheritance',
'Compilation',
'Encapsulation',
      
    ],
    answer: 'Compilation',
  },
  {
    question: 'Which of the following is a type of polymorphism in Java Programming??',
    options: ['Multiple polymorphism',
'Compile time polymorphism',
'Multilevel polymorphism',
'Execution time polymorphism',],
    answer: 'Compile time polymorphism',
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