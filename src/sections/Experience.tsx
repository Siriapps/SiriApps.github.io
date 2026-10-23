import { useEffect, useRef, useState } from 'react'

type Entry = {
  dates: string
  role: string
  company: string
  desc: string
  status: 'NOW' | 'UPCOMING' | 'COMPLETE'
}

// Ordered like the resume: YC on top, then current roles by recency,
// then recently completed work. Dates mirror LinkedIn exactly.
const recent: Entry[] = [
  {
    dates: '2026 - Present',
    role: 'Women Techmakers Ambassador',
    company: 'Google Women Techmakers',
    desc: "Ambassador in Google's global program for women in technology, bringing workshops, talks, and a welcoming room to UT Dallas builders.",
    status: 'NOW',
  },
  {
    dates: 'June 2026 - Present',
    role: 'Founder and Software Engineer',
    company: 'Vizent · Richardson, TX',
    desc: 'Building a real-time vision-language agent: point a camera or share a screen and it watches live, answers mid-task, and shows the fix on screen across 3 verticals with 0 task-specific fine-tuning. Sustains 12 fps at sub-100 ms latency, cut CPU load about 20x by moving inference in-browser, guarded by 95 automated tests.',
    status: 'NOW',
  },
  {
    dates: 'July 25 - 26, 2026',
    role: 'YC AI Startup School',
    company: 'Y Combinator · San Francisco',
    desc: 'Selected for the invite-only cohort at Chase Center alongside NeurIPS authors and Olympiad medalists. Two days with the people building the frontier, centered on the questions I care about most: how agents will reshape the web, how physics-informed models reach production, and where quantum computing fits next.',
    status: 'COMPLETE',
  },
  {
    dates: 'July 13 - 19, 2026',
    role: 'Qiskit Global Summer School 2026',
    company: 'IBM Quantum',
    desc: 'Returning to QGSS after earning the Quantum Excellence certificate in 2021 and the 2025 advanced badge. A week on error correction, transpilation, and utility-scale quantum workloads.',
    status: 'COMPLETE',
  },
  {
    dates: 'January 2026 - Present',
    role: 'Undergraduate AI Research Assistant',
    company: 'RIDE Program, UT Dallas · Dr. Yanwen Xu',
    desc: 'Selected for the Research Internships in Design Engineering program at the intersection of machine learning, physics-informed AI, and engineering design. Researching digital twins and surrogate modeling to cut simulation cost while staying faithful to physical constraints; Physics-Informed LSTMs reduce RMSE 20 to 40 percent across five Western U.S. watersheds. First-author IEEE paper accepted to the North American Power Symposium (NAPS 2026) with 93.8 to 94.6 percent empirical forecast coverage.',
    status: 'NOW',
  },
  {
    dates: 'June - August 2026',
    role: 'AI 301 · Open-Source Contributor',
    company: 'CodePath',
    desc: 'Advanced AI engineering course with an open-source track: contributing fixes to Lance and LanceDB, the multimodal retrieval stack, including a production index bug diagnosis in the Rust search index builder, landed upstream as PR #7330 with a regression test across 635 tests.',
    status: 'COMPLETE',
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

// The street has two blocks. Lit boards are roles held today; the plain
// boards after the second sign are finished work, newest first.
const now = recent.filter(e => e.status === 'NOW')
const before = [...recent.filter(e => e.status !== 'NOW'), ...earlier]

function Board({ e, live }: { e: Entry; live: boolean }) {
  return (
    <li className="shrink-0 w-full md:w-[460px] flex flex-col">
      <article className={`rounded-xl p-5 md:p-6 ${live ? 'xp-live' : 'xp-before'}`}>
        <p className="text-sm font-medium" style={{ color: live ? '#22e4ff' : '#ffb020' }}>{e.dates}</p>
        <h3 className="font-display font-bold text-xl md:text-2xl text-white leading-tight mt-1">{e.role}</h3>
        <p className="text-sm text-[#c9b8ff] mt-1">{e.company}</p>
        <p className="text-white/85 text-[15px] leading-relaxed mt-3">{e.desc}</p>
      </article>
      <div className="hidden md:flex justify-between px-14 h-14" aria-hidden="true">
        <span className="w-1.5 bg-gradient-to-b from-[#4a3a6a] to-[#1c1430]" />
        <span className="w-1.5 bg-gradient-to-b from-[#4a3a6a] to-[#1c1430]" />
      </div>
    </li>
  )
}

function Sign({ title, note, innerRef }: { title: string; note: string; innerRef?: React.Ref<HTMLLIElement> }) {
  return (
    <li ref={innerRef} className="shrink-0 md:w-[280px] md:pb-20 pt-6 md:pt-0 scroll-mt-24">
      <h3 className="font-display font-extrabold text-white leading-none" style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}>{title}</h3>
      <p className="text-white/75 mt-2 max-w-[16rem]">{note}</p>
    </li>
  )
}

export default function Experience() {
  const wrap = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLUListElement>(null)
  const beforeSign = useRef<HTMLLIElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const [block, setBlock] = useState<'now' | 'before'>('now')

  useEffect(() => {
    const el = wrap.current, tr = track.current
    if (!el || !tr) return
    const wide = () => window.innerWidth >= 768
    let dist = 0
    let raf = 0
    // one pixel of scroll moves the street one pixel, so it feels like walking
    const layout = () => {
      if (!wide()) { el.style.height = ''; tr.style.transform = ''; return }
      dist = tr.scrollWidth - window.innerWidth
      el.style.height = `${dist + window.innerHeight}px`
    }
    const render = () => {
      if (!wide()) return
      const x = Math.min(dist, Math.max(0, -el.getBoundingClientRect().top))
      tr.style.transform = `translate3d(${-x}px, 0, 0)`
      if (bar.current) bar.current.style.transform = `scaleX(${dist ? x / dist : 0})`
      const sign = beforeSign.current
      if (sign) setBlock(x + window.innerWidth * 0.5 > sign.offsetLeft ? 'before' : 'now')
    }
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(render) }
    const onResize = () => { layout(); render() }
    onResize()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const go = (b: 'now' | 'before') => {
    const el = wrap.current, sign = beforeSign.current
    if (!el || !sign) return
    if (window.innerWidth < 768) {
      (b === 'now' ? el : sign).scrollIntoView({ behavior: 'smooth' })
      return
    }
    const x = b === 'now' ? 0 : sign.offsetLeft - window.innerWidth * 0.12
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + x, behavior: 'smooth' })
  }

  return (
    <section id="experience" ref={wrap} className="relative py-24 md:py-0">
      <div className="md:sticky md:top-0 md:h-screen md:overflow-hidden">
        <div className="px-5 md:px-10 md:pt-24 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-white">Experience</h2>
            <p className="text-white/75 mt-2">Keep scrolling to walk the street. What I do now comes first, then what came before.</p>
          </div>
          <div className="flex gap-2" role="group" aria-label="Jump to">
            {([['now', `Now (${now.length})`], ['before', `Before (${before.length})`]] as const).map(([b, label]) => (
              <button key={b} onClick={() => go(b)} aria-pressed={block === b}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${block === b ? 'bg-white text-[#141026]' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <ul ref={track}
          className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12 px-5 md:px-0 md:pl-[8vw] md:pr-[30vw] mt-8 md:mt-0 md:absolute md:bottom-10 md:left-0 md:w-max will-change-transform">
          <Sign title="Now" note={`${now.length} roles I hold today.`} />
          {now.map(e => <Board key={e.role + e.dates} e={e} live />)}
          <Sign innerRef={beforeSign} title="Before" note="Finished work, newest first, back to where it started in 2020." />
          {before.map(e => <Board key={e.role + e.dates} e={e} live={false} />)}
        </ul>

        {/* the road, filling in as you walk */}
        <div className="hidden md:block absolute bottom-0 inset-x-0 h-10 bg-[#0c0818]" aria-hidden="true">
          <div ref={bar} className="h-1 origin-left" style={{ background: 'linear-gradient(90deg,#22e4ff,#ff3ea5)', transform: 'scaleX(0)' }} />
        </div>
      </div>
    </section>
  )
}
