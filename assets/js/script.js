// Sidebar functionality
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {
  sidebar.classList.add("show");
});

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

// Enhanced smooth scrolling with offset
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

// Enhanced fade-in effect with stagger
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

// Enhanced typing animation with cursor
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

// Enhanced dark mode toggle with transition
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
  body.classList.add('dark-mode');
  updateDarkModeIcon(true);
}

darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDarkMode = body.classList.contains('dark-mode');
  updateDarkModeIcon(isDarkMode);
  
  // Save preference
  localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
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

// Enhanced skill bars animation
const skillBars = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const targetWidth = progressBar.parentElement.dataset.progress || '0%';
        progressBar.style.width = '0%';
        
        // Animate width with slight delay
        setTimeout(() => {
          progressBar.style.width = targetWidth;
        }, 200);
      }
    });
  },
  { threshold: 0.5 }
);

skillBars.forEach(bar => {
  bar.style.width = '0%';
  skillObserver.observe(bar);
});

// Parallax effect for hero section
const heroSection = document.querySelector('.hero-section');
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  if (heroSection) {
    heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
  }
});

// Form submission with basic validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Basic form validation
    const formInputs = contactForm.querySelectorAll('input, textarea');
    let isValid = true;
    
    formInputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.classList.add('error');
      } else {
        input.classList.remove('error');
      }
    });
    
    if (isValid) {
      // Here you would typically send the form data to a server
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    }
  });
}
