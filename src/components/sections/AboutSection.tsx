"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks";
import { Section, Card, CardBody } from "@/components/ui";
import { Code2, Zap, Target, Users, Bot } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Full Stack Expertise",
    description:
      "3+ years building scalable applications with MERN stack and modern web technologies",
  },
  {
    icon: Zap,
    title: "Performance Driven",
    description:
      "Optimizing applications for speed, efficiency, and seamless user experiences",
  },
  {
    icon: Target,
    title: "Accessibility First",
    description:
      "Building inclusive web applications compliant with WCAG and ADA standards",
  },
  {
    icon: Users,
    title: "Team Collaborator",
    description:
      "Working effectively with cross-functional teams using Agile methodologies",
  },
  {
    icon: Bot,
    title: "AI-Assisted Development",
    description:
      "Leveraging ChatGPT, Claude, and GitHub Copilot to boost productivity, accelerate problem-solving, and optimize engineering workflows",
  },
];

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <Section id="about" title="About Me" ref={ref}>
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 items-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Text Content */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white">
              Senior Software Engineer
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base sm:text-lg">
              I'm a passionate developer with a proven track record of building
              scalable, accessible, and user-centric web applications. With 3+
              years of professional experience, I've successfully delivered
              enterprise-grade solutions that impact millions of users.
            </p>
          </div>

          <div>
            <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white">
              What I'm Passionate About
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              <li className="flex items-start space-x-3">
                <span className="text-blue-500 mt-1">→</span>
                <span>
                  Creating modern, interactive applications with exceptional UX
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-500 mt-1">→</span>
                <span>
                  Ensuring web accessibility and compliance with WCAG standards
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-500 mt-1">→</span>
                <span>Optimizing performance and building robust backends</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-500 mt-1">→</span>
                <span>
                  Collaborating with teams and mentoring fellow developers
                </span>
              </li>
            </ul>
          </div>

          <div className="pt-4 sm:pt-6 flex gap-3 sm:gap-4 flex-wrap">
            <div className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-blue-500/10 dark:bg-blue-500/5 border border-blue-500/20">
              <p className="font-semibold text-blue-600 dark:text-blue-400 text-sm sm:text-base">
                3+ Years
              </p>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                of Experience
              </p>
            </div>
            <div className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-purple-500/10 dark:bg-purple-500/5 border border-purple-500/20">
              <p className="font-semibold text-purple-600 dark:text-purple-400 text-sm sm:text-base">
                7+
              </p>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Projects Delivered
              </p>
            </div>
            <div className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/5 border border-cyan-500/20">
              <p className="font-semibold text-cyan-600 dark:text-cyan-400 text-sm sm:text-base">
                15+
              </p>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Technologies
              </p>
            </div>
          </div>
        </motion.div>

        {/* Highlights Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card hover>
                <CardBody className="space-y-2 sm:space-y-3 !p-4 sm:!p-6">
                    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                      {highlight.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {highlight.description}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </Section>
  );
}
