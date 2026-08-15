        // QUESTION BANK with LaTeX formatting and dynamic option shuffling
        const questionBank = [
            {
                category: "Coordinate Plane",
                question: "In which quadrant is the point \\( P\\left(-4.5, -3\\frac{1}{2}\\right) \\) located on the coordinate plane?",
                options: ["Quadrant III", "Quadrant I", "Quadrant II", "Quadrant IV"],
                correct: "Quadrant III"
            },
            {
                category: "Exponents & Operations",
                question: "Evaluate the expression: \\( (-3)^3 + 4^2 - (2.5)^0 \\)",
                options: ["-12", "-10", "12", "-27"],
                correct: "-12"
            },
            {
                category: "Scientific Notation",
                question: "Which of the following represents \\( 0.00045 \\) in proper scientific notation?",
                options: ["\\( 4.5 \\times 10^{-4} \\)", "\\( 45 \\times 10^{-5} \\)", "\\( 4.5 \\times 10^{4} \\)", "\\( 0.45 \\times 10^{-3} \\)"],
                correct: "\\( 4.5 \\times 10^{-4} \\)"
            },
            {
                category: "Evaluating Expressions",
                question: "Evaluate \\( 3x^2 - 2y + 5 \\) for \\( x = -2 \\) and \\( y = 4 \\).",
                options: ["9", "17", "-3", "13"],
                correct: "9"
            },
            {
                category: "Expanding Expressions",
                question: "Expand and combine like terms: \\( -4(3x - 5) + 2(x + 1) \\)",
                options: ["\\( -10x + 22 \\)", "\\( -10x + 18 \\)", "\\( -14x + 22 \\)", "\\( 10x - 22 \\)"],
                correct: "\\( -10x + 22 \\)"
            },
            {
                category: "Keyword Translation",
                question: "Translate into an equation: 'Seven less than double a number \\( n \\) yields \\( 25 \\)'.",
                options: ["\\( 2n - 7 = 25 \\)", "\\( 7 - 2n = 25 \\)", "\\( 2(n - 7) = 25 \\)", "\\( 2n + 7 = 25 \\)"],
                correct: "\\( 2n - 7 = 25 \\)"
            },
            {
                category: "Two-Step Equations",
                question: "Solve for \\( x \\): \\( \\frac{2}{3}x - 5 = 11 \\)",
                options: ["\\( x = 24 \\)", "\\( x = 16 \\)", "\\( x = 27 \\)", "\\( x = 18 \\)"],
                correct: "\\( x = 24 \\)"
            },
            {
                category: "Multi-Step Equations",
                question: "Solve for \\( x \\): \\( -4(2x - 3) = 28 \\)",
                options: ["\\( x = -2 \\)", "\\( x = 2 \\)", "\\( x = -5 \\)", "\\( x = 4 \\)"],
                correct: "\\( x = -2 \\)"
            },
            {
                category: "Variables on Both Sides",
                question: "Solve for \\( x \\): \\( 7x - 9 = 3x + 15 \\)",
                options: ["\\( x = 6 \\)", "\\( x = 4 \\)", "\\( x = 8 \\)", "\\( x = 2.4 \\)"],
                correct: "\\( x = 6 \\)"
            },
            {
                category: "Multi-Step Inequalities",
                question: "Solve the inequality: \\( -3x + 8 \\le -7 \\)",
                options: ["\\( x \\ge 5 \\)", "\\( x \\le 5 \\)", "\\( x \\ge -5 \\)", "\\( x \\le -5 \\)"],
                correct: "\\( x \\ge 5 \\)"
            },
            {
                category: "Graphing Inequalities",
                question: "When graphing \\( x \\le 12 \\) on a number line, what type of circle and arrow direction should be used?",
                options: ["Closed circle pointing Left", "Open circle pointing Left", "Closed circle pointing Right", "Open circle pointing Right"],
                correct: "Closed circle pointing Left"
            },
            {
                category: "Theoretical Probability",
                question: "A bag has 5 red, 8 blue, 3 yellow, and 4 green marbles. What is \\( P(\\text{NOT blue}) \\)?",
                options: ["\\( 60\\% \\)", "\\( 40\\% \\)", "\\( 75\\% \\)", "\\( 50\\% \\)"],
                correct: "\\( 60\\% \\)"
            },
            {
                category: "Teaser Challenge (Lessons 1.2-1.3)",
                question: "Gym A charges $50 registration + $15/month. Gym B charges $20 registration + $20/month. After how many months \\( m \\) is the total cost equal?",
                options: ["6 months", "5 months", "8 months", "4 months"],
                correct: "6 months"
            }
        ];

        // GAME STATE
        let currentLevel = 0;
        let score = 0;
        let hp = 3;
        let isDarkMode = true;
        let isAnswerLocked = false;
        let activeQuestions = [];

        // Utility: Fisher-Yates Array Shuffle
        function shuffleArray(array) {
            const arr = [...array];
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        }

        // Toggle Theme
        function toggleTheme() {
            isDarkMode = !isDarkMode;
            const body = document.body;
            const themeIcon = document.getElementById('themeIcon');
            const themeText = document.getElementById('themeText');

            if (isDarkMode) {
                body.classList.remove('light-mode');
                themeIcon.innerText = '🌙';
                themeText.innerText = 'Dark Mode';
            } else {
                body.classList.add('light-mode');
                themeIcon.innerText = '☀️';
                themeText.innerText = 'Light Mode';
            }
        }

        // MathJax Safe Renderer Trigger
        function renderMath() {
            if (window.MathJax && window.MathJax.startup && window.MathJax.startup.promise) {
                MathJax.startup.promise
                    .then(() => MathJax.typesetPromise())
                    .catch(err => console.warn('MathJax error:', err));
            }
        }

        // Start Game Initialization
        function startGame() {
            currentLevel = 0;
            score = 0;
            hp = 3;
            activeQuestions = shuffleArray(questionBank);

            document.getElementById('startScreen').style.display = 'none';
            document.getElementById('gameOverScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'none';
            document.getElementById('gameplayScreen').style.display = 'block';

            loadQuestion();
        }

        // Load Current Question
        function loadQuestion() {
            isAnswerLocked = false;
            document.getElementById('feedbackBanner').innerText = '';

            const qData = activeQuestions[currentLevel];
            
            // Update HUD
            document.getElementById('stageTitle').innerText = `Stage ${currentLevel + 1}: ${qData.category}`;
            document.getElementById('levelCounter').innerText = `${currentLevel + 1} / ${activeQuestions.length}`;
            document.getElementById('scoreDisplay').innerText = `${score} PTS`;
            updateHpDisplay();

            // Render Question Text
            document.getElementById('questionBox').innerHTML = qData.question;

            // Randomize & Render Options
            const shuffledOptions = shuffleArray(qData.options);
            const optionsGrid = document.getElementById('optionsGrid');
            optionsGrid.innerHTML = '';

            const prefixes = ['A', 'B', 'C', 'D'];
            shuffledOptions.forEach((optText, index) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.onclick = () => handleAnswer(optText, qData.correct, btn);
                btn.innerHTML = `
                    <span class="option-prefix">${prefixes[index]}</span>
                    <span>${optText}</span>
                `;
                optionsGrid.appendChild(btn);
            });

            renderMath();
        }

        // Handle Answer Selection
        function handleAnswer(selectedOpt, correctOpt, btnEl) {
            if (isAnswerLocked) return;
            isAnswerLocked = true;

            const feedback = document.getElementById('feedbackBanner');

            if (selectedOpt === correctOpt) {
                // Correct Answer
                score += 100;
                btnEl.style.borderColor = 'var(--accent-green)';
                btnEl.style.background = 'rgba(74, 222, 128, 0.2)';
                feedback.className = 'feedback-banner feedback-correct';
                feedback.innerText = '✨ CORRECT! +100 PTS';

                setTimeout(() => {
                    currentLevel++;
                    if (currentLevel >= activeQuestions.length) {
                        triggerVictory();
                    } else {
                        loadQuestion();
                    }
                }, 1100);

            } else {
                // Incorrect Answer
                hp--;
                btnEl.style.borderColor = 'var(--accent-red)';
                btnEl.style.background = 'rgba(244, 63, 94, 0.2)';
                
                const gameCard = document.getElementById('gameCard');
                gameCard.classList.add('shake');
                setTimeout(() => gameCard.classList.remove('shake'), 350);

                feedback.className = 'feedback-banner feedback-wrong';
                feedback.innerText = '❌ INCORRECT (-1 Heart)';
                updateHpDisplay();

                if (hp <= 0) {
                    setTimeout(() => {
                        triggerGameOver();
                    }, 1000);
                } else {
                    setTimeout(() => {
                        loadQuestion();
                    }, 1200);
                }
            }
        }

        function updateHpDisplay() {
            let heartsStr = '';
            for (let i = 0; i < hp; i++) heartsStr += '❤️';
            for (let i = hp; i < 3; i++) heartsStr += '🖤';
            document.getElementById('hpDisplay').innerText = heartsStr;
        }

        function triggerGameOver() {
            document.getElementById('gameplayScreen').style.display = 'none';
            document.getElementById('gameOverScreen').style.display = 'flex';
            document.getElementById('finalScoreFail').innerText = score;
        }

        function triggerVictory() {
            document.getElementById('gameplayScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'flex';
            document.getElementById('finalScoreWin').innerText = score;
        }

        function restartGame() {
            startGame();
        }
    
