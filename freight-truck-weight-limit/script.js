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
    host.onclick = handleLineClick;
}

function handleLineClick(e) {
    if (isLocked) return;
    const svgEl = document.getElementById('numberLineHost').querySelector('svg');
    const rect = svgEl.getBoundingClientRect();
    const scaleX = 640 / rect.width;
    const localX = (e.clientX - rect.left) * scaleX;
    selectedValue = xToValue(localX);
    drawNumberLine();
}

function setOpenClosed(kind) {
    if (isLocked) return;
    selectedCircle = kind;
    document.getElementById('openBtn').classList.toggle('active', kind === 'open');
    document.getElementById('closedBtn').classList.toggle('active', kind === 'closed');
    drawNumberLine();
}

function setDirection(dir) {
    if (isLocked) return;
    selectedDirection = dir;
    document.getElementById('leftBtn').classList.toggle('active', dir === 'left');
    document.getElementById('rightBtn').classList.toggle('active', dir === 'right');
    drawNumberLine();
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

    // Reset marker / toggles to neutral defaults for the new round
    selectedValue = 0;
    selectedCircle = 'closed';
    selectedDirection = 'right';
    document.getElementById('openBtn').classList.remove('active');
    document.getElementById('closedBtn').classList.add('active');
    document.getElementById('leftBtn').classList.remove('active');
    document.getElementById('rightBtn').classList.add('active');

    drawNumberLine();
}

function certifySolution() {
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
    } else {
        strain--;
        feedback.className = 'feedback-line text-error';
        feedback.innerText = `❌ REJECTED AT THE SCALE — Correct solution was: ${correctSummary} (${expectedCircle} circle, shade ${expectedDirection})`;
        document.getElementById('strainDisplay').innerText = `${strain} / 3`;
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
    ArcadeKit.showPlayerName(playerName, ['playerNameDisplayFail']);
}

function triggerVictory() {
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('victoryScreen').style.display = 'flex';
    document.getElementById('victoryScore').innerText = score;
    ArcadeKit.showPlayerName(playerName, ['playerNameDisplayWin']);
}

function restartInspection() {
    startInspection();
}
