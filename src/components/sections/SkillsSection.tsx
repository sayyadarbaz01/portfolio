"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks";
import { Section, Card, CardBody, Badge } from "@/components/ui";
import { skills } from "@/data/portfolio";

export function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  const skillsByCategory = {
    frontend: skills.filter((s) => s.category === "frontend"),
    backend: skills.filter((s) => s.category === "backend"),
    tools: skills.filter((s) => s.category === "tools"),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const SkillCard = ({
    skill,
    index,
  }: {
    skill: (typeof skills)[0];
    index: number;
  }) => (
    <motion.div variants={itemVariants} key={index} className="h-full">
      <Card hover glassmorphism className="h-full">
        <CardBody className="p-4 flex flex-col justify-center h-full">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
              {skill.name}
            </h4>
            <span className="text-xs font-bold text-blue-500 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
              {skill.level}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
              initial={{ width: 0 }}
              animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
              transition={{ duration: 1.2, delay: index * 0.05 }}
            />
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );

  return (
    <Section id="skills" title="Skills & Expertise" ref={ref}>
      <motion.div
        className="space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Frontend Skills */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-6 bg-blue-500 rounded-full inline-block" />
            Frontend
          </h3>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {skillsByCategory.frontend.map((skill, index) => (
              <SkillCard key={index} skill={skill} index={index} />
            ))}
          </motion.div>
        </motion.div>

        {/* Backend Skills */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-6 bg-purple-500 rounded-full inline-block" />
            Backend
          </h3>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {skillsByCategory.backend.map((skill, index) => (
              <SkillCard
                key={index}
                skill={skill}
                index={index + skillsByCategory.frontend.length}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Tools & Workflow */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-6 bg-cyan-500 rounded-full inline-block" />
            Tools & Workflow
          </h3>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {skillsByCategory.tools.map((skill, index) => (
              <SkillCard
                key={index}
                skill={skill}
                index={
                  index +
                  skillsByCategory.frontend.length +
                  skillsByCategory.backend.length
                }
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
