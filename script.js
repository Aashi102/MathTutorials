/* =========================================================
   Algebra Mastery – Global Script
   - Manual theme toggle
   - Scroll reveal animations
   - Interactive example reveal
   - Modal system (for quizzes)
   - Utility helpers
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

// Toggle theme
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        body.classList.toggle("theme-light");

        // Save preference
        const isLight = body.classList.contains("theme-light");
        localStorage.setItem("theme", isLight ? "light" : "dark");
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
   Modal System (Quiz Engine Ready)
------------------------------ */
const modalBackdrop = qs(".modal-backdrop");
const modalCloseBtn = qs(".modal-close");

export function openModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.add("active");
}

export function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove("active");
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
   Quiz Engine Hook
------------------------------ */
window.quizEngine = {
    startQuiz(topic) {
        console.log("Quiz starting:", topic);
        openModal();
        // The full engine will plug in here
    },
};
