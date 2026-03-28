// ======================================================
// STATE STORE (Central Reactive State)
// ======================================================
class StateStore {
    constructor() {
        this.state = {
            currentQuiz: null,
            currentQuestions: [],
            currentIndex: 0,
            userAnswers: [],
            isFinalExam: false,
            timeRemaining: 0
        };
        this.listeners = [];
    }

    get(key) {
        return this.state[key];
    }

    set(key, value) {
        this.state[key] = value;
        this.notify();
    }

    update(updates) {
        Object.assign(this.state, updates);
        this.notify();
    }

    subscribe(fn) {
        this.listeners.push(fn);
    }

    notify() {
        this.listeners.forEach(fn => fn(this.state));
    }
}

// ======================================================
// THEME MANAGER
// ======================================================
class ThemeManager {
    constructor() {
        this.root = document.documentElement;
        this.toggleBtn = document.querySelector('.theme-toggle');
        this.init();
    }

    init() {
        const saved = localStorage.getItem('theme') || 'dark';
        this.setTheme(saved);

        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => {
                const current = this.root.classList.contains('theme-dark') ? 'dark' : 'light';
                this.setTheme(current === 'dark' ? 'light' : 'dark');
            });
        }
    }

    setTheme(mode) {
        if (mode === 'dark') {
            this.root.classList.add('theme-dark');
            this.root.classList.remove('theme-light');
        } else {
            this.root.classList.add('theme-light');
            this.root.classList.remove('theme-dark');
        }
        localStorage.setItem('theme', mode);
    }
}

// ======================================================
// MODAL
// ======================================================
class Modal {
    constructor() {
        this.backdrop = document.querySelector('.modal-backdrop');
        this.body = this.backdrop?.querySelector('.modal-body');
        this.title = this.backdrop?.querySelector('.modal-title');
        this.closeBtn = this.backdrop?.querySelector('.modal-close');

        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }

        if (this.backdrop) {
            this.backdrop.addEventListener('click', (e) => {
                if (e.target === this.backdrop) this.close();
            });
        }
    }

    open(title, html) {
        if (!this.backdrop || !this.body || !this.title) return;
        this.title.textContent = title;
        this.body.innerHTML = html;
        this.backdrop.classList.add('visible');
    }

    close() {
        if (!this.backdrop) return;
        this.backdrop.classList.remove('visible');
    }
}

// ======================================================
// TIMER
// ======================================================
class Timer {
    constructor(store) {
        this.store = store;
        this.timerId = null;
    }

    start() {
        if (this.timerId) clearInterval(this.timerId);

        this.timerId = setInterval(() => {
            let t = this.store.get('timeRemaining');
            t--;
            this.store.set('timeRemaining', t);

            if (t <= 0) {
                clearInterval(this.timerId);
                AppController.instance.quizEngine.autoSubmit();
            }
        }, 1000);
    }

    stop() {
        if (this.timerId) clearInterval(this.timerId);
    }
}

// ======================================================
// AI ENGINE
// ======================================================
class AIEngine {
    constructor() {
        this.reset();
    }

    reset() {
        this.model = {
            attempts: 0,
            correct: 0,
            accuracy: 1,
            history: []
        };
    }

    record(isCorrect) {
        const m = this.model;
        m.attempts++;
        if (isCorrect) m.correct++;
        m.history.push(isCorrect);
        m.accuracy = m.correct / m.attempts;
    }

    masteryLabel(percent) {
        if (percent >= 90) return 'Expert';
        if (percent >= 80) return 'Strong';
        if (percent >= 60) return 'Developing';
        return 'Needs Practice';
    }
}

// ======================================================
// QUESTION BANK
// (Your entire quizBank + final exam builder preserved)
// ======================================================
class QuestionBank {
    constructor() {
        this.quizBank = window.quizBank; // from your existing global
        this.finalExamConfig = window.finalExamConfig;
    }

    getQuiz(topicKey) {
        return this.quizBank[topicKey];
    }

    buildFinalExam() {
        const all = [];
        Object.keys(this.quizBank).forEach(key => {
            all.push(...this.quizBank[key].questions.map(q => ({ ...q, topic: key })));
        });

        for (let i = all.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [all[i], all[j]] = [all[j], all[i]];
        }

        return all.slice(0, this.finalExamConfig.questionCount);
    }
}

// ======================================================
// QUIZ ENGINE
// ======================================================
class QuizEngine {
    constructor(store, ai, timer, bank) {
        this.store = store;
        this.ai = ai;
        this.timer = timer;
        this.bank = bank;
    }

    startQuiz(topicKey) {
        const quiz = this.bank.getQuiz(topicKey);
        if (!quiz) return;

        this.ai.reset();

        this.store.update({
            currentQuiz: quiz,
            currentQuestions: quiz.questions,
            currentIndex: 0,
            userAnswers: new Array(quiz.questions.length).fill(null),
            isFinalExam: false,
            timeRemaining: quiz.timeLimitSeconds
        });

        this.timer.start();
        AppController.instance.renderer.renderQuiz();
    }

    startFinalExam() {
        const questions = this.bank.buildFinalExam();
        const cfg = this.bank.finalExamConfig;

        this.ai.reset();

        this.store.update({
            currentQuiz: { title: cfg.title, timeLimitSeconds: cfg.timeLimitSeconds },
            currentQuestions: questions,
            currentIndex: 0,
            userAnswers: new Array(questions.length).fill(null),
            isFinalExam: true,
            timeRemaining: cfg.timeLimitSeconds
        });

        this.timer.start();
        AppController.instance.renderer.renderQuiz();
    }

    saveAnswer(index) {
        const answers = this.store.get('userAnswers');
        answers[this.store.get('currentIndex')] = index;
        this.store.set('userAnswers', answers);
    }

    next() {
        const idx = this.store.get('currentIndex');
        const total = this.store.get('currentQuestions').length;
        if (idx < total - 1) {
            this.store.set('currentIndex', idx + 1);
            AppController.instance.renderer.renderQuiz();
        }
    }

    prev() {
        const idx = this.store.get('currentIndex');
        if (idx > 0) {
            this.store.set('currentIndex', idx - 1);
            AppController.instance.renderer.renderQuiz();
        }
    }

    manualSubmit() {
        this.finish();
    }

    autoSubmit() {
        this.finish(true);
    }

    finish(auto = false) {
        this.timer.stop();

        const questions = this.store.get('currentQuestions');
        const answers = this.store.get('userAnswers');

        let correct = 0;
        questions.forEach((q, i) => {
            const isCorrect = answers[i] === q.answer;
            if (isCorrect) correct++;
            this.ai.record(isCorrect);
        });

        const percent = Math.round((correct / questions.length) * 100);
        const mastery = this.ai.masteryLabel(percent);

        AppController.instance.renderer.renderResults({
            correct,
            total: questions.length,
            percent,
            mastery,
            auto
        });
    }
}

// ======================================================
// RENDERER (Event Delegation)
// ======================================================
class Renderer {
    constructor(store, modal) {
        this.store = store;
        this.modal = modal;

        // Event delegation for all quiz interactions
        document.addEventListener('click', (e) => {
            const body = this.modal.body;
            if (!body || !body.contains(e.target)) return;

            if (e.target.matches('.quiz-next')) {
                AppController.instance.quizEngine.next();
            }

            if (e.target.matches('.quiz-prev')) {
                AppController.instance.quizEngine.prev();
            }

            if (e.target.matches('.quiz-submit')) {
                AppController.instance.quizEngine.manualSubmit();
            }

            if (e.target.matches('input[name="quiz-option"]')) {
                const index = parseInt(e.target.value);
                AppController.instance.quizEngine.saveAnswer(index);
            }
        });
    }

    renderQuiz() {
        const quiz = this.store.get('currentQuiz');
        const questions = this.store.get('currentQuestions');
        const idx = this.store.get('currentIndex');
        const answers = this.store.get('userAnswers');
        const q = questions[idx];

        const optionsHTML = q.options.map((opt, i) => {
            const checked = answers[idx] === i ? 'checked' : '';
            return `
                <label class="quiz-option">
                    <input type="radio" name="quiz-option" value="${i}" ${checked}>
                    <span>${opt}</span>
                </label>
            `;
        }).join('');

        const html = `
            <div class="quiz-header-row">
                <div class="quiz-timer"></div>
                <div class="quiz-progress">Question ${idx + 1} of ${questions.length}</div>
            </div>

            <div class="quiz-question">
                <p>${q.question}</p>
            </div>

            <div class="quiz-options">
                ${optionsHTML}
            </div>

            <div class="quiz-controls">
                <button class="btn-secondary quiz-prev" ${idx === 0 ? 'disabled' : ''}>Previous</button>
                <button class="btn-secondary quiz-next" ${idx === questions.length - 1 ? 'disabled' : ''}>Next</button>
                <button class="btn-primary quiz-submit">Submit</button>
            </div>
        `;

        this.modal.open(quiz.title, html);
        this.updateTimerDisplay();
    }

    updateTimerDisplay() {
        const el = this.modal.body.querySelector('.quiz-timer');
        if (!el) return;

        const t = this.store.get('timeRemaining');
        const m = Math.floor(t / 60);
        const s = t % 60;

        el.textContent = `Time: ${m}:${s.toString().padStart(2, '0')}`;

        if (t <= 30) el.classList.add('timer-warning');
        else el.classList.remove('timer-warning');
    }

    renderResults({ correct, total, percent, mastery, auto }) {
        const html = `
            <div class="results">
                <h2>${auto ? 'Time’s Up!' : 'Quiz Complete'}</h2>
                <p><strong>Score:</strong> ${correct} / ${total}</p>
                <p><strong>Percent:</strong> ${percent}%</p>
                <p><strong>Mastery:</strong> ${mastery}</p>
                <button class="btn-primary modal-close">Close</button>
            </div>
        `;

        this.modal.open('Results', html);
    }
}

// ======================================================
// APP CONTROLLER (Singleton)
// ======================================================
class AppController {
    constructor() {
        AppController.instance = this;

        this.store = new StateStore();
        this.theme = new ThemeManager();
        this.modal = new Modal();
        this.ai = new AIEngine();
        this.timer = new Timer(this.store);
        this.bank = new QuestionBank();
        this.quizEngine = new QuizEngine(this.store, this.ai, this.timer, this.bank);
        this.renderer = new Renderer(this.store, this.modal);

        // Hook up quiz buttons on the page
        document.querySelectorAll('[data-quiz]').forEach(btn => {
            btn.addEventListener('click', () => {
                const topic = btn.getAttribute('data-quiz');
                this.quizEngine.startQuiz(topic);
            });
        });

        const finalBtn = document.querySelector('[data-final-exam]');
        if (finalBtn) {
            finalBtn.addEventListener('click', () => {
                this.quizEngine.startFinalExam();
            });
        }
    }
}

// ======================================================
// INITIALIZE APP
// ======================================================
document.addEventListener('DOMContentLoaded', () => {
    new AppController();
});
