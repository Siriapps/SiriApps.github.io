import { useEffect } from 'react'

export const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Reveal on entry: [data-reveal] gets .in; .masked headings are split into words and rise through a mask. */
export function useReveals(root: React.RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useEffect(() => {
    const el = root.current
    if (!el) return
    el.querySelectorAll<HTMLElement>('.masked:not(.split)').forEach(h => {
      const text = h.textContent?.trim() ?? ''
      h.setAttribute('aria-label', text)
      h.textContent = ''
      let i = 0
      text.split(/(\s+)/).forEach(part => {
        if (!part.trim()) { h.appendChild(document.createTextNode(part)); return }
        const m = document.createElement('span'); m.className = 'wmk'; m.setAttribute('aria-hidden', 'true')
        const w = document.createElement('span'); w.textContent = part; w.style.setProperty('--i', String(i++))
        m.appendChild(w); h.appendChild(m)
      })
      h.classList.add('split')
    })
    const targets = el.querySelectorAll<HTMLElement>('[data-reveal], .masked')
    if (reduced() || !('IntersectionObserver' in window)) { targets.forEach(t => t.classList.add('in')); return }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { rootMargin: '0px 0px -12% 0px' })
    targets.forEach(t => io.observe(t))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
