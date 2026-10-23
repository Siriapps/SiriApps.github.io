import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { highlights } from './data'
import { reduced, useReveals } from './hooks'

/* Tile columns drift up and down with scroll; a dot springs with a bounce to the entry nearest the reading line. */
export default function Highlights() {
  const ref = useRef<HTMLElement>(null)
  const list = useRef<HTMLOListElement>(null)
  const dot = useRef<HTMLSpanElement>(null)
  const [on, setOn] = useState(0)
  useReveals(ref)
  useEffect(() => {
    const sec = ref.current, ul = list.current, d = dot.current
    if (!sec || !ul || !d) return
    const cols = Array.from(sec.querySelectorAll<SVGGElement>('.tcol'))
    const dotTo = reduced() ? null : gsap.quickTo(d, 'y', { duration: 0.75, ease: 'back.out(2.2)' })
    let last = -1, raf = 0
    const f = () => {
      raf = 0
      const r = sec.getBoundingClientRect(), vh = window.innerHeight
      if (r.bottom < -200 || r.top > vh + 200) return
      const prog = (vh - r.top) / (vh + r.height)
      if (!reduced()) cols.forEach((c, i) => { c.style.transform = `translateY(${(prog - 0.5) * (i % 2 ? -260 : 260)}px)` })
      const items = Array.from(ul.children) as HTMLElement[]
      const line = vh * 0.45
      let best = -1, bd = Infinity
      items.forEach((li, i) => { const b = li.getBoundingClientRect(); const dd = Math.abs((b.top + b.bottom) / 2 - line); if (dd < bd) { bd = dd; best = i } })
      if (best !== last && best >= 0) {
        last = best; setOn(best)
        const y = items[best].offsetTop + ul.offsetTop + 26
        d.style.left = `${ul.offsetLeft + 4}px`
        if (dotTo) dotTo(y); else d.style.transform = `translateY(${y}px)`
      }
    }
    const h = () => { if (!raf) raf = requestAnimationFrame(f) }
    f(); window.addEventListener('scroll', h, { passive: true }); window.addEventListener('resize', h)
    return () => { window.removeEventListener('scroll', h); window.removeEventListener('resize', h) }
  }, [])
  return (
    <section id="highlights" className="sec light highlights" ref={ref}>
      <svg className="tiles" aria-hidden="true" viewBox="0 0 1920 1400" preserveAspectRatio="xMidYMid slice">
        <defs><pattern id="tp3" width="96" height="96" patternUnits="userSpaceOnUse"><rect x="14" y="14" width="68" height="68" rx="16" fill="none" stroke="#121a2f" /></pattern></defs>
        {[0, 320, 640, 960, 1280, 1600].map(x => <g key={x} className="tcol"><rect x={x} y="-700" width="96" height="2800" fill="url(#tp3)" /></g>)}
      </svg>
      <div className="wrap hi-grid">
        <h2 className="masked">Highlights</h2>
        <div style={{ position: 'relative' }}>
          <ol className="hilist" ref={list}>
            {highlights.map((h, i) => (
              <li key={h.t} className={`${h.big ? 'big' : ''} ${on === i ? 'on' : ''}`}><span className="t">{h.t}</span><span className="d">{h.d}</span></li>
            ))}
          </ol>
          <span className="hdot" ref={dot} aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
