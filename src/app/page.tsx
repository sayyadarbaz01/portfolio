"use client";

import { lazy, useState, useEffect, useCallback } from "react";
import { LazySection } from "@/components/LazySection";
import {
  HeroSection,
  TerminalButton,
  TerminalWidget,
} from "@/components";
import { useTrackVisit } from "@/hooks";

const AboutSection = lazy(() =>
  import("@/components/sections/AboutSection").then((mod) => ({
    default: mod.AboutSection,
  }))
);
const MetricsSection = lazy(() =>
  import("@/components/sections/MetricsSection").then((mod) => ({
    default: mod.MetricsSection,
  }))
);
const SkillsSection = lazy(() =>
  import("@/components/sections/SkillsSection").then((mod) => ({
    default: mod.SkillsSection,
  }))
);
const ExperienceSection = lazy(() =>
  import("@/components/sections/ExperienceSection").then((mod) => ({
    default: mod.ExperienceSection,
  }))
);
const ProjectsSection = lazy(() =>
  import("@/components/sections/ProjectsSection").then((mod) => ({
    default: mod.ProjectsSection,
  }))
);
const ContactSection = lazy(() =>
  import("@/components/sections/ContactSection").then((mod) => ({
    default: mod.ContactSection,
  }))
);

export default function Home() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  useTrackVisit();

  const openTerminal = useCallback(() => setTerminalOpen(true), []);
  const closeTerminal = useCallback(() => setTerminalOpen(false), []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <HeroSection onOpenTerminal={openTerminal} />

      <LazySection>
        <AboutSection />
      </LazySection>

      <LazySection>
        <SkillsSection />
      </LazySection>

      <LazySection>
        <MetricsSection />
      </LazySection>

      <LazySection>
        <ExperienceSection />
      </LazySection>

      <LazySection>
        <ProjectsSection />
      </LazySection>

      <LazySection>
        <ContactSection />
      </LazySection>

      <TerminalButton onClick={openTerminal} />
      <TerminalWidget isOpen={terminalOpen} onClose={closeTerminal} />
    </>
  );
}
