/* ============================================================
   FUTURISTIC INTERACTION SYSTEM
   Global Script for Algebra Mastery Platform
   ============================================================ */

/* ------------------------------
   Scroll-triggered animations
------------------------------ */
const animatedElements = document.querySelectorAll(
    ".fade-in, .fade-in-up, .slide-up, .slide-in-right, .stagger > *"
);

function revealOnScroll() {
    const trigger = window.innerHeight * 0.88;

    animatedElements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < trigger) el.classList.add("visible");
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* ------------------------------
   Reveal Answer Buttons
------------------------------ */
document.querySelectorAll("[data-reveal]").forEach(btn => {
    btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-reveal");
        document.getElementById(id).classList.remove("hidden");
        btn.style.display = "none";
    });
});

/* ------------------------------
   Quiz Modal Engine
------------------------------ */
const quizOverlay = document.getElementById("quiz-overlay");
const closeQuiz = document.getElementById("close-quiz");
const quizButtons = document.querySelectorAll("[data-quiz]");

quizButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        quizOverlay.classList.remove("hidden");
        document.getElementById("quiz-title").textContent =
            btn.dataset.quiz.charAt(0).toUpperCase() +
            btn.dataset.quiz.slice(1) +
            " Quiz";
    });
});

closeQuiz.addEventListener("click", () => {
    quizOverlay.classList.add("hidden");
});

/* ------------------------------
   Theme Toggle
------------------------------ */
document.getElementById("toggle-theme")?.addEventListener("click", () => {
    document.body.classList.toggle("theme-light");
});

/* ------------------------------
   Sidebar Filters (Practice Page)
------------------------------ */
document.getElementById("reset-filters")?.addEventListener("click", () => {
    document.querySelectorAll(".sidebar input[type='checkbox']").forEach(cb => {
        cb.checked = true;
    });
});
