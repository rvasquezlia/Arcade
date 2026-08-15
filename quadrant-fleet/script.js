        // SPATIAL TARGETING MISSION DATA BANK
        const tacticalMissions = [
            {
                title: "Quadrant II Intercept",
                prompt: "A hostile drone is hovering at Quadrant II coordinates \\( (-6, 5) \\). Position your targeting reticle at these exact coordinates.",
                targetX: -6,
                targetY: 5,
                showTargetOnStart: false
            },
            {
                title: "Y-Axis Stealth Reflection",
                prompt: "A stealth vessel is located at \\( A(4, 7) \\). Calculate its reflection position across the y-axis and lock reticle on the reflected coordinate.",
                targetX: -4,
                targetY: 7,
                showTargetOnStart: false
            },
            {
                title: "X-Axis Mirror Lock",
                prompt: "An outpost beacon at \\( B(-3, -8) \\) reflects its radar signal across the x-axis. Lock reticle on the reflected coordinate.",
                targetX: -3,
                targetY: 8,
                showTargetOnStart: false
            },
            {
                title: "Vector Translation Shift",
                prompt: "An allied probe starts at \\( P(2, -4) \\) and translates by vector shift \\( [-7, +9] \\). Plot the final translated location.",
                targetX: -5,
                targetY: 5,
                showTargetOnStart: false
            },
            {
                title: "Trajectory Midpoint Relaying",
                prompt: "Deploy a relay satellite at the exact midpoint between Command Base \\( (-8, -6) \\) and Defense Grid \\( (4, 2) \\).",
                targetX: -2,
                targetY: -2,
                showTargetOnStart: false
            },
            {
                title: "Linear Trajectory Function",
                prompt: "An interceptor flies along line \\( y = 2x - 3 \\). Lock reticle at its coordinate position when \\( x = 4 \\).",
                targetX: 4,
                targetY: 5,
                showTargetOnStart: false
            },
            {
                title: "Origin Radial Lock",
                prompt: "Lock reticle in Quadrant IV at a distance of 5 units from origin \\( (0, 0) \\) with an X-coordinate of \\( 3 \\).",
                targetX: 3,
                targetY: -4,
                showTargetOnStart: false
            },
            {
                title: "Negative Slope Trajectory",
                prompt: "A craft travels along trajectory \\( y = -x + 1 \\). Determine its Y-coordinate when \\( x = -7 \\) and lock reticle.",
                targetX: -7,
                targetY: 8,
                showTargetOnStart: false
            },
            {
                title: "Horizontal Distance Offset",
                prompt: "A station is situated at \\( (-9, -3) \\). A supply pod is deployed 12 units directly right along the same horizontal line. Plot the pod.",
                targetX: 3,
                targetY: -3,
                showTargetOnStart: false
            },
            {
                title: "Origin Reflection Lock",
                prompt: "A signal originates at \\( (5, -6) \\). Lock reticle on its point reflection through the origin \\( (0, 0) \\).",
                targetX: -5,
                targetY: 6,
                showTargetOnStart: false
            }
        ];

        // GAME STATE
        let currentMissionIndex = 0;
        let score = 0;
        let battery = 100;
        let activeMissions = [];
        let isDarkMode = true;
        let isLocked = false;

        // Player Reticle Selection
        let playerX = 0;
        let playerY = 0;

        // Canvas Context & Sweep Animation Angle
        let canvas, ctx;
        let sweepAngle = 0;
        let animationFrameId;

        // Shuffle Utility
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

            // Canvas Click to Plot Coordinates
            canvas.addEventListener('mousedown', handleCanvasClick);
            
            // Start Continuous Canvas Animation Loop
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
            if (isLocked) return;
            const rect = canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;

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

            requestAnimationFrame(drawCanvasLoop);
        }

        // Start Mission Game
        function startMission() {
            currentMissionIndex = 0;
            score = 0;
            battery = 100;
            activeMissions = shuffleArray(tacticalMissions);

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

            // Reset player reticle to origin
            playerX = 0;
            playerY = 0;
            updateControlsDisplay();

            const mData = activeMissions[currentMissionIndex];

            // Update Header & HUD
            document.getElementById('sectorHeader').innerText = `Sector ${currentMissionIndex + 1}: ${mData.title}`;
            document.getElementById('sectorCounter').innerText = `${currentMissionIndex + 1} / ${activeMissions.length}`;
            document.getElementById('scoreDisplay').innerText = `${score} PTS`;
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
                score += 100;
                battery = Math.min(100, battery + 15);
                updateBatteryDisplay();

                feedback.className = 'feedback-line text-success';
                feedback.innerText = '🎯 EXACT TARGET LOCK! +100 PTS // BATTERY RESTORED';

                setTimeout(() => {
                    currentMissionIndex++;
                    if (currentMissionIndex >= activeMissions.length) {
                        triggerVictory();
                    } else {
                        loadMission();
                    }
                }, 1200);

            } else {
                // Missed Target - Drain Battery based on distance error
                const penalty = Math.min(40, Math.round(15 + distanceError * 5));
                battery -= penalty;
                updateBatteryDisplay();

                feedback.className = 'feedback-line text-error';
                feedback.innerText = `❌ TARGET MISSED! Target was (${mData.targetX}, ${mData.targetY}). -${penalty}% Battery`;

                if (battery <= 0) {
                    setTimeout(() => {
                        triggerFail();
                    }, 1200);
                } else {
                    setTimeout(() => {
                        currentMissionIndex++;
                        if (currentMissionIndex >= activeMissions.length) {
                            triggerVictory();
                        } else {
                            loadMission();
                        }
                    }, 1600);
                }
            }
        }

        function triggerFail() {
            document.getElementById('gameScreen').style.display = 'none';
            document.getElementById('failScreen').style.display = 'flex';
            document.getElementById('failScore').innerText = score;
        }

        function triggerVictory() {
            document.getElementById('gameScreen').style.display = 'none';
            document.getElementById('victoryScreen').style.display = 'flex';
            document.getElementById('victoryScore').innerText = score;
        }

        function restartMission() {
            startMission();
        }
    
