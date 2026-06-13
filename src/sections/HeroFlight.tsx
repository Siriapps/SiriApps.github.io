import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroFlight() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const wideRef = useRef<HTMLImageElement>(null)
  const windowRef = useRef<HTMLImageElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=250%',
          scrub: 1,
          pin: true,
        },
      })

      tl.to(wideRef.current, {
        scale: 4, duration: 5, ease: 'power2.in',
      }, 0)

      tl.to(titleRef.current, {
        y: -100, opacity: 0, duration: 1.5, ease: 'power2.in',
      }, 0)

      tl.to(overlayRef.current, {
        opacity: 0.5, duration: 2.5,
      }, 1)

      tl.fromTo(windowRef.current,
        { opacity: 0, scale: 1 },
        { opacity: 1, scale: 1.5, duration: 2.5, ease: 'power1.inOut' },
      3)

      tl.to(wideRef.current, {
        opacity: 0, duration: 1.5,
      }, 3.5)

      tl.to(windowRef.current, {
        scale: 3, duration: 2.5, ease: 'power2.in',
      }, 5.5)

      tl.to(overlayRef.current, {
        opacity: 1, duration: 2,
      }, 6)
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="snap-section relative w-full h-screen overflow-hidden"
      style={{ background: '#000' }}
    >
      <img ref={wideRef} src="/images/wideshot.png" alt="Airplane scene"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transformOrigin: '35% 30%' }} />

      <img ref={windowRef} src="/images/window.png" alt="Window sunset"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0, transformOrigin: '50% 50%' }} />

      <div ref={overlayRef} className="absolute inset-0 bg-black/10 z-[1]" />

      <div className="absolute inset-0 z-[2] pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(0,0,0,0.5) 100%)',
      }} />

      <div ref={titleRef} className="absolute inset-0 z-[3] flex flex-col items-center justify-end pb-28">
        <h1 className="font-display text-center text-white leading-[0.95] tracking-tight"
          style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}>
          <span className="block">Lakshmi Siri</span>
          <span className="block gradient-text" style={{ fontStyle: 'italic' }}>Appalaneni</span>
        </h1>
        <p className="text-white/40 text-base md:text-lg mt-6 font-light tracking-wide max-w-2xl text-center px-6">
          Building intelligent systems at the intersection of agentic AI, physics-informed ML, and the future of human-computer interaction.
        </p>
        <div className="mt-12 flex flex-col items-center gap-2">
          <span className="text-white/20 text-[10px] tracking-[0.4em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-white/15 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
