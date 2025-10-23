// Hero section text rotation
const heroTexts = [
  "Frontend Developer",
  "UI/UX Designer",
  "Creative Thinker",
  "Problem Solver"
];

const subtitleStyles = [
  'subtitle-badge', 
  'subtitle-gradient',
  'subtitle-highlight',
  'subtitle-slide-in'
];

let currentTextIndex = 0;
let currentStyleIndex = 0;

export function initHeroSection() {
  function rotateSubtitle() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const text = heroTexts[currentTextIndex];
    const style = subtitleStyles[currentStyleIndex];
    
    heroSubtitle.className = 'hero-subtitle';
    heroSubtitle.style.opacity = '0';
    
    setTimeout(() => {
      heroSubtitle.className = `hero-subtitle ${style}`;
      
      if (style === 'subtitle-slide-in') {
        heroSubtitle.innerHTML = `<span class="subtitle-text">${text}</span>`;
      } else {
        heroSubtitle.textContent = text;
      }
      
      heroSubtitle.style.opacity = '1';
      
      currentTextIndex = (currentTextIndex + 1) % heroTexts.length;
      currentStyleIndex = (currentStyleIndex + 1) % subtitleStyles.length;
    }, 500);
  }

  rotateSubtitle();
  setInterval(rotateSubtitle, 4000);
}