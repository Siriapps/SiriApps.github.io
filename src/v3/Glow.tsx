import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { reduced } from './hooks'

/* A warm pool of light that trails the pointer with a lag; it shows only over the light sections.
   On touch devices it rests at the centre of the section being read. */
export default function Glow() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const glow = ref.current, pool = glow?.firstElementChild as HTMLElement | null
    if (!glow || !pool || reduced()) return
    const gx = gsap.quickTo(pool, 'x', { duration: 1.1, ease: 'power3.out' }), gy = gsap.quickTo(pool, 'y', { duration: 1.1, ease: 'power3.out' })
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const move = (e: PointerEvent) => { gx(e.clientX); gy(e.clientY) }
    if (fine) window.addEventListener('pointermove', move, { passive: true })
    const check = () => {
      const el = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)
      const sec = el?.closest('.sec') as HTMLElement | null
      glow.classList.toggle('on', !!sec && sec.classList.contains('light'))
      if (!fine && sec) { const r = sec.getBoundingClientRect(); gx(window.innerWidth * 0.6); gy(Math.min(Math.max(r.top + r.height / 2, 120), window.innerHeight - 120)) }
    }
    window.addEventListener('scroll', check, { passive: true }); check()
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('scroll', check) }
  }, [])
  return <div className="glow" ref={ref} aria-hidden="true"><div className="pool" /></div>
}
