# Mohammed Rizwan — Portfolio

> Personal developer portfolio for **Mohammed Rizwan**, Senior Software Engineer specializing in React, Next.js, Node.js, and modern full-stack web development.

🌐 **Live Site:** [http://localhost:3000](http://localhost:3000) (dev) · Deployable on Vercel

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Sections](#sections)
- [Contact Form (EmailJS)](#contact-form-emailjs)
- [Deployment](#deployment)

---

## Overview

A fully responsive, single-page portfolio website built with **Next.js 16** and **React 19**. It showcases professional experience, skills, projects, education, and a working contact form powered by EmailJS.

Key highlights:
- Dark / Light mode toggle with system preference detection and `localStorage` persistence
- Smooth scroll-based animations using **Framer Motion**
- Fully accessible — keyboard navigable, semantic HTML, WCAG-compliant focus management
- Scroll progress indicator in the header
- Animated typewriter effect in the hero section
- EmailJS-powered contact form with client-side validation and toast notifications

---

## Features

| Feature | Details |
|---|---|
| 🌗 Dark / Light Mode | Persisted in `localStorage`, respects OS preference |
| ✍️ Typewriter Effect | Cycles through role titles in the hero section |
| 🎞️ Scroll Animations | Entry animations triggered by Intersection Observer via `useInView` hook |
| 📬 Contact Form | EmailJS integration — no backend required |
| 🔔 Toast Notifications | Success / error feedback via `react-hot-toast` |
| 📱 Fully Responsive | Mobile-first layout across all sections |
| ♿ Accessible | ARIA labels, focus-visible styles, semantic HTML |
| 📊 Scroll Progress Bar | Gradient progress bar in the sticky header |
| 🗂️ Project Filtering | Filter projects by category with animated transitions |
| 🖼️ Profile Photo | Spinning gradient ring avatar in the hero section |

---

## Tech Stack

### Core
| Package | Version | Purpose |
|---|---|---|
| `next` | 16.2.5 | Framework (App Router) |
| `react` | 19.2.4 | UI library |
| `react-dom` | 19.2.4 | DOM rendering |
| `typescript` | ^5 | Type safety |

### Styling & Animation
| Package | Version | Purpose |
|---|---|---|
| `tailwindcss` | ^4 | Utility-first CSS |
| `framer-motion` | ^12 | Animations & transitions |
| `lucide-react` | ^1.14 | Icon library |

### Forms & Notifications
| Package | Version | Purpose |
|---|---|---|
| `@emailjs/browser` | ^4.4.1 | Client-side email sending |
| `react-hot-toast` | ^2.6.0 | Toast notifications |

### Utilities
| Package | Version | Purpose |
|---|---|---|
| `clsx` | ^2.1.1 | Conditional class names |
| `tailwind-merge` | ^3.5.0 | Merge Tailwind classes safely |

### AI Tools & AI-Assisted Development

> I actively leverage AI-assisted development tools to improve engineering productivity, accelerate problem-solving, optimize workflows, and stay updated with modern software development practices.

| Tool | Purpose |
|---|---|
| **GitHub Copilot** | AI pair-programmer — inline code completions, boilerplate generation, and refactoring suggestions directly in VS Code |
| **ChatGPT (OpenAI)** | Architecture decisions, debugging complex issues, writing documentation, and researching best practices |
| **Claude (Anthropic)** | Code review assistance, explaining unfamiliar codebases, generating test cases, and iterative problem-solving |

These tools are used as **productivity multipliers** — not replacements for engineering judgment. All AI-generated output is reviewed, tested, and refined before being committed.

---

## Project Structure

```
portfolio/
├── public/
│   └── Photo-Copy-Passport-Size.png   # Profile photo used in hero section
│
├── src/
│   ├── app/
│   │   ├── globals.css                # Global styles, CSS variables, animations
│   │   ├── layout.tsx                 # Root layout — metadata, fonts, providers
│   │   └── page.tsx                   # Home page — renders all sections
│   │
│   ├── components/
│   │   ├── Header.tsx                 # Sticky nav with scroll progress bar & theme toggle
│   │   ├── Footer.tsx                 # Footer with quick links, social icons, stats
│   │   ├── index.ts                   # Barrel export for all components
│   │   │
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx        # Animated hero with typewriter, profile photo, CTA buttons
│   │   │   ├── AboutSection.tsx       # Bio, highlights grid, stats badges
│   │   │   ├── SkillsSection.tsx      # Animated skill bars grouped by category
│   │   │   ├── ExperienceSection.tsx  # Timeline of professional experience
│   │   │   ├── ProjectsSection.tsx    # Filterable projects grid
│   │   │   ├── EducationSection.tsx   # Education & certifications
│   │   │   └── ContactSection.tsx     # Contact form + social links
│   │   │
│   │   └── ui/
│   │       ├── Button.tsx             # Multi-variant button component
│   │       ├── Badge.tsx              # Multi-variant badge/pill component
│   │       ├── Card.tsx               # Glassmorphism card with optional header/body/footer
│   │       ├── Section.tsx            # Section wrapper with optional title/subtitle (forwardRef)
│   │       ├── Toaster.tsx            # Client-side react-hot-toast wrapper
│   │       └── index.ts               # Barrel export for UI components
│   │
│   ├── context/
│   │   └── ThemeContext.tsx           # React context providing theme state to the whole app
│   │
│   ├── data/
│   │   └── portfolio.ts               # All portfolio content: skills, experience, projects, education, certifications, social links, navigation
│   │
│   ├── hooks/
│   │   └── index.ts                   # Custom hooks: useScrollProgress, useTheme, useInView
│   │
│   ├── types/
│   │   └── index.ts                   # TypeScript interfaces: Skill, Experience, Project, Education, Certification
│   │
│   └── utils/
│       └── helpers.ts                 # Utility functions: cn(), downloadResume(), scrollToSection()
│
├── .env                               # Environment variables (EmailJS keys)
├── .env.local.example                 # Template for environment variables
├── next.config.ts                     # Next.js configuration
├── tsconfig.json                      # TypeScript configuration
├── postcss.config.mjs                 # PostCSS / Tailwind config
└── eslint.config.mjs                  # ESLint configuration
```

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** (or yarn / pnpm)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/mohammedrizwan6477/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.local.example .env.local
# Then fill in your EmailJS credentials (see Environment Variables section below)

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

The contact form uses [EmailJS](https://www.emailjs.com/) to send emails directly from the browser — **no backend or server required**.

Create a `.env.local` file in the root of the project (or copy `.env.local.example`):

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_USER_ID=your_public_key
```

### How to get these values:
1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Create an **Email Service** → copy the **Service ID**
3. Create an **Email Template** → copy the **Template ID**
   - Template variables used: `{{name}}`, `{{email}}`, `{{title}}`, `{{message}}`
4. Go to **Account → API Keys** → copy your **Public Key** (User ID)

> ⚠️ All variables are prefixed with `NEXT_PUBLIC_` so they are available in the browser bundle. Do **not** put sensitive server-side secrets here.

---

## Available Scripts

```bash
# Start the development server with hot reload
npm run dev

# Create an optimised production build
npm run build

# Start the production server (requires build first)
npm start

# Run ESLint across the project
npm run lint
```

---

## Sections

### 🏠 Hero
- Full-screen section with animated background blobs
- Spinning gradient avatar with profile photo
- Typewriter effect cycling through role titles: Senior Software Engineer, Full Stack Developer, React Specialist, Innovation Enthusiast
- CTA buttons: **Hire Me**, **Download Resume**, **View Projects**
- Floating technology labels (React, Next.js, TypeScript, Node.js, MongoDB)
- Animated scroll-down indicator

### 👤 About
- Personal bio paragraph
- Passion list
- Stats badges (Years of Experience, Projects Delivered, Technologies)
- Highlights grid: Full Stack Expertise, Performance Driven, Accessibility First, Team Collaborator

### 🛠️ Skills & Expertise
Skills are grouped into three categories with animated progress bars:
- **Frontend**: React.js, Next.js, TypeScript, Tailwind CSS, Redux, Framer Motion, Material UI, CSS3/HTML5, Responsive Design, JavaScript ES6+
- **Backend**: Node.js, Express.js, NestJS, MongoDB, PostgreSQL, GraphQL, Prisma ORM, REST APIs, JWT Authentication
- **Tools**: Git/GitHub, GitLab, Postman, Docker, JIRA, VS Code, ARC Toolkit/WCAG

### 💼 Professional Experience
Timeline of work history:
1. **Senior Software Engineer** @ Vassu Tech Services Pvt Ltd (March 2025 – Present)  
   Client: Radian Title Genius · Hyderabad, Telangana  
   Tech: Next.js, React.js, Redux, Node.js, Express.js, NestJS, GraphQL, Prisma, PostgreSQL, Accessibility, TypeScript

2. **Full Stack Developer (MERN Stack)** @ TruScholar – Asset Chain Intelligence Pvt Ltd (Sep 2023 – Feb 2025)  
   Amravati, Maharashtra  
   Tech: React.js, Redux, Node.js, Express.js, MongoDB, REST APIs, TypeScript, Material-UI, Tailwind CSS

3. **Software Engineer** @ Prodapt Solutions Pvt Ltd (Jun 2022 – Mar 2023)  
   Hyderabad, Telangana  
   Tech: React.js, Node.js, Express.js, MongoDB, JavaScript, Bootstrap, Git

### 🚀 Featured Projects
Filterable by category (All / Enterprise / Fintech / Ecommerce / Productivity):

| Project | Category | Tech |
|---|---|---|
| Radian Title Genius | Enterprise | Next.js, React, Redux, TypeScript, Accessibility |
| TruScholar Learner Module | Fintech | React, Node.js, MongoDB, Express, Real-time API |
| Full Stack E-Commerce Application | Ecommerce | MERN Stack, Stripe API, Redux, Responsive Design |
| Project Management Dashboard | Productivity | Next.js, Socket.io, PostgreSQL, Real-time |

### 🎓 Education & Certifications
**Education:**
- Bachelor of Commerce (B.Com) — Swami Ramanand Teerth Marathwada University, Nanded (2016–2019)
- Full Stack Web Development Certification — Pickupbiz Training Center (2021–2022)

**Certifications:**
- Web Accessibility (WCAG 2.1) — 2025
- Advanced React Patterns — 2024
- TypeScript Mastery — 2023

### 📬 Contact
- Working contact form (EmailJS)
- Direct email link
- Phone & WhatsApp links
- Location: Maharashtra, India
- Social icons: GitHub, LinkedIn, Email, Phone, WhatsApp

---

## Contact Form (EmailJS)

The form collects: **Name**, **Email**, **Subject**, **Message**.

Client-side validation rules:
- Name: required, max 100 characters
- Email: required, valid email format
- Subject: required, max 200 characters
- Message: required, max 2000 characters

On success or failure, a toast notification appears at the top of the page.

---

## Deployment

### Deploy on Vercel (Recommended)

1. Push the project to GitHub
2. Go to [vercel.com](https://vercel.com/) and import the repository
3. Add the environment variables under **Project Settings → Environment Variables**:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_USER_ID`
4. Click **Deploy**

### Deploy on Other Platforms

```bash
# Build the production bundle
npm run build

# Start the production server
npm start
```

The app can also be exported as a static site or deployed to any Node.js hosting provider (Railway, Render, Fly.io, etc.).

---

## Author

**Mohammed Rizwan**  
Senior Software Engineer  
📧 [mohammedrizwan6477@gmail.com](mailto:mohammedrizwan6477@gmail.com)  
🔗 [linkedin.com/in/mohammedrizwan6477](https://linkedin.com/in/mohammedrizwan6477)  
🐙 [github.com/mohammedrizwan6477](https://github.com/mohammedrizwan6477)  
📱 [+91 9960556477](tel:+919960556477)  
💬 [WhatsApp](https://wa.me/919960556477)

---

*Built with ❤️ using Next.js, React, Tailwind CSS, and Framer Motion.*
