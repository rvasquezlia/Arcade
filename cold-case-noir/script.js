        // QUESTION BANK (Coordinates, Scientific Notation, Keyword Translations)
        const caseFiles = [
            {
                title: "Crime Scene Quadrant",
                evidence: "A suspect was spotted fleeing from initial coordinate \\( A(-6, 8) \\) to point \\( B(-6, -4) \\) on the city grid map. In which quadrant did the suspect end up?",
                options: ["Quadrant III", "Quadrant I", "Quadrant II", "Quadrant IV"],
                correct: "Quadrant III"
            },
            {
                title: "Grid Reflection Cipher",
                evidence: "A radio transmitter coordinate was mapped at \\( P(3, -5) \\). If the signal was reflected across the x-axis to obscure the origin, what are the new coordinates?",
                options: ["\\( (3, 5) \\)", "\\( (-3, -5) \\)", "\\( (-3, 5) \\)", "\\( (5, -3) \\)"],
                correct: "\\( (3, 5) \\)"
            },
            {
                title: "Forensic Evidence Measurement",
                evidence: "Trace fiber evidence gathered under a microscope measured \\( 0.00000038 \\text{ meters} \\). How should this be logged in scientific notation?",
                options: ["\\( 3.8 \\times 10^{-7} \\text{ m} \\)", "\\( 3.8 \\times 10^{-6} \\text{ m} \\)", "\\( 38 \\times 10^{-8} \\text{ m} \\)", "\\( 3.8 \\times 10^{7} \\text{ m} \\)"],
                correct: "\\( 3.8 \\times 10^{-7} \\text{ m} \\)"
            },
            {
                title: "Server Log Expansion",
                evidence: "The precinct server analyzed a digital footprint consisting of \\( 4.5 \\times 10^6 \\) access logs. What is this volume in standard integer form?",
                options: ["\\( 4,500,000 \\)", "\\( 450,000 \\)", "\\( 45,000,000 \\)", "\\( 4,050,000 \\)"],
                correct: "\\( 4,500,000 \\)"
            },
            {
                title: "Chemical Mass Comparison",
                evidence: "Two chemical samples were recovered: Sample Alpha is \\( 2.4 \\times 10^{-4} \\text{ g} \\) and Sample Beta is \\( 9.1 \\times 10^{-5} \\text{ g} \\). Which sample holds greater mass?",
                options: ["Sample Alpha", "Sample Beta", "Both are equal", "Cannot be determined"],
                correct: "Sample Alpha"
            },
            {
                title: "Encrypted Note Cipher",
                evidence: "An encrypted note reads: 'Four times the suspect's age, diminished by 9, equals 67'. Which equation matches this clue?",
                options: ["\\( 4a - 9 = 67 \\)", "\\( 9 - 4a = 67 \\)", "\\( 4(a - 9) = 67 \\)", "\\( 4a + 9 = 67 \\)"],
                correct: "\\( 4a - 9 = 67 \\)"
            },
            {
                title: "Informant Translation",
                evidence: "Translate the informant's statement: 'The quotient of a distance \\( d \\) and 6, increased by 11, yields 25'.",
                options: ["\\( \\frac{d}{6} + 11 = 25 \\)", "\\( \\frac{6}{d} + 11 = 25 \\)", "\\( 6d + 11 = 25 \\)", "\\( \\frac{d + 11}{6} = 25 \\)"],
                correct: "\\( \\frac{d}{6} + 11 = 25 \\)"
            },
            {
                title: "Getaway Velocity Equation",
                evidence: "A getaway vehicle traveled at a speed where '12 less than twice the speed limit \\( s \\) equals 98 mph'. Write the equation:",
                options: ["\\( 2s - 12 = 98 \\)", "\\( 12 - 2s = 98 \\)", "\\( 2(s - 12) = 98 \\)", "\\( 2s + 12 = 98 \\)"],
                correct: "\\( 2s - 12 = 98 \\)"
            },
            {
                title: "Evidence Marker Distance",
                evidence: "Evidence Marker 1 is placed at \\( (-3, 4) \\) and Evidence Marker 2 is at \\( (5, 4) \\). What is the straight-line grid distance between them?",
                options: ["\\( 8 \\text{ units} \\)", "\\( 2 \\text{ units} \\)", "\\( 6 \\text{ units} \\)", "\\( 10 \\text{ units} \\)"],
                correct: "\\( 8 \\text{ units} \\)"
            },
            {
                title: "Microscopic Residue",
                evidence: "Residue mass is recorded as \\( 6.02 \\times 10^{-5} \\text{ grams} \\). Express this in standard decimal notation:",
                options: ["\\( 0.0000602 \\)", "\\( 0.000602 \\)", "\\( 0.00000602 \\)", "\\( 0.0602 \\)"],
                correct: "\\( 0.0000602 \\)"
            }
        ];

        // Fixed 2x2 scatter slots for the four suspect leads (percentages of
        // the leads-layer box). Small per-card jitter/rotation is added at
        // render time so the board feels hand-pinned, not gridded.
        const SLOT_POSITIONS = [
            { left: 2,  top: 4  },
            { left: 52, top: 4  },
            { left: 2,  top: 54 },
            { left: 52, top: 54 }
        ];

        const NARRATION_LINES = [
            "The rain hasn't stopped since Tuesday. Neither have the numbers.",
            "Somewhere a saxophone plays. It's probably just the radiator.",
            "You light a cigarette you don't smoke, for the drama of it, then remember this is a school.",
            "The coffee's cold. The trail isn't.",
            "Every suspect has an alibi. Only one of them has the arithmetic to back it up.",
            "You've seen a lot of corkboards in this line of work. This one has opinions.",
            "The city sleeps. You, apparently, do word problems.",
            "Somebody once said the truth is out there. They were talking about a decimal point.",
            "Your trench coat is purely ceremonial. It does not affect your math skills.",
            "The evidence never lies. The suspects, constantly.",
            "You crack your knuckles. You crack open the case file. Only one of those was necessary.",
            "The lieutenant wants answers by Friday. The numbers want them right now."
        ];

        const CORRECT_LINES = [
            "Thunk. Case cracked. The suspect didn't even see it coming.",
            "Pinned it like a pro. Somewhere, a criminal is quietly sweating.",
            "That's a wrap. The precinct owes you a coffee.",
            "Nailed it. This town's a little safer tonight — and a little better at math.",
            "String's taut, math checks out, case closed.",
            "Clean pin. No notes. The chief is, against his better judgment, impressed."
        ];

        const WRONG_LINES = [
            "Wrong lead, detective. That suspect's got a rock-solid alibi (and better arithmetic).",
            "Snap. That string had places to be, and 'correct answer' wasn't one of them.",
            "Nope. That's not a criminal, that's just a guy who owns a similar hat.",
            "Miss. The real answer is still out there, laughing at you.",
            "The string fell to the floor in what can only be described as disappointment.",
            "Wrong pin. Back to the evidence board, detective."
        ];

        // GAME STATE
        let currentFileIndex = 0;
        let score = 0;
        let focus = 3;
        let activeCases = [];
        let isDarkMode = true;
        let isLocked = false;
        let isDragging = false;
        let dragPointerId = null;
        let playerName = '';

        // Fisher-Yates Array Shuffle
        function shuffleArray(arr) {
            const temp = [...arr];
            for (let i = temp.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [temp[i], temp[j]] = [temp[j], temp[i]];
            }
            return temp;
        }

        function pickRandom(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }

        // Theme Toggle
        function toggleTheme() {
            isDarkMode = !isDarkMode;
            const body = document.body;
            const btn = document.getElementById('themeBtn');

            if (isDarkMode) {
                body.classList.remove('light-mode');
                btn.innerText = '[ DARK MODE ]';
            } else {
                body.classList.add('light-mode');
                btn.innerText = '[ LIGHT MODE ]';
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

        // Start Investigation
        function startInvestigation() {
            const name = ArcadeKit.requireName('playerNameInput', 'playerNameError');
            if (!name) return;
            playerName = name;

            currentFileIndex = 0;
            score = 0;
            focus = 3;
            activeCases = shuffleArray(caseFiles);

            document.getElementById('startScreen').style.display = 'none';
            document.getElementById('failScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'none';
            document.getElementById('gameScreen').style.display = 'block';

            loadCase();
        }

        // Load Current Case File onto the corkboard
        function loadCase() {
            isLocked = false;
            isDragging = false;
            dragPointerId = null;

            const feedback = document.getElementById('feedbackLine');
            feedback.innerText = '';
            feedback.className = 'feedback-line';

            const cData = activeCases[currentFileIndex];

            // Update Status Bar
            document.getElementById('caseHeader').innerText = `Case File #${currentFileIndex + 1}: ${cData.title}`;
            document.getElementById('fileCounter').innerText = `${currentFileIndex + 1} / ${activeCases.length}`;
            document.getElementById('scoreDisplay').innerText = `${score} PTS`;
            document.getElementById('integrityDisplay').innerText = `${focus} / 3`;
            document.getElementById('narrationText').innerText = pickRandom(NARRATION_LINES);

            // Render clue card
            const clueCard = document.getElementById('clueCard');
            clueCard.classList.remove('pinned', 'dragging');
            document.getElementById('evidenceText').innerHTML = cData.evidence;

            // Build scattered suspect lead cards
            const leadsLayer = document.getElementById('leadsLayer');
            leadsLayer.innerHTML = '';
            const shuffledOptions = shuffleArray(cData.options);

            shuffledOptions.forEach((optText, idx) => {
                const slot = SLOT_POSITIONS[idx] || SLOT_POSITIONS[idx % SLOT_POSITIONS.length];
                const jitterX = (Math.random() * 3 - 1.5);
                const jitterY = (Math.random() * 3 - 1.5);
                const rotate = (Math.random() * 6 - 3).toFixed(1);

                const card = document.createElement('div');
                card.className = 'lead-card';
                card.style.left = (slot.left + jitterX) + '%';
                card.style.top = (slot.top + jitterY) + '%';
                card.style.setProperty('--rot', rotate + 'deg');
                card.dataset.correct = (optText === cData.correct) ? '1' : '0';
                card.innerHTML = `
                    <span class="lead-pin">📌</span>
                    <span class="lead-label">Suspect Lead</span>
                    <span class="lead-text">${optText}</span>
                `;
                leadsLayer.appendChild(card);
            });

            clearStrings();
            renderMath();
        }

        // ---------- Corkboard string-connector drag logic ----------

        function getWrapRect() {
            return document.getElementById('corkboardWrap').getBoundingClientRect();
        }

        function getCluePinCenter() {
            const rect = document.getElementById('cluePin').getBoundingClientRect();
            const wrap = getWrapRect();
            return {
                x: rect.left + rect.width / 2 - wrap.left,
                y: rect.top + rect.height / 2 - wrap.top
            };
        }

        function updateDragLine(clientX, clientY) {
            const wrap = getWrapRect();
            const start = getCluePinCenter();
            const line = document.getElementById('dragLine');
            line.setAttribute('x1', start.x);
            line.setAttribute('y1', start.y);
            line.setAttribute('x2', clientX - wrap.left);
            line.setAttribute('y2', clientY - wrap.top);
            line.setAttribute('visibility', 'visible');
        }

        function retractDragLine() {
            document.getElementById('dragLine').setAttribute('visibility', 'hidden');
        }

        function pinPermanentLine(start, end, isCorrect) {
            const svgNS = 'http://www.w3.org/2000/svg';
            const line = document.createElementNS(svgNS, 'line');
            line.setAttribute('x1', start.x);
            line.setAttribute('y1', start.y);
            line.setAttribute('x2', end.x);
            line.setAttribute('y2', end.y);
            line.setAttribute('class', 'pinned-string ' + (isCorrect ? 'solved' : 'snapped'));
            document.getElementById('pinnedLines').appendChild(line);
        }

        function clearStrings() {
            document.getElementById('pinnedLines').innerHTML = '';
            retractDragLine();
        }

        function onPinDown(e) {
            if (isLocked || isDragging) return;
            const clueCard = document.getElementById('clueCard');
            isDragging = true;
            dragPointerId = e.pointerId;
            clueCard.classList.add('dragging');
            document.getElementById('corkboardWrap').classList.add('drag-active');
            try { clueCard.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }

            updateDragLine(e.clientX, e.clientY);

            clueCard.addEventListener('pointermove', onPinMove);
            clueCard.addEventListener('pointerup', onPinUp);
            clueCard.addEventListener('pointercancel', onPinCancel);
            e.preventDefault();
        }

        function onPinMove(e) {
            if (!isDragging || e.pointerId !== dragPointerId) return;
            updateDragLine(e.clientX, e.clientY);
        }

        function endDrag() {
            const clueCard = document.getElementById('clueCard');
            clueCard.removeEventListener('pointermove', onPinMove);
            clueCard.removeEventListener('pointerup', onPinUp);
            clueCard.removeEventListener('pointercancel', onPinCancel);
            clueCard.classList.remove('dragging');
            document.getElementById('corkboardWrap').classList.remove('drag-active');
            isDragging = false;
        }

        function onPinUp(e) {
            if (!isDragging || e.pointerId !== dragPointerId) return;
            const clueCard = document.getElementById('clueCard');
            try { clueCard.releasePointerCapture(e.pointerId); } catch (err) { /* ignore */ }
            endDrag();

            const target = document.elementFromPoint(e.clientX, e.clientY);
            const leadCard = target ? target.closest('.lead-card') : null;

            if (!leadCard || isLocked) {
                retractDragLine();
                return;
            }
            submitLead(leadCard);
        }

        function onPinCancel(e) {
            if (e.pointerId !== dragPointerId) return;
            endDrag();
            retractDragLine();
        }

        // Evaluate the suspect lead the player pinned the clue to
        function submitLead(leadCard) {
            isLocked = true;
            retractDragLine();

            const feedback = document.getElementById('feedbackLine');
            const isCorrect = leadCard.dataset.correct === '1';

            const wrap = getWrapRect();
            const start = getCluePinCenter();
            const cardRect = leadCard.getBoundingClientRect();
            const end = {
                x: cardRect.left + cardRect.width / 2 - wrap.left,
                y: cardRect.top + cardRect.height / 2 - wrap.top
            };

            document.querySelectorAll('.lead-card').forEach(c => c.classList.add('disabled'));
            pinPermanentLine(start, end, isCorrect);

            if (isCorrect) {
                score += 100;
                leadCard.classList.remove('disabled');
                leadCard.classList.add('correct', 'thunk');
                document.getElementById('clueCard').classList.add('pinned');
                feedback.className = 'feedback-line text-success';
                feedback.innerText = pickRandom(CORRECT_LINES) + ' // +100 PTS';
                document.getElementById('scoreDisplay').innerText = `${score} PTS`;

                setTimeout(() => {
                    currentFileIndex++;
                    if (currentFileIndex >= activeCases.length) {
                        triggerVictory();
                    } else {
                        loadCase();
                    }
                }, 1400);

            } else {
                leadCard.classList.add('wrong');
                focus--;
                document.getElementById('integrityDisplay').innerText = `${focus} / 3`;
                feedback.className = 'feedback-line text-error';
                feedback.innerText = pickRandom(WRONG_LINES) + ' // -1 FOCUS';

                setTimeout(() => {
                    if (focus <= 0) {
                        triggerFail();
                    } else {
                        // Same case file, board reshuffles — no soft-lock,
                        // the detective just tries again.
                        loadCase();
                    }
                }, 1300);
            }
        }

        function initDragHandlers() {
            document.getElementById('clueCard').addEventListener('pointerdown', onPinDown);
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

        function restartInvestigation() {
            startInvestigation();
        }

        initDragHandlers();
