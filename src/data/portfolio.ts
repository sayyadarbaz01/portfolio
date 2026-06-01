import {
  Experience,
  Project,
  Education,
  Skill,
  Certification,
} from "@/types";

export const skills: Skill[] = [
  // AI Integration
  { name: "OpenAI API", category: "frontend", icon: "Brain" },
  { name: "Prompt Engineering", category: "frontend", icon: "Lightbulb" },
  { name: "RAG", category: "frontend", icon: "Network" },
  { name: "Vector Search", category: "frontend", icon: "Zap" },
  { name: "Text Embeddings", category: "frontend", icon: "Type" },
  { name: "Semantic Search", category: "frontend", icon: "Search" },

  // Frontend
  { name: "React.js", category: "frontend", icon: "React" },
  { name: "TypeScript", category: "frontend", icon: "TypeScript" },
  { name: "JavaScript ES6+", category: "frontend", icon: "Lightbulb" },
  { name: "Redux Toolkit", category: "frontend", icon: "Redux" },
  { name: "Material UI", category: "frontend", icon: "Palette" },
  { name: "HTML5", category: "frontend", icon: "Code" },
  { name: "CSS3 / SCSS", category: "frontend", icon: "Palette" },

  // Backend
  { name: "Node.js", category: "backend", icon: "Node" },
  { name: "Express.js", category: "backend", icon: "Express" },
  { name: "REST APIs", category: "backend", icon: "Share2" },

  // Databases
  { name: "MongoDB", category: "backend", icon: "MongoDB" },
  { name: "SQL", category: "backend", icon: "Database" },

  // DevOps / Tools
  { name: "Docker", category: "tools", icon: "Container" },
  { name: "CI/CD Pipelines", category: "tools", icon: "GitBranch" },
  { name: "Git", category: "tools", icon: "GitBranch" },
  { name: "GitHub", category: "tools", icon: "GitBranch" },
  { name: "GitLab", category: "tools", icon: "GitBranch" },
  { name: "Vite", category: "tools", icon: "Zap" },
  { name: "Webpack", category: "tools", icon: "Package" },
  { name: "Postman", category: "tools", icon: "Send" },
  { name: "Unit Testing", category: "tools", icon: "CheckCircle" },
  { name: "Agile / Scrum", category: "tools", icon: "Zap" },
  { name: "Jira", category: "tools", icon: "CheckSquare" },
];

export const experiences: Experience[] = [
  {
    id: "1",
    company: "Synechron Technologies Pvt. Ltd",
    position: "Senior Associate Technology - Senior Full Stack Engineer",
    duration: "Aug 2022 – Sep 2025",
    location: "Pune, India",
    description: [
      "Engineered enterprise React.js and Node.js applications supporting 500+ daily users in mission-critical financial environments",
      "Integrated OpenAI API with prompt-engineered GPT completions for AI-assisted transaction risk summaries, reducing analyst write-up time by 35%",
      "Built RAG pipeline using Node.js and MongoDB Atlas Vector Search for semantic compliance policy querying, cutting retrieval time by 40%",
      "Implemented OpenAI text embeddings to vectorize transaction narratives for semantic similarity search across financial records",
      "Architected reusable component libraries using JavaScript, Redux Toolkit, and Material UI, reducing page load time from 4.0s to 2.0s",
      "Containerized microservices with Docker and maintained CI/CD pipelines for zero-downtime deployments",
    ],
    skills: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "Docker",
      "CI/CD",
      "OpenAI API",
      "RAG",
      "Vector Search",
      "TypeScript",
      "Redux Toolkit",
      "Material UI",
    ],
  },
  {
    id: "2",
    company: "Nexvia Software Technologies",
    position: "Software Engineer – Frontend React.js Developer",
    duration: "Aug 2020 – Aug 2022",
    location: "Pune, India",
    description: [
      "Built dynamic and static React.js and JavaScript UI components for production workflows",
      "Reduced average page interaction time across core user journeys",
      "Implemented Axios and Fetch API layers with structured error handling",
      "Ensured reliable frontend-backend communication across all data flows",
      "Managed application state using Redux and React Hooks",
      "Collaborated with product owners in Agile sprints to scope, prioritize, and ship user-focused features on time",
    ],
    skills: [
      "React.js",
      "JavaScript ES6+",
      "TypeScript",
      "Redux",
      "Material UI",
      "REST APIs",
      "Axios",
      "Git",
      "Agile",
    ],
  },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "U.S. Bank – KYT Platform",
    website_link: "",
    description:
      "Architected full-stack applications across scalable microservices serving real-time KYT compliance data for 500+ daily transactions. Enterprise-grade compliance platform with AI-assisted risk analysis and semantic policy querying.",
    tags: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "Docker",
      "CI/CD",
      "OpenAI API",
      "RAG",
      "Vector Search",
      "TypeScript",
    ],
    category: "enterprise",
    highlights: [
      "Built 10+ REST APIs for real-time data streaming and financial reporting",
      "Containerized microservices with Docker for zero-downtime deployments",
      "Integrated OpenAI for AI-assisted compliance and transaction risk workflows",
      "Supported 500+ daily users in mission-critical financial environments",
    ],
  },
  {
    id: "2",
    title: "Shopee Cart – POS E-commerce Platform",
    website_link: "",
    description:
      "Designed frontend components for an e-commerce POS platform with responsive UI and smooth user experience across devices. Built scalable product management and seamless shopping experiences.",
    tags: [
      "React.js",
      "JavaScript",
      "REST APIs",
      "Responsive UI",
      "Backend API Integration",
      "Material UI",
      "CSS3",
    ],
    category: "ecommerce",
    highlights: [
      "Designed responsive frontend components for POS platform",
      "Integrated backend APIs with structured data flow",
      "Enhanced performance through optimized component architecture",
      "Delivered smooth user experience across mobile, tablet, and desktop",
    ],
  },
];

export const education: Education[] = [
  {
    id: "1",
    institution: "Dr. Babasaheb Ambedkar Marathwada University",
    degree: "Bachelor of Science in Information Technology (BSc-IT)",
    duration: "2018 – 2021",
    location: "Aurangabad, India",
    description: "Specialized in Information Technology with strong foundation in computer science fundamentals and software development practices",
  },
];

export const certifications: Certification[] = [
  {
    id: "1",
    title: "Star Award",
    issuer: "Synechron Technologies",
    date: "2023",
    description: "Recognized for outstanding performance and exceptional contribution to project delivery",
  },
  {
    id: "2",
    title: "Star Award",
    issuer: "Synechron Technologies",
    date: "2024",
    description: "Awarded for exceptional contribution to project delivery and continuous excellence",
  },
];

export const socialLinks = {
  github: "https://github.com/sayyadarbaz01",
  linkedin: "https://linkedin.com/in/arbazsayyad",
  email: "arbaz.sayyad.frontend@gmail.com",
  phone: "+91-8208450286",
  whatsapp: "https://wa.me/918208450286",
};

export const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "GitHub", href: "#github-activity" },
  { label: "Connect", href: "#contact" },
];
