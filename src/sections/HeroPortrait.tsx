import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '15+', label: 'Projects' },
  { value: '4×', label: 'Hack Wins' },
  { value: '5+', label: 'Research' },
  { value: '3.97', label: 'GPA' },
]

export default function HeroPortrait() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      gsap.from(portraitRef.current, {
        x: -80, duration: 1.2, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 20%',
          scrub: 1,
        },
      })

      gsap.from(textRef.current, {
        x: 80, duration: 1.2, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'top 20%',
          scrub: 1,
        },
      })
    })

    mm.add('(max-width: 767px)', () => {
      gsap.from(portraitRef.current, {
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })

      gsap.from(textRef.current, {
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
      })
    })

    gsap.from('.portrait-stat', {
      y: 40, stagger: 0.1, duration: 0.6, ease: 'back.out(1.5)',
      scrollTrigger: {
        trigger: '.portrait-stats',
        start: 'top 85%',
      },
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="snap-section relative h-screen overflow-hidden"
      style={{ background: '#0b080c' }}
    >
      {/* Background glow */}
      <div className="absolute left-[15%] bottom-[10%] w-[600px] h-[700px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(194,164,255,0.2) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-5 md:px-8 h-full flex items-end md:items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-end pb-8 md:pb-0">
          {/* LEFT: Portrait — full height, anchored to bottom */}
          <div ref={portraitRef} className="relative flex items-end justify-center">
            <img
              src="/images/portrait.png"
              alt="Siri Appalaneni"
              className="h-[50vh] md:h-[85vh] w-auto max-w-full lg:max-w-none object-contain"
              style={{
                maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 65%, rgba(0,0,0,0.85) 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 65%, rgba(0,0,0,0.85) 85%, transparent 100%)',
              }}
            />
          </div>

          {/* RIGHT: Text — vertically centered */}
          <div ref={textRef} className="flex flex-col justify-center md:pb-12">
            <p className="section-label mb-4">WHO I AM</p>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.0] mb-6">
              Building<br />
              <span className="gradient-text" style={{ fontStyle: 'italic' }}>What's Next</span>
            </h2>

            <p className="text-white/75 text-[14px] md:text-base leading-relaxed font-light mb-4 max-w-lg">
              I'm Siri — a Computer Science student at UT Dallas{' '}
              <span className="text-white font-medium">(Honors, 3.97 GPA, Minor in Business Intelligence & Analytics, AES scholarship recipient)</span>{' '}
              with a deep interest in agentic AI, physics-informed machine learning, and what it means to build software that genuinely scales.
            </p>

            <p className="text-white/75 text-[14px] md:text-base leading-relaxed font-light mb-4 max-w-lg">
              Right now I'm most excited by a shift I think is underway:{' '}
              <span className="text-white font-medium">browsers, interfaces, and the entire web stack were designed for humans</span>.
              As AI agents become first-class users of software, the entire surface layer starts to break. I find that gap genuinely fascinating.
            </p>

            <p className="text-white/75 text-[14px] md:text-base leading-relaxed font-light mb-6 md:mb-8 max-w-lg">
              Whether it's{' '}
              <span className="text-white font-medium">YC AI Startup School</span> in San Francisco, the{' '}
              <span className="text-white font-medium">IBM Quantum conference</span>, or the{' '}
              <span className="text-white font-medium">Texas Quantum Economy conference</span> — I'm a hackathon enthusiast who thrives on building under pressure, networking with brilliant minds, and shipping ideas that make an impact.
            </p>

            <div className="portrait-stats flex flex-wrap gap-6 md:gap-8">
              {stats.map(({ value, label }) => (
                <div key={label} className="portrait-stat text-center">
                  <div className="text-2xl md:text-4xl font-bold text-white font-display">{value}</div>
                  <div className="text-[11px] text-white/50 uppercase tracking-wider mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
