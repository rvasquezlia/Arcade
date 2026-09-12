        // OUTBREAK SCENARIO BANK — Exponential Growth & Decay: y = a * b^x
        // Every target (a, b) pair below was hand-verified by plugging back
        // into y = a * b^x. `checkDay` is the day the field report's stated
        // checkpoint actually lands on (used for the on-screen 🎯 marker);
        // it does not change the correct (a, b) answer, only where the
        // "contained by day N" flag is drawn.
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
                a: 50, b: 2.00, checkDay: 1
            },
            {
                title: "Clinic Case Tripling",
                prompt: "A clinic begins monitoring <strong>20 patients</strong> on day 0, and confirmed cases <strong>triple every day</strong>. Set \\( a \\) and \\( b \\) to match.",
                a: 20, b: 3.00, checkDay: 1
            },
            {
                title: "Community Spread Factor",
                prompt: "A neighborhood starts with <strong>10 cases</strong>, and case counts <strong>grow by a factor of 1.5 (a 50% increase) each day</strong>. Set \\( a \\) and \\( b \\) to match.",
                a: 10, b: 1.50, checkDay: 1
            },
            {
                title: "Medication Half-Life Decay",
                prompt: "A dose starts at <strong>200 mg</strong> and decays to <strong>25% remaining after 2 half-lives</strong> worth of time. Set \\( a \\) and the per-half-life decay factor \\( b \\) so that \\( b^2 = 0.25 \\).",
                a: 200, b: 0.50, checkDay: 2
            },
            {
                title: "Quarantine Case Drop",
                prompt: "A quarantine zone starts with <strong>80 active cases</strong>, and the case count is <strong>cut by 75% each day</strong> (drops to one-quarter). Set \\( a \\) and \\( b \\) to match.",
                a: 80, b: 0.25, checkDay: 1
            },
            {
                title: "Lab Culture Growth",
                prompt: "A lab sample starts with <strong>5 bacteria cultures</strong>, and the count <strong>doubles every hour</strong>. Set \\( a \\) and \\( b \\) to match.",
                a: 5, b: 2.00, checkDay: 1
            },
            {
                title: "Rising Report Trend",
                prompt: "Health reports begin at <strong>40 cases</strong> on day 0, and the daily total <strong>increases by 25% each day</strong>. Find the growth factor \\( b \\) and set \\( a \\) and \\( b \\) to match.",
                a: 40, b: 1.25, checkDay: 1
            },
            {
                title: "Dose Stock Spoilage",
                prompt: "A pharmacy starts with <strong>150 doses</strong> in stock, and the usable supply <strong>decreases by 20% each day</strong> due to spoilage. Find the decay factor \\( b \\) and set \\( a \\) and \\( b \\) to match.",
                a: 150, b: 0.80, checkDay: 1
            },
            {
                title: "Deep Decay Dosage",
                prompt: "A dose starts at <strong>300 mg</strong> and decays to <strong>16% remaining after 2 half-lives</strong> worth of time. Set \\( a \\) and the per-half-life decay factor \\( b \\) so that \\( b^2 = 0.16 \\).",
                a: 300, b: 0.40, checkDay: 2
            },
            {
                title: "Treatment Cycle Decay",
                prompt: "A regional count starts at <strong>25 active infections</strong> and decays to <strong>49% remaining after 2 treatment cycles</strong>. Set \\( a \\) and the per-cycle decay factor \\( b \\) so that \\( b^2 = 0.49 \\).",
                a: 25, b: 0.70, checkDay: 2
            },
            {
                title: "Day-One Growth Checkpoint",
                prompt: "A cluster starts with <strong>100 cases on day 0</strong>. After <strong>1 day</strong>, the count has risen to <strong>150 cases</strong>. Use \\( y(1) = a \\cdot b \\) to find \\( b \\), then set \\( a \\) and \\( b \\) to match.",
                a: 100, b: 1.50, checkDay: 1
            },
            {
                title: "Day-One Decay Checkpoint",
                prompt: "A medication dose starts at <strong>80 mg on day 0</strong>. After <strong>1 day</strong>, only <strong>60 mg</strong> remains in the bloodstream. Use \\( y(1) = a \\cdot b \\) to find \\( b \\), then set \\( a \\) and \\( b \\) to match.",
                a: 80, b: 0.75, checkDay: 1
            },
            {
                title: "Hour-One Growth Checkpoint",
                prompt: "A petri dish starts with <strong>10 organisms</strong>. After <strong>1 hour</strong>, there are <strong>30 organisms</strong>. Use \\( y(1) = a \\cdot b \\) to find \\( b \\), then set \\( a \\) and \\( b \\) to match.",
                a: 10, b: 3.00, checkDay: 1
            },
            {
                title: "Quarantine Cycle Decay",
                prompt: "A ward starts with <strong>60 active cases</strong> and decays to <strong>81% remaining after 2 quarantine cycles</strong>. Set \\( a \\) and the per-cycle decay factor \\( b \\) so that \\( b^2 = 0.81 \\).",
                a: 60, b: 0.90, checkDay: 2
            },
            {
                title: "Early Cluster Growth",
                prompt: "A cluster starts with <strong>15 confirmed cases</strong> and <strong>doubles every day</strong> during the initial spread phase. Set \\( a \\) and \\( b \\) to match.",
                a: 15, b: 2.00, checkDay: 1
            },
            {
                title: "Antiviral Stock Decay",
                prompt: "A stockpile starts with <strong>120 units</strong> of antiviral medication and decays to <strong>4% remaining after 2 dosing intervals</strong>. Set \\( a \\) and the per-interval decay factor \\( b \\) so that \\( b^2 = 0.04 \\).",
                a: 120, b: 0.20, checkDay: 2
            },
            {
                title: "Community Spread Rise",
                prompt: "A district starts with <strong>90 initial cases</strong>, and daily totals <strong>grow by 20% each day</strong> due to community spread. Find the growth factor \\( b \\) and set \\( a \\) and \\( b \\) to match.",
                a: 90, b: 1.20, checkDay: 1
            },
            {
                title: "Dose Half-Life Decay",
                prompt: "A dose starts at <strong>45 mg</strong> and decays to <strong>36% remaining after 2 half-lives</strong> worth of time. Set \\( a \\) and the per-half-life decay factor \\( b \\) so that \\( b^2 = 0.36 \\).",
                a: 45, b: 0.60, checkDay: 2
            }
        ];

        const ROUNDS_PER_SESSION = 11;
        const A_MAX = 300;
        const B_MAX = 3;

        // Live Outbreak Simulator constants
        const TOTAL_DOTS = 90;
        const MAX_DAY = 6;
        const HOLD_MS = 700; // pause at the end of a replay cycle before looping
        const ARENA = { left: 14, right: 386, top: 14, bottom: 208 };
        const GRAPH = { left: 42, right: 388, top: 226, bottom: 328 };

        // NARRATOR VOICE LINES — overly dramatic news-anchor epidemiologist.
        const narratorIntros = [
            "🎙️ This just in: the lab cameras are rolling and the population is NOT thrilled about it.",
            "🎙️ Grab your coffee, Doctor — the numbers are about to get dramatic.",
            "🎙️ Breaking: microscopic chaos detected. Experts recommend... more graphs.",
            "🎙️ The petri dish never sleeps, and neither does our containment protocol.",
            "🎙️ Ladies, gentlemen, and lab rats: another outbreak has entered the chat.",
            "🎙️ Our simulator is doing its best impression of a math problem with feelings.",
            "🎙️ Cue dramatic music: the dots are multiplying and someone must be blamed (it's math).",
            "🎙️ Field correspondent reporting live from inside a Petri dish. It's cramped in here."
        ];
        const containLines = [
            "🎉 CONTAINED! The outbreak has been mathematically humbled.",
            "🧤 Nailed it! Somewhere, a tiny cartoon virus is filing a complaint.",
            "🥼 Textbook containment. Your lab coat has never been this clean.",
            "📉 The curve bent to your will. Exponents fear you now.",
            "🏆 Precision modeling! The population thanks you (quietly, from a distance)."
        ];
        const missLines = [
            "📈 Yikes — your curve went rogue and so did the outbreak.",
            "🚨 The numbers disagreed with you. Loudly.",
            "🧪 Close, but the virus filed a very successful appeal.",
            "😬 That model needed more decimal places and less vibes.",
            "🦠 The dots are unimpressed. On to the next scenario."
        ];

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
        let animationFrameId = null;
        let simStartTime = 0;

        // Live-sim population (regenerated once per scenario)
        let dotPositions = [];
        let orderRank = []; // orderRank[dotIndex] = spread order (0 = patient zero)

        // Cached theme colors — refreshed on load & on theme toggle, not every frame.
        let themeColors = {};

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
            refreshThemeColors();
        }

        function cssVar(name, fallback) {
            const v = getComputedStyle(document.body).getPropertyValue(name);
            return (v && v.trim()) || fallback;
        }

        function refreshThemeColors() {
            themeColors = {
                canvasBg: cssVar('--canvas-bg', '#050b12'),
                grid: cssVar('--grid-color', '#16293a'),
                axis: cssVar('--axis-color', '#2dd4bf'),
                graphText: cssVar('--graph-text-color', '#6d8299'),
                curve: cssVar('--curve-color', '#facc15'),
                targetCurve: cssVar('--target-curve-color', 'rgba(248, 113, 113, 0.55)'),
                playhead: cssVar('--playhead-color', 'rgba(228, 237, 245, 0.35)'),
                stripBg: cssVar('--strip-bg-color', 'rgba(0,0,0,0.2)'),
                dotHealthy: cssVar('--dot-healthy-color', '#2c4a5e'),
                dotHealthyBorder: cssVar('--dot-healthy-border', '#3d6580'),
                dotInfected: cssVar('--dot-infected-color', '#f87171'),
                dotInfectedGlow: cssVar('--dot-infected-glow', 'rgba(248,113,113,0.6)')
            };
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
            refreshThemeColors();
        });

        // Build a fresh random population for the current scenario, plus a
        // "spread order" — a greedy nearest-neighbor chain from a random
        // patient zero, so infection visually grows outward through
        // neighboring dots rather than flickering randomly.
        function generatePopulation() {
            dotPositions = [];
            for (let i = 0; i < TOTAL_DOTS; i++) {
                dotPositions.push({
                    x: ARENA.left + Math.random() * (ARENA.right - ARENA.left),
                    y: ARENA.top + Math.random() * (ARENA.bottom - ARENA.top)
                });
            }
            const n = dotPositions.length;
            const visited = new Array(n).fill(false);
            const order = [];
            let current = Math.floor(Math.random() * n);
            order.push(current);
            visited[current] = true;
            for (let k = 1; k < n; k++) {
                let best = -1;
                let bestDist = Infinity;
                for (let i = 0; i < n; i++) {
                    if (visited[i]) continue;
                    const dx = dotPositions[i].x - dotPositions[current].x;
                    const dy = dotPositions[i].y - dotPositions[current].y;
                    const d = dx * dx + dy * dy;
                    if (d < bestDist) { bestDist = d; best = i; }
                }
                order.push(best);
                visited[best] = true;
                current = best;
            }
            orderRank = new Array(n);
            order.forEach((dotIdx, rank) => { orderRank[dotIdx] = rank; });
        }

        // Reads the typed a/b fields (may be NaN if blank/invalid).
        function readParamInputs() {
            playerA = parseFloat(document.getElementById('inputA').value);
            playerB = parseFloat(document.getElementById('inputB').value);
        }

        function onParamChange() {
            if (isLocked) return;
            readParamInputs();
            updateControlsDisplay();
            updateMatchQuality();
            restartSimulation();
        }

        function updateControlsDisplay() {
            const aTxt = isNaN(playerA) ? '—' : playerA;
            const bTxt = isNaN(playerB) ? '—' : playerB.toFixed(2);
            document.getElementById('modelReadout').innerText = `a=${aTxt}, b=${bTxt}`;
        }

        // Live proximity feedback (does not reveal the exact target values).
        function updateMatchQuality() {
            const line = document.getElementById('matchQualityLine');
            const sData = activeScenarios[currentScenarioIndex];
            if (!sData) return;

            if (isNaN(playerA) || isNaN(playerB)) {
                line.textContent = '🔴 Type your model above to launch the live simulation.';
                return;
            }
            const err = combinedError(playerA, playerB, sData);
            if (err < 0.02) {
                line.textContent = '✅ LOCKED-IN RANGE — deploy when ready!';
            } else if (err < 0.08) {
                line.textContent = '🟢 Very close — fine-tune a touch more.';
            } else if (err < 0.25) {
                line.textContent = '🟡 Getting warmer...';
            } else {
                line.textContent = '🔴 Way off — recheck the field report.';
            }
        }

        function combinedError(a, b, sData) {
            const normA = Math.abs(a - sData.a) / A_MAX;
            const normB = Math.abs(b - sData.b) / B_MAX;
            return Math.sqrt(normA * normA + normB * normB);
        }

        // Cancel any in-flight animation loop and start a brand new one from
        // Day 0, so loops never stack and every parameter change replays
        // the simulation immediately from the start.
        function restartSimulation() {
            if (animationFrameId !== null) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
            simStartTime = performance.now();
            animationFrameId = requestAnimationFrame(simTick);
        }

        function simTick(now) {
            const cycleSeconds = MAX_DAY + (HOLD_MS / 1000);
            const elapsed = (now - simStartTime) / 1000;
            const tInCycle = elapsed % cycleSeconds;
            const t = Math.min(tInCycle, MAX_DAY);

            drawFrame(t);

            document.getElementById('simDayReadout').innerText = `${t.toFixed(1)} / ${MAX_DAY}`;

            animationFrameId = requestAnimationFrame(simTick);
        }

        function drawFrame(t) {
            if (!canvas || !ctx) return;
            const sData = activeScenarios[currentScenarioIndex];
            if (!sData) return;

            const rA = isNaN(playerA) ? 0 : Math.max(0, playerA);
            const rB = isNaN(playerB) ? 0 : Math.max(0, playerB);

            // Shared vertical scale so the dot swarm and the mini-graph agree.
            let refMax = Math.max(
                sData.a * Math.pow(sData.b, MAX_DAY),
                sData.a,
                rA,
                rA * Math.pow(rB, MAX_DAY),
                10
            );
            if (!isFinite(refMax) || refMax <= 0) refMax = 10;
            refMax = Math.min(refMax, 1e7);

            // Clear
            ctx.fillStyle = themeColors.canvasBg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            drawPopulation(t, rA, rB, refMax);
            drawGraphStrip(t, sData, rA, rB, refMax);

            const infectedNow = infectedCountAt(t, rA, rB, refMax);
            document.getElementById('simInfectedReadout').innerText = `${infectedNow} / ${TOTAL_DOTS}`;
        }

        function infectedCountAt(t, a, b, refMax) {
            const y = a * Math.pow(b, t);
            const fraction = isFinite(y) ? Math.max(0, Math.min(1, y / refMax)) : 0;
            return Math.round(fraction * TOTAL_DOTS);
        }

        function drawPopulation(t, rA, rB, refMax) {
            const infectedNow = infectedCountAt(t, rA, rB, refMax);

            // divider between arena and graph strip
            ctx.strokeStyle = themeColors.grid;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, ARENA.bottom + 8);
            ctx.lineTo(canvas.width, ARENA.bottom + 8);
            ctx.stroke();

            for (let i = 0; i < dotPositions.length; i++) {
                const p = dotPositions[i];
                const rank = orderRank[i];
                const infected = rank < infectedNow;
                const frontier = infected && rank === infectedNow - 1;

                if (infected) {
                    const pulse = frontier ? (1.4 + Math.sin(t * 6 + i) * 0.6) : 1;
                    if (frontier) {
                        ctx.beginPath();
                        ctx.fillStyle = themeColors.dotInfectedGlow;
                        ctx.arc(p.x, p.y, 6 * pulse, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    ctx.beginPath();
                    ctx.fillStyle = themeColors.dotInfected;
                    ctx.arc(p.x, p.y, 3.4, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    ctx.beginPath();
                    ctx.fillStyle = themeColors.dotHealthy;
                    ctx.strokeStyle = themeColors.dotHealthyBorder;
                    ctx.lineWidth = 1;
                    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                }
            }
        }

        function drawGraphStrip(t, sData, rA, rB, refMax) {
            const { left, right, top, bottom } = GRAPH;
            const plotW = right - left;
            const plotH = bottom - top;

            ctx.fillStyle = themeColors.stripBg;
            ctx.fillRect(left - 8, top - 6, plotW + 16, plotH + 14);

            ctx.strokeStyle = themeColors.axis;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(left, top);
            ctx.lineTo(left, bottom);
            ctx.lineTo(right, bottom);
            ctx.stroke();

            const xToPx = (day) => left + (Math.min(day, MAX_DAY) / MAX_DAY) * plotW;
            const yToPx = (v) => {
                const c = Math.max(0, Math.min(v, refMax));
                return top + plotH - (c / refMax) * plotH;
            };

            // Faint target curve (dashed) — the actual answer curve
            ctx.strokeStyle = themeColors.targetCurve;
            ctx.lineWidth = 2;
            ctx.setLineDash([4, 3]);
            ctx.beginPath();
            for (let x = 0; x <= MAX_DAY; x += 0.2) {
                const v = sData.a * Math.pow(sData.b, x);
                const px = xToPx(x), py = yToPx(v);
                if (x === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.stroke();
            ctx.setLineDash([]);

            // Player's live curve (solid)
            if (!isNaN(playerA) && !isNaN(playerB)) {
                ctx.strokeStyle = themeColors.curve;
                ctx.lineWidth = 2.5;
                ctx.beginPath();
                for (let x = 0; x <= MAX_DAY; x += 0.2) {
                    const v = rA * Math.pow(rB, x);
                    const px = xToPx(x), py = yToPx(v);
                    if (x === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                }
                ctx.stroke();
            }

            // 🎯 Containment-check marker at this scenario's checkDay
            const cx = xToPx(sData.checkDay);
            const cv = sData.a * Math.pow(sData.b, sData.checkDay);
            const cy = yToPx(cv);
            ctx.strokeStyle = themeColors.targetCurve;
            ctx.lineWidth = 1;
            ctx.setLineDash([2, 3]);
            ctx.beginPath();
            ctx.moveTo(cx, top);
            ctx.lineTo(cx, bottom);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.beginPath();
            ctx.fillStyle = themeColors.targetCurve;
            ctx.arc(cx, cy, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.font = '11px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('🎯', cx, Math.max(top - 4, cy - 8) < top ? top + 10 : cy - 9);

            // Playhead — where the live animation currently is
            const px = xToPx(t);
            ctx.strokeStyle = themeColors.playhead;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(px, top);
            ctx.lineTo(px, bottom);
            ctx.stroke();

            // Day tick labels
            ctx.fillStyle = themeColors.graphText;
            ctx.font = '9px "IBM Plex Mono", monospace';
            ctx.textAlign = 'center';
            [0, sData.checkDay, MAX_DAY].forEach((d) => {
                ctx.fillText('D' + d, xToPx(d), bottom + 12);
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

            playerA = NaN;
            playerB = NaN;
            document.getElementById('inputA').value = '';
            document.getElementById('inputB').value = '';
            updateControlsDisplay();

            const sData = activeScenarios[currentScenarioIndex];

            document.getElementById('scenarioHeader').innerText = `Scenario ${currentScenarioIndex + 1}: ${sData.title}`;
            document.getElementById('scenarioCounter').innerText = `${(currentScenarioIndex + 1).toString().padStart(2, '0')} / ${activeScenarios.length}`;
            document.getElementById('scoreDisplay').innerText = `${score} PTS`;
            updateContainmentDisplay();

            document.getElementById('scenarioPromptText').innerHTML = sData.prompt;
            document.getElementById('narratorLine').innerText =
                narratorIntros[Math.floor(Math.random() * narratorIntros.length)];
            updateMatchQuality();

            generatePopulation();
            restartSimulation();

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

            readParamInputs();
            const feedback = document.getElementById('feedbackLine');

            if (isNaN(playerA) || isNaN(playerB)) {
                feedback.className = 'feedback-line text-error';
                feedback.innerText = '⚠️ Type a value for both a and b before deploying containment.';
                return;
            }

            isLocked = true;

            const sData = activeScenarios[currentScenarioIndex];

            const normA = Math.abs(playerA - sData.a) / A_MAX;
            const normB = Math.abs(playerB - sData.b) / B_MAX;
            const combErr = Math.sqrt(normA * normA + normB * normB);

            const isExact = (Math.abs(playerA - sData.a) < 0.5) && (Math.abs(playerB - sData.b) < 0.01);

            if (isExact) {
                score += 100;
                containment = Math.min(100, containment + 15);
                updateContainmentDisplay();

                const line = containLines[Math.floor(Math.random() * containLines.length)];
                feedback.className = 'feedback-line text-success';
                feedback.innerText = `${line} // a=${sData.a}, b=${sData.b.toFixed(2)} // +100 PTS`;

                setTimeout(() => {
                    currentScenarioIndex++;
                    if (currentScenarioIndex >= activeScenarios.length) {
                        triggerVictory();
                    } else {
                        loadScenario();
                    }
                }, 1300);

            } else {
                const penalty = Math.min(40, Math.round(15 + combErr * 60));
                containment -= penalty;
                updateContainmentDisplay();

                const line = missLines[Math.floor(Math.random() * missLines.length)];
                feedback.className = 'feedback-line text-error';
                feedback.innerText = `${line} Target was a=${sData.a}, b=${sData.b.toFixed(2)}. -${penalty}% Containment`;

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

        function stopSimulation() {
            if (animationFrameId !== null) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        }

        function triggerFail() {
            stopSimulation();
            document.getElementById('gameScreen').style.display = 'none';
            document.getElementById('failScreen').style.display = 'flex';
            document.getElementById('failScore').innerText = score;
            ArcadeKit.showPlayerName(playerName, ['playerNameDisplayFail']);
        }

        function triggerVictory() {
            stopSimulation();
            document.getElementById('gameScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'flex';
            document.getElementById('victoryScore').innerText = score;
            ArcadeKit.showPlayerName(playerName, ['playerNameDisplayWin']);
        }

        function restartOutbreakSession() {
            startOutbreakSession();
        }
