
const projectsData = [
  {
    id: 1,
    title: "Personal Portfolio Website",
    shortDescription: "Website portofolio interaktif untuk menampilkan proyek, keterampilan, dan pengalaman secara profesional.",
    fullDescription: "Website portofolio pribadi yang dirancang untuk menampilkan karya, keahlian, dan pengalaman saya. Dibangun dengan teknologi modern untuk memberikan tampilan yang responsif, navigasi yang intuitif, dan performa optimal. Situs ini berfungsi sebagai representasi profesional sekaligus wadah untuk bereksperimen dengan desain dan pengembangan web.",
    image: "./assets/images/portofolio/home-section.png",
    screenshots: [
      "./assets/images/portofolio/fullpage-dark.png",
      "./assets/images/portofolio/fullpage-light.png",
    ],
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    category: "Frontend",
    duration: "2 weeks",
    status: "Completed",
    features: [
      "Responsive UI Design",
      "Dynamic Project Section",
      "Dark and Light Mode",
    ],
    techStack: {
      frontend: ["HTML", "CSS", "JavaScript", "Bootstrap"]
    },
    links: {
      github: "https://github.com/eerfinn/eerfinn.github.io",
      live: "https://eerfinn.github.io",
      documentation: "https://github.com/eerfinn/eerfinn.github.io"
    }
  },
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = projectsData;
}
