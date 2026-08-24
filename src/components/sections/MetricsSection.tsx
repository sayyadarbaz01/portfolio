"use client";

import React, { useRef } from "react";
import { useInView } from "@/hooks";
import { Section } from "@/components/ui";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Cpu, Zap, Users, Gauge, CheckCircle2 } from "lucide-react";

const metrics = [
  {
    icon: Zap,
    value: 35,
    suffix: "%",
    label: "Analyst Write-Up Time Reduction",
    sublabel: "OpenAI GPT narrative synthesis in KYT platform",
  },
  {
    icon: Cpu,
    value: 40,
    suffix: "%",
    label: "Vector Retrieval Latency Cut",
    sublabel: "MongoDB Atlas Vector Search HNSW indexing",
  },
  {
    icon: Users,
    value: 500,
    suffix: "+",
    label: "Active BFSI Analysts Supported",
    sublabel: "Mission-critical financial compliance environment",
  },
  {
    icon: Gauge,
    value: 50,
    suffix: "%",
    label: "Page Load Speedup (4s → 2s)",
    sublabel: "Redux Toolkit component optimization & memoization",
  },
];

const achievements = [
  "Integrated OpenAI API with custom prompt pipelines for automated transaction risk summaries at Synechron.",
  "Architected Node.js RAG pipeline with MongoDB Atlas Vector Search for semantic compliance document lookup.",
  "Engineered reusable React + TypeScript component design system serving 500+ daily operational users.",
  "Containerized microservices with Docker for zero-downtime staging and production deployment gates.",
  "Honored with 2 consecutive Star Awards (2023 & 2024) at Synechron Technologies for exceptional engineering output.",
];

export function MetricsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  return (
    <Section id="metrics" title="Performance Engineering Benchmarks" ref={ref}>
      <div className="space-y-8">
        
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl text-left">
          Empirical production metrics resulting from architectural refactoring, vector retrieval optimization, and AI workflow integration.
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3 shadow-sm dark:shadow-none hover:border-slate-400 dark:hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                  <Icon className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    METRIC #0{index + 1}
                  </span>
                </div>

                <div>
                  <p className="text-3xl sm:text-4xl font-bold font-mono text-slate-900 dark:text-slate-100">
                    <AnimatedCounter
                      target={metric.value}
                      suffix={metric.suffix}
                      isInView={isInView}
                      delay={index * 0.1}
                    />
                  </p>
                  <p className="font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200 mt-1">
                    {metric.label}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                    {metric.sublabel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Core Technical Deliverables */}
        <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm dark:shadow-none">
          <h3 className="text-sm font-mono text-sky-600 dark:text-sky-400 uppercase tracking-wider font-semibold">
            Verified Technical Accomplishments
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {achievements.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 font-mono text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Section>
  );
}


