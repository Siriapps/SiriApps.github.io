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
    subtitle: 'Intent-Aware AI Workspace Agent',
    desc: 'Chrome extension that monitors browsing context and uses multi-agent Google ADK pipeline to predict your next five tasks. Actions execute autonomously across Google Workspace via MCP.',
    tags: ['Gemini 2.0', 'Google ADK', 'MCP', 'Chrome Extensions', 'TypeScript'],
    accent: '#c2a4ff',
    github: 'https://github.com/Siriapps/cue',
    live: '#',
  },
  {
    title: 'Pondr',
    subtitle: '1st Place — HackAI Dallas 2026',
    desc: 'Adaptive learning via living knowledge graphs. XGBoost model fitted to Ebbinghaus forgetting curve predicts decaying concepts. YouTube clips, ElevenLabs TTS, and Google Calendar scheduling.',
    tags: ['LangChain', 'XGBoost', 'Gemini 2.0', 'Knowledge Graphs', 'React Flow'],
    accent: '#fbbf24',
    github: '#',
    live: '#',
  },
  {
    title: 'SafeWay',
    subtitle: 'ACM Projects · Safety-First Navigation',
    desc: 'Routes by crash risk, not just speed. Two-stage hurdle model on 2.3M+ crash records across 29,500 Chicago intersections. AUC 0.891, R² 0.745, deployed on Cloud Run with nightly retraining.',
    tags: ['CatBoost', 'XGBoost', 'SHAP', 'FastAPI', 'DuckDB', 'Cloud Run'],
    accent: '#34d399',
    github: 'https://github.com/Siriapps/safeway',
    live: '#',
  },
  {
    title: 'HarmoniQ',
    subtitle: '3rd Place — HackUTD · T-Mobile + MLH Auth0',
    desc: 'Unified real-time dashboard for PMs — live sentiment analysis across 100K+ posts, Prophet-powered outage prediction, geographic heatmaps, and Gemini-powered NL insights.',
    tags: ['scikit-learn', 'Prophet', 'Flask', 'React', 'Gemini', 'Auth0'],
    accent: '#60a5fa',
    github: 'https://github.com/Siriapps/harmoniq',
    live: '#',
  },
  {
    title: 'Remix',
    subtitle: 'GDSC UTD Sprints · AI Mock Interview',
    desc: 'Interview prep that knows what you don\'t know. Semantic resume analysis, gap detection, and adaptive interview flow targeting your weakest areas. Cut average prep time ~40%.',
    tags: ['FAISS', 'LangChain', 'Gemini 2.5', 'FastAPI', 'mpnet-base-v2'],
    accent: '#f472b6',
    github: 'https://github.com/Siriapps/remix',
    live: '#',
  },
  {
    title: 'Post-Quantum RGNN',
    subtitle: '1st Place — ACM UTD Research Symposium',
    desc: 'Recurrent Graph Neural Network decoder for RLCE post-quantum cryptographic failures. 15M+ adversarial test cases, graph-structured error sequences. 30x improvement over classical baselines.',
    tags: ['PyTorch', 'NetworkX', 'Graph NNs', 'Post-Quantum Crypto'],
    accent: '#a78bfa',
    github: 'https://github.com/Siriapps/qryptik',
    live: '#',
  },
  {
    title: 'StreamSign',
    subtitle: 'TRAIN AI · Accessible Video',
    desc: 'Real-time video audio to Indian Sign Language animations. Custom NLP preprocessing handles ISL grammar restructuring before animation rendering. 90%+ accuracy.',
    tags: ['Python', 'OpenCV', 'NLP', 'Flask', 'Google TTS'],
    accent: '#fb923c',
    github: 'https://github.com/Siriapps/streamsign',
    live: '#',
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const orbitRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.projects-orbit-title', {
        y: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '#projects', start: 'top 80%' },
      })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${projects.length * 100}%`,
        pin: true,
        scrub: 1,
        snap: {
          snapTo: 1 / (projects.length - 1),
          duration: { min: 0.3, max: 0.6 },
          ease: 'power1.inOut',
        },
        onUpdate: (self) => {
          const idx = Math.round(self.progress * (projects.length - 1))
          setActive(idx)
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!orbitRef.current) return
    const cards = orbitRef.current.querySelectorAll<HTMLElement>('.orbit-card')

    cards.forEach((card, i) => {
      const offset = i - active
      const absOffset = Math.abs(offset)

      let x = 0, y = 0, scale = 1, opacity = 1, rotate = 0, zIndex = 10

      if (offset === 0) {
        x = 0; y = 0; scale = 1; opacity = 1; zIndex = 10; rotate = 0
      } else if (absOffset === 1) {
        x = offset * 340; y = 120; scale = 0.7; opacity = 0.3; rotate = offset * -8; zIndex = 5
      } else if (absOffset === 2) {
        x = offset * 420; y = 180; scale = 0.5; opacity = 0.1; rotate = offset * -12; zIndex = 2
      } else {
        x = offset * 500; y = 220; scale = 0.4; opacity = 0; rotate = offset * -15; zIndex = 1
      }

      gsap.to(card, {
        x, y, scale, opacity, rotation: rotate, zIndex,
        duration: 0.7, ease: 'power3.out', overwrite: true,
      })
    })
  }, [active])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="snap-section relative h-screen overflow-hidden"
      style={{ background: '#0b080c' }}
    >
      <div className="absolute left-1/2 bottom-[5%] -translate-x-1/2 w-[800px] h-[400px] pointer-events-none opacity-[0.06]"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, #c2a4ff, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="absolute left-1/2 -translate-x-1/2 bottom-[-300px] w-[900px] h-[900px] rounded-full pointer-events-none opacity-[0.04]"
        style={{ border: '1px solid #c2a4ff' }} />

      <div className="projects-orbit-title absolute top-8 md:top-16 left-0 right-0 z-20 text-center pointer-events-none px-4">
        <p className="section-label">PORTFOLIO</p>
        <h2 className="font-display text-4xl md:text-7xl text-white tracking-tight">Featured Work</h2>
      </div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        <div className="flex gap-2">
          {projects.map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full transition-all duration-500"
              style={{
                background: i === active ? '#c2a4ff' : 'rgba(255,255,255,0.15)',
                transform: i === active ? 'scale(1.3)' : 'scale(1)',
                boxShadow: i === active ? '0 0 12px rgba(194,164,255,0.4)' : 'none',
              }} />
          ))}
        </div>
        <p className="text-white/15 text-[10px] tracking-[0.3em] uppercase">scroll to move next</p>
      </div>

      <div className="absolute top-20 right-8 z-20 text-white/15 font-display text-8xl pointer-events-none hidden md:block">
        {String(active + 1).padStart(2, '0')}
      </div>

      <div ref={orbitRef} className="absolute inset-0 flex items-center justify-center pt-16 md:pt-8" style={{ perspective: '1200px' }}>
        {projects.map((project, i) => (
          <div key={project.title} className="orbit-card absolute" style={{ width: 'min(400px, 85vw)', willChange: 'transform, opacity' }}>
            <div className="relative rounded-2xl p-8 transition-shadow duration-500"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(12px)',
                boxShadow: i === active ? `0 0 60px ${project.accent}15, 0 20px 60px rgba(0,0,0,0.4)` : '0 10px 40px rgba(0,0,0,0.3)',
              }}>
              {i === active && (
                <div className="absolute inset-0 rounded-2xl transition-opacity duration-700"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${project.accent}12, transparent 60%)` }} />
              )}

              <div className="relative w-full h-40 rounded-xl mb-6 overflow-hidden flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${project.accent}10, ${project.accent}05)`, border: '1px solid rgba(255,255,255,0.04)' }}>
                <span className="text-5xl font-display font-bold" style={{ color: `${project.accent}30` }}>
                  {project.title[0]}
                </span>
              </div>

              <div className="relative">
                <p className="text-[10px] uppercase tracking-[0.2em] font-medium mb-2" style={{ color: project.accent + '80' }}>
                  {project.subtitle}
                </p>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{project.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-5">{project.desc}</p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 text-[10px] font-medium rounded-md text-white/35"
                      style={{ background: 'rgba(255,255,255,0.04)' }}>{tag}</span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white/25 hover:text-white/60 transition-colors"
                    style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <GithubIcon />
                  </a>
                  {project.live !== '#' && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white/25 hover:text-white/60 transition-colors"
                      style={{ background: 'rgba(255,255,255,0.04)' }}>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
