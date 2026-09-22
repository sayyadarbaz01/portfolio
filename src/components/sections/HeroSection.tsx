"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, FileDown, Layers, CheckCircle2, MapPin, Terminal } from "lucide-react";
import { downloadResume, scrollToSection } from "@/utils/helpers";
import { Magnetic, Reveal } from "@/components/ui/Motion";

const metrics = [
  { value: "3+", label: "Years Experience (3+ YOE)" },
  { value: "4s → 2s", label: "Load Time Cut (50% Speedup)" },
  { value: "25%", label: "Dev Overhead Reduction" },
  { value: "35%", label: "Analyst Time Reduction" },
  { value: "40%", label: "Vector Retrieval Speedup" },
  { value: "500+", label: "Daily Enterprise Users" },
];

const skillChips = [
  "React · TypeScript · Redux · MUI",
  "Node.js · Express · REST · SQL",
  "MongoDB · JWT · RBAC · Docker",
  "OpenAI API · RAG · Vector Search",
];

interface HeroSectionProps {
  onOpenTerminal?: () => void;
}

export function HeroSection({ onOpenTerminal }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative flex items-center pt-[calc(76px+1.25rem)] sm:pt-[calc(76px+2rem)] pb-10 sm:pb-12 px-4 sm:px-6 lg:px-8 overflow-x-clip"
    >
      <div className="w-full max-w-7xl 2xl:max-w-[90rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-start">

          {/* ── LEFT: Editorial hierarchy ── */}
          <div className="lg:col-span-7 text-left min-w-0">
            <Reveal>
              {/* Identity pill */}
              <div
                className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 px-3.5 py-1.5 rounded-full text-xs border"
                style={{
                  backgroundColor: "var(--card-bg)",
                  borderColor: "var(--card-border)",
                  color: "var(--text-secondary)",
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                  Arbaz Sayyad
                </span>
                <span style={{ color: "var(--text-faint)" }}>·</span>
                <span>Available for senior full-stack roles</span>
                <span style={{ color: "var(--text-faint)" }}>·</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3 h-3" style={{ color: "var(--accent-teal)" }} />
                  Pune, India
                </span>
              </div>
            </Reveal>

            {/* Serif statement headline */}
            <Reveal delay={0.06}>
              <h1 className="font-display font-semibold text-hero-fluid tracking-tight mt-5" style={{ color: "var(--text-primary)" }}>
                I craft fast React apps, resilient Node.js services & AI workflows.
              </h1>
              <p className="text-sm sm:text-[15px] mt-3" style={{ color: "var(--text-muted)" }}>
                Full Stack Developer · 3+ YOE · React · TypeScript · Node.js · RAG Systems
              </p>
            </Reveal>

            {/* Bio */}
            <Reveal delay={0.12}>
              <p className="text-base sm:text-lg leading-relaxed max-w-2xl mt-4" style={{ color: "var(--text-secondary)" }}>
                3+ years building enterprise applications, microservices, and AI-assisted workflows — specializing in React, TypeScript, Redux, Node.js, Express, MongoDB, Docker, and OpenAI RAG pipelines.
              </p>
            </Reveal>

            {/* Skill chips */}
            <Reveal delay={0.18}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-5 max-w-xl">
                {skillChips.map((chip) => (
                  <div
                    key={chip}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono border"
                    style={{
                      backgroundColor: "var(--card-bg)",
                      borderColor: "var(--card-border)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: "var(--accent-emerald)" }} />
                    <span>{chip}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Actions */}
            <Reveal delay={0.24}>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mt-5">
                <Magnetic>
                  <button
                    onClick={() => scrollToSection("projects")}
                    className="btn-ink px-7 py-3.5 rounded-full text-sm font-semibold transition-transform flex items-center gap-2 shadow-sm font-mono"
                    style={{ backgroundColor: "var(--text-primary)", color: "var(--bg-base)" }}
                  >
                    <Layers className="w-4 h-4 relative z-[2]" />
                    <span className="relative z-[2]">Explore Architecture & Projects</span>
                    <ArrowRight className="w-4 h-4 relative z-[2]" />
                  </button>
                </Magnetic>

                <button
                  onClick={downloadResume}
                  className="text-sm font-mono font-medium underline underline-offset-4 decoration-1 hover:decoration-2 transition-all flex items-center gap-1.5"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download Resume</span>
                </button>
              </div>

              {onOpenTerminal && (
                <button
                  onClick={onOpenTerminal}
                  className="mt-4 text-xs font-mono transition-colors"
                  style={{ color: "var(--accent-teal)" }}
                  aria-label="Open CLI terminal"
                >
                  $ explore via terminal →
                </button>
              )}
            </Reveal>
          </div>

          {/* ── RIGHT: Editor-window portrait card ── */}
          <Reveal className="lg:col-span-5 flex justify-center lg:justify-end w-full min-w-0" delay={0.1}>
            <div
              className="relative w-full max-w-[min(100%,22rem)] sm:max-w-[24rem] lg:max-w-[26rem] xl:max-w-[28rem] 2xl:max-w-[32rem] rounded-2xl p-3 sm:p-4"
              style={{
                backgroundColor: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                boxShadow: "var(--card-shadow)",
                color: "var(--text-primary)",
              }}
            >
              {/* Title bar */}
              <div
                className="flex items-center justify-between gap-2 pb-3 mb-3 text-[10px] sm:text-xs font-mono min-w-0"
                style={{ borderBottom: "1px solid var(--card-border)", color: "var(--text-secondary)" }}
              >
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80 flex-shrink-0" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80 flex-shrink-0" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80 flex-shrink-0" />
                  <span className="ml-1 sm:ml-2 font-semibold truncate">arbaz_fullstack.ts</span>
                </div>
                <span className="font-semibold flex items-center gap-1.5 flex-shrink-0" style={{ color: "var(--accent-emerald)" }}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="hidden sm:inline">ONLINE</span>
                </span>
              </div>

              {/* Photo — fixed aspect, responsive width, zoom on hover */}
              <div
                className="group relative w-full rounded-xl overflow-hidden aspect-[4/5] mx-auto mb-2"
                style={{ border: "1px solid var(--card-border)", backgroundColor: "var(--bg-muted)" }}
              >
                <Image
                  src="/profile.jpeg"
                  alt="Arbaz Sayyad — Full Stack Developer"
                  fill
                  priority
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 24rem, (max-width: 1536px) 28rem, 32rem"
                  className="object-cover object-top will-change-transform transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:scale-110 motion-reduce:group-hover:scale-100 [@media(hover:none)]:group-hover:scale-100"
                />

                {/* Mono spec sheet overlay */}
                <div
                  className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 backdrop-blur-md p-2.5 sm:p-3 rounded-xl border text-[10px] sm:text-xs font-mono space-y-1 sm:space-y-1.5 z-[1]"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--card-bg) 94%, transparent)",
                    borderColor: "var(--card-border)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <div className="flex justify-between gap-2 min-w-0">
                    <span className="flex-shrink-0" style={{ color: "var(--text-muted)" }}>ROLE:</span>
                    <span className="font-bold text-right truncate" style={{ color: "var(--accent-teal)" }}>Full Stack Developer</span>
                  </div>
                  <div className="flex justify-between gap-2 min-w-0">
                    <span className="flex-shrink-0" style={{ color: "var(--text-muted)" }}>LOC:</span>
                    <span className="flex items-center gap-1 font-medium text-right truncate">
                      <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: "var(--accent-teal)" }} />
                      Pune, India
                    </span>
                  </div>
                  <div className="flex justify-between gap-2 min-w-0">
                    <span className="flex-shrink-0" style={{ color: "var(--text-muted)" }}>EXP:</span>
                    <span className="font-medium text-right truncate">3+ YOE (Synechron Technologies)</span>
                  </div>
                </div>
              </div>

              {/* Core tech stack panel */}
              <div
                className="p-2.5 sm:p-3 rounded-xl border font-mono text-[10px] sm:text-xs space-y-1.5 overflow-x-auto"
                style={{
                  backgroundColor: "var(--bg-elevated)",
                  borderColor: "var(--card-border)",
                  color: "var(--text-muted)",
                }}
              >
                <div className="flex items-center gap-2 font-semibold" style={{ color: "var(--text-primary)" }}>
                  <Terminal className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--accent-teal)" }} />
                  <span>CORE TECH STACK</span>
                </div>
                <p className="whitespace-nowrap sm:whitespace-normal" style={{ color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--accent-teal)" }}>const</span> stack = [<span style={{ color: "var(--accent-emerald)" }}>&quot;React&quot;</span>, <span style={{ color: "var(--accent-emerald)" }}>&quot;Node.js&quot;</span>, <span style={{ color: "var(--accent-emerald)" }}>&quot;OpenAI RAG&quot;</span>];
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── Proof band — full width, hairline separated ── */}
        <Reveal delay={0.1}>
          <div
            className="mt-10 sm:mt-12 pt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6"
            style={{ borderTop: "1px solid var(--card-border)" }}
          >
            {metrics.map((m, idx) => (
              <div key={idx}>
                <p className="font-display font-semibold text-proof-fluid" style={{ color: "var(--text-primary)" }}>{m.value}</p>
                <p className="text-[11px] mt-2 leading-tight" style={{ color: "var(--text-muted)" }}>{m.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
