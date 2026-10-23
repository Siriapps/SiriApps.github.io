import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { reduced } from './hooks'

/* A small dot rides the pointer; a ring follows it with a lag and swells over links and buttons. Fine pointers only. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const d = dot.current, r = ring.current
    if (!d || !r || reduced() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    document.documentElement.classList.add('has-cursor')
    const dx = gsap.quickTo(d, 'x', { duration: 0.12, ease: 'power3.out' }), dy = gsap.quickTo(d, 'y', { duration: 0.12, ease: 'power3.out' })
    const rx = gsap.quickTo(r, 'x', { duration: 0.5, ease: 'power3.out' }), ry = gsap.quickTo(r, 'y', { duration: 0.5, ease: 'power3.out' })
    const move = (e: PointerEvent) => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); r.classList.toggle('big', !!(e.target as HTMLElement).closest('a, button')) }
    window.addEventListener('pointermove', move, { passive: true })
    const show = () => { d.style.opacity = '1'; r.style.opacity = '1' }, hide = () => { d.style.opacity = '0'; r.style.opacity = '0' }
    document.addEventListener('pointerenter', show); document.addEventListener('pointerleave', hide)
    return () => { window.removeEventListener('pointermove', move); document.removeEventListener('pointerenter', show); document.removeEventListener('pointerleave', hide); document.documentElement.classList.remove('has-cursor') }
  }, [])
  return <><div className="cur-dot" ref={dot} aria-hidden="true" /><div className="cur-ring" ref={ring} aria-hidden="true" /></>
}
