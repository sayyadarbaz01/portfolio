"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ExternalLink, FileDown, MapPin, Briefcase, Star } from "lucide-react";
import { Button } from "@/components/ui";
import { downloadResume, scrollToSection } from "@/utils/helpers";

const roles = [
  { text: "Full Stack Experiences",   gradient: "from-blue-500 via-cyan-400 to-blue-600" },
  { text: "Pixel-Perfect Interfaces",  gradient: "from-purple-500 via-pink-400 to-rose-500" },
  { text: "Scalable Web Applications", gradient: "from-emerald-400 via-teal-400 to-cyan-500" },
  { text: "Clean, Accessible Code",    gradient: "from-amber-400 via-orange-400 to-red-500" },
  { text: "Products People Love",      gradient: "from-indigo-500 via-blue-400 to-cyan-400" },
];

const stats = [
  { value: "3+", label: "Years Exp." },
  { value: "7+", label: "Projects" },
  { value: "15+", label: "Technologies" },
];

// Stagger each character of the name
const nameChars = "Mohammed Rizwan".split("");

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const currentRole = roles[roleIndex].text;
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (displayedText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentRole.slice(0, displayedText.length + 1));
        }, 75);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2200);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentRole.slice(0, displayedText.length - 1));
        }, 35);
      } else {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isTyping, roleIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  };

  const photoVariants = {
    hidden: { opacity: 0, x: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.9, ease: "easeOut" as const, delay: 0.3 },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 sm:pt-20 px-3 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ y: [0, 100, 0], x: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ y: [0, -100, 0], x: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ y: [0, 50, 0], x: [0, 100, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Two-column layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col-reverse lg:flex-row items-center justify-between gap-6 sm:gap-12 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ── LEFT: Text Content ── */}
          <div className="flex-1 text-center lg:text-left">
            {/* Availability badge */}
            <motion.div variants={itemVariants} className="flex justify-center lg:justify-start mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border border-emerald-500/30 bg-emerald-500/10 text-emerald-500">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for new opportunities
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.div variants={itemVariants} className="mb-2">
              <span className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-gray-500 dark:text-gray-400 tracking-widest uppercase">
                <motion.span
                  animate={{ rotate: [0, 20, -10, 20, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 3 }}
                  className="inline-block text-lg sm:text-xl"
                >
                  👋
                </motion.span>
                Hey there, I&apos;m
              </span>
            </motion.div>

            {/* Name — staggered letter reveal (standalone, not tied to itemVariants) */}
            <div className="mb-4 sm:mb-5">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight overflow-hidden">
                <motion.span
                  className="inline-block whitespace-nowrap"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.10,
                        delayChildren: 0.5,
                      },
                    },
                  }}
                >
                  {nameChars.map((char, i) => (
                    <motion.span
                      key={i}
                      className="inline-block bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent"
                      variants={{
                        hidden: { opacity: 0, x: -28 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: {
                            duration: 0.38,
                            ease: "easeOut" as const,
                          },
                        },
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.span>
              </h1>

              {/* Tagline — slides in after name finishes */}
              <motion.p
                className="mt-2 text-base sm:text-lg lg:text-xl font-semibold text-gray-400 dark:text-gray-500 tracking-wide"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8, duration: 0.7, ease: "easeOut" }}
              >
                Senior Software Engineer · Full Stack · 3+ Yrs
              </motion.p>
            </div>

            {/* Typewriter */}
            <motion.div variants={itemVariants} className="mb-5">
              <div className="flex items-baseline justify-center lg:justify-start gap-2 flex-wrap">
                <span className="text-lg sm:text-2xl lg:text-3xl font-medium text-gray-500 dark:text-gray-400">
                  I craft
                </span>
                <span className="relative text-lg sm:text-2xl lg:text-3xl font-extrabold">
                  {/* Animated gradient text */}
                  <span
                    className={`bg-gradient-to-r ${
                      roles[roleIndex].gradient
                    } bg-clip-text text-transparent`}
                  >
                    {displayedText}
                  </span>
                  {/* Cursor */}
                  <motion.span
                    className="inline-block w-[2px] h-[1em] ml-[1px] align-middle bg-blue-500 rounded-full"
                    animate={{ opacity: showCursor ? 1 : 0 }}
                    transition={{ duration: 0.1 }}
                  />
                </span>
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-lg text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Senior Software Engineer crafting scalable, accessible, and modern
              web applications. Specialized in React, Next.js, Node.js, and
              building experiences that users love.
            </motion.p>

            {/* Location + Role chips */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start mb-5 sm:mb-8"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-900/60 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800">
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                Maharashtra, India
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-900/60 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800">
                <Briefcase className="w-3.5 h-3.5 text-purple-500" />
                3+ Years Experience
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-900/60 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800">
                <Star className="w-3.5 h-3.5 text-yellow-500" />
                MERN Stack Specialist
              </span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center lg:justify-start items-center mb-6 sm:mb-10"
            >
              <Button
                size="lg"
                onClick={() => scrollToSection("contact")}
                className="cursor-pointer w-full sm:w-auto !px-5 !py-2.5 sm:!px-8 sm:!py-3 !text-base sm:!text-lg"
              >
                Hire Me
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={downloadResume}
                className="cursor-pointer w-full sm:w-auto !px-5 !py-2.5 sm:!px-8 sm:!py-3 !text-base sm:!text-lg"
              >
                <FileDown className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Download Resume
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("projects")}
                className="cursor-pointer w-full sm:w-auto !px-5 !py-2.5 sm:!px-8 sm:!py-3 !text-base sm:!text-lg"
              >
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                View Projects
              </Button>
            </motion.div>

            {/* Mini Stats Row */}
            <motion.div
              variants={itemVariants}
              className="flex gap-4 sm:gap-6 justify-center lg:justify-start"
            >
              {stats.map((s) => (
                <div key={s.label} className="text-center lg:text-left">
                  <p className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {s.value}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider mt-0.5">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Premium Profile Photo ── */}
          <motion.div
            variants={photoVariants}
            className="flex-shrink-0 flex justify-center lg:justify-end"
          >
            <div className="relative w-56 h-56 sm:w-80 sm:h-80 lg:w-96 lg:h-96">

              {/* Outer slow-rotating gradient ring */}
              <motion.div
                className="absolute -inset-2 sm:-inset-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-20 blur-2xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              {/* Mid decorative dashed ring */}
              <motion.div
                className="absolute -inset-2 sm:-inset-3 rounded-full border-2 border-dashed border-blue-500/40 dark:border-blue-400/40"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />

              {/* Gradient border ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-[4px]">
                {/* Inner dark ring for contrast */}
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-950 p-[4px]">
                  {/* Photo */}
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img
                      src="/profile.jpeg"
                      alt="Mohammed Rizwan — Senior Software Engineer"
                      className="w-full h-full object-cover object-top scale-110"
                    />
                  </div>
                </div>
              </div>

              {/* Online status dot */}
              <motion.span
                className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-4 h-4 sm:w-5 sm:h-5 bg-emerald-400 border-2 sm:border-[3px] border-white dark:border-gray-950 rounded-full shadow-lg shadow-emerald-400/60"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Floating badge — top left */}
              <motion.div
                className="absolute -top-2 -left-2 sm:-top-6 sm:-left-6 bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl px-2 py-1.5 sm:px-3 sm:py-2 shadow-xl border border-gray-100 dark:border-gray-800 flex items-center gap-1.5 sm:gap-2"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-sm sm:text-lg">⚡</span>
                <div>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-900 dark:text-white leading-none">Open to Work</p>
                  <p className="text-[8px] sm:text-[10px] text-gray-500 dark:text-gray-400 leading-none mt-0.5">Full-time / Remote</p>
                </div>
              </motion.div>

              {/* Floating badge — bottom left */}
              <motion.div
                className="absolute -bottom-2 -left-2 sm:-bottom-6 sm:-left-6 bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl px-2 py-1.5 sm:px-3 sm:py-2 shadow-xl border border-gray-100 dark:border-gray-800 flex items-center gap-1.5 sm:gap-2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <span className="text-sm sm:text-lg">🚀</span>
                <div>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-900 dark:text-white leading-none">MERN Stack</p>
                  <p className="text-[8px] sm:text-[10px] text-gray-500 dark:text-gray-400 leading-none mt-0.5">Next.js · React · Node</p>
                </div>
              </motion.div>

              {/* Floating badge — top right */}
              <motion.div
                className="absolute -top-2 -right-2 sm:-top-6 sm:-right-6 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg sm:rounded-xl px-2 py-1.5 sm:px-3 sm:py-2 shadow-xl shadow-blue-500/30 flex items-center gap-1 sm:gap-1.5"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <span className="text-sm sm:text-lg">🏆</span>
                <div>
                  <p className="text-[10px] sm:text-xs font-bold text-white leading-none">Always</p>
                  <p className="text-[8px] sm:text-[10px] text-blue-100 leading-none mt-0.5">Exploring New</p>
                </div>
              </motion.div>

              {/* Orbiting tech dots */}
              {[
                { color: "bg-blue-500", delay: 0, label: "React" },
                { color: "bg-purple-500", delay: 2, label: "Next.js" },
                { color: "bg-cyan-500", delay: 4, label: "Node.js" },
              ].map((dot, i) => (
                <motion.div
                  key={dot.label}
                  className={`absolute w-2 h-2 sm:w-3 sm:h-3 ${dot.color} rounded-full shadow-lg hidden sm:block`}
                  style={{
                    top: "50%",
                    left: "50%",
                  }}
                  animate={{
                    x: [
                      Math.cos((i * 2 * Math.PI) / 3) * 170,
                      Math.cos((i * 2 * Math.PI) / 3 + Math.PI) * 170,
                      Math.cos((i * 2 * Math.PI) / 3) * 170,
                    ],
                    y: [
                      Math.sin((i * 2 * Math.PI) / 3) * 170,
                      Math.sin((i * 2 * Math.PI) / 3 + Math.PI) * 170,
                      Math.sin((i * 2 * Math.PI) / 3) * 170,
                    ],
                  }}
                  transition={{
                    duration: 8 + i * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: dot.delay,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <button
            onClick={() => scrollToSection("about")}
            aria-label="Scroll to About section"
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-all"
          >
            <ArrowDown className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
