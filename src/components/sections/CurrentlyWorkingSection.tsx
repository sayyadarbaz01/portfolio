"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks";
import { Section, Card, CardBody } from "@/components/ui";
import { Sparkles, Target, TrendingUp, Zap } from "lucide-react";

const explorations = [
  {
    title: "AI-Assisted Development Workflows",
    description: "Integrating LLMs into daily dev loops for code generation, review, and debugging",
    progress: 85,
    icon: "🤖",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
  },
  {
    title: "Advanced Next.js Architecture",
    description: "Server Components, Streaming, Parallel Routes & advanced caching strategies",
    progress: 90,
    icon: "⚡",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    title: "Accessibility-First Design Systems",
    description: "Building component libraries with WCAG 2.2 compliance baked in from day one",
    progress: 88,
    icon: "♿",
    color: "from-green-500 to-teal-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
  },
  {
    title: "Scalable Frontend Performance",
    description: "Core Web Vitals optimization, lazy loading strategies, and bundle analysis",
    progress: 82,
    icon: "🚀",
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
  },
  {
    title: "Real-time Systems with WebSockets",
    description: "Building collaborative features with Socket.io and event-driven architecture",
    progress: 70,
    icon: "🔌",
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
  },
  {
    title: "Full-Stack AI Integrations",
    description: "Connecting OpenAI, Anthropic APIs into production-grade web applications",
    progress: 75,
    icon: "🧠",
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/20",
  },
];

// const goals2026 = [
//   { text: "Lead frontend architecture for an AI-powered SaaS", icon: "🎯" },
//   { text: "Build and open-source an accessibility component library", icon: "♿" },
//   { text: "Mentor 5+ junior developers in MERN stack", icon: "👨‍🏫" },
//   { text: "Publish 10+ technical articles on React & Next.js", icon: "✍️" },
//   { text: "Achieve AWS Cloud Practitioner certification", icon: "☁️" },
// ];

export function CurrentlyWorkingSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <Section id="currently-working" title="Currently Exploring" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="space-y-10"
      >
        {/* Section intro */}
        <motion.div variants={itemVariants} className="text-left max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-400 text-xs font-mono font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Active learning &amp; growth areas
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            I believe in continuous growth. Here&apos;s what I&apos;m actively leveling up right now.
          </p>
        </motion.div>

        {/* Exploration cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          variants={containerVariants}
        >
          {explorations.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm dark:shadow-none hover:border-slate-400 dark:hover:border-slate-700 transition-colors h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${item.bgColor} border ${item.borderColor} flex items-center justify-center text-xl`}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm leading-snug mb-1 font-sans">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between items-center mb-1.5 font-mono text-xs">
                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-sky-600 dark:text-sky-400" /> Proficiency
                    </span>
                    <span className={`font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                      {item.progress}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${item.progress}%` } : { width: 0 }}
                      transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Status banner */}
        <motion.div variants={itemVariants}>
          <div className="flex flex-wrap gap-3 justify-start font-mono text-xs">
            {[
              { label: "🟢 Available for Full-Time Roles", color: "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400" },
              { label: "🟡 Open to Architecture Consulting", color: "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400" },
              { label: "🤝 Open to Tech Collaborations", color: "bg-sky-500/10 border-sky-500/30 text-sky-700 dark:text-sky-400" },
            ].map((status, i) => (
              <span
                key={i}
                className={`inline-flex items-center px-3.5 py-1.5 rounded-lg font-semibold border ${status.color}`}
              >
                {status.label}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}

