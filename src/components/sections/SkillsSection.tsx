"use client";

import React, { useRef } from "react";
import { useInView } from "@/hooks";
import { Section } from "@/components/ui";
import { skills } from "@/data/portfolio";
import { Cpu, Layout, Server, Database, CheckCircle2 } from "lucide-react";

const domainCategories = [
  {
    key: "frontend",
    title: "Frontend Architecture",
    icon: Layout,
    color: "text-blue-500",
    borderColor: "border-blue-500/20",
    bgBadge: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
  },
  {
    key: "backend",
    title: "Backend & Microservices Gateway",
    icon: Server,
    color: "text-indigo-500",
    borderColor: "border-indigo-500/20",
    bgBadge: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20",
  },
  {
    key: "ai",
    title: "AI Systems, RAG & Vector Search",
    icon: Cpu,
    color: "text-sky-500",
    borderColor: "border-sky-500/20",
    bgBadge: "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20",
  },
];


export function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  return (
    <Section id="skills" title="Technical Architecture & Skills Matrix" ref={ref}>
      <div className="space-y-8">
        
        {/* Section Subhead */}
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl text-left">
          Core technical matrix honed across 3+ YOE of full-stack software development, performance engineering, and enterprise AI microservice integration.
        </p>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {domainCategories.map((domain) => {
            const domainSkills = skills.filter((s) => s.category === domain.key);
            const Icon = domain.icon;

            if (domainSkills.length === 0) return null;

            return (
              <div
                key={domain.key}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm dark:shadow-none"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-5 h-5 ${domain.color}`} />
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 font-mono">
                      {domain.title}
                    </h3>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${domain.bgBadge}`}>
                    {domainSkills.length} Core Stack
                  </span>
                </div>

                {/* Skill List */}
                <div className="space-y-3">
                  {domainSkills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 flex flex-col gap-1 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-200 font-mono">
                          {skill.name}
                        </span>
                        {skill.proficiency && (
                          <span className="text-[10px] font-mono text-slate-600 dark:text-slate-300 font-medium">
                            {skill.proficiency}%
                          </span>
                        )}
                      </div>

                      {/* Production Callout */}
                      {skill.highlight && (
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1.5 leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                          <span>{skill.highlight}</span>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </Section>
  );
}


