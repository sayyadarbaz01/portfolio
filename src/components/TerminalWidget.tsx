"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Minus, Square } from "lucide-react";

const COMMANDS: Record<string, string> = {
  help: `Available commands:
  whoami      - About Mohammed Rizwan
  skills      - List of technical skills
  experience  - Work experience summary
  projects    - Featured projects
  status      - Current availability
  contact     - Contact information
  stack       - Tech stack overview
  ai          - AI tools I use
  clear       - Clear terminal`,
  whoami: `Mohammed Rizwan
  ─────────────────────────────
  Senior Software Engineer | Full Stack Developer
  📍 Maharashtra, India
  🎯 3+ Years Experience
  🚀 MERN Stack Specialist
  ♿ Accessibility Expert
  🤖 AI-Assisted Developer`,
  skills: `Technical Skills:
  ─────────────────────────────
  Frontend   → React.js, Next.js, TypeScript, Tailwind CSS
  State      → Redux, Redux Toolkit, Context API
  Backend    → Node.js, Express.js, NestJS
  Database   → MongoDB, PostgreSQL, Prisma ORM
  APIs       → GraphQL, REST APIs, WebSockets
  Tools      → Git, Docker, Postman, JIRA
  A11y       → WCAG 2.1, ARC Toolkit, ARIA`,
  experience: `Work Experience:
  ─────────────────────────────
  [2025-Now]  Senior Software Engineer @ Vassu Tech Services
              → Led WCAG accessibility implementation
              → Built complex endorsement templates
              → Production-grade Next.js + NestJS apps
  
  [2023-2025] Full Stack Developer @ TruScholar
              → Built Learner Module for transcript management
              → React, Redux, Node.js, MongoDB
  
  [2022-2023] Software Engineer @ Prodapt Solutions
              → MERN stack application development
              → Reusable UI component library`,
  projects: `Featured Projects:
  ─────────────────────────────
  🏢 Radian Title Genius
     → Enterprise property management platform
     → 100% WCAG 2.1 compliance
     → URL: https://orders.mytitlegenius.com

  🎓 TruScholar Learner Module
     → Secure credential management
     → Real-time university communication
     → URL: https://www.truscholar.io

  🛒 JD Store (E-Commerce)
     → Full MERN stack with Stripe payments
     → URL: https://jd-store-frontend.vercel.app`,
  status: `Current Status:
  ─────────────────────────────
  🟢 Available for Full-Time Roles
  🟡 Open to Freelance Projects
  🤝 Open to Technical Consulting
  🌍 Remote Friendly
  
  Response time: ~24 hours
  Preferred start: Immediate`,
  contact: `Contact Information:
  ─────────────────────────────
  📧 Email    → mohammedrizwan6477@gmail.com
  💼 LinkedIn → linkedin.com/in/mohammedrizwan6477
  🐙 GitHub   → github.com/mohammedrizwan6477
  📱 WhatsApp → +91 9960556477
  
  Type "status" to check availability`,
  stack: `Tech Stack:
  ─────────────────────────────
  Runtime    → Node.js 20+, Bun
  Framework  → Next.js 15+, NestJS
  Language   → TypeScript 5+
  Styling    → Tailwind CSS 4, CSS Modules
  Animation  → Framer Motion
  DB         → MongoDB Atlas, PostgreSQL
  ORM        → Prisma, Mongoose
  Auth       → JWT, NextAuth.js
  Deploy     → Vercel, Railway, Docker`,
  ai: `AI Tools I Use Daily:
  ─────────────────────────────
  🤖 GitHub Copilot  → Code completion & review
  🧠 Claude (Anthropic) → Architecture & debugging
  💬 ChatGPT        → Problem-solving & ideation
  🔍 Perplexity     → Technical research
  📝 Notion AI      → Documentation
  
  AI has 10x'd my productivity while
  maintaining code quality standards.`,
  clear: "CLEAR",
};

interface TerminalLine {
  type: "input" | "output" | "welcome";
  content: string;
}

const welcome = `Mohammed Rizwan's Terminal v1.0.0
Type 'help' to see available commands.
───────────────────────────────────────`;

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
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Terminal window */}
          <motion.div
            className="relative w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-gray-700"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors flex items-center justify-center group"
                  aria-label="Close terminal"
                >
                  <X className="w-1.5 h-1.5 text-red-900 opacity-0 group-hover:opacity-100" />
                </button>
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-gray-400 font-mono">
                  rizwan@portfolio:~
                </span>
              </div>
            </div>

            {/* Terminal content */}
            <div
              className="bg-gray-950 p-4 font-mono text-sm h-80 overflow-y-auto cursor-text"
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((line, i) => (
                <div key={i} className="mb-1">
                  {line.type === "welcome" && (
                    <pre className="text-cyan-400 text-xs leading-relaxed whitespace-pre-wrap">
                      {line.content}
                    </pre>
                  )}
                  {line.type === "input" && (
                    <p className="text-green-400">{line.content}</p>
                  )}
                  {line.type === "output" && (
                    <pre className="text-gray-300 text-xs leading-relaxed whitespace-pre-wrap">
                      {line.content}
                    </pre>
                  )}
                </div>
              ))}

              {/* Input line */}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-green-400">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-green-300 outline-none caret-green-400 placeholder-gray-600"
                  placeholder="type a command..."
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal input"
                />
              </div>
              <div ref={bottomRef} />
            </div>

            {/* Quick commands */}
            <div className="bg-gray-900 px-4 py-2 border-t border-gray-700">
              <div className="flex flex-wrap gap-1.5">
                {["whoami", "skills", "status", "contact", "help"].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => handleCommand(cmd)}
                    className="px-2 py-0.5 text-xs rounded bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white transition-colors font-mono"
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
      className="fixed bottom-20 right-4 sm:bottom-8 sm:right-24 z-40 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900 dark:bg-gray-800 text-white shadow-lg border border-gray-700 hover:border-green-500/50 transition-all text-sm font-mono group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2 }}
      aria-label="Open terminal"
    >
      <Terminal className="w-4 h-4 text-green-400 group-hover:animate-pulse" />
      <span className="hidden sm:inline">Terminal</span>
    </motion.button>
  );
}
