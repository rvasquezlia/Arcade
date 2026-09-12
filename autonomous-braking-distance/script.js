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

        const ROUNDS_PER_SESSION = 12;

        // Fixed gauge domains (per round type) — these stay constant across
        // every round of that type, so the needle's TARGET position actually
        // moves around the gauge from round to round based on the real
        // magnitude of that round's correct answer, instead of always
        // landing in the same spot.
        const DOMAIN_DISCRIMINANT = [-50, 130]; // covers every D in the bank (-44..121) with padding
        const DOMAIN_SOLVE = [0, 12];           // covers every positive root in the bank (1/3..10) with padding

        const ZONE_WIDTH_FRACTION = 0.20;  // safe zone spans 20% of the gauge — generous
        const GAUGE_PERIOD_MS = 3800;       // one full sweep (left->right->left)
        const QTE_TIMEOUT_MS = 8500;        // auto-resolve (as a miss) if no brake press

        // GAME STATE
        let activeTests = [];
        let currentTestIndex = 0;
        let score = 0;
        let lives = 3;
        let isDarkMode = true;
        let playerName = '';

        let roundPhase = 'idle'; // 'calc' | 'qte' | 'resolved' | 'idle'
        let currentQ = null;
        let currentTarget = 0;
        let calcWasCorrect = false;
        let qteResolved = false;

        let gaugeAnimId = null;
        let gaugeStartTime = 0;
        let currentNeedleP = 0;

        // Every setTimeout this game schedules gets tracked here so a
        // restart can wipe them all out — otherwise old rounds' timers
        // could fire after a restart and stack animations/state changes.
        let activeTimers = [];

        function setRoundTimeout(fn, ms) {
            const id = setTimeout(() => {
                activeTimers = activeTimers.filter((t) => t !== id);
                fn();
            }, ms);
            activeTimers.push(id);
            return id;
        }

        function clearAllTimers() {
            activeTimers.forEach((id) => clearTimeout(id));
            activeTimers = [];
        }

        function stopGaugeLoop() {
            if (gaugeAnimId !== null) {
                cancelAnimationFrame(gaugeAnimId);
                gaugeAnimId = null;
            }
        }

        function clamp(v, lo, hi) {
            return Math.max(lo, Math.min(hi, v));
        }

        function pick(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }

        function discriminantOf(qData) {
            return qData.b * qData.b - 4 * qData.a * qData.c;
        }

        function classify(D) {
            if (D > 0) return "2 real roots";
            if (D === 0) return "1 real root (repeated)";
            return "0 real roots";
        }

        // Parses "5", "-0.5", or a fraction like "1/3" into a plain number.
        function parseFractionOrNumber(s) {
            if (typeof s === 'number') return s;
            const str = String(s).trim();
            if (str.includes('/')) {
                const parts = str.split('/');
                return Number(parts[0]) / Number(parts[1]);
            }
            return parseFloat(str);
        }

        function computeTarget(qData) {
            return qData.type === 'discriminant' ? discriminantOf(qData) : parseFractionOrNumber(qData.correct);
        }

        function domainFor(qData) {
            return qData.type === 'discriminant' ? DOMAIN_DISCRIMINANT : DOMAIN_SOLVE;
        }

        // Where (0..1 across the gauge) does this round's correct answer sit,
        // and how wide (0..1) is the forgiving safe-zone window around it?
        function zoneBounds(qData, target) {
            const [dMin, dMax] = domainFor(qData);
            const centerP = clamp((target - dMin) / (dMax - dMin), 0, 1);
            const half = ZONE_WIDTH_FRACTION / 2;
            return { start: clamp(centerP - half, 0, 1), end: clamp(centerP + half, 0, 1), center: centerP };
        }

        // ---- FLAVOR TEXT (nervous student driver + dry robot-car AI) ----
        const AI_CALC_CORRECT = [
            "CALCULATION VERIFIED. TRAJECTORY DATA ACCEPTED.",
            "MATH CHECKS OUT. PROCEEDING TO BRAKE TEST.",
            "CONFIRMED. I TRUST YOU 10% MORE NOW."
        ];
        const AI_CALC_WRONG = [
            "CALCULATION REJECTED. BRAKE SENSORS NOW BLIND.",
            "THAT NUMBER IS NOT IT. GOOD LUCK GUESSING THE ZONE.",
            "MATH ERROR LOGGED. HOPE YOU LIKE CONES."
        ];
        const SUCCESS_LINES = [
            "🚗💨 Clean stop! The cone lives to see another lap.",
            "Textbook braking. Student driver promoted to Cadet.",
            "Smooth as fresh asphalt. Nailed it!"
        ];
        const CRASH_LINES_BAD_TIMING = [
            "🚧💥 Right math, wrong moment. The cone got you anyway.",
            "So close! Your thumb just wasn't ready. BONK.",
            "The zone was RIGHT there. Reflexes said no."
        ];
        const CRASH_LINES_BAD_MATH = [
            "🚧💥 Braking blind never works out. BONK.",
            "Wrong number, wrong spot, cone says hi.",
            "Math error + guesswork = one flattened cone."
        ];

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

            clearAllTimers();
            stopGaugeLoop();
            qteResolved = false;
            roundPhase = 'idle';

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
            roundPhase = 'calc';
            qteResolved = false;
            stopGaugeLoop();

            document.getElementById('feedbackLine').innerText = '';
            document.getElementById('calcFeedback').innerText = '';
            document.getElementById('calcFeedback').className = 'calc-feedback';
            document.getElementById('calcInputError').style.display = 'none';
            setStatusLight('light-neutral', 'SYSTEM STANDBY');

            const qData = activeTests[currentTestIndex];
            currentQ = qData;
            currentTarget = computeTarget(qData);

            document.getElementById('testHeader').innerText = `Test #${currentTestIndex + 1}: ${qData.title}`;
            document.getElementById('testCounter').innerText = `${currentTestIndex + 1} / ${activeTests.length}`;
            document.getElementById('scoreDisplay').innerText = `${score} PTS`;
            document.getElementById('livesDisplay').innerText = livesDisplayText();

            document.getElementById('equationText').innerHTML = formatQuadraticEq(qData);

            if (qData.type === 'discriminant') {
                document.getElementById('promptLine').innerText =
                    'Compute the discriminant b² - 4ac. Type its value below (can be negative).';
            } else {
                document.getElementById('promptLine').innerText =
                    'Solve using the quadratic formula. Type the positive root below (decimals OK).';
            }

            // Reset phase 1 (calc) controls
            const answerInput = document.getElementById('answerInput');
            answerInput.value = '';
            answerInput.disabled = false;
            const submitBtn = document.getElementById('submitAnswerBtn');
            submitBtn.disabled = false;
            submitBtn.innerText = 'LOCK IN 🔒';

            // Reset phase 2 (QTE) controls
            document.getElementById('qtePhase').style.display = 'none';
            const brakeBtn = document.getElementById('brakeBtn');
            brakeBtn.disabled = false;

            // Reset the car/cone track
            const trackStage = document.getElementById('trackStage');
            trackStage.style.display = 'none';
            const carEl = document.getElementById('carEl');
            carEl.classList.remove('car-crash');
            carEl.style.transition = 'none';
            carEl.style.left = '2%';
            // Force reflow so the next transition (set later) actually animates
            // instead of jumping straight to its target.
            void carEl.offsetWidth;
            carEl.style.transition = '';
            document.getElementById('hazardEl').textContent = '🚧';

            renderMath();
            answerInput.focus();
        }

        function submitAnswer() {
            if (roundPhase !== 'calc') return;

            const answerInput = document.getElementById('answerInput');
            const raw = answerInput.value.trim();
            const value = parseFloat(raw);

            if (raw === '' || Number.isNaN(value)) {
                document.getElementById('calcInputError').style.display = 'block';
                answerInput.focus();
                return;
            }
            document.getElementById('calcInputError').style.display = 'none';

            const tolerance = Math.max(0.05, Math.abs(currentTarget) * 0.02);
            calcWasCorrect = Math.abs(value - currentTarget) <= tolerance;

            answerInput.disabled = true;
            document.getElementById('submitAnswerBtn').disabled = true;

            const calcFeedback = document.getElementById('calcFeedback');
            const D = currentQ.type === 'discriminant' ? currentTarget : discriminantOf(currentQ);
            const revealText = currentQ.type === 'discriminant'
                ? `Actual discriminant: ${currentTarget} → ${classify(currentTarget)}`
                : `Actual positive root: ${currentQ.correct} (D = ${D})`;

            if (calcWasCorrect) {
                setStatusLight('light-green', 'CALCULATION VERIFIED');
                calcFeedback.className = 'calc-feedback text-success';
                calcFeedback.innerText = `${pick(AI_CALC_CORRECT)} ${revealText}`;
            } else {
                setStatusLight('light-red', 'CALCULATION ERROR');
                calcFeedback.className = 'calc-feedback text-error';
                calcFeedback.innerText = `${pick(AI_CALC_WRONG)} ${revealText}`;
            }

            setRoundTimeout(startQtePhase, 1100);
        }

        function startQtePhase() {
            roundPhase = 'qte';
            qteResolved = false;

            const qteHint = document.getElementById('qteHint');
            qteHint.innerText = calcWasCorrect
                ? '🟢 SAFE ZONE LOCKED — hit BRAKE (or SPACE) the instant the needle is in the green!'
                : '🔴 SENSOR OFFLINE — your math was off, so you\'re braking blind. Good luck!';

            document.getElementById('qtePhase').style.display = 'block';
            document.getElementById('brakeBtn').disabled = false;

            gaugeStartTime = performance.now();
            gaugeAnimId = requestAnimationFrame(drawGaugeFrame);

            setRoundTimeout(() => {
                if (roundPhase === 'qte' && !qteResolved) {
                    resolveBrake(null);
                }
            }, QTE_TIMEOUT_MS);
        }

        // Reads a live CSS custom property so the canvas always matches the
        // current theme (dark/light) instead of ever hardcoding a color.
        function themeColor(varName, fallback) {
            const v = getComputedStyle(document.body).getPropertyValue(varName).trim();
            return v || fallback;
        }

        function drawGaugeFrame(now) {
            if (roundPhase !== 'qte') return; // round already resolved elsewhere — stop drawing

            const elapsed = now - gaugeStartTime;
            const omega = (2 * Math.PI) / GAUGE_PERIOD_MS;
            const p = (1 - Math.cos(elapsed * omega)) / 2; // sweeps 0 -> 1 -> 0 smoothly
            currentNeedleP = p;

            const canvas = document.getElementById('brakeGauge');
            const ctx = canvas.getContext('2d');
            const W = canvas.width, H = canvas.height;
            const cx = W / 2, cy = H - 20, r = 190;

            const bgColor = themeColor('--card-bg', '#0e161f');
            const trackColor = themeColor('--border-color', '#1c2b38');
            const needleColor = calcWasCorrect ? themeColor('--accent-blue', '#3b82f6') : themeColor('--accent-red', '#f87171');
            const zoneColor = themeColor('--accent-green', '#4ade80');
            const textColor = themeColor('--text-secondary', '#6f8598');

            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, W, H);

            // Background arc track
            ctx.beginPath();
            ctx.arc(cx, cy, r, Math.PI, 2 * Math.PI);
            ctx.strokeStyle = trackColor;
            ctx.lineWidth = 26;
            ctx.lineCap = 'butt';
            ctx.stroke();

            // Safe zone (only rendered as a real hint when the calc was correct)
            if (calcWasCorrect) {
                const { start, end } = zoneBounds(currentQ, currentTarget);
                ctx.beginPath();
                ctx.arc(cx, cy, r, Math.PI + start * Math.PI, Math.PI + end * Math.PI);
                ctx.strokeStyle = zoneColor;
                ctx.lineWidth = 26;
                ctx.stroke();
            }

            // Domain endpoint labels for orientation
            ctx.fillStyle = textColor;
            ctx.font = '11px "Fira Code", monospace';
            ctx.textAlign = 'left';
            ctx.fillText('◀ LOW', cx - r - 10, cy + 16);
            ctx.textAlign = 'right';
            ctx.fillText('HIGH ▶', cx + r + 10, cy + 16);

            // Needle
            const angle = Math.PI + p * Math.PI;
            const needleLen = r - 20;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + needleLen * Math.cos(angle), cy + needleLen * Math.sin(angle));
            ctx.strokeStyle = needleColor;
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(cx, cy, 9, 0, 2 * Math.PI);
            ctx.fillStyle = needleColor;
            ctx.fill();

            gaugeAnimId = requestAnimationFrame(drawGaugeFrame);
        }

        function handleBrake() {
            if (roundPhase !== 'qte' || qteResolved) return;
            resolveBrake(currentNeedleP);
        }

        function resolveBrake(needleP) {
            if (qteResolved) return;
            qteResolved = true;
            roundPhase = 'resolved';
            stopGaugeLoop();

            document.getElementById('brakeBtn').disabled = true;
            document.getElementById('qtePhase').style.display = 'none';

            let timingGood = false;
            if (needleP !== null && calcWasCorrect) {
                const { start, end } = zoneBounds(currentQ, currentTarget);
                timingGood = needleP >= start && needleP <= end;
            }
            const success = calcWasCorrect && timingGood;

            animateResult(success, needleP === null);
        }

        function animateResult(success, timedOut) {
            const trackStage = document.getElementById('trackStage');
            const carEl = document.getElementById('carEl');
            const hazardEl = document.getElementById('hazardEl');
            trackStage.style.display = 'block';

            if (success) {
                carEl.style.left = '64%';
            } else {
                carEl.style.left = '79%';
                setRoundTimeout(() => {
                    carEl.classList.add('car-crash');
                    hazardEl.textContent = '💥';
                }, 850);
            }

            setRoundTimeout(() => finalizeRound(success, timedOut), success ? 1100 : 1500);
        }

        function finalizeRound(success, timedOut) {
            const feedback = document.getElementById('feedbackLine');

            if (success) {
                score += 100;
                feedback.className = 'feedback-line text-success';
                feedback.innerText = `${pick(SUCCESS_LINES)} // +100 PTS`;
                document.getElementById('scoreDisplay').innerText = `${score} PTS`;
            } else {
                lives--;
                feedback.className = 'feedback-line text-error';
                if (!calcWasCorrect) {
                    feedback.innerText = `${pick(CRASH_LINES_BAD_MATH)} // -1 INTEGRITY`;
                } else if (timedOut) {
                    feedback.innerText = `⏱️ Too slow to brake at all! // -1 INTEGRITY`;
                } else {
                    feedback.innerText = `${pick(CRASH_LINES_BAD_TIMING)} // -1 INTEGRITY`;
                }
                document.getElementById('livesDisplay').innerText = livesDisplayText();
            }

            setRoundTimeout(() => {
                if (!success && lives <= 0) {
                    triggerFail();
                } else {
                    currentTestIndex++;
                    if (currentTestIndex >= activeTests.length) {
                        triggerVictory();
                    } else {
                        loadTest();
                    }
                }
            }, 1500);
        }

        function triggerFail() {
            clearAllTimers();
            stopGaugeLoop();
            roundPhase = 'idle';
            document.getElementById('gameScreen').style.display = 'none';
            document.getElementById('failScreen').style.display = 'flex';
            document.getElementById('failScore').innerText = score;
            ArcadeKit.showPlayerName(playerName, ['playerNameDisplayFail']);
        }

        function triggerVictory() {
            clearAllTimers();
            stopGaugeLoop();
            roundPhase = 'idle';
            document.getElementById('gameScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'flex';
            document.getElementById('victoryScore').innerText = score;
            ArcadeKit.showPlayerName(playerName, ['playerNameDisplayWin']);
        }

        function restartTestSession() {
            startTestSession();
        }

        // Global SPACE-bar shortcut for the brake pedal — only acts while a
        // brake QTE is actually in progress, so it never interferes with
        // typing in the name field or the numeric answer input.
        document.addEventListener('keydown', function (e) {
            if (e.code === 'Space' && roundPhase === 'qte' && !qteResolved) {
                e.preventDefault();
                handleBrake();
            }
        });
