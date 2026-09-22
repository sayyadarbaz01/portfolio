"use client";

import React, { useRef } from "react";
import { Section } from "@/components/ui";
import { Reveal, SpotlightCard } from "@/components/ui/Motion";
import { Calendar, MapPin, CheckCircle2, Building, Cpu, Zap, ShieldAlert } from "lucide-react";

import { experiences } from "@/data/portfolio";

export function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);

  return (
    <Section id="experience" eyebrow="04 / Experience" title="Engineering Experience & Impact" ref={ref}>
      <div className="space-y-8">

        <Reveal>
          <p className="text-sm sm:text-base max-w-2xl text-left" style={{ color: "var(--text-secondary)" }}>
            3+ YOE of full-stack software development, architectural leadership, and performance engineering in enterprise platforms.
          </p>
        </Reveal>

        {/* Vertical timeline */}
        <div className="relative pl-8 sm:pl-10" style={{ borderLeft: "2px solid var(--card-border)", marginLeft: "7px" }}>
          {experiences.map((exp) => (
            <Reveal key={exp.id}>
              <div className="relative">
                {/* Teal timeline node */}
                <span
                  className="absolute top-8 rounded-full"
                  style={{
                    left: "-2.55rem",
                    width: "15px",
                    height: "15px",
                    backgroundColor: "var(--accent-teal)",
                    boxShadow: "0 0 0 4px rgba(15, 118, 110, 0.15)",
                  }}
                  aria-hidden="true"
                />
                <SpotlightCard className="p-6 sm:p-8 space-y-6">
                  {/* Header */}
                  <div
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5"
                    style={{ borderBottom: "1px solid var(--card-border)" }}
                  >
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>
                        {exp.position}
                      </h3>
                      <div className="flex items-center gap-2 mt-1.5 font-mono text-sm font-semibold" style={{ color: "var(--accent-teal)" }}>
                        <Building className="w-4 h-4" />
                        <span>{exp.company}</span>
                        {exp.client && (
                          <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                            ({exp.client})
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
                      <span
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-medium"
                        style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--card-border)" }}
                      >
                        <Calendar className="w-3.5 h-3.5" style={{ color: "var(--accent-teal)" }} />
                        {exp.duration}
                      </span>
                      <span
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-medium"
                        style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--card-border)" }}
                      >
                        <MapPin className="w-3.5 h-3.5" style={{ color: "var(--accent-emerald)" }} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Categorized Impact Highlights */}
                  {exp.highlightsCategory ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {exp.highlightsCategory.architecture && (
                        <div className="rounded-2xl p-4 space-y-2.5 border" style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--card-border)" }}>
                          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase" style={{ color: "var(--accent-teal)" }}>
                            <Cpu className="w-4 h-4" /> Architecture & Design
                          </div>
                          <ul className="space-y-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                            {exp.highlightsCategory.architecture.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span style={{ color: "var(--accent-teal)" }} className="font-bold">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {exp.highlightsCategory.performance && (
                        <div className="rounded-2xl p-4 space-y-2.5 border" style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--card-border)" }}>
                          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase" style={{ color: "var(--accent-emerald)" }}>
                            <Zap className="w-4 h-4" /> Performance Tuning
                          </div>
                          <ul className="space-y-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                            {exp.highlightsCategory.performance.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span style={{ color: "var(--accent-emerald)" }} className="font-bold">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {exp.highlightsCategory.aiAndInnovation && (
                        <div className="rounded-2xl p-4 space-y-2.5 border" style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--card-border)" }}>
                          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase" style={{ color: "var(--accent-teal)" }}>
                            <ShieldAlert className="w-4 h-4" /> AI & Vector Search
                          </div>
                          <ul className="space-y-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                            {exp.highlightsCategory.aiAndInnovation.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span style={{ color: "var(--accent-teal)" }} className="font-bold">•</span>
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
                        <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm" style={{ color: "var(--text-secondary)" }}>
                          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--accent-emerald)" }} />
                          <span>{desc}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Skills Tags */}
                  <div className="pt-4 flex flex-wrap gap-1.5" style={{ borderTop: "1px solid var(--card-border)" }}>
                    {exp.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-full text-[11px] font-mono border font-medium"
                        style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--card-border)", color: "var(--text-secondary)" }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </Section>
  );
}
