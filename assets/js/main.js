/**
 * Main JavaScript File
 * Imports and initializes all modules
 */

// Import all modules
import { initNavigation, initSmoothScroll } from './modules/navigation.js';
import { initFadeInAnimations, initContactCardsAnimation } from './modules/animations.js';
import { initBackToTop, initScrollEffects } from './modules/scroll-effects.js';
import { initTheme } from './modules/theme.js';
import { initProjects, setupProjectModalListeners, openProjectModal, closeProjectModal, switchTab, openLightbox, closeLightbox } from './modules/projects.js';

/**
 * Initialize all modules when DOM is ready
 */
function init() {
  // Initialize theme first (to prevent flash)
  initTheme();
  
  // Initialize navigation
  initNavigation();
  initSmoothScroll();
  
  // Initialize animations
  initFadeInAnimations();
  initContactCardsAnimation();
  
  // Initialize scroll effects
  initBackToTop();
  initScrollEffects();
  
  // Initialize projects
  initProjects();
  setupProjectModalListeners();
}

/**
 * Expose functions to window for onclick handlers
 */
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;
window.switchTab = switchTab;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;

/**
 * Start initialization
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

/**
 * Additional initialization on window load
 */
window.addEventListener('load', () => {
  // Re-initialize projects if grid is empty
  const projectsGrid = document.getElementById('projectsGrid');
  if (projectsGrid && projectsGrid.children.length === 0) {
    initProjects();
  }
});
