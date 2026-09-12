        // SPATIAL TARGETING MISSION DATA BANK
        // hasIntercept: true means once the coordinate lock is exact, a hostile
        // blip sweeps across the radar and can be clicked for a bonus.
        const tacticalMissions = [
            {
                title: "Quadrant II Intercept",
                prompt: "Sensors are picking up a hostile drone loitering at Quadrant II coordinates \\( (-6, 5) \\). Nothing dramatic yet — just point, click, and lock your reticle on that exact position.",
                targetX: -6,
                targetY: 5,
                hasIntercept: false
            },
            {
                title: "Y-Axis Stealth Reflection",
                prompt: "A stealth vessel is idling at \\( A(4, 7) \\), smug in its cloaking field. Reflect it across the y-axis and lock your reticle on the mirrored coordinate — and stay sharp, because once you're locked in, this one doesn't sit still.",
                targetX: -4,
                targetY: 7,
                hasIntercept: true
            },
            {
                title: "X-Axis Mirror Lock",
                prompt: "An outpost beacon at \\( B(-3, -8) \\) is bouncing its signal off the x-axis like it's showing off. Reflect it across the x-axis and lock the reticle on the mirrored coordinate.",
                targetX: -3,
                targetY: 8,
                hasIntercept: false
            },
            {
                title: "Vector Translation Shift",
                prompt: "An allied probe starts at \\( P(2, -4) \\) and translates by vector shift \\( [-7, +9] \\). Plot its final translated location — and once you're locked in, keep your trigger finger ready. The radar's about to get busy.",
                targetX: -5,
                targetY: 5,
                hasIntercept: true
            },
            {
                title: "Trajectory Midpoint Relaying",
                prompt: "Deploy a relay satellite at the exact midpoint between Command Base \\( (-8, -6) \\) and Defense Grid \\( (4, 2) \\). Halfway measures only count when they're mathematically exact.",
                targetX: -2,
                targetY: -2,
                hasIntercept: false
            },
            {
                title: "Linear Trajectory Function",
                prompt: "An interceptor is cruising along line \\( y = 2x - 3 \\). Find its coordinate position when \\( x = 4 \\) and lock on — then brace yourself, because something is about to streak across this radar, and it will not wait politely.",
                targetX: 4,
                targetY: 5,
                hasIntercept: true
            },
            {
                title: "Origin Radial Lock",
                prompt: "Lock the reticle in Quadrant IV at a distance of 5 units from the origin \\( (0, 0) \\), with an X-coordinate of \\( 3 \\). Yes, it's a 3-4-5 triangle in disguise. I see you noticing.",
                targetX: 3,
                targetY: -4,
                hasIntercept: false
            },
            {
                title: "Negative Slope Trajectory",
                prompt: "A craft is gliding along trajectory \\( y = -x + 1 \\). Determine its Y-coordinate when \\( x = -7 \\) and lock the reticle — and once you're dialed in, keep your eyes on the grid. Things get twitchy fast.",
                targetX: -7,
                targetY: 8,
                hasIntercept: true
            },
            {
                title: "Horizontal Distance Offset",
                prompt: "A station sits at \\( (-9, -3) \\). A supply pod deploys 12 units directly right along the same horizontal line. Plot the pod's landing coordinate — gravity's not involved here, but accuracy still is.",
                targetX: 3,
                targetY: -3,
                hasIntercept: false
            },
            {
                title: "Origin Reflection Lock",
                prompt: "A signal originates at \\( (5, -6) \\). Lock the reticle on its point reflection through the origin \\( (0, 0) \\) — final sector, final contact, and this one moves like it knows the mission's almost over.",
                targetX: -5,
                targetY: 6,
                hasIntercept: true
            }
        ];

        // TACTICAL-AI VOICE LINE BANKS
        const aiBriefLines = [
            "Radar Operator's Log: coffee levels critical, sarcasm levels stable.",
            "Reminder: the grid does not care about your feelings, only your coordinates.",
            "Tactical tip: guessing is a strategy. A bad one, but a strategy.",
            "Fun fact: this radar has seen things. Mostly your previous misses.",
            "Motivational reminder: even radar dishes have off days. This does not appear to be one of them for you. Yet.",
            "Sensor note: hostile contacts do not respect the order of operations. Rude, honestly.",
            "Command directive: precision requested, perfection optional, sarcasm guaranteed.",
            "Diagnostic complete. Radar is fine. You are the variable I'm less sure about."
        ];
        const aiSuccessLines = [
            "TARGET LOCK CONFIRMED! Somewhere, a geometry teacher sheds a proud tear.",
            "Exact coordinates. I'll allow myself one small, dignified beep of approval.",
            "Direct hit. Was that skill or luck? I'm choosing to believe it was math.",
            "Precision like that almost makes me trust humans with radar equipment.",
            "Flawless lock. Filing this under 'surprisingly competent.'"
        ];
        const aiLockLines = [
            "TARGET COORDINATES CONFIRMED. Try not to celebrate yet.",
            "Lock acquired. I've seen worse. Barely.",
            "Coordinates verified. Don't let it go to your head.",
            "Exact match. I'm mildly impressed, and I don't impress easily.",
            "Vector confirmed. Brace for the fun part."
        ];
        const aiMissLines = [
            "TARGET MISSED. The drone remains smug and entirely unbothered.",
            "Not quite. Somewhere, the coordinate plane weeps a little.",
            "Off target. I've recalculated your odds of success. They're... optimistic.",
            "Miss registered. Somewhere, Pythagoras sighs.",
            "That is not where I told the hostile contact to hide. Try again."
        ];
        const aiInterceptHitLines = [
            "CONTACT NEUTRALIZED! Somewhere a hostile drone regrets its life choices.",
            "Intercepted! Textbook timing — mostly because I said so.",
            "Direct hit on the blip. Updating my threat models to fear you slightly.",
            "Bullseye. Clean, fast, and only mildly reckless."
        ];
        const aiInterceptMissLines = [
            "Contact evaded your trigger finger, but the coordinate lock still holds.",
            "Missed the intercept window — the blip is now bragging about it. Lock still counts.",
            "No bonus this round; the target zipped by like it had somewhere better to be. Your position lock still stands.",
            "Intercept window closed. The math was right even if the reflexes were... optional."
        ];

        // GAME STATE
        let currentMissionIndex = 0;
        let score = 0;
        let battery = 100;
        let streak = 0;
        let activeMissions = [];
        let isDarkMode = true;
        let isLocked = false;
        let playerName = '';

        // Player Reticle Selection
        let playerX = 0;
        let playerY = 0;

        // Canvas Context & Sweep Animation Angle
        let canvas, ctx;
        let sweepAngle = 0;

        // Intercept Blip State
        let interceptActive = false;
        let interceptResolved = true;
        let interceptStartTime = 0;
        const interceptDuration = 3400; // ms — generous, slow sweep across the whole canvas
        let interceptStartX = 0;
        let interceptEndX = 0;
        let interceptRowY = 0;
        const interceptHitRadius = 26; // px — forgiving click tolerance
        let currentBlipX = -9999;
        let currentBlipY = -9999;
        let interceptTimeoutId = null;

        // Shuffle Utility
        function shuffleArray(arr) {
            const temp = [...arr];
            for (let i = temp.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [temp[i], temp[j]] = [temp[j], temp[i]];
            }
            return temp;
        }

        function pickRandom(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }

        // Theme Toggle
        function toggleTheme() {
            isDarkMode = !isDarkMode;
            const body = document.body;
            const btn = document.getElementById('themeBtn');

            if (isDarkMode) {
                body.classList.remove('light-mode');
                btn.innerText = '[ DARK GRID ]';
            } else {
                body.classList.add('light-mode');
                btn.innerText = '[ LIGHT GRID ]';
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
            canvas = document.getElementById('radarCanvas');
            ctx = canvas.getContext('2d');

            // Canvas Click to Plot Coordinates (or intercept a blip)
            canvas.addEventListener('mousedown', handleCanvasClick);

            // Start Continuous Canvas Animation Loop (single persistent loop —
            // the intercept blip is drawn from within this same loop, never a
            // second requestAnimationFrame chain)
            requestAnimationFrame(drawCanvasLoop);
        });

        // Convert Grid Coordinate (-10 to 10) to Canvas Pixel
        function gridToPixelX(gx) {
            const width = canvas.width;
            return width / 2 + (gx * (width / 22));
        }

        function gridToPixelY(gy) {
            const height = canvas.height;
            return height / 2 - (gy * (height / 22));
        }

        // Convert Canvas Pixel to Grid Coordinate (-10 to 10)
        function pixelToGridX(px) {
            const width = canvas.width;
            const raw = (px - width / 2) / (width / 22);
            return Math.max(-10, Math.min(10, Math.round(raw)));
        }

        function pixelToGridY(py) {
            const height = canvas.height;
            const raw = (height / 2 - py) / (height / 22);
            return Math.max(-10, Math.min(10, Math.round(raw)));
        }

        // Handle Canvas Clicking
        function handleCanvasClick(e) {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            const clickX = (e.clientX - rect.left) * scaleX;
            const clickY = (e.clientY - rect.top) * scaleY;

            // Intercept phase takes priority: clicking near the moving blip
            // fires; clicking elsewhere is simply ignored (no penalty) so the
            // player can keep trying for the whole window.
            if (interceptActive) {
                const ddx = clickX - currentBlipX;
                const ddy = clickY - currentBlipY;
                const dist = Math.sqrt(ddx * ddx + ddy * ddy);
                if (dist <= interceptHitRadius) {
                    resolveIntercept(true);
                }
                return;
            }

            if (isLocked) return;

            playerX = pixelToGridX(clickX);
            playerY = pixelToGridY(clickY);

            updateControlsDisplay();
        }

        // Update Sliders based on mouse clicks or slider input
        function updateFromSliders() {
            if (isLocked) return;
            playerX = parseInt(document.getElementById('sliderX').value);
            playerY = parseInt(document.getElementById('sliderY').value);
            updateControlsDisplay();
        }

        function updateControlsDisplay() {
            document.getElementById('sliderX').value = playerX;
            document.getElementById('sliderY').value = playerY;
            document.getElementById('valXDisplay').innerText = playerX;
            document.getElementById('valYDisplay').innerText = playerY;
            document.getElementById('selectedCoordDisplay').innerText = `(${playerX}, ${playerY})`;
        }

        // Continuous Canvas Radar Loop
        function drawCanvasLoop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const w = canvas.width;
            const h = canvas.height;
            const step = w / 22;

            // Colors based on Mode
            const gridColor = isDarkMode ? '#1a263d' : '#cbd5e1';
            const axisColor = isDarkMode ? '#00f0ff' : '#0284c7';
            const textColor = isDarkMode ? '#64748b' : '#475569';

            // Draw Background Grid
            ctx.lineWidth = 1;
            ctx.strokeStyle = gridColor;

            for (let i = 0; i <= 22; i++) {
                // Vertical lines
                ctx.beginPath();
                ctx.moveTo(i * step, 0);
                ctx.lineTo(i * step, h);
                ctx.stroke();

                // Horizontal lines
                ctx.beginPath();
                ctx.moveTo(0, i * step);
                ctx.lineTo(w, i * step);
                ctx.stroke();
            }

            // Draw X and Y Axes
            ctx.lineWidth = 2;
            ctx.strokeStyle = axisColor;

            // X-Axis
            ctx.beginPath();
            ctx.moveTo(0, h / 2);
            ctx.lineTo(w, h / 2);
            ctx.stroke();

            // Y-Axis
            ctx.beginPath();
            ctx.moveTo(w / 2, 0);
            ctx.lineTo(w / 2, h);
            ctx.stroke();

            // Axis Number Labels
            ctx.fillStyle = textColor;
            ctx.font = '10px "Share Tech Mono", monospace';
            ctx.textAlign = 'center';

            for (let g = -10; g <= 10; g += 5) {
                if (g !== 0) {
                    // X Numbers
                    ctx.fillText(g, gridToPixelX(g), h / 2 + 14);
                    // Y Numbers
                    ctx.fillText(g, w / 2 - 12, gridToPixelY(g) + 3);
                }
            }

            // Animated Radar Sweep
            sweepAngle += 0.02;
            ctx.save();
            ctx.translate(w / 2, h / 2);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, w / 2, sweepAngle, sweepAngle + 0.2);
            ctx.closePath();
            ctx.fillStyle = isDarkMode ? 'rgba(0, 240, 255, 0.08)' : 'rgba(2, 132, 199, 0.08)';
            ctx.fill();
            ctx.restore();

            // Draw Player Reticle Selection
            const px = gridToPixelX(playerX);
            const py = gridToPixelY(playerY);

            ctx.strokeStyle = isDarkMode ? '#ffb703' : '#d97706';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(px, py, 9, 0, Math.PI * 2);
            ctx.stroke();

            // Reticle Crosshair
            ctx.beginPath();
            ctx.moveTo(px - 14, py); ctx.lineTo(px + 14, py);
            ctx.moveTo(px, py - 14); ctx.lineTo(px, py + 14);
            ctx.stroke();

            // Draw the Intercept Blip (if a window is active)
            if (interceptActive) {
                const elapsed = performance.now() - interceptStartTime;
                const t = Math.min(1, elapsed / interceptDuration);
                currentBlipX = interceptStartX + (interceptEndX - interceptStartX) * t;
                currentBlipY = interceptRowY + Math.sin(t * Math.PI * 4) * 6;

                ctx.save();
                ctx.fillStyle = isDarkMode ? '#ff2a6d' : '#dc2626';
                ctx.beginPath();
                ctx.arc(currentBlipX, currentBlipY, 8 + Math.sin(elapsed / 120) * 2, 0, Math.PI * 2);
                ctx.fill();

                ctx.strokeStyle = isDarkMode ? 'rgba(255, 42, 109, 0.55)' : 'rgba(220, 38, 38, 0.55)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(currentBlipX, currentBlipY, 14 + ((elapsed / 40) % 12), 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();

                // Keep the timer bar in sync with the same clock driving the blip
                const fill = document.getElementById('interceptTimerFill');
                if (fill) fill.style.width = `${Math.max(0, 100 - t * 100)}%`;

                if (elapsed >= interceptDuration && !interceptResolved) {
                    resolveIntercept(false);
                }
            }

            requestAnimationFrame(drawCanvasLoop);
        }

        // Start Mission Game
        function startMission() {
            const name = ArcadeKit.requireName('playerNameInput', 'playerNameError');
            if (!name) return;
            playerName = name;

            currentMissionIndex = 0;
            score = 0;
            battery = 100;
            streak = 0;
            activeMissions = shuffleArray(tacticalMissions);

            // Defensive cleanup in case any intercept timer was somehow still
            // pending from a prior run (should never happen, but never stack loops)
            interceptActive = false;
            interceptResolved = true;
            if (interceptTimeoutId) { clearTimeout(interceptTimeoutId); interceptTimeoutId = null; }
            const banner = document.getElementById('interceptBanner');
            if (banner) banner.style.display = 'none';

            document.getElementById('startScreen').style.display = 'none';
            document.getElementById('failScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'none';
            document.getElementById('gameScreen').style.display = 'block';

            loadMission();
        }

        // Load Mission Item
        function loadMission() {
            isLocked = false;
            document.getElementById('feedbackLine').innerText = '';
            document.getElementById('aiQuipLine').innerText = pickRandom(aiBriefLines);

            // Reset player reticle to origin
            playerX = 0;
            playerY = 0;
            updateControlsDisplay();

            const mData = activeMissions[currentMissionIndex];

            // Update Header & HUD
            document.getElementById('sectorHeader').innerText = `Sector ${currentMissionIndex + 1}: ${mData.title}`;
            document.getElementById('sectorCounter').innerText = `${currentMissionIndex + 1} / ${activeMissions.length}`;
            document.getElementById('scoreDisplay').innerText = `${score} PTS`;
            updateStreakDisplay();
            updateBatteryDisplay();

            // Render Prompt
            document.getElementById('missionPromptText').innerHTML = mData.prompt;

            renderMath();
        }

        function updateBatteryDisplay() {
            const fill = document.getElementById('batteryFill');
            fill.style.width = `${Math.max(0, battery)}%`;

            if (battery > 50) {
                fill.style.backgroundColor = 'var(--accent-green)';
            } else if (battery > 25) {
                fill.style.backgroundColor = 'var(--accent-gold)';
            } else {
                fill.style.backgroundColor = 'var(--accent-red)';
            }
        }

        function updateStreakDisplay() {
            const el = document.getElementById('streakDisplay');
            if (el) el.innerText = `${streak}x`;
        }

        // Advance to next sector (or victory) after a short readable delay
        function advanceAfterDelay(ms) {
            setTimeout(() => {
                currentMissionIndex++;
                if (currentMissionIndex >= activeMissions.length) {
                    triggerVictory();
                } else {
                    loadMission();
                }
            }, ms);
        }

        // Execute Target Lock Action
        function executeVectorLock() {
            if (isLocked) return;
            isLocked = true;

            const mData = activeMissions[currentMissionIndex];
            const feedback = document.getElementById('feedbackLine');

            // Calculate Distance Variance
            const dx = Math.abs(playerX - mData.targetX);
            const dy = Math.abs(playerY - mData.targetY);
            const distanceError = Math.sqrt(dx * dx + dy * dy);

            if (distanceError === 0) {
                // Exact Lock Hit
                streak++;
                const comboBonus = streak >= 2 ? Math.min(50, (streak - 1) * 10) : 0;
                score += 100 + comboBonus;
                battery = Math.min(100, battery + 15);

                let milestoneNote = '';
                if (streak > 0 && streak % 3 === 0) {
                    battery = Math.min(100, battery + 5);
                    milestoneNote = ' // STREAK MILESTONE! +5% BATTERY';
                }

                updateBatteryDisplay();
                updateStreakDisplay();
                document.getElementById('scoreDisplay').innerText = `${score} PTS`;

                const bonusNote = comboBonus ? ` // STREAK BONUS +${comboBonus}` : '';

                if (mData.hasIntercept) {
                    feedback.className = 'feedback-line text-success';
                    feedback.innerText = `${pickRandom(aiLockLines)}${bonusNote}${milestoneNote}`;
                    startIntercept();
                } else {
                    feedback.className = 'feedback-line text-success';
                    feedback.innerText = `${pickRandom(aiSuccessLines)} +100 PTS${bonusNote}${milestoneNote}`;
                    advanceAfterDelay(1200);
                }

            } else {
                // Missed Target - Drain Battery based on distance error
                streak = 0;
                updateStreakDisplay();

                const penalty = Math.min(35, Math.round(12 + distanceError * 4));
                battery -= penalty;
                updateBatteryDisplay();

                feedback.className = 'feedback-line text-error';
                feedback.innerText = `${pickRandom(aiMissLines)} Target was (${mData.targetX}, ${mData.targetY}). -${penalty}% Battery`;

                if (battery <= 0) {
                    setTimeout(() => {
                        triggerFail();
                    }, 1200);
                } else {
                    advanceAfterDelay(1600);
                }
            }
        }

        // Begin the intercept blip sweep for a mission that has one
        function startIntercept() {
            interceptActive = true;
            interceptResolved = false;

            const w = canvas.width;
            const fromLeft = Math.random() < 0.5;
            const mData = activeMissions[currentMissionIndex];
            interceptRowY = gridToPixelY(mData.targetY);
            interceptStartX = fromLeft ? -30 : w + 30;
            interceptEndX = fromLeft ? w + 30 : -30;
            interceptStartTime = performance.now();

            const banner = document.getElementById('interceptBanner');
            if (banner) banner.style.display = 'flex';
            const fill = document.getElementById('interceptTimerFill');
            if (fill) fill.style.width = '100%';

            // Safety net: if nothing hits it, resolve as a timeout so the
            // mission can never stall waiting on a click that never comes.
            interceptTimeoutId = setTimeout(() => {
                if (interceptActive && !interceptResolved) {
                    resolveIntercept(false);
                }
            }, interceptDuration + 150);
        }

        // Resolve the intercept window, hit or timeout — either way the
        // mission always advances, so a missed blip can never soft-lock play.
        function resolveIntercept(hit) {
            if (interceptResolved) return;
            interceptResolved = true;
            interceptActive = false;
            if (interceptTimeoutId) { clearTimeout(interceptTimeoutId); interceptTimeoutId = null; }

            const banner = document.getElementById('interceptBanner');
            if (banner) banner.style.display = 'none';

            const feedback = document.getElementById('feedbackLine');
            if (hit) {
                score += 50;
                document.getElementById('scoreDisplay').innerText = `${score} PTS`;
                feedback.className = 'feedback-line text-success';
                feedback.innerText = `${pickRandom(aiInterceptHitLines)} +50 PTS INTERCEPT BONUS`;
            } else {
                feedback.className = 'feedback-line text-success';
                feedback.innerText = pickRandom(aiInterceptMissLines);
            }

            advanceAfterDelay(1100);
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

        function restartMission() {
            startMission();
        }
