"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useScrollProgress } from "@/hooks";
import { cn, scrollToSection } from "@/utils/helpers";

const navItems = [
  { label: "Home", href: "home", icon: "🏠" },
  { label: "About", href: "about", icon: "👤" },
  { label: "Skills", href: "skills", icon: "⚡" },
  { label: "Experience", href: "experience", icon: "💼" },
  { label: "Projects", href: "projects", icon: "🚀" },
  { label: "Connect", href: "connect", icon: "📬" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    scrollToSection(href);
    setIsOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/10 dark:bg-black/20 backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">MR</span>
              </div>
              <span className="font-bold text-lg hidden sm:inline bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Mohammed Rizwan
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden md:flex items-center space-x-1"
            >
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-all duration-200"
                >
                  {item.label}
                </button>
              ))}
            </motion.div>

            {/* Right Side Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-all duration-200"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-all duration-200"
                aria-label="Toggle menu"
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </motion.div>
              </motion.button>
            </motion.div>
          </div>

          {/* Mobile Navigation - Enhanced */}
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setIsOpen(false)}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
                  style={{ top: "64px" }}
                />

                {/* Menu Panel */}
                <motion.div
                  initial={{ opacity: 0, y: -10, x: 0 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, y: -10, x: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="md:hidden absolute top-16 left-0 right-0 mx-4 bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                >
                  <div className="px-4 py-3 space-y-1">
                    {navItems.map((item, index) => (
                      <motion.button
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.05,
                          ease: "easeOut",
                        }}
                        onClick={() => handleNavClick(item.href)}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-500/10 dark:hover:bg-blue-500/20 rounded-lg transition-all duration-200 group"
                      >
                        <span className="text-lg group-hover:scale-125 transition-transform duration-200">
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                        <motion.span
                          className="ml-auto text-blue-500 opacity-0 group-hover:opacity-100"
                          animate={{ x: 0 }}
                          whileHover={{ x: 4 }}
                        >
                          →
                        </motion.span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </nav>

        {/* Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-100" style={{ width: `${scrollProgress}%` }} />
      </header>
    </>
  );
}
