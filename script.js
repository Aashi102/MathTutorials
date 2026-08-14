// =========================
// THEME TOGGLE
// =========================
const root = document.documentElement;
const themeToggleBtn = document.querySelector('.theme-toggle');

function setTheme(mode) {
    if (mode === 'dark') {
        root.classList.add('theme-dark');
        root.classList.remove('theme-light');
        localStorage.setItem('theme', 'dark');
    } else {
        root.classList.add('theme-light');
        root.classList.remove('theme-dark');
        localStorage.setItem('theme', 'light');
    }
}

(function initTheme() {
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);
})();

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const current = root.classList.contains('theme-dark') ? 'dark' : 'light';
        setTheme(current === 'dark' ? 'light' : 'dark');
    });
}

// =========================
// MODAL HANDLING
// =========================
const modalBackdrop = document.querySelector('.modal-backdrop');
const modalBody = modalBackdrop ? modalBackdrop.querySelector('.modal-body') : null;
const modalTitle = modalBackdrop ? modalBackdrop.querySelector('.modal-title') : null;
const modalCloseBtn = modalBackdrop ? modalBackdrop.querySelector('.modal-close') : null;

function openModal(title, contentHTML) {
    if (!modalBackdrop || !modalBody || !modalTitle) return;
    modalTitle.textContent = title;
    modalBody.innerHTML = contentHTML;
    modalBackdrop.classList.add('visible');
}

function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('visible');
}

if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
}

if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) closeModal();
    });
}

// =========================
// QUIZ DATA (10 QUESTIONS EACH)
// =========================
const quizBank = {
    foundations: {
        title: 'Foundations Quiz',
        timeLimitSeconds: 300,
        questions: [
            {
                question: 'In the expression x + 7, what does x represent?',
                options: [
                    'A fixed number',
                    'A variable that can change',
                    'The answer to the expression',
                    'The operation being used'
                ],
                answer: 1
            },
            {
                question: 'Which of the following is an algebraic expression?',
                options: [
                    '7 = 3 + 4',
                    'x - 5',
                    '12',
                    'x = 9'
                ],
                answer: 1
            },
            {
                question: 'Evaluate 3 + 2 × 4 using the order of operations.',
                options: [
                    '20',
                    '14',
                    '11',
                    '24'
                ],
                answer: 2
            },
            {
                question: 'Which shows the correct order of operations?',
                options: [
                    'Addition, Subtraction, Multiplication, Division, Parentheses, Exponents',
                    'Parentheses, Exponents, Multiplication/Division, Addition/Subtraction',
                    'Exponents, Parentheses, Multiplication/Division, Addition/Subtraction',
                    'Multiplication/Division, Parentheses, Exponents, Addition/Subtraction'
                ],
                answer: 1
            },
            {
                question: 'Evaluate 2(3 + 4).',
                options: [
                    '10',
                    '14',
                    '12',
                    '7'
                ],
                answer: 1
            },
            {
                question: 'Which of the following is NOT a variable?',
                options: [
                    'x',
                    '7',
                    'y',
                    'n'
                ],
                answer: 1
            },
            {
                question: 'In 5x, what is the coefficient?',
                options: [
                    '5',
                    'x',
                    '5x',
                    'There is no coefficient'
                ],
                answer: 0
            },
            {
                question: 'Evaluate 4 + 6 ÷ 3.',
                options: [
                    '2',
                    '6',
                    '8',
                    '10'
                ],
                answer: 2
            },
            {
                question: 'Which expression represents “a number increased by 9”?',
                options: [
                    'x - 9',
                    '9 - x',
                    'x + 9',
                    '9x'
                ],
                answer: 2
            },
            {
                question: 'Evaluate 10 - 2 × 3.',
                options: [
                    '24',
                    '4',
                    '16',
                    '8'
                ],
                answer: 1
            }
        ]
    },

    expressions: {
        title: 'Expressions Quiz',
        timeLimitSeconds: 420,
        questions: [
            {
                question: 'Simplify: 3x + 5x',
                options: ['8', '8x', '15x', '3x^2 + 5x^2'],
                answer: 1
            },
            {
                question: 'Which pair are like terms?',
                options: ['3x and 3y', '4x and 7', '2x and 5x', 'x and x^2'],
                answer: 2
            },
            {
                question: 'Evaluate 2x + 3 when x = 4.',
                options: ['11', '14', '10', '8'],
                answer: 0
            },
            {
                question: 'Simplify: 7y - 2y + y',
                options: ['10y', '6y', '8y', '5y'],
                answer: 2
            },
            {
                question: 'Which is an expression, not an equation?',
                options: ['x + 5 = 9', '3x - 2', 'y = 7', '2a = 10'],
                answer: 1
            },
            {
                question: 'Evaluate 5x - 2 when x = 3.',
                options: ['13', '15', '10', '1'],
                answer: 0
            },
            {
                question: 'Simplify: 4a + 3 - a + 2',
                options: ['3a + 5', '3a + 1', '5a + 5', '4a + 5'],
                answer: 0
            },
            {
                question: 'Evaluate 3(a + 1) when a = 7.',
                options: ['21', '24', '18', '27'],
                answer: 1
            },
            {
                question: 'Which expression represents “twice a number plus 5”?',
                options: ['2x - 5', 'x + 5', '2x + 5', 'x/2 + 5'],
                answer: 2
            },
            {
                question: 'Simplify: 9m - m',
                options: ['8', '8m', '9m^2', 'm^8'],
                answer: 1
            }
        ]
    },

    equations: {
        title: 'Equations Quiz',
        timeLimitSeconds: 420,
        questions: [
            {
                question: 'Solve: x + 7 = 12',
                options: ['x = 19', 'x = 5', 'x = -5', 'x = 84'],
                answer: 1
            },
            {
                question: 'Solve: 3x = 21',
                options: ['x = 7', 'x = 63', 'x = 18', 'x = 24'],
                answer: 0
            },
            {
                question: 'Solve: x - 4 = 9',
                options: ['x = 5', 'x = 13', 'x = -5', 'x = 36'],
                answer: 1
            },
            {
                question: 'Solve: 2x + 3 = 11',
                options: ['x = 4', 'x = 7', 'x = 5', 'x = 3'],
                answer: 0
            },
            {
                question: 'Solve: 5x - 10 = 0',
                options: ['x = 2', 'x = -2', 'x = 10', 'x = 0'],
                answer: 0
            },
            {
                question: 'Solve: 4x + 2 = 18',
                options: ['x = 4', 'x = 5', 'x = 3', 'x = 2'],
                answer: 0
            },
            {
                question: 'Solve: 7 = x - 3',
                options: ['x = 4', 'x = 10', 'x = -10', 'x = 21'],
                answer: 1
            },
            {
                question: 'Solve: 6x = 54',
                options: ['x = 9', 'x = 8', 'x = 6', 'x = 3'],
                answer: 0
            },
            {
                question: 'Solve: 3x + 2 = 17',
                options: ['x = 5', 'x = 7', 'x = 3', 'x = 6'],
                answer: 0
            },
            {
                question: 'Solve: 4y - 6 = 10',
                options: ['y = 1', 'y = 4', 'y = 5', 'y = 3'],
                answer: 2
            }
        ]
    },

    inequalities: {
        title: 'Inequalities Quiz',
        timeLimitSeconds: 420,
        questions: [
            {
                question: 'Solve: x + 3 > 7',
                options: ['x > 4', 'x < 4', 'x > 10', 'x < 10'],
                answer: 0
            },
            {
                question: 'Solve: x - 2 < 5',
                options: ['x < 3', 'x < 7', 'x > 3', 'x > 7'],
                answer: 1
            },
            {
                question: 'Solve: 3x ≥ 12',
                options: ['x ≥ 4', 'x ≤ 4', 'x ≥ 36', 'x ≤ 36'],
                answer: 0
            },
            {
                question: 'Solve: -2x ≤ 10',
                options: ['x ≥ -5', 'x ≤ -5', 'x ≥ 5', 'x ≤ 5'],
                answer: 0
            },
            {
                question: 'Which symbol means “less than or equal to”?',
                options: ['<', '>', '≤', '≥'],
                answer: 2
            },
            {
                question: 'Solve: 2x + 1 ≤ 9',
                options: ['x ≤ 4', 'x ≥ 4', 'x ≤ 5', 'x ≥ 5'],
                answer: 0
            },
            {
                question: 'Solve: 4x > 20',
                options: ['x > 5', 'x < 5', 'x > 80', 'x < 80'],
                answer: 0
            },
            {
                question: 'Solve: -4y > 20',
                options: ['y > -5', 'y < -5', 'y > 5', 'y < 5'],
                answer: 1
            },
            {
                question: 'Which inequality matches “a number is at least 7”?',
                options: ['x > 7', 'x ≥ 7', 'x < 7', 'x ≤ 7'],
                answer: 1
            },
            {
                question: 'Which inequality matches “a number is no more than 10”?',
                options: ['x > 10', 'x ≥ 10', 'x < 10', 'x ≤ 10'],
                answer: 3
            }
        ]
    },

    graphing: {
        title: 'Graphing Quiz',
        timeLimitSeconds: 420,
        questions: [
            {
                question: 'Which point is in Quadrant I?',
                options: ['(-3, 4)', '(3, 4)', '(-3, -4)', '(3, -4)'],
                answer: 1
            },
            {
                question: 'What are the coordinates of the origin?',
                options: ['(1, 1)', '(0, 0)', '(0, 1)', '(1, 0)'],
                answer: 1
            },
            {
                question: 'In y = 2x + 1, what is the slope?',
                options: ['1', '2', '-2', '0'],
                answer: 1
            },
            {
                question: 'In y = 2x + 1, what is the y-intercept?',
                options: ['1', '2', '0', '-1'],
                answer: 0
            },
            {
                question: 'Slope is defined as:',
                options: ['run/rise', 'rise/run', 'x/y', 'y/x'],
                answer: 1
            },
            {
                question: 'Find the slope between (1, 2) and (3, 6).',
                options: ['1', '2', '3', '4'],
                answer: 1
            },
            {
                question: 'A horizontal line has slope:',
                options: ['0', '1', 'undefined', '2'],
                answer: 0
            },
            {
                question: 'A vertical line has slope:',
                options: ['0', '1', 'undefined', '2'],
                answer: 2
            },
            {
                question: 'Which equation has slope 3 and y-intercept -2?',
                options: ['y = 3x - 2', 'y = -3x - 2', 'y = 2x + 3', 'y = -2x + 3'],
                answer: 0
            },
            {
                question: 'If a line goes up as you move right, its slope is:',
                options: ['Positive', 'Negative', 'Zero', 'Undefined'],
                answer: 0
            }
        ]
    },

    polynomials: {
        title: 'Polynomials Quiz',
        timeLimitSeconds: 420,
        questions: [
            {
                question: 'Which is a polynomial?',
                options: ['3x^2 - 5x + 2', '3/x', '√x + 1', '1/x^2'],
                answer: 0
            },
            {
                question: 'What is the degree of 4x^3 - x + 7?',
                options: ['1', '2', '3', '4'],
                answer: 2
            },
            {
                question: 'Add: (3x + 2) + (5x - 1)',
                options: ['8x + 1', '8x - 1', '2x + 1', '2x - 1'],
                answer: 0
            },
            {
                question: 'Add: (2x^2 + 3x) + (x^2 - x)',
                options: ['3x^2 + 2x', '3x^2 + 4x', 'x^2 + 2x', 'x^2 + 4x'],
                answer: 0
            },
            {
                question: 'Multiply: x(x + 4)',
                options: ['x + 4', 'x^2 + 4x', 'x^2 + 4', '4x^2'],
                answer: 1
            },
            {
                question: 'Multiply: (x + 3)(x + 2)',
                options: ['x^2 + 5x + 6', 'x^2 + 6x + 5', 'x^2 + 3x + 2', 'x^2 + 2x + 3'],
                answer: 0
            },
            {
                question: 'Combine like terms: 4x^2 + 3x^2',
                options: ['7x', '7x^2', '12x^2', 'x^4'],
                answer: 1
            },
            {
                question: 'Which is the leading term of 5x^3 - 2x + 1?',
                options: ['5x^3', '-2x', '1', 'x^3'],
                answer: 0
            },
            {
                question: 'What is the constant term in x^2 - 4x + 7?',
                options: ['x^2', '-4x', '7', '2'],
                answer: 2
            },
            {
                question: 'Multiply: 2x(3x - 5)',
                options: ['6x^2 - 10x', '6x - 10', '5x^2 - 10x', '6x^2 + 10x'],
                answer: 0
            }
        ]
    },

    factoring: {
        title: 'Factoring Quiz',
        timeLimitSeconds: 420,
        questions: [
            {
                question: 'Factor: 6x + 12',
                options: ['6(x + 2)', '3(2x + 4)', '2(3x + 6)', 'All of these'],
                answer: 3
            },
            {
                question: 'What is the GCF of 8x and 12x^2?',
                options: ['4x', '2x', '8x', '12x'],
                answer: 0
            },
            {
                question: 'Factor: x^2 + 5x + 6',
                options: ['(x + 2)(x + 3)', '(x - 2)(x - 3)', '(x + 1)(x + 6)', '(x - 1)(x - 6)'],
                answer: 0
            },
            {
                question: 'Factor: x^2 - 9',
                options: ['(x - 3)(x + 3)', '(x - 9)(x + 1)', '(x - 1)(x + 9)', 'Prime'],
                answer: 0
            },
            {
                question: 'Factor: 3x^2 + 6x',
                options: ['3x(x + 2)', '3x(x + 6)', 'x(3x + 6)', '6x(x + 1)'],
                answer: 0
            },
            {
                question: 'Factor: x^2 + 7x + 10',
                options: ['(x + 5)(x + 2)', '(x + 10)(x - 1)', '(x + 1)(x + 10)', '(x + 3)(x + 4)'],
                answer: 0
            },
            {
                question: 'Factor completely: 4x^2 - 4',
                options: ['4(x^2 - 1)', '4(x - 1)(x + 1)', '(2x - 2)(2x + 2)', 'All of these'],
                answer: 3
            },
            {
                question: 'Which is a difference of squares?',
                options: ['x^2 + 4', 'x^2 - 4', 'x^2 + 2x + 1', 'x^2 - 2x + 1'],
                answer: 1
            },
            {
                question: 'Factor: x^2 + 4x + 4',
                options: ['(x + 2)^2', '(x - 2)^2', '(x + 4)(x + 1)', '(x + 1)^2'],
                answer: 0
            },
            {
                question: 'Factor: 5x^2 - 5x',
                options: ['5x(x - 1)', '5x(x + 1)', 'x(5x - 5)', '5(x^2 - x)'],
                answer: 0
            }
        ]
    },

    quadratics: {
        title: 'Quadratics Quiz',
        timeLimitSeconds: 480,
        questions: [
            {
                question: 'Which is a quadratic expression?',
                options: ['2x + 3', 'x^2 - 5x + 6', '3x^3 + 1', '7 - x'],
                answer: 1
            },
            {
                question: 'In ax^2 + bx + c, what does a control?',
                options: ['Width and direction of the parabola', 'x-intercepts', 'y-intercept only', 'Nothing important'],
                answer: 0
            },
            {
                question: 'Find the vertex of y = x^2 - 4x + 3.',
                options: ['(2, -1)', '(2, 1)', '(4, 3)', '(1, -2)'],
                answer: 0
            },
            {
                question: 'Solve by factoring: x^2 - 5x + 6 = 0',
                options: ['x = 2 or 3', 'x = -2 or -3', 'x = 1 or 6', 'x = -1 or -6'],
                answer: 0
            },
            {
                question: 'What is the discriminant of x^2 + 2x + 5?',
                options: ['4', '-16', '16', '0'],
                answer: 1
            },
            {
                question: 'If the discriminant is negative, how many real solutions?',
                options: ['0', '1', '2', 'Infinitely many'],
                answer: 0
            },
            {
                question: 'Use the quadratic formula to solve x^2 - 4x + 4 = 0.',
                options: ['x = 2', 'x = -2', 'x = 4', 'x = 0'],
                answer: 0
            },
            {
                question: 'The graph of y = (x - 3)^2 + 2 has vertex:',
                options: ['(3, 2)', '(-3, 2)', '(2, 3)', '(0, 2)'],
                answer: 0
            },
            {
                question: 'If a > 0 in y = ax^2 + bx + c, the parabola:',
                options: ['Opens up', 'Opens down', 'Is a line', 'Is a circle'],
                answer: 0
            },
            {
                question: 'Solve: 2x^2 + 3x - 2 = 0',
                options: ['x = 1/2 or -2', 'x = -1/2 or 2', 'x = 1 or -2', 'x = -1 or 2'],
                answer: 0
            }
        ]
    },

    functions: {
        title: 'Functions Quiz',
        timeLimitSeconds: 420,
        questions: [
            {
                question: 'Which is function notation?',
                options: ['y = 2x + 1', 'f(x) = 2x + 1', '2x + 1 = 0', 'x(2) + 1'],
                answer: 1
            },
            {
                question: 'If f(x) = 2x + 1, what is f(3)?',
                options: ['5', '6', '7', '8'],
                answer: 2
            },
            {
                question: 'The domain of a function is:',
                options: ['All possible outputs', 'All possible inputs', 'Only positive numbers', 'Only negative numbers'],
                answer: 1
            },
            {
                question: 'The range of a function is:',
                options: ['All possible outputs', 'All possible inputs', 'Only integers', 'Only fractions'],
                answer: 0
            },
            {
                question: 'If f(x) = x^2, which value is in the range?',
                options: ['-1', '0', '-4', '-9'],
                answer: 1
            },
            {
                question: 'A function must assign:',
                options: ['Many outputs to one input', 'Exactly one output to each input', 'No outputs', 'At least two outputs'],
                answer: 1
            },
            {
                question: 'If g(x) = 3x - 2, find g(4).',
                options: ['10', '12', '14', '8'],
                answer: 0
            },
            {
                question: 'Which describes a real-world function?',
                options: [
                    'A random list of numbers',
                    'A rule that gives cost for each number of items',
                    'A picture with no labels',
                    'A table with repeated inputs and different outputs'
                ],
                answer: 1
            },
            {
                question: 'If h(x) = x + 5, what is h(0)?',
                options: ['0', '5', '-5', '10'],
                answer: 1
            },
            {
                question: 'If f(x) = 2x and f(4) = 8, what is the input?',
                options: ['2', '4', '8', '16'],
                answer: 1
            }
        ]
    },

    wordproblems: {
        title: 'Word Problems Quiz',
        timeLimitSeconds: 600,
        questions: [
            {
                question: '“Twice a number plus 3 is 11.” Which equation matches?',
                options: ['2x + 3 = 11', '2 + 3x = 11', 'x/2 + 3 = 11', '2x - 3 = 11'],
                answer: 0
            },
            {
                question: '“A number decreased by 7 is 10.” Which equation matches?',
                options: ['x + 7 = 10', 'x - 7 = 10', '7 - x = 10', 'x - 10 = 7'],
                answer: 1
            },
            {
                question: 'A taxi charges $4 plus $2 per mile. Cost function C(m) is:',
                options: ['C(m) = 2m + 4', 'C(m) = 4m + 2', 'C(m) = m + 6', 'C(m) = 2m - 4'],
                answer: 0
            },
            {
                question: 'Sarah has 5 more apples than Tom. Tom has x apples. Sarah has:',
                options: ['x - 5', 'x + 5', '5x', 'x/5'],
                answer: 1
            },
            {
                question: 'Together Sarah and Tom have 17 apples. Tom has x, Sarah has x + 5. Equation:',
                options: ['x + 5 = 17', 'x + (x + 5) = 17', '2x + 5 = 12', 'x - (x + 5) = 17'],
                answer: 1
            },
            {
                question: 'A rectangle has perimeter 30. Length is x, width is x - 3. Equation:',
                options: [
                    '2x + 2(x - 3) = 30',
                    'x + (x - 3) = 30',
                    '4x - 3 = 30',
                    'x^2 - 3 = 30'
                ],
                answer: 0
            },
            {
                question: '“Three times a number is 24.” Equation:',
                options: ['3 + x = 24', '3x = 24', 'x/3 = 24', '3x + 24 = 0'],
                answer: 1
            },
            {
                question: '“A number divided by 4 is 6.” Equation:',
                options: ['x/4 = 6', '4x = 6', 'x - 4 = 6', 'x + 4 = 6'],
                answer: 0
            },
            {
                question: 'A movie ticket costs $10. You buy x tickets. Total cost:',
                options: ['10 + x', '10x', 'x/10', '10 - x'],
                answer: 1
            },
            {
                question: 'A phone plan costs $20 plus $5 per GB of data. Cost function C(g):',
                options: ['C(g) = 5g + 20', 'C(g) = 20g + 5', 'C(g) = g + 25', 'C(g) = 5g - 20'],
                answer: 0
            }
        ]
    }
};

// =========================
// FINAL EXAM (ALL TOPICS)
// =========================
const finalExamConfig = {
    title: 'Algebra Final Exam',
    timeLimitSeconds: 1800, // 30 minutes
    questionCount: 25
};

function buildFinalExamQuestions() {
    const allQuestions = [];
    Object.keys(quizBank).forEach(topicKey => {
        allQuestions.push(...quizBank[topicKey].questions.map(q => ({
            ...q,
            topic: topicKey
        })));
    });
    // Simple shuffle
    for (let i = allQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
    }
    return allQuestions.slice(0, finalExamConfig.questionCount);
}

// =========================
// QUIZ ENGINE + TIMER
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

    renderQuizModal();   // loads question
    startTimer();        // starts timer ONCE
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

    renderQuizModal();   // loads question
    startTimer();        // starts timer ONCE
}

function renderQuizModal() {
    // ❌ REMOVE startTimer() from here
    // DO NOT restart timer when switching questions

    const q = currentQuestions[currentIndex];
    const total = currentQuestions.length;

    const timerEl = modalBody.querySelector('.quiz-timer');
    updateTimerDisplay(timerEl); // ✔️ only update display
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
            <div class="quiz-question">
                <p>${q.question}</p>
            </div>
            <div class="quiz-options">
                ${optionsHTML}
            </div>
            <div class="quiz-controls">
                <button class="btn-secondary quiz-prev" ${currentIndex === 0 ? 'disabled' : ''}>Previous</button>
                <button class="btn-secondary quiz-next" ${currentIndex === total - 1 ? 'disabled' : ''}>Next</button>
                <button class="btn-primary quiz-submit">Submit</button>
            </div>
        `;

        openModal(currentQuiz.title, content);

        const timerEl = modalBody.querySelector('.quiz-timer');
        updateTimerDisplay(timerEl);

        const prevBtn = modalBody.querySelector('.quiz-prev');
        const nextBtn = modalBody.querySelector('.quiz-next');
        const submitBtn = modalBody.querySelector('.quiz-submit');

        prevBtn.addEventListener('click', () => {
            saveCurrentAnswer();
            if (currentIndex > 0) {
                currentIndex--;
                renderQuizModal();
            }
        });

        nextBtn.addEventListener('click', () => {
            saveCurrentAnswer();
            if (currentIndex < currentQuestions.length - 1) {
                currentIndex++;
                renderQuizModal();
            }
        });

        submitBtn.addEventListener('click', () => {
            saveCurrentAnswer();
            manualSubmit();
        });
    }

    function saveCurrentAnswer() {
        const selected = modalBody.querySelector('input[name="quiz-option"]:checked');
        if (selected) {
            userAnswers[currentIndex] = parseInt(selected.value, 10);
        }
    }

    function manualSubmit() {
        const confirmSubmit = confirm('Are you sure you want to submit?');
        if (!confirmSubmit) return;
        finishQuiz();
    }

    function autoSubmit() {
        alert('Time is up! Your quiz will be submitted automatically.');
        finishQuiz();
    }

    function finishQuiz() {
        if (timerId) clearInterval(timerId);

        let correct = 0;
        currentQuestions.forEach((q, idx) => {
            if (userAnswers[idx] === q.answer) correct++;
        });

        const total = currentQuestions.length;
        const percent = Math.round((correct / total) * 100);
        const timeUsed = (currentQuiz.timeLimitSeconds || finalExamConfig.timeLimitSeconds) - timeRemaining;
        const minutesUsed = Math.floor(timeUsed / 60);
        const secondsUsed = timeUsed % 60;

        let message = '';
        if (percent === 100) message = 'Perfect score! Incredible work.';
        else if (percent >= 80) message = 'Great job! You really understand this topic.';
        else if (percent >= 60) message = 'Solid start. Review a few areas and try again.';
        else message = 'This is a good baseline. Review the lesson and retake the quiz.';

        let extra = '';
        if (isFinalExam) {
            extra = `
                <div class="mt-md">
                    <button class="btn-primary final-certificate-btn">Generate Certificate</button>
                </div>
            `;
        }

        const resultHTML = `
            <div class="quiz-results">
                <h3>Your Score</h3>
                <p><strong>${correct}</strong> out of <strong>${total}</strong> (${percent}%)</p>
                <p>Time used: ${minutesUsed}:${secondsUsed.toString().padStart(2, '0')}</p>
                <p class="text-soft">${message}</p>
                <div class="quiz-results-actions">
                    <button class="btn-secondary quiz-retake">Retake</button>
                    <button class="btn-outline quiz-close">Close</button>
                </div>
                ${extra}
            </div>
        `;

        openModal(currentQuiz.title, resultHTML);

        const retakeBtn = modalBody.querySelector('.quiz-retake');
        const closeBtn = modalBody.querySelector('.quiz-close');
        const certBtn = modalBody.querySelector('.final-certificate-btn');

        retakeBtn.addEventListener('click', () => {
            if (isFinalExam) {
                startFinalExam();
            } else {
                startQuiz(getCurrentTopicKey());
            }
        });

        closeBtn.addEventListener('click', closeModal);

        if (certBtn && isFinalExam) {
            certBtn.addEventListener('click', () => {
                alert('Certificate generated! (Hook this into your certificate system.)');
            });
        }
    }

    function getCurrentTopicKey() {
        if (isFinalExam) return null;
        // best-effort: match by title
        const entry = Object.entries(quizBank).find(([key, val]) => val.title === currentQuiz.title);
        return entry ? entry[0] : null;
    }

    return {
        startQuiz,
        startFinalExam
    };
})();

// Expose globally for inline onclick handlers
window.quizEngine = quizEngine;


// =========================
// REVEAL BUTTONS FOR SUBJECT PAGES
// =========================

document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-reveal]");
    if (!btn) return;

    const targetId = btn.getAttribute("data-reveal");
    const answer = document.getElementById(targetId);

    if (!answer) return;

    answer.classList.toggle("hidden");

    // Optional: change button text
    if (answer.classList.contains("hidden")) {
        btn.textContent = "Show Steps";
    } else {
        btn.textContent = "Hide Steps";
    }
});


// =========================
// LIVE EQUATION BALANCE SIMULATOR
// =========================

function evaluateSide(expr) {
    try {
        return Function("x", "return " + expr)(1); // x=1 placeholder
    } catch {
        return null;
    }
}

document.addEventListener("click", (e) => {
    if (e.target.id === "balance-check") {
        const input = document.getElementById("balance-input").value;
        const output = document.getElementById("balance-output");
        const visual = document.getElementById("balance-visual");

        if (!input.includes("=")) {
            output.textContent = "Your equation must include an equals sign (=).";
            output.classList.remove("hidden");
            return;
        }

        const [left, right] = input.split("=").map(s => s.trim());
        const L = evaluateSide(left);
        const R = evaluateSide(right);

        if (L === null || R === null) {
            output.textContent = "I couldn't understand part of your equation.";
            output.classList.remove("hidden");
            return;
        }

        output.classList.remove("hidden");

        if (L === R) {
            output.textContent = "Balanced! Both sides equal the same value.";
            visual.style.transform = "rotate(0deg)";
            visual.textContent = "⚖️ Perfect Balance";
        } else if (L > R) {
            output.textContent = "Left side is heavier (greater).";
            visual.style.transform = "rotate(-12deg)";
            visual.textContent = "↙️ Left Side Heavier";
        } else {
            output.textContent = "Right side is heavier (greater).";
            visual.style.transform = "rotate(12deg)";
            visual.textContent = "↘️ Right Side Heavier";
        }
    }

    if (e.target.id === "balance-steps") {
        const input = document.getElementById("balance-input").value;
        const output = document.getElementById("balance-output");

        if (!input.includes("=")) {
            output.textContent = "Your equation must include an equals sign (=).";
            output.classList.remove("hidden");
            return;
        }

        const [left, right] = input.split("=").map(s => s.trim());

        output.classList.remove("hidden");
        output.innerHTML = `
            <strong>Solving Steps (General Guide):</strong><br><br>
            1. Start with your equation: <strong>${input}</strong><br>
            2. Identify the variable and isolate it.<br>
            3. Undo addition/subtraction first.<br>
            4. Undo multiplication/division next.<br>
            5. Keep the equation balanced by doing the same to both sides.<br>
            6. Simplify until the variable stands alone.<br><br>
            <em>This simulator gives a general solving path. For exact steps, use the examples above!</em>
        `;
    }
});

