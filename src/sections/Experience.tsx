import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Entry = {
  dates: string
  role: string
  company: string
  desc: string
  status: 'NOW' | 'UPCOMING' | 'COMPLETE'
  highlight?: boolean
}

// 2025 - 2026: active roles first, then what is about to start, then completed.
const recent: Entry[] = [
  {
    dates: 'January 2026 - Present',
    role: 'Undergraduate Researcher',
    company: 'RaDA Lab, UT Dallas · Dr. Yanwen Xu',
    desc: 'Physics-Informed LSTM surrogate models for a hydropower digital twin. R2 up to 0.893, 20 to 40 percent RMSE reduction over baselines across five Western U.S. watersheds. First-author paper in preparation for NAPS 2026.',
    status: 'NOW',
  },
  {
    dates: 'January 2026 - Present',
    role: 'Industry Director',
    company: 'GDSC UTD',
    desc: 'Leads external partnerships, sponsor negotiations, and finance. Secured $12K+ in sponsorships for HackDSC 2026, scaling to 350+ participants.',
    status: 'NOW',
  },
  {
    dates: 'Summer 2026',
    role: 'AI 301 Student',
    company: 'CodePath',
    desc: 'Advanced AI coursework: agentic systems, evaluation, and applied LLM engineering, alongside a national cohort.',
    status: 'NOW',
  },
  {
    dates: '2026 Cohort',
    role: 'WISER Program',
    company: 'WISER Quantum',
    desc: 'Quantum computing research and mentorship program, deepening the bridge between quantum algorithms and real workloads.',
    status: 'NOW',
  },
  {
    dates: 'September 2025 - Present',
    role: 'Software Engineer',
    company: 'Nebula Labs, UTD',
    desc: 'Open-source student platforms (UTD Trendz, UTD Notebook) serving 10,000+ students. Node.js, MongoDB, and React in agile sprints with 30+ developers.',
    status: 'NOW',
  },
  {
    dates: 'Since July 2024',
    role: 'Young Member',
    company: 'The New York Academy of Sciences',
    desc: 'Selected young member contributing to the Academy\'s research community, following the Young AI Researcher recognition.',
    status: 'NOW',
  },
  {
    dates: 'July 13 - 19, 2026',
    role: 'Qiskit Global Summer School 2026',
    company: 'IBM Quantum',
    desc: 'Third QGSS, after earning Quantum Excellence in the 2025 edition. A week deep in error correction, transpilation, and utility-scale quantum workloads.',
    status: 'UPCOMING',
  },
  {
    dates: 'July 25 - 26, 2026',
    role: 'YC AI Startup School',
    company: 'Y Combinator · San Francisco',
    desc: 'Selected for the invite-only cohort alongside NeurIPS authors and Olympiad medalists. Two days with the people building the frontier, and the questions I care about most: how agentic AI earns trust, how physics-informed models meet production, and where quantum fits in.',
    status: 'UPCOMING',
    highlight: true,
  },
  {
    dates: 'January - May 2026',
    role: 'Backend ML Lead',
    company: 'ACM Projects UTD',
    desc: 'End-to-end ML backend for SafeWay: two-stage CatBoost + XGBoost hurdle model, AUC 0.891, 2.3M+ crash records across 29,500 intersections. FastAPI on Cloud Run with nightly retraining.',
    status: 'COMPLETE',
  },
  {
    dates: '2025',
    role: 'Conference Attendee',
    company: 'IBM Quantum Developer Conference',
    desc: 'On the floor with the systems themselves, superconducting processors included, and the engineers who run them.',
    status: 'COMPLETE',
  },
  {
    dates: 'August - December 2025',
    role: 'Post-Quantum Crypto Research',
    company: 'ACM Research UTD',
    desc: 'Recurrent Graph Neural Network decoder for RLCE cryptographic failure modes, trained on 15M+ test cases. 30x improvement in decoding accuracy. 1st Place, ACM UTD Fall 2025 Research Symposium.',
    status: 'COMPLETE',
  },
]

const earlier: Entry[] = [
  {
    dates: 'Since 2024',
    role: 'Qiskit Advocate',
    company: 'IBM Quantum',
    desc: 'Active contributor to the Qiskit open-source ecosystem (about 540 advocates globally). Completed the QAMP Research Mentorship track (5 percent acceptance) on TDDFT and Quantum ML.',
    status: 'NOW',
  },
  {
    dates: 'May - July 2024',
    role: 'Research Intern',
    company: 'UTD Quantum Lab · Dr. Basu, Dr. Koludrubetz',
    desc: 'Quantum circuit verification using ZX calculus and pyZX, with open-source bug fixes to pyZX. Qiskit 1.x circuit implementation and validation.',
    status: 'COMPLETE',
  },
  {
    dates: '2021 - 2023',
    role: 'Quantum Computing Programs',
    company: 'Qubit by Qubit and IBM Quantum',
    desc: 'Early immersion: Qubit by Qubit coursework, IBM Quantum Challenges (top scorer, 2021 to 2025), and the IBM Certified Quantum Developer credential earned at age 13.',
    status: 'COMPLETE',
  },
]

const statusStyle: Record<Entry['status'], { color: string; glow: boolean }> = {
  NOW: { color: '#ff7a3d', glow: true },
  UPCOMING: { color: '#ffb020', glow: true },
  COMPLETE: { color: '', glow: false },
}

function EntryCard({ e }: { e: Entry }) {
  const s = statusStyle[e.status]
  return (
    <div className="panel rounded-xl px-6 py-5"
      style={e.highlight ? { borderColor: 'rgba(255,176,32,0.45)', boxShadow: '0 0 40px rgba(255,176,32,0.08)' } : undefined}>
      <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/40 mb-2 md:hidden">{e.dates}</p>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
        <h3 className="text-white font-medium text-lg leading-snug">{e.role}</h3>
        <span className={`inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] ${s.color ? '' : 'status-archived'}`}
          style={s.color ? { color: s.color } : undefined}>
          <span className="w-1.5 h-1.5 rounded-full"
            style={{ background: s.color || 'currentColor', boxShadow: s.glow ? `0 0 8px ${s.color}` : 'none' }} />
          {e.status}
        </span>
      </div>
      <p className="text-[#a78bfa]/80 text-sm mb-2">{e.company}</p>
      <p className="text-white/50 text-sm leading-relaxed">{e.desc}</p>
    </div>
  )
}

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
          Experience
        </h2>
        <p className="text-white/45 font-light text-lg mb-16 max-w-2xl">
          2025 to 2026 in full, active roles first. Earlier years fold out below.
        </p>

        <div className="relative">
          <div className="absolute left-[9px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, #ffb020, rgba(167,139,250,0.4) 70%, transparent)' }} />

          <div className="flex flex-col gap-10 md:gap-12">
            {recent.map((e, i) => {
              const left = i % 2 === 0
              return (
                <div key={e.role + e.dates} className="timeline-entry relative md:grid md:grid-cols-2 md:gap-16">
                  <span className="absolute left-[5px] md:left-1/2 md:-translate-x-1/2 top-2 w-[9px] h-[9px] rounded-full z-10"
                    style={{
                      background: statusStyle[e.status].color || '#ffb020',
                      boxShadow: statusStyle[e.status].glow
                        ? `0 0 14px ${statusStyle[e.status].color}`
                        : '0 0 8px rgba(255,176,32,0.4)',
                    }} />
                  <div className={`hidden md:flex items-start pt-1 ${left ? 'order-2 justify-start pl-2' : 'order-1 justify-end pr-2'}`}>
                    <span className="font-mono text-xs tracking-[0.15em] text-white/45 uppercase">{e.dates}</span>
                  </div>
                  <div className={`pl-8 md:pl-0 ${left ? 'order-1' : 'order-2'}`}>
                    <EntryCard e={e} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Earlier years, folded away */}
        <details className="mt-16 group">
          <summary className="cursor-pointer list-none flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] uppercase text-white/40 hover:text-[#ffb020] transition-colors w-fit">
            <span className="w-6 h-6 rounded-full flex items-center justify-center transition-transform group-open:rotate-45"
              style={{ border: '1px solid rgba(255,176,32,0.4)', color: '#ffb020' }}>+</span>
            2024 and earlier
          </summary>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {earlier.map(e => (
              <div key={e.role}>
                <p className="hidden md:block font-mono text-[10px] tracking-[0.15em] text-white/40 uppercase mb-2">{e.dates}</p>
                <EntryCard e={e} />
              </div>
            ))}
          </div>
        </details>
      </div>
    </section>
  )
}
