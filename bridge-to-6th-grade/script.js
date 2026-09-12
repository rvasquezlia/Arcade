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

        // ---- Hiker flavor lines (funnier narrator voice) ----
        const hikerLines = {
            correct: [
                "Plank secured — nice math!",
                "Boom. Bridge engineer of the year.",
                "That plank's sturdier than my lunch.",
                "Smooth crossing, math ranger!",
                "Nailed it! Onward!",
                "Certified sturdy. Let's keep moving."
            ],
            wrong: [
                "Whoa — that plank's rotten! Try another.",
                "Nope, that one's made of spaghetti.",
                "Not quite — the numbers disagree with you.",
                "That plank just wants to be difficult.",
                "Careful! Recalculate and retry.",
                "Yikes, that one cracked like a bad joke."
            ],
            skip: [
                "Grappling hook to the rescue!",
                "We'll swing past this one — safe and sound.",
                "No shame in a good shortcut!"
            ],
            win: [
                "You crossed the whole canyon! 6th grade, here we come!",
                "Bridge complete. You're basically a trailblazer now.",
                "The canyon has been officially tamed by your math skills."
            ],
            fail: [
                "Yikes — out of ropes! The canyon wins this round.",
                "Don't worry, even expert hikers slip. Try again!",
                "That's a wrap on this attempt — regroup and re-climb!"
            ]
        };

        function randomLine(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }

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

        const MAX_LIVES = 4;

        let questData = [];
        let currentLevel = 0;
        let currentQuestion = 0;
        let score = 0;
        let lives = MAX_LIVES;
        let isBossPhase = false;
        let isDarkMode = true;
        let playerName = '';
        let currentGapData = null;
        let interactionLocked = false;

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
            const name = ArcadeKit.requireName('playerNameInput', 'playerNameError');
            if (!name) return;
            playerName = name;

            document.getElementById('intro-modal').classList.add('hidden');
            initGame();
        }

        function initGame() {
            isBossPhase = false;
            currentLevel = 0;
            currentQuestion = 0;
            score = 0;
            lives = MAX_LIVES;
            interactionLocked = false;

            questData = rawQuestData.map(lvl => ({
                ...lvl,
                questions: shuffle(lvl.questions)
            }));

            document.getElementById('score').innerText = score;
            renderLives();
            renderTabs();
            loadGap();
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

        function renderLives() {
            const row = document.getElementById('lives-row');
            if (!row) return;
            row.innerHTML = '';
            for (let i = 0; i < MAX_LIVES; i++) {
                const span = document.createElement('span');
                span.className = 'rope-icon' + (i < lives ? '' : ' lost');
                span.textContent = '🪢';
                row.appendChild(span);
            }
        }

        function renderPlanksCrossed(level) {
            const wrap = document.getElementById('planks-crossed');
            wrap.innerHTML = '';
            const total = level.questions.length;
            const doneCount = isBossPhase ? total : Math.min(currentQuestion, total);
            for (let i = 0; i < total; i++) {
                const p = document.createElement('span');
                p.className = 'mini-plank' + (i < doneCount ? ' done' : '');
                wrap.appendChild(p);
            }
        }

        function loadGap() {
            interactionLocked = false;
            const level = questData[currentLevel];
            let qData;
            let isChallenge = false;

            const skipContainer = document.getElementById('skip-container');
            const bridgeScene = document.getElementById('bridge-scene');
            const gapSlot = document.getElementById('gap-slot');
            const gapHint = document.getElementById('gap-hint');

            bridgeScene.classList.remove('challenge-gap', 'boss-gap');
            gapSlot.classList.remove('filled', 'wobble', 'hover-target');
            gapHint.style.opacity = '';

            if (isBossPhase) {
                qData = ultimateBossChallenge;
                document.getElementById('level-badge').innerText = `🔥 ULTIMATE BOSS`;
                document.getElementById('level-badge').className = "badge-challenge px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 glow-gold";
                document.getElementById('question-tracker').innerText = `Triple Points (+300 PTS)`;
                skipContainer.classList.remove('hidden');
                bridgeScene.classList.add('boss-gap');
                gapHint.textContent = 'Drag the FINAL plank to finish the bridge!';
            } else if (currentQuestion === level.questions.length) {
                qData = level.challenge;
                isChallenge = true;
                document.getElementById('level-badge').innerText = `⚡ Level ${currentLevel + 1} Challenge`;
                document.getElementById('level-badge').className = "badge-challenge px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40";
                document.getElementById('question-tracker').innerText = `Double Points (+200 PTS)`;
                skipContainer.classList.remove('hidden');
                bridgeScene.classList.add('challenge-gap');
                gapHint.textContent = 'Drag the bonus plank across the chasm!';
            } else {
                qData = level.questions[currentQuestion];
                document.getElementById('level-badge').innerText = `Level ${currentLevel + 1}: ${level.levelTitle}`;
                document.getElementById('level-badge').className = "badge-standard px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30";
                document.getElementById('question-tracker').innerText = `Question ${currentQuestion + 1} of 9`;
                skipContainer.classList.add('hidden');
                gapHint.textContent = 'Drag the correct plank into the gap!';
            }

            currentGapData = qData;
            document.getElementById('question-text').innerHTML = qData.q;

            renderPlanksCrossed(level);
            renderRack(qData);
            renderLives();
            updateProgressBar();
            hideToast();
            renderMath();
        }

        function renderRack(qData) {
            const rack = document.getElementById('plank-rack');
            rack.innerHTML = '';

            const optsWithStatus = qData.options.map((opt, idx) => ({
                text: opt,
                isCorrect: idx === qData.answer
            }));
            const shuffled = shuffle(optsWithStatus);

            shuffled.forEach((optObj) => {
                const slot = document.createElement('div');
                slot.className = 'plank-slot';

                const tile = document.createElement('div');
                tile.className = 'plank-tile';
                tile.innerHTML = optObj.text;
                tile.dataset.correct = optObj.isCorrect ? '1' : '0';

                slot.appendChild(tile);
                rack.appendChild(slot);
                makeDraggable(tile);
            });
        }

        // ---- Pointer-based drag & drop (mouse + touch) ----
        function makeDraggable(tile) {
            let pointerId = null;
            let startX = 0, startY = 0;
            let dragOrigLeft = 0, dragOrigTop = 0;
            let dragStarted = false;
            const THRESHOLD = 6;

            function getGapEl() { return document.getElementById('gap-slot'); }

            function overlapsGap() {
                const gapRect = getGapEl().getBoundingClientRect();
                const tileRect = tile.getBoundingClientRect();
                const cx = tileRect.left + tileRect.width / 2;
                const cy = tileRect.top + tileRect.height / 2;
                return cx >= gapRect.left && cx <= gapRect.right && cy >= gapRect.top && cy <= gapRect.bottom;
            }

            tile.addEventListener('pointerdown', (e) => {
                if (interactionLocked) return;
                if (tile.classList.contains('disabled')) return;
                pointerId = e.pointerId;
                try { tile.setPointerCapture(pointerId); } catch (err) { /* ignore */ }
                startX = e.clientX;
                startY = e.clientY;
                dragStarted = false;
                e.preventDefault();
            });

            tile.addEventListener('pointermove', (e) => {
                if (pointerId === null || interactionLocked) return;
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;

                if (!dragStarted) {
                    if (Math.abs(dx) < THRESHOLD && Math.abs(dy) < THRESHOLD) return;
                    const rect = tile.getBoundingClientRect();
                    dragOrigLeft = rect.left;
                    dragOrigTop = rect.top;
                    tile.style.width = rect.width + 'px';
                    tile.style.height = rect.height + 'px';
                    tile.style.position = 'fixed';
                    tile.style.left = dragOrigLeft + 'px';
                    tile.style.top = dragOrigTop + 'px';
                    tile.style.zIndex = 999;
                    tile.classList.add('dragging');
                    dragStarted = true;
                }

                tile.style.left = (dragOrigLeft + dx) + 'px';
                tile.style.top = (dragOrigTop + dy) + 'px';
                getGapEl().classList.toggle('hover-target', overlapsGap());
            });

            function finishDrag() {
                getGapEl().classList.remove('hover-target');
                tile.classList.remove('dragging');
                if (pointerId !== null) {
                    try { tile.releasePointerCapture(pointerId); } catch (err) { /* ignore */ }
                }
                pointerId = null;

                if (interactionLocked) return;

                if (!dragStarted) {
                    // Simple tap/click — treat as a direct placement attempt.
                    attemptPlacement(tile);
                    return;
                }

                if (overlapsGap()) {
                    attemptPlacement(tile);
                } else {
                    returnToRack(tile);
                }
            }

            tile.addEventListener('pointerup', finishDrag);
            tile.addEventListener('pointercancel', () => {
                if (dragStarted) returnToRack(tile);
                pointerId = null;
                dragStarted = false;
            });
        }

        function disableAllTiles() {
            document.querySelectorAll('.plank-tile').forEach(t => t.classList.add('disabled'));
        }
        function enableAllTiles() {
            document.querySelectorAll('.plank-tile').forEach(t => t.classList.remove('disabled'));
        }

        function returnToRack(tile) {
            const slot = tile.parentElement;
            if (!slot) return;
            const slotRect = slot.getBoundingClientRect();
            if (tile.style.position !== 'fixed') return; // already at rest
            tile.style.transition = 'left .3s ease, top .3s ease';
            tile.style.left = slotRect.left + 'px';
            tile.style.top = slotRect.top + 'px';
            setTimeout(() => {
                tile.style.position = '';
                tile.style.left = '';
                tile.style.top = '';
                tile.style.width = '';
                tile.style.height = '';
                tile.style.zIndex = '';
                tile.style.transition = '';
            }, 320);
        }

        function attemptPlacement(tile) {
            if (interactionLocked) return;
            interactionLocked = true;

            // Ensure the tile is positioned "fixed" at its current visual spot so we can animate it.
            if (tile.style.position !== 'fixed') {
                const rect = tile.getBoundingClientRect();
                tile.style.width = rect.width + 'px';
                tile.style.height = rect.height + 'px';
                tile.style.position = 'fixed';
                tile.style.left = rect.left + 'px';
                tile.style.top = rect.top + 'px';
                tile.style.zIndex = 999;
            }

            disableAllTiles();
            const isCorrect = tile.dataset.correct === '1';
            if (isCorrect) {
                snapCorrect(tile);
            } else {
                wobbleWrong(tile);
            }
        }

        function snapCorrect(tile) {
            playSound('correct');
            const gapRect = document.getElementById('gap-slot').getBoundingClientRect();
            const targetLeft = gapRect.left + gapRect.width / 2 - tile.offsetWidth / 2;
            const targetTop = gapRect.top + gapRect.height / 2 - tile.offsetHeight / 2;

            tile.classList.add('snap-correct');
            requestAnimationFrame(() => {
                tile.style.transition = 'left .35s cubic-bezier(.34,1.56,.64,1), top .35s cubic-bezier(.34,1.56,.64,1)';
                tile.style.left = targetLeft + 'px';
                tile.style.top = targetTop + 'px';
            });

            const gapSlot = document.getElementById('gap-slot');
            gapSlot.classList.add('filled');
            document.getElementById('gap-hint').style.opacity = '0';

            const hiker = document.getElementById('hiker');
            hiker.classList.add('hop');
            showHikerQuip(randomLine(hikerLines.correct));

            setTimeout(() => {
                hiker.classList.remove('hop');
                resolveCorrectAnswer();
            }, 650);
        }

        function wobbleWrong(tile) {
            playSound('wrong');
            const gapSlot = document.getElementById('gap-slot');
            gapSlot.classList.add('wobble');
            tile.classList.add('crack');
            tile.classList.add('tried-wrong');
            showHikerQuip(randomLine(hikerLines.wrong));
            showToast('❌ Not quite! −1 safety rope');

            lives = Math.max(0, lives - 1);
            renderLives();

            setTimeout(() => {
                gapSlot.classList.remove('wobble');
                tile.classList.remove('crack');
                returnToRack(tile);

                if (lives <= 0) {
                    setTimeout(() => failRun(), 450);
                } else {
                    interactionLocked = false;
                    enableAllTiles();
                }
            }, 450);
        }

        function resolveCorrectAnswer() {
            let points = 100;
            const isSpecial = isBossPhase || (currentQuestion === questData[currentLevel].questions.length);
            if (isBossPhase) points = 300;
            else if (currentQuestion === questData[currentLevel].questions.length) points = 200;

            score += points;
            document.getElementById('score').innerText = score;
            showExplanationModal(points, isSpecial);
        }

        function showExplanationModal(points, isSpecial) {
            const modal = document.getElementById('feedback-modal');
            const modalBadge = document.getElementById('modal-badge');
            const modalTitle = document.getElementById('modal-title');
            const modalExp = document.getElementById('modal-explanation');

            modalBadge.className = "inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
            modalBadge.innerHTML = "<span>✅</span><span>Plank Secured!</span>";
            modalTitle.innerText = isSpecial ? `Bonus Earned! (+${points} PTS)` : "Great Crossing!";
            modalExp.innerHTML = currentGapData.explanation;

            modal.classList.remove('hidden');
            renderMath();
        }

        function skipChallenge() {
            const modal = document.getElementById('feedback-modal');
            const modalBadge = document.getElementById('modal-badge');
            const modalTitle = document.getElementById('modal-title');
            const modalExp = document.getElementById('modal-explanation');

            modalBadge.className = "inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3 bg-amber-500/20 text-amber-400 border border-amber-500/30";
            modalBadge.innerHTML = "<span>🪝</span><span>Chasm Skipped</span>";
            modalTitle.innerText = "Grappling Hook Deployed!";
            modalExp.innerHTML = "You swung past this bonus chasm safely — no bonus points, but no ropes lost either. " + randomLine(hikerLines.skip);

            modal.classList.remove('hidden');
            renderMath();
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
                loadGap();
            } else if (currentLevel < questData.length - 1) {
                // Level fully cleared — restock a safety rope as a reward.
                if (lives < MAX_LIVES) lives++;
                currentLevel++;
                currentQuestion = 0;
                renderTabs();
                loadGap();
            } else {
                isBossPhase = true;
                loadGap();
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

        function showHikerQuip(text) {
            const q = document.getElementById('hiker-quip');
            if (!q) return;
            q.textContent = text;
            q.classList.add('show');
            clearTimeout(q._t);
            q._t = setTimeout(() => q.classList.remove('show'), 2200);
        }

        function showToast(text) {
            const t = document.getElementById('toast');
            if (!t) return;
            t.textContent = text;
            t.classList.add('show');
            clearTimeout(t._t);
            t._t = setTimeout(() => t.classList.remove('show'), 1800);
        }

        function hideToast() {
            const t = document.getElementById('toast');
            if (t) t.classList.remove('show');
        }

        function renderMath() {
            if (window.MathJax && window.MathJax.typesetPromise) {
                window.MathJax.typesetPromise();
            }
        }

        function showVictoryScreen() {
            document.getElementById('game-card').classList.add('hidden');
            document.getElementById('victory-screen').classList.remove('hidden');
            document.getElementById('final-score').innerText = score;
            document.getElementById('progress-bar').style.width = '100%';
            playSound('correct');
            ArcadeKit.showPlayerName(playerName, ['playerNameDisplayWin']);
            const quip = document.getElementById('victory-quip');
            if (quip) quip.textContent = randomLine(hikerLines.win);
        }

        function failRun() {
            document.getElementById('game-card').classList.add('hidden');
            document.getElementById('fail-screen').classList.remove('hidden');
            document.getElementById('fail-score').innerText = score;
            ArcadeKit.showPlayerName(playerName, ['playerNameDisplayFail']);
            const quip = document.getElementById('fail-quip');
            if (quip) quip.textContent = randomLine(hikerLines.fail);
            playSound('wrong');
        }

        function restartQuest() {
            document.getElementById('victory-screen').classList.add('hidden');
            document.getElementById('fail-screen').classList.add('hidden');
            document.getElementById('game-card').classList.remove('hidden');
            initGame();
        }
