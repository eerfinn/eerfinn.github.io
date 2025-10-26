/**
 * Scroll Effects Module
 * Handles scroll-based effects like back-to-top button, navbar scroll, and active section indicator
 */

/**
 * Initialize back to top button
 */
export function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  
  if (!backToTopBtn) return;
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Initialize scroll effects
 */
export function initScrollEffects() {
  const heroSection = document.querySelector('.hero-section');
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-link[data-section]');
  const backToTopBtn = document.getElementById('backToTop');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrolled / windowHeight) * 100;
    
    // Add scrolled class to navbar
    if (scrolled > 100 && navbar) {
      navbar.classList.add('scrolled');
    } else if (navbar) {
      navbar.classList.remove('scrolled');
    }
    
    // Parallax effect for hero section
    if (heroSection) {
      heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
    
    // Back to top button
    if (backToTopBtn) {
      if (scrolled > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
    
    // Active section indicator
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrolled >= sectionTop - 200) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === currentSection) {
        link.classList.add('active');
      }
    });
  });
}
