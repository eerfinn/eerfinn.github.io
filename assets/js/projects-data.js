
const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    shortDescription: "Full-stack e-commerce platform dengan payment gateway integration.",
    fullDescription: "Platform e-commerce lengkap yang dibangun dengan teknologi modern. Fitur utama meliputi sistem pembayaran terintegrasi dengan Stripe, manajemen inventory real-time, sistem review produk, dan dashboard admin yang komprehensif.",
    image: "./assets/images/portofolio-website.png",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "Full Stack",
    duration: "3 months",
    status: "Completed",
    features: [
      "Payment Gateway Integration",
      "Real-time Inventory Management",
      "User Authentication & Authorization",
      "Product Review System",
      "Admin Dashboard",
      "Responsive Design"
    ],
    techStack: {
      frontend: ["React", "Redux", "Material-UI", "Axios"],
      backend: ["Node.js", "Express", "JWT", "Bcrypt"],
      database: ["MongoDB", "Mongoose"],
      others: ["Stripe API", "Cloudinary", "Heroku"]
    },
    links: {
      github: "https://github.com/eerfinn/ecommerce-platform",
      live: "https://ecommerce-demo.netlify.app",
      documentation: "https://github.com/eerfinn/ecommerce-platform/wiki"
    }
  },
  {
    id: 2,
    title: "Portfolio Website",
    shortDescription: "Modern and responsive portfolio website dengan dark mode.",
    fullDescription: "Website portfolio personal yang didesain dengan fokus pada user experience dan performa. Menggunakan vanilla JavaScript untuk animasi smooth, CSS Grid untuk layout responsif, dan implementasi dark mode dengan local storage.",
    image: "./assets/images/portofolio-website.png",
    tags: ["HTML5", "CSS3", "JavaScript"],
    category: "Frontend",
    duration: "1 month",
    status: "Completed",
    features: [
      "Dark/Light Mode Toggle",
      "Smooth Scroll Animations",
      "Responsive Design",
      "Contact Form Integration",
      "SEO Optimized",
      "Fast Loading Performance"
    ],
    techStack: {
      frontend: ["HTML5", "CSS3", "Vanilla JavaScript"],
      styling: ["CSS Grid", "Flexbox", "CSS Variables"],
      tools: ["Git", "Netlify", "Google Analytics"],
      others: ["EmailJS", "Font Awesome", "Google Fonts"]
    },
    links: {
      github: "https://github.com/eerfinn/portfolio",
      live: "https://erfinjauhari.netlify.app",
      documentation: "https://github.com/eerfinn/portfolio/readme.md"
    }
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = projectsData;
}
