import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiFramer, SiHtml5,
    SiPython, SiTensorflow, SiScikitlearn, SiOpencv, SiGooglegemini, SiLangchain,
    SiFastapi, SiSpring, SiNodedotjs, SiJavascript, SiMysql, SiPostgresql,
    SiSupabase, SiGit, SiDocker, SiVscodium
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { VscTerminal } from 'react-icons/vsc';
import { BsBraces } from 'react-icons/bs';
import { ChevronRight, Activity, Cpu, Database, Brain, LayoutGrid, Monitor, Server, Settings, Zap } from 'lucide-react';
import { SectionHeading } from '../components/Shared';
import { getLocalPortfolioData } from '../services/portfolio';

/* ── Maps each skill name to { icon, color } ── */
const SKILL_META: Record<string, { icon: React.ReactNode; color: string }> = {
    // Frontend
    'Next.js': { icon: <SiNextdotjs />, color: '#FFFFFF' },
    'React.js': { icon: <SiReact />, color: '#61DAFB' },
    'TypeScript': { icon: <SiTypescript />, color: '#3178C6' },
    'JavaScript': { icon: <SiJavascript />, color: '#F7DF1E' },
    'Tailwind CSS': { icon: <SiTailwindcss />, color: '#38B2AC' },
    'Framer Motion': { icon: <SiFramer />, color: '#F43F5E' },
    'HTML5 / CSS3': { icon: <SiHtml5 />, color: '#E34F26' },

    // AI/ML
    'LangChain': { icon: <SiLangchain />, color: '#b0c2b2' },
    'LlamaIndex': { icon: <BsBraces />, color: '#00A3E0' },
    'FAISS': { icon: <BsBraces />, color: '#00B4D8' },
    'TensorFlow': { icon: <SiTensorflow />, color: '#FF6F00' },
    'Scikit-learn': { icon: <SiScikitlearn />, color: '#F7931E' },
    'OpenCV': { icon: <SiOpencv />, color: '#5C3EE8' },
    'Gemini API': { icon: <SiGooglegemini />, color: '#8E75B2' },
    'RAG Pipelines': { icon: <BsBraces />, color: '#d99a7e' },
    'Prompt Engineering': { icon: <BsBraces />, color: '#dfc8af' },

    // Backend
    'FastAPI': { icon: <SiFastapi />, color: '#009688' },
    'Spring Boot': { icon: <SiSpring />, color: '#6DB33F' },
    'Node.js': { icon: <SiNodedotjs />, color: '#339933' },
    'REST APIs': { icon: <BsBraces />, color: '#94a3b8' },
    'WebSockets': { icon: <VscTerminal />, color: '#F59E0B' },
    'Supabase': { icon: <SiSupabase />, color: '#3ECF8E' },

    // Languages
    'Python': { icon: <SiPython />, color: '#3776AB' },
    'Java': { icon: <FaJava />, color: '#E76F51' },
    'SQL': { icon: <VscTerminal />, color: '#64748b' },

    // Databases & Tools
    'PostgreSQL': { icon: <SiPostgresql />, color: '#4169E1' },
    'MySQL': { icon: <SiMysql />, color: '#4479A1' },
    'pgvector': { icon: <Database size={14} />, color: '#3ECF8E' },
    'Redis': { icon: <VscTerminal />, color: '#D82C20' },
    'Git': { icon: <SiGit />, color: '#F05032' },
    'Docker': { icon: <SiDocker />, color: '#2496ED' },
    'VS Code': { icon: <SiVscodium />, color: '#007ACC' },
};

/* ── Category metadata for sidebar ── */
const CATEGORIES = [
    { key: 'All', label: 'All Fields' },
    { key: 'AI / ML & LLMs', label: 'AI & LLMs' },
    { key: 'Frontend', label: 'Frontend' },
    { key: 'Backend & APIs', label: 'Backend & APIs' },
    { key: 'Databases & Tools', label: 'Databases & Tools' },
    { key: 'Languages', label: 'Languages' },
];

const getCategoryIcon = (key: string) => {
    switch (key) {
        case 'All': return <LayoutGrid size={16} />;
        case 'AI / ML & LLMs': return <Brain size={16} />;
        case 'Frontend': return <Monitor size={16} />;
        case 'Backend & APIs': return <Server size={16} />;
        case 'Databases & Tools': return <Database size={16} />;
        case 'Languages': return <Settings size={16} />;
        default: return <Settings size={16} />;
    }
};

const getCategoryDescription = (key: string) => {
    switch (key) {
        case 'All': return 'Comprehensive stack overview';
        case 'AI / ML & LLMs': return 'RAG pipelines, agent frameworks';
        case 'Frontend': return 'Next.js layouts, fluid motion interfaces';
        case 'Backend & APIs': return 'FastAPI servers, microservices';
        case 'Databases & Tools': return 'PostgreSQL, Supabase grid, Docker';
        case 'Languages': return 'Core Python, TypeScript, Java & SQL';
        default: return 'Software engineering frameworks';
    }
};

/* ── Panel Footer Component: Displays My Specific Skills & Highlights ── */
const PanelFooterSkills = ({ 
    categorySkills, 
    experienceSummary,
    borderColorClass = 'border-accent/30',
    bgClass = 'bg-accent/5'
}: { 
    categorySkills: string[], 
    experienceSummary: string,
    borderColorClass?: string,
    bgClass?: string
}) => {
    return (
        <div className="border-t border-border/30 pt-6 space-y-4">
            {/* Skills Badges Grid */}
            <div className="space-y-2">
                <h4 className="text-[9px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1.5 select-none">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                    My Verified Tech & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => {
                        const meta = SKILL_META[skill] ?? { icon: <BsBraces />, color: '#94a3b8' };
                        return (
                            <div
                                key={skill}
                                style={{ '--brand-color': meta.color } as React.CSSProperties}
                                className="tech-pill flex items-center gap-2 px-3 py-1.5 border border-border/40 hover:border-[var(--brand-color)] hover:bg-[var(--brand-color)]/5 text-slate-350 hover:text-white transition-all duration-300 rounded-lg group select-none cursor-default"
                            >
                                <span style={{ color: meta.color }} className="transition-transform group-hover:scale-110 duration-200">
                                    {meta.icon}
                                </span>
                                <span className="text-[11px] font-mono">{skill}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Experience / Application Summary */}
            <div className={`p-4 rounded-xl border ${borderColorClass} ${bgClass} space-y-1.5`}>
                <h4 className="text-[9px] font-mono text-white font-semibold flex items-center gap-1.5 select-none">
                    <Zap size={10} className="text-accent2" /> PROJECT APPLICATION
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-light select-text">
                    {experienceSummary}
                </p>
            </div>
        </div>
    );
};

/* ── SUB-COMPONENT: All Fields Overview ── */
const AllSkillsShowcase = ({ skillsData }: { skillsData: any[] }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            <div className="glass-panel border border-border/40 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-display font-bold text-white tracking-wide">
                            Full-Stack Tech Radar
                        </h3>
                        <p className="text-xs text-slate-400 font-light mt-1">
                            An integrated overview of my entire software development and AI engineering stack.
                        </p>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 bg-secondary px-3 py-1 rounded-full border border-border/40">
                        35+ Techs
                    </span>
                </div>

                {/* Stats Summary Rows */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { label: 'AI Specialization', val: 'RAG / LLMs' },
                        { label: 'Primary Language', val: 'Python / TS' },
                        { label: 'Backend Standard', val: 'FastAPI / Node' },
                        { label: 'Database Standard', val: 'PostgreSQL' }
                    ].map(st => (
                        <div key={st.label} className="bg-primary/30 border border-border/30 rounded-xl p-3.5 text-center">
                            <span className="block text-[10px] font-mono text-slate-500 uppercase">{st.label}</span>
                            <span className="block text-xs font-semibold text-accent mt-1 tracking-wide">{st.val}</span>
                        </div>
                    ))}
                </div>

                {/* Dense Grid of Badges grouped by category */}
                <div className="space-y-6 pt-2">
                    {skillsData.map((catGroup) => (
                        <div key={catGroup.category} className="space-y-3">
                            <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                                {catGroup.category}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {catGroup.skills.map((skill: string) => {
                                    const meta = SKILL_META[skill] ?? { icon: <BsBraces />, color: '#94a3b8' };
                                    return (
                                        <div
                                            key={skill}
                                            style={{ '--brand-color': meta.color } as React.CSSProperties}
                                            className="tech-pill flex items-center gap-2 px-3 py-1.5 border border-border/40 hover:border-[var(--brand-color)] hover:bg-[var(--brand-color)]/5 text-slate-350 hover:text-white transition-all duration-300 rounded-lg group select-none cursor-default"
                                        >
                                            <span style={{ color: meta.color }} className="transition-transform group-hover:scale-110 duration-200">
                                                {meta.icon}
                                            </span>
                                            <span className="text-[11px] font-mono">{skill}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

/* ── SUB-COMPONENT: AI & LLMs Pipeline ── */
const AIMLShowcase = () => {
    const [selectedNode, setSelectedNode] = useState<number>(0);
    const nodes = [
        {
            title: 'Knowledge Source',
            subtitle: 'Unstructured PDFs / Docs',
            desc: 'Loads documentation, manuals, or custom text repositories into the system parser memory.',
            tech: 'PDF Ingestion, Chunking',
            icon: '📄'
        },
        {
            title: 'Vector Embedding',
            subtitle: 'Gemini text-embedding-004',
            desc: 'Generates dense, high-dimensional vector representations capturing semantic structure and similarity indices.',
            tech: 'Gemini API, Cosine Vectors',
            icon: '⚡'
        },
        {
            title: 'Index Store',
            subtitle: 'FAISS Vector Database',
            desc: 'Indexes database embeddings to facilitate sub-millisecond similarity scans over millions of chunks.',
            tech: 'FAISS, pgvector',
            icon: '📦'
        },
        {
            title: 'Contextual Retrieval',
            subtitle: 'Similarity Ranker',
            desc: 'Retrieves top-K relevant text segments that matches the user\'s context to guide the prompt.',
            tech: 'LangChain, Semantic Search',
            icon: '🔍'
        },
        {
            title: 'Synthesized QA',
            subtitle: 'Hallucination Guard LLM',
            desc: 'Synthesizes a grounded query response backed by cited sources, bypassing LLM hallucinations.',
            tech: 'Gemini 1.5 Pro, Agent Loops',
            icon: '🤖'
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            <div className="glass-panel border border-border/40 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-display font-bold text-white tracking-wide">
                            AI Orchestration & RAG Pipelines
                        </h3>
                        <p className="text-xs text-slate-400 font-light mt-1">
                            Self-correcting semantic query paths connecting vector indices and LLMs.
                        </p>
                    </div>
                </div>

                {/* Pipeline Flow Visualization */}
                <div className="bg-primary/50 border border-border/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden select-none">
                    {/* Glowing flow background line */}
                    <div className="hidden md:block absolute top-[43%] left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-accent/20 via-accent2/40 to-accent3/20 z-0" />
                    
                    {nodes.map((node, idx) => {
                        const isNodeSelected = selectedNode === idx;
                        return (
                            <React.Fragment key={idx}>
                                <button
                                    onClick={() => setSelectedNode(idx)}
                                    className={`relative z-10 flex flex-col items-center group cursor-pointer transition-all duration-300 ${
                                        isNodeSelected ? 'scale-110' : 'hover:scale-105'
                                    }`}
                                >
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all duration-300 border ${
                                        isNodeSelected 
                                            ? 'bg-accent/15 border-accent text-accent shadow-[0_0_20px_rgba(176,194,178,0.25)]'
                                            : 'bg-surface border-border text-slate-400 group-hover:border-slate-500'
                                    }`}>
                                        {node.icon}
                                    </div>
                                    <span className={`text-[9px] font-mono mt-2 transition-colors ${
                                        isNodeSelected ? 'text-accent font-bold' : 'text-slate-500 group-hover:text-slate-355'
                                    }`}>
                                        {node.title.split(' ')[0]}
                                    </span>
                                </button>
                                {idx < nodes.length - 1 && (
                                    <div className="hidden md:block text-[10px] text-slate-700 font-mono animate-pulse">
                                        ➔
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                {/* Node Detail Box */}
                <div className="bg-primary/30 border border-border/30 rounded-xl p-5 space-y-2 min-h-[120px] transition-all duration-300">
                    <div className="flex items-center justify-between border-b border-border/30 pb-2">
                        <div>
                            <span className="text-[9px] font-mono text-accent uppercase tracking-widest">RAG PIPELINE / STEP 0{selectedNode + 1}</span>
                            <h4 className="text-sm font-semibold text-white mt-0.5">
                                {nodes[selectedNode].title}
                            </h4>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">
                            {nodes[selectedNode].subtitle}
                        </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-light pt-1">
                        {nodes[selectedNode].desc}
                    </p>
                    <div className="flex items-center gap-1.5 pt-2">
                        <span className="text-[9px] font-mono text-slate-500 uppercase">Engineered stack:</span>
                        <span className="text-[9px] font-mono text-accent2 bg-accent2/5 px-2 py-0.5 border border-accent2/25 rounded">
                            {nodes[selectedNode].tech}
                        </span>
                    </div>
                </div>

                {/* Skill Badges & Experience Footer */}
                <PanelFooterSkills
                    categorySkills={['LangChain', 'LlamaIndex', 'FAISS', 'Gemini API', 'RAG Pipelines', 'Prompt Engineering', 'TensorFlow', 'Scikit-learn', 'OpenCV']}
                    experienceSummary="Architected a self-correcting query pipeline for Data-Talk, integrating LangChain prompt routing, similarity rankers via FAISS vector storage, and Gemini models with JSON schema structures."
                    borderColorClass="border-accent/30"
                    bgClass="bg-accent/5"
                />
            </div>
        </motion.div>
    );
};

/* ── SUB-COMPONENT: Frontend Motion Sandbox ── */
const FrontendShowcase = () => {
    const [animationPreset, setAnimationPreset] = useState<'spring' | 'bounce' | 'ease' | 'linear'>('spring');
    const [clickCount, setClickCount] = useState<number>(0);

    const getTransition = () => {
        switch (animationPreset) {
            case 'spring': return { type: 'spring', stiffness: 120, damping: 14 };
            case 'bounce': return { type: 'spring', stiffness: 260, damping: 6 };
            case 'ease': return { ease: 'easeInOut', duration: 0.6 };
            case 'linear': return { ease: 'linear', duration: 0.4 };
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            <div className="glass-panel border border-border/40 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-display font-bold text-white tracking-wide">
                            Interactive Motion & UX
                        </h3>
                        <p className="text-xs text-slate-400 font-light mt-1">
                            Creating tactile animations and fluid interfaces using Framer Motion.
                        </p>
                    </div>
                </div>

                {/* Preset Controls */}
                <div className="bg-[#101018]/50 border border-border/30 rounded-2xl p-4 flex items-center justify-between gap-3 flex-wrap">
                    <span className="text-[9px] font-mono text-slate-500 uppercase select-none">Preset:</span>
                    <div className="flex gap-2">
                        {(['spring', 'bounce', 'ease', 'linear'] as const).map(p => (
                            <button
                                key={p}
                                onClick={() => setAnimationPreset(p)}
                                className={`px-3 py-1 rounded text-[10px] font-mono transition-all cursor-pointer ${
                                    animationPreset === p 
                                        ? 'bg-accent2 text-primary font-bold shadow'
                                        : 'bg-surface/50 border border-border/40 text-slate-400 hover:text-slate-200'
                                }`}
                            >
                                {p.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Interactive Sandbox Canvas */}
                <div className="bg-primary/50 border border-border/30 rounded-2xl p-12 flex flex-col items-center justify-center min-h-[160px] relative overflow-hidden select-none">
                    <motion.div
                        key={clickCount + animationPreset}
                        initial={{ scale: 0.8, rotate: 0, borderRadius: '16px' }}
                        animate={{ 
                            scale: 1, 
                            rotate: clickCount % 2 === 0 ? 0 : 45,
                            borderRadius: clickCount % 2 === 0 ? '16px' : '9999px',
                            background: clickCount % 2 === 0 
                                ? 'linear-gradient(135deg, #b0c2b2 0%, #d99a7e 100%)' 
                                : 'linear-gradient(135deg, #d99a7e 0%, #dfc8af 100%)'
                        }}
                        transition={getTransition()}
                        onClick={() => setClickCount(c => c + 1)}
                        className="w-16 h-16 shadow-[0_10px_25px_rgba(0,0,0,0.3)] cursor-pointer flex items-center justify-center font-mono text-[9px] text-primary font-bold text-center uppercase"
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Tap Me
                    </motion.div>
                    
                    <span className="text-[8px] font-mono text-slate-500 mt-6 select-none uppercase">
                        Transition: {JSON.stringify(getTransition())}
                    </span>
                </div>

                {/* Technical highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-primary/30 border border-border/30 rounded-xl p-4 space-y-1">
                        <h4 className="text-[10px] font-mono text-slate-500 uppercase">Declarative Layouts</h4>
                        <p className="text-xs text-slate-300 leading-relaxed font-light">
                            Harnessing CSS variables and flexbox grids to enforce fluid layouts responsive down to 320px viewports.
                        </p>
                    </div>
                    <div className="bg-primary/30 border border-border/30 rounded-xl p-4 space-y-1">
                        <h4 className="text-[10px] font-mono text-slate-500 uppercase">Micro-interactions</h4>
                        <p className="text-xs text-slate-300 leading-relaxed font-light">
                            Adding visual weight and satisfaction to buttons and cards, giving the site a tactile feel.
                        </p>
                    </div>
                </div>

                {/* Skill Badges & Experience Footer */}
                <PanelFooterSkills
                    categorySkills={['Next.js', 'React.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'HTML5 / CSS3']}
                    experienceSummary="Developed high-fidelity, interactive user interfaces including customizable slideshow lightboxes, scroll-bound headers, and drag-to-sort dashboards across Chill Space and Valluge."
                    borderColorClass="border-accent2/30"
                    bgClass="bg-accent2/5"
                />
            </div>
        </motion.div>
    );
};

/* ── SUB-COMPONENT: Backend Benchmarks ── */
const BackendShowcase = () => {
    const [pings, setPings] = useState<{ id: number; timestamp: string; latency: number; cached: boolean }[]>([
        { id: 1, timestamp: '19:42:01', latency: 74, cached: false },
        { id: 2, timestamp: '19:42:03', latency: 2, cached: true },
        { id: 3, timestamp: '19:42:06', latency: 68, cached: false },
        { id: 4, timestamp: '19:42:07', latency: 1, cached: true }
    ]);
    const [isPinging, setIsPinging] = useState(false);

    const triggerPing = () => {
        if (isPinging) return;
        setIsPinging(true);
        setTimeout(() => {
            const cached = Math.random() > 0.5;
            const latency = cached ? Math.floor(Math.random() * 3) + 1 : Math.floor(Math.random() * 40) + 45;
            const now = new Date();
            const timeStr = now.toTimeString().split(' ')[0];
            setPings(prev => [...prev.slice(-3), { id: Date.now(), timestamp: timeStr, latency, cached }]);
            setIsPinging(false);
        }, 600);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            <div className="glass-panel border border-border/40 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-display font-bold text-white tracking-wide">
                            Backend & API Benchmark
                        </h3>
                        <p className="text-xs text-slate-400 font-light mt-1">
                            Performance testing for sub-100ms FastAPI endpoints integrated with Redis caches.
                        </p>
                    </div>
                </div>

                {/* API latency graphs */}
                <div className="space-y-4">
                    <div className="bg-[#101018]/50 border border-border/30 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="space-y-3 w-full md:w-3/5">
                            <div>
                                <div className="flex justify-between text-[8px] font-mono text-slate-500 mb-1">
                                    <span>FASTAPI SECURE ROUTER</span>
                                    <span className="text-accent">&lt; 80ms average</span>
                                </div>
                                <div className="h-1 bg-border/40 rounded-full overflow-hidden">
                                    <div className="h-full bg-accent rounded-full w-[76%]" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-[8px] font-mono text-slate-500 mb-1">
                                    <span>REDIS SESSION CACHE</span>
                                    <span className="text-accent2">2ms response time</span>
                                </div>
                                <div className="h-1 bg-border/40 rounded-full overflow-hidden">
                                    <div className="h-full bg-accent2 rounded-full w-[12%]" />
                                </div>
                            </div>
                        </div>

                        {/* Ping button trigger */}
                        <div className="shrink-0 flex items-center justify-center w-full md:w-auto">
                            <button
                                onClick={triggerPing}
                                disabled={isPinging}
                                className="flex items-center gap-2 bg-accent text-[#0a0a0f] hover:bg-accent/90 disabled:opacity-50 transition-all font-mono text-xs font-bold px-5 py-3 rounded-xl shadow-lg cursor-pointer"
                            >
                                <Activity size={14} className={isPinging ? 'animate-pulse' : ''} />
                                {isPinging ? 'PINGING...' : 'PING MOCK API'}
                            </button>
                        </div>
                    </div>

                    {/* Latency Log Console Output */}
                    <div className="bg-[#050508] border border-border/80 rounded-2xl overflow-hidden shadow-xl p-4 flex flex-col">
                        <div className="flex items-center justify-between border-b border-border/40 pb-2 mb-3">
                            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Live latency analyzer logs</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500/80 animate-pulse" />
                        </div>
                        <div className="font-mono text-[10px] space-y-2 min-h-[100px] select-text">
                            {pings.map((ping) => (
                                <div key={ping.id} className="flex justify-between items-center text-slate-400">
                                    <span>
                                        <span className="text-slate-500 font-mono">[{ping.timestamp}]</span> POST /api/v1/query - status: <span className="text-green-500">200 OK</span>
                                    </span>
                                    <span className={ping.cached ? 'text-accent2' : 'text-accent'}>
                                        {ping.latency}ms {ping.cached ? '(Redis Cache Hit)' : '(Direct DB)'}
                                    </span>
                                </div>
                            ))}
                            {isPinging && (
                                <div className="text-slate-655 animate-pulse font-mono">
                                    * Pinging router middleware endpoint /api/v1/query...
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Skill Badges & Experience Footer */}
                <PanelFooterSkills
                    categorySkills={['FastAPI', 'Spring Boot', 'Node.js', 'REST APIs', 'WebSockets', 'Supabase']}
                    experienceSummary="Engineered high-performance RESTful APIs in FastAPI, WebSockets handling sub-100ms real-time messages in Chill Space, and Server-Sent Events (SSE) for data streams."
                    borderColorClass="border-accent3/30"
                    bgClass="bg-accent3/5"
                />
            </div>
        </motion.div>
    );
};

/* ── SUB-COMPONENT: Database Table Editor Grid (Supabase-like) ── */
const DatabaseShowcase = () => {
    const [mockRows, setMockRows] = useState([
        {
            id: '8f8b8a5c-c76b-4e12-b12e-1c6f7f6a8e4c',
            user_id: 'e2e3e4f5-g6h7-8i9j-0k1l-2m3n4o5p6q7r',
            embedding: '[-0.0125, 0.0456, 0.0089, -0.0912, 0.0345, ...]',
            metadata: '{"source": "cv_doc.pdf", "page": 4}',
            created_at: '2026-06-25T14:20:00Z'
        },
        {
            id: '4fba612d-9bc8-4720-bd91-3c6f7f6a8e99',
            user_id: 'a1b2c3d4-e5f6-7g8h-9i0j-1k2l3m4n5o6p',
            embedding: '[0.0567, -0.0112, 0.0894, -0.0023, -0.0431, ...]',
            metadata: '{"source": "rules.md", "section": 2}',
            created_at: '2026-06-25T14:22:15Z'
        },
        {
            id: '9db2e4a8-f54e-48a1-b8d4-5c6f7f6a8eaa',
            user_id: 'e2e3e4f5-g6h7-8i9j-0k1l-2m3n4o5p6q7r',
            embedding: '[-0.0341, 0.0098, -0.0211, 0.0789, 0.0125, ...]',
            metadata: '{"source": "cv_doc.pdf", "page": 5}',
            created_at: '2026-06-25T14:23:45Z'
        }
    ]);

    const addMockRow = () => {
        const id = Math.random().toString(36).substring(2, 10) + '-' + Math.random().toString(36).substring(2, 6) + '-4e12-b12e-' + Math.random().toString(36).substring(2, 14);
        const userId = 'e2e3e4f5-g6h7-8i9j-0k1l-2m3n4o5p6q7r';
        const embedding = `[${(Math.random() * 0.1 - 0.05).toFixed(4)}, ${(Math.random() * 0.1 - 0.05).toFixed(4)}, ${(Math.random() * 0.1 - 0.05).toFixed(4)}, ...]`;
        const metadata = `{"source": "interactive_query.log", "id": ${Math.floor(Math.random() * 100)}}`;
        const now = new Date();
        const created_at = now.toISOString();

        setMockRows(prev => [
            { id, user_id: userId, embedding, metadata, created_at },
            ...prev
        ]);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            <div className="glass-panel border border-border/40 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h3 className="text-xl font-display font-bold text-white tracking-wide">
                            Relational & Vector Data Storage
                        </h3>
                        <p className="text-xs text-slate-400 font-light mt-1">
                            Designing schemas supporting embeddings search (pgvector) and row-level security.
                        </p>
                    </div>
                    <div className="shrink-0 font-mono text-[9px] text-[#3ECF8E] bg-[#3ECF8E]/5 border border-[#3ECF8E]/25 px-3 py-1.5 rounded-full flex items-center gap-1.5 select-none">
                        <Database size={10} /> postgresql + pgvector
                    </div>
                </div>

                {/* Supabase Mock Table UI */}
                <div className="bg-[#050508] border border-border/80 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
                    
                    {/* Database Table Header / Control Bar */}
                    <div className="bg-primary/95 px-4 py-3 border-b border-border/45 flex items-center justify-between gap-3 flex-wrap">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-mono font-bold text-white select-none">table:</span>
                            <span className="text-[10px] font-mono text-accent bg-surface px-2 py-0.5 rounded border border-border/50 select-text">users_embeddings</span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={addMockRow}
                                className="bg-[#3ECF8E] text-[#0a0a0f] hover:bg-[#3ECF8E]/90 text-[10px] font-mono px-2.5 py-1 rounded cursor-pointer font-bold shadow transition-all select-none"
                            >
                                + Insert row
                            </button>
                            <span className="text-[10px] font-mono text-slate-500 bg-surface/50 border border-border/40 px-2 py-1 rounded select-none">
                                {mockRows.length} rows
                            </span>
                        </div>
                    </div>

                    {/* Table Grid View */}
                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-left font-mono text-[10px] border-collapse min-w-[600px]">
                            <thead>
                                <tr className="border-b border-border/40 bg-secondary/30 text-slate-500 font-bold select-none">
                                    <th className="p-3 border-r border-border/40">id (uuid)</th>
                                    <th className="p-3 border-r border-border/40">user_id (uuid)</th>
                                    <th className="p-3 border-r border-border/40">embedding (vector)</th>
                                    <th className="p-3 border-r border-border/40">metadata (jsonb)</th>
                                    <th className="p-3">created_at (timestamptz)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/20 text-slate-355 select-text">
                                {mockRows.map(row => (
                                    <tr key={row.id} className="hover:bg-surface/30 transition-colors">
                                        <td className="p-3 border-r border-border/20 font-mono text-slate-500 whitespace-nowrap truncate max-w-[120px]" title={row.id}>{row.id}</td>
                                        <td className="p-3 border-r border-border/20 font-mono text-slate-500 whitespace-nowrap truncate max-w-[120px]" title={row.user_id}>{row.user_id}</td>
                                        <td className="p-3 border-r border-border/20 text-[#3ECF8E] max-w-[150px] truncate" title={row.embedding}>{row.embedding}</td>
                                        <td className="p-3 border-r border-border/20 text-accent2 max-w-[150px] truncate" title={row.metadata}>{row.metadata}</td>
                                        <td className="p-3 text-slate-400 whitespace-nowrap">{row.created_at}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Database Statistics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { label: 'DB SIZE', val: '142.6 MB' },
                        { label: 'ROW COUNT', val: '8,412 rows' },
                        { label: 'AVG SCAN TIME', val: '1.4 ms' },
                        { label: 'CONNECTIONS', val: '4 / 100' }
                    ].map(d => (
                        <div key={d.label} className="bg-primary/20 border border-border/30 rounded-xl p-3 text-center">
                            <span className="block text-[8px] font-mono text-slate-500 uppercase">{d.label}</span>
                            <span className="block text-xs font-semibold text-slate-300 mt-0.5 font-mono">{d.val}</span>
                        </div>
                    ))}
                </div>

                {/* Skill Badges & Experience Footer */}
                <PanelFooterSkills
                    categorySkills={['PostgreSQL', 'MySQL', 'pgvector', 'Redis', 'Supabase']}
                    experienceSummary="Designed highly normalized relational databases across MySQL and PostgreSQL. Integrated pgvector similarity queries, session caches using Redis, and robust row-level security policies in Supabase."
                    borderColorClass="border-accent/30"
                    bgClass="bg-accent/5"
                />
            </div>
        </motion.div>
    );
};

/* ── SUB-COMPONENT: Languages Snippets Showcase ── */
const LanguagesToolsShowcase = () => {
    const [activeLang, setActiveLang] = useState<'python' | 'typescript' | 'sql' | 'java'>('python');

    const snippets = {
        python: `def get_grounded_response(user_query: str) -> dict:
    # Perform pgvector similarity search
    chunks = db.search_similar_chunks(user_query, k=4)
    
    # Format prompts with grounded contexts
    prompt = prompt_template.format(
        context="\\n".join([c.text for c in chunks]),
        query=user_query
    )
    
    # Query Gemini LLM with structured schemas
    response = gemini_client.generate(prompt, response_mime="application/json")
    return json.loads(response)`,

        typescript: `export const useRAGStream = (query: string) => {
  const [data, setData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchStream = async () => {
    setLoading(true);
    const response = await fetch("/api/query", { method: "POST", body: JSON.stringify({ query }) });
    const reader = response.body?.getReader();
    // Decode Server-Sent Events stream ...
  };
  return { data, loading, fetchStream };
};`,

        sql: `-- pgvector similarity search query
SELECT id, source_document, page_number, 
       1 - (embedding <=> $1) AS similarity_score
FROM users_embeddings
WHERE 1 - (embedding <=> $1) > 0.78
ORDER BY embedding <=> $1
LIMIT 4;`,

        java: `public List<LeadDto> getActiveLeads(Long userId) {
    return leadRepository.findAllByUserId(userId)
        .stream()
        .filter(Lead::isActive)
        .map(lead -> new LeadDto(lead.getId(), lead.getName(), lead.getStage()))
        .collect(Collectors.toList());
}`
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            <div className="glass-panel border border-border/40 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-display font-bold text-white tracking-wide">
                            Languages & Coding Design
                        </h3>
                        <p className="text-xs text-slate-400 font-light mt-1">
                            Writing strongly typed, modular logic across backend, client-side, and database scopes.
                        </p>
                    </div>
                </div>

                {/* Tab selector */}
                <div className="bg-[#101018]/50 border border-border/30 rounded-2xl p-4 flex gap-2 overflow-x-auto select-none">
                    {(['python', 'typescript', 'sql', 'java'] as const).map(lang => (
                        <button
                            key={lang}
                            onClick={() => setActiveLang(lang)}
                            className={`px-3.5 py-1.5 rounded-lg text-[10px] font-mono tracking-wide transition-all duration-200 cursor-pointer ${
                                activeLang === lang
                                    ? 'bg-accent text-[#0a0a0f] font-bold shadow'
                                    : 'bg-transparent text-slate-500 hover:text-slate-300'
                            }`}
                        >
                            {lang.toUpperCase()}
                        </button>
                    ))}
                </div>

                {/* Code Window Display */}
                <div className="bg-[#050508] border border-border/80 rounded-2xl overflow-hidden shadow-xl flex flex-col">
                    <div className="bg-primary/95 px-4 py-2.5 border-b border-border/45 flex items-center justify-between">
                        <span className="text-[9px] font-mono text-slate-500">
                            main.{activeLang === 'typescript' ? 'ts' : activeLang === 'sql' ? 'sql' : activeLang === 'java' ? 'java' : 'py'}
                        </span>
                        <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                    </div>
                    <pre className="p-4 text-[10px] sm:text-[11px] font-mono text-slate-350 overflow-x-auto whitespace-pre leading-relaxed select-text">
                        <code>{snippets[activeLang]}</code>
                    </pre>
                </div>

                {/* Skill Badges & Experience Footer */}
                <PanelFooterSkills
                    categorySkills={['Python', 'Java', 'SQL', 'Git', 'Docker', 'VS Code']}
                    experienceSummary="Proficient in object-oriented and functional designs. Managed container microservices clusters using Docker Compose, tracked commits using Git, and built structured logic across multiple runtime environments."
                    borderColorClass="border-accent2/30"
                    bgClass="bg-accent2/5"
                />
            </div>
        </motion.div>
    );
};

/* ── MAIN COMPONENT: Skills Page ── */
export default function Skills() {
    const PORTFOLIO_DATA = getLocalPortfolioData();
    const [activeFilter, setActiveFilter] = useState('All');

    const renderShowcasePanel = () => {
        switch (activeFilter) {
            case 'All':
                return <AllSkillsShowcase key="All" skillsData={PORTFOLIO_DATA.skills} />;
            case 'AI / ML & LLMs':
                return <AIMLShowcase key="AI" />;
            case 'Frontend':
                return <FrontendShowcase key="Frontend" />;
            case 'Backend & APIs':
                return <BackendShowcase key="Backend" />;
            case 'Databases & Tools':
                return <DatabaseShowcase key="Database" />;
            case 'Languages':
                return <LanguagesToolsShowcase key="Languages" />;
            default:
                return <AllSkillsShowcase key="All" skillsData={PORTFOLIO_DATA.skills} />;
        }
    };

    return (
        <section className="py-20 relative flex-grow dot-grid text-slate-350 select-none">
            <div className="max-w-6xl mx-auto px-6">

                {/* Section Header with smooth fade entry */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <SectionHeading prefix="02" title="Technical" accent="Arsenal" />
                    <p className="text-slate-400 mt-4 max-w-xl text-sm leading-relaxed font-light">
                        A curated catalog mapping my architecture expertise, full-stack workflows, and AI frameworks. Use the sidebar to inspect specific domains.
                    </p>
                </motion.div>

                {/* Responsive Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column: Sidebar Navigation */}
                    <div className="lg:col-span-4 flex flex-col gap-3">
                        {CATEGORIES.map(cat => {
                            const isActive = activeFilter === cat.key;
                            return (
                                <button
                                    key={cat.key}
                                    onClick={() => setActiveFilter(cat.key)}
                                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 group relative overflow-hidden cursor-pointer ${
                                        isActive
                                            ? 'bg-surface border-accent/40 shadow-[0_4px_20px_rgba(176,194,178,0.06)]'
                                            : 'bg-transparent border-transparent hover:bg-surface/30 hover:border-border/60'
                                    }`}
                                >
                                    {/* Active indicator bar */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeCategoryIndicator"
                                            className="absolute left-0 top-0 bottom-0 w-1.5 bg-accent"
                                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                        />
                                    )}

                                    {/* Icon Box */}
                                    <div className={`p-2.5 rounded-xl border transition-all duration-300 ${
                                        isActive
                                            ? 'bg-accent/15 border-accent/30 text-accent'
                                            : 'bg-surface/60 border-border/50 text-slate-500 group-hover:text-slate-350'
                                    }`}>
                                        {getCategoryIcon(cat.key)}
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <h4 className={`text-xs font-semibold tracking-wide font-mono transition-colors ${
                                            isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                                        }`}>
                                            {cat.label}
                                        </h4>
                                        <p className="text-[10px] text-slate-500 font-light mt-0.5 max-w-[200px]">
                                            {getCategoryDescription(cat.key)}
                                        </p>
                                    </div>

                                    <ChevronRight size={14} className={`ml-auto transition-transform duration-300 ${
                                        isActive ? 'text-accent translate-x-0' : 'text-slate-655 group-hover:translate-x-1'
                                    }`} />
                                </button>
                            );
                        })}
                    </div>

                    {/* Right Column: Dynamic Content Panel with smooth crossfades */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            {renderShowcasePanel()}
                        </AnimatePresence>
                    </div>

                </div>

            </div>
        </section>
    );
}
