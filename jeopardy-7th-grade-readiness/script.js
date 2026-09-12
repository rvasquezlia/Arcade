        const categories = [
            "Coordinate Plane",
            "Integers & Ops",
            "PEMDAS & Alg",
            "Ratios & Rates",
            "Percents",
            "Area & Perimeter"
        ];

        /* ------------------------------------------------------------------
           Question bank. Multiple-choice options are gone — every question
           now carries a `type` (how the typed answer is checked) plus either
           an `expected` value/array or an `accept` list of equivalent typed
           forms, and a `display` string shown to the player after they answer.
           The math/rigor is identical to the original question bank.
           ------------------------------------------------------------------ */
        const questionsData = {
            "Coordinate Plane": [
                { points: 100, q: "In which quadrant is the point $(-4, 5)$ located?", type: "quadrant", expected: 2, display: "Quadrant II", hint: "Type the quadrant, e.g. 2 or II" },
                { points: 200, q: "What is the distance between $(3, -2)$ and $(3, 6)$ on the coordinate plane?", type: "numeric", expected: 8, display: "8 units", hint: "Type a number of units" },
                { points: 300, q: "If you start at the origin and move left $1.5$ units and down $2.5$ units, what are your coordinates?", type: "coord", expected: [-1.5, -2.5], display: "(-1.5, -2.5)", hint: "Type as (x, y)" },
                { points: 400, q: "A rectangle has vertices at $(1,1)$, $(1,5)$, $(6,5)$, and $(6,1)$. What is its area?", type: "numeric", expected: 20, display: "20 sq units", hint: "Type the area (a number)" }
            ],
            "Integers & Ops": [
                { points: 100, q: "Calculate: $-15 + 8$", type: "numeric", expected: -7, display: "-7", hint: "Type the value" },
                { points: 200, q: "Calculate: $(-6) \\times (-7)$", type: "numeric", expected: 42, display: "42", hint: "Type the value" },
                { points: 300, q: "Evaluate: $-\\frac{3}{4} + \\frac{1}{2}$", type: "numeric", expected: -0.25, display: "-1/4 (or -0.25)", hint: "Type a fraction (a/b) or a decimal" },
                { points: 400, q: "Calculate: $-12.5 \\div 0.5$", type: "numeric", expected: -25, display: "-25", hint: "Type the value" }
            ],
            "PEMDAS & Alg": [
                { points: 100, q: "Solve for $x$: $x + 14 = 5$", type: "expr", accept: ["x=-9", "-9"], display: "x = -9", hint: "Type like x=-9, or just -9" },
                { points: 200, q: "Evaluate: $3^2 + (10 - 4) \\div 2$", type: "numeric", expected: 12, display: "12", hint: "Type the value" },
                { points: 300, q: "Apply Distributive Property: $4(2x - 5)$", type: "expr", accept: ["8x-20"], display: "8x - 20", hint: "Type like 8x-20" },
                { points: 400, q: "Solve for $y$: $\\frac{y}{3} = -7$", type: "expr", accept: ["y=-21", "-21"], display: "y = -21", hint: "Type like y=-21, or just -21" }
            ],
            "Ratios & Rates": [
                { points: 100, q: "Are the ratios $3:4$ and $12:16$ equivalent?", type: "yesno", expected: "yes", display: "Yes", hint: "Type Yes or No" },
                { points: 200, q: "If 5 apples cost $3.00, what is the unit rate per apple?", type: "numeric", expected: 0.60, display: "$0.60", hint: "Type the price per apple" },
                { points: 300, q: "Store A sells 4 books for $20. Store B sells 6 books for $27. Which is the better deal per book?", type: "store", expected: "b", display: "Store B", hint: "Type Store A or Store B" },
                { points: 400, q: "Simplify the ratio $18 : 24 : 36$ to simplest terms.", type: "ratio", expected: [3, 4, 6], display: "3 : 4 : 6", hint: "Type like 3:4:6" }
            ],
            "Percents": [
                { points: 100, q: "Convert $\\frac{3}{5}$ to a percentage.", type: "numeric", expected: 60, display: "60%", hint: "Type the percent (a number)" },
                { points: 200, q: "What is $15\\%$ of $80$?", type: "numeric", expected: 12, display: "12", hint: "Type the value" },
                { points: 300, q: "Express $0.085$ as a fraction in simplest form.", type: "numeric", expected: 0.085, tolerance: 0.0006, display: "17/200 (or 0.085)", hint: "Type as a fraction (a/b) or a decimal" },
                { points: 400, q: "A jacket costs $40 and is on sale for $25\\%$ off. What is the sale price?", type: "numeric", expected: 30, display: "$30", hint: "Type the sale price" }
            ],
            "Area & Perimeter": [
                { points: 100, q: "Find the area of a triangle with base $8\\text{ cm}$ and height $5\\text{ cm}$.", type: "numeric", expected: 20, display: "20 cm²", hint: "Type the area (a number)" },
                { points: 200, q: "Find the perimeter of a regular hexagon with side length $7.5\\text{ cm}$.", type: "numeric", expected: 45, display: "45 cm", hint: "Type the perimeter (a number)" },
                { points: 300, q: "A trapezoid has bases $6\\text{ m}$ and $10\\text{ m}$ and height $4\\text{ m}$. What is its area?", type: "numeric", expected: 32, display: "32 m²", hint: "Type the area (a number)" },
                { points: 400, q: "A parallelogram has an area of $54\\text{ m}^2$ and base $9\\text{ m}$. What is its height?", type: "numeric", expected: 6, display: "6 m", hint: "Type the height (a number)" }
            ]
        };

        /* ------------------------------------------------------------------
           Snarky game-show host commentary.
           ------------------------------------------------------------------ */
        const hostLines = {
            intro: [
                "Welcome to the buzzer round, brainiacs! I'm Byte, your host with the most math facts.",
                "Pick a tile, any tile. Just know one of them is hiding a Daily Double... 👀",
                "Type fast, think faster. The clock does not care about your feelings."
            ],
            correct: [
                "BOOM! Correct! Somebody's been paying attention in class. 🎉",
                "Yes! Chef's kiss. Your math teacher would be proud.",
                "Correct! You're basically a human calculator right now.",
                "Nailed it! Add those points to the pile."
            ],
            wrong: [
                "Ohh, so close... to a completely different answer. Not quite!",
                "Nope! But confidence counts for nothing on the scoreboard. Try the next one!",
                "Incorrect! The math gremlins strike again.",
                "Not this time, champ. Dust yourself off!"
            ],
            timeout: [
                "Tick tock! Time's up — the buzzer waits for no one.",
                "BUZZZZ! Too slow! I basically started typing the answer for you.",
                "Out of time! The clock is undefeated today."
            ],
            ddReveal: [
                "Ooooh! You found it — a DAILY DOUBLE! Time to bet big or bet safe.",
                "Surprise! This tile was hiding a Daily Double. No pressure or anything.",
                "DAILY DOUBLE! Show me the wager, champ."
            ],
            ddWin: [
                "Whoa! Big brain, BIGGER bet, and it paid off!",
                "You bet it, you got it. That's how legends are made."
            ],
            ddLose: [
                "Ouch, that wager stings. But hey, at least it was dramatic!",
                "Big risk, no reward this time. The scoreboard remembers, but we move on!"
            ],
            win: [
                "A score like that? You are 100% ready for 7th grade math. Go forth and conquer!",
                "Look at you, math superstar! Take a screenshot and show it off."
            ],
            fail: [
                "Rough round out there — but that's exactly why we practice! Run it back.",
                "The board won this round. Study up and come back for a rematch!"
            ]
        };

        function hostSay(category) {
            const lines = hostLines[category];
            if (!lines || !lines.length) return;
            const line = lines[Math.floor(Math.random() * lines.length)];
            const bubble = document.getElementById('host-bubble');
            if (!bubble) return;
            bubble.innerText = line;
            bubble.classList.remove('host-pop');
            void bubble.offsetWidth; // restart animation
            bubble.classList.add('host-pop');
        }

        /* ------------------------------------------------------------------
           Answer checking — tolerant, format-forgiving parsing per type.
           ------------------------------------------------------------------ */
        function extractNumber(raw) {
            if (raw === null || raw === undefined) return null;
            let s = String(raw).trim().toLowerCase();
            if (s === '') return null;
            s = s.replace(/±/g, '+-');
            s = s.replace(/\$/g, '').replace(/,/g, '').replace(/%/g, '');
            s = s.replace(/(sq\s*)?(units?|cm\^?2|cm²|m\^?2|m²|cm|m)\b/g, '');
            s = s.trim();
            const fracMatch = s.match(/^([+-]?\d+(?:\.\d+)?)\s*\/\s*([+-]?\d+(?:\.\d+)?)$/);
            if (fracMatch) {
                const num = parseFloat(fracMatch[1]);
                const den = parseFloat(fracMatch[2]);
                if (!den) return null;
                return num / den;
            }
            const num = parseFloat(s);
            return isNaN(num) ? null : num;
        }

        function isAnswerCorrect(qObj, rawInput) {
            const raw = (rawInput || '').trim();
            if (!raw) return false;

            switch (qObj.type) {
                case "numeric": {
                    const val = extractNumber(raw);
                    if (val === null) return false;
                    const tol = (qObj.tolerance !== undefined) ? qObj.tolerance : 0.02;
                    return Math.abs(val - qObj.expected) <= tol;
                }
                case "coord": {
                    const cleaned = raw.replace(/[()]/g, '');
                    const parts = cleaned.split(',');
                    if (parts.length !== 2) return false;
                    const x = extractNumber(parts[0]);
                    const y = extractNumber(parts[1]);
                    if (x === null || y === null) return false;
                    return Math.abs(x - qObj.expected[0]) <= 0.05 && Math.abs(y - qObj.expected[1]) <= 0.05;
                }
                case "ratio": {
                    const parts = raw.replace(/:/g, ',').split(',').map(p => extractNumber(p));
                    if (parts.length !== qObj.expected.length) return false;
                    return parts.every((v, i) => v !== null && Math.abs(v - qObj.expected[i]) <= 0.02);
                }
                case "yesno": {
                    const s = raw.toLowerCase().replace(/[^a-z]/g, '');
                    const yes = ['yes', 'y', 'true', 'correct', 'yeah', 'yep'];
                    const no = ['no', 'n', 'false', 'nope'];
                    return qObj.expected === 'yes' ? yes.includes(s) : no.includes(s);
                }
                case "quadrant": {
                    let s = raw.toLowerCase().replace(/\s+/g, '').replace('quadrant', '');
                    const romanMap = { i: 1, ii: 2, iii: 3, iv: 4 };
                    let val = (romanMap[s] !== undefined) ? romanMap[s] : parseInt(s, 10);
                    return val === qObj.expected;
                }
                case "store": {
                    const s = raw.toLowerCase().replace(/\s+/g, '').replace('store', '');
                    return s === qObj.expected;
                }
                case "expr": {
                    let s = raw.toLowerCase().replace(/\s+/g, '').replace(/\$/g, '').replace(/±/g, '+-');
                    return qObj.accept.some(a => a.toLowerCase().replace(/\s+/g, '') === s);
                }
                default:
                    return false;
            }
        }

        /* ------------------------------------------------------------------
           Game state
           ------------------------------------------------------------------ */
        let currentScore = 0;
        let tilesAnswered = 0;
        let playerName = '';
        let activeTile = null;
        let activePoints = 0;
        let activeQuestionObj = null;
        let activeTileKey = null;
        let activeTileMultipliers = {};
        let dailyDoubleTileKey = null;
        let isActiveDailyDouble = false;
        let isDarkMode = true;

        const NORMAL_TIME = 25;   // seconds to answer a regular question
        const DD_TIME = 30;       // seconds to answer after a Daily Double wager
        const WIN_SCORE = 2000;   // total score needed for the "pass" ending

        let timerInterval = null;
        let timeLeft = 0;

        function toggleTheme() {
            isDarkMode = !isDarkMode;
            const body = document.body;
            const themeBtn = document.getElementById('theme-toggle');

            if (isDarkMode) {
                body.classList.remove('light-mode');
                themeBtn.innerHTML = '☀️ Light Mode';
            } else {
                body.classList.add('light-mode');
                themeBtn.innerHTML = '🌙 Dark Mode';
            }
        }

        function shuffleArray(arr) {
            const array = [...arr];
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function renderMath(container) {
            if (window.MathJax && container) {
                MathJax.typesetPromise([container]);
            }
        }

        function startGame() {
            const name = ArcadeKit.requireName('playerNameInput', 'playerNameError');
            if (!name) return;
            playerName = name;

            document.getElementById('instruction-modal').style.display = 'none';
            buildBoard();
            hostSay('intro');
        }

        function buildBoard() {
            const board = document.getElementById('board');
            board.innerHTML = '';
            activeTileMultipliers = {};
            tilesAnswered = 0;
            dailyDoubleTileKey = null;

            // Randomize multiplier + Daily Double locations across the 24 tiles.
            const tileIndices = shuffleArray([...Array(24).keys()]);
            const doubleIndices = [tileIndices[0], tileIndices[1]];
            const tripleIndices = [tileIndices[2], tileIndices[3]];
            const dailyDoubleFlatIndex = tileIndices[4];

            // Build board column by column
            categories.forEach((cat, catIdx) => {
                const col = document.createElement('div');
                col.className = 'category-column';

                // Add Category Title Header
                const header = document.createElement('div');
                header.className = 'category-header';
                header.innerText = cat;
                col.appendChild(header);

                // Add 4 Tiles for this Category
                for (let i = 0; i < 4; i++) {
                    const qData = questionsData[cat][i];
                    const flatIndex = i * 6 + catIdx;

                    let mult = 1;
                    if (doubleIndices.includes(flatIndex)) mult = 2;
                    if (tripleIndices.includes(flatIndex)) mult = 3;

                    const tileKey = `${cat}_${i}`;
                    activeTileMultipliers[tileKey] = mult;
                    if (flatIndex === dailyDoubleFlatIndex) {
                        dailyDoubleTileKey = tileKey;
                    }

                    const tile = document.createElement('div');
                    tile.className = 'tile';
                    tile.innerText = `$${qData.points}`;
                    tile.onclick = () => openQuestion(cat, i, tileKey, tile);
                    col.appendChild(tile);
                }

                board.appendChild(col);
            });
        }

        function stopTimer() {
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
            }
        }

        function startTimer(seconds, onExpire) {
            stopTimer();
            timeLeft = seconds;
            const fill = document.getElementById('timer-bar-fill');
            const numberEl = document.getElementById('timer-number');

            function render() {
                const pct = Math.max(0, (timeLeft / seconds) * 100);
                fill.style.width = pct + '%';
                numberEl.innerText = Math.max(0, Math.ceil(timeLeft));
                const low = timeLeft <= 5;
                fill.classList.toggle('timer-low', low);
                numberEl.classList.toggle('timer-low', low);
            }

            render();
            timerInterval = setInterval(() => {
                timeLeft -= 0.1;
                if (timeLeft <= 0) {
                    timeLeft = 0;
                    render();
                    stopTimer();
                    onExpire();
                    return;
                }
                render();
            }, 100);
        }

        function openQuestion(cat, index, tileKey, tileElement) {
            if (tileElement.classList.contains('used')) return;
            activeTile = tileElement;
            activeTileKey = tileKey;
            activeQuestionObj = questionsData[cat][index];
            isActiveDailyDouble = (tileKey === dailyDoubleTileKey);

            const multiplier = activeTileMultipliers[tileKey];
            const multTag = document.getElementById('multiplier-tag');

            const wagerView = document.getElementById('wager-view');
            const answerView = document.getElementById('answer-view');
            document.getElementById('next-btn').style.display = 'none';
            const feedback = document.getElementById('feedback');
            feedback.className = 'feedback';
            feedback.innerHTML = '';

            if (isActiveDailyDouble) {
                multTag.className = 'multiplier-badge daily-double-badge';
                multTag.innerText = '⭐ DAILY DOUBLE ⭐';
                document.getElementById('question-category').innerText = `${cat} — Daily Double!`;

                const wagerMax = Math.max(currentScore, 500);
                const wagerMin = 50;
                const wagerInput = document.getElementById('wagerInput');
                wagerInput.min = wagerMin;
                wagerInput.max = wagerMax;
                wagerInput.value = Math.min(200, wagerMax);
                document.getElementById('wager-range-note').innerText =
                    `Wager between $${wagerMin} and $${wagerMax}.`;

                wagerView.hidden = false;
                answerView.hidden = true;
                document.getElementById('question-modal').style.display = 'flex';
                hostSay('ddReveal');
                setTimeout(() => wagerInput.focus(), 50);
                return;
            }

            // Regular tile
            if (multiplier === 2) {
                multTag.className = 'multiplier-badge double-challenge';
                multTag.innerText = '⚡ DOUBLE CHALLENGE (2x) ⚡';
            } else if (multiplier === 3) {
                multTag.className = 'multiplier-badge triple-challenge';
                multTag.innerText = '🔥 TRIPLE CHALLENGE (3x) 🔥';
            } else {
                multTag.className = '';
                multTag.innerText = '';
            }

            activePoints = activeQuestionObj.points * multiplier;
            document.getElementById('question-category').innerText = `${cat} — $${activePoints}`;

            wagerView.hidden = true;
            answerView.hidden = false;
            document.getElementById('question-modal').style.display = 'flex';
            showAnswerView(NORMAL_TIME);
        }

        function submitWager() {
            const wagerInput = document.getElementById('wagerInput');
            const wagerMax = Math.max(currentScore, 500);
            const wagerMin = 50;
            let wager = parseInt(wagerInput.value, 10);
            if (isNaN(wager)) wager = wagerMin;
            wager = Math.max(wagerMin, Math.min(wagerMax, wager));

            activePoints = wager;
            document.getElementById('question-category').innerText =
                `${document.getElementById('question-category').innerText.split(' — ')[0]} — Daily Double for $${wager}`;

            document.getElementById('wager-view').hidden = true;
            document.getElementById('answer-view').hidden = false;
            showAnswerView(DD_TIME);
        }

        function showAnswerView(seconds) {
            document.getElementById('question-body').innerHTML = activeQuestionObj.q;
            document.getElementById('answer-hint').innerText = activeQuestionObj.hint || '';

            const input = document.getElementById('answerInput');
            input.value = '';
            input.disabled = false;
            input.classList.remove('input-shake');
            const submitBtn = document.getElementById('submit-answer-btn');
            submitBtn.disabled = false;

            const feedback = document.getElementById('feedback');
            feedback.className = 'feedback';
            feedback.innerHTML = '';
            document.getElementById('next-btn').style.display = 'none';

            renderMath(document.getElementById('question-modal'));
            startTimer(seconds, handleTimeout);
            setTimeout(() => input.focus(), 50);
        }

        function submitAnswer() {
            const input = document.getElementById('answerInput');
            const raw = input.value.trim();
            if (!raw) {
                input.classList.remove('input-shake');
                void input.offsetWidth;
                input.classList.add('input-shake');
                return;
            }
            stopTimer();
            finalizeAnswer(raw, false);
        }

        function handleTimeout() {
            finalizeAnswer('', true);
        }

        function finalizeAnswer(raw, isTimeout) {
            const input = document.getElementById('answerInput');
            const submitBtn = document.getElementById('submit-answer-btn');
            input.disabled = true;
            submitBtn.disabled = true;

            const correct = !isTimeout && isAnswerCorrect(activeQuestionObj, raw);
            const feedback = document.getElementById('feedback');

            if (correct) {
                currentScore += activePoints;
                feedback.className = 'feedback correct-text';
                feedback.innerText = `🎉 Correct! +$${activePoints}`;
                hostSay(isActiveDailyDouble ? 'ddWin' : 'correct');
            } else {
                if (isActiveDailyDouble) {
                    currentScore = Math.max(0, currentScore - activePoints);
                }
                feedback.className = 'feedback incorrect-text';
                const prefix = isTimeout ? "Time's up! " : 'Incorrect! ';
                feedback.innerHTML = `${prefix}The correct answer was: <strong>${activeQuestionObj.display}</strong>`;
                hostSay(isActiveDailyDouble ? 'ddLose' : (isTimeout ? 'timeout' : 'wrong'));
            }

            document.getElementById('score').innerText = currentScore.toLocaleString();
            document.getElementById('next-btn').style.display = 'inline-block';
            renderMath(document.getElementById('question-modal'));
        }

        function closeQuestion() {
            stopTimer();
            document.getElementById('question-modal').style.display = 'none';
            if (activeTile) {
                activeTile.classList.add('used');
                activeTile.innerText = '✓';
                tilesAnswered++;
            }

            if (tilesAnswered >= 24) {
                showEndScreen();
            }
        }

        function showEndScreen() {
            if (currentScore >= WIN_SCORE) {
                document.getElementById('final-score').innerText = currentScore.toLocaleString();
                document.getElementById('completion-modal').style.display = 'flex';
                ArcadeKit.showPlayerName(playerName, ['playerNameDisplayWin']);
                hostSay('win');
            } else {
                document.getElementById('final-score-fail').innerText = currentScore.toLocaleString();
                document.getElementById('fail-modal').style.display = 'flex';
                ArcadeKit.showPlayerName(playerName, ['playerNameDisplayFail']);
                hostSay('fail');
            }
        }

        function restartGame() {
            document.getElementById('completion-modal').style.display = 'none';
            document.getElementById('fail-modal').style.display = 'none';
            currentScore = 0;
            document.getElementById('score').innerText = '0';
            buildBoard();
            hostSay('intro');
        }

        // Enter-key submission for both typed-answer flows.
        document.getElementById('answerInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                submitAnswer();
            }
        });
        document.getElementById('wagerInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                submitWager();
            }
        });
