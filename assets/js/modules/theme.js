/**
 * Theme Module
 * Handles dark/light theme toggle and persistence
 */

/**
 * Get saved theme preference from localStorage
 */
function getThemePreference() {
  return localStorage.getItem('theme') || 'dark';
}

/**
 * Apply theme to the body element
 */
function applyTheme(theme) {
  if (theme === 'light') {
    document.body.classList.remove('dark-mode');
  } else {
    document.body.classList.add('dark-mode');
  }
  localStorage.setItem('theme', theme);
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
  const currentTheme = getThemePreference();
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
}

/**
 * Initialize theme on page load
 */
export function initTheme() {
  const savedTheme = getThemePreference();
  applyTheme(savedTheme);
  
  const themeToggle = document.getElementById('themeToggle');
  
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
}
