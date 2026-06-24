import React, { useRef } from 'react';
import { Github, Linkedin, Mail, ArrowRight, Zap } from 'lucide-react';
import {
    SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiPython, SiTensorflow, SiSupabase,
    SiPostgresql, SiOpencv, SiGooglegemini, SiFramer, SiFastapi, SiSpring,
    SiNodedotjs, SiJavascript, SiMysql, SiGit, SiDocker, SiScikitlearn
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../constants';
import { useTypewriter, SectionHeading, ProjectCard } from '../components/Shared';

/* ── Animation Variants ── */
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
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

const scaleReveal = {
    hidden: { opacity: 0, scale: 0.85 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] } }
};

const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

const iconItem = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } }
};

const pillItem = {
    hidden: { opacity: 0, scale: 0.7 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] } }
};

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);

    /* Scroll progress bar */
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    const typewritten = useTypewriter(
        ['AI Engineer', 'LLM App Developer', 'Full-Stack Builder'],
        75, 2200
    );

    const techIcons = [
        { icon: <SiPython size={26} />, color: "text-[#3776AB]", title: "Python" },
        { icon: <FaJava size={26} />, color: "text-[#007396]", title: "Java" },
        { icon: <SiTypescript size={26} />, color: "text-[#3178C6]", title: "TypeScript" },
        { icon: <SiJavascript size={26} />, color: "text-[#F7DF1E]", title: "JavaScript" },
        { icon: <SiNextdotjs size={26} />, color: "text-white", title: "Next.js" },
        { icon: <SiReact size={26} />, color: "text-[#61DAFB]", title: "React.js" },
        { icon: <SiTailwindcss size={26} />, color: "text-[#06B6D4]", title: "Tailwind CSS" },
        { icon: <SiFramer size={26} />, color: "text-[#0055FF]", title: "Framer Motion" },
        { icon: <SiFastapi size={26} />, color: "text-[#009688]", title: "FastAPI" },
        { icon: <SiNodedotjs size={26} />, color: "text-[#339933]", title: "Node.js" },
        { icon: <SiSpring size={26} />, color: "text-[#6DB33F]", title: "Spring Boot" },
        { icon: <SiTensorflow size={26} />, color: "text-[#FF6F00]", title: "TensorFlow" },
        { icon: <SiScikitlearn size={26} />, color: "text-[#F7931E]", title: "Scikit-learn" },
        { icon: <SiOpencv size={26} />, color: "text-[#5C3EE8]", title: "OpenCV" },
        { icon: <SiGooglegemini size={26} />, color: "text-[#8E75B2]", title: "Gemini AI" },
        { icon: <SiPostgresql size={26} />, color: "text-[#4169E1]", title: "PostgreSQL" },
        { icon: <SiMysql size={26} />, color: "text-[#4479A1]", title: "MySQL" },
        { icon: <SiSupabase size={26} />, color: "text-[#3ECF8E]", title: "Supabase" },
        { icon: <SiGit size={26} />, color: "text-[#F05032]", title: "Git" },
        { icon: <SiDocker size={26} />, color: "text-[#2496ED]", title: "Docker" }
    ];

    return (
        <div ref={containerRef} className="flex flex-col w-full">

            {/* ── Scroll Progress Bar ── */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
                style={{
                    scaleX,
                    background: 'linear-gradient(90deg, #00d9ff, #a855f7, #00d9ff)',
                    boxShadow: '0 0 10px #00d9ffaa'
                }}
            />

            {/* ══ HERO ══ */}
            <section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden">
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-10">
                    <div className="inline-flex items-center gap-2 font-mono text-xs text-accent/80 bg-accent/5 border border-accent/25 px-4 py-1.5 rounded-full mb-8 animate-[fadeInUp_0.6s_ease-out_forwards]">
                        <span> CSE (AI) FINAL-YEAR • SIST CHENNAI</span>
                    </div>

                    <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-medium tracking-wide mb-6 animate-[fadeInUp_0.7s_ease-out_0.1s_forwards] opacity-0 text-white leading-[1.1]">
                        Tamizharasan <span className="italic text-accent2 font-semibold">R.</span>
                    </h1>

                    <div className="h-12 flex items-center justify-center mb-6 animate-[fadeInUp_0.7s_ease-out_0.2s_forwards] opacity-0">
                        <span className="font-mono text-xl md:text-2xl text-accent">
                            {typewritten}
                            <span className="animate-blink">|</span>
                        </span>
                    </div>

                    <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10 animate-[fadeInUp_0.7s_ease-out_0.3s_forwards] opacity-0">
                        Building on the application layer of AI — RAG pipelines, LLM orchestration,
                        and full-stack products. Based in Chennai, targeting AI Engineering roles in 2026.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-10 animate-[fadeInUp_0.7s_ease-out_0.4s_forwards] opacity-0">
                        <Link to="/projects"
                            className="flex items-center gap-2 bg-accent text-primary font-bold px-6 py-3 rounded hover:opacity-90 transition-all text-sm">
                            View Work <ArrowRight size={15} />
                        </Link>
                        <a href="/resume.pdf" download
                            className="flex items-center gap-2 border border-accent/30 text-accent px-6 py-3 rounded hover:bg-accent/5 hover:border-accent transition-all text-sm">
                            <Mail size={15} /> Download Resume
                        </a>
                    </div>

                    <div className="flex justify-center gap-5 animate-[fadeInUp_0.7s_ease-out_0.5s_forwards] opacity-0">
                        {[
                            { icon: <Github size={18} />, href: PORTFOLIO_DATA.github, label: 'GitHub' },
                            { icon: <Linkedin size={18} />, href: `https://${PORTFOLIO_DATA.linkedin}`, label: 'LinkedIn' },
                            { icon: <Mail size={18} />, href: `mailto:${PORTFOLIO_DATA.email}`, label: 'Email' },
                        ].map(s => (
                            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                                className="p-3 rounded border border-white/10 text-slate-400 hover:text-accent hover:border-accent/40 hover:bg-accent/5 transition-all">
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ ABOUT PREVIEW ══ */}
            <section className="py-24 relative border-t border-white/5">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
                        {/* Left Side: Large Serif Quote Statement */}
                        <motion.div
                            variants={fadeLeft}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-80px" }}
                            className="md:col-span-6 space-y-4"
                        >
                            <SectionHeading prefix="01" title="Quick" accent="Intro" />
                            <h3 className="text-2xl sm:text-3xl font-display font-light text-white leading-relaxed pt-4 italic">
                                "Grounded intelligence meets responsive interaction. I construct pipelines that think, and backend systems that scale."
                            </h3>
                        </motion.div>
                        
                        {/* Right Side: Narrative + Highlights Card */}
                        <motion.div
                            variants={fadeRight}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-80px" }}
                            className="md:col-span-6 space-y-6"
                        >
                            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
                                I build on the application layer of Artificial Intelligence — focusing on self-correcting RAG flows, database agent orchestration, and secure web architectures.
                            </p>
                            
                            {/* Bullet card */}
                            <div className="glass-panel rounded-2xl p-6 space-y-3 shadow-md">
                                <div className="flex items-start gap-3">
                                    <span className="text-accent mt-1 text-xs select-none">✦</span>
                                    <div>
                                        <h4 className="text-white text-xs sm:text-sm font-semibold font-mono">Academic Track</h4>
                                        <p className="text-slate-500 text-xs mt-0.5">Final-Year B.E CSE (AI) · SIST Chennai · 8.86 CGPA</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 pt-3 border-t border-white/5">
                                    <span className="text-accent2 mt-1 text-xs select-none">✦</span>
                                    <div>
                                        <h4 className="text-white text-xs sm:text-sm font-semibold font-mono">Domain Experience</h4>
                                        <p className="text-slate-500 text-xs mt-0.5">AI Domain Intern · Designed 10-agent Text-to-SQL pipelines</p>
                                    </div>
                                </div>
                            </div>

                            <Link to="/about" className="inline-flex items-center gap-2 border border-white/10 hover:border-accent/40 bg-white/[0.01] hover:bg-accent/5 text-slate-300 hover:text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 uppercase tracking-wider font-mono">
                                Discover My Journey <ArrowRight size={13} />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ══ AI VISION ══ */}
            <section className="py-24 relative overflow-hidden">
                <motion.div
                    variants={scaleReveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    className="max-w-4xl mx-auto px-6 text-center relative z-10 w-full"
                >
                    <SectionHeading prefix="02" title="AI" accent="Vision" center />
                    <motion.div
                        className="mt-14 bg-surface/30 border border-border/50 hover:border-accent/30 rounded-2xl backdrop-blur-sm overflow-hidden transition-all duration-300"
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        {/* Minimalist editorial header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-border/30 select-none bg-secondary/20">
                            <span className="font-mono text-[10px] text-accent/60 tracking-widest uppercase">/ 02 . VISION</span>
                            <span className="font-mono text-[10px] text-slate-500">vision.ts</span>
                        </div>

                        {/* Card Content */}
                        <div className="p-6 sm:p-12 pt-10">
                            <blockquote className="text-xl sm:text-2xl md:text-3xl font-display text-slate-100 leading-relaxed mb-6 font-light italic">
                                "Making AI talk is easy.
                                <br className="hidden sm:inline" />
                                <span className="text-accent not-italic font-semibold"> Making it reliable is engineering."</span>
                            </blockquote>
                            <p className="hidden md:block text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-8 font-light">
                                Anyone can ping an API, but building production-ready AI requires control. I specialize in the application layer — controlling hallucinations through grounded RAG pipelines, structuring data, and ensuring LLM outputs are accurate, fast, and seamlessly integrated into user-facing products.
                            </p>

                            {/* Staggered pills */}
                            <motion.div
                                className="flex flex-wrap justify-center gap-3"
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                            >
                                {['RAG Pipelines', 'Prompt Engineering', 'LLM Orchestration', 'AI Product Engineering', 'Computer Vision'].map(t => (
                                    <motion.span key={t} variants={pillItem} className="tech-pill text-xs">
                                        {t}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* ══ PREMIUM UX HIGHLIGHT ══ */}
            <section className="py-24 relative overflow-hidden">
                <motion.div
                    variants={scaleReveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    className="max-w-4xl mx-auto px-6 text-center relative z-10 w-full"
                >
                    <SectionHeading prefix="UX" title="Premium" accent="Experience" center />
                    <motion.div
                        className="mt-14 bg-surface/30 border border-border/50 hover:border-accent2/30 rounded-2xl backdrop-blur-sm overflow-hidden transition-all duration-300"
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        {/* Minimalist editorial header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-border/30 select-none bg-secondary/20">
                            <span className="font-mono text-[10px] text-accent2/60 tracking-widest uppercase">/ UX . INTERACTION</span>
                            <span className="font-mono text-[10px] text-slate-500">interaction.tsx</span>
                        </div>

                        {/* Card Content */}
                        <div className="p-6 sm:p-12 pt-10">
                            <blockquote className="text-xl sm:text-2xl md:text-3xl font-display text-white leading-relaxed mb-6 font-light italic">
                                "Functionality brings them in.
                                <br className="hidden sm:inline" />
                                <span className="text-accent2 not-italic font-semibold"> Experience makes them stay."</span>
                            </blockquote>
                            <p className="hidden md:block text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-8 font-light">
                                Beyond algorithms and APIs, I care deeply about how it feels to use the product. From ultra-smooth scroll animations to micro-interactions and stunning interfaces that don't compromise on performance.
                            </p>

                            {/* Staggered pills */}
                            <motion.div
                                className="flex flex-wrap justify-center gap-3"
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                            >
                                {['Framer Motion', 'React Spring', 'Tailwind CSS', 'Micro-interactions', 'Premium Dashboards'].map(t => (
                                    <motion.span key={t} variants={pillItem} className="tech-pill text-xs !border-accent2/20 !text-accent2 !bg-accent2/5">
                                        {t}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* ══ TECH STACK PREVIEW ══ */}
            <section className="py-28 relative">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-80px" }}
                    >
                        <SectionHeading prefix="03" title="Core" accent="Tech Stack" center />
                    </motion.div>

                    {/* Staggered icon grid */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mt-14 mb-14"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                    >
                        {techIcons.map((t, i) => (
                            <motion.div
                                key={i}
                                variants={iconItem}
                                title={t.title}
                                className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-surface border border-border rounded-xl hover:border-accent/40 hover:bg-accent/5 transition-all group cursor-default"
                                whileHover={{ y: -6, scale: 1.12, transition: { duration: 0.2 } }}
                            >
                                <div className={`transform transition-all duration-300 filter grayscale group-hover:grayscale-0 group-hover:opacity-100 opacity-40 ${t.color}`}>
                                    {t.icon}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        <Link to="/skills"
                            className="inline-flex items-center gap-2 border border-accent/40 text-accent px-6 py-3 rounded hover:bg-accent/10 hover:border-accent transition-all text-sm font-medium">
                            View Detailed Arsenal <ArrowRight size={14} />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ══ PROJECTS PREVIEW ══ */}
            <section className="py-24 relative">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        className="text-center mb-14"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-80px" }}
                    >
                        <SectionHeading prefix="04" title="Featured" accent="Work" center />
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                    >
                        {PORTFOLIO_DATA.projects.slice(0, 3).map((p, i) => (
                            <motion.div key={i} variants={fadeUp} className="h-full">
                                <ProjectCard project={p} index={i} compact={true} />
                            </motion.div>
                        ))}

                        {/* ══ VIEW MORE PROJECTS CARD (Fills the 4th slot) ══ */}
                        <motion.div variants={fadeUp} className="h-full">
                            <Link to="/projects" className="group relative bg-surface/20 border border-dashed border-border hover:border-accent/30 rounded-xl overflow-hidden transition-all duration-300 flex flex-col items-center justify-center h-full min-h-[200px]">
                                <div className="relative z-10 flex flex-col items-center gap-4 p-8 text-center">
                                    <div className="w-12 h-12 rounded-full bg-accent/5 flex items-center justify-center border border-accent/25 group-hover:scale-105 transition-transform duration-300">
                                        <ArrowRight className="text-accent" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-display font-semibold text-white mb-2">View More Projects</h3>
                                        <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                                            Explore the rest of my portfolio to see more projects in detail.
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ══ CONTACT PREVIEW ══ */}
            <section className="py-24 relative">
                <motion.div
                    variants={scaleReveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    className="max-w-4xl mx-auto px-6 text-center"
                >
                    <SectionHeading prefix="05" title="Get in" accent="Touch" center />
                    <p className="text-slate-300 md:text-lg leading-relaxed mt-10 mb-10">
                        Interested in collaborating or have a role that fits my profile? Let's connect and build something great together.
                    </p>
                    <Link to="/contact" className="inline-flex items-center gap-2 border border-accent/40 text-accent px-6 py-3 rounded hover:bg-accent/10 hover:border-accent transition-all text-sm font-medium">
                        Reach Out <ArrowRight size={14} />
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}
