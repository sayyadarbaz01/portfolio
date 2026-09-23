"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, ArrowRight, Download } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useScrollProgress } from "@/hooks";
import { cn, scrollToSection, downloadResume } from "@/utils/helpers";
import { navigation } from "@/data/portfolio";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const { theme, toggleTheme } = useTheme();
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setOverHero(y < window.innerHeight * 0.72);
      // At top of page, Overview is always active — avoids Contact false-positive
      if (y < 100) setActiveSection("home");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navigation.map((item) => item.href.replace("#", ""));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (window.scrollY < 100) {
          setActiveSection("home");
          return;
        }
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.1, 0.25, 0.5] }
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

  // Dark hero only forces light nav ink; light theme stays ink-on-paper throughout
  const darkSurface = overHero && theme === "dark";
  const ink = darkSurface ? "#F7F5F2" : "var(--text-primary)";
  const mute = darkSurface ? "rgba(247,245,242,0.62)" : "var(--text-secondary)";
  const active = darkSurface ? "#F7F5F2" : "var(--text-primary)";

  return (
    <header
      className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b")}
      style={{
        backgroundColor: scrolled
          ? darkSurface
            ? "rgba(12, 10, 9, 0.72)"
            : "color-mix(in srgb, var(--bg-base) 88%, transparent)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderColor: scrolled
          ? darkSurface
            ? "rgba(247,245,242,0.08)"
            : "var(--card-border)"
          : "transparent",
      }}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12" aria-label="Primary">
        <div className="flex items-center justify-between h-[72px] gap-4">
          {/* Brand Mark — Full Name + Live Availability Beacon */}
          <button
            onClick={() => handleNavClick("home")}
            className="group text-left flex-shrink-0 min-h-[44px] flex items-center gap-2.5 sm:gap-3 transition-opacity duration-200 hover:opacity-90 cursor-pointer"
            aria-label="Back to top — Arbaz Sayyad (Available for work)"
          >
            <div className="flex items-center gap-2 sm:gap-2.5">
              <span
                className="font-sans font-bold text-[16px] sm:text-[17px] tracking-tight transition-colors duration-300"
                style={{ color: ink }}
              >
                Arbaz Sayyad
              </span>

              {/* Live Availability Beacon */}
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium tracking-wide transition-all duration-200 select-none",
                  darkSurface || theme === "dark"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 shadow-[0_0_12px_rgba(16,185,129,0.15)]"
                    : "bg-emerald-600/10 text-emerald-700 border border-emerald-600/25 shadow-[0_1px_4px_rgba(16,185,129,0.10)]"
                )}
                title="Available for new opportunities"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                <span className="hidden xs:inline font-sans text-[10.5px] uppercase tracking-wider font-semibold">
                  Available
                </span>
              </span>
            </div>
          </button>

          {/* Center links — text only, underline slides in */}
          <div className="hidden md:flex flex-1 justify-center items-center gap-1">
            {navigation.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  aria-current={isActive ? "true" : undefined}
                  className="group relative px-3.5 py-2 text-[13px] font-medium transition-colors duration-200"
                  style={{ color: isActive ? active : mute }}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute left-3.5 right-3.5 bottom-1 h-px origin-left transition-transform duration-300 ease-out",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                    style={{ backgroundColor: isActive || darkSurface ? (darkSurface ? "#F7F5F2" : "var(--text-primary)") : "var(--text-primary)" }}
                  />
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={downloadResume}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold min-h-[40px] border transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm cursor-pointer"
              style={
                darkSurface || theme === "dark"
                  ? {
                      borderColor: "rgba(247,245,242,0.24)",
                      color: "#F7F5F2",
                      backgroundColor: "rgba(255,255,255,0.06)",
                    }
                  : {
                      borderColor: "var(--card-border)",
                      color: "var(--text-primary)",
                      backgroundColor: "var(--card-bg)",
                    }
              }
              aria-label="Download CV"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Download CV</span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full min-h-[40px] min-w-[40px] flex items-center justify-center transition-opacity duration-200 hover:opacity-100"
              style={{ color: mute, opacity: darkSurface ? 0.45 : 0.75 }}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
              style={{ color: ink }}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="md:hidden border rounded-2xl py-3 space-y-0.5 px-2 mb-3 overflow-hidden"
              style={{
                borderColor: "var(--card-border)",
                backgroundColor: "var(--card-bg)",
                color: "var(--text-primary)",
              }}
            >
              {navigation.map((item) => {
                const id = item.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    aria-current={isActive ? "true" : undefined}
                    className="w-full text-left px-4 py-2.5 text-sm rounded-xl min-h-[44px] transition-colors"
                    style={{
                      color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                      backgroundColor: isActive ? "var(--bg-muted)" : "transparent",
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className="px-2 pt-2 space-y-2" style={{ borderTop: "1px solid var(--card-border)" }}>
                <button
                  onClick={() => {
                    downloadResume();
                    setIsOpen(false);
                  }}
                  className="w-full py-2.5 px-4 rounded-full text-sm font-semibold min-h-[44px] flex items-center justify-center gap-2 border transition-colors"
                  style={{
                    borderColor: "var(--card-border)",
                    color: "var(--text-primary)",
                    backgroundColor: "var(--card-bg)",
                  }}
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>Download CV</span>
                </button>
                <button
                  onClick={() => handleNavClick("contact")}
                  className="w-full py-2.5 px-4 rounded-full text-sm font-medium min-h-[44px]"
                  style={{ backgroundColor: "var(--text-primary)", color: "var(--bg-base)" }}
                >
                  Let&apos;s connect
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div
        className="absolute bottom-0 left-0 h-px transition-[width] duration-100"
        style={{
          width: `${scrollProgress}%`,
          backgroundColor: darkSurface ? "rgba(231,203,168,0.7)" : "var(--accent-teal)",
        }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />
    </header>
  );
}
