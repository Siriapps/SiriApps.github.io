import { useEffect, useRef } from 'react'
import { Trophy, Award, Zap, Star, Medal } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const topAwards = [
  {
    icon: <Trophy size={28} />,
    place: '1st Place',
    event: 'HackAI Dallas 2026',
    desc: 'Pondr — Adaptive learning via knowledge graphs. Dallas AI Challenge winner.',
    accent: '#fbbf24',
  },
  {
    icon: <Trophy size={28} />,
    place: '1st Place',
    event: 'Yale Quantum Hackathon 2025',
    desc: 'BlueQubit Virtual Challenge — Hybrid quantum-classical solution.',
    accent: '#c2a4ff',
  },
  {
    icon: <Award size={28} />,
    place: '1st Place',
    event: 'ACM UTD Research Symposium 2025',
    desc: 'Post-Quantum RGNN — Recurrent Graph Neural Network decoder for RLCE.',
    accent: '#a78bfa',
  },
  {
    icon: <Zap size={28} />,
    place: '3rd Place + MLH Auth0',
    event: 'HackUTD 2025 · T-Mobile',
    desc: 'HarmoniQ — AI analytics command center at NA\'s largest 24hr hackathon.',
    accent: '#f472b6',
  },
  {
    icon: <Medal size={28} />,
    place: 'Gold · Global Rank 5',
    event: 'ICPC AlgoQueen 2023',
    desc: 'International competitive programming. Gold medal with global top-5 ranking.',
    accent: '#fbbf24',
  },
  {
    icon: <Star size={28} />,
    place: 'INOI Qualifier',
    event: 'Indian National Olympiad in Informatics',
    desc: 'Qualified via ZCO 2022. National-level competitive programming recognition.',
    accent: '#60a5fa',
  },
]

const programs = [
  { text: 'TRAIN AI — 1 of 10 from 2,000+', color: '#c2a4ff' },
  { text: 'IBM Qiskit Summer School (2021, 2023, 2025)', color: '#60a5fa' },
  { text: 'Womanium Quantum (2023 & 2025)', color: '#a78bfa' },
  { text: 'NY Academy of Sciences — Young AI Researcher', color: '#f472b6' },
  { text: 'EY Expedition Program', color: '#fbbf24' },
  { text: 'IBM Certified Quantum Developer (age 13)', color: '#34d399' },
  { text: 'MIT iQuHACK — 3× Participant', color: '#60a5fa' },
  { text: 'IBM Quantum Challenges — Top Scorer (2021–2025)', color: '#c2a4ff' },
  { text: 'UIL Districts Silver Medalist', color: '#fbbf24' },
  { text: 'AES Full Merit Scholarship', color: '#f472b6' },
]

export default function Awards() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.awards-title', {
        y: 40, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '#awards', start: 'top 80%' },
      })
      gsap.from('.award-card', {
        y: 40, scale: 0.97, duration: 0.6, stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.awards-grid', start: 'top 85%' },
      })
      gsap.from('.program-chip', {
        scale: 0.8, duration: 0.3, stagger: 0.04,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: '.programs-section', start: 'top 90%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="awards"
      ref={sectionRef}
      className="py-28 md:py-40 relative"
      style={{ background: '#0b080c' }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="awards-title mb-16">
          <p className="section-label">ACHIEVEMENTS</p>
          <h2 className="font-display text-5xl md:text-7xl text-white tracking-tight">
            Hall of{' '}
            <span className="gradient-text" style={{ fontStyle: 'italic' }}>Fame</span>
          </h2>
        </div>

        <div className="awards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {topAwards.map(({ icon, place, event, desc, accent }) => (
            <div
              key={event}
              className="award-card group relative rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2"
              style={{
                background: `linear-gradient(135deg, ${accent}08, ${accent}03)`,
                border: `1px solid ${accent}25`,
              }}
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 0%, ${accent}25, transparent 70%)` }} />
              <div className="relative">
                <div className="flex justify-between items-start mb-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${accent}18`, color: accent }}>
                    {icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
                    style={{ background: `${accent}20`, color: accent, border: `1px solid ${accent}30` }}>
                    {place}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{event}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="programs-section mt-8">
          <h3 className="font-display text-3xl md:text-4xl text-white mb-10 tracking-tight">
            Programs & Recognition
          </h3>
          <div className="flex flex-wrap gap-3">
            {programs.map(({ text, color }) => (
              <span
                key={text}
                className="program-chip px-6 py-3 rounded-full text-base font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(255,255,255,0.92)',
                  color: '#0b080c',
                  border: `2px solid ${color}60`,
                  boxShadow: `0 0 12px ${color}15`,
                }}
              >
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
