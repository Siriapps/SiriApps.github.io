import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const detections = [
  { label: 'builder', conf: '0.99', top: '12%', left: '6%' },
  { label: 'researcher', conf: '0.97', top: '38%', left: '58%' },
  { label: 'wanderlust', conf: '0.94', top: '68%', left: '10%' },
]

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

        <div className="grid grid-cols-1 md:grid-cols-[minmax(260px,380px)_1fr] gap-10 md:gap-16 items-start">
          {/* Portrait with computer-vision hover frame */}
          <div className="about-reveal group relative rounded-2xl overflow-hidden" tabIndex={0}>
            <img
              src="/images/portrait.png"
              alt="Portrait of Siri Appalaneni"
              className="portrait-mask w-full object-cover"
            />
            {/* CV overlay: brackets, scanline, detections */}
            <div className="cv-frame absolute inset-0 pointer-events-none">
              <div className="absolute inset-3">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#ffb020]" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#ffb020]" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#ffb020]" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#ffb020]" />
              </div>
              <div className="cv-scanline absolute left-3 right-3 h-px"
                style={{ background: 'linear-gradient(to right, transparent, #ffb020, transparent)', boxShadow: '0 0 12px #ffb020' }} />
              {detections.map(d => (
                <div key={d.label} className="absolute font-mono text-[9px] tracking-wider px-1.5 py-0.5"
                  style={{ top: d.top, left: d.left, color: '#ffb020', border: '1px solid rgba(255,176,32,0.6)', background: 'rgba(7,6,9,0.65)' }}>
                  {d.label}: {d.conf}
                </div>
              ))}
              <div className="absolute bottom-3 left-3 right-3 flex justify-between font-mono text-[9px] text-[#a78bfa] px-2">
                <span>MODEL: SIRI-NET v3.97</span>
                <span>FPS: 60</span>
              </div>
            </div>
            <div className="panel absolute bottom-0 inset-x-0 px-5 py-3 font-mono text-[10px] tracking-[0.15em] uppercase text-white/50 flex justify-between md:hidden group-hover:opacity-0 transition-opacity">
              <span>Field note 001</span>
              <span className="text-[#ffb020]">Tap to scan</span>
            </div>
          </div>

          <div>
            <p className="about-reveal text-white/70 text-lg md:text-xl font-light leading-relaxed mb-10">
              CS Honors student at UT Dallas who treats every new field like a new city:
              land, learn the language, build something the locals would actually use.
              So far that itinerary covers agentic AI systems, physics-informed machine
              learning for hydropower digital twins, and post-quantum cryptography research.
            </p>

            {/* Terminal card */}
            <div className="about-reveal terminal-card rounded-xl overflow-hidden mb-10"
              style={{ background: '#0c0912', border: '1px solid rgba(167,139,250,0.18)' }}>
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
