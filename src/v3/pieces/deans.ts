import { C, F, clamp, ramp, smooth, spring, type Piece } from './motion'

// Diagram that draws itself. A 270 degree GPA gauge ticks in, its arc sweeps pink to violet up to 3.97
// while an odometer counts the number with real carries; the honors rise beside it.
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)

export const piece: Piece = {
  slug: 'deans',
  title: "Dean's List, Spring 2026",
  duration: 6,
  seek(time, ctx, W, H) {
    const t = Math.min(time, 5.2) // last 0.8 s is a held title card
    const s = Math.min(W / 1280, H / 720)
    ctx.save()
    ctx.fillStyle = C.paper
    ctx.fillRect(0, 0, W, H)

    const cx = W * 0.3, cy = H * 0.52, r = 188 * s
    const a0 = Math.PI * 0.75, sweep = Math.PI * 1.5
    ctx.lineCap = 'round'

    // ticks 0.0 to 4.0, drawn around the dial one after another
    for (let i = 0; i <= 40; i++) {
      const tp = smooth(ramp(t, 0.15 + i * 0.016, 0.35 + i * 0.016))
      if (tp <= 0) continue
      const major = i % 10 === 0
      const a = a0 + (sweep * i) / 40
      const r1 = r + 24 * s, r2 = r1 + (major ? 16 : 7) * s * tp
      ctx.strokeStyle = major ? 'rgba(18,26,47,0.75)' : 'rgba(18,26,47,0.28)'
      ctx.lineWidth = (major ? 2.2 : 1.4) * s
      ctx.beginPath()
      ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1)
      ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2)
      ctx.stroke()
      if (major) {
        ctx.globalAlpha = tp
        ctx.fillStyle = C.ink
        ctx.font = `${15 * s}px ${F.mono}`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        const rl = r + 58 * s
        ctx.fillText(String(i / 10), cx + Math.cos(a) * rl, cy + Math.sin(a) * rl)
        ctx.globalAlpha = 1
      }
    }

    // track
    const tr = smooth(ramp(t, 0.05, 0.75))
    ctx.lineWidth = 22 * s
    if (tr > 0) {
      ctx.strokeStyle = '#eef0f6'
      ctx.beginPath()
      ctx.arc(cx, cy, r, a0, a0 + sweep * tr)
      ctx.stroke()
    }

    // value arc
    const e = ease(ramp(t, 0.85, 3.15))
    const v = Math.round(3.97 * e * 10000) / 10000
    if (v > 0) {
      const g = ctx.createConicGradient(a0, cx, cy)
      g.addColorStop(0, C.pink)
      g.addColorStop(0.75, C.violet)
      g.addColorStop(1, C.violet)
      ctx.strokeStyle = g
      ctx.beginPath()
      const ae = a0 + (sweep * v) / 4
      ctx.arc(cx, cy, r, a0, ae)
      ctx.stroke()
      ctx.fillStyle = C.white
      ctx.beginPath()
      ctx.arc(cx + Math.cos(ae) * r, cy + Math.sin(ae) * r, 6 * s, 0, Math.PI * 2)
      ctx.fill()
    }

    // odometer number with carries: a wheel only turns while the wheel to its right passes 9
    const x2 = v * 100
    const f2 = x2 - Math.floor(x2)
    const x1 = Math.floor(v * 10 + 1e-9) + (Math.floor(x2) % 10 === 9 ? f2 : 0)
    const f1 = x1 - Math.floor(x1)
    const xo = Math.floor(v + 1e-9) + (Math.floor(v * 10 + 1e-9) % 10 === 9 ? f1 : 0)
    const wheels = [xo, x1, x2]
    const fs = 116 * s
    ctx.font = `${fs}px ${F.display}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'alphabetic'
    let cell = 0
    for (let d = 0; d < 10; d++) cell = Math.max(cell, ctx.measureText(String(d)).width)
    const dotW = ctx.measureText('.').width
    const total = cell * 3 + dotW
    const land = t - 3.15
    const pop = land > 0 ? 1 + 0.07 * Math.exp(-7 * land) * Math.sin(14 * land) : 1
    const nb = cy + 38 * s
    const pivotY = nb - fs * 0.35
    ctx.save()
    ctx.translate(cx, pivotY)
    ctx.scale(pop, pop)
    ctx.translate(-cx, -pivotY)
    ctx.globalAlpha = clamp(ramp(t, 0.6, 0.9))
    ctx.fillStyle = C.ink
    let x = cx - total / 2
    const lh = fs * 1.05
    wheels.forEach((w, i) => {
      if (i === 1) { ctx.fillText('.', x + dotW / 2, nb); x += dotW }
      const d = ((Math.floor(w) % 10) + 10) % 10, f = w - Math.floor(w)
      ctx.save()
      ctx.beginPath()
      ctx.rect(x, nb - fs * 0.86, cell, fs * 1.0)
      ctx.clip()
      ctx.fillText(String(d), x + cell / 2, nb - f * lh)
      if (f > 0.001) ctx.fillText(String((d + 1) % 10), x + cell / 2, nb + (1 - f) * lh)
      ctx.restore()
      x += cell
    })
    ctx.restore()
    ctx.globalAlpha = clamp(ramp(t, 1.0, 1.4))
    ctx.fillStyle = 'rgba(18,26,47,0.55)'
    ctx.font = `${16 * s}px ${F.mono}`
    ctx.fillText('GPA  /  4.00', cx, nb + 46 * s)
    ctx.globalAlpha = 1

    // right column
    ctx.textAlign = 'left'
    const xR = W * 0.57, maxW = W * 0.92 - xR
    const hb = H * 0.38
    ctx.font = `100px ${F.display}`
    const hfs = Math.min(84 * s, (maxW / ctx.measureText('Dean’s List').width) * 100)
    const rise = (txt: string, font: string, fsz: number, y: number, start: number, color: string) => {
      const dt = t - start
      if (dt <= 0) return
      const p = spring(dt, 200, 22)
      ctx.save()
      ctx.beginPath()
      ctx.rect(xR - 4 * s, y - fsz * 1.05, maxW + 8 * s, fsz * 1.4)
      ctx.clip()
      ctx.font = font
      ctx.fillStyle = color
      ctx.fillText(txt, xR, y + (1 - p) * fsz * 1.2)
      ctx.restore()
    }
    rise('Dean’s List', `${hfs}px ${F.display}`, hfs, hb, 0.45, C.ink)
    rise('Spring 2026', `500 ${30 * s}px ${F.text}`, 30 * s, hb + 52 * s, 0.85, C.violet)
    const rl = smooth(ramp(t, 1.2, 2.0))
    if (rl > 0) {
      ctx.fillStyle = 'rgba(18,26,47,0.16)'
      ctx.fillRect(xR, hb + 86 * s, maxW * rl, 1.5 * s)
    }
    const lines = ['UT Dallas', 'Computer Science Honors', 'AES Merit Scholar']
    lines.forEach((ln, i) => {
      const y = hb + 140 * s + i * 40 * s
      const st = 3.3 + i * 0.22
      rise(ln, `${21 * s}px ${F.mono}`, 21 * s, y, st, C.ink)
      if (t > st + 0.1) {
        const dp = spring(t - st - 0.1, 260, 20)
        ctx.fillStyle = i === 2 ? C.violet : C.pink
        ctx.fillRect(xR - 22 * s, y - 13 * s, 8 * s * dp, 8 * s * dp)
      }
    })
    ctx.restore()
  },
}
