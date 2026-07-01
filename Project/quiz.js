

const questions = [
	{
		q: "Which team won the World Series in 2021?",
		choices: ["Los Angeles Dodgers", "Houston Astros", "Atlanta Braves", "Boston Red Sox"],
		answer: 2 // Atlanta Braves
	},
	{
		q: "Who holds the MLB single-season home run record (as of 2021)?",
		choices: ["Babe Ruth", "Barry Bonds", "Mark McGwire", "Sammy Sosa"],
		answer: 1 // Barry Bonds
	},
	{
		q: "What is the name of the New York MLB team that plays in Queens?",
		choices: ["Yankees", "Mets", "Marlins", "Brooklyn Dodgers"],
		answer: 1 // Mets
	}
];

let currentIndex = 0;
let score = 0;

const el = id => document.getElementById(id);

function renderQuestion() {
	const q = questions[currentIndex];
	if (!q) return renderResults();
	el('question') && (el('question').textContent = q.q);
	const choicesContainer = el('choices');
	if (!choicesContainer) return;
	choicesContainer.innerHTML = '';
	q.choices.forEach((c, i) => {
		const label = document.createElement('label');
		label.style.display = 'block';
		const input = document.createElement('input');
		input.type = 'radio';
		input.name = 'choice';
		input.value = i;
		label.appendChild(input);
		label.appendChild(document.createTextNode(' ' + c));
		choicesContainer.appendChild(label);
	});
	el('feedback') && (el('feedback').textContent = '');
}

function submitAnswer() {
	const selected = document.querySelector('input[name="choice"]:checked');
	if (!selected) {
		el('feedback') && (el('feedback').textContent = 'Please select an answer.');
		return;
	}
	const chosen = Number(selected.value);
	if (chosen === questions[currentIndex].answer) {
		score++;
		el('feedback') && (el('feedback').textContent = 'Correct!');
	} else {
		const correctText = questions[currentIndex].choices[questions[currentIndex].answer];
		el('feedback') && (el('feedback').textContent = 'Incorrect. Correct: ' + correctText);
	}
	currentIndex++;
	setTimeout(() => {
		if (currentIndex < questions.length) renderQuestion(); else renderResults();
	}, 800);
}

function renderResults() {
	el('question') && (el('question').textContent = 'Quiz complete');
	el('choices') && (el('choices').innerHTML = '');
	el('feedback') && (el('feedback').textContent = `Score: ${score} / ${questions.length}`);
	el('submit') && (el('submit').disabled = true);
}

function initQuiz() {
	if (!el('question')) return; // nothing to do if HTML not present
	currentIndex = 0;
	score = 0;
	if (el('submit')) el('submit').addEventListener('click', submitAnswer);
	renderQuestion();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initQuiz);
} else {
	initQuiz();
}
