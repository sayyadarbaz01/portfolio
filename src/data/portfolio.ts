import {
  Experience,
  Project,
  Education,
  Skill,
  Certification,
} from "@/types";

export const skills: Skill[] = [
  // Frontend
  { name: "React.js", level: 90, category: "frontend", icon: "React" },
  { name: "Next.js", level: 85, category: "frontend", icon: "Next" },
  { name: "TypeScript", level: 88, category: "frontend", icon: "TypeScript" },
  { name: "Tailwind CSS", level: 90, category: "frontend", icon: "Tailwind" },
  { name: "Redux & Redux Toolkit", level: 85, category: "frontend", icon: "Redux" },
  { name: "Framer Motion", level: 80, category: "frontend", icon: "Framer" },
  { name: "Material UI", level: 82, category: "frontend", icon: "MUI" },
  { name: "CSS3 & HTML5", level: 92, category: "frontend", icon: "HTML" },
  { name: "Responsive Design", level: 90, category: "frontend" },
  { name: "JavaScript ES6+", level: 92, category: "frontend" },

  // Backend
  { name: "Node.js", level: 88, category: "backend", icon: "Node" },
  { name: "Express.js", level: 87, category: "backend", icon: "Express" },
  { name: "NestJS", level: 80, category: "backend", icon: "Nest" },
  { name: "MongoDB", level: 85, category: "backend", icon: "MongoDB" },
  { name: "PostgreSQL", level: 80, category: "backend", icon: "PostgreSQL" },
  { name: "GraphQL", level: 78, category: "backend", icon: "GraphQL" },
  { name: "Prisma ORM", level: 80, category: "backend", icon: "Prisma" },
  { name: "REST APIs", level: 90, category: "backend" },
  { name: "JWT Authentication", level: 85, category: "backend" },

  // Tools
  { name: "Git & GitHub", level: 90, category: "tools", icon: "Git" },
  { name: "GitLab", level: 82, category: "tools", icon: "GitLab" },
  { name: "Postman", level: 85, category: "tools", icon: "Postman" },
  { name: "Docker", level: 75, category: "tools", icon: "Docker" },
  { name: "JIRA", level: 82, category: "tools", icon: "Jira" },
  { name: "VS Code", level: 92, category: "tools", icon: "VSCode" },
  { name: "ARC Toolkit & WCAG", level: 85, category: "tools" },
  { name: "GitHub Copilot", level: 88, category: "tools" },
  { name: "ChatGPT & Claude (AI)", level: 90, category: "tools" },

  // Other
  { name: "Agile & Scrum", level: 85, category: "other" },
  { name: "Problem Solving", level: 90, category: "other" },
  { name: "Team Collaboration", level: 88, category: "other" },
  { name: "Code Review", level: 85, category: "other" },
  { name: "AI-Assisted Development", level: 90, category: "other" },
];

export const experiences: Experience[] = [
  {
    id: "1",
    company: "Vassu Tech Services Pvt Ltd",
    position: "Senior Software Engineer",
    duration: "March 2025 – Present",
    location: "Hyderabad, Telangana",
    client: "Radian Title Genius",
    description: [
      "Led end-to-end web accessibility implementation across the entire application using ARC Toolkit extension, identifying and fixing accessibility issues in compliance with ADA-WCAG guidelines",
      "Implemented comprehensive ARIA attributes and ensured functional and dynamic accessibility handling across all user interaction scenarios",
      "Developed endorsement template section, implementing all property states per confidential requirements and adhering to complex business rules",
      "Optimized application performance, reliability, and scalability across production deployments",
      "Delivered solutions across the complete software development lifecycle",
    ],
    skills: [
      "Next.js",
      "React.js",
      "Redux",
      "Node.js",
      "Express.js",
      "NestJS",
      "GraphQL",
      "Prisma",
      "PostgreSQL",
      "Accessibility",
      "TypeScript",
    ],
  },
  {
    id: "2",
    company: "TruScholar – Asset Chain Intelligence Pvt Ltd",
    position: "Full Stack Developer (MERN Stack)",
    duration: "September 2023 – February 2025",
    location: "Amravati, Maharashtra",
    description: [
      "Developed and optimized the Learner Module, enabling users to securely request and receive transcripts with integrated APIs for real-time communication between users and universities",
      "Built dynamic, responsive frontend interfaces using React.js with efficient state management through Redux and reusable UI components",
      "Implemented system improvements to enhance performance, stability, and maintainability across the application",
      "Enhanced system security and performance by applying authentication, role-based access control, and API optimization techniques",
      "Collaborated with cross-functional teams to deliver robust and scalable solutions",
    ],
    skills: [
      "React.js",
      "Redux",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "TypeScript",
      "Material-UI",
      "Tailwind CSS",
    ],
  },
  {
    id: "3",
    company: "Prodapt Solutions Pvt Ltd",
    position: "Software Engineer",
    duration: "June 2022 – March 2023",
    location: "Hyderabad, Telangana",
    description: [
      "Collaborated with cross-functional teams to create robust, scalable applications utilizing the full MERN stack for end-to-end development",
      "Developed responsive and reusable UI components, improving user experience and reducing code redundancy",
      "Debugged complex scenarios across the entire application, fixing defects and bugs with precision",
      "Collaborated closely with QA and business teams to understand requirements and resolve issues effectively",
    ],
    skills: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JavaScript",
      "Bootstrap",
      "Git",
    ],
  },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "Radian Title Genius",
    website_link: "https://orders.mytitlegenius.com/",
    description:
      "A cutting-edge enterprise web platform designed for seamless property management and full web accessibility, featuring advanced endorsement templates and robust compliance.",
    tags: ["Next.js", "React", "Redux", "TypeScript", "Accessibility"],
    category: "enterprise",
    highlights: [
      "Achieved 100% WCAG compliance",
      "Implemented comprehensive accessibility features",
      "Complex endorsement template system",
      "Production-ready scalable architecture",
    ],
  },
  {
    id: "2",
    title: "TruScholar Learner Module",
    website_link: "https://www.truscholar.io/en-gb/",
    description:
      "A secure, modern credential management solution enabling users to request and receive transcripts with real-time communication between users and universities.",
    tags: ["React", "Node.js", "MongoDB", "Express", "Real-time API"],
    category: "fintech",
    highlights: [
      "Secure transcript handling",
      "Real-time user-university communication",
      "Optimized database queries",
      "Role-based access control",
    ],
  },
  {
    id: "3",
    title: "JD Store",
    website_link: "https://jd-store-frontend.vercel.app/",
    description:
      "A full-featured e-commerce platform offering seamless product management, intuitive shopping cart, and secure payment integration for a modern online shopping experience.",
    tags: ["MERN Stack", "Stripe API", "Redux", "Responsive Design"],
    category: "ecommerce",
    highlights: [
      "Secure payment processing",
      "Inventory management system",
      "Multi-user authentication",
      "Real-time stock updates",
    ],
  },
  {
    id: "4",
    title: "Project Management Dashboard",
    website_link: "https://www.prodapt.com/",
    description:
      "A collaborative project management solution featuring real-time updates, advanced task tracking, and seamless team communication for enhanced productivity.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Real-time"],
    category: "productivity",
    highlights: [
      "Real-time collaboration",
      "Advanced filtering and search",
      "Team management",
      "Activity tracking",
    ],
  },
];

export const education: Education[] = [
  {
    id: "1",
    institution: "Swami Ramanand Teerth Marathwada University",
    degree: "Bachelor of Commerce (B.Com)",
    duration: "2016 – 2019",
    location: "Nanded, Maharashtra",
    description:
      "Focused on commerce fundamentals with strong analytical skills development",
  },
  {
    id: "2",
    institution: "Pickupbiz Training Center",
    degree: "Full Stack Web Development Certification",
    duration: "2021 – 2022",
    location: "Online",
    description:
      "Completed an intensive program in MERN stack and modern web development, mastering industry best practices and hands-on project delivery.",
  },
];

export const certifications: Certification[] = [
  {
    id: "1",
    title: "Web Accessibility (WCAG 2.1)",
    issuer: "Self-Learning",
    date: "2025",
    description: "Advanced accessibility compliance and ARIA implementation",
  },
  {
    id: "2",
    title: "Advanced React Patterns",
    issuer: "Self-Learning",
    date: "2024",
    description: "Advanced React hooks, performance optimization, and architecture",
  },
  {
    id: "3",
    title: "TypeScript Mastery",
    issuer: "Self-Learning",
    date: "2023",
    description: "Advanced TypeScript types, generics, and utility types",
  },
];

export const socialLinks = {
  github: "https://github.com/mohammedrizwan6477",
  linkedin: "https://linkedin.com/in/mohammedrizwan6477",
  email: "mohammedrizwan6477@gmail.com",
  phone: "+91 9960556477",
  whatsapp: "https://wa.me/919960556477",
};

export const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "GitHub", href: "#github-activity" },
  { label: "Connect", href: "#connect" },
  { label: "Contact", href: "#contact" },
];
