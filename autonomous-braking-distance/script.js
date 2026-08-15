        // TEST TRACK QUESTION BANK — Discriminant & Quadratic Formula
        //
        // DISCRIMINANT ITEMS: D = b^2 - 4ac, hand-verified:
        //   D1.  x^2-5x+6=0     -> D=25-24=1    (>0)  -> 2 real roots
        //   D2.  x^2+4x+4=0     -> D=16-16=0    (=0)  -> 1 real root
        //   D3.  x^2+2x+5=0     -> D=4-20=-16   (<0)  -> 0 real roots
        //   D4.  2x^2-3x-5=0    -> D=9+40=49    (>0)  -> 2 real roots
        //   D5.  x^2-6x+9=0     -> D=36-36=0    (=0)  -> 1 real root
        //   D6.  3x^2+2x+4=0    -> D=4-48=-44   (<0)  -> 0 real roots
        //   D7.  x^2+x-12=0     -> D=1+48=49    (>0)  -> 2 real roots
        //   D8.  4x^2-4x+1=0    -> D=16-16=0    (=0)  -> 1 real root
        //   D9.  2x^2+5x+7=0    -> D=25-56=-31  (<0)  -> 0 real roots
        //   D10. x^2-7x+10=0    -> D=49-40=9    (>0)  -> 2 real roots
        //
        // QUADRATIC-FORMULA ITEMS: x = (-b +/- sqrt(D)) / 2a, hand-verified
        // (each equation is built so exactly one root is positive):
        //   Q1. x^2-3x-10=0   -> D=9+40=49,  sqrt=7,  x=(3+-7)/2  -> 5, -2   -> positive root 5
        //   Q2. x^2-x-12=0    -> D=1+48=49,  sqrt=7,  x=(1+-7)/2  -> 4, -3   -> positive root 4
        //   Q3. x^2-5x-6=0    -> D=25+24=49, sqrt=7,  x=(5+-7)/2  -> 6, -1   -> positive root 6
        //   Q4. x^2+5x-24=0   -> D=25+96=121,sqrt=11, x=(-5+-11)/2-> 3, -8   -> positive root 3
        //   Q5. x^2-3x-28=0   -> D=9+112=121,sqrt=11, x=(3+-11)/2 -> 7, -4   -> positive root 7
        //   Q6. 2x^2-3x-2=0   -> D=9+16=25,  sqrt=5,  x=(3+-5)/4  -> 2, -0.5 -> positive root 2
        //   Q7. x^2-7x-18=0   -> D=49+72=121,sqrt=11, x=(7+-11)/2 -> 9, -2   -> positive root 9
        //   Q8. x^2+5x-6=0    -> D=25+24=49, sqrt=7,  x=(-5+-7)/2 -> 1, -6   -> positive root 1
        //   Q9. 3x^2+5x-2=0   -> D=25+24=49, sqrt=7,  x=(-5+-7)/6 -> 1/3, -2-> positive root 1/3
        //   Q10.x^2-7x-30=0   -> D=49+120=169,sqrt=13,x=(7+-13)/2 -> 10, -3 -> positive root 10
        const testBank = [
            { type: "discriminant", title: "Dry Pavement Check", a: 1, b: -5, c: 6, correct: "2 real roots" },
            { type: "discriminant", title: "Wet Road Threshold", a: 1, b: 4, c: 4, correct: "1 real root (repeated)" },
            { type: "discriminant", title: "Sensor Blind Spot", a: 1, b: 2, c: 5, correct: "0 real roots" },
            { type: "discriminant", title: "Highway Merge Check", a: 2, b: -3, c: -5, correct: "2 real roots" },
            { type: "discriminant", title: "Ice Patch Threshold", a: 1, b: -6, c: 9, correct: "1 real root (repeated)" },
            { type: "discriminant", title: "Fog Delay Diagnostic", a: 3, b: 2, c: 4, correct: "0 real roots" },
            { type: "discriminant", title: "Curve Approach Check", a: 1, b: 1, c: -12, correct: "2 real roots" },
            { type: "discriminant", title: "Emergency Stop Threshold", a: 4, b: -4, c: 1, correct: "1 real root (repeated)" },
            { type: "discriminant", title: "Low-Traction Diagnostic", a: 2, b: 5, c: 7, correct: "0 real roots" },
            { type: "discriminant", title: "School Zone Check", a: 1, b: -7, c: 10, correct: "2 real roots" },

            { type: "solve", title: "Intersection Approach", a: 1, b: -3, c: -10, correct: "5", options: ["5", "-2", "7", "2"] },
            { type: "solve", title: "Parking Sensor Range", a: 1, b: -1, c: -12, correct: "4", options: ["4", "-3", "6", "1"] },
            { type: "solve", title: "Downhill Stop Check", a: 1, b: -5, c: -6, correct: "6", options: ["6", "-1", "11", "2.5"] },
            { type: "solve", title: "Roundabout Entry", a: 1, b: 5, c: -24, correct: "3", options: ["3", "-8", "11", "5"] },
            { type: "solve", title: "Crosswalk Trigger", a: 1, b: -3, c: -28, correct: "7", options: ["7", "-4", "11", "3"] },
            { type: "solve", title: "Wet-Surface Recalibration", a: 2, b: -3, c: -2, correct: "2", options: ["2", "-0.5", "4", "1.5"] },
            { type: "solve", title: "Night Vision Trigger", a: 1, b: -7, c: -18, correct: "9", options: ["9", "-2", "11", "7"] },
            { type: "solve", title: "Bike Lane Buffer", a: 1, b: 5, c: -6, correct: "1", options: ["1", "-6", "7", "-1"] },
            { type: "solve", title: "Construction Zone Limit", a: 3, b: 5, c: -2, correct: "1/3", options: ["1/3", "-2", "5/6", "7/6"] },
            { type: "solve", title: "Highway Off-Ramp Check", a: 1, b: -7, c: -30, correct: "10", options: ["10", "-3", "13", "7"] }
        ];

        const DISCRIMINANT_OPTIONS = ["0 real roots", "1 real root (repeated)", "2 real roots", "3 real roots"];
        const ROUNDS_PER_SESSION = 12;

        // GAME STATE
        let activeTests = [];
        let currentTestIndex = 0;
        let score = 0;
        let lives = 3;
        let isDarkMode = true;
        let isLocked = false;
        let playerName = '';

        function discriminantOf(qData) {
            return qData.b * qData.b - 4 * qData.a * qData.c;
        }

        function classify(D) {
            if (D > 0) return "2 real roots";
            if (D === 0) return "1 real root (repeated)";
            return "0 real roots";
        }

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

        function renderMath() {
            if (window.MathJax && window.MathJax.startup && window.MathJax.startup.promise) {
                MathJax.startup.promise
                    .then(() => MathJax.typesetPromise())
                    .catch(err => console.warn('MathJax error:', err));
            }
        }

        function formatQuadraticEq(qData) {
            const aStr = qData.a === 1 ? '' : qData.a;
            const bSign = qData.b >= 0 ? '+' : '-';
            const bAbs = Math.abs(qData.b);
            const cSign = qData.c >= 0 ? '+' : '-';
            const cAbs = Math.abs(qData.c);
            return `\\( ${aStr}x^2 ${bSign} ${bAbs}x ${cSign} ${cAbs} = 0 \\)`;
        }

        function livesDisplayText() {
            let out = '';
            for (let i = 0; i < 3; i++) {
                out += i < lives ? '⚙️' : '⬛';
            }
            return out;
        }

        function startTestSession() {
            const name = ArcadeKit.requireName('playerNameInput', 'playerNameError');
            if (!name) return;
            playerName = name;

            currentTestIndex = 0;
            score = 0;
            lives = 3;
            activeTests = ArcadeKit.sample(testBank, ROUNDS_PER_SESSION);

            document.getElementById('startScreen').style.display = 'none';
            document.getElementById('failScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'none';
            document.getElementById('gameScreen').style.display = 'block';

            loadTest();
        }

        function setStatusLight(cls, label) {
            const light = document.getElementById('statusLight');
            light.className = 'status-light ' + cls;
            document.getElementById('statusLightLabel').innerText = label;
        }

        function loadTest() {
            isLocked = false;
            document.getElementById('feedbackLine').innerText = '';
            setStatusLight('light-neutral', 'DISCRIMINANT STANDBY');

            const qData = activeTests[currentTestIndex];

            document.getElementById('testHeader').innerText = `Test #${currentTestIndex + 1}: ${qData.title}`;
            document.getElementById('testCounter').innerText = `${currentTestIndex + 1} / ${activeTests.length}`;
            document.getElementById('scoreDisplay').innerText = `${score} PTS`;
            document.getElementById('livesDisplay').innerText = livesDisplayText();

            document.getElementById('equationText').innerHTML = formatQuadraticEq(qData);

            let options;
            if (qData.type === 'discriminant') {
                document.getElementById('promptLine').innerText =
                    'Compute the discriminant b² - 4ac and classify the number of real roots.';
                options = DISCRIMINANT_OPTIONS;
            } else {
                document.getElementById('promptLine').innerText =
                    'Solve using the quadratic formula. What is the positive root?';
                options = qData.options;
            }

            const shuffledOptions = ArcadeKit.shuffle(options);
            const grid = document.getElementById('optionsGrid');
            grid.innerHTML = '';

            const keys = ['A', 'B', 'C', 'D'];
            shuffledOptions.forEach((optText, idx) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.onclick = () => evaluateAnswer(optText, qData, btn);
                btn.innerHTML = `
                    <span class="option-key">${keys[idx]}</span>
                    <span>${optText}</span>
                `;
                grid.appendChild(btn);
            });

            renderMath();
        }

        function evaluateAnswer(selectedOpt, qData, btnEl) {
            if (isLocked) return;
            isLocked = true;

            const feedback = document.getElementById('feedbackLine');
            const D = discriminantOf(qData);
            const actualClass = classify(D);
            const lightCls = D > 0 ? 'light-green' : (D === 0 ? 'light-amber' : 'light-red');
            setStatusLight(lightCls, `D = ${D} → ${actualClass.toUpperCase()}`);

            const isCorrect = selectedOpt === qData.correct;

            if (isCorrect) {
                score += 100;
                btnEl.style.borderColor = 'var(--accent-green)';
                btnEl.style.background = 'rgba(74, 222, 128, 0.15)';
                feedback.className = 'feedback-line text-success';
                feedback.innerText = 'DIAGNOSTIC PASSED // +100 PTS';

                setTimeout(() => {
                    currentTestIndex++;
                    if (currentTestIndex >= activeTests.length) {
                        triggerVictory();
                    } else {
                        loadTest();
                    }
                }, 1300);

            } else {
                lives--;
                btnEl.style.borderColor = 'var(--accent-red)';
                btnEl.style.background = 'rgba(248, 113, 113, 0.15)';
                feedback.className = 'feedback-line text-error';
                feedback.innerText = `DIAGNOSTIC FAILED // -1 INTEGRITY // Correct answer: ${qData.correct}`;

                document.getElementById('livesDisplay').innerText = livesDisplayText();

                if (lives <= 0) {
                    setTimeout(() => {
                        triggerFail();
                    }, 1400);
                } else {
                    setTimeout(() => {
                        currentTestIndex++;
                        if (currentTestIndex >= activeTests.length) {
                            triggerVictory();
                        } else {
                            loadTest();
                        }
                    }, 1700);
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

        function restartTestSession() {
            startTestSession();
        }
