import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Entry = {
  dates: string
  role: string
  company: string
  desc: string
  current: boolean
  highlight?: boolean
}

// Current engagements first, then completed ones, newest first.
const entries: Entry[] = [
  {
    dates: 'January 2026 - Present',
    role: 'Undergraduate Researcher',
    company: 'RaDA Lab, UT Dallas · Dr. Yanwen Xu',
    desc: 'Physics-Informed LSTM surrogate models for a hydropower digital twin. R2 up to 0.893, 20 to 40 percent RMSE reduction over baselines across five Western U.S. watersheds. First-author paper in preparation for NAPS 2026.',
    current: true,
  },
  {
    dates: 'January 2026 - Present',
    role: 'Industry Director',
    company: 'GDSC UTD',
    desc: 'Leads external partnerships, sponsor negotiations, and finance. Secured $12K+ in sponsorships for HackDSC 2026, scaling to 350+ participants.',
    current: true,
  },
  {
    dates: 'September 2025 - Present',
    role: 'Software Engineer',
    company: 'Nebula Labs, UTD',
    desc: 'Open-source student platforms (UTD Trendz, UTD Notebook) serving 10,000+ students. Node.js, MongoDB, and React in agile sprints with 30+ developers.',
    current: true,
  },
  {
    dates: 'Since 2024',
    role: 'Qiskit Advocate',
    company: 'IBM Quantum',
    desc: 'Active contributor to the Qiskit open-source ecosystem (about 540 advocates globally). Completed the QAMP Research Mentorship track (5 percent acceptance) on TDDFT and Quantum ML.',
    current: true,
  },
  {
    dates: 'June 16 - 17, 2026',
    role: 'YC AI Startup School',
    company: 'Y Combinator · Chase Center, San Francisco',
    desc: 'One of the builders selected for the invite-only cohort alongside NeurIPS authors and Olympiad medalists. Two days of sessions with Jensen Huang, Sam Altman, Jeff Dean, Alexandr Wang, and Chelsea Finn.',
    current: false,
    highlight: true,
  },
  {
    dates: 'January - May 2026',
    role: 'Backend ML Lead',
    company: 'ACM Projects UTD',
    desc: 'End-to-end ML backend for SafeWay: two-stage CatBoost + XGBoost hurdle model, AUC 0.891, 2.3M+ crash records across 29,500 intersections. FastAPI on Cloud Run with nightly retraining.',
    current: false,
  },
  {
    dates: 'August - December 2025',
    role: 'Post-Quantum Crypto Research',
    company: 'ACM Research UTD',
    desc: 'Recurrent Graph Neural Network decoder for RLCE cryptographic failure modes, trained on 15M+ test cases. 30x improvement in decoding accuracy. 1st Place, ACM UTD Fall 2025 Research Symposium.',
    current: false,
  },
  {
    dates: 'May - July 2024',
    role: 'Research Intern',
    company: 'UTD Quantum Lab · Dr. Basu, Dr. Koludrubetz',
    desc: 'Quantum circuit verification using ZX calculus and pyZX, with open-source bug fixes to pyZX. Qiskit 1.x circuit implementation and validation.',
    current: false,
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.timeline-entry').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          x: i % 2 === 0 ? -28 : 28,
          duration: 0.55,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="relative py-24 md:py-36">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <p className="obs-label">
          OBS 03 <span className="obs-dim">/ observation log</span>
        </p>
        <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight mb-3">
          The log, in order
        </h2>
        <p className="text-white/45 font-light text-lg mb-16 max-w-2xl">
          What I am working on now, then everything that led here.
        </p>

        <div className="relative">
          {/* central spine on desktop, left spine on mobile */}
          <div className="absolute left-[9px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, #ffb020, rgba(167,139,250,0.4) 70%, transparent)' }} />

          <div className="flex flex-col gap-10 md:gap-12">
            {entries.map((e, i) => {
              const left = i % 2 === 0
              return (
                <div key={e.role + e.dates} className="timeline-entry relative md:grid md:grid-cols-2 md:gap-16">
                  {/* dot on the spine */}
                  <span className="absolute left-[5px] md:left-1/2 md:-translate-x-1/2 top-2 w-[9px] h-[9px] rounded-full z-10"
                    style={{
                      background: e.current ? '#ff7a3d' : '#ffb020',
                      boxShadow: e.current ? '0 0 14px rgba(255,122,61,0.9)' : '0 0 8px rgba(255,176,32,0.5)',
                    }} />
                  {/* date beside the dot, opposite the card */}
                  <div className={`hidden md:flex items-start pt-1 ${left ? 'order-2 justify-start pl-2' : 'order-1 justify-end pr-2'}`}>
                    <span className="font-mono text-xs tracking-[0.15em] text-white/45 uppercase">{e.dates}</span>
                  </div>

                  <div className={`pl-8 md:pl-0 ${left ? 'order-1' : 'order-2'}`}>
                    <div className="panel rounded-xl px-6 py-5"
                      style={e.highlight ? { borderColor: 'rgba(255,176,32,0.45)', boxShadow: '0 0 40px rgba(255,176,32,0.08)' } : undefined}>
                      <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/40 mb-2 md:hidden">{e.dates}</p>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
                        <h3 className="text-white font-medium text-lg leading-snug">{e.role}</h3>
                        <span className={`inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] ${e.current ? '' : 'status-archived'}`}
                          style={e.current ? { color: '#ff7a3d' } : undefined}>
                          <span className="w-1.5 h-1.5 rounded-full"
                            style={{ background: e.current ? '#ff7a3d' : 'currentColor', boxShadow: e.current ? '0 0 8px #ff7a3d' : 'none' }} />
                          {e.current ? 'NOW' : 'COMPLETE'}
                        </span>
                      </div>
                      <p className="text-[#a78bfa]/80 text-sm mb-2">{e.company}</p>
                      <p className="text-white/50 text-sm leading-relaxed">{e.desc}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
