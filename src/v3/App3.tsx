import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './v3.css'
import Reel from './Reel'
import Nav from './Nav'
import Hero from './Hero'
import About from './About'
import Cities from './Cities'
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
    return () => { gsap.ticker.remove(tick); lenis.destroy() }
  }, [])
  return (
    <div className="v3">
      <Reel onEnd={() => setReady(true)} />
      <Nav />
      <main>
        <Hero ready={ready} />
        <About />
        <Cities />
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
