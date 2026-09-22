"use client";

import React, { useRef } from "react";
import { scrollToSection } from "@/utils/helpers";
import { navigation, socialLinks } from "@/data/portfolio";
import { Mail, ArrowUp } from "lucide-react";
import { AnalyticsDisplay } from "@/components/AnalyticsDisplay";
import { useInView } from "@/hooks";
import { Reveal } from "@/components/ui/Motion";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

export function Footer() {
  const currentYear = new Date().getFullYear();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="transition-colors"
      style={{
        borderTop: "1px solid var(--card-border)",
        backgroundColor: "var(--bg-elevated)",
        color: "var(--text-primary)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        {/* Wordmark block */}
        <Reveal className="text-left mb-10">
          <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>Full-stack &amp; AI integration</p>
          <p className="font-display font-semibold tracking-tight text-wordmark-fluid" style={{ color: "var(--text-primary)" }}>
            Arbaz Sayyad
          </p>
          <p className="text-sm sm:text-base leading-relaxed max-w-xl mt-4" style={{ color: "var(--text-secondary)" }}>
            Full Stack Engineer specializing in React.js, TypeScript, Node.js microservices, and AI/RAG platform architecture.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Socials */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider mb-4 font-semibold" style={{ color: "var(--accent-teal)" }}>
              Connect
            </h4>
            <div className="flex gap-2.5">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)", color: "var(--text-secondary)" }}
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)", color: "var(--text-secondary)" }}
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${socialLinks.email}`}
                className="p-3 rounded-full border transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)", color: "var(--text-secondary)" }}
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Sitemap */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider mb-4 font-semibold" style={{ color: "var(--accent-teal)" }}>
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {navigation.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href.replace("#", ""))}
                  className="text-left font-medium transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Email note */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider mb-4 font-semibold" style={{ color: "var(--accent-teal)" }}>
              Direct Line
            </h4>
            <a
              href={`mailto:${socialLinks.email}`}
              className="text-sm font-mono transition-colors break-all"
              style={{ color: "var(--text-secondary)" }}
            >
              {socialLinks.email}
            </a>
            <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
              {socialLinks.phone}
            </p>
          </div>
        </div>

        {/* Analytics Display */}
        <div ref={ref} className="py-6 mb-2" style={{ borderTop: "1px solid var(--card-border)" }}>
          <AnalyticsDisplay isInView={isInView} />
        </div>

        {/* Copyright row + Back to top pill */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono pt-6"
          style={{ borderTop: "1px solid var(--card-border)", color: "var(--text-muted)" }}
        >
          <p>© {currentYear} Arbaz Sayyad. Built with React 19, Next.js & Tailwind CSS.</p>

          <button
            onClick={handleScrollToTop}
            className="px-5 py-2.5 rounded-full font-semibold flex items-center gap-2 transition-transform hover:-translate-y-px"
            style={{ backgroundColor: "var(--text-primary)", color: "var(--bg-base)" }}
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
