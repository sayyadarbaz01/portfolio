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
        frameBg: "#1a1816",
        frameBorder: "rgba(247,245,242,0.14)",
        frameShadow:
          "0 1px 0 rgba(255,255,255,0.08) inset, 0 24px 64px -20px rgba(0,0,0,0.65), 0 8px 24px -8px rgba(0,0,0,0.4)",
        rail: "rgba(231,203,168,0.55)",
        vignette:
          "radial-gradient(ellipse at 50% 35%, transparent 42%, rgba(12,10,9,0.28) 100%), linear-gradient(to top, rgba(12,10,9,0.55) 0%, transparent 38%)",
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
        frameBg: "#FFFFFF",
        frameBorder: "#E7E0D3",
        frameShadow:
          "0 1px 0 rgba(255,255,255,0.9) inset, 0 20px 50px -24px rgba(28,25,23,0.22), 0 4px 16px -6px rgba(28,25,23,0.1)",
        rail: "rgba(15,118,110,0.45)",
        vignette:
          "radial-gradient(ellipse at 50% 35%, transparent 48%, rgba(28,25,23,0.06) 100%), linear-gradient(to top, rgba(250,248,245,0.35) 0%, transparent 40%)",
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
            className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end"
            {...fadeUp(0.2, reduceMotion)}
          >
            <figure
              className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[400px] xl:max-w-[440px]"
              onMouseMove={onMove}
              onMouseLeave={() => {
                mx.set(0);
                my.set(0);
              }}
            >
              <div
                aria-hidden="true"
                className="absolute -inset-x-3 -inset-y-3 sm:-inset-x-4 sm:-inset-y-4 rounded-[28px] sm:rounded-[32px] -z-10"
                style={{
                  background: palette.plate,
                  border: `1px solid ${palette.plateBorder}`,
                }}
              />

              <div
                className="group relative overflow-hidden rounded-[22px] sm:rounded-[26px]"
                style={{
                  border: `1px solid ${palette.frameBorder}`,
                  boxShadow: palette.frameShadow,
                  backgroundColor: palette.frameBg,
                }}
              >
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-8 bottom-8 w-px z-20"
                  style={{ backgroundColor: palette.rail }}
                />

                <div className="relative aspect-[4/5] overflow-hidden">
                  <motion.div
                    className="absolute inset-0"
                    style={{ x: reduceMotion ? 0 : x, y: reduceMotion ? 0 : y }}
                  >
                    <Image
                      src="/profile.jpeg"
                      alt="Arbaz Sayyad — Full Stack Developer"
                      fill
                      priority
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 380px, 440px"
                      className="object-cover object-[center_12%] scale-105 transition-transform duration-700 ease-out will-change-transform motion-reduce:transition-none group-hover:scale-110 motion-reduce:group-hover:scale-105 [@media(hover:none)]:group-hover:scale-105"
                    />
                  </motion.div>

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none z-[1]"
                    style={{ background: palette.vignette }}
                  />
                </div>

                <figcaption
                  className="relative z-10 flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5"
                  style={{
                    borderTop: `1px solid ${palette.captionBorder}`,
                    background: palette.captionBg,
                  }}
                >
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium truncate" style={{ color: palette.captionName }}>
                      Arbaz Sayyad
                    </p>
                    <p className="text-[11px] mt-0.5 truncate" style={{ color: palette.captionMeta }}>
                      Full Stack · Pune
                    </p>
                  </div>
                  <span
                    className="flex-shrink-0 text-[10px] tracking-wide font-medium px-2.5 py-1 rounded-full"
                    style={{
                      color: palette.badgeColor,
                      border: `1px solid ${palette.badgeBorder}`,
                      backgroundColor: palette.badgeBg,
                    }}
                  >
                    Open to roles
                  </span>
                </figcaption>
              </div>
            </figure>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
