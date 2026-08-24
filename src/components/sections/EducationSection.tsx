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
        className="space-y-12 text-left"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Education */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-slate-100 flex items-center gap-2 font-mono">
            <GraduationCap className="w-5 h-5 text-sky-600 dark:text-sky-400" />
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
                <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-2 shadow-sm dark:shadow-none hover:border-slate-400 dark:hover:border-slate-700 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                        {edu.degree}
                      </h4>
                      <p className="text-sm font-mono text-sky-600 dark:text-sky-400 font-semibold">
                        {edu.institution}
                      </p>
                    </div>
                    <span className="text-xs font-mono font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-950 px-3 py-1 rounded-md border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
                      {edu.duration}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {edu.location}
                  </p>
                  {edu.description && (
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Certifications */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-slate-100 flex items-center gap-2 font-mono">
            <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Awards & Engineering Recognitions
          </h3>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {certifications.map((cert) => (
              <motion.div key={cert.id} variants={itemVariants}>
                <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-2.5 shadow-sm dark:shadow-none hover:border-slate-400 dark:hover:border-slate-700 transition-colors h-full flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 font-sans">
                        {cert.title}
                      </h4>
                      <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20 font-semibold">
                        {cert.date}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-sky-600 dark:text-sky-400 font-semibold">
                      {cert.issuer}
                    </p>
                    {cert.description && (
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                        {cert.description}
                      </p>
                    )}
                  </div>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-sky-600 dark:text-sky-400 hover:underline mt-2 inline-block font-semibold"
                    >
                      View Certificate →
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </Section>
  );
}

