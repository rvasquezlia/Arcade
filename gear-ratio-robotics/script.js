        // TERRAIN CHALLENGE BANK (target ratio = driver teeth : driven teeth)
        // All target ratios are hand-verified to sit comfortably inside the
        // dial's [0.2, 3.4] range with room on both sides of the ±0.06 tolerance.
        const terrainBank = [
            { title: "Dust Slope Alpha", prompt: "The rover's wheels need extra torque to grind up this loose dust slope. Dial in a driver-to-driven ratio of 1:2 and engage the drive.", targetNum: 1, targetDen: 2 },
            { title: "Crater Rim Ascent", prompt: "A steep crater rim demands high speed over torque. Dial in a driver-to-driven ratio of 2:1 and engage the drive.", targetNum: 2, targetDen: 1 },
            { title: "Rocky Ridge Climb", prompt: "Loose rocks on this ridge need a balanced power boost. Dial in a driver-to-driven ratio of 3:2 and engage the drive.", targetNum: 3, targetDen: 2 },
            { title: "Loose Gravel Descent", prompt: "Controlled descent over gravel calls for a gentler ratio. Dial in a driver-to-driven ratio of 2:3 and engage the drive.", targetNum: 2, targetDen: 3 },
            { title: "Sandy Dune Traverse", prompt: "Soft sand dunes need a mild torque advantage. Dial in a driver-to-driven ratio of 4:5 and engage the drive.", targetNum: 4, targetDen: 5 },
            { title: "Boulder Field Push", prompt: "Pushing past boulders needs a bit more speed than torque. Dial in a driver-to-driven ratio of 5:4 and engage the drive.", targetNum: 5, targetDen: 4 },
            { title: "Canyon Wall Scale", prompt: "Scaling this canyon wall needs strong climbing torque. Dial in a driver-to-driven ratio of 3:4 and engage the drive.", targetNum: 3, targetDen: 4 },
            { title: "Ravine Crossing", prompt: "Crossing the ravine floor favors speed over torque. Dial in a driver-to-driven ratio of 4:3 and engage the drive.", targetNum: 4, targetDen: 3 },
            { title: "Steep Crevice Drop", prompt: "A steep crevice drop needs heavy torque control. Dial in a driver-to-driven ratio of 1:3 and engage the drive.", targetNum: 1, targetDen: 3 },
            { title: "Ice Cap Assault", prompt: "The polar ice cap needs maximum speed to avoid getting stuck. Dial in a driver-to-driven ratio of 3:1 and engage the drive.", targetNum: 3, targetDen: 1 },
            { title: "Plateau Sprint", prompt: "An open plateau is perfect for a fast sprint. Dial in a driver-to-driven ratio of 5:2 and engage the drive.", targetNum: 5, targetDen: 2 },
            { title: "Regolith Wade", prompt: "Wading through deep regolith dust needs strong torque. Dial in a driver-to-driven ratio of 2:5 and engage the drive.", targetNum: 2, targetDen: 5 },
            { title: "Nightfall Descent", prompt: "Low visibility at nightfall calls for a cautious, torque-heavy ratio. Dial in a driver-to-driven ratio of 1:2 and engage the drive.", targetNum: 1, targetDen: 2 },
            { title: "Twilight Ridge", prompt: "This twilight ridge climb needs balanced power. Dial in a driver-to-driven ratio of 3:2 and engage the drive.", targetNum: 3, targetDen: 2 },
            { title: "Basin Crossing", prompt: "Crossing the flat basin favors a gentler ratio. Dial in a driver-to-driven ratio of 2:3 and engage the drive.", targetNum: 2, targetDen: 3 },
            { title: "Meteor Crater Rim", prompt: "The meteor crater rim needs a touch more speed than torque. Dial in a driver-to-driven ratio of 5:4 and engage the drive.", targetNum: 5, targetDen: 4 },
            { title: "South Pole Approach", prompt: "Approaching the south pole ice fields needs mild extra torque. Dial in a driver-to-driven ratio of 4:5 and engage the drive.", targetNum: 4, targetDen: 5 },
            { title: "Highland Traverse", prompt: "This rocky highland traverse needs strong climbing torque. Dial in a driver-to-driven ratio of 3:4 and engage the drive.", targetNum: 3, targetDen: 4 }
        ];

        // Comedic engineer-bot voice lines
        const SUCCESS_QUIPS = [
            "🎉 CLANK-CLICK! Gear lock achieved!",
            "⚙️ Teeth meshed like old friends!",
            "🤖 RATIO-9000 says: \"Chef's kiss.\"",
            "✨ Smooth as a freshly oiled bolt!",
            "🔧 Precision! My circuits are tingling."
        ];
        const FAIL_QUIPS = [
            "🥴 The gears ground like a bad breakfast burrito.",
            "🤖 RATIO-9000 says: \"That is... not the ratio.\"",
            "⚠️ Somewhere, a bolt just wept.",
            "🌀 The rover attempted the robot. Not the good kind.",
            "🔩 Close, but the workshop cat could do better."
        ];

        // DIAL CONFIGURATION
        const MIN_RATIO = 0.2;
        const MAX_RATIO = 3.4;
        const TOLERANCE = 0.06;

        // GEAR VISUAL LAYOUT (SVG viewBox 0 0 260 160)
        const DRIVER_CX = 55;
        const GEAR_CY = 80;
        const BASE_R = 26;
        const GEAR_GAP = 4;
        const BASE_TEETH = 10;

        // GAME STATE
        let currentIndex = 0;
        let score = 0;
        let power = 100;
        let activeRounds = [];
        let isDarkMode = true;
        let isLocked = false;
        let playerName = '';
        let roverProgressPercent = 0;
        let failedAttemptsThisRound = 0;

        // Dial state
        let dialValue = MIN_RATIO;
        let dialDragging = false;

        // Gear animation state
        let driverAngle = 0;
        let drivenAngle = 0;
        let lastFrameTime = null;
        let animSpeedMultiplier = 1;

        function clamp(v, min, max) {
            return Math.max(min, Math.min(max, v));
        }

        function pickQuip(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
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

        // ===================== RATIO DIAL =====================

        function computeAngleFromEvent(e, rect) {
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            let deg = Math.atan2(dx, -dy) * 180 / Math.PI; // 0=up, 90=right, -90=left
            if (deg > 135) deg = 135;
            if (deg < -135) deg = -135;
            return deg;
        }

        function angleToValue(deg) {
            return MIN_RATIO + (deg + 135) / 270 * (MAX_RATIO - MIN_RATIO);
        }

        function valueToAngle(v) {
            return (v - MIN_RATIO) / (MAX_RATIO - MIN_RATIO) * 270 - 135;
        }

        function setDialValue(v) {
            dialValue = clamp(v, MIN_RATIO, MAX_RATIO);
            const deg = valueToAngle(dialValue);
            const needle = document.getElementById('dialNeedle');
            if (needle) needle.style.transform = `translate(-50%, -100%) rotate(${deg}deg)`;
            const dialEl = document.getElementById('ratioDial');
            if (dialEl) dialEl.setAttribute('aria-valuenow', dialValue.toFixed(2));
            updateReadout();
            updateDrivenGearSize();
        }

        function updateReadout() {
            const el = document.getElementById('achievedReadout');
            if (el) el.innerText = dialValue.toFixed(2);
            const badge = document.getElementById('matchBadge');
            if (!badge) return;
            const round = activeRounds[currentIndex];
            if (!round) {
                badge.innerText = '';
                badge.className = 'match-badge';
                return;
            }
            const target = round.targetNum / round.targetDen;
            const diff = Math.abs(dialValue - target);
            if (diff <= TOLERANCE) {
                badge.innerText = '✅ IN RANGE';
                badge.className = 'match-badge match-good';
            } else if (diff <= 0.3) {
                badge.innerText = '🟡 GETTING WARM';
                badge.className = 'match-badge match-warm';
            } else {
                badge.innerText = '🔴 OFF TARGET';
                badge.className = 'match-badge match-bad';
            }
        }

        function initDial() {
            const dial = document.getElementById('ratioDial');
            if (!dial) return;

            function handleMove(e) {
                if (isLocked) return;
                const rect = dial.getBoundingClientRect();
                const deg = computeAngleFromEvent(e, rect);
                setDialValue(angleToValue(deg));
            }

            dial.addEventListener('pointerdown', (e) => {
                if (isLocked) return;
                try { dial.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
                dialDragging = true;
                dial.classList.add('dragging');
                dial.focus();
                handleMove(e);
                e.preventDefault();
            });

            dial.addEventListener('pointermove', (e) => {
                if (!dialDragging) return;
                handleMove(e);
                e.preventDefault();
            });

            function endDrag() {
                dialDragging = false;
                dial.classList.remove('dragging');
            }
            dial.addEventListener('pointerup', endDrag);
            dial.addEventListener('pointercancel', endDrag);
            dial.addEventListener('lostpointercapture', endDrag);

            dial.addEventListener('keydown', (e) => {
                if (isLocked) return;
                const step = 0.02;
                if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
                    setDialValue(dialValue + step);
                    e.preventDefault();
                } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
                    setDialValue(dialValue - step);
                    e.preventDefault();
                } else if (e.key === 'Home') {
                    setDialValue(MIN_RATIO);
                    e.preventDefault();
                } else if (e.key === 'End') {
                    setDialValue(MAX_RATIO);
                    e.preventDefault();
                }
            });
        }

        // ===================== MESHED GEARS =====================

        function buildGearMarkup(teeth, radius, fillClass) {
            let s = `<circle r="${(radius * 0.8).toFixed(2)}" class="${fillClass}"></circle>`;
            const toothW = radius * 0.26;
            const toothH = radius * 0.32;
            for (let i = 0; i < teeth; i++) {
                const ang = i * (360 / teeth);
                s += `<rect x="${(-toothW / 2).toFixed(2)}" y="${(-(radius * 0.8 + toothH * 0.6)).toFixed(2)}" width="${toothW.toFixed(2)}" height="${toothH.toFixed(2)}" rx="1.5" transform="rotate(${ang.toFixed(2)})" class="${fillClass}"></rect>`;
            }
            s += `<circle r="${(radius * 0.24).toFixed(2)}" class="gear-hole"></circle>`;
            s += `<circle r="${(radius * 0.08).toFixed(2)}" class="gear-bolt"></circle>`;
            return s;
        }

        function initGears() {
            const driverGroup = document.getElementById('driverGearGroup');
            const driverSpin = document.getElementById('driverGearSpin');
            const drivenSpin = document.getElementById('drivenGearSpin');
            if (driverGroup) driverGroup.setAttribute('transform', `translate(${DRIVER_CX}, ${GEAR_CY})`);
            if (driverSpin) driverSpin.innerHTML = buildGearMarkup(BASE_TEETH, BASE_R, 'gear-fill-driver');
            if (drivenSpin) drivenSpin.innerHTML = buildGearMarkup(BASE_TEETH, BASE_R, 'gear-fill-driven');
            updateDrivenGearSize();
        }

        function updateDrivenGearSize() {
            const group = document.getElementById('drivenGearGroup');
            if (!group) return;
            const scale = clamp(1 / dialValue, 0.45, 2.2);
            const cx2 = DRIVER_CX + BASE_R + BASE_R * scale + GEAR_GAP;
            group.setAttribute('transform', `translate(${cx2.toFixed(2)}, ${GEAR_CY}) scale(${scale.toFixed(3)})`);
        }

        function animFrame(ts) {
            if (lastFrameTime === null) lastFrameTime = ts;
            const dt = Math.min(0.05, (ts - lastFrameTime) / 1000);
            lastFrameTime = ts;

            const baseSpeed = 70; // degrees per second at normal speed
            const speed = baseSpeed * animSpeedMultiplier;
            const ratioForSpeed = clamp(dialValue, MIN_RATIO, MAX_RATIO);

            driverAngle = (driverAngle + speed * dt) % 360;
            drivenAngle = (drivenAngle - speed * dt * ratioForSpeed) % 360;

            const driverSpin = document.getElementById('driverGearSpin');
            const drivenSpin = document.getElementById('drivenGearSpin');
            if (driverSpin) driverSpin.setAttribute('transform', `rotate(${driverAngle.toFixed(2)})`);
            if (drivenSpin) drivenSpin.setAttribute('transform', `rotate(${drivenAngle.toFixed(2)})`);

            requestAnimationFrame(animFrame);
        }

        // ===================== GAME FLOW =====================

        function startGame() {
            const name = ArcadeKit.requireName('playerNameInput', 'playerNameError');
            if (!name) return;
            playerName = name;

            currentIndex = 0;
            score = 0;
            power = 100;
            roverProgressPercent = 0;
            failedAttemptsThisRound = 0;
            activeRounds = ArcadeKit.sample(terrainBank, 12);

            const roverIcon = document.getElementById('roverIcon');
            roverIcon.classList.remove('hop', 'stumble');
            roverIcon.style.left = '2%';
            document.getElementById('startScreen').style.display = 'none';
            document.getElementById('failScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'none';
            document.getElementById('gameScreen').style.display = 'block';

            loadRound();
        }

        function loadRound() {
            isLocked = false;
            failedAttemptsThisRound = 0;
            const engageBtn = document.getElementById('engageBtn');
            if (engageBtn) engageBtn.disabled = false;

            const feedback = document.getElementById('feedbackLine');
            feedback.innerText = '';
            feedback.className = 'feedback-line';

            setDialValue(MIN_RATIO);

            const mData = activeRounds[currentIndex];
            document.getElementById('terrainHeader').innerText = `Terrain ${currentIndex + 1}: ${mData.title}`;
            document.getElementById('roundCounter').innerText = `${currentIndex + 1} / ${activeRounds.length}`;
            document.getElementById('missionText').innerText = mData.prompt;
            document.getElementById('targetReadout').innerText = `${mData.targetNum} : ${mData.targetDen}  (= ${(mData.targetNum / mData.targetDen).toFixed(2)})`;

            updateReadout();
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
            roverProgressPercent = Math.min(92, roverProgressPercent + amount);
            document.getElementById('roverIcon').style.left = `${2 + roverProgressPercent}%`;
        }

        // Engage the dialed gear ratio against the current terrain target
        function engageGearTrain() {
            if (isLocked) return;
            isLocked = true;

            const engageBtn = document.getElementById('engageBtn');
            if (engageBtn) engageBtn.disabled = true;

            const feedback = document.getElementById('feedbackLine');
            const roverIcon = document.getElementById('roverIcon');
            const mData = activeRounds[currentIndex];
            const target = mData.targetNum / mData.targetDen;
            const diff = Math.abs(dialValue - target);
            const isMatch = diff <= TOLERANCE;

            if (isMatch) {
                animSpeedMultiplier = 3.2;
                feedback.className = 'feedback-line text-success';
                feedback.innerText = `${pickQuip(SUCCESS_QUIPS)} Ratio locked at ${dialValue.toFixed(2)} (target ${target.toFixed(2)}). +Power // Rover advances!`;

                setTimeout(() => {
                    animSpeedMultiplier = 1;
                    roverIcon.classList.add('hop');
                    score += Math.max(60, 130 - failedAttemptsThisRound * 20);
                    power = Math.min(100, power + 8);
                    moveRover(100 / activeRounds.length);
                    updateHUD();

                    setTimeout(() => {
                        roverIcon.classList.remove('hop');
                        currentIndex++;
                        if (currentIndex >= activeRounds.length) {
                            triggerVictory();
                        } else {
                            loadRound();
                        }
                    }, 650);
                }, 500);
            } else {
                failedAttemptsThisRound++;
                const penalty = Math.min(30, Math.round(10 + diff * 35));
                animSpeedMultiplier = 0.15;
                feedback.className = 'feedback-line text-error';
                feedback.innerText = `${pickQuip(FAIL_QUIPS)} You dialed ${dialValue.toFixed(2)}, target was ${target.toFixed(2)}. -${penalty}% Power. Keep twisting and try again!`;

                setTimeout(() => {
                    roverIcon.classList.add('stumble');
                    power = Math.max(0, power - penalty);
                    updateHUD();

                    setTimeout(() => {
                        roverIcon.classList.remove('stumble');
                        animSpeedMultiplier = 1;
                        if (power <= 0) {
                            triggerFail();
                        } else {
                            isLocked = false;
                            if (engageBtn) engageBtn.disabled = false;
                        }
                    }, 650);
                }, 500);
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

        // Boot up the dial + gear rig immediately (game screen is hidden
        // until startGame(), but the rig can safely initialize early).
        initDial();
        initGears();
        requestAnimationFrame(animFrame);
