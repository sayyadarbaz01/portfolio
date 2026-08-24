"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileDown, Layers, CheckCircle2, MapPin, Terminal, Cpu } from "lucide-react";
import { downloadResume, scrollToSection } from "@/utils/helpers";

const metrics = [
  { value: "5+", label: "Years Professional Experience" },
  { value: "500+", label: "Daily BFSI Compliance Users" },
  { value: "35%", label: "Risk Summary Time Reduction" },
  { value: "40%", label: "Vector Search Retrieval Speedup" },
];

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* ── LEFT: Engineering Value Proposition ── */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Status & Identity Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>SENIOR FULL-STACK ENGINEER & AI/RAG SPECIALIST</span>
            </div>

            {/* Name & Title */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                Arbaz Sayyad
              </h1>
              <p className="text-xl sm:text-2xl font-mono text-sky-600 dark:text-sky-400 font-medium">
                React.js · TypeScript · Node.js · AI & RAG Systems
              </p>
            </div>

            {/* Concise Bio */}
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              Senior Full-Stack Engineer with 5+ years of experience architecting high-throughput enterprise applications, resilient microservices, and AI-assisted workflows for mission-critical BFSI platforms.
            </p>

            {/* High-Density Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-mono text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>BFSI & Compliance Applications</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>OpenAI API & RAG Pipelines</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>MongoDB Atlas Vector Search</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Docker & Zero-Downtime CI/CD</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => scrollToSection("projects")}
                className="px-6 py-3 rounded-lg text-sm font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all flex items-center gap-2 shadow-sm font-mono"
              >
                <Layers className="w-4 h-4" />
                <span>Explore System Architecture</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={downloadResume}
                className="px-5 py-3 rounded-lg text-sm font-mono font-medium border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2"
              >
                <FileDown className="w-4 h-4" />
                <span>Download Resume</span>
              </button>
            </div>

            {/* Quantitative Engineering Metrics Strip */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {metrics.map((m, idx) => (
                <div key={idx}>
                  <p className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-slate-100">{m.value}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-tight">{m.label}</p>
                </div>
              ))}
            </div>

          </div>

          {/* ── RIGHT: Senior Engineering Visual Card ── */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xl text-slate-900 dark:text-slate-100">
              
              {/* Card Window Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-semibold">arbaz_profile.ts</span>
                </div>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  ONLINE
                </span>
              </div>

              {/* Photo Display */}
              <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 mb-4 aspect-square shadow-inner">
                <img
                  src="/profile.jpeg"
                  alt="Arbaz Sayyad — Senior Full-Stack Engineer"
                  className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
                />
                
                {/* Overlay Tech Spec Tag */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1 shadow-md">
                  <div className="flex justify-between text-slate-700 dark:text-slate-300">
                    <span className="text-slate-500 dark:text-slate-400">ROLE:</span>
                    <span className="font-bold text-sky-600 dark:text-sky-400">Senior Full-Stack Engineer</span>
                  </div>
                  <div className="flex justify-between text-slate-700 dark:text-slate-300">
                    <span className="text-slate-500 dark:text-slate-400">LOC:</span>
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                      Pune, India
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-700 dark:text-slate-300">
                    <span className="text-slate-500 dark:text-slate-400">EXP:</span>
                    <span className="font-medium">5+ Years (Synechron & Nexvia)</span>
                  </div>
                </div>
              </div>

              {/* Technical Telemetry Summary */}
              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
                <div className="flex items-center gap-2 text-slate-800 dark:text-slate-300 font-semibold">
                  <Terminal className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                  <span>SYSTEM SPECS</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="text-sky-600 dark:text-sky-400">const</span> stack = [<span className="text-emerald-600 dark:text-emerald-300">&quot;React&quot;</span>, <span className="text-emerald-600 dark:text-emerald-300">&quot;TypeScript&quot;</span>, <span className="text-emerald-600 dark:text-emerald-300">&quot;Node.js&quot;</span>];
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

