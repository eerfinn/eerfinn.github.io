/* ============================================
   PROJECTS DATA
   ============================================
   
   Untuk menambah project baru, cukup copy-paste
   salah satu object dan edit informasinya!
   
   Format:
   {
     title: "Nama Project",
     description: "Deskripsi singkat project",
     image: "URL gambar project",
     tags: ["Tech1", "Tech2", "Tech3"],
     link: "URL project / GitHub repo"
   }
*/

console.log('📦 Loading projects-data.js...');

const projectsData = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce platform dengan payment gateway integration dan real-time inventory management.",
    image: "https://via.placeholder.com/400x250/6366f1/ffffff?text=E-Commerce",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    link: "https://github.com/yourusername/project1"
  },
  {
    title: "Portfolio Website",
    description: "Modern and responsive portfolio website dengan dark mode, smooth animations, dan contact form.",
    image: "https://via.placeholder.com/400x250/8b5cf6/ffffff?text=Portfolio",
    tags: ["HTML5", "CSS3", "JavaScript"],
    link: "https://github.com/yourusername/project2"
  },
  {
    title: "Weather App",
    description: "Real-time weather application menggunakan OpenWeather API dengan geolocation dan 7-day forecast.",
    image: "https://via.placeholder.com/400x250/06b6d4/ffffff?text=Weather+App",
    tags: ["Vue.js", "API", "TailwindCSS"],
    link: "https://github.com/yourusername/project3"
  },
  {
    title: "Task Management System",
    description: "Collaborative task management tool dengan drag-and-drop interface dan team collaboration features.",
    image: "https://via.placeholder.com/400x250/ec4899/ffffff?text=Task+Manager",
    tags: ["React", "Firebase", "Material-UI"],
    link: "https://github.com/yourusername/project4"
  },
  {
    title: "Blog Platform",
    description: "Content management system untuk blogging dengan markdown support dan SEO optimization.",
    image: "https://via.placeholder.com/400x250/f59e0b/ffffff?text=Blog+CMS",
    tags: ["Next.js", "PostgreSQL", "Prisma"],
    link: "https://github.com/yourusername/project5"
  },
  {
    title: "Chat Application",
    description: "Real-time chat application dengan WebSocket, group chats, file sharing, dan emoji support.",
    image: "https://via.placeholder.com/400x250/10b981/ffffff?text=Chat+App",
    tags: ["Socket.io", "Express", "React"],
    link: "https://github.com/yourusername/project6"
  }
];

console.log('✅ projectsData defined with', projectsData.length, 'projects');

// Export untuk digunakan di script.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = projectsData;
}
