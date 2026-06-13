import { useEffect, useRef } from 'react'

interface TrailPoint {
  x: number
  y: number
}

export default function ShootingStarCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trailRef = useRef<TrailPoint[]>([])
  const mouseRef = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      trailRef.current.push({ x: e.clientX, y: e.clientY })
      if (trailRef.current.length > 24) trailRef.current.shift()
    }
    window.addEventListener('mousemove', onMouseMove)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const trail = trailRef.current
      const len = trail.length

      // Draw tail
      for (let i = 0; i < len; i++) {
        const t = i / len
        const radius = 0.5 + t * 3
        const opacity = t * 0.6
        ctx.beginPath()
        ctx.arc(trail[i].x, trail[i].y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(167,139,250,${opacity})`
        ctx.fill()
      }

      // Draw head
      const { x, y } = mouseRef.current
      const grad = ctx.createRadialGradient(x, y, 0, x, y, 16)
      grad.addColorStop(0, 'rgba(167,139,250,0.9)')
      grad.addColorStop(1, 'rgba(167,139,250,0)')
      ctx.beginPath()
      ctx.arc(x, y, 16, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fillStyle = '#ffffff'
      ctx.fill()

      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  )
}
