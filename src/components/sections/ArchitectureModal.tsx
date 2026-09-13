"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cpu, GitBranch, ShieldCheck, Gauge, Layers } from "lucide-react";
import { Project } from "@/types";

interface ArchitectureModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ArchitectureModal({ project, onClose }: ArchitectureModalProps) {
  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  const { overview, systemFlow, keyComponents, metrics, tradeoffs } =
    project?.architectureDetails || {};

  return (
    <AnimatePresence>
      {project && project.architectureDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto text-slate-100 max-h-[92vh] sm:max-h-[90vh] flex flex-col"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="flex items-start sm:items-center justify-between px-4 py-3.5 sm:px-6 sm:py-4 border-b border-slate-800 bg-slate-900/95 backdrop-blur-sm sticky top-0 z-20 gap-3">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex-shrink-0">
                  <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-lg font-bold text-slate-100 truncate flex items-center gap-2">
                    {project.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-mono tracking-wide">
                    SYSTEM ARCHITECTURE & TECHNICAL SPECIFICATIONS
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors flex-shrink-0"
                aria-label="Close Architecture Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

          {/* Body Content (Scrollable) */}
          <div className="p-6 overflow-y-auto space-y-8 flex-1">

            {/* Architecture Image Diagram */}
            {project.architectureImage && (
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 p-2">
                <div className="flex items-center gap-2 px-3 py-1.5 border-b border-slate-800 text-xs font-mono text-slate-400 mb-2">
                  <Layers className="w-3.5 h-3.5 text-sky-400" />
                  <span>High-Performance Blueprint & Data Tier Pipeline</span>
                </div>
                <img
                  src={project.architectureImage}
                  alt={`${project.title} Architecture Diagram`}
                  className="w-full h-auto object-contain rounded-lg max-h-[360px]"
                />
              </div>
            )}

            {/* Metrics Strip */}
            {metrics && metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {metrics.map((m, i) => (
                  <div key={i} className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-center">
                    <p className="text-xl sm:text-2xl font-mono font-bold text-sky-400">{m.value}</p>
                    <p className="text-xs text-slate-400 mt-1">{m.label}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Overview */}
            <div>
              <h4 className="text-sm font-mono text-sky-400 tracking-wider uppercase mb-2 flex items-center gap-2">
                <Gauge className="w-4 h-4" /> Architectural Overview
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800">
                {overview}
              </p>
            </div>

            {/* System Execution Flow */}
            {systemFlow && systemFlow.length > 0 && (
              <div>
                <h4 className="text-sm font-mono text-sky-400 tracking-wider uppercase mb-3 flex items-center gap-2">
                  <GitBranch className="w-4 h-4" /> End-to-End Data Execution Flow
                </h4>
                <div className="space-y-2">
                  {systemFlow.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 font-mono"
                    >
                      <span className="flex-shrink-0 w-5 h-5 rounded bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <span className="mt-0.5">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Microservices & Components */}
            {keyComponents && keyComponents.length > 0 && (
              <div>
                <h4 className="text-sm font-mono text-sky-400 tracking-wider uppercase mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4" /> Core System Components
                </h4>
                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 font-mono uppercase">
                      <tr>
                        <th className="p-3 border-b border-slate-800">Component</th>
                        <th className="p-3 border-b border-slate-800">Responsibilities</th>
                        <th className="p-3 border-b border-slate-800">Tech Stack</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300 bg-slate-900/40">
                      {keyComponents.map((comp, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/30">
                          <td className="p-3 font-semibold text-slate-100 font-mono">{comp.name}</td>
                          <td className="p-3">{comp.role}</td>
                          <td className="p-3 font-mono text-sky-300">{comp.tech}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Engineering Trade-offs */}
            {tradeoffs && (
              <div>
                <h4 className="text-sm font-mono text-amber-400 tracking-wider uppercase mb-2 flex items-center gap-2 font-semibold">
                  <ShieldCheck className="w-4 h-4" /> Architectural Trade-offs & Decisions
                </h4>
                <p className="text-amber-100 text-xs leading-relaxed bg-amber-500/10 p-4 rounded-xl border border-amber-500/30 font-mono">
                  {tradeoffs}
                </p>
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-800 bg-slate-950 text-right">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
            >
              Close Technical Deep Dive
            </button>
          </div>
        </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
