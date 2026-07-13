import { useEffect, useRef } from 'react'
import { Mail } from 'lucide-react'

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)
import { gsap } from 'gsap'

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

const socials = [
  { label: 'GitHub', href: 'https://github.com/Siriapps', icon: <GithubIcon /> },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/a-lakshmi-siri', icon: <LinkedinIcon /> },
  { label: 'Email', href: 'mailto:lakshmisiri783@gmail.com', icon: <Mail size={18} /> },
]

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) return
      gsap.from('.hero-rise', {
        y: 34, opacity: 0, duration: 1, stagger: 0.14, ease: 'power3.out', delay: 0.2,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="home" ref={sectionRef} className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      {/* observatory dome arc overhead */}
      <svg
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[160vw] md:w-[110vw] pointer-events-none"
        viewBox="0 0 1000 260" preserveAspectRatio="none" aria-hidden="true"
      >
        <path d="M 0 0 L 0 40 Q 500 300 1000 40 L 1000 0 Z" fill="var(--dome)" />
        <path d="M 0 42 Q 500 302 1000 42" fill="none" stroke="var(--dome-line)" strokeWidth="1.5" />
        <path d="M 470 62 Q 500 78 530 62 L 522 20 Q 500 30 478 20 Z" fill="rgba(255,176,32,0.08)"
          stroke="rgba(255,176,32,0.35)" strokeWidth="1" />
      </svg>

      <p className="hero-rise font-mono text-[10px] md:text-xs tracking-[0.45em] uppercase text-[#a78bfa]/85 mb-7">
        Tonight's observation
      </p>

      <h1
        className="hero-rise font-display font-extrabold text-center leading-[0.96] tracking-tight"
        style={{ fontSize: 'clamp(3rem, 10.5vw, 8.5rem)' }}
      >
        <span className="block text-white">Lakshmi Siri</span>
        <span className="block accent-text">Appalaneni</span>
      </h1>

      <p className="hero-rise font-mono text-[11px] md:text-xs tracking-[0.2em] uppercase text-[#ffb020]/90 mt-7">
        YC SUS&apos;26 · CS @ UTD · IBM Qiskit Advocate
      </p>

      <p className="hero-rise text-white/55 text-base md:text-xl mt-5 font-light max-w-2xl text-center">
        Building intelligent systems across agentic AI, physics-informed ML,
        and quantum computing, from research papers to production deployments.
      </p>

      {/* socials, visible the moment the site opens */}
      <div className="hero-rise mt-10 flex items-center gap-3">
        {socials.map(({ label, href, icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            aria-label={label}
            className="group flex items-center gap-2 px-4 py-3 rounded-full text-white/60 hover:text-[#070609] transition-all duration-300 hover:scale-105"
            style={{ border: '1px solid rgba(167,139,250,0.25)', background: 'rgba(16,12,22,0.5)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'linear-gradient(100deg, #ffb020, #ff7a3d)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(16,12,22,0.5)' }}
          >
            {icon}
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase hidden sm:inline">{label}</span>
          </a>
        ))}
      </div>

      {/* white light swooping up from the bottom of the hero */}
      <div
        className="absolute bottom-0 inset-x-0 h-[42vh] pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(130% 100% at 50% 105%, rgba(250,248,240,0.2), rgba(250,248,240,0.06) 45%, transparent 72%)' }}
      />

      <div className="hero-rise absolute bottom-10 flex flex-col items-center gap-2">
        <span className="font-mono text-white/25 text-[10px] tracking-[0.4em] uppercase">Begin the observation</span>
        <div className="w-px h-8 bg-white/20 animate-pulse" />
      </div>
    </section>
  )
}
