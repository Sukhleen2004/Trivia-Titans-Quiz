// --- Quiz Data ---
const questions = [
    // ---Questions ---
    {
        question: "What is the capital of Australia?",
        answers: [
            { text: "Sydney", correct: false },
            { text: "Melbourne", correct: false },
            { text: "Canberra", correct: true },
            { text: "Perth", correct: false }
        ]
    },
    {
        question: "What planet is known as the 'Red Planet'?",
        answers: [
            { text: "Jupiter", correct: false },
            { text: "Mars", correct: true },
            { text: "Venus", correct: false },
            { text: "Saturn", correct: false }
        ]
    },
    {
        question: "In which year did the first man land on the moon?",
        answers: [
            { text: "1965", correct: false },
            { text: "1969", correct: true },
            { text: "1972", correct: false },
            { text: "1980", correct: false }
        ]
    },
    {
        question: "What is H2O commonly known as?",
        answers: [
            { text: "Air", correct: false },
            { text: "Salt", correct: false },
            { text: "Sugar", correct: false },
            { text: "Water", correct: true }
        ]
    },
    {
        question: "Which of these is NOT a programming language?",
        answers: [
            { text: "Python", correct: false },
            { text: "HTML", correct: true },
            { text: "Java", correct: false },
            { text: "C++", correct: false }
        ]
    },
    
    {
        question: "What is the largest animal on Earth?",
        answers: [
            { text: "African Elephant", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Great White Shark", correct: false },
            { text: "Giraffe", correct: false }
        ]
    },
    {
        question: "Which iconic mountain peak is located in the Himalayas?",
        answers: [
            { text: "Mount Fuji", correct: false },
            { text: "Mount Kilimanjaro", correct: false },
            { text: "Mount Everest", correct: true },
            { text: "Mount McKinley", correct: false }
        ]
    },
    {
        question: "What geometric shape has four equal sides and four right angles?",
        answers: [
            { text: "Rectangle", correct: false },
            { text: "Rhombus", correct: false },
            { text: "Square", correct: true },
            { text: "Trapezoid", correct: false }
        ]
    },
    {
        question: "Which language is used for styling web pages?",
        answers: [
            { text: "JavaScript", correct: false },
            { text: "Python", correct: false },
            { text: "SQL", correct: false },
            { text: "CSS", correct: true }
        ]
    },
    {
        question: "In the Harry Potter series, what is the name of Ron Weasley's rat?",
        answers: [
            { text: "Scabbers", correct: true },
            { text: "Dobby", correct: false },
            { text: "Crookshanks", correct: false },
            { text: "Hedwig", correct: false }
        ]
    }
];

// --- DOM Elements & State (REST OF CODE REMAINS THE SAME) ---
const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const scoreScreen = document.getElementById('score-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const progressText = document.getElementById('progress-text');
const feedbackText = document.getElementById('feedback-text');
const finalScoreElement = document.getElementById('final-score');
const scoreMessageElement = document.getElementById('score-message');

let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false; // Flag to prevent multiple clicks

// --- Helper Functions ---
function resetState() {
    nextBtn.disabled = true;
    feedbackText.textContent = '';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function showScreen(screenToShow) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    screenToShow.classList.add('active');
}

// --- Main Quiz Logic ---
function showQuestion() {
    resetState();
    answerSelected = false;

    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    // UPDATED PROGRESS TEXT to show new total
    progressText.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`; 

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function selectAnswer(e) {
    if (answerSelected) return;

    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    answerSelected = true;

    if (isCorrect) {
        score++;
        selectedBtn.classList.add('correct');
        feedbackText.textContent = "🥳 Correct! You're a brainiac!";
    } else {
        selectedBtn.classList.add('incorrect');
        feedbackText.textContent = "❌ Oops! That's not right. Keep trying!";
    }

    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add('correct');
        }
    });

    nextBtn.disabled = false;
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    showScreen(scoreScreen);
    // UPDATED FINAL SCORE to show new total
    finalScoreElement.textContent = score; 

    const message = (score) => {
        if (score === questions.length) {
            return "🤯 PERFECT SCORE! You are a TRUE Trivia Titan!";
        } else if (score >= questions.length * 0.7) { // 70% or more
            return "🔥 Amazing score! You're clearly an expert!";
        } else if (score >= questions.length / 2) {
            return "👍 Good job! You crushed more than half the questions!";
        } else {
            return "🐢 Better luck next time! Time to hit the books!";
        }
    };
    scoreMessageElement.textContent = message(score);
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showScreen(quizScreen);
    showQuestion();
}

// --- Event Listeners ---
startBtn.addEventListener('click', startQuiz);

restartBtn.addEventListener('click', () => {
    showScreen(welcomeScreen); 
});

nextBtn.addEventListener('click', () => {
    if (answerSelected) {
        handleNextButton();
    }
});

