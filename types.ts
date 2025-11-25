export interface Project {
  title: string;
  description: string;
  techStack: string[];
  features: string[];
  links?: {
    github?: string;
    demo?: string;
  };
  isFeatured?: boolean;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Experience {
  role: string;
  company: string;
  project: string;
  responsibilities: string[];
}

export interface Education {
  institution: string;
  degree: string;
  details: string;
  year: string;
}

export interface UserData {
  name: string;
  age: number;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  role: string;
  bio: string;
  education: Education[];
  skills: SkillCategory[];
  projects: Project[];
  experience: Experience[];
  interests: string[];
  hobbies: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}