import { UserData } from './types';

export const PORTFOLIO_DATA: UserData = {
  name: "Tamizharasan R",
  age: 19,
  location: "Chennai, Tamil Nadu, India",
  email: "jefftamizh@gmail.com",
  linkedin: "linkedin.com/in/tamizharasan-r-a6931828a",
  github: "github.com/Tamizh019",
  role: "CS Engineer & Full-Stack Developer",
  bio: "I am a 19-year-old Computer Science Engineering student specializing in Artificial Intelligence at SIST, Chennai. Passionate about building scalable, user-centric digital experiences, I bridge the gap between complex backend logic and beautiful frontend designs. Currently actively preparing for placements.",
  education: [
    {
      institution: "Sathyabama Institute of Science and Technology (SIST)",
      degree: "B.Tech in CSE - Artificial Intelligence",
      details: "3rd Year | Actively preparing for placements",
      year: "Present"
    },
    {
      institution: "FacePrep Institute",
      degree: "Placement Preparation",
      details: "Focus on Java Full-Stack Development (Java, Spring Boot, React, PostgreSQL)",
      year: "Ongoing"
    }
  ],
  skills: [
    { category: "Languages", skills: ["Java (OOP, Collections)", "Python", "JavaScript", "SQL", "C++"] },
    { category: "Frontend", skills: ["React.js", "Bootstrap", "HTML5/CSS3", "Vite"] },
    { category: "Backend", skills: ["Spring Boot", "Flask", "Supabase", "RESTful APIs", "JDBC"] },
    { category: "Databases", skills: ["MySQL", "PostgreSQL", "Supabase"] },
    { category: "Tools", skills: ["Git/GitHub", "Docker", "VS Code", "Eclipse", "Cursor IDE"] },
    { category: "Specialized", skills: ["AI/ML (LangChain)", "IoT (Arduino)", "Unity (VR/AR)"] }
  ],
  experience: [
    {
      role: "Java Developer Intern",
      company: "Team Project Internship",
      project: "Enterprise CRM System",
      responsibilities: [
        "Collaborative development in a team environment",
        "Database design and integration with MySQL",
        "Implemented backend business logic and full CRUD functionality"
      ]
    }
  ],
  projects: [
    {
      title: "Chill Space",
      description: "Production-ready full-stack authentication platform.",
      techStack: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "Supabase"],
      features: [
        "Modern authentication with email verification",
        "Google OAuth sign-in integration",
        "Responsive design with particle animations",
        "Security-focused with CSRF protection"
      ],
      links: { github: "https://github.com/Tamizh019/CHILL_SPACE.git", demo: "https://tamizh-loginpage.netlify.app/" },
      isFeatured: true
    },
    {
      title: "PolicyHub",
      description: "HR/IT chatbot assistant powered by AI.",
      techStack: ["Python", "LangChain", "NLP"],
      features: [
        "AI-powered conversational interface",
        "Enterprise policy assistance",
        "Natural Language Processing"
      ]
    },
    {
      title: "DreamTrack",
      description: "Goal and task tracking application for productivity.",
      techStack: ["Full Stack Web", "localStorage"],
      features: [
        "Task management with drag-and-drop",
        "Timer system with visual warnings",
        "Persistent data storage"
      ]
    },
    {
      title: "Todo Application",
      description: "Robust task management system.",
      techStack: ["React (Vite)", "Spring Boot", "REST API"],
      features: [
        "User authentication and authorization",
        "Modern React frontend",
        "Scalable Spring Boot backend"
      ]
    },
    {
      title: "Weather Sync",
      description: "IoT environmental monitoring system.",
      techStack: ["Arduino", "C++", "DHT22 Sensors"],
      features: [
        "Real-time humidity monitoring",
        "LED brightness control",
        "Hardware-software integration"
      ]
    }
  ],
  interests: [
    "Full-stack Web Development",
    "VR/AR Technology",
    "AI & Machine Learning",
    "Cybersecurity & CTF",
    "Open Source Contributions"
  ],
  hobbies: [
    "Competitive Programming (DSA)",
    "Exploring About New Technologies",
    "UI Component Design"
  ]
};