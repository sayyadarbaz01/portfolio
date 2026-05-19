"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks";
import { Section, Card, CardBody } from "@/components/ui";
import { downloadResume, scrollToSection } from "@/utils/helpers";
import { socialLinks } from "@/data/portfolio";
import { Check, Download, Mail, ExternalLink, Briefcase, ChevronDown } from "lucide-react";

const summary = [
  { label: "React / Next.js Expert", check: true },
  { label: "Full Stack MERN Developer", check: true },
  { label: "Accessibility (WCAG) Focused", check: true },
  { label: "Enterprise Experience", check: true },
  { label: "AI-Assisted Development", check: true },
  { label: "TypeScript Proficient", check: true },
  { label: "Available for Remote Opportunities", check: true },
  { label: "Production-Ready Code Quality", check: true },
];

const quickFacts = [
  { label: "Experience", value: "3+ Years" },
  { label: "Location", value: "Maharashtra, IN" },
  { label: "Work Mode", value: "Remote / Hybrid" },
  { label: "Notice Period", value: "Immediate" },
  { label: "Employment", value: "Full-Time / Freelance" },
  { label: "Specialization", value: "React + Next.js" },
];

export function RecruiterSummarySection() {
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
    <Section id="recruiter-summary" title="Quick Recruiter Summary" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="space-y-6"
      >
        <motion.p variants={itemVariants} className="text-center text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          Everything you need to know about Mohammed Rizwan, at a glance.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile card */}
          <motion.div variants={itemVariants}>
            <Card glassmorphism className="h-full">
              <CardBody>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                    MR
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Mohammed Rizwan</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">Senior Software Engineer</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Available Now</span>
                    </div>
                  </div>
                </div>

                {/* Summary checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                  {summary.map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ delay: 0.2 + i * 0.07 }}
                    >
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{item.label}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={downloadResume}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
                    aria-label="Download CV"
                  >
                    <Download className="w-4 h-4" />
                    Download CV
                  </button>
                  <a
                    href={`mailto:${socialLinks.email}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Email Me
                  </a>
                  <button
                    onClick={() => scrollToSection("connect")}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-500/30 text-blue-600 dark:text-blue-400 text-sm font-medium hover:bg-blue-500/10 transition-colors"
                    aria-label="Schedule meeting"
                  >
                    <Briefcase className="w-4 h-4" />
                    Schedule Meeting
                  </button>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Quick facts */}
          <motion.div variants={itemVariants}>
            <Card glassmorphism className="h-full">
              <CardBody>
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">Quick Facts</h4>
                <div className="space-y-3 mb-6">
                  {quickFacts.map((fact, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-white/10 last:border-0"
                    >
                      <span className="text-sm text-gray-500 dark:text-gray-400">{fact.label}</span>
                      {fact.label === "Notice Period" ? (
                        <div className="relative flex items-center">
                          <select className="text-sm font-semibold text-gray-900 dark:text-white bg-transparent outline-none cursor-pointer text-right appearance-none hover:text-blue-600 dark:hover:text-blue-400 transition-colors pr-4">
                            <option className="dark:bg-gray-800" value="Immediate">Immediate</option>
                            <option className="dark:bg-gray-800" value="15 Days">15 Days</option>
                            <option className="dark:bg-gray-800" value="30 Days">30 Days</option>
                            <option className="dark:bg-gray-800" value="3 months">3 months</option>
                          </select>
                          <ChevronDown className="w-3 h-3 absolute right-0 text-gray-500 pointer-events-none" />
                        </div>
                      ) : (
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{fact.value}</span>
                      )}
                    </div>
                  ))}
                </div>

                <h4 className="font-bold text-gray-900 dark:text-white mb-3">Connect</h4>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/10 text-blue-600 dark:text-blue-400 text-xs font-medium hover:bg-blue-600/20 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    LinkedIn
                  </a>
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    GitHub
                  </a>
                  <a
                    href={socialLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    WhatsApp
                  </a>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}
