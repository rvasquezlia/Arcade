        // Question Bank with LaTeX math notation
        const auctionLots = [
            {
                title: "Slope Evaluation",
                question: "Determine the exact slope \\( m \\) of the linear line passing through points \\( (2, 5) \\) and \\( (6, 13) \\):",
                options: ["\\( m = 2 \\)", "\\( m = \\frac{1}{2} \\)", "\\( m = 4 \\)", "\\( m = 3 \\)"],
                correct: "\\( m = 2 \\)"
            },
            {
                title: "Multi-Step Linear Vault",
                question: "Solve the linear equation for \\( x \\): \\( 5x - 3(x - 2) = 18 \\)",
                options: ["\\( x = 6 \\)", "\\( x = 4 \\)", "\\( x = 12 \\)", "\\( x = -6 \\)"],
                correct: "\\( x = 6 \\)"
            },
            {
                title: "Exponent Laws",
                question: "Simplify the algebraic expression to single exponent form: \\( \\frac{x^8 \\cdot x^3}{x^5} \\)",
                options: ["\\( x^6 \\)", "\\( x^5 \\)", "\\( x^{16} \\)", "\\( x^{4} \\)"],
                correct: "\\( x^6 \\)"
            },
            {
                title: "Pythagorean Theorem",
                question: "A right triangle has leg lengths \\( a = 9 \\) and \\( b = 12 \\). What is the exact hypotenuse length \\( c \\)?",
                options: ["\\( c = 15 \\)", "\\( c = 21 \\)", "\\( c = 13 \\)", "\\( c = 14 \\)"],
                correct: "\\( c = 15 \\)"
            },
            {
                title: "Scientific Operations",
                question: "Compute and express in scientific notation: \\( (3.2 \\times 10^4) + (5.1 \\times 10^4) \\)",
                options: ["\\( 8.3 \\times 10^4 \\)", "\\( 8.3 \\times 10^8 \\)", "\\( 16.32 \\times 10^4 \\)", "\\( 8.3 \\times 10^5 \\)"],
                correct: "\\( 8.3 \\times 10^4 \\)"
            },
            {
                title: "Cylinder Volume",
                question: "Calculate the volume of a cylinder with radius \\( r = 3\\text{ cm} \\) and height \\( h = 10\\text{ cm} \\) (Use \\( \\pi \\approx 3.14 \\)):",
                options: ["\\( 282.6\\text{ cm}^3 \\)", "\\( 94.2\\text{ cm}^3 \\)", "\\( 565.2\\text{ cm}^3 \\)", "\\( 188.4\\text{ cm}^3 \\)"],
                correct: "\\( 282.6\\text{ cm}^3 \\)"
            },
            {
                title: "System of Equations",
                question: "Find the intersection coordinate \\( (x, y) \\) for the system: \\( y = 2x + 1 \\) and \\( y = -x + 7 \\)",
                options: ["\\( (2, 5) \\)", "\\( (3, 7) \\)", "\\( (1, 3) \\)", "\\( (2, 3) \\)"],
                correct: "\\( (2, 5) \\)"
            },
            {
                title: "Simplifying Radicals",
                question: "Express \\( \\sqrt{180} \\) in its simplest radical form:",
                options: ["\\( 6\\sqrt{5} \\)", "\\( 5\\sqrt{6} \\)", "\\( 3\\sqrt{20} \\)", "\\( 12\\sqrt{5} \\)"],
                correct: "\\( 6\\sqrt{5} \\)"
            },
            {
                title: "Function Value",
                question: "Given the quadratic function \\( f(x) = -2x^2 + 5x - 1 \\), calculate \\( f(-3) \\):",
                options: ["\\( -34 \\)", "\\( -32 \\)", "\\( 2 \\)", "\\( -22 \\)"],
                correct: "\\( -34 \\)"
            },
            {
                title: "Probability Matrix",
                question: "Two fair six-sided dice are rolled simultaneously. What is the theoretical probability of rolling two sixes \\( P(6, 6) \\)?",
                options: ["\\( \\frac{1}{36} \\)", "\\( \\frac{1}{12} \\)", "\\( \\frac{1}{6} \\)", "\\( \\frac{1}{18} \\)"],
                correct: "\\( \\frac{1}{36} \\)"
            },
            {
                title: "Dilation Coordinate",
                question: "A point \\( A(-4, 6) \\) undergoes a dilation centered at origin with scale factor \\( k = 2.5 \\). Find \\( A' \\):",
                options: ["\\( A'(-10, 15) \\)", "\\( A'(-8, 12) \\)", "\\( A'(-1.6, 2.4) \\)", "\\( A'(10, -15) \\)"],
                correct: "\\( A'(-10, 15) \\)"
            },
            {
                title: "Algebraic Investment Modeling",
                question: "Account A starts with $500 and gains $25/month. Account B starts with $200 and gains $40/month. After how many months \\( m \\) will both accounts have equal values?",
                options: ["\\( 20 \\text{ months} \\)", "\\( 15 \\text{ months} \\)", "\\( 25 \\text{ months} \\)", "\\( 12 \\text{ months} \\)"],
                correct: "\\( 20 \\text{ months} \\)"
            }
        ];

        // GAME STATE
        let currentLotIndex = 0;
        let capital = 1000;
        let selectedBidAmount = 100;
        let activeLots = [];
        let isDarkMode = true;
        let isLocked = false;

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

        // Start Auction
        function startAuction() {
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

        // Select Bid
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

        // Load Current Question
        function loadLot() {
            isLocked = false;
            document.getElementById('feedbackMessage').innerText = '';

            const lot = activeLots[currentLotIndex];

            // Adjust bid if higher than available capital
            if (selectedBidAmount > capital || selectedBidAmount === 0) {
                selectedBidAmount = Math.max(50, Math.min(100, capital));
            }

            // Update Header & HUD
            document.getElementById('auctionLotTitle').innerText = `Lot #${currentLotIndex + 1}: ${lot.title}`;
            document.getElementById('lotCounter').innerText = `${currentLotIndex + 1} / ${activeLots.length}`;
            document.getElementById('capitalDisplay').innerText = `$${capital.toLocaleString()}`;
            document.getElementById('currentBidDisplay').innerText = `$${selectedBidAmount.toLocaleString()}`;

            // Render Text
            document.getElementById('lotQuestionText').innerHTML = lot.question;

            // Render Shuffled Options
            const shuffledOptions = shuffleArray(lot.options);
            const grid = document.getElementById('optionsGrid');
            grid.innerHTML = '';

            const badges = ['A', 'B', 'C', 'D'];
            shuffledOptions.forEach((optText, idx) => {
                const btn = document.createElement('button');
                btn.className = 'auction-option-btn';
                btn.onclick = () => submitBidAnswer(optText, lot.correct, btn);
                btn.innerHTML = `
                    <span class="option-badge">${badges[idx]}</span>
                    <span>${optText}</span>
                `;
                grid.appendChild(btn);
            });

            renderMath();
        }

        // Handle Bid Submission
        function submitBidAnswer(selectedOpt, correctOpt, btnEl) {
            if (isLocked) return;
            isLocked = true;

            const feedback = document.getElementById('feedbackMessage');
            const actualBid = selectedBidAmount;

            if (selectedOpt === correctOpt) {
                // Winning Bid
                const profit = Math.round(actualBid * 1.5);
                capital += profit;

                btnEl.style.borderColor = 'var(--emerald-green)';
                btnEl.style.background = 'rgba(16, 185, 129, 0.15)';
                feedback.className = 'feedback-message msg-success';
                feedback.innerText = `🔨 AUCTION WON! Return: +$${profit.toLocaleString()}`;

                setTimeout(() => {
                    currentLotIndex++;
                    if (currentLotIndex >= activeLots.length) {
                        triggerVictory();
                    } else {
                        loadLot();
                    }
                }, 1200);

            } else {
                // Losing Bid
                capital -= actualBid;

                btnEl.style.borderColor = 'var(--rose-red)';
                btnEl.style.background = 'rgba(244, 63, 94, 0.15)';
                feedback.className = 'feedback-message msg-error';
                feedback.innerText = `❌ BID LOST! Lost: -$${actualBid.toLocaleString()}`;

                document.getElementById('capitalDisplay').innerText = `$${Math.max(0, capital).toLocaleString()}`;

                if (capital <= 0) {
                    setTimeout(() => {
                        triggerBankruptcy();
                    }, 1100);
                } else {
                    setTimeout(() => {
                        loadLot();
                    }, 1200);
                }
            }
        }

        function triggerBankruptcy() {
            document.getElementById('gameScreen').style.display = 'none';
            document.getElementById('bankruptScreen').style.display = 'flex';
        }

        function triggerVictory() {
            document.getElementById('gameScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'flex';
            document.getElementById('finalCapitalVal').innerText = `$${capital.toLocaleString()}`;
        }

        function restartAuction() {
            startAuction();
        }
    
