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

// Tutup sidebar saat mengklik link
document.querySelectorAll(".sidebar-link").forEach((link) => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("show");
  });
});

// Smooth scrolling
document.querySelectorAll(".navbar a, .sidebar a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Fade-in effect
const fadeElements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

fadeElements.forEach((el) => observer.observe(el));