import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const headings = [
  {
    hdg: 'DOME I',
    title: 'Agentic AI',
    subtitle: 'Systems and infrastructure',
    desc: 'Multi-agent pipelines where models coordinate, hand off context, and take real actions across real tools. I work in the gap between agent capability and agent-ready infrastructure.',
    accent: '#ffb020',
  },
  {
    hdg: 'DOME II',
    title: 'Quantum and ML',
    subtitle: 'Research',
    desc: 'Models that are data-driven and domain-honest: Physics-Informed LSTMs that embed conservation laws into training, quantum circuit verification, and post-quantum cryptography.',
    accent: '#a78bfa',
  },
  {
    hdg: 'DOME III',
    title: 'Full-stack',
    subtitle: 'At scale',
    desc: 'Production systems with real data and real constraints: two-stage ML models, nightly retraining pipelines, SHAP explainability, and cloud deployments that stay up.',
    accent: '#ff7a3d',
  },
]

export default function Focus() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.focus-card', {
        y: 40, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="focus" ref={sectionRef} className="relative py-24 md:py-36">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <p className="obs-label">
          OBS 02 <span className="obs-dim">/ current bearings</span>
        </p>
        <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight mb-14">
          What the telescope points at
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {headings.map(({ hdg, title, subtitle, desc, accent }) => (
            <div
              key={title}
              className="focus-card panel rounded-2xl p-7 md:p-8 transition-transform duration-500 hover:-translate-y-1.5"
            >
              <p className="font-mono text-[11px] tracking-[0.3em]" style={{ color: accent }}>{hdg}</p>
              <h3 className="font-display font-bold text-2xl text-white mt-4 mb-1">{title}</h3>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/35 mb-5">{subtitle}</p>
              <p className="text-white/55 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
