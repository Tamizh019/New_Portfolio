import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Zap, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { getLocalPortfolioData } from '../services/portfolio';

// Tech-stack icons map
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
    'RAG Pipelines': { icon: <BsBraces />, color: '#8b5cf6' },
};

const GRADIENTS = [
    'from-accent to-accent2',
    'from-accent2 to-accent3',
    'from-accent3 to-accent',
    'from-accent via-accent3 to-accent2',
];

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
};
const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } }
};
const featureItem = {
    hidden: { opacity: 0, x: -15 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4 } }
};
const techItem = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } }
};

function TechBadge({ tech }: { tech: string }) {
    const meta = TECH_META[tech] ?? { icon: <BsBraces />, color: '#94a3b8' };
    return (
        <motion.div
            variants={techItem}
            className="group flex flex-col items-center gap-2 p-3 bg-white/[0.01] border border-white/5 rounded-2xl hover:border-white/15 transition-all duration-300 cursor-default"
            whileHover={{ y: -3, scale: 1.03 }}
            title={tech}
        >
            <div className="text-xl" style={{ color: meta.color }}>{meta.icon}</div>
            <span className="text-[10px] text-slate-400 group-hover:text-white transition-colors text-center leading-tight">{tech}</span>
        </motion.div>
    );
}

export default function ProjectDetail() {
    const PORTFOLIO_DATA = getLocalPortfolioData();
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

    const prev = PORTFOLIO_DATA.projects[projectIndex - 1];
    const next = PORTFOLIO_DATA.projects[projectIndex + 1];
    const prevSlug = prev?.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const nextSlug = next?.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    return (
        <section className="py-20 relative flex-grow">
            <div className="max-w-5xl mx-auto px-6">

                {/* Back navigation */}
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                    <Link to="/projects" className="inline-flex items-center gap-2 text-slate-400 hover:text-accent font-mono text-xs mb-10 transition-colors group">
                        <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform text-accent" /> BACK TO PROJECTS
                    </Link>
                </motion.div>

                {/* Hero Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="relative rounded-2xl border border-white/5 bg-[#0a0b10]/45 backdrop-blur-xl overflow-hidden mb-12 shadow-xl"
                >
                    {/* Gradient top strip */}
                    <div className={`h-[2px] w-full bg-gradient-to-r ${gradient}`} />

                    {/* Ambient light overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-[0.03] pointer-events-none`} />

                    <div className="relative z-10 p-6 sm:p-10 md:p-14">
                        <div className="flex flex-col sm:flex-row flex-wrap items-start justify-between gap-8">
                            <div className="flex-1 min-w-0">
                                {project.isFeatured && (
                                    <div className="flex items-center gap-1 bg-accent/5 border border-accent/15 text-accent text-[9px] font-mono font-semibold px-2.5 py-0.5 rounded tracking-wider mb-5 w-fit uppercase">
                                        [ Featured Project ]
                                    </div>
                                )}
                                <h1 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-4 leading-tight">
                                    {project.title}
                                </h1>
                                <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl font-light">
                                    {project.description}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-row sm:flex-col gap-3 flex-shrink-0 w-full sm:w-auto">
                                {project.links?.github && (
                                    <motion.a
                                        href={project.links.github} target="_blank" rel="noreferrer"
                                        className="flex items-center gap-2 border border-white/5 bg-white/[0.01] text-slate-300 hover:text-white px-5 py-3 rounded-xl hover:border-white/10 transition-all text-xs font-semibold uppercase tracking-wider font-mono justify-center"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <Github size={14} /> Repository
                                    </motion.a>
                                )}
                                {project.links?.demo && (
                                    <motion.a
                                        href={project.links.demo} target="_blank" rel="noreferrer"
                                        className="flex items-center gap-2 bg-gradient-to-r from-accent to-accent2 hover:opacity-95 text-white px-5 py-3 rounded-xl transition-all text-xs font-bold uppercase tracking-wider font-mono justify-center shadow-lg shadow-accent/15"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <ExternalLink size={14} /> Live Demo
                                    </motion.a>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid md:grid-cols-3 gap-8">

                    {/* Features Column */}
                    <div className="md:col-span-2 space-y-10">
                        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                            <h2 className="text-lg font-display font-bold text-white mb-6 flex items-center gap-3">
                                <div className="w-[2px] h-4 rounded-full bg-accent" />
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
                                        className="flex gap-4 text-slate-300 text-sm leading-relaxed p-5 bg-[#0a0b10]/45 border border-white/5 rounded-2xl hover:border-accent/30 transition-all duration-300 shadow-sm"
                                        whileHover={{ x: 2 }}
                                    >
                                        <CheckCircle2 size={16} className="text-accent mt-0.5 flex-shrink-0" />
                                        <span className="font-light">{f}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>

                        {/* Future Roadmap */}
                        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                            <h2 className="text-lg font-display font-semibold text-white mb-6 flex items-center gap-3">
                                <div className="w-[2px] h-4 rounded-full bg-accent2" />
                                Future Roadmap
                            </h2>
                            <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl hover:border-accent2/30 transition-all duration-300 shadow-sm">
                                <div className="flex items-center gap-2 text-accent2 text-[10px] font-mono mb-3 tracking-wider uppercase">
                                    <Clock size={12} /> in progress
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed font-light">
                                    This workspace module is continuously engineered. Future features focus on deep API integrations, structural testing boundaries, runtime speed increases, and visual improvements.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div>
                        {/* Tech Stack Widget */}
                        <motion.div
                            className="glass-panel rounded-2xl p-6 mb-6 shadow-md"
                            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                        >
                            <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-5 flex items-center gap-2">
                                <Zap size={10} className="text-accent" /> TECHNOLOGY STACK
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

                        {/* Links access */}
                        {(project.links?.github || project.links?.demo) && (
                            <motion.div
                                className="glass-panel rounded-2xl p-6 mb-6 shadow-md"
                                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                            >
                                <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-5">LINKS</h3>
                                <div className="space-y-2">
                                    {project.links?.github && (
                                        <a href={project.links.github} target="_blank" rel="noreferrer"
                                            className="flex items-center gap-3 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors p-3 rounded-xl hover:bg-white/[0.02] border border-transparent hover:border-white/5 group">
                                            <Github size={15} className="group-hover:scale-105 transition-transform" />
                                            <span>Source Code</span>
                                            <ExternalLink size={10} className="ml-auto opacity-45" />
                                        </a>
                                    )}
                                    {project.links?.demo && (
                                        <a href={project.links.demo} target="_blank" rel="noreferrer"
                                            className="flex items-center gap-3 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors p-3 rounded-xl hover:bg-white/[0.02] border border-transparent hover:border-white/5 group">
                                            <ExternalLink size={15} className="group-hover:scale-105 transition-transform" />
                                            <span>Live Demo</span>
                                            <ExternalLink size={10} className="ml-auto opacity-45" />
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* Build Team */}
                        {project.team && project.team.length > 0 && (
                            <motion.div
                                className="glass-panel rounded-2xl p-6 shadow-md"
                                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                            >
                                <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-5 flex items-center gap-2">
                                    <span>👥</span> BUILT WITH
                                </h3>
                                <div className="space-y-2">
                                    {project.team.map((member, i) => (
                                        <div key={i} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/[0.01] border border-white/5 hover:border-accent2/25 transition-all duration-300 group">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-6.5 h-6.5 rounded-full bg-gradient-to-br from-accent to-accent2 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 shadow-sm">
                                                    {member.name[0]}
                                                </div>
                                                <span className="text-xs sm:text-sm text-slate-400 group-hover:text-white transition-colors font-medium">
                                                    {member.name}
                                                </span>
                                            </div>
                                            {member.role && (
                                                <span className="text-[8px] text-accent2 font-mono bg-accent2/5 px-2 py-0.5 rounded border border-accent2/15 whitespace-nowrap uppercase tracking-wider">
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

                {/* Screenshot Interface Showcase */}
                {project.screenshots && project.screenshots.length > 0 && (
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="mt-16 pt-10 border-t border-white/5"
                    >
                        <h2 className="text-xl font-display font-bold text-white mb-8 flex items-center gap-3">
                            <div className="w-[2px] h-4 rounded-full bg-accent" />
                            Interface Showcase
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {project.screenshots.map((screenshot, idx) => (
                                <motion.div
                                    key={idx}
                                    className="bg-[#12121c] border border-border/70 rounded-xl overflow-hidden shadow-lg group hover:border-accent/20 transition-all duration-300"
                                    whileHover={{ y: -4 }}
                                >
                                    {/* Mockup Header */}
                                    <div className="bg-primary/60 px-4 py-2.5 border-b border-border/40 flex items-center justify-between">
                                        <div className="flex gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                                            <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                                            <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                                        </div>
                                        <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest font-semibold">[ Screen View {idx + 1} ]</span>
                                    </div>
                                    {/* Mockup Image */}
                                    <div className="overflow-hidden aspect-[1.7/1] bg-primary/20">
                                        <img
                                            src={screenshot}
                                            alt={`${project.title} screenshot ${idx + 1}`}
                                            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                                            loading="lazy"
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Project Navigation */}
                <motion.div
                    className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
                    variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                >
                    {prev ? (
                        <Link to={`/projects/${prevSlug}`}
                            className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform text-accent" />
                            <div>
                                <div className="text-[9px] font-mono text-slate-500 mb-0.5 tracking-wider uppercase">Previous</div>
                                <div className="text-sm font-semibold">{prev.title}</div>
                            </div>
                        </Link>
                    ) : <div />}

                    <Link to="/projects"
                        className="text-[10px] font-mono text-slate-400 hover:text-white transition-colors px-4 py-2 border border-white/5 bg-white/[0.01] rounded-xl hover:border-white/10 tracking-widest uppercase">
                        All Projects
                    </Link>

                    {next ? (
                        <Link to={`/projects/${nextSlug}`}
                            className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-right">
                            <div>
                                <div className="text-[9px] font-mono text-slate-500 mb-0.5 tracking-wider uppercase">Next</div>
                                <div className="text-sm font-semibold">{next.title}</div>
                            </div>
                            <ArrowLeft size={15} className="rotate-180 group-hover:translate-x-1 transition-transform text-accent2" />
                        </Link>
                    ) : <div />}
                </motion.div>

            </div>
        </section>
    );
}
