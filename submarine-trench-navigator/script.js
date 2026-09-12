        // DIVE ORDER BANK — every clue below is derived from the original
        // negative-integer / absolute-value question bank (see design notes):
        // direct depth-placement orders, plus distance/absolute-value word
        // problems converted into a concrete target depth to steer to.
        // Every target has been hand-verified with straightforward integer
        // arithmetic; wrong[] holds "tempting wrong answer" depths (derived
        // from the original distractor values where they existed) used to
        // place dodge-mines during the dive.
        const questBank = [
            { title: "Reef Avoidance", clue: "Reef Avoidance: Dive until your depth's absolute value reads 45 m — thread between the coral heads and hold steady.", target: -45, wrong: [-20, -66, -80] },
            { title: "Hydrothermal Vent Study", clue: "Vent Study: Set your depth so |depth| = 78 m. The vent field glows just past the outer rock teeth.", target: -78, wrong: [-55, -95, -30] },
            { title: "Surface Dive", clue: "Surface Dive: Starting at 0 m, descend 62 m. Find that depth and hold it in the gate.", target: -62, wrong: [-40, -85, -20] },
            { title: "Partial Ascent", clue: "Partial Ascent: From -30 m, rise 18 m toward the light. Lock in the new depth.", target: -12, wrong: [-30, -50, 0] },
            { title: "Trench Rise", clue: "Trench Rise: From -95 m, rise 40 m. Steer to the new depth and hold.", target: -55, wrong: [-90, -30, -75] },
            { title: "Buoy Line Inspection", clue: "Buoy Line: Dive to a depth whose absolute value is 8 m to inspect the buoy line.", target: -8, wrong: [-25, -40] },
            { title: "Deep Dive Continuation", clue: "Deep Dive: From -15 m, descend another 51 m. Find the depth.", target: -66, wrong: [-15, -90, -40] },
            { title: "Trench Floor", clue: "Trench Floor: Set your depth so |depth| = 100 m — all the way to the bottom.", target: -100, wrong: [-70, -85, -55] },
            { title: "Full Ascent", clue: "Full Ascent: From -60 m, rise 60 m — all the way back to the surface.", target: 0, wrong: [-20, -40, -60] },
            { title: "Descent Log", clue: "Descent Log: From -20 m, dive until the distance covered has absolute value 65 m.", target: -85, wrong: [-75, -95, -50] },
            { title: "Vent Approach", clue: "Vent Approach: From -12 m, dive until the distance covered is 35 m.", target: -47, wrong: [-71, -37, -59] },
            { title: "Emergency Rise", clue: "Emergency Rise: From -90 m, rise until the distance covered is 55 m.", target: -35, wrong: [-25, -45, -65] },
            { title: "Formation Spacing", clue: "Formation Spacing: Sub A holds at -18 m. Steer to a depth 34 m from Sub A to form up with Sub B.", target: -52, wrong: [-88, -62, -42] },
            { title: "Canyon Descent", clue: "Canyon Descent: From -6 m, dive until the distance covered is 67 m.", target: -73, wrong: [-85, -63, -95] },
            { title: "Return Trip", clue: "Return Trip: From -58 m, rise until you've climbed 36 m.", target: -22, wrong: [0, -14, -40] },
            { title: "Trench Explorer II", clue: "Trench Explorer II: From -33 m, dive until the distance covered is 66 m.", target: -99, wrong: [-89, -70, -50] },
            { title: "Slow Ascent", clue: "Slow Ascent: From -84 m, rise until the distance covered is 70 m.", target: -14, wrong: [-24, -45, -60] },
            { title: "Multi-Step Dive", clue: "Multi-Step Dive: Dive 33 m from -50 m, then rise 8 m. Hold at the depth whose absolute value matches your final reading.", target: -75, wrong: [-83, -67, -58] }
        ];

        const ROUND_COUNT = 8;

        // ---- Steering / arcade tuning constants (logical canvas units) ----
        const LOGICAL_W = 640;
        const LOGICAL_H = 320;
        const TOP_MARGIN = 34;
        const BOTTOM_MARGIN = 286;
        const SUB_X = 128;
        const SUB_HALF = 16;
        const SCROLL_SPEED = 100;      // logical px / second
        const SUB_SPEED = 45;          // depth-units (meters) / second
        const MINE_START_X = [660, 880, 1100];
        const GATE_GAP = 260;
        const GATE_WIDTH = 200;
        const GATE_BAND = 7;           // +/- meters counted as a safe pass
        const TIGHT_BAND = 3;          // +/- meters counted as a precise pass
        const MINE_DAMAGE = 10;
        const GATE_DAMAGE = 18;
        const COLLISION_X = 22;
        const COLLISION_Y = 20;

        // GAME STATE
        let currentIndex = 0;
        let score = 0;
        let hull = 100;
        let activeOrders = [];
        let isDarkMode = true;
        let playerName = '';
        let gameActive = false;
        let runOver = false;

        // Steering state
        const controls = { up: false, down: false };
        let currentDepth = -50;
        let mines = [];
        let gate = null;
        let roundOutcomeLocked = false;
        let rafId = null;
        let lastTime = null;
        let scrollAccum = 0;
        let canvas = null;
        let ctx = null;
        let THEME = {};

        function clamp(v, lo, hi) {
            return Math.max(lo, Math.min(hi, v));
        }

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
            refreshThemeColors();
        }

        function refreshThemeColors() {
            const cs = getComputedStyle(document.body);
            const read = (name, fallback) => {
                const v = cs.getPropertyValue(name).trim();
                return v || fallback;
            };
            THEME = {
                bgTop: read('--canvas-bg-top', '#08303c'),
                bgBottom: read('--canvas-bg-bottom', '#011016'),
                surfaceLine: read('--canvas-surface-line', 'rgba(217,242,245,0.4)'),
                rock: read('--canvas-rock', '#103f47'),
                rockEdge: read('--canvas-rock-edge', '#1c5c66'),
                mine: read('--canvas-mine', '#f04b5c'),
                mineCore: read('--canvas-mine-core', '#ffe1a8'),
                subBody: read('--canvas-sub-body', '#fbbf24'),
                subWindow: read('--canvas-sub-window', '#22d3ee'),
                safeGlow: read('--canvas-safe-glow', 'rgba(52,211,153,0.3)'),
                safeLine: read('--canvas-safe-line', '#34d399')
            };
        }

        function bindThrottleButton(el, dir) {
            if (!el) return;
            const start = (e) => { e.preventDefault(); controls[dir] = true; el.classList.add('active'); };
            const stop = () => { controls[dir] = false; el.classList.remove('active'); };
            el.addEventListener('pointerdown', start);
            el.addEventListener('pointerup', stop);
            el.addEventListener('pointerleave', stop);
            el.addEventListener('pointercancel', stop);
        }

        function initControls() {
            bindThrottleButton(document.getElementById('ascendBtn'), 'up');
            bindThrottleButton(document.getElementById('descendBtn'), 'down');

            window.addEventListener('keydown', (e) => {
                if (!gameActive) return;
                if (e.key === 'ArrowUp') { controls.up = true; e.preventDefault(); }
                else if (e.key === 'ArrowDown') { controls.down = true; e.preventDefault(); }
            });
            window.addEventListener('keyup', (e) => {
                if (e.key === 'ArrowUp') controls.up = false;
                else if (e.key === 'ArrowDown') controls.down = false;
            });
        }

        function sanitizeWrongDepths(target, arr) {
            const seen = new Set();
            let list = (arr || []).filter((d) => {
                if (d < -100 || d > 0) return false;
                if (Math.abs(d - target) <= GATE_BAND + 2) return false;
                if (seen.has(d)) return false;
                seen.add(d);
                return true;
            });
            const extraOffsets = [GATE_BAND + 18, -(GATE_BAND + 18), GATE_BAND + 34, -(GATE_BAND + 34), GATE_BAND + 50, -(GATE_BAND + 50)];
            let i = 0;
            while (list.length < 2 && i < extraOffsets.length) {
                const cand = clamp(target + extraOffsets[i], -100, 0);
                if (!seen.has(cand) && Math.abs(cand - target) > GATE_BAND + 2) {
                    list.push(cand);
                    seen.add(cand);
                }
                i++;
            }
            return list.slice(0, 3);
        }

        function startGame() {
            const name = ArcadeKit.requireName('playerNameInput', 'playerNameError');
            if (!name) return;
            playerName = name;

            currentIndex = 0;
            score = 0;
            hull = 100;
            runOver = false;

            activeOrders = ArcadeKit.sample(questBank, ROUND_COUNT).map((q) => ({
                ...q,
                wrong: sanitizeWrongDepths(q.target, q.wrong)
            }));

            document.getElementById('startScreen').style.display = 'none';
            document.getElementById('failScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'none';
            document.getElementById('gameScreen').style.display = 'block';

            if (!canvas) {
                canvas = document.getElementById('trenchCanvas');
                ctx = canvas.getContext('2d');
                ctx.scale(2, 2);
            }
            refreshThemeColors();

            gameActive = true;
            loadOrder();
        }

        function loadOrder() {
            document.getElementById('feedbackLine').innerText = '';
            document.getElementById('feedbackLine').className = 'feedback-line';

            const oData = activeOrders[currentIndex];

            document.getElementById('diveHeader').innerText = `Dive Order ${currentIndex + 1}: ${oData.title}`;
            document.getElementById('roundCounter').innerText = `${currentIndex + 1} / ${activeOrders.length}`;
            document.getElementById('orderText').innerText = oData.clue;
            updateHUD();

            setupRound(oData);
        }

        function updateHUD() {
            document.getElementById('scoreDisplay').innerText = `${score} PTS`;
            const fill = document.getElementById('hullFill');
            const clamped = Math.max(0, hull);
            fill.style.width = `${clamped}%`;
            if (hull > 50) {
                fill.style.backgroundColor = 'var(--accent-green)';
            } else if (hull > 25) {
                fill.style.backgroundColor = 'var(--accent-amber)';
            } else {
                fill.style.backgroundColor = 'var(--accent-red)';
            }
        }

        function flashFeedback(text, cls) {
            const fb = document.getElementById('feedbackLine');
            fb.className = 'feedback-line ' + cls;
            fb.innerText = text;
        }

        function depthToY(d) {
            const frac = (-d) / 100;
            return TOP_MARGIN + frac * (BOTTOM_MARGIN - TOP_MARGIN);
        }

        // ---- Round lifecycle ----
        function setupRound(oData) {
            currentDepth = -50;
            document.getElementById('depthReadout').innerText = `${Math.round(currentDepth)} m`;

            mines = MINE_START_X.slice(0, oData.wrong.length).map((sx, i) => ({
                x: sx, depth: oData.wrong[i], hit: false
            }));
            const lastMineX = mines.length ? Math.max(...mines.map((m) => m.x)) : (SUB_X + 350);
            const gateLeft = lastMineX + GATE_GAP;
            gate = {
                left: gateLeft,
                width: GATE_WIDTH,
                target: oData.target,
                safeMin: clamp(oData.target - GATE_BAND, -100, 0),
                safeMax: clamp(oData.target + GATE_BAND, -100, 0),
                hitRock: false,
                minAbsErr: Infinity
            };
            roundOutcomeLocked = false;

            if (rafId) cancelAnimationFrame(rafId);
            lastTime = null;
            rafId = requestAnimationFrame(tick);
        }

        function tick(ts) {
            if (runOver) return;
            if (lastTime === null) lastTime = ts;
            const dt = Math.min(0.05, (ts - lastTime) / 1000);
            lastTime = ts;

            let dz = 0;
            if (controls.up) dz += SUB_SPEED * dt;
            if (controls.down) dz -= SUB_SPEED * dt;
            currentDepth = clamp(currentDepth + dz, -100, 0);
            document.getElementById('depthReadout').innerText = `${Math.round(currentDepth)} m`;

            const dx = SCROLL_SPEED * dt;
            scrollAccum += dx;
            mines.forEach((m) => { m.x -= dx; });
            gate.left -= dx;

            mines.forEach((m) => {
                if (!m.hit && Math.abs(m.x - SUB_X) < COLLISION_X && Math.abs(depthToY(m.depth) - depthToY(currentDepth)) < COLLISION_Y) {
                    m.hit = true;
                    applyMineHit();
                }
            });

            if (runOver) { draw(); return; }

            if (!roundOutcomeLocked) {
                const gateRight = gate.left + gate.width;
                const overlapping = (gate.left <= SUB_X + SUB_HALF) && (gateRight >= SUB_X - SUB_HALF);
                if (overlapping) {
                    const err = Math.abs(currentDepth - gate.target);
                    gate.minAbsErr = Math.min(gate.minAbsErr, err);
                    if (err > GATE_BAND && !gate.hitRock) {
                        gate.hitRock = true;
                        applyGateHit();
                    }
                }
                if (runOver) { draw(); return; }
                if (gateRight < SUB_X - SUB_HALF) {
                    roundOutcomeLocked = true;
                    draw();
                    resolveRound();
                    return;
                }
            }

            draw();
            rafId = requestAnimationFrame(tick);
        }

        function applyMineHit() {
            hull = Math.max(0, hull - MINE_DAMAGE);
            updateHUD();
            flashFeedback(`💥 Clipped a wrong-depth mine! Hull -${MINE_DAMAGE}%`, 'text-error');
            if (hull <= 0) endRunFail();
        }

        function applyGateHit() {
            hull = Math.max(0, hull - GATE_DAMAGE);
            updateHUD();
            flashFeedback(`💥 Scraped the gate wall! Hull -${GATE_DAMAGE}%`, 'text-error');
            if (hull <= 0) endRunFail();
        }

        function resolveRound() {
            if (runOver) return;
            let outcome;
            if (gate.hitRock) {
                outcome = 'miss';
            } else if (gate.minAbsErr <= TIGHT_BAND) {
                outcome = 'perfect';
            } else {
                outcome = 'good';
            }

            if (outcome === 'perfect') {
                score += 100;
                hull = Math.min(100, hull + 8);
                flashFeedback('🎯 Nailed it, Captain! Depth locked precisely. +100 PTS // Hull Reinforced', 'text-success');
            } else if (outcome === 'good') {
                score += 65;
                hull = Math.min(100, hull + 4);
                flashFeedback('👌 Close enough — logged as a safe pass. +65 PTS', 'text-success');
            } else {
                flashFeedback(`❌ Missed the gate! Correct depth was ${gate.target} m.`, 'text-error');
            }
            updateHUD();

            setTimeout(() => {
                if (runOver) return;
                currentIndex++;
                if (currentIndex >= activeOrders.length) {
                    triggerVictory();
                } else {
                    loadOrder();
                }
            }, 1500);
        }

        // ---- Rendering ----
        function draw() {
            if (!ctx) return;
            ctx.clearRect(0, 0, LOGICAL_W, LOGICAL_H);

            const grad = ctx.createLinearGradient(0, 0, 0, LOGICAL_H);
            grad.addColorStop(0, THEME.bgTop);
            grad.addColorStop(1, THEME.bgBottom);
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, LOGICAL_W, LOGICAL_H);

            drawTerrain();
            drawTargetGuide();
            drawGate();
            drawMines();
            drawSub();
            drawDepthTicks();
        }

        function drawTerrain() {
            // Surface jag (subtle wave near the top)
            ctx.beginPath();
            ctx.moveTo(0, 0);
            for (let x = 0; x <= LOGICAL_W; x += 16) {
                const y = depthToY(0) + Math.sin((x + scrollAccum) * 0.02) * 4;
                ctx.lineTo(x, y);
            }
            ctx.lineTo(LOGICAL_W, 0);
            ctx.closePath();
            ctx.fillStyle = THEME.rockEdge;
            ctx.globalAlpha = 0.35;
            ctx.fill();
            ctx.globalAlpha = 1;

            ctx.beginPath();
            ctx.moveTo(0, depthToY(0));
            for (let x = 0; x <= LOGICAL_W; x += 16) {
                const y = depthToY(0) + Math.sin((x + scrollAccum) * 0.02) * 4;
                ctx.lineTo(x, y);
            }
            ctx.strokeStyle = THEME.surfaceLine;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Trench floor (jagged rock)
            ctx.beginPath();
            ctx.moveTo(0, LOGICAL_H);
            for (let x = 0; x <= LOGICAL_W; x += 12) {
                const jag = Math.sin((x + scrollAccum) * 0.03) * 8 + Math.sin((x + scrollAccum) * 0.011 + 2) * 10;
                const y = depthToY(-100) - Math.abs(jag) * 0.6;
                ctx.lineTo(x, y);
            }
            ctx.lineTo(LOGICAL_W, LOGICAL_H);
            ctx.closePath();
            ctx.fillStyle = THEME.rock;
            ctx.fill();
            ctx.strokeStyle = THEME.rockEdge;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        function drawDepthTicks() {
            ctx.font = '10px "Exo 2", sans-serif';
            ctx.fillStyle = THEME.surfaceLine;
            ctx.textAlign = 'left';
            [0, -20, -40, -60, -80, -100].forEach((d) => {
                const y = depthToY(d);
                ctx.globalAlpha = 0.5;
                ctx.fillRect(0, y, LOGICAL_W, 1);
                ctx.globalAlpha = 0.85;
                ctx.fillText(`${d} m`, 4, y - 3 < 10 ? y + 11 : y - 3);
            });
            ctx.globalAlpha = 1;
        }

        function drawTargetGuide() {
            const y = depthToY(gate.target);
            ctx.save();
            ctx.setLineDash([6, 5]);
            ctx.strokeStyle = THEME.safeLine;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(LOGICAL_W, y);
            ctx.stroke();
            ctx.restore();
        }

        function drawGate() {
            const left = gate.left;
            const right = gate.left + gate.width;
            if (right < -10 || left > LOGICAL_W + 10) return;

            const gapTopY = depthToY(gate.safeMax);
            const gapBottomY = depthToY(gate.safeMin);

            ctx.fillStyle = THEME.rock;
            ctx.strokeStyle = THEME.rockEdge;
            ctx.lineWidth = 2;

            // Top rock block
            ctx.fillRect(left, 0, gate.width, Math.max(0, gapTopY));
            ctx.strokeRect(left, 0, gate.width, Math.max(0, gapTopY));

            // Bottom rock block
            ctx.fillRect(left, gapBottomY, gate.width, LOGICAL_H - gapBottomY);
            ctx.strokeRect(left, gapBottomY, gate.width, LOGICAL_H - gapBottomY);

            // Safe gap glow
            ctx.fillStyle = THEME.safeGlow;
            ctx.fillRect(left, gapTopY, gate.width, gapBottomY - gapTopY);
            ctx.strokeStyle = THEME.safeLine;
            ctx.lineWidth = 1.5;
            ctx.strokeRect(left, gapTopY, gate.width, gapBottomY - gapTopY);
        }

        function drawMines() {
            mines.forEach((m) => {
                if (m.hit) return;
                if (m.x < -20 || m.x > LOGICAL_W + 20) return;
                const y = depthToY(m.depth);
                ctx.fillStyle = THEME.mine;
                ctx.beginPath();
                ctx.arc(m.x, y, 9, 0, Math.PI * 2);
                ctx.fill();
                // spikes
                ctx.strokeStyle = THEME.mine;
                ctx.lineWidth = 2;
                for (let a = 0; a < 8; a++) {
                    const ang = (a / 8) * Math.PI * 2;
                    ctx.beginPath();
                    ctx.moveTo(m.x + Math.cos(ang) * 9, y + Math.sin(ang) * 9);
                    ctx.lineTo(m.x + Math.cos(ang) * 14, y + Math.sin(ang) * 14);
                    ctx.stroke();
                }
                ctx.fillStyle = THEME.mineCore;
                ctx.beginPath();
                ctx.arc(m.x, y, 3.5, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        function drawSub() {
            const y = depthToY(currentDepth);
            ctx.save();
            ctx.translate(SUB_X, y);
            ctx.fillStyle = THEME.subBody;
            ctx.beginPath();
            ctx.moveTo(18, 0);
            ctx.quadraticCurveTo(10, -12, -14, -10);
            ctx.quadraticCurveTo(-20, 0, -14, 10);
            ctx.quadraticCurveTo(10, 12, 18, 0);
            ctx.closePath();
            ctx.fill();

            // fin
            ctx.beginPath();
            ctx.moveTo(-6, -9);
            ctx.lineTo(-2, -18);
            ctx.lineTo(4, -9);
            ctx.closePath();
            ctx.fill();

            // window
            ctx.fillStyle = THEME.subWindow;
            ctx.beginPath();
            ctx.arc(4, 0, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // ---- End states ----
        function endRunFail() {
            if (runOver) return;
            runOver = true;
            gameActive = false;
            if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
            setTimeout(() => { triggerFail(); }, 650);
        }

        function triggerFail() {
            document.getElementById('gameScreen').style.display = 'none';
            document.getElementById('failScreen').style.display = 'flex';
            document.getElementById('failScore').innerText = score;
            ArcadeKit.showPlayerName(playerName, ['playerNameDisplayFail']);
        }

        function triggerVictory() {
            gameActive = false;
            if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
            document.getElementById('gameScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'flex';
            document.getElementById('victoryScore').innerText = score;
            ArcadeKit.showPlayerName(playerName, ['playerNameDisplayWin']);
        }

        function restartGame() {
            runOver = false;
            if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
            controls.up = false;
            controls.down = false;
            startGame();
        }

        initControls();
