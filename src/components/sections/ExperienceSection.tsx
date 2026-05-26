"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks";
import { Section, Card, CardBody, Badge } from "@/components/ui";
import { experiences } from "@/data/portfolio";
import { Briefcase, ChevronDown } from "lucide-react";

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
    <Section id="experience" title="Professional Experience" ref={ref}>
      <motion.div
        className="space-y-6"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {experiences.map((exp, index) => {
          const isExpanded = expandedIds.includes(exp.id);

          return (
            <motion.div key={exp.id}>
              <Card hover glassmorphism>
                <CardBody className="space-y-0 !p-4 sm:!p-6">
                  {/* Clickable Header */}
                  <button
                    onClick={() => toggleExpand(exp.id)}
                    className="w-full flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 pb-4 sm:pb-6 hover:bg-blue-500/5 dark:hover:bg-blue-500/10 px-3 sm:px-4 py-3 sm:py-4 -mx-3 sm:-mx-4 -my-3 sm:-my-4 rounded-lg transition-all duration-200"
                  >
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                        <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                          <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white">
                              {exp.position}
                            </h3>
                            <ChevronDown
                              className={`w-6 h-6 text-blue-600 dark:text-blue-400 font-bold transition-transform duration-300 flex-shrink-0 ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                            />
                          </div>
                          <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-semibold mt-1">
                            {exp.company}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-left sm:text-right ml-10 sm:ml-0 flex-shrink-0">
                      <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400">
                        {exp.duration}
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-500">
                        {exp.location}
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
                        className="space-y-4 pt-4 border-t border-white/10"
                      >
                        {/* Client/Company Info */}
                        {exp.client && (
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>Client:</strong> {exp.client}
                          </div>
                        )}

                        {/* Description */}
                        <div className="space-y-2">
                          {exp.description.map((desc, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 sm:gap-3 text-gray-600 dark:text-gray-400"
                            >
                              <span className="text-blue-500 mt-1 flex-shrink-0">
                                ▸
                              </span>
                              <p className="text-xs sm:text-sm leading-relaxed">{desc}</p>
                            </div>
                          ))}
                        </div>

                        {/* Skills */}
                        <div className="pt-3 sm:pt-4 border-t border-white/10">
                          <p className="text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-600 mb-2 sm:mb-3 uppercase tracking-wider">
                            Technologies Used
                          </p>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
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

              {/* Timeline Connector */}
              {index < experiences.length - 1 && (
                <div className="flex justify-center h-8">
                  <div className="w-1 bg-gradient-to-b from-blue-500 to-transparent" />
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
