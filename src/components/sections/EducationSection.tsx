"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks";
import { Section, Card, CardBody, Badge } from "@/components/ui";
import { education, certifications } from "@/data/portfolio";
import { GraduationCap, Award } from "lucide-react";

export function EducationSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
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
    <Section id="education" title="Education & Certifications" ref={ref}>
      <motion.div
        className="space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Education */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-blue-500" />
            Education
          </h3>
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {education.map((edu) => (
              <motion.div key={edu.id} variants={itemVariants}>
                <Card hover glassmorphism>
                  <CardBody className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                          {edu.degree}
                        </h4>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold">
                          {edu.institution}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        {edu.duration}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {edu.location}
                    </p>
                    {edu.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                        {edu.description}
                      </p>
                    )}
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Certifications */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-purple-500" />
            Certifications & Learning
          </h3>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {certifications.map((cert) => (
              <motion.div key={cert.id} variants={itemVariants}>
                <Card hover glassmorphism>
                  <CardBody className="space-y-2">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                        {cert.title}
                      </h4>
                      <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold">
                        {cert.issuer}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {cert.date}
                    </p>
                    {cert.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        {cert.description}
                      </p>
                    )}
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 hover:text-blue-600 mt-2 inline-block"
                      >
                        View Certificate →
                      </a>
                    )}
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
