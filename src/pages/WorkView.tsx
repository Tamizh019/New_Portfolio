import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../constants';

/* Complexity ring SVG component */
const ComplexityRing: React.FC<{ stackCount: number }> = ({ stackCount }) => {
  const pct = Math.min((stackCount / 8) * 100, 100);
  const r = 11;
  const circumference = 2 * Math.PI * r;
  const dash = (pct / 100) * circumference;

  return (
    <svg width="28" height="28" viewBox="0 0 28 28" className="complexity-ring">
      {/* Track */}
      <circle
        cx="14" cy="14" r={r}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="2"
      />
      {/* Fill */}
      <motion.circle
        cx="14" cy="14" r={r}
        fill="none"
        stroke="#22d3ee"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circumference}`}
        strokeDashoffset={0}
        transform="rotate(-90 14 14)"
        initial={{ strokeDasharray: `0 ${circumference}` }}
        animate={{ strokeDasharray: `${dash} ${circumference}` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
    </svg>
  );
};

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 6 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.25, ease: 'easeOut' },
  }),
};

const WorkView: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const featured = PORTFOLIO_DATA.projects.filter((p) => p.isFeatured);
  const rest = PORTFOLIO_DATA.projects.filter((p) => !p.isFeatured);

  // Placeholder private projects
  const placeholders = [
    { title: '[redacted]', description: 'details private', techStack: ['–'] },
  ];

  const gridProjects = [...rest, ...placeholders];

  return (
    <div
      style={{
        padding: '32px 32px 48px',
        maxWidth: '900px',
        margin: '0 auto',
      }}
    >
      <div className="work-header">Featured Projects</div>

      {/* Featured cards — expandable */}
      {featured.map((proj, i) => {
        const isOpen = expandedId === proj.title;
        return (
          <motion.div
            key={proj.title}
            className="project-card-featured"
            custom={i}
            variants={CARD_VARIANTS}
            initial="hidden"
            animate="visible"
          >
            {/* Collapsed header — always visible */}
            <div
              className="project-card-collapsed"
              onClick={() => setExpandedId(isOpen ? null : proj.title)}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <div className="project-name" style={{ padding: 0, margin: 0 }}>{proj.title}</div>
                  <div className="featured-chip">FEATURED</div>
                </div>
                <div className="project-desc" style={{ marginBottom: 8 }}>
                  {proj.description}
                </div>
                <div className="stack-pills">
                  {proj.techStack.slice(0, 4).map((t) => (
                    <span key={t} className="stack-pill">{t}</span>
                  ))}
                  {proj.techStack.length > 4 && (
                    <span className="stack-pill">+{proj.techStack.length - 4}</span>
                  )}
                </div>
              </div>

              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.15 }}
                style={{
                  color: 'rgba(255,255,255,0.3)',
                  fontSize: 16,
                  flexShrink: 0,
                  fontFamily: 'DM Mono, monospace',
                }}
              >
                ›
              </motion.div>
            </div>

            {/* Expanded content */}
            <motion.div
              initial={false}
              animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div className="project-card-expanded">
                {proj.features && (
                  <ul className="project-bullets">
                    {proj.features.map((f, fi) => (
                      <li key={fi}>{f}</li>
                    ))}
                  </ul>
                )}
                <div className="project-links">
                  {proj.links?.github && (
                    <a href={proj.links.github} target="_blank" rel="noreferrer" className="project-link">
                      GitHub →
                    </a>
                  )}
                  {proj.links?.demo && (
                    <a href={proj.links.demo} target="_blank" rel="noreferrer" className="project-link">
                      Live ↗
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Two-column grid */}
      <div className="project-grid">
        {gridProjects.map((proj, i) => {
          const isPlaceholder = proj.title === '[redacted]';
          return (
            <motion.div
              key={proj.title + i}
              className="project-card"
              custom={featured.length + i}
              variants={CARD_VARIANTS}
              initial="hidden"
              animate="visible"
              style={isPlaceholder ? { opacity: 0.4, cursor: 'default' } : {}}
            >
              {/* Complexity ring */}
              {!isPlaceholder && (
                <div className="complexity-ring" style={{ position: 'absolute', top: 14, right: 14 }}>
                  <ComplexityRing stackCount={proj.techStack.length} />
                </div>
              )}

              <div className="project-name">{proj.title}</div>
              <div className="project-desc">{proj.description}</div>

              <div className="stack-pills">
                {proj.techStack.slice(0, 3).map((t) => (
                  <span key={t} className="stack-pill">{t}</span>
                ))}
                {proj.techStack.length > 3 && (
                  <span className="stack-pill">+{proj.techStack.length - 3}</span>
                )}
              </div>

              {'links' in proj && proj.links?.github && (
                <div className="project-links" style={{ marginTop: 12 }}>
                  <a href={proj.links.github} target="_blank" rel="noreferrer" className="project-link">
                    GitHub →
                  </a>
                  {'demo' in proj.links && proj.links.demo && (
                    <a href={proj.links.demo} target="_blank" rel="noreferrer" className="project-link">
                      Live ↗
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkView;
