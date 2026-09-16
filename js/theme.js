/* florex lab tema sistemi yerel depolama kaliciligi ve sistem tercihi algilama ile karanlik aydinlik tema */

(function() {
  'use strict';

  const STORAGE_KEY = 'flx-theme';

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function getSavedTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {  }
  }

  function applyTheme(theme, animate) {
    const html = document.documentElement;

    if (animate) {
      document.body.classList.add('theme-transitioning');
    }

    html.setAttribute('data-theme', theme);

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.content = theme === 'dark' ? '#0a0e1a' : '#f8f9fc';
    }

    const darkIcon = document.querySelector('.theme-icon-dark');
    const lightIcon = document.querySelector('.theme-icon-light');
    if (darkIcon && lightIcon) {
      darkIcon.style.display = theme === 'dark' ? 'block' : 'none';
      lightIcon.style.display = theme === 'light' ? 'block' : 'none';
    }

    if (animate) {
      setTimeout(() => {
        document.body.classList.remove('theme-transitioning');
      }, 400);
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next, true);
    saveTheme(next);
  }

  function init() {
    const savedTheme = getSavedTheme();
    const theme = savedTheme || getSystemTheme();
    applyTheme(theme, false);

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }

    const mobileToggle = document.getElementById('mobile-theme-toggle');
    if (mobileToggle) {
      mobileToggle.addEventListener('click', toggleTheme);
    }

    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
      if (!getSavedTheme()) {
        applyTheme(e.matches ? 'light' : 'dark', true);
      }
    });
  }

  FLX.theme = { toggle: toggleTheme, init };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
