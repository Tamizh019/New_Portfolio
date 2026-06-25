import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Send, CheckCircle2, AlertCircle, ChevronDown, Sparkles, Zap, Globe, Cpu, Rocket, Briefcase, Lightbulb, UserCircle2 } from 'lucide-react';
import { getLocalPortfolioData } from '../services/portfolio';

/* ─── Animation variants ─── */
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const fieldReveal = {
    hidden: { opacity: 0, x: -24 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
const successAnim = {
    hidden: { scale: 0.5, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 15 } },
};

/* ─── Intent options ─── */
const INTENTS = [
    { value: 'ai-role', label: 'AI Engineering / SDE Role', desc: 'Internship or full-time opportunity', icon: <Cpu size={16} className="text-violet-400" /> },
    { value: 'collab', label: 'Open Source Collaboration', desc: 'Let\'s build something together', icon: <Rocket size={16} className="text-accent" /> },
    { value: 'freelance', label: 'Freelance / Contract Project', desc: 'You need an AI-powered solution', icon: <Briefcase size={16} className="text-emerald-400" /> },
    { value: 'research', label: 'Research Discussion', desc: 'Talk about AI/ML ideas', icon: <Lightbulb size={16} className="text-amber-400" /> },
    { value: 'hello', label: 'Just Saying Hello', desc: 'Friendly chat', icon: <UserCircle2 size={16} className="text-blue-400" /> },
];

/* ─── Floating Orbs ─── */
function FloatingOrb({ className }: { className: string }) {
    return (
        <motion.div
            className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
            animate={{ y: [0, -24, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
    );
}

/* ─── InputField wrapper ─── */
function FloatingInput({
    label, id, type = 'text', required = false,
    value, onChange, placeholder,
}: {
    label: string; id: string; type?: string; required?: boolean;
    value: string; onChange: (v: string) => void; placeholder?: string;
}) {
    const [focused, setFocused] = useState(false);
    const filled = value.length > 0;

    return (
        <motion.div variants={fieldReveal} className="relative group">
            <label
                htmlFor={id}
                className={`absolute left-4 transition-all duration-200 pointer-events-none z-10 ${focused || filled
                    ? 'top-2 text-[10px] font-mono text-accent/70'
                    : 'top-1/2 -translate-y-1/2 text-sm text-slate-500'
                    }`}
            >
                {label}{required && <span className="text-accent ml-0.5">*</span>}
            </label>
            <input
                id={id}
                type={type}
                required={required}
                value={value}
                onChange={e => onChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder={focused ? placeholder : ''}
                className={`w-full bg-surface border rounded-xl pt-6 pb-3 px-4 text-sm text-white placeholder:text-slate-600 transition-all duration-300 outline-none
                    ${focused
                        ? 'border-accent/60 shadow-[0_0_24px_rgba(0,217,255,0.12)]'
                        : 'border-border hover:border-slate-600'
                    }`}
            />
        </motion.div>
    );
}

/* ─── Textarea wrapper ─── */
function FloatingTextarea({
    label, id, required = false, value, onChange, placeholder, rows = 4
}: {
    label: string; id: string; required?: boolean;
    value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
    const [focused, setFocused] = useState(false);
    const filled = value.length > 0;

    return (
        <motion.div variants={fieldReveal} className="relative group">
            <label
                htmlFor={id}
                className={`absolute left-4 transition-all duration-200 pointer-events-none z-10 ${focused || filled
                    ? 'top-2 text-[10px] font-mono text-accent/70'
                    : 'top-4 text-sm text-slate-500'
                    }`}
            >
                {label}{required && <span className="text-accent ml-0.5">*</span>}
            </label>
            <textarea
                id={id}
                required={required}
                value={value}
                rows={rows}
                onChange={e => onChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder={focused ? placeholder : ''}
                className={`w-full bg-surface border rounded-xl pt-7 pb-3 px-4 text-sm text-white placeholder:text-slate-600 transition-all duration-300 outline-none resize-none
                    ${focused
                        ? 'border-accent/60 shadow-[0_0_24px_rgba(0,217,255,0.12)]'
                        : 'border-border hover:border-slate-600'
                    }`}
            />
        </motion.div>
    );
}

/* ─── Custom Select ─── */
function IntentSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
    const [open, setOpen] = useState(false);
    const selected = INTENTS.find(i => i.value === value);

    return (
        <motion.div variants={fieldReveal} className="relative z-30">
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                className={`w-full bg-surface border rounded-xl px-4 py-4 text-left flex items-center justify-between transition-all duration-300
                    ${open ? 'border-accent/60 shadow-[0_0_24px_rgba(0,217,255,0.12)]' : 'border-border hover:border-slate-600'}`}
            >
                {selected ? (
                    <span className="flex items-center gap-3 text-sm text-white">
                        {selected.icon}
                        {selected.label}
                    </span>
                ) : (
                    <span className="text-sm text-slate-500">What brings us together?<span className="text-accent ml-0.5">*</span></span>
                )}
                <ChevronDown size={16} className={`text-slate-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.5)] bg-primary"
                    >
                        {INTENTS.map(intent => (
                            <button
                                key={intent.value}
                                type="button"
                                onClick={() => { onChange(intent.value); setOpen(false); }}
                                className={`w-full px-4 py-3.5 text-left hover:bg-accent/5 transition-colors flex items-start gap-4 border-b border-border/50 last:border-0
                                    ${value === intent.value ? 'bg-accent/10' : ''}`}
                            >
                                <div className="mt-0.5 flex-shrink-0">
                                    {intent.icon}
                                </div>
                                <div className="flex-grow">
                                    <div className="text-sm text-white font-medium">{intent.label}</div>
                                    <div className="text-xs text-slate-500 mt-0.5">{intent.desc}</div>
                                </div>
                                {value === intent.value && <CheckCircle2 size={14} className="text-accent ml-auto mt-0.5 flex-shrink-0" />}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

/* ─── Main Contact Component ─── */
export default function Contact() {
    const PORTFOLIO_DATA = getLocalPortfolioData();
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    const [form, setForm] = useState({
        name: '', email: '', intent: '', challenge: '', message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const set = (key: string) => (v: string) => setForm(f => ({ ...f, [key]: v }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.intent) { setErrorMsg('Please select what brings you here!'); return; }
        setStatus('loading');
        setErrorMsg('');

        const intentLabel = INTENTS.find(i => i.value === form.intent)?.label ?? form.intent;

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    access_key: '96f7ecd0-2e89-4a58-ade6-dfcd1e209c72',
                    subject: `[Portfolio] ${intentLabel} — from ${form.name}`,
                    from_name: form.name,
                    email: form.email,
                    'What brings us together': intentLabel,
                    'Biggest challenge': form.challenge,
                    message: form.message || '(No extra message)',
                }),
            });

            const data = await res.json();
            if (data.success) {
                setStatus('success');
                setForm({ name: '', email: '', intent: '', challenge: '', message: '' });
            } else {
                throw new Error(data.message ?? 'Something went wrong');
            }
        } catch (err: unknown) {
            setStatus('error');
            setErrorMsg(err instanceof Error ? err.message : 'Submission failed. Please try again.');
        }
    };

    return (
        <section className="py-24 relative" ref={ref}>
            {/* Background orbs */}
            <FloatingOrb className="w-80 h-80 bg-accent/5 top-0 left-1/4" />
            <FloatingOrb className="w-60 h-60 bg-violet-500/5 bottom-10 right-1/4" />

            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? 'show' : 'hidden'}
                >
                    <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-xs font-mono px-3 py-1.5 rounded-full mb-6">
                        04 / contact
                    </div>
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
                        Let's <span className="text-accent">Build Something</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
                        Whether it's an AI product, open-source collaboration, or just a great conversation —
                        <span className="text-accent font-medium"> I'd love to hear from you.</span>
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-12 items-start">
                    {/* Left Info Panel */}
                    <motion.div
                        className="lg:col-span-2 space-y-8"
                        variants={stagger}
                        initial="hidden"
                        animate={inView ? 'show' : 'hidden'}
                    >
                        {/* Status card */}
                        <motion.div variants={fadeUp} className="bg-surface border border-border rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="relative">
                                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                                    <div className="w-3 h-3 rounded-full bg-emerald-400 absolute inset-0 animate-ping opacity-60" />
                                </div>
                                <span className="text-sm font-medium text-white">Available for Opportunities</span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Open to AI Engineering and SDE internships for 2026, research collaborations, and exciting open-source projects.
                            </p>
                        </motion.div>

                        {/* Contact info links */}
                        <motion.div variants={fadeUp} className="space-y-3">
                            {[
                                { icon: <Mail size={16} />, label: 'Email', value: PORTFOLIO_DATA.email, href: `mailto:${PORTFOLIO_DATA.email}`, color: 'text-accent' },
                                { icon: <Github size={16} />, label: 'GitHub', value: '@Tamizh019', href: PORTFOLIO_DATA.github, color: 'text-slate-300' },
                                { icon: <Linkedin size={16} />, label: 'LinkedIn', value: 'Tamizharasan R', href: `https://${PORTFOLIO_DATA.linkedin}`, color: 'text-blue-400' },
                                { icon: <Globe size={16} />, label: 'Location', value: 'Chennai, Tamil Nadu', href: undefined, color: 'text-violet-400' },
                            ].map((item) => (
                                <motion.div
                                    key={item.label}
                                    variants={fieldReveal}
                                    className="flex items-center gap-4 p-4 bg-surface border border-border rounded-xl hover:border-accent/30 transition-all group"
                                    whileHover={{ x: 4 }}
                                >
                                    <div className={`p-2 rounded-lg bg-primary/60 ${item.color}`}>{item.icon}</div>
                                    <div>
                                        <div className="text-xs text-slate-500 font-mono">{item.label}</div>
                                        {item.href ? (
                                            <a href={item.href} target="_blank" rel="noreferrer"
                                                className="text-sm text-slate-300 group-hover:text-accent transition-colors">
                                                {item.value}
                                            </a>
                                        ) : (
                                            <div className="text-sm text-slate-300">{item.value}</div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Availability tags */}
                        <motion.div variants={fadeUp} className="p-5 bg-surface border border-border rounded-2xl">
                            <div className="text-xs font-mono text-slate-500 mb-3 flex items-center gap-2">
                                <Zap size={10} className="text-accent" /> Looking for
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {['AI Engineering Intern', 'SDE Intern', 'Open Source', 'Research Collab', 'Freelance'].map(tag => (
                                    <span key={tag} className="text-xs bg-accent/10 border border-accent/20 text-accent px-3 py-1.5 rounded-full font-mono">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        className="lg:col-span-3"
                        variants={fadeUp}
                        initial="hidden"
                        animate={inView ? 'show' : 'hidden'}
                    >
                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                /* Success state */
                                <motion.div
                                    key="success"
                                    variants={successAnim}
                                    initial="hidden"
                                    animate="show"
                                    className="bg-surface border border-emerald-500/30 rounded-2xl p-12 text-center"
                                >
                                    <motion.div
                                        className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6"
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <CheckCircle2 size={36} className="text-emerald-400" />
                                    </motion.div>
                                    <h3 className="text-2xl font-display font-bold text-white mb-3">Message Sent! 🎉</h3>
                                    <p className="text-slate-400 mb-8 leading-relaxed">
                                        Thanks for reaching out! I read every message personally and will get back to you within
                                        <span className="text-emerald-400 font-medium"> 24–48 hours</span>.
                                    </p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="text-sm text-accent border border-accent/30 px-6 py-3 rounded-xl hover:bg-accent/10 transition-all font-mono"
                                    >
                                        Send another message →
                                    </button>
                                </motion.div>
                            ) : (
                                /* Form */
                                <motion.form
                                    key="form"
                                    onSubmit={handleSubmit}
                                    className="bg-surface border border-border rounded-2xl p-8 space-y-5"
                                    variants={stagger}
                                    initial="hidden"
                                    animate={inView ? 'show' : 'hidden'}
                                >
                                    <motion.div variants={fieldReveal} className="mb-2">
                                        <h3 className="text-lg font-display font-semibold text-white">Drop me a message</h3>
                                        <p className="text-xs text-slate-500 mt-1">I'll respond within 24–48 hours.</p>
                                    </motion.div>

                                    {/* Intent Selector */}
                                    <IntentSelect value={form.intent} onChange={set('intent')} />

                                    {/* Challenge Textarea */}
                                    <FloatingTextarea
                                        id="challenge"
                                        label="What's the biggest challenge you're trying to solve?"
                                        required
                                        value={form.challenge}
                                        onChange={set('challenge')}
                                        placeholder="Describe the problem or opportunity..."
                                        rows={3}
                                    />

                                    {/* Name + Email row */}
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <FloatingInput id="name" label="Your Name" required value={form.name} onChange={set('name')} placeholder="John Doe" />
                                        <FloatingInput id="email" label="Email Address" type="email" required value={form.email} onChange={set('email')} placeholder="you@example.com" />
                                    </div>

                                    {/* Optional message */}
                                    <FloatingTextarea
                                        id="message"
                                        label="Anything else you'd like to add? (optional)"
                                        value={form.message}
                                        onChange={set('message')}
                                        placeholder="Links, context, or just a hello..."
                                        rows={3}
                                    />

                                    {/* Error message */}
                                    <AnimatePresence>
                                        {(status === 'error' || errorMsg) && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -8 }}
                                                className="flex items-center gap-2 text-red-400 text-xs p-3 bg-red-500/10 border border-red-500/20 rounded-xl"
                                            >
                                                <AlertCircle size={13} />
                                                {errorMsg || 'Something went wrong. Please try again.'}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Submit */}
                                    <motion.div variants={fieldReveal}>
                                        <motion.button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="w-full flex items-center justify-center gap-2.5 bg-accent text-primary font-bold py-4 px-8 rounded-xl text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                                            whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(0,217,255,0.35)' }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {status === 'loading' ? (
                                                <>
                                                    <motion.div
                                                        className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full"
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                                                    />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={15} />
                                                    Send Message
                                                </>
                                            )}
                                        </motion.button>
                                    </motion.div>

                                    <motion.p variants={fieldReveal} className="text-center text-[10px] text-slate-600 font-mono">
                                        Your message is delivered directly to my inbox. No spam ever.
                                    </motion.p>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
