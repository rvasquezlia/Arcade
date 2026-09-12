// PYTHAGOREAN THEOREM DATA BANK (a^2 + b^2 = c^2)
// Every hypotenuse/leg value below was hand-calculated and cross-checked:
//   findC:   c = sqrt(a^2 + b^2)
//   findLeg: b = sqrt(c^2 - a^2)   (a is the known leg, b is the unknown leg)
// This bank is untouched from the original release — buildRound() below
// reinterprets each entry for the drag-to-anchor mechanic without altering
// a single number.
const towerBank = [
    // ---- FIND C (given both legs, find the hypotenuse) ----
    { mode: 'findC', a: 3, b: 4, correct: 5, approx: false, options: [5, 7, 1, 6] },
    { mode: 'findC', a: 6, b: 8, correct: 10, approx: false, options: [10, 14, 2, 9] },
    { mode: 'findC', a: 5, b: 12, correct: 13, approx: false, options: [13, 17, 7, 14] },
    { mode: 'findC', a: 9, b: 12, correct: 15, approx: false, options: [15, 21, 3, 16] },
    { mode: 'findC', a: 8, b: 15, correct: 17, approx: false, options: [17, 23, 7, 18] },
    { mode: 'findC', a: 7, b: 24, correct: 25, approx: false, options: [25, 31, 17, 26] },
    { mode: 'findC', a: 20, b: 21, correct: 29, approx: false, options: [29, 41, 1, 30] },
    { mode: 'findC', a: 10, b: 24, correct: 26, approx: false, options: [26, 34, 14, 27] },
    { mode: 'findC', a: 12, b: 16, correct: 20, approx: false, options: [20, 28, 4, 21] },
    { mode: 'findC', a: 15, b: 20, correct: 25, approx: false, options: [25, 35, 5, 26] },
    { mode: 'findC', a: 5, b: 7, correct: 8.6, approx: true, options: [8.6, 12, 2, 9.0] },
    { mode: 'findC', a: 6, b: 9, correct: 10.8, approx: true, options: [10.8, 15, 3, 11.5] },

    // ---- FIND LEG (given the hypotenuse and one leg, find the other leg) ----
    { mode: 'findLeg', c: 13, a: 5, correct: 12, approx: false, options: [12, 18, 8, 14] },
    { mode: 'findLeg', c: 17, a: 8, correct: 15, approx: false, options: [15, 25, 9, 16] },
    { mode: 'findLeg', c: 25, a: 7, correct: 24, approx: false, options: [24, 32, 18, 23] },
    { mode: 'findLeg', c: 25, a: 15, correct: 20, approx: false, options: [20, 40, 10, 19] },
    { mode: 'findLeg', c: 29, a: 20, correct: 21, approx: false, options: [21, 49, 9, 22] },
    { mode: 'findLeg', c: 26, a: 10, correct: 24, approx: false, options: [24, 36, 16, 23] },
    { mode: 'findLeg', c: 20, a: 12, correct: 16, approx: false, options: [16, 32, 8, 17] },
    { mode: 'findLeg', c: 10, a: 6, correct: 8, approx: false, options: [8, 16, 4, 9] },
    { mode: 'findLeg', c: 15, a: 9, correct: 12, approx: false, options: [12, 24, 6, 13] },
    { mode: 'findLeg', c: 41, a: 9, correct: 40, approx: false, options: [40, 50, 32, 38] },
    { mode: 'findLeg', c: 10, a: 7, correct: 7.1, approx: true, options: [7.1, 17, 3, 8.1] },
    { mode: 'findLeg', c: 12, a: 9, correct: 7.9, approx: true, options: [7.9, 21, 3, 9.0] }
];

const TOTAL_ROUNDS = 12;
const LOCK_TOLERANCE = 0.15; // meters of cable length — how close liveY must be to R to count as taut

// FOREMAN FLAVOR LINES
const successLines = [
    "The foreman wipes his brow and gives you a thumbs up.",
    "Somewhere, a very relieved pigeon stops circling the tower.",
    "You hear a faint, satisfied twang. Structurally perfect.",
    "The foreman stops chewing his pencil for a second. High praise."
];
const slackLines = [
    "The cable's got enough droop to swing a marching band from it.",
    "The foreman mutters something about \"a bridge, not a hammock.\"",
    "That much slack and birds are going to start nesting in it.",
    "It's flopping around down there like a wet noodle."
];
const overtensionLines = [
    "The foreman is now hiding behind his clipboard.",
    "That cable is one gust of wind away from becoming a slingshot.",
    "You can hear the steel fibers screaming for mercy.",
    "It's stretched tighter than the foreman's last nerve."
];
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// GAME STATE
let activeTowers = [];
let currentIndex = 0;
let score = 0;
let stability = 3;
let isDarkMode = true;
let playerName = '';

let round = null;        // built round data for the current tower: {H, R, A, xMax, scalePx}
let dragValue = 0;       // current anchor distance (meters) from the tower base
let isDragging = false;
let isResolved = false;  // true once Lock Anchor has been pressed for this round (inputs disabled)
let activePointerId = null;

// Fixed scene geometry (SVG user-space units)
const SCENE_W = 640;
const SCENE_H = 250;
const TOWER_BASE_X = 100;
const GROUND_Y = 210;
const MAX_TRACK_PX = 470;
const MAX_TOWER_PX = 150;

// ---------- THEME ----------
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
    if (round) renderScene();
}

function formatVal(v) {
    return Number.isInteger(v) ? String(v) : v.toFixed(1);
}
function formatMeters(v) {
    return `${formatVal(v)} m`;
}

// ---------- ROUND CONSTRUCTION ----------
// Reframes each bank entry as: a fixed tower height (H), a fixed/required
// cable length (R), and the hidden correct anchor distance (A) the player
// must drag to. H is always a whole number of meters in the source bank;
// A and R keep whatever precision the original entry specified.
function buildRound(entry) {
    let H, R, A;
    if (entry.mode === 'findC') {
        H = entry.b;
        R = entry.correct;
        A = entry.a;
    } else {
        H = entry.a;
        R = entry.c;
        A = entry.correct;
    }
    const xMax = Math.round(Math.max(A * 1.6, A + 8) * 10) / 10;
    const scalePx = Math.min(MAX_TRACK_PX / xMax, MAX_TOWER_PX / H);
    return { mode: entry.mode, H, R, A, xMax, scalePx };
}

function liveCableLength(x) {
    return Math.sqrt(x * x + round.H * round.H);
}

// ---------- SCENE RENDERING ----------
function renderScene(resolvedState) {
    resolvedState = resolvedState || 'none';
    const stroke = isDarkMode ? '#5eb1e0' : '#1c6fa0';
    const rockFill = isDarkMode ? '#1b232c' : '#d8ddd4';
    const rockStroke = isDarkMode ? '#2f3b47' : '#b7bdb2';
    const labelColor = isDarkMode ? '#eef2f5' : '#161a17';
    const dim = isDarkMode ? '#8b97a3' : '#525b53';

    const towerTopY = GROUND_Y - round.H * round.scalePx;
    const trackEndX = TOWER_BASE_X + round.xMax * round.scalePx;
    const handleX = TOWER_BASE_X + dragValue * round.scalePx;

    let cableClass = 'cable-line';
    let cablePath;
    if (resolvedState === 'success') {
        cableClass += ' cable-success';
        cablePath = `M ${TOWER_BASE_X} ${towerTopY} L ${handleX} ${GROUND_Y}`;
    } else if (resolvedState === 'slack') {
        cableClass += ' cable-slack';
        const midX = (TOWER_BASE_X + handleX) / 2;
        const midY = (towerTopY + GROUND_Y) / 2 + 26;
        cablePath = `M ${TOWER_BASE_X} ${towerTopY} Q ${midX} ${midY} ${handleX} ${GROUND_Y}`;
    } else if (resolvedState === 'overtension') {
        cableClass += ' cable-overtension';
        cablePath = `M ${TOWER_BASE_X} ${towerTopY} L ${handleX} ${GROUND_Y}`;
    } else {
        cableClass += ' cable-neutral';
        cablePath = `M ${TOWER_BASE_X} ${towerTopY} L ${handleX} ${GROUND_Y}`;
    }

    // Tick marks along the track every 5 (or 10, if the range is large) meters
    const tickStep = round.xMax > 30 ? 10 : 5;
    let ticks = '';
    for (let t = 0; t <= round.xMax + 0.001; t += tickStep) {
        const tx = TOWER_BASE_X + t * round.scalePx;
        ticks += `<line x1="${tx}" y1="${GROUND_Y - 5}" x2="${tx}" y2="${GROUND_Y + 5}" stroke="${dim}" stroke-width="1.5" />`;
        ticks += `<text x="${tx}" y="${GROUND_Y + 20}" text-anchor="middle" font-size="10" font-family="Roboto Mono, monospace" fill="${dim}">${t}m</text>`;
    }

    let sparks = '';
    if (resolvedState === 'overtension') {
        for (let i = 0; i < 4; i++) {
            const sx = handleX + (Math.random() * 16 - 8);
            const sy = GROUND_Y - 8 - Math.random() * 14;
            sparks += `<circle class="spark-particle" cx="${sx}" cy="${sy}" r="3" style="animation-delay:${i * 0.08}s" />`;
        }
    }

    const svg = `
        <svg viewBox="0 0 ${SCENE_W} ${SCENE_H}" preserveAspectRatio="xMidYMid meet">
            <!-- near cliff -->
            <polygon points="0,${SCENE_H} 0,${GROUND_Y + 14} ${TOWER_BASE_X + 14},${GROUND_Y + 14} ${TOWER_BASE_X + 26},${SCENE_H}" fill="${rockFill}" stroke="${rockStroke}" stroke-width="2" />
            <!-- far cliff -->
            <polygon points="${trackEndX - 20},${SCENE_H} ${trackEndX - 6},${GROUND_Y + 14} ${SCENE_W},${GROUND_Y + 14} ${SCENE_W},${SCENE_H}" fill="${rockFill}" stroke="${rockStroke}" stroke-width="2" />

            <!-- track -->
            <line x1="${TOWER_BASE_X}" y1="${GROUND_Y}" x2="${trackEndX}" y2="${GROUND_Y}" stroke="${dim}" stroke-width="2" stroke-dasharray="4 4" />
            ${ticks}

            <!-- tower -->
            <rect x="${TOWER_BASE_X - 5}" y="${towerTopY}" width="10" height="${GROUND_Y - towerTopY}" fill="${stroke}" />
            <polygon points="${TOWER_BASE_X - 16},${towerTopY} ${TOWER_BASE_X + 16},${towerTopY} ${TOWER_BASE_X},${towerTopY - 16}" fill="${stroke}" />
            <text x="${TOWER_BASE_X}" y="${towerTopY - 24}" text-anchor="middle" font-size="13" font-weight="700" font-family="Roboto Mono, monospace" fill="${labelColor}">H = ${formatVal(round.H)}m</text>

            <!-- cable -->
            <path class="${cableClass}" d="${cablePath}" />
            ${sparks}

            <!-- anchor handle -->
            <g id="anchorHandle" class="anchor-handle anchor-state-${resolvedState}" tabindex="0" role="slider"
               aria-label="Anchor point distance from tower"
               aria-valuemin="0" aria-valuemax="${round.xMax}" aria-valuenow="${dragValue}">
                <circle class="handle-outer" cx="${handleX}" cy="${GROUND_Y}" r="12" stroke-width="2" />
                <circle class="handle-center" cx="${handleX}" cy="${GROUND_Y}" r="4" />
            </g>
        </svg>`;

    document.getElementById('bridgeStage').innerHTML = svg;
}

// ---------- LIVE READOUTS + GAUGE ----------
function updateLiveReadouts() {
    const liveY = liveCableLength(dragValue);
    document.getElementById('currentDistanceValue').innerText = formatMeters(dragValue);
    document.getElementById('liveCableValue').innerText = liveY.toFixed(1) + ' m';
    document.getElementById('requiredCableValue').innerText = formatMeters(round.R);

    const gaugeMax = round.R * 1.6;
    const pct = Math.max(0, Math.min(100, (liveY / gaugeMax) * 100));
    const fill = document.getElementById('tensionFill');
    fill.style.width = `${pct}%`;

    if (Math.abs(liveY - round.R) <= LOCK_TOLERANCE) {
        fill.style.backgroundColor = 'var(--accent-green)';
    } else if (liveY < round.R) {
        fill.style.backgroundColor = 'var(--accent-steel)';
    } else {
        fill.style.backgroundColor = 'var(--accent-red)';
    }
}

function setDragValue(x) {
    dragValue = Math.max(0, Math.min(round.xMax, Math.round(x * 10) / 10));
    const handle = document.getElementById('anchorHandle');
    if (handle) handle.setAttribute('aria-valuenow', dragValue);
    const handleX = TOWER_BASE_X + dragValue * round.scalePx;
    const towerTopY = GROUND_Y - round.H * round.scalePx;
    const circles = handle ? handle.querySelectorAll('circle') : [];
    circles.forEach((c) => c.setAttribute('cx', handleX));
    const cable = document.querySelector('#bridgeStage .cable-line');
    if (cable) cable.setAttribute('d', `M ${TOWER_BASE_X} ${towerTopY} L ${handleX} ${GROUND_Y}`);
    updateLiveReadouts();
}

function adjustAnchor(delta) {
    if (isResolved || !round) return;
    setDragValue(dragValue + delta);
}

// ---------- POINTER + KEYBOARD DRAG ----------
function svgXToMeters(clientX) {
    const svg = document.querySelector('#bridgeStage svg');
    if (!svg) return dragValue;
    const rect = svg.getBoundingClientRect();
    const ratio = SCENE_W / rect.width;
    const svgX = (clientX - rect.left) * ratio;
    return (svgX - TOWER_BASE_X) / round.scalePx;
}

function onStagePointerDown(e) {
    if (isResolved || !round) return;
    const handle = e.target.closest('#anchorHandle');
    if (!handle) return;
    isDragging = true;
    activePointerId = e.pointerId;
    handle.setPointerCapture && handle.setPointerCapture(e.pointerId);
    handle.focus();
    setDragValue(svgXToMeters(e.clientX));
    e.preventDefault();
}

function onWindowPointerMove(e) {
    if (!isDragging || isResolved) return;
    if (activePointerId !== null && e.pointerId !== activePointerId) return;
    setDragValue(svgXToMeters(e.clientX));
}

function onWindowPointerUp(e) {
    if (activePointerId !== null && e.pointerId !== activePointerId) return;
    isDragging = false;
    activePointerId = null;
}

function onStageKeyDown(e) {
    if (isResolved || !round) return;
    const target = e.target.closest && e.target.closest('#anchorHandle');
    if (!target) return;
    const big = e.shiftKey ? 1 : 0.1;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        adjustAnchor(-big);
        e.preventDefault();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        adjustAnchor(big);
        e.preventDefault();
    } else if (e.key === 'Home') {
        setDragValue(0);
        e.preventDefault();
    } else if (e.key === 'End') {
        setDragValue(round.xMax);
        e.preventDefault();
    }
}

// ---------- GAME FLOW ----------
function startSurvey() {
    const name = ArcadeKit.requireName('playerNameInput', 'playerNameError');
    if (!name) return;
    playerName = name;

    currentIndex = 0;
    score = 0;
    stability = 3;
    activeTowers = ArcadeKit.sample(towerBank, TOTAL_ROUNDS);

    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('failScreen').style.display = 'none';
    document.getElementById('victoryScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';

    loadTower();
}

function loadTower() {
    isResolved = false;
    isDragging = false;
    activePointerId = null;
    document.getElementById('feedbackLine').innerText = '';
    document.getElementById('feedbackLine').className = 'feedback-line';

    const entry = activeTowers[currentIndex];
    round = buildRound(entry);
    dragValue = Math.round((round.xMax * 0.3) * 10) / 10;

    document.getElementById('roundCounter').innerText = `${currentIndex + 1} / ${activeTowers.length}`;
    document.getElementById('stabilityDisplay').innerText = `${stability} / 3`;
    document.getElementById('scoreDisplay').innerText = `${score} PTS`;

    let qText;
    if (entry.mode === 'findC') {
        qText = `Tower height is <strong>${formatVal(round.H)} m</strong>. The rigging crew already cut a cable rated at exactly <strong>${formatVal(round.R)} m</strong>. Drag the anchor to the horizontal distance where that cable would pull dead taut.`;
    } else {
        qText = `Tower height is <strong>${formatVal(round.H)} m</strong>, and the cable spanning to the anchor measures exactly <strong>${formatVal(round.R)} m</strong>. Drag the anchor to the horizontal distance where the geometry actually works out.`;
    }
    document.getElementById('questionText').innerHTML = qText;

    renderScene('none');
    updateLiveReadouts();

    document.getElementById('lockAnchorBtn').disabled = false;
    document.getElementById('nudgeMinus1').disabled = false;
    document.getElementById('nudgeMinus01').disabled = false;
    document.getElementById('nudgePlus01').disabled = false;
    document.getElementById('nudgePlus1').disabled = false;
}

function lockAnchor() {
    if (isResolved || !round) return;
    isResolved = true;

    document.getElementById('lockAnchorBtn').disabled = true;
    document.getElementById('nudgeMinus1').disabled = true;
    document.getElementById('nudgeMinus01').disabled = true;
    document.getElementById('nudgePlus01').disabled = true;
    document.getElementById('nudgePlus1').disabled = true;

    const liveY = liveCableLength(dragValue);
    const diff = liveY - round.R;
    const feedback = document.getElementById('feedbackLine');
    const correctText = formatMeters(round.A);

    if (Math.abs(diff) <= LOCK_TOLERANCE) {
        score += 100;
        renderScene('success');
        feedback.className = 'feedback-line text-success';
        feedback.innerText = `✅ ANCHOR SECURE // +100 PTS — cable pulled dead taut at ${formatMeters(dragValue)}. ${pick(successLines)}`;

        setTimeout(() => {
            currentIndex++;
            if (currentIndex >= activeTowers.length) {
                triggerVictory();
            } else {
                loadTower();
            }
        }, 1300);

    } else {
        stability--;
        document.getElementById('stabilityDisplay').innerText = `${stability} / 3`;

        if (diff < 0) {
            renderScene('slack');
            feedback.className = 'feedback-line text-error';
            feedback.innerText = `🪢 SLACK CABLE // -1 STABILITY — anchor was too close to the tower. Correct anchor distance was ${correctText}. ${pick(slackLines)}`;
        } else {
            renderScene('overtension');
            feedback.className = 'feedback-line text-error';
            feedback.innerText = `⚡ OVER-TENSION // -1 STABILITY — anchor was too far out. Correct anchor distance was ${correctText}. ${pick(overtensionLines)}`;
        }

        if (stability <= 0) {
            setTimeout(() => {
                triggerFail();
            }, 1800);
        } else {
            setTimeout(() => {
                currentIndex++;
                if (currentIndex >= activeTowers.length) {
                    triggerVictory();
                } else {
                    loadTower();
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

function restartSurvey() {
    startSurvey();
}

// ---------- EVENT WIRING (script.js is loaded with `defer`, so the DOM is ready) ----------
document.getElementById('bridgeStage').addEventListener('pointerdown', onStagePointerDown);
document.getElementById('bridgeStage').addEventListener('keydown', onStageKeyDown);
window.addEventListener('pointermove', onWindowPointerMove);
window.addEventListener('pointerup', onWindowPointerUp);
window.addEventListener('pointercancel', onWindowPointerUp);

document.getElementById('nudgeMinus1').addEventListener('click', () => adjustAnchor(-1));
document.getElementById('nudgeMinus01').addEventListener('click', () => adjustAnchor(-0.1));
document.getElementById('nudgePlus01').addEventListener('click', () => adjustAnchor(0.1));
document.getElementById('nudgePlus1').addEventListener('click', () => adjustAnchor(1));
document.getElementById('lockAnchorBtn').addEventListener('click', lockAnchor);
