"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, Download } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useScrollProgress } from "@/hooks";
import { cn, scrollToSection, downloadResume } from "@/utils/helpers";
import { navigation } from "@/data/portfolio";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const targetId = href.replace("#", "");
    scrollToSection(targetId);
    setIsOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b",
          scrolled
            ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-slate-200 dark:border-slate-800 shadow-sm"
            : "bg-transparent border-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Brand Logo & Senior Tag */}
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-3 group text-left"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-slate-100 flex items-center justify-center font-mono font-bold text-sm border border-slate-700 dark:border-slate-300">
                AS
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-slate-100">
                  Arbaz Sayyad
                </span>
                <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400 tracking-wider">
                  FULL-STACK & AI ENGINEER
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="px-3.5 py-1.5 text-xs font-medium font-mono text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right Action Items */}
            <div className="flex items-center space-x-3">
              {/* Status Pill */}
              <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for Sr. Roles</span>
              </div>

              {/* Download Resume Button */}
              <button
                onClick={downloadResume}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-sky-600 text-white hover:bg-sky-500 transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CV</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Dropdown */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-slate-200 dark:border-slate-800 py-3 space-y-1 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-b-xl px-2 shadow-lg"
              >
                {navigation.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className="w-full text-left px-4 py-2 text-sm font-mono text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-md"
                  >
                    {item.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Scroll Progress Bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-sky-500 transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </header>
    </>
  );
}

