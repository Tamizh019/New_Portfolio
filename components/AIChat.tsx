import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Bot, User, Trash2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useLocation } from 'react-router-dom';
import { streamMessageToGemini, resetChatInstance } from '../services/geminiService';
import { ChatMessage } from '../types';

// ── Suggested starter prompts ───────────────────────────────────────────────
const SUGGESTED_PROMPTS = [
  "What's Tamizh's best project?",
  "What's his AI/ML tech stack?",
  "Is he available to hire?",
  "Tell me about Chill Space",
];

// ── Page label from route ───────────────────────────────────────────────────
function getPageLabel(pathname: string): string {
  const map: Record<string, string> = {
    '/': 'Home Page',
    '/about': 'About Me Page',
    '/skills': 'Technical Skills Page',
    '/projects': 'Projects Page',
    '/contact': 'Contact Page',
  };
  if (pathname.startsWith('/projects/')) return `Project Detail: ${pathname.replace('/projects/', '').replace(/-/g, ' ')}`;
  return map[pathname] ?? 'Portfolio';
}

// ── Animated thinking dots ──────────────────────────────────────────────────
function ThinkingDots() {
  return (
    <div className="flex gap-1 items-center px-1 py-0.5">
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-accent/60"
          animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// ── Pulsing bot avatar (visible when thinking) ──────────────────────────────
function BotAvatar({ thinking = false }: { thinking?: boolean }) {
  return (
    <div className="relative w-8 h-8 flex-shrink-0">
      <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
        <Bot size={14} className="text-accent" />
      </div>
      {thinking && (
        <motion.div
          className="absolute inset-0 rounded-full border border-accent/40"
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </div>
  );
}

// ── Storage helpers ─────────────────────────────────────────────────────────
const STORAGE_KEY = 'tamizhAI_history';

function loadHistory(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ChatMessage[];
  } catch { return []; }
}

function saveHistory(msgs: ChatMessage[]) {
  try {
    // Only persist non-streaming messages (complete ones)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs.slice(-40)));
  } catch { /* quota issue — silently ignore */ }
}

// ── Main Component ──────────────────────────────────────────────────────────
const GREETING: ChatMessage = {
  role: 'model',
  text: "Hi! I'm **TamizhAI** 👋  \nAsk me anything about Tamizh's projects, skills, or experience — or tap a suggestion below!",
};

const AIChat: React.FC = () => {
  const location = useLocation();
  const pageContext = getPageLabel(location.pathname);

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const history = loadHistory();
    return history.length > 0 ? history : [GREETING];
  });
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const MAX_CHARS = 300;

  // ── Scroll to bottom ──────────────────────────────────────────────────────
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, isOpen, scrollToBottom]);

  // ── Focus input when opened ───────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 200);
  }, [isOpen]);

  // ── Persist history on change ─────────────────────────────────────────────
  useEffect(() => {
    if (messages.length > 1) saveHistory(messages);
  }, [messages]);

  // ── Send message ────────────────────────────────────────────────────────
  const handleSend = useCallback(async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || isStreaming) return;

    setInput('');
    setShowSuggestions(false);

    // Add user message
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setIsStreaming(true);

    // Add empty model message that will be filled by streaming
    setMessages(prev => [...prev, { role: 'model', text: '' }]);

    await streamMessageToGemini(
      msg,
      pageContext,
      // onChunk — append to the last model message
      (chunk) => {
        setMessages(prev => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          if (last.role === 'model') {
            copy[copy.length - 1] = { ...last, text: last.text + chunk };
          }
          return copy;
        });
      },
      // onDone
      () => setIsStreaming(false),
      // onError
      (err) => {
        setMessages(prev => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: 'model', text: err };
          return copy;
        });
        setIsStreaming(false);
      },
    );
  }, [input, isStreaming, pageContext]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ── Clear chat ─────────────────────────────────────────────────────────
  const handleClear = () => {
    setMessages([GREETING]);
    setShowSuggestions(true);
    resetChatInstance();
    localStorage.removeItem(STORAGE_KEY);
  };

  const charsLeft = MAX_CHARS - input.length;
  const isNearLimit = charsLeft <= 50;

  return (
    <>
      {/* ── Toggle Button ── */}
      <motion.button
        onClick={() => setIsOpen(o => !o)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-colors duration-300 ${isOpen
          ? 'bg-slate-700 border border-border'
          : 'bg-gradient-to-br from-accent to-violet-500'
          } text-white`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle TamizhAI chat"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed bottom-24 left-4 right-4 md:left-auto md:right-6 z-40 w-auto md:w-[22rem] bg-[#0d1117]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col h-[70vh] max-h-[520px]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-4 py-3.5 border-b border-white/10 flex items-center gap-3">
              <div className="relative">
                <div className="bg-accent/20 p-2 rounded-xl border border-accent/20">
                  <Sparkles size={16} className="text-accent" />
                </div>
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-bold text-white text-sm leading-tight">TamizhAI</h3>
                <p className="text-[10px] text-slate-500 font-mono truncate">Viewing: {pageContext}</p>
              </div>
              <button
                onClick={handleClear}
                title="Clear chat"
                className="p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all"
              >
                <Trash2 size={14} />
              </button>
            </div>

            {/* Messages */}
            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto overscroll-contain touch-pan-y p-4 space-y-4"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  {msg.role === 'model' ? (
                    <BotAvatar thinking={isStreaming && idx === messages.length - 1 && msg.text === ''} />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-violet-600/80 flex items-center justify-center flex-shrink-0">
                      <User size={13} className="text-white" />
                    </div>
                  )}

                  {/* Bubble */}
                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${msg.role === 'user'
                      ? 'bg-violet-600 text-white rounded-tr-sm'
                      : 'bg-slate-800/80 text-slate-200 rounded-tl-sm border border-white/5'
                      }`}
                  >
                    {msg.role === 'model' && msg.text === '' && isStreaming && idx === messages.length - 1 ? (
                      <ThinkingDots />
                    ) : msg.role === 'model' ? (
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                          strong: ({ children }) => <strong className="text-accent font-semibold">{children}</strong>,
                          ul: ({ children }) => <ul className="list-none space-y-0.5 mt-1">{children}</ul>,
                          li: ({ children }) => <li className="flex gap-1.5"><span className="text-accent mt-0.5 flex-shrink-0">›</span><span>{children}</span></li>,
                          a: ({ href, children }) => <a href={href} target="_blank" rel="noreferrer" className="text-accent underline underline-offset-2 hover:text-cyan-300">{children}</a>,
                          code: ({ children }) => <code className="text-xs bg-black/40 px-1 py-0.5 rounded font-mono text-emerald-400">{children}</code>,
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}

              {/* Suggested prompts — shown only at start */}
              <AnimatePresence>
                {showSuggestions && messages.length <= 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="flex flex-col gap-1.5 pt-1"
                  >
                    <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mb-1">Try asking...</p>
                    {SUGGESTED_PROMPTS.map((prompt) => (
                      <motion.button
                        key={prompt}
                        onClick={() => handleSend(prompt)}
                        className="text-left text-xs px-3 py-2 rounded-xl bg-accent/5 border border-accent/15 text-accent/80 hover:bg-accent/10 hover:text-accent hover:border-accent/30 transition-all font-medium"
                        whileHover={{ x: 3 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {prompt}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 bg-slate-900/60 border-t border-white/5">
              <div className="flex gap-2 items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value.slice(0, MAX_CHARS))}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Tamizh..."
                  disabled={isStreaming}
                  className="flex-1 bg-slate-800/80 text-white text-sm rounded-xl py-2.5 px-4 focus:outline-none focus:ring-1 focus:ring-accent/40 placeholder-slate-600 border border-white/5 disabled:opacity-50 transition-all min-w-0"
                />
                <motion.button
                  onClick={() => handleSend()}
                  disabled={isStreaming || !input.trim()}
                  className="p-2.5 bg-accent text-primary rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cyan-300 transition-colors flex-shrink-0"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.93 }}
                >
                  <Send size={15} />
                </motion.button>
              </div>
              {/* Character counter */}
              {input.length > 0 && (
                <p className={`text-right text-[10px] mt-1 font-mono transition-colors ${isNearLimit ? 'text-amber-400' : 'text-slate-700'}`}>
                  {charsLeft}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;