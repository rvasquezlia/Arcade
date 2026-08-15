        // QUESTION BANK — beam-span fraction addition/subtraction with unlike denominators.
        // Every "correct" value below has been hand-verified with a common-denominator
        // calculation (see design notes); every distractor set has been checked to be
        // mathematically wrong and distinct from the correct answer and from each other.
        function frac(num, den) {
            return { num, den };
        }

        const beamBank = [
            { prompt: "Beam Segment Alpha spans \\( \\frac{1}{2} \\) m and Beam Segment Beta spans \\( \\frac{1}{3} \\) m. If they are welded end-to-end, what is the total span length?", correct: frac(5, 6), distractors: [frac(2, 5), frac(1, 6), frac(1, 1)] },
            { prompt: "A support beam is built from a \\( \\frac{2}{3} \\) m section and a \\( \\frac{1}{4} \\) m section joined together. What is the combined length?", correct: frac(11, 12), distractors: [frac(3, 7), frac(5, 12), frac(1, 1)] },
            { prompt: "The total gap between piers is \\( \\frac{3}{4} \\) m. A beam already covers \\( \\frac{1}{3} \\) m of it. How much gap remains uncovered?", correct: frac(5, 12), distractors: [frac(4, 7), frac(13, 12), frac(1, 2)] },
            { prompt: "A truss needs to span \\( \\frac{5}{6} \\) m. An installed beam covers \\( \\frac{1}{4} \\) m. How much additional length is still needed?", correct: frac(7, 12), distractors: [frac(3, 5), frac(13, 12), frac(2, 3)] },
            { prompt: "Two diagonal support beams measuring \\( \\frac{1}{2} \\) m and \\( \\frac{2}{5} \\) m are connected in series. What is their combined length?", correct: frac(9, 10), distractors: [frac(3, 7), frac(1, 10), frac(1, 1)] },
            { prompt: "The load-bearing beam must be \\( \\frac{3}{5} \\) m long. A shorter \\( \\frac{1}{4} \\) m brace has already been cut from stock. How much beam length remains to be cut?", correct: frac(7, 20), distractors: [frac(4, 9), frac(17, 20), frac(2, 5)] },
            { prompt: "A guardrail is assembled from a \\( \\frac{2}{3} \\) m piece and a \\( \\frac{1}{6} \\) m piece. What is the total guardrail length?", correct: frac(5, 6), distractors: [frac(1, 3), frac(1, 2), frac(1, 1)] },
            { prompt: "The span between two piers is \\( \\frac{7}{8} \\) m. A cross-beam already covers \\( \\frac{1}{4} \\) m of that span. How much span is still uncovered?", correct: frac(5, 8), distractors: [frac(2, 3), frac(9, 8), frac(3, 4)] },
            { prompt: "Engineers weld a \\( \\frac{1}{3} \\) m brace to a \\( \\frac{1}{4} \\) m brace. What is the length of the combined brace?", correct: frac(7, 12), distractors: [frac(2, 7), frac(1, 12), frac(2, 3)] },
            { prompt: "A cantilever arm is built from a \\( \\frac{5}{8} \\) m beam and a \\( \\frac{1}{3} \\) m extension. What is the total arm length?", correct: frac(23, 24), distractors: [frac(6, 11), frac(7, 24), frac(1, 1)] },
            { prompt: "Two railing segments measuring \\( \\frac{3}{4} \\) m and \\( \\frac{1}{6} \\) m are bolted together. What is the total railing length?", correct: frac(11, 12), distractors: [frac(2, 5), frac(7, 12), frac(1, 1)] },
            { prompt: "The bridge deck gap is \\( \\frac{5}{6} \\) m wide. A steel plate covering \\( \\frac{1}{3} \\) m has been installed. How much of the gap is still open?", correct: frac(1, 2), distractors: [frac(2, 3), frac(7, 6), frac(1, 1)] },
            { prompt: "A support cable must reach \\( \\frac{7}{10} \\) m. So far, \\( \\frac{1}{2} \\) m of cable has been strung. How much more cable is needed?", correct: frac(1, 5), distractors: [frac(2, 3), frac(6, 5), frac(2, 5)] },
            { prompt: "A footbridge plank is formed from a \\( \\frac{2}{5} \\) m board and a \\( \\frac{1}{3} \\) m board joined end-to-end. What is the total plank length?", correct: frac(11, 15), distractors: [frac(3, 8), frac(1, 15), frac(4, 5)] },
            { prompt: "The clearance beneath the bridge must not exceed \\( \\frac{5}{9} \\) m of sag. Current sag measurements show \\( \\frac{1}{3} \\) m has already been corrected. How much sag correction remains?", correct: frac(2, 9), distractors: [frac(1, 2), frac(8, 9), frac(1, 3)] },
            { prompt: "A diagonal brace is built from a \\( \\frac{3}{8} \\) m rod and a \\( \\frac{1}{4} \\) m rod. What is the total brace length?", correct: frac(5, 8), distractors: [frac(1, 3), frac(1, 8), frac(3, 4)] },
            { prompt: "The total span to cross is \\( \\frac{4}{5} \\) m. A beam covering \\( \\frac{3}{10} \\) m has already been placed. How much span is left to cover?", correct: frac(1, 2), distractors: [frac(7, 15), frac(11, 10), frac(1, 1)] },
            { prompt: "Two small gusset plates measuring \\( \\frac{1}{6} \\) m and \\( \\frac{1}{4} \\) m are joined along one edge. What is the combined edge length?", correct: frac(5, 12), distractors: [frac(1, 5), frac(1, 12), frac(1, 2)] },
            { prompt: "The required beam span is \\( \\frac{7}{12} \\) m. An existing beam already covers \\( \\frac{1}{4} \\) m. How much additional beam length is needed?", correct: frac(1, 3), distractors: [frac(1, 2), frac(5, 6), frac(2, 3)] },
            { prompt: "A support strut is formed from a \\( \\frac{5}{12} \\) m section and a \\( \\frac{1}{3} \\) m section welded together. What is the total strut length?", correct: frac(3, 4), distractors: [frac(2, 5), frac(1, 12), frac(1, 1)] }
        ];

        // GAME STATE
        let currentIndex = 0;
        let score = 0;
        let integrity = 3;
        let activeQuestions = [];
        let isDarkMode = true;
        let isLocked = false;
        let playerName = '';

        function fracToLatex(f) {
            if (f.den === 1) return `\\( ${f.num} \\)`;
            return `\\( \\frac{${f.num}}{${f.den}} \\)`;
        }

        function fracKey(f) {
            return `${f.num}/${f.den}`;
        }

        // Theme Toggle
        function toggleTheme() {
            isDarkMode = !isDarkMode;
            const body = document.body;
            const btn = document.getElementById('themeBtn');

            if (isDarkMode) {
                body.classList.remove('light-mode');
                btn.innerText = '🌙 Dark Mode';
            } else {
                body.classList.add('light-mode');
                btn.innerText = '☀️ Light Mode';
            }
        }

        // MathJax Safe Re-render
        function renderMath() {
            if (window.MathJax && window.MathJax.startup && window.MathJax.startup.promise) {
                MathJax.startup.promise
                    .then(() => MathJax.typesetPromise())
                    .catch(err => console.warn('MathJax error:', err));
            }
        }

        function startGame() {
            const name = ArcadeKit.requireName('playerNameInput', 'playerNameError');
            if (!name) return;
            playerName = name;

            currentIndex = 0;
            score = 0;
            integrity = 3;
            activeQuestions = ArcadeKit.sample(beamBank, 12);

            document.getElementById('startScreen').style.display = 'none';
            document.getElementById('failScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'none';
            document.getElementById('gameScreen').style.display = 'block';

            loadBeam();
        }

        function loadBeam() {
            isLocked = false;
            document.getElementById('feedbackLine').innerText = '';

            const qData = activeQuestions[currentIndex];

            document.getElementById('beamHeader').innerText = `Beam Calculation ${currentIndex + 1}`;
            document.getElementById('roundCounter').innerText = `${currentIndex + 1} / ${activeQuestions.length}`;
            document.getElementById('scoreDisplay').innerText = `${score} PTS`;
            document.getElementById('integrityDisplay').innerText = `${integrity} / 3`;

            document.getElementById('spanText').innerHTML = qData.prompt;

            const allOptions = ArcadeKit.shuffle([qData.correct, ...qData.distractors]);
            const grid = document.getElementById('optionsGrid');
            grid.innerHTML = '';

            const keys = ['A', 'B', 'C', 'D'];
            allOptions.forEach((opt, idx) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.onclick = () => evaluateAnswer(opt, qData.correct, btn);
                btn.innerHTML = `
                    <span class="option-key">${keys[idx]}</span>
                    <span>${fracToLatex(opt)}</span>
                `;
                grid.appendChild(btn);
            });

            renderMath();
        }

        function evaluateAnswer(selectedFrac, correctFrac, btnEl) {
            if (isLocked) return;
            isLocked = true;

            const feedback = document.getElementById('feedbackLine');
            const isCorrect = fracKey(selectedFrac) === fracKey(correctFrac);

            if (isCorrect) {
                score += 100;
                btnEl.style.borderColor = 'var(--accent-green)';
                btnEl.style.background = 'rgba(74, 222, 128, 0.15)';
                feedback.className = 'feedback-line text-success';
                feedback.innerText = 'LOAD TEST PASSED // +100 PTS';

                setTimeout(() => {
                    currentIndex++;
                    if (currentIndex >= activeQuestions.length) {
                        triggerVictory();
                    } else {
                        loadBeam();
                    }
                }, 1100);

            } else {
                integrity--;
                btnEl.style.borderColor = 'var(--accent-red)';
                btnEl.style.background = 'rgba(240, 89, 106, 0.15)';
                feedback.className = 'feedback-line text-error';
                feedback.innerText = `STRUCTURAL MISCALCULATION // -1 INTEGRITY // Correct: ${correctFrac.num}/${correctFrac.den}`;

                document.getElementById('integrityDisplay').innerText = `${integrity} / 3`;

                if (integrity <= 0) {
                    setTimeout(() => {
                        triggerFail();
                    }, 1400);
                } else {
                    setTimeout(() => {
                        loadBeam();
                    }, 1600);
                }
            }
        }

        function triggerFail() {
            document.getElementById('gameScreen').style.display = 'none';
            document.getElementById('failScreen').style.display = 'flex';
            document.getElementById('failScore').innerText = score;
            ArcadeKit.showPlayerName(playerName, ['playerNameDisplayFail']);
        }

        function triggerVictory() {
            document.getElementById('gameScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'flex';
            document.getElementById('victoryScore').innerText = score;
            ArcadeKit.showPlayerName(playerName, ['playerNameDisplayWin']);
        }

        function restartGame() {
            startGame();
        }
