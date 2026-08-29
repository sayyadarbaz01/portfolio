"use client";

import { lazy, Suspense, useState } from "react";
import { LazySection } from "@/components/LazySection";
import {
  HeroSection,
  TerminalButton,
  TerminalWidget,
} from "@/components";
import { useTrackVisit } from "@/hooks";

// Lazy load core sections for optimal performance
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
  
  // Track portfolio visit on component mount
  useTrackVisit();

  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection />
      
      {/* 2. About Section */}
      <LazySection>
        <AboutSection />
      </LazySection>

      {/* 3. Skills Matrix */}
      <LazySection>
        <SkillsSection />
      </LazySection>

      {/* 4. Performance Engineering Benchmarks */}
      <LazySection>
        <MetricsSection />
      </LazySection>

      {/* 5. Professional Engineering Experience */}
      <LazySection>
        <ExperienceSection />
      </LazySection>

      {/* 6. Featured Resume Projects */}
      <LazySection>
        <ProjectsSection />
      </LazySection>

      {/* 7. Contact & Footer */}
      <LazySection>
        <ContactSection />
      </LazySection>

      {/* Floating CLI Terminal Button */}
      <TerminalButton onClick={() => setTerminalOpen(true)} />

      {/* Interactive Terminal Modal */}
      <TerminalWidget isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </>
  );
}

