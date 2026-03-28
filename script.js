// =========================
// QUIZ ENGINE + TIMER + EXAM + CERTIFICATE
// =========================
const quizEngine = (function () {
    let currentQuiz = null;
    let currentQuestions = [];
    let currentIndex = 0;
    let userAnswers = [];
    let timerId = null;
    let timeRemaining = 0;
    let isFinalExam = false;

    function startQuiz(topicKey) {
        const quiz = quizBank[topicKey];
        if (!quiz) return;

        isFinalExam = false;
        currentQuiz = quiz;
        currentQuestions = quiz.questions;
        currentIndex = 0;
        userAnswers = new Array(currentQuestions.length).fill(null);
        timeRemaining = quiz.timeLimitSeconds;
        AIEngine.reset();

        renderQuizModal();
        startTimer();
    }

    function startFinalExam() {
        isFinalExam = true;
        currentQuiz = {
            title: finalExamConfig.title,
            timeLimitSeconds: finalExamConfig.timeLimitSeconds
        };
        currentQuestions = buildFinalExamQuestions();
        currentIndex = 0;
        userAnswers = new Array(currentQuestions.length).fill(null);
        timeRemaining = finalExamConfig.timeLimitSeconds;
        AIEngine.reset();

        renderQuizModal();
        startTimer();
    }

    function startTimer() {
        const timerEl = modalBody.querySelector('.quiz-timer');
        updateTimerDisplay(timerEl);

        if (timerId) clearInterval(timerId);
        timerId = setInterval(() => {
            timeRemaining--;
            updateTimerDisplay(timerEl);
            if (timeRemaining <= 0) {
                clearInterval(timerId);
                autoSubmit();
            }
        }, 1000);
    }

    function updateTimerDisplay(el) {
        if (!el) return;
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        el.textContent = `Time: ${minutes}:${seconds.toString().padStart(2, '0')}`;
        if (timeRemaining <= 30) el.classList.add('timer-warning');
        else el.classList.remove('timer-warning');
    }

    function renderQuizModal() {
        const q = currentQuestions[currentIndex];
        const total = currentQuestions.length;

        const optionsHTML = q.options.map((opt, idx) => {
            const checked = userAnswers[currentIndex] === idx ? 'checked' : '';
            return `
                <label class="quiz-option">
                    <input type="radio" name="quiz-option" value="${idx}" ${checked} />
                    <span>${opt}</span>
                </label>
            `;
        }).join('');

        const content = `
            <div class="quiz-header-row">
                <div class="quiz-timer"></div>
                <div class="quiz-progress">Question ${currentIndex + 1} of ${total}</div>
            </div>
            <div class="quiz-question"><p>${q.question}</p></div>
            <div class="quiz-options">${optionsHTML}</div>
            <div class="quiz-controls">
                <button class="btn-secondary quiz-prev" ${currentIndex === 0 ? 'disabled' : ''}>Previous</button>
                <button class="btn-secondary quiz-next" ${currentIndex === total - 1 ? 'disabled' : ''}>Next</button>
                <button class="btn-primary quiz-submit">Submit</button>
            </div>
        `;

        openModal(currentQuiz.title, content);

        updateTimerDisplay(modalBody.querySelector('.quiz-timer'));

        modalBody.querySelector('.quiz-prev').addEventListener('click', () => {
            saveCurrentAnswer();
            if (currentIndex > 0) {
                currentIndex--;
                renderQuizModal();
            }
        });

        modalBody.querySelector('.quiz-next').addEventListener('click', () => {
            saveCurrentAnswer();
            if (currentIndex < currentQuestions.length - 1) {
                currentIndex++;
                renderQuizModal();
            }
        });

        modalBody.querySelector('.quiz-submit').addEventListener('click', () => {
            saveCurrentAnswer();
            manualSubmit();
        });
    }

    function saveCurrentAnswer() {
        const selected = modalBody.querySelector('input[name="quiz-option"]:checked');
        if (selected) userAnswers[currentIndex] = parseInt(selected.value, 10);
    }

    function manualSubmit() {
        if (!confirm('Are you sure you want to submit?')) return;
        finishQuiz(false);
    }

    function autoSubmit() {
        alert('Time is up! Your quiz will be submitted automatically.');
        finishQuiz(true);
    }

    function finishQuiz(autoSubmitted) {
        if (timerId) clearInterval(timerId);

        let correct = 0;
        currentQuestions.forEach((q, idx) => {
            const isCorrect = userAnswers[idx] === q.answer;
            if (isCorrect) correct++;
            AIEngine.record(isCorrect);
        });

        const total = currentQuestions.length;
        const percent = Math.round((correct / total) * 100);

        // =========================
        // CERTIFICATE TRIGGER
        // =========================
        if (isFinalExam && percent >= 90) {
            showCertificate(percent);
            return;
        }

        // Normal results screen
        const mastery = AIEngine.masteryLabel(percent);

        const content = `
            <div class="quiz-results">
                <h2>${currentQuiz.title} — Results</h2>
                <p><strong>Score:</strong> ${correct} / ${total} (${percent}%)</p>
                <p><strong>Mastery:</strong> ${mastery}</p>
                ${autoSubmitted ? '<p>(Auto-submitted due to time.)</p>' : ''}
                <div class="quiz-results-actions">
                    <button class="btn-secondary quiz-close">Close</button>
                    <button class="btn-primary quiz-retry">Retry</button>
                </div>
            </div>
        `;

        openModal("Results", content);

        modalBody.querySelector('.quiz-close').addEventListener('click', closeModal);

        modalBody.querySelector('.quiz-retry').addEventListener('click', () => {
            isFinalExam ? startFinalExam() : startQuiz(findTopicKeyForQuiz(currentQuiz));
        });
    }

    function findTopicKeyForQuiz(quizObj) {
        return Object.keys(quizBank).find(k => quizBank[k] === quizObj) || null;
    }

    return {
        startQuiz,
        startFinalExam
    };
})();
