"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks";
import { Section, Card, CardBody } from "@/components/ui";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Trophy, Rocket, Users, Star, Zap, Shield, Award } from "lucide-react";

const metrics = [
  {
    icon: Rocket,
    value: 5,
    suffix: "+",
    label: "Years Experience",
    sublabel: "Professional engineering",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Trophy,
    value: 2,
    suffix: "+",
    label: "Companies",
    sublabel: "Enterprise & fintech",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: Zap,
    value: 40,
    suffix: "%",
    label: "Performance Gains",
    sublabel: "Average improvement",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Star,
    value: 2,
    suffix: "",
    label: "Star Awards",
    sublabel: "Exceptional contributions",
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-emerald-500/10",
  },
];

const achievements = [
  { text: "Integrated OpenAI API for AI-assisted transaction risk summaries, reducing analyst write-up time by 35%", icon: "🤖" },
  { text: "Built RAG pipeline using Node.js and MongoDB Vector Search, cutting retrieval time by 40%", icon: "⚡" },
  { text: "Engineered enterprise applications supporting 500+ daily users in mission-critical financial environments", icon: "🏢" },
  { text: "Architected reusable component libraries reducing page load time from 4.0s to 2.0s", icon: "⚙️" },
  { text: "Awarded Star Awards in 2023 and 2024 for outstanding performance and exceptional contributions", icon: "🏆" },
];

export function MetricsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <Section id="metrics" title="By The Numbers" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="space-y-10"
      >
        {/* Section intro */}
        <motion.p variants={itemVariants} className="text-center text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          Real numbers from real projects. These aren&apos;t estimates—they&apos;re results.
        </motion.p>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card hover glassmorphism className="h-full text-center group">
                  <CardBody className="space-y-2 py-5">
                    <div className={`w-12 h-12 rounded-xl ${metric.bgColor} flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-blue-500" />
                    </div>
                    <p className={`text-3xl sm:text-4xl font-black bg-gradient-to-br ${metric.color} bg-clip-text text-transparent`}>
                      <AnimatedCounter
                        target={metric.value}
                        suffix={metric.suffix}
                        isInView={isInView}
                        delay={index * 0.1}
                      />
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{metric.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{metric.sublabel}</p>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}

        </div>

        {/* Key achievements */}
        <motion.div variants={itemVariants}>
          <Card glassmorphism>
            <CardBody>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                Key Achievements
              </h3>
              <div className="space-y-3">
                {achievements.map((a, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-lg bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-blue-500/30 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <span className="text-xl flex-shrink-0">{a.icon}</span>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{a.text}</p>
                  </motion.div>
                ))}
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </motion.div>
    </Section>
  );
}
