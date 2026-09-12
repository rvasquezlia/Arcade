// TWO-STEP INEQUALITY DATA BANK
// Every boundary value and comparator was hand-solved and double-checked,
// including sign flips whenever both sides are divided by a negative number.
// comparator is the FINAL solved-form comparator (x [comparator] boundary):
//   '<'  -> open circle,  shade LEFT
//   '<=' -> closed circle, shade LEFT
//   '>'  -> open circle,  shade RIGHT
//   '>=' -> closed circle, shade RIGHT
const inequalityBank = [
    { text: '3x + 4 ≤ 19', boundary: 5, comparator: '<=' },
    { text: '2x - 5 > 7', boundary: 6, comparator: '>' },
    { text: '-4x + 6 ≤ 22', boundary: -4, comparator: '>=' },
    { text: '5x + 2 < -13', boundary: -3, comparator: '<' },
    { text: '-2x - 3 ≥ 7', boundary: -5, comparator: '<=' },
    { text: '6x - 9 ≤ 21', boundary: 5, comparator: '<=' },
    { text: '4x + 7 > 27', boundary: 5, comparator: '>' },
    { text: '-3x + 5 < 26', boundary: -7, comparator: '>' },
    { text: '7x - 2 ≥ 19', boundary: 3, comparator: '>=' },
    { text: '2x + 9 < 3', boundary: -3, comparator: '<' },
    { text: '-5x + 10 > -15', boundary: 5, comparator: '<' },
    { text: '8x - 3 ≤ 29', boundary: 4, comparator: '<=' },
    { text: '-6x - 4 ≥ 20', boundary: -4, comparator: '<=' },
    { text: '3x - 7 > -1', boundary: 2, comparator: '>' },
    { text: '-2x + 8 < 2', boundary: 3, comparator: '>' },
    { text: '9x + 1 ≤ 28', boundary: 3, comparator: '<=' },
    { text: '4x - 6 ≥ 2', boundary: 2, comparator: '>=' },
    { text: '-3x + 1 ≤ 10', boundary: -3, comparator: '>=' },
    { text: '5x + 4 < -6', boundary: -2, comparator: '<' },
    { text: '-4x - 2 > 6', boundary: -2, comparator: '<' },
    { text: '2x + 11 ≥ 7', boundary: -2, comparator: '>=' },
    { text: '-x + 5 < 9', boundary: -4, comparator: '>' },
    { text: '6x - 4 > 8', boundary: 2, comparator: '>' },
    { text: '-7x + 3 ≥ -18', boundary: 3, comparator: '<=' }
];

const TOTAL_ROUNDS = 12;
const LINE_MIN = -10;
const LINE_MAX = 10;
const SVG_LEFT = 30;
const SVG_RIGHT = 610;
const SVG_Y = 60;

// Drag-vs-tap tuning, in the SVG's local 640-unit coordinate space
// (one integer tick is ~29 units wide at this viewBox scale).
const DRAG_PIXEL_THRESHOLD = 8;
const MARKER_HIT_RADIUS = 24;

// GRUMPY INSPECTOR FLAVOR TEXT
const idleLines = [
    "Well? I don't have all day. Solve it.",
    "Chop chop. The line behind you is getting long.",
    "I've seen freshman fractions move faster than this.",
    "Don't just stare at the manifest — drag something.",
    "Cargo doesn't graph itself, kid.",
    "Every minute you stall, I get grumpier. And I'm already at an 8.",
    "Convince me this truck deserves to cross my bridge."
];
const correctLines = [
    "...Fine. That's correct. Don't get used to my approval.",
    "Huh. Didn't expect that. Cleared for crossing.",
    "Correct. I'm writing it down before I change my mind.",
    "The math checks out. So does the truck. Go on, get out of here.",
    "Acceptable. Barely. Move along.",
    "That's a clean graph. I almost smiled. Almost."
];
const incorrectLines = [
    "Rejected! That shading's about as right as a square wheel.",
    "Nope. Try again before I confiscate your calculator.",
    "Wrong circle, wrong shading, wrong day to test me.",
    "This truck isn't crossing my bridge looking like that.",
    "Back it up. Literally. Redo the graph.",
    "That boundary is not where I hoped it would be. Again."
];
const failLines = [
    "Bridge's closed. Go find a detour and some algebra tutoring.",
    "Structural strain's gone. So has my patience. We're done here.",
    "That's three strikes. The bridge — and my mood — are closed for the day."
];
const victoryLines = [
    "...Every truck, clean. Fine, you're the best inspector I've trained. Don't let it go to your head.",
    "Convoy cleared. I'm almost proud. Almost.",
    "Perfect record. I'm updating my report to say 'exceptional,' and I hate that word."
];

function pickLine(lines) {
    return lines[Math.floor(Math.random() * lines.length)];
}

// GAME STATE
let activeTrucks = [];
let currentIndex = 0;
let score = 0;
let strain = 3;
let isDarkMode = true;
let isLocked = false;
let playerName = '';

// Interactive marker state for the current round
let selectedValue = 0;
let selectedCircle = 'closed';
let selectedDirection = 'right';

// Active pointer-drag tracking (null when no pointer is down on the scale)
let dragState = null;

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
    drawNumberLine();
}

function valueToX(v) {
    const step = (SVG_RIGHT - SVG_LEFT) / (LINE_MAX - LINE_MIN);
    return SVG_LEFT + (v - LINE_MIN) * step;
}

function xToValue(x) {
    const step = (SVG_RIGHT - SVG_LEFT) / (LINE_MAX - LINE_MIN);
    let v = Math.round((x - SVG_LEFT) / step) + LINE_MIN;
    return Math.max(LINE_MIN, Math.min(LINE_MAX, v));
}

// Build & render the interactive number line SVG
function drawNumberLine() {
    const lineColor = isDarkMode ? '#4b5160' : '#a8a290';
    const tickColor = isDarkMode ? '#5b6272' : '#8f8a78';
    const labelColor = isDarkMode ? '#9aa0a8' : '#5c584c';
    const accent = isDarkMode ? '#f5a623' : '#b3690a';
    const markerFillOpen = isDarkMode ? '#17191c' : '#ffffff';

    let ticks = '';
    for (let v = LINE_MIN; v <= LINE_MAX; v++) {
        const x = valueToX(v);
        const isMajor = v % 2 === 0;
        const h = isMajor ? 16 : 8;
        ticks += `<line x1="${x}" y1="${SVG_Y - h / 2}" x2="${x}" y2="${SVG_Y + h / 2}" stroke="${tickColor}" stroke-width="2" />`;
        if (isMajor) {
            ticks += `<text x="${x}" y="${SVG_Y + 34}" text-anchor="middle" font-size="13" font-family="IBM Plex Mono, monospace" fill="${labelColor}">${v}</text>`;
        }
    }

    // Shading from marker to the chosen edge
    const markerX = valueToX(selectedValue);
    let shading = '';
    if (selectedDirection === 'left') {
        shading = `<line x1="${markerX}" y1="${SVG_Y}" x2="${SVG_LEFT}" y2="${SVG_Y}" stroke="${accent}" stroke-width="7" stroke-linecap="round" opacity="0.55" />
                    <polygon points="${SVG_LEFT - 4},${SVG_Y} ${SVG_LEFT + 12},${SVG_Y - 8} ${SVG_LEFT + 12},${SVG_Y + 8}" fill="${accent}" opacity="0.85" />`;
    } else if (selectedDirection === 'right') {
        shading = `<line x1="${markerX}" y1="${SVG_Y}" x2="${SVG_RIGHT}" y2="${SVG_Y}" stroke="${accent}" stroke-width="7" stroke-linecap="round" opacity="0.55" />
                    <polygon points="${SVG_RIGHT + 4},${SVG_Y} ${SVG_RIGHT - 12},${SVG_Y - 8} ${SVG_RIGHT - 12},${SVG_Y + 8}" fill="${accent}" opacity="0.85" />`;
    }

    const markerFill = selectedCircle === 'closed' ? accent : markerFillOpen;

    const svg = `
        <svg viewBox="0 0 640 110" preserveAspectRatio="xMidYMid meet">
            <line x1="${SVG_LEFT}" y1="${SVG_Y}" x2="${SVG_RIGHT}" y2="${SVG_Y}" stroke="${lineColor}" stroke-width="3" />
            ${shading}
            ${ticks}
            <circle cx="${markerX}" cy="${SVG_Y}" r="10" fill="${markerFill}" stroke="${accent}" stroke-width="3" />
            <text x="${markerX}" y="${SVG_Y - 18}" text-anchor="middle" font-size="14" font-weight="700" font-family="IBM Plex Mono, monospace" fill="${accent}">x = ${selectedValue}</text>
        </svg>`;

    const host = document.getElementById('numberLineHost');
    host.innerHTML = svg;
    host.onpointerdown = handlePointerDown;
    host.onpointermove = handlePointerMove;
    host.onpointerup = handlePointerUp;
    host.onpointercancel = handlePointerCancel;
}

// Converts a pointer event's clientX into the SVG's local 0-640 coordinate space.
function getLocalX(e) {
    const host = document.getElementById('numberLineHost');
    const rect = host.getBoundingClientRect();
    const scaleX = 640 / rect.width;
    return (e.clientX - rect.left) * scaleX;
}

// Press down anywhere on the scale to start building a graph:
//  - press near the current marker and release without moving -> toggles open/closed
//  - press anywhere and drag left or right -> paints the shaded ray from the press point
//  - press elsewhere and release without moving -> just relocates the boundary point
function handlePointerDown(e) {
    if (isLocked) return;
    const host = document.getElementById('numberLineHost');
    const localX = getLocalX(e);
    const markerX = valueToX(selectedValue);
    dragState = {
        downLocalX: localX,
        downValueSnapped: xToValue(localX),
        isNearMarker: Math.abs(localX - markerX) <= MARKER_HIT_RADIUS,
        moved: false,
        pointerId: e.pointerId
    };
    try { host.setPointerCapture(e.pointerId); } catch (err) { /* touch fallback */ }
    host.classList.add('dragging');
    e.preventDefault();
}

function handlePointerMove(e) {
    if (!dragState || isLocked) return;
    const localX = getLocalX(e);
    const dx = localX - dragState.downLocalX;
    if (Math.abs(dx) > DRAG_PIXEL_THRESHOLD) {
        dragState.moved = true;
        selectedValue = dragState.downValueSnapped;
        selectedDirection = dx < 0 ? 'left' : 'right';
        drawNumberLine();
    }
    e.preventDefault();
}

function handlePointerUp(e) {
    if (!dragState) return;
    if (isLocked) { dragState = null; return; }
    if (!dragState.moved) {
        if (dragState.isNearMarker) {
            selectedCircle = (selectedCircle === 'closed') ? 'open' : 'closed';
        } else {
            selectedValue = dragState.downValueSnapped;
        }
        drawNumberLine();
    }
    const host = document.getElementById('numberLineHost');
    try { host.releasePointerCapture(dragState.pointerId); } catch (err) { /* no-op */ }
    host.classList.remove('dragging');
    dragState = null;
    e.preventDefault();
}

function handlePointerCancel() {
    const host = document.getElementById('numberLineHost');
    if (host) host.classList.remove('dragging');
    dragState = null;
}

function setInspectorMood(mood, text) {
    const avatar = document.getElementById('inspectorAvatar');
    const bubble = document.getElementById('inspectorBubble');
    if (!avatar || !bubble) return;
    bubble.classList.remove('mood-idle', 'mood-success', 'mood-error');
    bubble.classList.add('mood-' + mood);
    bubble.innerText = text;
    avatar.innerText = mood === 'success' ? '😏' : (mood === 'error' ? '😠' : '🧐');
}

// Start Inspection
function startInspection() {
    const name = ArcadeKit.requireName('playerNameInput', 'playerNameError');
    if (!name) return;
    playerName = name;

    currentIndex = 0;
    score = 0;
    strain = 3;
    isLocked = false;
    activeTrucks = ArcadeKit.sample(inequalityBank, TOTAL_ROUNDS);

    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('failScreen').style.display = 'none';
    document.getElementById('victoryScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';

    loadTruck();
}

function loadTruck() {
    isLocked = false;
    document.getElementById('feedbackLine').innerText = '';
    document.getElementById('feedbackLine').className = 'feedback-line';

    const tData = activeTrucks[currentIndex];

    document.getElementById('roundCounter').innerText = `${currentIndex + 1} / ${activeTrucks.length}`;
    document.getElementById('strainDisplay').innerText = `${strain} / 3`;
    document.getElementById('scoreDisplay').innerText = `${score} PTS`;
    document.getElementById('inequalityText').innerText = tData.text;

    // Reset marker to neutral defaults for the new round
    selectedValue = 0;
    selectedCircle = 'closed';
    selectedDirection = 'right';
    dragState = null;

    setInspectorMood('idle', pickLine(idleLines));

    drawNumberLine();
}

function inspectCargo() {
    if (isLocked) return;
    isLocked = true;

    const tData = activeTrucks[currentIndex];
    const feedback = document.getElementById('feedbackLine');

    const expectedCircle = (tData.comparator === '<' || tData.comparator === '>') ? 'open' : 'closed';
    const expectedDirection = (tData.comparator === '<' || tData.comparator === '<=') ? 'left' : 'right';

    const valueOK = selectedValue === tData.boundary;
    const circleOK = selectedCircle === expectedCircle;
    const directionOK = selectedDirection === expectedDirection;
    const fullyCorrect = valueOK && circleOK && directionOK;

    const symbolMap = { '<': '<', '<=': '≤', '>': '>', '>=': '≥' };
    const correctSummary = `x ${symbolMap[tData.comparator]} ${tData.boundary}`;

    if (fullyCorrect) {
        score += 100;
        feedback.className = 'feedback-line text-success';
        feedback.innerText = `✅ CLEARED FOR CROSSING // +100 PTS — Solution: ${correctSummary}`;
        setInspectorMood('success', pickLine(correctLines));
    } else {
        strain--;
        feedback.className = 'feedback-line text-error';
        feedback.innerText = `❌ REJECTED AT THE SCALE — Correct solution was: ${correctSummary} (${expectedCircle} circle, shade ${expectedDirection})`;
        document.getElementById('strainDisplay').innerText = `${strain} / 3`;
        setInspectorMood('error', pickLine(incorrectLines));
    }

    if (!fullyCorrect && strain <= 0) {
        setTimeout(() => {
            triggerFail();
        }, 1900);
    } else {
        setTimeout(() => {
            currentIndex++;
            if (currentIndex >= activeTrucks.length) {
                triggerVictory();
            } else {
                loadTruck();
            }
        }, 1900);
    }
}

function triggerFail() {
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('failScreen').style.display = 'flex';
    document.getElementById('failScore').innerText = score;
    document.getElementById('failInspectorLine').innerText = `"${pickLine(failLines)}"`;
    ArcadeKit.showPlayerName(playerName, ['playerNameDisplayFail']);
}

function triggerVictory() {
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('victoryScreen').style.display = 'flex';
    document.getElementById('victoryScore').innerText = score;
    document.getElementById('winInspectorLine').innerText = `"${pickLine(victoryLines)}"`;
    ArcadeKit.showPlayerName(playerName, ['playerNameDisplayWin']);
}

function restartInspection() {
    startInspection();
}
