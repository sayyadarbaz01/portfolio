"use client";

import React, { useRef } from "react";
import { useInView } from "@/hooks";
import { Section } from "@/components/ui";
import { downloadResume } from "@/utils/helpers";
import { socialLinks } from "@/data/portfolio";
import { Check, Download, Mail, ExternalLink, ShieldCheck } from "lucide-react";

const summary = [
  "Full Stack Developer (3+ YOE Professional Experience)",
  "Frontend Architecture: React.js, TypeScript, Redux Toolkit, MUI, Tailwind, WCAG 2.1, Code Splitting",
  "Backend & Microservices: Node.js, Express.js, REST APIs, MongoDB, SQL, JWT, RBAC, Docker, CI/CD",
  "AI Integration & RAG: OpenAI API, RAG Architecture, MongoDB Vector Search, Prompt Engineering",
  "Verified Performance: 4s→2s Page Load Speedup (50%) & 25% Dev Overhead Reduction",
  "Enterprise Impact: 35% Analyst Time Cut, 40% Retrieval Speedup & 500+ Active Users",
];

const quickFacts = [
  { label: "Experience Level", value: "3+ YOE (Full Stack Developer)" },
  { label: "Technical Domain", value: "Full Stack Web & AI Systems" },
  { label: "Location", value: "Pune, India (Open to Remote)" },
  { label: "Role Availability", value: "Open for Full Stack / Lead Roles" },
  { label: "Core Stack", value: "React, TypeScript, Node.js, AI/RAG" },
];

export function RecruiterSummarySection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  return (
    <Section id="recruiter-summary" title="Recruiter Executive Summary" ref={ref}>
      <div className="space-y-6">
        
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl text-left">
          High-density summary of qualifications, technical stack, and availability for talent acquisition and engineering leads.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Profile & Qualifications */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6 text-slate-900 dark:text-slate-100 flex flex-col justify-between shadow-sm dark:shadow-none">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-950 font-mono font-bold text-slate-900 dark:text-slate-100 flex items-center justify-center border border-slate-300 dark:border-slate-700">
                    AS
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 font-mono">
                      Arbaz Sayyad
                    </h3>
                    <p className="text-xs text-sky-600 dark:text-sky-400 font-mono font-semibold">
                      Full Stack Developer (3+ YOE)
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                  🟢 Available Now
                </span>
              </div>

              {/* Checklist */}
              <div className="space-y-2.5 font-mono text-xs text-slate-700 dark:text-slate-300">
                {summary.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-3">
              <button
                onClick={downloadResume}
                className="flex-1 py-2.5 px-4 rounded-lg text-xs font-mono font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Verified CV</span>
              </button>
              <a
                href={`mailto:${socialLinks.email}`}
                className="py-2.5 px-4 rounded-lg text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Direct Email</span>
              </a>
            </div>
          </div>

          {/* Quick Facts & Direct Channels */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6 text-slate-900 dark:text-slate-100 flex flex-col justify-between shadow-sm dark:shadow-none">
            <div className="space-y-4">
              <h4 className="font-mono text-xs text-sky-600 dark:text-sky-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-3 font-semibold">
                Operational Overview
              </h4>

              <div className="divide-y divide-slate-200 dark:divide-slate-800/80 font-mono text-xs">
                {quickFacts.map((fact, idx) => (
                  <div key={idx} className="py-2.5 flex justify-between items-center text-slate-700 dark:text-slate-300">
                    <span className="text-slate-600 dark:text-slate-300 font-medium">{fact.label}:</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{fact.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Links */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2 text-xs font-mono">
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sky-600 dark:text-sky-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 font-medium"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>LinkedIn Profile</span>
              </a>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 font-medium"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>GitHub Repos</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </Section>
  );
}


