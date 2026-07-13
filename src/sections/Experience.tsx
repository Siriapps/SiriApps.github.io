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

// Ordered like the resume: YC on top, then current roles by recency,
// then recently completed work. Dates mirror LinkedIn exactly.
const recent: Entry[] = [
  {
    dates: 'July 25 - 26, 2026',
    role: 'YC AI Startup School',
    company: 'Y Combinator · San Francisco',
    desc: 'Selected for the invite-only cohort at Chase Center alongside NeurIPS authors and Olympiad medalists. Two days with the people building the frontier, centered on the questions I care about most: how agents will reshape the web, how physics-informed models reach production, and where quantum computing fits next.',
    status: 'UPCOMING',
    highlight: true,
  },
  {
    dates: 'July 13 - 19, 2026',
    role: 'Qiskit Global Summer School 2026',
    company: 'IBM Quantum',
    desc: 'Returning to QGSS after earning the Quantum Excellence certificate in 2021 and the 2025 advanced badge. A week on error correction, transpilation, and utility-scale quantum workloads.',
    status: 'UPCOMING',
  },
  {
    dates: 'January 2026 - Present',
    role: 'Undergraduate AI Research Assistant',
    company: 'RIDE Program, UT Dallas · Dr. Yanwen Xu',
    desc: 'Selected for the Research Internships in Design Engineering program at the intersection of machine learning, physics-informed AI, and engineering design. Researching digital twins and surrogate modeling to cut simulation cost while staying faithful to physical constraints; Physics-Informed LSTMs reduce RMSE 20 to 40 percent across five Western U.S. watersheds. First-author paper in preparation for NAPS 2026.',
    status: 'NOW',
  },
  {
    dates: 'June 2026 - Present',
    role: 'AI 301 · Open-Source Contributor',
    company: 'CodePath',
    desc: 'Advanced AI engineering course with an open-source track: contributing fixes to Lance and LanceDB, the multimodal retrieval stack, including a production index bug diagnosis in the Rust search index builder.',
    status: 'NOW',
  },
  {
    dates: 'May 2026 - Present',
    role: 'Industry Director',
    company: 'Google Developers Group on Campus UTD',
    desc: 'Leads partner outreach, sponsorship negotiation, and event logistics for HackDSC 2026, securing $12K+ in sponsorships and scaling toward 350+ participants.',
    status: 'NOW',
  },
  {
    dates: '2026 Cohort',
    role: 'WISER Program',
    company: 'WISER Quantum',
    desc: 'Quantum computing research and mentorship program connecting quantum algorithms to real workloads.',
    status: 'NOW',
  },
  {
    dates: 'September 2025 - Present',
    role: 'Qiskit Advocate',
    company: 'IBM Quantum',
    desc: 'Recognized member of the global community supporting the Qiskit open-source ecosystem. Progressing through the tiered advocate structure with access to mentorship, exclusive training, and IBM Quantum hardware; contributes workshops, educational content, code, and mentoring for newer members.',
    status: 'NOW',
  },
  {
    dates: 'September 2025 - Present',
    role: 'Software Engineer',
    company: 'Nebula Labs, UTD',
    desc: 'Ships features for open-source student platforms (UTD Trendz, UTD Notebook) serving 10,000+ students. Node.js, MongoDB, and React in agile sprints with 30+ developers.',
    status: 'NOW',
  },
  {
    dates: 'January - May 2026',
    role: 'Back End Developer',
    company: 'ACM, Association for Computing Machinery',
    desc: 'Built SafeWay, a safety-first navigation app: two-stage CatBoost + XGBoost hurdle model reaching AUC 0.891 and R2 0.745 on 2.3M+ crash records, with SHAP explainability and nightly CI/CD retraining. FastAPI backend on Google Cloud Run with DuckDB over GCS Parquet scores routes across 29,500 Chicago intersections in real time.',
    status: 'COMPLETE',
  },
  {
    dates: 'January - April 2026',
    role: 'Machine Learning Engineer',
    company: 'GDG UTD Sprints',
    desc: 'Cut average interview prep time about 40 percent by engineering Remix, an AI assistant powered by a FAISS-based RAG pipeline with LangChain, Gemini APIs, and a relational SQL data layer.',
    status: 'COMPLETE',
  },
  {
    dates: '2025',
    role: 'Conference Attendee',
    company: 'IBM Quantum Developer Conference',
    desc: 'On the floor with IBM superconducting quantum systems and the engineers who build them, connecting Qiskit work to production-scale hardware.',
    status: 'COMPLETE',
  },
  {
    dates: 'August - November 2025',
    role: 'CS Researcher',
    company: 'ACM, Association for Computing Machinery',
    desc: 'Applied research on post-quantum cryptography: a custom Recurrent Graph Neural Network that decodes encrypted RLCE syndromes by learning parity relationships from the public key structure. 30x improvement in successful decoding over the benchmark; 1st Place at the Fall 2025 ACM Research Symposium.',
    status: 'COMPLETE',
  },
]

const earlier: Entry[] = [
  {
    dates: 'June - August 2024',
    role: 'Research Lab Intern',
    company: 'UTD Quantum Lab · Dr. Basu, Dr. Koludrubetz',
    desc: 'Worked with Qiskit 1.x and pyZX, the ZX Calculus software: fixed critical circuit-verification bugs and added configurations for missing gates, contributed upstream.',
    status: 'COMPLETE',
  },
  {
    dates: 'June - August 2024',
    role: 'Independent Student Researcher',
    company: 'The Coding School · TRAIN AI',
    desc: '1 of 10 selected from 2,000+ U.S. high school students. Built StreamSign, translating video audio to Indian Sign Language animations using Flask, Google TTS, and a custom NLP preprocessing algorithm.',
    status: 'COMPLETE',
  },
  {
    dates: 'August 2023 - June 2024',
    role: 'Young Researcher',
    company: 'The New York Academy of Sciences',
    desc: 'Program with a 6 to 10 percent global acceptance rate. With an international team of six, built WasteWatch, an AI system for efficient waste sorting. Also part of the 1000 Girls, 1000 Futures mentoring program.',
    status: 'COMPLETE',
  },
  {
    dates: '2021 - May 2024',
    role: 'Qiskit Bronze Localization Contributor',
    company: 'IBM Quantum',
    desc: 'Translated Qiskit documentation as part of the Hindi and French localization communities.',
    status: 'COMPLETE',
  },
  {
    dates: 'June - August 2023',
    role: 'Student Researcher',
    company: 'Incognito Blueprints',
    desc: 'Safe-navigation research for women and students in new cities, with a team of five across India and Canada. A* based routing over crime rate, street light density, and socio-economic data for cities like Boston.',
    status: 'COMPLETE',
  },
  {
    dates: '2020 - 2021',
    role: 'Early Quantum Training',
    company: 'The Coding School and IBM Quantum',
    desc: 'Introduction to Quantum Computing with Qubit by Qubit, then QGSS 2021 on Quantum Machine Learning with a 100 percent final score and the Quantum Excellence certificate, plus the IBM Certified Quantum Developer credential at age 13.',
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
          What is next and what is active, then the work that led here.
          Earlier years fold out below.
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
