import { useEffect, useRef, useState } from 'react'
import { Trophy, Award, Zap, Star, Medal, BadgeCheck, PlayCircle, Newspaper, PenLine, FileText } from 'lucide-react'
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

// logo: a file under /public/logos, or null for a monogram medallion
const certifications = [
  { name: 'IBM Certified Quantum Developer', issuer: 'IBM', detail: 'Earned at age 13', logo: '/logos/ibm.svg', mono: 'IBM' },
  { name: 'Qiskit Advocate', issuer: 'IBM Quantum', detail: 'About 540 advocates globally', logo: '/logos/ibm.svg', mono: 'IBM' },
  { name: 'QAMP Research Mentorship', issuer: 'IBM Quantum', detail: '5 percent acceptance', logo: '/logos/ibm.svg', mono: 'IBM' },
  { name: 'Qiskit Summer School', issuer: 'IBM Quantum', detail: '2021, 2023, 2025', logo: '/logos/ibm.svg', mono: 'IBM' },
  { name: 'Quantum Challenges Top Scorer', issuer: 'IBM Quantum', detail: '2021 to 2025', logo: '/logos/ibm.svg', mono: 'IBM' },
  { name: 'TRAIN AI Fellow', issuer: 'TRAIN AI', detail: '1 of 10 from 2,000+ applicants', logo: null, mono: 'TA' },
  { name: 'Womanium Quantum', issuer: 'Womanium', detail: '2023 and 2025 cohorts', logo: null, mono: 'WQ' },
  { name: 'Young AI Researcher', issuer: 'NY Academy of Sciences', detail: 'Research recognition', logo: null, mono: 'NY' },
  { name: 'Expedition Program', issuer: 'Ernst and Young', detail: 'Selected participant', logo: null, mono: 'EY' },
  { name: 'iQuHACK Participant', issuer: 'MIT', detail: '3x participant', logo: null, mono: 'MIT' },
  { name: 'UIL Districts Silver', issuer: 'UIL Texas', detail: 'Computer science', logo: null, mono: 'UIL' },
  { name: 'Full Merit Scholarship', issuer: 'AES', detail: 'Full ride', logo: null, mono: 'AES' },
  { name: 'Kaggle Course Certificates', issuer: 'Kaggle', detail: 'Python and machine learning', logo: '/logos/kaggle.svg', mono: 'K' },
  { name: 'Python for Everybody', issuer: 'University of Michigan · Coursera', detail: 'Specialization', logo: '/logos/coursera.svg', mono: 'UM' },
  { name: 'Coursera Certificates', issuer: 'Coursera', detail: 'AI and data science coursework', logo: '/logos/coursera.svg', mono: 'C' },
  { name: 'Qiskit Global Summer School', issuer: 'IBM Quantum', detail: 'The Path to Utility, 2024', logo: '/logos/ibm.svg', mono: 'IBM' },
  { name: 'CodePath AI 301', issuer: 'CodePath', detail: 'Advanced AI, Summer 2026', logo: null, mono: 'CP' },
  { name: 'WISER Program', issuer: 'WISER Quantum', detail: '2026 cohort', logo: null, mono: 'W' },
]

function ReelFrame({ f }: { f: (typeof reelFrames)[number] }) {
  return (
    <div className="shrink-0 w-64 rounded-lg p-5 mx-2"
      style={{ background: '#0d0a13', border: `1px solid ${f.accent}30` }}>
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cert-card', {
        y: 24, opacity: 0, duration: 0.45, stagger: 0.05, ease: 'power3.out',
        scrollTrigger: { trigger: '.certs-grid', start: 'top 85%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

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
          {/* projector speed */}
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
                  : { border: '1px solid rgba(245,242,234,0.2)', color: 'rgba(245,242,234,0.5)' }}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Film strip runs full width, frames loop like a projector */}
      <div className="filmstrip overflow-hidden mb-20">
        <div className="reel-track flex w-max" style={{ ['--reel-speed' as string]: speed === 1 ? '40s' : '20s' }}>
          {[...reelFrames, ...reelFrames].map((f, i) => (
            <ReelFrame key={i} f={f} />
          ))}
        </div>
      </div>

      {/* Featured elsewhere: interviews, press, writing, and papers.
          ponytail: hrefs are '#' until Siri supplies the real links */}
      <div className="max-w-7xl mx-auto px-5 md:px-6 mb-20">
        <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-2">
          Featured elsewhere
        </h3>
        <p className="text-white/40 font-light mb-8">Interviews, press, writing, and papers in progress.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: <PlayCircle size={18} />, kind: 'Video interview', title: 'On building AI systems as a student', where: 'YouTube', href: '#', accent: '#ff7a3d' },
            { icon: <Newspaper size={18} />, kind: 'Press', title: 'T-Mobile features our HackUTD win', where: 'T-Mobile', href: '#', accent: '#a78bfa' },
            { icon: <PenLine size={18} />, kind: 'Blog post', title: 'My quantum journey, from age 13 onward', where: 'Personal blog', href: '#', accent: '#ffb020' },
            { icon: <FileText size={18} />, kind: 'Paper draft', title: 'Physics-Informed LSTM surrogates for hydropower digital twins', where: 'RaDA Lab · NAPS 2026', href: '#', accent: '#a78bfa' },
            { icon: <FileText size={18} />, kind: 'Paper draft', title: 'StreamSign: real-time speech to Indian Sign Language', where: 'TRAIN AI', href: '#', accent: '#ff7a3d' },
          ].map(({ icon, kind, title, where, href, accent }) => {
            const pending = href === '#'
            const inner = (
              <>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${accent}16`, color: accent }}>
                    {icon}
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.15em] uppercase" style={{ color: accent }}>{kind}</span>
                </div>
                <p className="text-white/90 text-sm font-medium leading-snug mb-1">{title}</p>
                <p className="font-mono text-[10px] text-white/35">{where}{pending ? ' · link coming soon' : ''}</p>
              </>
            )
            return pending ? (
              <div key={title} className="panel rounded-xl px-5 py-4">{inner}</div>
            ) : (
              <a key={title} href={href} target="_blank" rel="noopener noreferrer"
                className="panel rounded-xl px-5 py-4 block transition-transform duration-300 hover:-translate-y-1">
                {inner}
              </a>
            )
          })}
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
        <p className="text-white/40 font-light mb-8">
          Verified credentials across quantum, AI, and everything between.
        </p>

        <div className="certs-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map(({ name, issuer, detail, logo, mono }) => (
            <div key={name} className="cert-card panel rounded-xl px-5 py-4 flex items-center gap-4">
              <div className="w-12 h-12 shrink-0 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(245,242,234,0.05)', border: '1px solid rgba(245,242,234,0.1)' }}>
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
