import React, { useState } from 'react';
import { motion } from 'framer-motion';

/* ── Graph data ── */
const CENTER = { id: 'Python', label: 'Python', category: 'core', orbit: 0 };

const FIRST_ORBIT = [
  { id: 'FastAPI', label: 'FastAPI', category: 'Backend Framework', orbit: 1 },
  { id: 'LangChain', label: 'LangChain', category: 'AI Orchestration', orbit: 1 },
  { id: 'Next.js', label: 'Next.js', category: 'Frontend Framework', orbit: 1 },
  { id: 'React', label: 'React', category: 'UI Library', orbit: 1 },
  { id: 'Supabase', label: 'Supabase', category: 'Backend as a Service', orbit: 1 },
  { id: 'PostgreSQL', label: 'PostgreSQL', category: 'Relational Database', orbit: 1 },
];

const SECOND_ORBIT = [
  { id: 'pgvector', label: 'pgvector', category: 'Vector Extension', orbit: 2 },
  { id: 'Gemini API', label: 'Gemini', category: 'LLM Provider', orbit: 2 },
  { id: 'WebSockets', label: 'WS', category: 'Real-time Protocol', orbit: 2 },
  { id: 'TypeScript', label: 'TS', category: 'Typed JavaScript', orbit: 2 },
  { id: 'Docker', label: 'Docker', category: 'Containerisation', orbit: 2 },
  { id: 'Redis', label: 'Redis', category: 'In-memory Cache', orbit: 2 },
  { id: 'LlamaIndex', label: 'Llama', category: 'RAG Framework', orbit: 2 },
  { id: 'TensorFlow', label: 'TF', category: 'ML Framework', orbit: 2 },
];

const CONNECTIONS: [string, string][] = [
  ['Python', 'FastAPI'],
  ['Python', 'LangChain'],
  ['Python', 'TensorFlow'],
  ['LangChain', 'pgvector'],
  ['LangChain', 'LlamaIndex'],
  ['LangChain', 'Gemini API'],
  ['Next.js', 'React'],
  ['Next.js', 'Supabase'],
  ['Supabase', 'PostgreSQL'],
  ['Supabase', 'WebSockets'],
  ['FastAPI', 'Docker'],
  ['FastAPI', 'Redis'],
];

/* ── Compute positions ── */
const cx = 50; // SVG center x (percentage)
const cy = 50; // SVG center y (percentage)
const R1 = 18; // first orbit radius (%)
const R2 = 33; // second orbit radius (%)

function polarToXY(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
}

const nodePositions: Record<string, { x: number; y: number; orbit: number }> = {
  Python: { x: cx, y: cy, orbit: 0 },
};

FIRST_ORBIT.forEach((n, i) => {
  const angle = (360 / FIRST_ORBIT.length) * i - 90;
  const pos = polarToXY(angle, R1);
  nodePositions[n.id] = { ...pos, orbit: 1 };
});

SECOND_ORBIT.forEach((n, i) => {
  const angle = (360 / SECOND_ORBIT.length) * i - 60;
  const pos = polarToXY(angle, R2);
  nodePositions[n.id] = { ...pos, orbit: 2 };
});

const ALL_NODES = [CENTER, ...FIRST_ORBIT, ...SECOND_ORBIT];

/* ── Component ── */
const StackView: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  const connectedTo = (nodeId: string): Set<string> => {
    const s = new Set<string>();
    CONNECTIONS.forEach(([a, b]) => {
      if (a === nodeId) s.add(b);
      if (b === nodeId) s.add(a);
    });
    return s;
  };

  const connected = hovered ? connectedTo(hovered) : null;

  const nodeOpacity = (id: string) => {
    if (!hovered) return 1;
    if (id === hovered) return 1;
    if (connected?.has(id)) return 1;
    return 0.25;
  };

  const lineOpacity = (a: string, b: string) => {
    if (!hovered) return 1;
    if ((a === hovered && connected?.has(b)) || (b === hovered && connected?.has(a))) return 1;
    return 0.08;
  };

  const lineStroke = (a: string, b: string) => {
    if (!hovered) return 'rgba(255,255,255,0.08)';
    if ((a === hovered && connected?.has(b)) || (b === hovered && connected?.has(a))) return '#22d3ee';
    return 'rgba(255,255,255,0.04)';
  };

  const getLabel = (id: string) => {
    const n = ALL_NODES.find((n) => n.id === id);
    return n?.category ?? '';
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '28px 32px 0' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 16 }}>
        <div className="stack-header">Technical Stack</div>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>
          hover a node
        </span>
      </div>

      {/* Graph fills remaining space */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          style={{ position: 'absolute', inset: 0 }}
        >
          {/* Category labels */}
          <text x="50" y="38" textAnchor="middle" fill="rgba(255,255,255,0.12)" fontSize="2" fontFamily="DM Mono, monospace" letterSpacing="0.5">CORE</text>
          <text x="50" y="27" textAnchor="middle" fill="rgba(255,255,255,0.10)" fontSize="1.8" fontFamily="DM Mono, monospace" letterSpacing="0.5">FRAMEWORKS</text>
          <text x="50" y="14" textAnchor="middle" fill="rgba(255,255,255,0.08)" fontSize="1.6" fontFamily="DM Mono, monospace" letterSpacing="0.5">TOOLS & APIS</text>

          {/* Connection lines */}
          {CONNECTIONS.map(([a, b], i) => {
            const pa = nodePositions[a];
            const pb = nodePositions[b];
            if (!pa || !pb) return null;
            return (
              <motion.line
                key={i}
                x1={pa.x} y1={pa.y}
                x2={pb.x} y2={pb.y}
                stroke={lineStroke(a, b)}
                strokeWidth="0.3"
                animate={{
                  opacity: lineOpacity(a, b),
                  stroke: lineStroke(a, b),
                }}
                transition={{ duration: 0.2 }}
              />
            );
          })}

          {/* Nodes */}
          {ALL_NODES.map((node, i) => {
            const pos = nodePositions[node.id];
            if (!pos) return null;
            const isCenter = node.orbit === 0;
            const isFirst = node.orbit === 1;
            const size = isCenter ? 4.5 : isFirst ? 3.5 : 2.8;
            const delay = isCenter ? 0 : isFirst ? 0.3 : 0.6;
            const isHovered = hovered === node.id;
            const isConnected = connected?.has(node.id);

            return (
              <motion.g
                key={node.id}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: nodeOpacity(node.id), scale: 1 }}
                transition={{ delay, duration: 0.3 }}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Glow ring on hover */}
                {(isHovered || isConnected) && (
                  <circle
                    cx={pos.x} cy={pos.y}
                    r={size + 1.2}
                    fill="none"
                    stroke="rgba(34,211,238,0.15)"
                    strokeWidth="0.8"
                  />
                )}

                {/* Node circle */}
                <circle
                  cx={pos.x} cy={pos.y}
                  r={size}
                  fill={isCenter ? 'rgba(34,211,238,0.1)' : isFirst ? 'rgba(13,20,36,0.8)' : 'rgba(13,20,36,0.6)'}
                  stroke={
                    isHovered ? '#22d3ee'
                      : isConnected ? 'rgba(34,211,238,0.5)'
                        : isCenter ? 'rgba(34,211,238,0.4)'
                          : isFirst ? 'rgba(255,255,255,0.15)'
                            : 'rgba(255,255,255,0.08)'
                  }
                  strokeWidth="0.3"
                />

                {/* Label */}
                <text
                  x={pos.x} y={pos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={isCenter ? '#22d3ee' : isFirst ? '#f1f5f9' : '#64748b'}
                  fontSize={isCenter ? '2.2' : isFirst ? '1.9' : '1.5'}
                  fontFamily={isCenter ? 'Syne, sans-serif' : isFirst ? 'DM Sans, sans-serif' : 'DM Mono, monospace'}
                  fontWeight={isCenter ? '700' : '400'}
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {node.label}
                </text>

                {/* Tooltip */}
                {isHovered && (
                  <foreignObject
                    x={pos.x - 24}
                    y={pos.y - size - 8}
                    width="48"
                    height="10"
                    style={{ overflow: 'visible' }}
                  >
                    <div
                      style={{
                        background: 'rgba(13,20,36,0.95)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '4px',
                        padding: '3px 7px',
                        fontFamily: 'DM Mono, monospace',
                        fontSize: '7px',
                        color: '#f1f5f9',
                        whiteSpace: 'nowrap',
                        transform: 'translateY(-100%)',
                        marginTop: '-4px',
                      }}
                    >
                      {node.id} · {getLabel(node.id)}
                    </div>
                  </foreignObject>
                )}
              </motion.g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default StackView;
