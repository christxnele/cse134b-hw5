const THEME_KEY = 'theme';

// read the saved theme if reading throws, fall back to the light default
function getSavedTheme() {
    try {
        return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
    } catch (error) {
        return 'light';
    }
}

function saveTheme(theme) {
    try {
        localStorage.setItem(THEME_KEY, theme);
    } catch (error) {
    }
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }

    const button = document.getElementById('theme-toggle');
    if (button) {
        button.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    }
}

// apply the saved theme right away
applyTheme(getSavedTheme());

// once the page's html exists, show the button and make it work
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('theme-toggle');
    if (!button) return; 

    applyTheme(getSavedTheme());

    const item = button.closest('.theme-item');
    if (item) item.hidden = false;

    button.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        applyTheme(newTheme);
        saveTheme(newTheme);
    });
});
