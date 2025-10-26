/**
 * Navigation Module
 * Handles sidebar menu and smooth scrolling
 */

export function initNavigation() {
  const menuBtn = document.getElementById("menu-btn");
  const closeBtn = document.getElementById("close-btn");
  const sidebar = document.getElementById("sidebar");
  
  if (!menuBtn || !closeBtn || !sidebar) return;
  
  // Open sidebar
  menuBtn.addEventListener("click", () => {
    sidebar.classList.add("show");
  });
  
  // Close sidebar
  closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("show");
  });
  
  // Close sidebar when clicking outside
  document.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target) && !menuBtn.contains(e.target) && sidebar.classList.contains("show")) {
      sidebar.classList.remove("show");
    }
  });
  
  // Close sidebar when clicking on sidebar links
  document.querySelectorAll(".sidebar-link").forEach((link) => {
    link.addEventListener("click", () => {
      sidebar.classList.remove("show");
    });
  });
}

/**
 * Initialize smooth scrolling for all anchor links
 */
export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (!target) return;
      
      const offset = 0; // Changed to 0 for full-section display
      const targetPosition = target.offsetTop;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}
