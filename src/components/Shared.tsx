import React, { useState, useEffect, useRef } from 'react';
import {
    Github, Linkedin, ExternalLink,
    Terminal, Brain, Code2, Database, Layers, Cpu,
    Zap
} from 'lucide-react';
import { Project } from '../../types';
import { Link } from 'react-router-dom';

/* ─────────────────────────────────────
   Typewriter Hook
───────────────────────────────────── */
export function useTypewriter(phrases: string[], speed = 80, pause = 2000) {
    const [displayed, setDisplayed] = useState('');
    const [phraseIdx, setPhraseIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = phrases[phraseIdx];
        let timeout: ReturnType<typeof setTimeout>;

        if (!deleting && charIdx < current.length) {
            timeout = setTimeout(() => setCharIdx(i => i + 1), speed);
        } else if (!deleting && charIdx === current.length) {
            timeout = setTimeout(() => setDeleting(true), pause);
        } else if (deleting && charIdx > 0) {
            timeout = setTimeout(() => setCharIdx(i => i - 1), speed / 2);
        } else {
            setDeleting(false);
            setPhraseIdx(i => (i + 1) % phrases.length);
        }

        setDisplayed(current.slice(0, charIdx));
        return () => clearTimeout(timeout);
    }, [charIdx, deleting, phraseIdx, phrases, speed, pause]);

    return displayed;
}

/* ─────────────────────────────────────
   Intersection Observer Hook
───────────────────────────────────── */
export function useInView(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [threshold]);
    return { ref, inView };
}

/* ─────────────────────────────────────
   Skill category icon
───────────────────────────────────── */
export function SkillIcon({ category }: { category: string }) {
    const c = category.toLowerCase();
    if (c.includes('ai') || c.includes('ml') || c.includes('llm')) return <Brain size={18} className="text-accent" />;
    if (c.includes('front')) return <Layers size={18} className="text-violet-400" />;
    if (c.includes('back')) return <Code2 size={18} className="text-cyan-400" />;
    if (c.includes('lang')) return <Terminal size={18} className="text-green-400" />;
    return <Database size={18} className="text-orange-400" />;
}

/* ─────────────────────────────────────
   Neural Background SVG
───────────────────────────────────── */
export const NeuralNodes: React.FC = () => (
    <svg className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="ng" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00d9ff" stopOpacity="1" />
                <stop offset="100%" stopColor="#00d9ff" stopOpacity="0" />
            </radialGradient>
        </defs>
        {[
            [120, 160], [380, 80], [620, 200], [820, 120], [200, 380],
            [500, 320], [720, 440], [100, 500], [900, 300], [650, 560],
        ].map(([x, y], i) => (
            <g key={i}>
                <circle cx={x} cy={y} r="4" fill="#00d9ff" />
                <circle cx={x} cy={y} r="12" fill="url(#ng)" />
            </g>
        ))}
        {[
            [120, 160, 380, 80], [380, 80, 620, 200], [620, 200, 820, 120],
            [200, 380, 500, 320], [500, 320, 720, 440], [100, 500, 200, 380],
            [380, 80, 200, 380], [620, 200, 500, 320], [820, 120, 900, 300],
            [900, 300, 720, 440], [720, 440, 650, 560],
        ].map(([x1, y1, x2, y2], i) => (
            <line key={`l${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#00d9ff" strokeWidth="0.8" strokeOpacity="0.6" />
        ))}
    </svg>
);

export function SectionHeading({ prefix, title, accent, center = false }: {
    prefix: string; title: string; accent: string; center?: boolean;
}) {
    return (
        <div className={center ? 'text-center' : ''}>
            <span className="font-mono text-xs text-accent/50 tracking-widest">/{prefix}</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-1">
                {title} <span className="text-accent">{accent}</span>
            </h2>
        </div>
    );
}

export function TimelineItem({ children, color, ...props }: { children: React.ReactNode; color: 'accent' | 'violet' } & React.ComponentPropsWithoutRef<'div'>) {
    const dot = color === 'accent' ? 'bg-accent' : 'bg-violet-400';
    const line = color === 'accent' ? 'bg-accent/20' : 'bg-violet-400/20';
    return (
        <div className="flex gap-4" {...props}>
            <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${dot} mt-1.5 flex-shrink-0`} />
                <div className={`w-px flex-1 ${line} my-1`} />
            </div>
            <div className="pb-4">{children}</div>
        </div>
    );
}

export function SkillCard({ category, skills, ...props }: { category: string; skills: string[] } & React.ComponentPropsWithoutRef<'div'>) {
    const { ref, inView } = useInView();
    return (
        <div ref={ref}
            className={`bg-surface border border-border rounded-xl p-6 card-glow transition-all duration-500 group ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            {...props}>
            <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-lg bg-primary/80 border border-border">
                    <SkillIcon category={category} />
                </div>
                <h3 className="font-display font-bold text-white text-sm">{category}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
                {skills.map((s, i) => (
                    <span key={i} className="tech-pill">{s}</span>
                ))}
            </div>
        </div>
    );
}

export function ProjectCard({ project, index, compact = false, ...props }: { project: Project; index: number; compact?: boolean } & React.ComponentPropsWithoutRef<'div'>) {
    const { ref, inView } = useInView();
    const gradients = [
        'from-accent/30 to-accent2/30',
        'from-accent2/30 to-accent3/30',
        'from-accent3/30 to-accent/30',
        'from-accent/20 via-accent3/20 to-accent2/20',
    ];

    const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    return (
        <Link to={`/projects/${slug}`} ref={ref as any}
            className={`group relative bg-surface/30 border border-border/70 rounded-xl overflow-hidden transition-all duration-300 flex flex-col w-full h-full ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${project.isFeatured ? 'md:col-span-2' : ''} hover:border-accent/30 hover:-translate-y-1`}
            style={{ transitionDelay: `${index * 80}ms` }}
            {...props}>

            {/* gradient top bar */}
            <div className={`h-[2px] w-full bg-gradient-to-r ${gradients[index % gradients.length]}`} />

            {/* featured badge */}
            {project.isFeatured && (
                <div className="absolute top-5 right-5 flex items-center gap-1.5 bg-accent/10 border border-accent/25 text-accent text-[9px] font-mono font-semibold px-2.5 py-0.5 rounded tracking-wider z-10 uppercase">
                    [ featured ]
                </div>
            )}

            <div className={`p-7 flex flex-col flex-grow relative ${compact ? 'justify-center' : ''}`}>
                {/* Catalog Indexing */}
                {!project.isFeatured && (
                    <div className="absolute top-5 right-5 font-mono text-[10px] text-slate-600 select-none group-hover:text-accent/60 transition-colors">
                        [{String(index + 1).padStart(2, '0')}]
                    </div>
                )}

                {/* title */}
                <h3 className="text-xl font-display font-semibold text-white group-hover:text-accent transition-colors mb-2 mt-2">
                    {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-5 leading-relaxed font-light">{project.description}</p>

                {/* features */}
                {!compact && (
                    <ul className="space-y-1.5 mb-6 flex-grow">
                        {project.features.slice(0, 2).map((f, i) => (
                            <li key={i} className="flex gap-2 text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                                <span className="text-accent mt-0.5 flex-shrink-0">›</span> {f}
                            </li>
                        ))}
                        {project.features.length > 2 && (
                            <li className="flex gap-2 text-xs text-slate-500 font-mono mt-2">
                                + {project.features.length - 2} more...
                            </li>
                        )}
                    </ul>
                )}

                {/* tech pills */}
                {!compact && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.techStack.map((t, i) => (
                            <span key={i} className="tech-pill">{t}</span>
                        ))}
                    </div>
                )}

                {/* links (stop propagation if clicked so we don't route) */}
                {!compact && (
                    <div className="flex gap-5 mt-auto pt-4 border-t border-border/50" onClick={(e) => e.stopPropagation()}>
                        {project.links?.github && (
                            <a href={project.links.github} target="_blank" rel="noreferrer"
                                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-accent transition-colors font-medium">
                                <Github size={14} /> Code
                            </a>
                        )}
                        {project.links?.demo && (
                            <a href={project.links.demo} target="_blank" rel="noreferrer"
                                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-accent transition-colors font-medium">
                                <ExternalLink size={14} /> Live Demo
                            </a>
                        )}
                    </div>
                )}
            </div>
        </Link>
    );
}

export function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
    return (
        <a href={href} target="_blank" rel="noreferrer" aria-label={label}
            className="p-3 border border-border rounded text-slate-400 hover:text-accent hover:border-accent/40 hover:bg-accent/5 transition-all">
            {children}
        </a>
    );
}
