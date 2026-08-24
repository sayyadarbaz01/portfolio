"use client";

import React, { useRef } from "react";
import { useInView } from "@/hooks";
import { Section } from "@/components/ui";
import { projects } from "@/data/portfolio";
import { Globe, Check } from "lucide-react";

export function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  return (
    <Section id="projects" title="Featured Projects" ref={ref}>
      <div className="space-y-8">
        
        {/* Section Lead */}
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl text-left">
          Key enterprise and commercial systems developed for financial risk compliance and retail POS operations.
        </p>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden flex flex-col shadow-sm dark:shadow-none hover:border-slate-400 dark:hover:border-slate-700 transition-all duration-200"
            >
              {/* Project Image Preview */}
              {project.image && (
                <div className="relative aspect-video bg-slate-100 dark:bg-slate-950 overflow-hidden border-b border-slate-200 dark:border-slate-800">
                  <img
                    src={project.image}
                    alt={`${project.title} Preview`}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-md border border-slate-300 dark:border-slate-800 text-[11px] font-mono text-sky-600 dark:text-sky-400 uppercase tracking-wider font-semibold">
                    {project.category}
                  </div>
                </div>
              )}

              {/* Card Content */}
              <div className="p-6 space-y-5 flex-1 flex flex-col">
                <div>
                  <div className="inline-block px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/20 text-[10px] font-mono uppercase tracking-wider font-semibold mb-3">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 font-sans">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Highlights */}
                {project.highlights && (
                  <div className="space-y-2 py-3 border-y border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 font-mono">
                    {project.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-800 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                {project.website_link && (
                  <div className="pt-2">
                    <a
                      href={project.website_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>

      </div>
    </Section>
  );
}


