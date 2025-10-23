// Project grid functionality
export function initProjects() {
  function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    if (!projectsGrid || typeof projectsData === 'undefined') {
      return;
    }
    
    projectsGrid.innerHTML = '';
    
    projectsData.forEach((project, index) => {
      const projectCard = createProjectCard(project, index);
      projectsGrid.appendChild(projectCard);
    });
  }

  function createProjectCard(project, index) {
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
    
    return projectCard;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderProjects);
  } else {
    renderProjects();
  }
}