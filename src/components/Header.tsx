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
  const [activeSection, setActiveSection] = useState("home");
  const { theme, toggleTheme } = useTheme();
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active-section highlighting via IntersectionObserver
  useEffect(() => {
    const ids = navigation.map((item) => item.href.replace("#", ""));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    const targetId = href.replace("#", "");
    setActiveSection(targetId);
    scrollToSection(targetId);
    setIsOpen(false);
  };

  const renderNavButton = (item: { label: string; href: string }, mobile = false) => {
    const id = item.href.replace("#", "");
    const isActive = activeSection === id;
    return (
      <button
        key={item.label}
        onClick={() => handleNavClick(item.href)}
        aria-current={isActive ? "true" : undefined}
        className={mobile
          ? "w-full text-left px-4 py-2 text-sm font-mono rounded-full transition-colors"
          : "px-4 py-2 text-[13px] font-medium font-mono rounded-full transition-colors"}
        style={
          isActive
            ? { backgroundColor: "rgba(15, 118, 110, 0.12)", color: "var(--accent-teal-deep)" }
            : { color: "var(--text-secondary)" }
        }
        onMouseEnter={(e) => {
          if (!isActive) e.currentTarget.style.backgroundColor = "var(--bg-muted)";
        }}
        onMouseLeave={(e) => {
          if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        {item.label}
      </button>
    );
  };

  return (
    <>
      <header
        className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b")}
        style={{
          backgroundColor: scrolled ? "color-mix(in srgb, var(--bg-base) 82%, transparent)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderColor: scrolled ? "var(--card-border)" : "transparent",
        }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[76px] gap-3">
            {/* Brand — ink AS monogram */}
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-3 group text-left flex-shrink-0"
              aria-label="Back to top — Arbaz Sayyad"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-[15px]"
                style={{ backgroundColor: "var(--text-primary)", color: "var(--bg-base)" }}
              >
                AS
              </div>
              <div className="hidden lg:flex flex-col">
                <span className="font-bold text-[15px] tracking-tight" style={{ color: "var(--text-primary)" }}>
                  Arbaz Sayyad
                </span>
                <span className="text-[11px] font-mono tracking-wider" style={{ color: "var(--accent-teal)" }}>
                  FULL-STACK & AI INTEGRATION ENGINEER
                </span>
              </div>
            </button>

            {/* Desktop pill navigation — centered */}
            <div className="hidden md:flex flex-1 justify-center">
              <div
                className="flex items-center gap-1 p-1.5 rounded-full border"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)", boxShadow: "var(--card-shadow)" }}
                role="navigation"
                aria-label="Primary"
              >
                {navigation.map((item) => renderNavButton(item))}
              </div>
            </div>

            {/* Right Action Items */}
            <div className="flex items-center space-x-2.5 flex-shrink-0">
              {/* Availability pill */}
              <div
                className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-full text-[13px] font-mono border"
                style={{
                  backgroundColor: "rgba(4, 120, 87, 0.08)",
                  color: "var(--accent-emerald)",
                  borderColor: "rgba(4, 120, 87, 0.22)",
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Available for Sr. Roles</span>
              </div>

              {/* Ink Resume button */}
              <button
                onClick={downloadResume}
                className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[13px] font-mono font-semibold transition-transform hover:-translate-y-px"
                style={{ backgroundColor: "var(--text-primary)", color: "var(--bg-base)" }}
                aria-label="Download Resume"
              >
                <Download className="w-4 h-4" />
                <span>Resume</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full border transition-colors"
                style={{
                  color: "var(--text-secondary)",
                  borderColor: "var(--card-border)",
                  backgroundColor: "var(--card-bg)",
                }}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? (
                  <Sun className="w-[18px] h-[18px]" style={{ color: "var(--accent-aqua)" }} />
                ) : (
                  <Moon className="w-[18px] h-[18px]" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg transition-colors"
                style={{ color: "var(--text-secondary)" }}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Dropdown */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -8 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -8 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="md:hidden border rounded-2xl py-3 space-y-1 px-2 shadow-lg mb-3 overflow-hidden"
                style={{
                  borderColor: "var(--card-border)",
                  backgroundColor: "var(--card-bg)",
                  color: "var(--text-primary)",
                }}
              >
                {navigation.map((item) => renderNavButton(item, true))}

                <div className="pt-2 px-2 mt-2" style={{ borderTop: "1px solid var(--card-border)" }}>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      downloadResume();
                    }}
                    className="w-full py-2.5 px-4 rounded-full text-xs font-mono font-semibold flex items-center justify-center gap-2"
                    style={{ backgroundColor: "var(--text-primary)", color: "var(--bg-base)" }}
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Resume / CV</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Scroll Progress Bar — 2px teal at header bottom edge */}
        <div
          className="absolute bottom-0 left-0 h-[2px] transition-all duration-100"
          style={{ width: `${scrollProgress}%`, backgroundColor: "var(--accent-teal)" }}
        />
      </header>
    </>
  );
}
