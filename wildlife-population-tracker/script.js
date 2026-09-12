        // WILDLIFE DATA SETS — every mean/median/mode/range value below has been
        // hand-verified by sorting the values and recomputing each statistic
        // (see design notes). Each data set produces 4 questions (one per stat),
        // and within each data set all four stat values are distinct.
        const datasets = [
            {
                species: "gray wolves",
                unit: "sightings",
                context: "Field researchers tracked gray wolf sightings over 5 weeks",
                values: [9, 3, 10, 3, 5],
                mean: 6, median: 5, mode: 3, range: 7
            },
            {
                species: "sea turtles",
                unit: "nests counted",
                context: "Rangers counted sea turtle nests across 8 beaches",
                values: [12, 15, 12, 18, 20, 12, 9, 14],
                mean: 14, median: 13, mode: 12, range: 11
            },
            {
                species: "bald eagles",
                unit: "nests recorded",
                context: "Surveyors recorded bald eagle nests across 7 zones",
                values: [9, 3, 13, 5, 1, 3, 8],
                mean: 6, median: 5, mode: 3, range: 12
            },
            {
                species: "manatees",
                unit: "manatees counted",
                context: "Wildlife biologists counted manatees during 6 aerial surveys",
                values: [14, 18, 14, 22, 26, 14],
                mean: 18, median: 16, mode: 14, range: 12
            },
            {
                species: "coral reef fish",
                unit: "species counted",
                context: "Divers counted distinct fish species across 9 dive sites",
                values: [4, 7, 4, 11, 14, 4, 9, 7, 12],
                mean: 8, median: 7, mode: 4, range: 10
            }
        ];

        const statMeta = {
            mean: { label: "mean (average)", question: "What is the mean number of" },
            median: { label: "median", question: "What is the median number of" },
            mode: { label: "mode", question: "What is the mode of the" },
            range: { label: "range", question: "What is the range of the" }
        };

        // Ranger flavor lines
        const rangerWinLines = [
            "Data confirmed, ranger!",
            "Boom — that reading's dead-on.",
            "The wolves howl in approval.",
            "Clean measurement. Nailed it.",
            "Ecosystem report: certified accurate!",
            "That pin landed exactly where the science says it should."
        ];
        const rangerFailLines = [
            "Eh, the eagles are unimpressed.",
            "Close, but the manatees disagree.",
            "Recheck your math, field researcher.",
            "The trail cam caught that — and it wasn't right.",
            "Not quite. Even the turtles paused for that one.",
            "Field notes say: try again, rookie."
        ];

        function pickRandom(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }

        // Builds a friendly number-line scale for a data set: starts at 0 (counts
        // can't be negative), extends past the highest value with headroom, and
        // picks a tick spacing that stays readable. Because every stat (mean,
        // median, mode, range) is guaranteed to land between 0 and the data's
        // max value, this scale always has room for the correct answer.
        function computeLineConfig(values) {
            const dataMax = Math.max.apply(null, values);
            const majorStep = dataMax <= 10 ? 1 : dataMax <= 20 ? 2 : dataMax <= 40 ? 5 : 10;
            const niceMax = Math.ceil(dataMax / majorStep) * majorStep + majorStep;
            return { min: 0, max: niceMax, majorStep: majorStep };
        }

        datasets.forEach((d) => { d.lineConfig = computeLineConfig(d.values); });

        // Build the full question bank: one question per statistic per data set.
        const wildlifeBank = [];
        datasets.forEach((d) => {
            ['mean', 'median', 'mode', 'range'].forEach((statKey) => {
                wildlifeBank.push({
                    dataText: `${d.context}: ${d.values.join(', ')} ${d.unit}.`,
                    questionText: `🔎 ${statMeta[statKey].question} ${d.species} ${d.unit}? (${statMeta[statKey].label})`,
                    correct: d[statKey],
                    values: d.values.slice(),
                    lineConfig: d.lineConfig,
                    statKey: statKey
                });
            });
        });

        // GAME STATE
        let currentIndex = 0;
        let score = 0;
        let lives = 3;
        let activeQuestions = [];
        let isDarkMode = true;
        let isLocked = false;
        let playerName = '';

        let phase = 1;                 // 1 = sort tokens, 2 = measure with pin
        let currentLineConfig = null;
        let placedStack = {};
        let placedTokenCount = 0;
        let pinPlaced = false;
        let currentPinValue = null;

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
            lives = 3;
            activeQuestions = ArcadeKit.sample(wildlifeBank, 12);

            document.getElementById('startScreen').style.display = 'none';
            document.getElementById('failScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'none';
            document.getElementById('gameScreen').style.display = 'block';

            loadSurvey();
        }

        function loadSurvey() {
            isLocked = false;
            phase = 1;
            pinPlaced = false;
            currentPinValue = null;

            document.getElementById('feedbackLine').innerText = '';

            const qData = activeQuestions[currentIndex];

            document.getElementById('surveyHeader').innerText = `Survey ${currentIndex + 1}`;
            document.getElementById('roundCounter').innerText = `${currentIndex + 1} / ${activeQuestions.length}`;
            document.getElementById('scoreDisplay').innerText = `${score} PTS`;
            document.getElementById('livesDisplay').innerText = `${lives} / 3`;

            document.getElementById('dataText').innerText = qData.dataText;
            document.getElementById('questionText').innerText = '🔍 Step 1: Sort the camera counts onto the field log line.';

            document.getElementById('phaseLabel').innerText = 'STEP 1 · SORT THE CAMERA COUNTS';
            document.getElementById('phaseHint').innerText = "Drag every numbered tag down near the line — get it close and it'll click into its true spot.";
            document.getElementById('pinZone').style.display = 'none';

            buildTrack(qData.lineConfig);
            buildTokenTray(qData.values);
            resetPin();
        }

        function enterPhase2() {
            phase = 2;
            const qData = activeQuestions[currentIndex];

            document.getElementById('phaseLabel').innerText = 'STEP 2 · TAKE YOUR MEASUREMENT';
            document.getElementById('phaseHint').innerText = 'Drag the pin onto the line where you think the answer is, then lock it in.';
            document.getElementById('questionText').innerText = qData.questionText;
            document.getElementById('pinZone').style.display = 'flex';
        }

        // ---------- Number line ----------

        function valueToPercent(value, cfg) {
            return ((value - cfg.min) / (cfg.max - cfg.min)) * 100;
        }

        function clientXToValue(clientX, railRect, cfg) {
            let pct = ((clientX - railRect.left) / railRect.width) * 100;
            pct = Math.max(0, Math.min(100, pct));
            const val = cfg.min + (pct / 100) * (cfg.max - cfg.min);
            return Math.round(val);
        }

        function buildTrack(cfg) {
            currentLineConfig = cfg;
            placedStack = {};
            placedTokenCount = 0;

            const rail = document.getElementById('lineRail');
            rail.innerHTML = '';

            const minorStep = cfg.majorStep <= 2 ? 1 : cfg.majorStep;
            for (let v = cfg.min; v <= cfg.max; v += minorStep) {
                const isMajor = Math.round((v - cfg.min) % cfg.majorStep) === 0;
                const tick = document.createElement('div');
                tick.className = 'tick ' + (isMajor ? 'tick-major' : 'tick-minor');
                tick.style.left = valueToPercent(v, cfg) + '%';
                rail.appendChild(tick);

                if (isMajor) {
                    const label = document.createElement('div');
                    label.className = 'tick-label';
                    label.style.left = valueToPercent(v, cfg) + '%';
                    label.innerText = v;
                    rail.appendChild(label);
                }
            }
        }

        function isOverRail(clientX, clientY, railRect) {
            const padX = 24, padY = 46;
            return clientX >= railRect.left - padX && clientX <= railRect.right + padX &&
                   clientY >= railRect.top - padY && clientY <= railRect.bottom + padY;
        }

        // ---------- Tokens (sorting phase) ----------

        function buildTokenTray(values) {
            const tray = document.getElementById('tokenTray');
            tray.innerHTML = '';

            values.forEach((val, idx) => {
                const chip = document.createElement('div');
                chip.className = 'token-chip';
                chip.innerText = val;
                chip.dataset.value = val;

                const wobble = ((idx * 37) % 17) - 8;
                const lift = (idx % 3) * 8;
                const transformStr = `rotate(${wobble}deg) translateY(${-lift}px)`;
                chip.style.transform = transformStr;
                chip.dataset.origTransform = transformStr;

                tray.appendChild(chip);
                enableDrag(chip, 'token', val);
            });
        }

        function placeTokenOnRail(el, value) {
            const rail = document.getElementById('lineRail');
            const pct = valueToPercent(value, currentLineConfig);
            const key = String(value);
            placedStack[key] = (placedStack[key] || 0) + 1;
            const stackIdx = placedStack[key] - 1;

            el.style.position = 'absolute';
            el.style.left = pct + '%';
            el.style.top = '50%';
            el.style.zIndex = 10 + stackIdx;
            el.style.margin = '0';
            el.style.transform = `translate(-50%, -50%) translateY(${-stackIdx * 20}px)`;
            el.classList.remove('dragging');
            el.classList.add('token-placed');
            el.dataset.locked = '1';
            rail.appendChild(el);

            placedTokenCount++;
            const total = activeQuestions[currentIndex].values.length;
            if (placedTokenCount >= total) {
                setTimeout(enterPhase2, 500);
            }
        }

        function returnTokenToTray(el, parent, nextSibling) {
            el.classList.remove('dragging');
            el.style.position = 'static';
            el.style.left = '';
            el.style.top = '';
            el.style.zIndex = '';
            el.style.margin = '';
            el.style.transform = el.dataset.origTransform || '';

            if (parent) {
                if (nextSibling && nextSibling.parentElement === parent) {
                    parent.insertBefore(el, nextSibling);
                } else {
                    parent.appendChild(el);
                }
            } else {
                document.getElementById('tokenTray').appendChild(el);
            }

            el.classList.add('shake-reject');
            setTimeout(() => el.classList.remove('shake-reject'), 350);
        }

        // ---------- Measuring pin (question phase) ----------

        function resetPin() {
            const pin = document.getElementById('measuringPin');
            pin.classList.remove('pin-placed', 'pin-correct', 'pin-wrong');
            pin.style.position = 'static';
            pin.style.left = '';
            pin.style.top = '';
            pin.style.zIndex = '';
            pin.style.margin = '';
            pin.style.transform = '';
            document.getElementById('pinCaddy').appendChild(pin);

            pinPlaced = false;
            currentPinValue = null;
            document.getElementById('pinReading').innerText = '–';
            document.getElementById('lockInBtn').disabled = true;
        }

        function placePinOnRail(el, clientX, railRect) {
            const val = clientXToValue(clientX, railRect, currentLineConfig);
            const pct = valueToPercent(val, currentLineConfig);

            el.style.position = 'absolute';
            el.style.left = pct + '%';
            el.style.top = '0';
            el.style.zIndex = '20';
            el.style.margin = '0';
            el.style.transform = 'translate(-50%, -12%)';
            document.getElementById('lineRail').appendChild(el);
            el.classList.add('pin-placed');

            currentPinValue = val;
            pinPlaced = true;
            document.getElementById('pinReading').innerText = val;

            if (phase === 2 && !isLocked) {
                document.getElementById('lockInBtn').disabled = false;
            }
        }

        function returnPinToCaddy(el) {
            el.classList.remove('pin-placed');
            el.style.position = 'static';
            el.style.left = '';
            el.style.top = '';
            el.style.zIndex = '';
            el.style.margin = '';
            el.style.transform = '';
            document.getElementById('pinCaddy').appendChild(el);

            pinPlaced = false;
            currentPinValue = null;
            document.getElementById('pinReading').innerText = '–';
            document.getElementById('lockInBtn').disabled = true;
        }

        function previewPinReading(clientX, clientY) {
            const rail = document.getElementById('lineRail');
            const railRect = rail.getBoundingClientRect();
            if (isOverRail(clientX, clientY, railRect)) {
                const val = clientXToValue(clientX, railRect, currentLineConfig);
                document.getElementById('pinReading').innerText = val;
            }
        }

        function showCorrectMarker(correct) {
            const rail = document.getElementById('lineRail');
            const marker = document.createElement('div');
            marker.className = 'correct-marker';
            marker.style.left = valueToPercent(correct, currentLineConfig) + '%';
            marker.innerText = '✔ ' + correct;
            rail.appendChild(marker);
        }

        // ---------- Shared pointer-drag engine (mouse + touch) ----------

        function enableDrag(el, kind, value) {
            el.style.touchAction = 'none';
            let dragging = false;
            let startX = 0, startY = 0, origLeft = 0, origTop = 0;
            let origParent = null, origNext = null;

            el.addEventListener('pointerdown', (e) => {
                if (el.dataset.locked === '1') return;
                if (kind === 'pin' && (isLocked || phase !== 2)) return;

                dragging = true;
                try { el.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }

                const rect = el.getBoundingClientRect();
                startX = e.clientX;
                startY = e.clientY;
                origLeft = rect.left;
                origTop = rect.top;
                origParent = el.parentElement;
                origNext = el.nextSibling;

                el.classList.add('dragging');
                el.style.position = 'fixed';
                el.style.left = origLeft + 'px';
                el.style.top = origTop + 'px';
                el.style.margin = '0';
                el.style.transform = 'none';
                el.style.zIndex = '9999';
                document.body.appendChild(el);
            });

            el.addEventListener('pointermove', (e) => {
                if (!dragging) return;
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                el.style.left = (origLeft + dx) + 'px';
                el.style.top = (origTop + dy) + 'px';
                if (kind === 'pin') previewPinReading(e.clientX, e.clientY);
            });

            function finish(e) {
                if (!dragging) return;
                dragging = false;
                el.classList.remove('dragging');
                try { el.releasePointerCapture(e.pointerId); } catch (err) { /* ignore */ }

                const rail = document.getElementById('lineRail');
                const railRect = rail.getBoundingClientRect();
                const over = isOverRail(e.clientX, e.clientY, railRect);

                if (kind === 'token') {
                    if (over) {
                        placeTokenOnRail(el, value);
                    } else {
                        returnTokenToTray(el, origParent, origNext);
                    }
                } else {
                    if (over) {
                        placePinOnRail(el, e.clientX, railRect);
                    } else {
                        returnPinToCaddy(el);
                    }
                }
            }

            el.addEventListener('pointerup', finish);
            el.addEventListener('pointercancel', finish);
        }

        // ---------- Scoring ----------

        function lockInAnswer() {
            if (isLocked || phase !== 2 || !pinPlaced) return;
            isLocked = true;
            document.getElementById('lockInBtn').disabled = true;

            const qData = activeQuestions[currentIndex];
            const correct = qData.correct;
            const guess = currentPinValue;
            const isCorrect = Math.abs(guess - correct) <= 0.5;

            const pin = document.getElementById('measuringPin');
            const feedback = document.getElementById('feedbackLine');

            if (isCorrect) {
                score += 100;
                pin.classList.add('pin-correct');
                document.getElementById('scoreDisplay').innerText = `${score} PTS`;
                feedback.className = 'feedback-line text-success';
                feedback.innerText = `${pickRandom(rangerWinLines)} // +100 PTS`;

                setTimeout(() => {
                    currentIndex++;
                    if (currentIndex >= activeQuestions.length) {
                        triggerVictory();
                    } else {
                        loadSurvey();
                    }
                }, 1200);

            } else {
                lives--;
                pin.classList.add('pin-wrong');
                showCorrectMarker(correct);
                document.getElementById('livesDisplay').innerText = `${lives} / 3`;
                feedback.className = 'feedback-line text-error';
                feedback.innerText = `${pickRandom(rangerFailLines)} // -1 CREDIBILITY // Correct reading: ${correct}`;

                if (lives <= 0) {
                    setTimeout(() => { triggerFail(); }, 1600);
                } else {
                    setTimeout(() => { loadSurvey(); }, 1800);
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
