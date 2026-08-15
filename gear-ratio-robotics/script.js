        // GEAR TEETH OPTIONS AVAILABLE IN THE WORKSHOP
        const gearOptions = [8, 10, 12, 15, 16, 20, 24, 30];

        // TERRAIN CHALLENGE BANK (target ratio = driver teeth : driven teeth)
        // All target ratios below are hand-verified to be exactly achievable
        // using two distinct values from gearOptions (see design notes).
        const terrainBank = [
            { title: "Dust Slope Alpha", prompt: "The rover's wheels need extra torque to grind up this loose dust slope. Build a gear train with a driver-to-driven ratio of 1:2.", targetNum: 1, targetDen: 2 },
            { title: "Crater Rim Ascent", prompt: "A steep crater rim demands high speed over torque. Build a gear train with a driver-to-driven ratio of 2:1.", targetNum: 2, targetDen: 1 },
            { title: "Rocky Ridge Climb", prompt: "Loose rocks on this ridge need a balanced power boost. Build a gear train with a driver-to-driven ratio of 3:2.", targetNum: 3, targetDen: 2 },
            { title: "Loose Gravel Descent", prompt: "Controlled descent over gravel calls for a gentler ratio. Build a gear train with a driver-to-driven ratio of 2:3.", targetNum: 2, targetDen: 3 },
            { title: "Sandy Dune Traverse", prompt: "Soft sand dunes need a mild torque advantage. Build a gear train with a driver-to-driven ratio of 4:5.", targetNum: 4, targetDen: 5 },
            { title: "Boulder Field Push", prompt: "Pushing past boulders needs a bit more speed than torque. Build a gear train with a driver-to-driven ratio of 5:4.", targetNum: 5, targetDen: 4 },
            { title: "Canyon Wall Scale", prompt: "Scaling this canyon wall needs strong climbing torque. Build a gear train with a driver-to-driven ratio of 3:4.", targetNum: 3, targetDen: 4 },
            { title: "Ravine Crossing", prompt: "Crossing the ravine floor favors speed over torque. Build a gear train with a driver-to-driven ratio of 4:3.", targetNum: 4, targetDen: 3 },
            { title: "Steep Crevice Drop", prompt: "A steep crevice drop needs heavy torque control. Build a gear train with a driver-to-driven ratio of 1:3.", targetNum: 1, targetDen: 3 },
            { title: "Ice Cap Assault", prompt: "The polar ice cap needs maximum speed to avoid getting stuck. Build a gear train with a driver-to-driven ratio of 3:1.", targetNum: 3, targetDen: 1 },
            { title: "Plateau Sprint", prompt: "An open plateau is perfect for a fast sprint. Build a gear train with a driver-to-driven ratio of 5:2.", targetNum: 5, targetDen: 2 },
            { title: "Regolith Wade", prompt: "Wading through deep regolith dust needs strong torque. Build a gear train with a driver-to-driven ratio of 2:5.", targetNum: 2, targetDen: 5 },
            { title: "Nightfall Descent", prompt: "Low visibility at nightfall calls for a cautious, torque-heavy ratio. Build a gear train with a driver-to-driven ratio of 1:2.", targetNum: 1, targetDen: 2 },
            { title: "Twilight Ridge", prompt: "This twilight ridge climb needs balanced power. Build a gear train with a driver-to-driven ratio of 3:2.", targetNum: 3, targetDen: 2 },
            { title: "Basin Crossing", prompt: "Crossing the flat basin favors a gentler ratio. Build a gear train with a driver-to-driven ratio of 2:3.", targetNum: 2, targetDen: 3 },
            { title: "Meteor Crater Rim", prompt: "The meteor crater rim needs a touch more speed than torque. Build a gear train with a driver-to-driven ratio of 5:4.", targetNum: 5, targetDen: 4 },
            { title: "South Pole Approach", prompt: "Approaching the south pole ice fields needs mild extra torque. Build a gear train with a driver-to-driven ratio of 4:5.", targetNum: 4, targetDen: 5 },
            { title: "Highland Traverse", prompt: "This rocky highland traverse needs strong climbing torque. Build a gear train with a driver-to-driven ratio of 3:4.", targetNum: 3, targetDen: 4 }
        ];

        // GAME STATE
        let currentIndex = 0;
        let score = 0;
        let power = 100;
        let activeRounds = [];
        let isDarkMode = true;
        let isLocked = false;
        let playerName = '';
        let selectedDriver = null;
        let selectedDriven = null;
        let roverProgressPercent = 0;

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

        // Greatest Common Divisor (for simplifying displayed ratios)
        function gcd(a, b) {
            a = Math.abs(a); b = Math.abs(b);
            while (b) { [a, b] = [b, a % b]; }
            return a || 1;
        }

        // Finds one exact gear pair from gearOptions that matches a target ratio.
        // Used only to show a helpful hint after a missed lock.
        function findExamplePair(targetNum, targetDen) {
            for (const a of gearOptions) {
                for (const b of gearOptions) {
                    if (a !== b && a * targetDen === b * targetNum) {
                        return { driver: a, driven: b };
                    }
                }
            }
            return null;
        }

        // Start Game
        function startGame() {
            const name = ArcadeKit.requireName('playerNameInput', 'playerNameError');
            if (!name) return;
            playerName = name;

            currentIndex = 0;
            score = 0;
            power = 100;
            roverProgressPercent = 0;
            activeRounds = ArcadeKit.sample(terrainBank, 12);

            document.getElementById('roverIcon').style.left = '2%';
            document.getElementById('startScreen').style.display = 'none';
            document.getElementById('failScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'none';
            document.getElementById('gameScreen').style.display = 'block';

            loadRound();
        }

        // Render one row of selectable gear teeth buttons
        function renderGearButtons(containerId, which) {
            const container = document.getElementById(containerId);
            container.innerHTML = '';
            gearOptions.forEach((teeth) => {
                const btn = document.createElement('button');
                btn.className = 'gear-btn';
                btn.type = 'button';
                btn.innerText = `⚙️ ${teeth}t`;
                btn.onclick = () => selectGear(which, teeth, btn, container);
                container.appendChild(btn);
            });
        }

        function selectGear(which, val, btnEl, containerEl) {
            if (isLocked) return;
            if (which === 'driver') {
                selectedDriver = val;
            } else {
                selectedDriven = val;
            }
            [...containerEl.children].forEach((c) => c.classList.remove('selected'));
            btnEl.classList.add('selected');
            updateAchievedReadout();
        }

        function updateAchievedReadout() {
            const el = document.getElementById('achievedReadout');
            if (selectedDriver === null || selectedDriven === null) {
                el.innerText = '— : —';
                return;
            }
            const g = gcd(selectedDriver, selectedDriven);
            const decimal = (selectedDriver / selectedDriven).toFixed(2);
            el.innerText = `${selectedDriver} : ${selectedDriven}  (simplified ${selectedDriver / g} : ${selectedDriven / g}, = ${decimal})`;
        }

        // Load a terrain round
        function loadRound() {
            isLocked = false;
            selectedDriver = null;
            selectedDriven = null;
            document.getElementById('feedbackLine').innerText = '';
            document.getElementById('achievedReadout').innerText = '— : —';

            const mData = activeRounds[currentIndex];

            document.getElementById('terrainHeader').innerText = `Terrain ${currentIndex + 1}: ${mData.title}`;
            document.getElementById('roundCounter').innerText = `${currentIndex + 1} / ${activeRounds.length}`;
            document.getElementById('missionText').innerText = mData.prompt;
            document.getElementById('targetReadout').innerText = `${mData.targetNum} : ${mData.targetDen}`;

            renderGearButtons('driverButtons', 'driver');
            renderGearButtons('drivenButtons', 'driven');

            updateHUD();
        }

        function updateHUD() {
            document.getElementById('scoreDisplay').innerText = `${score} PTS`;
            const fill = document.getElementById('powerFill');
            const clamped = Math.max(0, power);
            fill.style.width = `${clamped}%`;
            if (power > 50) {
                fill.style.backgroundColor = 'var(--accent-green)';
            } else if (power > 25) {
                fill.style.backgroundColor = 'var(--accent-orange)';
            } else {
                fill.style.backgroundColor = 'var(--accent-red)';
            }
        }

        function moveRover(amount) {
            roverProgressPercent = Math.min(90, roverProgressPercent + amount);
            document.getElementById('roverIcon').style.left = `${2 + roverProgressPercent}%`;
        }

        // Engage the built gear train against the current terrain target
        function engageGearTrain() {
            if (isLocked) return;

            const feedback = document.getElementById('feedbackLine');

            if (selectedDriver === null || selectedDriven === null) {
                feedback.className = 'feedback-line text-error';
                feedback.innerText = '⚠️ Select both a driver gear and a driven gear first!';
                return;
            }

            isLocked = true;
            const mData = activeRounds[currentIndex];

            const isExact = (selectedDriver * mData.targetDen) === (selectedDriven * mData.targetNum);
            const achieved = selectedDriver / selectedDriven;
            const target = mData.targetNum / mData.targetDen;
            const error = Math.abs(achieved - target);

            let delay;

            if (isExact) {
                score += 100;
                power = Math.min(100, power + 8);
                moveRover(7.5);
                feedback.className = 'feedback-line text-success';
                feedback.innerText = '🎯 PERFECT GEAR LOCK! +100 PTS // Power Cells Recharged';
                delay = 1100;
            } else if (error <= 0.15) {
                score += 40;
                power = Math.max(0, power - 12);
                moveRover(2.5);
                feedback.className = 'feedback-line text-error';
                feedback.innerText = `⚙️ CLOSE, BUT NOT EXACT! Your ratio was ${achieved.toFixed(2)}, target was ${target.toFixed(2)}. +40 PTS, -12% Power`;
                delay = 1600;
            } else {
                const penalty = Math.min(35, Math.round(15 + error * 40));
                power = Math.max(0, power - penalty);
                moveRover(0.5);
                const example = findExamplePair(mData.targetNum, mData.targetDen);
                const hint = example ? ` Try driver ${example.driver}t : driven ${example.driven}t next time.` : '';
                feedback.className = 'feedback-line text-error';
                feedback.innerText = `❌ MISMATCHED GEAR TRAIN! -${penalty}% Power.${hint}`;
                delay = 1900;
            }

            updateHUD();

            if (power <= 0) {
                setTimeout(() => { triggerFail(); }, delay);
            } else {
                setTimeout(() => {
                    currentIndex++;
                    if (currentIndex >= activeRounds.length) {
                        triggerVictory();
                    } else {
                        loadRound();
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
