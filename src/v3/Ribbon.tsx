import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from './data'

gsap.registerPlugin(ScrollTrigger)

/* The ribbon: the projects stand on a tilted ring, like a filmstrip bent into a globe's equator.
   Scroll turns the ring one full circle; the pane facing you is lit, the ones behind fall into shade.
   A key light sweeps with the turn. CSS 3D so the type and screenshots stay sharp; a stacked list on phones. */
const N = projects.length
const SLUGS = ['minq', 'cue', 'pondr', 'safeway', 'harmoniq', 'remix', 'rgnn', 'streamsign', 'matcha', 'reelskill', 'cabiniq', 'asl']
const PAIRS: [string, string][] = [['#ff8a3d', '#7c5cff'], ['#f06ab0', '#2f5bff'], ['#7c5cff', '#ffd166'], ['#2f5bff', '#f06ab0']]

export default function Ribbon() {
  const sec = useRef<HTMLElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  useEffect(() => {
    const s = sec.current, r = ring.current
    if (!s || !r) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const panes = Array.from(r.querySelectorAll<HTMLElement>('.pane'))
      const radius = () => Math.max(520, Math.min(window.innerWidth * 0.42, 760))
      const place = () => panes.forEach((p, i) => { p.style.transform = `rotateY(${(i / N) * 360}deg) translateZ(${radius()}px)` })
      place()
      const st = ScrollTrigger.create({
        trigger: s, start: 'top top', end: () => `+=${N * 420}`, pin: true, scrub: 0.6, invalidateOnRefresh: true,
        onUpdate: self => {
          const turn = -self.progress * 360 * (N - 1) / N
          r.style.transform = `rotateX(-8deg) rotateY(${turn}deg)`
          const idx = Math.round(self.progress * (N - 1))
          setActive(idx)
          // light: panes facing the viewer are bright, the back of the ring sinks into shade
          panes.forEach((p, i) => {
            const a = ((i / N) * 360 + turn) % 360
            const facing = Math.cos(a * Math.PI / 180)   // 1 = front, -1 = back
            p.style.setProperty('--lit', String(Math.max(0.12, (facing + 1) / 2)))
            p.style.zIndex = String(Math.round(50 + facing * 40))
          })
        },
      })
      window.addEventListener('resize', place)
      return () => { st.kill(); window.removeEventListener('resize', place) }
    })
    return () => mm.revert()
  }, [])
  const p = projects[active]
  return (
    <section id="projects" className="sec dark ribbon" ref={sec}>
      <div className="rb-head">
        <p className="mono">[05] Projects, {N}</p>
        <h2>Shipped work.</h2>
      </div>
      <div className="rb-stage">
        <div className="rb-light" aria-hidden="true" />
        <div className="rb-ring" ref={ring}>
          {projects.map((pr, i) => {
            const [a, b] = PAIRS[i % PAIRS.length]
            return (
              <div className={`pane ${active === i ? 'on' : ''}`} key={pr.title} style={{ ['--a' as string]: a, ['--b' as string]: b }}>
                <img src={`/images/projects/${SLUGS[i]}.jpg`} alt="" loading="lazy" onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
                <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                <span className="ttl">{pr.title}</span>
              </div>
            )
          })}
        </div>
      <div className="rb-caption" key={active}>
        <p className="mono">{String(active + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}, {p.subtitle}</p>
        <h3>{p.title}</h3>
        <p className="d">{p.desc}</p>
        <p className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</p>
        {p.github !== '#' && <a className="btn btn-ghost" href={p.github} target="_blank" rel="noopener noreferrer">Open on GitHub</a>}
      </div>
      </div>
      {/* phones and reduced motion: a plain list */}
      <ol className="rb-list">
        {projects.map((pr, i) => (
          <li key={pr.title}>
            <img src={`/images/projects/${SLUGS[i]}.jpg`} alt="" loading="lazy" onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
            <span className="mono">{String(i + 1).padStart(2, '0')}, {pr.subtitle}</span>
            <h3>{pr.title}</h3><p>{pr.desc}</p>
            {pr.github !== '#' && <a href={pr.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
          </li>
        ))}
      </ol>
    </section>
  )
}
