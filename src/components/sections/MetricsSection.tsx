"use client";

import React, { useRef } from "react";
import { useInView } from "@/hooks";
import { Section } from "@/components/ui";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Reveal, SpotlightCard } from "@/components/ui/Motion";
import { Cpu, Zap, Gauge, Layers, CheckCircle2 } from "lucide-react";

const metrics = [
  {
    icon: Gauge,
    value: 50,
    suffix: "%",
    label: "Page Load Speedup (4s → 2s)",
    sublabel: "Route code splitting, lazy loading & memoized selectors",
  },
  {
    icon: Layers,
    value: 25,
    suffix: "%",
    label: "Dev Overhead Reduction",
    sublabel: "Reusable React + TypeScript component design system",
  },
  {
    icon: Zap,
    value: 35,
    suffix: "%",
    label: "Analyst Write-Up Time Cut",
    sublabel: "OpenAI GPT prompt completions & automated risk summaries",
  },
  {
    icon: Cpu,
    value: 40,
    suffix: "%",
    label: "Vector Retrieval Speedup",
    sublabel: "MongoDB Atlas Vector Search HNSW indexing & RAG",
  },
];

const achievements = [
  "Engineered reusable TypeScript + MUI design system reducing component development overhead by 25%.",
  "Optimized bundle size and component rendering tree, cutting initial page load speed from 4.0s to 2.0s (50% speedup).",
  "Integrated OpenAI API with custom prompt pipelines for automated transaction risk summaries, cutting analyst write-up time by 35%.",
  "Architected Node.js RAG pipeline with MongoDB Atlas Vector Search HNSW index, boosting policy retrieval speed by 40%.",
  "Supported 500+ daily operational compliance analysts in mission-critical enterprise environments.",
  "Honored with 2 consecutive Star Awards (2023 & 2024) at Synechron Technologies for performance & technical innovation.",
];

export function MetricsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  return (
    <Section id="metrics" eyebrow="Impact" title="Performance Engineering Benchmarks" ref={ref}>
      <div className="space-y-8">

        <Reveal>
          <p className="text-sm sm:text-base max-w-2xl text-left" style={{ color: "var(--text-secondary)" }}>
            Empirical production metrics resulting from architectural refactoring, vector retrieval optimization, and AI workflow integration.
          </p>
        </Reveal>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Reveal key={index} delay={index * 0.06}>
                <SpotlightCard className="p-5 space-y-3 h-full">
                  <Icon className="w-4 h-4" style={{ color: "var(--text-muted)" }} />

                  <div>
                    <p className="font-display font-semibold text-metric-fluid tabular-nums" style={{ color: "var(--text-primary)" }}>
                      <AnimatedCounter
                        target={metric.value}
                        suffix={metric.suffix}
                        isInView={isInView}
                        delay={index * 0.1}
                      />
                    </p>
                    <p className="font-medium text-sm mt-2" style={{ color: "var(--text-primary)" }}>
                      {metric.label}
                    </p>
                    <p className="text-[13px] mt-1 leading-snug" style={{ color: "var(--text-muted)" }}>
                      {metric.sublabel}
                    </p>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>

        {/* Core Technical Deliverables */}
        <Reveal>
          <div className="theme-card p-6 space-y-4">
            <h3 className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
              Verified Technical Accomplishments
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm" style={{ color: "var(--text-secondary)" }}>
              {achievements.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl"
                  style={{ backgroundColor: "var(--bg-elevated)" }}
                >
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--text-muted)" }} />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

      </div>
    </Section>
  );
}
