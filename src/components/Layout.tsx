import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Download, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import ParticleBackground from '../../components/ParticleBackground';
import AIChat from '../../components/AIChat';
import { getLocalPortfolioData } from '../services/portfolio';
import { NeuralNodes } from './Shared';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
];

const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2, ease: 'easeIn' as const } },
};

const mobileLinkVariants = {
    hidden: { opacity: 0, x: -16 },
    visible: (i: number) => ({ opacity: 1, x: 0, transition: { delay: i * 0.05, duration: 0.3 } }),
};

export default function Layout() {
    const PORTFOLIO_DATA = getLocalPortfolioData();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', fn);
        return () => window.removeEventListener('scroll', fn);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    return (
        <ReactLenis root>
            <div className="min-h-screen bg-transparent text-slate-200 relative">
                {/* ══ FIXED BACKGROUND LAYER ══ */}
                <div className="fixed inset-0 w-full h-full z-[-1] pointer-events-none">
                    <div className="absolute inset-0 bg-primary" />
                    {/* Particles and neural grids deactivated for clean, minimalist organic editorial look */}
                    {/* <ParticleBackground /> */}
                    {/* <div className="absolute inset-0 neural-grid opacity-30" /> */}
                    {/* <NeuralNodes /> */}
                    {/* <div className="scan-line" /> */}

                    {/* Ambient organic light halos */}
                    <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-accent/3 rounded-full blur-[150px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent2/3 rounded-full blur-[130px]" />
                </div>

                {/* ══ NAV ══ */}
                <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                    ? 'bg-primary/80 backdrop-blur-xl border-b border-accent/10 py-3'
                    : 'bg-transparent py-5'
                    }`}>
                    <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
                        <NavLink to="/" className="font-display text-accent text-2xl font-bold tracking-wide hover:opacity-90 transition-all">
                            Tamizh<span className="text-slate-500 font-sans">.</span><span className="text-accent2 italic font-medium">dev</span>
                        </NavLink>

                        {/* Desktop nav links */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((l) => (
                                <NavLink
                                    key={l.name}
                                    to={l.path}
                                    className={({ isActive }) =>
                                        `text-sm transition-colors font-medium tracking-wide relative group ${isActive ? 'text-accent' : 'text-slate-400 hover:text-accent'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {l.name}
                                            <span className={`absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                                                }`} />
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            <a href="/resume.pdf" download
                                className="flex items-center gap-2 text-xs font-mono border border-accent/40 text-accent px-3 py-1.5 md:px-4 md:py-2 rounded hover:bg-accent/10 hover:border-accent transition-all">
                                <Download size={13} /> <span className="hidden sm:inline">Resume</span>
                            </a>

                            {/* Mobile hamburger button */}
                            <button
                                onClick={() => setMobileOpen(o => !o)}
                                className="md:hidden p-2 rounded-lg border border-border text-slate-400 hover:text-accent hover:border-accent/40 transition-all"
                                aria-label="Toggle navigation menu"
                            >
                                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* ── Mobile Menu Panel ── */}
                    <AnimatePresence>
                        {mobileOpen && (
                            <motion.div
                                variants={mobileMenuVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="md:hidden overflow-hidden bg-primary/95 backdrop-blur-xl border-t border-accent/10"
                            >
                                <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col gap-1">
                                    {navLinks.map((l, i) => (
                                        <motion.div key={l.name} custom={i} variants={mobileLinkVariants} initial="hidden" animate="visible">
                                            <NavLink
                                                to={l.path}
                                                className={({ isActive }) =>
                                                    `block py-3 px-4 rounded-lg text-sm font-medium tracking-wide transition-all ${isActive
                                                        ? 'text-accent bg-accent/10 border border-accent/20'
                                                        : 'text-slate-400 hover:text-accent hover:bg-accent/5'
                                                    }`
                                                }
                                            >
                                                {l.name}
                                            </NavLink>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </nav>

                {/* ══ CONTENT ══ */}
                <div className="pt-20 min-h-screen flex flex-col">
                    <AnimatePresence mode="sync">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="flex-grow flex flex-col"
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* ══ FOOTER ══ */}
                <footer className="py-8 border-t border-border text-center relative z-10">
                    <p className="font-mono text-xs text-slate-600">
                        © {new Date().getFullYear()} {PORTFOLIO_DATA.name}
                    </p>
                </footer>

                <AIChat />
            </div>
        </ReactLenis>
    );
}
