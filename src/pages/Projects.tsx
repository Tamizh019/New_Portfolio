import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, ExternalLink, ArrowRight, Zap } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../constants';
import { SectionHeading } from '../components/Shared';

/* ── Variants ── */
const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
};
const fadeLeft = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
};
const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const GRADIENTS = [
    'from-cyan-500 to-violet-500',
    'from-violet-500 to-emerald-500',
    'from-emerald-500 to-cyan-500',
    'from-orange-500 to-violet-500',
];

/* ── Tilt Card ── */
function ProjectTile({
    project, index, variant = 'fadeUp', className = ''
}: {
    project: typeof PORTFOLIO_DATA.projects[0];
    index: number;
    variant?: 'fadeUp' | 'fadeLeft' | 'fadeRight';
    className?: string;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { stiffness: 150, damping: 20 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), springConfig);
    const glowX = useSpring(mouseX, springConfig);
    const glowY = useSpring(mouseY, springConfig);

    const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const variants = variant === 'fadeLeft' ? fadeLeft : variant === 'fadeRight' ? fadeRight : fadeUp;

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    }
    function handleMouseLeave() {
        mouseX.set(0);
        mouseY.set(0);
    }

    return (
        <motion.div
            ref={cardRef}
            className={`relative group cursor-pointer ${className}`}
            variants={variants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
        >
            {/* Cursor glow */}
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                style={{
                    background: `radial-gradient(400px circle at ${useTransform(glowX, [-0.5, 0.5], [0, 100])}% ${useTransform(glowY, [-0.5, 0.5], [0, 100])}%, rgba(0,217,255,0.06), transparent 70%)`
                }}
            />

            <Link to={`/projects/${slug}`}>
                <div className="relative rounded-2xl border border-border bg-surface overflow-hidden transition-all duration-500 group-hover:border-accent/30 group-hover:shadow-[0_0_40px_rgba(0,217,255,0.08)] h-full">
                    {/* Gradient top bar */}
                    <div className={`h-1 w-full bg-gradient-to-r ${GRADIENTS[index % GRADIENTS.length]}`} />

                    {/* Featured badge */}
                    {project.isFeatured && (
                        <div className="absolute top-5 right-5 flex items-center gap-1.5 bg-accent/10 border border-accent/30 text-accent text-[10px] font-mono font-bold px-2.5 py-1 rounded-full z-10">
                            <Zap size={9} /> FEATURED
                        </div>
                    )}

                    <div className="p-8 flex flex-col h-full">
                        <div className="mb-6">
                            <h3 className="text-2xl font-display font-bold text-white group-hover:text-accent transition-colors mb-3">
                                {project.title}
                            </h3>
                            <p className="text-slate-400 leading-relaxed">{project.description}</p>
                        </div>

                        {/* Features */}
                        <ul className="space-y-2 mb-6 flex-grow">
                            {project.features.slice(0, 3).map((f, j) => (
                                <li key={j} className="flex gap-3 text-sm text-slate-500 group-hover:text-slate-400 transition-colors">
                                    <span className="text-accent mt-0.5 flex-shrink-0">›</span> {f}
                                </li>
                            ))}
                        </ul>

                        {/* Tech pills */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                            {project.techStack.slice(0, 4).map((t, j) => (
                                <span key={j} className="tech-pill text-xs">{t}</span>
                            ))}
                            {project.techStack.length > 4 && (
                                <span className="tech-pill text-xs text-slate-500">+{project.techStack.length - 4}</span>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                            <div className="flex gap-4 relative z-20" onClick={e => e.stopPropagation()}>
                                {project.links?.github && (
                                    <a href={project.links.github} target="_blank" rel="noreferrer"
                                        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-accent transition-colors font-medium hover:underline">
                                        <Github size={14} /> Code
                                    </a>
                                )}
                                {project.links?.demo && (
                                    <a href={project.links.demo} target="_blank" rel="noreferrer"
                                        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-accent transition-colors font-medium hover:underline">
                                        <ExternalLink size={14} /> Live
                                    </a>
                                )}
                            </div>
                            <span className="flex items-center gap-1 text-xs text-accent/60 group-hover:text-accent transition-colors font-mono">
                                View details <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

/* ── Projects Page Layout ── */
export default function Projects() {
    const projects = PORTFOLIO_DATA.projects;

    // Layout pattern: full → [60,40] → [40,60] → full → ...
    const layoutRows: ({ type: 'full'; idx: number } | { type: 'split'; left: number; right: number; leftW: string; rightW: string })[] = [
        { type: 'full', idx: 0 },
        { type: 'split', left: 1, right: 2, leftW: '60%', rightW: '40%' },
        { type: 'split', left: 3, right: -1, leftW: '50%', rightW: '50%' },
    ];

    return (
        <section className="py-20 relative flex-grow">
            <div className="max-w-6xl mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <SectionHeading prefix="03" title="Featured" accent="Projects" />
                    <p className="text-slate-400 mt-4 max-w-xl text-sm leading-relaxed">
                        A selection of projects I've built — from AI platforms to full-stack products. Click any to explore the full detail.
                    </p>
                </motion.div>

                {/* ── Asymmetric Grid ── */}
                <div className="mt-14 space-y-5">

                    {/* Row 1 — Full Width: Chill Space (Featured) */}
                    {projects[0] && (
                        <ProjectTile project={projects[0]} index={0} variant="fadeUp" />
                    )}

                    {/* Row 2 — 60/40 split: Valluge / AgriVision */}
                    {(projects[1] || projects[2]) && (
                        <div className="flex flex-col md:flex-row gap-5">
                            {projects[1] && (
                                <div className="md:w-[60%]">
                                    <ProjectTile project={projects[1]} index={1} variant="fadeLeft" className="h-full" />
                                </div>
                            )}
                            {projects[2] && (
                                <div className="md:w-[40%]">
                                    <ProjectTile project={projects[2]} index={2} variant="fadeRight" className="h-full" />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Row 3 — 40/60 split: Sparky / (any future) */}
                    {(projects[3] || projects[4]) && (
                        <div className="flex flex-col md:flex-row gap-5">
                            {projects[3] && (
                                <div className="md:w-[40%]">
                                    <ProjectTile project={projects[3]} index={3} variant="fadeLeft" className="h-full" />
                                </div>
                            )}
                            {projects[4] && (
                                <div className="md:w-[60%]">
                                    <ProjectTile project={projects[4]} index={4} variant="fadeRight" className="h-full" />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Remaining projects in a 50/50 grid */}
                    {projects.length > 5 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {projects.slice(5).map((p, i) => (
                                <React.Fragment key={i}>
                                    <ProjectTile project={p} index={5 + i} variant="fadeUp" className="h-full" />
                                </React.Fragment>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
}
