/**
 * Animations Module
 * Handles fade-in animations
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

