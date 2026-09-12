// PARTICLE CLASSIFICATION DATA BANK (Rational vs. Irrational)
// Every entry was hand-verified: rational = terminating/repeating decimal,
// integer, or exact ratio of integers (including sqrt of a perfect square
// or perfect-square fraction). Irrational = non-repeating, non-terminating
// decimal, or sqrt of a non-perfect square.
// Labels are plain text/unicode (no MathJax) so they can be drawn straight
// onto the game canvas every frame without an external rendering pass.
const particleBank = [
    // ---- RATIONAL (12) ----
    { display: '0.5', rational: true, explain: '0.5 = 1/2, a terminating decimal — RATIONAL.' },
    { display: '3/4', rational: true, explain: 'A ratio of two integers is always RATIONAL.' },
    { display: '-7', rational: true, explain: 'Every integer can be written as itself/1 — RATIONAL.' },
    { display: '√16', rational: true, explain: '√16 = 4, a whole number — RATIONAL.' },
    { display: '√100', rational: true, explain: '√100 = 10, a whole number — RATIONAL.' },
    { display: '0.(3)', rational: true, explain: '0.333... repeats forever and equals 1/3 — RATIONAL.' },
    { display: '22/7', rational: true, explain: 'It is a ratio of two integers (even though it approximates π) — RATIONAL.' },
    { display: '√(9/16)', rational: true, explain: '√(9/16) = 3/4, a perfect-square fraction — RATIONAL.' },
    { display: '1.75', rational: true, explain: '1.75 = 7/4, a terminating decimal — RATIONAL.' },
    { display: '0.(18)', rational: true, explain: '0.181818... repeats forever and equals 2/11 — RATIONAL.' },
    { display: '6', rational: true, explain: 'Every whole number is RATIONAL (6 = 6/1).' },
    { display: '-0.6', rational: true, explain: '-0.6 = -3/5, a terminating decimal — RATIONAL.' },

    // ---- IRRATIONAL (12) ----
    { display: '√17', rational: false, explain: '17 is not a perfect square, so √17 never terminates or repeats — IRRATIONAL.' },
    { display: 'π', rational: false, explain: 'π is a proven non-repeating, non-terminating decimal — IRRATIONAL.' },
    { display: '√2', rational: false, explain: '2 is not a perfect square — IRRATIONAL.' },
    { display: '√50', rational: false, explain: '√50 = 5√2; a nonzero rational times an irrational stays IRRATIONAL.' },
    { display: '0.101001000100001...', rational: false, explain: 'The pattern of zeros keeps growing and never repeats or terminates — IRRATIONAL.' },
    { display: '√7', rational: false, explain: '7 is not a perfect square — IRRATIONAL.' },
    { display: '√20', rational: false, explain: '√20 = 2√5, a nonzero rational times an irrational — IRRATIONAL.' },
    { display: '√(1/2)', rational: false, explain: '√(1/2) = √2 / 2, still IRRATIONAL.' },
    { display: '1.41421356...', rational: false, explain: 'This is the decimal expansion of √2 — never repeats or terminates — IRRATIONAL.' },
    { display: '2√3', rational: false, explain: 'A nonzero rational (2) times an irrational (√3) is IRRATIONAL.' },
    { display: '√99', rational: false, explain: '99 = 9 × 11, not a perfect square, so √99 = 3√11 — IRRATIONAL.' },
    { display: '-√10', rational: false, explain: '10 is not a perfect square — IRRATIONAL.' }
];

// ---- TUNABLE GAME CONSTANTS ----
const TARGET_CATCHES = 12;          // correct catches needed to win
const INTEGRITY_MAX = 5;            // lives
const BASE_FALL_SPEED = 70;         // px/sec, first particle
const MAX_FALL_SPEED = 170;         // px/sec cap
const SPEED_RAMP_PER_CATCH = 9;     // px/sec added per resolved particle
const COLLECTOR_SPEED = 460;        // px/sec, keyboard movement
const COLLECTOR_WIDTH = 110;
const COLLECTOR_HEIGHT = 24;
const COLLECTOR_BOTTOM_MARGIN = 56; // distance of collector top from canvas bottom
const PARTICLE_HIT_RADIUS = 24;
const CANVAS_LOGICAL_HEIGHT = 380;
const SPAWN_GAP_MS = 550;           // pause between particles
const END_SCREEN_DELAY_MS = 1300;

// Flavor lines — over-caffeinated physics-lab-assistant energy.
const correctLines = [
    'NICE CATCH!', 'Containment secured!', "The lab intern nods approvingly.",
    "Chef's kiss, particle-physics edition.", 'Textbook-perfect containment!',
    'The beam hums happily.', 'That particle never stood a chance.'
];
const wrongChamberLines = [
    'Wrong chamber! Cross-contamination alert!', 'Oof, that particle just filed a complaint.',
    'Close, but the numbers disagree.', 'Containment breach — wrong side!',
    'The lab cat just judged you.'
];
const floorMissLines = [
    'Uncontained! It hit the floor.', 'Whoops — the janitor sighs audibly.',
    'That one slipped right past.', 'Gravity: 1, You: 0.',
    'The particle escaped into the vents.'
];

// ---- GAME STATE ----
let score = 0;
let integrity = INTEGRITY_MAX;
let catches = 0;
let resolvedCount = 0;
let isDarkMode = true;
let playerName = '';
let gameRunning = false;

let queue = [];
let queuePos = 0;

let canvas = null;
let ctx = null;
let cw = 800;
let ch = CANVAS_LOGICAL_HEIGHT;

let collectorX = cw / 2;
let keys = { left: false, right: false };
let pointerActive = false;

let currentParticle = null;   // { data, x, y, speed }
let particleState = 'idle';   // 'idle' | 'falling' | 'resolved'
let bursts = [];

let rafId = null;
let lastFrameTime = 0;
let pendingTimeoutId = null;

let themeColors = {};

// ---------------------------------------------------------------
// Theme toggle
// ---------------------------------------------------------------
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
    if (ctx) drawFrame();
}

function hexToRgba(hex, alpha) {
    if (!hex) return `rgba(128,128,128,${alpha})`;
    let h = hex.trim().replace('#', '');
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    const num = parseInt(h, 16);
    if (isNaN(num)) return `rgba(128,128,128,${alpha})`;
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r},${g},${b},${alpha})`;
}

// Reads the live CSS custom properties into a plain color cache so the
// canvas never hardcodes a color outside the themed variables — this is
// re-run on every theme toggle so canvas colors track light/dark mode.
function refreshThemeColors() {
    const cs = getComputedStyle(document.body);
    const panel = cs.getPropertyValue('--panel-sunken').trim() || 'rgba(0,0,0,0.35)';
    const border = cs.getPropertyValue('--border-color').trim() || '#262b45';
    const text = cs.getPropertyValue('--text-primary').trim() || '#e8e9f5';
    const rational = cs.getPropertyValue('--accent-rational').trim() || '#34d399';
    const irrational = cs.getPropertyValue('--accent-irrational').trim() || '#d946ef';
    const cyan = cs.getPropertyValue('--accent-cyan').trim() || '#22d3ee';
    const cyanInk = cs.getPropertyValue('--kit-accent-ink').trim() || '#001217';

    themeColors = {
        panel,
        border,
        text,
        rational,
        irrational,
        rationalTint: hexToRgba(rational, 0.10),
        irrationalTint: hexToRgba(irrational, 0.10),
        particleGlow: hexToRgba(cyan, 0.55),
        cyan,
        cyanInk
    };
}

// ---------------------------------------------------------------
// Canvas setup
// ---------------------------------------------------------------
function initCanvas() {
    if (canvas) return; // already wired up
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    window.addEventListener('resize', () => {
        if (canvas) resizeCanvas();
    });

    canvas.addEventListener('pointerdown', (e) => {
        if (!gameRunning) return;
        pointerActive = true;
        try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
        updateCollectorFromPointer(e);
    });
    canvas.addEventListener('pointermove', (e) => {
        if (!gameRunning || !pointerActive) return;
        updateCollectorFromPointer(e);
    });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach((evt) => {
        canvas.addEventListener(evt, () => { pointerActive = false; });
    });
}

function updateCollectorFromPointer(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    collectorX = clamp(x, COLLECTOR_WIDTH / 2, cw - COLLECTOR_WIDTH / 2);
}

function resizeCanvas() {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    cw = Math.max(rect.width, 260);
    ch = CANVAS_LOGICAL_HEIGHT;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(cw * dpr);
    canvas.height = Math.round(ch * dpr);
    canvas.style.height = ch + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    collectorX = clamp(collectorX || cw / 2, COLLECTOR_WIDTH / 2, cw - COLLECTOR_WIDTH / 2);
}

function clamp(v, min, max) {
    return Math.min(Math.max(v, min), max);
}

function roundRect(context, x, y, w, h, r) {
    context.beginPath();
    context.moveTo(x + r, y);
    context.arcTo(x + w, y, x + w, y + h, r);
    context.arcTo(x + w, y + h, x, y + h, r);
    context.arcTo(x, y + h, x, y, r);
    context.arcTo(x, y, x + w, y, r);
    context.closePath();
}

function pickLine(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// ---------------------------------------------------------------
// Keyboard input (global — gated by gameRunning inside the loop)
// ---------------------------------------------------------------
document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        keys.left = true;
        if (gameRunning) e.preventDefault();
    } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        keys.right = true;
        if (gameRunning) e.preventDefault();
    }
});
document.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.left = false;
    else if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.right = false;
});

// ---------------------------------------------------------------
// Game flow
// ---------------------------------------------------------------
function startSequence() {
    const name = ArcadeKit.requireName('playerNameInput', 'playerNameError');
    if (!name) return;
    playerName = name;

    score = 0;
    integrity = INTEGRITY_MAX;
    catches = 0;
    resolvedCount = 0;
    bursts = [];
    currentParticle = null;
    particleState = 'idle';
    keys.left = false;
    keys.right = false;
    pointerActive = false;

    if (pendingTimeoutId) {
        clearTimeout(pendingTimeoutId);
        pendingTimeoutId = null;
    }

    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('failScreen').style.display = 'none';
    document.getElementById('victoryScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';

    document.getElementById('feedbackLine').innerText = '';
    document.getElementById('feedbackLine').className = 'feedback-line';

    initCanvas();
    resizeCanvas();
    refreshThemeColors();
    collectorX = cw / 2;

    queue = ArcadeKit.shuffle(particleBank);
    queuePos = 0;

    updateHUD();

    gameRunning = true;
    if (rafId) cancelAnimationFrame(rafId);
    lastFrameTime = performance.now();
    rafId = requestAnimationFrame(gameLoop);

    pendingTimeoutId = setTimeout(spawnNext, 400);
}

function spawnNext() {
    pendingTimeoutId = null;
    if (!gameRunning) return;

    if (queuePos >= queue.length) {
        queue = ArcadeKit.shuffle(particleBank);
        queuePos = 0;
    }
    const data = queue[queuePos++];
    const speed = Math.min(MAX_FALL_SPEED, BASE_FALL_SPEED + resolvedCount * SPEED_RAMP_PER_CATCH);

    currentParticle = {
        data,
        x: clamp(50 + Math.random() * (cw - 100), 50, cw - 50),
        y: -30,
        speed
    };
    particleState = 'falling';

    document.getElementById('feedbackLine').innerText = '';
    document.getElementById('feedbackLine').className = 'feedback-line';
}

function updateHUD() {
    document.getElementById('roundCounter').innerText = `${catches} / ${TARGET_CATCHES}`;
    document.getElementById('integrityDisplay').innerText = `${Math.max(integrity, 0)} / ${INTEGRITY_MAX}`;
    document.getElementById('scoreDisplay').innerText = `${score} PTS`;
}

function showFeedback(success, msg) {
    const el = document.getElementById('feedbackLine');
    el.className = 'feedback-line ' + (success ? 'text-success' : 'text-error');
    el.innerText = (success ? '✅ ' : '❌ ') + msg;
}

function spawnBurst(x, y, color, count) {
    count = count || 14;
    for (let i = 0; i < count; i++) {
        bursts.push({
            x, y,
            vx: (Math.random() - 0.5) * 240,
            vy: (Math.random() - 0.9) * 240,
            life: 1,
            color
        });
    }
}

function updateBursts(dt) {
    for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        b.vy += 260 * dt;
        b.life -= dt * 1.3;
        if (b.life <= 0) bursts.splice(i, 1);
    }
}

// ---------------------------------------------------------------
// Main loop
// ---------------------------------------------------------------
function gameLoop(ts) {
    if (!gameRunning) { rafId = null; return; }

    let dt = (ts - lastFrameTime) / 1000;
    if (!isFinite(dt) || dt < 0) dt = 0;
    dt = Math.min(dt, 0.05);
    lastFrameTime = ts;

    let dir = 0;
    if (keys.left) dir -= 1;
    if (keys.right) dir += 1;
    if (dir !== 0 && !pointerActive) {
        collectorX = clamp(collectorX + dir * COLLECTOR_SPEED * dt, COLLECTOR_WIDTH / 2, cw - COLLECTOR_WIDTH / 2);
    }

    if (particleState === 'falling' && currentParticle) {
        currentParticle.y += currentParticle.speed * dt;
        checkCatch();
    }

    updateBursts(dt);
    drawFrame();

    rafId = requestAnimationFrame(gameLoop);
}

function checkCatch() {
    const p = currentParticle;
    if (!p) return;
    const collectorY = ch - COLLECTOR_BOTTOM_MARGIN;

    if (p.y >= collectorY - 6) {
        const overlap = Math.abs(p.x - collectorX) <= (COLLECTOR_WIDTH / 2 + PARTICLE_HIT_RADIUS);
        if (overlap) {
            resolveOutcome('caught');
            return;
        }
    }
    if (p.y > ch + 20) {
        resolveOutcome('floor');
    }
}

function resolveOutcome(kind) {
    const p = currentParticle;
    currentParticle = null;
    particleState = 'resolved';

    const collectorY = ch - COLLECTOR_BOTTOM_MARGIN;
    const burstY = kind === 'caught' ? collectorY : ch - 10;

    if (kind === 'caught') {
        const chosenRational = collectorX < cw / 2;
        const correct = chosenRational === p.data.rational;
        if (correct) {
            score += 100;
            catches++;
            spawnBurst(p.x, burstY, themeColors.rational);
            showFeedback(true, pickLine(correctLines) + ' +100 PTS — ' + p.data.explain);
        } else {
            integrity--;
            spawnBurst(p.x, burstY, themeColors.irrational);
            showFeedback(false, pickLine(wrongChamberLines) + ' -1 INTEGRITY — ' + p.data.explain);
        }
    } else {
        integrity--;
        spawnBurst(p.x, burstY, themeColors.text);
        showFeedback(false, pickLine(floorMissLines) + ' -1 INTEGRITY — ' + p.data.explain);
    }

    resolvedCount++;
    updateHUD();

    if (integrity <= 0) {
        pendingTimeoutId = setTimeout(triggerFail, END_SCREEN_DELAY_MS);
    } else if (catches >= TARGET_CATCHES) {
        pendingTimeoutId = setTimeout(triggerVictory, END_SCREEN_DELAY_MS);
    } else {
        pendingTimeoutId = setTimeout(spawnNext, SPAWN_GAP_MS);
    }
}

// ---------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------
function drawFrame() {
    if (!ctx) return;
    ctx.clearRect(0, 0, cw, ch);

    // Panel background — always the themed variable, never a hardcoded color.
    ctx.fillStyle = themeColors.panel;
    ctx.fillRect(0, 0, cw, ch);

    // Chamber tints
    ctx.fillStyle = themeColors.rationalTint;
    ctx.fillRect(0, 0, cw / 2, ch);
    ctx.fillStyle = themeColors.irrationalTint;
    ctx.fillRect(cw / 2, 0, cw / 2, ch);

    // Divider
    ctx.strokeStyle = themeColors.border;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cw / 2, 0);
    ctx.lineTo(cw / 2, ch);
    ctx.stroke();

    // Chamber labels
    ctx.font = "700 13px 'JetBrains Mono', monospace";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = themeColors.rational;
    ctx.fillText('🟢 RATIONAL', cw * 0.25, 10);
    ctx.fillStyle = themeColors.irrational;
    ctx.fillText('🟣 IRRATIONAL', cw * 0.75, 10);

    // Falling particle
    if (currentParticle) {
        const p = currentParticle;
        const grad = ctx.createRadialGradient(p.x, p.y, 2, p.x, p.y, 34);
        grad.addColorStop(0, themeColors.particleGlow);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 34, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = "700 24px 'JetBrains Mono', monospace";
        ctx.fillStyle = themeColors.text;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.data.display, p.x, p.y);
    }

    // Collector
    const collectorY = ch - COLLECTOR_BOTTOM_MARGIN;
    ctx.fillStyle = themeColors.cyan;
    roundRect(ctx, collectorX - COLLECTOR_WIDTH / 2, collectorY, COLLECTOR_WIDTH, COLLECTOR_HEIGHT, 8);
    ctx.fill();
    ctx.font = "700 11px 'JetBrains Mono', monospace";
    ctx.fillStyle = themeColors.cyanInk;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('COLLECTOR', collectorX, collectorY + COLLECTOR_HEIGHT / 2 + 1);

    // Spark bursts
    for (let i = 0; i < bursts.length; i++) {
        const b = bursts[i];
        ctx.globalAlpha = Math.max(b.life, 0);
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.arc(b.x, b.y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;
}

// ---------------------------------------------------------------
// End screens
// ---------------------------------------------------------------
function triggerFail() {
    pendingTimeoutId = null;
    gameRunning = false;
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('failScreen').style.display = 'flex';
    document.getElementById('failScore').innerText = score;
    ArcadeKit.showPlayerName(playerName, ['playerNameDisplayFail']);
}

function triggerVictory() {
    pendingTimeoutId = null;
    gameRunning = false;
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('victoryScreen').style.display = 'flex';
    document.getElementById('victoryScore').innerText = score;
    ArcadeKit.showPlayerName(playerName, ['playerNameDisplayWin']);
}

function restartSequence() {
    startSequence();
}
