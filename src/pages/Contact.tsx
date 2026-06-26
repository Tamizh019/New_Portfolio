import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Send, CheckCircle2, AlertCircle, ChevronDown, Zap, Globe, Cpu, Rocket, Briefcase, Lightbulb, UserCircle2, Terminal } from 'lucide-react';
import { getLocalPortfolioData } from '../services/portfolio';

/* ─── Animation variants ─── */
const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const fieldReveal = {
    hidden: { opacity: 0, x: -16 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};
const successAnim = {
    hidden: { scale: 0.95, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 18 } },
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
            animate={{ y: [0, -16, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
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
                    : 'top-1/2 -translate-y-1/2 text-xs text-slate-500'
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
                className={`w-full bg-surface border rounded-xl pt-6 pb-3 px-4 text-xs sm:text-sm text-white placeholder:text-slate-650 transition-all duration-300 outline-none
                    ${focused
                        ? 'border-accent/60 shadow-[0_0_20px_rgba(176,194,178,0.06)]'
                        : 'border-border hover:border-slate-700'
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
                    : 'top-4 text-xs text-slate-500'
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
                className={`w-full bg-surface border rounded-xl pt-7 pb-3 px-4 text-xs sm:text-sm text-white placeholder:text-slate-650 transition-all duration-300 outline-none resize-none
                    ${focused
                        ? 'border-accent/60 shadow-[0_0_20px_rgba(176,194,178,0.06)]'
                        : 'border-border hover:border-slate-700'
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
                className={`w-full bg-surface border rounded-xl px-4 py-4 text-left flex items-center justify-between transition-all duration-300 cursor-pointer
                    ${open ? 'border-accent/60 shadow-[0_0_20px_rgba(176,194,178,0.06)]' : 'border-border hover:border-slate-700'}`}
            >
                {selected ? (
                    <span className="flex items-center gap-3 text-xs sm:text-sm text-white font-mono">
                        {selected.icon}
                        {selected.label}
                    </span>
                ) : (
                    <span className="text-xs sm:text-sm text-slate-500 font-mono">What brings us together?<span className="text-accent ml-0.5">*</span></span>
                )}
                <ChevronDown size={16} className={`text-slate-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-[#12121c] border border-border rounded-xl overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.5)] z-50"
                    >
                        {INTENTS.map(intent => (
                            <button
                                key={intent.value}
                                type="button"
                                onClick={() => { onChange(intent.value); setOpen(false); }}
                                className={`w-full px-4 py-3 text-left hover:bg-accent/5 transition-colors flex items-start gap-3 border-b border-border/40 last:border-0 cursor-pointer
                                    ${value === intent.value ? 'bg-accent/10' : ''}`}
                            >
                                <div className="mt-0.5 flex-shrink-0">
                                    {intent.icon}
                                </div>
                                <div className="flex-grow">
                                    <div className="text-xs sm:text-sm text-white font-medium font-mono">{intent.label}</div>
                                    <div className="text-[10px] text-slate-500 mt-0.5">{intent.desc}</div>
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
    const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

    const set = (key: string) => (v: string) => setForm(f => ({ ...f, [key]: v }));

    const selectedIntentLabel = INTENTS.find(i => i.value === form.intent)?.label ?? '';

    const getSQLCommand = () => {
        const selectedIntentValue = form.intent || 'general';
        const challengeText = form.challenge ? `'${form.challenge.slice(0, 25).replace(/'/g, "''")}...'` : 'NULL';
        const nameText = form.name ? `'${form.name.replace(/'/g, "''")}'` : 'NULL';
        const emailText = form.email ? `'${form.email.replace(/'/g, "''")}'` : 'NULL';
        
        return `INSERT INTO public.portfolio_messages (
  name, email, intent, challenge, embedding_1536
) VALUES (
  ${nameText}, 
  ${emailText}, 
  '${selectedIntentValue}', 
  ${challengeText},
  ARRAY[0.0125, -0.0432, 0.0891, ... (1536d)]
);`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.intent) { setErrorMsg('Please select what brings you here!'); return; }
        setStatus('loading');
        setErrorMsg('');
        
        setTerminalLogs([
            `> Initiating transaction handshake...`,
            `> Encoding local parameters to message_payload.json...`
        ]);

        const addLog = (log: string, delay: number) => {
            return new Promise<void>(resolve => {
                setTimeout(() => {
                    setTerminalLogs(prev => [...prev, log]);
                    resolve();
                }, delay);
            });
        };

        const intentLabel = INTENTS.find(i => i.value === form.intent)?.label ?? form.intent;

        try {
            // Initiate actual message delivery
            const fetchPromise = fetch('https://api.web3forms.com/submit', {
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

            await addLog(`> Activating Gemini text-embedding-004 model...`, 350);
            await addLog(`> Dimensions returned: 1536 float arrays.`, 400);
            await addLog(`> Compiling SQL INSERT command with pgvector fields...`, 300);
            await addLog(`> Executing PostgreSQL transaction pipeline...`, 350);

            const res = await fetchPromise;
            const data = await res.json();
            
            if (data.success) {
                await addLog(`> Success: 1 row modified. Message committed to inbox.`, 200);
                await addLog(`> HTTP response: STATUS 201 CREATED (Web3Forms API Hook OK)`, 200);
                
                setTimeout(() => {
                    setStatus('success');
                    setForm({ name: '', email: '', intent: '', challenge: '', message: '' });
                    setTerminalLogs([]);
                }, 900);
            } else {
                throw new Error(data.message ?? 'Something went wrong');
            }
        } catch (err: unknown) {
            setStatus('error');
            setErrorMsg(err instanceof Error ? err.message : 'Submission failed. Please try again.');
            setTerminalLogs(prev => [...prev, `> Error: DB query aborted. reason: ${err instanceof Error ? err.message : 'Timeout'}`]);
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
                    <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-light">
                        Whether it's an AI application, open-source pipeline, or a full-stack project —
                        <span className="text-accent font-medium"> I'd love to collaborate.</span>
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Input Form (Spans 7 columns) */}
                    <div className="lg:col-span-7">
                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div
                                    key="success"
                                    variants={successAnim}
                                    initial="hidden"
                                    animate="show"
                                    className="bg-surface border border-emerald-500/30 rounded-3xl p-12 text-center"
                                >
                                    <motion.div
                                        className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6"
                                        animate={{ scale: [1, 1.08, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <CheckCircle2 size={28} className="text-emerald-400" />
                                    </motion.div>
                                    <h3 className="text-xl font-display font-bold text-white mb-3">Message Received! 🎉</h3>
                                    <p className="text-xs sm:text-sm text-slate-400 mb-8 leading-relaxed max-w-sm mx-auto font-light">
                                        Thanks for reaching out! I read every message personally and will reply back within
                                        <span className="text-emerald-400 font-medium"> 24–48 hours</span>.
                                    </p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="text-[10px] text-accent border border-accent/30 px-5 py-2.5 rounded-xl hover:bg-accent/10 transition-all font-mono cursor-pointer"
                                    >
                                        Deploy another message →
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    onSubmit={handleSubmit}
                                    className="bg-surface border border-border rounded-3xl p-6 sm:p-8 space-y-5"
                                    variants={stagger}
                                    initial="hidden"
                                    animate={inView ? 'show' : 'hidden'}
                                >
                                    <motion.div variants={fieldReveal} className="mb-1">
                                        <h3 className="text-base sm:text-lg font-display font-semibold text-white">Ingest New Message</h3>
                                        <p className="text-[10px] text-slate-500 mt-0.5 font-mono">Fill out the variables below to compile data.</p>
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
                                        placeholder="Describe the problem or project scope..."
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
                                        placeholder="Links, details, or say hello..."
                                        rows={2}
                                    />

                                    {/* Error message */}
                                    <AnimatePresence>
                                        {(status === 'error' || errorMsg) && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -6 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -6 }}
                                                className="flex items-center gap-2 text-red-400 text-xs p-3 bg-red-500/10 border border-red-500/20 rounded-xl font-mono"
                                            >
                                                <AlertCircle size={13} />
                                                {errorMsg || 'Submission failed. Please try again.'}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Submit */}
                                    <motion.div variants={fieldReveal}>
                                        <motion.button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="w-full flex items-center justify-center gap-2.5 bg-accent text-[#0a0a0f] font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                                            whileHover={{ scale: 1.01, boxShadow: '0 0 30px rgba(176,194,178,0.15)' }}
                                            whileTap={{ scale: 0.99 }}
                                        >
                                            {status === 'loading' ? (
                                                <>
                                                    <motion.div
                                                        className="w-3.5 h-3.5 border-2 border-primary/30 border-t-primary rounded-full"
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                                                    />
                                                    COMPILING...
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={14} />
                                                    COMMIT MESSAGE
                                                </>
                                            )}
                                        </motion.button>
                                    </motion.div>

                                    <motion.p variants={fieldReveal} className="text-center text-[9px] text-slate-600 font-mono">
                                        Row will be pushed to PostgreSQL DB & forwarded to developer mailbox.
                                    </motion.p>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Column: Live Data Payload Visualizer (Spans 5 columns) */}
                    <div className="lg:col-span-5 space-y-4">
                        {/* Live JSON Payload Compiler */}
                        <div className="bg-[#050508] border border-border/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
                            {/* File header */}
                            <div className="bg-primary/95 px-4 py-3 border-b border-border/45 flex items-center justify-between select-none">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                                </div>
                                <span className="text-[9px] font-mono text-slate-500 lowercase">message_payload.json</span>
                                <div className="w-8" />
                            </div>

                            {/* JSON Content */}
                            <pre className="p-4 text-[10px] sm:text-[11px] font-mono leading-relaxed select-text overflow-x-auto text-slate-350">
                                <code>
                                    {`{`}
                                    <br />
                                    <span className="text-accent2">  "sender_name"</span>: <span className="text-[#3ECF8E]">"{form.name || 'Your Name'}"</span>,
                                    <br />
                                    <span className="text-accent2">  "sender_email"</span>: <span className="text-[#3ECF8E]">"{form.email || 'your@email.com'}"</span>,
                                    <br />
                                    <span className="text-accent2">  "inbox_routing"</span>: <span className="text-[#3ECF8E]">"{selectedIntentLabel || 'Not Selected'}"</span>,
                                    <br />
                                    <span className="text-accent2">  "challenges_to_solve"</span>: <span className="text-[#3ECF8E]">"{form.challenge.replace(/"/g, '\\"').slice(0, 40) || 'Briefly describe your challenge...'}{form.challenge.length > 40 ? '...' : ''}"</span>,
                                    <br />
                                    <span className="text-accent2">  "message_context"</span>: <span className="text-[#3ECF8E]">"{form.message.replace(/"/g, '\\"').slice(0, 30) || 'Add optional context...'}{form.message.length > 30 ? '...' : ''}"</span>,
                                    <br />
                                    <span className="text-accent2">  "embedding_status"</span>: <span className="text-accent3">"{status === 'loading' ? 'vectorizing...' : status === 'success' ? 'completed (1536d)' : 'pending'}"</span>
                                    <br />
                                    {`}`}
                                </code>
                            </pre>
                        </div>

                        {/* SQL Compiler / Terminal Logger */}
                        <div className="bg-[#020204] border border-border/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col min-h-[220px]">
                            {/* Console header */}
                            <div className="bg-primary/80 px-4 py-3 border-b border-border/40 flex items-center justify-between select-none">
                                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                                    <Terminal size={10} className="text-accent" /> DB Compiler Terminal
                                </span>
                                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            </div>

                            {/* Console Log Screen */}
                            <div className="p-4 flex-grow font-mono text-[10px] sm:text-[11px] leading-relaxed text-slate-400 overflow-y-auto max-h-[170px] select-text">
                                {status === 'loading' || terminalLogs.length > 0 ? (
                                    <div className="space-y-1 font-mono text-[10px] leading-normal">
                                        {terminalLogs.map((log, i) => (
                                            <div key={i} className={log.startsWith('> Success') || log.includes('201') ? 'text-[#3ECF8E]' : log.startsWith('> Error') ? 'text-red-400' : 'text-slate-500'}>
                                                {log}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-slate-600 italic select-none">
                                        {`-- SQL command preview ready.`}
                                        <pre className="text-slate-655 text-[9px] mt-2 leading-relaxed whitespace-pre-wrap font-mono">
                                            {getSQLCommand()}
                                        </pre>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Direct contact backups */}
                        <div className="bg-surface/50 border border-border/40 rounded-3xl p-5 flex justify-around gap-4 text-xs font-mono select-none">
                            <a href={`mailto:${PORTFOLIO_DATA.email}`} className="text-slate-500 hover:text-accent flex items-center gap-1.5 transition-colors">
                                <Mail size={12} /> {PORTFOLIO_DATA.email}
                            </a>
                            <a href={`https://${PORTFOLIO_DATA.linkedin}`} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-blue-400 flex items-center gap-1.5 transition-colors">
                                <Linkedin size={12} /> LinkedIn
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
