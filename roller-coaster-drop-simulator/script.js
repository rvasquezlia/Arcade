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

        // How close (in data-space x units) a drag has to land to count as
        // "on the money." The plotted domain is always 10 units wide, so
        // this tolerance is a consistent ~1/22 of the visible track width
        // on every hill — forgiving for mouse AND touch dragging.
        const VERTEX_TOL = 0.45;

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

        // Player's current drag-marker guesses, in data-space x. The vertex
        // marker is always constrained to sit ON the curve (its y follows
        // the equation), so only its x needs to be tracked.
        let vertexGuessX = null;
        let axisGuessX = null;
        let dragTarget = null; // 'vertex' | 'axis' | null
        let activePointerId = null;

        const SUCCESS_LINES = [
            "SMOOTH DROP! The crowd loses its mind! 🎉",
            "Butter-smooth banked turn — inspectors are impressed!",
            "That cart didn't even flinch. Certified thrill ride!",
            "Perfect physics. The park mascot just fainted (happily).",
            "Zero wobble, all wow. Ride operators are cheering!"
        ];
        const FAIL_LINES = [
            "😬 Yikes — engineering review requested immediately.",
            "🛠️ Safety inspector says 'hard pass' on that curve.",
            "💥 Cart skids, sparks fly, seagulls scatter.",
            "🚧 That track needs... a LOT more math before opening day.",
            "🙈 The test dummy is fine. The blueprint is not."
        ];

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
            if (canvas && ctx && currentHillData()) renderScene();
        }

        function renderMath() {
            if (window.MathJax && window.MathJax.startup && window.MathJax.startup.promise) {
                MathJax.startup.promise
                    .then(() => MathJax.typesetPromise())
                    .catch(err => console.warn('MathJax error:', err));
            }
        }

        // Reads a CSS custom property's live computed value so canvas
        // drawing always matches the current theme — never a hardcoded hex.
        function cssVar(name) {
            const v = getComputedStyle(document.body).getPropertyValue(name);
            return v ? v.trim() : '#888888';
        }

        window.addEventListener('DOMContentLoaded', () => {
            canvas = document.getElementById('trackCanvas');
            ctx = canvas.getContext('2d');
            canvas.style.touchAction = 'none';

            canvas.addEventListener('pointerdown', onPointerDown);
            canvas.addEventListener('pointermove', onPointerMove);
            canvas.addEventListener('pointerup', onPointerUp);
            canvas.addEventListener('pointercancel', onPointerUp);
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
            cartAnimId = null;
            document.getElementById('canvasWrapper').classList.remove('shake-canvas');
            document.getElementById('feedbackLine').innerText = '';
            document.getElementById('feedbackLine').className = 'feedback-line';
            document.getElementById('fireBtn').disabled = false;

            const hData = activeHills[currentHillIndex];

            // Seed the two draggable guesses on opposite sides of the
            // domain so neither starts anywhere near correct (the plotted
            // window is always centered on h, so a default of "the middle"
            // would be a free answer — this avoids that entirely).
            vertexGuessX = hData.h - 4;
            axisGuessX = hData.h + 4;

            document.getElementById('hillHeader').innerText = `Hill ${currentHillIndex + 1}: ${hData.title}`;
            document.getElementById('hillCounter').innerText = `${(currentHillIndex + 1).toString().padStart(2, '0')} / ${activeHills.length}`;
            document.getElementById('scoreDisplay').innerText = `${score} PTS`;
            document.getElementById('livesDisplay').innerText = livesDisplayText();

            const shape = hData.a < 0 ? 'peak (maximum)' : 'valley (minimum)';
            document.getElementById('equationText').innerHTML =
                `${formatEquation(hData)}<br><span style="font-size:0.85rem; font-family: var(--font-mono); color: var(--text-secondary);">Drag your marks onto this track's ${shape} point.</span>`;

            updateSteepness(hData);
            updateGuessReadout(hData);
            renderScene();
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

        function updateGuessReadout(hData) {
            const vEl = document.getElementById('vertexGuessText');
            const aEl = document.getElementById('axisGuessText');
            if (vEl) {
                const vy = evalQuad(hData, vertexGuessX);
                vEl.innerText = `(${vertexGuessX.toFixed(1)}, ${vy.toFixed(1)})`;
            }
            if (aEl) {
                aEl.innerText = `x = ${axisGuessX.toFixed(1)}`;
            }
        }

        function evalQuad(hData, x) {
            return hData.a * x * x + hData.b * x + hData.c;
        }

        // Computes the pixel<->data-space mapping for the currently
        // plotted hill. Shared by rendering AND pointer hit-testing so the
        // two never drift out of sync.
        function computeLayout(hData) {
            const w = canvas.width;
            const h = canvas.height;
            const padL = 44, padR = 16, padT = 20, padB = 30;
            const plotW = w - padL - padR;
            const plotH = h - padT - padB;

            const xMin = hData.h - 5;
            const xMax = hData.h + 5;
            const pts = [];
            for (let i = 0; i <= 60; i++) {
                const x = xMin + (i / 60) * (xMax - xMin);
                pts.push({ x, y: evalQuad(hData, x) });
            }
            let yMin = Math.min(...pts.map(p => p.y), hData.k);
            let yMax = Math.max(...pts.map(p => p.y), hData.k);
            if (yMax - yMin < 1) { yMax += 1; yMin -= 1; }
            const yPad = (yMax - yMin) * 0.08;
            yMin -= yPad; yMax += yPad;

            const toPx = (x) => padL + ((x - xMin) / (xMax - xMin)) * plotW;
            const toPy = (y) => padT + plotH - ((y - yMin) / (yMax - yMin)) * plotH;
            const toDataX = (px) => xMin + ((px - padL) / plotW) * (xMax - xMin);

            return { w, h, padL, padR, padT, padB, plotW, plotH, xMin, xMax, yMin, yMax, pts, toPx, toPy, toDataX };
        }

        // Converts a pointer/touch event's client coords into canvas pixel
        // space, accounting for the canvas being CSS-scaled to fit its box.
        function eventToCanvasPos(evt) {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            return {
                x: (evt.clientX - rect.left) * scaleX,
                y: (evt.clientY - rect.top) * scaleY
            };
        }

        function onPointerDown(evt) {
            if (isLocked) return;
            const hData = currentHillData();
            if (!hData) return;
            const layout = computeLayout(hData);
            const pos = eventToCanvasPos(evt);

            const vx = layout.toPx(vertexGuessX), vy = layout.toPy(evalQuad(hData, vertexGuessX));
            const distVertex = Math.hypot(pos.x - vx, pos.y - vy);

            const ax = layout.toPx(axisGuessX);
            const distAxis = Math.abs(pos.x - ax);

            let distCurve = Infinity;
            layout.pts.forEach(p => {
                const d = Math.hypot(pos.x - layout.toPx(p.x), pos.y - layout.toPy(p.y));
                if (d < distCurve) distCurve = d;
            });

            const HIT = 22;
            if (distVertex < HIT) {
                dragTarget = 'vertex';
            } else if (distAxis < HIT) {
                dragTarget = 'axis';
            } else if (distCurve < HIT) {
                dragTarget = 'vertex';
                vertexGuessX = clampX(layout.toDataX(pos.x), layout);
            } else if (pos.x >= layout.padL && pos.x <= layout.w - layout.padR && pos.y >= layout.padT && pos.y <= layout.padT + layout.plotH) {
                dragTarget = 'axis';
                axisGuessX = clampX(layout.toDataX(pos.x), layout);
            } else {
                return;
            }

            activePointerId = evt.pointerId;
            try { canvas.setPointerCapture(evt.pointerId); } catch (e) { /* no-op */ }
            updateGuessReadout(hData);
            renderScene();
            evt.preventDefault();
        }

        function onPointerMove(evt) {
            if (!dragTarget || isLocked) return;
            if (activePointerId !== null && evt.pointerId !== activePointerId) return;
            const hData = currentHillData();
            if (!hData) return;
            const layout = computeLayout(hData);
            const pos = eventToCanvasPos(evt);
            const dataX = clampX(layout.toDataX(pos.x), layout);

            if (dragTarget === 'vertex') vertexGuessX = dataX;
            else if (dragTarget === 'axis') axisGuessX = dataX;

            updateGuessReadout(hData);
            renderScene();
            evt.preventDefault();
        }

        function onPointerUp(evt) {
            if (activePointerId !== null && evt.pointerId !== activePointerId) return;
            dragTarget = null;
            activePointerId = null;
        }

        function clampX(x, layout) {
            return Math.max(layout.xMin, Math.min(layout.xMax, x));
        }

        // Draws the full scene: grid, curve, drag handles (vertex marker +
        // axis line), and — during a test-run — the animated cart.
        function renderScene(cartDataPos, opts) {
            opts = opts || {};
            const hData = currentHillData();
            if (!hData || !canvas || !ctx) return;
            const layout = computeLayout(hData);
            const { w, h, padL, padR, padT, plotW, plotH, xMin, xMax, pts } = layout;

            const bgColor = cssVar('--canvas-bg');
            const gridColor = cssVar('--border-color');
            const axisColor = cssVar('--text-secondary');
            const curveColor = cssVar('--accent-pink');
            const vertexColor = cssVar('--accent-amber');
            const axisHandleColor = cssVar('--accent-cyan');
            const cartColor = cssVar('--accent-cyan');
            const ghostColor = cssVar('--accent-green');
            const textColor = cssVar('--text-secondary');

            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, w, h);

            // Gridlines (horizontal + vertical, with light tick labels so
            // players can line up their drag with the equation's numbers)
            ctx.strokeStyle = gridColor;
            ctx.lineWidth = 1;
            ctx.font = '9px "Space Mono", monospace';
            ctx.fillStyle = textColor;
            for (let i = 0; i <= 4; i++) {
                const gy = padT + (i / 4) * plotH;
                ctx.beginPath();
                ctx.moveTo(padL, gy);
                ctx.lineTo(w - padR, gy);
                ctx.stroke();
            }
            for (let xi = Math.ceil(xMin); xi <= Math.floor(xMax); xi++) {
                const gx = layout.toPx(xi);
                ctx.beginPath();
                ctx.moveTo(gx, padT);
                ctx.lineTo(gx, padT + plotH);
                ctx.stroke();
                ctx.fillText(String(xi), gx - 4, padT + plotH + 14);
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
                const px = layout.toPx(p.x), py = layout.toPy(p.y);
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            });
            ctx.stroke();

            // Ghost "actual vertex" reveal (shown after a wrong attempt)
            if (opts.showTrueVertex) {
                const tvx = layout.toPx(hData.h), tvy = layout.toPy(hData.k);
                ctx.strokeStyle = ghostColor;
                ctx.lineWidth = 2;
                ctx.setLineDash([4, 4]);
                ctx.beginPath();
                ctx.arc(tvx, tvy, 11, 0, Math.PI * 2);
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.fillStyle = ghostColor;
                ctx.font = 'bold 10px "Space Mono", monospace';
                ctx.fillText('actual vertex', tvx + 12, tvy - 8);
            }

            // Draggable axis-of-symmetry handle (dashed vertical line + grip)
            if (!opts.hideControls) {
                const ax = layout.toPx(axisGuessX);
                ctx.strokeStyle = axisHandleColor;
                ctx.lineWidth = 2;
                ctx.setLineDash([6, 5]);
                ctx.beginPath();
                ctx.moveTo(ax, padT - 6);
                ctx.lineTo(ax, padT + plotH);
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.arc(ax, padT - 6, 7, 0, Math.PI * 2);
                ctx.fillStyle = axisHandleColor;
                ctx.fill();

                // Draggable vertex marker (snapped onto the curve)
                const vx = layout.toPx(vertexGuessX), vy = layout.toPy(evalQuad(hData, vertexGuessX));
                ctx.beginPath();
                ctx.arc(vx, vy, 9, 0, Math.PI * 2);
                ctx.fillStyle = vertexColor;
                ctx.fill();
                ctx.strokeStyle = bgColor;
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            // Cart sprite
            if (cartDataPos) {
                const cx = layout.toPx(cartDataPos.x), cy = layout.toPy(cartDataPos.y);
                const wobble = opts.wobble || 0;
                ctx.save();
                ctx.translate(cx + wobble, cy);
                ctx.rotate(opts.tilt || 0);
                ctx.fillStyle = cartColor;
                ctx.beginPath();
                ctx.arc(0, 0, 10, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.fillStyle = '#ffffff';
                ctx.font = '10px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('🎢', 0, 4);
                ctx.restore();
            }

            return layout;
        }

        // Builds a time-parameterized profile of the track so cart motion
        // feels gravity-driven: faster through low points, slower over
        // high points — using simple energy-style physics (v ~ sqrt(2*g*h)).
        function buildArcProfile(hData, layout) {
            const pts = layout.pts;
            const peakY = Math.max(...pts.map(p => p.y));
            const yRange = (layout.yMax - layout.yMin) || 1;
            const G = 5, V0 = 1.1;
            const cum = [0];
            for (let i = 1; i < pts.length; i++) {
                const p0 = pts[i - 1], p1 = pts[i];
                const dx = layout.toPx(p1.x) - layout.toPx(p0.x);
                const dy = layout.toPy(p1.y) - layout.toPy(p0.y);
                const segLen = Math.hypot(dx, dy);
                const hFrac0 = Math.max(0, (peakY - p0.y) / yRange);
                const hFrac1 = Math.max(0, (peakY - p1.y) / yRange);
                const speed0 = Math.sqrt(2 * G * hFrac0 + V0 * V0);
                const speed1 = Math.sqrt(2 * G * hFrac1 + V0 * V0);
                const avgSpeed = (speed0 + speed1) / 2 || V0;
                cum.push(cum[i - 1] + segLen / avgSpeed);
            }
            return { pts, cum, total: cum[cum.length - 1] || 1 };
        }

        function sampleArcProfile(profile, frac) {
            const target = Math.max(0, Math.min(1, frac)) * profile.total;
            let idx = profile.cum.findIndex(v => v >= target);
            if (idx <= 0) idx = 1;
            if (idx >= profile.cum.length) idx = profile.cum.length - 1;
            const t0 = profile.cum[idx - 1], t1 = profile.cum[idx];
            const span = (t1 - t0) || 1;
            const localT = (target - t0) / span;
            const p0 = profile.pts[idx - 1], p1 = profile.pts[idx];
            return { x: p0.x + (p1.x - p0.x) * localT, y: p0.y + (p1.y - p0.y) * localT };
        }

        // Successful test-run: cart rides the FULL track start-to-finish
        // with eased, gravity-like speed, then a little crowd cheer.
        function runSuccessAnimation(hData, onDone) {
            const layout = computeLayout(hData);
            const profile = buildArcProfile(hData, layout);
            const DURATION = 2100;
            const startTime = performance.now();

            function step(now) {
                const elapsed = now - startTime;
                const frac = Math.min(1, elapsed / DURATION);
                const pos = sampleArcProfile(profile, frac);
                renderScene(pos, { hideControls: true });
                if (frac < 1) {
                    cartAnimId = requestAnimationFrame(step);
                } else {
                    cartAnimId = null;
                    spawnCrowdCheer();
                    if (onDone) onDone();
                }
            }
            cartAnimId = requestAnimationFrame(step);
        }

        // Failed test-run: cart rides only PART of the track, then wobbles
        // to a comedic, cartoonish stop — no scary crash, just a skid.
        function runDerailAnimation(hData, onDone) {
            const layout = computeLayout(hData);
            const profile = buildArcProfile(hData, layout);
            const stopFrac = 0.25 + Math.random() * 0.3; // derails 25%-55% in
            const RUN_DURATION = 1300;
            const SKID_DURATION = 700;
            const startTime = performance.now();
            const stopPos = sampleArcProfile(profile, stopFrac);

            function runStep(now) {
                const elapsed = now - startTime;
                const frac = Math.min(1, elapsed / RUN_DURATION) * stopFrac;
                const pos = sampleArcProfile(profile, frac);
                renderScene(pos, { hideControls: true, showTrueVertex: true });
                if (elapsed < RUN_DURATION) {
                    cartAnimId = requestAnimationFrame(runStep);
                } else {
                    document.getElementById('canvasWrapper').classList.add('shake-canvas');
                    skidStart = performance.now();
                    cartAnimId = requestAnimationFrame(skidStep);
                }
            }

            function skidStep(now) {
                const elapsed = now - skidStart;
                const t = Math.min(1, elapsed / SKID_DURATION);
                const amplitude = 6 * (1 - t);
                const wobble = Math.sin(t * 40) * amplitude;
                const tilt = Math.sin(t * 30) * 0.25 * (1 - t);
                renderScene(stopPos, { hideControls: true, showTrueVertex: true, wobble, tilt });
                if (t < 1) {
                    cartAnimId = requestAnimationFrame(skidStep);
                } else {
                    cartAnimId = null;
                    document.getElementById('canvasWrapper').classList.remove('shake-canvas');
                    if (onDone) onDone();
                }
            }
            let skidStart = 0;
            cartAnimId = requestAnimationFrame(runStep);
        }

        function spawnCrowdCheer() {
            const layer = document.getElementById('cheerLayer');
            if (!layer) return;
            const burst = document.createElement('div');
            burst.className = 'cheer-burst';
            burst.innerText = ['🎉 WOO!', '👏 CHEERS!', '🎊 NICE DROP!'][Math.floor(Math.random() * 3)];
            layer.appendChild(burst);
            setTimeout(() => burst.remove(), 1200);
        }

        function launchTestRun() {
            if (isLocked) return;
            const hData = currentHillData();
            if (!hData) return;

            isLocked = true;
            document.getElementById('fireBtn').disabled = true;
            const feedback = document.getElementById('feedbackLine');

            const vertexOk = Math.abs(vertexGuessX - hData.h) <= VERTEX_TOL;
            const axisOk = Math.abs(axisGuessX - hData.h) <= VERTEX_TOL;
            const isCorrect = vertexOk && axisOk;

            if (isCorrect) {
                score += 100;
                feedback.className = 'feedback-line text-success';
                feedback.innerText = `🎢 TRACK CLEARED! Vertex (${hData.h}, ${hData.k}) // +100 PTS — ${pick(SUCCESS_LINES)}`;
                document.getElementById('scoreDisplay').innerText = `${score} PTS`;

                runSuccessAnimation(hData, () => {
                    setTimeout(() => {
                        currentHillIndex++;
                        if (currentHillIndex >= activeHills.length) {
                            triggerVictory();
                        } else {
                            loadHill();
                        }
                    }, 700);
                });

            } else {
                lives--;
                let whatWasOff;
                if (!vertexOk && !axisOk) whatWasOff = 'Both the vertex mark and the axis line missed.';
                else if (!vertexOk) whatWasOff = 'The vertex marker missed the peak/valley.';
                else whatWasOff = 'The axis handle wasn\'t lined up with the vertex.';

                feedback.className = 'feedback-line text-error';
                feedback.innerText = `${pick(FAIL_LINES)} Correct vertex was (${hData.h}, ${hData.k}). ${whatWasOff} -1 Cart Integrity`;
                document.getElementById('livesDisplay').innerText = livesDisplayText();

                runDerailAnimation(hData, () => {
                    if (lives <= 0) {
                        setTimeout(() => triggerFail(), 1200);
                    } else {
                        setTimeout(() => {
                            currentHillIndex++;
                            if (currentHillIndex >= activeHills.length) {
                                triggerVictory();
                            } else {
                                loadHill();
                            }
                        }, 1600);
                    }
                });
            }
        }

        function pick(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }

        function triggerFail() {
            if (cartAnimId) cancelAnimationFrame(cartAnimId);
            cartAnimId = null;
            document.getElementById('gameScreen').style.display = 'none';
            document.getElementById('failScreen').style.display = 'flex';
            document.getElementById('failScore').innerText = score;
            ArcadeKit.showPlayerName(playerName, ['playerNameDisplayFail']);
        }

        function triggerVictory() {
            if (cartAnimId) cancelAnimationFrame(cartAnimId);
            cartAnimId = null;
            document.getElementById('gameScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'flex';
            document.getElementById('victoryScore').innerText = score;
            ArcadeKit.showPlayerName(playerName, ['playerNameDisplayWin']);
        }

        function restartDesignSession() {
            startDesignSession();
        }
