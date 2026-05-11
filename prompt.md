You are building a portfolio website for Tamizharasan R — an AI/Full-Stack engineer from Chennai targeting AI Engineering roles in 2026. This is NOT a generic portfolio. It is designed to feel like a real deployed product — a dashboard the user is inside of, not a resume they are reading.

═══════════════════════════════════════
TECH STACK
═══════════════════════════════════════
- React + Vite + TypeScript
- Tailwind CSS
- Framer Motion (view transitions)
- React Router (/, /work, /stack, /connect)
- Pure SVG for dependency graph (no D3.js)
- No UI component libraries (no shadcn, no MUI, no Chakra)

═══════════════════════════════════════
FONTS — CRITICAL, DO NOT SUBSTITUTE
═══════════════════════════════════════
Import these from Google Fonts:
- Syne (weights: 400, 700, 800) — headings, name, section titles
- DM Sans (weight: 300, 400) — body text, descriptions
- Departure Mono (weight: 400, 500) — terminal, status bar, stats, breadcrumb, all monospace

Never use Inter, Geist, Roboto, or any system font stack.

CSS variables:
--font-heading: 'Syne', sans-serif;
--font-body: 'DM Sans', sans-serif;
--font-mono: 'Departure Mono', monospace;

═══════════════════════════════════════
COLOR SYSTEM
═══════════════════════════════════════
--bg-base: #030712
--bg-surface: #0a0f1e
--bg-card: #0d1424
--border-subtle: rgba(255,255,255,0.06)
--border-default: rgba(255,255,255,0.10)
--text-primary: #f1f5f9
--text-secondary: #64748b
--text-dim: rgba(255,255,255,0.15)
--accent-cyan: #22d3ee
--accent-violet: #7c3aed
--accent-glow: rgba(34,211,238,0.08)

Background: NOT flat black. Use:
background: radial-gradient(ellipse 80% 50% at 50% -10%, rgba(34,211,238,0.06), transparent),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(124,58,237,0.05), transparent),
            #030712;

NO floating dot patterns. NO grid patterns. NO particle animations.

═══════════════════════════════════════
LAYOUT SHELL — THE CORE STRUCTURE
═══════════════════════════════════════

The entire app has three fixed zones:

1. LEFT SIDEBAR — 52px wide, fixed, full height
2. TOP STATUS BAR — full width minus sidebar, 40px tall, fixed top
3. MAIN CONTENT PANE — fills remaining space, scrolls internally ONLY on /work

┌──┬─────────────────────────────────────┐
│  │ TAMIZH.dev / home  [●Open] [time]   │  ← 40px status bar
│  ├─────────────────────────────────────┤
│S │                                     │
│I │                                     │
│D │         MAIN CONTENT AREA           │
│E │                                     │
│B │                                     │
│A │                                     │
│R │                                     │
└──┴─────────────────────────────────────┘

SIDEBAR DETAILS:
- Width: 52px
- Background: #0a0f1e
- Border-right: 1px solid rgba(255,255,255,0.06)
- Contains: 4 custom SVG nav icons (NOT icon libraries)
- Icons centered vertically with 28px gap between
- Active icon: accent-cyan color + left border 2px cyan
- Inactive: rgba(255,255,255,0.25)
- Bottom of sidebar: small avatar circle (initials "TR") in violet

CUSTOM SVG NAV ICONS — draw these as raw paths, not library icons:
- Home (/): two diagonal lines forming a roof angle — minimal house suggestion
- Work (/work): three horizontal lines of unequal width (like a file list)
- Stack (/stack): three circles connected by a line (node suggestion)  
- Connect (/connect): a single diagonal arrow pointing top-right

Each icon is 18x18px SVG, stroke-only, stroke-width 1.5, no fill.

STATUS BAR DETAILS:
- Height: 40px
- Background: rgba(10,15,30,0.8), backdrop-blur: 12px
- Border-bottom: 1px solid rgba(255,255,255,0.06)
- Font: Departure Mono throughout
- Three zones:

LEFT ZONE (breadcrumb):
  TAMIZH.dev / {current_view}
  font-size: 11px, color: var(--text-secondary)
  "TAMIZH.dev" slightly brighter than the slash and view name

CENTER ZONE (status pill):
  ● Open to AI Roles
  pill background: rgba(34,211,238,0.08)
  border: 1px solid rgba(34,211,238,0.2)
  dot color: #22d3ee, animate with a slow pulse (2s ease-in-out infinite opacity 1→0.4)
  font-size: 10px, letter-spacing: 0.08em

RIGHT ZONE (live clock):
  Chennai · HH:MM AM/PM IST
  font-size: 10px, color: var(--text-dim)
  updates every second with JS

CORNER VERSION TAG (on every view, bottom-right of main area):
  v2.1 · updated May 2026
  font: Departure Mono, font-size: 10px
  color: rgba(255,255,255,0.12)
  position: fixed bottom-right, padding: 12px

═══════════════════════════════════════
VIEW 1: / (HOME — TERMINAL HERO)
═══════════════════════════════════════

Full viewport height minus status bar. Content centered vertically.
No scroll. Nothing below the fold.

Layout: single terminal container, centered, max-width 560px

TERMINAL CONTAINER STYLE:
- border: 1px solid rgba(255,255,255,0.08)
- background: rgba(13,20,36,0.6)
- backdrop-filter: blur(8px)
- border-radius: 8px
- padding: 28px 32px
- NO macOS window dots. NO colored circles at top.
- Top of container: a single line in Departure Mono size 10px color --text-dim:
  "tamizh@portfolio:~  ×"  (right-aligned × as close button, purely decorative)

TERMINAL CONTENT — types out sequentially with realistic delays:

Line 1 (appears immediately):
$ whoami
> tamizharasan — ai engineer · full-stack builder

(300ms pause)

Line 2:
$ cat location.txt
> chennai, india · targeting 2026

(400ms pause)

Line 3:
$ ls ./stack
> python  next.js  langchain  supabase  fastapi  +more

(500ms pause)

Line 4:
$ status --verbose
> 🟢 open to ai engineering roles
> cgpa: 8.7 · apps shipped: 4 · internships: 2

(600ms pause)

Line 5 (last line, cursor blinks here permanently):
$ _

TYPING BEHAVIOR:
- Each $ line types character by character at 40ms per char
- Each > response appears all at once after $ line finishes
- After all lines complete, cursor blinks at last $ — NEVER loops or restarts
- Text color: $ in --accent-cyan, > in --text-primary, values in --text-secondary

BELOW terminal (NOT inside it), after 2s delay, fade in:
Two buttons side by side, centered:
  [View Work →]  [Download Resume ↓]

Button 1 (View Work): 
- background: transparent
- border: 1px solid rgba(34,211,238,0.3)
- color: --accent-cyan
- font: DM Sans 300, 13px
- hover: background rgba(34,211,238,0.06), border opacity increases
- onClick: navigate to /work

Button 2 (Download Resume):
- background: transparent  
- border: 1px solid rgba(255,255,255,0.08)
- color: --text-secondary
- same sizing as button 1
- hover: border opacity increases slightly

NO other content on this view. No hero image. No large name. No social icons on this page.

═══════════════════════════════════════
VIEW 2: /work (PROJECTS)
═══════════════════════════════════════

This pane scrolls internally. Sidebar and status bar stay fixed.

HEADER (not sticky, just top of scroll content):
  Featured Projects          ← Syne 700, 22px, --text-primary
  (no subtitle, no description)

PROJECT DATA:
1. Chill Space — Real-time collaboration: group chat, games, code editor. Stack: Next.js 16, TypeScript, Supabase, WebSockets. Featured.
2. Data-Talk — Text-to-SQL AI platform, 10-agent pipeline, 23+ charts, RAG with pgvector. Stack: Python, FastAPI, LangChain, PostgreSQL, pgvector. Featured.
3. Valluge — AI Wardrobe, Gemini API outfit recommendations, weather integration. Stack: Next.js, Gemini API, PostgreSQL.
4. Add 1-2 placeholder projects with [redacted] name and "details private" description for visual completeness.

CARD LAYOUT — BROKEN GRID (critical):

FIRST CARD (Chill Space or Data-Talk — whichever you mark featured):
- Full width, height: 96px default
- Expands to ~280px on hover/click (smooth framer-motion height animation)
- Collapsed state shows: project name (Syne 700, 16px) + one-line description (DM Sans 300, 13px) + stack pills
- Expanded state reveals: bullet features + Code and Live links
- Left border: 2px solid --accent-cyan
- Background: var(--bg-card)
- This "file drawer" interaction is the signature of this view

REMAINING CARDS (two column grid below):
- Gap: 16px
- Each card: standard height ~180px, no expansion needed
- Top-right: tiny "FEATURED" chip if applicable (Departure Mono, 9px, cyan border)
- Card hover: translateY(-2px), border-color brightens slightly
- Each card shows: name, one-line desc, stack pills (max 3 visible + "+N more"), complexity ring

COMPLEXITY RING:
- Small SVG circle (28px), top-right of card
- Ring fills based on: (number of tech stack items / 8) * 100 = percentage
- Stroke: --accent-cyan, track: rgba(255,255,255,0.06)
- stroke-dasharray for the fill animation on mount
- No label inside ring — purely visual

STACK PILLS:
- background: rgba(255,255,255,0.04)
- border: 1px solid rgba(255,255,255,0.08)
- font: Departure Mono 400, 10px
- color: --text-secondary
- border-radius: 4px
- padding: 2px 8px

═══════════════════════════════════════
VIEW 3: /stack (DEPENDENCY GRAPH)
═══════════════════════════════════════

No scroll. Full viewport. Pure SVG + HTML overlay.

TITLE (top of view, left-aligned):
  Technical Stack          ← Syne 700, 22px
  (no subtitle)

GRAPH LAYOUT — THREE ORBITAL RINGS, hand-positioned:

CENTER NODE:
  Python
  circle: 52px diameter
  background: rgba(34,211,238,0.1)
  border: 1.5px solid rgba(34,211,238,0.4)
  font: Syne 700, 13px, --accent-cyan

FIRST ORBIT (6 nodes around center, ~140px radius):
  FastAPI · LangChain · Next.js · React · Supabase · PostgreSQL
  circle: 40px diameter
  background: rgba(13,20,36,0.8)
  border: 1px solid rgba(255,255,255,0.15)
  font: DM Sans 400, 11px

SECOND ORBIT (8 nodes, ~260px radius):
  pgvector · Gemini API · WebSockets · TypeScript · Docker · Redis · Pinecone · LlamaIndex
  circle: 32px diameter
  background: rgba(13,20,36,0.6)
  border: 1px solid rgba(255,255,255,0.08)
  font: Departure Mono 400, 9px, --text-secondary

CONNECTOR LINES (SVG lines between related nodes):
  Python → FastAPI (direct)
  Python → LangChain (direct)
  LangChain → pgvector
  LangChain → LlamaIndex
  LangChain → Pinecone
  Next.js → React (direct)
  Next.js → Supabase
  Supabase → PostgreSQL
  FastAPI → Docker
  WebSockets → Supabase

  Line style:
  stroke: rgba(255,255,255,0.08)
  stroke-width: 1
  DEFAULT: all lines visible at opacity 0.08

HOVER INTERACTION (the reveal):
  On hover of any node:
  - That node's border brightens to full accent color
  - Connected lines animate to opacity 0.5, stroke: --accent-cyan
  - Connected nodes get a subtle glow ring
  - Unconnected nodes dim to opacity 0.3
  - Tooltip appears above hovered node: node name + category label
    (e.g. "LangChain · AI Orchestration")
  - Tooltip style: Departure Mono 10px, bg rgba(13,20,36,0.9), border --border-subtle

CATEGORY LABELS (static, very dim, placed between orbits):
  "core" near center
  "frameworks" near first orbit
  "tools & apis" near second orbit
  Font: Departure Mono 9px, color rgba(255,255,255,0.12), letter-spacing 0.15em, uppercase

═══════════════════════════════════════
VIEW 4: /connect (CONTACT)
═══════════════════════════════════════

No scroll. Centered vertically and horizontally.

ONE single card, max-width 420px:

CARD STYLE:
- background: var(--bg-card)
- border: 1px solid var(--border-subtle)
- border-radius: 8px
- padding: 40px

CARD CONTENT:

Top: 
  Let's connect.     ← Syne 800, 28px, --text-primary
  
Below (DM Sans 300, 14px, --text-secondary, max-width 300px):
  Open to AI engineering internships, collabs, and interesting builds.

Divider: 1px rgba(255,255,255,0.06), margin 24px 0

Three contact rows (each a clickable link):

Row style:
- display flex, space-between
- padding: 14px 0
- border-bottom: 1px solid rgba(255,255,255,0.04) (except last)
- hover: background rgba(255,255,255,0.02), cursor pointer

Left: label in Departure Mono 10px --text-dim uppercase tracked
Right: value in DM Sans 400 13px --text-primary + small arrow "→" in --accent-cyan

Rows:
  GITHUB     →    github.com/tamizh         →
  LINKEDIN   →    linkedin.com/in/tamizh    →
  MAIL       →    your@email.com            →

Below card (not inside):
  Departure Mono 10px, --text-dim, centered:
  "Based in Chennai · Available from 2026"

═══════════════════════════════════════
TRANSITIONS & MOTION
═══════════════════════════════════════

View transitions (Framer Motion):
- Exit: opacity 0, x: -8px, duration 0.15s
- Enter: opacity 1, x: 0, duration 0.2s, ease: easeOut
- NO slide-up. NO scale. Subtle horizontal drift only.

Card mount animations:
- Cards stagger in: each delays by index * 0.06s
- opacity 0→1, y: 6px→0, duration 0.25s

Dependency graph nodes mount:
- Each node: opacity 0→1, scale 0.85→1
- Stagger by orbit: center first, then first orbit, then second
- Delay per orbit: 0s, 0.3s, 0.6s

═══════════════════════════════════════
WHAT TO NEVER DO
═══════════════════════════════════════
- No floating particles or dot patterns
- No gradient text on the main heading (Syne headings are solid --text-primary only)
- No cards with rounded corners above 8px
- No box shadows with color (only rgba(0,0,0,X) shadows if needed)
- No Lucide, Heroicons, or any icon library — SVG paths only
- No skeleton loaders
- No page loading spinner
- No scroll-triggered animations except on /work card mount
- No hover tooltips except on dependency graph nodes
- Never use Inter, Geist, or system-ui font
- No hero image, no avatar photo
- No social media icons on home view
- The terminal on / must never loop or restart
- Status bar clock must update live — not be a static string