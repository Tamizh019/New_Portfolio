import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Zap, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../constants';

// Tech-stack icons map (reuse from Skills)
import {
    SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiFramer, SiHtml5,
    SiPython, SiTensorflow, SiScikitlearn, SiOpencv, SiGooglegemini, SiLangchain,
    SiFastapi, SiSpring, SiNodedotjs, SiJavascript, SiMysql, SiPostgresql,
    SiSupabase, SiGit, SiDocker, SiFlask, SiRust
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { BsBraces } from 'react-icons/bs';
import { VscTerminal } from 'react-icons/vsc';

const TECH_META: Record<string, { icon: React.ReactNode; color: string }> = {
    'Next.js': { icon: <SiNextdotjs />, color: '#FFFFFF' },
    'Next.js 16': { icon: <SiNextdotjs />, color: '#FFFFFF' },
    'React': { icon: <SiReact />, color: '#61DAFB' },
    'React.js': { icon: <SiReact />, color: '#61DAFB' },
    'TypeScript': { icon: <SiTypescript />, color: '#3178C6' },
    'JavaScript': { icon: <SiJavascript />, color: '#F7DF1E' },
    'Tailwind CSS': { icon: <SiTailwindcss />, color: '#06B6D4' },
    'Framer Motion': { icon: <SiFramer />, color: '#0055FF' },
    'HTML5 / CSS3': { icon: <SiHtml5 />, color: '#E34F26' },
    'Python': { icon: <SiPython />, color: '#3776AB' },
    'Java': { icon: <FaJava />, color: '#007396' },
    'TensorFlow': { icon: <SiTensorflow />, color: '#FF6F00' },
    'Scikit-learn': { icon: <SiScikitlearn />, color: '#F7931E' },
    'OpenCV': { icon: <SiOpencv />, color: '#5C3EE8' },
    'Gemini API': { icon: <SiGooglegemini />, color: '#8E75B2' },
    'LangChain': { icon: <SiLangchain />, color: '#1C3C3C' },
    'FAISS': { icon: <BsBraces />, color: '#00B4D8' },
    'FastAPI': { icon: <SiFastapi />, color: '#009688' },
    'Flask': { icon: <SiFlask />, color: '#FFFFFF' },
    'Spring Boot': { icon: <SiSpring />, color: '#6DB33F' },
    'Node.js': { icon: <SiNodedotjs />, color: '#339933' },
    'MySQL': { icon: <SiMysql />, color: '#4479A1' },
    'PostgreSQL': { icon: <SiPostgresql />, color: '#4169E1' },
    'Supabase': { icon: <SiSupabase />, color: '#3ECF8E' },
    'Git': { icon: <SiGit />, color: '#F05032' },
    'Docker': { icon: <SiDocker />, color: '#2496ED' },
    'Rust': { icon: <SiRust />, color: '#CE4A00' },
    'WebSockets': { icon: <VscTerminal />, color: '#F59E0B' },
    'REST APIs': { icon: <BsBraces />, color: '#94a3b8' },
    'RAG Pipelines': { icon: <BsBraces />, color: '#00d9ff' },
};

const GRADIENTS = [
    'from-cyan-500 to-violet-500',
    'from-violet-500 to-emerald-500',
    'from-emerald-500 to-cyan-500',
    'from-orange-500 to-violet-500',
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
};
const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
};
const featureItem = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};
const techItem = {
    hidden: { opacity: 0, scale: 0.7 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] } }
};

function TechBadge({ tech }: { tech: string }) {
    const meta = TECH_META[tech] ?? { icon: <BsBraces />, color: '#94a3b8' };
    return (
        <motion.div
            variants={techItem}
            className="group flex flex-col items-center gap-2 p-4 bg-primary/60 border border-border rounded-xl hover:border-white/20 transition-all cursor-default"
            whileHover={{ y: -4, scale: 1.05 }}
            title={tech}
        >
            <div className="text-2xl" style={{ color: meta.color }}>{meta.icon}</div>
            <span className="text-[11px] text-slate-400 group-hover:text-slate-200 transition-colors text-center leading-tight">{tech}</span>
        </motion.div>
    );
}

export default function ProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const projectIndex = PORTFOLIO_DATA.projects.findIndex(
        p => p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === id
    );
    const project = PORTFOLIO_DATA.projects[projectIndex];

    useEffect(() => {
        if (!project) navigate('/projects');
    }, [project, navigate]);

    if (!project) return null;

    const gradient = GRADIENTS[projectIndex % GRADIENTS.length];

    // Next & prev projects for navigation
    const prev = PORTFOLIO_DATA.projects[projectIndex - 1];
    const next = PORTFOLIO_DATA.projects[projectIndex + 1];
    const prevSlug = prev?.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const nextSlug = next?.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    return (
        <section className="py-20 relative flex-grow">
            <div className="max-w-5xl mx-auto px-6">

                {/* ── Back navigation ── */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
                    <Link to="/projects" className="inline-flex items-center gap-2 text-slate-400 hover:text-accent font-mono text-xs mb-10 transition-colors group">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Projects
                    </Link>
                </motion.div>

                {/* ── Hero Banner ── */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="relative rounded-2xl border border-border bg-surface overflow-hidden mb-12"
                >
                    {/* Gradient strip */}
                    <div className={`h-1 w-full bg-gradient-to-r ${gradient}`} />

                    {/* Large gradient bg */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-[0.04] pointer-events-none`} />

                    <div className="relative z-10 p-5 sm:p-8 md:p-14">
                        <div className="flex flex-col sm:flex-row flex-wrap items-start justify-between gap-6 sm:gap-8">
                            <div className="flex-1 min-w-0">
                                {project.isFeatured && (
                                    <div className="flex items-center gap-1.5 bg-accent/10 border border-accent/30 text-accent text-[10px] font-mono font-bold px-2.5 py-1 rounded-full mb-5 w-fit">
                                        <Zap size={9} /> FEATURED PROJECT
                                    </div>
                                )}
                                <h1 className="text-2xl sm:text-4xl md:text-6xl font-display font-bold text-white tracking-tight mb-4 leading-tight">
                                    {project.title}
                                </h1>
                                <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
                                    {project.description}
                                </p>
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-row sm:flex-col gap-3 flex-shrink-0 w-full sm:w-auto">
                                {project.links?.github && (
                                    <motion.a
                                        href={project.links.github} target="_blank" rel="noreferrer"
                                        className="flex items-center gap-2 border border-border text-slate-300 px-5 py-3 rounded-lg hover:border-accent/40 hover:text-accent transition-all text-sm font-medium min-w-[140px] justify-center"
                                        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                    >
                                        <Github size={16} /> Repository
                                    </motion.a>
                                )}
                                {project.links?.demo && (
                                    <motion.a
                                        href={project.links.demo} target="_blank" rel="noreferrer"
                                        className="flex items-center gap-2 bg-accent text-primary px-5 py-3 rounded-lg hover:bg-cyan-300 transition-all text-sm font-bold min-w-[140px] justify-center"
                                        whileHover={{ scale: 1.03, boxShadow: '0 0 24px #00d9ff66' }} whileTap={{ scale: 0.97 }}
                                    >
                                        <ExternalLink size={16} /> Live Demo
                                    </motion.a>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ── Main grid ── */}
                <div className="grid md:grid-cols-3 gap-8">

                    {/* Left — Features */}
                    <div className="md:col-span-2 space-y-10">

                        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                            <h2 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-3">
                                <div className="w-1 h-5 rounded-full bg-accent" />
                                Key Features & Architecture
                            </h2>
                            <motion.ul
                                className="space-y-3"
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                            >
                                {project.features.map((f, i) => (
                                    <motion.li
                                        key={i}
                                        variants={featureItem}
                                        className="flex gap-4 text-slate-300 text-sm leading-relaxed p-5 bg-surface border border-border rounded-xl group hover:border-accent/30 transition-all"
                                        whileHover={{ x: 4 }}
                                    >
                                        <CheckCircle2 size={16} className="text-accent mt-0.5 flex-shrink-0" />
                                        {f}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>

                        {/* Roadmap */}
                        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                            <h2 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-3">
                                <div className="w-1 h-5 rounded-full bg-violet-400" />
                                Future Roadmap
                            </h2>
                            <div className="p-6 bg-surface border border-border rounded-xl group hover:border-violet-500/40 transition-all">
                                <div className="flex items-center gap-2 text-violet-400 text-xs font-mono mb-3">
                                    <Clock size={12} /> in progress
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    This project is continuously evolving. Planned improvements include enhanced AI models, deeper integrations, improved performance, and a more polished user experience. Watch the repository for updates.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right — Sidebar */}
                    <div>
                        {/* Tech Stack */}
                        <motion.div
                            className="bg-surface border border-border rounded-xl p-6 mb-6 sticky top-28"
                            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                        >
                            <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-5 flex items-center gap-2">
                                <Zap size={10} className="text-accent" /> Technology Stack
                            </h3>
                            <motion.div
                                className="grid grid-cols-3 gap-2"
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                            >
                                {project.techStack.map((t, i) => (
                                    <React.Fragment key={i}>
                                        <TechBadge tech={t} />
                                    </React.Fragment>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Links quick access */}
                        {(project.links?.github || project.links?.demo) && (
                            <motion.div
                                className="bg-surface border border-border rounded-xl p-6"
                                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                            >
                                <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-5">Links</h3>
                                <div className="space-y-3">
                                    {project.links?.github && (
                                        <a href={project.links.github} target="_blank" rel="noreferrer"
                                            className="flex items-center gap-3 text-sm text-slate-400 hover:text-accent transition-colors p-3 rounded-lg hover:bg-accent/5 group">
                                            <Github size={16} className="group-hover:scale-110 transition-transform" />
                                            <span>Source Code</span>
                                            <ExternalLink size={10} className="ml-auto opacity-40" />
                                        </a>
                                    )}
                                    {project.links?.demo && (
                                        <a href={project.links.demo} target="_blank" rel="noreferrer"
                                            className="flex items-center gap-3 text-sm text-slate-400 hover:text-accent transition-colors p-3 rounded-lg hover:bg-accent/5 group">
                                            <ExternalLink size={16} className="group-hover:scale-110 transition-transform" />
                                            <span>Live Demo</span>
                                            <ExternalLink size={10} className="ml-auto opacity-40" />
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* Team Members */}
                        {project.team && project.team.length > 0 && (
                            <motion.div
                                className="bg-surface border border-border rounded-xl p-6 mt-6"
                                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                            >
                                <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-5 flex items-center gap-2">
                                    <span className="text-violet-400">👥</span> Built With
                                </h3>
                                <div className="space-y-3">
                                    {project.team.map((member, i) => (
                                        <div key={i} className="flex items-center justify-between gap-3 p-3 rounded-lg bg-primary/40 border border-border hover:border-violet-500/30 transition-all group">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-accent flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                                                    {member.name[0]}
                                                </div>
                                                <span className="text-sm text-slate-300 group-hover:text-white transition-colors font-medium">
                                                    {member.name}
                                                </span>
                                            </div>
                                            {member.role && (
                                                <span className="text-[10px] text-violet-400 font-mono bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20 whitespace-nowrap">
                                                    {member.role}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* ── Project Navigation ── */}
                <motion.div
                    className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4"
                    variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                >
                    {prev ? (
                        <Link to={`/projects/${prevSlug}`}
                            className="group flex items-center gap-3 text-slate-400 hover:text-accent transition-colors">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            <div>
                                <div className="text-xs font-mono text-slate-600 mb-1">Previous</div>
                                <div className="text-sm font-medium">{prev.title}</div>
                            </div>
                        </Link>
                    ) : <div />}

                    <Link to="/projects"
                        className="text-xs font-mono text-slate-500 hover:text-accent transition-colors px-4 py-2 border border-border rounded-lg hover:border-accent/40">
                        All Projects
                    </Link>

                    {next ? (
                        <Link to={`/projects/${nextSlug}`}
                            className="group flex items-center gap-3 text-slate-400 hover:text-accent transition-colors text-right">
                            <div>
                                <div className="text-xs font-mono text-slate-600 mb-1">Next</div>
                                <div className="text-sm font-medium">{next.title}</div>
                            </div>
                            <ArrowLeft size={16} className="rotate-180 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    ) : <div />}
                </motion.div>

            </div>
        </section>
    );
}
