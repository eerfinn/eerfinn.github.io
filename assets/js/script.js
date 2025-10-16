const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {
  sidebar.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("show");
});

document.addEventListener("click", (e) => {
  if (!sidebar.contains(e.target) && !menuBtn.contains(e.target) && sidebar.classList.contains("show")) {
    sidebar.classList.remove("show");
  }
});

document.querySelectorAll(".sidebar-link").forEach((link) => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("show");
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    const offset = 70;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
});

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
      element.classList.add('typing-cursor');
    }
  }
  
  type();
}

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

window.addEventListener('load', () => {
  rotateText();
  setInterval(rotateText, 4000);
});

const backToTopBtn = document.getElementById('backToTop');

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

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

const heroSection = document.querySelector('.hero-section');
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  
  if (heroSection) {
    heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
  }
  
  if (scrolled > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-8px)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});

let currentFilter = 'all';

function renderProjects(filter = 'all') {
  const projectsGrid = document.getElementById('projectsGrid');
  
  if (!projectsGrid || typeof projectsData === 'undefined') {
    return;
  }
  
  projectsGrid.innerHTML = '';
  
  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === filter);
  
  filteredProjects.forEach((project, index) => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card fade-in';
    projectCard.dataset.category = project.category;
    projectCard.style.animationDelay = `${index * 0.1}s`;
    
    const tagsHTML = project.tags.slice(0, 4).map(tag => 
      `<span class="project-card-tag">${tag}</span>`
    ).join('');
    
    const statusClass = project.status.toLowerCase().replace(' ', '-');
    
    const iconMap = {
      'Full Stack': 'fa-layer-group',
      'Frontend': 'fa-palette',
      'Backend': 'fa-server'
    };
    const icon = iconMap[project.category] || 'fa-code';
    
    projectCard.innerHTML = `
      <div class="project-card-image-wrapper">
        <img src="${project.image}" alt="${project.title}" class="project-card-image" loading="lazy" onerror="this.src='https://via.placeholder.com/600x400/6366f1/ffffff?text=Image+Not+Found'" />
        <div class="project-card-badge">${project.category}</div>
        <div class="project-card-overlay">
          <button class="project-card-quick-view" onclick="openProjectModal(${project.id})">
            <i class="fas fa-eye"></i>
            Quick View
          </button>
        </div>
      </div>
      <div class="project-card-content">
        <div class="project-card-header">
          <h3 class="project-card-title">
            <i class="fas ${icon}"></i>
            ${project.title}
          </h3>
        </div>
        <p class="project-card-description">${project.shortDescription}</p>
        <div class="project-card-tags">
          ${tagsHTML}
        </div>
        <div class="project-card-footer">
          <div class="project-card-status">
            <span class="project-card-status-dot ${statusClass}"></span>
            <span>${project.status}</span>
          </div>
          <button class="project-card-view-btn" onclick="openProjectModal(${project.id})">
            <span>View Details</span>
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `;
    
    projectsGrid.appendChild(projectCard);
  });
}

function filterProjects(filter) {
  currentFilter = filter;
  
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  
  renderProjects(filter);
}

function openProjectModal(projectId) {
  const project = projectsData.find(p => p.id === projectId);
  if (!project) return;
  
  const panel = document.getElementById('projectPanel');
  
  document.getElementById('panelImage').src = project.image;
  document.getElementById('panelTitle').textContent = project.title;
  document.getElementById('panelCategory').querySelector('span').textContent = project.category;
  document.getElementById('panelDuration').querySelector('span').textContent = project.duration;
  document.getElementById('panelStatus').querySelector('span').textContent = project.status;
  document.getElementById('panelDescription').textContent = project.fullDescription;
  
  const panelTags = document.getElementById('panelTags');
  panelTags.innerHTML = project.tags.map(tag => 
    `<span class="panel-tag">${tag}</span>`
  ).join('');
  
  const panelFeatures = document.getElementById('panelFeatures');
  panelFeatures.innerHTML = project.features.map((feature, index) => 
    `<div class="feature-item">
      <div class="feature-icon">
        <i class="fas fa-check"></i>
      </div>
      <div class="feature-text">${feature}</div>
    </div>`
  ).join('');
  
  const panelTechStack = document.getElementById('panelTechStack');
  panelTechStack.innerHTML = '';
  
  Object.entries(project.techStack).forEach(([category, technologies]) => {
    const techCategory = document.createElement('div');
    techCategory.className = 'tech-category';
    techCategory.innerHTML = `
      <h4><i class="fas fa-layer-group"></i> ${category}</h4>
      <div class="tech-list">
        ${technologies.map(tech => `<span class="tech-item">${tech}</span>`).join('')}
      </div>
    `;
    panelTechStack.appendChild(techCategory);
  });
  
  const panelLinks = document.getElementById('panelLinks');
  panelLinks.innerHTML = `
    <a href="${project.links.github}" target="_blank" class="project-link github">
      <i class="fab fa-github"></i> View on GitHub
    </a>
    <a href="${project.links.live}" target="_blank" class="project-link">
      <i class="fas fa-external-link-alt"></i> Live Demo
    </a>
    <a href="${project.links.documentation}" target="_blank" class="project-link documentation">
      <i class="fas fa-book"></i> Documentation
    </a>
  `;
  
  switchTab('overview');
  panel.classList.add('active');
}

function closeProjectModal() {
  const panel = document.getElementById('projectPanel');
  panel.classList.remove('active');
}

function switchTab(tabName) {
  const navBtns = document.querySelectorAll('.nav-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  navBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
  
  tabContents.forEach(content => {
    content.classList.toggle('active', content.id === `${tabName}-tab`);
  });
}

function initializeProjects() {
  if (typeof projectsData !== 'undefined') {
    renderProjects('all');
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterProjects(btn.dataset.filter);
      });
    });
  } else {
    setTimeout(initializeProjects, 100);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeProjects);
} else {
  initializeProjects();
}


window.addEventListener('load', function() {
  const projectsGrid = document.getElementById('projectsGrid');
  if (projectsGrid && projectsGrid.children.length === 0) {
    initializeProjects();
  }
  
  const panelClose = document.getElementById('panelClose');
  const panel = document.getElementById('projectPanel');
  
  if (panelClose) panelClose.addEventListener('click', closeProjectModal);
  
  if (panel) {
    panel.addEventListener('click', (e) => {
      if (e.target === panel) {
        closeProjectModal();
      }
    });
  }
  
  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
    });
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
    }
  });
});

