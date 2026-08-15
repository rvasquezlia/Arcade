        // DIVE ORDER BANKS — slider-type depth dives and multiple-choice distance/
        // absolute-value logs. Every target/answer below has been hand-verified
        // (see design notes) with straightforward integer arithmetic.
        const sliderBank = [
            { title: "Reef Avoidance", prompt: "Descend to a depth of -45 m to avoid the coral reef formations.", target: -45 },
            { title: "Hydrothermal Vent Study", prompt: "Set your depth to -78 m to safely study the hydrothermal vent field.", target: -78 },
            { title: "Surface Dive", prompt: "The sub starts at the surface (0 m) and descends 62 m. What is its new depth?", target: -62 },
            { title: "Partial Ascent", prompt: "The sub is at -30 m and rises 18 m toward the surface. What is its new depth?", target: -12 },
            { title: "Trench Rise", prompt: "The sub is at -95 m and rises 40 m. What is its new depth?", target: -55 },
            { title: "Buoy Line Inspection", prompt: "Descend to -8 m below the surface to inspect the buoy line.", target: -8 },
            { title: "Deep Dive Continuation", prompt: "The sub is at -15 m and descends another 51 m. What is its new depth?", target: -66 },
            { title: "Trench Floor", prompt: "Set your depth to -100 m to reach the trench floor.", target: -100 },
            { title: "Full Ascent", prompt: "The sub is at -60 m and rises 60 m. What is its new depth?", target: 0 }
        ];

        const mcBank = [
            { title: "Descent Log", prompt: "The sub was at -20 m and dove to -85 m. How many meters did it descend?", correct: 65, distractors: [105, 55, 75] },
            { title: "Vent Approach", prompt: "A sub descends from -12 m to -47 m. What is the total distance traveled?", correct: 35, distractors: [59, 25, 47] },
            { title: "Emergency Rise", prompt: "The submarine rises from -90 m to -35 m. How far did it rise?", correct: 55, distractors: [125, 65, 45] },
            { title: "Formation Spacing", prompt: "Sub A is at -18 m, Sub B is at -52 m. What is the vertical distance between them?", correct: 34, distractors: [70, 44, 24] },
            { title: "Canyon Descent", prompt: "The sub was at -6 m and descended to -73 m. How far did it descend?", correct: 67, distractors: [79, 57, 73] },
            { title: "Return Trip", prompt: "The research sub started at the surface (0 m), dove to -58 m, then returned to -22 m. How far did it rise on the return trip?", correct: 36, distractors: [80, 58, 44] },
            { title: "Trench Explorer II", prompt: "Trench Explorer II dropped from -33 m to -99 m. How many meters did it descend?", correct: 66, distractors: [132, 56, 76] },
            { title: "Slow Ascent", prompt: "A sub at -84 m rises to -14 m. How far did it rise?", correct: 70, distractors: [98, 74, 60] },
            { title: "Multi-Step Dive", prompt: "The sub is at -50 m. It descends 33 m, then rises 8 m. What is the absolute value of its final depth?", correct: 75, distractors: [83, 67, 58] }
        ];

        // GAME STATE
        let currentIndex = 0;
        let score = 0;
        let hull = 100;
        let activeOrders = [];
        let isDarkMode = true;
        let isLocked = false;
        let playerName = '';

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

        function startGame() {
            const name = ArcadeKit.requireName('playerNameInput', 'playerNameError');
            if (!name) return;
            playerName = name;

            currentIndex = 0;
            score = 0;
            hull = 100;

            const sliderRounds = ArcadeKit.sample(sliderBank, 6).map(r => ({ ...r, type: 'slider' }));
            const mcRounds = ArcadeKit.sample(mcBank, 6).map(r => ({ ...r, type: 'mc' }));
            activeOrders = ArcadeKit.shuffle([...sliderRounds, ...mcRounds]);

            document.getElementById('startScreen').style.display = 'none';
            document.getElementById('failScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'none';
            document.getElementById('gameScreen').style.display = 'block';

            loadOrder();
        }

        function loadOrder() {
            isLocked = false;
            document.getElementById('feedbackLine').innerText = '';

            const oData = activeOrders[currentIndex];

            document.getElementById('diveHeader').innerText = `Dive Order ${currentIndex + 1}: ${oData.title}`;
            document.getElementById('roundCounter').innerText = `${currentIndex + 1} / ${activeOrders.length}`;
            document.getElementById('orderText').innerText = oData.prompt;
            updateHUD();

            if (oData.type === 'slider') {
                document.getElementById('sliderPanel').style.display = 'block';
                document.getElementById('mcPanel').style.display = 'none';
                document.getElementById('depthSlider').value = -50;
                updateDepthReadout();
            } else {
                document.getElementById('sliderPanel').style.display = 'none';
                document.getElementById('mcPanel').style.display = 'block';
                renderMcOptions(oData);
            }
        }

        function renderMcOptions(oData) {
            const allOptions = ArcadeKit.shuffle([oData.correct, ...oData.distractors]);
            const grid = document.getElementById('optionsGrid');
            grid.innerHTML = '';
            allOptions.forEach((val) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.innerText = `${val} m`;
                btn.onclick = () => evaluateMc(val, oData.correct, btn);
                grid.appendChild(btn);
            });
        }

        function updateDepthReadout() {
            const val = document.getElementById('depthSlider').value;
            document.getElementById('depthReadout').innerText = `${val} m`;
        }

        function updateHUD() {
            document.getElementById('scoreDisplay').innerText = `${score} PTS`;
            const fill = document.getElementById('hullFill');
            const clamped = Math.max(0, hull);
            fill.style.width = `${clamped}%`;
            if (hull > 50) {
                fill.style.backgroundColor = 'var(--accent-green)';
            } else if (hull > 25) {
                fill.style.backgroundColor = 'var(--accent-amber)';
            } else {
                fill.style.backgroundColor = 'var(--accent-red)';
            }
        }

        function lockDepth() {
            if (isLocked) return;
            isLocked = true;

            const oData = activeOrders[currentIndex];
            const achieved = parseInt(document.getElementById('depthSlider').value, 10);
            const error = Math.abs(achieved - oData.target);
            const feedback = document.getElementById('feedbackLine');

            let delay;

            if (error === 0) {
                score += 100;
                hull = Math.min(100, hull + 8);
                feedback.className = 'feedback-line text-success';
                feedback.innerText = '🎯 DEPTH LOCKED PRECISELY! +100 PTS // Hull Reinforced';
                delay = 1100;
            } else if (error <= 4) {
                score += 40;
                hull = Math.max(0, hull - 10);
                feedback.className = 'feedback-line text-error';
                feedback.innerText = `〰️ CLOSE, BUT NOT EXACT! Target was ${oData.target} m, you set ${achieved} m. +40 PTS, -10% Hull`;
                delay = 1600;
            } else {
                const penalty = Math.min(35, Math.round(10 + error * 0.9));
                hull = Math.max(0, hull - penalty);
                feedback.className = 'feedback-line text-error';
                feedback.innerText = `❌ MISSED DEPTH! Target was ${oData.target} m, you set ${achieved} m. -${penalty}% Hull`;
                delay = 1800;
            }

            updateHUD();
            advanceOrError(delay);
        }

        function evaluateMc(selectedVal, correctVal, btnEl) {
            if (isLocked) return;
            isLocked = true;

            const feedback = document.getElementById('feedbackLine');

            if (selectedVal === correctVal) {
                score += 100;
                hull = Math.min(100, hull + 8);
                btnEl.style.borderColor = 'var(--accent-green)';
                btnEl.style.background = 'rgba(52, 211, 153, 0.15)';
                feedback.className = 'feedback-line text-success';
                feedback.innerText = '🎯 DISTANCE LOG CONFIRMED! +100 PTS // Hull Reinforced';
                updateHUD();
                advanceOrError(1100);
            } else {
                hull = Math.max(0, hull - 25);
                btnEl.style.borderColor = 'var(--accent-red)';
                btnEl.style.background = 'rgba(240, 75, 92, 0.15)';
                feedback.className = 'feedback-line text-error';
                feedback.innerText = `❌ INCORRECT LOG! Correct distance was ${correctVal} m. -25% Hull`;
                updateHUD();
                advanceOrError(1700);
            }
        }

        function advanceOrError(delay) {
            if (hull <= 0) {
                setTimeout(() => { triggerFail(); }, delay);
            } else {
                setTimeout(() => {
                    currentIndex++;
                    if (currentIndex >= activeOrders.length) {
                        triggerVictory();
                    } else {
                        loadOrder();
                    }
                }, delay);
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
