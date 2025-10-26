/**
 * Animations Module
 * Handles fade-in animations and tech cards animations
 */

/**
 * Initialize fade-in animations using Intersection Observer
 */
export function initFadeInAnimations() {
  const fadeElements = document.querySelectorAll(".fade-in");
  
  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  };
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("show");
        }, index * 100);
      }
    });
  }, observerOptions);
  
  fadeElements.forEach((el) => fadeObserver.observe(el));
}

/**
 * Initialize tech cards staggered animations
 */
export function initTechCardsAnimation() {
  const techCards = document.querySelectorAll('.tech-card');
  
  const techObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 50);
        }
      });
    },
    { threshold: 0.2 }
  );
  
  techCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    techObserver.observe(card);
  });
}

/**
 * Initialize contact cards hover effects
 */
export function initContactCardsAnimation() {
  const contactCards = document.querySelectorAll('.contact-card');
  
  contactCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
}
