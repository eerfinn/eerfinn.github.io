/* ============================================
   SIDEBAR FUNCTIONALITY
   ============================================ */
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const sidebar = document.getElementById("sidebar");

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

// Close sidebar when clicking links
document.querySelectorAll(".sidebar-link").forEach((link) => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("show");
  });
});

/* ============================================
   SMOOTH SCROLLING
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    const offset = 70; // Height of navbar
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
});

/* ============================================
   FADE-IN ANIMATION
   ============================================ */
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

/* ============================================
   TYPING ANIMATION
   ============================================ */
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  element.style.borderRight = '3px solid';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Add blinking cursor class after typing
      element.classList.add('typing-cursor');
    }
  }
  
  type();
}

// Multiple text rotation for hero subtitle
const heroTexts = [
  "Frontend Developer",
  "UI/UX Designer",
  "Creative Thinker",
  "Problem Solver"
];

let currentTextIndex = 0;

function rotateText() {
  const heroSubtitle = document.querySelector('.hero-subtitle');
  heroSubtitle.classList.remove('typing-cursor');
  typeWriter(heroSubtitle, heroTexts[currentTextIndex]);
  currentTextIndex = (currentTextIndex + 1) % heroTexts.length;
}

// Start typing animation when page loads
window.addEventListener('load', () => {
  rotateText();
  setInterval(rotateText, 4000); // Rotate text every 4 seconds
});

/* ============================================
   DARK MODE TOGGLE
   ============================================ */
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Add transition class for smooth color changes
body.style.transition = 'background-color 0.3s ease, color 0.3s ease';

// Check for saved preference or system preference
const savedMode = localStorage.getItem('darkMode');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Initialize mode
if (savedMode === 'enabled' || (savedMode === null && prefersDark)) {
  body.classList.add('dark-mode');
  updateDarkModeIcon(true);
} else {
  body.classList.remove('dark-mode');
  updateDarkModeIcon(false);
}

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDarkMode = body.classList.contains('dark-mode');
  updateDarkModeIcon(isDarkMode);
  
  // Save preference
  localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
  
  // Add animation effect
  darkModeToggle.style.transform = 'scale(0.9)';
  setTimeout(() => {
    darkModeToggle.style.transform = 'scale(1)';
  }, 150);
});

function updateDarkModeIcon(isDarkMode) {
  const icon = darkModeToggle.querySelector('i');
  if (isDarkMode) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
}

/* ============================================
   TECH STACK ANIMATION
   ============================================ */
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

/* ============================================
   PARALLAX EFFECT
   ============================================ */
const heroSection = document.querySelector('.hero-section');
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  if (heroSection) {
    heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
  }
});

/* ============================================
   CONTACT CARDS HOVER
   ============================================ */
const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-8px)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});

/* ============================================
   DYNAMIC PROJECTS RENDERING
   ============================================ */

// Immediate check for projectsData
console.log('🔍 Script.js loaded, checking projectsData...');
console.log('projectsData type:', typeof projectsData);
if (typeof projectsData !== 'undefined') {
  console.log('✅ projectsData is available:', projectsData);
} else {
  console.log('❌ projectsData is NOT available');
}
function updateDebugInfo(message, isError = false) {
  const debugInfo = document.getElementById('debug-info');
  const debugText = document.getElementById('debug-text');
  
  if (debugInfo && debugText) {
    debugInfo.style.display = 'block';
    debugInfo.style.background = isError ? 'rgba(255,0,0,0.1)' : 'rgba(0,255,0,0.1)';
    debugText.innerHTML = message;
    
    // Hide debug info after 5 seconds if successful
    if (!isError) {
      setTimeout(() => {
        debugInfo.style.display = 'none';
      }, 5000);
    }
  }
}

function renderProjects() {
  console.log('🎨 renderProjects() called');
  const projectList = document.getElementById('projectList');
  
  // Check if container exists
  if (!projectList) {
    const error = 'Projects container not found';
    console.error('❌', error);
    updateDebugInfo(`❌ ${error}`, true);
    return;
  }
  
  // Check if data is loaded
  if (typeof projectsData === 'undefined') {
    const error = 'Projects data not loaded. Make sure projects-data.js is included before script.js';
    console.error('❌', error);
    updateDebugInfo(`❌ ${error}`, true);
    return;
  }
  
  console.log('📊 Rendering', projectsData.length, 'projects');
  
  // Clear existing content
  projectList.innerHTML = '';
  
  try {
    // Render each project
    projectsData.forEach((project, index) => {
      console.log(`🔨 Creating project card ${index + 1}:`, project.title);
      const projectCard = document.createElement('div');
      projectCard.className = 'project-card';
      
      // Build tags HTML
      const tagsHTML = project.tags.map(tag => 
        `<span class="tag">${tag}</span>`
      ).join('');
      
      // Build project card HTML
      projectCard.innerHTML = `
        <div class="project-image">
          <img src="${project.image}" alt="${project.title}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x250/6366f1/ffffff?text=Image+Not+Found'" />
        </div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tags">
          ${tagsHTML}
        </div>
        <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
          <i class="fas fa-external-link-alt"></i> View Project
        </a>
      `;
      
      projectList.appendChild(projectCard);
      console.log(`✅ Added project card ${index + 1} to DOM`);
    });
    
    const successMsg = `✅ Successfully loaded ${projectsData.length} projects`;
    console.log(successMsg);
    updateDebugInfo(successMsg, false);
    
    // Force a repaint
    projectList.style.display = 'none';
    projectList.offsetHeight; // Trigger reflow
    projectList.style.display = '';
    
  } catch (error) {
    const errorMsg = `Render error: ${error.message}`;
    console.error('❌', errorMsg, error);
    updateDebugInfo(`❌ ${errorMsg}`, true);
  }
}

// Initialize projects with multiple fallbacks
function initializeProjects() {
  console.log('🚀 Initializing projects...');
  console.log('DOM ready state:', document.readyState);
  console.log('projectsData available:', typeof projectsData !== 'undefined');
  
  if (typeof projectsData !== 'undefined') {
    console.log('✅ projectsData found:', projectsData);
    console.log('📊 Number of projects:', projectsData.length);
    renderProjects();
  } else {
    console.warn('⚠️ projectsData not available, retrying in 100ms...');
    setTimeout(initializeProjects, 100);
  }
}

// Multiple initialization methods for reliability
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeProjects);
} else {
  initializeProjects();
}

// Fallback: Try again after window load
window.addEventListener('load', function() {
  const projectContainer = document.getElementById('projectList');
  if (projectContainer && projectContainer.children.length <= 1) { // Changed from 0 to 1 to account for loading div
    console.log('🔄 Projects not loaded, trying fallback...');
    initializeProjects();
  }
});

// Additional fallback with interval checking
let retryCount = 0;
const maxRetries = 10;
const retryInterval = setInterval(() => {
  retryCount++;
  console.log(`🔄 Retry attempt ${retryCount}/${maxRetries}`);
  
  if (typeof projectsData !== 'undefined') {
    console.log('✅ projectsData found on retry, rendering...');
    renderProjects();
    clearInterval(retryInterval);
  } else if (retryCount >= maxRetries) {
    console.log('❌ Max retries reached, projectsData still not available');
    updateDebugInfo('❌ Failed to load projects after multiple attempts', true);
    clearInterval(retryInterval);
  }
}, 200);

// Manual trigger function for debugging
window.debugRenderProjects = function() {
  console.log('🔧 Manual debug render triggered');
  renderProjects();
};

// Force immediate execution after a short delay
setTimeout(() => {
  console.log('🔄 Force checking projects after 500ms...');
  if (typeof projectsData !== 'undefined') {
    console.log('✅ Force render: projectsData found');
    renderProjects();
  } else {
    console.log('❌ Force render: projectsData still not available');
    updateDebugInfo('❌ projectsData not loaded after 500ms', true);
  }
}, 500);
