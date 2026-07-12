import { useEffect, useRef } from 'react'

// Stardust follows the pointer: a short-lived trail of fading sparks.
// Mouse only; skipped for touch devices and reduced-motion visitors.
export default function CursorTrail() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let raf = 0
    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    type Spark = { x: number; y: number; vx: number; vy: number; life: number; max: number }
    const sparks: Spark[] = []

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * DPR
      canvas.height = h * DPR
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }

    const onMove = (e: PointerEvent) => {
      if (sparks.length > 60) return
      sparks.push({
        x: e.clientX,
        y: e.clientY,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6 + 0.25,
        life: 0,
        max: 24 + Math.random() * 16,
      })
    }

    const frame = () => {
      ctx.clearRect(0, 0, w, h)
      const light = document.documentElement.dataset.theme === 'light'
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.life++
        s.x += s.vx
        s.y += s.vy
        const t = 1 - s.life / s.max
        if (t <= 0) { sparks.splice(i, 1); continue }
        ctx.beginPath()
        ctx.arc(s.x, s.y, 1.6 * t + 0.3, 0, Math.PI * 2)
        ctx.fillStyle = light
          ? `rgba(199, 127, 0, ${t * 0.55})`
          : `rgba(255, 200, 120, ${t * 0.7})`
        ctx.fill()
      }
      raf = requestAnimationFrame(frame)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 90 }}
    />
  )
}
