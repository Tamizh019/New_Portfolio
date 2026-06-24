import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, ExternalLink, Github } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../constants';
import { SectionHeading } from '../components/Shared';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
};

export default function Projects() {
    const projects = PORTFOLIO_DATA.projects;
    const [activeIdx, setActiveIdx] = useState(0);

    return (
        <section className="py-20 relative flex-grow">
            <div className="max-w-6xl mx-auto px-6">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <SectionHeading prefix="03" title="Featured" accent="Projects" />
                    <p className="text-slate-400 mt-4 max-w-xl text-sm leading-relaxed font-light">
                        An indexed selection of my engineering work — focusing on LLMs, RAG, and scalable full-stack products. Hover on desktop to preview.
                    </p>
                </motion.div>

                {/* ── Split-Screen Content Layout ── */}
                <div className="mt-16 flex flex-col md:flex-row gap-10 items-start">

                    {/* ── Left Column: Editorial Project Index Rows (55% width) ── */}
                    <div className="w-full md:w-[55%] space-y-2">
                        {projects.map((project, i) => {
                            const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                            const isActive = activeIdx === i;

                            return (
                                <motion.div
                                    key={project.title}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, margin: '-60px' }}
                                    className="border-b border-border/40 py-6 group cursor-pointer transition-all duration-300"
                                    onMouseEnter={() => setActiveIdx(i)}
                                >
                                    <Link to={`/projects/${slug}`} className="flex items-start gap-6">
                                        {/* Elegant Large Serif Index */}
                                        <span className={`font-display text-3xl sm:text-4xl font-light leading-none select-none transition-all duration-300 -mt-1 w-12 flex-shrink-0 ${isActive ? 'text-accent2 font-semibold' : 'text-slate-700 group-hover:text-accent/60'
                                            }`}>
                                            {String(i + 1).padStart(2, '0')}
                                        </span>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3">
                                                <h3 className={`text-xl sm:text-2xl font-display font-medium transition-all duration-300 ${isActive ? 'text-accent' : 'text-white group-hover:text-accent/80'
                                                    }`}>
                                                    {project.title}
                                                </h3>
                                                {project.isFeatured && (
                                                    <span className="text-[8px] font-mono border border-accent2/25 text-accent2 px-1.5 py-0.5 rounded tracking-widest uppercase scale-90">
                                                        Featured
                                                    </span>
                                                )}
                                            </div>

                                            {/* Short summary (kept clean) */}
                                            <p className="text-slate-400 text-sm font-light mt-1.5 leading-relaxed">
                                                {project.description}
                                            </p>

                                            {/* Mobile-only CTA */}
                                            <div className="md:hidden mt-3 flex items-center gap-1 text-xs text-accent font-mono uppercase tracking-wider">
                                                View details <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                            </div>

                                            {/* Mobile-only tech summary */}
                                            <div className="md:hidden flex flex-wrap gap-1.5 mt-3">
                                                {project.techStack.slice(0, 3).map((t) => (
                                                    <span key={t} className="tech-pill text-[10px]">{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* ── Right Column: Sticky Project Details Preview (45% width, hidden on mobile) ── */}
                    <div className="hidden md:block w-[45%] sticky top-28">
                        <div className="bg-surface/20 border border-border/50 rounded-2xl p-8 backdrop-blur-md flex flex-col justify-between min-h-[460px] hover:border-accent/20 transition-all duration-300">

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIdx}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.25, ease: 'easeOut' }}
                                    className="flex flex-col h-full justify-between flex-grow"
                                >
                                    <div>
                                        {/* Card Header Label */}
                                        <div className="flex items-center justify-between font-mono text-[9px] text-slate-500 uppercase tracking-widest border-b border-border/40 pb-4">
                                            <span>[ Project Preview ]</span>
                                            <span>Index {String(activeIdx + 1).padStart(2, '0')}</span>
                                        </div>

                                        {/* Title & Pitch */}
                                        <h4 className="text-2xl font-display font-medium text-white mt-6 mb-4 leading-tight">
                                            {projects[activeIdx].title}
                                        </h4>
                                        <p className="text-slate-400 text-sm font-light leading-relaxed mb-6">
                                            {projects[activeIdx].description}
                                        </p>

                                        {/* Key Tech Badges */}
                                        <div className="flex flex-wrap gap-1.5 mb-8">
                                            {projects[activeIdx].techStack.map((tech) => (
                                                <span key={tech} className="tech-pill text-xs">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Links */}
                                    <div className="mt-auto space-y-4">
                                        {/* Primary View Details Button */}
                                        <Link
                                            to={`/projects/${projects[activeIdx].title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                                            className="flex items-center justify-center gap-2 bg-accent text-primary font-bold py-3 rounded-lg hover:opacity-90 transition-all text-sm w-full"
                                        >
                                            View Case Study <ArrowRight size={14} />
                                        </Link>

                                        {/* External Links */}
                                        <div className="flex gap-4 items-center justify-center pt-2 border-t border-border/30">
                                            {projects[activeIdx].links?.github && (
                                                <a
                                                    href={projects[activeIdx].links.github} target="_blank" rel="noreferrer"
                                                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-accent transition-colors font-medium"
                                                >
                                                    <Github size={13} /> Code
                                                </a>
                                            )}
                                            {projects[activeIdx].links?.demo && (
                                                <a
                                                    href={projects[activeIdx].links.demo} target="_blank" rel="noreferrer"
                                                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-accent transition-colors font-medium"
                                                >
                                                    <ExternalLink size={13} /> Live Demo
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
