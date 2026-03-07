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
import { SectionHeading } from '../components/Shared';

/* ── Maps each skill name to { icon, color } ── */
const SKILL_META: Record<string, { icon: React.ReactNode; color: string }> = {
    // Frontend
    'Next.js': { icon: <SiNextdotjs />, color: '#FFFFFF' },
    'React.js': { icon: <SiReact />, color: '#61DAFB' },
    'TypeScript': { icon: <SiTypescript />, color: '#3178C6' },
    'JavaScript': { icon: <SiJavascript />, color: '#F7DF1E' },
    'Tailwind CSS': { icon: <SiTailwindcss />, color: '#06B6D4' },
    'Framer Motion': { icon: <SiFramer />, color: '#0055FF' },
    'HTML5 / CSS3': { icon: <SiHtml5 />, color: '#E34F26' },

    // AI/ML
    'LangChain': { icon: <SiLangchain />, color: '#1C3C3C' },
    'FAISS': { icon: <BsBraces />, color: '#00B4D8' },
    'TensorFlow': { icon: <SiTensorflow />, color: '#FF6F00' },
    'Scikit-learn': { icon: <SiScikitlearn />, color: '#F7931E' },
    'OpenCV': { icon: <SiOpencv />, color: '#5C3EE8' },
    'Gemini API': { icon: <SiGooglegemini />, color: '#8E75B2' },
    'RAG Pipelines': { icon: <BsBraces />, color: '#00d9ff' },
    'Prompt Engineering': { icon: <BsBraces />, color: '#a855f7' },

    // Backend
    'FastAPI': { icon: <SiFastapi />, color: '#009688' },
    'Spring Boot': { icon: <SiSpring />, color: '#6DB33F' },
    'Node.js': { icon: <SiNodedotjs />, color: '#339933' },
    'REST APIs': { icon: <BsBraces />, color: '#94a3b8' },
    'WebSockets': { icon: <VscTerminal />, color: '#F59E0B' },
    'Supabase': { icon: <SiSupabase />, color: '#3ECF8E' },

    // Languages
    'Python': { icon: <SiPython />, color: '#3776AB' },
    'Java': { icon: <FaJava />, color: '#007396' },
    'SQL': { icon: <VscTerminal />, color: '#64748b' },

    // Databases & Tools
    'PostgreSQL': { icon: <SiPostgresql />, color: '#4169E1' },
    'MySQL': { icon: <SiMysql />, color: '#4479A1' },
    'Git': { icon: <SiGit />, color: '#F05032' },
    'Docker': { icon: <SiDocker />, color: '#2496ED' },
    'VS Code': { icon: <SiVscodium />, color: '#007ACC' },
};

/* ── Framer Motion variants ── */
const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } }
};

const cardVariants = {
    hidden: { opacity: 0, y: 28, scale: 0.9 },
    show: {
        opacity: 1, y: 0, scale: 1,
        transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }
    },
    exit: { opacity: 0, scale: 0.85, y: -10, transition: { duration: 0.25 } }
};

const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
};

/* ── Category config with accent colors ── */
const CATEGORIES = [
    { key: 'All', label: 'All', accent: '#64748b', glow: '#64748b' },
    { key: 'AI / ML & LLMs', label: 'AI / ML & LLMs', accent: '#00d9ff', glow: '#00d9ff' },
    { key: 'Frontend', label: 'Frontend', accent: '#a855f7', glow: '#a855f7' },
    { key: 'Backend & APIs', label: 'Backend & APIs', accent: '#3ECF8E', glow: '#3ECF8E' },
    { key: 'Languages', label: 'Languages', accent: '#F7931E', glow: '#F7931E' },
    { key: 'Databases & Tools', label: 'Databases & Tools', accent: '#4169E1', glow: '#4169E1' },
];

/* ── Each skill icon+name tile ── */
function SkillTile({ skill, accent }: { skill: string; accent: string }) {
    const meta = SKILL_META[skill] ?? { icon: <BsBraces />, color: '#94a3b8' };

    return (
        <motion.div
            variants={cardVariants}
            className="group relative flex flex-col items-center gap-3 p-5 bg-surface border border-border rounded-xl cursor-default transition-all duration-300"
            whileHover={{
                y: -6,
                borderColor: accent + '55',
                boxShadow: `0 0 24px ${accent}20`,
                transition: { duration: 0.2 }
            }}
            title={skill}
        >
            <div
                className="text-3xl transition-all duration-300 drop-shadow-sm group-hover:scale-110"
                style={{ color: meta.color }}
            >
                {meta.icon}
            </div>
            <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors text-center leading-tight font-medium">
                {skill}
            </span>
            {/* Subtle bottom glow on hover */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px opacity-0 group-hover:opacity-100 transition-opacity blur-sm"
                style={{ background: meta.color }}
            />
        </motion.div>
    );
}

/* ── Grouped category block ── */
function CategoryBlock({ category, skills, accent }: { category: string; skills: string[]; accent: string }) {
    return (
        <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="w-full"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="h-5 w-1 rounded-full" style={{ background: accent }} />
                <h3 className="text-sm font-mono font-semibold uppercase tracking-widest" style={{ color: accent }}>
                    {category}
                </h3>
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-slate-600 font-mono">{skills.length} skills</span>
            </div>

            <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
            >
                {skills.map(s => (
                    <React.Fragment key={s}>
                        <SkillTile skill={s} accent={accent} />
                    </React.Fragment>
                ))}
            </motion.div>
        </motion.div>
    );
}

/* ── Skills Page ── */
import { PORTFOLIO_DATA } from '../../constants';

export default function Skills() {
    const [activeFilter, setActiveFilter] = useState('All');

    const filtered = activeFilter === 'All'
        ? PORTFOLIO_DATA.skills
        : PORTFOLIO_DATA.skills.filter(c => c.category === activeFilter);

    const activeCat = CATEGORIES.find(c => c.key === activeFilter) ?? CATEGORIES[0];

    return (
        <section className="py-20 relative flex-grow">
            <div className="max-w-6xl mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <SectionHeading prefix="02" title="Technical" accent="Arsenal" />
                </motion.div>

                {/* ── Filter tabs ── */}
                <motion.div
                    className="flex flex-wrap gap-2 mt-12 mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                >
                    {CATEGORIES.map(cat => (
                        <motion.button
                            key={cat.key}
                            onClick={() => setActiveFilter(cat.key)}
                            className={`relative px-4 py-2 rounded-lg text-xs font-mono font-semibold tracking-wide transition-all duration-300 border ${activeFilter === cat.key
                                ? 'text-primary border-transparent'
                                : 'text-slate-400 border-border hover:border-white/20 hover:text-slate-200'
                                }`}
                            style={activeFilter === cat.key ? {
                                background: cat.accent,
                                boxShadow: `0 0 20px ${cat.glow}55`
                            } : {}}
                            whileTap={{ scale: 0.95 }}
                        >
                            {cat.label}
                        </motion.button>
                    ))}
                </motion.div>

                {/* ── Skill Groups ── */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeFilter}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-16"
                    >
                        {filtered.map((cat, i) => {
                            const catMeta = CATEGORIES.find(c => c.key === cat.category) ?? CATEGORIES[0];
                            return (
                                <React.Fragment key={cat.category}>
                                    <CategoryBlock
                                        category={cat.category}
                                        skills={cat.skills}
                                        accent={catMeta.accent}
                                    />
                                </React.Fragment>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>

            </div>
        </section>
    );
}
