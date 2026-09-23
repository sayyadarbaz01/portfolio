"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { scrollToSection } from "@/utils/helpers";
import { useTheme } from "@/context/ThemeContext";

interface HeroSectionProps {
  onOpenTerminal?: () => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

function fadeUp(delay: number, reduce: boolean | null) {
  if (reduce) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.35, delay: delay * 0.35 },
    };
  }
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: EASE },
  };
}

export function HeroSection({ onOpenTerminal }: HeroSectionProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const reduceMotion = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 140, damping: 24, mass: 0.35 });
  const y = useSpring(my, { stiffness: 140, damping: 24, mass: 0.35 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFinePointer(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !finePointer) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2.5);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  const palette = isDark
    ? {
      bg: "#0C0A09",
      headline: "#F7F5F2",
      body: "#B4AFA8",
      secondaryBorder: "rgba(247,245,242,0.22)",
      secondaryText: "#F7F5F2",
      secondaryHover: "rgba(255,255,255,0.06)",
      cmd: "#A8A29E",
      glow: "rgba(231,203,168,0.09)",
      plate:
        "linear-gradient(145deg, rgba(231,203,168,0.12), rgba(255,255,255,0.03) 40%, transparent 70%)",
      plateBorder: "rgba(247,245,242,0.06)",
      frameBg: "transparent",
      frameBorder: "transparent",
      frameShadow: "none",
      rail: "rgba(231,203,168,0.55)",
      vignette: "none",
      captionBorder: "rgba(247,245,242,0.08)",
      captionBg: "linear-gradient(to bottom, rgba(18,16,14,0.92), rgba(12,10,9,0.98))",
      captionName: "#F7F5F2",
      captionMeta: "#A8A29E",
      badgeColor: "#E7CBA8",
      badgeBorder: "rgba(231,203,168,0.28)",
      badgeBg: "rgba(231,203,168,0.06)",
      primaryBg: "#E7CBA8",
      primaryText: "#1C1917",
    }
    : {
      bg: "#FAF8F5",
      headline: "#1C1917",
      body: "#57534E",
      secondaryBorder: "rgba(28,25,23,0.18)",
      secondaryText: "#1C1917",
      secondaryHover: "rgba(28,25,23,0.04)",
      cmd: "#78716C",
      glow: "rgba(15,118,110,0.06)",
      plate:
        "linear-gradient(145deg, rgba(15,118,110,0.06), rgba(28,25,23,0.02) 45%, transparent 75%)",
      plateBorder: "rgba(28,25,23,0.06)",
      frameBg: "transparent",
      frameBorder: "transparent",
      frameShadow: "none",
      rail: "rgba(15,118,110,0.45)",
      vignette: "none",
      captionBorder: "#E7E0D3",
      captionBg: "#FFFFFF",
      captionName: "#1C1917",
      captionMeta: "#78716C",
      badgeColor: "#0F766E",
      badgeBorder: "rgba(15,118,110,0.22)",
      badgeBg: "rgba(15,118,110,0.06)",
      primaryBg: "#1C1917",
      primaryText: "#FAF8F5",
    };

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[100svh] overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: palette.bg }}
      data-hero-theme={isDark ? "dark" : "light"}
    >
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-8%] top-[18%] hidden md:block h-[55%] w-[42%] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${palette.glow}, transparent 68%)` }}
          animate={{ opacity: [0.45, 0.75, 0.45] }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
        />
      )}

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-center px-5 sm:px-8 lg:px-12 xl:px-16 pt-[calc(72px+1.5rem)] pb-14 md:pb-16">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          <div className="lg:col-span-6 xl:col-span-6 max-w-xl lg:max-w-[32rem]">
            <motion.h1
              id="hero-heading"
              className="font-sans font-semibold tracking-[-0.03em] text-[clamp(2.15rem,1.1rem+3.4vw,3.85rem)] leading-[1.08] text-balance max-w-[14ch]"
              style={{ color: palette.headline }}
              {...fadeUp(0.06, reduceMotion)}
            >
              I craft fast React apps &amp; AI-ready Node.js services.
            </motion.h1>

            <motion.p
              className="mt-5 sm:mt-6 text-[15px] sm:text-[15.5px] leading-[1.7] max-w-[36ch]"
              style={{ color: palette.body }}
              {...fadeUp(0.14, reduceMotion)}
            >
              I design and ship production systems for enterprise teams — React interfaces, Node.js microservices, and OpenAI RAG pipelines used by 500+ daily users.
            </motion.p>

            <motion.div
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3"
              {...fadeUp(0.22, reduceMotion)}
            >
              <motion.button
                type="button"
                onClick={() => scrollToSection("projects")}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold min-h-[44px]"
                style={{ backgroundColor: palette.primaryBg, color: palette.primaryText }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                      scale: 1.03,
                      boxShadow: isDark
                        ? "0 14px 36px -10px rgba(231,203,168,0.4)"
                        : "0 14px 36px -10px rgba(28,25,23,0.28)",
                    }
                }
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                transition={{ type: "spring", stiffness: 340, damping: 22 }}
              >
                View Projects
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </motion.button>

              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-medium min-h-[44px] border bg-transparent transition-colors duration-200"
                style={{
                  borderColor: palette.secondaryBorder,
                  color: palette.secondaryText,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = palette.secondaryHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                Contact Me
              </button>
            </motion.div>

            {onOpenTerminal && (
              <motion.button
                type="button"
                onClick={onOpenTerminal}
                className="mt-6 text-[11px] font-mono tracking-wide opacity-50 hover:opacity-80 transition-opacity min-h-[40px]"
                style={{ color: palette.cmd }}
                aria-label="Open command palette"
                {...fadeUp(0.3, reduceMotion)}
              >
                ⌘K
              </motion.button>
            )}
          </div>

          <motion.div
            className="lg:col-span-6 xl:col-span-6 flex justify-center"
            {...fadeUp(0.2, reduceMotion)}
          >
            <figure
              className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[360px] md:max-w-[380px] lg:max-w-[400px] xl:max-w-[440px]"
              onMouseMove={onMove}
              onMouseLeave={() => {
                mx.set(0);
                my.set(0);
              }}
            >
              {/* High-Impact Depth Typography: "DEVELOPER" Positioned Behind Subject (Forehead/Eye/Ear Level) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-[15%] sm:top-[16%] md:top-[17%] left-1/2 -translate-x-1/2 w-[130%] xs:w-[135%] sm:w-[145%] md:w-[155%] lg:w-[155%] xl:w-[168%] 2xl:w-[172%] flex justify-center select-none -z-10"
              >
                <svg
                  viewBox="0 0 1150 200"
                  className="w-full overflow-visible"
                  aria-hidden="true"
                >
                  <text
                    x="50%"
                    y="52%"
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="font-sans font-black uppercase select-none"
                    fontSize="180"
                    fill={isDark ? "#F7F5F2" : "#1C1917"}
                    style={{
                      fontFamily: "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontWeight: 900,
                      letterSpacing: "-0.035em",
                    }}
                  >
                    DEVELOPER
                  </text>
                </svg>
              </div>

              {/* Subtle back ambient glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-3xl opacity-70 scale-105"
                style={{
                  background: isDark
                    ? "radial-gradient(circle at 50% 40%, rgba(231,203,168,0.14), transparent 65%)"
                    : "radial-gradient(circle at 50% 40%, rgba(15,118,110,0.08), transparent 65%)",
                }}
              />

              <div className="group relative">
                <div
                  className="relative aspect-[992/1087] w-full overflow-hidden"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, black 0%, black 60%, rgba(0,0,0,0.92) 72%, rgba(0,0,0,0.58) 82%, rgba(0,0,0,0.18) 92%, transparent 98%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black 0%, black 60%, rgba(0,0,0,0.92) 72%, rgba(0,0,0,0.58) 82%, rgba(0,0,0,0.18) 92%, transparent 98%)",
                  }}
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{ x: reduceMotion ? 0 : x, y: reduceMotion ? 0 : y }}
                  >
                    <Image
                      src="/profile-nobg.png"
                      alt="Arbaz Sayyad — Full Stack Developer"
                      fill
                      priority
                      unoptimized
                      sizes="(max-width: 640px) 280px, (max-width: 1024px) 390px, 460px"
                      className="object-contain object-bottom transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:scale-[1.03] [@media(hover:none)]:group-hover:scale-100"
                    />
                  </motion.div>

                  {/* Soft studio mist/fog overlay at the bottom */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-32 z-10"
                    style={{
                      background: `linear-gradient(to top, ${palette.bg} 0%, color-mix(in srgb, ${palette.bg} 80%, transparent) 35%, transparent 100%)`,
                    }}
                  />
                </div>
              </div>
            </figure>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
