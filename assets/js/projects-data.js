const projectsData = [
  {
    id: 1,
    title: "Website Sistem Akreditasi (SiAkred)",
    description:
      "A Project Based Learning (PBL) project developed using the Laravel framework, serving as an information and documentation portal for the accreditation of the D4 Business Information Systems Program at Politeknik Negeri Malang.",
    image: "./assets/images/siakred/home-view.png",
    screenshots: ["./assets/images/siakred/home.png"],
    tags: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap", "CSS"],
    category: "Full Stack",
    duration: "4 Months",
    status: "Completed",
    features: [
      "Multi-role User Authentication (Administrator, Dosen, Koordinator, Direktur, KJM, Kaprodi, Kajur)",
      "Document Upload and Management System (PPEPP: Penetapan, Pelaksanaan, Evaluasi, Pengendalian, Peningkatan)",
      "Multi-level Administrative Verification Workflow (Koordinator → Direktur)",
      "Real-time Document Status Tracking (Draft, Menunggu, Revisi, Diverifikasi)",
      "Email Notifications via Laravel Mail",
      "In-app Notification System with Real-time Updates",
      "User Profile Management with Photo Upload",
      "Document History and Activity Logging",
      "Activity Log Export to Excel (PHPSpreadsheet)",
      "Document Template Management System",
      "Task Management System (To-Do List)",
      "Document Commenting System",
      "Password Reset Functionality",
      "Document Access Control and Permission System",
      "Kriteria-based Access Control for Users",
      "Role-based Dashboard Views",
    ],
    techStack: {
      frontend: [
        "HTML",
        "CSS",
        "JavaScript",
        "jQuery",
        "Bootstrap 5",
        "DataTables",
        "TinyMCE",
        "SweetAlert2",
        "Font Awesome",
      ],
      backend: ["PHP 8.1", "Laravel 10", "SQL Server"],
      tools: [
        "PHPSpreadsheet",
        "PHPWord",
        "TinyMCE",
        "Laravel Sanctum",
        "Laravel Mail",
      ],
    },
    links: {
      github: "https://github.com/eerfinn/SistemAkreditasi-PBL",
      documentation:
        "https://www.notion.so/eerfinn/Website-Platform-Sistem-Akreditasi-SiAkred-298980390ee080be85d9db81777b4df1?source=copy_link",
    },
  },
  {
    id: 2,
    title: "Personal Portfolio Website",
    description:
      "A personal portfolio website built from scratch using modern web technologies. The site features a clean and intuitive design with smooth transitions and animations. Key highlights include a dynamic dark/light theme system, responsive layout that works perfectly across all devices, interactive project showcase with detailed modal views, and performant image handling with lazy loading. The modular JavaScript architecture ensures maintainable and scalable code.",
    image: "./assets/images/portofolio/home-section.png",
    screenshots: [
      "./assets/images/portofolio/fullpage-dark.png",
      "./assets/images/portofolio/fullpage-light.png",
    ],
    tags: ["HTML", "CSS", "JavaScript"],
    category: "Frontend",
    duration: "2 weeks",
    status: "Completed",
    features: [
      "Responsive UI Design",
      "Dynamic Project Cards",
      "Dark/Light Theme Toggle",
      "Smooth Animations & Transitions",
      "Interactive Project Modal",
      "Image Lightbox Gallery",
    ],
    techStack: {
      frontend: ["HTML5", "CSS3", "Vanilla JavaScript"],
      tools: ["Font Awesome", "Google Fonts"],
    },
    links: {
      github: "https://github.com/eerfinn/eerfinn.github.io",
      live: "https://eerfinn.github.io",
      documentation:
        "https://www.notion.so/eerfinn/Website-Platform-Portofolio-298980390ee08017950eefc0dce02465",
    },
  },
  {
    id: 3,
    title: "Website Sistem Bebas Tanggungan (SiBesT)",
    description:
      "A Project Based Learning (PBL) project focused on developing a PHP-based student clearance service portal, implementing a comprehensive system for managing academic requirements clearance. The system features user authentication, document submission workflows, administrative verification processes, and integrated communication between students and department administrators.",
    image: "./assets/images/sibest/home-view.png",
    screenshots: [
      "./assets/images/sibest/home.png",
      "./assets/images/sibest/login.png",
      "./assets/images/sibest/dashboard.png",
      "./assets/images/sibest/profile.png",
      "./assets/images/sibest/announcement.png",
      "./assets/images/sibest/tanggungan-prodi.png",
      "./assets/images/sibest/pengajuan-document.png",
      "./assets/images/sibest/detail-document.png",
    ],
    tags: ["PHP", "SQL Server", "JavaScript", "Bootstrap", "CSS"],
    category: "Full Stack",
    duration: "4 Months",
    status: "Completed",
    features: [
      "Multi-role User Authentication (Student, Department Admin, Study Program Admin)",
      "Document Upload and Management System",
      "Administrative Verification Workflow",
      "Real-time Status Tracking",
      "Email Notifications",
      "Announcement Management System",
      "User Profile Management",
      "Document History and Reporting",
    ],
    techStack: {
      frontend: ["HTML", "CSS", "JavaScript", "Bootstrap 5", "Font Awesome"],
      backend: ["PHP", "SQL Server"],
      tools: ["PHPMailer", "FPDF"],
    },
    links: {
      documentation:
        "https://www.notion.so/eerfinn/Website-Platform-Sistem-Bebas-Tanggungan-SiBesT-298980390ee08066965acb259bb25be8?source=copy_link",
    },
  },
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = projectsData;
}
