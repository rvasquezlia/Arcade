// PYTHAGOREAN THEOREM DATA BANK (a^2 + b^2 = c^2)
// Every hypotenuse/leg value below was hand-calculated and cross-checked:
//   findC:   c = sqrt(a^2 + b^2)
//   findLeg: b = sqrt(c^2 - a^2)   (a is the known leg, b is the unknown leg)
// Distractor options are classic student mistakes: a+b (adding instead of
// using the theorem), |leg difference|, and a plausible near-miss value.
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

// GAME STATE
let activeTowers = [];
let currentIndex = 0;
let score = 0;
let stability = 3;
let isDarkMode = true;
let isLocked = false;
let playerName = '';

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
    renderTriangle();
}

function formatVal(v) {
    return Number.isInteger(v) ? String(v) : v.toFixed(1);
}

// Build the right-triangle diagram SVG for the current question
function renderTriangle() {
    const tData = activeTowers[currentIndex];
    if (!tData) return;

    const lineColor = isDarkMode ? '#5eb1e0' : '#1c6fa0';
    const fillColor = isDarkMode ? 'rgba(94, 177, 224, 0.12)' : 'rgba(28, 111, 160, 0.10)';
    const labelColor = isDarkMode ? '#eef2f5' : '#161a17';
    const unknownColor = isDarkMode ? '#f2c94c' : '#8a6d1a';

    // Fixed schematic triangle: right angle at bottom-left.
    // Horizontal leg = a (bottom), vertical leg = b (left), hypotenuse = c (diagonal).
    const p1 = { x: 30, y: 190 };  // bottom-left (right angle)
    const p2 = { x: 250, y: 190 }; // bottom-right
    const p3 = { x: 30, y: 40 };   // top-left

    let aLabel, bLabel, cLabel;
    if (tData.mode === 'findC') {
        aLabel = `a = ${formatVal(tData.a)} m`;
        bLabel = `b = ${formatVal(tData.b)} m`;
        cLabel = `c = ?`;
    } else {
        aLabel = `a = ${formatVal(tData.a)} m`;
        bLabel = `b = ?`;
        cLabel = `c = ${formatVal(tData.c)} m`;
    }

    const cIsUnknown = tData.mode === 'findC';
    const bIsUnknown = tData.mode === 'findLeg';

    const svg = `
        <svg viewBox="0 0 280 220" preserveAspectRatio="xMidYMid meet">
            <polygon points="${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}" fill="${fillColor}" stroke="${lineColor}" stroke-width="3" stroke-linejoin="round" />
            <rect x="${p1.x}" y="${p1.y - 14}" width="14" height="14" fill="none" stroke="${lineColor}" stroke-width="2" />

            <!-- Tower / anchor icons -->
            <circle cx="${p1.x}" cy="${p1.y}" r="4" fill="${lineColor}" />
            <circle cx="${p2.x}" cy="${p2.y}" r="4" fill="${lineColor}" />
            <circle cx="${p3.x}" cy="${p3.y}" r="4" fill="${lineColor}" />

            <!-- Leg a (horizontal) label -->
            <text x="${(p1.x + p2.x) / 2}" y="${p1.y + 22}" text-anchor="middle" font-size="14" font-weight="700" font-family="Roboto Mono, monospace" fill="${labelColor}">${aLabel}</text>

            <!-- Leg b (vertical) label -->
            <text x="${p1.x - 10}" y="${(p1.y + p3.y) / 2}" text-anchor="end" font-size="14" font-weight="700" font-family="Roboto Mono, monospace" fill="${bIsUnknown ? unknownColor : labelColor}" transform="rotate(-90 ${p1.x - 10} ${(p1.y + p3.y) / 2})">${bLabel}</text>

            <!-- Hypotenuse c label -->
            <text x="${(p2.x + p3.x) / 2 + 14}" y="${(p2.y + p3.y) / 2 - 6}" text-anchor="middle" font-size="14" font-weight="700" font-family="Roboto Mono, monospace" fill="${cIsUnknown ? unknownColor : labelColor}">${cLabel}</text>
        </svg>`;

    document.getElementById('trianglePanel').innerHTML = svg;
}

// Start Survey
function startSurvey() {
    const name = ArcadeKit.requireName('playerNameInput', 'playerNameError');
    if (!name) return;
    playerName = name;

    currentIndex = 0;
    score = 0;
    stability = 3;
    isLocked = false;
    activeTowers = ArcadeKit.sample(towerBank, TOTAL_ROUNDS);

    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('failScreen').style.display = 'none';
    document.getElementById('victoryScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';

    loadTower();
}

function loadTower() {
    isLocked = false;
    document.getElementById('feedbackLine').innerText = '';
    document.getElementById('feedbackLine').className = 'feedback-line';

    const tData = activeTowers[currentIndex];

    document.getElementById('roundCounter').innerText = `${currentIndex + 1} / ${activeTowers.length}`;
    document.getElementById('stabilityDisplay').innerText = `${stability} / 3`;
    document.getElementById('scoreDisplay').innerText = `${score} PTS`;
    updateTensionGauge();

    let qText;
    if (tData.mode === 'findC') {
        qText = `The tower's horizontal footing runs <strong>a = ${formatVal(tData.a)} m</strong> and its vertical height is <strong>b = ${formatVal(tData.b)} m</strong>. Find the length of the diagonal anchor cable <strong>c</strong>${tData.approx ? ' (round to 1 decimal place)' : ''}.`;
    } else {
        qText = `The anchor cable measures <strong>c = ${formatVal(tData.c)} m</strong> and the horizontal footing is <strong>a = ${formatVal(tData.a)} m</strong>. Find the missing vertical tower height <strong>b</strong>${tData.approx ? ' (round to 1 decimal place)' : ''}.`;
    }
    document.getElementById('questionText').innerHTML = qText;

    renderTriangle();

    // Shuffle option order
    const correctStr = formatVal(tData.correct) + ' m';
    const shuffledOptions = ArcadeKit.shuffle(tData.options.map(v => formatVal(v) + ' m'));
    const grid = document.getElementById('optionsGrid');
    grid.innerHTML = '';
    shuffledOptions.forEach(optText => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = optText;
        btn.onclick = () => evaluateAnswer(optText, correctStr, btn);
        grid.appendChild(btn);
    });
}

function updateTensionGauge() {
    const pct = Math.round((stability / 3) * 100);
    const fill = document.getElementById('tensionFill');
    fill.style.width = `${pct}%`;
    if (stability >= 3) {
        fill.style.backgroundColor = 'var(--accent-green)';
    } else if (stability === 2) {
        fill.style.backgroundColor = 'var(--accent-yellow)';
    } else {
        fill.style.backgroundColor = 'var(--accent-red)';
    }
}

function evaluateAnswer(selectedOpt, correctOpt, btnEl) {
    if (isLocked) return;
    isLocked = true;

    const feedback = document.getElementById('feedbackLine');

    if (selectedOpt === correctOpt) {
        score += 100;
        btnEl.style.borderColor = 'var(--accent-green)';
        btnEl.style.background = 'rgba(79, 191, 131, 0.15)';
        feedback.className = 'feedback-line text-success';
        feedback.innerText = `✅ ANCHOR SECURE // +100 PTS — c${'²'} = a${'²'} + b${'²'} confirmed`;

        setTimeout(() => {
            currentIndex++;
            if (currentIndex >= activeTowers.length) {
                triggerVictory();
            } else {
                loadTower();
            }
        }, 1200);

    } else {
        stability--;
        btnEl.style.borderColor = 'var(--accent-red)';
        btnEl.style.background = 'rgba(224, 82, 79, 0.15)';
        feedback.className = 'feedback-line text-error';
        feedback.innerText = `❌ ANCHOR FAILED // -1 STABILITY — Correct cable/leg length was ${correctOpt}`;

        updateTensionGaugeStability();

        if (stability <= 0) {
            setTimeout(() => {
                triggerFail();
            }, 1600);
        } else {
            setTimeout(() => {
                currentIndex++;
                if (currentIndex >= activeTowers.length) {
                    triggerVictory();
                } else {
                    loadTower();
                }
            }, 1600);
        }
    }
}

function updateTensionGaugeStability() {
    document.getElementById('stabilityDisplay').innerText = `${stability} / 3`;
    updateTensionGauge();
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
