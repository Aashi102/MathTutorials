// Basic input check for short answers
function check(inputId, correctAnswer, resultId) {
    const user = document.getElementById(inputId).value.trim();
    const result = document.getElementById(resultId);

    // Normalize answers
    const normalizedUser = user.replace(/\s+/g, '').toLowerCase();
    const normalizedCorrect = String(correctAnswer).replace(/\s+/g, '').toLowerCase();

    if (normalizedUser === normalizedCorrect) {
        result.textContent = "🎉 Correct!";
        result.style.color = "green";
    } else {
        result.textContent = "❌ Try again.";
        result.style.color = "red";
    }
}

// Quick practice on homepage
function quickCheck() {
    const user = document.getElementById("quickInput").value;
    const result = document.getElementById("quickResult");

    if (parseInt(user) === 8) {
        result.textContent = "🎉 Correct!";
        result.style.color = "green";
    } else {
        result.textContent = "❌ Try again.";
        result.style.color = "red";
    }
}

// Quiz grading
function gradeQuiz() {
    const answers = {
        q1: "7",
        q2: "7x",
        q3: "(x+1)(x+2)"
    };

    let score = 0;
    let total = Object.keys(answers).length;

    for (let q in answers) {
        const selected = document.querySelector(`input[name="${q}"]:checked`);
        if (selected && selected.value.replace(/\s+/g, '') === answers[q].replace(/\s+/g, '')) {
            score++;
        }
    }

    const result = document.getElementById("quizResult");
    result.textContent = `You scored ${score} out of ${total}.`;
    result.style.color = score === total ? "green" : "blue";
}
