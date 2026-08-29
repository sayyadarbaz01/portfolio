"use client";

import React, { useRef } from "react";
import { useInView } from "@/hooks";
import { Section } from "@/components/ui";
import { Shield, Zap, Users, Code2, Cpu, CheckCircle2 } from "lucide-react";

const principles = [
  {
    icon: Code2,
    title: "Clean Modular Systems",
    description: "Designing decoupled React components and TypeScript domain interfaces that remain maintainable as teams grow.",
  },
  {
    icon: Zap,
    title: "Rigorous Performance Audits",
    description: "Systematically reducing bundle size, memoizing expensive computations, and tuning DB vector indexing for sub-200ms speeds.",
  },
  {
    icon: Shield,
    title: "Enterprise Compliance & Security",
    description: "Implementing JWT authentication, RBAC authorization, and data sanitization for mission-critical financial software.",
  },
  {
    icon: Cpu,
    title: "Production AI Workflow Mastery",
    description: "Integrating OpenAI API with custom prompt pipelines and MongoDB Atlas Vector Search for retrieval-augmented generation.",
  },
  {
    icon: Users,
    title: "Cross-Functional Leadership",
    description: "Collaborating with product leads, backend teams, and compliance auditors in fast-paced Agile environments.",
  },
  {
    icon: CheckCircle2,
    title: "Proven Production Impact",
    description: "Track record of delivering 35% analyst workflow speedups and backing enterprise software for 500+ daily operational users.",
  },
];

export function WhyWorkWithMeSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  return (
    <Section id="why-work-with-me" title="Engineering Value & Leadership" ref={ref}>
      <div className="space-y-8">
        
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl text-left">
          Core engineering standards and principles brought to senior development, architectural design, and cross-functional execution.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {principles.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3 shadow-sm dark:shadow-none hover:border-slate-400 dark:hover:border-slate-700 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="font-mono font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Engineering Banner */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-900 dark:text-slate-100 shadow-sm dark:shadow-none">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-mono font-bold text-base text-slate-900 dark:text-slate-100">
              Ready to Architect & Scale Your Platform?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
              Open for Senior Full-Stack, Tech Lead, and AI Integration positions.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-[11px] font-mono">
            <span className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sky-700 dark:text-sky-400 font-semibold">
              ✔ Full-Time Senior Roles
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-emerald-700 dark:text-emerald-400 font-semibold">
              ✔ Architecture Consulting
            </span>
          </div>
        </div>

      </div>
    </Section>
  );
}


