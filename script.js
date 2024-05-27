const questions = [
    {
        question: "Qual é a capital da Alemanha?",
        answers: [
            { text: "Paris", correct: false },
            { text: "Londres", correct: false },
            { text: "Berlim", correct: true },
            { text: "Madri", correct: false }
        ]
    },
    {
        question: "Quem escreveu 'Os Maias'?",
        answers: [
            { text: "Eça de Queirós", correct: true },
            { text: "William Shakespeare", correct: false },
            { text: "Dante Alighieri", correct: false },
            { text: "J.K. Rowling", correct: false }
        ]
    },
    {
        question: "Qual é o planeta que deixou de existir no planeta solar?",
        answers: [
            { text: "Plutão", correct: true },
            { text: "Saturno", correct: false },
            { text: "Terra", correct: false },
            { text: "Marte", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    questionContainer.classList.remove('hide');
    resultContainer.classList.add('hide');
    nextButton.classList.add('hide');
    showQuestion();
}

function showQuestion() {
    resetState();
    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(answer) {
    if (answer.correct) {
        score++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
    });
    nextButton.classList.remove('hide');
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    questionContainer.classList.add('hide');
    resultContainer.classList.remove('hide');
    scoreElement.textContent = `Você acertou ${score} de ${questions.length} perguntas.`;
}

function restartQuiz() {
    startQuiz();
}

startQuiz();
