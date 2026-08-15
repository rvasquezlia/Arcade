        // EXPANDED QUESTION BANK (20 PROBABILITY PROBLEMS)
        const allCasinoRounds = [
            {
                title: "Even Outcome Complement",
                wheelSectors: [1, 2, 3, 4, 5, 6, 7, 8],
                eventFilter: (num) => num % 2 === 0,
                eventName: "Even Numbers",
                prompt: "Target Event \\( E \\): Landing on an Even number. Calculate the complementary probability \\( P(E') \\) of NOT landing on an Even number.",
                correctProb: "1/2",
                options: ["1/2", "1/4", "3/8", "3/4"],
                sampleSpace: "{1, 2, 3, 4, 5, 6, 7, 8}",
                targetSet: "{2, 4, 6, 8}",
                explanation: "Total outcomes \\( |S| = 8 \\). Target Event \\( E = \\{2, 4, 6, 8\\} \\), so \\( |E| = 4 \\). Thus, \\( P(E) = \\frac{4}{8} = \\frac{1}{2} \\). The complementary probability is \\( P(E') = 1 - P(E) = 1 - \\frac{1}{2} = \\frac{1}{2} \\)."
            },
            {
                title: "Prime Target Lock",
                wheelSectors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                eventFilter: (num) => [2, 3, 5, 7].includes(num),
                eventName: "Prime Numbers",
                prompt: "Target Event \\( E \\): Landing on a Prime number \\( \\{2, 3, 5, 7\\} \\). Calculate the complement probability \\( P(E') \\).",
                correctProb: "3/5",
                options: ["3/5", "2/5", "1/2", "7/10"],
                sampleSpace: "{1, 2, ..., 10}",
                targetSet: "{2, 3, 5, 7}",
                explanation: "Total outcomes \\( |S| = 10 \\). Prime outcomes \\( |E| = 4 \\), so \\( P(E) = \\frac{4}{10} = \\frac{2}{5} \\). Complement \\( P(E') = 1 - \\frac{2}{5} = \\frac{3}{5} \\)."
            },
            {
                title: "Multiples of 3 Calibration",
                wheelSectors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                eventFilter: (num) => num % 3 === 0,
                eventName: "Multiples of 3",
                prompt: "Target Event \\( E \\): Landing on a Multiple of 3. What is the theoretical probability \\( P(E) \\)?",
                correctProb: "1/3",
                options: ["1/3", "2/3", "1/4", "5/12"],
                sampleSpace: "{1, 2, ..., 12}",
                targetSet: "{3, 6, 9, 12}",
                explanation: "Total outcomes \\( |S| = 12 \\). Multiples of 3 are \\( \\{3, 6, 9, 12\\} \\) giving \\( |E| = 4 \\). Theoretical probability \\( P(E) = \\frac{4}{12} = \\frac{1}{3} \\)."
            },
            {
                title: "Upper Range Complement",
                wheelSectors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                eventFilter: (num) => num > 8,
                eventName: "Numbers > 8",
                prompt: "Target Event \\( E \\): Landing on a number greater than 8. Calculate the complement probability \\( P(E') \\).",
                correctProb: "2/3",
                options: ["2/3", "1/3", "3/4", "1/2"],
                sampleSpace: "{1, 2, ..., 12}",
                targetSet: "{9, 10, 11, 12}",
                explanation: "Total outcomes \\( |S| = 12 \\). Target outcomes \\( |E| = 4 \\), so \\( P(E) = \\frac{4}{12} = \\frac{1}{3} \\). Complement \\( P(E') = 1 - \\frac{1}{3} = \\frac{2}{3} \\)."
            },
            {
                title: "Perfect Squares Sector",
                wheelSectors: Array.from({length: 16}, (_, i) => i + 1),
                eventFilter: (num) => [1, 4, 9, 16].includes(num),
                eventName: "Perfect Squares",
                prompt: "Target Event \\( E \\): Landing on a Perfect Square \\( \\{1, 4, 9, 16\\} \\). Calculate the complement probability \\( P(E') \\).",
                correctProb: "3/4",
                options: ["3/4", "1/4", "1/2", "5/8"],
                sampleSpace: "{1, 2, ..., 16}",
                targetSet: "{1, 4, 9, 16}",
                explanation: "Total outcomes \\( |S| = 16 \\). Perfect squares count \\( |E| = 4 \\), so \\( P(E) = \\frac{4}{16} = \\frac{1}{4} \\). Complement \\( P(E') = 1 - \\frac{1}{4} = \\frac{3}{4} \\)."
            },
            {
                title: "Factors of 10",
                wheelSectors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                eventFilter: (num) => [1, 2, 5, 10].includes(num),
                eventName: "Factors of 10",
                prompt: "Target Event \\( E \\): Landing on a factor of 10 \\( \\{1, 2, 5, 10\\} \\). Calculate theoretical probability \\( P(E) \\).",
                correctProb: "2/5",
                options: ["2/5", "3/5", "1/2", "3/10"],
                sampleSpace: "{1, 2, ..., 10}",
                targetSet: "{1, 2, 5, 10}",
                explanation: "Total outcomes \\( |S| = 10 \\). Factors of 10 count \\( |E| = 4 \\). Thus \\( P(E) = \\frac{4}{10} = \\frac{2}{5} \\)."
            },
            {
                title: "Multiples of 5 Sector",
                wheelSectors: Array.from({length: 15}, (_, i) => i + 1),
                eventFilter: (num) => num % 5 === 0,
                eventName: "Multiples of 5",
                prompt: "Target Event \\( E \\): Landing on a multiple of 5. Calculate the complement probability \\( P(E') \\).",
                correctProb: "4/5",
                options: ["4/5", "1/5", "2/3", "3/5"],
                sampleSpace: "{1, 2, ..., 15}",
                targetSet: "{5, 10, 15}",
                explanation: "Total outcomes \\( |S| = 15 \\). Multiples of 5 count \\( |E| = 3 \\), so \\( P(E) = \\frac{3}{15} = \\frac{1}{5} \\). Complement \\( P(E') = 1 - \\frac{1}{5} = \\frac{4}{5} \\)."
            },
            {
                title: "Grand High-Roller Odd Lock",
                wheelSectors: Array.from({length: 16}, (_, i) => i + 1),
                eventFilter: (num) => (num % 2 !== 0) && (num < 10),
                eventName: "Odd Numbers < 10",
                prompt: "Target Event \\( E \\): Landing on an Odd number less than 10. Calculate the complement probability \\( P(E') \\).",
                correctProb: "11/16",
                options: ["11/16", "5/16", "9/16", "3/8"],
                sampleSpace: "{1, 2, ..., 16}",
                targetSet: "{1, 3, 5, 7, 9}",
                explanation: "Total outcomes \\( |S| = 16 \\). Target set \\( E = \\{1, 3, 5, 7, 9\\} \\) gives \\( |E| = 5 \\), so \\( P(E) = \\frac{5}{16} \\). Complement \\( P(E') = 1 - \\frac{5}{16} = \\frac{11}{16} \\)."
            },
            // ADDITIONAL NEW QUESTIONS (9 TO 20)
            {
                title: "Factors of 12",
                wheelSectors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                eventFilter: (num) => [1, 2, 3, 4, 6, 12].includes(num),
                eventName: "Factors of 12",
                prompt: "Target Event \\( E \\): Landing on a factor of 12. Calculate theoretical probability \\( P(E) \\).",
                correctProb: "1/2",
                options: ["1/2", "5/12", "7/12", "1/3"],
                sampleSpace: "{1, 2, ..., 12}",
                targetSet: "{1, 2, 3, 4, 6, 12}",
                explanation: "Total outcomes \\( |S| = 12 \\). Factors of 12 are 6 total numbers: \\( |E| = 6 \\). Therefore \\( P(E) = \\frac{6}{12} = \\frac{1}{2} \\)."
            },
            {
                title: "Divisibility by 4",
                wheelSectors: Array.from({length: 20}, (_, i) => i + 1),
                eventFilter: (num) => num % 4 === 0,
                eventName: "Multiples of 4",
                prompt: "Target Event \\( E \\): Landing on a multiple of 4 on a 20-sector wheel. Calculate complement \\( P(E') \\).",
                correctProb: "3/4",
                options: ["3/4", "1/4", "1/2", "4/5"],
                sampleSpace: "{1, 2, ..., 20}",
                targetSet: "{4, 8, 12, 16, 20}",
                explanation: "Total outcomes \\( |S| = 20 \\). Multiples of 4 count \\( |E| = 5 \\), so \\( P(E) = \\frac{5}{20} = \\frac{1}{4} \\). Complement \\( P(E') = 1 - \\frac{1}{4} = \\frac{3}{4} \\)."
            },
            {
                title: "Single Digit Lock",
                wheelSectors: Array.from({length: 15}, (_, i) => i + 1),
                eventFilter: (num) => num <= 9,
                eventName: "Single Digit (<= 9)",
                prompt: "Target Event \\( E \\): Landing on a single-digit number \\( (1-9) \\). Calculate complement \\( P(E') \\).",
                correctProb: "2/5",
                options: ["2/5", "3/5", "1/3", "4/15"],
                sampleSpace: "{1, 2, ..., 15}",
                targetSet: "{1, 2, 3, 4, 5, 6, 7, 8, 9}",
                explanation: "Total outcomes \\( |S| = 15 \\). Single digits count \\( |E| = 9 \\), so \\( P(E) = \\frac{9}{15} = \\frac{3}{5} \\). Complement \\( P(E') = 1 - \\frac{3}{5} = \\frac{2}{5} \\)."
            },
            {
                title: "Multiples of 2 or 5",
                wheelSectors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                eventFilter: (num) => (num % 2 === 0) || (num % 5 === 0),
                eventName: "Multiples of 2 or 5",
                prompt: "Target Event \\( E \\): Landing on a multiple of 2 or 5. Calculate theoretical probability \\( P(E) \\).",
                correctProb: "3/5",
                options: ["3/5", "1/2", "7/10", "4/5"],
                sampleSpace: "{1, 2, ..., 10}",
                targetSet: "{2, 4, 5, 6, 8, 10}",
                explanation: "Total outcomes \\( |S| = 10 \\). Favorable outcomes count \\( |E| = 6 \\). Probability \\( P(E) = \\frac{6}{10} = \\frac{3}{5} \\)."
            },
            {
                title: "Greater Than 5 Sector",
                wheelSectors: [1, 2, 3, 4, 5, 6, 7, 8],
                eventFilter: (num) => num > 5,
                eventName: "Numbers > 5",
                prompt: "Target Event \\( E \\): Landing on a number greater than 5. Calculate complement \\( P(E') \\).",
                correctProb: "5/8",
                options: ["5/8", "3/8", "1/2", "1/4"],
                sampleSpace: "{1, 2, ..., 8}",
                targetSet: "{6, 7, 8}",
                explanation: "Total outcomes \\( |S| = 8 \\). Numbers greater than 5 count \\( |E| = 3 \\), so \\( P(E) = \\frac{3}{8} \\). Complement \\( P(E') = 1 - \\frac{3}{8} = \\frac{5}{8} \\)."
            },
            {
                title: "Factors of 8",
                wheelSectors: [1, 2, 3, 4, 5, 6, 7, 8],
                eventFilter: (num) => [1, 2, 4, 8].includes(num),
                eventName: "Factors of 8",
                prompt: "Target Event \\( E \\): Landing on a factor of 8. Calculate theoretical probability \\( P(E) \\).",
                correctProb: "1/2",
                options: ["1/2", "3/8", "5/8", "1/4"],
                sampleSpace: "{1, 2, ..., 8}",
                targetSet: "{1, 2, 4, 8}",
                explanation: "Total outcomes \\( |S| = 8 \\). Factors of 8 count \\( |E| = 4 \\). Thus \\( P(E) = \\frac{4}{8} = \\frac{1}{2} \\)."
            },
            {
                title: "Composite Numbers",
                wheelSectors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                eventFilter: (num) => [4, 6, 8, 9, 10].includes(num),
                eventName: "Composite Numbers",
                prompt: "Target Event \\( E \\): Landing on a composite number \\( \\{4, 6, 8, 9, 10\\} \\). Calculate complement \\( P(E') \\).",
                correctProb: "1/2",
                options: ["1/2", "2/5", "3/5", "7/10"],
                sampleSpace: "{1, 2, ..., 10}",
                targetSet: "{4, 6, 8, 9, 10}",
                explanation: "Total outcomes \\( |S| = 10 \\). Composite numbers count \\( |E| = 5 \\), so \\( P(E) = \\frac{5}{10} = \\frac{1}{2} \\). Complement \\( P(E') = 1 - \\frac{1}{2} = \\frac{1}{2} \\)."
            },
            {
                title: "Multiples of 4 (12-Wheel)",
                wheelSectors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                eventFilter: (num) => num % 4 === 0,
                eventName: "Multiples of 4",
                prompt: "Target Event \\( E \\): Landing on a multiple of 4 on a 12-sector wheel. Calculate complement \\( P(E') \\).",
                correctProb: "3/4",
                options: ["3/4", "1/4", "2/3", "5/12"],
                sampleSpace: "{1, 2, ..., 12}",
                targetSet: "{4, 8, 12}",
                explanation: "Total outcomes \\( |S| = 12 \\). Multiples of 4 count \\( |E| = 3 \\), so \\( P(E) = \\frac{3}{12} = \\frac{1}{4} \\). Complement \\( P(E') = 1 - \\frac{1}{4} = \\frac{3}{4} \\)."
            },
            {
                title: "Low Values (<= 3)",
                wheelSectors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                eventFilter: (num) => num <= 3,
                eventName: "Numbers <= 3",
                prompt: "Target Event \\( E \\): Landing on a number less than or equal to 3. Calculate theoretical probability \\( P(E) \\).",
                correctProb: "1/4",
                options: ["1/4", "3/4", "1/3", "1/6"],
                sampleSpace: "{1, 2, ..., 12}",
                targetSet: "{1, 2, 3}",
                explanation: "Total outcomes \\( |S| = 12 \\). Favorable outcomes count \\( |E| = 3 \\). Probability \\( P(E) = \\frac{3}{12} = \\frac{1}{4} \\)."
            },
            {
                title: "Powers of 2 Sector",
                wheelSectors: Array.from({length: 16}, (_, i) => i + 1),
                eventFilter: (num) => [1, 2, 4, 8, 16].includes(num),
                eventName: "Powers of 2",
                prompt: "Target Event \\( E \\): Landing on a Power of 2 \\( \\{1, 2, 4, 8, 16\\} \\). Calculate complement \\( P(E') \\).",
                correctProb: "11/16",
                options: ["11/16", "5/16", "3/8", "9/16"],
                sampleSpace: "{1, 2, ..., 16}",
                targetSet: "{1, 2, 4, 8, 16}",
                explanation: "Total outcomes \\( |S| = 16 \\). Target set count \\( |E| = 5 \\), so \\( P(E) = \\frac{5}{16} \\). Complement \\( P(E') = 1 - \\frac{5}{16} = \\frac{11}{16} \\)."
            },
            {
                title: "Multiples of 7",
                wheelSectors: Array.from({length: 14}, (_, i) => i + 1),
                eventFilter: (num) => num % 7 === 0,
                eventName: "Multiples of 7",
                prompt: "Target Event \\( E \\): Landing on a multiple of 7. Calculate theoretical probability \\( P(E) \\).",
                correctProb: "1/7",
                options: ["1/7", "2/7", "6/7", "3/14"],
                sampleSpace: "{1, 2, ..., 14}",
                targetSet: "{7, 14}",
                explanation: "Total outcomes \\( |S| = 14 \\). Multiples of 7 count \\( |E| = 2 \\). Probability \\( P(E) = \\frac{2}{14} = \\frac{1}{7} \\)."
            },
            {
                title: "Primes <= 12",
                wheelSectors: Array.from({length: 12}, (_, i) => i + 1),
                eventFilter: (num) => [2, 3, 5, 7, 11].includes(num),
                eventName: "Primes <= 12",
                prompt: "Target Event \\( E \\): Landing on a prime number less than or equal to 12. Calculate complement \\( P(E') \\).",
                correctProb: "7/12",
                options: ["7/12", "5/12", "1/2", "2/3"],
                sampleSpace: "{1, 2, ..., 12}",
                targetSet: "{2, 3, 5, 7, 11}",
                explanation: "Total outcomes \\( |S| = 12 \\). Prime numbers count \\( |E| = 5 \\), so \\( P(E) = \\frac{5}{12} \\). Complement \\( P(E') = 1 - \\frac{5}{12} = \\frac{7}{12} \\)."
            }
        ];

        // GAME PLAY SESSION STATE
        let activeSessionRounds = [];
        let currentRoundIndex = 0;
        let bankroll = 1000;
        let activeBetAmount = 100;
        let activeBetSpot = 'E'; // 'E' or 'E_PRIME'
        let selectedProb = null;
        let isDarkMode = true;
        let isSpinning = false;

        // Canvas & Wheel Physics
        let canvas, ctx;
        let currentWheelRotation = 0;

        // Shuffle Utility
        function shuffleArray(arr) {
            const temp = [...arr];
            for (let i = temp.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [temp[i], temp[j]] = [temp[j], temp[i]];
            }
            return temp;
        }

        // Theme Switch
        function toggleTheme() {
            isDarkMode = !isDarkMode;
            const body = document.body;
            const btn = document.getElementById('themeBtn');

            if (isDarkMode) {
                body.classList.remove('light-mode');
                btn.innerText = '[ VELVET VIP THEME ]';
            } else {
                body.classList.add('light-mode');
                btn.innerText = '[ EMERALD SUITE THEME ]';
            }
            drawWheel();
        }

        function renderMath() {
            if (window.MathJax && window.MathJax.startup && window.MathJax.startup.promise) {
                MathJax.startup.promise
                    .then(() => MathJax.typesetPromise())
                    .catch(err => console.warn('MathJax error:', err));
            }
        }

        window.addEventListener('DOMContentLoaded', () => {
            canvas = document.getElementById('wheelCanvas');
            ctx = canvas.getContext('2d');
            drawWheel();
        });

        // Start New Casino Game Session (Pick 10 Random Questions)
        function startCasinoSession() {
            // Select 10 random rounds from 20 question pool
            activeSessionRounds = shuffleArray(allCasinoRounds).slice(0, 10);

            currentRoundIndex = 0;
            bankroll = 1000;
            activeBetAmount = 100;
            activeBetSpot = 'E';

            document.getElementById('startScreen').style.display = 'none';
            document.getElementById('failScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'none';
            document.getElementById('gameScreen').style.display = 'block';

            loadRound();
        }

        // Load Round Setup
        function loadRound() {
            isSpinning = false;
            selectedProb = null;

            const rData = activeSessionRounds[currentRoundIndex];

            // Update Status HUD
            document.getElementById('roundHeader').innerText = `Round ${currentRoundIndex + 1}: ${rData.title}`;
            document.getElementById('roundCounter').innerText = `${(currentRoundIndex + 1).toString().padStart(2, '0')} / 10`;
            document.getElementById('bankrollDisplay').innerText = `$${bankroll.toLocaleString()}`;
            document.getElementById('multiplierDisplay').innerText = `1.0x`;
            document.getElementById('multiplierDisplay').style.color = 'var(--neon-cyan)';
            document.getElementById('currentBetDisplay').innerText = `$${activeBetAmount}`;

            // Betting spot titles
            document.getElementById('labelEventE').innerText = `Target: ${rData.eventName}`;
            document.getElementById('labelEventEPrime').innerText = `Complement (NOT ${rData.eventName})`;

            // Prompt text
            document.getElementById('dealerPromptText').innerHTML = rData.prompt;

            // Render buttons
            const probGrid = document.getElementById('probOptionsGrid');
            probGrid.innerHTML = '';

            const shuffledOpts = shuffleArray(rData.options);
            shuffledOpts.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'prob-btn';
                btn.innerText = opt;
                btn.onclick = () => selectProbabilityOption(opt, btn);
                probGrid.appendChild(btn);
            });

            const spinBtn = document.getElementById('spinBtn');
            spinBtn.disabled = true;
            spinBtn.innerText = 'SELECT CALIBRATION FIRST';
            document.getElementById('feedbackLine').innerText = '';

            renderMath();
            drawWheel();
        }

        // Select Probability Answer & Trigger Dealer Audit Explanation Card
        function selectProbabilityOption(optValue, btnEl) {
            if (isSpinning) return;

            document.querySelectorAll('.prob-btn').forEach(b => b.classList.remove('selected'));
            btnEl.classList.add('selected');
            selectedProb = optValue;

            const rData = activeSessionRounds[currentRoundIndex];
            const isCorrect = (selectedProb === rData.correctProb);
            const multDisplay = document.getElementById('multiplierDisplay');

            if (isCorrect) {
                multDisplay.innerText = '1.5x (BONUS!)';
                multDisplay.style.color = 'var(--neon-green)';
            } else {
                multDisplay.innerText = '1.0x (STANDARD)';
                multDisplay.style.color = 'var(--gold-primary)';
            }

            const spinBtn = document.getElementById('spinBtn');
            spinBtn.disabled = false;
            spinBtn.innerText = 'SPIN WHEEL 🎰';

            // SHOW EXPLANATION AUDIT CARD MODAL
            showAuditCard(isCorrect, optValue, rData);
        }

        // Show Explanation Modal Card
        function showAuditCard(isCorrect, userChoice, rData) {
            const modal = document.getElementById('auditModal');
            const badge = document.getElementById('auditBadge');
            const title = document.getElementById('auditTitle');
            const content = document.getElementById('auditMathContent');

            if (isCorrect) {
                badge.className = 'audit-badge badge-correct';
                badge.innerText = 'CALIBRATION SUCCESSFUL (+1.5x MULTIPLIER)';
                title.innerText = 'Dealer Audit: Correct Calculation!';
            } else {
                badge.className = 'audit-badge badge-incorrect';
                badge.innerText = 'CALIBRATION ERROR (1.0x MULTIPLIER)';
                title.innerText = 'Dealer Audit: Calculation Breakdown';
            }

            content.innerHTML = `
                <p style="margin-bottom: 8px;"><strong>Your Choice:</strong> \\( ${userChoice} \\) &nbsp;|&nbsp; <strong>Exact Value:</strong> \\( ${rData.correctProb} \\)</p>
                <p style="margin-bottom: 8px;"><strong>Sample Space \\( S \\):</strong> ${rData.sampleSpace}</p>
                <p style="margin-bottom: 8px;"><strong>Target Event \\( E \\):</strong> ${rData.targetSet}</p>
                <div style="margin-top: 10px; border-top: 1px dashed var(--felt-border); padding-top: 8px;">
                    <strong>Mathematical Solution:</strong><br>
                    ${rData.explanation}
                </div>
            `;

            modal.style.display = 'flex';
            renderMath();
        }

        function closeAuditModal() {
            document.getElementById('auditModal').style.display = 'none';
        }

        // Select Wager Spot
        function selectBetSpot(spot) {
            if (isSpinning) return;
            activeBetSpot = spot;
            document.getElementById('betSpotE').classList.toggle('active', spot === 'E');
            document.getElementById('betSpotEPrime').classList.toggle('active', spot === 'E_PRIME');
        }

        // Select Chip Value
        function selectChipValue(val, btnEl) {
            if (isSpinning) return;

            if (val > bankroll) {
                document.getElementById('feedbackLine').className = 'feedback-line text-error';
                document.getElementById('feedbackLine').innerText = 'INSUFFICIENT CHIPS FOR THIS WAGER';
                return;
            }

            activeBetAmount = val;
            document.querySelectorAll('.chip-btn').forEach(b => b.classList.remove('selected'));
            btnEl.classList.add('selected');
            document.getElementById('currentBetDisplay').innerText = `$${activeBetAmount}`;
            document.getElementById('feedbackLine').innerText = '';
        }

        // Draw Canvas Wheel
        function drawWheel() {
            if (!canvas || activeSessionRounds.length === 0) return;
            const rData = activeSessionRounds[currentRoundIndex];
            const sectors = rData.wheelSectors;
            const totalSlices = sectors.length;
            const sliceAngle = (2 * Math.PI) / totalSlices;

            const w = canvas.width;
            const h = canvas.height;
            const radius = w / 2 - 6;

            ctx.clearRect(0, 0, w, h);

            ctx.save();
            ctx.translate(w / 2, h / 2);
            ctx.rotate(currentWheelRotation);

            for (let i = 0; i < totalSlices; i++) {
                const angle = i * sliceAngle;
                const sectorVal = sectors[i];
                const isTarget = rData.eventFilter(sectorVal);

                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.arc(0, 0, radius, angle, angle + sliceAngle);
                ctx.closePath();

                if (isTarget) {
                    ctx.fillStyle = isDarkMode ? '#ff0055' : '#e11d48';
                } else {
                    ctx.fillStyle = isDarkMode ? '#0f2218' : '#3f2212';
                }
                ctx.fill();
                ctx.lineWidth = 2;
                ctx.strokeStyle = isDarkMode ? '#145835' : '#6b3a19';
                ctx.stroke();

                // Numbers
                ctx.save();
                ctx.rotate(angle + sliceAngle / 2);
                ctx.fillStyle = isTarget ? '#ffffff' : (isDarkMode ? '#00f0ff' : '#fef3c7');
                ctx.font = 'bold 12px "Orbitron", sans-serif';
                ctx.textAlign = 'right';
                ctx.fillText(sectorVal.toString(), radius - 14, 4);
                ctx.restore();
            }

            // Center Pin
            ctx.beginPath();
            ctx.arc(0, 0, 22, 0, 2 * Math.PI);
            ctx.fillStyle = isDarkMode ? '#ffd700' : '#f59e0b';
            ctx.fill();
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();

            ctx.restore();
        }

        // Spin Physics
        function spinWheel() {
            if (isSpinning || !selectedProb) return;

            if (activeBetAmount > bankroll) {
                document.getElementById('feedbackLine').className = 'feedback-line text-error';
                document.getElementById('feedbackLine').innerText = 'INSUFFICIENT CHIPS IN BANKROLL!';
                return;
            }

            isSpinning = true;
            document.getElementById('spinBtn').disabled = true;

            const rData = activeSessionRounds[currentRoundIndex];
            const sectors = rData.wheelSectors;
            const totalSlices = sectors.length;
            const sliceAngle = (2 * Math.PI) / totalSlices;

            const winningIndex = Math.floor(Math.random() * totalSlices);
            const winningSector = sectors[winningIndex];

            const targetSectorAngle = winningIndex * sliceAngle + (sliceAngle / 2);
            const targetRotation = (3 * Math.PI / 2) - targetSectorAngle + (Math.PI * 2 * 5);

            const startTime = performance.now();
            const duration = 3500;
            const startRotation = currentWheelRotation % (Math.PI * 2);

            function animateSpin(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                
                currentWheelRotation = startRotation + (targetRotation - startRotation) * easeOut;
                drawWheel();

                if (progress < 1) {
                    requestAnimationFrame(animateSpin);
                } else {
                    evaluateWheelResult(winningSector);
                }
            }

            requestAnimationFrame(animateSpin);
        }

        // Evaluate Result
        function evaluateWheelResult(winningSector) {
            const rData = activeSessionRounds[currentRoundIndex];
            const isTargetEvent = rData.eventFilter(winningSector);
            const feedback = document.getElementById('feedbackLine');

            const isProbCorrect = (selectedProb === rData.correctProb);
            const oddsMultiplier = isProbCorrect ? 1.5 : 1.0;

            let wonBet = false;
            if (activeBetSpot === 'E' && isTargetEvent) wonBet = true;
            if (activeBetSpot === 'E_PRIME' && !isTargetEvent) wonBet = true;

            if (wonBet) {
                const payout = Math.round(activeBetAmount * 2 * oddsMultiplier);
                bankroll += payout;
                feedback.className = 'feedback-line text-success';
                feedback.innerText = `🎰 WINNER! Landed on ${winningSector}. Won +$${payout.toLocaleString()} Chips!`;
            } else {
                bankroll -= activeBetAmount;
                feedback.className = 'feedback-line text-error';
                feedback.innerText = `❌ HOUSE WINS! Landed on ${winningSector}. Lost -$${activeBetAmount} Chips.`;
            }

            document.getElementById('bankrollDisplay').innerText = `$${bankroll.toLocaleString()}`;

            if (bankroll <= 0) {
                setTimeout(triggerFail, 1500);
            } else {
                setTimeout(() => {
                    currentRoundIndex++;
                    if (currentRoundIndex >= activeSessionRounds.length) {
                        triggerVictory();
                    } else {
                        loadRound();
                    }
                }, 2000);
            }
        }

        function triggerFail() {
            document.getElementById('gameScreen').style.display = 'none';
            document.getElementById('failScreen').style.display = 'flex';
        }

        function triggerVictory() {
            document.getElementById('gameScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'flex';
            document.getElementById('victoryChips').innerText = `$${bankroll.toLocaleString()}`;
        }

        function restartSession() {
            startCasinoSession();
        }
    
