import { useEffect, useRef } from 'react'

// Two scenes, one canvas, driven by data-theme on <html>.
// Dark: the rooftop observatory. Stars, nebulae, comets, the skyline's
// windows flickering on.
// Light: the same skyline seen across the park on a clear morning.
// Sun, drifting clouds, birds, and a treeline in front of the buildings.
export default function NightSky() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let raf = 0

    type Star = { x: number; y: number; r: number; tw: number; sp: number; depth: number; warm: boolean }
    let stars: Star[] = []
    type Nebula = { x: number; y: number; r: number; hue: string }
    let nebulae: Nebula[] = []
    type Building = { x: number; bw: number; bh: number; windows: { wx: number; wy: number; on: number }[] }
    type Layer = { buildings: Building[]; parallax: number; shade: string; dayShade: string; windowAlpha: number }
    let layers: Layer[] = []
    let comet: { x: number; y: number; vx: number; vy: number; life: number } | null = null
    let cometCountdown = 200
    type Cloud = { x: number; y: number; s: number; v: number }
    let clouds: Cloud[] = []
    type Bird = { x: number; y: number; v: number; flap: number }
    let birds: Bird[] = []
    type Tree = { x: number; r: number; shade: string }
    let trees: Tree[] = []

    const buildLayer = (parallax: number, shade: string, dayShade: string, minH: number, maxH: number, windowAlpha: number): Layer => {
      const buildings: Building[] = []
      let x = -40
      while (x < w + 80) {
        const bw = 34 + Math.random() * 70
        const bh = minH + Math.random() * (maxH - minH)
        const windows: Building['windows'] = []
        for (let wy = 10; wy < bh - 8; wy += 14) {
          for (let wx = 6; wx < bw - 8; wx += 12) {
            if (Math.random() < 0.38) windows.push({ wx, wy, on: Math.random() })
          }
        }
        buildings.push({ x, bw, bh, windows })
        x += bw + 4 + Math.random() * 26
      }
      return { buildings, parallax, shade, dayShade, windowAlpha }
    }

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * DPR
      canvas.height = h * DPR
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)

      const count = Math.min(260, Math.floor((w * h) / 6000))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.25 + 0.3,
        tw: Math.random() * Math.PI * 2,
        sp: 0.01 + Math.random() * 0.02,
        depth: 0.2 + Math.random() * 0.8,
        warm: Math.random() < 0.14,
      }))

      nebulae = Array.from({ length: 4 }, (_, i) => ({
        x: (0.15 + 0.7 * Math.random()) * w,
        y: (0.1 + 0.5 * Math.random()) * h,
        r: 120 + Math.random() * 220,
        hue: i % 2 === 0 ? '167,139,250' : '255,122,61',
      }))

      layers = [
        buildLayer(0.02, 'rgba(20, 14, 30, 0.9)', 'rgba(164, 176, 190, 0.5)', h * 0.1, h * 0.22, 0.18),
        buildLayer(0.05, 'rgba(13, 9, 20, 0.95)', 'rgba(140, 154, 170, 0.6)', h * 0.07, h * 0.15, 0.3),
        buildLayer(0.09, 'rgba(7, 6, 9, 1)', 'rgba(120, 136, 154, 0.7)', h * 0.04, h * 0.1, 0.5),
      ]

      clouds = Array.from({ length: 6 }, () => ({
        x: Math.random() * w,
        y: (0.08 + Math.random() * 0.3) * h,
        s: 40 + Math.random() * 70,
        v: 0.08 + Math.random() * 0.12,
      }))

      birds = Array.from({ length: 4 }, () => ({
        x: Math.random() * w,
        y: (0.15 + Math.random() * 0.25) * h,
        v: 0.5 + Math.random() * 0.6,
        flap: Math.random() * Math.PI * 2,
      }))

      trees = []
      let tx = -30
      const greens = ['rgba(74, 106, 58, 0.9)', 'rgba(58, 88, 46, 0.95)', 'rgba(88, 122, 66, 0.85)']
      while (tx < w + 60) {
        const r = 24 + Math.random() * 40
        trees.push({ x: tx, r, shade: greens[Math.floor(Math.random() * greens.length)] })
        tx += r * 0.9
      }
    }

    let tick = 0

    const drawNight = (scroll: number) => {
      for (const n of nebulae) {
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r)
        g.addColorStop(0, `rgba(${n.hue}, 0.06)`)
        g.addColorStop(1, 'transparent')
        ctx.fillStyle = g
        ctx.fillRect(n.x - n.r, n.y - n.r, n.r * 2, n.r * 2)
      }
      for (const s of stars) {
        if (!reduced) s.tw += s.sp
        const alpha = reduced ? 0.55 : 0.28 + 0.55 * Math.abs(Math.sin(s.tw))
        const y = (((s.y - scroll * s.depth * 0.1) % h) + h) % h
        ctx.beginPath()
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = s.warm ? `rgba(255, 200, 140, ${alpha})` : `rgba(230, 232, 255, ${alpha})`
        ctx.fill()
      }
      if (!reduced) {
        if (comet) {
          comet.x += comet.vx
          comet.y += comet.vy
          comet.life -= 1
          for (let i = 0; i < 14; i++) {
            const t = i / 14
            ctx.beginPath()
            ctx.arc(comet.x - comet.vx * i * 1.6, comet.y - comet.vy * i * 1.6, 2.2 * (1 - t), 0, Math.PI * 2)
            ctx.fillStyle = `rgba(255, 210, 150, ${(1 - t) * Math.min(1, comet.life / 30) * 0.85})`
            ctx.fill()
          }
          if (comet.life <= 0 || comet.x > w + 100 || comet.y > h + 100) comet = null
        } else if (--cometCountdown <= 0) {
          cometCountdown = 350 + Math.random() * 450
          comet = { x: Math.random() * w * 0.6, y: -20, vx: 5 + Math.random() * 4, vy: 2.5 + Math.random() * 2, life: 90 }
        }
      }
      const glow = ctx.createLinearGradient(0, h * 0.55, 0, h)
      glow.addColorStop(0, 'transparent')
      glow.addColorStop(1, 'rgba(255, 176, 32, 0.14)')
      ctx.fillStyle = glow
      ctx.fillRect(0, h * 0.55, w, h * 0.45)

      drawSkyline(scroll, false)
    }

    const drawDay = (scroll: number) => {
      // morning sun, upper right
      const sun = ctx.createRadialGradient(w * 0.8, h * 0.16, 0, w * 0.8, h * 0.16, 220)
      sun.addColorStop(0, 'rgba(255, 214, 130, 0.55)')
      sun.addColorStop(0.25, 'rgba(255, 214, 130, 0.18)')
      sun.addColorStop(1, 'transparent')
      ctx.fillStyle = sun
      ctx.fillRect(w * 0.8 - 220, h * 0.16 - 220, 440, 440)

      // drifting clouds
      for (const c of clouds) {
        if (!reduced) c.x += c.v
        if (c.x - c.s * 2 > w) c.x = -c.s * 2
        ctx.fillStyle = 'rgba(255, 255, 255, 0.55)'
        for (const [dx, dy, k] of [[-0.7, 0.1, 0.6], [0, 0, 1], [0.7, 0.12, 0.7], [0.3, -0.25, 0.55]] as const) {
          ctx.beginPath()
          ctx.ellipse(c.x + dx * c.s, c.y + dy * c.s, c.s * k, c.s * k * 0.55, 0, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // birds
      if (!reduced) {
        for (const b of birds) {
          b.x += b.v
          b.flap += 0.15
          if (b.x > w + 30) { b.x = -30; b.y = (0.12 + Math.random() * 0.28) * h }
          const wing = Math.sin(b.flap) * 4
          ctx.strokeStyle = 'rgba(40, 52, 34, 0.65)'
          ctx.lineWidth = 1.6
          ctx.beginPath()
          ctx.moveTo(b.x - 6, b.y - wing)
          ctx.quadraticCurveTo(b.x, b.y + 3, b.x + 6, b.y - wing)
          ctx.stroke()
        }
      }

      drawSkyline(scroll, true)

      // the park treeline in front of the buildings
      for (const t of trees) {
        ctx.fillStyle = t.shade
        ctx.beginPath()
        ctx.arc(t.x - (scroll * 0.11) % (w + 90), h - t.r * 0.35, t.r, Math.PI, 0)
        ctx.arc(t.x - (scroll * 0.11) % (w + 90) + w + 90, h - t.r * 0.35, t.r, Math.PI, 0)
        ctx.fill()
      }
      // lawn
      ctx.fillStyle = 'rgba(96, 130, 70, 0.5)'
      ctx.fillRect(0, h - 14, w, 14)
    }

    const drawSkyline = (scroll: number, day: boolean) => {
      for (const layer of layers) {
        const drift = (scroll * layer.parallax) % (w + 120)
        ctx.save()
        ctx.translate(-drift, 0)
        for (const pass of [0, 1]) {
          ctx.save()
          ctx.translate(pass * (w + 120), 0)
          for (const b of layer.buildings) {
            ctx.fillStyle = day ? layer.dayShade : layer.shade
            ctx.fillRect(b.x, h - b.bh, b.bw, b.bh)
            if (!day) {
              for (const win of b.windows) {
                const phase = reduced ? 0.8 : 0.55 + 0.45 * Math.sin(tick * 0.004 + win.on * 40)
                if (phase > 0.5) {
                  ctx.fillStyle = win.on > 0.75
                    ? `rgba(167, 139, 250, ${layer.windowAlpha * phase})`
                    : `rgba(255, 190, 92, ${layer.windowAlpha * phase})`
                  ctx.fillRect(b.x + win.wx, h - b.bh + win.wy, 5, 7)
                }
              }
            }
          }
          ctx.restore()
        }
        ctx.restore()
      }
    }

    const frame = () => {
      tick++
      ctx.clearRect(0, 0, w, h)
      const scroll = window.scrollY
      const light = document.documentElement.dataset.theme === 'light'
      if (light) drawDay(scroll)
      else drawNight(scroll)
      raf = requestAnimationFrame(frame)
    }

    resize()
    window.addEventListener('resize', resize)
    if (reduced) {
      // draw one static frame per theme change instead of animating
      frame()
      cancelAnimationFrame(raf)
      const observer = new MutationObserver(() => { frame(); cancelAnimationFrame(raf) })
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
      return () => { observer.disconnect(); window.removeEventListener('resize', resize) }
    }
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
