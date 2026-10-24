import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { highlights } from './data'
import Player from './Player'
import { useReveals } from './hooks'

gsap.registerPlugin(ScrollTrigger)

/* Highlights is one pinned frame. Scrolling through the section steps from piece to piece: each 6 s piece
   plays once as it arrives and holds its title frame until the next step. A thin progress bar and the index
   are the only other furniture. On phones and under reduced motion the pieces stack as still title frames. */
export default function Highlights() {
  const ref = useRef<HTMLElement>(null)
  const bar = useRef<HTMLElement>(null)
  const [on, setOn] = useState(0)
  useReveals(ref)
  useEffect(() => {
    const sec = ref.current
    if (!sec) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const st = ScrollTrigger.create({
        trigger: sec, start: 'top top', end: () => `+=${highlights.length * 520}`, pin: true, scrub: true, invalidateOnRefresh: true,
        onUpdate: self => {
          const idx = Math.min(highlights.length - 1, Math.floor(self.progress * highlights.length))
          setOn(idx)
          if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`
        },
      })
      return () => st.kill()
    })
    return () => mm.revert()
  }, [])
  const h = highlights[on]
  return (
    <section id="highlights" className="sec light highlights" ref={ref}>
      <div className="hi-frame">
        <div className="hi-top">
          <p className="mono">[03] Highlights, {highlights.length}</p>
          <p className="mono hi-idx">{String(on + 1).padStart(2, '0')} / {String(highlights.length).padStart(2, '0')}</p>
        </div>
        <div className="hi-stage">
          <Player slug={h.slug} />
        </div>
        <div className="hi-cap" key={h.slug}>
          <h2>{h.t}</h2>
          <p>{h.d}</p>
        </div>
        <div className="hi-bar" aria-hidden="true"><i ref={bar} /></div>
      </div>
      <ol className="hi-list-m">
        {highlights.map(x => (
          <li key={x.slug}><div className="hi-still"><Player slug={x.slug} still /></div><h3>{x.t}</h3><p>{x.d}</p></li>
        ))}
      </ol>
    </section>
  )
}
