import React, { useState, useEffect, useRef } from 'react';
import {
  Github, Linkedin, Mail, ExternalLink,
  Terminal, Brain, Code2, Database, Layers, Cpu,
  ChevronDown, Download, Zap, ArrowRight
} from 'lucide-react';
import ParticleBackground from './components/ParticleBackground';
import AIChat from './components/AIChat';
import { PORTFOLIO_DATA } from './constants';

/* ─────────────────────────────────────
   Typewriter Hook
───────────────────────────────────── */
function useTypewriter(phrases: string[], speed = 80, pause = 2000) {
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
function useInView(threshold = 0.15) {
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
function SkillIcon({ category }: { category: string }) {
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
const NeuralNodes: React.FC = () => (
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

/* ═══════════════════════════════════════
   MAIN APP
═══════════════════════════════════════ */
const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const typewritten = useTypewriter(
    ['AI Engineer', 'LLM App Developer', 'Full-Stack Builder'],
    75, 2200
  );

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Vision', href: '#vision' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-primary text-slate-200 relative overflow-x-hidden">
      <ParticleBackground />

      {/* ══ NAV ══ */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
        ? 'bg-primary/80 backdrop-blur-xl border-b border-accent/10 py-3'
        : 'bg-transparent py-5'
        }`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="font-mono text-accent text-lg font-bold tracking-widest hover:glow-cyan transition-all">
            TAMIZH<span className="text-slate-500">.</span><span className="text-violet-400">dev</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.name} href={l.href}
                className="text-sm text-slate-400 hover:text-accent transition-colors font-medium tracking-wide relative group">
                {l.name}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
          <a href="/resume.pdf" download
            className="flex items-center gap-2 text-xs font-mono border border-accent/40 text-accent px-3 py-1.5 md:px-4 md:py-2 rounded hover:bg-accent/10 hover:border-accent transition-all">
            <Download size={13} /> <span className="hidden sm:inline">Resume</span>
          </a>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20 neural-grid overflow-hidden">
        <NeuralNodes />
        {/* scan line */}
        <div className="scan-line" />
        {/* glow blobs */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* terminal badge */}
          <div className="inline-flex items-center gap-2 font-mono text-xs text-accent/80 bg-accent/5 border border-accent/20 px-4 py-2 rounded-full mb-8 animate-[fadeInUp_0.6s_ease-out_forwards]">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-[glowPulse_2s_ease-in-out_infinite]" />
            <span className="text-slate-500">$</span> initialising<span className="text-accent">_portfolio</span>... <span className="text-green-400">READY</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-bold tracking-tight mb-4 animate-[fadeInUp_0.7s_ease-out_0.1s_forwards] opacity-0">
            {PORTFOLIO_DATA.name}
          </h1>

          {/* typewriter */}
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

          <div className="flex justify-center gap-4 mb-10 animate-[fadeInUp_0.7s_ease-out_0.4s_forwards] opacity-0">
            <a href="#projects"
              className="flex items-center gap-2 bg-accent text-primary font-bold px-6 py-3 rounded hover:bg-cyan-300 transition-all hover:shadow-[0_0_24px_#00d9ff88] text-sm">
              View Work <ArrowRight size={15} />
            </a>
            <a href="#contact"
              className="flex items-center gap-2 border border-accent/40 text-accent px-6 py-3 rounded hover:bg-accent/10 hover:border-accent transition-all text-sm">
              <Mail size={15} /> Contact
            </a>
          </div>

          {/* social row */}
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

          <a href="#about" className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600 hover:text-accent transition-colors animate-[float_6s_ease-in-out_infinite]">
            <span className="text-xs font-mono tracking-widest">SCROLL</span>
            <ChevronDown size={16} />
          </a>
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section id="about" className="py-28 relative">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading prefix="01" title="About" accent="Me" />

          <div className="grid md:grid-cols-2 gap-16 mt-14 items-center">
            {/* left — bio card */}
            <div className="relative group">
              <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-accent/30 to-violet-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              <div className="relative bg-surface border border-border rounded-xl p-8 card-glow transition-all duration-300">
                <div className="flex items-center gap-2 font-mono text-xs text-accent/60 mb-6">
                  <Terminal size={12} /> <span>tamizharasan.profile</span>
                </div>
                <p className="text-slate-300 leading-relaxed mb-8 text-sm">
                  {PORTFOLIO_DATA.bio}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: '4', label: 'Production Apps', color: 'text-accent' },
                    { val: '8.55', label: 'CGPA at SIST', color: 'text-violet-400' },
                    { val: '2026', label: 'Target: Internship', color: 'text-cyan-400' },
                    { val: 'AI', label: 'Core Focus', color: 'text-emerald-400' },
                  ].map(s => (
                    <div key={s.label} className="bg-primary/60 border border-border rounded-lg p-4">
                      <div className={`text-2xl font-bold font-display ${s.color}`}>{s.val}</div>
                      <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* right — timeline */}
            <div>
              <h3 className="text-xl font-display font-bold text-white mb-8">
                Education &amp; <span className="text-accent">Experience</span>
              </h3>
              <div className="space-y-6">
                {PORTFOLIO_DATA.education.map((edu, i) => (
                  <TimelineItem key={i} color="accent">
                    <div className="text-white font-semibold">{edu.institution}</div>
                    <div className="text-accent text-sm mt-0.5">{edu.degree}</div>
                    <div className="text-slate-500 text-xs mt-1">{edu.year} · {edu.details}</div>
                  </TimelineItem>
                ))}
                {PORTFOLIO_DATA.experience.map((exp, i) => (
                  <TimelineItem key={i} color="violet">
                    <div className="text-white font-semibold">{exp.role}</div>
                    <div className="text-violet-400 text-sm mt-0.5">{exp.company} – {exp.project}</div>
                    <ul className="mt-2 space-y-1">
                      {exp.responsibilities.map((r, j) => (
                        <li key={j} className="text-slate-500 text-xs flex gap-2">
                          <span className="text-accent mt-0.5 flex-shrink-0">›</span> {r}
                        </li>
                      ))}
                    </ul>
                  </TimelineItem>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SKILLS ══ */}
      <section id="skills" className="py-28 bg-secondary/30 relative">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading prefix="02" title="Technical" accent="Arsenal" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
            {PORTFOLIO_DATA.skills.map((cat, i) => (
              <SkillCard key={i} category={cat.category} skills={cat.skills} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROJECTS ══ */}
      <section id="projects" className="py-28 relative">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading prefix="03" title="Featured" accent="Projects" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
            {PORTFOLIO_DATA.projects.map((p, i) => (
              <ProjectCard key={i} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ AI VISION ══ */}
      <section id="vision" className="py-28 bg-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 neural-grid opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <SectionHeading prefix="04" title="AI" accent="Vision" center />
          <div className="mt-14 bg-surface/60 border border-border rounded-xl p-10 backdrop-blur-sm">
            <div className="font-mono text-xs text-accent/60 mb-6 flex items-center justify-center gap-2">
              <Zap size={12} /> philosophy.txt
            </div>
            <blockquote className="text-xl md:text-2xl font-display text-white leading-relaxed mb-6">
              "Making AI talk is easy.
              <br />
              <span className="text-accent">Making it reliable is engineering."</span>
            </blockquote>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xl mx-auto">
              Anyone can ping an API, but building production-ready AI requires control. I specialize in the application layer — controlling hallucinations through grounded RAG pipelines, structuring data, and ensuring LLM outputs are accurate, fast, and seamlessly integrated into user-facing products.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {['RAG Pipelines', 'Prompt Engineering', 'LLM Orchestration', 'AI Product Engineering', 'Computer Vision'].map(t => (
                <span key={t} className="tech-pill">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" className="py-24 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        <div className="max-w-2xl mx-auto px-6 text-center">
          <SectionHeading prefix="05" title="Let's" accent="Connect" center />
          <p className="text-slate-400 mt-6 mb-10 leading-relaxed">
            Open to <span className="text-accent font-medium">AI Engineering</span> and <span className="text-accent font-medium">SDE internships</span> for 2026,
            open-source collaborations, and research discussions.
          </p>

          <a href={`mailto:${PORTFOLIO_DATA.email}`}
            className="inline-flex items-center gap-3 bg-accent text-primary font-bold px-8 py-4 rounded hover:bg-cyan-300 hover:shadow-[0_0_32px_#00d9ff66] transition-all text-sm mb-10">
            <Mail size={16} /> Say Hello
          </a>

          <div className="flex justify-center gap-6 mt-4">
            <SocialLink href={PORTFOLIO_DATA.github} label="GitHub"><Github size={18} /></SocialLink>
            <SocialLink href={`https://${PORTFOLIO_DATA.linkedin}`} label="LinkedIn"><Linkedin size={18} /></SocialLink>
            <SocialLink href={PORTFOLIO_DATA.portfolio} label="Portfolio"><ExternalLink size={18} /></SocialLink>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="py-8 border-t border-border text-center">
        <p className="font-mono text-xs text-slate-600">
          © {new Date().getFullYear()} {PORTFOLIO_DATA.name} &nbsp;·&nbsp; Built with React + TypeScript + Tailwind
        </p>
      </footer>

      <AIChat />
    </div>
  );
};

/* ─────────────────────────────────────
   Sub-components
───────────────────────────────────── */
function SectionHeading({ prefix, title, accent, center = false }: {
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

function TimelineItem({ children, color, ...props }: { children: React.ReactNode; color: 'accent' | 'violet' } & React.ComponentPropsWithoutRef<'div'>) {
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

function SkillCard({ category, skills, ...props }: { category: string; skills: string[] } & React.ComponentPropsWithoutRef<'div'>) {
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

function ProjectCard({ project, index, ...props }: { project: typeof PORTFOLIO_DATA.projects[0]; index: number } & React.ComponentPropsWithoutRef<'div'>) {
  const { ref, inView } = useInView();
  const gradients = [
    'from-cyan-500/20 to-violet-500/20',
    'from-violet-500/20 to-emerald-500/20',
    'from-emerald-500/20 to-cyan-500/20',
    'from-orange-500/20 to-violet-500/20',
  ];

  return (
    <div ref={ref}
      className={`group relative bg-surface border border-border rounded-xl overflow-hidden card-glow transition-all duration-500 flex flex-col ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${project.isFeatured ? 'md:col-span-2' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
      {...props}>

      {/* gradient top bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${gradients[index % gradients.length]}`} />

      {/* featured badge */}
      {project.isFeatured && (
        <div className="absolute top-5 right-5 flex items-center gap-1.5 bg-accent/10 border border-accent/30 text-accent text-[10px] font-mono font-bold px-2.5 py-1 rounded-full">
          <Zap size={9} /> FEATURED
        </div>
      )}

      <div className="p-7 flex flex-col flex-grow">
        {/* title */}
        <h3 className="text-lg font-display font-bold text-white group-hover:text-accent transition-colors mb-2">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm mb-5 leading-relaxed">{project.description}</p>

        {/* features */}
        <ul className="space-y-1.5 mb-6 flex-grow">
          {project.features.map((f, i) => (
            <li key={i} className="flex gap-2 text-xs text-slate-500">
              <span className="text-accent mt-0.5 flex-shrink-0">›</span> {f}
            </li>
          ))}
        </ul>

        {/* tech pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techStack.map((t, i) => (
            <span key={i} className="tech-pill">{t}</span>
          ))}
        </div>

        {/* links */}
        <div className="flex gap-5 mt-auto pt-4 border-t border-border">
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
      </div>
    </div>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label}
      className="p-3 border border-border rounded text-slate-400 hover:text-accent hover:border-accent/40 hover:bg-accent/5 transition-all">
      {children}
    </a>
  );
}

export default App;
