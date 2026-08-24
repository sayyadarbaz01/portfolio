"use client";

import React, { useRef } from "react";
import { useInView } from "@/hooks";
import { Section } from "@/components/ui";
import { experiences } from "@/data/portfolio";
import { Briefcase, Calendar, MapPin, CheckCircle2, Building, Cpu, Zap, ShieldAlert } from "lucide-react";

export function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  return (
    <Section id="experience" title="Engineering Experience & Impact" ref={ref}>
      <div className="space-y-8">
        
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl text-left">
          5+ years of full-stack software development, architectural leadership, and performance engineering in enterprise financial tech.
        </p>

        <div className="space-y-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 text-slate-900 dark:text-slate-100 shadow-sm dark:shadow-none hover:border-slate-400 dark:hover:border-slate-700 transition-colors"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    {exp.position}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-sky-600 dark:text-sky-400 font-mono text-sm font-semibold">
                    <Building className="w-4 h-4" />
                    <span>{exp.company}</span>
                    {exp.client && (
                      <span className="text-slate-500 dark:text-slate-400 text-xs font-normal">
                        ({exp.client})
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 px-3 py-1 rounded-md border border-slate-200 dark:border-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                    {exp.duration}
                  </span>
                  <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 px-3 py-1 rounded-md border border-slate-200 dark:border-slate-800">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Categorized Impact Highlights */}
              {exp.highlightsCategory ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {exp.highlightsCategory.architecture && (
                    <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 rounded-xl p-4 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">
                        <Cpu className="w-4 h-4" /> Architecture & Design
                      </div>
                      <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                        {exp.highlightsCategory.architecture.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-sky-500 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {exp.highlightsCategory.performance && (
                    <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 rounded-xl p-4 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                        <Zap className="w-4 h-4" /> Performance Tuning
                      </div>
                      <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                        {exp.highlightsCategory.performance.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-emerald-500 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {exp.highlightsCategory.aiAndInnovation && (
                    <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 rounded-xl p-4 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">
                        <ShieldAlert className="w-4 h-4" /> AI & Vector Search
                      </div>
                      <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                        {exp.highlightsCategory.aiAndInnovation.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-amber-500 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                /* Standard Bullet List fallback */
                <div className="space-y-2.5">
                  {exp.description.map((desc, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{desc}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Skills Tags */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-1.5">
                {exp.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </Section>
  );
}


