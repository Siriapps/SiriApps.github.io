// HackerRank gold: three hex badges trace their outlines, fill with molten gold from the bottom,
// earn five stars each and get a label stamped under them. "Gold" settles on top.
import { C, F, clamp, ramp, smooth, spring, type Piece } from './motion'

const HOLD = 5.2
const R = 108
const CY = 410
const BADGES = [
  { x: 400, label: 'Python', tilt: -3 },
  { x: 640, label: 'C++', tilt: 2 },
  { x: 880, label: 'Problem Solving', tilt: -1.5 },
]
const GOLD_HI = '#ffe08a', GOLD = C.sun, GOLD_LO = '#f0a23a'

function stage(ctx: CanvasRenderingContext2D, W: number, H: number, bg: string) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H)
  const s = Math.min(W / 1280, H / 720)
  ctx.setTransform(s, 0, 0, s, (W - 1280 * s) / 2, (H - 720 * s) / 2)
}
function hexPath(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.beginPath()
  for (let i = 0; i < 6; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 3
    const px = x + Math.cos(a) * r, py = y + Math.sin(a) * r
    i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)
  }
  ctx.closePath()
}
function star(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.beginPath()
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.45 : r
    i ? ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr) : ctx.moveTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr)
  }
  ctx.closePath()
}

function seek(t: number, ctx: CanvasRenderingContext2D, W: number, H: number) {
  const T = Math.min(t, HOLD)
  stage(ctx, W, H, C.navy)

  // faint floor glow so the badges sit on something
  const g = ctx.createRadialGradient(640, 560, 20, 640, 560, 520)
  g.addColorStop(0, 'rgba(47,91,255,0.16)'); g.addColorStop(1, 'rgba(47,91,255,0)')
  ctx.fillStyle = g; ctx.fillRect(0, 0, 1280, 720)

  BADGES.forEach((b, i) => {
    const drawP = smooth(ramp(T, 0.3 + i * 0.22, 1.0 + i * 0.22))
    const f0 = 1.3 + i * 0.62, f1 = f0 + 0.85
    const level = smooth(ramp(T, f0, f1))
    const stampAt = f1 + 0.08
    const sa = T - stampAt
    const jolt = sa > 0.1 ? Math.sin(Math.min(1, (sa - 0.1) / 0.25) * Math.PI) * 3 : 0
    const cy = CY + jolt

    // outline traces itself
    if (drawP > 0) {
      const per = 6 * R
      ctx.save(); hexPath(ctx, b.x, cy, R)
      ctx.setLineDash([per * drawP, per]); ctx.lineDashOffset = 0
      ctx.strokeStyle = level > 0.98 ? GOLD_LO : 'rgba(255,209,102,0.85)'; ctx.lineWidth = 3; ctx.lineJoin = 'round'
      ctx.stroke(); ctx.restore()
      // a bright bead at the drawing tip
      if (drawP < 1) {
        const edge = drawP * 6, k = Math.floor(edge), u = edge - k
        const a0 = -Math.PI / 2 + (k * Math.PI) / 3, a1 = a0 + Math.PI / 3
        const px = b.x + (Math.cos(a0) + (Math.cos(a1) - Math.cos(a0)) * u) * R
        const py = cy + (Math.sin(a0) + (Math.sin(a1) - Math.sin(a0)) * u) * R
        ctx.fillStyle = GOLD_HI; ctx.beginPath(); ctx.arc(px, py, 4.5, 0, Math.PI * 2); ctx.fill()
      }
    }

    // molten fill rising from the bottom, wave calming as it fills
    if (level > 0) {
      ctx.save(); hexPath(ctx, b.x, cy, R - 1.5); ctx.clip()
      const top = cy + R - level * (2 * R + 16)
      const amp = 9 * (1 - level) * (level < 1 ? 1 : 0)
      const grad = ctx.createLinearGradient(0, cy - R, 0, cy + R)
      grad.addColorStop(0, GOLD_HI); grad.addColorStop(0.45, GOLD); grad.addColorStop(1, GOLD_LO)
      ctx.fillStyle = grad
      ctx.beginPath(); ctx.moveTo(b.x - R - 4, cy + R + 4)
      for (let x = -R - 4; x <= R + 4; x += 6) ctx.lineTo(b.x + x, top + Math.sin(x * 0.055 + T * 10 + i) * amp)
      ctx.lineTo(b.x + R + 4, cy + R + 4); ctx.closePath(); ctx.fill()

      // shine band sweeps across once all three are gold
      const sh = ramp(T, 4.25 + i * 0.12, 4.95 + i * 0.12)
      if (sh > 0 && sh < 1) {
        const sx = b.x - R * 1.6 + sh * R * 3.2
        const lg = ctx.createLinearGradient(sx - 40, 0, sx + 40, 0)
        lg.addColorStop(0, 'rgba(255,255,255,0)'); lg.addColorStop(0.5, 'rgba(255,255,255,0.55)'); lg.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = lg; ctx.save(); ctx.translate(sx, cy); ctx.transform(1, 0, -0.35, 1, 0, 0); ctx.translate(-sx, -cy)
        ctx.fillRect(sx - 40, cy - R, 80, 2 * R); ctx.restore()
      }
      ctx.restore()
    }

    // inset ring and the earned stars
    const done = T - f1
    if (done > 0) {
      ctx.strokeStyle = `rgba(15,23,51,${0.35 * smooth(ramp(done, 0, 0.3))})`; ctx.lineWidth = 2
      hexPath(ctx, b.x, cy, R - 14); ctx.stroke()
      const big = spring(done - 0.02, 320, 14)
      ctx.fillStyle = C.navy
      if (big > 0.001) { star(ctx, b.x, cy - 12, 34 * big); ctx.fill() }
      for (let k = 0; k < 5; k++) {
        const s = spring(done - 0.12 - k * 0.05, 420, 16)
        if (s <= 0.001) continue
        star(ctx, b.x + (k - 2) * 19, cy + 42, 7 * s); ctx.fill()
      }
    }

    // label stamps in under the badge
    if (sa > 0) {
      const press = smooth(ramp(sa, 0, 0.12))
      const sc = 1.7 - 0.7 * press
      ctx.save(); ctx.translate(b.x, CY + R + 66); ctx.rotate((b.tilt * Math.PI) / 180); ctx.scale(sc, sc)
      ctx.globalAlpha = press
      ctx.font = `500 17px ${F.mono}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      const w = ctx.measureText(b.label.toUpperCase()).width + 30
      ctx.strokeStyle = GOLD; ctx.lineWidth = 2
      ctx.beginPath(); ctx.roundRect(-w / 2, -18, w, 36, 4); ctx.stroke()
      ctx.fillStyle = GOLD; ctx.fillText(b.label.toUpperCase(), 0, 1)
      ctx.restore()
      // impact ring
      const ia = ramp(sa, 0.12, 0.42)
      if (ia > 0 && ia < 1) {
        ctx.save(); ctx.translate(b.x, CY + R + 66); ctx.rotate((b.tilt * Math.PI) / 180)
        ctx.font = `500 17px ${F.mono}`
        const w = ctx.measureText(b.label.toUpperCase()).width + 30 + ia * 26
        ctx.strokeStyle = `rgba(255,209,102,${0.6 * (1 - ia)})`; ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.roundRect(-w / 2, -18 - ia * 9, w, 36 + ia * 18, 6); ctx.stroke()
        ctx.restore()
      }
    }
  })

  // "Gold" settles from above, letter by letter
  ctx.font = `112px ${F.display}`; ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left'
  const word = 'Gold'
  const total = ctx.measureText(word).width
  let x = 640 - total / 2
  for (let k = 0; k < word.length; k++) {
    const ch = word[k], w = ctx.measureText(ch).width
    const p = spring(T - 3.75 - k * 0.07, 210, 13)
    if (p > 0.001) {
      ctx.globalAlpha = clamp(p * 1.4)
      ctx.fillStyle = C.white
      ctx.fillText(ch, x, 232 - (1 - p) * 70)
    }
    x += w
  }
  ctx.globalAlpha = 1
  const rule = smooth(ramp(T, 4.15, 4.6))
  ctx.fillStyle = GOLD; ctx.fillRect(640 - 70 * rule, 258, 140 * rule, 3)
}

export const piece: Piece = { slug: 'hackerrank', title: 'HackerRank gold badges', duration: 6, seek }
