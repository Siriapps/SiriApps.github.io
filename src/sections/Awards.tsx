import { useEffect, useRef, useState } from 'react'
import { Trophy, Award, Zap, Star, Medal, BadgeCheck } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Highlights reel: the moments worth replaying.
const reelFrames = [
  { icon: <Trophy size={22} />, place: '1st Place', event: 'HackAI Dallas 2026', link: 'Pondr', accent: '#ffb020' },
  { icon: <Trophy size={22} />, place: '1st Place', event: 'Yale Quantum Hackathon 2025', link: 'BlueQubit Challenge', accent: '#a78bfa' },
  { icon: <Award size={22} />, place: '1st Place', event: 'ACM UTD Research Symposium', link: 'Post-Quantum RGNN', accent: '#ff7a3d' },
  { icon: <Zap size={22} />, place: '3rd + MLH Auth0', event: 'HackUTD 2025 · T-Mobile', link: 'HarmoniQ', accent: '#ffb020' },
  { icon: <Medal size={22} />, place: 'Gold · Rank 5', event: 'ICPC AlgoQueen 2023', link: 'Global top 5', accent: '#a78bfa' },
  { icon: <Star size={22} />, place: 'Qualifier', event: 'Indian National Olympiad in Informatics', link: 'via ZCO 2022', accent: '#ff7a3d' },
  { icon: <Star size={22} />, place: 'Selected', event: 'YC AI Startup School 2026', link: 'invite-only cohort', accent: '#ffb020' },
]

type Category = 'Quantum' | 'AI and Cloud' | 'Design' | 'Programs'
const categories: ('All' | Category)[] = ['All', 'Quantum', 'AI and Cloud', 'Design', 'Programs']

const certifications: {
  name: string; issuer: string; detail: string; logo: string | null; mono: string; cat: Category
}[] = [
  // Quantum
  { name: 'IBM Certified Associate Developer', issuer: 'IBM Professional Certification', detail: 'Quantum Computation using Qiskit · June 2, 2021, at age 13', logo: '/logos/ibm.svg', mono: 'IBM', cat: 'Quantum' },
  { name: 'Qiskit Advocate', issuer: 'IBM Quantum', detail: 'About 540 advocates globally', logo: '/logos/ibm.svg', mono: 'IBM', cat: 'Quantum' },
  { name: 'QAMP Research Mentorship', issuer: 'IBM Quantum', detail: '5 percent acceptance', logo: '/logos/ibm.svg', mono: 'IBM', cat: 'Quantum' },
  { name: 'QGSS 2025 · Quantum Excellence', issuer: 'IBM Quantum', detail: 'Advanced track · August 29, 2025', logo: '/logos/ibm.svg', mono: 'IBM', cat: 'Quantum' },
  { name: 'Quantum Challenge 2021 · Advanced', issuer: 'IBM Quantum', detail: 'June 12, 2021', logo: '/logos/ibm.svg', mono: 'IBM', cat: 'Quantum' },
  { name: 'Quantum Challenge Spring 2023', issuer: 'IBM Quantum', detail: 'Advanced · May 31, 2023', logo: '/logos/ibm.svg', mono: 'IBM', cat: 'Quantum' },
  { name: 'Quantum Challenge 2024', issuer: 'IBM Quantum', detail: 'Advanced · June 19, 2024', logo: '/logos/ibm.svg', mono: 'IBM', cat: 'Quantum' },
  { name: 'Qiskit Localization Contributor', issuer: 'IBM Quantum', detail: 'Bronze Level Translator · November 5, 2021', logo: '/logos/ibm.svg', mono: 'IBM', cat: 'Quantum' },
  // AI and Cloud
  { name: 'Engineer AI Agents with ADK', issuer: 'Google Cloud', detail: 'Skill badge, intermediate · June 22, 2026', logo: '/logos/googlecloud.svg', mono: 'GC', cat: 'AI and Cloud' },
  { name: 'Kaggle Course Certificates', issuer: 'Kaggle', detail: 'Python and machine learning', logo: '/logos/kaggle.svg', mono: 'K', cat: 'AI and Cloud' },
  { name: 'Python for Everybody', issuer: 'University of Michigan · Coursera', detail: 'Specialization', logo: '/logos/coursera.svg', mono: 'UM', cat: 'AI and Cloud' },
  { name: 'Coursera Certificates', issuer: 'Coursera', detail: 'AI and data science coursework', logo: '/logos/coursera.svg', mono: 'C', cat: 'AI and Cloud' },
  // Design
  { name: 'ACP · Graphic Design and Illustration', issuer: 'Adobe', detail: 'Using Adobe Illustrator · valid through April 2027', logo: '/logos/adobe.svg', mono: 'Ai', cat: 'Design' },
  { name: 'ACP · Visual Design', issuer: 'Adobe', detail: 'Valid through April 2027', logo: '/logos/adobe.svg', mono: 'Ae', cat: 'Design' },
  { name: 'ACP · Visual Design Using Photoshop', issuer: 'Adobe', detail: 'Valid through January 2027', logo: '/logos/adobe.svg', mono: 'Ps', cat: 'Design' },
  // Programs
  { name: 'TRAIN AI Fellow', issuer: 'TRAIN AI', detail: '1 of 10 from 2,000+ applicants', logo: null, mono: 'TA', cat: 'Programs' },
  { name: 'Womanium Quantum', issuer: 'Womanium', detail: '2023 and 2025 cohorts', logo: null, mono: 'WQ', cat: 'Programs' },
  { name: 'Young Member', issuer: 'NY Academy of Sciences', detail: 'Since July 31, 2024', logo: null, mono: 'NY', cat: 'Programs' },
  { name: 'Expedition Program', issuer: 'Ernst and Young', detail: 'Selected participant', logo: null, mono: 'EY', cat: 'Programs' },
  { name: 'iQuHACK Participant', issuer: 'MIT', detail: '3x participant', logo: null, mono: 'MIT', cat: 'Programs' },
  { name: 'CodePath AI 301', issuer: 'CodePath', detail: 'Advanced AI, Summer 2026', logo: null, mono: 'CP', cat: 'Programs' },
  { name: 'WISER Program', issuer: 'WISER Quantum', detail: '2026 cohort', logo: null, mono: 'W', cat: 'Programs' },
  { name: 'Qiskit Summer Schools', issuer: 'IBM Quantum', detail: '2021, 2023, 2025, 2026', logo: '/logos/ibm.svg', mono: 'IBM', cat: 'Programs' },
  { name: 'UIL Districts Silver', issuer: 'UIL Texas', detail: 'Computer science', logo: null, mono: 'UIL', cat: 'Programs' },
  { name: 'AES Full Merit Scholarship', issuer: 'AES', detail: 'Full ride', logo: null, mono: 'AES', cat: 'Programs' },
]

function ReelFrame({ f }: { f: (typeof reelFrames)[number] }) {
  return (
    <div className="reel-frame shrink-0 w-64 rounded-lg p-5 mx-2" style={{ border: `1px solid ${f.accent}40` }}>
      <div className="flex items-center justify-between mb-3">
        <span className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${f.accent}16`, color: f.accent }}>
          {f.icon}
        </span>
        <span className="font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-1 rounded-full"
          style={{ color: f.accent, border: `1px solid ${f.accent}40` }}>
          {f.place}
        </span>
      </div>
      <p className="text-white text-sm font-medium leading-snug mb-1">{f.event}</p>
      <p className="font-mono text-[10px] text-white/35">{f.link}</p>
    </div>
  )
}

export default function Awards() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [speed, setSpeed] = useState<1 | 2>(1)
  const [filter, setFilter] = useState<(typeof categories)[number]>('All')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cert-card', {
        y: 24, opacity: 0, duration: 0.45, stagger: 0.04, ease: 'power3.out',
        scrollTrigger: { trigger: '.certs-grid', start: 'top 85%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const shown = filter === 'All' ? certifications : certifications.filter(c => c.cat === filter)

  return (
    <section id="certifications" ref={sectionRef} className="relative py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <p className="obs-label">
          OBS 06 <span className="obs-dim">/ highlights reel</span>
        </p>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight mb-3">
              The moments worth replaying
            </h2>
            <p className="text-white/45 font-light text-lg max-w-2xl">
              An old reel of the wins. Hover to pause the projector.
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-white/35">
            <span>Speed</span>
            {[1, 2].map(s => (
              <button
                key={s}
                onClick={() => setSpeed(s as 1 | 2)}
                aria-pressed={speed === s}
                className="px-3 py-1.5 rounded-full transition-colors"
                style={speed === s
                  ? { background: '#ffb020', color: '#070609' }
                  : { border: '1px solid rgba(150,150,150,0.35)' }}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="filmstrip overflow-hidden mb-20">
        <div className="reel-track flex w-max" style={{ ['--reel-speed' as string]: speed === 1 ? '40s' : '20s' }}>
          {[...reelFrames, ...reelFrames].map((f, i) => (
            <ReelFrame key={i} f={f} />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="flex items-baseline gap-4 mb-2">
          <h3 className="font-display font-bold text-2xl md:text-3xl text-white">
            Certifications and programs
          </h3>
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#ffb020]/70 uppercase">
            {certifications.length} on file
          </span>
        </div>
        {/* ponytail: add her Credly profile URL here when she sends it */}
        <p className="text-white/40 font-light mb-6">
          Verified credentials, organized by constellation.
        </p>

        {/* category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className="px-4 py-2 rounded-full font-mono text-[11px] tracking-[0.12em] uppercase transition-colors"
              style={filter === cat
                ? { background: '#ffb020', color: '#070609' }
                : { border: '1px solid rgba(150,150,150,0.35)' }}
            >
              {cat}
              <span className="opacity-50 ml-1.5">
                {cat === 'All' ? certifications.length : certifications.filter(c => c.cat === cat).length}
              </span>
            </button>
          ))}
        </div>

        <div className="certs-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shown.map(({ name, issuer, detail, logo, mono }) => (
            <div key={name} className="cert-card panel rounded-xl px-5 py-4 flex items-center gap-4">
              <div className="w-12 h-12 shrink-0 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(150,150,150,0.08)', border: '1px solid rgba(150,150,150,0.15)' }}>
                {logo ? (
                  <img src={logo} alt={`${issuer} logo`} className="cert-logo w-7 h-7" />
                ) : (
                  <span className="font-display font-bold text-xs text-[#ffb020]">{mono}</span>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-white/90 text-sm font-medium leading-snug flex items-center gap-1.5">
                  {name}
                  <BadgeCheck size={13} className="shrink-0 text-[#a78bfa]" />
                </p>
                <p className="font-mono text-[10px] text-white/35 mt-1">{issuer} · {detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
