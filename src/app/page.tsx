"use client";

import { lazy, Suspense, useState } from "react";
import { LazySection } from "@/components/LazySection";
import {
  HeroSection,
  TerminalButton,
  TerminalWidget,
} from "@/components";

// Lazy load sections for better performance
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
const CurrentlyWorkingSection = lazy(() =>
  import("@/components/sections/CurrentlyWorkingSection").then((mod) => ({
    default: mod.CurrentlyWorkingSection,
  }))
);
const ProjectsSection = lazy(() =>
  import("@/components/sections/ProjectsSection").then((mod) => ({
    default: mod.ProjectsSection,
  }))
);
const GitHubActivitySection = lazy(() =>
  import("@/components/sections/GitHubActivitySection").then((mod) => ({
    default: mod.GitHubActivitySection,
  }))
);
const WhyWorkWithMeSection = lazy(() =>
  import("@/components/sections/WhyWorkWithMeSection").then((mod) => ({
    default: mod.WhyWorkWithMeSection,
  }))
);
const TestimonialsSection = lazy(() =>
  import("@/components/sections/TestimonialsSection").then((mod) => ({
    default: mod.TestimonialsSection,
  }))
);
const RecruiterSummarySection = lazy(() =>
  import("@/components/sections/RecruiterSummarySection").then((mod) => ({
    default: mod.RecruiterSummarySection,
  }))
);
const EducationSection = lazy(() =>
  import("@/components/sections/EducationSection").then((mod) => ({
    default: mod.EducationSection,
  }))
);
const ContactSection = lazy(() =>
  import("@/components/sections/ContactSection").then((mod) => ({
    default: mod.ContactSection,
  }))
);

export default function Home() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <>
      {/* Main Sections */}
      <HeroSection />
      
      <LazySection>
        <AboutSection />
      </LazySection>

      <LazySection>
        <MetricsSection />
      </LazySection>

      <LazySection>
        <SkillsSection />
      </LazySection>

      <LazySection>
        <ExperienceSection />
      </LazySection>

      <LazySection>
        <CurrentlyWorkingSection />
      </LazySection>

      <LazySection>
        <ProjectsSection />
      </LazySection>

      <LazySection>
        <GitHubActivitySection />
      </LazySection>

      <LazySection>
        <WhyWorkWithMeSection />
      </LazySection>

      <LazySection>
        <TestimonialsSection />
      </LazySection>

      <LazySection>
        <RecruiterSummarySection />
      </LazySection>

      <LazySection>
        <EducationSection />
      </LazySection>

      <LazySection>
        <ContactSection />
      </LazySection>

      {/* Floating Terminal Button */}
      <TerminalButton onClick={() => setTerminalOpen(true)} />

      {/* Terminal Modal */}
      <TerminalWidget isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </>
  );
}
