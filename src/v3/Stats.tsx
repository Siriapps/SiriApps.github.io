import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { reduced } from './hooks'

/* The numbers, as a motion piece: three dots bounce in the centre, swell together into one blot that bursts into
   drops; each drop lands and becomes a figure whose digits jump in one by one, then the label slides up under it.
   It plays once when the section scrolls into view (and replays on click). Everything is transforms and opacity. */
const stats = [['3.97', 'GPA'], ['15+', 'Projects shipped'], ['4x', 'Hackathon wins'], ['5+', 'Research efforts']]

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const dots = Array.from(el.querySelectorAll<HTMLElement>('.sd'))
    const blot = el.querySelector<HTMLElement>('.blot')!
    const drops = Array.from(el.querySelectorAll<HTMLElement>('.drop2'))
    const figs = Array.from(el.querySelectorAll<HTMLElement>('.fig'))
    const chars = Array.from(el.querySelectorAll<HTMLElement>('.fig .ch'))
    const labels = Array.from(el.querySelectorAll<HTMLElement>('.lbl'))
    if (reduced()) { gsap.set([figs, labels], { opacity: 1 }); gsap.set(chars, { y: 0 }); gsap.set([dots, blot, drops], { opacity: 0 }); return }
    let tl: gsap.core.Timeline | null = null
    const play = () => {
      tl?.kill()
      gsap.set(figs, { opacity: 0 }); gsap.set(chars, { y: 40, opacity: 0 }); gsap.set(labels, { opacity: 0, y: 10 })
      gsap.set(dots, { opacity: 1, scale: 1, x: 0, y: 0 }); gsap.set(blot, { opacity: 0, scale: 0.2 }); gsap.set(drops, { opacity: 0, x: 0, y: 0, scale: 1 })
      tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      // 1. three dots bounce, out of phase
      tl.to(dots, { y: -26, duration: 0.32, ease: 'power2.out', stagger: { each: 0.1, yoyo: true, repeat: 3 } })
        .to(dots, { y: 0, duration: 0.25, ease: 'bounce.out', stagger: 0.06 })
        // 2. they slide together and become one blot
        .to(dots, { x: (i: number) => (1 - i) * 0, scale: 0.6, duration: 0.3, ease: 'power3.in' }, '+=0.1')
        .to(dots, { opacity: 0, duration: 0.1 }, '-=0.05')
        .to(blot, { opacity: 1, scale: 1.25, duration: 0.35, ease: 'back.out(3)' }, '-=0.1')
        // 3. the blot bursts into four drops that fly to the four columns
        .to(blot, { scale: 0, opacity: 0, duration: 0.25, ease: 'power3.in' }, '+=0.15')
        .to(drops, { opacity: 1, duration: 0.05 }, '-=0.22')
        .to(drops, {
          x: (i: number) => { const r = el.getBoundingClientRect(), c = figs[i].getBoundingClientRect(); return c.left + c.width / 2 - (r.left + r.width / 2) },
          y: (i: number) => { const r = el.getBoundingClientRect(), c = figs[i].getBoundingClientRect(); return c.top + c.height / 2 - (r.top + r.height / 2) },
          duration: 0.55, ease: 'power2.inOut', stagger: 0.05,
        }, '-=0.2')
        // 4. each drop lands and the digits jump up out of it
        .to(drops, { scale: 0, duration: 0.25, ease: 'back.in(2)', stagger: 0.05 })
        .set(figs, { opacity: 1 }, '-=0.3')
        .to(chars, { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.8)', stagger: 0.045 }, '-=0.3')
        .to(labels, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, '-=0.3')
    }
    const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { play(); io.disconnect() } }, { threshold: 0.6 })
    io.observe(el)
    el.addEventListener('click', play)
    return () => { io.disconnect(); tl?.kill(); el.removeEventListener('click', play) }
  }, [])
  return (
    <section id="numbers" className="sec light stats-sec"><div className="stats" ref={ref} role="group" aria-label="Numbers">
      <div className="stage2" aria-hidden="true">
        <span className="sd" /><span className="sd" /><span className="sd" />
        <span className="blot" />
        {stats.map(s => <span key={s[0]} className="drop2" />)}
      </div>
      <dl className="specs2">
        {stats.map(([v, l]) => (
          <div key={l}>
            <dd className="fig" aria-label={v}>{v.split('').map((c, i) => <span key={i} className="ch" aria-hidden="true">{c}</span>)}</dd>
            <dt className="lbl">{l}</dt>
          </div>
        ))}
      </dl>
    </div></section>
  )
}
