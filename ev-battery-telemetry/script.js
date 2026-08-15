        // TELEMETRY QUESTION BANK — Function Notation, Domain & Range
        // Every "evaluate" answer below was hand-computed and double-checked:
        //   f(x) = 2x^2 - 5x + 3, f(4)  = 2(16) - 20 + 3 = 15
        //   f(x) = -3x + 12, f(5)       = -15 + 12 = -3
        //   f(x) = x^2 - 4x + 1, f(3)   = 9 - 12 + 1 = -2
        //   f(x) = 0.5x^2 + x - 6, f(4) = 8 + 4 - 6 = 6
        //   f(x) = 4x - 7, f(-2)        = -8 - 7 = -15
        //   f(x) = x^2 + 2x - 8, f(-4)  = 16 - 8 - 8 = 0
        //   f(x) = 100 - 5x, f(12)      = 100 - 60 = 40
        //   f(x) = -2x^2 + 8x + 3, f(2) = -8 + 16 + 3 = 11
        //   f(x) = 3x^2 - x - 2, f(-1)  = 3 + 1 - 2 = 2
        //   f(x) = 90 - 0.25x^2, f(10)  = 90 - 25 = 65
        //   f(x) = 2x^2 + 3x - 1, f(0)  = -1
        //   f(x) = -4x + 50, f(10)      = -40 + 50 = 10
        //   f(x) = x^2 - 9, f(5)        = 25 - 9 = 16
        //   f(x) = 6x - x^2, f(2)       = 12 - 4 = 8
        //   f(x) = -0.5x^2 + 3x + 20, f(6) = -18 + 18 + 20 = 20
        //   f(x) = 2x^2 - 3x + 1, f(-2) = 8 + 6 + 1 = 15
        const telemetryBank = [
            {
                title: "Highway Discharge Curve",
                type: "evaluate",
                mapInput: "x = 4",
                text: "The battery discharge model is \\( f(x) = 2x^2 - 5x + 3 \\), where \\( x \\) is speed in tens of mph. Evaluate \\( f(4) \\).",
                options: ["15", "13", "17", "23"],
                correct: "15"
            },
            {
                title: "Linear Drain Rate",
                type: "evaluate",
                mapInput: "x = 5",
                text: "A cooling-system model is \\( f(x) = -3x + 12 \\). Evaluate \\( f(5) \\).",
                options: ["-3", "3", "-27", "9"],
                correct: "-3"
            },
            {
                title: "Regenerative Braking Curve",
                type: "evaluate",
                mapInput: "x = 3",
                text: "The regenerative braking energy model is \\( f(x) = x^2 - 4x + 1 \\). Evaluate \\( f(3) \\).",
                options: ["-2", "2", "10", "-14"],
                correct: "-2"
            },
            {
                title: "Torque Output Curve",
                type: "evaluate",
                mapInput: "x = 4",
                text: "Motor torque output is modeled by \\( f(x) = 0.5x^2 + x - 6 \\). Evaluate \\( f(4) \\).",
                options: ["6", "10", "-2", "14"],
                correct: "6"
            },
            {
                title: "Coolant Temperature Shift",
                type: "evaluate",
                mapInput: "x = -2",
                text: "A coolant offset function is \\( f(x) = 4x - 7 \\). Evaluate \\( f(-2) \\).",
                options: ["-15", "1", "-1", "15"],
                correct: "-15"
            },
            {
                title: "Cabin Climate Load",
                type: "evaluate",
                mapInput: "x = -4",
                text: "Cabin climate power draw is modeled by \\( f(x) = x^2 + 2x - 8 \\). Evaluate \\( f(-4) \\).",
                options: ["0", "-16", "8", "16"],
                correct: "0"
            },
            {
                title: "Highway Range Depletion",
                type: "evaluate",
                mapInput: "x = 12",
                text: "Battery percentage remaining after \\( x \\) minutes of highway driving is \\( f(x) = 100 - 5x \\). Evaluate \\( f(12) \\).",
                options: ["40", "60", "88", "35"],
                correct: "40"
            },
            {
                title: "Acceleration Curve",
                type: "evaluate",
                mapInput: "x = 2",
                text: "Acceleration power draw is modeled by \\( f(x) = -2x^2 + 8x + 3 \\). Evaluate \\( f(2) \\).",
                options: ["11", "19", "3", "27"],
                correct: "11"
            },
            {
                title: "Idle Drain Function",
                type: "evaluate",
                mapInput: "x = -1",
                text: "Idle power drain is modeled by \\( f(x) = 3x^2 - x - 2 \\). Evaluate \\( f(-1) \\).",
                options: ["2", "0", "-6", "4"],
                correct: "2"
            },
            {
                title: "Speed-Based Range Curve",
                type: "evaluate",
                mapInput: "x = 10",
                text: "Estimated remaining range (miles) at speed \\( x \\) (tens of mph) is \\( f(x) = 90 - 0.25x^2 \\). Evaluate \\( f(10) \\).",
                options: ["65", "70", "55", "80"],
                correct: "65"
            },
            {
                title: "Startup Diagnostic",
                type: "evaluate",
                mapInput: "x = 0",
                text: "The startup power curve is \\( f(x) = 2x^2 + 3x - 1 \\). Evaluate \\( f(0) \\).",
                options: ["-1", "0", "1", "2"],
                correct: "-1"
            },
            {
                title: "Descent Regeneration Curve",
                type: "evaluate",
                mapInput: "x = 10",
                text: "Downhill regeneration gain is modeled by \\( f(x) = -4x + 50 \\). Evaluate \\( f(10) \\).",
                options: ["10", "90", "40", "-10"],
                correct: "10"
            },
            {
                title: "Cell Degradation Curve",
                type: "evaluate",
                mapInput: "x = 5",
                text: "Cell wear factor is modeled by \\( f(x) = x^2 - 9 \\). Evaluate \\( f(5) \\).",
                options: ["16", "9", "25", "7"],
                correct: "16"
            },
            {
                title: "Traction Power Curve",
                type: "evaluate",
                mapInput: "x = 2",
                text: "Traction motor power draw is modeled by \\( f(x) = 6x - x^2 \\). Evaluate \\( f(2) \\).",
                options: ["8", "20", "4", "16"],
                correct: "8"
            },
            {
                title: "Range Recovery Curve",
                type: "evaluate",
                mapInput: "x = 6",
                text: "Battery range recovery (miles) is modeled by \\( f(x) = -0.5x^2 + 3x + 20 \\). Evaluate \\( f(6) \\).",
                options: ["20", "38", "2", "56"],
                correct: "20"
            },
            {
                title: "Fast-Charge Curve",
                type: "evaluate",
                mapInput: "x = -2",
                text: "A fast-charge calibration curve is \\( f(x) = 2x^2 - 3x + 1 \\). Evaluate \\( f(-2) \\).",
                options: ["15", "7", "17", "3"],
                correct: "15"
            },
            {
                title: "Drive-Time Domain Check",
                type: "concept",
                mapInput: "x",
                text: "The function \\( f(x) = 100 - 4x \\) models battery percentage remaining after \\( x \\) minutes of highway driving. The vehicle must stop and recharge after 25 minutes, and time cannot be negative. What is the most reasonable domain for this real-world model?",
                options: ["0 ≤ x ≤ 25", "All real numbers", "x > 0 only", "x ≤ 25 only"],
                correct: "0 ≤ x ≤ 25"
            },
            {
                title: "Charge-Rate Restriction",
                type: "concept",
                mapInput: "x",
                text: "A diagnostic function is \\( f(x) = \\dfrac{1}{x - 3} \\). Which value of \\( x \\) must be excluded from the domain because it makes the function undefined?",
                options: ["3", "-3", "0", "1"],
                correct: "3"
            },
            {
                title: "Charge-Time Domain",
                type: "concept",
                mapInput: "x",
                text: "A charge-time function is \\( f(x) = \\sqrt{x - 2} \\). For \\( f(x) \\) to output a real number, what is the domain?",
                options: ["x ≥ 2", "x ≤ 2", "x ≥ -2", "All real numbers"],
                correct: "x ≥ 2"
            },
            {
                title: "Discharge Range Check",
                type: "concept",
                mapInput: "x",
                text: "The discharge function \\( f(x) = 100 - 5x \\) is only graphed for \\( 0 \\le x \\le 20 \\) minutes, since the vehicle shuts off at 0% charge. What is the range of this function on that domain?",
                options: ["0 ≤ y ≤ 100", "0 ≤ y ≤ 20", "y ≤ 100", "All real numbers"],
                correct: "0 ≤ y ≤ 100"
            },
            {
                title: "Sensor Relation Check",
                type: "concept",
                mapInput: "x",
                text: "On a graph plotting speed (x) against battery drain rate (y), every speed value corresponds to exactly one drain rate. Which test confirms this relation is a function?",
                options: ["Vertical Line Test", "Horizontal Line Test", "Midpoint Test", "Distance Formula"],
                correct: "Vertical Line Test"
            },
            {
                title: "Invalid Input Diagnostic",
                type: "concept",
                mapInput: "x",
                text: "A charge-planning function only accepts battery percentages, so its domain is restricted to \\( 0 \\le x \\le 100 \\). If a technician tries to evaluate \\( f(150) \\), what does this mean?",
                options: [
                    "150 is outside the domain — not a valid input",
                    "150 is the correct output value",
                    "150 is inside the range of the function",
                    "150 is undefined only for negative numbers"
                ],
                correct: "150 is outside the domain — not a valid input"
            },
            {
                title: "Charging Rate Restriction",
                type: "concept",
                mapInput: "x",
                text: "A charge-time function is \\( f(x) = \\dfrac{240}{x} \\), where \\( x \\) is the charging rate in kW. Which value must be excluded from the domain, since it would make the function undefined?",
                options: ["0", "240", "1", "-1"],
                correct: "0"
            },
            {
                title: "Speed-Range Vertex Check",
                type: "concept",
                mapInput: "x",
                text: "The range function \\( f(x) = -0.1x^2 + 4x \\) models miles remaining based on speed \\( x \\) (mph), for \\( 0 \\le x \\le 40 \\). Since \\( f(0) = 0 \\), \\( f(40) = 0 \\), and the maximum occurs at \\( f(20) = 40 \\), what is the range of \\( f \\) on this domain?",
                options: ["0 ≤ y ≤ 40", "0 ≤ y ≤ 20", "-40 ≤ y ≤ 40", "All real numbers ≥ 0"],
                correct: "0 ≤ y ≤ 40"
            }
        ];

        const ROUNDS_PER_SESSION = 12;

        // GAME STATE
        let activeReadings = [];
        let currentReadingIndex = 0;
        let score = 0;
        let lives = 3;
        let isDarkMode = true;
        let isLocked = false;
        let playerName = '';

        // Theme Toggle
        function toggleTheme() {
            isDarkMode = !isDarkMode;
            const body = document.body;
            const icon = document.getElementById('themeIcon');
            const text = document.getElementById('themeText');

            if (isDarkMode) {
                body.classList.remove('light-mode');
                icon.innerText = '🌙';
                text.innerText = 'Dark Mode';
            } else {
                body.classList.add('light-mode');
                icon.innerText = '☀️';
                text.innerText = 'Light Mode';
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

        // Start Diagnostics
        function startDiagnostics() {
            const name = ArcadeKit.requireName('playerNameInput', 'playerNameError');
            if (!name) return;
            playerName = name;

            currentReadingIndex = 0;
            score = 0;
            lives = 3;
            activeReadings = ArcadeKit.sample(telemetryBank, ROUNDS_PER_SESSION);

            document.getElementById('startScreen').style.display = 'none';
            document.getElementById('failScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'none';
            document.getElementById('gameScreen').style.display = 'block';

            loadReading();
        }

        function livesDisplayText() {
            let out = '';
            for (let i = 0; i < 3; i++) {
                out += i < lives ? '🔋' : '⬛';
            }
            return out;
        }

        // Load Current Reading
        function loadReading() {
            isLocked = false;
            document.getElementById('feedbackLine').innerText = '';

            const rData = activeReadings[currentReadingIndex];

            document.getElementById('readingHeader').innerText = `Reading #${currentReadingIndex + 1}: ${rData.title}`;
            document.getElementById('readingCounter').innerText = `${currentReadingIndex + 1} / ${activeReadings.length}`;
            document.getElementById('scoreDisplay').innerText = `${score} PTS`;
            document.getElementById('livesDisplay').innerText = livesDisplayText();

            document.getElementById('mapInput').innerText = rData.mapInput;
            document.getElementById('mapOutput').innerText = '?';

            document.getElementById('telemetryText').innerHTML = rData.text;

            const shuffledOptions = ArcadeKit.shuffle(rData.options);
            const grid = document.getElementById('optionsGrid');
            grid.innerHTML = '';

            const keys = ['A', 'B', 'C', 'D'];
            shuffledOptions.forEach((optText, idx) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.onclick = () => evaluateAnswer(optText, rData.correct, btn);
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
                document.getElementById('mapOutput').innerText = correctOpt;
                btnEl.style.borderColor = 'var(--accent-green)';
                btnEl.style.background = 'rgba(52, 211, 153, 0.15)';
                feedback.className = 'feedback-line text-success';
                feedback.innerText = 'DIAGNOSTIC VERIFIED // +100 PTS';

                setTimeout(() => {
                    currentReadingIndex++;
                    if (currentReadingIndex >= activeReadings.length) {
                        triggerVictory();
                    } else {
                        loadReading();
                    }
                }, 1100);

            } else {
                lives--;
                btnEl.style.borderColor = 'var(--accent-red)';
                btnEl.style.background = 'rgba(248, 113, 113, 0.15)';
                feedback.className = 'feedback-line text-error';
                feedback.innerText = `FAULT DETECTED // -1 BATTERY CELL // Correct answer: ${correctOpt}`;

                document.getElementById('livesDisplay').innerText = livesDisplayText();

                if (lives <= 0) {
                    setTimeout(() => {
                        triggerFail();
                    }, 1200);
                } else {
                    setTimeout(() => {
                        loadReading();
                    }, 1400);
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

        function restartDiagnostics() {
            startDiagnostics();
        }
