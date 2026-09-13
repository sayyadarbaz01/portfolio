"use client";

import React, { useRef, useState } from "react";
import { useInView } from "@/hooks";
import { Section } from "@/components/ui";
import { projects } from "@/data/portfolio";
import { Project } from "@/types";
import { ArchitectureModal } from "./ArchitectureModal";
import {
  ExternalLink,
  Cpu,
  Check,
  Sparkles,
  Shield,
  Layers,
  ArrowUpRight,
} from "lucide-react";

export function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <Section id="projects" title="Featured Projects" ref={ref}>
      <div className="space-y-8">
        {/* Section Lead */}
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl text-left">
          Flagship multi-tenant SaaS platforms and enterprise distributed systems built for statutory compliance, financial risk monitoring, and practice automation.
        </p>

        {/* Projects List / Grid */}
        <div className="space-y-8">
          {projects.map((project, index) => {
            const isFlagship = project.id === "taxflow" || index === 0;
            const hasLiveDemo = Boolean(project.website_link);
            const hasArch = Boolean(project.architectureDetails);

            return (
              <div
                key={project.id}
                className={`relative bg-white dark:bg-slate-900/90 rounded-2xl overflow-hidden transition-all duration-300 border flex flex-col ${
                  isFlagship
                    ? "border-sky-500/40 dark:border-sky-500/30 shadow-md shadow-sky-500/5 hover:border-sky-500/60 dark:hover:border-sky-400/50"
                    : "border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none hover:border-slate-400 dark:hover:border-slate-700"
                }`}
              >
                {/* Top Flagship Accent Bar */}
                {isFlagship && (
                  <div className="h-1 w-full bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500" />
                )}

                {/* Card Content Wrapper */}
                <div className="p-4 sm:p-6 md:p-8 space-y-6 flex-1 flex flex-col justify-between">
                  {/* Header Meta & Title */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2.5">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Category Badge */}
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-mono uppercase tracking-wider font-semibold ${
                            isFlagship
                              ? "bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/20"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                          }`}
                        >
                          {isFlagship && <Sparkles className="w-3 h-3 text-sky-500" />}
                          {project.category}
                        </span>

                        {/* Live / Status Indicator */}
                        {hasLiveDemo ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-400 text-[10px] sm:text-xs font-mono font-medium">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Live Production
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-400 text-[10px] sm:text-xs font-mono font-medium">
                            <Shield className="w-3 h-3 text-slate-500" />
                            Enterprise Client
                          </span>
                        )}
                      </div>

                      {/* Flagship quick tag */}
                      {isFlagship && (
                        <span className="hidden sm:inline-block text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          CA Practice Automation SaaS
                        </span>
                      )}
                    </div>

                    {/* Project Title */}
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 font-sans tracking-tight">
                      {project.title}
                    </h3>

                    {/* Project Description */}
                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Highlights Grid / Checklist */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="rounded-xl bg-slate-50/80 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800/80 p-3 sm:p-4 space-y-2.5 text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 font-sans">
                      <div className="text-[11px] font-mono uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-sky-500" />
                        <span>Key Engineering &amp; Compliance Highlights</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-2.5">
                        {project.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-2 leading-relaxed">
                            <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech Tags */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-medium">
                      Technologies &amp; Architecture
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-[11px] font-mono bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 font-medium hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Buttons (Responsive for all screen sizes) */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
                      {/* Live Demo Button */}
                      {hasLiveDemo && (
                        <a
                          href={project.website_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-semibold bg-sky-600 hover:bg-sky-500 text-white dark:bg-sky-500 dark:hover:bg-sky-400 dark:text-slate-950 shadow-sm shadow-sky-500/20 hover:shadow-md transition-all active:scale-[0.98] group"
                          aria-label={`Open live web application for ${project.title}`}
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                      )}

                      {/* System Architecture Button */}
                      {hasArch && (
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/90 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-all active:scale-[0.98]"
                          aria-label={`View system architecture modal for ${project.title}`}
                        >
                          <Cpu className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                          <span>System Architecture</span>
                        </button>
                      )}
                    </div>

                    {/* Direct link label */}
                    {hasLiveDemo && (
                      <a
                        href={project.website_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                      >
                        <span>taxflow-tc.vercel.app</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Architecture Deep Dive Modal */}
      <ArchitectureModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </Section>
  );
}


