# Arbaz Sayyad — Portfolio

> Personal developer portfolio for **Arbaz Sayyad**, Senior Full Stack & AI Integration Engineer specializing in React, Next.js, Node.js, and modern full-stack web development.

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
- [Contact Form & Feedback](#contact-form--feedback)
- [Database Setup](#database-setup)
- [Deployment](#deployment)

---

## Overview

A fully responsive, single-page portfolio website built with **Next.js 16** and **React 19**. It showcases professional experience, skills, projects, education, and a working contact form powered by EmailJS.

Key highlights:
- Dark / Light mode toggle with system preference detection and `localStorage` persistence
- Smooth scroll-based animations using **Framer Motion**
- Fully accessible — keyboard navigable, semantic HTML, WCAG-compliant focus management
- Scroll progress indicator in the header
- Live GitHub Contribution Graph via `react-github-calendar`
- Interactive Terminal Widget bridging UI with personal context
- Full-stack capability with Prisma ORM and PostgreSQL for database operations
- EmailJS-powered contact form with client-side validation and toast notifications
- **Portfolio Visitor Tracking** — Automatic visit counting with IP-based deduplication
- **Resume Download Counter** — Tracks resume downloads with server actions
- **"Let's Connect" Section** — Premium social/professional networking buttons with gradient effects

---

## Features

| Feature | Details |
|---|---|
| 🌗 Dark / Light Mode | Persisted in `localStorage`, respects OS preference |
| ✨ Animated Background | Floating gradient blobs with smooth animations — responsive design |
| ✍️ Typewriter Effect | Cycles through role titles in the hero section |
| 🎞️ Scroll Animations | Entry animations triggered by Intersection Observer via `useInView` hook |
| 📬 Contact Form | EmailJS integration — no backend required |
| 🔔 Toast Notifications | Success / error feedback via `react-hot-toast` |
| 📱 Fully Responsive | Mobile-first layout across all sections |
| ♿ Accessible | ARIA labels, focus-visible styles, semantic HTML |
| 📊 Scroll Progress Bar | Gradient progress bar in the sticky header |
| 🗂️ Project Filtering | Filter projects by category with animated transitions |
| 🖼️ Profile Photo | Spinning gradient ring avatar in the hero section |
| 📈 Live GitHub Graph | Real-time contribution graph matching native GitHub styling |
| 💬 Live Feedback Hub | Server Actions & Prisma-powered database for visitor testimonials |
| 👨‍💻 Terminal Widget | Interactive, draggable floating terminal providing developer insights |
| 📚 Career Changelog | Professional experience displayed as changelog with left-right timeline (desktop) / stacked (mobile) |
| 👥 Portfolio Visitor Counter | Automatic visit tracking with animated display in footer |
| ⬇️ Resume Download Counter | Track resume downloads with animated counters |
| 🤝 "Let's Connect" Section | Premium social/professional networking buttons with gradient effects and hover animations |

---

## Tech Stack

### Core
| Package | Version | Purpose |
|---|---|---|
| `next` | 16.2.6 | Framework (App Router) |
| `react` | 19.2.4 | UI library |
| `react-dom` | 19.2.4 | DOM rendering |
| `typescript` | ^5 | Type safety |

### Styling & Animation
| Package | Version | Purpose |
|---|---|---|
| `tailwindcss` | ^4 | Utility-first CSS |
| `postcss` | ^8.5.10 | CSS processing (XSS vulnerability fix) |
| `framer-motion` | ^12 | Animations & transitions |
| `lucide-react` | ^1.14 | Icon library |
| `react-github-calendar`| ^5.0.6 | Live GitHub contributions |

### Backend & Database
| Package | Version | Purpose |
|---|---|---|
| `prisma` / `@prisma/client` | ^5.22.0 | Next.js Server Actions & ORM |
| `sqlite` | Native | Local database for live feedback |

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
git clone https://github.com/sayyadarbaz01/portfolio.git
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
- Full-screen section with animated floating gradient blob background
- Smooth, organic floating animations in blue, cyan, and purple colors
- Blobs respond to theme changes (dark/light mode)
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

### 💼 Career Changelog
**NEW DESIGN** — Professional experience displayed as a modern changelog with:
- **Desktop**: Alternating left-right timeline layout with central gradient line for visual storytelling
- **Mobile/Tablet**: Responsive stacked vertical layout for optimal viewing
- Expandable/collapsible cards showing features, tech stack, and client details
- Each entry includes: position, company, duration, location, features list, and technologies used
- Smooth animations and transitions via Framer Motion

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

### 📈 Live GitHub Activity
- Real-time fetch of GitHub contributions using `react-github-calendar`
- Interactive sidebar to filter activity by specific years (matches native GitHub profile UI)
- Fully customized themes to blend seamlessly into light/dark mode

### 💬 Live Feedback Hub
- Replaced static testimonials with an interactive, database-driven review feed
- Powered by **Prisma ORM** & **Next.js Server Actions**
- Visitors can leave their name, role, and message, and it instantly renders via Framer Motion

### 📋 Recruiter Summary
- A scannable quick-facts card optimized for hiring managers
- Interactive **Notice Period** dropdown that updates visually
- Checkmarks indicating immediate availability, roles, and remote work preferences

### 🤝 Let's Connect
**NEW** — Premium social/professional networking section directly below GitHub activity.
- Large, visually highlighted heading: "Let's Build Something Amazing Together"
- Five CTA cards with gradient borders and glowing hover effects:
  - **GitHub** (gray gradient) — View projects and open source contributions
  - **LinkedIn** (blue gradient) — Professional networking
  - **Email** (red gradient) — Direct communication
  - **WhatsApp** (green gradient) — Quick message option
  - **Twitter/X** (blue gradient) — Follow for tech insights
- Each card features:
  - Animated icon with gradient background
  - Description text
  - External link arrow indicator with subtle animation
  - Hover scale and shadow effects
- Bottom CTA buttons to send email or connect on LinkedIn
- Fully responsive on mobile/tablet/desktop
- Framer Motion animations with staggered entrance effects

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

## Contact Form & Feedback

### Contact Form (EmailJS)
The form collects: **Name**, **Email**, **Subject**, **Message**.

Client-side validation rules:
- Name: required, max 100 characters
- Email: required, valid email format
- Subject: required, max 200 characters
- Message: required, max 2000 characters

On success or failure, a toast notification appears at the top of the page.

---

## Database Setup

The portfolio uses **Prisma ORM** with **PostgreSQL** (Neon DB) for data persistence. Models include:

### Database Models

#### 1. Feedback
```prisma
model Feedback {
  id             String   @id @default(cuid())
  name           String
  role           String
  content        String
  date           String
  avatarGradient String
  createdAt      DateTime @default(now())
}
```
Used by the **Live Feedback Hub** for visitor testimonials.

#### 2. Contact
```prisma
model Contact {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String
  message   String
  createdAt DateTime @default(now())
}
```
Used by the **Contact Form** to store form submissions.

#### 3. PortfolioAnalytics (NEW)
```prisma
model PortfolioAnalytics {
  id            String   @id @default(cuid())
  totalVisitors Int      @default(0)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```
Tracks total portfolio visits automatically on homepage load. Displayed in the footer with animated counter.

#### 4. ResumeAnalytics (NEW)
```prisma
model ResumeAnalytics {
  id             String   @id @default(cuid())
  totalDownloads Int      @default(0)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}
```
Tracks resume downloads. Incremented when users click the "Download Resume" button.

### Database Migration Commands

```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# Apply pending migrations
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio for database inspection
npx prisma studio
```

### Server Actions for Analytics

**Location:** `src/actions/feedback.ts`

```typescript
// Track portfolio visit on homepage load
trackPortfolioVisit() → { success: boolean, data: PortfolioAnalytics }

// Get current visitor count
getPortfolioVisitorCount() → { success: boolean, data: number }

// Track resume download
trackResumeDownload() → { success: boolean, data: ResumeAnalytics }

// Get current download count
getResumeDownloadCount() → { success: boolean, data: number }
```

### Implementation Details

**Portfolio Visitor Tracking:**
- Automatic visit tracking on page load via `useTrackVisit()` hook in `page.tsx`
- Prevents duplicate increments using IP-based deduplication (IP stored in request headers)
- Displayed in footer with animated counter using `AnalyticsDisplay` component

**Resume Download Tracking:**
- Triggered when "Download Resume" button is clicked in Hero section
- Server action called via updated `downloadResume()` helper function
- Displayed in footer with animated counter

**Animated Counters:**
- Built with `AnimatedCounter` component using Framer Motion
- Smoothly counts from 0 to target number when component enters viewport
- Supports custom duration, suffix, and prefix options

---

## Security Updates

This portfolio has been updated with the latest security patches to address known vulnerabilities:

| Vulnerability | Package | Version | Fix | Severity |
|---|---|---|---|---|
| Authentication Bypass via Middleware | `next` | 16.2.6 | Upgraded from 16.2.5 | High (CVSS 8.7) |
| XSS in CSS Stringify Output | `postcss` | 8.5.10 | Added explicit dependency | Medium (CVSS 5.3) |

**Details:**
- **CVE-2026-45109** (Next.js): Fixed authentication bypass vulnerability in middleware with Turbopack enabled
- **CVE-2026-41305** (PostCSS): Fixed XSS vulnerability where `</style>` sequences in CSS weren't properly escaped

All dependencies are kept up-to-date and regularly scanned for vulnerabilities using npm audit.

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

**Arbaz Sayyad**  
Senior Full Stack & AI Integration Engineer  
📧 [arbazsayyad015@gmail.com](mailto:arbazsayyad015@gmail.com)  
🔗 [linkedin.com/in/arbazsayyad](https://linkedin.com/in/arbazsayyad)  
🐙 [github.com/sayyadarbaz01](https://github.com/sayyadarbaz01)  
📱 [+91 9518940046](tel:+919518940046)  
💬 [WhatsApp](https://wa.me/919518940046)

---

*Built with ❤️ using Next.js, React, Tailwind CSS, and Framer Motion.*
