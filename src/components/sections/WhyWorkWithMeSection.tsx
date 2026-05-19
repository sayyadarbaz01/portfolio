"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks";
import { Section, Card, CardBody } from "@/components/ui";
import { CheckCircle2, Rocket, Heart, Users, Zap, Shield, Code2, Lightbulb } from "lucide-react";

const reasons = [
  {
    icon: Code2,
    title: "Clean, Scalable Architecture",
    description:
      "I design with maintainability in mind—component patterns, separation of concerns, and future-proof code that teams can extend confidently.",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Shield,
    title: "Accessibility-First Development",
    description:
      "Every component I build meets WCAG 2.1 standards. I use ARC Toolkit, semantic HTML, and ARIA to ensure inclusion for all users.",
    color: "from-green-500 to-teal-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description:
      "From lazy loading to bundle splitting and Core Web Vitals tuning—I deliver applications that score 95+ on Lighthouse consistently.",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: Users,
    title: "Strong Team Collaboration",
    description:
      "I thrive in cross-functional teams, embrace code reviews, and communicate clearly with designers, PMs, and backend engineers.",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Rocket,
    title: "Production-Ready Code Quality",
    description:
      "Enterprise experience means I write code that ships to millions of users—tested, reviewed, and built for reliability at scale.",
    color: "from-red-500 to-rose-500",
    bgColor: "bg-red-500/10",
  },
  {
    icon: Lightbulb,
    title: "AI-Augmented Engineering",
    description:
      "I integrate AI tools like GitHub Copilot, Claude, and ChatGPT into my workflow—shipping faster without sacrificing quality.",
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-500/10",
  },
  {
    icon: Heart,
    title: "User-Centric Product Mindset",
    description:
      "I think beyond pixels—understanding user journeys, business impact, and how technical decisions affect real people.",
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-500/10",
  },
  {
    icon: CheckCircle2,
    title: "Fast Learning Adaptability",
    description:
      "I ramp up quickly on new stacks and domains. My track record across fintech, edtech, and enterprise SaaS proves versatility.",
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-500/10",
  },
];

export function WhyWorkWithMeSection() {
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
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Section id="why-work-with-me" title="Why Work With Me?" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="space-y-8"
      >
        {/* Intro */}
        <motion.p variants={itemVariants} className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          I don&apos;t just write code—I think like a product owner, communicate like a team player,
          and ship like a senior engineer.
        </motion.p>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
        >
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card hover glassmorphism className="h-full group">
                  <CardBody className="space-y-3">
                    <div
                      className={`w-12 h-12 rounded-xl ${reason.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug">
                      {reason.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      {reason.description}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Banner */}
        <motion.div variants={itemVariants}>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 p-8 text-center">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMCAwdi02aC02djZoNnptNiAwaDZ2Nmg2di02aC02ek0zMCAyOHY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
            <div className="relative z-10 space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Ready to Build Something Amazing?
              </h3>
              <p className="text-blue-100 max-w-md mx-auto">
                Let&apos;s combine your vision with my technical expertise to create something users will love.
              </p>
              <div className="flex flex-wrap gap-3 justify-center mt-2">
                {["✔ Full-time Roles", "✔ Freelance Projects", "✔ Technical Consulting", "✔ Remote Friendly"].map((item, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-white/20 text-white text-sm backdrop-blur-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
