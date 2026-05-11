import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

/* ── Custom SVG Nav Icons (no icon library) ── */
const IconHome = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="2,10 9,3 16,10" />
    <rect x="5" y="10" width="8" height="6" rx="0.5" />
  </svg>
);

const IconWork = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <line x1="3" y1="5" x2="15" y2="5" />
    <line x1="3" y1="9" x2="12" y2="9" />
    <line x1="3" y1="13" x2="9" y2="13" />
  </svg>
);

const IconStack = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="9" cy="4" r="2" />
    <circle cx="4" cy="14" r="2" />
    <circle cx="14" cy="14" r="2" />
    <line x1="9" y1="6" x2="4" y2="12" />
    <line x1="9" y1="6" x2="14" y2="12" />
  </svg>
);

const IconConnect = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="13" x2="13" y2="5" />
    <polyline points="7,5 13,5 13,11" />
  </svg>
);

const NAV_ITEMS = [
  { path: '/', icon: <IconHome />, label: 'home' },
  { path: '/work', icon: <IconWork />, label: 'work' },
  { path: '/stack', icon: <IconStack />, label: 'stack' },
  { path: '/connect', icon: <IconConnect />, label: 'connect' },
];

const VIEW_TRANSITIONS = {
  initial: { opacity: 0, x: -8 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, x: -8, transition: { duration: 0.15 } },
};

interface ShellProps {
  children: React.ReactNode;
}

const Shell: React.FC<ShellProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [clock, setClock] = useState('');

  // Live clock — Chennai IST
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const opts: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };
      setClock(new Intl.DateTimeFormat('en-IN', opts).format(now).toUpperCase());
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const currentView = location.pathname === '/' ? 'home' : location.pathname.replace('/', '');
  const isWork = location.pathname === '/work';

  return (
    <div className="app-shell">
      {/* ── SIDEBAR ── */}
      <aside className="sidebar">
        <div className="sidebar-logo">T.R</div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
              title={item.label}
              style={{ border: 'none', background: 'transparent', outline: 'none' }}
            >
              {item.icon}
            </button>
          ))}
        </nav>

        <div className="sidebar-avatar">TR</div>
      </aside>

      {/* ── MAIN PANEL ── */}
      <div className="main-panel">
        {/* Status Bar */}
        <header className="status-bar">
          <span className="status-breadcrumb">
            <span className="site-name">TAMIZH.dev</span>
            {' / '}{currentView}
          </span>

          <div className="status-pill">
            <span className="status-dot" />
            Open to AI Roles
          </div>

          <span className="status-clock">Chennai · {clock} IST</span>
        </header>

        {/* Content */}
        <div className={`content-area ${isWork ? 'scrollable' : ''}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              {...VIEW_TRANSITIONS}
              style={{ height: '100%' }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Version tag */}
      <div className="version-tag">v2.1 · updated May 2026</div>
    </div>
  );
};

export default Shell;
