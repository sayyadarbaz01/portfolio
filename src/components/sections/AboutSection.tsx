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
      "5+ years building scalable applications with React.js, Node.js, Express.js, and MongoDB in financial environments",
  },
  {
    icon: Zap,
    title: "Performance Driven",
    description:
      "Delivered 30-40% performance gains through optimization, Docker containerization, and CI/CD implementation",
  },
  {
    icon: Target,
    title: "AI Integration Specialist",
    description:
      "Expert in OpenAI API, RAG, Vector Search, Text Embeddings, and Semantic Search integration in production systems",
  },
  {
    icon: Users,
    title: "Enterprise Collaborator",
    description:
      "Proven track record working with cross-functional teams in Agile environments supporting 500+ daily users",
  },
  {
    icon: Bot,
    title: "FinTech Solutions",
    description:
      "Specialized in building compliance platforms, transaction risk workflows, and enterprise financial systems",
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
              Senior Full Stack & AI Integration Engineer
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base sm:text-lg">
              I&apos;m a senior full stack engineer with 5+ years of experience building scalable enterprise applications using React.js, Node.js, TypeScript, and MongoDB. I specialize in integrating AI technologies—OpenAI API, RAG, Vector Search, Text Embeddings, and Semantic Search—into production systems. Recognized for delivering 30–40% performance improvements, implementing Docker containerization, establishing CI/CD pipelines, and driving results in fast-paced Agile environments within financial technology.
            </p>
          </div>

          <div>
            <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white">
              What I&apos;m Passionate About
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              <li className="flex items-start space-x-3">
                <span className="text-blue-500 mt-1">→</span>
                <span>
                  Building AI-powered applications that solve real business problems
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-500 mt-1">→</span>
                <span>
                  Architecting scalable microservices and enterprise solutions
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-500 mt-1">→</span>
                <span>Optimizing performance and implementing best practices</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-500 mt-1">→</span>
                <span>
                  Collaborating with teams and delivering high-impact solutions
                </span>
              </li>
            </ul>
          </div>

          <div className="pt-4 sm:pt-6 flex gap-3 sm:gap-4 flex-wrap">
            <div className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-blue-500/10 dark:bg-blue-500/5 border border-blue-500/20">
              <p className="font-semibold text-blue-600 dark:text-blue-400 text-sm sm:text-base">
                5+ Years
              </p>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                of Experience
              </p>
            </div>
            <div className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-purple-500/10 dark:bg-purple-500/5 border border-purple-500/20">
              <p className="font-semibold text-purple-600 dark:text-purple-400 text-sm sm:text-base">
                2
              </p>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Companies
              </p>
            </div>
            <div className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/5 border border-cyan-500/20">
              <p className="font-semibold text-cyan-600 dark:text-cyan-400 text-sm sm:text-base">
                20+
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
