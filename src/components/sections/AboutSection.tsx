"use client";

import React, { useRef } from "react";
import { useInView } from "@/hooks";
import { Section } from "@/components/ui";
import { Cpu, Zap, Shield, Layers, Users } from "lucide-react";

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
  const isInView = useInView(ref);

  return (
    <Section id="about" title="Engineering Overview & Background" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Narrative */}
        <div className="lg:col-span-6 space-y-5 text-left">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Full Stack Developer · 3+ YOE
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            I specialize in building production-grade web applications, microservices, and intelligent AI workflows. Over 3+ YOE at Synechron Technologies, I have led technical implementations for high-concurrency compliance platforms supporting 500+ daily financial analysts.
          </p>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            My technical expertise spans frontend architecture (React.js, TypeScript, Redux, MUI, Tailwind, WCAG 2.1), backend microservices (Node.js, Express, REST APIs, MongoDB, SQL, JWT, RBAC, Docker, CI/CD), and generative AI integration (OpenAI API, RAG, Vector Search, Prompt Engineering).
          </p>

          <div className="p-4 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2 font-mono text-xs text-slate-700 dark:text-slate-300">
            <p className="text-sky-600 dark:text-sky-400 font-bold uppercase tracking-wider">Engineering Philosophy</p>
            <p className="text-slate-700 dark:text-slate-300">
              &quot;Write clean, deterministic code. Optimize for readability, measurable performance metrics (4s→2s load times), and resilient system boundaries.&quot;
            </p>
          </div>
        </div>

        {/* Right Column: Principles Grid */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {principles.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2 shadow-sm dark:shadow-none hover:border-slate-400 dark:hover:border-slate-700 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="font-mono font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                  {p.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </Section>
  );
}


