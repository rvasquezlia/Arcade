/* ==========================================================
   Lincoln International Academy — Math Arcade
   Shared Kit: player-name capture + one-click end-screen
   screenshot for submission. Included by every game.
   ========================================================== */
window.ArcadeKit = (function () {

    function getPlayerName(inputId) {
        const el = document.getElementById(inputId);
        return el ? el.value.trim() : '';
    }

    // Validates the name field; shows/hides an inline error message.
    // Returns the trimmed name, or null if empty.
    function requireName(inputId, errorId) {
        const name = getPlayerName(inputId);
        const err = errorId ? document.getElementById(errorId) : null;
        if (!name) {
            if (err) err.style.display = 'block';
            const el = document.getElementById(inputId);
            if (el) el.focus();
            return null;
        }
        if (err) err.style.display = 'none';
        return name;
    }

    // Writes the player's name into every element id passed in `targetIds`.
    function showPlayerName(name, targetIds) {
        (targetIds || []).forEach((id) => {
            const el = document.getElementById(id);
            if (el) el.innerText = name || 'Student';
        });
    }

    // Captures `captureElId` as a PNG and downloads it, for teacher submission.
    // opts: { buttonEl, gameSlug, playerName, score }
    async function saveScreenshot(captureElId, opts) {
        opts = opts || {};
        const el = document.getElementById(captureElId);
        const btn = opts.buttonEl || null;
        const originalLabel = btn ? btn.innerText : null;

        if (!el || typeof window.html2canvas !== 'function') {
            alert('Screenshot tool could not load (no internet connection?). Please take a manual screenshot instead:\nWindows: Win + Shift + S    •    Mac: Cmd + Shift + 4');
            return;
        }

        if (btn) {
            btn.disabled = true;
            btn.innerText = '📸 Capturing…';
        }

        try {
            const canvas = await window.html2canvas(el, {
                backgroundColor: null,
                scale: 2,
                useCORS: true,
                logging: false,
            });
            const safeName = (opts.playerName || 'student').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'student';
            const safeGame = (opts.gameSlug || 'arcade-game').toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const scorePart = (opts.score !== undefined && opts.score !== null) ? `-${opts.score}pts` : '';

            const link = document.createElement('a');
            link.download = `${safeGame}-${safeName}${scorePart}.png`;
            link.href = canvas.toDataURL('image/png');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            if (btn) btn.innerText = '✅ Screenshot Saved!';
        } catch (e) {
            console.warn('ArcadeKit.saveScreenshot failed:', e);
            alert('Could not capture the screenshot automatically. Please take a manual screenshot instead:\nWindows: Win + Shift + S    •    Mac: Cmd + Shift + 4');
            if (btn) btn.innerText = originalLabel;
        } finally {
            if (btn) {
                setTimeout(() => {
                    btn.disabled = false;
                    if (btn.innerText === '✅ Screenshot Saved!') btn.innerText = originalLabel;
                }, 2200);
            }
        }
    }

    // Fisher-Yates shuffle — shared by every game's question randomizer.
    function shuffle(array) {
        const arr = array.slice();
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // Picks `count` random items from `array` without repeats.
    function sample(array, count) {
        return shuffle(array).slice(0, Math.min(count, array.length));
    }

    return { getPlayerName, requireName, showPlayerName, saveScreenshot, shuffle, sample };
})();
