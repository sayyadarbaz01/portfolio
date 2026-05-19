"use client";

import { useState } from "react";
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ExperienceSection,
  ProjectsSection,
  EducationSection,
  ContactSection,
  CurrentlyWorkingSection,
  TestimonialsSection,
  WhyWorkWithMeSection,
  GitHubActivitySection,
  MetricsSection,
  RecruiterSummarySection,
  TerminalWidget,
  TerminalButton,
} from "@/components";

export default function Home() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <>
      {/* Main Sections */}
      <HeroSection />
      <AboutSection />
      <MetricsSection />
      <SkillsSection />
      <ExperienceSection />
      <CurrentlyWorkingSection />
      <ProjectsSection />
      <GitHubActivitySection />
      <WhyWorkWithMeSection />
      <TestimonialsSection />
      <RecruiterSummarySection />
      <EducationSection />
      <ContactSection />

      {/* Floating Terminal Button */}
      <TerminalButton onClick={() => setTerminalOpen(true)} />

      {/* Terminal Modal */}
      <TerminalWidget isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </>
  );
}
