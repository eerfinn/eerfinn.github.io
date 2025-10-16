
const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    shortDescription: "Full-stack e-commerce platform dengan payment gateway integration.",
    fullDescription: "Platform e-commerce lengkap yang dibangun dengan teknologi modern. Fitur utama meliputi sistem pembayaran terintegrasi dengan Stripe, manajemen inventory real-time, sistem review produk, dan dashboard admin yang komprehensif.",
    image: "./assets/images/image.png",
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
    image: "https://via.placeholder.com/600x400/8b5cf6/ffffff?text=Portfolio+Website",
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
  },
  {
    id: 3,
    title: "Weather App",
    shortDescription: "Real-time weather application dengan geolocation dan forecast.",
    fullDescription: "Aplikasi cuaca real-time yang menggunakan OpenWeather API untuk menampilkan informasi cuaca terkini. Dilengkapi dengan fitur geolocation, forecast 7Aplikasi cuaca real-time yang menggunakan OpenWeather API untuk menampilkan informasiAplikasi cuaca real-time yang menggunakan OpenWeather API untuk menampilkan informasi cuaca terkini. Dilengkapi dengan fitur geolocation, forecast 7Aplikasi cuaca real-time yang menggunakan OpenWeather API untuk menampilkan informasi cuaca terkini. Dilengkapi dengan fitur geolocation, forecast 7Aplikasi cuaca real-time yang menggunakan OpenWeather API untuk menampilkan informasi cuaca terkini. Dilengkapi dengan fitur geolocation, forecast 7Aplikasi cuaca real-time yang menggunakan OpenWeather API untuk menampilkan informasi cuaca terkini. Dilengkapi dengan fitur geolocation, forecast 7Aplikasi cuaca real-time yang menggunakan OpenWeather API untuk menampilkan informasi cuaca terkini. Dilengkapi dengan fitur geolocation, forecast 7Aplikasi cuaca real-time yang menggunakan OpenWeather API untuk menampilkan informasi cuaca terkini. Dilengkapi dengan fitur geolocation, forecast 7 cuaca terkini. Dilengkapi dengan fitur geolocation, forecast 7 hari, dan visualisasi data cuaca yang menarik dengan chart interaktif.",
    image: "https://via.placeholder.com/600x400/06b6d4/ffffff?text=Weather+App",
    tags: ["Vue.js", "API", "TailwindCSS"],
    category: "Frontend",
    duration: "2 weeks",
    status: "Completed",
    features: [
      "Current Weather Display",
      "7-Day Weather Forecast",
      "Geolocation Detection",
      "City Search Functionality",
      "Weather Charts & Graphs",
      "Responsive Mobile Design"
    ],
    techStack: {
      frontend: ["Vue.js 3", "Composition API", "Vue Router"],
      styling: ["TailwindCSS", "Chart.js"],
      api: ["OpenWeather API", "Geolocation API"],
      others: ["Axios", "Moment.js", "Vercel"]
    },
    links: {
      github: "https://github.com/eerfinn/weather-app",
      live: "https://weather-app-vue.vercel.app",
      documentation: "https://github.com/eerfinn/weather-app/blob/main/README.md"
    }
  },
  {
    id: 4,
    title: "Task Management System",
    shortDescription: "Collaborative task management dengan drag-and-drop interface.",
    fullDescription: "Sistem manajemen tugas kolaboratif yang memungkinkan tim untuk bekerja sama secara efisien. Fitur drag-and-drop untuk mengatur task, real-time collaboration, sistem notifikasi, dan dashboard analytics untuk tracking produktivitas.",
    image: "https://via.placeholder.com/600x400/ec4899/ffffff?text=Task+Manager",
    tags: ["React", "Firebase", "Material-UI"],
    category: "Full Stack",
    duration: "2 months",
    status: "In Progress",
    features: [
      "Drag & Drop Task Management",
      "Real-time Collaboration",
      "Team Member Management",
      "Project Analytics Dashboard",
      "Notification System",
      "File Attachment Support"
    ],
    techStack: {
      frontend: ["React", "Material-UI", "React DnD"],
      backend: ["Firebase", "Firestore", "Firebase Auth"],
      realtime: ["Firebase Realtime Database"],
      others: ["Firebase Storage", "PWA", "Service Workers"]
    },
    links: {
      github: "https://github.com/eerfinn/task-manager",
      live: "https://task-manager-react.web.app",
      documentation: "https://github.com/eerfinn/task-manager/wiki"
    }
  },
  {
    id: 5,
    title: "Blog Platform",
    shortDescription: "Content management system dengan markdown support.",
    fullDescription: "Platform blogging modern dengan fokus pada performa dan SEO. Menggunakan Next.js untuk server-side rendering, markdown untuk content creation, dan sistem komentar terintegrasi. Dilengkapi dengan dashboard admin untuk manajemen konten.",
    image: "https://via.placeholder.com/600x400/f59e0b/ffffff?text=Blog+CMS",
    tags: ["Next.js", "PostgreSQL", "Prisma"],
    category: "Full Stack",
    duration: "6 weeks",
    status: "Completed",
    features: [
      "Markdown Content Editor",
      "SEO Optimization",
      "Comment System",
      "Admin Dashboard",
      "Category & Tag Management",
      "Search Functionality"
    ],
    techStack: {
      frontend: ["Next.js", "React", "TailwindCSS"],
      backend: ["Next.js API Routes", "Prisma ORM"],
      database: ["PostgreSQL", "Supabase"],
      others: ["NextAuth.js", "MDX", "Vercel"]
    },
    links: {
      github: "https://github.com/eerfinn/blog-platform",
      live: "https://blog-platform-nextjs.vercel.app",
      documentation: "https://github.com/eerfinn/blog-platform/docs"
    }
  },
  {
    id: 6,
    title: "Chat Application",
    shortDescription: "Real-time chat dengan WebSocket dan group chats.",
    fullDescription: "Aplikasi chat real-time yang memungkinkan komunikasi instant antar pengguna. Dilengkapi dengan fitur group chat, file sharing, emoji support, dan sistem notifikasi push. Menggunakan Socket.io untuk real-time communication.",
    image: "https://via.placeholder.com/600x400/10b981/ffffff?text=Chat+App",
    tags: ["Socket.io", "Express", "React"],
    category: "Full Stack",
    duration: "1 month",
    status: "Completed",
    features: [
      "Real-time Messaging",
      "Group Chat Creation",
      "File & Image Sharing",
      "Emoji & Reaction Support",
      "Online Status Indicator",
      "Message History"
    ],
    techStack: {
      frontend: ["React", "Socket.io Client", "Styled Components"],
      backend: ["Node.js", "Express", "Socket.io"],
      database: ["MongoDB", "Mongoose"],
      others: ["JWT", "Multer", "Cloudinary", "Heroku"]
    },
    links: {
      github: "https://github.com/eerfinn/chat-app",
      live: "https://realtime-chat-app.herokuapp.com",
      documentation: "https://github.com/eerfinn/chat-app/blob/main/API.md"
    }
  },
  {
    id: 7,
    title: "Space Shooter Adventure",
    shortDescription: "2D space shooter game dengan multiple levels dan power-ups.",
    fullDescription: "Game arcade klasik yang dibuat menggunakan Construct 2. Pemain mengendalikan pesawat luar angkasa untuk melawan gelombang musuh dengan berbagai jenis senjata dan power-ups. Dilengkapi dengan sistem scoring, multiple levels dengan tingkat kesulitan yang meningkat, dan boss battles yang menantang.",
    image: "https://via.placeholder.com/600x400/7c3aed/ffffff?text=Space+Shooter",
    tags: ["Construct 2", "Game Design", "2D Graphics", "Sound Design"],
    category: "Frontend",
    duration: "2 months",
    status: "Completed",
    features: [
      "Multiple Enemy Types",
      "Power-up System (Shield, Rapid Fire, Missiles)",
      "5 Challenging Levels",
      "Boss Battles",
      "High Score Leaderboard",
      "Particle Effects & Animations",
      "Responsive Touch Controls",
      "Sound Effects & Background Music"
    ],
    techStack: {
      engine: ["Construct 2"],
      graphics: ["Photoshop", "Sprite Sheets"],
      audio: ["Audacity", "Freesound"],
      deployment: ["HTML5 Export", "Itch.io"]
    },
    links: {
      github: "https://github.com/eerfinn/space-shooter-game",
      live: "https://eerfinn.itch.io/space-shooter",
      documentation: "https://github.com/eerfinn/space-shooter-game/blob/main/GAME_DESIGN.md"
    }
  },
  {
    id: 8,
    title: "Puzzle Quest: Block Breaker",
    shortDescription: "Addictive puzzle game dengan physics-based mechanics.",
    fullDescription: "Game puzzle yang menantang dibuat dengan Construct 2, menggabungkan elemen strategi dan fisika. Pemain harus menghancurkan blok-blok berwarna dengan mekanisme yang unik, mengumpulkan bintang, dan menyelesaikan 50+ level dengan berbagai tantangan. Game ini dilengkapi dengan sistem achievement dan daily challenges.",
    image: "https://via.placeholder.com/600x400/f59e0b/ffffff?text=Puzzle+Quest",
    tags: ["Construct 2", "Puzzle", "Physics", "Mobile Game"],
    category: "Frontend",
    duration: "6 weeks",
    status: "Completed",
    features: [
      "50+ Unique Puzzle Levels",
      "Physics-based Gameplay",
      "Star Rating System",
      "Achievement System",
      "Daily Challenges",
      "Hint System",
      "Level Editor",
      "Cross-platform (Web & Mobile)"
    ],
    techStack: {
      engine: ["Construct 2", "Box2D Physics"],
      graphics: ["Illustrator", "Aseprite"],
      audio: ["BFXR", "GarageBand"],
      deployment: ["Cordova", "Google Play", "HTML5"]
    },
    links: {
      github: "https://github.com/eerfinn/puzzle-quest-game",
      live: "https://eerfinn.itch.io/puzzle-quest",
      documentation: "https://github.com/eerfinn/puzzle-quest-game/wiki"
    }
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = projectsData;
}
