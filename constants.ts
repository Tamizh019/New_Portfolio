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
  timeline: [
    {
      type: "experience",
      title: "AI Domain Intern",
      organization: "Rudhra Info Solutions",
      date: "March 2026 – April 2026",
      details: [
        "Architected a 10-agent AI pipeline (Text-to-SQL, QA, Schema RAG, Python Sandbox, Visualization) using LangChain and Gemini API — enabling non-technical users to query any PostgreSQL database in plain English",
        "Built the FastAPI backend with SSE-based real-time streaming, Redis result caching, pgvector schema embeddings, and Supabase conversation persistence",
        "Implemented self-correcting SQL with auto-retry on DB rejection and AI-driven chart selection across 23+ interactive Plotly.js chart types",
        "Project: \"Data-Talk\" — AI for Database Systems"
      ]
    },
    {
      type: "experience",
      title: "Java Developer Intern",
      organization: "Team Internship",
      date: "Past",
      details: [
        "Engineered a multi-module CRM in Java / JDBC covering lead tracking, contacts, and pipeline workflows",
        "Designed & normalised MySQL relational schemas; restructured joins across 5+ entity relations",
        "Implemented full CRUD backend logic with validation across all user-facing modules"
      ]
    },
    {
      type: "education",
      title: "B.E CSE – Artificial Intelligence",
      organization: "Sathyabama Institute of Science & Technology (SIST) • Chennai",
      date: "2023 – 2027",
      details: ["3rd Year · CGPA: 8.7 · Specialisation: Artificial Intelligence & Machine Learning"]
    },
    {
      type: "education",
      title: "HSC",
      organization: "Mount Saint Joseph MHSS • Tiruvannamalai",
      date: "2022 – 2023",
      details: ["HSC: 81.66%"]
    },
    {
      type: "education",
      title: "SSLC ",
      organization: "Mount Saint Joseph MHSS • Tiruvannamalai",
      date: "2021 – 2022",
      details: ["SSLC: 100%"]
    }
  ],
  skills: [
    {
      category: "AI / ML & LLMs",
      skills: ["LangChain", "LlamaIndex", "FAISS", "TensorFlow", "Scikit-learn", "OpenCV", "Gemini API", "RAG Pipelines", "Prompt Engineering"]
    },
    {
      category: "Frontend",
      skills: ["Next.js", "React.js", "Tailwind CSS", "Framer Motion", "HTML5 / CSS3"]
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
      skills: ["PostgreSQL", "MySQL", "Supabase", "pgvector", "Redis", "Git", "Docker", "VS Code"]
    }
  ],
  projects: [
    {
      title: "Chill Space",
      description: "Real-time collaboration platform — group chat, built-in games, and an integrated code editor for seamless interaction.",
      techStack: ["Next.js 16", "TypeScript", "Supabase", "WebSockets", "Rust", "Framer Motion"],
      features: [
        "WebSocket group messaging with sub-100ms latency",
        "OAuth2 (Google) + email auth with row-level security",
        "Built-in multiplayer games and a collaborative code editor",
        "Gamified Focus Mode with XP, streaks & leaderboard"
      ],
      links: {
        github: "https://github.com/Tamizh019/CHILL_SPACE_v3",
        demo: "https://tamizh-loginpage.netlify.app/"
      },
      isFeatured: true
    },
    {
      title: "Data-Talk – Conversational AI for Databases",
      description: "Enterprise-grade Text-to-SQL platform — chat with your PostgreSQL database in plain English. 10-agent pipeline generates SQL, runs it securely, renders 23+ interactive charts, and writes a plain-English summary in real-time.",
      techStack: ["Python", "FastAPI", "LangChain", "Gemini API", "pgvector", "LlamaIndex", "Redis", "Supabase", "Plotly.js"],
      features: [
        "10-agent pipeline: routing, SQL gen, QA review, Python analytics, visualization, error handling",
        "Schema RAG using pgvector + LlamaIndex with MD5-hashed embedding cache — skips API calls on reconnect",
        "Self-correcting SQL: QA Agent reviews pre-execution; auto-rewrites and retries on DB rejection",
        "23+ Plotly.js chart types with AI-driven chart selection, Dashboard Studio, and live cross-filtering",
        "SSE-based real-time streaming, Redis result caching, and Supabase conversation persistence"
      ],
      links: {
        github: "https://github.com/Tamizh019/Data-Talk"
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
      isFeatured: false,
      team: [
        { name: "Arunmozhi" },
        { name: "Jenivaa" },
        { name: "Pradeepraja" },
        { name: "Dilshan" }

      ]
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
    },
    {
      title: "NutriChef AI",
      description: "AI-powered smart kitchen companion — generate full recipes from your ingredients, track nutrition, and cook step-by-step with Gemini AI.",
      techStack: ["Next.js 16", "React 19", "FastAPI", "Gemini API", "Supabase", "Framer Motion"],
      features: [
        "AI recipe generation from available ingredients with full macro breakdown",
        "Per-meal nutrition tracker: calories, protein, carbs, fat — visualised",
        "Distraction-free Cook Mode with step-by-step guidance",
        "AI chatbot for nutrition & cooking questions",
        "Auto-generated grocery lists from any recipe"
      ],
      links: {
        github: "https://github.com/Tamizh019/NutriChef-AI"
      },
      isFeatured: false,
      team: [
        { name: "Pradeepraja" },
        { name: "Arundhathi" }
      ]
    },
    {
      title: "PolicyHub – RAG Chatbot",
      description: "RAG-powered HR & IT assistant — upload company documents and get instant, context-aware answers using LangChain + Groq LLaMA.",
      techStack: ["Python", "Flask", "LangChain", "FAISS", "Groq AI", "Supabase"],
      features: [
        "RAG pipeline: PDF/DOCX/TXT upload → chunking → FAISS vector indexing",
        "LLaMA 3.1 70B via Groq for fast, grounded conversational responses",
        "HuggingFace all-MiniLM-L6-v2 embeddings for semantic document retrieval",
        "Dual auth: Supabase OAuth + Flask session fallback",
        "Context-aware chat history across 50 messages per user"
      ],
      links: {
        github: "https://github.com/Tamizh019/CHATBOT"
      },
      isFeatured: false
    },
    {
      title: "AI Voice Detection API",
      description: "FastAPI-powered API to classify whether an audio sample is AI-generated or genuine human speech — deployed on Hugging Face Spaces.",
      techStack: ["Python", "FastAPI", "Docker", "librosa", "NumPy", "Hugging Face"],
      features: [
        "Classifies audio as AI-generated or human with a 0–1 confidence score",
        "Supports 5 languages: Tamil, English, Hindi, Malayalam, Telugu",
        "Analyzes spectral flatness, pitch variation, MFCCs, and energy patterns",
        "REST API with API-key authentication, deployed via Docker on Hugging Face",
        "Results returned in 2–5 seconds with detailed explanation"
      ],
      links: {
        demo: "https://huggingface.co/spaces/Tamizh019/AI_Voice_Detection"
      },
      isFeatured: false,
      team: [
        { name: "Ajay" },
        { name: "Varshini Sekar" },
        { name: "Faheem" }
      ]
    },
    {
      title: "DreamTrack",
      description: "Modern Kanban task management app with glassmorphism design, drag-and-drop boards, live countdown timers, and confetti completion celebrations.",
      techStack: ["HTML5", "CSS3", "JavaScript", "Netlify"],
      features: [
        "Kanban board with drag-and-drop across To Do, In Progress & Completed columns",
        "Task timer system: quick presets (30min, 1hr, 2hr) or custom — persisted across sessions",
        "Glassmorphism UI with dark & light mode and smooth micro-animations",
        "Confetti celebration + motivational quotes on task completion",
        "Fully client-side with localStorage persistence — no backend needed"
      ],
      links: {
        demo: "https://dreamtrack-tracker.netlify.app/"
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
    "Building weekend projects & micro-tools",
    "UI / UX Exploration & Design Systems",
    "3d Designing (Blender) and Game development"
  ]
};
