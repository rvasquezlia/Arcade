        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        
        function playSound(type) {
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);

            if (type === 'correct') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); 
                osc.frequency.exponentialRampToValueAtTime(659.25, audioCtx.currentTime + 0.15); 
                gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.3);
            } else if (type === 'wrong') {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(180, audioCtx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(110, audioCtx.currentTime + 0.2);
                gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.25);
            }
        }
    

        const rawQuestData = [
            {
                levelTitle: "The Vault",
                subtitle: "Multi-Digit Whole Numbers",
                questions: [
                    { q: "Solve: 4,128 ÷ 16 =", options: ["248", "258", "268", "252"], answer: 1, explanation: "4,128 ÷ 16 = <b>258</b>." },
                    { q: "Calculate: 48,256 − 19,489 =", options: ["28,767", "28,777", "29,867", "28,667"], answer: 0, explanation: "48,256 − 19,489 = <b>28,767</b>." },
                    { q: "A warehouse stores 145 crates with 234 items each. Total item count?", options: ["32,930", "33,830", "33,930", "34,030"], answer: 2, explanation: "145 × 234 = <b>33,930</b>." },
                    { q: "Solve: 125,430 + 84,795 =", options: ["210,225", "209,225", "210,125", "211,225"], answer: 0, explanation: "125,430 + 84,795 = <b>210,225</b>." },
                    { q: "Calculate: 9,315 ÷ 27 =", options: ["335", "345", "355", "325"], answer: 1, explanation: "9,315 ÷ 27 = <b>345</b>." },
                    { q: "Solve: 50,000 − 23,842 =", options: ["26,158", "27,158", "26,258", "26,168"], answer: 0, explanation: "50,000 − 23,842 = <b>26,158</b>." },
                    { q: "Multiply: 3,428 × 45 =", options: ["153,260", "154,260", "154,360", "155,260"], answer: 1, explanation: "3,428 × 45 = <b>154,260</b>." },
                    { q: "Solve: 18,432 ÷ 32 =", options: ["566", "586", "576", "596"], answer: 2, explanation: "18,432 ÷ 32 = <b>576</b>." }
                ],
                challenge: {
                    q: "⚡ <b>DOUBLE REWARD LOGIC PUZZLE:</b> A vault passcode is a 4-digit number. The thousands digit is 4. The hundreds digit is double the thousands digit. The tens digit is half the thousands digit. The sum of all digits is 18. What is the passcode?",
                    options: ["4824", "4826", "4842", "4820"],
                    answer: 0,
                    explanation: "Thousands = 4. Hundreds = 8. Tens = 2. Sum so far = 14. Ones digit = 18 − 14 = 4. Passcode = <b>4824</b>!"
                }
            },
            {
                levelTitle: "The Market",
                subtitle: "Decimal Operations",
                questions: [
                    { q: "Items cost $8.75, $3.50, and $0.99. Total subtotal?", options: ["$12.24", "$13.24", "$13.14", "$14.24"], answer: 1, explanation: "$8.75 + $3.50 + $0.99 = <b>$13.24</b>." },
                    { q: "You pay with a $20.00 bill for a $13.24 total. Change due?", options: ["$6.76", "$7.76", "$6.86", "$7.24"], answer: 0, explanation: "$20.00 − $13.24 = <b>$6.76</b>." },
                    { q: "Calculate: 4.5 × 0.6 =", options: ["27.0", "2.7", "0.27", "2.07"], answer: 1, explanation: "45 × 6 = 270 with 2 decimal places = <b>2.7</b>." },
                    { q: "Solve: 15.35 + 24.8 =", options: ["39.15", "40.15", "39.85", "40.25"], answer: 1, explanation: "15.35 + 24.80 = <b>40.15</b>." },
                    { q: "Calculate: 100 − 37.45 =", options: ["62.55", "63.55", "62.45", "63.45"], answer: 0, explanation: "100.00 − 37.45 = <b>62.55</b>." },
                    { q: "1 item costs $3.25. How much do 12 identical items cost?", options: ["$38.00", "$39.00", "$39.50", "$40.00"], answer: 1, explanation: "$3.25 × 12 = <b>$39.00</b>." },
                    { q: "Calculate: 8.42 − 3.19 =", options: ["5.13", "5.23", "5.33", "5.21"], answer: 1, explanation: "8.42 − 3.19 = <b>5.23</b>." },
                    { q: "Multiply: 0.75 × 0.4 =", options: ["0.03", "0.3", "3.0", "0.35"], answer: 1, explanation: "0.75 × 0.4 = <b>0.3</b>." }
                ],
                challenge: {
                    q: "⚡ <b>DOUBLE REWARD LOGIC PUZZLE:</b> Maya bought 3 identical notebooks and a $1.50 pen for a total of $10.50. How much did ONE notebook cost?",
                    options: ["$3.00", "$2.75", "$3.50", "$2.50"],
                    answer: 0,
                    explanation: "Subtract pen: $10.50 − $1.50 = $9.00 for 3 notebooks. $9.00 ÷ 3 = <b>$3.00</b> each!"
                }
            },
            {
                levelTitle: "The Recipe Lab",
                subtitle: "Fraction Operations",
                questions: [
                    { q: "Combine: <sup>3</sup>/<sub>4</sub> + <sup>2</sup>/<sub>3</sub> =", options: ["<sup>5</sup>/<sub>7</sub>", "1 <sup>5</sup>/<sub>12</sub>", "1 <sup>1</sup>/<sub>12</sub>", "<sup>11</sup>/<sub>12</sub>"], answer: 1, explanation: "<sup>9</sup>/<sub>12</sub> + <sup>8</sup>/<sub>12</sub> = <sup>17</sup>/<sub>12</sub> = <b>1 <sup>5</sup>/<sub>12</sub></b>." },
                    { q: "You need <sup>5</sup>/<sub>6</sub> cup flour, but have <sup>1</sup>/<sub>4</sub> cup. How much more needed?", options: ["<sup>7</sup>/<sub>12</sub> cup", "<sup>4</sup>/<sub>2</sub> cup", "<sup>1</sup>/<sub>2</sub> cup", "<sup>2</sup>/<sub>3</sub> cup"], answer: 0, explanation: "<sup>10</sup>/<sub>12</sub> − <sup>3</sup>/<sub>12</sub> = <b><sup>7</sup>/<sub>12</sub> cup</b>." },
                    { q: "Multiply: <sup>3</sup>/<sub>5</sub> × <sup>2</sup>/<sub>3</sub> =", options: ["<sup>5</sup>/<sub>8</sub>", "<sup>2</sup>/<sub>5</sub>", "<sup>9</sup>/<sub>10</sub>", "1 <sup>1</sup>/<sub>5</sub>"], answer: 1, explanation: "(3×2)/(5×3) = <sup>6</sup>/<sub>15</sub> = <b><sup>2</sup>/<sub>5</sub></b>." },
                    { q: "Divide: <sup>3</sup>/<sub>4</sub> ÷ <sup>1</sup>/<sub>2</sub> =", options: ["<sup>3</sup>/<sub>8</sub>", "1 <sup>1</sup>/<sub>2</sub>", "<sup>2</sup>/<sub>3</sub>", "2 <sup>1</sup>/<sub>4</sub>"], answer: 1, explanation: "<sup>3</sup>/<sub>4</sub> × <sup>2</sup>/<sub>1</sub> = <sup>6</sup>/<sub>4</sub> = <b>1 <sup>1</sup>/<sub>2</sub></b>." },
                    { q: "Solve: <sup>2</sup>/<sub>5</sub> + <sup>3</sup>/<sub>10</sub> =", options: ["<sup>5</sup>/<sub>15</sub>", "<sup>7</sup>/<sub>10</sub>", "<sup>1</sup>/<sub>2</sub>", "<sup>4</sup>/<sub>5</sub>"], answer: 1, explanation: "<sup>4</sup>/<sub>10</sub> + <sup>3</sup>/<sub>10</sub> = <b><sup>7</sup>/<sub>10</sub></b>." },
                    { q: "Subtract: <sup>7</sup>/<sub>8</sub> − <sup>1</sup>/<sub>2</sub> =", options: ["<sup>3</sup>/<sub>8</sub>", "<sup>6</sup>/<sub>6</sub>", "<sup>5</sup>/<sub>8</sub>", "<sup>1</sup>/<sub>4</sub>"], answer: 0, explanation: "<sup>7</sup>/<sub>8</sub> − <sup>4</sup>/<sub>8</sub> = <b><sup>3</sup>/<sub>8</sub></b>." },
                    { q: "Multiply: <sup>4</sup>/<sub>5</sub> × <sup>3</sup>/<sub>8</sub> =", options: ["<sup>7</sup>/<sub>13</sub>", "<sup>3</sup>/<sub>10</sub>", "<sup>12</sup>/<sub>30</sub>", "<sup>1</sup>/<sub>2</sub>"], answer: 1, explanation: "<sup>12</sup>/<sub>40</sub> = <b><sup>3</sup>/<sub>10</sub></b>." },
                    { q: "Divide: <sup>2</sup>/<sub>3</sub> ÷ <sup>1</sup>/<sub>6</sub> =", options: ["<sup>1</sup>/<sub>9</sub>", "3", "4", "<sup>2</sup>/<sub>18</sub>"], answer: 2, explanation: "<sup>2</sup>/<sub>3</sub> × <sup>6</sup>/<sub>1</sub> = <sup>12</sup>/<sub>3</sub> = <b>4</b>." }
                ],
                challenge: {
                    q: "⚡ <b>DOUBLE REWARD LOGIC PUZZLE:</b> A water jug is <sup>3</sup>/<sub>4</sub> full. After pouring out <sup>1</sup>/<sub>2</sub> of a cup, the jug is <sup>1</sup>/<sub>4</sub> full. How many cups does a FULL jug hold?",
                    options: ["1 cup", "2 cups", "1 <sup>1</sup>/<sub>2</sub> cups", "<sup>3</sup>/<sub>4</sub> cup"],
                    answer: 0,
                    explanation: "<sup>3</sup>/<sub>4</sub> − <sup>1</sup>/<sub>4</sub> = <sup>2</sup>/<sub>4</sub> = <sup>1</sup>/<sub>2</sub> jug capacity. Since <sup>1</sup>/<sub>2</sub> jug = <sup>1</sup>/<sub>2</sub> cup, a full jug holds <b>1 cup</b>!"
                }
            },
            {
                levelTitle: "The Architect",
                subtitle: "2D & 3D Figure Classification",
                questions: [
                    { q: "Which polygon ALWAYS has 4 equal sides AND 4 right angles?", options: ["Rhombus", "Rectangle", "Parallelogram", "Square"], answer: 3, explanation: "A <b>square</b> has 4 congruent sides and 4 right angles." },
                    { q: "A 3D shape has 1 square base and 4 triangular faces meeting at an apex. What is it?", options: ["Triangular Prism", "Square Pyramid", "Square Prism", "Triangular Pyramid"], answer: 1, explanation: "1 base + triangular sides meeting at a point = <b>Square Pyramid</b>." },
                    { q: "Which quadrilateral has EXACTLY one pair of parallel sides?", options: ["Rhombus", "Trapezoid", "Parallelogram", "Rectangle"], answer: 1, explanation: "A <b>trapezoid</b> has exactly one pair of opposite parallel sides." },
                    { q: "Faces, edges, and vertices of a rectangular prism?", options: ["6 faces, 12 edges, 8 vertices", "6 faces, 8 edges, 12 vertices", "8 faces, 12 edges, 6 vertices", "4 faces, 8 edges, 4 vertices"], answer: 0, explanation: "Rectangular prism = <b>6 faces, 12 edges, 8 vertices</b>." },
                    { q: "Triangle sides: 5 cm, 5 cm, 8 cm. How is it classified by sides?", options: ["Equilateral", "Scalene", "Isosceles", "Right"], answer: 2, explanation: "Two equal sides = <b>Isosceles</b>." },
                    { q: "Which 3D shape has 2 congruent parallel circular bases and a curved surface?", options: ["Cone", "Sphere", "Cylinder", "Circular Pyramid"], answer: 2, explanation: "Two parallel circular bases = <b>Cylinder</b>." },
                    { q: "A 3D figure has 2 parallel hexagonal bases and 6 rectangular side faces. What is it?", options: ["Hexagonal Pyramid", "Hexagonal Prism", "Octagonal Prism", "Cuboid"], answer: 1, explanation: "Two identical hexagonal bases = <b>Hexagonal Prism</b>." },
                    { q: "Which figure is NOT a polyhedron?", options: ["Cube", "Triangular Prism", "Sphere", "Square Pyramid"], answer: 2, explanation: "A <b>sphere</b> has curved surfaces, not polygon faces." }
                ],
                challenge: {
                    q: "⚡ <b>DOUBLE REWARD LOGIC PUZZLE:</b> I am a 3D solid with 5 faces, 8 edges, and 5 vertices. My base is a 4-sided polygon and my other faces are triangles. What shape am I?",
                    options: ["Square Pyramid", "Triangular Prism", "Cube", "Triangular Pyramid"],
                    answer: 0,
                    explanation: "1 quad base + 4 triangular faces = 5 faces, 8 edges, 5 vertices = <b>Square Pyramid</b>!"
                }
            }
        ];

        const ultimateBossChallenge = {
            q: "🔥 <b>TRIPLE REWARD ULTIMATE BOSS CHALLENGE:</b> A mystery fraction <b>F</b> is added to <b>0.25</b> to equal <b>1</b>. If you multiply <b>F</b> by 12, then subtract 3, what is your final answer?",
            options: ["6", "9", "5", "12"],
            answer: 0,
            explanation: "0.25 = <sup>1</sup>/<sub>4</sub>. So F = <sup>3</sup>/<sub>4</sub>. Multiply by 12: <sup>3</sup>/<sub>4</sub> × 12 = 9. Subtract 3: 9 − 3 = <b>6</b>!"
        };

        function shuffle(array) {
            let currentIndex = array.length, randomIndex;
            let shuffled = JSON.parse(JSON.stringify(array));
            while (currentIndex != 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]];
            }
            return shuffled;
        }

        let questData = [];
        let currentLevel = 0;
        let currentQuestion = 0;
        let score = 0;
        let isBossPhase = false;
        let currentShuffledOptions = [];
        let isDarkMode = true;

        function toggleTheme() {
            isDarkMode = !isDarkMode;
            const body = document.body;
            const btnText = document.getElementById('theme-btn-text');
            const btnIcon = document.getElementById('theme-btn-icon');

            if (isDarkMode) {
                body.classList.remove('light-mode');
                btnText.innerText = 'Light Mode';
                btnIcon.innerText = '☀️';
            } else {
                body.classList.add('light-mode');
                btnText.innerText = 'Dark Mode';
                btnIcon.innerText = '🌙';
            }
            renderTabs();
        }

        function startMission() {
            document.getElementById('intro-modal').classList.add('hidden');
            initGame();
        }

        function initGame() {
            isBossPhase = false;
            questData = rawQuestData.map(lvl => ({
                ...lvl,
                questions: shuffle(lvl.questions)
            }));

            renderTabs();
            loadQuestion();
        }

        function renderTabs() {
            const tabsContainer = document.getElementById('level-tabs');
            tabsContainer.innerHTML = '';

            questData.forEach((lvl, idx) => {
                const isActive = idx === currentLevel && !isBossPhase;
                const tab = document.createElement('div');
                tab.className = `p-2.5 sm:p-3 rounded-xl border text-center transition-all ${
                    isActive 
                        ? 'tab-active bg-indigo-600/20 border-indigo-500 text-indigo-400 font-black glow' 
                        : 'tab-inactive bg-slate-800/60 border-slate-700/60 text-slate-400 font-bold opacity-70'
                }`;
                tab.innerHTML = `
                    <div class="text-[10px] sm:text-xs uppercase tracking-wider font-black text-sub-theme">Level ${idx + 1}</div>
                    <div class="text-xs sm:text-sm font-extrabold truncate mt-0.5">${lvl.levelTitle}</div>
                `;
                tabsContainer.appendChild(tab);
            });
        }

        function loadQuestion() {
            const level = questData[currentLevel];
            let qData;
            let isChallenge = false;

            const skipContainer = document.getElementById('skip-container');

            if (isBossPhase) {
                qData = ultimateBossChallenge;
                document.getElementById('level-badge').innerText = `🔥 ULTIMATE BOSS`;
                document.getElementById('level-badge').className = "badge-challenge px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 glow-gold";
                document.getElementById('question-tracker').innerText = `Triple Points (+300 PTS)`;
                skipContainer.classList.remove('hidden');
            } else if (currentQuestion === level.questions.length) {
                qData = level.challenge;
                isChallenge = true;
                document.getElementById('level-badge').innerText = `⚡ Level ${currentLevel + 1} Challenge`;
                document.getElementById('level-badge').className = "badge-challenge px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40";
                document.getElementById('question-tracker').innerText = `Double Points (+200 PTS)`;
                skipContainer.classList.remove('hidden');
            } else {
                qData = level.questions[currentQuestion];
                document.getElementById('level-badge').innerText = `Level ${currentLevel + 1}: ${level.levelTitle}`;
                document.getElementById('level-badge').className = "badge-standard px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30";
                document.getElementById('question-tracker').innerText = `Question ${currentQuestion + 1} of 9`;
                skipContainer.classList.add('hidden');
            }
            
            document.getElementById('question-text').innerHTML = qData.q;

            let optionsWithStatus = qData.options.map((opt, idx) => ({
                text: opt,
                isCorrect: idx === qData.answer
            }));
            currentShuffledOptions = shuffle(optionsWithStatus);

            const container = document.getElementById('options-container');
            container.innerHTML = '';

            currentShuffledOptions.forEach((optObj, idx) => {
                const btn = document.createElement('button');
                btn.className = "opt-btn-theme w-full text-left p-3.5 sm:p-4 rounded-xl bg-slate-700/40 hover:bg-slate-700 border border-slate-600/80 font-bold text-slate-100 transition-all hover:border-indigo-400 active:scale-[0.98] flex items-center";
                btn.innerHTML = `<span class="opt-badge-theme inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-slate-800 border border-slate-600 text-indigo-400 font-black mr-3 text-sm sm:text-base flex-shrink-0">${String.fromCharCode(65 + idx)}</span> <span class="text-base sm:text-lg font-bold leading-normal">${optObj.text}</span>`;
                btn.onclick = () => checkAnswer(idx, isChallenge || isBossPhase);
                container.appendChild(btn);
            });

            updateProgressBar();
        }

        function checkAnswer(selectedIndex, isSpecial) {
            const selectedOpt = currentShuffledOptions[selectedIndex];
            const isCorrect = selectedOpt.isCorrect;

            const modal = document.getElementById('feedback-modal');
            const modalBadge = document.getElementById('modal-badge');
            const modalTitle = document.getElementById('modal-title');
            const modalExp = document.getElementById('modal-explanation');

            let points = 100;
            if (isBossPhase) points = 300;
            else if (currentQuestion === questData[currentLevel].questions.length) points = 200;

            if (isCorrect) {
                playSound('correct');
                score += points;
                document.getElementById('score').innerText = score;

                modalBadge.className = "inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
                modalBadge.innerHTML = "<span>✅</span><span>Correct Answer</span>";
                modalTitle.innerText = isSpecial ? `Bonus Earned! (+${points} PTS)` : "Great Job!";
            } else {
                playSound('wrong');
                modalBadge.className = "inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3 bg-rose-500/20 text-rose-400 border border-rose-500/30";
                modalBadge.innerHTML = "<span>❌</span><span>Incorrect</span>";
                modalTitle.innerText = "Not Quite!";
            }

            let qData = isBossPhase ? ultimateBossChallenge : (currentQuestion === questData[currentLevel].questions.length ? questData[currentLevel].challenge : questData[currentLevel].questions[currentQuestion]);
            modalExp.innerHTML = qData.explanation;

            modal.classList.remove('hidden');
        }

        function skipChallenge() {
            const modal = document.getElementById('feedback-modal');
            const modalBadge = document.getElementById('modal-badge');
            const modalTitle = document.getElementById('modal-title');
            const modalExp = document.getElementById('modal-explanation');

            modalBadge.className = "inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3 bg-amber-500/20 text-amber-400 border border-amber-500/30";
            modalBadge.innerHTML = "<span>⏩</span><span>Challenge Skipped</span>";
            modalTitle.innerText = "Moving Ahead";
            modalExp.innerHTML = "You skipped this bonus challenge. No bonus points were added, but you can keep going!";

            modal.classList.remove('hidden');
        }

        function nextStep() {
            document.getElementById('feedback-modal').classList.add('hidden');

            if (isBossPhase) {
                showVictoryScreen();
                return;
            }

            const level = questData[currentLevel];

            if (currentQuestion < level.questions.length) {
                currentQuestion++;
                loadQuestion();
            } else if (currentLevel < questData.length - 1) {
                currentLevel++;
                currentQuestion = 0;
                renderTabs();
                loadQuestion();
            } else {
                isBossPhase = true;
                loadQuestion();
            }
        }

        function updateProgressBar() {
            const totalSteps = (questData.length * 9) + 1;
            let stepsCompleted = (currentLevel * 9) + currentQuestion;
            if (isBossPhase) stepsCompleted = totalSteps - 1;

            const percentage = Math.round((stepsCompleted / totalSteps) * 100);
            document.getElementById('progress-bar').style.width = `${Math.max(percentage, 3)}%`;
            document.getElementById('progress-text').innerText = isBossPhase ? "Final Boss" : `Level ${currentLevel + 1}/4`;
        }

        function showVictoryScreen() {
            document.getElementById('game-card').classList.add('hidden');
            document.getElementById('victory-screen').classList.remove('hidden');
            document.getElementById('final-score').innerText = score;
            document.getElementById('progress-bar').style.width = '100%';
            playSound('correct');
        }

        function restartQuest() {
            currentLevel = 0;
            currentQuestion = 0;
            score = 0;
            isBossPhase = false;
            document.getElementById('score').innerText = score;
            document.getElementById('victory-screen').classList.add('hidden');
            document.getElementById('game-card').classList.remove('hidden');
            initGame();
        }
    
