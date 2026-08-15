// FLIGHT ROUTE DATA BANK (y = mx + b)
// Every "points" entry's target slope/intercept was hand-computed from the
// two given checkpoints and cross-checked by plugging both points back in.
// All target m values are multiples of 0.5 within [-5, 5] and all target b
// values are integers within [-10, 10], matching the slider steps/ranges.
const routeBank = [
    // ---- Direct slope/intercept routes ----
    { type: 'direct', m: 2, b: -3 },
    { type: 'direct', m: -1, b: 4 },
    { type: 'direct', m: 0.5, b: 6 },
    { type: 'direct', m: 3, b: -5 },
    { type: 'direct', m: -2.5, b: 2 },
    { type: 'direct', m: 1.5, b: -7 },
    { type: 'direct', m: -4, b: 8 },
    { type: 'direct', m: 4, b: -1 },
    { type: 'direct', m: -0.5, b: -4 },
    { type: 'direct', m: 2.5, b: 5 },

    // ---- Two-checkpoint routes (m, b derived from the two points) ----
    // (1,4) & (3,10): m=(10-4)/(3-1)=3, b=4-3(1)=1  -> check: 3(3)+1=10 ✓
    { type: 'points', x1: 1, y1: 4, x2: 3, y2: 10, m: 3, b: 1 },
    // (0,-2) & (4,6): m=(6-(-2))/(4-0)=2, b=-2       -> check: 2(4)-2=6 ✓
    { type: 'points', x1: 0, y1: -2, x2: 4, y2: 6, m: 2, b: -2 },
    // (-2,5) & (2,-3): m=(-3-5)/(2-(-2))=-2, b=5-(-2)(-2)=1 -> check: -2(2)+1=-3 ✓
    { type: 'points', x1: -2, y1: 5, x2: 2, y2: -3, m: -2, b: 1 },
    // (2,1) & (6,3): m=(3-1)/(6-2)=0.5, b=1-0.5(2)=0  -> check: 0.5(6)+0=3 ✓
    { type: 'points', x1: 2, y1: 1, x2: 6, y2: 3, m: 0.5, b: 0 },
    // (-3,-1) & (1,7): m=(7-(-1))/(1-(-3))=2, b=-1-2(-3)=5 -> check: 2(1)+5=7 ✓
    { type: 'points', x1: -3, y1: -1, x2: 1, y2: 7, m: 2, b: 5 },
    // (0,3) & (2,-2): m=(-2-3)/(2-0)=-2.5, b=3        -> check: -2.5(2)+3=-2 ✓
    { type: 'points', x1: 0, y1: 3, x2: 2, y2: -2, m: -2.5, b: 3 },
    // (1,-5) & (5,3): m=(3-(-5))/(5-1)=2, b=-5-2(1)=-7 -> check: 2(5)-7=3 ✓
    { type: 'points', x1: 1, y1: -5, x2: 5, y2: 3, m: 2, b: -7 },
    // (-4,6) & (0,-2): m=(-2-6)/(0-(-4))=-2, b=-2      -> check: -2(-4)-2=6 ✓
    { type: 'points', x1: -4, y1: 6, x2: 0, y2: -2, m: -2, b: -2 },
    // (2,-4) & (4,-1): m=(-1-(-4))/(4-2)=1.5, b=-4-1.5(2)=-7 -> check: 1.5(4)-7=-1 ✓
    { type: 'points', x1: 2, y1: -4, x2: 4, y2: -1, m: 1.5, b: -7 },
    // (-1,-7) & (3,1): m=(1-(-7))/(3-(-1))=2, b=-7-2(-1)=-5 -> check: 2(3)-5=1 ✓
    { type: 'points', x1: -1, y1: -7, x2: 3, y2: 1, m: 2, b: -5 }
];

const TOTAL_ROUNDS = 12;

// GAME STATE
let activeRoutes = [];
let currentIndex = 0;
let score = 0;
let battery = 100;
let isDarkMode = true;
let isLocked = false;
let playerName = '';

// Slider-controlled player line
let playerM = 0;
let playerB = 0;

// Canvas
let canvas, ctx;
let obstacles = [
    { gx: -8, height: 7 },
    { gx: -5.5, height: 4 },
    { gx: 6, height: 8 },
    { gx: 8.5, height: 5 }
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
}

window.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('flightCanvas');
    ctx = canvas.getContext('2d');
    requestAnimationFrame(drawFlightLoop);
});

// Grid <-> Pixel conversion (range -10..10 across the canvas, 22-unit span)
function gridToPixelX(gx) {
    const width = canvas.width;
    return width / 2 + (gx * (width / 22));
}

function gridToPixelY(gy) {
    const height = canvas.height;
    return height / 2 - (gy * (height / 22));
}

function updateFromSliders() {
    playerM = parseFloat(document.getElementById('sliderM').value);
    playerB = parseFloat(document.getElementById('sliderB').value);
    updateControlsDisplay();
}

function updateControlsDisplay() {
    document.getElementById('valMDisplay').innerText = playerM;
    document.getElementById('valBDisplay').innerText = playerB;
    const sign = playerB >= 0 ? '+' : '-';
    document.getElementById('currentPathDisplay').innerText = `y = ${playerM}x ${sign} ${Math.abs(playerB)}`;
}

// Continuous Canvas Flight Grid Loop
function drawFlightLoop() {
    if (ctx) {
        const w = canvas.width;
        const h = canvas.height;
        const step = w / 22;

        const gridColor = isDarkMode ? '#16273e' : '#d3e2f0';
        const axisColor = isDarkMode ? '#38bdf8' : '#0369a1';
        const textColor = isDarkMode ? '#7d93ad' : '#48607a';
        const buildingColor = isDarkMode ? 'rgba(125, 147, 173, 0.35)' : 'rgba(72, 96, 122, 0.25)';
        const lineColor = isDarkMode ? '#fbbf24' : '#b45309';

        ctx.clearRect(0, 0, w, h);

        // Grid lines
        ctx.lineWidth = 1;
        ctx.strokeStyle = gridColor;
        for (let i = 0; i <= 22; i++) {
            ctx.beginPath();
            ctx.moveTo(i * step, 0);
            ctx.lineTo(i * step, h);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, i * step);
            ctx.lineTo(w, i * step);
            ctx.stroke();
        }

        // Skyscraper obstacles (decorative only)
        ctx.fillStyle = buildingColor;
        obstacles.forEach(ob => {
            const bx = gridToPixelX(ob.gx - 0.6);
            const bw = step * 1.2;
            const groundY = gridToPixelY(-10);
            const topY = gridToPixelY(ob.height - 10);
            ctx.fillRect(bx, topY, bw, groundY - topY);
        });

        // Axes
        ctx.lineWidth = 2;
        ctx.strokeStyle = axisColor;
        ctx.beginPath();
        ctx.moveTo(0, h / 2);
        ctx.lineTo(w, h / 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(w / 2, 0);
        ctx.lineTo(w / 2, h);
        ctx.stroke();

        // Axis labels
        ctx.fillStyle = textColor;
        ctx.font = '10px "Space Mono", monospace';
        ctx.textAlign = 'center';
        for (let g = -10; g <= 10; g += 5) {
            if (g !== 0) {
                ctx.fillText(g, gridToPixelX(g), h / 2 + 14);
                ctx.fillText(g, w / 2 - 12, gridToPixelY(g) + 3);
            }
        }

        // Player's live flight path: y = playerM * x + playerB
        ctx.lineWidth = 3;
        ctx.strokeStyle = lineColor;
        ctx.beginPath();
        let started = false;
        for (let gx = -10; gx <= 10; gx += 0.25) {
            const gy = playerM * gx + playerB;
            if (gy < -10 || gy > 10) { started = false; continue; }
            const px = gridToPixelX(gx);
            const py = gridToPixelY(gy);
            if (!started) {
                ctx.moveTo(px, py);
                started = true;
            } else {
                ctx.lineTo(px, py);
            }
        }
        ctx.stroke();

        // Drone marker at x = 0 on the line
        const droneY = playerM * 0 + playerB;
        if (droneY >= -10 && droneY <= 10) {
            const dx = gridToPixelX(0);
            const dy = gridToPixelY(droneY);
            ctx.fillStyle = lineColor;
            ctx.beginPath();
            ctx.arc(dx, dy, 6, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    requestAnimationFrame(drawFlightLoop);
}

// Start Flight Session
function startFlight() {
    const name = ArcadeKit.requireName('playerNameInput', 'playerNameError');
    if (!name) return;
    playerName = name;

    currentIndex = 0;
    score = 0;
    battery = 100;
    isLocked = false;
    activeRoutes = ArcadeKit.sample(routeBank, TOTAL_ROUNDS);

    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('failScreen').style.display = 'none';
    document.getElementById('victoryScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';

    loadRoute();
}

function loadRoute() {
    isLocked = false;
    document.getElementById('feedbackLine').innerText = '';
    document.getElementById('feedbackLine').className = 'feedback-line';

    playerM = 0;
    playerB = 0;
    document.getElementById('sliderM').value = 0;
    document.getElementById('sliderB').value = 0;
    updateControlsDisplay();

    const rData = activeRoutes[currentIndex];

    document.getElementById('missionHeader').innerText = `Route ${String(currentIndex + 1).padStart(2, '0')}`;
    document.getElementById('routeCounter').innerText = `${String(currentIndex + 1).padStart(2, '0')} / ${activeRoutes.length}`;
    document.getElementById('scoreDisplay').innerText = `${score} PTS`;
    updateBatteryDisplay();

    let promptText;
    if (rData.type === 'direct') {
        promptText = `Chart a flight path with slope <strong>m = ${rData.m}</strong> and starting altitude (y-intercept) <strong>b = ${rData.b}</strong>.`;
    } else {
        promptText = `The path must pass through checkpoints <strong>(${rData.x1}, ${rData.y1})</strong> and <strong>(${rData.x2}, ${rData.y2})</strong>. Find m and b to match this course.`;
    }
    document.getElementById('missionPromptText').innerHTML = promptText;
}

function updateBatteryDisplay() {
    const fill = document.getElementById('batteryFill');
    fill.style.width = `${Math.max(0, battery)}%`;

    if (battery > 50) {
        fill.style.backgroundColor = 'var(--accent-green)';
    } else if (battery > 25) {
        fill.style.backgroundColor = 'var(--accent-amber)';
    } else {
        fill.style.backgroundColor = 'var(--accent-red)';
    }
}

function chartCourse() {
    if (isLocked) return;
    isLocked = true;

    const rData = activeRoutes[currentIndex];
    const feedback = document.getElementById('feedbackLine');

    const dm = playerM - rData.m;
    const db = playerB - rData.b;
    const distanceError = Math.sqrt(dm * dm + db * db);

    if (distanceError < 0.001) {
        score += 100;
        battery = Math.min(100, battery + 15);
        updateBatteryDisplay();

        feedback.className = 'feedback-line text-success';
        feedback.innerText = `✅ COURSE MATCHED! +100 PTS // BATTERY RESTORED`;

        setTimeout(() => {
            currentIndex++;
            if (currentIndex >= activeRoutes.length) {
                triggerVictory();
            } else {
                loadRoute();
            }
        }, 1300);

    } else {
        const penalty = Math.min(40, Math.round(15 + distanceError * 5));
        battery -= penalty;
        updateBatteryDisplay();

        feedback.className = 'feedback-line text-error';
        feedback.innerText = `❌ OFF COURSE! Target was m = ${rData.m}, b = ${rData.b}. -${penalty}% Battery`;

        if (battery <= 0) {
            setTimeout(() => {
                triggerFail();
            }, 1400);
        } else {
            setTimeout(() => {
                currentIndex++;
                if (currentIndex >= activeRoutes.length) {
                    triggerVictory();
                } else {
                    loadRoute();
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

function restartFlight() {
    startFlight();
}
