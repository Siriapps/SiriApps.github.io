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
import Stats from './Stats'
import Highlights from './Highlights'
import Experience from './Experience'
import Ribbon from './Ribbon'
import Skills from './Skills'
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
        gsap.fromTo(w, { y: 60, opacity: 0.6 }, { y: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: w, start: 'top 95%', end: 'top 60%', scrub: 0.4 } })
        gsap.to(w, { y: -40, ease: 'none', scrollTrigger: { trigger: w, start: 'bottom 40%', end: 'bottom -5%', scrub: 0.4 } })
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
        <Stats />
        <ReelScrub />
        <Highlights />
        <Experience />
        <Ribbon />
        <Skills />
        <Connect />
      </main>
    </div>
  )
}
