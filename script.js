/* =========================================================
   Algebra Mastery – Global Script
   - Manual theme toggle + animation
   - Scroll reveal animations
   - Interactive example reveal
   - Modal system
   - Full quiz engine (topics + final exam)
   ========================================================= */

/* ------------------------------
   Utility Helpers
------------------------------ */
const qs = (sel, parent = document) => parent.querySelector(sel);
const qsa = (sel, parent = document) => [...parent.querySelectorAll(sel)];

/* ------------------------------
   Theme Toggle (Manual Only)
------------------------------ */
const themeToggle = qs(".theme-toggle");
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
    body.classList.add("theme-light");
}

// Toggle theme with subtle animation
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        body.classList.add("theme-switching");
        body.classList.toggle("theme-light");

        const isLight = body.classList.contains("theme-light");
        localStorage.setItem("theme", isLight ? "light" : "dark");

        setTimeout(() => {
            body.classList.remove("theme-switching");
        }, 320);
    });
}

/* ------------------------------
   Scroll Reveal Animations
------------------------------ */
const revealElements = qsa(
    ".fade-in, .fade-in-up, .slide-in-right, .slide-up"
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

revealElements.forEach((el) => observer.observe(el));

/* ------------------------------
   Interactive Example Reveal
------------------------------ */
qsa("[data-reveal]").forEach((btn) => {
    btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-reveal");
        const answer = qs(`#${id}`);
        if (answer) {
            answer.classList.remove("hidden");
            answer.style.opacity = "0";
            answer.style.transform = "translateY(6px)";
            setTimeout(() => {
                answer.style.transition = "320ms ease-out";
                answer.style.opacity = "1";
                answer.style.transform = "translateY(0)";
            }, 10);
        }
    });
});

/* ------------------------------
   Modal System
------------------------------ */
const modalBackdrop = qs(".modal-backdrop");
const modalCloseBtn = qs(".modal-close");
const modalBody = qs(".modal-body");
const modalTitle = qs(".modal-title");

function openModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.add("active");
}

function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove("active");
    if (modalBody) modalBody.innerHTML = "";
}

// Close button
if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
}

// Click outside to close
if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (e) => {
        if (e.target === modalBackdrop) closeModal();
    });
}

// Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
});

/* ------------------------------
   Quiz Data
------------------------------ */
const quizBank = {
    foundations: [
        {
            question: "Which symbol is used for an unknown value?",
            choices: ["@", "x", "=", "5"],
            answer: 1,
        },
        {
            question: "What should you do first in 3 + 2 × 4?",
            choices: ["Add 3 + 2", "Multiply 2 × 4", "Subtract 4 − 2", "Divide 4 ÷ 2"],
            answer: 1,
        },
    ],
    expressions: [
        {
            question: "Which is a like term to 3x?",
            choices: ["3", "x²", "5x", "5"],
            answer: 2,
        },
        {
            question: "Simplify: 4x + 2x",
            choices: ["6", "6x", "8x", "2x"],
            answer: 1,
        },
    ],
    equations: [
        {
            question: "Solve: x + 5 = 9",
            choices: ["x = 4", "x = 14", "x = −4", "x = 5"],
            answer: 0,
        },
        {
            question: "Solve: 2x = 10",
            choices: ["x = 5", "x = 12", "x = 8", "x = 20"],
            answer: 0,
        },
    ],
    inequalities: [
        {
            question: "Solve: x + 3 > 7",
            choices: ["x > 4", "x < 4", "x ≥ 4", "x ≤ 4"],
            answer: 0,
        },
        {
            question: "Solve: −2x ≤ 10",
            choices: ["x ≥ −5", "x ≤ −5", "x ≥ 5", "x ≤ 5"],
            answer: 0,
        },
    ],
    graphing: [
        {
            question: "What is the slope in y = 2x + 3?",
            choices: ["2", "3", "5", "−2"],
            answer: 0,
        },
        {
            question: "Which point is on the y‑axis?",
            choices: ["(0, 4)", "(3, 0)", "(2, 2)", "(−1, 1)"],
            answer: 0,
        },
    ],
    polynomials: [
        {
            question: "How many terms are in 3x² − 5x + 2?",
            choices: ["1", "2", "3", "4"],
            answer: 2,
        },
        {
            question: "Simplify: (x + 1) + (x + 2)",
            choices: ["2x + 3", "2x + 1", "x² + 3", "x² + 2x"],
            answer: 0,
        },
    ],
    factoring: [
        {
            question: "Factor: 6x + 12",
            choices: ["6(x + 2)", "3(2x + 4)", "2(3x + 6)", "All of these"],
            answer: 3,
        },
        {
            question: "Factor: x² + 5x + 6",
            choices: ["(x + 1)(x + 6)", "(x + 2)(x + 3)", "(x − 2)(x − 3)", "(x + 3)(x + 4)"],
            answer: 1,
        },
    ],
    quadratics: [
        {
            question: "What is the highest power in a quadratic?",
            choices: ["x", "x²", "x³", "x⁴"],
            answer: 1,
        },
        {
            question: "How many roots can a quadratic have (max)?",
            choices: ["1", "2", "3", "4"],
            answer: 1,
        },
    ],
    functions: [
        {
            question: "f(x) = 2x. What is f(4)?",
            choices: ["2", "4", "6", "8"],
            answer: 3,
        },
        {
            question: "The domain is:",
            choices: ["Outputs", "Inputs", "Both", "Neither"],
            answer: 1,
        },
    ],
    wordproblems: [
        {
            question: "If x is Tom’s apples and Sarah has x + 5, together they have:",
            choices: ["x + 5", "2x + 5", "x − 5", "5x"],
            answer: 1,
        },
        {
            question: "First step in a word problem:",
            choices: [
                "Guess the answer",
                "Identify the unknown",
                "Solve randomly",
                "Ignore the question",
            ],
            answer: 1,
        },
    ],
};

/* Build final exam as union of all questions */
const finalExamQuestions = Object.values(quizBank).flat();

/* ------------------------------
   Quiz Engine
------------------------------ */
function renderQuiz(questions, title = "Quiz", onComplete) {
    if (!modalBody) return;

    let current = 0;
    let score = 0;
    const total = questions.length;

    function renderQuestion() {
        const q = questions[current];

        modalBody.innerHTML = `
            <div class="quiz-question">
                <p class="text-soft">Question ${current + 1} of ${total}</p>
                <h3 style="margin-top: var(--space-xs);">${q.question}</h3>
                <div class="quiz-choices" style="margin-top: var(--space-md); display: grid; gap: var(--space-sm);">
                    ${q.choices
                        .map(
                            (choice, idx) => `
                        <button class="btn-outline" data-choice="${idx}">
                            ${choice}
                        </button>
                    `
                        )
                        .join("")}
                </div>
            </div>
        `;

        qsa("[data-choice]", modalBody).forEach((btn) => {
            btn.addEventListener("click", () => {
                const selected = Number(btn.getAttribute("data-choice"));
                if (selected === q.answer) score++;
                current++;
                if (current < total) {
                    renderQuestion();
                } else {
                    renderSummary();
                }
            });
        });
    }

    function renderSummary() {
        const percent = Math.round((score / total) * 100);

        modalBody.innerHTML = `
            <div class="quiz-summary center">
                <h3 class="neon">Quiz Complete</h3>
                <p class="mt-sm">You scored <strong>${score}</strong> out of <strong>${total}</strong>.</p>
                <p class="text-soft mt-sm">(${percent}%)</p>
                <div class="mt-md" style="display:flex; justify-content:center; gap: var(--space-sm); flex-wrap: wrap;">
                    <button class="btn-primary" id="quiz-restart">Retake Quiz</button>
                    <button class="btn-secondary" id="quiz-close">Close</button>
                </div>
            </div>
        `;

        const restartBtn = qs("#quiz-restart", modalBody);
        const closeBtn = qs("#quiz-close", modalBody);

        restartBtn.addEventListener("click", () => {
            current = 0;
            score = 0;
            renderQuestion();
        });

        closeBtn.addEventListener("click", () => {
            closeModal();
            if (onComplete) onComplete({ score, total, percent });
        });
    }

    if (modalTitle) modalTitle.textContent = title;
    openModal();
    renderQuestion();
}

/* ------------------------------
   Final Exam + Certificate
------------------------------ */
function renderFinalExamCertificate(result) {
    if (!modalBody) return;

    modalBody.innerHTML = `
        <div class="exam-header">
            <h3 class="neon">Final Exam Complete</h3>
            <p>You scored <strong>${result.score}</strong> out of <strong>${result.total}</strong> (${result.percent}%).</p>
        </div>

        <div class="certificate">
            <h2>Certificate of Completion</h2>
            <p>This certifies that</p>
            <input type="text" id="cert-name" placeholder="Enter your name" />
            <p class="mt-sm">has successfully completed the Algebra Mastery Final Exam.</p>
            <p class="text-soft mt-sm">Score: ${result.percent}%</p>

            <div class="certificate-actions">
                <button class="btn-primary" id="cert-print">Print / Save</button>
                <button class="btn-secondary" id="cert-close">Close</button>
            </div>
        </div>
    `;

    const printBtn = qs("#cert-print", modalBody);
    const closeBtn = qs("#cert-close", modalBody);

    printBtn.addEventListener("click", () => {
        window.print();
    });

    closeBtn.addEventListener("click", () => {
        closeModal();
    });
}

/* ------------------------------
   Global Quiz Engine API
------------------------------ */
window.quizEngine = {
    startQuiz(topic) {
        const questions = quizBank[topic];
        if (!questions) {
            console.warn("No quiz found for topic:", topic);
            return;
        }
        renderQuiz(questions, `${topic[0].toUpperCase()}${topic.slice(1)} Quiz`);
    },

    startFinalExam() {
        renderQuiz(finalExamQuestions, "Final Exam", (result) => {
            renderFinalExamCertificate(result);
        });
    },
};
