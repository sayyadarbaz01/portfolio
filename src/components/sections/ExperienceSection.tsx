"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks";
import { Section, Card, CardBody, Badge } from "@/components/ui";
import { experiences } from "@/data/portfolio";
import { Briefcase } from "lucide-react";

export function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <Section id="experience" title="Professional Experience" ref={ref}>
      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {experiences.map((exp, index) => (
          <motion.div key={exp.id} variants={itemVariants}>
            <Card hover glassmorphism>
              <CardBody className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                        <Briefcase className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {exp.position}
                        </h3>
                        <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
                          {exp.company}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      {exp.duration}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {exp.location}
                    </p>
                  </div>
                </div>

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
                      className="flex items-start gap-3 text-gray-600 dark:text-gray-400"
                    >
                      <span className="text-blue-500 mt-1 flex-shrink-0">
                        ▸
                      </span>
                      <p className="text-sm leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-600 mb-3 uppercase tracking-wider">
                    Technologies Used
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Timeline Connector */}
            {index < experiences.length - 1 && (
              <div className="flex justify-center h-8">
                <div className="w-1 bg-gradient-to-b from-blue-500 to-transparent" />
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
