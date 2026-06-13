import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    period: 'July 2026',
    role: 'YC AI Startup School 2026',
    company: 'Y Combinator · Chase Center, San Francisco',
    desc: 'Hand-selected builder in invite-only cohort alongside NeurIPS authors, Olympiad medalists, and top CS talent globally. Sessions with Jensen Huang, Sam Altman, Jeff Dean, Alexandr Wang, and Chelsea Finn.',
    highlight: true,
  },
  {
    period: 'Jan 2026 – Present',
    role: 'Undergraduate Researcher',
    company: 'RaDA Lab, UT Dallas · Dr. Yanwen Xu',
    desc: 'Building Physics-Informed LSTM surrogate models for a hydropower digital twin. R² up to 0.893, 20–40% RMSE reduction over standard baselines across five Western U.S. watersheds. First-author paper in preparation for NAPS 2026.',
  },
  {
    period: 'Jan 2026 – Present',
    role: 'Industry Director',
    company: 'GDSC UTD',
    desc: 'Leads all external partnerships, sponsor negotiations, and finance. Secured $12K+ in sponsorships for HackDSC \'26, scaling to 350+ participants. Built Remix — an AI mock interview assistant using FAISS RAG, LangChain, and Gemini 2.5 Flash.',
  },
  {
    period: '~2024 – Present',
    role: 'Qiskit Advocate',
    company: 'IBM Quantum',
    desc: 'Active contributor to the Qiskit open-source ecosystem (~540 advocates globally). Completed QAMP Research Mentorship track (5% acceptance) on TDDFT and Quantum ML.',
  },
  {
    period: 'Sep 2025 – Present',
    role: 'Software Engineer',
    company: 'Nebula Labs, UTD',
    desc: 'Contributing to open-source student platforms (UTD Trendz, UTD Notebook) serving 10,000+ students. Node.js, MongoDB, React in agile sprints with 30+ developers.',
  },
  {
    period: 'Jan – May 2026',
    role: 'Backend ML Lead',
    company: 'ACM Projects UTD',
    desc: 'End-to-end ML backend for SafeWay: two-stage CatBoost + XGBoost hurdle model, AUC 0.891, R² 0.745, 2.3M+ crash records, 29,500 intersections. FastAPI on Cloud Run with nightly GitHub Actions retraining.',
  },
  {
    period: 'Aug – Dec 2025',
    role: 'Post-Quantum Cryptography Research',
    company: 'ACM Research UTD',
    desc: 'Built a Recurrent Graph Neural Network decoder for RLCE cryptographic failure modes, trained on 15M+ test cases. 30x improvement in decoding accuracy. 1st Place, ACM UTD Fall 2025 Research Symposium.',
  },
  {
    period: 'May – Jul 2024',
    role: 'Research Intern',
    company: 'UTD Quantum Lab · Dr. Basu, Dr. Koludrubetz',
    desc: 'Quantum circuit verification using ZX calculus and pyZX. Open-source bug fixes to pyZX. Qiskit 1.x circuit implementation and validation.',
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.exp-title', {
        y: 40, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '#experience', start: 'top 80%' },
      })
      gsap.from('.exp-entry', {
        y: 30, duration: 0.5, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.exp-timeline', start: 'top 85%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-28 md:py-40 relative"
      style={{ background: '#0b080c' }}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <div className="exp-title mb-16">
          <p className="section-label">TIMELINE</p>
          <h2 className="font-display text-5xl md:text-7xl text-white tracking-tight">
            My Career &{' '}
            <span className="gradient-text" style={{ fontStyle: 'italic' }}>Experience</span>
          </h2>
        </div>

        <div className="exp-timeline relative">
          <div className="absolute left-[140px] md:left-[200px] top-0 bottom-0 w-[2px] hidden md:block"
            style={{
              background: 'linear-gradient(to bottom, transparent, #c2a4ff 10%, #c2a4ff 90%, transparent)',
              opacity: 0.25,
            }}
          />
          <div className="absolute left-4 top-0 bottom-0 w-[2px] md:hidden"
            style={{
              background: 'linear-gradient(to bottom, transparent, #c2a4ff 10%, #c2a4ff 90%, transparent)',
              opacity: 0.2,
            }}
          />

          <div className="flex flex-col gap-6">
            {experiences.map((entry, i) => (
              <div key={i} className="exp-entry relative flex gap-6 md:gap-10">
                <div className="hidden md:block w-[180px] shrink-0 text-right pr-8 pt-1">
                  <span className="text-sm text-white/45 font-medium tracking-wide">
                    {entry.period}
                  </span>
                </div>

                <div className="absolute left-[136px] md:left-[196px] top-2 w-[10px] h-[10px] rounded-full z-10 hidden md:block"
                  style={{
                    background: entry.highlight ? '#c2a4ff' : 'rgba(194,164,255,0.3)',
                    boxShadow: entry.highlight ? '0 0 12px rgba(194,164,255,0.5)' : 'none',
                  }}
                />
                <div className="absolute left-[11px] top-2 w-[8px] h-[8px] rounded-full z-10 md:hidden"
                  style={{
                    background: entry.highlight ? '#c2a4ff' : 'rgba(194,164,255,0.3)',
                    boxShadow: entry.highlight ? '0 0 10px rgba(194,164,255,0.5)' : 'none',
                  }}
                />

                <div className="flex-1 pl-8 md:pl-10 group">
                  <span className="text-xs text-white/40 font-medium tracking-wider uppercase md:hidden block mb-2">
                    {entry.period}
                  </span>

                  <div
                    className="rounded-xl p-6 md:p-8 transition-all duration-300 hover:bg-white/[0.03]"
                    style={{ border: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <h4 className="text-lg md:text-xl font-semibold text-white mb-1 group-hover:text-[#c2a4ff] transition-colors duration-300">
                      {entry.role}
                    </h4>
                    <p className="text-[#c2a4ff]/60 text-sm md:text-base font-medium mb-3">{entry.company}</p>
                    <p className="text-white/55 text-sm md:text-base leading-relaxed">{entry.desc}</p>
                    {entry.highlight && (
                      <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                        style={{ background: 'rgba(194,164,255,0.1)', color: '#c2a4ff', border: '1px solid rgba(194,164,255,0.15)' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c2a4ff] animate-pulse" />
                        Featured
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
