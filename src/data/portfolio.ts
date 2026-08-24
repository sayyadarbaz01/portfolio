import {
  Experience,
  Project,
  Education,
  Skill,
  Certification,
} from "@/types";

export const skills: Skill[] = [
  // AI Systems & RAG
  { name: "OpenAI API", category: "ai", proficiency: 92, highlight: "Function calling & custom prompt pipelines" },
  { name: "RAG Architecture", category: "ai", proficiency: 90, highlight: "Chunking, vector indexing & context injection" },
  { name: "MongoDB Vector Search", category: "ai", proficiency: 88, highlight: "HNSW indexes & semantic similarity retrieval" },
  { name: "Text Embeddings", category: "ai", proficiency: 90, highlight: "OpenAI text-embedding-3-small vectorization" },
  { name: "Semantic Search", category: "ai", proficiency: 88, highlight: "Cosine distance threshold matching" },

  // Frontend Architecture
  { name: "React.js", category: "frontend", proficiency: 95, highlight: "Component design systems & Hooks patterns" },
  { name: "TypeScript", category: "frontend", proficiency: 94, highlight: "Strict typing, generics & infer types" },
  { name: "Next.js", category: "frontend", proficiency: 90, highlight: "App Router, SSR, Server Actions" },
  { name: "Redux Toolkit", category: "frontend", proficiency: 92, highlight: "Normalized state & RTK Query caching" },
  { name: "Tailwind CSS", category: "frontend", proficiency: 95, highlight: "Custom design systems & responsive utility" },

  // Backend & Distributed Systems
  { name: "Node.js", category: "backend", proficiency: 92, highlight: "Event loop tuning & async stream handling" },
  { name: "Express.js", category: "backend", proficiency: 94, highlight: "REST API gateway design & middleware pipelines" },
  { name: "REST APIs", category: "backend", proficiency: 96, highlight: "Versioning, OpenAPI specs, rate-limiting" },
  { name: "Microservices", category: "backend", proficiency: 88, highlight: "Service boundary separation & async messaging" },

  // Databases & Cloud / DevOps
  { name: "MongoDB", category: "cloud", proficiency: 90, highlight: "Aggregation pipelines, indexes & Atlas Vector Search" },
  { name: "SQL", category: "cloud", proficiency: 88, highlight: "Relational queries, index tuning & transactions" },
  { name: "Docker", category: "cloud", proficiency: 85, highlight: "Multi-stage builds & container orchestration" },
  { name: "CI/CD Pipelines", category: "cloud", proficiency: 86, highlight: "GitHub Actions & automated deployment gates" },
  { name: "Git / GitHub", category: "tools", proficiency: 95, highlight: "Trunk-based workflow & rebase strategies" },
];

export const experiences: Experience[] = [
  {
    id: "1",
    company: "Synechron Technologies Pvt. Ltd",
    position: "Senior Associate Technology — Senior Full Stack Engineer",
    duration: "Aug 2022 – Sep 2025",
    location: "Pune, India",
    client: "U.S. Bank (BFSI Domain)",
    description: [
      "Engineered enterprise React.js and Node.js applications supporting 500+ daily financial analysts in mission-critical compliance environments.",
      "Integrated OpenAI API with prompt-engineered GPT completions for AI-assisted transaction risk summaries, reducing analyst write-up time by 35%.",
      "Built RAG pipeline using Node.js and MongoDB Atlas Vector Search for semantic compliance policy querying, cutting retrieval latency by 40%.",
      "Vectorized high-frequency transaction narratives using OpenAI text embeddings for semantic similarity search across financial records.",
      "Architected reusable component libraries using TypeScript, Redux Toolkit, and Material UI, reducing page load time from 4.0s to 2.0s (50% speedup).",
      "Containerized microservices with Docker and maintained production CI/CD pipelines for zero-downtime deployments.",
    ],
    skills: [
      "React.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "OpenAI API",
      "RAG Architecture",
      "Vector Search",
      "Docker",
      "CI/CD",
      "Redux Toolkit",
      "REST APIs",
    ],
    highlightsCategory: {
      architecture: [
        "Architected enterprise React.js SPA & Node.js microservices gateway for high-throughput compliance monitoring.",
        "Containerized core microservices with Docker for seamless staging and zero-downtime deployment pipelines.",
      ],
      performance: [
        "Optimized frontend bundle size and component re-rendering tree, cutting initial page load time from 4.0s to 2.0s.",
        "Implemented memory caching layers for vector search queries to achieve sub-200ms API response times.",
      ],
      aiAndInnovation: [
        "Pioneered enterprise RAG implementation combining OpenAI GPT-4 API and MongoDB Atlas Vector Search.",
        "Reduced risk summary writing time by 35% using structured prompt engineering and automated text embedding generation.",
      ],
    },
  },
  {
    id: "2",
    company: "Nexvia Software Technologies",
    position: "Software Engineer — Frontend Developer",
    duration: "Aug 2020 – Aug 2022",
    location: "Pune, India",
    description: [
      "Designed and developed responsive React.js & TypeScript UI components for enterprise SaaS and retail e-commerce applications.",
      "Architected frontend client state using Redux Toolkit, managing complex form states, shopping carts, and dynamic UI filters.",
      "Engineered custom Axios HTTP client layers with centralized request interceptors, automatic JWT token refreshes, and error handling.",
      "Optimized web page load times from 4.0s to 2.0s by implementing code splitting, lazy loading, image optimization, and memoized selectors.",
      "Ensured WCAG 2.1 accessibility standards across UI components using ARIA labels, semantic HTML5, and keyboard navigation.",
    ],
    skills: [
      "React.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Redux Toolkit",
      "HTML5 / CSS3",
      "Material UI",
      "Tailwind CSS",
      "REST APIs",
      "Axios Interceptors",
      "WCAG / Accessibility",
    ],
    highlightsCategory: {
      architecture: [
        "Built modular component design system adopted across internal client portals.",
        "Established standardized API interceptor layer for JWT auth refresh and global error handling.",
      ],
      performance: [
        "Reduced initial page load speed from 4.0s to 2.0s through dynamic route chunking and lazy loading.",
      ],
    },
  },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "U.S. Bank – KYT Compliance & AI Risk Platform",
    image: "",
    architectureImage: "",
    website_link: "",
    description:
      "Enterprise-grade financial transaction monitoring platform with AI-assisted risk analysis and RAG-based semantic policy querying. Supports 500+ daily compliance analysts processing high-volume transaction narratives.",
    tags: [
      "React.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "OpenAI API",
      "RAG Architecture",
      "Vector Search",
      "MongoDB",
      "Docker",
    ],
    category: "enterprise",
    highlights: [
      "Integrated OpenAI GPT for automated compliance risk narrative generation, cutting analyst write-up time by 35%",
      "Architected Node.js RAG pipeline with MongoDB Atlas Vector Search, boosting policy retrieval speed by 40%",
      "Containerized backend microservices with Docker for zero-downtime deployment workflows",
      "Delivered real-time transaction telemetry dashboards supporting 500+ daily operational users",
    ],
  },
  {
    id: "2",
    title: "Shopee Cart – Enterprise POS & Retail Commerce",
    image: "",
    architectureImage: "",
    website_link: "",
    description:
      "High-concurrency Point of Sale (POS) and retail e-commerce engine with real-time inventory synchronization, order stream processing, and multi-tenant checkout terminal workflows.",
    tags: [
      "React.js",
      "TypeScript",
      "Redux Toolkit",
      "Node.js",
      "REST APIs",
      "Material UI",
      "Responsive UI",
    ],
    category: "ecommerce",
    highlights: [
      "Architected responsive checkout terminal UI with instant state sync across mobile, tablet, and desktop",
      "Engineered resilient Axios API client layer with automatic retry logic and structured error fallbacks",
      "Streamlined state management for 10,000+ SKU inventory searches with memoized selector filters",
      "Optimized rendering pipeline to achieve zero lag during high-frequency barcode scans",
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
    description: "Specialized in Information Technology with a strong foundation in computer science fundamentals, data structures, algorithms, and software engineering practices.",
  },
];

export const certifications: Certification[] = [
  {
    id: "1",
    title: "Star Award — Performance Excellence",
    issuer: "Synechron Technologies",
    date: "2023",
    description: "Recognized for outstanding technical contribution, microservice performance optimization, and project delivery excellence.",
  },
  {
    id: "2",
    title: "Star Award — Technical Innovation",
    issuer: "Synechron Technologies",
    date: "2024",
    description: "Awarded for exceptional leadership in building AI/RAG integrations for enterprise BFSI compliance platforms.",
  },
];

export const socialLinks = {
  github: "https://github.com/sayyadarbaz01",
  linkedin: "https://linkedin.com/in/arbazsayyad",
  email: "arbazsayyad015@gmail.com",
  phone: "+91-9518940046",
  whatsapp: "https://wa.me/919518940046",
};

export const navigation = [
  { label: "Overview", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Metrics", href: "#metrics" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "GitHub", href: "#github-activity" },
  { label: "Contact", href: "#contact" },
];

