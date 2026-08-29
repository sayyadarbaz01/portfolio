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
    <Section id="github-activity" title="GitHub Activity & Open Source" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="space-y-8 text-left"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
          <p className="text-slate-600 dark:text-slate-300 text-sm font-mono font-medium">
            Empirical commit trajectory and open-source contributions.
          </p>
        </motion.div>

        {/* Contribution heatmap */}
        <motion.div variants={itemVariants}>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-none space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm font-sans">Contribution Graph</h4>
                <p className="text-xs font-mono text-slate-600 dark:text-slate-300 font-medium">Live Telemetry from GitHub</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="overflow-x-auto pb-2 flex-grow w-full">
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
                    <div className="animate-pulse flex gap-1 h-[120px] w-[800px] bg-slate-100 dark:bg-slate-950 rounded-lg" />
                  )}
                </div>
              </div>

              {/* Year Selector */}
              <div className="flex md:flex-col gap-1.5 overflow-x-auto md:w-28 shrink-0 font-mono text-xs">
                <button
                  onClick={() => setSelectedYear("last")}
                  className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors text-left font-semibold ${selectedYear === "last"
                    ? "bg-sky-600 text-white"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-950"
                    }`}
                >
                  Last Year
                </button>
                {years.map(y => (
                  <button
                    key={y}
                    onClick={() => setSelectedYear(y)}
                    className={`px-3 py-1.5 rounded-md transition-colors text-left font-semibold ${selectedYear === y
                      ? "bg-sky-600 text-white"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-950"
                      }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pinned repos */}
        <motion.div variants={itemVariants}>
          <h4 className="text-sm font-mono font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500" /> Pinned Technical Repositories
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentRepos.map((repo, i) => (
              <motion.a
                key={i}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
                whileHover={{ y: -2 }}
              >
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm dark:shadow-none hover:border-slate-400 dark:hover:border-slate-700 transition-colors h-full flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h5 className="font-mono font-bold text-sky-600 dark:text-sky-400 text-sm group-hover:underline">
                        {repo.name}
                      </h5>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                      {repo.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-[11px] font-mono text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-slate-800 font-medium">
                    <div className="flex items-center gap-1.5 font-medium">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.langColor }} />
                      {repo.language}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-500" /> {repo.stars}
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="w-3 h-3 text-sky-500" /> {repo.forks}
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* GitHub Profile CTA */}
        <motion.div variants={itemVariants} className="pt-2">
          <a
            href="https://github.com/sayyadarbaz01"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 dark:bg-slate-100 text-slate-100 dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 transition-all font-mono font-semibold text-xs shadow-sm"
          >
            <Code2 className="w-4 h-4" />
            <span>View GitHub Repository Portfolio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </motion.div>
    </Section>
  );
}

