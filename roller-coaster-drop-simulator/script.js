        // TRACK BLUEPRINT BANK — Quadratic Vertex & Axis of Symmetry
        // Every vertex (h, k) below was hand-computed with h = -b/(2a),
        // k = f(h), and cross-checked with k = c - b^2/(4a):
        //   1.  y=-2x^2+8x+3   -> h=2,  k=11
        //   2.  y=x^2-6x+5     -> h=3,  k=-4
        //   3.  y=-x^2+4x+1    -> h=2,  k=5
        //   4.  y=3x^2-12x+7   -> h=2,  k=-5
        //   5.  y=-x^2-2x+8    -> h=-1, k=9
        //   6.  y=2x^2-8x+5    -> h=2,  k=-3
        //   7.  y=-3x^2+12x-7  -> h=2,  k=5
        //   8.  y=x^2+6x+5     -> h=-3, k=-4
        //   9.  y=-2x^2+4x+6   -> h=1,  k=8
        //   10. y=x^2-4x-5     -> h=2,  k=-9
        //   11. y=-x^2+6x-5    -> h=3,  k=4
        //   12. y=2x^2+4x-3    -> h=-1, k=-5
        //   13. y=-4x^2+16x-7  -> h=2,  k=9
        //   14. y=x^2-2x-8     -> h=1,  k=-9
        //   15. y=-x^2+2x+3    -> h=1,  k=4
        //   16. y=3x^2-6x-4    -> h=1,  k=-7
        const trackBank = [
            { title: "Sunset Summit", a: -2, b: 8, c: 3, h: 2, k: 11 },
            { title: "Canyon Drop", a: 1, b: -6, c: 5, h: 3, k: -4 },
            { title: "Skyline Rise", a: -1, b: 4, c: 1, h: 2, k: 5 },
            { title: "Thunder Valley", a: 3, b: -12, c: 7, h: 2, k: -5 },
            { title: "Comet Climb", a: -1, b: -2, c: 8, h: -1, k: 9 },
            { title: "Riverbend Dip", a: 2, b: -8, c: 5, h: 2, k: -3 },
            { title: "Golden Arc", a: -3, b: 12, c: -7, h: 2, k: 5 },
            { title: "Deep Gulch", a: 1, b: 6, c: 5, h: -3, k: -4 },
            { title: "Meteor Peak", a: -2, b: 4, c: 6, h: 1, k: 8 },
            { title: "Sinkhole Curve", a: 1, b: -4, c: -5, h: 2, k: -9 },
            { title: "Rocket Ridge", a: -1, b: 6, c: -5, h: 3, k: 4 },
            { title: "Basin Bottom", a: 2, b: 4, c: -3, h: -1, k: -5 },
            { title: "Twilight Peak", a: -4, b: 16, c: -7, h: 2, k: 9 },
            { title: "Gravity Well", a: 1, b: -2, c: -8, h: 1, k: -9 },
            { title: "Horizon Hill", a: -1, b: 2, c: 3, h: 1, k: 4 },
            { title: "Undertow Dip", a: 3, b: -6, c: -4, h: 1, k: -7 }
        ];

        const ROUNDS_PER_SESSION = 12;

        // GAME STATE
        let activeHills = [];
        let currentHillIndex = 0;
        let score = 0;
        let lives = 3;
        let isDarkMode = true;
        let isLocked = false;
        let playerName = '';

        let canvas, ctx;
        let cartAnimId = null;

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
            if (canvas && ctx) drawTrack(currentHillData(), null);
        }

        function renderMath() {
            if (window.MathJax && window.MathJax.startup && window.MathJax.startup.promise) {
                MathJax.startup.promise
                    .then(() => MathJax.typesetPromise())
                    .catch(err => console.warn('MathJax error:', err));
            }
        }

        window.addEventListener('DOMContentLoaded', () => {
            canvas = document.getElementById('trackCanvas');
            ctx = canvas.getContext('2d');
        });

        function currentHillData() {
            return activeHills.length ? activeHills[currentHillIndex] : null;
        }

        function formatEquation(hData) {
            const aStr = hData.a === 1 ? '' : (hData.a === -1 ? '-' : hData.a);
            const bSign = hData.b >= 0 ? '+' : '-';
            const bAbs = Math.abs(hData.b);
            const cSign = hData.c >= 0 ? '+' : '-';
            const cAbs = Math.abs(hData.c);
            return `\\( y = ${aStr}x^2 ${bSign} ${bAbs}x ${cSign} ${cAbs} \\)`;
        }

        function livesDisplayText() {
            let out = '';
            for (let i = 0; i < 3; i++) {
                out += i < lives ? '🎢' : '⬛';
            }
            return out;
        }

        function startDesignSession() {
            const name = ArcadeKit.requireName('playerNameInput', 'playerNameError');
            if (!name) return;
            playerName = name;

            currentHillIndex = 0;
            score = 0;
            lives = 3;
            activeHills = ArcadeKit.sample(trackBank, ROUNDS_PER_SESSION);

            document.getElementById('startScreen').style.display = 'none';
            document.getElementById('failScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'none';
            document.getElementById('gameScreen').style.display = 'block';

            loadHill();
        }

        function loadHill() {
            isLocked = false;
            if (cartAnimId) cancelAnimationFrame(cartAnimId);
            document.getElementById('feedbackLine').innerText = '';
            document.getElementById('inputH').value = '';
            document.getElementById('inputK').value = '';

            const hData = activeHills[currentHillIndex];

            document.getElementById('hillHeader').innerText = `Hill ${currentHillIndex + 1}: ${hData.title}`;
            document.getElementById('hillCounter').innerText = `${(currentHillIndex + 1).toString().padStart(2, '0')} / ${activeHills.length}`;
            document.getElementById('scoreDisplay').innerText = `${score} PTS`;
            document.getElementById('livesDisplay').innerText = livesDisplayText();

            const shape = hData.a < 0 ? 'peak (maximum)' : 'valley (minimum)';
            document.getElementById('equationText').innerHTML =
                `${formatEquation(hData)}<br><span style="font-size:0.85rem; font-family: var(--font-mono); color: var(--text-secondary);">Find the vertex — this track's ${shape} point.</span>`;

            updateSteepness(hData);
            drawTrack(hData, null);
            renderMath();
        }

        function updateSteepness(hData) {
            const pct = Math.min(100, Math.round(Math.abs(hData.a) * 20));
            const fill = document.getElementById('steepnessFill');
            fill.style.width = `${pct}%`;
            if (pct < 40) fill.style.backgroundColor = 'var(--accent-cyan)';
            else if (pct < 75) fill.style.backgroundColor = 'var(--accent-amber)';
            else fill.style.backgroundColor = 'var(--accent-red)';
        }

        // Draw the parabola track. cartProgress (0..1) optionally places
        // an animated test-cart along the curve.
        function drawTrack(hData, cartProgress) {
            if (!hData || !canvas || !ctx) return;
            const w = canvas.width;
            const h = canvas.height;
            const padL = 44, padR = 16, padT = 20, padB = 30;
            const plotW = w - padL - padR;
            const plotH = h - padT - padB;

            const bgColor = isDarkMode ? '#150c28' : '#ffffff';
            const gridColor = isDarkMode ? '#2c2049' : '#e7defa';
            const axisColor = isDarkMode ? '#a795c9' : '#6a5a8a';
            const curveColor = isDarkMode ? '#fb7185' : '#db2777';
            const vertexColor = isDarkMode ? '#fbbf24' : '#b45309';
            const cartColor = isDarkMode ? '#38bdf8' : '#0369a1';

            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, w, h);

            const xMin = hData.h - 5;
            const xMax = hData.h + 5;
            const pts = [];
            for (let i = 0; i <= 60; i++) {
                const x = xMin + (i / 60) * (xMax - xMin);
                const y = hData.a * x * x + hData.b * x + hData.c;
                pts.push({ x, y });
            }
            let yMin = Math.min(...pts.map(p => p.y), hData.k);
            let yMax = Math.max(...pts.map(p => p.y), hData.k);
            if (yMax - yMin < 1) { yMax += 1; yMin -= 1; }
            const yPad = (yMax - yMin) * 0.08;
            yMin -= yPad; yMax += yPad;

            function toPx(x) { return padL + ((x - xMin) / (xMax - xMin)) * plotW; }
            function toPy(y) { return padT + plotH - ((y - yMin) / (yMax - yMin)) * plotH; }

            // Gridlines
            ctx.strokeStyle = gridColor;
            ctx.lineWidth = 1;
            for (let i = 0; i <= 4; i++) {
                const gy = padT + (i / 4) * plotH;
                ctx.beginPath();
                ctx.moveTo(padL, gy);
                ctx.lineTo(w - padR, gy);
                ctx.stroke();
            }

            // Axes box
            ctx.strokeStyle = axisColor;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(padL, padT);
            ctx.lineTo(padL, padT + plotH);
            ctx.lineTo(w - padR, padT + plotH);
            ctx.stroke();

            // Track curve
            ctx.strokeStyle = curveColor;
            ctx.lineWidth = 4;
            ctx.lineCap = 'round';
            ctx.beginPath();
            pts.forEach((p, i) => {
                const px = toPx(p.x), py = toPy(p.y);
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            });
            ctx.stroke();

            // Vertex marker
            const vx = toPx(hData.h), vy = toPy(hData.k);
            ctx.fillStyle = vertexColor;
            ctx.beginPath();
            ctx.arc(vx, vy, 6, 0, Math.PI * 2);
            ctx.fill();

            // Test cart along the curve
            if (cartProgress !== null && cartProgress !== undefined) {
                const idx = Math.max(0, Math.min(pts.length - 1, Math.round(cartProgress * (pts.length - 1))));
                const p = pts[idx];
                const cx = toPx(p.x), cy = toPy(p.y);
                ctx.fillStyle = cartColor;
                ctx.beginPath();
                ctx.arc(cx, cy, 9, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }

        function runCartAnimation(hData, onDone) {
            const duration = 1600;
            const startTime = performance.now();

            function step(now) {
                const progress = Math.min(1, (now - startTime) / duration);
                drawTrack(hData, progress);
                if (progress < 1) {
                    cartAnimId = requestAnimationFrame(step);
                } else {
                    cartAnimId = null;
                    if (onDone) onDone();
                }
            }
            cartAnimId = requestAnimationFrame(step);
        }

        function submitVertex() {
            if (isLocked) return;

            const hVal = parseFloat(document.getElementById('inputH').value);
            const kVal = parseFloat(document.getElementById('inputK').value);
            const feedback = document.getElementById('feedbackLine');

            if (isNaN(hVal) || isNaN(kVal)) {
                feedback.className = 'feedback-line text-error';
                feedback.innerText = 'ENTER BOTH h AND k BEFORE THE TEST RUN!';
                return;
            }

            isLocked = true;
            const hData = activeHills[currentHillIndex];
            const isCorrect = Math.abs(hVal - hData.h) < 0.001 && Math.abs(kVal - hData.k) < 0.001;

            if (isCorrect) {
                score += 100;
                feedback.className = 'feedback-line text-success';
                feedback.innerText = `🎢 TRACK CLEARED! Vertex (${hData.h}, ${hData.k}) // +100 PTS`;

                runCartAnimation(hData, () => {
                    setTimeout(() => {
                        currentHillIndex++;
                        if (currentHillIndex >= activeHills.length) {
                            triggerVictory();
                        } else {
                            loadHill();
                        }
                    }, 500);
                });

            } else {
                lives--;
                feedback.className = 'feedback-line text-error';
                feedback.innerText = `❌ DERAILED! Correct vertex was (${hData.h}, ${hData.k}). -1 Cart Integrity`;
                document.getElementById('livesDisplay').innerText = livesDisplayText();
                drawTrack(hData, null);

                if (lives <= 0) {
                    setTimeout(() => {
                        triggerFail();
                    }, 1400);
                } else {
                    setTimeout(() => {
                        currentHillIndex++;
                        if (currentHillIndex >= activeHills.length) {
                            triggerVictory();
                        } else {
                            loadHill();
                        }
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

        function restartDesignSession() {
            startDesignSession();
        }
