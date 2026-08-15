        // OUTBREAK SCENARIO BANK — Exponential Growth & Decay: y = a * b^x
        // Every target (a, b) pair below was hand-verified by plugging back
        // into y = a * b^x:
        //   1.  a=50,  b=2.00 -> doubles daily from 50
        //   2.  a=20,  b=3.00 -> triples daily from 20
        //   3.  a=10,  b=1.50 -> grows 50% daily from 10
        //   4.  a=200, b=0.50 -> 200*0.5^2 = 50 = 25% of 200 (2 half-lives)
        //   5.  a=80,  b=0.25 -> cut to one-quarter daily from 80
        //   6.  a=5,   b=2.00 -> doubles hourly from 5
        //   7.  a=40,  b=1.25 -> +25% daily -> factor 1.25, from 40
        //   8.  a=150, b=0.80 -> -20% daily -> factor 0.80, from 150
        //   9.  a=300, b=0.40 -> 300*0.4^2 = 48 = 16% of 300 (2 half-lives)
        //   10. a=25,  b=0.70 -> 25*0.7^2 = 12.25 = 49% of 25 (2 cycles)
        //   11. a=100, b=1.50 -> 100*1.5^1 = 150 (day-1 checkpoint)
        //   12. a=80,  b=0.75 -> 80*0.75^1 = 60 (day-1 checkpoint)
        //   13. a=10,  b=3.00 -> 10*3^1 = 30 (hour-1 checkpoint)
        //   14. a=60,  b=0.90 -> 60*0.9^2 = 48.6 = 81% of 60 (2 cycles)
        //   15. a=15,  b=2.00 -> doubles daily from 15
        //   16. a=120, b=0.20 -> 120*0.2^2 = 4.8 = 4% of 120 (2 dosing intervals)
        //   17. a=90,  b=1.20 -> +20% daily -> factor 1.20, from 90
        //   18. a=45,  b=0.60 -> 45*0.6^2 = 16.2 = 36% of 45 (2 half-lives)
        const outbreakBank = [
            {
                title: "Outbreak Origin",
                prompt: "Day 0 begins with <strong>50 infected individuals</strong>, and the outbreak <strong>doubles every day</strong>. Set \\( a \\) and \\( b \\) to match this outbreak curve.",
                a: 50, b: 2.00
            },
            {
                title: "Clinic Case Tripling",
                prompt: "A clinic begins monitoring <strong>20 patients</strong> on day 0, and confirmed cases <strong>triple every day</strong>. Set \\( a \\) and \\( b \\) to match.",
                a: 20, b: 3.00
            },
            {
                title: "Community Spread Factor",
                prompt: "A neighborhood starts with <strong>10 cases</strong>, and case counts <strong>grow by a factor of 1.5 (a 50% increase) each day</strong>. Set \\( a \\) and \\( b \\) to match.",
                a: 10, b: 1.50
            },
            {
                title: "Medication Half-Life Decay",
                prompt: "A dose starts at <strong>200 mg</strong> and decays to <strong>25% remaining after 2 half-lives</strong> worth of time. Set \\( a \\) and the per-half-life decay factor \\( b \\) so that \\( b^2 = 0.25 \\).",
                a: 200, b: 0.50
            },
            {
                title: "Quarantine Case Drop",
                prompt: "A quarantine zone starts with <strong>80 active cases</strong>, and the case count is <strong>cut by 75% each day</strong> (drops to one-quarter). Set \\( a \\) and \\( b \\) to match.",
                a: 80, b: 0.25
            },
            {
                title: "Lab Culture Growth",
                prompt: "A lab sample starts with <strong>5 bacteria cultures</strong>, and the count <strong>doubles every hour</strong>. Set \\( a \\) and \\( b \\) to match.",
                a: 5, b: 2.00
            },
            {
                title: "Rising Report Trend",
                prompt: "Health reports begin at <strong>40 cases</strong> on day 0, and the daily total <strong>increases by 25% each day</strong>. Find the growth factor \\( b \\) and set \\( a \\) and \\( b \\) to match.",
                a: 40, b: 1.25
            },
            {
                title: "Dose Stock Spoilage",
                prompt: "A pharmacy starts with <strong>150 doses</strong> in stock, and the usable supply <strong>decreases by 20% each day</strong> due to spoilage. Find the decay factor \\( b \\) and set \\( a \\) and \\( b \\) to match.",
                a: 150, b: 0.80
            },
            {
                title: "Deep Decay Dosage",
                prompt: "A dose starts at <strong>300 mg</strong> and decays to <strong>16% remaining after 2 half-lives</strong> worth of time. Set \\( a \\) and the per-half-life decay factor \\( b \\) so that \\( b^2 = 0.16 \\).",
                a: 300, b: 0.40
            },
            {
                title: "Treatment Cycle Decay",
                prompt: "A regional count starts at <strong>25 active infections</strong> and decays to <strong>49% remaining after 2 treatment cycles</strong>. Set \\( a \\) and the per-cycle decay factor \\( b \\) so that \\( b^2 = 0.49 \\).",
                a: 25, b: 0.70
            },
            {
                title: "Day-One Growth Checkpoint",
                prompt: "A cluster starts with <strong>100 cases on day 0</strong>. After <strong>1 day</strong>, the count has risen to <strong>150 cases</strong>. Use \\( y(1) = a \\cdot b \\) to find \\( b \\), then set \\( a \\) and \\( b \\) to match.",
                a: 100, b: 1.50
            },
            {
                title: "Day-One Decay Checkpoint",
                prompt: "A medication dose starts at <strong>80 mg on day 0</strong>. After <strong>1 day</strong>, only <strong>60 mg</strong> remains in the bloodstream. Use \\( y(1) = a \\cdot b \\) to find \\( b \\), then set \\( a \\) and \\( b \\) to match.",
                a: 80, b: 0.75
            },
            {
                title: "Hour-One Growth Checkpoint",
                prompt: "A petri dish starts with <strong>10 organisms</strong>. After <strong>1 hour</strong>, there are <strong>30 organisms</strong>. Use \\( y(1) = a \\cdot b \\) to find \\( b \\), then set \\( a \\) and \\( b \\) to match.",
                a: 10, b: 3.00
            },
            {
                title: "Quarantine Cycle Decay",
                prompt: "A ward starts with <strong>60 active cases</strong> and decays to <strong>81% remaining after 2 quarantine cycles</strong>. Set \\( a \\) and the per-cycle decay factor \\( b \\) so that \\( b^2 = 0.81 \\).",
                a: 60, b: 0.90
            },
            {
                title: "Early Cluster Growth",
                prompt: "A cluster starts with <strong>15 confirmed cases</strong> and <strong>doubles every day</strong> during the initial spread phase. Set \\( a \\) and \\( b \\) to match.",
                a: 15, b: 2.00
            },
            {
                title: "Antiviral Stock Decay",
                prompt: "A stockpile starts with <strong>120 units</strong> of antiviral medication and decays to <strong>4% remaining after 2 dosing intervals</strong>. Set \\( a \\) and the per-interval decay factor \\( b \\) so that \\( b^2 = 0.04 \\).",
                a: 120, b: 0.20
            },
            {
                title: "Community Spread Rise",
                prompt: "A district starts with <strong>90 initial cases</strong>, and daily totals <strong>grow by 20% each day</strong> due to community spread. Find the growth factor \\( b \\) and set \\( a \\) and \\( b \\) to match.",
                a: 90, b: 1.20
            },
            {
                title: "Dose Half-Life Decay",
                prompt: "A dose starts at <strong>45 mg</strong> and decays to <strong>36% remaining after 2 half-lives</strong> worth of time. Set \\( a \\) and the per-half-life decay factor \\( b \\) so that \\( b^2 = 0.36 \\).",
                a: 45, b: 0.60
            }
        ];

        const ROUNDS_PER_SESSION = 11;
        const A_MAX = 300;
        const B_MAX = 3;

        // GAME STATE
        let activeScenarios = [];
        let currentScenarioIndex = 0;
        let score = 0;
        let containment = 100;
        let isDarkMode = true;
        let isLocked = false;
        let playerName = '';

        let playerA = 0;
        let playerB = 1.00;

        // Canvas Context & Animation
        let canvas, ctx;
        let animationFrameId;

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

        // Initialization
        window.addEventListener('DOMContentLoaded', () => {
            canvas = document.getElementById('curveCanvas');
            ctx = canvas.getContext('2d');
            requestAnimationFrame(drawCanvasLoop);
        });

        function updateFromSliders() {
            if (isLocked) return;
            playerA = parseInt(document.getElementById('sliderA').value, 10);
            playerB = parseFloat(document.getElementById('sliderB').value);
            updateControlsDisplay();
        }

        function updateControlsDisplay() {
            document.getElementById('valADisplay').innerText = playerA;
            document.getElementById('valBDisplay').innerText = playerB.toFixed(2);
            document.getElementById('modelReadout').innerText = `a=${playerA}, b=${playerB.toFixed(2)}`;
        }

        // Live Canvas Curve Loop — draws y = playerA * playerB^x for x in [0, 6]
        function drawCanvasLoop() {
            if (canvas && ctx) {
                drawCurve();
            }
            animationFrameId = requestAnimationFrame(drawCanvasLoop);
        }

        function drawCurve() {
            const w = canvas.width;
            const h = canvas.height;
            const padL = 46, padR = 16, padT = 16, padB = 34;
            const plotW = w - padL - padR;
            const plotH = h - padT - padB;
            const daysMax = 6;

            const bgColor = isDarkMode ? '#050b12' : '#ffffff';
            const gridColor = isDarkMode ? '#16293a' : '#d8e6e3';
            const axisColor = isDarkMode ? '#2dd4bf' : '#0d9488';
            const textColor = isDarkMode ? '#6d8299' : '#4a6763';
            const curveColor = isDarkMode ? '#facc15' : '#b45309';

            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, w, h);

            // Compute curve points
            const pts = [];
            for (let x = 0; x <= daysMax; x++) {
                pts.push({ x: x, y: playerA * Math.pow(playerB, x) });
            }
            let maxY = Math.max(10, playerA * 1.15, ...pts.map(p => p.y));
            if (!isFinite(maxY) || maxY <= 0) maxY = 10;
            maxY = Math.min(maxY, 1e7); // guard against runaway exponents off-screen

            // Gridlines + Y labels
            ctx.strokeStyle = gridColor;
            ctx.fillStyle = textColor;
            ctx.font = '10px "IBM Plex Mono", monospace';
            ctx.lineWidth = 1;
            for (let i = 0; i <= 4; i++) {
                const gy = padT + plotH - (i / 4) * plotH;
                ctx.beginPath();
                ctx.moveTo(padL, gy);
                ctx.lineTo(w - padR, gy);
                ctx.stroke();
                const labelVal = (maxY * i) / 4;
                ctx.textAlign = 'right';
                ctx.fillText(labelVal >= 100 ? Math.round(labelVal) : labelVal.toFixed(1), padL - 6, gy + 3);
            }

            // X labels (days)
            ctx.textAlign = 'center';
            for (let x = 0; x <= daysMax; x++) {
                const gx = padL + (x / daysMax) * plotW;
                ctx.fillText('D' + x, gx, h - padB + 16);
            }

            // Axes
            ctx.strokeStyle = axisColor;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(padL, padT);
            ctx.lineTo(padL, padT + plotH);
            ctx.lineTo(w - padR, padT + plotH);
            ctx.stroke();

            // Curve
            ctx.strokeStyle = curveColor;
            ctx.lineWidth = 3;
            ctx.beginPath();
            pts.forEach((p, i) => {
                const px = padL + (p.x / daysMax) * plotW;
                const clampedY = Math.min(p.y, maxY);
                const py = padT + plotH - (clampedY / maxY) * plotH;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            });
            ctx.stroke();

            // Points
            ctx.fillStyle = curveColor;
            pts.forEach((p) => {
                const px = padL + (p.x / daysMax) * plotW;
                const clampedY = Math.min(p.y, maxY);
                const py = padT + plotH - (clampedY / maxY) * plotH;
                ctx.beginPath();
                ctx.arc(px, py, 3, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        // Start Outbreak Session
        function startOutbreakSession() {
            const name = ArcadeKit.requireName('playerNameInput', 'playerNameError');
            if (!name) return;
            playerName = name;

            currentScenarioIndex = 0;
            score = 0;
            containment = 100;
            activeScenarios = ArcadeKit.sample(outbreakBank, ROUNDS_PER_SESSION);

            document.getElementById('startScreen').style.display = 'none';
            document.getElementById('failScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'none';
            document.getElementById('gameScreen').style.display = 'block';

            loadScenario();
        }

        // Load Scenario
        function loadScenario() {
            isLocked = false;
            document.getElementById('feedbackLine').innerText = '';

            playerA = 0;
            playerB = 1.00;
            document.getElementById('sliderA').value = playerA;
            document.getElementById('sliderB').value = playerB;
            updateControlsDisplay();

            const sData = activeScenarios[currentScenarioIndex];

            document.getElementById('scenarioHeader').innerText = `Scenario ${currentScenarioIndex + 1}: ${sData.title}`;
            document.getElementById('scenarioCounter').innerText = `${(currentScenarioIndex + 1).toString().padStart(2, '0')} / ${activeScenarios.length}`;
            document.getElementById('scoreDisplay').innerText = `${score} PTS`;
            updateContainmentDisplay();

            document.getElementById('scenarioPromptText').innerHTML = sData.prompt;

            renderMath();
        }

        function updateContainmentDisplay() {
            const fill = document.getElementById('containmentFill');
            fill.style.width = `${Math.max(0, containment)}%`;

            if (containment > 50) {
                fill.style.backgroundColor = 'var(--accent-green)';
            } else if (containment > 25) {
                fill.style.backgroundColor = 'var(--accent-gold)';
            } else {
                fill.style.backgroundColor = 'var(--accent-red)';
            }
        }

        // Deploy the Current Model & Score It
        function deployModel() {
            if (isLocked) return;
            isLocked = true;

            const sData = activeScenarios[currentScenarioIndex];
            const feedback = document.getElementById('feedbackLine');

            const normA = Math.abs(playerA - sData.a) / A_MAX;
            const normB = Math.abs(playerB - sData.b) / B_MAX;
            const combinedError = Math.sqrt(normA * normA + normB * normB);

            const isExact = (playerA === sData.a) && (Math.abs(playerB - sData.b) < 0.001);

            if (isExact) {
                score += 100;
                containment = Math.min(100, containment + 15);
                updateContainmentDisplay();

                feedback.className = 'feedback-line text-success';
                feedback.innerText = `🧪 MODEL LOCKED! a=${sData.a}, b=${sData.b.toFixed(2)} // +100 PTS // CONTAINMENT RESTORED`;

                setTimeout(() => {
                    currentScenarioIndex++;
                    if (currentScenarioIndex >= activeScenarios.length) {
                        triggerVictory();
                    } else {
                        loadScenario();
                    }
                }, 1300);

            } else {
                const penalty = Math.min(40, Math.round(15 + combinedError * 60));
                containment -= penalty;
                updateContainmentDisplay();

                feedback.className = 'feedback-line text-error';
                feedback.innerText = `❌ MODEL MISMATCH! Target was a=${sData.a}, b=${sData.b.toFixed(2)}. -${penalty}% Containment`;

                if (containment <= 0) {
                    setTimeout(() => {
                        triggerFail();
                    }, 1300);
                } else {
                    setTimeout(() => {
                        currentScenarioIndex++;
                        if (currentScenarioIndex >= activeScenarios.length) {
                            triggerVictory();
                        } else {
                            loadScenario();
                        }
                    }, 1700);
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

        function restartOutbreakSession() {
            startOutbreakSession();
        }
