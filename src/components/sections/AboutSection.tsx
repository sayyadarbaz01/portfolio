"use client";

import React, { useRef } from "react";
import { Section } from "@/components/ui";
import { Reveal, SpotlightCard } from "@/components/ui/Motion";
import { Cpu, Zap, Shield, Layers } from "lucide-react";

const principles = [
  {
    icon: Cpu,
    title: "Frontend Architecture & Systems",
    description: "Designing responsive, accessible (WCAG 2.1) React/TypeScript design systems cutting component overhead by 25%.",
  },
  {
    icon: Zap,
    title: "Backend & Microservices Gateway",
    description: "Building event-driven Node.js REST API gateways with JWT, RBAC, Docker containerization, and automated CI/CD pipelines.",
  },
  {
    icon: Shield,
    title: "AI & RAG Integration",
    description: "Vectorizing text narratives with OpenAI API prompt engineering and MongoDB Atlas Vector Search for automated summaries.",
  },
  {
    icon: Layers,
    title: "Empirical Performance",
    description: "Cutting initial page load times from 4.0s to 2.0s (50% speedup) and policy retrieval latency by 40% for 500+ daily users.",
  },
];

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);

  return (
    <Section id="about" eyebrow="About" title="Engineering Overview & Background" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column: Narrative */}
        <Reveal className="lg:col-span-6 space-y-5 text-left">
          <h3 className="font-display text-2xl sm:text-3xl font-semibold" style={{ color: "var(--text-primary)" }}>
            Full Stack Developer · 3+ YOE
          </h3>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            I specialize in building production-grade web applications, microservices, and intelligent AI workflows. Over 3+ YOE at Synechron Technologies, I have led technical implementations for high-concurrency compliance platforms supporting 500+ daily financial analysts.
          </p>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            My technical expertise spans frontend architecture (React.js, TypeScript, Redux, MUI, Tailwind, WCAG 2.1), backend microservices (Node.js, Express, REST APIs, MongoDB, SQL, JWT, RBAC, Docker, CI/CD), and generative AI integration (OpenAI API, RAG, Vector Search, Prompt Engineering).
          </p>

          <div
            className="p-5 rounded-2xl space-y-2"
            style={{
              backgroundColor: "var(--bg-elevated)",
              color: "var(--text-secondary)",
            }}
          >
            <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Philosophy</p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              &quot;Write clean, deterministic code. Optimize for readability, measurable performance metrics (4s→2s load times), and resilient system boundaries.&quot;
            </p>
          </div>
        </Reveal>

        {/* Right Column: Principles Grid */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {principles.map((p, idx) => {
            const Icon = p.icon;
            return (
              <Reveal key={idx} delay={idx * 0.06}>
                <SpotlightCard className="p-5 space-y-2.5 h-full">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: "rgba(15, 118, 110, 0.1)",
                      border: "1px solid rgba(15, 118, 110, 0.22)",
                      color: "var(--accent-teal)",
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-mono font-bold text-xs sm:text-sm" style={{ color: "var(--text-primary)" }}>
                    {p.title}
                  </h4>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {p.description}
                  </p>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>

      </div>
    </Section>
  );
}
