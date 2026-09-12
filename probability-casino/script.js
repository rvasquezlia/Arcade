        // EXPANDED QUESTION BANK (20 PROBABILITY PROBLEMS)
        // Each round now also carries a "mode" flag ('wheel' | 'dice' | 'cards')
        // that decides which physical randomizer animates the round. The
        // underlying probability content (sample space, target set, correct
        // probability, explanation) is untouched from the original bank.
        const allCasinoRounds = [
            {
                title: "Even Outcome Complement",
                mode: "dice",
                wheelSectors: [1, 2, 3, 4, 5, 6, 7, 8],
                eventFilter: (num) => num % 2 === 0,
                eventName: "Even Numbers",
                prompt: "Target Event \\( E \\): Landing on an Even number. Calculate the complementary probability \\( P(E') \\) of NOT landing on an Even number.",
                correctProb: "1/2",
                sampleSpace: "{1, 2, 3, 4, 5, 6, 7, 8}",
                targetSet: "{2, 4, 6, 8}",
                explanation: "Total outcomes \\( |S| = 8 \\). Target Event \\( E = \\{2, 4, 6, 8\\} \\), so \\( |E| = 4 \\). Thus, \\( P(E) = \\frac{4}{8} = \\frac{1}{2} \\). The complementary probability is \\( P(E') = 1 - P(E) = 1 - \\frac{1}{2} = \\frac{1}{2} \\)."
            },
            {
                title: "Prime Target Lock",
                mode: "cards",
                wheelSectors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                eventFilter: (num) => [2, 3, 5, 7].includes(num),
                eventName: "Prime Numbers",
                prompt: "Target Event \\( E \\): Landing on a Prime number \\( \\{2, 3, 5, 7\\} \\). Calculate the complement probability \\( P(E') \\).",
                correctProb: "3/5",
                sampleSpace: "{1, 2, ..., 10}",
                targetSet: "{2, 3, 5, 7}",
                explanation: "Total outcomes \\( |S| = 10 \\). Prime outcomes \\( |E| = 4 \\), so \\( P(E) = \\frac{4}{10} = \\frac{2}{5} \\). Complement \\( P(E') = 1 - \\frac{2}{5} = \\frac{3}{5} \\)."
            },
            {
                title: "Multiples of 3 Calibration",
                mode: "dice",
                wheelSectors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                eventFilter: (num) => num % 3 === 0,
                eventName: "Multiples of 3",
                prompt: "Target Event \\( E \\): Landing on a Multiple of 3. What is the theoretical probability \\( P(E) \\)?",
                correctProb: "1/3",
                sampleSpace: "{1, 2, ..., 12}",
                targetSet: "{3, 6, 9, 12}",
                explanation: "Total outcomes \\( |S| = 12 \\). Multiples of 3 are \\( \\{3, 6, 9, 12\\} \\) giving \\( |E| = 4 \\). Theoretical probability \\( P(E) = \\frac{4}{12} = \\frac{1}{3} \\)."
            },
            {
                title: "Upper Range Complement",
                mode: "wheel",
                wheelSectors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                eventFilter: (num) => num > 8,
                eventName: "Numbers > 8",
                prompt: "Target Event \\( E \\): Landing on a number greater than 8. Calculate the complement probability \\( P(E') \\).",
                correctProb: "2/3",
                sampleSpace: "{1, 2, ..., 12}",
                targetSet: "{9, 10, 11, 12}",
                explanation: "Total outcomes \\( |S| = 12 \\). Target outcomes \\( |E| = 4 \\), so \\( P(E) = \\frac{4}{12} = \\frac{1}{3} \\). Complement \\( P(E') = 1 - \\frac{1}{3} = \\frac{2}{3} \\)."
            },
            {
                title: "Perfect Squares Sector",
                mode: "wheel",
                wheelSectors: Array.from({length: 16}, (_, i) => i + 1),
                eventFilter: (num) => [1, 4, 9, 16].includes(num),
                eventName: "Perfect Squares",
                prompt: "Target Event \\( E \\): Landing on a Perfect Square \\( \\{1, 4, 9, 16\\} \\). Calculate the complement probability \\( P(E') \\).",
                correctProb: "3/4",
                sampleSpace: "{1, 2, ..., 16}",
                targetSet: "{1, 4, 9, 16}",
                explanation: "Total outcomes \\( |S| = 16 \\). Perfect squares count \\( |E| = 4 \\), so \\( P(E) = \\frac{4}{16} = \\frac{1}{4} \\). Complement \\( P(E') = 1 - \\frac{1}{4} = \\frac{3}{4} \\)."
            },
            {
                title: "Factors of 10",
                mode: "dice",
                wheelSectors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                eventFilter: (num) => [1, 2, 5, 10].includes(num),
                eventName: "Factors of 10",
                prompt: "Target Event \\( E \\): Landing on a factor of 10 \\( \\{1, 2, 5, 10\\} \\). Calculate theoretical probability \\( P(E) \\).",
                correctProb: "2/5",
                sampleSpace: "{1, 2, ..., 10}",
                targetSet: "{1, 2, 5, 10}",
                explanation: "Total outcomes \\( |S| = 10 \\). Factors of 10 count \\( |E| = 4 \\). Thus \\( P(E) = \\frac{4}{10} = \\frac{2}{5} \\)."
            },
            {
                title: "Multiples of 5 Sector",
                mode: "wheel",
                wheelSectors: Array.from({length: 15}, (_, i) => i + 1),
                eventFilter: (num) => num % 5 === 0,
                eventName: "Multiples of 5",
                prompt: "Target Event \\( E \\): Landing on a multiple of 5. Calculate the complement probability \\( P(E') \\).",
                correctProb: "4/5",
                sampleSpace: "{1, 2, ..., 15}",
                targetSet: "{5, 10, 15}",
                explanation: "Total outcomes \\( |S| = 15 \\). Multiples of 5 count \\( |E| = 3 \\), so \\( P(E) = \\frac{3}{15} = \\frac{1}{5} \\). Complement \\( P(E') = 1 - \\frac{1}{5} = \\frac{4}{5} \\)."
            },
            {
                title: "Grand High-Roller Odd Lock",
                mode: "wheel",
                wheelSectors: Array.from({length: 16}, (_, i) => i + 1),
                eventFilter: (num) => (num % 2 !== 0) && (num < 10),
                eventName: "Odd Numbers < 10",
                prompt: "Target Event \\( E \\): Landing on an Odd number less than 10. Calculate the complement probability \\( P(E') \\).",
                correctProb: "11/16",
                sampleSpace: "{1, 2, ..., 16}",
                targetSet: "{1, 3, 5, 7, 9}",
                explanation: "Total outcomes \\( |S| = 16 \\). Target set \\( E = \\{1, 3, 5, 7, 9\\} \\) gives \\( |E| = 5 \\), so \\( P(E) = \\frac{5}{16} \\). Complement \\( P(E') = 1 - \\frac{5}{16} = \\frac{11}{16} \\)."
            },
            // ADDITIONAL NEW QUESTIONS (9 TO 20)
            {
                title: "Factors of 12",
                mode: "cards",
                wheelSectors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                eventFilter: (num) => [1, 2, 3, 4, 6, 12].includes(num),
                eventName: "Factors of 12",
                prompt: "Target Event \\( E \\): Landing on a factor of 12. Calculate theoretical probability \\( P(E) \\).",
                correctProb: "1/2",
                sampleSpace: "{1, 2, ..., 12}",
                targetSet: "{1, 2, 3, 4, 6, 12}",
                explanation: "Total outcomes \\( |S| = 12 \\). Factors of 12 are 6 total numbers: \\( |E| = 6 \\). Therefore \\( P(E) = \\frac{6}{12} = \\frac{1}{2} \\)."
            },
            {
                title: "Divisibility by 4",
                mode: "wheel",
                wheelSectors: Array.from({length: 20}, (_, i) => i + 1),
                eventFilter: (num) => num % 4 === 0,
                eventName: "Multiples of 4",
                prompt: "Target Event \\( E \\): Landing on a multiple of 4 on a 20-sector wheel. Calculate complement \\( P(E') \\).",
                correctProb: "3/4",
                sampleSpace: "{1, 2, ..., 20}",
                targetSet: "{4, 8, 12, 16, 20}",
                explanation: "Total outcomes \\( |S| = 20 \\). Multiples of 4 count \\( |E| = 5 \\), so \\( P(E) = \\frac{5}{20} = \\frac{1}{4} \\). Complement \\( P(E') = 1 - \\frac{1}{4} = \\frac{3}{4} \\)."
            },
            {
                title: "Single Digit Lock",
                mode: "wheel",
                wheelSectors: Array.from({length: 15}, (_, i) => i + 1),
                eventFilter: (num) => num <= 9,
                eventName: "Single Digit (<= 9)",
                prompt: "Target Event \\( E \\): Landing on a single-digit number \\( (1-9) \\). Calculate complement \\( P(E') \\).",
                correctProb: "2/5",
                sampleSpace: "{1, 2, ..., 15}",
                targetSet: "{1, 2, 3, 4, 5, 6, 7, 8, 9}",
                explanation: "Total outcomes \\( |S| = 15 \\). Single digits count \\( |E| = 9 \\), so \\( P(E) = \\frac{9}{15} = \\frac{3}{5} \\). Complement \\( P(E') = 1 - \\frac{3}{5} = \\frac{2}{5} \\)."
            },
            {
                title: "Multiples of 2 or 5",
                mode: "dice",
                wheelSectors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                eventFilter: (num) => (num % 2 === 0) || (num % 5 === 0),
                eventName: "Multiples of 2 or 5",
                prompt: "Target Event \\( E \\): Landing on a multiple of 2 or 5. Calculate theoretical probability \\( P(E) \\).",
                correctProb: "3/5",
                sampleSpace: "{1, 2, ..., 10}",
                targetSet: "{2, 4, 5, 6, 8, 10}",
                explanation: "Total outcomes \\( |S| = 10 \\). Favorable outcomes count \\( |E| = 6 \\). Probability \\( P(E) = \\frac{6}{10} = \\frac{3}{5} \\)."
            },
            {
                title: "Greater Than 5 Sector",
                mode: "dice",
                wheelSectors: [1, 2, 3, 4, 5, 6, 7, 8],
                eventFilter: (num) => num > 5,
                eventName: "Numbers > 5",
                prompt: "Target Event \\( E \\): Landing on a number greater than 5. Calculate complement \\( P(E') \\).",
                correctProb: "5/8",
                sampleSpace: "{1, 2, ..., 8}",
                targetSet: "{6, 7, 8}",
                explanation: "Total outcomes \\( |S| = 8 \\). Numbers greater than 5 count \\( |E| = 3 \\), so \\( P(E) = \\frac{3}{8} \\). Complement \\( P(E') = 1 - \\frac{3}{8} = \\frac{5}{8} \\)."
            },
            {
                title: "Factors of 8",
                mode: "dice",
                wheelSectors: [1, 2, 3, 4, 5, 6, 7, 8],
                eventFilter: (num) => [1, 2, 4, 8].includes(num),
                eventName: "Factors of 8",
                prompt: "Target Event \\( E \\): Landing on a factor of 8. Calculate theoretical probability \\( P(E) \\).",
                correctProb: "1/2",
                sampleSpace: "{1, 2, ..., 8}",
                targetSet: "{1, 2, 4, 8}",
                explanation: "Total outcomes \\( |S| = 8 \\). Factors of 8 count \\( |E| = 4 \\). Thus \\( P(E) = \\frac{4}{8} = \\frac{1}{2} \\)."
            },
            {
                title: "Composite Numbers",
                mode: "dice",
                wheelSectors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                eventFilter: (num) => [4, 6, 8, 9, 10].includes(num),
                eventName: "Composite Numbers",
                prompt: "Target Event \\( E \\): Landing on a composite number \\( \\{4, 6, 8, 9, 10\\} \\). Calculate complement \\( P(E') \\).",
                correctProb: "1/2",
                sampleSpace: "{1, 2, ..., 10}",
                targetSet: "{4, 6, 8, 9, 10}",
                explanation: "Total outcomes \\( |S| = 10 \\). Composite numbers count \\( |E| = 5 \\), so \\( P(E) = \\frac{5}{10} = \\frac{1}{2} \\). Complement \\( P(E') = 1 - \\frac{1}{2} = \\frac{1}{2} \\)."
            },
            {
                title: "Multiples of 4 (12-Wheel)",
                mode: "cards",
                wheelSectors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                eventFilter: (num) => num % 4 === 0,
                eventName: "Multiples of 4",
                prompt: "Target Event \\( E \\): Landing on a multiple of 4 on a 12-sector wheel. Calculate complement \\( P(E') \\).",
                correctProb: "3/4",
                sampleSpace: "{1, 2, ..., 12}",
                targetSet: "{4, 8, 12}",
                explanation: "Total outcomes \\( |S| = 12 \\). Multiples of 4 count \\( |E| = 3 \\), so \\( P(E) = \\frac{3}{12} = \\frac{1}{4} \\). Complement \\( P(E') = 1 - \\frac{1}{4} = \\frac{3}{4} \\)."
            },
            {
                title: "Low Values (<= 3)",
                mode: "cards",
                wheelSectors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                eventFilter: (num) => num <= 3,
                eventName: "Numbers <= 3",
                prompt: "Target Event \\( E \\): Landing on a number less than or equal to 3. Calculate theoretical probability \\( P(E) \\).",
                correctProb: "1/4",
                sampleSpace: "{1, 2, ..., 12}",
                targetSet: "{1, 2, 3}",
                explanation: "Total outcomes \\( |S| = 12 \\). Favorable outcomes count \\( |E| = 3 \\). Probability \\( P(E) = \\frac{3}{12} = \\frac{1}{4} \\)."
            },
            {
                title: "Powers of 2 Sector",
                mode: "cards",
                wheelSectors: Array.from({length: 16}, (_, i) => i + 1),
                eventFilter: (num) => [1, 2, 4, 8, 16].includes(num),
                eventName: "Powers of 2",
                prompt: "Target Event \\( E \\): Landing on a Power of 2 \\( \\{1, 2, 4, 8, 16\\} \\). Calculate complement \\( P(E') \\).",
                correctProb: "11/16",
                sampleSpace: "{1, 2, ..., 16}",
                targetSet: "{1, 2, 4, 8, 16}",
                explanation: "Total outcomes \\( |S| = 16 \\). Target set count \\( |E| = 5 \\), so \\( P(E) = \\frac{5}{16} \\). Complement \\( P(E') = 1 - \\frac{5}{16} = \\frac{11}{16} \\)."
            },
            {
                title: "Multiples of 7",
                mode: "cards",
                wheelSectors: Array.from({length: 14}, (_, i) => i + 1),
                eventFilter: (num) => num % 7 === 0,
                eventName: "Multiples of 7",
                prompt: "Target Event \\( E \\): Landing on a multiple of 7. Calculate theoretical probability \\( P(E) \\).",
                correctProb: "1/7",
                sampleSpace: "{1, 2, ..., 14}",
                targetSet: "{7, 14}",
                explanation: "Total outcomes \\( |S| = 14 \\). Multiples of 7 count \\( |E| = 2 \\). Probability \\( P(E) = \\frac{2}{14} = \\frac{1}{7} \\)."
            },
            {
                title: "Primes <= 12",
                mode: "cards",
                wheelSectors: Array.from({length: 12}, (_, i) => i + 1),
                eventFilter: (num) => [2, 3, 5, 7, 11].includes(num),
                eventName: "Primes <= 12",
                prompt: "Target Event \\( E \\): Landing on a prime number less than or equal to 12. Calculate complement \\( P(E') \\).",
                correctProb: "7/12",
                sampleSpace: "{1, 2, ..., 12}",
                targetSet: "{2, 3, 5, 7, 11}",
                explanation: "Total outcomes \\( |S| = 12 \\). Prime numbers count \\( |E| = 5 \\), so \\( P(E) = \\frac{5}{12} \\). Complement \\( P(E') = 1 - \\frac{5}{12} = \\frac{7}{12} \\)."
            }
        ];

        // Friendlier action-button labels & pit-boss commentary, per mini-game.
        const ACTION_LABELS = {
            wheel: 'SPIN THE WHEEL 🎰',
            dice: 'ROLL THE DICE 🎲',
            cards: 'DRAW THE CARD 🂡'
        };

        const DEALER_QUIPS = {
            roundIntro: {
                wheel: [
                    "The pit boss dims the lights. \"Let's see where fate parks the ball.\"",
                    "Dealer polishes the wheel with a napkin. \"She's greased for maximum drama.\"",
                    "\"Wheel time, rookie,\" the dealer grins. \"Try not to blink.\""
                ],
                dice: [
                    "The dealer cracks his knuckles. \"Two dice, zero mercy. Let's tumble.\"",
                    "Pit boss slides you the dice cup. \"Blow on 'em if it helps — it does nothing.\"",
                    "\"Dice don't lie,\" says the dealer, \"but they do bounce dramatically.\""
                ],
                cards: [
                    "The dealer fans the deck like a magician who skipped magic school.",
                    "\"One card, one truth,\" the dealer intones, shuffling with unnecessary flair.",
                    "Pit boss taps the deck. \"This deck's been shuffled more than my life choices.\""
                ]
            },
            win: [
                "The dealer claps slowly. \"Fine. FINE. You got lucky, Einstein.\"",
                "Pit boss mutters into his walkie-talkie: \"We've got a mathlete on the floor.\"",
                "\"Chips for the brainiac!\" the dealer announces, mildly betrayed.",
                "The house band breaks into a triumphant kazoo solo, just for you."
            ],
            lose: [
                "The dealer sweeps your chips with theatrical sympathy. \"House says thanks.\"",
                "\"Statistically predictable,\" the dealer shrugs, \"emotionally devastating.\"",
                "Pit boss slides you a tissue. \"It's not you. It's the math. Okay, it's a little you.\"",
                "The house cat knocks a chip off the table for extra insult."
            ],
            correctCalc: [
                "Dealer nods, impressed. \"Somebody actually did the homework.\"",
                "\"Correct!\" the pit boss admits, wounded pride and all. 1.5x multiplier unlocked!"
            ],
            wrongCalc: [
                "Dealer winces. \"Close, but the house grades on a very unforgiving curve.\"",
                "\"Math check failed,\" says the dealer, sliding you the standard 1.0x. \"Study the audit card.\""
            ]
        };

        function pickQuip(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }

        // GAME PLAY SESSION STATE
        let activeSessionRounds = [];
        let currentRoundIndex = 0;
        let bankroll = 1000;
        let activeBetAmount = 100;
        let activeBetSpot = 'E'; // 'E' or 'E_PRIME'
        let isDarkMode = true;
        let isSpinning = false;
        let hasLockedAnswer = false;
        let lastAnswerWasCorrect = false;
        let lastTypedAnswer = '';
        let playerName = '';

        // Canvas & Wheel Physics
        let canvas, ctx;
        let currentWheelRotation = 0;
        let wheelAnimationId = null;

        // Shuffle Utility
        function shuffleArray(arr) {
            const temp = [...arr];
            for (let i = temp.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [temp[i], temp[j]] = [temp[j], temp[i]];
            }
            return temp;
        }

        // Escape a small piece of user-typed text before dropping it into innerHTML.
        function escapeHtml(str) {
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;');
        }

        // ---------------------------------------------------------------
        // Probability answer parsing: accepts "1/2", "0.5", ".5", "50%",
        // or any un-reduced equivalent like "2/4" — all compare equal via
        // exact fraction reduction (no floating point rounding involved).
        // ---------------------------------------------------------------
        function gcdInt(a, b) {
            a = Math.abs(a); b = Math.abs(b);
            while (b) { [a, b] = [b, a % b]; }
            return a || 1;
        }

        function reduceFraction(num, den) {
            if (!Number.isFinite(num) || !Number.isFinite(den) || den === 0) return null;
            if (den < 0) { den = -den; num = -num; }
            const g = gcdInt(num, den);
            return { num: num / g, den: den / g };
        }

        function parseDecimalOrInt(raw) {
            if (!/^-?(\d+(\.\d+)?|\.\d+)$/.test(raw)) return null;
            const neg = raw.startsWith('-');
            const clean = neg ? raw.slice(1) : raw;
            if (clean.includes('.')) {
                const [intPart, fracPart] = clean.split('.');
                const denom = Math.pow(10, fracPart.length);
                const numer = Number((intPart || '0') + fracPart);
                return reduceFraction(neg ? -numer : numer, denom);
            }
            const val = Number(clean);
            if (!Number.isInteger(val)) return null;
            return reduceFraction(neg ? -val : val, 1);
        }

        function parseProbabilityInput(rawInput) {
            if (typeof rawInput !== 'string') return null;
            const s = rawInput.trim();
            if (s === '') return null;

            if (s.endsWith('%')) {
                const inner = parseDecimalOrInt(s.slice(0, -1).trim());
                if (!inner) return null;
                return reduceFraction(inner.num, inner.den * 100);
            }

            if (s.includes('/')) {
                const parts = s.split('/');
                if (parts.length !== 2) return null;
                const n = Number(parts[0].trim());
                const d = Number(parts[1].trim());
                if (!Number.isInteger(n) || !Number.isInteger(d) || d === 0) return null;
                return reduceFraction(n, d);
            }

            return parseDecimalOrInt(s);
        }

        function isEquivalentProbability(inputStr, correctStr) {
            const a = parseProbabilityInput(inputStr);
            const b = parseProbabilityInput(correctStr);
            if (!a || !b) return false;
            return a.num === b.num && a.den === b.den;
        }

        // Theme Switch
        function toggleTheme() {
            isDarkMode = !isDarkMode;
            const body = document.body;
            const icon = document.getElementById('themeIcon');
            const text = document.getElementById('themeText');

            if (isDarkMode) {
                body.classList.remove('light-mode');
                icon.innerText = '🌙';
                text.innerText = 'Dark Mode';
            } else {
                body.classList.add('light-mode');
                icon.innerText = '☀️';
                text.innerText = 'Light Mode';
            }
            if (activeSessionRounds.length && activeSessionRounds[currentRoundIndex].mode === 'wheel') {
                drawWheel();
            }
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
            renderDiePips(document.getElementById('die1'), 1);
            renderDiePips(document.getElementById('die2'), 1);
        });

        // Build one session's 10 rounds, guaranteeing all three mini-games
        // show up (4 wheel + 3 dice + 3 cards), then shuffles round order.
        function buildSessionRounds() {
            const byMode = { wheel: [], dice: [], cards: [] };
            allCasinoRounds.forEach(r => byMode[r.mode].push(r));
            const picks = [
                ...shuffleArray(byMode.wheel).slice(0, 4),
                ...shuffleArray(byMode.dice).slice(0, 3),
                ...shuffleArray(byMode.cards).slice(0, 3)
            ];
            return shuffleArray(picks);
        }

        // Start New Casino Game Session
        function startCasinoSession() {
            const name = ArcadeKit.requireName('playerNameInput', 'playerNameError');
            if (!name) return;
            playerName = name;

            activeSessionRounds = buildSessionRounds();

            currentRoundIndex = 0;
            bankroll = 1000;
            activeBetAmount = 100;
            activeBetSpot = 'E';

            if (wheelAnimationId) {
                cancelAnimationFrame(wheelAnimationId);
                wheelAnimationId = null;
            }

            document.getElementById('startScreen').style.display = 'none';
            document.getElementById('failScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'none';
            document.getElementById('gameScreen').style.display = 'block';

            // Reset bet UI to defaults
            document.getElementById('betSpotE').classList.add('active');
            document.getElementById('betSpotEPrime').classList.remove('active');
            document.querySelectorAll('.chip-btn').forEach((b, i) => b.classList.toggle('selected', i === 0));

            loadRound();
        }

        // Load Round Setup
        function loadRound() {
            isSpinning = false;
            hasLockedAnswer = false;
            lastAnswerWasCorrect = false;
            lastTypedAnswer = '';

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
            document.getElementById('dealerQuipLine').innerText = pickQuip(DEALER_QUIPS.roundIntro[rData.mode]);

            // Reset typed-answer input
            const probInput = document.getElementById('probAnswerInput');
            probInput.value = '';
            probInput.disabled = false;
            document.getElementById('probCheckBtn').disabled = false;
            const probFeedback = document.getElementById('probInputFeedback');
            probFeedback.innerText = '';
            probFeedback.className = 'prob-input-feedback';

            const actionBtn = document.getElementById('actionBtn');
            actionBtn.disabled = true;
            actionBtn.innerText = 'SELECT CALIBRATION FIRST';

            document.getElementById('feedbackLine').innerText = '';

            // Show only the visual matching this round's mini-game
            document.getElementById('wheelWrapper').style.display = rData.mode === 'wheel' ? 'flex' : 'none';
            document.getElementById('diceWrapper').style.display = rData.mode === 'dice' ? 'flex' : 'none';
            document.getElementById('cardsWrapper').style.display = rData.mode === 'cards' ? 'flex' : 'none';

            if (rData.mode === 'wheel') {
                drawWheel();
            } else if (rData.mode === 'dice') {
                document.getElementById('die1').classList.remove('tumbling');
                document.getElementById('die2').classList.remove('tumbling');
                renderDiePips(document.getElementById('die1'), 1);
                renderDiePips(document.getElementById('die2'), 1);
                document.getElementById('diceReadout').innerText = 'Ready to roll…';
            } else {
                const flipCard = document.getElementById('flipCard');
                flipCard.classList.remove('flipped');
                document.getElementById('flipCardValue').innerHTML = '?';
                document.getElementById('deckStack').classList.remove('shuffling');
                document.getElementById('cardReadout').innerText = 'Ready to draw…';
            }

            renderMath();
        }

        // Handle the typed probability estimate.
        function submitProbabilityAnswer() {
            if (isSpinning) return;

            const input = document.getElementById('probAnswerInput');
            const raw = input.value.trim();
            const feedbackEl = document.getElementById('probInputFeedback');
            const rData = activeSessionRounds[currentRoundIndex];

            if (!raw) {
                feedbackEl.className = 'prob-input-feedback text-error';
                feedbackEl.innerText = 'Type a probability first — fraction, decimal, whatever speaks to you.';
                return;
            }

            const parsed = parseProbabilityInput(raw);
            if (!parsed) {
                feedbackEl.className = 'prob-input-feedback text-error';
                feedbackEl.innerText = 'Dealer squints: "That is not a number I recognize." Try 3/8, 0.375, or .375.';
                return;
            }

            const isCorrect = isEquivalentProbability(raw, rData.correctProb);
            lastTypedAnswer = raw;
            lastAnswerWasCorrect = isCorrect;
            hasLockedAnswer = true;

            const multDisplay = document.getElementById('multiplierDisplay');
            if (isCorrect) {
                multDisplay.innerText = '1.5x (BONUS!)';
                multDisplay.style.color = 'var(--neon-green)';
            } else {
                multDisplay.innerText = '1.0x (STANDARD)';
                multDisplay.style.color = 'var(--gold-primary)';
            }

            feedbackEl.className = isCorrect ? 'prob-input-feedback text-success' : 'prob-input-feedback text-error';
            feedbackEl.innerText = isCorrect ? 'Locked in — dealer nods slowly.' : 'Locked in — dealer is already writing the audit card.';

            const actionBtn = document.getElementById('actionBtn');
            actionBtn.disabled = false;
            actionBtn.innerText = ACTION_LABELS[rData.mode];

            showAuditCard(isCorrect, raw, rData);
        }

        function handleProbInputKeydown(evt) {
            if (evt.key === 'Enter') {
                evt.preventDefault();
                submitProbabilityAnswer();
            }
        }

        // Show Explanation Modal Card
        function showAuditCard(isCorrect, userChoice, rData) {
            const modal = document.getElementById('auditModal');
            const badge = document.getElementById('auditBadge');
            const title = document.getElementById('auditTitle');
            const content = document.getElementById('auditMathContent');
            const closeBtn = document.getElementById('auditCloseBtn');

            if (isCorrect) {
                badge.className = 'audit-badge badge-correct';
                badge.innerText = 'CALIBRATION SUCCESSFUL (+1.5x MULTIPLIER)';
                title.innerText = 'Dealer Audit: Correct Calculation!';
            } else {
                badge.className = 'audit-badge badge-incorrect';
                badge.innerText = 'CALIBRATION ERROR (1.0x MULTIPLIER)';
                title.innerText = 'Dealer Audit: Calculation Breakdown';
            }

            const quip = isCorrect ? pickQuip(DEALER_QUIPS.correctCalc) : pickQuip(DEALER_QUIPS.wrongCalc);

            content.innerHTML = `
                <p style="margin-bottom: 8px;"><strong>Your Answer:</strong> ${escapeHtml(userChoice)} &nbsp;|&nbsp; <strong>Exact Value:</strong> \\( ${rData.correctProb} \\)</p>
                <p style="margin-bottom: 8px;"><strong>Sample Space \\( S \\):</strong> ${rData.sampleSpace}</p>
                <p style="margin-bottom: 8px;"><strong>Target Event \\( E \\):</strong> ${rData.targetSet}</p>
                <div style="margin-top: 10px; border-top: 1px dashed var(--felt-border); padding-top: 8px;">
                    <strong>Mathematical Solution:</strong><br>
                    ${rData.explanation}
                </div>
                <p class="dealer-quip-audit">${quip}</p>
            `;

            const actionWord = rData.mode === 'wheel' ? 'THE SPIN' : (rData.mode === 'dice' ? 'THE ROLL' : 'THE DRAW');
            closeBtn.innerText = `CONTINUE TO ${actionWord}`;

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

        // ---------------------------------------------------------------
        // MINI-GAME 1: Spinning Wheel (canvas)
        // ---------------------------------------------------------------
        function drawWheel() {
            if (!canvas || activeSessionRounds.length === 0) return;
            const rData = activeSessionRounds[currentRoundIndex];
            if (rData.mode !== 'wheel') return;
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

        function spinWheel() {
            if (isSpinning || !hasLockedAnswer) return;

            if (activeBetAmount > bankroll) {
                document.getElementById('feedbackLine').className = 'feedback-line text-error';
                document.getElementById('feedbackLine').innerText = 'INSUFFICIENT CHIPS IN BANKROLL!';
                return;
            }

            isSpinning = true;
            lockRoundControls();

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

            if (wheelAnimationId) {
                cancelAnimationFrame(wheelAnimationId);
                wheelAnimationId = null;
            }

            function animateSpin(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);

                currentWheelRotation = startRotation + (targetRotation - startRotation) * easeOut;
                drawWheel();

                if (progress < 1) {
                    wheelAnimationId = requestAnimationFrame(animateSpin);
                } else {
                    wheelAnimationId = null;
                    evaluateRoundResult(winningSector);
                }
            }

            wheelAnimationId = requestAnimationFrame(animateSpin);
        }

        // ---------------------------------------------------------------
        // MINI-GAME 2: Two Tumbling Dice (DOM + CSS)
        // ---------------------------------------------------------------
        const DICE_PIP_MAP = {
            1: [5],
            2: [1, 9],
            3: [1, 5, 9],
            4: [1, 3, 7, 9],
            5: [1, 3, 5, 7, 9],
            6: [1, 3, 4, 6, 7, 9]
        };

        function renderDiePips(dieEl, value) {
            if (!dieEl) return;
            dieEl.innerHTML = '';
            dieEl.dataset.value = value;
            const activePips = DICE_PIP_MAP[value] || DICE_PIP_MAP[1];
            for (let pos = 1; pos <= 9; pos++) {
                const dot = document.createElement('div');
                dot.className = 'pip';
                const row = Math.ceil(pos / 3);
                const col = ((pos - 1) % 3) + 1;
                dot.style.gridRow = row;
                dot.style.gridColumn = col;
                if (!activePips.includes(pos)) dot.style.visibility = 'hidden';
                dieEl.appendChild(dot);
            }
        }

        function rollDice() {
            if (isSpinning || !hasLockedAnswer) return;

            if (activeBetAmount > bankroll) {
                document.getElementById('feedbackLine').className = 'feedback-line text-error';
                document.getElementById('feedbackLine').innerText = 'INSUFFICIENT CHIPS IN BANKROLL!';
                return;
            }

            isSpinning = true;
            lockRoundControls();

            const rData = activeSessionRounds[currentRoundIndex];
            const sectors = rData.wheelSectors;
            const totalSlices = sectors.length;
            const winningIndex = Math.floor(Math.random() * totalSlices);
            const winningSector = sectors[winningIndex];

            const die1El = document.getElementById('die1');
            const die2El = document.getElementById('die2');
            const readout = document.getElementById('diceReadout');
            die1El.classList.add('tumbling');
            die2El.classList.add('tumbling');
            readout.innerText = 'Tumbling…';

            const finalDie1 = (winningIndex % 6) + 1;
            const finalDie2 = (Math.floor(winningIndex / 6) % 6) + 1;

            let tickCount = 0;
            const maxTicks = 14;
            const tickTimer = setInterval(() => {
                tickCount++;
                renderDiePips(die1El, 1 + Math.floor(Math.random() * 6));
                renderDiePips(die2El, 1 + Math.floor(Math.random() * 6));

                if (tickCount >= maxTicks) {
                    clearInterval(tickTimer);
                    die1El.classList.remove('tumbling');
                    die2El.classList.remove('tumbling');
                    renderDiePips(die1El, finalDie1);
                    renderDiePips(die2El, finalDie2);
                    readout.innerText = `🎲 Dice settle on sector ${winningSector}!`;
                    setTimeout(() => evaluateRoundResult(winningSector), 500);
                }
            }, 90);
        }

        // ---------------------------------------------------------------
        // MINI-GAME 3: Card Flip From a Shuffled Deck (DOM + CSS 3D flip)
        // ---------------------------------------------------------------
        function drawCard() {
            if (isSpinning || !hasLockedAnswer) return;

            if (activeBetAmount > bankroll) {
                document.getElementById('feedbackLine').className = 'feedback-line text-error';
                document.getElementById('feedbackLine').innerText = 'INSUFFICIENT CHIPS IN BANKROLL!';
                return;
            }

            isSpinning = true;
            lockRoundControls();

            const rData = activeSessionRounds[currentRoundIndex];
            const sectors = rData.wheelSectors;
            const totalSlices = sectors.length;
            const winningIndex = Math.floor(Math.random() * totalSlices);
            const winningSector = sectors[winningIndex];
            const isTargetEvent = rData.eventFilter(winningSector);

            const flipCard = document.getElementById('flipCard');
            const cardValueEl = document.getElementById('flipCardValue');
            const deckStack = document.getElementById('deckStack');
            const readout = document.getElementById('cardReadout');

            flipCard.classList.remove('flipped');
            deckStack.classList.add('shuffling');
            readout.innerText = 'Shuffling…';

            const suits = ['♠', '♥', '♦', '♣'];
            const suit = suits[winningIndex % 4];
            cardValueEl.innerHTML = `<span class="card-number">${winningSector}</span><span class="card-suit">${suit}</span>`;
            cardValueEl.style.color = isTargetEvent ? 'var(--neon-pink)' : 'var(--text-light)';

            setTimeout(() => {
                deckStack.classList.remove('shuffling');
                flipCard.classList.add('flipped');
                readout.innerText = `🂡 Card drawn: sector ${winningSector}!`;
                setTimeout(() => evaluateRoundResult(winningSector), 900);
            }, 650);
        }

        // Disable betting/answer controls while a mini-game is resolving.
        function lockRoundControls() {
            document.getElementById('actionBtn').disabled = true;
            document.getElementById('probAnswerInput').disabled = true;
            document.getElementById('probCheckBtn').disabled = true;
        }

        function handleActionButtonClick() {
            const rData = activeSessionRounds[currentRoundIndex];
            if (!rData) return;
            if (rData.mode === 'dice') rollDice();
            else if (rData.mode === 'cards') drawCard();
            else spinWheel();
        }

        // Evaluate Result (shared by all three mini-games)
        function evaluateRoundResult(winningSector) {
            const rData = activeSessionRounds[currentRoundIndex];
            const isTargetEvent = rData.eventFilter(winningSector);
            const feedback = document.getElementById('feedbackLine');

            const oddsMultiplier = lastAnswerWasCorrect ? 1.5 : 1.0;

            let wonBet = false;
            if (activeBetSpot === 'E' && isTargetEvent) wonBet = true;
            if (activeBetSpot === 'E_PRIME' && !isTargetEvent) wonBet = true;

            if (wonBet) {
                const payout = Math.round(activeBetAmount * 2 * oddsMultiplier);
                bankroll += payout;
                feedback.className = 'feedback-line text-success';
                feedback.innerText = `🎉 WINNER! Landed on ${winningSector}. Won +$${payout.toLocaleString()} Chips! ${pickQuip(DEALER_QUIPS.win)}`;
            } else {
                bankroll -= activeBetAmount;
                feedback.className = 'feedback-line text-error';
                feedback.innerText = `❌ HOUSE WINS! Landed on ${winningSector}. Lost -$${activeBetAmount} Chips. ${pickQuip(DEALER_QUIPS.lose)}`;
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
            ArcadeKit.showPlayerName(playerName, ['playerNameDisplayFail']);
        }

        function triggerVictory() {
            document.getElementById('gameScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'flex';
            document.getElementById('victoryChips').innerText = `$${bankroll.toLocaleString()}`;
            ArcadeKit.showPlayerName(playerName, ['playerNameDisplayWin']);
        }

        function restartSession() {
            startCasinoSession();
        }
