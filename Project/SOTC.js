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
