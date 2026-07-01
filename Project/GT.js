// Quiz Data grouped by narrative timeline
const quizData = {
    start: {
        title: "Phase 1: The Start of the Journey",
        story: "You just bought Gran Turismo 3 on PS2. You enter Simulation Mode with only 18,000 credits.",
        question: "Which starter car do you buy to kickstart your racing career?",
        options: ["Chrysler PT Cruiser", "Toyota Trueno AE86", "Suzuki Alto Works"],
        correct: "Toyota Trueno AE86"
    },
    middle: {
        title: "Phase 2: The Mid-Game Grind",
        story: "You have won some races, but now you face the brutal Endurance races and need a Sunday Cup upgrade.",
        question: "Which special event or prize car is legendary for clearing mid-game content easily?",
        options: ["Suzuki Escudo Dirt Trial", "Mazda Demio", "Daihatsu Move"],
        correct: "Suzuki Escudo Dirt Trial"
    },
    end: {
        title: "Phase 3: The Ultimate Victory",
        story: "You have reached the final 100% completion tier of the game, standing before the final championship.",
        question: "What color is the highly coveted, hidden Formula One style prize car?",
        options: ["Solid Neon Green", "Polished Chrome", "Polyphony Black"],
        correct: "Polyphony Black"
    }
};

let currentPhase = "start"; 
let score = 0;

// DOM Elements
const phaseTitle = document.getElementById("phase-title");
const storyText = document.getElementById("story-text");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");

function loadQuiz() {
    optionsContainer.innerHTML = "";
    nextBtn.style.display = "none";

    // Conditional IF statements route the user to the correct narrative block
    if (currentPhase === "start") {
        displayPhase(quizData.start);
    } else if (currentPhase === "middle") {
        displayPhase(quizData.middle);
    } else if (currentPhase === "end") {
        displayPhase(quizData.end);
    } else if (currentPhase === "result") {
        displayResults();
    }
}

function displayPhase(phase) {
    phaseTitle.innerText = phase.title;
    storyText.innerText = phase.story;
    questionText.innerText = phase.question;

    phase.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.onclick = () => checkAnswer(option, phase.correct);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selected, correct) {
    // IF statement checks if the selected answer is correct
    if (selected === correct) {
        alert("Correct choice! Your garage expands.");
        score++;
    } else {
        alert(`Wrong choice! The correct answer was ${correct}.`);
    }

    // Disable choice buttons after selection
    const buttons = optionsContainer.querySelectorAll("button");
    buttons.forEach(btn => btn.disabled = true);

    nextBtn.style.display = "inline-block";
}

// Progressing the game states using conditional state changes
nextBtn.onclick = () => {
    if (currentPhase === "start") {
        currentPhase = "middle";
    } else if (currentPhase === "middle") {
        currentPhase = "end";
    } else if (currentPhase === "end") {
        currentPhase = "result";
    }
    loadQuiz();
};

function displayResults() {
    phaseTitle.innerText = "Quiz Completed!";
    storyText.innerText = `You finished your Gran Turismo PS2 campaign.`;
    questionText.innerText = `Final Score: ${score} / 3`;
    optionsContainer.innerHTML = "";
    nextBtn.style.display = "none";
}

// Initialize quiz execution
loadQuiz();
