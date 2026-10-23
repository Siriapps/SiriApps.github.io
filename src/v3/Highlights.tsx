import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { highlights } from './data'
import { reduced, useReveals } from './hooks'

/* A sticky dial turns one full circle over the section; a goo droplet slides to the entry under the reading line. */
export default function Highlights() {
  const ref = useRef<HTMLElement>(null)
  const list = useRef<HTMLOListElement>(null)
  const lead = useRef<HTMLElement>(null)
  const tail = useRef<HTMLElement>(null)
  const arc = useRef<SVGCircleElement>(null)
  const [on, setOn] = useState(0)
  useReveals(ref)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const sec = ref.current, ul = list.current
    if (!sec || !ul) return
    // desktop: the screen pins and the list glides up through it, so the dial and the droplet stay put
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1000px) and (prefers-reduced-motion: no-preference)', () => {
      const dist = () => Math.max(0, ul.scrollHeight - (window.innerHeight - 220))
      const tw = gsap.to(ul, { y: () => -dist(), ease: 'none', scrollTrigger: { trigger: sec, start: 'top top', end: () => `+=${dist() + 200}`, pin: true, scrub: 0.5, invalidateOnRefresh: true } })
      return () => { tw.scrollTrigger?.kill(); tw.kill() }
    })
    return () => mm.revert()
  }, [])
  useEffect(() => {
    const sec = ref.current, ul = list.current
    if (!sec || !ul || !lead.current || !tail.current) return
    const still = reduced()
    const toLead = still ? null : gsap.quickTo(lead.current, 'y', { duration: 0.55, ease: 'back.out(1.6)' })
    const toTail = still ? null : gsap.quickTo(tail.current, 'y', { duration: 0.95, ease: 'power3.out' })
    let last = -1, raf = 0
    const f = () => {
      raf = 0
      const r = sec.getBoundingClientRect(), vh = window.innerHeight
      if (r.bottom < -200 || r.top > vh + 200) return
      const prog = Math.min(1, Math.max(0, (vh * 0.5 - r.top) / (r.height - vh * 0.3)))
      if (arc.current && !still) arc.current.style.transform = `rotate(${prog * 360 - 90}deg)`
      const items = Array.from(ul.children) as HTMLElement[]
      const line = vh * 0.45
      let best = -1, bd = Infinity
      items.forEach((li, i) => { const b = li.getBoundingClientRect(); const dd = Math.abs((b.top + b.bottom) / 2 - line); if (dd < bd) { bd = dd; best = i } })
      if (best >= 0) {
        if (best !== last) { last = best; setOn(best) }
        // measured on screen, so it stays right while the pinned list glides under it
        const y = items[best].getBoundingClientRect().top - ul.parentElement!.getBoundingClientRect().top + 22
        if (toLead && toTail) { toLead(y); toTail(y + 3) }
      }
    }
    const h = () => { if (!raf) raf = requestAnimationFrame(f) }
    f(); window.addEventListener('scroll', h, { passive: true }); window.addEventListener('resize', h)
    return () => { window.removeEventListener('scroll', h); window.removeEventListener('resize', h) }
  }, [])
  return (
    <section id="highlights" className="sec light highlights" ref={ref}>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b" /><feColorMatrix in="b" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" /></filter>
          <linearGradient id="arcg" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#ff8a3d" /><stop offset="0.5" stopColor="#f06ab0" /><stop offset="1" stopColor="#7c5cff" /></linearGradient>
        </defs>
      </svg>
      <div className="wrap hi-grid">
        <div className="hi-side">
          <h2 className="masked">Highlights</h2>
          <div className="dial" aria-hidden="true">
            <svg viewBox="0 0 240 240">
              <circle className="ring" cx="120" cy="120" r="112" />
              <circle className="arc" ref={arc} cx="120" cy="120" r="112" strokeDasharray="352 704" />
            </svg>
            <div className="num">{String(on + 1).padStart(2, '0')}<small>of {highlights.length}</small></div>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <ol className="hilist" ref={list}>
            {highlights.map((h, i) => (
              <li key={h.t} className={`${h.big ? 'big' : ''} ${on === i ? 'on' : ''}`}><span className="t">{h.t}</span><span className="d">{h.d}</span></li>
            ))}
          </ol>
          <div className="drop" aria-hidden="true"><i className="lead" ref={lead} /><i className="tail" ref={tail} /></div>
        </div>
      </div>
    </section>
  )
}
