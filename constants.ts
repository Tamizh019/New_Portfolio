import { UserData } from './types';

export const PORTFOLIO_DATA: UserData = {
  name: "Tamizharasan R",
  age: 20,
  location: "Chennai, Tamil Nadu, India",
  email: "jefftamizh@gmail.com",
  linkedin: "linkedin.com/in/tamizharasan-r-a6931828a",
  github: "https://github.com/Tamizh019",
  portfolio: "https://tamizharasan-portfolio.netlify.app/",
  role: "AI Engineer & Full-Stack Developer",
  bio: "3rd-year CSE (AI) student at SIST, Chennai. I build on the application layer of AI — RAG pipelines, LLM orchestration, prompt systems, and computer vision. Alongside that, I ship full-stack products people actually use. Currently targeting AI Engineering and SDE roles for 2026.",
  education: [
    {
      institution: "Sathyabama Institute of Science & Technology (SIST)",
      degree: "B.E CSE – Artificial Intelligence",
      details: "3rd Year · CGPA: 8.7 · Specialisation: AI & ML",
      year: "2023 – 2027"
    },
    {
      institution: "Mount Saint Joseph MHSS",
      degree: "HSC & SSLC",
      details: "HSC: 81.66% · SSLC: 100%",
      year: "2021 – 2023"
    }
  ],
  skills: [
    {
      category: "AI / ML & LLMs",
      skills: ["LangChain", "FAISS", "TensorFlow", "Scikit-learn", "OpenCV", "Gemini API", "RAG Pipelines", "Prompt Engineering"]
    },
    {
      category: "Frontend",
      skills: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML5 / CSS3"]
    },
    {
      category: "Backend & APIs",
      skills: ["FastAPI", "Spring Boot", "Node.js", "REST APIs", "WebSockets", "Supabase"]
    },
    {
      category: "Languages",
      skills: ["Python", "Java", "TypeScript", "JavaScript", "SQL"]
    },
    {
      category: "Databases & Tools",
      skills: ["PostgreSQL", "MySQL", "Supabase", "Git", "Docker", "VS Code"]
    }
  ],
  experience: [
    {
      role: "Java Developer Intern",
      company: "Team Internship",
      project: "Enterprise CRM System",
      responsibilities: [
        "Engineered a multi-module CRM in Java / JDBC covering lead tracking, contacts, and pipeline workflows",
        "Designed & normalised MySQL relational schemas; restructured joins across 5+ entity relations",
        "Implemented full CRUD backend logic with validation across all user-facing modules"
      ]
    }
  ],
  projects: [
    {
      title: "Chill Space v3",
      description: "Real-time collaboration platform — group chat, 9 built-in tools, gamified focus mode.",
      techStack: ["Next.js 16", "TypeScript", "Supabase", "WebSockets", "Rust", "Framer Motion"],
      features: [
        "WebSocket group messaging with sub-100ms latency",
        "OAuth2 (Google) + email auth with row-level security",
        "9 micro-tools: Chess, DSA Solver, Galaxy Match, Typing Race",
        "Gamified Focus Mode with XP, streaks & leaderboard"
      ],
      links: {
        github: "https://github.com/Tamizh019/CHILL_SPACE_v3",
        demo: "https://tamizh-loginpage.netlify.app/"
      },
      isFeatured: true
    },
    {
      title: "Valluge – AI Wardrobe",
      description: "AI-powered digital wardrobe. Gemini API recommends outfits based on weather, occasion & style.",
      techStack: ["Next.js", "Gemini API", "PostgreSQL", "Tailwind CSS"],
      features: [
        "Context-aware outfit suggestions via Gemini API",
        "Real-time weather integration for dynamic recommendations",
        "LLM-backed styling chatbot for conversational guidance",
        "PostgreSQL clothing inventory with image upload & filter search"
      ],
      links: {
        github: "https://github.com/Tamizh019/Smart_wardrobe",
        demo: "https://valluge.netlify.app/"
      },
      isFeatured: false
    },
    {
      title: "AgriVision – AI Crop Platform",
      description: "ML platform for smart farming: crop yield prediction, plant disease detection, fertiliser AI.",
      techStack: ["Python", "TensorFlow", "Scikit-learn", "Flask", "OpenCV", "MySQL"],
      features: [
        "98% accuracy crop yield prediction with ensemble regression",
        "CNN-based plant disease detection across 10+ crop variants",
        "AI fertiliser & irrigation recommendations via Flask REST API",
        "Real-time weather data integration for context-aware farming"
      ],
      links: {
        github: "https://github.com/Tamizh019/CropYield_Prediction"
      },
      isFeatured: false
    },
    {
      title: "Sparky – RAG AI Chatbot",
      description: "Context-aware chatbot using Retrieval-Augmented Generation — PDF knowledge bases, FAISS vector search.",
      techStack: ["Python", "LangChain", "FAISS", "FastAPI", "React"],
      features: [
        "RAG pipeline: PDF ingestion → chunking → FAISS vector indexing",
        "LangChain orchestration for context-grounded LLM responses",
        "Streaming FastAPI backend + React chat frontend",
        "Source-cited, hallucination-reduced responses"
      ],
      links: {
        github: "https://github.com/Tamizh019/CHATBOT-sparky"
      },
      isFeatured: false
    }
  ],
  interests: [
    "LLM Application Engineering & RAG Systems",
    "AI/ML Pipelines & Computer Vision",
    "Full-Stack Web Development",
    "Open Source & Developer Tools"
  ],
  hobbies: [
    "Competitive Programming (LeetCode / Codeforces)",
    "Building weekend projects & micro-tools",
    "UI / UX Exploration & Design Systems"
  ]
};
