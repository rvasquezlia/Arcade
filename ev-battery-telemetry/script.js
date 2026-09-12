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
        //
        // Domain/range items now drive a click-and-drag number-line widget
        // instead of multiple choice. Each interval/exclude item's numeric
        // bounds were chosen so the correct value always lands exactly on a
        // snap tick (see `step`), so dragging can be graded precisely:
        //   Drive-Time Domain Check   -> domain [0, 25]      (closed both ends)
        //   Charge-Time Domain       -> domain x >= 2         (closed, unbounded above)
        //   Discharge Range Check    -> range  [0, 100]      (closed both ends)
        //   Speed-Range Vertex Check -> range  [0, 40]       (closed both ends)
        //   Charge-Rate Restriction  -> excluded point x = 3
        //   Charging Rate Restriction-> excluded point x = 0
        // The two purely verbal concept checks (naming the Vertical Line
        // Test, and interpreting an out-of-domain input) stay multiple
        // choice, since they aren't interval questions at all.
        const telemetryBank = [
            {
                title: "Highway Discharge Curve",
                type: "evaluate",
                mapInput: "x = 4",
                text: "The battery discharge model is \\( f(x) = 2x^2 - 5x + 3 \\), where \\( x \\) is speed in tens of mph. Evaluate \\( f(4) \\).",
                correct: "15"
            },
            {
                title: "Linear Drain Rate",
                type: "evaluate",
                mapInput: "x = 5",
                text: "A cooling-system model is \\( f(x) = -3x + 12 \\). Evaluate \\( f(5) \\).",
                correct: "-3"
            },
            {
                title: "Regenerative Braking Curve",
                type: "evaluate",
                mapInput: "x = 3",
                text: "The regenerative braking energy model is \\( f(x) = x^2 - 4x + 1 \\). Evaluate \\( f(3) \\).",
                correct: "-2"
            },
            {
                title: "Torque Output Curve",
                type: "evaluate",
                mapInput: "x = 4",
                text: "Motor torque output is modeled by \\( f(x) = 0.5x^2 + x - 6 \\). Evaluate \\( f(4) \\).",
                correct: "6"
            },
            {
                title: "Coolant Temperature Shift",
                type: "evaluate",
                mapInput: "x = -2",
                text: "A coolant offset function is \\( f(x) = 4x - 7 \\). Evaluate \\( f(-2) \\).",
                correct: "-15"
            },
            {
                title: "Cabin Climate Load",
                type: "evaluate",
                mapInput: "x = -4",
                text: "Cabin climate power draw is modeled by \\( f(x) = x^2 + 2x - 8 \\). Evaluate \\( f(-4) \\).",
                correct: "0"
            },
            {
                title: "Highway Range Depletion",
                type: "evaluate",
                mapInput: "x = 12",
                text: "Battery percentage remaining after \\( x \\) minutes of highway driving is \\( f(x) = 100 - 5x \\). Evaluate \\( f(12) \\).",
                correct: "40"
            },
            {
                title: "Acceleration Curve",
                type: "evaluate",
                mapInput: "x = 2",
                text: "Acceleration power draw is modeled by \\( f(x) = -2x^2 + 8x + 3 \\). Evaluate \\( f(2) \\).",
                correct: "11"
            },
            {
                title: "Idle Drain Function",
                type: "evaluate",
                mapInput: "x = -1",
                text: "Idle power drain is modeled by \\( f(x) = 3x^2 - x - 2 \\). Evaluate \\( f(-1) \\).",
                correct: "2"
            },
            {
                title: "Speed-Based Range Curve",
                type: "evaluate",
                mapInput: "x = 10",
                text: "Estimated remaining range (miles) at speed \\( x \\) (tens of mph) is \\( f(x) = 90 - 0.25x^2 \\). Evaluate \\( f(10) \\).",
                correct: "65"
            },
            {
                title: "Startup Diagnostic",
                type: "evaluate",
                mapInput: "x = 0",
                text: "The startup power curve is \\( f(x) = 2x^2 + 3x - 1 \\). Evaluate \\( f(0) \\).",
                correct: "-1"
            },
            {
                title: "Descent Regeneration Curve",
                type: "evaluate",
                mapInput: "x = 10",
                text: "Downhill regeneration gain is modeled by \\( f(x) = -4x + 50 \\). Evaluate \\( f(10) \\).",
                correct: "10"
            },
            {
                title: "Cell Degradation Curve",
                type: "evaluate",
                mapInput: "x = 5",
                text: "Cell wear factor is modeled by \\( f(x) = x^2 - 9 \\). Evaluate \\( f(5) \\).",
                correct: "16"
            },
            {
                title: "Traction Power Curve",
                type: "evaluate",
                mapInput: "x = 2",
                text: "Traction motor power draw is modeled by \\( f(x) = 6x - x^2 \\). Evaluate \\( f(2) \\).",
                correct: "8"
            },
            {
                title: "Range Recovery Curve",
                type: "evaluate",
                mapInput: "x = 6",
                text: "Battery range recovery (miles) is modeled by \\( f(x) = -0.5x^2 + 3x + 20 \\). Evaluate \\( f(6) \\).",
                correct: "20"
            },
            {
                title: "Fast-Charge Curve",
                type: "evaluate",
                mapInput: "x = -2",
                text: "A fast-charge calibration curve is \\( f(x) = 2x^2 - 3x + 1 \\). Evaluate \\( f(-2) \\).",
                correct: "15"
            },
            {
                title: "Drive-Time Domain Check",
                type: "interval",
                kind: "domain",
                text: "The function \\( f(x) = 100 - 4x \\) models battery percentage remaining after \\( x \\) minutes of highway driving. The vehicle must stop and recharge after 25 minutes, and time cannot be negative. Drag to select the most reasonable domain for this real-world model.",
                lineMin: -5, lineMax: 35, step: 1,
                correctLower: 0, correctUpper: 25,
                lowerClosedExpected: true, upperClosedExpected: true,
                lowerInfinite: false, upperInfinite: false
            },
            {
                title: "Charge-Rate Restriction",
                type: "exclude",
                text: "A diagnostic function is \\( f(x) = \\dfrac{1}{x - 3} \\). Tap the value of \\( x \\) that must be excluded from the domain because it makes the function undefined.",
                lineMin: -5, lineMax: 10, step: 1,
                correctValue: 3
            },
            {
                title: "Charge-Time Domain",
                type: "interval",
                kind: "domain",
                text: "A charge-time function is \\( f(x) = \\sqrt{x - 2} \\). Drag to select the domain for which \\( f(x) \\) outputs a real number (drag all the way to the right edge to mean \"and beyond\").",
                lineMin: -3, lineMax: 12, step: 1,
                correctLower: 2, correctUpper: null,
                lowerClosedExpected: true, upperClosedExpected: true,
                lowerInfinite: false, upperInfinite: true
            },
            {
                title: "Discharge Range Check",
                type: "interval",
                kind: "range",
                text: "The discharge function \\( f(x) = 100 - 5x \\) is only graphed for \\( 0 \\le x \\le 20 \\) minutes, since the vehicle shuts off at 0% charge. Drag to select the range of this function on that domain.",
                lineMin: -20, lineMax: 120, step: 5,
                correctLower: 0, correctUpper: 100,
                lowerClosedExpected: true, upperClosedExpected: true,
                lowerInfinite: false, upperInfinite: false
            },
            {
                title: "Sensor Relation Check",
                type: "concept-mc",
                text: "On a graph plotting speed (x) against battery drain rate (y), every speed value corresponds to exactly one drain rate. Which test confirms this relation is a function?",
                options: ["Vertical Line Test", "Horizontal Line Test", "Midpoint Test", "Distance Formula"],
                correct: "Vertical Line Test"
            },
            {
                title: "Invalid Input Diagnostic",
                type: "concept-mc",
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
                type: "exclude",
                text: "A charge-time function is \\( f(x) = \\dfrac{240}{x} \\), where \\( x \\) is the charging rate in kW. Tap the value that must be excluded from the domain, since it would make the function undefined.",
                lineMin: -10, lineMax: 10, step: 1,
                correctValue: 0
            },
            {
                title: "Speed-Range Vertex Check",
                type: "interval",
                kind: "range",
                text: "The range function \\( f(x) = -0.1x^2 + 4x \\) models miles remaining based on speed \\( x \\) (mph), for \\( 0 \\le x \\le 40 \\). Since \\( f(0) = 0 \\), \\( f(40) = 0 \\), and the maximum occurs at \\( f(20) = 40 \\), drag to select the range of \\( f \\) on this domain.",
                lineMin: -10, lineMax: 50, step: 5,
                correctLower: 0, correctUpper: 40,
                lowerClosedExpected: true, upperClosedExpected: true,
                lowerInfinite: false, upperInfinite: false
            }
        ];

        const ROUNDS_PER_SESSION = 12;
        const GAUGE_MAX = 100;
        const DRAIN_PER_SEC = GAUGE_MAX / 150;   // full drain in 150s of pure idling on one checkpoint
        const REFUEL_CORRECT = 45;               // correct answer refuels the trip-wide range gauge
        const PENALTY_WRONG = 8;                 // wrong guesses sting, but rarely end the trip alone
        const TICK_MS = 100;

        // Chipper/anxious road-trip navigator flavor lines.
        const correctQuips = [
            "Nice! Range restored — the GPS voice sounds almost proud.",
            "Correct! The car does a little happy wiggle at the checkpoint.",
            "Yes! Charge flowing back in like free gas-station coffee.",
            "Boom, right on the money. Onward, road warrior!",
            "Perfect diagnostic. Even the snack bag rustled in approval.",
            "Correct! We might actually reach the rest stop with dignity."
        ];
        const wrongQuips = [
            "Not quite — the range gauge just hiccuped. Try again!",
            "Ooh, close, but the battery did not like that one.",
            "Nope! Recalculate before we start coasting in neutral.",
            "That reading made the dashboard beep nervously.",
            "Miscalculation detected. The snacks are judging you.",
            "Not the right number — retry before we lose more charge!"
        ];
        const lowGaugeQuips = [
            "Range critical — we are coasting on fumes and vibes.",
            "Uh oh, the navigator is quietly Googling nearby tow trucks.",
            "Charge critically low! Focus, road warrior!",
            "The dashboard is basically screaming. Compute fast!"
        ];
        const victoryQuips = [
            "You hypermiled through every function and rolled in with charge to spare.",
            "Somehow you calculated AND navigated without one wrong turn. Legendary road-trip energy.",
            "The car is doing slow, safe, in-park victory wiggles in the lot.",
            "Twelve checkpoints, zero tow trucks. Certified champion of the highway."
        ];
        const failQuips = [
            "The car sighs, rolls to a stop, and you now know more battery math than the tow truck driver.",
            "Somewhere between checkpoint math and vibes, the charge ran out. At least the scenery was nice.",
            "Stranded! But hey, every wrong reading was basically free tutoring from the universe.",
            "The GPS voice says \"recalculating your life choices\" and quietly calls for a charging cable."
        ];

        // GAME STATE
        let activeReadings = [];
        let currentIndex = 0;
        let currentQuestion = null;
        let score = 0;
        let gauge = GAUGE_MAX;
        let isDarkMode = true;
        let isLocked = false;
        let tripActive = false;
        let lowGaugeAnnounced = false;
        let playerName = '';
        let gaugeTimer = null;

        function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
        function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

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

        // Start Trip
        function startTrip() {
            const name = ArcadeKit.requireName('playerNameInput', 'playerNameError');
            if (!name) return;
            playerName = name;

            currentIndex = 0;
            score = 0;
            gauge = GAUGE_MAX;
            isLocked = false;
            lowGaugeAnnounced = false;
            tripActive = true;
            activeReadings = ArcadeKit.sample(telemetryBank, ROUNDS_PER_SESSION);

            document.getElementById('startScreen').style.display = 'none';
            document.getElementById('failScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'none';
            document.getElementById('gameScreen').style.display = 'block';

            updateGaugeUI();
            startGaugeTimer();
            loadCheckpoint();
        }

        function restartTrip() {
            startTrip();
        }

        // ---- Range gauge (drains in real time, refuels on correct answers) ----
        function setGauge(v) {
            gauge = clamp(v, 0, GAUGE_MAX);
            updateGaugeUI();
        }

        function updateGaugeUI() {
            const fill = document.getElementById('gaugeFill');
            const label = document.getElementById('gaugePercentLabel');
            const pct = Math.round(gauge);
            fill.style.width = pct + '%';
            label.innerText = pct + '%';
            fill.classList.remove('warn', 'critical');

            if (gauge < 25) {
                fill.classList.add('critical');
                if (!lowGaugeAnnounced) {
                    lowGaugeAnnounced = true;
                    const q = document.getElementById('navigatorQuip');
                    if (q) q.innerText = pick(lowGaugeQuips);
                }
            } else if (gauge < 50) {
                fill.classList.add('warn');
                if (gauge > 40) lowGaugeAnnounced = false;
            } else {
                lowGaugeAnnounced = false;
            }
        }

        function startGaugeTimer() {
            stopGaugeTimer();
            gaugeTimer = setInterval(() => {
                if (!tripActive || isLocked) return;
                gauge -= DRAIN_PER_SEC * (TICK_MS / 1000);
                if (gauge <= 0) {
                    gauge = 0;
                    updateGaugeUI();
                    triggerFail();
                    return;
                }
                updateGaugeUI();
            }, TICK_MS);
        }

        function stopGaugeTimer() {
            if (gaugeTimer) {
                clearInterval(gaugeTimer);
                gaugeTimer = null;
            }
        }

        // ---- Road / car sprite ----
        function renderRoad() {
            const total = activeReadings.length;
            const pct = (currentIndex / total) * 100;
            const car = document.getElementById('carSprite');
            car.style.left = `calc(${pct}% - 14px)`;

            const flagsWrap = document.getElementById('checkpointFlags');
            if (flagsWrap.dataset.built !== String(total)) {
                flagsWrap.innerHTML = '';
                for (let i = 0; i < total; i++) {
                    const f = document.createElement('span');
                    f.className = 'road-flag';
                    f.style.left = `${(i / total) * 100}%`;
                    f.innerText = (i === total - 1) ? '🏁' : '🚩';
                    flagsWrap.appendChild(f);
                }
                flagsWrap.dataset.built = String(total);
            }
            Array.from(flagsWrap.children).forEach((f, i) => {
                f.classList.toggle('passed', i < currentIndex);
            });
        }

        // Load Current Checkpoint
        function loadCheckpoint() {
            document.getElementById('feedbackLine').innerText = '';
            const quipEl = document.getElementById('navigatorQuip');
            if (quipEl) quipEl.innerText = '';

            const q = activeReadings[currentIndex];
            currentQuestion = q;

            document.getElementById('roadHeader').innerText = `Checkpoint ${currentIndex + 1}: ${q.title}`;
            document.getElementById('checkpointCounter').innerText = `${currentIndex + 1} / ${activeReadings.length}`;
            document.getElementById('scoreDisplay').innerText = `${score} PTS`;

            document.getElementById('telemetryText').innerHTML = q.text;

            const mapDiagram = document.getElementById('mapDiagram');
            if (q.type === 'evaluate') {
                mapDiagram.style.display = 'flex';
                document.getElementById('mapInputVal').innerText = q.mapInput;
                document.getElementById('mapOutputVal').innerText = '?';
            } else {
                mapDiagram.style.display = 'none';
            }

            const zone = document.getElementById('answerZone');
            if (q.type === 'evaluate') {
                renderNumericAnswer(zone, q);
            } else if (q.type === 'interval' || q.type === 'exclude') {
                renderNumberLine(zone, q);
            } else if (q.type === 'concept-mc') {
                renderMCAnswer(zone, q);
            }

            renderRoad();
            renderMath();
        }

        // ---- Answer type: typed numeric reading ----
        function renderNumericAnswer(zone, q) {
            zone.innerHTML = `
                <div class="numeric-row">
                    <label class="numeric-label" for="numericAnswerInput">Type the f(x) reading:</label>
                    <input type="text" inputmode="decimal" id="numericAnswerInput" class="numeric-input" placeholder="e.g. -15" autocomplete="off">
                    <button class="action-btn numeric-submit-btn" id="numericSubmitBtn">LOCK IN READING</button>
                </div>
            `;
            const input = zone.querySelector('#numericAnswerInput');
            const btn = zone.querySelector('#numericSubmitBtn');
            input.focus();

            function submit() {
                if (isLocked) return;
                const raw = input.value.trim();
                if (raw === '' || isNaN(parseFloat(raw))) {
                    input.focus();
                    return;
                }
                const val = parseFloat(raw);
                const correct = Math.abs(val - parseFloat(q.correct)) < 0.01;
                if (correct) {
                    document.getElementById('mapOutputVal').innerText = q.correct;
                }
                handleResult(correct, q);
                if (!correct) {
                    input.value = '';
                    setTimeout(() => input.focus(), 0);
                }
            }

            btn.addEventListener('click', submit);
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') submit();
            });
        }

        // ---- Answer type: concept multiple-choice (verbal, non-interval concepts) ----
        function renderMCAnswer(zone, q) {
            const shuffled = ArcadeKit.shuffle(q.options);
            const keys = ['A', 'B', 'C', 'D'];
            zone.innerHTML = `<div class="options-grid" id="mcGrid"></div>`;
            const grid = zone.querySelector('#mcGrid');
            shuffled.forEach((optText, idx) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.innerHTML = `<span class="option-key">${keys[idx]}</span><span>${optText}</span>`;
                btn.addEventListener('click', () => {
                    if (isLocked) return;
                    const correct = optText === q.correct;
                    btn.style.borderColor = correct ? 'var(--accent-green)' : 'var(--accent-red)';
                    btn.style.background = correct ? 'rgba(52, 211, 153, 0.15)' : 'rgba(248, 113, 113, 0.15)';
                    handleResult(correct, q);
                });
                grid.appendChild(btn);
            });
        }

        // ---- Answer type: drag-select number line (interval or single-point exclude) ----
        function renderNumberLine(zone, q) {
            const mode = q.type; // 'interval' | 'exclude'
            const varName = q.kind === 'range' ? 'y' : 'x';
            const min = q.lineMin, max = q.lineMax, step = q.step;

            zone.innerHTML = `
                <div class="nline-hint">${mode === 'interval'
                    ? `Drag across the line to highlight the valid ${q.kind}. Tap a circle handle to flip it open/closed.`
                    : `Tap the exact point on the line that must be excluded.`}</div>
                <div class="nline-wrap">
                    <span class="nline-endlabel nline-endlabel-lo">${min}</span>
                    <div class="nline-track" id="lineTrack"><div class="nline-baseline"></div></div>
                    <span class="nline-endlabel nline-endlabel-hi">${max}</span>
                </div>
                <div class="nline-readout" id="lineReadout">Selected: <span>— drag on the line above —</span></div>
                <button class="action-btn nline-confirm-btn" id="lineConfirmBtn" disabled>${mode === 'interval' ? `CONFIRM ${q.kind.toUpperCase()}` : 'CONFIRM EXCLUDED VALUE'}</button>
            `;

            const track = zone.querySelector('#lineTrack');
            const readout = zone.querySelector('#lineReadout span');
            const confirmBtn = zone.querySelector('#lineConfirmBtn');
            track.style.touchAction = 'none';

            const state = {
                lowerVal: null, upperVal: null,
                lowerClosed: true, upperClosed: true,
                upperInfinite: false,
                markerVal: null,
                dragging: false, anchor: null
            };

            function snap(v) {
                const s = Math.round((v - min) / step) * step + min;
                return clamp(s, min, max);
            }

            function valueFromEvent(e) {
                const rect = track.getBoundingClientRect();
                const frac = clamp((e.clientX - rect.left) / rect.width, 0, 1);
                return snap(min + frac * (max - min));
            }

            function pctFor(v) {
                return ((v - min) / (max - min)) * 100;
            }

            function renderMarks() {
                track.innerHTML = '<div class="nline-baseline"></div>';
                if (mode === 'interval') {
                    if (state.lowerVal === null) return;
                    const fill = document.createElement('div');
                    fill.className = 'nline-fill';
                    fill.style.left = pctFor(state.lowerVal) + '%';
                    fill.style.width = Math.max(0, pctFor(state.upperVal) - pctFor(state.lowerVal)) + '%';
                    track.appendChild(fill);

                    const loH = document.createElement('div');
                    loH.className = 'nline-handle' + (state.lowerClosed ? ' closed' : '');
                    loH.style.left = pctFor(state.lowerVal) + '%';
                    loH.innerHTML = `<span class="nline-bubble">${state.lowerVal}</span>`;
                    loH.addEventListener('pointerdown', ev => ev.stopPropagation());
                    loH.addEventListener('click', ev => {
                        ev.stopPropagation();
                        state.lowerClosed = !state.lowerClosed;
                        renderMarks();
                        updateReadout();
                    });
                    track.appendChild(loH);

                    const hiH = document.createElement('div');
                    hiH.className = 'nline-handle' + (state.upperClosed || state.upperInfinite ? ' closed' : '');
                    hiH.style.left = pctFor(state.upperVal) + '%';
                    hiH.innerHTML = `<span class="nline-bubble">${state.upperInfinite ? '∞' : state.upperVal}</span>`;
                    hiH.addEventListener('pointerdown', ev => ev.stopPropagation());
                    hiH.addEventListener('click', ev => {
                        ev.stopPropagation();
                        if (!state.upperInfinite) {
                            state.upperClosed = !state.upperClosed;
                            renderMarks();
                            updateReadout();
                        }
                    });
                    track.appendChild(hiH);
                } else {
                    if (state.markerVal === null) return;
                    const marker = document.createElement('div');
                    marker.className = 'nline-marker';
                    marker.style.left = pctFor(state.markerVal) + '%';
                    marker.innerHTML = `<span class="nline-bubble">${state.markerVal}</span>`;
                    track.appendChild(marker);
                }
            }

            function updateReadout() {
                if (mode === 'interval') {
                    if (state.lowerVal === null) {
                        readout.textContent = '— drag on the line above —';
                        confirmBtn.disabled = true;
                        return;
                    }
                    let text;
                    if (state.upperInfinite) {
                        text = `${varName} ${state.lowerClosed ? '≥' : '>'} ${state.lowerVal}`;
                    } else {
                        const leftSym = state.lowerClosed ? '≤' : '<';
                        const rightSym = state.upperClosed ? '≤' : '<';
                        text = `${state.lowerVal} ${leftSym} ${varName} ${rightSym} ${state.upperVal}`;
                    }
                    readout.textContent = text;
                    confirmBtn.disabled = (state.lowerVal === state.upperVal && !state.upperInfinite);
                } else {
                    if (state.markerVal === null) {
                        readout.textContent = '— tap the line above —';
                        confirmBtn.disabled = true;
                        return;
                    }
                    readout.textContent = `${varName} = ${state.markerVal}`;
                    confirmBtn.disabled = false;
                }
            }

            track.addEventListener('pointerdown', (e) => {
                if (isLocked) return;
                try { track.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
                const v = valueFromEvent(e);
                state.dragging = true;
                state.anchor = v;
                if (mode === 'interval') {
                    state.lowerVal = v;
                    state.upperVal = v;
                    state.upperInfinite = (v >= max);
                } else {
                    state.markerVal = v;
                }
                renderMarks();
                updateReadout();
            });

            track.addEventListener('pointermove', (e) => {
                if (!state.dragging) return;
                const v = valueFromEvent(e);
                if (mode === 'interval') {
                    state.lowerVal = Math.min(state.anchor, v);
                    state.upperVal = Math.max(state.anchor, v);
                    state.upperInfinite = (state.upperVal >= max);
                } else {
                    state.markerVal = v;
                }
                renderMarks();
                updateReadout();
            });

            track.addEventListener('pointerup', () => { state.dragging = false; });
            track.addEventListener('pointercancel', () => { state.dragging = false; });

            confirmBtn.addEventListener('click', () => {
                if (isLocked || confirmBtn.disabled) return;
                let correct;
                if (mode === 'interval') {
                    const lowerOk = state.lowerVal === q.correctLower && state.lowerClosed === q.lowerClosedExpected;
                    const upperOk = q.upperInfinite
                        ? state.upperInfinite
                        : (state.upperVal === q.correctUpper && state.upperClosed === q.upperClosedExpected);
                    correct = lowerOk && upperOk;
                } else {
                    correct = state.markerVal === q.correctValue;
                }
                handleResult(correct, q);
            });

            renderMarks();
            updateReadout();
        }

        // ---- Shared result handling for every answer type ----
        function handleResult(correct, q) {
            if (isLocked) return;
            isLocked = true;

            const feedback = document.getElementById('feedbackLine');
            const quip = document.getElementById('navigatorQuip');

            if (correct) {
                score += 100;
                setGauge(gauge + REFUEL_CORRECT);
                feedback.className = 'feedback-line text-success';
                feedback.innerText = 'TELEMETRY CONFIRMED // +100 PTS // CHARGE RESTORED';
                if (quip) quip.innerText = pick(correctQuips);

                setTimeout(() => {
                    currentIndex++;
                    if (currentIndex >= activeReadings.length) {
                        triggerVictory();
                    } else {
                        isLocked = false;
                        loadCheckpoint();
                    }
                }, 1100);
            } else {
                setGauge(gauge - PENALTY_WRONG);
                feedback.className = 'feedback-line text-error';
                feedback.innerText = 'MISMATCH // RANGE DRAINED // TRY AGAIN';
                if (quip) quip.innerText = pick(wrongQuips);

                setTimeout(() => {
                    if (gauge <= 0) {
                        triggerFail();
                    } else {
                        isLocked = false;
                    }
                }, 650);
            }
        }

        function triggerFail() {
            tripActive = false;
            stopGaugeTimer();
            document.getElementById('gameScreen').style.display = 'none';
            document.getElementById('failScreen').style.display = 'flex';
            document.getElementById('failScore').innerText = score;
            const failQuipEl = document.getElementById('failQuip');
            if (failQuipEl) failQuipEl.innerText = pick(failQuips);
            ArcadeKit.showPlayerName(playerName, ['playerNameDisplayFail']);
        }

        function triggerVictory() {
            tripActive = false;
            stopGaugeTimer();
            document.getElementById('gameScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'flex';
            document.getElementById('victoryScore').innerText = score;
            const victoryQuipEl = document.getElementById('victoryQuip');
            if (victoryQuipEl) victoryQuipEl.innerText = pick(victoryQuips);
            ArcadeKit.showPlayerName(playerName, ['playerNameDisplayWin']);
        }
