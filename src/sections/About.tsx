import { useRef, useEffect } from 'react'
import type { MouseEvent, SyntheticEvent } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function PhotoReveal({ src, alt, frame, className = '' }: {
  src: string; alt: string; frame: string; className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  const onLeave = () => {
    ref.current?.style.setProperty('--mx', '-300px')
    ref.current?.style.setProperty('--my', '-300px')
  }
  // ponytail: falls back to the old portrait until the new photos land in public/images
  const fallback = (e: SyntheticEvent<HTMLImageElement>) => {
    if (!e.currentTarget.src.endsWith('portrait.png')) e.currentTarget.src = '/images/portrait.png'
  }
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`pixel-reveal relative overflow-hidden rounded-xl ${className}`}
      style={{ border: `5px solid ${frame}`, boxShadow: `0 16px 44px rgba(0,0,0,0.4), 0 0 30px ${frame}22` }}
    >
      <img src={src} alt={alt} className="block w-full" onError={fallback} />
      <img src={src} alt="" aria-hidden="true" className="pixel-overlay absolute inset-0 w-full h-full object-cover" onError={fallback} />
      <div className="pixel-grid absolute inset-0" aria-hidden="true" />
    </div>
  )
}

const terminalLines = [
  { prompt: true, text: 'siri --whoami' },
  { prompt: false, text: 'CS Honors @ UT Dallas · GPA 3.97' },
  { prompt: false, text: 'focus: agentic AI, physics-informed ML, quantum' },
  { prompt: false, text: 'shipped: 15+ projects · 4x hackathon wins' },
  { prompt: true, text: 'siri --status' },
  { prompt: false, text: 'cleared for new missions ✓' },
]

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-reveal', {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })
      gsap.from('.term-line', {
        opacity: 0, duration: 0.3, stagger: 0.25, ease: 'none',
        scrollTrigger: { trigger: '.terminal-card', start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative py-24 md:py-36">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <p className="obs-label about-reveal">
          OBS 01 <span className="obs-dim">/ field notes</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[minmax(280px,420px)_1fr] gap-10 md:gap-16 items-start">
          {/* Two field photos, overlapping diagonally. Hovering reveals a
              black-and-white pixel version only under the cursor. */}
          <div className="about-reveal relative pb-24 pr-10">
            <PhotoReveal
              src="/images/presenting.jpg"
              alt="Presenting quantum encryption research at Symposium Night"
              frame="#ffb020"
              className="w-[82%]"
            />
            <PhotoReveal
              src="/images/quantum.jpg"
              alt="Beside IBM quantum computers at the developer conference"
              frame="#a78bfa"
              className="absolute right-0 bottom-0 w-[58%] rotate-2"
            />
            <p className="absolute -bottom-1 left-0 font-mono text-[9px] tracking-[0.25em] uppercase text-white/30">
              Field photos · hover to develop
            </p>
          </div>

          <div>
            <p className="about-reveal text-white/70 text-lg md:text-xl font-light leading-relaxed mb-10">
              CS Honors student at UT Dallas who treats every new field like a new city:
              land, learn the language, build something the locals would actually use.
              So far that itinerary covers agentic AI systems, physics-informed machine
              learning for hydropower digital twins, and post-quantum cryptography research.
            </p>

            {/* Terminal card */}
            <div className="about-reveal terminal-card rounded-xl overflow-hidden mb-10">
              <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid rgba(167,139,250,0.12)' }}>
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="font-mono text-[10px] text-white/30 ml-2">siri@observatory: ~</span>
              </div>
              <div className="px-5 py-4 font-mono text-[13px] leading-relaxed">
                {terminalLines.map((l, i) => (
                  <p key={i} className="term-line">
                    {l.prompt
                      ? <><span className="text-[#a78bfa]">$ </span><span className="text-[#ffb020]">{l.text}</span></>
                      : <span className="text-white/60">{l.text}</span>}
                  </p>
                ))}
                <p className="term-line"><span className="text-[#a78bfa]">$ </span><span className="inline-block w-2 h-4 align-middle bg-[#ffb020] animate-pulse" /></p>
              </div>
            </div>

            <div className="about-reveal grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { value: '15+', label: 'Projects shipped' },
                { value: '4x', label: 'Hackathon wins' },
                { value: '5+', label: 'Research efforts' },
                { value: '3.97', label: 'GPA' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-display font-bold text-3xl md:text-4xl text-[#ffb020]">{value}</p>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
