import React from 'react';
import { Terminal, Lightbulb, Compass, Award, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../constants';
import { TimelineEvent } from '../../types';
import { SectionHeading, useInView } from '../components/Shared';

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
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] } }
};

const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const statItem = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } }
};

const listItem = {
    hidden: { opacity: 0, x: -15 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4 } }
};

function AnimatedTimelineItem({ item, index }: { item: TimelineEvent; index: number }) {
    const { ref, inView } = useInView(0.1);
    const isExp = item.type === 'experience';
    const colorText = isExp ? 'text-violet-400' : 'text-accent';
    const dotBg = isExp ? 'bg-violet-400' : 'bg-accent';
    const borderHover = isExp ? 'hover:border-violet-500/30' : 'hover:border-accent/30';
    const glowColor = isExp ? '#a855f7' : '#00d9ff';

    return (
        <div ref={ref} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            {/* Center dot */}
            <div className={`flex items-center justify-center w-3 h-3 rounded-full border-4 box-content ${dotBg} border-secondary absolute left-0 md:left-1/2 -translate-x-1/2 translate-y-1.5 shadow-[0_0_12px_currentColor] ${colorText} transition-all duration-500`} />

            <motion.div
                className="w-[calc(100%-2rem)] md:w-[calc(50%-2rem)] pl-8 md:pl-0 md:group-odd:pl-8 md:group-even:pr-8"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                <motion.div
                    className={`bg-surface border border-border p-6 rounded-xl ${borderHover} transition-all duration-300`}
                    whileHover={{ scale: 1.02, boxShadow: `0 0 28px ${glowColor}18` }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                        <h4 className="text-white font-bold text-lg">{item.title}</h4>
                        <span className="text-slate-500 text-xs font-mono whitespace-nowrap">{item.date}</span>
                    </div>
                    <div className={`${colorText} text-sm mb-4 font-medium`}>{item.organization}</div>
                    <ul className="space-y-2">
                        {item.details.map((detail, j) => (
                            <li key={j} className="text-slate-400 text-sm flex gap-3 leading-relaxed">
                                <span className={`${colorText} mt-1 flex-shrink-0 text-xs`}>›</span> {detail}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default function About() {
    return (
        <section className="py-20 relative flex-grow">
            <div className="max-w-6xl mx-auto px-6">

                {/* Heading */}
                <motion.div variants={fadeUp} initial="hidden" animate="show">
                    <SectionHeading prefix="01" title="About" accent="Me" />
                </motion.div>

                <div className="flex flex-col gap-14 mt-14">

                    {/* ── BIO CARD ── */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        className="relative group w-full"
                    >
                        <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-accent/30 to-violet-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                        <motion.div
                            className="relative bg-surface border border-border rounded-xl p-8 md:p-12 card-glow transition-all duration-300"
                            whileHover={{ boxShadow: '0 0 40px #00d9ff12' }}
                        >
                            <div className="flex items-center gap-2 font-mono text-xs text-accent mb-6 bg-accent/10 px-3 py-1.5 rounded-full inline-flex border border-accent/20">
                                <Terminal size={14} /> <span>tamizharasan.profile</span>
                            </div>
                            <h3 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-white mb-10 leading-tight">
                                Breathing life into AI. <br className="hidden lg:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-violet-400">Architecting robust full-stack systems.</span>
                            </h3>

                            <div className="grid md:grid-cols-2 gap-10 text-slate-300 leading-relaxed text-sm md:text-base">
                                <div className="space-y-4 relative">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2.5 bg-accent/10 border border-accent/20 rounded-xl text-accent shadow-[0_0_15px_rgba(0,217,255,0.15)]">
                                            <Sparkles size={20} />
                                        </div>
                                        <h4 className="text-white font-display font-bold text-xl tracking-wide">AI Application Layer</h4>
                                    </div>
                                    <p className="text-slate-400">
                                        I specialize in making AI reliable for production. My core expertise lies in engineering grounded <strong className="text-slate-200">RAG pipelines</strong>, orchestrating complex LLM interactions, and building custom prompt systems. I don't just ping APIs; I structure data and control hallucinations to build intelligent features that actually work.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2.5 bg-violet-500/10 border border-violet-500/20 rounded-xl text-violet-400 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                                            <Terminal size={20} />
                                        </div>
                                        <h4 className="text-white font-display font-bold text-xl tracking-wide">Secure Full-Stack Backend</h4>
                                    </div>
                                    <p className="text-slate-400">
                                        Great AI needs a powerful foundation. I pair my intelligent models with <strong className="text-slate-200">highly secure and scalable full-stack architectures</strong>. From WebSocket-driven real-time infrastructure to robust relational databases, I ensure the backend is fast, secure, and ready to handle complex application logic seamlessly.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* ── AI PHILOSOPHY QUOTE ── */}
                    <motion.div
                        className="w-full relative py-6 md:py-8 mb-6 mt-2"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                    >
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                            <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-accent to-transparent" />
                        </div>
                        <div className="relative text-center max-w-3xl mx-auto px-4">
                            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-xs font-mono px-3 py-1.5 rounded-full mb-6 relative z-10">
                                <Zap size={10} /> My Philosophy
                            </div>
                            <h4 className="text-xl md:text-3xl font-display font-bold text-white mb-6 italic leading-relaxed">
                                "AI won't replace developers. <br className="hidden md:block" />
                                <span className="text-accent">But developers who use AI </span>
                                will replace those who don't."
                            </h4>
                            <p className="text-sm md:text-base text-slate-400 leading-relaxed font-mono">
                                I don't just blindly copy-paste AI code. I use AI to architect faster, increase my productivity by 10x, and strictly review the outputs. It’s an amplifier for human creativity and robust engineering.
                            </p>
                        </div>
                    </motion.div>

                    {/* ── STATS GRID ── */}
                    <motion.div
                        className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                    >
                        {[
                            { val: '4', label: 'Production Apps', color: 'text-accent', glow: '#00d9ff', icon: <Terminal size={20} className="text-accent" /> },
                            { val: '8.7', label: 'CGPA at SIST', color: 'text-violet-400', glow: '#a855f7', icon: <Award size={20} className="text-violet-400" /> },
                            { val: '2026', label: 'Target: Internship', color: 'text-cyan-400', glow: '#22d3ee', icon: <Compass size={20} className="text-cyan-400" /> },
                            { val: 'AI', label: 'Core Focus', color: 'text-emerald-400', glow: '#34d399', icon: <Lightbulb size={20} className="text-emerald-400" /> },
                        ].map(s => (
                            <motion.div
                                key={s.label}
                                variants={statItem}
                                className="bg-primary/60 border border-border rounded-xl p-7 group flex flex-col items-center text-center cursor-default"
                                whileHover={{ scale: 1.05, borderColor: s.glow + '40', boxShadow: `0 0 24px ${s.glow}18` }}
                                transition={{ duration: 0.2 }}
                            >
                                <motion.div
                                    className="mb-3"
                                    whileHover={{ rotate: 15 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {s.icon}
                                </motion.div>
                                <div className={`text-2xl sm:text-3xl md:text-4xl font-bold font-display ${s.color} mt-1`}>{s.val}</div>
                                <div className="text-xs text-slate-500 mt-3 uppercase tracking-wider font-medium">{s.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* ── JOURNEY TIMELINE ── */}
                    <motion.div
                        className="bg-surface/50 border border-border rounded-xl p-8 md:p-12 card-glow w-full"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                    >
                        <h3 className="text-2xl font-display font-bold text-white mb-10 flex items-center gap-3">
                            <span className="p-2 bg-violet-500/10 border border-violet-500/20 rounded-lg text-violet-400"><Award size={20} /></span>
                            My <span className="text-violet-400 ml-2">Journey</span>
                        </h3>

                        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-1.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                            {PORTFOLIO_DATA.timeline.map((item, i) => (
                                <React.Fragment key={i}>
                                    <AnimatedTimelineItem item={item} index={i} />
                                </React.Fragment>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── INTERESTS & HOBBIES ── */}
                    <div className="grid md:grid-cols-2 gap-6 w-full">
                        <motion.div
                            className="bg-surface/50 border border-border rounded-xl p-8"
                            variants={fadeLeft}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-60px" }}
                            whileHover={{ boxShadow: '0 0 24px #facc1512' }}
                        >
                            <h4 className="font-display font-bold text-white mb-6 flex items-center gap-3 text-lg">
                                <Lightbulb size={20} className="text-yellow-400" /> Interests & Focus
                            </h4>
                            <motion.ul
                                className="space-y-4"
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                            >
                                {PORTFOLIO_DATA.interests.map((int, i) => (
                                    <motion.li key={i} variants={listItem} className="text-slate-300 flex items-start gap-3 group/item">
                                        <span className="text-yellow-400/60 mt-1 group-hover/item:text-yellow-400 transition-colors">▸</span>
                                        {int}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>

                        <motion.div
                            className="bg-surface/50 border border-border rounded-xl p-8"
                            variants={fadeRight}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-60px" }}
                            whileHover={{ boxShadow: '0 0 24px #60a5fa12' }}
                        >
                            <h4 className="font-display font-bold text-white mb-6 flex items-center gap-3 text-lg">
                                <Compass size={20} className="text-blue-400" /> Beyond Coding
                            </h4>
                            <motion.ul
                                className="space-y-4"
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                            >
                                {PORTFOLIO_DATA.hobbies.map((hob, i) => (
                                    <motion.li key={i} variants={listItem} className="text-slate-300 flex items-start gap-3 group/item">
                                        <span className="text-blue-400/60 mt-1 group-hover/item:text-blue-400 transition-colors">▸</span>
                                        {hob}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>
                    </div>

                    {/* ── BOTTOM CTA STRIP ── */}
                    <motion.div
                        variants={scaleReveal}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                        className="relative group w-full"
                    >
                        <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-accent/20 via-violet-500/20 to-accent/20 opacity-60 rounded-xl blur-sm" />
                        <div className="relative bg-surface/70 border border-border rounded-xl px-5 py-6 sm:px-10 sm:py-8 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-accent/10 rounded-xl border border-accent/20">
                                    <Sparkles size={22} className="text-accent" />
                                </div>
                                <div>
                                    <h4 className="text-white font-display font-bold text-lg">Open to AI Engineering roles</h4>
                                    <p className="text-slate-400 text-sm">Targeting internships & full-time positions starting 2026</p>
                                </div>
                            </div>
                            <motion.a
                                href="/resume.pdf"
                                download
                                className="flex-shrink-0 flex items-center gap-2 bg-accent text-primary font-bold px-6 py-3 rounded hover:bg-cyan-300 transition-all text-sm"
                                whileHover={{ scale: 1.05, boxShadow: '0 0 24px #00d9ff88' }}
                                whileTap={{ scale: 0.97 }}
                            >
                                Download Resume
                            </motion.a>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
