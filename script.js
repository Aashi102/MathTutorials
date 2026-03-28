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
    for (let i = allQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
    }
    return allQuestions.slice(0, finalExamConfig.questionCount);
}

// =========================
// AI ENGINE (MASTERY MODEL)
// =========================
const AIEngine = {
    userModel: {
        attempts: 0,
        correct: 0,
        accuracy: 1,
        history: []
    },

    reset() {
        this.userModel = {
            attempts: 0,
            correct: 0,
            accuracy: 1,
            history: []
        };
    },

    record(isCorrect) {
        const m = this.userModel;
        m.attempts++;
        if (isCorrect) m.correct++;
        m.history.push(isCorrect);
        m.accuracy = m.correct / m.attempts;
    },

    masteryLabel(percent) {
        if (percent >= 90) return 'Expert';
        if (percent >= 80) return 'Strong';
        if (percent >= 60) return 'Developing';
        return 'Needs Practice';
    }
};

// =========================
// QUIZ ENGINE + TIMER + EXAM
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
        if (timeRemaining <= 30) {
            el.classList.add('timer-warning');
        } else {
            el.classList.remove('timer-warning');
        }
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
        const timeUsed = (currentQuiz.timeLimitSeconds || finalExamConfig.timeLimitSeconds) - timeRemaining;
        const minutesUsed = Math.floor(timeUsed / 60);
        const secondsUsed = timeUsed % 60;

        const mastery = AIEngine.masteryLabel(percent);

        let message = '';
        if (percent === 100) message = 'Perfect score! Incredible work.';
        else if (percent >= 80) message = 'Great job! You really understand this topic.';
        else if (percent >= 60) message = 'Solid start. Review a few areas and try again.';
        else message = 'This is a good baseline. Review the lesson and retake the quiz.';

        let extra = '';
        if (isFinalExam) {
            if (percent >= 80) {
                extra = `<p class="exam-pass">You passed the final exam! You qualify for a certificate.</p>`;
            } else {
                extra = `<p class="exam-fail">You did not reach the passing threshold. Review and try the exam again.</p>`;
            }
        }

        const content = `
            <div class="quiz-results">
                <h2>${currentQuiz.title} — Results</h2>
                <p><strong>Score:</strong> ${correct} / ${total} (${percent}%)</p>
                <p><strong>Mastery:</strong> ${mastery}</p>
                <p><strong>Time Used:</strong> ${minutesUsed}:${secondsUsed.toString().padStart(2, '0')}</p>
                <p>${message}</p>
                ${autoSubmitted ? '<p>(Auto-submitted due to time.)</p>' : ''}
                ${extra}
                <div class="quiz-results-actions">
                    <button class="btn-secondary quiz-close">Close</button>
                    <button class="btn-primary quiz-retry">Retry</button>
                </div>
            </div>
        `;

        openModal('Results', content);

        const closeBtn = modalBody.querySelector('.quiz-close');
        const retryBtn = modalBody.querySelector('.quiz-retry');

        closeBtn.addEventListener('click', () => {
            closeModal();
        });

        retryBtn.addEventListener('click', () => {
            if (isFinalExam) {
                startFinalExam();
            } else {
                // restart same topic
                const topicKey = currentQuestions[0].topic || null;
                if (topicKey && quizBank[topicKey]) {
                    startQuiz(topicKey);
                } else {
                    // fallback: restart current quiz object
                    isFinalExam ? startFinalExam() : startQuiz(findTopicKeyForQuiz(currentQuiz));
                }
            }
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

// =========================
// ANIMATED GRAPH ENGINE
// =========================
class AnimatedGraph {
    constructor(canvasId, fn, options = {}) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext("2d");
        this.fn = fn;

        const rootStyles = getComputedStyle(document.documentElement);
        this.color = options.color || rootStyles.getPropertyValue("--accent").trim() || "#4f46e5";
        this.axisColor = options.axisColor || rootStyles.getPropertyValue("--border").trim() || "#cccccc";

        this.duration = options.duration || 1200;
        this.steps = options.steps || 200;
        this.scale = options.scale || 40;
        this.padding = options.padding || 40;

        this.resize = this.resize.bind(this);
        this.animatePlot = this.animatePlot.bind(this);

        this.resize();
        window.addEventListener("resize", this.resize);
    }

    resize() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height || 300;
        this.drawAxes();
        this.animatePlot();
    }

    drawAxes() {
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;

        ctx.clearRect(0, 0, w, h);

        ctx.strokeStyle = this.axisColor;
        ctx.lineWidth = 1;

        // X-axis
        ctx.beginPath();
        ctx.moveTo(0, h / 2);
        ctx.lineTo(w, h / 2);
        ctx.stroke();

        // Y-axis
        ctx.beginPath();
        ctx.moveTo(w / 2, 0);
        ctx.lineTo(w / 2, h);
        ctx.stroke();
    }

    animatePlot() {
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;

        let progress = 0;
        const step = 1 / this.steps;

        const animate = () => {
            progress += step;
            if (progress > 1) progress = 1;

            this.drawAxes();

            ctx.strokeStyle = this.color;
            ctx.lineWidth = 2;
            ctx.beginPath();

            for (let x = 0; x < w * progress; x++) {
                const graphX = (x - w / 2) / this.scale;
                const graphY = this.fn(graphX);
                const y = h / 2 - graphY * this.scale;

                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }

            ctx.stroke();

            if (progress < 1) requestAnimationFrame(animate);
        };

        animate();
    }
}

// =========================
// GRAPH DEMOS (OPTIONAL)
// =========================
function initGraphs() {
    if (document.getElementById("graph-quadratic")) {
        new AnimatedGraph("graph-quadratic", x => x * x);
    }
    if (document.getElementById("graph-sine")) {
        new AnimatedGraph("graph-sine", x => Math.sin(x), { color: "#f97316" });
    }
    if (document.getElementById("graph-absolute")) {
        new AnimatedGraph("graph-absolute", x => Math.abs(x), { color: "#22c55e" });
    }
}

// =========================
// INIT HOOKS
// =========================
document.addEventListener('DOMContentLoaded', () => {
    // Quiz topic buttons: <button data-quiz-topic="foundations">
    document.querySelectorAll('[data-quiz-topic]').forEach(btn => {
        btn.addEventListener('click', () => {
            const topic = btn.getAttribute('data-quiz-topic');
            quizEngine.startQuiz(topic);
        });
    });

    // Final exam button: <button data-final-exam>
    const finalExamBtn = document.querySelector('[data-final-exam]');
    if (finalExamBtn) {
        finalExamBtn.addEventListener('click', () => {
            quizEngine.startFinalExam();
        });
    }

    initGraphs();
});
