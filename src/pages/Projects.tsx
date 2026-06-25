import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, ExternalLink, Github, Monitor } from 'lucide-react';
import { getLocalPortfolioData } from '../services/portfolio';
import { SectionHeading } from '../components/Shared';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
};

export default function Projects() {
    const PORTFOLIO_DATA = getLocalPortfolioData();
    const projects = PORTFOLIO_DATA.projects;
    const [activeIdx, setActiveIdx] = useState(0);
    const [screenIdx, setScreenIdx] = useState(0);
    const navigate = useNavigate();

    // 3D Tilt Card Ref & States
    const containerRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
    const [hoveringCard, setHoveringCard] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Reset screenshot slider when project changes
    useEffect(() => {
        setScreenIdx(0);
    }, [activeIdx]);

    // Handle 3D Tilt and Cursor Position
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate rotation: maximum tilt angle is 8 degrees for smooth, subtle response
        const rotateX = -((mouseY - height / 2) / (height / 2)) * 8;
        const rotateY = ((mouseX - width / 2) / (width / 2)) * 8;

        setTilt({ x: rotateX, y: rotateY });

        // Calculate glare positions
        const glareX = (mouseX / width) * 100;
        const glareY = (mouseY / height) * 100;
        setGlare({ x: glareX, y: glareY, opacity: 0.12 });
        setMousePos({ x: mouseX, y: mouseY });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
        setGlare(prev => ({ ...prev, opacity: 0 }));
        setHoveringCard(false);
    };

    const activeProject = projects[activeIdx];
    const activeSlug = activeProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const handleCardClick = () => {
        navigate(`/projects/${activeSlug}`);
    };

    // Render fallback mockup if no screenshots
    const renderFallbackMockup = (project: typeof activeProject) => {
        return (
            <div className="w-full h-full bg-[#0a0a0f] flex flex-col p-6 font-mono text-xs text-slate-400 select-none overflow-hidden justify-between">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-accent2 text-[9px] uppercase font-bold tracking-wider">// SYSTEM CONSOLE</span>
                    <span className="text-slate-600 text-[9px]">{project.techStack[0]}</span>
                </div>
                <div className="my-auto space-y-2">
                    <div className="text-white text-sm font-semibold truncate">&gt; {project.title}</div>
                    <div className="text-slate-500 text-[11px] leading-relaxed line-clamp-3">{project.description}</div>
                    <div className="flex flex-wrap gap-1 mt-2">
                        {project.techStack.map(t => (
                            <span key={t} className="text-[8px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-accent">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="border-t border-white/5 pt-2 flex items-center justify-between text-[8px] text-slate-600">
                    <span>STATUS: OPERATIONAL</span>
                    <span>FPS: 60</span>
                </div>
            </div>
        );
    };

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
                                    className={`border-b border-border/45 py-5 px-4 rounded-xl group cursor-pointer transition-all duration-300 ${isActive ? 'bg-[#151522]/35 border-l-2 border-accent2 pl-6' : 'hover:bg-[#151522]/10 border-l-2 border-transparent'
                                        }`}
                                    onMouseEnter={() => setActiveIdx(i)}
                                    onClick={() => navigate(`/projects/${slug}`)}
                                >
                                    <div className="flex items-start gap-5">
                                        {/* Elegant Large Serif Index */}
                                        <span className={`font-display text-3xl sm:text-4xl font-light leading-none select-none transition-all duration-300 -mt-1 w-10 flex-shrink-0 ${isActive ? 'text-accent2 font-bold' : 'text-slate-600 group-hover:text-accent/80'
                                            }`}>
                                            {String(i + 1).padStart(2, '0')}
                                        </span>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3">
                                                <h3 className={`text-xl sm:text-2xl font-display transition-all duration-300 ${isActive ? 'text-white font-bold text-glow' : 'text-slate-400 group-hover:text-slate-200'
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
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* ── Right Column: Sticky Project Details Preview (45% width, hidden on mobile) ── */}
                    <div className="hidden md:block w-[45%] sticky top-28 select-none">
                        <div
                            ref={containerRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            onMouseEnter={() => setHoveringCard(true)}
                            onClick={handleCardClick}
                            style={{
                                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                                transition: hoveringCard ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
                            }}
                            className="bg-surface/20 border border-border/50 rounded-2xl p-6 backdrop-blur-md flex flex-col min-h-[490px] hover:border-accent/25 transition-colors duration-300 relative overflow-hidden cursor-pointer group shadow-xl"
                        >
                            {/* Mouse Follower Tooltip Badge */}
                            {hoveringCard && (
                                <div
                                    className="absolute pointer-events-none bg-accent text-primary text-[10px] font-mono font-extrabold px-3 py-1.5 rounded-full shadow-lg z-30 flex items-center gap-1 uppercase tracking-wider transition-opacity duration-200"
                                    style={{
                                        left: mousePos.x,
                                        top: mousePos.y,
                                        transform: 'translate(-50%, -120%)',
                                    }}
                                >
                                    GO IN ! <ArrowRight size={10} />
                                </div>
                            )}

                            {/* Dynamic Glare Sheet */}
                            <div
                                className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300"
                                style={{
                                    background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, ${glare.opacity}) 0%, transparent 60%)`
                                }}
                            />

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIdx}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                                    className="flex flex-col h-full justify-between flex-grow"
                                >
                                    <div className="flex flex-col flex-grow">
                                        {/* Browser Mockup Header */}
                                        <div className="bg-[#12121c] border border-border/75 rounded-t-xl px-4 py-3 flex items-center justify-between">
                                            {/* Window Dots */}
                                            <div className="flex gap-1.5 flex-shrink-0">
                                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                                            </div>

                                            {/* URL Bar */}
                                            <div className="bg-primary/45 border border-border/30 text-[9px] text-slate-500 font-mono px-3 py-0.5 rounded text-center flex-1 mx-4 max-w-[220px] select-none truncate">
                                                tamizh.dev/{activeSlug}
                                            </div>

                                            {/* Image slider selector dots */}
                                            <div className="flex gap-1.5 items-center flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                                                {activeProject.screenshots && activeProject.screenshots.length > 0 && activeProject.screenshots.map((_, sIdx) => (
                                                    <button
                                                        key={sIdx}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            e.preventDefault();
                                                            setScreenIdx(sIdx);
                                                        }}
                                                        className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${screenIdx === sIdx ? 'bg-accent w-3.5' : 'bg-slate-700 hover:bg-slate-500'}`}
                                                        title={`View Screenshot ${sIdx + 1}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Browser Mockup Body Screen */}
                                        <div className="border-x border-b border-border/75 rounded-b-xl overflow-hidden aspect-[1.8/1] bg-primary/20 relative group-hover:border-accent/15 transition-colors">
                                            {activeProject.screenshots && activeProject.screenshots.length > 0 ? (
                                                <img
                                                    src={activeProject.screenshots[screenIdx]}
                                                    alt={`${activeProject.title} screenshot ${screenIdx + 1}`}
                                                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                renderFallbackMockup(activeProject)
                                            )}
                                        </div>

                                        {/* Title & Short details */}
                                        <div className="mt-5 flex items-baseline justify-between border-b border-border/30 pb-3">
                                            <h4 className="text-xl font-display font-medium text-white tracking-wide">
                                                {activeProject.title}
                                            </h4>
                                            <span className="font-mono text-[10px] text-accent2 tracking-wider">
                                                /{String(activeIdx + 1).padStart(2, '0')}
                                            </span>
                                        </div>

                                        <p className="text-slate-400 text-xs font-light leading-relaxed mt-3 mb-4">
                                            {activeProject.description}
                                        </p>

                                        {/* Key Tech Badges */}
                                        <div className="flex flex-wrap gap-1.5 mb-5">
                                            {activeProject.techStack.map((tech) => (
                                                <span key={tech} className="tech-pill text-[10px] px-2 py-0.5">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Links */}
                                    <div className="mt-auto space-y-4">
                                        {/* Primary View Details Button */}
                                        <div className="flex items-center justify-center gap-2 bg-accent text-primary font-bold py-2.5 rounded-lg hover:opacity-90 transition-all text-xs w-full uppercase tracking-wider font-mono">
                                            View Full Case Study <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                                        </div>

                                        {/* External Links */}
                                        <div className="flex gap-4 items-center justify-center pt-2 border-t border-border/30" onClick={(e) => e.stopPropagation()}>
                                            {activeProject.links?.github && (
                                                <a
                                                    href={activeProject.links.github} target="_blank" rel="noreferrer"
                                                    className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-accent transition-colors font-medium font-mono"
                                                >
                                                    <Github size={12} /> Code
                                                </a>
                                            )}
                                            {activeProject.links?.demo && (
                                                <a
                                                    href={activeProject.links.demo} target="_blank" rel="noreferrer"
                                                    className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-accent transition-colors font-medium font-mono"
                                                >
                                                    <ExternalLink size={12} /> Live Demo
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

