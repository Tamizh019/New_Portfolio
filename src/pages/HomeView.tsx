import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface TermLine {
  cmd: string;
  res: string[];
}

const TERM_SEQUENCE: TermLine[] = [
  {
    cmd: '$ whoami',
    res: ['> tamizharasan — ai engineer · full-stack builder'],
  },
  {
    cmd: '$ cat location.txt',
    res: ['> chennai, india · targeting 2026'],
  },
  {
    cmd: '$ ls ./stack',
    res: ['> python  next.js  langchain  supabase  fastapi  +more'],
  },
  {
    cmd: '$ status --verbose',
    res: [
      '🟢 open to ai engineering roles',
      '> cgpa: 8.7 · apps shipped: 4 · internships: 2',
    ],
  },
];

const CHAR_DELAY = 40; // ms per character

const HomeView: React.FC = () => {
  const navigate = useNavigate();
  const [renderedLines, setRenderedLines] = useState<
    { cmd: string; res: string[]; typing: boolean; typedCmd: string }[]
  >([]);
  const [showButtons, setShowButtons] = useState(false);
  const [done, setDone] = useState(false);
  const sequenceRef = useRef(false);

  useEffect(() => {
    if (sequenceRef.current) return;
    sequenceRef.current = true;

    const runSequence = async () => {
      for (let i = 0; i < TERM_SEQUENCE.length; i++) {
        const { cmd, res } = TERM_SEQUENCE[i];

        // Add line with typing state
        setRenderedLines((prev) => [
          ...prev,
          { cmd, res, typing: true, typedCmd: '' },
        ]);

        // Type characters
        for (let c = 0; c <= cmd.length; c++) {
          await new Promise((r) => setTimeout(r, CHAR_DELAY));
          setRenderedLines((prev) =>
            prev.map((l, idx) =>
              idx === i ? { ...l, typedCmd: cmd.slice(0, c) } : l
            )
          );
        }

        // Show response
        await new Promise((r) => setTimeout(r, 80));
        setRenderedLines((prev) =>
          prev.map((l, idx) =>
            idx === i ? { ...l, typing: false } : l
          )
        );

        // Pause before next line
        const pauses = [300, 400, 500, 600];
        await new Promise((r) => setTimeout(r, pauses[i]));
      }

      setDone(true);

      // Show buttons after 2s
      await new Promise((r) => setTimeout(r, 2000));
      setShowButtons(true);
    };

    runSequence();
  }, []);

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      {/* Terminal box */}
      <div className="terminal-container">
        <div className="terminal-topbar">tamizh@portfolio:~&nbsp;&nbsp;×</div>

        <div>
          {renderedLines.map((line, i) => (
            <div key={i}>
              {/* Command line */}
              <div className="terminal-line">
                <span className="term-cmd">{line.typing ? line.typedCmd : line.cmd}</span>
                {line.typing && <span className="terminal-cursor" />}
              </div>

              {/* Response lines — only shown when not typing */}
              {!line.typing &&
                line.res.map((r, ri) => (
                  <div key={ri} className="terminal-line">
                    {r.startsWith('>') ? (
                      <>
                        <span className="term-cmd">{'>'}</span>
                        <span className="term-val">{r.slice(1)}</span>
                      </>
                    ) : (
                      <span className="term-res">{r}</span>
                    )}
                  </div>
                ))}
            </div>
          ))}

          {/* Final blinking cursor */}
          {done && (
            <div className="terminal-line">
              <span className="term-cmd">$ </span>
              <span className="terminal-cursor" />
            </div>
          )}
        </div>
      </div>

      {/* Buttons — fade in after delay */}
      <motion.div
        className="terminal-buttons"
        initial={{ opacity: 0 }}
        animate={{ opacity: showButtons ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <button className="btn-work" onClick={() => navigate('/work')}>
          View Work →
        </button>
        <a
          className="btn-resume"
          href="/resume.pdf"
          download
        >
          Download Resume ↓
        </a>
      </motion.div>
    </div>
  );
};

export default HomeView;
