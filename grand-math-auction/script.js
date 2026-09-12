        // ============================================================
        // Question Bank — LaTeX display text + typed-answer matching.
        // "accept" lists a few typeable equivalent forms of the answer;
        // normalizeAnswer() below does the heavy lifting so things like
        // "m=6", "6", " 6 " or "x = 6" all match.
        // "correctDisplay" is the pretty LaTeX form shown on reveal.
        // ============================================================
        const auctionLots = [
            {
                title: "Slope Evaluation",
                question: "Determine the exact slope \\( m \\) of the linear line passing through points \\( (2, 5) \\) and \\( (6, 13) \\):",
                accept: ["2", "m=2"],
                correctDisplay: "\\( m = 2 \\)"
            },
            {
                title: "Multi-Step Linear Vault",
                question: "Solve the linear equation for \\( x \\): \\( 5x - 3(x - 2) = 18 \\)",
                accept: ["6", "x=6"],
                correctDisplay: "\\( x = 6 \\)"
            },
            {
                title: "Exponent Laws",
                question: "Simplify the algebraic expression to single exponent form: \\( \\frac{x^8 \\cdot x^3}{x^5} \\)",
                accept: ["x^6", "x6"],
                correctDisplay: "\\( x^6 \\)"
            },
            {
                title: "Pythagorean Theorem",
                question: "A right triangle has leg lengths \\( a = 9 \\) and \\( b = 12 \\). What is the exact hypotenuse length \\( c \\)?",
                accept: ["15", "c=15"],
                correctDisplay: "\\( c = 15 \\)"
            },
            {
                title: "Scientific Operations",
                question: "Compute and express in scientific notation: \\( (3.2 \\times 10^4) + (5.1 \\times 10^4) \\)",
                accept: ["8.3x10^4", "8.3*10^4", "83000"],
                correctDisplay: "\\( 8.3 \\times 10^4 \\)"
            },
            {
                title: "Cylinder Volume",
                question: "Calculate the volume of a cylinder with radius \\( r = 3\\text{ cm} \\) and height \\( h = 10\\text{ cm} \\) (Use \\( \\pi \\approx 3.14 \\)):",
                accept: ["282.6", "282.6cm^3", "282.6 cm^3"],
                correctDisplay: "\\( 282.6\\text{ cm}^3 \\)"
            },
            {
                title: "System of Equations",
                question: "Find the intersection coordinate \\( (x, y) \\) for the system: \\( y = 2x + 1 \\) and \\( y = -x + 7 \\)",
                accept: ["(2,5)", "2,5"],
                correctDisplay: "\\( (2, 5) \\)"
            },
            {
                title: "Simplifying Radicals",
                question: "Express \\( \\sqrt{180} \\) in its simplest radical form:",
                accept: ["6sqrt5", "6sqrt(5)", "6√5"],
                correctDisplay: "\\( 6\\sqrt{5} \\)"
            },
            {
                title: "Function Value",
                question: "Given the quadratic function \\( f(x) = -2x^2 + 5x - 1 \\), calculate \\( f(-3) \\):",
                accept: ["-34", "f(-3)=-34"],
                correctDisplay: "\\( -34 \\)"
            },
            {
                title: "Probability Matrix",
                question: "Two fair six-sided dice are rolled simultaneously. What is the theoretical probability of rolling two sixes \\( P(6, 6) \\)?",
                accept: ["1/36"],
                correctDisplay: "\\( \\frac{1}{36} \\)"
            },
            {
                title: "Dilation Coordinate",
                question: "A point \\( A(-4, 6) \\) undergoes a dilation centered at origin with scale factor \\( k = 2.5 \\). Find \\( A' \\):",
                accept: ["(-10,15)", "-10,15"],
                correctDisplay: "\\( A'(-10, 15) \\)"
            },
            {
                title: "Algebraic Investment Modeling",
                question: "Account A starts with $500 and gains $25/month. Account B starts with $200 and gains $40/month. After how many months \\( m \\) will both accounts have equal values?",
                accept: ["20", "20 months", "m=20"],
                correctDisplay: "\\( 20 \\text{ months} \\)"
            }
        ];

        // ============================================================
        // RIVAL BIDDERS — comedic personalities for the live bidding war
        // ============================================================
        const RIVAL_TEMPLATES = [
            { id: 'pete', name: 'Penny-Pinching Pete', style: 'stingy' },
            { id: 'rhonda', name: 'Reckless Rhonda Vance', style: 'reckless' }
        ];

        // ============================================================
        // AUCTIONEER / RIVAL FLAVOR TEXT POOLS
        // ============================================================
        const INTRO_LINES = [
            (n, title) => `🔨 Lot #${n} on the block: "${title}"! Let's see those paddles fly!`,
            (n, title) => `Ladies and gentlemen, feast your eyes on Lot #${n}: ${title}!`,
            (n, title) => `Next up — Lot #${n}, ${title}! Fresh off the truck and still warm!`,
            (n, title) => `Item ${n}! ${title}! Who's brave enough to open the bidding?`
        ];
        const LOCK_LINES = [
            (amt) => `Opening bid locked at $${amt}! The floor is officially open!`,
            (amt) => `$${amt} on the table! Let's see who else wants a piece of this!`,
            (amt) => `We open strong at $${amt}! Hold onto your wallets, folks!`
        ];
        const RAISE_LINES_STINGY = [
            (name, amt) => `${name} winces and creeps the bid up to $${amt}... "Fine. FINE."`,
            (name, amt) => `${name} mutters under their breath and nudges it to $${amt}.`,
            (name, amt) => `${name} peeks at their coin purse, then dares $${amt}.`
        ];
        const RAISE_LINES_RECKLESS = [
            (name, amt) => `${name} SLAMS the paddle down: "$${amt}, and I'm just warming up!"`,
            (name, amt) => `${name} doesn't even blink — $${amt}, just like that!`,
            (name, amt) => `${name} leaps out of their seat: "$${amt}!! Beat THAT!"`
        ];
        const ALLIN_LINES = [
            (name, amt) => `${name} SLAMS their whole wallet on the table: ALL IN at $${amt}! The room gasps!`,
            (name, amt) => `${name} kicks back their chair — "$${amt}, EVERY LAST PENNY!" The crowd loses it!`
        ];
        const PASS_LINES_STINGY = [
            (name) => `${name} clutches their coin purse: "Too rich for my blood." (backs out of the lot)`,
            (name) => `${name} shakes their head: "Not one more nickel." (backs out of the lot)`
        ];
        const PASS_LINES_RECKLESS = [
            (name) => `${name} waves a dismissive hand: "Eh, boring lot. Next!" (backs out of the lot)`,
            (name) => `${name} yawns loudly: "Wake me up for a REAL item." (backs out of the lot)`
        ];
        const CANT_TOP_LINES = [
            (name) => `${name} checks their pockets... empty. They fold with a sigh.`,
            (name) => `${name} is out of cash to wave around. They back away quietly.`
        ];
        const SOLD_FINAL_LINES = [
            "SOLD! 🔨 Now let's see the fine print you just bought!",
            "BANG goes the gavel — SOLD! Time for the real test!",
            "SOLD to the bidder still standing! Reveal the item!"
        ];
        const WIN_LINES = [
            (profit) => `🔨 SOLD TO YOU! The crowd roars! Return: +$${profit}`,
            (profit) => `Correct! You out-mathed the whole auction house! +$${profit}`,
            (profit) => `🎉 Nailed it! The auctioneer tips their hat. +$${profit}`
        ];
        const LOSE_LINES = [
            (amt) => `❌ Wrong lot, wrong math! You forfeit $${amt}.`,
            (amt) => `The gavel drops against you — that answer cost $${amt}.`,
            (amt) => `Ohh, so close! The auction house keeps your $${amt}.`
        ];

        function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
        function pickLine(pool, ...args) { return pickRandom(pool)(...args); }

        // GAME STATE
        let currentLotIndex = 0;
        let capital = 1000;
        let selectedBidAmount = 100;
        let currentBid = 100;
        let activeLots = [];
        let isDarkMode = true;
        let isLocked = false;
        let playerName = '';

        // Live bidding-war state, reset every lot via loadLot()
        let warState = null;
        let warTimerId = null;

        // Shuffle utility
        function shuffleArray(arr) {
            const temp = [...arr];
            for (let i = temp.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [temp[i], temp[j]] = [temp[j], temp[i]];
            }
            return temp;
        }

        // Theme Toggle
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
        }

        // MathJax Safe Render Call
        function renderMath() {
            if (window.MathJax && window.MathJax.startup && window.MathJax.startup.promise) {
                MathJax.startup.promise
                    .then(() => MathJax.typesetPromise())
                    .catch(err => console.warn('MathJax error:', err));
            }
        }

        // ============================================================
        // Answer normalization — makes typed answers robust to format
        // ============================================================
        function normalizeAnswer(raw) {
            if (raw === undefined || raw === null) return '';
            let s = String(raw).toLowerCase();
            s = s.replace(/\s+/g, '');                     // strip all whitespace
            s = s.replace(/(\d),(\d{3})(?!\d)/g, '$1$2');   // 83,000 -> 83000 (thousands separator)
            s = s.replace(/\$/g, '');                       // strip $ signs
            s = s.replace(/°/g, '');                   // strip degree signs
            s = s.replace(/×/g, 'x').replace(/\*/g, 'x'); // × or * -> x
            s = s.replace(/√/g, 'sqrt');               // √ -> sqrt
            s = s.replace(/π/g, 'pi');                 // π -> pi
            s = s.replace(/(months?|cm\^?3|pts?|points?|dollars?)/g, ''); // strip unit words
            s = s.replace(/^[a-z]+\([^)]*\)=/, '');         // strip "f(-3)=" style function labels
            s = s.replace(/[a-z']+=/g, '');                 // strip "m=", "x=", "a'=" style labels
            s = s.replace(/,+$/, '');                        // trim stray trailing commas
            return s;
        }

        function isAnswerCorrect(lot, userInput) {
            const norm = normalizeAnswer(userInput);
            if (!norm) return false;
            return lot.accept.some(a => normalizeAnswer(a) === norm);
        }

        // ============================================================
        // Auctioneer chatter banner (with a little "gavel-bang" pulse)
        // ============================================================
        function auctioneerSay(text) {
            const el = document.getElementById('auctioneerChatter');
            if (!el) return;
            el.innerText = text;
            el.classList.remove('chatter-pulse');
            // Force reflow so the animation can re-trigger on repeated text
            void el.offsetWidth;
            el.classList.add('chatter-pulse');
        }

        function clearWarTimer() {
            if (warTimerId) {
                clearInterval(warTimerId);
                warTimerId = null;
            }
        }

        // Start Auction
        function startAuction() {
            const name = ArcadeKit.requireName('playerNameInput', 'playerNameError');
            if (!name) return;
            playerName = name;

            clearWarTimer();
            currentLotIndex = 0;
            capital = 1000;
            selectedBidAmount = 100;
            activeLots = shuffleArray(auctionLots);

            document.getElementById('startScreen').style.display = 'none';
            document.getElementById('bankruptScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'none';
            document.getElementById('gameScreen').style.display = 'block';

            loadLot();
        }

        // Select opening bid (chip buttons in the sealed / opening phase)
        function selectBid(amount, btnElement) {
            if (isLocked) return;

            document.querySelectorAll('.bid-chip').forEach(btn => btn.classList.remove('active'));
            btnElement.classList.add('active');

            if (amount === 'ALL') {
                selectedBidAmount = capital;
            } else {
                selectedBidAmount = Math.min(amount, capital);
            }

            document.getElementById('currentBidDisplay').innerText = `$${selectedBidAmount.toLocaleString()}`;
        }

        // Load Current Lot (sealed — question is NOT revealed yet)
        function loadLot() {
            isLocked = false;
            clearWarTimer();
            document.getElementById('feedbackMessage').innerText = '';

            const lot = activeLots[currentLotIndex];

            // Adjust bid if higher than available capital (capital is always > 0 here,
            // since bankruptcy is checked before the next lot ever loads)
            if (selectedBidAmount > capital || selectedBidAmount === 0) {
                selectedBidAmount = Math.min(100, capital);
            }
            currentBid = selectedBidAmount;

            // Reset the rival bidding-war state for this lot
            warState = {
                rivals: RIVAL_TEMPLATES.map(r => ({ ...r, active: true })),
                raiseCount: 0,
                roundGuard: 0,
                pendingBid: 0,
                pendingRival: null
            };

            // Update HUD
            document.getElementById('auctionLotTitle').innerText = `Lot #${currentLotIndex + 1}: ${lot.title}`;
            document.getElementById('lotCounter').innerText = `${currentLotIndex + 1} / ${activeLots.length}`;
            document.getElementById('capitalDisplay').innerText = `$${capital.toLocaleString()}`;
            document.getElementById('currentBidDisplay').innerText = `$${selectedBidAmount.toLocaleString()}`;

            // Reset phase panels: opening phase visible, others hidden
            document.getElementById('openingPhase').style.display = 'block';
            document.getElementById('warPhase').style.display = 'none';
            document.getElementById('warDecision').style.display = 'none';
            document.getElementById('questionPhase').style.display = 'none';
            document.getElementById('answerInput').value = '';
            document.getElementById('answerError').style.display = 'none';

            // Reset rival status UI
            resetRivalCardUI();

            auctioneerSay(pickLine(INTRO_LINES, currentLotIndex + 1, lot.title));
        }

        function resetRivalCardUI() {
            warState.rivals.forEach(r => {
                const card = document.getElementById(`rivalCard-${r.id}`);
                const status = document.getElementById(`rivalStatus-${r.id}`);
                if (card) card.classList.remove('rival-passed', 'rival-acting');
                if (status) status.innerText = 'Watching the floor...';
            });
        }

        // Player commits to the opening bid — the lot goes live and the
        // rival bidding war begins. Question is still sealed.
        function placeOpeningBid() {
            if (isLocked) return;
            isLocked = true;

            currentBid = selectedBidAmount;
            document.getElementById('currentBidDisplay').innerText = `$${currentBid.toLocaleString()}`;

            document.getElementById('openingPhase').style.display = 'none';
            document.getElementById('warPhase').style.display = 'block';
            document.getElementById('warTopBid').innerText = `$${currentBid.toLocaleString()}`;

            auctioneerSay(pickLine(LOCK_LINES, currentBid.toLocaleString()));
            isLocked = false;

            setTimeout(startWarRound, 1300);
        }

        function rivalWillRaise(rival) {
            const roll = Math.random();
            return rival.style === 'stingy' ? roll < 0.35 : roll < 0.85;
        }

        function computeRivalBid(rival, base, capitalAmt) {
            if (rival.style === 'stingy') {
                const inc = pickRandom([40, 60, 80]);
                return Math.min(base + inc, capitalAmt);
            }
            // reckless: occasionally jumps straight to an all-in threat
            if (Math.random() < 0.25) return capitalAmt;
            const inc = pickRandom([120, 180, 260]);
            return Math.min(base + inc, capitalAmt);
        }

        // Runs one step of the live bidding war. Either a rival passes
        // (free, automatic), a rival raises (player must respond), or
        // the war ends and the item is finally revealed.
        function startWarRound() {
            if (!warState) return;
            warState.roundGuard++;

            const activeRivals = warState.rivals.filter(r => r.active);
            const safetyExceeded = warState.roundGuard > 8;
            if (activeRivals.length === 0 || warState.raiseCount >= 2 || safetyExceeded) {
                return finalizeBid();
            }

            const rival = pickRandom(activeRivals);
            const statusEl = document.getElementById(`rivalStatus-${rival.id}`);
            const cardEl = document.getElementById(`rivalCard-${rival.id}`);

            if (!rivalWillRaise(rival)) {
                rival.active = false;
                if (cardEl) cardEl.classList.add('rival-passed');
                if (statusEl) statusEl.innerText = 'Folded 🚫';
                auctioneerSay(pickLine(rival.style === 'stingy' ? PASS_LINES_STINGY : PASS_LINES_RECKLESS, rival.name));
                setTimeout(startWarRound, 1300);
                return;
            }

            const newBid = computeRivalBid(rival, currentBid, capital);
            if (newBid <= currentBid) {
                // Rival is already tapped out at the current bid level — treat as a fold
                rival.active = false;
                if (cardEl) cardEl.classList.add('rival-passed');
                if (statusEl) statusEl.innerText = 'Folded 🚫';
                auctioneerSay(pickLine(CANT_TOP_LINES, rival.name));
                setTimeout(startWarRound, 1300);
                return;
            }

            warState.raiseCount++;
            warState.pendingBid = newBid;
            warState.pendingRival = rival;

            if (cardEl) cardEl.classList.add('rival-acting');
            if (statusEl) statusEl.innerText = `Raises to $${newBid.toLocaleString()}!`;
            document.getElementById('warTopBid').innerText = `$${newBid.toLocaleString()}`;

            const isAllIn = newBid === capital && rival.style === 'reckless' && (newBid - currentBid) > 260;
            const linePool = isAllIn ? ALLIN_LINES : (rival.style === 'stingy' ? RAISE_LINES_STINGY : RAISE_LINES_RECKLESS);
            auctioneerSay(pickLine(linePool, rival.name, newBid.toLocaleString()));

            enterPlayerDecision();
        }

        function enterPlayerDecision() {
            document.getElementById('warDecision').style.display = 'block';
            let timeLeft = 15;
            const numEl = document.getElementById('warCountdownNum');
            const barEl = document.getElementById('warTimerBar');
            numEl.innerText = timeLeft;
            barEl.style.width = '100%';

            clearWarTimer();
            warTimerId = setInterval(() => {
                timeLeft--;
                if (timeLeft < 0) {
                    clearWarTimer();
                    autoWalkAway();
                    return;
                }
                numEl.innerText = timeLeft;
                barEl.style.width = `${Math.max(0, (timeLeft / 15) * 100)}%`;
            }, 1000);
        }

        // Player raises to match the rival's threatening bid and stays in the lot.
        function playerRaise() {
            if (!warState || !warState.pendingRival) return;
            clearWarTimer();

            currentBid = warState.pendingBid;
            document.getElementById('currentBidDisplay').innerText = `$${currentBid.toLocaleString()}`;
            document.getElementById('warDecision').style.display = 'none';

            const rivalId = warState.pendingRival.id;
            const cardEl = document.getElementById(`rivalCard-${rivalId}`);
            if (cardEl) cardEl.classList.remove('rival-acting');
            warState.pendingRival = null;

            auctioneerSay(`You snap your paddle back up — "I'll match that, and then some!" Bid now $${currentBid.toLocaleString()}!`);
            setTimeout(startWarRound, 1300);
        }

        // Player folds this lot — no capital lost, no capital gained, move on.
        function playerWalkAway() {
            if (!warState) return;
            clearWarTimer();
            const rivalName = warState.pendingRival ? warState.pendingRival.name : 'A rival';
            resolveWalkAway(rivalName, false);
        }

        function autoWalkAway() {
            if (!warState) return;
            const rivalName = warState.pendingRival ? warState.pendingRival.name : 'A rival';
            resolveWalkAway(rivalName, true);
        }

        function resolveWalkAway(rivalName, isTimeout) {
            document.getElementById('warDecision').style.display = 'none';
            warState.pendingRival = null;
            isLocked = true;

            const feedback = document.getElementById('feedbackMessage');
            feedback.className = 'feedback-message msg-neutral';
            feedback.innerText = isTimeout
                ? `⏰ Time's up! You hesitated and ${rivalName} swooped in. Lot forfeited — your capital is untouched.`
                : `🚪 You lower your paddle. ${rivalName} grins and claims bragging rights. Your capital stays safe at $${capital.toLocaleString()}.`;

            auctioneerSay(isTimeout ? `Sold to ${rivalName} by default! Next lot, quickly now!` : `${rivalName} takes it! On to the next treasure!`);

            setTimeout(() => {
                isLocked = false;
                advanceToNextLot();
            }, 1700);
        }

        // Bidding war is over (all rivals folded, raise cap hit, or safety
        // cap hit) — reveal the item and switch to a typed-answer input.
        function finalizeBid() {
            document.getElementById('warDecision').style.display = 'none';
            const lot = activeLots[currentLotIndex];

            auctioneerSay('Going once...');
            setTimeout(() => {
                auctioneerSay('Going twice...');
                setTimeout(() => {
                    auctioneerSay(pickRandom(SOLD_FINAL_LINES));
                    document.getElementById('warPhase').style.display = 'none';
                    document.getElementById('questionPhase').style.display = 'block';
                    document.getElementById('currentBidDisplay').innerText = `$${currentBid.toLocaleString()}`;
                    document.getElementById('lotQuestionText').innerHTML = lot.question;
                    renderMath();
                    const input = document.getElementById('answerInput');
                    input.value = '';
                    input.focus();
                }, 750);
            }, 750);
        }

        // Handle the typed-answer submission for the committed bid
        function submitAnswer() {
            if (isLocked) return;

            const input = document.getElementById('answerInput');
            const errorEl = document.getElementById('answerError');
            const value = input.value.trim();

            if (!value) {
                errorEl.style.display = 'block';
                input.focus();
                return;
            }
            errorEl.style.display = 'none';
            isLocked = true;

            const lot = activeLots[currentLotIndex];
            const feedback = document.getElementById('feedbackMessage');
            const actualBid = currentBid;

            if (isAnswerCorrect(lot, value)) {
                const profit = Math.round(actualBid * 1.5);
                capital += profit;

                feedback.className = 'feedback-message msg-success';
                feedback.innerText = pickLine(WIN_LINES, profit.toLocaleString());
                document.getElementById('capitalDisplay').innerText = `$${capital.toLocaleString()}`;

                setTimeout(() => {
                    currentLotIndex++;
                    if (currentLotIndex >= activeLots.length) {
                        triggerVictory();
                    } else {
                        loadLot();
                    }
                }, 1400);

            } else {
                capital -= actualBid;

                feedback.className = 'feedback-message msg-error';
                feedback.innerText = `${pickLine(LOSE_LINES, actualBid.toLocaleString())} The correct answer was ${lot.correctDisplay}.`;
                document.getElementById('capitalDisplay').innerText = `$${Math.max(0, capital).toLocaleString()}`;
                renderMath();

                if (capital <= 0) {
                    setTimeout(() => {
                        triggerBankruptcy();
                    }, 1500);
                } else {
                    setTimeout(() => {
                        advanceToNextLot();
                    }, 1500);
                }
            }
        }

        function advanceToNextLot() {
            currentLotIndex++;
            if (currentLotIndex >= activeLots.length) {
                triggerVictory();
            } else {
                loadLot();
            }
        }

        function triggerBankruptcy() {
            clearWarTimer();
            document.getElementById('gameScreen').style.display = 'none';
            document.getElementById('bankruptScreen').style.display = 'flex';
            ArcadeKit.showPlayerName(playerName, ['playerNameDisplayFail']);
        }

        function triggerVictory() {
            clearWarTimer();
            document.getElementById('gameScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'flex';
            document.getElementById('finalCapitalVal').innerText = `$${capital.toLocaleString()}`;
            ArcadeKit.showPlayerName(playerName, ['playerNameDisplayWin']);
        }

        function restartAuction() {
            startAuction();
        }
