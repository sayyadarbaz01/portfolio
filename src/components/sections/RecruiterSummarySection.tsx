"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useInView } from "@/hooks";
import { Section, Card, CardBody } from "@/components/ui";
import { downloadResume } from "@/utils/helpers";
import { socialLinks } from "@/data/portfolio";
import {
  Check,
  Download,
  Mail,
  ExternalLink,
  ChevronDown,
  Sparkles,
} from "lucide-react";

const summary = [
  { label: "React.js / Full Stack Expert" },
  { label: "OpenAI API, RAG & Vector Search" },
  { label: "Node.js / Express.js Backend" },
  { label: "JWT Auth & RBAC Security" },
  { label: "Enterprise BFSI / Compliance Systems" },
  { label: "Performance Optimization & Code Splitting" },
  { label: "Docker, CI/CD & DevOps" },
  { label: "TypeScript-First Architecture" },
];

const quickFacts = [
  { label: "Experience",    value: "5+ Years" },
  { label: "Location",     value: "Pune, India" },
  { label: "Work Mode",    value: "Remote / Hybrid" },
  { label: "Employment",   value: "Full-Time" },
  { label: "Specialization", value: "Full Stack & AI" },
];

// ── Shared variants ────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

// Items use explicit animate so we can pass a custom delay per-index
// (function-form variants are not supported in this version's TS types)
const factRowBase = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};

const linkBase = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

// ── Subtle tilt card on hover ─────────────────────────────────────────────────
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top)  / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RecruiterSummarySection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  return (
    <Section id="recruiter-summary" title="Quick Recruiter Summary" ref={ref}>
      {/* Ambient background orb */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden
      >
        <motion.div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-gradient-to-br from-blue-500/10 via-cyan-400/5 to-transparent blur-3xl"
          animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="space-y-6"
      >
        {/* Subtitle */}
        <motion.p
          variants={cardVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center text-gray-500 dark:text-gray-400 max-w-xl mx-auto"
        >
          Everything you need to know about Arbaz Sayyad, at a glance.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ── Profile card ──────────────────────────────────────────────── */}
          <motion.div variants={cardVariants} transition={{ duration: 0.6, ease: "easeOut" }}>
            <TiltCard className="h-full">
              <Card glassmorphism className="h-full">
                <CardBody>
                  {/* Avatar + name */}
                  <div className="flex items-start gap-4 mb-6">
                    <motion.div
                      className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 shadow-lg shadow-blue-500/30"
                      whileHover={{ scale: 1.08, rotate: 3 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    >
                      AS
                      {/* Sparkle badge */}
                      <motion.span
                        className="absolute -top-1.5 -right-1.5 bg-amber-400 rounded-full p-0.5"
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Sparkles className="w-3 h-3 text-white" />
                      </motion.span>
                    </motion.div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Arbaz Sayyad
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">
                        Senior Full Stack Developer
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                          Available Now
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                    {summary.map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-2 group"
                        initial={{ opacity: 0, x: -16 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                        transition={{ delay: 0.25 + i * 0.06, duration: 0.45, ease: "easeOut" }}
                        whileHover={{ x: 3 }}
                      >
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={isInView ? { scale: 1 } : { scale: 0 }}
                          transition={{
                            delay: 0.3 + i * 0.07,
                            type: "spring",
                            stiffness: 400,
                            damping: 15,
                          }}
                          className="flex-shrink-0"
                        >
                          <Check className="w-4 h-4 text-emerald-500" />
                        </motion.span>
                        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                          {item.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-2">
                    <motion.button
                      onClick={downloadResume}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-medium shadow-md shadow-blue-500/20"
                      aria-label="Download CV"
                      whileHover={{ scale: 1.04, boxShadow: "0 8px 24px rgba(59,130,246,0.35)" }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <motion.span
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Download className="w-4 h-4" />
                      </motion.span>
                      Download CV
                    </motion.button>

                    <motion.a
                      href={`mailto:${socialLinks.email}`}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium"
                      whileHover={{ scale: 1.04, backgroundColor: "rgba(59,130,246,0.08)" }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Mail className="w-4 h-4" />
                      Email Me
                    </motion.a>
                  </div>
                </CardBody>
              </Card>
            </TiltCard>
          </motion.div>

          {/* ── Quick facts card ───────────────────────────────────────────── */}
          <motion.div variants={cardVariants} transition={{ duration: 0.6, ease: "easeOut" }}>
            <TiltCard className="h-full">
              <Card glassmorphism className="h-full">
                <CardBody>
                  <motion.h4
                    className="font-bold text-gray-900 dark:text-white mb-4"
                    initial={{ opacity: 0, y: -8 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    Quick Facts
                  </motion.h4>

                  <div className="space-y-3 mb-6">
                    {quickFacts.map((fact, i) => (
                      <motion.div
                        key={i}
                        initial={factRowBase.hidden}
                        animate={isInView ? factRowBase.visible : factRowBase.hidden}
                        transition={{ delay: 0.2 + i * 0.07, duration: 0.45, ease: "easeOut" }}
                        className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-white/10 last:border-0"
                        whileHover={{ x: 2 }}
                      >
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {fact.label}
                        </span>

                          <motion.span
                            className="text-sm font-semibold text-gray-900 dark:text-white"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.3 + i * 0.07 }}
                          >
                            {fact.value}
                          </motion.span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Connect links */}
                  <motion.h4
                    className="font-bold text-gray-900 dark:text-white mb-3"
                    initial={{ opacity: 0, y: -6 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5, duration: 0.35 }}
                  >
                    Connect
                  </motion.h4>

                  <div className="flex flex-wrap gap-2">
                    {[
                      {
                        href: socialLinks.linkedin,
                        label: "LinkedIn",
                        className:
                          "bg-blue-600/10 text-blue-600 dark:text-blue-400 hover:bg-blue-600/20",
                      },
                      {
                        href: socialLinks.github,
                        label: "GitHub",
                        className:
                          "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700",
                      },
                      {
                        href: socialLinks.whatsapp,
                        label: "WhatsApp",
                        className:
                          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20",
                      },
                    ].map((link, i) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={linkBase.hidden}
                        animate={isInView ? linkBase.visible : linkBase.hidden}
                        transition={{ delay: 0.55 + i * 0.08, duration: 0.4 }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${link.className}`}
                        whileHover={{ scale: 1.06, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-3 h-3" />
                        {link.label}
                      </motion.a>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </TiltCard>
          </motion.div>

        </div>
      </motion.div>
    </Section>
  );
}
