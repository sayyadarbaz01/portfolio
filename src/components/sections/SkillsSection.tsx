"use client";

import React, { useRef } from "react";
import { useInView } from "@/hooks";
import { Section } from "@/components/ui";
import { Reveal, SpotlightCard } from "@/components/ui/Motion";
import { skills } from "@/data/portfolio";
import { Cpu, Layout, Server, CheckCircle2 } from "lucide-react";

const domainCategories = [
  {
    key: "frontend",
    title: "Frontend Architecture",
    icon: Layout,
  },
  {
    key: "backend",
    title: "Backend & Microservices Gateway",
    icon: Server,
  },
  {
    key: "ai",
    title: "AI Systems, RAG & Vector Search",
    icon: Cpu,
  },
];


export function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  return (
    <Section id="skills" eyebrow="02 / Skills" title="Technical Architecture & Skills Matrix" ref={ref}>
      <div className="space-y-8">

        {/* Section Subhead */}
        <Reveal>
          <p className="text-sm sm:text-base max-w-2xl text-left" style={{ color: "var(--text-secondary)" }}>
            Core technical matrix honed across 3+ YOE of full-stack software development, performance engineering, and enterprise AI microservice integration.
          </p>
        </Reveal>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {domainCategories.map((domain, dIdx) => {
            const domainSkills = skills.filter((s) => s.category === domain.key);
            const Icon = domain.icon;

            if (domainSkills.length === 0) return null;

            return (
              <Reveal key={domain.key} delay={dIdx * 0.08}>
                <SpotlightCard className="p-6 space-y-4 h-full">
                  {/* Header */}
                  <div
                    className="flex items-center justify-between pb-4"
                    style={{ borderBottom: "1px solid var(--card-border)" }}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-5 h-5" style={{ color: "var(--accent-teal)" }} />
                      <h3 className="font-bold text-sm sm:text-base font-mono" style={{ color: "var(--text-primary)" }}>
                        {domain.title}
                      </h3>
                    </div>
                    <span
                      className="px-2.5 py-1 rounded-full text-[10px] font-mono border"
                      style={{
                        backgroundColor: "rgba(15, 118, 110, 0.08)",
                        color: "var(--accent-teal)",
                        borderColor: "rgba(15, 118, 110, 0.22)",
                      }}
                    >
                      {domainSkills.length} Core Stack
                    </span>
                  </div>

                  {/* Skill List with proficiency bars */}
                  <div className="space-y-4">
                    {domainSkills.map((skill, idx) => (
                      <div key={idx} className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs sm:text-sm font-mono" style={{ color: "var(--text-primary)" }}>
                            {skill.name}
                          </span>
                          {skill.proficiency && (
                            <span className="text-[10px] font-mono font-medium" style={{ color: "var(--text-muted)" }}>
                              {skill.proficiency}%
                            </span>
                          )}
                        </div>

                        {/* Animated teal proficiency bar */}
                        {skill.proficiency && (
                          <div className="proficiency-track" role="progressbar" aria-valuenow={skill.proficiency} aria-valuemin={0} aria-valuemax={100} aria-label={`${skill.name} proficiency`}>
                            <div
                              className="proficiency-fill"
                              style={{ width: isInView ? `${skill.proficiency}%` : "0%", transitionDelay: `${idx * 60}ms` }}
                            />
                          </div>
                        )}

                        {/* Production Callout */}
                        {skill.highlight && (
                          <p className="text-[11px] flex items-center gap-1.5 leading-snug" style={{ color: "var(--text-muted)" }}>
                            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--accent-emerald)" }} />
                            <span>{skill.highlight}</span>
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>

      </div>
    </Section>
  );
}
