import {
  Experience,
  Project,
  Education,
  Skill,
  Certification,
} from "@/types";

export const skills: Skill[] = [
  // 50% Frontend Engineering
  { name: "React.js", category: "frontend", proficiency: 96, highlight: "Reusable component design system & custom Hooks patterns" },
  { name: "TypeScript", category: "frontend", proficiency: 94, highlight: "Strict typing, generics, infer types & interface contracts" },
  { name: "JavaScript (ES6+)", category: "frontend", proficiency: 95, highlight: "Async/await, closure, ES modules & event loop tuning" },
  { name: "Redux Toolkit", category: "frontend", proficiency: 92, highlight: "Normalized client state, memoized selectors & RTK Query" },
  { name: "Material UI (MUI)", category: "frontend", proficiency: 90, highlight: "Custom theme customization & enterprise design components" },
  { name: "Tailwind CSS & SCSS", category: "frontend", proficiency: 95, highlight: "Responsive utility-first design systems & fluid animations" },
  { name: "Performance & Code Splitting", category: "frontend", proficiency: 94, highlight: "Dynamic lazy loading cutting load times from 4.0s to 2.0s" },
  { name: "Accessibility (WCAG 2.1)", category: "frontend", proficiency: 90, highlight: "ARIA roles, keyboard navigation & semantic HTML5" },
  { name: "Component Testing", category: "frontend", proficiency: 88, highlight: "Unit testing, mock handlers & UI assertions" },

  // 40% Backend & Distributed Systems
  { name: "Node.js", category: "backend", proficiency: 92, highlight: "Event-driven asynchronous I/O stream handling" },
  { name: "Express.js", category: "backend", proficiency: 94, highlight: "REST API gateway design & middleware pipelines" },
  { name: "REST APIs", category: "backend", proficiency: 96, highlight: "API versioning, OpenAPI documentation & rate limiting" },
  { name: "MongoDB", category: "backend", proficiency: 90, highlight: "Aggregation pipelines, indexing & schema modeling" },
  { name: "SQL Databases", category: "backend", proficiency: 88, highlight: "Relational queries, ACID transactions & index tuning" },
  { name: "JWT & RBAC", category: "backend", proficiency: 92, highlight: "Secure authorization, token refresh & role-based access" },
  { name: "Docker Containerization", category: "backend", proficiency: 86, highlight: "Multi-stage builds & microservice container staging" },
  { name: "Microservices & CI/CD", category: "backend", proficiency: 88, highlight: "Service boundary isolation & zero-downtime deployment pipelines" },

  // 10% AI Systems & RAG Architecture
  { name: "OpenAI API", category: "ai", proficiency: 92, highlight: "Prompt engineering & automated text completions" },
  { name: "RAG Architecture", category: "ai", proficiency: 90, highlight: "Context injection & chunking for policy compliance search" },
  { name: "MongoDB Vector Search", category: "ai", proficiency: 88, highlight: "HNSW vector indexing cutting retrieval latency by 40%" },
  { name: "Prompt Engineering", category: "ai", proficiency: 90, highlight: "Custom prompt templates reducing analyst write-up time by 35%" },
];

export const experiences: Experience[] = [
  {
    id: "1",
    company: "Synechron Technologies Pvt. Ltd",
    position: "Senior Associate Technology — Full Stack Developer",
    duration: "Aug 2022 – Sep 2025",
    location: "Pune, India",
    client: "U.S. Bank (BFSI Compliance Domain)",
    description: [
      "Architected enterprise React.js and Node.js applications supporting 500+ daily financial compliance analysts with sub-200ms API response rates.",
      "Engineered reusable TypeScript + MUI component design system, reducing frontend development overhead by 25% across cross-functional engineering squads.",
      "Optimized web application bundle size and component rendering tree, cutting initial page load speed from 4.0s to 2.0s (50% speedup).",
      "Integrated OpenAI API with prompt-engineered GPT completions for automated transaction risk summaries, reducing analyst write-up time by 35%.",
      "Built Node.js RAG pipeline with MongoDB Atlas Vector Search HNSW indexing, improving semantic policy retrieval speed by 40%.",
      "Containerized backend microservices with Docker and maintained CI/CD pipelines for zero-downtime staging and production deployment gates.",
    ],
    skills: [
      "React.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "Redux Toolkit",
      "Material UI",
      "Tailwind CSS",
      "MongoDB",
      "SQL",
      "JWT / RBAC",
      "Docker",
      "OpenAI API",
      "RAG Architecture",
      "Vector Search",
      "Jest / RTL",
      "CI/CD",
    ],
    highlightsCategory: {
      architecture: [
        "Architected enterprise React 19 SPA & Node.js API Gateway with strict TypeScript interfaces and JWT/RBAC security.",
        "Built modular component design system reducing component development overhead by 25%.",
      ],
      performance: [
        "Cut initial web page load times from 4.0s to 2.0s (50% speedup) using route code splitting, lazy loading, and memoized selectors.",
        "Containerized microservices with Docker for seamless CI/CD execution.",
      ],
      aiAndInnovation: [
        "Pioneered enterprise RAG implementation using OpenAI API and MongoDB Atlas Vector Search.",
        "Reduced compliance analyst write-up time by 35% and boosted semantic policy retrieval speed by 40%.",
      ],
    },
  },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "U.S. Bank – KYT (Know Your Transaction) Compliance Platform",
    image: "",
    architectureImage: "",
    website_link: "",
    description:
      "A real-time transaction monitoring platform built for a U.S. banking client to help compliance analysts detect, review, and act on suspicious financial activity as it happens. The system streams live transaction data into a React.js dashboard, applies rule-based checks alongside AI-assisted risk scoring, and surfaces flagged cases with supporting context so analysts can make faster, audit-ready decisions. It supports 500+ daily users across compliance and risk teams and is built to stay responsive and accurate under continuous, high-volume transaction flow.",
    tags: [
      "React.js",
      "TypeScript",
      "Node.js",
      "OpenAI API",
      "MongoDB Vector Search",
      "Jest",
      "React Testing Library",
    ],
    category: "enterprise",
    highlights: [
      "Built core parts of a real-time transactional monitoring dashboard serving 500+ users, developing scalable React.js component patterns and state management for live compliance data streams.",
      "Designed prompt templates instructing GPT to return structured JSON (risk level, rule references, recommended actions), consumed directly by React components with zero post-processing.",
      "Wrote unit and component tests with Jest and React Testing Library for core dashboard components, improving reliability of critical compliance workflows.",
    ],
  },
  {
    id: "2",
    title: "Governance Dashboard Platform",
    image: "",
    architectureImage: "",
    website_link: "",
    description:
      "An internal governance dashboard giving stakeholders a consolidated view of governance and reporting metrics across the organization. Built the front end in React.js with reusable, modular components, wired up Redux/Context API for state management across views, and integrated with REST APIs for real-time data updates — with unit tests and CI/CD in place to keep releases stable.",
    tags: [
      "React.js",
      "JavaScript",
      "Redux",
      "Node.js",
      "Tailwind CSS",
      "REST API",
      "Jest",
      "CI/CD",
    ],
    category: "enterprise",
    highlights: [
      "Built and maintained React.js user interfaces for the governance dashboard, translating requirements into responsive, reusable components.",
      "Managed application state with Redux and Context API to keep data flow and view synchronization efficient across the dashboard.",
      "Integrated front-end components with REST APIs to fetch and update governance data, using Postman for endpoint testing.",
      "Wrote unit tests for React components with Jest and contributed to GitHub/GitLab CI pipelines to automate build, test, and deployment.",
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
    description: "Recognized for outstanding technical contribution, microservice performance optimization (4s→2s load time), and project delivery excellence.",
  },
  {
    id: "2",
    title: "Star Award — Technical Innovation",
    issuer: "Synechron Technologies",
    date: "2024",
    description: "Awarded for exceptional leadership in building AI/RAG integrations and vector search pipelines for enterprise BFSI compliance platforms.",
  },
];

export const socialLinks = {
  github: "https://github.com/sayyadarbaz01",
  linkedin: "https://linkedin.com/in/arbazsayyad",
  email: "sayyadarbaz046@gmail.com",
  phone: "+91-7841050046",
  whatsapp: "https://wa.me/919518940046",
};

export const navigation = [
  { label: "Overview", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];


