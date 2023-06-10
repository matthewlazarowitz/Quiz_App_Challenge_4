var questionOutputEl = document.querySelector('#question-output');
var currentQuestionIndex = 0;
var choicesDiv = document.querySelector('.choices');

var questions = [
    {
        question: "What does HTML stand for?",
        choices: ["Hyper Text Markup Language", "Hypertext Transfer Protocol", "High Tech Machine Language", "Home Tool Maintenance Language"],
        answer: "Hyper Text Markup Language",
    },
    {
        question: "Which tag is used to define a paragraph in HTML?",
        choices: ["<p>", "<h1>", "<a>", "<img>"],
        answer: "<p>",
    },
    {
        question: "Which CSS property changes the text color?",
        choices: ["background-color", "font-style", "text-color", "color"],
        answer: "color",
    },
    {
        question: "Which JavaScript keyword is used to declare a variable?",
        choices: ["let", "variable", "var", "const"],
        answer: "var",
    },
    {
        question: "What is the purpose of the 'document.getElementById()' method?",
        choices: ["Access a specific HTML element", "Define a new HTML tag", "Create a CSS class", "Add an event listener"],
        answer: "Access a specific HTML element",
    },
]

var startButton = document.getElementById('start-button');
var startPage = document.getElementById('start-page');
var quizPage = document.getElementById('quiz-page');

var timerDisplay = document.getElementById('timer-display');
var timer;
var timeRemaining = 120;

startButton.addEventListener('click', startQuiz);

function startQuiz() {
    startPage.style.display = 'none';
    quizPage.style.display = 'block';
    showQuestion();
    startTimer();
}

function startTimer() {
    timerDisplay.innerText = timeRemaining;

    timer = setInterval(function () {
        timeRemaining--;

        if (timeRemaining >= 0) {
            timerDisplay.innerText = formatTime(timeRemaining);
        } else {
            clearInterval(timer);
            handleQuizEnd();
        }
    }, 1000);
}

function formatTime(seconds) {
    return seconds;
}

function handleChoiceClick(event) {
    var selectedChoice = event.target.innerText;
    var currentQuestion = questions[currentQuestionIndex];

    if (selectedChoice === currentQuestion.answer) {
        
        choicesDiv.innerHTML = '';

        
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            
            handleQuizEnd();
        }
    } else {
        
        timeRemaining -= 10; 

        if (timeRemaining < 0) {
            timeRemaining = 0; 
        }

        timerDisplay.innerText = formatTime(timeRemaining);
    }
}

function showQuestion() {
    var questionObj = questions[currentQuestionIndex];

    questionOutputEl.innerText = questionObj.question;

    choicesDiv.innerHTML = ''; 

    for (var i = 0; i < questionObj.choices.length; i++) {
        var choiceStr = questionObj.choices[i];
        var btn = document.createElement('button');
        btn.innerText = choiceStr;

    
        btn.addEventListener('click', handleChoiceClick);

        choicesDiv.append(btn);
    }
}

function handleQuizEnd() {
   
    questionOutputEl.innerText = 'Time is up!';
    choicesDiv.innerHTML = '';

    timerDisplay.parentElement.style.display = 'none';

    var nameInput = document.createElement('input');
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('placeholder', 'Enter your name');
  

  var submitButton = document.createElement('button');
  submitButton.innerText = 'Submit';
  

  submitButton.addEventListener('click', handleNameSubmit);


  choicesDiv.appendChild(nameInput);
  choicesDiv.appendChild(submitButton);
}