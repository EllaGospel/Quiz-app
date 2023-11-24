

const questionsData =[
  {
      question: 'How many continents we have in the world?',
      options: ['9', '7', '6', '8'],
      answer:'7',
  },
  {
      question: 'One of the following is not an element?',
      options: ['Na', 'Calcium', 'Zinc', 'Coal'],
      answer:'Coal',
  },
  {
      question: 'The major source of energy to the earth is?',
      options: ['Electricity', 'Light', 'Sun', 'Fuel',],
      answer:'Sun',
  },
  {
    question: 'The longest river in the world is?',
    options: ['Nile River', 'red sea', 'River Niger', 'Mississippi River',],
    answer:'Nile River',
},
{
  question: 'All are mammals except?',
  options: ['Dolphins', 'Monkeys', 'bats', 'Fish',],
  answer:'Fish',
},{
  question: 'Who was the world’s first writer of the English Dictionary?',
  options: ['John Christopher Atkinson.', 'Samuel Johnson', 'Henry Spencer Ashbee.', 'Edward Arber.',],
  answer:'Samuel Johnson',
},
{
  question: 'What is a 50th anniversary called?',
  options: ['Electricity', 'Light', 'Sun', 'Fuel',],
  answer:'Sun',
},
{
  question: 'The major source of energy to the earth is?',
  options: ['Electrity', 'Liht', 'Sun', 'Fuel',],
  answer:'Sun',
},
{
  question: 'The major source of energy to the earth is?',
  options: ['Electricity', 'Light', 'Sun', 'Fuel',],
  answer:'Sun',
},
{
  question: 'The major source of energy to the earth is?',
  options: ['Electricity', 'Light', 'Sun', 'Fuel',],
  answer:'Sun',
},
]

const quizQuestion = document.getElementById('quiz-question');
const quizResult = document.getElementById('quiz-result');
const submitButton = document.getElementById('submit-btn');
const retryButton = document.getElementById('retry-btn');
const showAnswerButton = document.getElementById('show-answer');
const previousButton = document.getElementById('previous-btn');
const nextButton = document.getElementById('next-btn');
const timeCount = document.getElementById('timer')
const startQuiz = document.getElementById('start-quiz-btn')
let initialQuestion = 0;
let score = 0;
let wrongAnswer = [];
let time =questionsData.length * 15
let timerId;
// Hide quiz elements initially
quizQuestion.style.display = 'none';
submitButton.style.display = 'none';
retryButton.style.display = 'none';
showAnswerButton.style.display = 'none';

// Event listener for the "Start Quiz" button
startQuiz.addEventListener('click', quizStart);
function quizStart() {
  // Show quiz elements
  quizQuestion.style.display = 'block';
  submitButton.style.display = 'inline-block';
  previousButton.style.display = 'inline-block'
  
    // Start the timer
    timerId = setInterval(clockTick, 1000);
    // Set a timeout for 5 minutes (5 minutes * 60 seconds)
    setTimeout(() => {
      stopTimer();
      displayResult();
  }, 5 * 60 * 1000);

  // Hide start screen
  document.getElementById('start-screen').style.display = 'none';

  // Show the first question
  showQuestion();
}
function clockTick() {
  if (time > 0) {
      time--;
      timeCount.textContent = time;
  } else {
      clearInterval(timerId);
      displayResult();
  }
}
function stopTimer() {
  clearInterval(timerId);
}
// time will re-start again when retry button is clicked
function retryQuiz() {
  initialQuestion = 0;   //this initialQuestion can also be called current question
  score = 0;
  wrongAnswer = [];
  time = questionsData.length * 15; // Reset the timer to the initial value
  timeCount.textContent = time; // Update the timer display
  quizQuestion.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  quizResult.innerHTML = '';
  showQuestion();

  // Start the timer again
  timerId = setInterval(clockTick, 1000);
}

// setting previous and next button
function showPreviousQuestion() {
if (initialQuestion > 0) {
    initialQuestion--;
    showQuestion();
    updateButtonVisibility();
}
}
function showNextQuestion() {
if (initialQuestion < questionsData.length - 1) {
    initialQuestion++;
    showQuestion();
    updateButtonVisibility();
}
}
function updateButtonVisibility() {
previousButton.style.display = initialQuestion > 0 ? 'inline-block' : 'none';
nextButton.style.display = initialQuestion < questionsData.length - 1 ? 'inline-block' : 'none';
}
function rearrangeQuestion(questionArray) {
  for (let i = questionArray.length - 1; i > 0; i--) {
    const q = Math.floor(Math.random() * (i + 1));
    [questionArray[i], questionArray[q]] = [questionArray[q], questionArray[i]];
  }
}

function showQuestion() {
  const quizData = questionsData[initialQuestion];

const questionElement = document.createElement('div');
questionElement.className = 'question';
questionElement.innerHTML = quizData.question;

const optionsElement = document.createElement('div');
optionsElement.className = 'options';

const shuffledOptions = [...quizData.options];
rearrangeQuestion(shuffledOptions);

for (let i = 0; i < shuffledOptions.length; i++) {
  const option = document.createElement('label');
  option.className = 'option';

  const radio = document.createElement('input');
  radio.type = 'radio';
  radio.name = 'quiz-question';
  radio.value = shuffledOptions[i];
  const optionText = document.createTextNode(shuffledOptions[i]);

  option.appendChild(radio);
  option.appendChild(optionText);
  optionsElement.appendChild(option);

}

quizQuestion.innerHTML = '';
quizQuestion.appendChild(questionElement);
quizQuestion.appendChild(optionsElement);
  }

  function checkAnswer(){
      const selectedOption = document.querySelector('input[name="quiz-question"]:checked');
      if (selectedOption){
          const answer = selectedOption.value;
  if (answer === questionsData[initialQuestion].answer) {
    score++;
  }  else {
      wrongAnswer.push({
        question: questionsData[initialQuestion].question,
        wrongAnswer: answer,
        correctAnswer: questionsData[initialQuestion].answer,
      });
  }
  initialQuestion++;
  selectedOption.checked = false;
  if (initialQuestion < questionsData.length) {
      showQuestion();
  } else {
      displayResult();
  }
  
      }
  }
  function displayResult(){
quizQuestion.style.display = 'none';
submitButton.style.display = 'none';
// retryButton.style.display = 'inline-block';
showAnswerButton.style.display = 'inline-block';
quizResult.innerHTML = `<p style="color: red;">You scored ${score} out of ${questionsData.length}!</p>`;
}

  
      function showAnswer() {
      quizQuestion.style.display = 'none';
      submitButton.style.display = 'none';
      retryButton.style.display = 'inline-block';
      showAnswerButton.style.display = 'none';
    
      let wrongAnswerHtml = '';
      for (let i = 0; i < wrongAnswer.length; i++) {
          wrongAnswerHtml += `
          <p>
            <strong>Question:</strong> ${wrongAnswer[i].question}<br>
            <strong>Your Answer:</strong> ${wrongAnswer[i].wrongAnswer}<br>
            <strong>Correct Answer:</strong> ${wrongAnswer[i].correctAnswer}
          </p>
        `;
      }
    
      quizResult.innerHTML = `
        <p>You scored ${score} out of ${questionsData.length}!</p>
        <p>Incorrect Answers:</p>
        ${wrongAnswerHtml}
      `;
    }
  
    
    submitButton.addEventListener('click', checkAnswer);
     retryButton.addEventListener('click', retryQuiz);
    showAnswerButton.addEventListener('click', showAnswer);
    previousButton.addEventListener('click', showPreviousQuestion);
    nextButton.addEventListener('click', showNextQuestion);
    
    
    showQuestion();
    updateButtonVisibility();















// const questionsData =[
//     {
//         question: 'one of the following is not an element?',
//         options: ['Na', 'calcium', 'ca', 'zn<sup>2+</sup>'],
//         answer:'zn <sup>2+<sup/>',
//     },
//     {
//         question: 'one of the following is not an element?',
//         options: ['Na', 'calcium', 'ca', 'zn<sup>2+</sup>'],
//         answer:'ca',
//     },
//     {
//         question: 'what is symbol for mercury?',
//         options: ['Na', 'Hg', 'ca', 'zn','mg'],
//         answer:'Hg',
//     },
// ]

// const quizQuestion = document.getElementById('quiz-question');
// const quizResult = document.getElementById('quiz-result');
// const submitButton = document.getElementById('submit-btn');
// const retryButton = document.getElementById('retry-btn');
// const showAnswerButton = document.getElementById('show-answer');
// const previousButton = document.getElementById('previous-btn');
// const nextButton = document.getElementById('next-btn');

// let initialQuestion = 0;
// let score = 0;
// let wrongAnswer = [];

// // setting previous and next button
// function showPreviousQuestion() {
//   if (initialQuestion > 0) {
//       initialQuestion--;
//       showQuestion();
//       updateButtonVisibility();
//   }
// }
// function showNextQuestion() {
//   if (initialQuestion < questionsData.length - 1) {
//       initialQuestion++;
//       showQuestion();
//       updateButtonVisibility();
//   }
// }
// function updateButtonVisibility() {
//   previousButton.style.display = initialQuestion > 0 ? 'inline-block' : 'none';
//   nextButton.style.display = initialQuestion < questionsData.length - 1 ? 'inline-block' : 'none';
// }
// function rearrangeQuestion(questionArray) {
//     for (let i = questionArray.length - 1; i > 0; i--) {
//       const q = Math.floor(Math.random() * (i + 1));
//       [questionArray[i], questionArray[q]] = [questionArray[q], questionArray[i]];
//     }
//   }

//   function showQuestion() {
//     const quizData = questionsData[initialQuestion];
  
//   const questionElement = document.createElement('div');
//   questionElement.className = 'question';
//   questionElement.innerHTML = quizData.question;

//   const optionsElement = document.createElement('div');
//   optionsElement.className = 'options';

//   const shuffledOptions = [...quizData.options];
//   rearrangeQuestion(shuffledOptions);

//   for (let i = 0; i < shuffledOptions.length; i++) {
//     const option = document.createElement('label');
//     option.className = 'option';

//     const radio = document.createElement('input');
//     radio.type = 'radio';
//     radio.name = 'quiz-question';
//     radio.value = shuffledOptions[i];
//     const optionText = document.createTextNode(shuffledOptions[i]);

//     option.appendChild(radio);
//     option.appendChild(optionText);
//     optionsElement.appendChild(option);
  
//   }

//   quizQuestion.innerHTML = '';
//   quizQuestion.appendChild(questionElement);
//   quizQuestion.appendChild(optionsElement);
//     }

//     function checkAnswer(){
//         const selectedOption = document.querySelector('input[name="quiz-question"]:checked');
//         if (selectedOption){
//             const answer = selectedOption.value;
//     if (answer === questionsData[initialQuestion].answer) {
//       score++;
//     }  else {
//         wrongAnswer.push({
//           question: questionsData[initialQuestion].question,
//           wrongAnswer: answer,
//           correctAnswer: questionsData[initialQuestion].answer,
//         });
//     }
//     initialQuestion++;
//     selectedOption.checked = false;
//     if (initialQuestion < questionsData.length) {
//         showQuestion();
//     } else {
//         displayResult();
//     }
    
//         }
//     }
//     function displayResult(){
//   quizQuestion.style.display = 'none';
//   submitButton.style.display = 'none';
//   retryButton.style.display = 'inline-block';
//   showAnswerButton.style.display = 'inline-block';
//   quizResult.innerHTML = `You scored ${score} out of ${questionsData.length}!`;
//     }
//     function retryQuiz() {
//         initialQuestion = 0;
//         score = 0;
//         wrongAnswer = [];
//         quizQuestion.style.display = 'block';
//         submitButton.style.display = 'inline-block';
//         retryButton.style.display = 'none';
//         showAnswerButton.style.display = 'none';
//         quizResult.innerHTML = '';
//         showQuestion();
//       }
//       function showAnswer() {
//         quizQuestion.style.display = 'none';
//         submitButton.style.display = 'none';
//         retryButton.style.display = 'inline-block';
//         showAnswerButton.style.display = 'none';
      
//         let wrongAnswerHtml = '';
//         for (let i = 0; i < wrongAnswer.length; i++) {
//             wrongAnswerHtml += `
//             <p>
//               <strong>Question:</strong> ${wrongAnswer[i].question}<br>
//               <strong>Your Answer:</strong> ${wrongAnswer[i].wrongAnswer}<br>
//               <strong>Correct Answer:</strong> ${wrongAnswer[i].correctAnswer}
//             </p>
//           `;
//         }
      
//         quizResult.innerHTML = `
//           <p>You scored ${score} out of ${questionsData.length}!</p>
//           <p>Incorrect Answers:</p>
//           ${wrongAnswerHtml}
//         `;
//       }
    
      
//       submitButton.addEventListener('click', checkAnswer);
//       retryButton.addEventListener('click', retryQuiz);
//       showAnswerButton.addEventListener('click', showAnswer);
//       previousButton.addEventListener('click', showPreviousQuestion);
//       nextButton.addEventListener('click', showNextQuestion);
      
      
//       showQuestion();
//       updateButtonVisibility();
      

  