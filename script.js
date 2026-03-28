function checkAnswer() {
    const user = document.getElementById("try1").value;
    const correct = 12;
    const result = document.getElementById("result1");

    if (parseInt(user) === correct) {
        result.textContent = "🎉 Correct! You're getting the hang of this.";
        result.style.color = "green";
    } else {
        result.textContent = "❌ Not quite. Try again!";
        result.style.color = "red";
    }
}
