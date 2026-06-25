import React from 'react';
import { Terminal, Award, Compass, Lightbulb, Sparkles, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { getLocalPortfolioData } from '../services/portfolio';
import { SectionHeading } from '../components/Shared';

const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05 } }
};

export default function About() {
    const PORTFOLIO_DATA = getLocalPortfolioData();
    // Separate timeline into experience and education
    const experience = PORTFOLIO_DATA.timeline.filter(item => item.type === 'experience');
    const education = PORTFOLIO_DATA.timeline.filter(item => item.type === 'education');

    return (
        <section className="py-20 relative flex-grow bg-transparent">
            <div className="max-w-5xl mx-auto px-6">

                {/* ══ Heading ══ */}
                <motion.div variants={fadeUp} initial="hidden" animate="show" className="mb-14">
                    <SectionHeading prefix="01" title="The Profile" accent="& Narrative" />
                </motion.div>

                {/* ══ 1. PROFILE ASYMMETRIC BENTO GRID ══ */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-20">
                    
                    {/* Left Panel: Display narrative (65% width) */}
                    <motion.div 
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        className="md:col-span-8 space-y-6"
                    >
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-light text-white leading-[1.15] tracking-wide">
                            Engineering at the intersection of <span className="italic text-accent2">intelligent pipelines</span> and secure backend layers.
                        </h3>
                        <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
                            I am a final-year Computer Science student specializing in Artificial Intelligence at SIST, Chennai. I focus on the application layer of LLMs — creating grounded RAG architectures, prompt optimization systems, and secure full-stack database integrations. I build software that bridges complex backend systems with highly visible, responsive user interfaces.
                        </p>
                    </motion.div>

                    {/* Right Panel: Translucent Glass Metadata Card (35% width) */}
                    <motion.div 
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        className="md:col-span-4 glass-panel rounded-2xl p-6 shadow-xl"
                    >
                        <div className="flex items-center gap-2 font-mono text-[10px] text-accent2 mb-6 bg-accent2/5 border border-accent2/20 px-3 py-1 rounded-full w-fit">
                            <Terminal size={11} /> <span>tamizharasan.meta</span>
                        </div>
                        <div className="space-y-4 font-light text-xs text-slate-400">
                            <div>
                                <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block mb-1">Focus</span>
                                <span className="text-white font-medium">AI App Engineering & Web Backends</span>
                            </div>
                            <div className="pt-3 border-t border-white/5">
                                <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block mb-1">Status</span>
                                <span className="text-white font-medium">Final-year CSE (AI)</span>
                            </div>
                            <div className="pt-3 border-t border-white/5">
                                <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block mb-1">Location</span>
                                <span className="text-white font-medium">Chennai, Tamil Nadu, India</span>
                            </div>
                            <div className="pt-3 border-t border-white/5">
                                <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block mb-1">Credentials</span>
                                <span className="text-white font-medium">8.86 CGPA · SIST Sathyabama</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* ══ 2. ACADEMIC HIGHLIGHT (CGPA) BLOCK ══ */}
                <motion.div 
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    className="glass-panel rounded-2xl p-8 mb-20 relative overflow-hidden shadow-xl"
                >
                    <div className="absolute right-0 top-0 w-80 h-80 bg-accent/3 rounded-full blur-[100px] pointer-events-none" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
                        {/* Massive CGPA Display */}
                        <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-white/5 pb-6 md:pb-0 md:pr-8">
                            <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest block mb-2">Academic Standing</span>
                            <div className="font-display text-6xl md:text-7xl font-bold text-accent2 leading-none">
                                8.86
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono tracking-wider mt-2 block">CGPA / Sathyabama University</span>
                        </div>

                        {/* Specialization Details */}
                        <div className="md:col-span-8 space-y-4">
                            <h4 className="text-xl font-display font-semibold text-white">B.E. Computer Science — AI Specialization</h4>
                            <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
                                Pursuing specialisation courses in Neural Networks, Natural Language Processing, and Relational Database Systems. Developed practical knowledge of vectorized data structures and custom prompt boundary systems.
                            </p>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {['Deep Learning', 'LLM Architectures', 'Database Systems', 'RAG Pipelines'].map(s => (
                                    <span key={s} className="tech-pill text-[9px]">{s}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ══ 3. INTERACTIVE ASYMMETRIC TIMELINE ══ */}
                <div className="space-y-20 mb-20">
                    
                    {/* Work Experience Timeline */}
                    <div>
                        <div className="flex items-center gap-3 mb-10">
                            <div className="p-2 bg-accent/5 border border-accent/15 text-accent rounded-xl">
                                <Award size={18} />
                            </div>
                            <h3 className="text-xl font-display font-bold text-white tracking-wide">Work Experience</h3>
                            <div className="flex-grow h-px bg-white/5 ml-4" />
                        </div>

                        <div className="relative border-l border-white/5 pl-6 sm:pl-8 space-y-12">
                            {experience.map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ duration: 0.4, delay: i * 0.05 }}
                                    className="relative group"
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute -left-[30px] sm:-left-[38px] top-1.5 w-2 h-2 rounded-full bg-accent border-4 border-[#0a0a0f] box-content group-hover:scale-125 transition-transform duration-300" />
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-6">
                                        {/* Date Column */}
                                        <div className="md:col-span-3">
                                            <span className="font-mono text-[10px] text-slate-500 tracking-wider uppercase block mt-0.5">{item.date}</span>
                                        </div>
                                        {/* Content Column */}
                                        <div className="md:col-span-9 space-y-3">
                                            <div>
                                                <h4 className="text-white font-display font-bold text-lg leading-snug">{item.title}</h4>
                                                <span className="text-accent text-xs font-mono tracking-wider">{item.organization}</span>
                                            </div>
                                            <ul className="space-y-2">
                                                {item.details.map((detail, j) => (
                                                    <li key={j} className="text-slate-400 text-xs sm:text-sm flex gap-2.5 leading-relaxed font-light">
                                                        <span className="text-accent/60 mt-1 flex-shrink-0 text-xs">›</span>
                                                        <span>{detail}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Academic Milestones Timeline */}
                    <div>
                        <div className="flex items-center gap-3 mb-10">
                            <div className="p-2 bg-accent2/5 border border-accent2/15 text-accent2 rounded-xl">
                                <Compass size={18} />
                            </div>
                            <h3 className="text-xl font-display font-bold text-white tracking-wide">Academic Milestones</h3>
                            <div className="flex-grow h-px bg-white/5 ml-4" />
                        </div>

                        <div className="relative border-l border-white/5 pl-6 sm:pl-8 space-y-12">
                            {education.map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ duration: 0.4, delay: i * 0.05 }}
                                    className="relative group"
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute -left-[30px] sm:-left-[38px] top-1.5 w-2 h-2 rounded-full bg-accent2 border-4 border-[#0a0a0f] box-content group-hover:scale-125 transition-transform duration-300" />
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-6">
                                        {/* Date Column */}
                                        <div className="md:col-span-3">
                                            <span className="font-mono text-[10px] text-slate-500 tracking-wider uppercase block mt-0.5">{item.date}</span>
                                        </div>
                                        {/* Content Column */}
                                        <div className="md:col-span-9 space-y-3">
                                            <div>
                                                <h4 className="text-white font-display font-bold text-lg leading-snug">{item.title}</h4>
                                                <span className="text-accent2 text-xs font-mono tracking-wider">{item.organization}</span>
                                            </div>
                                            <ul className="space-y-2">
                                                {item.details.map((detail, j) => (
                                                    <li key={j} className="text-slate-400 text-xs sm:text-sm flex gap-2.5 leading-relaxed font-light">
                                                        <span className="text-accent2/60 mt-1 flex-shrink-0 text-xs">›</span>
                                                        <span>{detail}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* ══ 4. INTERESTS & FOCUS ══ */}
                <div className="grid md:grid-cols-2 gap-6 mb-20">
                    <motion.div
                        className="glass-panel rounded-2xl p-8"
                        whileHover={{ borderColor: 'rgba(176, 194, 178, 0.2)', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="font-display font-bold text-white mb-6 flex items-center gap-3 text-lg">
                            <Lightbulb size={18} className="text-accent2" /> Interests & Focus Areas
                        </h4>
                        <ul className="space-y-4 font-light text-slate-400 text-xs sm:text-sm">
                            {PORTFOLIO_DATA.interests.map((int, i) => (
                                <li key={i} className="flex items-start gap-3 group">
                                    <span className="text-accent mt-0.5 font-mono select-none">▸</span>
                                    <span>{int}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        className="glass-panel rounded-2xl p-8"
                        whileHover={{ borderColor: 'rgba(217, 154, 126, 0.2)', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="font-display font-bold text-white mb-6 flex items-center gap-3 text-lg">
                            <Sparkles size={18} className="text-accent" /> Beyond Coding
                        </h4>
                        <ul className="space-y-4 font-light text-slate-400 text-xs sm:text-sm">
                            {PORTFOLIO_DATA.hobbies.map((hob, i) => (
                                <li key={i} className="flex items-start gap-3 group">
                                    <span className="text-accent2 mt-0.5 font-mono select-none">▸</span>
                                    <span>{hob}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* ══ 5. RESUME CONVERSION CTA strip ══ */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative group w-full"
                >
                    <div className="relative glass-panel rounded-2xl px-6 py-6 sm:px-10 sm:py-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-accent/5 rounded-xl border border-accent/15 text-accent shadow-[0_0_15px_rgba(176,194,178,0.1)]">
                                <Sparkles size={20} />
                            </div>
                            <div>
                                <h4 className="text-white font-display font-bold text-base sm:text-lg">Open to AI Engineering roles</h4>
                                <p className="text-slate-400 text-xs sm:text-sm font-light">Targeting internships & SDE placements for 2026 / 2027</p>
                            </div>
                        </div>
                        <motion.a
                            href="/resume.pdf"
                            download
                            className="flex-shrink-0 flex items-center gap-2 bg-gradient-to-r from-accent to-accent2 hover:opacity-95 text-[#0a0a0f] font-semibold px-6 py-3.5 rounded-xl shadow-lg transition-all text-xs tracking-wider uppercase font-mono"
                            whileTap={{ scale: 0.97 }}
                        >
                            <Download size={14} /> Download Resume
                        </motion.a>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
