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
        className="space-y-12"
      >
        {/* Section intro */}
        <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 animate-pulse" />
            Active learning &amp; growth areas
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
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
              <Card hover glassmorphism className="h-full group">
                <CardBody className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${item.bgColor} border ${item.borderColor} flex items-center justify-center text-xl`}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> Proficiency
                      </span>
                      <span className={`text-xs font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                        {item.progress}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${item.progress}%` } : { width: 0 }}
                        transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* 2026 Goals */}
        {/* <motion.div variants={itemVariants}>
          <Card glassmorphism className="overflow-hidden">
            <CardBody>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">2026 Goals</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Engineering roadmap &amp; milestones</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {goals2026.map((goal, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-blue-500/30 transition-all group"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    <span className="text-lg flex-shrink-0">{goal.icon}</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300 leading-snug">{goal.text}</span>
                  </motion.div>
                ))}
              </div>
            </CardBody>
          </Card>
        </motion.div> */}

        {/* Status banner */}
        <motion.div variants={itemVariants}>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { label: "🟢 Available for Full-Time Roles", color: "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400" },
              { label: "🟡 Open to Freelance Projects", color: "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400" },
              { label: "🤝 Open to Collaborations", color: "bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-400" },
            ].map((status, i) => (
              <motion.span
                key={i}
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${status.color}`}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
              >
                {status.label}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
