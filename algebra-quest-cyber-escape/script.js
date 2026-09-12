        // ===================================================================
        // QUESTION BANK — 13 cyber-dungeon terminals.
        // type: "type"  -> typed keypad-hacking answer (accept: array of
        //                  acceptable normalized answer strings)
        // type: "order" -> drag-to-reorder solving-step tiles. `steps` is
        //                  listed in the CORRECT order; it is shuffled for
        //                  display and the player must restore this order.
        // hint: a method-nudge (never the raw answer) shown by the AI
        //       sidekick after 2 wrong tries on the same terminal.
        // ===================================================================
        const questionBank = [
            {
                type: "type",
                category: "Coordinate Plane Access Node",
                question: "Terminal lock requires a quadrant ID. Locate the point \\( P\\left(-4.5, -3\\frac{1}{2}\\right) \\) on the coordinate plane. Which quadrant is it in?",
                placeholder: "e.g. 2 or II",
                accept: ["3", "iii", "quadrant3", "quadrantiii", "q3", "qiii"],
                hint: "Both coordinates are negative — that combination (negative x, negative y) only happens in one specific quadrant. Which one?"
            },
            {
                type: "order",
                category: "Order-of-Operations Firewall",
                question: "Decrypt \\( (-3)^3 + 4^2 - (2.5)^0 \\) by dragging the evaluation steps into the correct hacking sequence.",
                steps: [
                    "Evaluate \\( (-3)^3 = -27 \\)",
                    "Evaluate \\( 4^2 = 16 \\)",
                    "Evaluate \\( (2.5)^0 = 1 \\)",
                    "Combine left to right: \\( -27 + 16 - 1 = -12 \\)"
                ],
                hint: "PEMDAS: crack every exponent first (left to right through the expression) — the combining step always has to go last."
            },
            {
                type: "type",
                category: "Scientific Notation Cipher",
                question: "Encrypt \\( 0.00045 \\) into proper scientific notation. Type it as a×10^b (example format: 6.02x10^23).",
                placeholder: "e.g. 4.5x10^-4",
                accept: ["4.5x10^-4", "4.5*10^-4", "4.5×10^-4", "4.5e-4"],
                hint: "Slide the decimal point until exactly one nonzero digit sits in front, and count how many places you moved it. Moving it to the right gives a NEGATIVE exponent."
            },
            {
                type: "type",
                category: "Expression Evaluator Node",
                question: "Evaluate \\( 3x^2 - 2y + 5 \\) for \\( x = -2 \\) and \\( y = 4 \\). Enter the numeric result.",
                placeholder: "e.g. 9",
                accept: ["9"],
                hint: "Substitute the values first, then square before you multiply — remember \\((-2)^2\\) is positive, so don't lose that sign."
            },
            {
                type: "type",
                category: "Expression Expander Terminal",
                question: "Expand and combine like terms: \\( -4(3x - 5) + 2(x + 1) \\). Type the simplified expression (e.g. 5x+3).",
                placeholder: "e.g. -10x+22",
                accept: ["-10x+22", "22-10x"],
                hint: "Distribute both terms fully first — a negative times a negative flips the sign — then collect the x-terms and the constants separately."
            },
            {
                type: "type",
                category: "Keyword Translation Core",
                question: "Translate into an equation: \"Seven less than double a number \\( n \\) yields 25.\" Type the equation using n (e.g. n+1=2).",
                placeholder: "e.g. 2n-7=25",
                accept: ["2n-7=25", "2*n-7=25"],
                hint: "'Double a number' comes first, giving 2n. 'Seven less than' means you subtract 7 AFTER doubling, not before."
            },
            {
                type: "type",
                category: "Two-Step Equation Lock",
                question: "Solve for \\( x \\): \\( \\frac{2}{3}x - 5 = 11 \\). Type the value of x.",
                placeholder: "e.g. x=24 or 24",
                accept: ["x=24", "24"],
                hint: "Undo the subtraction first (add 5 to both sides). Then undo the fraction by multiplying both sides by its reciprocal, 3/2."
            },
            {
                type: "order",
                category: "Multi-Step Equation Vault",
                question: "Solve \\( -4(2x - 3) = 28 \\) by dragging the solving steps into the correct order.",
                steps: [
                    "Distribute: \\( -8x + 12 = 28 \\)",
                    "Subtract 12 from both sides: \\( -8x = 16 \\)",
                    "Divide both sides by \\( -8 \\): \\( x = -2 \\)"
                ],
                hint: "You can't combine anything across the parentheses until the -4 is distributed first."
            },
            {
                type: "order",
                category: "Variables-Both-Sides Bunker",
                question: "Solve \\( 7x - 9 = 3x + 15 \\) by dragging the solving steps into the correct order.",
                steps: [
                    "Subtract \\( 3x \\) from both sides: \\( 4x - 9 = 15 \\)",
                    "Add 9 to both sides: \\( 4x = 24 \\)",
                    "Divide both sides by 4: \\( x = 6 \\)"
                ],
                hint: "Get every variable term onto one side before you touch the constants."
            },
            {
                type: "type",
                category: "Inequality Breach Point",
                question: "Solve the inequality: \\( -3x + 8 \\le -7 \\). Type the solution (e.g. x>=5 or x<=5).",
                placeholder: "e.g. x>=5",
                accept: ["x>=5", "5<=x"],
                hint: "Isolate the x-term first, then divide by a NEGATIVE number — that's the one move that flips the inequality sign."
            },
            {
                type: "type",
                category: "Number-Line Graph Decoder",
                question: "For \\( x \\le 12 \\) graphed on a number line: type C for closed or O for open circle, then L or R for the arrow direction (example: OR).",
                placeholder: "e.g. CL",
                accept: ["cl", "closedleft"],
                hint: "'Less than OR EQUAL TO' includes the boundary point itself. And smaller numbers live in which direction on a number line?"
            },
            {
                type: "type",
                category: "Probability Vault",
                question: "A bag has 5 red, 8 blue, 3 yellow, and 4 green marbles. What is \\( P(\\text{NOT blue}) \\)? Type your answer as a percent (e.g. 60%), decimal, or fraction.",
                placeholder: "e.g. 60%",
                accept: ["60%", "60", "0.6", ".6", "3/5"],
                hint: "Find P(blue) out of the total marbles first, then subtract that from 1 (or 100%)."
            },
            {
                type: "type",
                category: "Final Exit Gate — Systems Puzzle",
                question: "Gym A charges $50 registration + $15/month. Gym B charges $20 registration + $20/month. After how many months m is the total cost equal? Type the number of months.",
                placeholder: "e.g. 6",
                accept: ["6", "6months", "6month", "6mo"],
                hint: "Set the two total-cost expressions equal to each other — \\( 50 + 15m = 20 + 20m \\) — then solve for m."
            }
        ];

        // AI Sidekick ("ECHO") banter pools
        const SIDEKICK = {
            roomIntro: [
                "Terminal locked. Target system: {cat}. Let's crack it.",
                "New firewall detected — {cat}. I've seen scarier Wi-Fi passwords.",
                "Booting decryption module for {cat}. Try not to trip the alarms.",
                "Ooh, a {cat} lock. Fancy. Still no match for you, probably.",
                "Scanning... {cat} detected. I'll watch. You do the hacking.",
                "This terminal guards {cat}. Type smart, not fast."
            ],
            correct: [
                "Access granted! You made that look easy.",
                "Firewall down! Somewhere, an evil robot is annoyed.",
                "Nailed it. I'm legally required to say 'good job.' ...Good job.",
                "Terminal cracked! Onward, code-breaker.",
                "That's a clean hack. No alarms, no sarcasm needed.",
                "Boom. Decrypted. You're making this look suspiciously easy."
            ],
            wrongFirst: [
                "Nope. The system didn't buy it either.",
                "Access denied. Try again, hotshot.",
                "That tripped an alarm, not the lock. One more go.",
                "Close-ish? Not really. Try again.",
                "The firewall just laughed. Rude, but try again."
            ],
            sarcasticIntro: [
                "Okay, clearly we need backup.",
                "Alright, I'll throw you a rope here.",
                "Two strikes. Fine, hint time.",
                "I was going to let you struggle, but okay.",
                "Deep breath. Here's a nudge, not the answer."
            ]
        };

        // GAME STATE
        let currentLevel = 0;
        let score = 0;
        let hp = 3;
        let isDarkMode = true;
        let isAnswerLocked = false;
        let activeQuestions = [];
        let playerName = '';
        let wrongTriesThisRoom = 0;
        let currentHackProgress = 0;

        // Drag-to-reorder state (only one drag active at a time)
        let dragCtx = null;
        let orderInteractions = 0;

        // Utility: Fisher-Yates Array Shuffle
        function shuffleArray(array) {
            const arr = [...array];
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        }

        function pickLine(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }

        function setSidekick(text) {
            const el = document.getElementById('sidekickBubble');
            if (el) el.innerText = text;
        }

        // Toggle Theme
        function toggleTheme() {
            isDarkMode = !isDarkMode;
            const body = document.body;
            const themeIcon = document.getElementById('themeIcon');
            const themeText = document.getElementById('themeText');

            if (isDarkMode) {
                body.classList.remove('light-mode');
                themeIcon.innerText = '🌙';
                themeText.innerText = 'Dark Mode';
            } else {
                body.classList.add('light-mode');
                themeIcon.innerText = '☀️';
                themeText.innerText = 'Light Mode';
            }
        }

        // MathJax Safe Renderer Trigger
        function renderMath() {
            if (window.MathJax && window.MathJax.startup && window.MathJax.startup.promise) {
                MathJax.startup.promise
                    .then(() => MathJax.typesetPromise())
                    .catch(err => console.warn('MathJax error:', err));
            }
        }

        // ===================================================================
        // ANSWER NORMALIZATION — accepts reasonable equivalent typed formats
        // (negative signs, "3/4" fractions, x= prefixes, spacing/case/×/\times
        // variants, <= / >= / ≤ / ≥, etc.) without changing the underlying math.
        // ===================================================================
        function normalizeAnswer(str) {
            return String(str)
                .trim()
                .toLowerCase()
                .replace(/\\\(|\\\)|\\\[|\\\]|\$\$/g, '')
                .replace(/\\times/g, 'x')
                .replace(/\\cdot/g, '*')
                .replace(/\\le/g, '<=')
                .replace(/\\ge/g, '>=')
                .replace(/\\neq/g, '!=')
                .replace(/≤/g, '<=')
                .replace(/≥/g, '>=')
                .replace(/×/g, 'x')
                .replace(/\s+/g, '')
                .replace(/,/g, '');
        }

        function isAnswerCorrect(raw, accept) {
            const n = normalizeAnswer(raw);
            if (!n) return false;
            return accept.some(a => normalizeAnswer(a) === n);
        }

        // Start Game Initialization
        function startGame() {
            const name = ArcadeKit.requireName('playerNameInput', 'playerNameError');
            if (!name) return;
            playerName = name;

            currentLevel = 0;
            score = 0;
            hp = 3;
            activeQuestions = shuffleArray(questionBank);

            document.getElementById('startScreen').style.display = 'none';
            document.getElementById('gameOverScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'none';
            document.getElementById('gameplayScreen').style.display = 'block';

            const input = document.getElementById('answerInput');
            if (input && !input.dataset.wired) {
                input.dataset.wired = '1';
                input.addEventListener('input', updateHackProgressFromInput);
                input.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        submitTypedAnswer(activeQuestions[currentLevel]);
                    }
                });
            }
            const hackBtn = document.getElementById('hackSubmitBtn');
            if (hackBtn && !hackBtn.dataset.wired) {
                hackBtn.dataset.wired = '1';
                hackBtn.addEventListener('click', () => submitTypedAnswer(activeQuestions[currentLevel]));
            }
            const orderBtn = document.getElementById('orderSubmitBtn');
            if (orderBtn && !orderBtn.dataset.wired) {
                orderBtn.dataset.wired = '1';
                orderBtn.addEventListener('click', () => submitOrderAnswer(activeQuestions[currentLevel]));
            }

            loadQuestion();
        }

        // Load Current Question / Terminal
        function loadQuestion() {
            isAnswerLocked = false;
            wrongTriesThisRoom = 0;
            document.getElementById('feedbackBanner').innerText = '';
            document.getElementById('feedbackBanner').className = 'feedback-banner';

            const qData = activeQuestions[currentLevel];

            // Update HUD
            document.getElementById('stageTitle').innerText = `Terminal ${currentLevel + 1}: ${qData.category}`;
            document.getElementById('levelCounter').innerText = `${currentLevel + 1} / ${activeQuestions.length}`;
            document.getElementById('scoreDisplay').innerText = `${score} PTS`;
            updateHpDisplay();

            // Sidekick intro banter
            setSidekick(pickLine(SIDEKICK.roomIntro).replace('{cat}', qData.category));

            // Render Question Text
            document.getElementById('questionBox').innerHTML = qData.question;

            const typeWrap = document.getElementById('typeAnswerWrap');
            const orderWrap = document.getElementById('orderAnswerWrap');

            if (qData.type === 'order') {
                typeWrap.style.display = 'none';
                orderWrap.style.display = 'flex';
                setHackProgress(20, false);
                initOrderRoom(qData);
            } else {
                orderWrap.style.display = 'none';
                typeWrap.style.display = 'flex';
                setHackProgress(0, false);
                const input = document.getElementById('answerInput');
                input.value = '';
                input.placeholder = qData.placeholder || 'Type your answer...';
                input.disabled = false;
                input.classList.remove('shake-field');
                setTimeout(() => input.focus(), 60);
            }

            renderMath();
        }

        // On-screen hacking keypad
        function keypadPress(ch) {
            const input = document.getElementById('answerInput');
            if (!input || input.disabled) return;
            if (ch === 'DEL') {
                input.value = input.value.slice(0, -1);
            } else if (ch === 'CLR') {
                input.value = '';
            } else {
                input.value += ch;
            }
            input.focus();
            updateHackProgressFromInput();
        }

        // ===================================================================
        // HACKING PROGRESS METER
        // ===================================================================
        function setHackProgress(pct, success) {
            currentHackProgress = Math.max(0, Math.min(100, pct));
            const bar = document.getElementById('hackProgressBar');
            const pctEl = document.getElementById('hackProgressPct');
            if (bar) {
                bar.style.width = currentHackProgress + '%';
                bar.classList.toggle('hack-success', !!success);
            }
            if (pctEl) pctEl.innerText = Math.round(currentHackProgress) + '%';
        }

        function updateHackProgressFromInput() {
            const input = document.getElementById('answerInput');
            const qData = activeQuestions[currentLevel];
            if (!input || !qData || !qData.accept) return;
            const expectedLen = Math.max.apply(null, qData.accept.map(a => a.length).concat([4]));
            const ratio = Math.min(0.9, input.value.length / expectedLen);
            setHackProgress(ratio * 100, false);
        }

        function bumpOrderProgress() {
            orderInteractions++;
            const pct = Math.min(85, 20 + orderInteractions * 12);
            setHackProgress(pct, false);
        }

        // ===================================================================
        // TYPED KEYPAD ANSWER SUBMISSION
        // ===================================================================
        function submitTypedAnswer(qData) {
            if (isAnswerLocked || !qData) return;
            const input = document.getElementById('answerInput');
            const val = input.value;
            if (!val || !val.trim()) {
                input.classList.add('shake-field');
                setTimeout(() => input.classList.remove('shake-field'), 350);
                return;
            }
            const correct = isAnswerCorrect(val, qData.accept);
            processRoomResult(correct, qData);
            if (!correct) {
                input.classList.add('shake-field');
                setTimeout(() => input.classList.remove('shake-field'), 350);
                input.focus();
                input.select();
            }
        }

        // ===================================================================
        // DRAG-TO-REORDER SEQUENCE LOCK (pointer events — mouse + touch)
        // ===================================================================
        function initOrderRoom(qData) {
            orderInteractions = 0;
            const container = document.getElementById('orderTiles');
            container.innerHTML = '';

            let order = qData.steps.map((_, i) => i);
            if (order.length > 1) {
                let tries = 0;
                do {
                    order = shuffleArray(order);
                    tries++;
                } while (tries < 12 && order.every((v, i) => v === i));
            }

            order.forEach((stepIdx) => {
                const tile = document.createElement('div');
                tile.className = 'order-tile';
                tile.dataset.stepIndex = String(stepIdx);

                const handle = document.createElement('span');
                handle.className = 'order-handle';
                handle.innerText = '⠿⠿';

                const text = document.createElement('span');
                text.className = 'order-text';
                text.innerHTML = qData.steps[stepIdx];

                const moveWrap = document.createElement('div');
                moveWrap.className = 'order-move-btns';
                const up = document.createElement('button');
                up.type = 'button';
                up.className = 'order-move-btn';
                up.innerText = '▲';
                up.addEventListener('pointerdown', e => e.stopPropagation());
                up.addEventListener('click', (e) => { e.stopPropagation(); moveTile(tile, -1); });
                const down = document.createElement('button');
                down.type = 'button';
                down.className = 'order-move-btn';
                down.innerText = '▼';
                down.addEventListener('pointerdown', e => e.stopPropagation());
                down.addEventListener('click', (e) => { e.stopPropagation(); moveTile(tile, 1); });
                moveWrap.appendChild(up);
                moveWrap.appendChild(down);

                tile.appendChild(handle);
                tile.appendChild(text);
                tile.appendChild(moveWrap);

                tile.addEventListener('pointerdown', (e) => onOrderPointerDown(e, tile));
                container.appendChild(tile);
            });
        }

        function moveTile(tile, dir) {
            if (isAnswerLocked) return;
            const container = tile.parentElement;
            if (!container) return;
            if (dir === -1) {
                const prev = tile.previousElementSibling;
                if (prev) container.insertBefore(tile, prev);
            } else {
                const next = tile.nextElementSibling;
                if (next) container.insertBefore(next, tile);
            }
            bumpOrderProgress();
        }

        function onOrderPointerDown(e, tile) {
            if (isAnswerLocked) return;
            const container = document.getElementById('orderTiles');
            const tiles = Array.from(container.children);
            const rects = tiles.map(t => t.getBoundingClientRect());
            const fromPos = tiles.indexOf(tile);
            if (fromPos === -1) return;

            dragCtx = {
                tile,
                tiles,
                rects,
                fromPos,
                currentPos: fromPos,
                startClientY: e.clientY,
                startTop: rects[fromPos].top,
                height: rects[fromPos].height,
                lastStaticTop: rects[fromPos].top,
                pointerId: e.pointerId
            };

            try { tile.setPointerCapture(e.pointerId); } catch (err) { /* noop */ }
            tile.classList.add('dragging');
            document.addEventListener('pointermove', onOrderPointerMove);
            document.addEventListener('pointerup', onOrderPointerUp);
            document.addEventListener('pointercancel', onOrderPointerUp);
        }

        function onOrderPointerMove(e) {
            if (!dragCtx) return;
            e.preventDefault();
            const dy = e.clientY - dragCtx.startClientY;
            const desiredTop = dragCtx.startTop + dy;
            const desiredCenter = desiredTop + dragCtx.height / 2;

            const midpoints = dragCtx.rects.map(r => r.top + r.height / 2);
            let hoverPos = midpoints.length - 1;
            for (let i = 0; i < midpoints.length; i++) {
                if (desiredCenter < midpoints[i]) { hoverPos = i; break; }
            }

            if (hoverPos !== dragCtx.currentPos) {
                const target = dragCtx.tiles[hoverPos];
                if (target && target !== dragCtx.tile) {
                    const container = target.parentElement;
                    dragCtx.tile.style.transform = '';
                    if (hoverPos < dragCtx.currentPos) {
                        container.insertBefore(dragCtx.tile, target);
                    } else {
                        container.insertBefore(dragCtx.tile, target.nextSibling);
                    }
                    dragCtx.currentPos = hoverPos;
                    dragCtx.lastStaticTop = dragCtx.tile.getBoundingClientRect().top;
                }
            }

            dragCtx.tile.style.transform = `translateY(${desiredTop - dragCtx.lastStaticTop}px)`;
        }

        function onOrderPointerUp(e) {
            if (!dragCtx) return;
            try { dragCtx.tile.releasePointerCapture(dragCtx.pointerId); } catch (err) { /* noop */ }
            dragCtx.tile.style.transform = '';
            dragCtx.tile.classList.remove('dragging');
            document.removeEventListener('pointermove', onOrderPointerMove);
            document.removeEventListener('pointerup', onOrderPointerUp);
            document.removeEventListener('pointercancel', onOrderPointerUp);
            dragCtx = null;
            bumpOrderProgress();
        }

        function submitOrderAnswer(qData) {
            if (isAnswerLocked || !qData) return;
            const container = document.getElementById('orderTiles');
            const domOrder = Array.from(container.children).map(t => parseInt(t.dataset.stepIndex, 10));
            const correct = domOrder.length === qData.steps.length && domOrder.every((v, i) => v === i);
            processRoomResult(correct, qData);
        }

        // ===================================================================
        // SHARED RESULT HANDLING (both typed + drag-order terminals)
        // ===================================================================
        function processRoomResult(isCorrect, qData) {
            isAnswerLocked = true;
            const feedback = document.getElementById('feedbackBanner');

            if (isCorrect) {
                score += 100;
                setHackProgress(100, true);
                feedback.className = 'feedback-banner feedback-correct';
                feedback.innerText = '✨ ACCESS GRANTED! +100 PTS';
                setSidekick(pickLine(SIDEKICK.correct));
                document.getElementById('scoreDisplay').innerText = `${score} PTS`;

                setTimeout(() => {
                    currentLevel++;
                    if (currentLevel >= activeQuestions.length) {
                        triggerVictory();
                    } else {
                        loadQuestion();
                    }
                }, 1300);

            } else {
                hp--;
                wrongTriesThisRoom++;
                updateHpDisplay();
                triggerGlitch();
                triggerShake();

                setHackProgress(Math.max(8, currentHackProgress * 0.35), false);

                feedback.className = 'feedback-banner feedback-wrong';
                feedback.innerText = '❌ ACCESS DENIED (-1 Heart)';

                if (wrongTriesThisRoom >= 2) {
                    setSidekick(`${pickLine(SIDEKICK.sarcasticIntro)} Hint: ${qData.hint}`);
                } else {
                    setSidekick(pickLine(SIDEKICK.wrongFirst));
                }

                if (hp <= 0) {
                    setTimeout(() => {
                        triggerGameOver();
                    }, 1100);
                } else {
                    setTimeout(() => {
                        isAnswerLocked = false;
                    }, 850);
                }
            }
        }

        function triggerGlitch() {
            const overlay = document.getElementById('glitchOverlay');
            if (!overlay) return;
            overlay.classList.remove('glitch-active');
            // Force reflow so the animation can restart on consecutive misses
            void overlay.offsetWidth;
            overlay.classList.add('glitch-active');
            setTimeout(() => overlay.classList.remove('glitch-active'), 420);
        }

        function triggerShake() {
            const gameCard = document.getElementById('gameCard');
            gameCard.classList.add('shake');
            setTimeout(() => gameCard.classList.remove('shake'), 350);
        }

        function updateHpDisplay() {
            let heartsStr = '';
            for (let i = 0; i < hp; i++) heartsStr += '❤️';
            for (let i = hp; i < 3; i++) heartsStr += '🖤';
            document.getElementById('hpDisplay').innerText = heartsStr;
        }

        function triggerGameOver() {
            document.getElementById('gameplayScreen').style.display = 'none';
            document.getElementById('gameOverScreen').style.display = 'flex';
            document.getElementById('finalScoreFail').innerText = score;
            ArcadeKit.showPlayerName(playerName, ['playerNameDisplayFail']);
        }

        function triggerVictory() {
            document.getElementById('gameplayScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'flex';
            document.getElementById('finalScoreWin').innerText = score;
            ArcadeKit.showPlayerName(playerName, ['playerNameDisplayWin']);
        }

        function restartGame() {
            startGame();
        }
