"use client";

import React, { useRef, useState } from "react";
import { Section } from "@/components/ui";
import { projects } from "@/data/portfolio";
import { Project } from "@/types";
import { ArchitectureModal } from "./ArchitectureModal";
import { Reveal, SpotlightCard } from "@/components/ui/Motion";
import {
  ExternalLink,
  Cpu,
  Check,
  Sparkles,
  Shield,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

function ProjectActions({
  project,
  onArch,
}: {
  project: Project;
  onArch: (p: Project) => void;
}) {
  const hasLiveDemo = Boolean(project.website_link);
  const hasArch = Boolean(project.architectureDetails);
  const hasRepo = Boolean(project.github);

  return (
    <div
      className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3"
      style={{ borderTop: "1px solid var(--card-border)" }}
    >
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
        {hasLiveDemo && (
          <a
            href={project.website_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-mono font-semibold text-white transition-all active:scale-[0.98] group"
            style={{ backgroundColor: "var(--accent-teal)" }}
            aria-label={`Open live web application for ${project.title}`}
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        )}

        {hasArch && (
          <button
            onClick={() => onArch(project)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-mono font-semibold border transition-all active:scale-[0.98]"
            style={{
              backgroundColor: "var(--bg-elevated)",
              color: "var(--text-primary)",
              borderColor: "var(--card-border)",
            }}
            aria-label={`View system architecture modal for ${project.title}`}
          >
            <Cpu className="w-3.5 h-3.5" style={{ color: "var(--accent-teal)" }} />
            <span>System Architecture</span>
          </button>
        )}

        {hasRepo && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-mono font-semibold border transition-all active:scale-[0.98]"
            style={{
              backgroundColor: "transparent",
              color: "var(--text-secondary)",
              borderColor: "var(--card-border)",
            }}
            aria-label={`View source code for ${project.title}`}
          >
            <FaGithub className="w-3.5 h-3.5" />
            <span>Source</span>
          </a>
        )}
      </div>

      {hasLiveDemo && (
        <a
          href={project.website_link}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1 text-[11px] font-mono transition-colors"
          style={{ color: "var(--text-muted)" }}
        >
          <span>taxflow-tc.vercel.app</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>
      )}
    </div>
  );
}

export function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [flagship, ...rest] = projects;

  return (
    <Section id="projects" eyebrow="Projects" title="Featured Projects" ref={ref}>
      <div className="space-y-8">
        {/* Section Lead */}
        <Reveal>
          <p className="text-sm sm:text-base max-w-2xl text-left" style={{ color: "var(--text-secondary)" }}>
            Flagship multi-tenant SaaS platforms and enterprise distributed systems built for statutory compliance, financial risk monitoring, and practice automation.
          </p>
        </Reveal>

        {/* Flagship feature card */}
        {flagship && (
          <Reveal>
            <SpotlightCard className="relative overflow-hidden flex flex-col">
              {/* Teal accent bar */}
              <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, var(--accent-teal-deep), var(--accent-teal), var(--accent-emerald))" }} />

              <div className="p-5 sm:p-8 md:p-10 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-wider font-semibold border"
                        style={{
                          backgroundColor: "rgba(15, 118, 110, 0.08)",
                          color: "var(--accent-teal)",
                          borderColor: "rgba(15, 118, 110, 0.25)",
                        }}
                      >
                        <Sparkles className="w-3 h-3" />
                        {flagship.category}
                      </span>

                          {flagship.website_link ? (
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium border"
                          style={{
                            backgroundColor: "rgba(4, 120, 87, 0.08)",
                            borderColor: "rgba(4, 120, 87, 0.25)",
                            color: "var(--accent-emerald)",
                          }}
                        >
                          <span className="inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                          Live
                        </span>
                      ) : (
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-medium border"
                          style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--card-border)", color: "var(--text-muted)" }}
                        >
                          <Shield className="w-3 h-3" />
                          Enterprise Client
                        </span>
                      )}
                    </div>

                    <span className="hidden sm:inline-block text-[11px] font-mono" style={{ color: "var(--text-muted)" }}>
                      CA Practice Automation SaaS
                    </span>
                  </div>

                  {/* Serif flagship title */}
                  <h3 className="font-display font-semibold text-flagship-fluid tracking-tight" style={{ color: "var(--text-primary)" }}>
                    {flagship.title}
                  </h3>

                  <p className="text-xs sm:text-[15px] leading-relaxed max-w-3xl" style={{ color: "var(--text-secondary)" }}>
                    {flagship.description}
                  </p>
                </div>

                {flagship.highlights && flagship.highlights.length > 0 && (
                  <div
                    className="rounded-2xl p-4 sm:p-5 space-y-3 text-xs sm:text-sm"
                    style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--card-border)", color: "var(--text-secondary)" }}
                  >
                    <div className="text-[11px] font-mono uppercase tracking-wider font-semibold mb-1 flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
                      <Layers className="w-3.5 h-3.5" style={{ color: "var(--accent-teal)" }} />
                      <span>Key Engineering &amp; Compliance Highlights</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
                      {flagship.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2 leading-relaxed">
                          <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--accent-emerald)" }} />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider font-medium" style={{ color: "var(--text-faint)" }}>
                    Technologies &amp; Architecture
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {flagship.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono border font-medium transition-colors"
                        style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--card-border)", color: "var(--text-secondary)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <ProjectActions project={flagship} onArch={setSelectedProject} />
              </div>
            </SpotlightCard>
          </Reveal>
        )}

        {/* Compact enterprise cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {rest.map((project, index) => {
            const hasLiveDemo = Boolean(project.website_link);
            return (
              <Reveal key={project.id} delay={index * 0.08}>
                <SpotlightCard className="relative overflow-hidden flex flex-col h-full">
                  <div className="p-5 sm:p-6 space-y-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-wider font-semibold border"
                          style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--card-border)", color: "var(--text-secondary)" }}
                        >
                          {project.category}
                        </span>

                        {hasLiveDemo ? (
                          <span
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium border"
                            style={{
                              backgroundColor: "rgba(4, 120, 87, 0.08)",
                              borderColor: "rgba(4, 120, 87, 0.25)",
                              color: "var(--accent-emerald)",
                            }}
                          >
                            <span className="inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                            Live
                          </span>
                        ) : (
                          <span
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-mono font-medium border"
                            style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--card-border)", color: "var(--text-muted)" }}
                          >
                            <Shield className="w-3 h-3" />
                            Enterprise Client
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        {project.description}
                      </p>
                    </div>

                    {project.highlights && project.highlights.length > 0 && (
                      <div
                        className="rounded-xl p-3.5 space-y-2.5 text-xs sm:text-[13px]"
                        style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--card-border)", color: "var(--text-secondary)" }}
                      >
                        <div className="text-[11px] font-mono uppercase tracking-wider font-semibold flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
                          <Layers className="w-3.5 h-3.5" style={{ color: "var(--accent-teal)" }} />
                          <span>Key Engineering &amp; Compliance Highlights</span>
                        </div>
                        <div className="space-y-2">
                          {project.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-start gap-2 leading-relaxed">
                              <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--accent-emerald)" }} />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="text-[11px] font-mono uppercase tracking-wider font-medium" style={{ color: "var(--text-faint)" }}>
                        Technologies &amp; Architecture
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-mono border font-medium transition-colors"
                            style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--card-border)", color: "var(--text-secondary)" }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <ProjectActions project={project} onArch={setSelectedProject} />
                  </div>
                </SpotlightCard>
              </Reveal>
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
