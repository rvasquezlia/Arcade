        function initTheme() {
            const savedTheme = localStorage.getItem('arcadeTheme');
            if (savedTheme) {
                setTheme(savedTheme);
            } else {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                setTheme(prefersDark ? 'dark' : 'light');
            }
        }

        function setTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('arcadeTheme', theme);

            const iconSpan = document.getElementById('theme-icon');
            const textSpan = document.getElementById('theme-text');

            if (theme === 'dark') {
                iconSpan.innerText = '🌙';
                textSpan.innerText = 'Dark Mode';
            } else {
                iconSpan.innerText = '☀️';
                textSpan.innerText = 'Light Mode';
            }
        }

        function toggleTheme() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(nextTheme);
        }

        initTheme();
    
