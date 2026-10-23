import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from './data'
import { reduced } from './hooks'

gsap.registerPlugin(ScrollTrigger)

const PAIRS: [string, string][] = [['#ff8a3d', '#7c5cff'], ['#f06ab0', '#2f5bff'], ['#7c5cff', '#ffd166'], ['#2f5bff', '#f06ab0']]

/* A pinned horizontal gallery. Scroll drives the track; each card tilts toward the pointer on fine pointers;
   a cursor tag follows the mouse over the gallery; the bar below is the gallery's progress. On phones it stacks. */
export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLElement>(null)
  const tag = useRef<HTMLDivElement>(null)
  const [tagOn, setTagOn] = useState(false)

  useEffect(() => {
    const sec = ref.current, tr = track.current
    if (!sec || !tr) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const dist = () => tr.scrollWidth - window.innerWidth
      const tween = gsap.to(tr, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: {
          trigger: sec, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true,
          onUpdate: self => { if (bar.current) bar.current.style.transform = `scaleX(${self.progress})` },
        },
      })
      // tilt: one spring-ish quickTo per axis per card, driven by the pointer
      const cards = Array.from(tr.querySelectorAll<HTMLElement>('.pcard'))
      const cleanups = cards.map(card => {
        const rx = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3.out' })
        const ry = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3.out' })
        gsap.set(card, { transformPerspective: 1200 })
        const move = (e: PointerEvent) => { const r = card.getBoundingClientRect(); const dx = (e.clientX - r.left) / r.width - 0.5, dy = (e.clientY - r.top) / r.height - 0.5; rx(-dy * 10); ry(dx * 12) }
        const leave = () => { rx(0); ry(0) }
        card.addEventListener('pointermove', move); card.addEventListener('pointerleave', leave)
        return () => { card.removeEventListener('pointermove', move); card.removeEventListener('pointerleave', leave) }
      })
      return () => { tween.scrollTrigger?.kill(); tween.kill(); cleanups.forEach(c => c()) }
    })
    return () => mm.revert()
  }, [])

  useEffect(() => {
    const t = tag.current, sec = ref.current
    if (!t || !sec || reduced() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const tx = gsap.quickTo(t, 'x', { duration: 0.35, ease: 'power3.out' }), ty = gsap.quickTo(t, 'y', { duration: 0.35, ease: 'power3.out' })
    const move = (e: PointerEvent) => { tx(e.clientX); ty(e.clientY) }
    const over = (e: PointerEvent) => setTagOn(!!(e.target as HTMLElement).closest('a.pcard'))
    sec.addEventListener('pointermove', move); sec.addEventListener('pointerover', over); sec.addEventListener('pointerleave', () => setTagOn(false))
    return () => { sec.removeEventListener('pointermove', move); sec.removeEventListener('pointerover', over) }
  }, [])

  return (
    <section id="projects" className="sec dark projects" ref={ref}>
      <div className="pin">
        <div className="head">
          <div><p className="mono">Projects</p><h2>Shipped work.</h2></div>
          <p className="mono">Scroll to move along the shelf</p>
        </div>
        <div className="track" ref={track}>
          {projects.map((p, i) => {
            const [a, b] = PAIRS[i % PAIRS.length]
            const Tag = p.github !== '#' ? 'a' : 'div'
            const extra = p.github !== '#' ? { href: p.github, target: '_blank', rel: 'noopener noreferrer' } : {}
            return (
              <Tag key={p.title} className="pcard" style={{ ['--a' as string]: a, ['--b' as string]: b }} {...extra}>
                <span className="bg" aria-hidden="true" />
                <span className="idx">{String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
                <span className="sub">{p.subtitle}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <span className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</span>
                {p.github !== '#' && <span className="go" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17 17 7M8 7h9v9" /></svg></span>}
              </Tag>
            )
          })}
        </div>
        <div className="pbar" aria-hidden="true"><i ref={bar} /></div>
      </div>
      <div className={`cursor-tag ${tagOn ? 'on' : ''}`} ref={tag} aria-hidden="true">Open on GitHub</div>
    </section>
  )
}
