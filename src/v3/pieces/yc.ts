import { C, F, clamp, ramp, smooth, spring, type Piece } from './motion'

// Kinetic type. "Y" and "C" slam down from 3x on an underdamped spring and knock the frame,
// "AI Startup School" stacks in letter by letter, an orange rule cuts across, the venue types on.
export const piece: Piece = {
  slug: 'yc',
  title: 'YC AI Startup School',
  duration: 6,
  seek(time, ctx, W, H) {
    const t = Math.min(time, 5.2) // last 0.8 s is a held title card
    const s = Math.min(W / 1280, H / 720)
    ctx.save()
    ctx.fillStyle = C.navy
    ctx.fillRect(0, 0, W, H)
    const pool = ctx.createRadialGradient(W * 0.28, H * 0.42, 0, W * 0.28, H * 0.42, W * 0.55)
    pool.addColorStop(0, C.navy2)
    pool.addColorStop(1, 'rgba(15,23,51,0)')
    ctx.fillStyle = pool
    ctx.fillRect(0, 0, W, H)

    // impact: each landing knocks the frame down a few pixels and it rings out
    const knock = (land: number) => { const d = t - land; return d > 0 ? Math.exp(-9 * d) * Math.sin(38 * d) : 0 }
    ctx.translate(0, (knock(0.37) * 9 + knock(0.72) * 12) * s)

    const x0 = W * 0.1
    const base = H * 0.57
    const fs = 400 * s
    ctx.textBaseline = 'alphabetic'
    ctx.textAlign = 'left'
    ctx.font = `${fs}px ${F.display}`
    ctx.fillStyle = C.white
    const wY = ctx.measureText('Y').width
    const xs = [x0, x0 + wY + 46 * s]
    const starts = [0.22, 0.57]
    const big = ['Y', 'C']
    big.forEach((ch, i) => {
      const dt = t - starts[i]
      if (dt <= 0) return
      const p = spring(dt, 320, 16)
      const w = ctx.measureText(ch).width
      const cx = xs[i] + w / 2, cy = base - fs * 0.36
      const sc = 1 + 2.2 * (1 - p)
      ctx.save()
      ctx.globalAlpha = clamp(dt / 0.07)
      ctx.translate(cx, cy)
      ctx.scale(sc, sc)
      ctx.rotate((1 - p) * (i ? 0.12 : -0.12))
      ctx.fillText(ch, -w / 2, base - cy)
      ctx.restore()
    })

    // letter by letter assembly
    const line = 'AI Startup School'
    const lfs = 62 * s
    const lb = base + 96 * s
    ctx.font = `500 ${lfs}px ${F.text}`
    for (let i = 0; i < line.length; i++) {
      const ch = line[i]
      if (ch === ' ') continue
      const dt = t - (1.25 + i * 0.05)
      if (dt <= 0) continue
      const p = spring(dt, 240, 18)
      const x = x0 + ctx.measureText(line.slice(0, i)).width
      const w = ctx.measureText(ch).width
      ctx.save()
      ctx.globalAlpha = clamp(dt / 0.12)
      ctx.translate(x + w / 2, lb + (1 - p) * 46 * s)
      ctx.rotate((1 - p) * 0.5)
      ctx.fillText(ch, -w / 2, 0)
      ctx.restore()
    }

    // orange rule draws across
    const rp = smooth(ramp(t, 2.45, 3.2))
    const ry = lb + 40 * s
    if (rp > 0) {
      ctx.fillStyle = C.orange
      ctx.fillRect(x0, ry, (W * 0.9 - x0) * rp, 3 * s)
    }

    // venue types on in mono
    const venue = 'Chase Center, San Francisco, July 2026'
    const n = Math.floor(ramp(t, 3.25, 4.55) * venue.length + 1e-6)
    ctx.font = `${24 * s}px ${F.mono}`
    const vb = ry + 58 * s
    ctx.fillStyle = 'rgba(255,255,255,0.82)'
    ctx.fillText(venue.slice(0, n), x0, vb)
    const typing = t > 3.15 && t < 5.0
    const blink = t < 4.55 || Math.floor((t - 4.55) / 0.2) % 2 === 0
    if (typing && blink) {
      ctx.fillStyle = C.orange
      ctx.fillRect(x0 + ctx.measureText(venue.slice(0, n)).width + 4 * s, vb - 20 * s, 12 * s, 24 * s)
    }
    ctx.restore()
  },
}
