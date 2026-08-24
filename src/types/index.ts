export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'ai' | 'cloud' | 'tools' | 'other';
  icon?: string;
  proficiency?: number; // percentage e.g. 95
  highlight?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string[];
  skills: string[];
  client?: string;
  location: string;
  highlightsCategory?: {
    architecture?: string[];
    performance?: string[];
    aiAndInnovation?: string[];
  };
}

export interface ArchitectureDetails {
  overview: string;
  systemFlow: string[];
  keyComponents: { name: string; role: string; tech: string }[];
  metrics: { label: string; value: string }[];
  tradeoffs: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  architectureImage?: string;
  tags: string[];
  github?: string;
  demo?: string;
  website_link?: string;
  category: string;
  highlights: string[];
  architectureDetails?: ArchitectureDetails;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  duration: string;
  location: string;
  description?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
  link?: string;
}

export interface PortfolioAnalytics {
  id: string;
  totalVisitors: number;
  createdAt: string;
  updatedAt: string;
}

export interface ResumeAnalytics {
  id: string;
  totalDownloads: number;
  createdAt: string;
  updatedAt: string;
}
