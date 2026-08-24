"use client";

import React, { useRef } from "react";
import { useInView } from "@/hooks";
import { Section } from "@/components/ui";
import { Cpu, Zap, Shield, Layers, Users } from "lucide-react";

const principles = [
  {
    icon: Cpu,
    title: "Full-Stack Architecture",
    description: "Building scalable single-page applications and event-driven Node.js microservices with strict TypeScript interfaces.",
  },
  {
    icon: Zap,
    title: "Performance Engineering",
    description: "Optimizing bundle splitting, component memoization, and database vector indexing to achieve sub-200ms latency.",
  },
  {
    icon: Shield,
    title: "Enterprise BFSI Governance",
    description: "Designing audit-compliant transaction monitoring and risk triage workflows for financial institutions like U.S. Bank.",
  },
  {
    icon: Layers,
    title: "AI & RAG Integration",
    description: "Vectorizing text narratives with OpenAI embeddings & MongoDB Atlas Vector Search for retrieval-augmented generation.",
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
            Senior Full-Stack Developer · 5+ Years Experience
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            I specialize in building production-grade web applications, microservices, and intelligent AI workflows. Over 5+ years at Synechron and Nexvia, I have led technical implementations for high-concurrency compliance platforms supporting 500+ daily financial analysts.
          </p>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            My core focus spans React/TypeScript frontend architecture, Node.js API gateways, Docker containerization, and integrating generative AI with custom RAG pipelines.
          </p>

          <div className="p-4 bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2 font-mono text-xs text-slate-700 dark:text-slate-300">
            <p className="text-sky-600 dark:text-sky-400 font-bold uppercase tracking-wider">Engineering Philosophy</p>
            <p className="text-slate-700 dark:text-slate-300">
              &quot;Write clean, deterministic code. Optimize for readability, measurable performance metrics, and resilient system boundaries.&quot;
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
                className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2 shadow-sm dark:shadow-none hover:border-slate-400 dark:hover:border-slate-700 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="font-mono font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                  {p.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
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


