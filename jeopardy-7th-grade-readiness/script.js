        const categories = [
            "Coordinate Plane",
            "Integers & Ops",
            "PEMDAS & Alg",
            "Ratios & Rates",
            "Percents",
            "Area & Perimeter"
        ];

        const questionsData = {
            "Coordinate Plane": [
                { points: 100, q: "In which quadrant is the point $(-4, 5)$ located?", options: ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"], answer: "Quadrant II" },
                { points: 200, q: "What is the distance between $(3, -2)$ and $(3, 6)$ on the coordinate plane?", options: ["4 units", "8 units", "6 units", "10 units"], answer: "8 units" },
                { points: 300, q: "If you start at the origin and move left $1.5$ units and down $2.5$ units, what are your coordinates?", options: ["$(1.5, -2.5)$", "$(-1.5, -2.5)$", "$(-2.5, 1.5)$", "$(2.5, -1.5)$"], answer: "$(-1.5, -2.5)$" },
                { points: 400, q: "A rectangle has vertices at $(1,1)$, $(1,5)$, $(6,5)$, and $(6,1)$. What is its area?", options: ["10 sq units", "16 sq units", "20 sq units", "24 sq units"], answer: "20 sq units" }
            ],
            "Integers & Ops": [
                { points: 100, q: "Calculate: $-15 + 8$", options: ["$-23$", "$-7$", "$7$", "$23$"], answer: "$-7$" },
                { points: 200, q: "Calculate: $(-6) \\times (-7)$", options: ["$-42$", "$42$", "$-13$", "$13$"], answer: "$42$" },
                { points: 300, q: "Evaluate: $-\\frac{3}{4} + \\frac{1}{2}$", options: ["$-\\frac{1}{4}$", "$-\\frac{2}{2}$", "$\\frac{1}{4}$", "$-\\frac{1}{2}$"], answer: "$-\\frac{1}{4}$" },
                { points: 400, q: "Calculate: $-12.5 \\div 0.5$", options: ["$-6.25$", "$-25$", "$-2.5$", "$25$"], answer: "$-25$" }
            ],
            "PEMDAS & Alg": [
                { points: 100, q: "Solve for $x$: $x + 14 = 5$", options: ["$x = 19$", "$x = 9$", "$x = -9$", "$x = -19$"], answer: "$x = -9$" },
                { points: 200, q: "Evaluate: $3^2 + (10 - 4) \\div 2$", options: ["$7.5$", "$12$", "$15$", "$18$"], answer: "$12$" },
                { points: 300, q: "Apply Distributive Property: $4(2x - 5)$", options: ["$8x - 5$", "$8x - 20$", "$6x - 20$", "$8x + 20$"], answer: "$8x - 20$" },
                { points: 400, q: "Solve for $y$: $\\frac{y}{3} = -7$", options: ["$y = -21$", "$y = 21$", "$y = -4$", "$y = -10$"], answer: "$y = -21$" }
            ],
            "Ratios & Rates": [
                { points: 100, q: "Are the ratios $3:4$ and $12:16$ equivalent?", options: ["Yes", "No"], answer: "Yes" },
                { points: 200, q: "If 5 apples cost $3.00, what is the unit rate per apple?", options: ["$0.50", "$0.60", "$0.75", "$1.20"], answer: "$0.60" },
                { points: 300, q: "Store A sells 4 books for $20. Store B sells 6 books for $27. Which is the better deal per book?", options: ["Store A", "Store B", "They are equal"], answer: "Store B" },
                { points: 400, q: "Simplify the ratio $18 : 24 : 36$ to simplest terms.", options: ["$3 : 4 : 6$", "$6 : 8 : 12$", "$2 : 3 : 4$", "$9 : 12 : 18$"], answer: "$3 : 4 : 6$" }
            ],
            "Percents": [
                { points: 100, q: "Convert $\\frac{3}{5}$ to a percentage.", options: ["$35\\%$", "$50\\%$", "$60\\%$", "$75\\%$"], answer: "$60\\%$" },
                { points: 200, q: "What is $15\\%$ of $80$?", options: ["$8$", "$12$", "$15$", "$20$"], answer: "$12$" },
                { points: 300, q: "Express $0.085$ as a fraction in simplest form.", options: ["$\\frac{85}{100}$", "$\\frac{17}{200}$", "$\\frac{8.5}{100}$", "$\\frac{17}{100}$"], answer: "$\\frac{17}{200}$" },
                { points: 400, q: "A jacket costs $40 and is on sale for $25\\%$ off. What is the sale price?", options: ["$10", "$25", "$30", "$35"], answer: "$30" }
            ],
            "Area & Perimeter": [
                { points: 100, q: "Find the area of a triangle with base $8\\text{ cm}$ and height $5\\text{ cm}$.", options: ["$40\\text{ cm}^2$", "$20\\text{ cm}^2$", "$13\\text{ cm}^2$", "$26\\text{ cm}^2$"], answer: "$20\\text{ cm}^2$" },
                { points: 200, q: "Find the perimeter of a regular hexagon with side length $7.5\\text{ cm}$.", options: ["$30\\text{ cm}$", "$45\\text{ cm}$", "$52.5\\text{ cm}$", "$60\\text{ cm}$"], answer: "$45\\text{ cm}$" },
                { points: 300, q: "A trapezoid has bases $6\\text{ m}$ and $10\\text{ m}$ and height $4\\text{ m}$. What is its area?", options: ["$32\\text{ m}^2$", "$64\\text{ m}^2$", "$24\\text{ m}^2$", "$40\\text{ m}^2$"], answer: "$32\\text{ m}^2$" },
                { points: 400, q: "A parallelogram has an area of $54\\text{ m}^2$ and base $9\\text{ m}$. What is its height?", options: ["$5\\text{ m}$", "$6\\text{ m}$", "$12\\text{ m}$", "$485\\text{ m}$"], answer: "$6\\text{ m}$" }
            ]
        };

        let currentScore = 0;
        let tilesAnswered = 0;
        let activeTile = null;
        let activePoints = 0;
        let activeQuestionObj = null;
        let activeTileMultipliers = {};
        let isDarkMode = true;

        function toggleTheme() {
            isDarkMode = !isDarkMode;
            const body = document.body;
            const themeBtn = document.getElementById('theme-toggle');

            if (isDarkMode) {
                body.classList.remove('light-mode');
                themeBtn.innerHTML = '☀️ Light Mode';
            } else {
                body.classList.add('light-mode');
                themeBtn.innerHTML = '🌙 Dark Mode';
            }
        }

        function shuffleArray(arr) {
            const array = [...arr];
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function startGame() {
            document.getElementById('instruction-modal').style.display = 'none';
            buildBoard();
        }

        function buildBoard() {
            const board = document.getElementById('board');
            board.innerHTML = '';
            activeTileMultipliers = {};
            tilesAnswered = 0;

            // Randomize multiplier locations across 24 tiles
            const tileIndices = shuffleArray([...Array(24).keys()]);
            const doubleIndices = [tileIndices[0], tileIndices[1]]; 
            const tripleIndices = [tileIndices[2], tileIndices[3]]; 

            // Build board column by column
            categories.forEach((cat, catIdx) => {
                const col = document.createElement('div');
                col.className = 'category-column';

                // Add Category Title Header
                const header = document.createElement('div');
                header.className = 'category-header';
                header.innerText = cat;
                col.appendChild(header);

                // Add 4 Tiles for this Category
                for (let i = 0; i < 4; i++) {
                    const qData = questionsData[cat][i];
                    const flatIndex = i * 6 + catIdx;
                    
                    let mult = 1;
                    if (doubleIndices.includes(flatIndex)) mult = 2;
                    if (tripleIndices.includes(flatIndex)) mult = 3;

                    const tileKey = `${cat}_${i}`;
                    activeTileMultipliers[tileKey] = mult;

                    const tile = document.createElement('div');
                    tile.className = 'tile';
                    tile.innerText = `$${qData.points}`;
                    tile.onclick = () => openQuestion(cat, i, tileKey, tile);
                    col.appendChild(tile);
                }

                board.appendChild(col);
            });
        }

        function openQuestion(cat, index, tileKey, tileElement) {
            if (tileElement.classList.contains('used')) return;
            activeTile = tileElement;

            activeQuestionObj = questionsData[cat][index];
            const multiplier = activeTileMultipliers[tileKey];
            activePoints = activeQuestionObj.points * multiplier;

            const multTag = document.getElementById('multiplier-tag');
            if (multiplier === 2) {
                multTag.className = 'multiplier-badge double-challenge';
                multTag.innerText = '⚡ DOUBLE CHALLENGE (2x) ⚡';
            } else if (multiplier === 3) {
                multTag.className = 'multiplier-badge triple-challenge';
                multTag.innerText = '🔥 TRIPLE CHALLENGE (3x) 🔥';
            } else {
                multTag.className = '';
                multTag.innerText = '';
            }

            document.getElementById('question-category').innerText = `${cat} — $${activeQuestionObj.points}`;
            document.getElementById('question-body').innerHTML = activeQuestionObj.q;

            const feedback = document.getElementById('feedback');
            feedback.className = 'feedback';
            feedback.innerHTML = '';
            document.getElementById('next-btn').style.display = 'none';

            const shuffledOptions = shuffleArray(activeQuestionObj.options);

            const optionsContainer = document.getElementById('options-container');
            optionsContainer.innerHTML = '';

            shuffledOptions.forEach((opt) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.innerHTML = opt;
                btn.dataset.optValue = opt;
                btn.onclick = () => checkAnswer(opt);
                optionsContainer.appendChild(btn);
            });

            document.getElementById('question-modal').style.display = 'flex';

            if (window.MathJax) {
                MathJax.typesetPromise([document.getElementById('question-modal')]);
            }
        }

        function checkAnswer(selectedOptionText) {
            const btns = document.querySelectorAll('.option-btn');
            const correctAnswerText = activeQuestionObj.answer;

            btns.forEach((btn) => {
                btn.disabled = true;
                const btnValue = btn.dataset.optValue;
                if (btnValue === correctAnswerText) {
                    btn.classList.add('correct-choice');
                } else if (btnValue === selectedOptionText) {
                    btn.classList.add('wrong-choice');
                }
            });

            const feedback = document.getElementById('feedback');

            if (selectedOptionText === correctAnswerText) {
                feedback.className = 'feedback correct-text';
                feedback.innerText = `🎉 Correct! +$${activePoints}`;
                currentScore += activePoints;
            } else {
                feedback.className = 'feedback incorrect-text';
                feedback.innerHTML = `Incorrect! The correct answer was: <strong>${correctAnswerText}</strong>`;
            }

            document.getElementById('score').innerText = currentScore.toLocaleString();
            document.getElementById('next-btn').style.display = 'inline-block';

            if (window.MathJax) {
                MathJax.typesetPromise([feedback]);
            }
        }

        function closeQuestion() {
            document.getElementById('question-modal').style.display = 'none';
            if (activeTile) {
                activeTile.classList.add('used');
                activeTile.innerText = '✓';
                tilesAnswered++;
            }

            if (tilesAnswered >= 24) {
                showCompletionModal();
            }
        }

        function showCompletionModal() {
            document.getElementById('final-score').innerText = currentScore.toLocaleString();
            document.getElementById('completion-modal').style.display = 'flex';
        }

        function restartGame() {
            document.getElementById('completion-modal').style.display = 'none';
            currentScore = 0;
            document.getElementById('score').innerText = '0';
            buildBoard();
        }
    
