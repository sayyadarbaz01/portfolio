export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'other';
  icon?: string;
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
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  github?: string;
  demo?: string;
  website_link?: string;
  category: string;
  highlights: string[];
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
