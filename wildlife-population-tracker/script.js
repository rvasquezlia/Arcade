        // WILDLIFE DATA SETS — every mean/median/mode/range value below has been
        // hand-verified by sorting the values and recomputing each statistic
        // (see design notes). Each data set produces 4 questions (one per stat),
        // and within each data set all four stat values are distinct so the
        // multiple-choice options never collide.
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

        // Build the full question bank: one question per statistic per data set.
        const wildlifeBank = [];
        datasets.forEach((d) => {
            ['mean', 'median', 'mode', 'range'].forEach((statKey) => {
                wildlifeBank.push({
                    dataText: `${d.context}: ${d.values.join(', ')} ${d.unit}.`,
                    questionText: `${statMeta[statKey].question} ${d.species} ${d.unit}? (${statMeta[statKey].label})`,
                    correct: d[statKey],
                    options: [d.mean, d.median, d.mode, d.range]
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
            document.getElementById('feedbackLine').innerText = '';

            const qData = activeQuestions[currentIndex];

            document.getElementById('surveyHeader').innerText = `Survey ${currentIndex + 1}`;
            document.getElementById('roundCounter').innerText = `${currentIndex + 1} / ${activeQuestions.length}`;
            document.getElementById('scoreDisplay').innerText = `${score} PTS`;
            document.getElementById('livesDisplay').innerText = `${lives} / 3`;

            document.getElementById('dataText').innerText = qData.dataText;
            document.getElementById('questionText').innerText = qData.questionText;

            const shuffledOptions = ArcadeKit.shuffle(qData.options);
            const grid = document.getElementById('optionsGrid');
            grid.innerHTML = '';

            shuffledOptions.forEach((val) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.innerText = val;
                btn.onclick = () => evaluateAnswer(val, qData.correct, btn);
                grid.appendChild(btn);
            });
        }

        function evaluateAnswer(selectedVal, correctVal, btnEl) {
            if (isLocked) return;
            isLocked = true;

            const feedback = document.getElementById('feedbackLine');

            if (selectedVal === correctVal) {
                score += 100;
                btnEl.style.borderColor = 'var(--accent-green)';
                btnEl.style.background = 'rgba(74, 222, 128, 0.15)';
                feedback.className = 'feedback-line text-success';
                feedback.innerText = 'DATA CONFIRMED // +100 PTS';

                setTimeout(() => {
                    currentIndex++;
                    if (currentIndex >= activeQuestions.length) {
                        triggerVictory();
                    } else {
                        loadSurvey();
                    }
                }, 1100);

            } else {
                lives--;
                btnEl.style.borderColor = 'var(--accent-red)';
                btnEl.style.background = 'rgba(239, 68, 68, 0.15)';
                feedback.className = 'feedback-line text-error';
                feedback.innerText = `INCORRECT CALCULATION // -1 CREDIBILITY // Correct: ${correctVal}`;

                document.getElementById('livesDisplay').innerText = `${lives} / 3`;

                if (lives <= 0) {
                    setTimeout(() => {
                        triggerFail();
                    }, 1400);
                } else {
                    setTimeout(() => {
                        loadSurvey();
                    }, 1600);
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
