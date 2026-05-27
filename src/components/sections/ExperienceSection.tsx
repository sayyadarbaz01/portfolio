"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks";
import { Section, Card, CardBody, Badge } from "@/components/ui";
import { experiences } from "@/data/portfolio";
import { ChevronDown, Check } from "lucide-react";

export function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <Section id="experience" title="Career Changelog" ref={ref}>
      {/* Timeline Container */}
      <div className="relative">
        {/* Center line - Desktop only */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-cyan-500 to-transparent transform -translate-x-1/2" />

        <motion.div
          className="space-y-6 lg:space-y-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {experiences.map((exp, index) => {
            const isExpanded = expandedIds.includes(exp.id);
            const isLatest = index === 0;
            const isLeftSide = index % 2 === 0; // Alternate left and right

            return (
              <motion.div key={exp.id} className={`lg:flex ${isLeftSide ? "lg:flex-row" : "lg:flex-row-reverse"} gap-4 lg:gap-8`}>
                {/* Date and Version Section */}
                <div className={`hidden lg:flex lg:w-1/2 ${isLeftSide ? "lg:justify-end lg:pr-4 lg:pr-8" : "lg:justify-start lg:pl-4 lg:pl-8"}`}>
                  <div className="text-right lg:text-left">
                    <p className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
                      {exp.duration}
                    </p>
                  </div>
                </div>

                {/* Card Section */}
                <div className="w-full lg:w-1/2">
                  <Card hover glassmorphism>
                    <CardBody className="space-y-0 !p-3 sm:!p-5">
                      {/* Clickable Header */}
                      <button
                        onClick={() => toggleExpand(exp.id)}
                        className="w-full flex flex-col gap-2 pb-3 sm:pb-4 hover:bg-blue-500/5 dark:hover:bg-blue-500/10 px-2 sm:px-3 py-2 sm:py-3 -mx-2 sm:-mx-3 -my-2 sm:-my-3 rounded-lg transition-all duration-200 text-left"
                      >
                        {/* Title with chevron */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white leading-snug">
                              {exp.position}
                            </h3>
                            <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1">
                              {exp.company}
                            </p>
                          </div>
                          <ChevronDown
                            className={`w-5 h-5 text-blue-600 dark:text-blue-400 transition-transform duration-300 flex-shrink-0 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </div>

                        {/* Location and Duration (Mobile) */}
                        <div className="flex flex-col gap-1">
                          <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-500">
                            📍 {exp.location}
                          </p>
                          <p className="text-[10px] sm:text-xs font-semibold text-gray-600 dark:text-gray-400 lg:hidden">
                            {exp.duration}
                          </p>
                        </div>
                      </button>

                      {/* Expandable Content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-3 pt-3 border-t border-white/10"
                          >
                            {/* Client Info */}
                            {exp.client && (
                              <div className="text-xs text-gray-600 dark:text-gray-400 bg-blue-500/5 dark:bg-blue-500/10 rounded px-2 py-1.5">
                                <strong className="text-gray-700 dark:text-gray-300">
                                  Client:
                                </strong>{" "}
                                {exp.client}
                              </div>
                            )}

                            {/* Features */}
                            <div className="space-y-2">
                              <p className="text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-600 uppercase tracking-wider">
                                ✨ Features
                              </p>
                              <div className="space-y-1.5">
                                {exp.description.map((desc, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
                                  >
                                    <Check className="w-3 h-3 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                    <p className="text-xs leading-snug">{desc}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Tech Stack */}
                            <div className="pt-2 border-t border-white/10">
                              <p className="text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-600 mb-2 uppercase tracking-wider">
                                🛠️ Stack
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {exp.skills.map((skill, idx) => (
                                  <Badge key={idx} variant="secondary">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardBody>
                  </Card>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
}
