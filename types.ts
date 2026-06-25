export interface Project {
  title: string;
  description: string;
  techStack: string[];
  features: string[];
  links?: {
    github?: string;
    demo?: string;
    hf?: string;
  };
  isFeatured?: boolean;
  team?: { name: string; role?: string }[];
  screenshots?: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface TimelineEvent {
  type: 'experience' | 'education';
  title: string;
  organization: string;
  date: string;
  details: string[];
}

export interface UserData {
  name: string;
  age: number;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  portfolio?: string;
  role: string;
  bio: string;
  timeline: TimelineEvent[];
  skills: SkillCategory[];
  projects: Project[];
  interests: string[];
  hobbies: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}