const quizData = [
    {
        question: "Where do Jak and Daxter start their journey in 'The Lost Frontier'?",
        options: ["The Brink (edge of the world)", "Sandover Village", "Haven City", "Spargus City"],
        answer: "The Brink (edge of the world)"
    },
    {
        question: "Why do Jak and Daxter set out on this journey?",
        options: ["To find Precursor Orbs", "To investigate a worldwide Eco shortage", "To defeat Gol and Maia", "To find the Dark Maker"],
        answer: "To investigate a worldwide Eco shortage"
    },
    {
        question: "Who captains the sky pirate ship that ambushes Jak at the beginning?",
        options: ["Baron Praxis", "Krew", "Captain Phoenix", "Errol"],
        answer: "Captain Phoenix"
    },
    {
        question: "What instrument is Jak given to find the 'Eco Core' to solve the energy crisis?",
        options: ["The Precursor Stone", "The Eco Seeker", "The Rift Rider", "The Map of Mar"],
        answer: "The Eco Seeker"
    },
    {
        question: "At the end of the story, what power does Keira channel to help save the world?",
        options: ["Light Eco", "Dark Eco", "Dark Daxter Transformation", "Eco Manipulation"],
        answer: "Eco Manipulation"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const progressText = document.getElementById("progress-text");
const quizBox = document.getElementById("question-box");
const scoreContainer = document.getElementById("score-container");
const finalScoreText = document.getElementById("final-score");
const restartBtn = document.getElementById("restart-btn");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.style.display = "none";
    quizBox.style.display = "block";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = quizData[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", selectAnswer);
        optionsContainer.appendChild(button);
    });

    progressText.innerText = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
}

function resetState() {
    nextBtn.style.display = "none";
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const correct = selectedBtn.innerText === quizData[currentQuestionIndex].answer;

    if (correct) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
        // Show the correct answer
        Array.from(optionsContainer.children).forEach(button => {
            if (button.innerText === quizData[currentQuestionIndex].answer) {
                button.classList.add("correct");
            }
        });
    }

    // Disable all buttons after selection
    Array.from(optionsContainer.children).forEach(button => {
        button.disabled = true;
    });

    if (currentQuestionIndex < quizData.length - 1) {
        nextBtn.style.display = "block";
    } else {
        nextBtn.style.display = "none";
        setTimeout(showScore, 1000); // Wait a second before showing score
    }
}

function showScore() {
    quizBox.style.display = "none";
    scoreContainer.style.display = "block";
    finalScoreText.innerText = `You scored ${score} out of ${quizData.length}!`;
}

nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    showQuestion();
});

restartBtn.addEventListener("click", startQuiz);

// Initialize the quiz
startQuiz();

function checkAnswers() {
    let score = 0;

    // Get the selected values from the radio buttons
    let answer1 = document.querySelector('input[name="q1"]:checked');
    let answer2 = document.querySelector('input[name="q2"]:checked');

    // Check Question 1 using an if statement
    if (answer1 && answer1.value === "B") {
        score++;
    }

    // Check Question 2 using an if statement
    if (answer2 && answer2.value === "B") {
        score++;
    }

    // Display the results dynamically on the page
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "You scored " + score + " out of 2!";
    
    // Optional: Add custom feedback based on the total score
    if (score === 2) {
        resultsDiv.style.color = "#4CAF50"; // Green for perfect score
        resultsDiv.innerHTML += "<br>Excellent! You know the tragic tale well.";
    } else {
        resultsDiv.style.color = "#f44336"; // Red for mistakes
        resultsDiv.innerHTML += "<br>Seek the guidance of Dormin and try again.";
    }
}
