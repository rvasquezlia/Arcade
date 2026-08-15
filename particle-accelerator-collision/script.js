// PARTICLE CLASSIFICATION DATA BANK (Rational vs. Irrational)
// Every entry was hand-verified: rational = terminating/repeating decimal,
// integer, or exact ratio of integers (including sqrt of a perfect square
// or perfect-square fraction). Irrational = non-repeating, non-terminating
// decimal, or sqrt of a non-perfect square.
const particleBank = [
    // ---- RATIONAL (12) ----
    { display: '0.5', rational: true, explain: '0.5 = 1/2, a terminating decimal — RATIONAL.' },
    { display: '\\( \\frac{3}{4} \\)', rational: true, explain: 'A ratio of two integers is always RATIONAL.' },
    { display: '-7', rational: true, explain: 'Every integer can be written as itself/1 — RATIONAL.' },
    { display: '\\( \\sqrt{16} \\)', rational: true, explain: '√16 = 4, a whole number — RATIONAL.' },
    { display: '\\( \\sqrt{100} \\)', rational: true, explain: '√100 = 10, a whole number — RATIONAL.' },
    { display: '\\( 0.\\overline{3} \\)', rational: true, explain: '0.333... repeats forever and equals 1/3 — RATIONAL.' },
    { display: '\\( \\frac{22}{7} \\)', rational: true, explain: 'It is a ratio of two integers (even though it approximates π) — RATIONAL.' },
    { display: '\\( \\sqrt{\\frac{9}{16}} \\)', rational: true, explain: '√(9/16) = 3/4, a perfect-square fraction — RATIONAL.' },
    { display: '1.75', rational: true, explain: '1.75 = 7/4, a terminating decimal — RATIONAL.' },
    { display: '\\( 0.\\overline{18} \\)', rational: true, explain: '0.181818... repeats forever and equals 2/11 — RATIONAL.' },
    { display: '6', rational: true, explain: 'Every whole number is RATIONAL (6 = 6/1).' },
    { display: '-0.6', rational: true, explain: '-0.6 = -3/5, a terminating decimal — RATIONAL.' },

    // ---- IRRATIONAL (12) ----
    { display: '\\( \\sqrt{17} \\)', rational: false, explain: '17 is not a perfect square, so √17 never terminates or repeats — IRRATIONAL.' },
    { display: '\\( \\pi \\)', rational: false, explain: 'π is a proven non-repeating, non-terminating decimal — IRRATIONAL.' },
    { display: '\\( \\sqrt{2} \\)', rational: false, explain: '2 is not a perfect square — IRRATIONAL.' },
    { display: '\\( \\sqrt{50} \\)', rational: false, explain: '√50 = 5√2; a nonzero rational times an irrational stays IRRATIONAL.' },
    { display: '0.101001000100001...', rational: false, explain: 'The pattern of zeros keeps growing and never repeats or terminates — IRRATIONAL.' },
    { display: '\\( \\sqrt{7} \\)', rational: false, explain: '7 is not a perfect square — IRRATIONAL.' },
    { display: '\\( \\sqrt{20} \\)', rational: false, explain: '√20 = 2√5, a nonzero rational times an irrational — IRRATIONAL.' },
    { display: '\\( \\sqrt{\\frac{1}{2}} \\)', rational: false, explain: '√(1/2) = √2 / 2, still IRRATIONAL.' },
    { display: '1.41421356...', rational: false, explain: 'This is the decimal expansion of √2 — never repeats or terminates — IRRATIONAL.' },
    { display: '\\( 2\\sqrt{3} \\)', rational: false, explain: 'A nonzero rational (2) times an irrational (√3) is IRRATIONAL.' },
    { display: '\\( \\sqrt{99} \\)', rational: false, explain: '99 = 9 × 11, not a perfect square, so √99 = 3√11 — IRRATIONAL.' },
    { display: '\\( -\\sqrt{10} \\)', rational: false, explain: '10 is not a perfect square — IRRATIONAL.' }
];

const TOTAL_ROUNDS = 12;

// GAME STATE
let activeParticles = [];
let currentIndex = 0;
let score = 0;
let integrity = 3;
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
}

// MathJax Safe Re-render
function renderMath() {
    if (window.MathJax && window.MathJax.startup && window.MathJax.startup.promise) {
        MathJax.startup.promise
            .then(() => MathJax.typesetPromise())
            .catch(err => console.warn('MathJax error:', err));
    }
}

// Start Sequence
function startSequence() {
    const name = ArcadeKit.requireName('playerNameInput', 'playerNameError');
    if (!name) return;
    playerName = name;

    currentIndex = 0;
    score = 0;
    integrity = 3;
    isLocked = false;
    activeParticles = ArcadeKit.sample(particleBank, TOTAL_ROUNDS);

    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('failScreen').style.display = 'none';
    document.getElementById('victoryScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';

    loadParticle();
}

// Load Current Particle
function loadParticle() {
    isLocked = false;
    document.getElementById('feedbackLine').innerText = '';
    document.getElementById('feedbackLine').className = 'feedback-line';

    const pData = activeParticles[currentIndex];

    document.getElementById('roundCounter').innerText = `${currentIndex + 1} / ${activeParticles.length}`;
    document.getElementById('integrityDisplay').innerText = `${integrity} / 3`;
    document.getElementById('scoreDisplay').innerText = `${score} PTS`;

    document.getElementById('particleValue').innerHTML = pData.display;

    const rBtn = document.getElementById('rationalBtn');
    const iBtn = document.getElementById('irrationalBtn');
    rBtn.style.borderColor = '';
    rBtn.style.background = '';
    iBtn.style.borderColor = '';
    iBtn.style.background = '';

    renderMath();
}

// Sort Particle into a Chamber
function sortParticle(chosenRational, btnEl) {
    if (isLocked) return;
    isLocked = true;

    const pData = activeParticles[currentIndex];
    const feedback = document.getElementById('feedbackLine');
    const correctBtn = pData.rational ? document.getElementById('rationalBtn') : document.getElementById('irrationalBtn');

    if (chosenRational === pData.rational) {
        score += 100;
        btnEl.style.borderColor = 'var(--accent-rational)';
        btnEl.style.background = 'rgba(52, 211, 153, 0.15)';
        feedback.className = 'feedback-line text-success';
        feedback.innerText = `✅ CORRECT // +100 PTS — ${pData.explain}`;

        setTimeout(() => {
            currentIndex++;
            if (currentIndex >= activeParticles.length) {
                triggerVictory();
            } else {
                loadParticle();
            }
        }, 1500);

    } else {
        integrity--;
        btnEl.style.borderColor = 'var(--accent-red)';
        btnEl.style.background = 'rgba(244, 63, 94, 0.15)';
        correctBtn.style.borderColor = 'var(--accent-rational)';
        feedback.className = 'feedback-line text-error';
        feedback.innerText = `❌ MISROUTED // -1 INTEGRITY — ${pData.explain}`;

        document.getElementById('integrityDisplay').innerText = `${integrity} / 3`;

        if (integrity <= 0) {
            setTimeout(() => {
                triggerFail();
            }, 1700);
        } else {
            setTimeout(() => {
                currentIndex++;
                if (currentIndex >= activeParticles.length) {
                    triggerVictory();
                } else {
                    loadParticle();
                }
            }, 1700);
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

function restartSequence() {
    startSequence();
}
