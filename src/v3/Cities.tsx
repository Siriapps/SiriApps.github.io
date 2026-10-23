import { useEffect, useRef, useState } from 'react'
import { cities } from './data'
import { useReveals } from './hooks'

/* The photo frame sticks while the four paragraphs scroll past; the frame shows the paragraph under the reading line. */
export default function Cities() {
  const ref = useRef<HTMLElement>(null)
  const [on, setOn] = useState(0)
  useReveals(ref)
  useEffect(() => {
    let raf = 0
    const f = () => {
      raf = 0
      const line = window.innerHeight * 0.5
      let best = 0, bd = Infinity
      ref.current?.querySelectorAll<HTMLElement>('.place').forEach((el, i) => { const b = el.getBoundingClientRect(); const d = Math.abs((b.top + b.bottom) / 2 - line); if (d < bd) { bd = d; best = i } })
      setOn(best)
    }
    const h = () => { if (!raf) raf = requestAnimationFrame(f) }
    f(); window.addEventListener('scroll', h, { passive: true }); window.addEventListener('resize', h)
    return () => { window.removeEventListener('scroll', h); window.removeEventListener('resize', h) }
  }, [])
  return (
    <section id="cities" className="sec dark" ref={ref}>
      <div className="wrap places-grid">
        <div className="places-sticky">
          <figure className="pframe">
            {cities.map((c, i) => <img key={c.name} src={c.img} alt={c.alt} className={on === i ? 'on' : ''} loading="lazy" />)}
            <figcaption>{cities[on].name}</figcaption>
          </figure>
        </div>
        <div>
          <h2 className="masked">Four cities</h2>
          {cities.map((c, i) => (
            <div key={c.name} className={`place ${on === i ? 'on' : ''}`}><h3>{c.name}</h3><p>{c.copy}</p></div>
          ))}
        </div>
      </div>
    </section>
  )
}
