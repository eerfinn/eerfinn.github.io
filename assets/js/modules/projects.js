/**
 * Projects Module
 * Handles project rendering, modal, and filtering
 */

// State for lightbox slider
let currentImages = [];
let currentImageIndex = 0;
let currentFilter = 'all';
let visibleProjects = 6; // Initial number of visible projects
const projectsPerLoad = 6; // Number of projects to load on each click

/**
 * Render all projects to the grid
 */
export function renderProjects(filter = 'all', reset = true) {
  const projectsGrid = document.getElementById('projectsGrid');

  if (!projectsGrid || typeof projectsData === 'undefined') {
    return;
  }

  // Reset visible count when filter changes
  if (reset) {
    visibleProjects = 6;
  }

  projectsGrid.innerHTML = '';
  
  // 1. Filter only Completed projects first
  const completedProjects = projectsData.filter(project => project.status === 'Completed');

  // 2. Then filter based on category
  const filteredProjects = filter === 'all' 
    ? completedProjects 
    : completedProjects.filter(project => project.category === filter);

  // Get only visible projects
  const projectsToShow = filteredProjects.slice(0, 6);

  projectsToShow.forEach((project, index) => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card fade-in';
    projectCard.dataset.category = project.category;
    projectCard.style.animationDelay = `${index * 0.1}s`;
    projectCard.onclick = () => openProjectModal(project.id);
    projectCard.style.cursor = 'pointer';

    const tagsHTML = project.tags.slice(0, 4).map(tag =>
      `<span class="project-card-tag">${tag}</span>`
    ).join('');

    const iconMap = {
      'Website': 'fa-globe',
      'Mobile': 'fa-mobile-screen-button',
      'Game': 'fa-gamepad',
      'Desktop': 'fa-desktop',
      'IoT': 'fa-microchip',
      'API': 'fa-server'
    };
    const icon = iconMap[project.category] || 'fa-code';

    projectCard.innerHTML = `
      <div class="project-card-image-wrapper">
        <img src="${project.image}" alt="${project.title}" class="project-card-image" loading="lazy" onerror="this.src='https://via.placeholder.com/600x400/6366f1/ffffff?text=Image+Not+Found'" />
        <div class="project-card-badge">${project.category}</div>
        <div class="gallery-thumbnail-overlay">
          <i class="fas fa-expand-alt"></i>
        </div>
      </div>
      <div class="project-card-content">
        <div class="project-card-header">
          <h3 class="project-card-title">
            <span class="project-card-title-text">${project.title}</span>
          </h3>
        </div>
        <p class="project-card-description">${project.description}</p>
        <div class="project-card-tags">
          ${tagsHTML}
        </div>
      </div>
    `;

    projectsGrid.appendChild(projectCard);
  });
}

/**
 * Open project modal with details
 */
export function openProjectModal(projectId) {
  const project = projectsData.find(p => p.id === projectId);
  if (!project) return;

  const panel = document.getElementById('projectPanel');

  document.getElementById('panelTitle').textContent = project.title;
  document.getElementById('panelCategory').querySelector('span').textContent = project.category + (project.role ? ' • ' + project.role : '');
  document.getElementById('panelDuration').querySelector('span').textContent = project.duration;
  document.getElementById('panelDescription').textContent = project.description;

  // Set tags
  const panelTags = document.getElementById('panelTags');
  panelTags.innerHTML = project.tags.map(tag =>
    `<span class="panel-tag">${tag}</span>`
  ).join('');

  // Set thumbnail gallery
  const galleryThumbnails = document.getElementById('galleryThumbnails');

  // Clear previous load more button if exists
  const existingLoadMore = galleryThumbnails.parentNode.querySelector('.gallery-load-more');
  if (existingLoadMore) {
    existingLoadMore.remove();
  }

  if (project.screenshots && project.screenshots.length > 0) {
    const INITIAL_VISIBLE_COUNT = 4;

    galleryThumbnails.innerHTML = project.screenshots.map((screenshot, index) => {
      const isHidden = index >= INITIAL_VISIBLE_COUNT ? 'hidden' : '';
      return `
        <div class="gallery-thumbnail ${isHidden}" onclick="openLightboxFromProject(${project.id}, ${index})">
          <img src="${screenshot}" alt="${project.title} Screenshot ${index + 1}" loading="lazy" />
          <div class="gallery-thumbnail-overlay">
            <i class="fas fa-search-plus"></i>
          </div>
        </div>
      `;
    }).join('');

    // Add load more button if needed
    if (project.screenshots.length > INITIAL_VISIBLE_COUNT) {
      const remainingCount = project.screenshots.length - INITIAL_VISIBLE_COUNT;
      const loadMoreContainer = document.createElement('div');
      loadMoreContainer.className = 'gallery-load-more';
      loadMoreContainer.innerHTML = `
        <button class="gallery-load-more-btn" onclick="this.parentElement.previousElementSibling.querySelectorAll('.hidden').forEach(el => el.classList.remove('hidden')); this.parentElement.remove();">
          <i class="fas fa-images"></i>
          <span>View ${remainingCount} More Photos</span>
        </button>
      `;
      galleryThumbnails.parentNode.appendChild(loadMoreContainer);
    }
  } else {
    galleryThumbnails.innerHTML = '<p style="color: var(--text-secondary); font-size: 0.9rem;">No screenshots available</p>';
  }

  // Set features
  const panelFeatures = document.getElementById('panelFeatures');
  panelFeatures.innerHTML = project.features.map((feature, index) =>
    `<div class="feature-item">
      <div class="feature-icon">
        <i class="fas fa-check"></i>
      </div>
      <div class="feature-text">${feature}</div>
    </div>`
  ).join('');


  // Set links
  const panelLinks = document.getElementById('panelLinks');
  let linksHTML = '';

  if (project.links.github) {
    linksHTML += `
      <a href="${project.links.github}" target="_blank" class="project-link github">
        <i class="fab fa-github"></i> View on GitHub
      </a>
    `;
  }

  if (project.links.live) {
    linksHTML += `
      <a href="${project.links.live}" target="_blank" class="project-link">
        <i class="fas fa-external-link-alt"></i> Live Demo
      </a>
    `;
  }

  if (project.links.documentation) {
    linksHTML += `
      <a href="${project.links.documentation}" target="_blank" class="project-link documentation">
        <i class="fas fa-book"></i> Documentation
      </a>
    `;
  }

  if (!linksHTML) {
    linksHTML = '<p class="no-links-message">No public links available for this project.</p>';
  }
  panelLinks.innerHTML = linksHTML;

  // Show panel
  switchTab('overview');
  panel.classList.add('active');
  document.body.classList.add('panel-open');

  // Scroll to top of panel content
  const panelContent = document.querySelector('.panel-content');
  if (panelContent) {
    panelContent.scrollTop = 0;
  }
}

/**
 * Close project modal
 */
export function closeProjectModal() {
  const panel = document.getElementById('projectPanel');
  panel.classList.remove('active');
  document.body.classList.remove('panel-open');
}

/**
 * Switch between tabs in project modal
 */
export function switchTab(tabName) {
  const navBtns = document.querySelectorAll('.nav-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  navBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });

  tabContents.forEach(content => {
    content.classList.toggle('active', content.id === `${tabName}-tab`);
  });
}

/**
 * Initialize projects module
 */
export function initProjects() {
  if (typeof projectsData !== 'undefined') {
    renderFilterButtons();
    renderProjects();
    setupFilterListeners();
  } else {
    setTimeout(initProjects, 100);
  }
}

/**
 * Render filter buttons dynamically based on available categories
 */
function renderFilterButtons() {
  const filterContainer = document.getElementById('projectsFilter');
  if (!filterContainer || typeof projectsData === 'undefined') return;

  // Get unique categories ONLY from projects that are "Completed"
  const completedProjects = projectsData.filter(p => p.status === 'Completed');
  const categories = [...new Set(completedProjects.map(p => p.category))];
  
  // Mapping labels to short versions for UI
  const labelMap = {
    'Web Development': 'Website',
    'Mobile Development': 'Mobile',
    'Game Development': 'Game',
    'UI/UX Design': 'UI/UX'
  };

  // Icon mapping for categories (Platform now)
  const iconMap = {
    'Web Development': 'fa-globe',
    'Mobile Development': 'fa-mobile-screen-button',
    'Game Development': 'fa-gamepad',
    'UI/UX Design': 'fa-swatchbook',
    'Website': 'fa-globe',
    'Mobile': 'fa-mobile-screen-button',
    'Game': 'fa-gamepad',
    'Desktop': 'fa-desktop',
    'IoT': 'fa-microchip',
    'API': 'fa-server'
  };

  // Build filter buttons HTML
  let filtersHTML = `
    <button class="filter-btn active" data-filter="all">
      <i class="fas fa-th-large"></i>
      <span>All</span>
    </button>
  `;

  categories.forEach(category => {
    const icon = iconMap[category] || 'fa-code';
    const displayLabel = labelMap[category] || category; // Use short label if available
    
    filtersHTML += `
      <button class="filter-btn" data-filter="${category}">
        <i class="fas ${icon}"></i>
        <span>${displayLabel}</span>
      </button>
    `;
  });

  filterContainer.innerHTML = filtersHTML;
}

/**
 * Setup filter button listeners
 */
function setupFilterListeners() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filter projects
      const filter = btn.dataset.filter;
      currentFilter = filter;
      renderProjects(filter);
    });
  });
}

/**
 * Export filter function for external use
 */
export function filterProjects(category) {
  currentFilter = category;
  renderProjects(category);
  
  // Update button active state
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === category);
  });
}

/**
 * Setup project modal event listeners
 */
export function setupProjectModalListeners() {
  const panelClose = document.getElementById('panelClose');
  const projectPanel = document.getElementById('projectPanel');

  if (panelClose) {
    panelClose.addEventListener('click', closeProjectModal);
  }

  if (projectPanel) {
    projectPanel.addEventListener('click', (e) => {
      if (e.target === projectPanel) {
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

  // Setup lightbox listeners
  setupLightboxListeners();

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeLightbox();
    }
  });
}

/**
 * Open lightbox with image
 */
export function openLightbox(imageSrc, imageList = []) {
  const lightbox = document.getElementById('lightboxOverlay');

  if (!lightbox) return;

  // Set current images list
  if (imageList && imageList.length > 0) {
    currentImages = imageList;
    currentImageIndex = currentImages.indexOf(imageSrc);
    if (currentImageIndex === -1) currentImageIndex = 0;
  } else {
    currentImages = [imageSrc];
    currentImageIndex = 0;
  }

  updateLightboxUI();
  lightbox.classList.add('active');
  document.body.classList.add('panel-open'); // Prevent scroll
}

/**
 * Open lightbox for a specific project
 */
export function openLightboxFromProject(projectId, startIndex = -1) {
  const project = projectsData.find(p => p.id === projectId);
  if (!project) return;

  let images = [];

  // Combine thumbnail and screenshots
  if (project.image) images.push(project.image);
  if (project.screenshots && project.screenshots.length > 0) {
    images = [...images, ...project.screenshots];
  }

  // If we clicked a specific screenshot, find its index in the combined list
  let actualStartIndex = 0;
  if (startIndex !== -1) {
    // If thumbnails start after project image
    actualStartIndex = project.image ? startIndex + 1 : startIndex;
  }

  const lightbox = document.getElementById('lightboxOverlay');
  if (lightbox) {
    currentImages = images;
    currentImageIndex = actualStartIndex;

    updateLightboxUI();
    lightbox.classList.add('active');
    document.body.classList.add('panel-open');
  }
}

/**
 * Update lightbox UI (image, counter, button visibility)
 */
function updateLightboxUI() {
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  if (lightboxImage && currentImages[currentImageIndex]) {
    lightboxImage.src = currentImages[currentImageIndex];
  }

  if (lightboxCounter) {
    lightboxCounter.textContent = `${currentImageIndex + 1} / ${currentImages.length}`;
    lightboxCounter.style.display = currentImages.length > 1 ? 'block' : 'none';
  }

  if (prevBtn) {
    prevBtn.style.display = currentImages.length > 1 ? 'flex' : 'none';
  }

  if (nextBtn) {
    nextBtn.style.display = currentImages.length > 1 ? 'flex' : 'none';
  }
}

/**
 * Navigate to next image
 */
export function nextImage() {
  if (currentImages.length <= 1) return;
  currentImageIndex = (currentImageIndex + 1) % currentImages.length;
  updateLightboxUI();
}

/**
 * Navigate to previous image
 */
export function prevImage() {
  if (currentImages.length <= 1) return;
  currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
  updateLightboxUI();
}

/**
 * Close lightbox
 */
export function closeLightbox() {
  const lightbox = document.getElementById('lightboxOverlay');

  if (lightbox) {
    lightbox.classList.remove('active');
    // Only remove panel-open if project modal is NOT open
    const panel = document.getElementById('projectPanel');
    if (!panel || !panel.classList.contains('active')) {
      document.body.classList.remove('panel-open');
    }
  }
}

/**
 * Setup lightbox listeners
 */
function setupLightboxListeners() {
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxOverlay = document.getElementById('lightboxOverlay');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prevImage();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextImage();
    });
  }

  if (lightboxOverlay) {
    lightboxOverlay.addEventListener('click', (e) => {
      if (e.target === lightboxOverlay) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightboxOverlay');
    if (lightbox && lightbox.classList.contains('active')) {
      if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    }
  });
}
