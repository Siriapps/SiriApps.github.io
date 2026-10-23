import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './v3.css'
import Reel, { ReelScrub } from './Reel'
import Nav from './Nav'
import Glow from './Glow'
import Cursor from './Cursor'
import Hero from './Hero'
import About from './About'
import Highlights from './Highlights'
import Experience from './Experience'
import Projects from './Projects'
import Skills from './Skills'
import Ideas from './Ideas'
import Connect from './Connect'

gsap.registerPlugin(ScrollTrigger)

export default function App3() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    document.documentElement.classList.add('v3')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Lenis is the one smooth-scroll engine; ScrollTrigger reads from it through gsap's ticker.
    const lenis = new Lenis({ lerp: 0.1 })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t: number) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    // section handoffs: each screen's content glides in as it arrives and lifts away as the next one takes over
    const ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>('.sec:not(.hero):not(.projects):not(.scrub):not(.highlights) > .wrap').forEach(w => {
        gsap.fromTo(w, { y: 70, opacity: 0.2 }, { y: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: w, start: 'top 92%', end: 'top 45%', scrub: 0.4 } })
        gsap.to(w, { y: -50, opacity: 0.3, ease: 'none', scrollTrigger: { trigger: w, start: 'bottom 45%', end: 'bottom -5%', scrub: 0.4 } })
      })
    })
    return () => { ctx.revert(); gsap.ticker.remove(tick); lenis.destroy() }
  }, [])
  return (
    <div className="v3">
      <Reel onEnd={() => setReady(true)} />
      <Glow />
      <Cursor />
      <Nav />
      <main>
        <Hero ready={ready} />
        <About />
        <ReelScrub />
        <Highlights />
        <Experience />
        <Projects />
        <Skills />
        <Ideas />
        <Connect />
      </main>
    </div>
  )
}
