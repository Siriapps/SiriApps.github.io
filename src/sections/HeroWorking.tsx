import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const areas = [
  {
    title: 'AGENTIC AI',
    subtitle: 'Systems & Infrastructure',
    desc: 'Multi-agent pipelines where AI models coordinate, hand off context, and take actions across real tools. Focused on the gap between agent capability and agent-ready infrastructure.',
    accent: '#c2a4ff',
  },
  {
    title: 'QUANTUM & ML',
    subtitle: 'Research',
    desc: 'Building models that are both data-driven and domain-honest. Physics-Informed LSTMs that embed conservation laws directly into training for physically consistent predictions. Quantum circuit verification, post-quantum cryptography, and the kind of problems that keep me up at night.',
    accent: '#60a5fa',
  },
  {
    title: 'FULL-STACK',
    subtitle: 'At Scale',
    desc: 'Production-grade systems with real data, real infrastructure, and real constraints. Two-stage ML models, nightly retraining pipelines, SHAP explainability, and cloud deployments.',
    accent: '#34d399',
  },
]

function CornerBrackets({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative p-[1px]">
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/30" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/30" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/30" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/30" />
      <div
        className="rounded-none px-4 py-3 md:px-5 md:py-4"
        style={{ border: '1px dashed rgba(255,255,255,0.12)' }}
      >
        {children}
      </div>
    </div>
  )
}

export default function HeroWorking() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      gsap.from('.what-i-do-image', {
        x: -60, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
      gsap.from('.what-i-do-content', {
        x: 60, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    })

    mm.add('(max-width: 767px)', () => {
      gsap.from('.what-i-do-image', {
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.from('.what-i-do-content', {
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
      })
    })

    gsap.from('.craft-card', {
      y: 30, duration: 0.6, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: '.craft-cards-grid', start: 'top 90%' },
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="what-i-do"
      className="relative overflow-hidden min-h-screen flex items-center py-16 md:py-0 md:h-screen"
      style={{ background: '#0b080c' }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 w-full grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 md:gap-10 items-center">
        {/* LEFT: heading overlapping image */}
        <div className="what-i-do-image relative">
          <h2 className="font-display text-5xl md:text-[6rem] lg:text-[7.5rem] text-white tracking-tight leading-[0.9] pointer-events-none relative z-10">
            WHAT<br />
            <span className="gradient-text">I DO</span>
          </h2>
          <img
            src="/images/workspace.png"
            alt="Working at desk"
            className="w-full object-cover object-top rounded-2xl h-[40vh] md:h-[60vh]"
            style={{ marginTop: '-4rem' }}
          />
        </div>

        {/* RIGHT: dashed bracket cards */}
        <div className="what-i-do-content">
          <div className="craft-cards-grid flex flex-col gap-3">
            {areas.map(({ title, subtitle, desc, accent }) => (
              <div key={title} className="craft-card">
                <CornerBrackets>
                  <h3 className="text-lg md:text-xl font-bold text-white tracking-tight mb-0.5"
                    style={{ fontFamily: 'var(--font-body)' }}>
                    {title}
                  </h3>
                  <p className="text-xs mb-2" style={{ color: `${accent}99` }}>{subtitle}</p>
                  <p className="text-white/70 text-sm leading-relaxed">{desc}</p>
                </CornerBrackets>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
