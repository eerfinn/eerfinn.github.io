// Theme toggle functionality
export function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');

  function getThemePreference() {
    return localStorage.getItem('theme') || 'dark';
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.add('dark-mode');
    }
    localStorage.setItem('theme', theme);
  }

  function toggleTheme() {
    const currentTheme = getThemePreference();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  }

  // Initialize theme
  const savedTheme = getThemePreference();
  applyTheme(savedTheme);

  // Add event listener
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
}