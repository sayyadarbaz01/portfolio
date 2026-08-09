"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, Card, CardBody } from "@/components/ui";
import { useInView } from "@/hooks";
import { Activity, Star, GitFork, Code2, ExternalLink } from "lucide-react";
import dynamic from "next/dynamic";
import { useTheme } from "@/context/ThemeContext";

const GitHubCalendar = dynamic(() => import("react-github-calendar").then((mod) => mod.GitHubCalendar), {
  ssr: false,
});

// GitHub stats displayed via github-readme-stats style
const languages = [
  { name: "TypeScript", percentage: 42, color: "#3178c6" },
  { name: "JavaScript", percentage: 28, color: "#f7df1e" },
  { name: "CSS", percentage: 16, color: "#1572b6" },
  { name: "HTML", percentage: 10, color: "#e34f26" },
  { name: "Other", percentage: 4, color: "#6b7280" },
];

// const githubStats = [
//   { label: "Public Repos", value: "15+", icon: "📦" },
//   { label: "Total Stars", value: "40+", icon: "⭐" },
//   { label: "Contributions (2025)", value: "500+", icon: "🔥" },
//   { label: "Pull Requests", value: "120+", icon: "🔀" },
// ];

const recentRepos = [
  {
    name: "portfolio",
    description: "Personal developer portfolio built with Next.js, TypeScript & Framer Motion",
    stars: 5,
    forks: 2,
    language: "TypeScript",
    langColor: "#3178c6",
    url: "https://github.com/sayyadarbaz01",
  },
  {
    name: "jd-store",
    description: "Full-featured MERN e-commerce platform with Stripe payments & Redux state management",
    stars: 8,
    forks: 3,
    language: "JavaScript",
    langColor: "#f7df1e",
    url: "https://github.com/sayyadarbaz01",
  },
  {
    name: "mern-auth-system",
    description: "Production-ready authentication system with JWT, refresh tokens & role-based access",
    stars: 12,
    forks: 6,
    language: "TypeScript",
    langColor: "#3178c6",
    url: "https://github.com/sayyadarbaz01",
  },
];


export function GitHubActivitySection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number | "last">(currentYear);

  const years = Array.from({ length: 4 }, (_, i) => currentYear - i);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <Section id="github-activity" title="GitHub Activity" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="space-y-8"
      >
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-3">
          <Activity className="w-5 h-5 text-emerald-500 animate-pulse" />
          <p className="text-gray-500 dark:text-gray-400 text-center">
            Actively coding and contributing to open-source projects
          </p>
        </motion.div>

        {/* Stats row */}
        {/* <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {githubStats.map((stat, i) => (
            <Card key={i} hover glassmorphism>
              <CardBody className="text-center py-4">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <p className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
              </CardBody>
            </Card>
          ))}
        </motion.div> */}

        {/* Contribution heatmap */}
        <motion.div variants={itemVariants}>
          <Card glassmorphism>
            <CardBody>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Contribution Graph</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Live from GitHub</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="overflow-x-auto pb-2 flex-grow">
                  <div className="min-w-max">
                    {mounted ? (
                      <GitHubCalendar
                        username="sayyadarbaz01"
                        year={selectedYear}
                        colorScheme={theme === "dark" ? "dark" : "light"}
                        theme={{
                          light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                          dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                        }}
                        blockSize={11}
                        blockMargin={3}
                        blockRadius={2}
                        fontSize={12}
                        showWeekdayLabels={true}
                      />
                    ) : (
                      <div className="animate-pulse flex gap-1 h-[120px] w-[800px] bg-gray-100 dark:bg-gray-800/50 rounded-lg" />
                    )}
                  </div>
                </div>

                {/* Year Selector */}
                <div className="flex md:flex-col gap-2 overflow-x-auto md:w-28 shrink-0 pb-2 md:pb-0">
                  <button
                    onClick={() => setSelectedYear("last")}
                    className={`px-3 py-2 text-sm rounded-lg whitespace-nowrap transition-colors text-left ${selectedYear === "last"
                      ? "bg-blue-600 text-white font-medium"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                  >
                    Last Year
                  </button>
                  {years.map(y => (
                    <button
                      key={y}
                      onClick={() => setSelectedYear(y)}
                      className={`px-3 py-2 text-sm rounded-lg transition-colors text-left ${selectedYear === y
                        ? "bg-blue-600 text-white font-medium"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        {/* Pinned repos */}
        <motion.div variants={itemVariants}>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400" /> Pinned Repositories
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentRepos.map((repo, i) => (
              <motion.a
                key={i}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
                whileHover={{ y: -4 }}
              >
                <Card hover glassmorphism className="h-full">
                  <CardBody className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h5 className="font-mono font-semibold text-blue-600 dark:text-blue-400 text-sm group-hover:underline">
                        {repo.name}
                      </h5>
                      <ExternalLink className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      {repo.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.langColor }} />
                        {repo.language}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" /> {repo.stars}
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" /> {repo.forks}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* GitHub Profile CTA */}
        <motion.div variants={itemVariants} className="text-center">
          <a
            href="https://github.com/sayyadarbaz01"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 dark:bg-gray-800 text-white hover:bg-gray-800 dark:hover:bg-gray-700 transition-all font-medium text-sm hover:scale-105"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            View Full GitHub Profile
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </motion.div>
    </Section>
  );
}
