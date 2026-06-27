/* ============================================
   THEME — Dark / Light Mode Toggle
   ============================================ */

(function () {
  'use strict';

  const STORAGE_KEY = 'portfolio-theme';
  const html = document.documentElement;

  /* ── Get saved or system theme ── */
  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;

    // Default to dark
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  /* ── Apply theme ── */
  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateToggleIcon(theme);
  }

  /* ── Update toggle button icon ── */
  function updateToggleIcon(theme) {
    const toggleBtn = document.querySelector('.theme-toggle');
    if (!toggleBtn) return;

    if (theme === 'dark') {
      toggleBtn.innerHTML = '☀️';
      toggleBtn.setAttribute('aria-label', 'Switch to light mode');
      toggleBtn.title = 'Switch to light mode';
    } else {
      toggleBtn.innerHTML = '🌙';
      toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
      toggleBtn.title = 'Switch to dark mode';
    }
  }

  /* ── Toggle theme ── */
  function toggleTheme() {
    const current = html.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    
    // Add transition class for smooth color change
    html.classList.add('theme-transitioning');
    applyTheme(next);
    
    // Remove transition class after animation
    setTimeout(function () {
      html.classList.remove('theme-transitioning');
    }, 500);
  }

  /* ── Initialize ── */
  applyTheme(getPreferredTheme());

  /* ── Bind click handler ── */
  document.addEventListener('click', function (e) {
    if (e.target.closest('.theme-toggle')) {
      toggleTheme();
    }
  });

  /* ── Listen for system theme changes ── */
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

})();
