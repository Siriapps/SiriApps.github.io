import { useEffect, useRef, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const GithubIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

const projects = [
  {
    title: 'Cue',
    subtitle: 'Intent-aware AI workspace agent',
    desc: 'Chrome extension that reads browsing context and uses a multi-agent Google ADK pipeline to predict your next five tasks. Actions execute autonomously across Google Workspace via MCP.',
    tags: ['Gemini 2.0', 'Google ADK', 'MCP', 'TypeScript'],
    accent: '#ffb020',
    github: 'https://github.com/Siriapps/cue',
    live: '#',
  },
  {
    title: 'Pondr',
    subtitle: '1st Place · HackAI Dallas 2026',
    desc: 'Adaptive learning via living knowledge graphs. An XGBoost model fitted to the Ebbinghaus forgetting curve predicts decaying concepts, then resurfaces them with YouTube clips, TTS, and Calendar scheduling.',
    tags: ['LangChain', 'XGBoost', 'Knowledge Graphs', 'React Flow'],
    accent: '#ff7a3d',
    github: '#',
    live: '#',
  },
  {
    title: 'SafeWay',
    subtitle: 'ACM Projects · Safety-first navigation',
    desc: 'Routes by crash risk, not just speed. Two-stage hurdle model on 2.3M+ crash records across 29,500 Chicago intersections. AUC 0.891, R2 0.745, deployed on Cloud Run with nightly retraining.',
    tags: ['CatBoost', 'SHAP', 'FastAPI', 'DuckDB', 'Cloud Run'],
    accent: '#a78bfa',
    github: 'https://github.com/Siriapps/safeway',
    live: '#',
  },
  {
    title: 'HarmoniQ',
    subtitle: '3rd Place · HackUTD, T-Mobile + MLH Auth0',
    desc: 'Unified real-time dashboard for PMs: live sentiment across 100K+ posts, Prophet-powered outage prediction, geographic heatmaps, and Gemini-powered natural language insights.',
    tags: ['scikit-learn', 'Prophet', 'Flask', 'React', 'Auth0'],
    accent: '#ffb020',
    github: 'https://github.com/Siriapps/HarmoniQ',
    live: '#',
  },
  {
    title: 'Remix',
    subtitle: 'GDSC UTD Sprints · AI mock interviews',
    desc: 'Interview prep that knows what you do not know. Semantic resume analysis, gap detection, and an adaptive interview flow that targets your weakest areas. Cut average prep time about 40 percent.',
    tags: ['FAISS', 'LangChain', 'Gemini 2.5', 'FastAPI'],
    accent: '#ff7a3d',
    github: 'https://github.com/Siriapps/remix',
    live: '#',
  },
  {
    title: 'Post-Quantum RGNN',
    subtitle: '1st Place · ACM UTD Research Symposium',
    desc: 'Recurrent Graph Neural Network decoder for RLCE post-quantum cryptographic failures. 15M+ adversarial test cases, graph-structured error sequences, 30x improvement over classical baselines.',
    tags: ['PyTorch', 'NetworkX', 'Graph NNs', 'PQ Crypto'],
    accent: '#a78bfa',
    github: 'https://github.com/Siriapps/qryptik',
    live: '#',
  },
  {
    title: 'StreamSign',
    subtitle: 'TRAIN AI · Accessible video',
    desc: 'Real-time video audio to Indian Sign Language animations. Custom NLP preprocessing handles ISL grammar restructuring before animation rendering. 90%+ accuracy.',
    tags: ['Python', 'OpenCV', 'NLP', 'Flask'],
    accent: '#ffb020',
    github: 'https://github.com/Siriapps/Stream-Sign',
    live: '#',
  },
  {
    title: 'Matcha',
    subtitle: 'Team matching for hackathons',
    desc: 'Brewing your perfect hack team. Matches hackers by complementary skills, interests, and working styles so teams form in minutes instead of the first panicked hour.',
    tags: ['JavaScript', 'React', 'Matching Algorithms'],
    accent: '#ff7a3d',
    github: 'https://github.com/Siriapps/Matcha',
    live: '#',
  },
  {
    title: 'ReelSkill',
    subtitle: 'Agents from social video',
    desc: 'DM an Instagram Reel, get back an installable AI agent skill. Turns short-form how-to content into structured, executable automations.',
    tags: ['Python', 'AI Agents', 'Instagram API'],
    accent: '#a78bfa',
    github: 'https://github.com/Siriapps/reelskill',
    live: '#',
  },
  {
    title: 'CabinIQ',
    subtitle: 'Attention triage for crews',
    desc: 'Helps flight crews prioritize attention proactively during flights, surfacing what needs a human first instead of drowning crews in alerts.',
    tags: ['JavaScript', 'Real-time Systems', 'UX'],
    accent: '#ffb020',
    github: 'https://github.com/Siriapps/CabinIQ',
    live: '#',
  },
  {
    title: 'ASL Recognition',
    subtitle: 'Computer vision · 99% accuracy',
    desc: 'A convolutional neural network that recognizes American Sign Language signs with 99 percent accuracy, an early step in a continuing thread of accessibility work.',
    tags: ['CNN', 'TensorFlow', 'Computer Vision'],
    accent: '#ff7a3d',
    github: 'https://github.com/Siriapps/American-Sign-Language-Recognition',
    live: '#',
  },
]

// degrees between neighbors on the arc; the active project sits at 0
// (pointing straight right from the half-hidden hub on the left edge)
const STEP = 26

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stRef = useRef<ScrollTrigger | null>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px)', () => {
      stRef.current = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${projects.length * 55}%`,
        pin: true,
        scrub: 0.4,
        snap: 1 / (projects.length - 1),
        onUpdate: (self) => {
          setActive(Math.round(self.progress * (projects.length - 1)))
        },
      })
    })
    return () => mm.revert()
  }, [])

  // Clicking a planet scrolls the page to that project's slot in the pin.
  const jumpTo = (idx: number) => {
    const st = stRef.current
    if (!st) { setActive(idx); return }
    const pos = st.start + (idx / (projects.length - 1)) * (st.end - st.start)
    window.scrollTo({ top: pos, behavior: 'smooth' })
  }

  const skip = () => {
    const skills = document.getElementById('skills')
    if (skills) {
      const top = skills.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const p = projects[active]

  return (
    <section id="projects" ref={sectionRef} className="relative md:h-screen py-24 md:py-0 md:flex md:items-center">
      {/* Desktop: half orbit pinned to the left edge */}
      <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[560px] h-[560px] pointer-events-none overflow-visible">
        <div className="absolute inset-0 rounded-full" style={{ border: '1px dashed rgba(255,176,32,0.25)' }} />
        <div className="absolute inset-[70px] rounded-full" style={{ border: '1px dashed rgba(167,139,250,0.18)' }} />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl"
          style={{ color: '#ffb020', textShadow: '0 0 28px rgba(255,176,32,0.8)' }}>✦</div>
      </div>

      <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0">
        {projects.map((proj, i) => {
          const angle = (i - active) * STEP
          const off = Math.abs(i - active)
          const visible = Math.abs(angle) <= 92
          return (
            <button
              key={proj.title}
              onClick={() => jumpTo(i)}
              aria-label={`Show ${proj.title}`}
              className="absolute left-0 top-0"
              style={{
                transform: `rotate(${angle}deg) translateX(280px) rotate(${-angle}deg)`,
                transition: 'transform 0.7s cubic-bezier(0.35, 0, 0.25, 1), opacity 0.5s',
                opacity: visible ? Math.max(0.25, 1 - off * 0.16) : 0,
                pointerEvents: visible ? 'auto' : 'none',
              }}
            >
              <span className="block w-11 h-11 -ml-[22px] -mt-[22px] rounded-full transition-all duration-500"
                style={{
                  background: `radial-gradient(circle at 35% 30%, ${proj.accent}, ${proj.accent}55)`,
                  boxShadow: i === active ? `0 0 26px ${proj.accent}, 0 0 0 3px ${proj.accent}50` : `0 0 10px ${proj.accent}50`,
                  scale: i === active ? '1.3' : '1',
                }} />
              <span className="absolute left-1/2 top-6 -translate-x-1/2 mt-1 font-mono text-[9px] tracking-wider whitespace-nowrap text-white/60"
                style={i === active ? { color: proj.accent, opacity: 1 } : undefined}>
                {proj.title}
              </span>
            </button>
          )
        })}
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-6 w-full md:pl-[360px]">
        <p className="obs-label">
          OBS 04 <span className="obs-dim">/ in rotation</span>
        </p>
        <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight mb-3">
          Projects
        </h2>
        <p className="text-white/45 font-light text-lg mb-10 max-w-xl hidden md:block">
          Scroll to turn the orbit, or press any planet.
        </p>

        {/* Desktop: detail panel for the focused project */}
        <div key={active} className="hidden md:block min-h-[300px] max-w-xl">
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase mb-3" style={{ color: p.accent }}>
            {p.subtitle}
          </p>
          <h3 className="font-display font-bold text-4xl text-white mb-5">{p.title}</h3>
          <p className="text-white/60 text-base leading-relaxed mb-6">{p.desc}</p>
          <div className="flex flex-wrap gap-2 mb-7">
            {p.tags.map(tag => (
              <span key={tag} className="chip px-3 py-1.5 font-mono text-[11px] rounded-full text-white/50">{tag}</span>
            ))}
          </div>
          <div className="flex gap-3">
            {p.github !== '#' && (
              <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} on GitHub`}
                className="chip inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-[0.1em] text-white/70">
                <GithubIcon /> Source
              </a>
            )}
            {p.live !== '#' && (
              <a href={p.live} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} live site`}
                className="chip inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-[0.1em] text-white/70">
                <ExternalLink size={13} /> Visit
              </a>
            )}
          </div>
          <p className="font-mono text-[10px] tracking-[0.3em] text-white/25 mt-10">
            {String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </p>
        </div>

        {/* Mobile: stacked list, no orbit */}
        <div className="md:hidden flex flex-col gap-10">
          {projects.map((proj) => (
            <div key={proj.title} className="panel rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-full shrink-0"
                  style={{ background: `radial-gradient(circle at 35% 30%, ${proj.accent}, ${proj.accent}55)`, boxShadow: `0 0 12px ${proj.accent}60` }} />
                <div>
                  <h3 className="font-display font-bold text-xl text-white leading-tight">{proj.title}</h3>
                  <p className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: proj.accent }}>{proj.subtitle}</p>
                </div>
              </div>
              <p className="text-white/55 text-sm leading-relaxed mb-4">{proj.desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {proj.tags.map(tag => (
                  <span key={tag} className="chip px-2.5 py-1 font-mono text-[10px] rounded-full text-white/45">{tag}</span>
                ))}
              </div>
              {proj.github !== '#' && (
                <a href={proj.github} target="_blank" rel="noopener noreferrer" aria-label={`${proj.title} on GitHub`}
                  className="chip inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[10px] uppercase tracking-[0.1em] text-white/70">
                  <GithubIcon /> Source
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* skip out of the pinned run */}
      <button
        onClick={skip}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-50 items-center gap-2 px-5 py-2.5 rounded-full font-mono text-[10px] tracking-[0.25em] uppercase text-white/70 hover:text-white transition-all duration-300 pointer-events-auto skip-skills-btn"
      >
        Skip to skills ↓
      </button>
    </section>
  )
}
