"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X } from "lucide-react";

const COMMANDS: Record<string, string> = {
  help: `Available commands:
  whoami      - Executive summary & identity
  arch        - System architecture & RAG breakdown
  metrics     - Quantitative engineering benchmarks
  skills      - Full-stack technical matrix
  experience  - Production role & projects at Synechron
  contact     - Direct contact channels
  clear       - Clear terminal output`,
  whoami: `Arbaz Sayyad — Full Stack Developer (3+ YOE)
─────────────────────────────────────────────
• 3+ Years Experience (Enterprise Web & Microservices)
• Core Focus: Frontend Architecture, Backend Microservices & AI RAG Systems
• Key Stack: React.js, TypeScript, Node.js, Express, MongoDB, OpenAI RAG
• Location: Pune, India | Open for Full Stack / Lead roles`,
  arch: `System Architecture Showcase:
─────────────────────────────────────────────
[KYT Compliance & AI Risk Platform (U.S. Bank)]
Client: React 19 + TypeScript SPA (Redux Toolkit, MUI)
Gateway: Express.js REST API Gateway (JWT, RBAC)
RAG Engine: Node.js + OpenAI GPT Prompt Engineering
Vector Store: MongoDB Atlas Vector Search (HNSW Index)
Throughput: Sub-200ms query latency across 500+ daily users`,
  metrics: `Performance Benchmarks:
─────────────────────────────────────────────
• 4s → 2s page load speedup (50% speedup) via code splitting & memoized selectors
• 25% development overhead reduction via TypeScript component design system
• 35% reduction in compliance risk summary write-up time
• 40% speedup in vector search policy retrieval
• 500+ active daily enterprise compliance users supported`,
  skills: `Technical Matrix:
─────────────────────────────────────────────
Frontend: React.js, TypeScript, JavaScript, Redux Toolkit, MUI, Tailwind CSS, WCAG 2.1
Backend:  Node.js, Express.js, REST APIs, MongoDB, SQL, JWT, RBAC, Docker, Microservices, CI/CD
AI & Data: OpenAI API, RAG Architecture, MongoDB Vector Search, Prompt Engineering`,
  experience: `Production Experience & Key Projects:
─────────────────────────────────────────────
[2022 - Present] Senior Associate Technology @ Synechron Technologies
                 • U.S. Bank – KYT Compliance Platform (React, TS, Node, OpenAI API, Vector Search)
                 • Governance Dashboard Platform (React, Redux, REST API, Tailwind CSS, Jest)
                 • Cut page load time 4s→2s and dev overhead by 25%.`,
  contact: `Direct Contact:
─────────────────────────────────────────────
📧 Email:    sayyadarbaz046@gmail.com
💼 LinkedIn: linkedin.com/in/arbazsayyad
🐙 GitHub:   github.com/sayyadarbaz01
📱 Phone:    +91-7841050046`,
  clear: "CLEAR",
};

interface TerminalLine {
  type: "input" | "output" | "welcome";
  content: string;
}

const welcome = `Arbaz Sayyad Workstation CLI v2.4.0
Type 'help' for available system commands.
───────────────────────────────────────────`;

interface TerminalWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TerminalWidget({ isOpen, onClose }: TerminalWidgetProps) {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "welcome", content: welcome },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    const newLines: TerminalLine[] = [
      ...lines,
      { type: "input", content: `$ ${cmd}` },
    ];

    if (trimmed === "clear") {
      setLines([{ type: "welcome", content: welcome }]);
    } else if (COMMANDS[trimmed]) {
      newLines.push({ type: "output", content: COMMANDS[trimmed] });
      setLines(newLines);
    } else {
      newLines.push({
        type: "output",
        content: `Command not found: ${trimmed}\nType 'help' for available commands.`,
      });
      setLines(newLines);
    }

    setHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(next);
      setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(historyIndex - 1, -1);
      setHistoryIndex(next);
      setInput(next === -1 ? "" : history[next] ?? "");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Terminal window */}
          <motion.div
            className="relative w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl bg-slate-950 border border-slate-800"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors flex items-center justify-center"
                  aria-label="Close terminal"
                >
                  <X className="w-2 h-2 text-red-950 opacity-0 hover:opacity-100" />
                </button>
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-slate-400 font-mono">
                  arbaz@dev-workstation:~
                </span>
              </div>
            </div>

            {/* Terminal content */}
            <div
              className="bg-slate-950 p-4 font-mono text-xs h-80 overflow-y-auto cursor-text text-slate-300"
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((line, i) => (
                <div key={i} className="mb-2">
                  {line.type === "welcome" && (
                    <pre className="text-sky-400 font-mono leading-relaxed whitespace-pre-wrap">
                      {line.content}
                    </pre>
                  )}
                  {line.type === "input" && (
                    <p className="text-emerald-400 font-mono">{line.content}</p>
                  )}
                  {line.type === "output" && (
                    <pre className="text-slate-300 font-mono leading-relaxed whitespace-pre-wrap">
                      {line.content}
                    </pre>
                  )}
                </div>
              ))}

              {/* Input line */}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-emerald-400">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-emerald-300 outline-none caret-emerald-400 font-mono"
                  placeholder="type command..."
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal input"
                />
              </div>
              <div ref={bottomRef} />
            </div>

            {/* Quick commands bar */}
            <div className="bg-slate-900 px-4 py-2.5 border-t border-slate-800">
              <div className="flex flex-wrap gap-2">
                {["whoami", "arch", "metrics", "skills", "experience", "contact", "help"].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => handleCommand(cmd)}
                    className="px-2.5 py-1 rounded text-xs bg-slate-800 text-slate-200 hover:bg-sky-600 hover:text-white transition-colors font-mono font-medium border border-slate-700/60"
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Terminal toggle button
export function TerminalButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 text-slate-200 border border-slate-800 shadow-xl hover:border-sky-500 transition-all text-xs font-mono"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Open CLI Terminal"
    >
      <Terminal className="w-4 h-4 text-sky-400" />
      <span className="hidden sm:inline">CLI Terminal</span>
    </motion.button>
  );
}

