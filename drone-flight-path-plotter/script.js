// FLIGHT ROUTE DATA BANK (y = mx + b)
// Every "points" entry's target slope/intercept was hand-computed from the
// two given checkpoints and cross-checked by plugging both points back in.
// All target m values are multiples of 0.5 within [-5, 5] and all target b
// values are integers within [-10, 10], matching the drag-handle snap grid.
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

// Fixed grid x-positions for the two draggable control handles.
const ANCHOR_X = 0;   // Anchor handle: locked to x = 0, its height IS the y-intercept (b).
const TILT_X = 2;     // Tilt handle: locked to x = 2, pivots around the anchor to set slope (m).

// GAME STATE
let activeRoutes = [];
let currentIndex = 0;
let score = 0;
let battery = 100;
let isDarkMode = true;
let playerName = '';

// Round phase: 'aiming' (dragging allowed) -> 'flying' (animating) -> 'result' (pause before next round)
let phase = 'aiming';

// Drag-controlled player line: y = playerM * x + playerB
let playerM = 0;
let playerB = 0;
let dragging = null; // 'anchor' | 'tilt' | null

// Canvas
let canvas, ctx;

// Per-round obstacle "gates" (a pair of skyscraper gaps carved from the target line)
let currentGates = null;

// Flight animation state
let flightM = 0;
let flightB = 0;
let flightStartTime = null;
const FLIGHT_DURATION_MS = 2400;
let flightSuccess = false;
let flightResolved = false;
let crashTargetX = null;
let roundTimeoutId = null;

// ---- Flavor text: nervous trainee-pilot voice ----
const CHATTER = {
    newRound: [
        '🧑‍✈️ "New route loaded. Okay. Okay okay okay, I got this."',
        '🧑‍✈️ "Fresh airspace ahead. Please don\'t make me talk to the school board again."',
        '🧑‍✈️ "Scanning the skyline... those towers look pointy today."'
    ],
    dragging: [
        '🧑‍✈️ "Easy does it... easy..."',
        '🧑‍✈️ "Yes, yes, that FEELS like the right altitude."',
        '🧑‍✈️ "Fine-tuning the tilt rotor. Please do not distract the pilot."'
    ],
    launch: [
        '🧑‍✈️ "Here we go! Wings level, nerves steady-ish!"',
        '🧑‍✈️ "Launching! If you hear screaming, that\'s just me."',
        '🧑‍✈️ "Committing to the flight path. No backsies now."'
    ],
    success: [
        '🧑‍✈️ "WE THREADED IT! I am a LEGEND!"',
        '🧑‍✈️ "Clean corridor, baby! Nailed the math!"',
        '🧑‍✈️ "Textbook flight. Frame-worthy. Tell my instructor."'
    ],
    crash: [
        '🧑‍✈️ "OOF. That tower came out of nowhere. (It did not.)"',
        '🧑‍✈️ "I regret every decision that led to this moment."',
        '🧑‍✈️ "That\'s a paperwork incident. Recalculating..."'
    ]
};

function pickFunny(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function updatePilotChatter(stateKey) {
    const el = document.getElementById('pilotChatter');
    if (el && CHATTER[stateKey]) {
        el.innerText = pickFunny(CHATTER[stateKey]);
    }
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

window.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('flightCanvas');
    ctx = canvas.getContext('2d');

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);

    requestAnimationFrame(mainLoop);
});

function clamp(v, lo, hi) {
    return Math.min(hi, Math.max(lo, v));
}

// Grid <-> Pixel conversion (range -10..10 across the canvas, 22-unit span)
function gridToPixelX(gx) {
    const width = canvas.width;
    return width / 2 + (gx * (width / 22));
}

function gridToPixelY(gy) {
    const height = canvas.height;
    return height / 2 - (gy * (height / 22));
}

function pixelToGridX(px) {
    const width = canvas.width;
    return (px - width / 2) / (width / 22);
}

function pixelToGridY(py) {
    const height = canvas.height;
    return (height / 2 - py) / (height / 22);
}

function getCanvasPoint(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
        px: (e.clientX - rect.left) * scaleX,
        py: (e.clientY - rect.top) * scaleY
    };
}

// ---- Drag handling for the two control handles ----
function handlePositions() {
    return {
        anchor: { gx: ANCHOR_X, gy: clamp(playerB, -10, 10) },
        tilt: { gx: TILT_X, gy: clamp(playerM * TILT_X + playerB, -10, 10) }
    };
}

function onPointerDown(e) {
    if (phase !== 'aiming') return;
    const { px, py } = getCanvasPoint(e);
    const pos = handlePositions();
    const anchorPx = gridToPixelX(pos.anchor.gx), anchorPy = gridToPixelY(pos.anchor.gy);
    const tiltPx = gridToPixelX(pos.tilt.gx), tiltPy = gridToPixelY(pos.tilt.gy);
    const HIT_R = 28;
    const dAnchor = Math.hypot(px - anchorPx, py - anchorPy);
    const dTilt = Math.hypot(px - tiltPx, py - tiltPy);

    if (dTilt <= HIT_R && dTilt <= dAnchor) {
        dragging = 'tilt';
    } else if (dAnchor <= HIT_R) {
        dragging = 'anchor';
    } else {
        return;
    }
    try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    updatePilotChatter('dragging');
    e.preventDefault();
}

function onPointerMove(e) {
    if (!dragging || phase !== 'aiming') return;
    const { py } = getCanvasPoint(e);
    const gy = pixelToGridY(py);

    if (dragging === 'anchor') {
        playerB = Math.round(clamp(gy, -10, 10));
    } else if (dragging === 'tilt') {
        const targetY = clamp(gy, -15, 15);
        let m = (targetY - playerB) / TILT_X;
        m = Math.round(m * 2) / 2; // snap to nearest 0.5
        playerM = clamp(m, -5, 5);
    }
    updateControlsDisplay();
    e.preventDefault();
}

function onPointerUp(e) {
    if (dragging) {
        try { canvas.releasePointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    }
    dragging = null;
}

function updateControlsDisplay() {
    const sign = playerB >= 0 ? '+' : '-';
    document.getElementById('currentPathDisplay').innerText = `y = ${playerM}x ${sign} ${Math.abs(playerB)}`;
}

// ---- Gate (obstacle) placement, derived from the TARGET line for this round ----
// Guarantees: x = 0 is always within the target line's on-screen domain because
// b is always within [-10, 10], so the domain formula below never comes up empty.
function computeDomain(m, b) {
    if (Math.abs(m) < 1e-9) {
        return [-10, 10];
    }
    const xAtLow = (-10 - b) / m;
    const xAtHigh = (10 - b) / m;
    let lo = Math.min(xAtLow, xAtHigh);
    let hi = Math.max(xAtLow, xAtHigh);
    lo = Math.max(lo, -10);
    hi = Math.min(hi, 10);
    if (hi - lo < 1) {
        lo = -1;
        hi = 1;
    }
    return [lo, hi];
}

function computeGatesForTarget(rData) {
    const [lo, hi] = computeDomain(rData.m, rData.b);
    const gate1X = lo + 0.3 * (hi - lo);
    const gate2X = lo + 0.7 * (hi - lo);
    return {
        gate1X: gate1X,
        gate1Y: rData.m * gate1X + rData.b,
        gate2X: gate2X,
        gate2Y: rData.m * gate2X + rData.b,
        halfHeight: 1.3
    };
}

// ---- Rendering ----
function drawGrid(w, h, step, colors) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = colors.gridColor;
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

    ctx.lineWidth = 2;
    ctx.strokeStyle = colors.axisColor;
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.stroke();

    ctx.fillStyle = colors.textColor;
    ctx.font = '10px "Space Mono", monospace';
    ctx.textAlign = 'center';
    for (let g = -10; g <= 10; g += 5) {
        if (g !== 0) {
            ctx.fillText(g, gridToPixelX(g), h / 2 + 14);
            ctx.fillText(g, w / 2 - 12, gridToPixelY(g) + 3);
        }
    }
}

function drawGateBuilding(gateX, gateY, halfHeight, step, colors) {
    const bw = step * 1.3;
    const bx = gridToPixelX(gateX - 0.65);

    const bottomTopGridY = gateY - halfHeight;
    if (bottomTopGridY > -10) {
        const groundPy = gridToPixelY(-10);
        const topPy = gridToPixelY(Math.min(bottomTopGridY, 10));
        ctx.fillStyle = colors.buildingColor;
        ctx.fillRect(bx, topPy, bw, groundPy - topPy);
    }

    const topBottomGridY = gateY + halfHeight;
    if (topBottomGridY < 10) {
        const skyPy = gridToPixelY(10);
        const bottomPy = gridToPixelY(Math.max(topBottomGridY, -10));
        ctx.fillStyle = colors.buildingColor;
        ctx.fillRect(bx, skyPy, bw, bottomPy - skyPy);
    }

    // Gap outline for a "gate" feel
    const gapTopPy = gridToPixelY(clamp(topBottomGridY, -10, 10));
    const gapBottomPy = gridToPixelY(clamp(bottomTopGridY, -10, 10));
    ctx.save();
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = colors.gateOutline;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(bx, gapTopPy, bw, gapBottomPy - gapTopPy);
    ctx.restore();
}

function drawGates(step, colors) {
    if (!currentGates) return;
    drawGateBuilding(currentGates.gate1X, currentGates.gate1Y, currentGates.halfHeight, step, colors);
    drawGateBuilding(currentGates.gate2X, currentGates.gate2Y, currentGates.halfHeight, step, colors);
}

function drawLine(m, b, fromX, toX, color, width) {
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.beginPath();
    let started = false;
    for (let gx = fromX; gx <= toX + 0.001; gx += 0.2) {
        const gy = m * gx + b;
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
}

function drawHandles(colors) {
    const pos = handlePositions();
    const aX = gridToPixelX(pos.anchor.gx), aY = gridToPixelY(pos.anchor.gy);
    const tX = gridToPixelX(pos.tilt.gx), tY = gridToPixelY(pos.tilt.gy);

    ctx.save();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = colors.lineColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(aX, aY);
    ctx.lineTo(tX, tY);
    ctx.stroke();
    ctx.restore();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '20px serif';
    ctx.fillText('⚓', aX, aY);
    ctx.fillText('🕹️', tX, tY);

    ctx.font = '10px "Space Mono", monospace';
    ctx.fillStyle = colors.textColor;
    ctx.fillText('b', aX, aY - 18);
    ctx.fillText('m', tX, tY - 18);
}

function drawDrone(gx, gy) {
    const px = gridToPixelX(gx), py = gridToPixelY(clamp(gy, -10, 10));
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '24px serif';
    ctx.fillText('🛸', px, py);
}

function drawCrash(gx, gy) {
    const px = gridToPixelX(gx), py = gridToPixelY(clamp(gy, -10, 10));
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '28px serif';
    ctx.fillText('💥', px, py);
}

function themeColors() {
    return {
        gridColor: isDarkMode ? '#16273e' : '#d3e2f0',
        axisColor: isDarkMode ? '#38bdf8' : '#0369a1',
        textColor: isDarkMode ? '#7d93ad' : '#48607a',
        buildingColor: isDarkMode ? 'rgba(125, 147, 173, 0.35)' : 'rgba(72, 96, 122, 0.25)',
        gateOutline: isDarkMode ? 'rgba(251, 191, 36, 0.6)' : 'rgba(180, 83, 9, 0.6)',
        lineColor: isDarkMode ? '#fbbf24' : '#b45309'
    };
}

// ---- Main continuous render loop (single rAF loop, lives for the page's lifetime) ----
function mainLoop(timestamp) {
    render(timestamp);
    requestAnimationFrame(mainLoop);
}

function render(timestamp) {
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    const step = w / 22;
    const colors = themeColors();

    ctx.clearRect(0, 0, w, h);
    drawGrid(w, h, step, colors);
    drawGates(step, colors);

    if (phase === 'aiming') {
        drawLine(playerM, playerB, -10, 10, colors.lineColor, 3);
        drawHandles(colors);
    } else if (phase === 'flying') {
        const elapsed = timestamp - flightStartTime;
        let t = clamp(elapsed / FLIGHT_DURATION_MS, 0, 1);
        let stopping = false;

        if (!flightSuccess && crashTargetX !== null) {
            const crashT = clamp((crashTargetX - (-10)) / 20, 0, 1);
            if (t >= crashT) {
                t = crashT;
                stopping = true;
            }
        }

        const curX = -10 + t * 20;
        const curY = flightM * curX + flightB;
        drawLine(flightM, flightB, -10, curX, colors.lineColor, 3);

        if (stopping) {
            drawCrash(curX, curY);
            if (!flightResolved) {
                flightResolved = true;
                settleRound(false);
            }
        } else {
            drawDrone(curX, curY);
            if (t >= 1 && !flightResolved) {
                flightResolved = true;
                settleRound(true);
            }
        }
    } else if (phase === 'result') {
        if (flightSuccess) {
            drawLine(flightM, flightB, -10, 10, colors.lineColor, 3);
            drawDrone(10, flightM * 10 + flightB);
        } else if (crashTargetX !== null) {
            drawLine(flightM, flightB, -10, crashTargetX, colors.lineColor, 3);
            drawCrash(crashTargetX, flightM * crashTargetX + flightB);
        }
    }
}

// Start Flight Session
function startFlight() {
    const name = ArcadeKit.requireName('playerNameInput', 'playerNameError');
    if (!name) return;
    playerName = name;

    if (roundTimeoutId) { clearTimeout(roundTimeoutId); roundTimeoutId = null; }

    currentIndex = 0;
    score = 0;
    battery = 100;
    activeRoutes = ArcadeKit.sample(routeBank, TOTAL_ROUNDS);

    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('failScreen').style.display = 'none';
    document.getElementById('victoryScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';

    loadRoute();
}

function loadRoute() {
    if (roundTimeoutId) { clearTimeout(roundTimeoutId); roundTimeoutId = null; }

    phase = 'aiming';
    dragging = null;
    flightResolved = false;
    crashTargetX = null;

    document.getElementById('feedbackLine').innerText = '';
    document.getElementById('feedbackLine').className = 'feedback-line';
    document.getElementById('launchBtn').disabled = false;

    playerM = 0;
    playerB = 0;
    updateControlsDisplay();

    const rData = activeRoutes[currentIndex];
    currentGates = computeGatesForTarget(rData);

    document.getElementById('missionHeader').innerText = `Route ${String(currentIndex + 1).padStart(2, '0')}`;
    document.getElementById('routeCounter').innerText = `${String(currentIndex + 1).padStart(2, '0')} / ${activeRoutes.length}`;
    document.getElementById('scoreDisplay').innerText = `${score} PTS`;
    updateBatteryDisplay();
    updatePilotChatter('newRound');

    let promptText;
    if (rData.type === 'direct') {
        promptText = `Chart a flight path with slope <strong>m = ${rData.m}</strong> and starting altitude (y-intercept) <strong>b = ${rData.b}</strong>. Drag the handles so your line threads both gaps in the skyline.`;
    } else {
        promptText = `The path must pass through checkpoints <strong>(${rData.x1}, ${rData.y1})</strong> and <strong>(${rData.x2}, ${rData.y2})</strong>. Find m and b, then drag the handles to match.`;
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

// Launch: freezes the currently dragged line, decides pass/fail against the
// target, and hands off to the render loop to animate the flight.
function launchDrone() {
    if (phase !== 'aiming') return;

    const rData = activeRoutes[currentIndex];
    const dm = playerM - rData.m;
    const db = playerB - rData.b;
    const distanceError = Math.sqrt(dm * dm + db * db);

    flightM = playerM;
    flightB = playerB;
    flightSuccess = distanceError < 0.001;
    flightResolved = false;
    flightStartTime = performance.now();

    if (!flightSuccess) {
        const g = currentGates;
        const dev1 = Math.abs((flightM * g.gate1X + flightB) - g.gate1Y);
        const dev2 = Math.abs((flightM * g.gate2X + flightB) - g.gate2Y);
        crashTargetX = dev1 >= dev2 ? g.gate1X : g.gate2X;
    } else {
        crashTargetX = null;
    }

    phase = 'flying';
    document.getElementById('launchBtn').disabled = true;
    document.getElementById('feedbackLine').innerText = '';
    updatePilotChatter('launch');
}

// Called (once, guarded by flightResolved) by the render loop when the flight
// animation reaches its outcome — either the exit or a crash.
function settleRound(success) {
    const rData = activeRoutes[currentIndex];
    const dm = flightM - rData.m;
    const db = flightB - rData.b;
    const distanceError = Math.sqrt(dm * dm + db * db);
    const feedback = document.getElementById('feedbackLine');

    phase = 'result';

    if (success) {
        score += 100;
        battery = Math.min(100, battery + 15);
        updateBatteryDisplay();
        document.getElementById('scoreDisplay').innerText = `${score} PTS`;

        feedback.className = 'feedback-line text-success';
        feedback.innerText = `✅ COURSE MATCHED! +100 PTS // BATTERY RESTORED`;
        updatePilotChatter('success');

        roundTimeoutId = setTimeout(() => {
            currentIndex++;
            if (currentIndex >= activeRoutes.length) {
                triggerVictory();
            } else {
                loadRoute();
            }
        }, 1500);

    } else {
        const penalty = Math.min(40, Math.round(15 + distanceError * 5));
        battery -= penalty;
        updateBatteryDisplay();

        feedback.className = 'feedback-line text-error';
        feedback.innerText = `❌ CRASH! Target was m = ${rData.m}, b = ${rData.b}. -${penalty}% Battery`;
        updatePilotChatter('crash');

        if (battery <= 0) {
            roundTimeoutId = setTimeout(() => {
                triggerFail();
            }, 1700);
        } else {
            roundTimeoutId = setTimeout(() => {
                currentIndex++;
                if (currentIndex >= activeRoutes.length) {
                    triggerVictory();
                } else {
                    loadRoute();
                }
            }, 2000);
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
    if (roundTimeoutId) { clearTimeout(roundTimeoutId); roundTimeoutId = null; }
    phase = 'aiming';
    dragging = null;
    startFlight();
}
