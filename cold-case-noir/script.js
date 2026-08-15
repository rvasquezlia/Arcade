        // QUESTION BANK (Coordinates, Scientific Notation, Keyword Translations)
        const caseFiles = [
            {
                title: "Crime Scene Quadrant",
                evidence: "A suspect was spotted fleeing from initial coordinate \\( A(-6, 8) \\) to point \\( B(-6, -4) \\) on the city grid map. In which quadrant did the suspect end up?",
                options: ["Quadrant III", "Quadrant I", "Quadrant II", "Quadrant IV"],
                correct: "Quadrant III"
            },
            {
                title: "Grid Reflection Cipher",
                evidence: "A radio transmitter coordinate was mapped at \\( P(3, -5) \\). If the signal was reflected across the x-axis to obscure the origin, what are the new coordinates?",
                options: ["\\( (3, 5) \\)", "\\( (-3, -5) \\)", "\\( (-3, 5) \\)", "\\( (5, -3) \\)"],
                correct: "\\( (3, 5) \\)"
            },
            {
                title: "Forensic Evidence Measurement",
                evidence: "Trace fiber evidence gathered under a microscope measured \\( 0.00000038 \\text{ meters} \\). How should this be logged in scientific notation?",
                options: ["\\( 3.8 \\times 10^{-7} \\text{ m} \\)", "\\( 3.8 \\times 10^{-6} \\text{ m} \\)", "\\( 38 \\times 10^{-8} \\text{ m} \\)", "\\( 3.8 \\times 10^{7} \\text{ m} \\)"],
                correct: "\\( 3.8 \\times 10^{-7} \\text{ m} \\)"
            },
            {
                title: "Server Log Expansion",
                evidence: "The precinct server analyzed a digital footprint consisting of \\( 4.5 \\times 10^6 \\) access logs. What is this volume in standard integer form?",
                options: ["\\( 4,500,000 \\)", "\\( 450,000 \\)", "\\( 45,000,000 \\)", "\\( 4,050,000 \\)"],
                correct: "\\( 4,500,000 \\)"
            },
            {
                title: "Chemical Mass Comparison",
                evidence: "Two chemical samples were recovered: Sample Alpha is \\( 2.4 \\times 10^{-4} \\text{ g} \\) and Sample Beta is \\( 9.1 \\times 10^{-5} \\text{ g} \\). Which sample holds greater mass?",
                options: ["Sample Alpha", "Sample Beta", "Both are equal", "Cannot be determined"],
                correct: "Sample Alpha"
            },
            {
                title: "Encrypted Note Cipher",
                evidence: "An encrypted note reads: 'Four times the suspect's age, diminished by 9, equals 67'. Which equation matches this clue?",
                options: ["\\( 4a - 9 = 67 \\)", "\\( 9 - 4a = 67 \\)", "\\( 4(a - 9) = 67 \\)", "\\( 4a + 9 = 67 \\)"],
                correct: "\\( 4a - 9 = 67 \\)"
            },
            {
                title: "Informant Translation",
                evidence: "Translate the informant's statement: 'The quotient of a distance \\( d \\) and 6, increased by 11, yields 25'.",
                options: ["\\( \\frac{d}{6} + 11 = 25 \\)", "\\( \\frac{6}{d} + 11 = 25 \\)", "\\( 6d + 11 = 25 \\)", "\\( \\frac{d + 11}{6} = 25 \\)"],
                correct: "\\( \\frac{d}{6} + 11 = 25 \\)"
            },
            {
                title: "Getaway Velocity Equation",
                evidence: "A getaway vehicle traveled at a speed where '12 less than twice the speed limit \\( s \\) equals 98 mph'. Write the equation:",
                options: ["\\( 2s - 12 = 98 \\)", "\\( 12 - 2s = 98 \\)", "\\( 2(s - 12) = 98 \\)", "\\( 2s + 12 = 98 \\)"],
                correct: "\\( 2s - 12 = 98 \\)"
            },
            {
                title: "Evidence Marker Distance",
                evidence: "Evidence Marker 1 is placed at \\( (-3, 4) \\) and Evidence Marker 2 is at \\( (5, 4) \\). What is the straight-line grid distance between them?",
                options: ["\\( 8 \\text{ units} \\)", "\\( 2 \\text{ units} \\)", "\\( 6 \\text{ units} \\)", "\\( 10 \\text{ units} \\)"],
                correct: "\\( 8 \\text{ units} \\)"
            },
            {
                title: "Microscopic Residue",
                evidence: "Residue mass is recorded as \\( 6.02 \\times 10^{-5} \\text{ grams} \\). Express this in standard decimal notation:",
                options: ["\\( 0.0000602 \\)", "\\( 0.000602 \\)", "\\( 0.00000602 \\)", "\\( 0.0602 \\)"],
                correct: "\\( 0.0000602 \\)"
            }
        ];

        // GAME STATE
        let currentFileIndex = 0;
        let score = 0;
        let integrity = 3;
        let activeCases = [];
        let isDarkMode = true;
        let isLocked = false;

        // Fisher-Yates Array Shuffle
        function shuffleArray(arr) {
            const temp = [...arr];
            for (let i = temp.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [temp[i], temp[j]] = [temp[j], temp[i]];
            }
            return temp;
        }

        // Theme Toggle
        function toggleTheme() {
            isDarkMode = !isDarkMode;
            const body = document.body;
            const btn = document.getElementById('themeBtn');

            if (isDarkMode) {
                body.classList.remove('light-mode');
                btn.innerText = '[ DARK MODE ]';
            } else {
                body.classList.add('light-mode');
                btn.innerText = '[ LIGHT MODE ]';
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

        // Start Investigation
        function startInvestigation() {
            currentFileIndex = 0;
            score = 0;
            integrity = 3;
            activeCases = shuffleArray(caseFiles);

            document.getElementById('startScreen').style.display = 'none';
            document.getElementById('failScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'none';
            document.getElementById('gameScreen').style.display = 'block';

            loadCase();
        }

        // Load Current Case File
        function loadCase() {
            isLocked = false;
            document.getElementById('feedbackLine').innerText = '';

            const cData = activeCases[currentFileIndex];

            // Update Status Bar
            document.getElementById('caseHeader').innerText = `Case File #${currentFileIndex + 1}: ${cData.title}`;
            document.getElementById('fileCounter').innerText = `${currentFileIndex + 1} / ${activeCases.length}`;
            document.getElementById('scoreDisplay').innerText = `${score} PTS`;
            document.getElementById('integrityDisplay').innerText = `${integrity} / 3`;

            // Render Evidence Text
            document.getElementById('evidenceText').innerHTML = cData.evidence;

            // Randomize & Render Options
            const shuffledOptions = shuffleArray(cData.options);
            const grid = document.getElementById('optionsGrid');
            grid.innerHTML = '';

            const keys = ['A', 'B', 'C', 'D'];
            shuffledOptions.forEach((optText, idx) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.onclick = () => evaluateAnswer(optText, cData.correct, btn);
                btn.innerHTML = `
                    <span class="option-key">${keys[idx]}</span>
                    <span>${optText}</span>
                `;
                grid.appendChild(btn);
            });

            renderMath();
        }

        // Evaluate Answer Choice
        function evaluateAnswer(selectedOpt, correctOpt, btnEl) {
            if (isLocked) return;
            isLocked = true;

            const feedback = document.getElementById('feedbackLine');

            if (selectedOpt === correctOpt) {
                score += 100;
                btnEl.style.borderColor = 'var(--accent-green)';
                btnEl.style.background = 'rgba(22, 163, 74, 0.15)';
                feedback.className = 'feedback-line text-success';
                feedback.innerText = 'VERIFIED EVIDENCE // +100 PTS';

                setTimeout(() => {
                    currentFileIndex++;
                    if (currentFileIndex >= activeCases.length) {
                        triggerVictory();
                    } else {
                        loadCase();
                    }
                }, 1100);

            } else {
                integrity--;
                btnEl.style.borderColor = 'var(--accent-red)';
                btnEl.style.background = 'rgba(220, 38, 38, 0.15)';
                feedback.className = 'feedback-line text-error';
                feedback.innerText = 'MISLEADING LEAD // -1 INTEGRITY';

                document.getElementById('integrityDisplay').innerText = `${integrity} / 3`;

                if (integrity <= 0) {
                    setTimeout(() => {
                        triggerFail();
                    }, 1000);
                } else {
                    setTimeout(() => {
                        loadCase();
                    }, 1200);
                }
            }
        }

        function triggerFail() {
            document.getElementById('gameScreen').style.display = 'none';
            document.getElementById('failScreen').style.display = 'flex';
            document.getElementById('failScore').innerText = score;
        }

        function triggerVictory() {
            document.getElementById('gameScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'flex';
            document.getElementById('victoryScore').innerText = score;
        }

        function restartInvestigation() {
            startInvestigation();
        }
    
