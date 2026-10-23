import { C, F, clamp, ramp, smooth, spring, type Piece } from './motion'

// Graphic transition. A comet arcs in from the left; its tail of fading dots collapses
// into the head, and six of them spring out into an officer ring around the center dot.
const hash = (n: number) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x) }
const lerp = (a: number, b: number, k: number) => a + (b - a) * k

export const piece: Piece = {
  slug: 'qcomet',
  title: 'Founding President, Quantum Comet',
  duration: 6,
  seek(time, ctx, W, H) {
    const t = Math.min(time, 5.2) // last 0.8 s is a held title card
    const s = Math.min(W / 1280, H / 720)
    ctx.save()
    ctx.fillStyle = C.navy
    ctx.fillRect(0, 0, W, H)

    // fixed faint star field (seeded, never moves)
    for (let i = 0; i < 70; i++) {
      ctx.fillStyle = `rgba(255,255,255,${0.08 + hash(i + 3) * 0.22})`
      ctx.beginPath()
      ctx.arc(hash(i) * W, hash(i + 100) * H, (0.6 + hash(i + 200) * 1.1) * s, 0, Math.PI * 2)
      ctx.fill()
    }

    const cx = W * 0.27, cy = H * 0.5, R = 122 * s
    const P = [[-0.08 * W, 0.86 * H], [0.06 * W, 0.18 * H], [0.44 * W, 0.08 * H], [cx, cy]]
    const at = (u: number) => {
      const v = 1 - u
      const a = v * v * v, b = 3 * v * v * u, c = 3 * v * u * u, d = u * u * u
      return [a * P[0][0] + b * P[1][0] + c * P[2][0] + d * P[3][0], a * P[0][1] + b * P[1][1] + c * P[2][1] + d * P[3][1]]
    }
    const uAt = (tt: number) => 1 - Math.pow(1 - ramp(tt, 0.15, 2.05), 3)

    const N = 22
    const officers = [3, 6, 9, 12, 15, 18]
    const colors = [C.orange, C.pink, C.violet, C.blue, C.sun, C.white]
    const rot = -1.1 * (1 - smooth(ramp(t, 1.85, 4.6)))

    // ring outline
    const ro = smooth(ramp(t, 2.35, 3.25))
    if (ro > 0) {
      ctx.strokeStyle = 'rgba(255,255,255,0.2)'
      ctx.lineWidth = 1.5 * s
      ctx.beginPath()
      ctx.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * ro)
      ctx.stroke()
    }

    // tail dots, farthest first
    for (let i = N; i >= 1; i--) {
      const [px, py] = at(uAt(t - i * 0.045))
      const k = 1 - i / N
      const oi = officers.indexOf(i)
      if (oi < 0) {
        const a = Math.pow(k, 1.4) * 0.85 * (1 - ramp(t, 1.75, 2.3))
        if (a <= 0.01) continue
        ctx.fillStyle = `rgba(255,236,200,${a})`
        ctx.beginPath()
        ctx.arc(px, py, (1.4 + 6 * k) * s, 0, Math.PI * 2)
        ctx.fill()
        continue
      }
      const p = spring(t - (1.85 + oi * 0.08), 150, 15)
      const ang = -Math.PI / 2 + (oi * Math.PI * 2) / 6 + rot
      const tx = cx + Math.cos(ang) * R, ty = cy + Math.sin(ang) * R
      const x = lerp(px, tx, p), y = lerp(py, ty, p)
      const sp = clamp(ramp(t, 2.55 + oi * 0.06, 3.05 + oi * 0.06))
      if (sp > 0) {
        ctx.strokeStyle = 'rgba(255,255,255,0.18)'
        ctx.lineWidth = 1.2 * s
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(lerp(cx, x, sp), lerp(cy, y, sp))
        ctx.stroke()
      }
      const pc = clamp(p)
      ctx.globalAlpha = Math.pow(k, 1.4) * (1 - pc) + pc
      ctx.fillStyle = 'rgb(255,236,200)'
      ctx.beginPath()
      ctx.arc(x, y, lerp(1.4 + 6 * k, 10, pc) * s, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = pc
      ctx.fillStyle = colors[oi]
      ctx.fill()
      ctx.globalAlpha = 1
    }

    // head, which becomes the center dot
    const [hx, hy] = at(uAt(t))
    if (t > 0.15) {
      const gr = (50 - 22 * smooth(ramp(t, 2.05, 3.0))) * s
      const g = ctx.createRadialGradient(hx, hy, 0, hx, hy, gr)
      g.addColorStop(0, 'rgba(255,209,102,0.55)')
      g.addColorStop(1, 'rgba(255,209,102,0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(hx, hy, gr, 0, Math.PI * 2)
      ctx.fill()
      const settle = smooth(ramp(t, 2.0, 2.6))
      ctx.fillStyle = settle > 0.5 ? C.sun : C.white
      ctx.beginPath()
      ctx.arc(hx, hy, lerp(8, 14, settle) * s, 0, Math.PI * 2)
      ctx.fill()
    }

    // type
    const x1 = W * 0.49, maxW = W * 0.92 - x1
    ctx.textAlign = 'left'
    ctx.textBaseline = 'alphabetic'
    const rise = (txt: string, font: string, fsz: number, y: number, start: number, color: string) => {
      const dt = t - start
      if (dt <= 0) return
      const p = spring(dt, 190, 22)
      ctx.save()
      ctx.beginPath()
      ctx.rect(x1 - 4 * s, y - fsz * 1.05, maxW + 8 * s, fsz * 1.4)
      ctx.clip()
      ctx.font = font
      ctx.fillStyle = color
      ctx.fillText(txt, x1, y + (1 - p) * fsz * 1.2)
      ctx.restore()
    }
    const fitPx = (txt: string, fam: string, target: number) => {
      ctx.font = `100px ${fam}`
      return Math.min(target, (maxW / ctx.measureText(txt).width) * 100)
    }
    const yb = H * 0.43
    rise('FOUNDING PRESIDENT', `${17 * s}px ${F.mono}`, 17 * s, yb - 74 * s, 2.75, C.orange)
    const tfs = fitPx('Quantum Comet', F.display, 96 * s)
    rise('Quantum Comet', `${tfs}px ${F.display}`, tfs, yb + 14 * s, 2.95, C.white)
    const l1 = 'UT Dallas’s first quantum student organization,'
    const mfs = fitPx(l1, F.mono, 20 * s)
    rise(l1, `${mfs}px ${F.mono}`, mfs, yb + 70 * s, 3.45, 'rgba(255,255,255,0.78)')
    rise('October 2026', `${mfs}px ${F.mono}`, mfs, yb + 70 * s + mfs * 1.6, 3.62, 'rgba(255,255,255,0.78)')
    ctx.restore()
  },
}
