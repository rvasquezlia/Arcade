        // QUESTION BANK — beam-span fraction addition/subtraction with unlike denominators.
        // Every "correct" value below has been hand-verified with a common-denominator
        // calculation (see design notes); every distractor set has been checked to be
        // mathematically wrong and distinct from the correct answer and from each other.
        function frac(num, den) {
            return { num, den };
        }

        const beamBank = [
            { prompt: "Beam Segment Alpha spans \\( \\frac{1}{2} \\) m and Beam Segment Beta spans \\( \\frac{1}{3} \\) m. If they are welded end-to-end, what is the total span length?", correct: frac(5, 6), distractors: [frac(2, 5), frac(1, 6), frac(1, 1)] },
            { prompt: "A support beam is built from a \\( \\frac{2}{3} \\) m section and a \\( \\frac{1}{4} \\) m section joined together. What is the combined length?", correct: frac(11, 12), distractors: [frac(3, 7), frac(5, 12), frac(1, 1)] },
            { prompt: "The total gap between piers is \\( \\frac{3}{4} \\) m. A beam already covers \\( \\frac{1}{3} \\) m of it. How much gap remains uncovered?", correct: frac(5, 12), distractors: [frac(4, 7), frac(13, 12), frac(1, 2)] },
            { prompt: "A truss needs to span \\( \\frac{5}{6} \\) m. An installed beam covers \\( \\frac{1}{4} \\) m. How much additional length is still needed?", correct: frac(7, 12), distractors: [frac(3, 5), frac(13, 12), frac(2, 3)] },
            { prompt: "Two diagonal support beams measuring \\( \\frac{1}{2} \\) m and \\( \\frac{2}{5} \\) m are connected in series. What is their combined length?", correct: frac(9, 10), distractors: [frac(3, 7), frac(1, 10), frac(1, 1)] },
            { prompt: "The load-bearing beam must be \\( \\frac{3}{5} \\) m long. A shorter \\( \\frac{1}{4} \\) m brace has already been cut from stock. How much beam length remains to be cut?", correct: frac(7, 20), distractors: [frac(4, 9), frac(17, 20), frac(2, 5)] },
            { prompt: "A guardrail is assembled from a \\( \\frac{2}{3} \\) m piece and a \\( \\frac{1}{6} \\) m piece. What is the total guardrail length?", correct: frac(5, 6), distractors: [frac(1, 3), frac(1, 2), frac(1, 1)] },
            { prompt: "The span between two piers is \\( \\frac{7}{8} \\) m. A cross-beam already covers \\( \\frac{1}{4} \\) m of that span. How much span is still uncovered?", correct: frac(5, 8), distractors: [frac(2, 3), frac(9, 8), frac(3, 4)] },
            { prompt: "Engineers weld a \\( \\frac{1}{3} \\) m brace to a \\( \\frac{1}{4} \\) m brace. What is the length of the combined brace?", correct: frac(7, 12), distractors: [frac(2, 7), frac(1, 12), frac(2, 3)] },
            { prompt: "A cantilever arm is built from a \\( \\frac{5}{8} \\) m beam and a \\( \\frac{1}{3} \\) m extension. What is the total arm length?", correct: frac(23, 24), distractors: [frac(6, 11), frac(7, 24), frac(1, 1)] },
            { prompt: "Two railing segments measuring \\( \\frac{3}{4} \\) m and \\( \\frac{1}{6} \\) m are bolted together. What is the total railing length?", correct: frac(11, 12), distractors: [frac(2, 5), frac(7, 12), frac(1, 1)] },
            { prompt: "The bridge deck gap is \\( \\frac{5}{6} \\) m wide. A steel plate covering \\( \\frac{1}{3} \\) m has been installed. How much of the gap is still open?", correct: frac(1, 2), distractors: [frac(2, 3), frac(7, 6), frac(1, 1)] },
            { prompt: "A support cable must reach \\( \\frac{7}{10} \\) m. So far, \\( \\frac{1}{2} \\) m of cable has been strung. How much more cable is needed?", correct: frac(1, 5), distractors: [frac(2, 3), frac(6, 5), frac(2, 5)] },
            { prompt: "A footbridge plank is formed from a \\( \\frac{2}{5} \\) m board and a \\( \\frac{1}{3} \\) m board joined end-to-end. What is the total plank length?", correct: frac(11, 15), distractors: [frac(3, 8), frac(1, 15), frac(4, 5)] },
            { prompt: "The clearance beneath the bridge must not exceed \\( \\frac{5}{9} \\) m of sag. Current sag measurements show \\( \\frac{1}{3} \\) m has already been corrected. How much sag correction remains?", correct: frac(2, 9), distractors: [frac(1, 2), frac(8, 9), frac(1, 3)] },
            { prompt: "A diagonal brace is built from a \\( \\frac{3}{8} \\) m rod and a \\( \\frac{1}{4} \\) m rod. What is the total brace length?", correct: frac(5, 8), distractors: [frac(1, 3), frac(1, 8), frac(3, 4)] },
            { prompt: "The total span to cross is \\( \\frac{4}{5} \\) m. A beam covering \\( \\frac{3}{10} \\) m has already been placed. How much span is left to cover?", correct: frac(1, 2), distractors: [frac(7, 15), frac(11, 10), frac(1, 1)] },
            { prompt: "Two small gusset plates measuring \\( \\frac{1}{6} \\) m and \\( \\frac{1}{4} \\) m are joined along one edge. What is the combined edge length?", correct: frac(5, 12), distractors: [frac(1, 5), frac(1, 12), frac(1, 2)] },
            { prompt: "The required beam span is \\( \\frac{7}{12} \\) m. An existing beam already covers \\( \\frac{1}{4} \\) m. How much additional beam length is needed?", correct: frac(1, 3), distractors: [frac(1, 2), frac(5, 6), frac(2, 3)] },
            { prompt: "A support strut is formed from a \\( \\frac{5}{12} \\) m section and a \\( \\frac{1}{3} \\) m section welded together. What is the total strut length?", correct: frac(3, 4), distractors: [frac(2, 5), frac(1, 12), frac(1, 1)] }
        ];

        // ===================== EXACT FRACTION MATH =====================
        // All comparisons use integer arithmetic (reduced numerator/denominator
        // equality or cross-multiplication) — never floating point equality.
        function gcd(a, b) {
            a = Math.abs(a); b = Math.abs(b);
            while (b) { const t = b; b = a % b; a = t; }
            return a || 1;
        }

        function lcm(a, b) {
            return Math.abs(a * b) / gcd(a, b);
        }

        function reduceFrac(f) {
            if (f.num === 0) return { num: 0, den: 1 };
            const g = gcd(f.num, f.den);
            return { num: f.num / g, den: f.den / g };
        }

        function addFrac(a, b) {
            const den = lcm(a.den, b.den);
            const num = a.num * (den / a.den) + b.num * (den / b.den);
            return reduceFrac({ num, den });
        }

        // a - b, assumes a >= b (only used after a comparison determines order)
        function subFrac(a, b) {
            const den = lcm(a.den, b.den);
            const num = a.num * (den / a.den) - b.num * (den / b.den);
            return reduceFrac({ num, den });
        }

        // Returns -1 if a<b, 0 if a==b, 1 if a>b — exact integer cross-multiplication.
        function compareFrac(a, b) {
            const left = a.num * b.den;
            const right = b.num * a.den;
            if (left < right) return -1;
            if (left > right) return 1;
            return 0;
        }

        function fracEqual(a, b) {
            const ra = reduceFrac(a), rb = reduceFrac(b);
            return ra.num === rb.num && ra.den === rb.den;
        }

        function fracToDecimal(f) {
            return f.num / f.den;
        }

        function fracToLatex(f) {
            const r = reduceFrac(f);
            if (r.den === 1) return `\\( ${r.num} \\)`;
            return `\\( \\frac{${r.num}}{${r.den}} \\)`;
        }

        // Splits a reduced target fraction num/den into two positive fraction pieces
        // that sum EXACTLY back to the target (verified by construction, not by float).
        function splitTarget(target) {
            let num = target.num;
            let den = target.den;
            if (num < 2) { num *= 2; den *= 2; } // guarantee at least 2 "slices" to split
            const a = Math.max(1, Math.floor(num / 2));
            const b = num - a;
            return [reduceFrac({ num: a, den }), reduceFrac({ num: b, den })];
        }

        // GAME STATE
        let currentIndex = 0;
        let score = 0;
        let integrity = 3;
        let activeQuestions = [];
        let isDarkMode = true;
        let isLocked = false;
        let playerName = '';
        let currentTarget = null; // the fraction the gap must be filled to, this round
        let segIdCounter = 0;

        // Drag state
        let dragInfo = null;
        const DRAG_MOVE_THRESHOLD = 6; // px — below this, a pointerdown/up pair counts as a tap

        let supplyYardEl, gapTrackEl, beamRigEl, fillBarEl, totalReadoutEl, targetReadoutEl, testLoadBtnEl;

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

        // MathJax Safe Re-render
        function renderMath() {
            if (window.MathJax && window.MathJax.startup && window.MathJax.startup.promise) {
                MathJax.startup.promise
                    .then(() => MathJax.typesetPromise())
                    .catch(err => console.warn('MathJax error:', err));
            }
        }

        function startGame() {
            const name = ArcadeKit.requireName('playerNameInput', 'playerNameError');
            if (!name) return;
            playerName = name;

            currentIndex = 0;
            score = 0;
            integrity = 3;
            activeQuestions = ArcadeKit.sample(beamBank, 12);

            supplyYardEl = document.getElementById('supplyYard');
            gapTrackEl = document.getElementById('gapTrack');
            beamRigEl = document.getElementById('beamRig');
            fillBarEl = document.getElementById('fillBar');
            totalReadoutEl = document.getElementById('totalReadout');
            targetReadoutEl = document.getElementById('targetReadout');
            testLoadBtnEl = document.getElementById('testLoadBtn');

            document.getElementById('startScreen').style.display = 'none';
            document.getElementById('failScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'none';
            document.getElementById('gameScreen').style.display = 'block';

            loadBeam();
        }

        // If a decoy's value happens to collide with a correct piece or the target
        // (would render as a confusing duplicate label), nudge its numerator until
        // it lands on a distinct value — keeps the pile at a consistent size instead
        // of just dropping the decoy.
        function nudgeAwayFrom(decoy, blockers) {
            const collides = (f) => blockers.some(b => fracEqual(f, b));
            // Scale up once, then step the numerator by whole increments over a FIXED
            // denominator — the represented value strictly increases each step, so it
            // can never cycle back onto a value it already tried (unlike re-reducing a
            // shrinking fraction, which can loop forever on the same collision).
            const baseNum = decoy.num * 6;
            const baseDen = decoy.den * 6;
            let candidate = decoy;
            let guard = 0;
            while (collides(candidate) && guard < 20) {
                guard++;
                candidate = reduceFrac({ num: baseNum + guard, den: baseDen });
            }
            return candidate;
        }

        // Builds this round's supply pile: two segments that combine exactly to the
        // target, plus the question's vetted distractor values as decoy segments.
        function buildSupply(qData) {
            const target = reduceFrac(qData.correct);
            const [pieceA, pieceB] = splitTarget(target);
            const blockers = [pieceA, pieceB, target];

            const decoys = qData.distractors.map(raw => {
                const d = reduceFrac(raw);
                return blockers.some(b => fracEqual(d, b)) ? nudgeAwayFrom(d, blockers) : d;
            });

            const pile = [pieceA, pieceB, ...decoys].map(f => ({
                id: 'seg' + (segIdCounter++),
                num: f.num,
                den: f.den
            }));

            return ArcadeKit.shuffle(pile);
        }

        function createSegmentChip(piece) {
            const chip = document.createElement('div');
            chip.className = 'beam-segment';
            chip.dataset.id = piece.id;
            chip.dataset.num = piece.num;
            chip.dataset.den = piece.den;
            chip.innerHTML = `<span>${fracToLatex({ num: piece.num, den: piece.den })} m</span>`;
            chip.addEventListener('pointerdown', (e) => onChipPointerDown(e, chip));
            return chip;
        }

        function loadBeam() {
            isLocked = false;
            document.getElementById('feedbackLine').innerText = '';
            document.getElementById('feedbackLine').className = 'feedback-line';
            beamRigEl.classList.remove('result-hold', 'result-under', 'result-over');
            testLoadBtnEl.disabled = false;

            const qData = activeQuestions[currentIndex];
            currentTarget = reduceFrac(qData.correct);

            document.getElementById('beamHeader').innerText = `Beam Calculation ${currentIndex + 1}`;
            document.getElementById('roundCounter').innerText = `${currentIndex + 1} / ${activeQuestions.length}`;
            document.getElementById('scoreDisplay').innerText = `${score} PTS`;
            document.getElementById('integrityDisplay').innerText = `${integrity} / 3`;

            document.getElementById('spanText').innerHTML = qData.prompt;
            targetReadoutEl.innerHTML = fracToLatex(currentTarget) + ' m';

            gapTrackEl.innerHTML = '';
            supplyYardEl.innerHTML = '';
            const pile = buildSupply(qData);
            pile.forEach(piece => supplyYardEl.appendChild(createSegmentChip(piece)));

            updateReadouts();
            renderMath();
        }

        // ===================== DRAG + DROP (pointer events, touch-friendly) =====================
        function onChipPointerDown(e, chip) {
            if (isLocked) return;
            e.preventDefault();
            const rect = chip.getBoundingClientRect();
            dragInfo = {
                chip,
                startX: e.clientX,
                startY: e.clientY,
                offsetX: e.clientX - rect.left,
                offsetY: e.clientY - rect.top,
                width: rect.width,
                height: rect.height,
                moved: false,
                originParent: chip.parentElement
            };
            try { chip.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
            chip.addEventListener('pointermove', onChipPointerMove);
            chip.addEventListener('pointerup', onChipPointerUp);
            chip.addEventListener('pointercancel', onChipPointerUp);
        }

        function beginFloating(chip) {
            const info = dragInfo;
            chip.classList.add('dragging');
            chip.style.width = info.width + 'px';
            chip.style.position = 'fixed';
            document.body.appendChild(chip);
        }

        function positionChip(x, y) {
            const { chip, offsetX, offsetY } = dragInfo;
            chip.style.left = (x - offsetX) + 'px';
            chip.style.top = (y - offsetY) + 'px';
        }

        function onChipPointerMove(e) {
            if (!dragInfo) return;
            const dx = e.clientX - dragInfo.startX;
            const dy = e.clientY - dragInfo.startY;
            if (!dragInfo.moved && Math.hypot(dx, dy) > DRAG_MOVE_THRESHOLD) {
                dragInfo.moved = true;
                beginFloating(dragInfo.chip);
            }
            if (dragInfo.moved) {
                positionChip(e.clientX, e.clientY);
                highlightDropZone(e.clientX, e.clientY);
            }
        }

        function inRect(x, y, rect, pad) {
            return x >= rect.left - pad && x <= rect.right + pad && y >= rect.top - pad && y <= rect.bottom + pad;
        }

        function resolveDropZone(x, y) {
            if (inRect(x, y, gapTrackEl.getBoundingClientRect(), 24)) return 'gap';
            if (inRect(x, y, supplyYardEl.getBoundingClientRect(), 24)) return 'supply';
            return null;
        }

        function highlightDropZone(x, y) {
            const zone = resolveDropZone(x, y);
            gapTrackEl.classList.toggle('drop-hover', zone === 'gap');
            supplyYardEl.classList.toggle('drop-hover', zone === 'supply');
        }

        function clearDropHighlight() {
            gapTrackEl.classList.remove('drop-hover');
            supplyYardEl.classList.remove('drop-hover');
        }

        function insertIntoGapAtX(chip, x) {
            const siblings = Array.from(gapTrackEl.children).filter(c => c !== chip);
            let target = null;
            for (const sib of siblings) {
                const r = sib.getBoundingClientRect();
                if (x < r.left + r.width / 2) { target = sib; break; }
            }
            if (target) gapTrackEl.insertBefore(chip, target);
            else gapTrackEl.appendChild(chip);
        }

        function settleChip(chip) {
            chip.classList.remove('dragging');
            chip.style.position = '';
            chip.style.left = '';
            chip.style.top = '';
            chip.style.width = '';
        }

        function onChipPointerUp(e) {
            if (!dragInfo) return;
            const { chip, moved, originParent } = dragInfo;
            chip.removeEventListener('pointermove', onChipPointerMove);
            chip.removeEventListener('pointerup', onChipPointerUp);
            chip.removeEventListener('pointercancel', onChipPointerUp);
            try { chip.releasePointerCapture(e.pointerId); } catch (err) { /* ignore */ }

            if (!moved) {
                // Tap: toggle the chip between supply yard and gap track.
                settleChip(chip);
                if (chip.parentElement === gapTrackEl) {
                    supplyYardEl.appendChild(chip);
                } else {
                    gapTrackEl.appendChild(chip);
                }
            } else {
                settleChip(chip);
                const zone = resolveDropZone(e.clientX, e.clientY);
                if (zone === 'gap') {
                    insertIntoGapAtX(chip, e.clientX);
                } else if (zone === 'supply') {
                    supplyYardEl.appendChild(chip);
                } else {
                    originParent.appendChild(chip);
                }
            }

            clearDropHighlight();
            dragInfo = null;
            updateReadouts();
        }

        // ===================== TOTALS / READOUTS =====================
        function currentGapTotal() {
            const chips = Array.from(gapTrackEl.children);
            return chips.reduce((sum, chip) => {
                const piece = { num: parseInt(chip.dataset.num, 10), den: parseInt(chip.dataset.den, 10) };
                return addFrac(sum, piece);
            }, { num: 0, den: 1 });
        }

        function updateReadouts() {
            const total = currentGapTotal();
            totalReadoutEl.innerHTML = (total.num === 0 ? '0' : fracToLatex(total)) + ' m';

            const targetDecimal = fracToDecimal(currentTarget);
            const totalDecimal = fracToDecimal(total);
            const pct = targetDecimal > 0 ? Math.min(100, (totalDecimal / (targetDecimal * 1.5)) * 100) : 0;
            fillBarEl.style.width = pct + '%';

            const cmp = compareFrac(total, currentTarget);
            fillBarEl.classList.toggle('over-target', cmp > 0);
            fillBarEl.classList.toggle('exact-target', cmp === 0 && total.num !== 0);

            renderMath();
        }

        function clearGap() {
            if (isLocked) return;
            Array.from(gapTrackEl.children).forEach(chip => supplyYardEl.appendChild(chip));
            updateReadouts();
        }

        // ===================== TEST LOAD =====================
        const holdLines = [
            'HOLDS FIRM. The foreman actually smiled.',
            'Solid as bedrock — that beam is not going anywhere.',
            'Perfect fit! Somewhere, a physics teacher weeps with joy.',
            'Certified. Structurally. Sound. Nailed it.'
        ];
        const underLines = [
            "Gap's still open — you could lose a sandwich down there.",
            'Too short! That beam has commitment issues.',
            'The foreman peers into the gap and sighs loudly.',
            'Not quite enough beam. Measure twice, weld once.'
        ];
        const overLines = [
            "OVERLOAD! That beam is doing a limbo under its own weight.",
            "Too long — it's buckling right over the pier.",
            'The foreman facepalms. That is WAY too much beam.',
            'Overbuilt and overconfident. The bridge disagrees.'
        ];

        function pickLine(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }

        function testLoad() {
            if (isLocked) return;
            isLocked = true;
            testLoadBtnEl.disabled = true;

            const total = currentGapTotal();
            const feedback = document.getElementById('feedbackLine');
            const cmp = compareFrac(total, currentTarget);

            if (cmp === 0 && total.num !== 0) {
                // Exact match — success.
                score += 100;
                beamRigEl.classList.add('result-hold');
                feedback.className = 'feedback-line text-success';
                feedback.innerHTML = `✅ ${pickLine(holdLines)}<br>LOAD TEST PASSED // +100 PTS`;
                renderMath();

                setTimeout(() => {
                    currentIndex++;
                    if (currentIndex >= activeQuestions.length) {
                        triggerVictory();
                    } else {
                        loadBeam();
                    }
                }, 1300);

            } else {
                integrity--;
                document.getElementById('integrityDisplay').innerText = `${integrity} / 3`;

                if (cmp > 0) {
                    const over = subFrac(total, currentTarget);
                    beamRigEl.classList.add('result-over');
                    feedback.className = 'feedback-line text-error';
                    feedback.innerHTML = `💥 ${pickLine(overLines)}<br>Overshot by ${fracToLatex(over)} m // -1 INTEGRITY`;
                } else {
                    const under = subFrac(currentTarget, total);
                    beamRigEl.classList.add('result-under');
                    feedback.className = 'feedback-line text-error';
                    feedback.innerHTML = `😬 ${pickLine(underLines)}<br>Short by ${fracToLatex(under)} m // -1 INTEGRITY`;
                }
                renderMath();

                if (integrity <= 0) {
                    setTimeout(() => {
                        triggerFail();
                    }, 1600);
                } else {
                    // Same beam, fresh pile — retry, matching the original game's
                    // "wrong answer re-tries this question" pacing (currentIndex
                    // only advances on a correct load test).
                    setTimeout(() => {
                        loadBeam();
                    }, 1800);
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
