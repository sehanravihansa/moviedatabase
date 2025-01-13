const triviaContainer = document.getElementById('trivia-container');
const questionElem = document.getElementById('question');
const answersElem = document.getElementById('answers');
const scoreElem = document.getElementById('score');
const nextButton = document.getElementById('next-button');

// Initialize score and current question index
let currentQuestionIndex = 0;
let score = 0;

// Sample trivia questions
const questions = [
    {
        question: "Which movie features a character named 'Forrest Gump'?",
        answers: ["Forrest Gump", "The Shawshank Redemption", "The Godfather", "Pulp Fiction"],
        correctAnswer: "Forrest Gump"
    },
    {
        question: "In which movie does 'Luke Skywalker' appear?",
        answers: ["Star Wars", "Avatar", "Jurassic Park", "Titanic"],
        correctAnswer: "Star Wars"
    },
    {
        question: "What is the name of the wizarding school in Harry Potter?",
        answers: ["Hogwarts", "Durmstrang", "Beauxbatons", "Ilvermorny"],
        correctAnswer: "Hogwarts"
    }
];

// Load the current question
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElem.textContent = currentQuestion.question;
    
    // Clear previous answers
    answersElem.innerHTML = '';

    // Display answer options
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.className = 'answer-button';
        
        // Add click event for each answer button
        button.addEventListener('click', () => checkAnswer(answer));
        
        answersElem.appendChild(button);
    });
}

// Check if the selected answer is correct
function checkAnswer(selectedAnswer) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    
    if (selectedAnswer === correctAnswer) {
        score++;
        scoreElem.textContent = score;
    }
    
    nextButton.style.display = 'block'; // Show next button after answering
}

// Load the next question
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        nextButton.style.display = 'none'; // Hide next button until answered
    } else {
        showFinalScore();
    }
});

// Show final score when all questions are answered
function showFinalScore() {
    triviaContainer.innerHTML = `<h2>Your final score is ${score} out of ${questions.length}</h2>`;
}

// Initialize the trivia game and theme on page load
function init() {
    loadQuestion();
    
    // Check for saved 'darkMode' in localStorage and apply it
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }
}

// Call init function on page load
init();
