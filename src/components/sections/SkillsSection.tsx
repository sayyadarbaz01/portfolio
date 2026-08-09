"use client";

import React, { useRef } from "react";
import { motion, Variants } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiRedux,
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiMongodb,
  SiPostgresql,
  SiGraphql,
  SiPrisma,
  SiGit,
  SiGithub,
  SiGitlab,
  SiPostman,
  SiDocker,
  SiJira,
} from "react-icons/si";
import * as Icons from "lucide-react";
import { useInView } from "@/hooks";
import { Section, Card, CardBody } from "@/components/ui";
import { skills } from "@/data/portfolio";

// Icon mapping with real brand logos
const iconMap: Record<string, React.ComponentType<{ size: number; className: string }>> = {
  // Frontend
  React: SiReact,
  Next: SiNextdotjs,
  TypeScript: SiTypescript,
  Tailwind: SiTailwindcss,
  Redux: SiRedux,
  FramerMotion: SiFramer,
  Palette: Icons.Palette,
  Code: Icons.Code,
  Smartphone: Icons.Smartphone,
  Lightbulb: Icons.Lightbulb,

  // Backend
  Node: SiNodedotjs,
  Express: SiExpress,
  Layers: SiNestjs,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  GraphQL: SiGraphql,
  Database: SiPrisma,
  Share2: Icons.Share2,
  Lock: Icons.Lock,

  // Tools & Workflow
  GitBranch: SiGit,
  Send: Icons.Send,
  Container: SiDocker,
  CheckSquare: SiJira,
  FileCode: Icons.FileCode,
  Eye: Icons.Eye,
  Wand2: Icons.Wand2,
  Brain: Icons.Brain,
  Users: Icons.Users,
  CheckCircle: Icons.CheckCircle,
  Sparkles: Icons.Sparkles,
  Zap: Icons.Zap,
  
  // Additional icons from lucide-react
  Network: Icons.Network,
  Type: Icons.Type,
  Search: Icons.Search,
  Package: Icons.Package,
};

const getCategoryColor = (category: string) => {
  const colors = {
    frontend: "from-blue-500 to-cyan-500",
    backend: "from-purple-500 to-pink-500",
    tools: "from-amber-500 to-orange-500",
    other: "from-green-500 to-emerald-500",
  };
  return colors[category as keyof typeof colors] || colors.frontend;
};

// Official brand colors for each technology
const getBrandColor = (skillIcon?: string): string => {
  const colorMap: Record<string, string> = {
    // Frontend
    React: "#61DAFB", // Cyan Blue
    Next: "#000000", // Black
    TypeScript: "#3178C6", // Blue
    Tailwind: "#06B6D4", // Cyan
    Redux: "#764ABC", // Purple
    FramerMotion: "#0055FF", // Blue
    Palette: "#007FFF", // Material UI Blue
    Code: "#6B7280", // Gray (generic)
    Smartphone: "#6B7280", // Gray (generic)
    Lightbulb: "#FFD700", // Gold

    // Backend
    Node: "#339933", // Green
    Express: "#000000", // Black
    Layers: "#E0234E", // NestJS Red
    MongoDB: "#13AA52", // Green
    PostgreSQL: "#336791", // Blue
    GraphQL: "#E10098", // Pink
    Database: "#0C344B", // Prisma Navy
    Share2: "#6B7280", // Gray (generic)
    Lock: "#6B7280", // Gray (generic)

    // Tools & Workflow
    GitBranch: "#F1502F", // Git Orange-Red
    Send: "#6B7280", // Gray (generic)
    Container: "#2496ED", // Docker Blue
    CheckSquare: "#0052CC", // JIRA Blue
    FileCode: "#007ACC", // VS Code Blue
    Eye: "#4A90E2", // Accessibility Blue
    Wand2: "#00A67E", // GitHub Copilot Teal
    Brain: "#5A67D8", // Claude Indigo
    Users: "#00BCD4", // Collaboration Cyan
    CheckCircle: "#4CAF50", // Code Review Green
    Sparkles: "#FF6B35", // AI Orange
    Zap: "#FFD700", // Energy Yellow
  };
  return colorMap[skillIcon || "Code"] || "#6B7280";
};

const getCategoryAccent = (category: string) => {
  const accents = {
    frontend: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
    backend: "bg-purple-500/20 text-purple-600 dark:text-purple-400",
    tools: "bg-amber-500/20 text-amber-600 dark:text-amber-400",
    other: "bg-green-500/20 text-green-600 dark:text-green-400",
  };
  return accents[category as keyof typeof accents] || accents.frontend;
};

interface SkillCardProps {
  skill: (typeof skills)[0];
  index: number;
}

const SkillCard = ({ skill, index }: SkillCardProps) => {
  const IconComponent = skill.icon ? iconMap[skill.icon] : Icons.Code;
  const brandColor = getBrandColor(skill.icon);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5 },
        },
      }}
      key={index}
      className="h-full"
      role="article"
      aria-label={skill.name}
    >
      <Card hover glassmorphism className="h-full group">
        <CardBody className="!p-2 sm:!p-3 flex flex-col items-center justify-center h-full text-center">
          {/* Icon Container - showing brand colors */}
          <div
            aria-hidden="true"
            className={`mb-2 sm:mb-2.5 p-2 sm:p-2.5 rounded-md bg-white/5 dark:bg-white/10 group-hover:bg-white/10 dark:group-hover:bg-white/15 group-hover:shadow-lg transition-all duration-300`}
            style={{
              boxShadow: `0 0 12px ${brandColor}20`,
            }}
          >
            <IconComponent size={20} style={{ color: brandColor }} className="" />
          </div>

          {/* Skill Name */}
          <h4 className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm leading-tight line-clamp-2">
            {skill.name}
          </h4>
        </CardBody>
      </Card>
    </motion.div>
  );
};

interface SkillCategorySectionProps {
  title: string;
  skillsData: (typeof skills)[0][];
  category: string;
  startIndex: number;
  containerVariants: Variants;
  itemVariants: Variants;
  isInView: boolean;
}

const SkillCategorySection = ({
  title,
  skillsData,
  category,
  startIndex,
  containerVariants,
  itemVariants,
  isInView,
}: SkillCategorySectionProps) => {
  const accentColor = getCategoryAccent(category);
  const bgGradient = getCategoryColor(category);

  return (
    <motion.div variants={itemVariants}>
      <div className="flex items-center gap-3 mb-3 sm:mb-4">
        <div
          className={`w-1 h-7 sm:h-8 rounded-full bg-gradient-to-b ${bgGradient}`}
        />
        <h3 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
        <span
          className={`ml-auto text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-full ${accentColor}`}
        >
          {skillsData.length} skills
        </span>
      </div>

      <motion.div
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-1.5 sm:gap-2 md:gap-3"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {skillsData.map((skill, index) => (
          <SkillCard key={index} skill={skill} index={startIndex + index} />
        ))}
      </motion.div>
    </motion.div>
  );
};

export function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  const skillsByCategory = {
    frontend: skills.filter((s) => s.category === "frontend"),
    backend: skills.filter((s) => s.category === "backend"),
    tools: skills.filter((s) => s.category === "tools"),
    other: skills.filter((s) => s.category === "other"),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Section id="skills" title="Skills & Expertise" ref={ref}>
      <motion.div
        className="space-y-6 sm:space-y-7 md:space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Frontend Skills */}
        {skillsByCategory.frontend.length > 0 && (
          <SkillCategorySection
            title="Frontend"
            skillsData={skillsByCategory.frontend}
            category="frontend"
            startIndex={0}
            containerVariants={containerVariants}
            itemVariants={itemVariants}
            isInView={isInView}
          />
        )}

        {/* Backend Skills */}
        {skillsByCategory.backend.length > 0 && (
          <SkillCategorySection
            title="Backend"
            skillsData={skillsByCategory.backend}
            category="backend"
            startIndex={skillsByCategory.frontend.length}
            containerVariants={containerVariants}
            itemVariants={itemVariants}
            isInView={isInView}
          />
        )}

        {/* Tools & Workflow */}
        {skillsByCategory.tools.length > 0 && (
          <SkillCategorySection
            title="Tools & Workflow"
            skillsData={skillsByCategory.tools}
            category="tools"
            startIndex={
              skillsByCategory.frontend.length + skillsByCategory.backend.length
            }
            containerVariants={containerVariants}
            itemVariants={itemVariants}
            isInView={isInView}
          />
        )}

        {/* Other Skills */}
        {skillsByCategory.other.length > 0 && (
          <SkillCategorySection
            title="Soft Skills"
            skillsData={skillsByCategory.other}
            category="other"
            startIndex={
              skillsByCategory.frontend.length +
              skillsByCategory.backend.length +
              skillsByCategory.tools.length
            }
            containerVariants={containerVariants}
            itemVariants={itemVariants}
            isInView={isInView}
          />
        )}
      </motion.div>
    </Section>
  );
}
