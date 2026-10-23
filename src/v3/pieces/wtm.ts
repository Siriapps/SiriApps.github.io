// Women Techmakers: a room of chairs fills row by row, the front chair becomes the speaker,
// and sound arcs roll out over the audience, marking each chair they reach.
import { C, F, clamp, ramp, smooth, spring, type Piece } from './motion'

const HOLD = 5.2
const SP = { x: 890, y: 138 } // speaker / front chair
const ROWS = [130, 185, 240, 295, 350, 405]
const SPAN = (42 * Math.PI) / 180
const EMIT = [2.85, 3.27, 3.69, 4.11]
const LIFE = 1.0
const R0 = 40, SPEED = 430

const hex = (h: string) => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16))
function mix(a: string, b: string, k: number) {
  const A = hex(a), B = hex(b), q = clamp(k)
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * q)).join(',')})`
}
function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath(); ctx.roundRect(x, y, w, h, Math.min(r, w / 2, h / 2))
}
function stage(ctx: CanvasRenderingContext2D, W: number, H: number, bg: string) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H)
  const s = Math.min(W / 1280, H / 720)
  ctx.setTransform(s, 0, 0, s, (W - 1280 * s) / 2, (H - 720 * s) / 2)
}
function fit(ctx: CanvasRenderingContext2D, lines: string[], fam: string, size: number, maxW: number) {
  ctx.font = `${size}px ${fam}`
  const w = Math.max(...lines.map(l => ctx.measureText(l).width))
  const s = w > maxW ? (size * maxW) / w : size
  ctx.font = `${s}px ${fam}`
  return s
}

type Chair = { x: number; y: number; a: number; d: number; start: number }
const chairs: Chair[] = []
ROWS.forEach((r, row) => {
  const n = Math.floor((r * 2 * SPAN) / 46) + 1
  for (let i = 0; i < n; i++) {
    const u = n === 1 ? 0 : i / (n - 1) - 0.5
    const th = Math.PI / 2 + u * 2 * SPAN
    const x = SP.x + Math.cos(th) * r, y = SP.y + Math.sin(th) * r
    const fromCenter = Math.abs(i - (n - 1) / 2)
    chairs.push({ x, y, a: th, d: r, start: 0.3 + row * 0.2 + fromCenter * 0.035 })
  }
})

function seek(t: number, ctx: CanvasRenderingContext2D, W: number, H: number) {
  const T = Math.min(t, HOLD)
  stage(ctx, W, H, C.white)

  // floor line of the stage, a quiet anchor for the room
  const stageA = smooth(ramp(T, 0.05, 0.6))
  ctx.strokeStyle = 'rgba(15,23,51,0.12)'; ctx.lineWidth = 2
  ctx.beginPath(); ctx.arc(SP.x, SP.y, 78, Math.PI / 2 - SPAN * stageA, Math.PI / 2 + SPAN * stageA); ctx.stroke()

  // ripples (drawn under chairs)
  for (const e of EMIT) {
    const a = (T - e) / LIFE
    if (a <= 0 || a >= 1) continue
    const r = R0 + a * SPEED
    ctx.strokeStyle = C.pink; ctx.globalAlpha = Math.pow(1 - a, 1.4) * 0.9; ctx.lineWidth = 1.5 + 3 * (1 - a)
    ctx.beginPath(); ctx.arc(SP.x, SP.y, r, Math.PI / 2 - SPAN - 0.08, Math.PI / 2 + SPAN + 0.08); ctx.stroke()
  }
  ctx.globalAlpha = 1

  for (const c of chairs) {
    const s = spring(T - c.start, 380, 15)
    if (s <= 0.001) continue
    let lit = 0
    for (const e of EMIT) {
      const a = (T - e) / LIFE
      if (a <= 0 || a >= 1) continue
      const r = R0 + a * SPEED
      lit = Math.max(lit, Math.exp(-(((c.d - r) / 26) ** 2)) * (1 - a))
    }
    const heard = clamp((T - (EMIT[0] + (c.d - R0) / SPEED / (1 / LIFE))) / 0.15)
    ctx.save(); ctx.translate(c.x, c.y); ctx.rotate(c.a - Math.PI / 2); ctx.scale(s, s)
    ctx.translate(0, -lit * 4)
    ctx.fillStyle = mix('#dfe3ee', '#f8c3df', lit * 1.3)
    rr(ctx, -12, -12, 24, 24, 6); ctx.fill()
    // backrest on the side away from the speaker
    ctx.fillStyle = mix('#b9c0d4', C.pink, heard)
    rr(ctx, -12, 7, 24, 5, 2.5); ctx.fill()
    ctx.restore()
  }

  // the front chair becomes the speaker
  {
    const pop = spring(T - 0.1, 380, 15)
    const pink = smooth(ramp(T, 2.15, 2.5))
    const grow = spring(T - 2.4, 220, 16)
    const size = (24 + 40 * grow) * pop
    const rad = 6 + (size / 2 - 6) * clamp(grow * 1.1)
    if (pop > 0.001) {
      // soft halo once it speaks
      const halo = smooth(ramp(T, 2.6, 3.0))
      if (halo > 0) {
        const g = ctx.createRadialGradient(SP.x, SP.y, 10, SP.x, SP.y, 90)
        g.addColorStop(0, `rgba(240,106,176,${0.22 * halo})`); g.addColorStop(1, 'rgba(240,106,176,0)')
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(SP.x, SP.y, 90, 0, Math.PI * 2); ctx.fill()
      }
      ctx.fillStyle = mix('#dfe3ee', C.pink, pink)
      rr(ctx, SP.x - size / 2, SP.y - size / 2, size, size, rad); ctx.fill()
      // three short sound arcs beside the dot, drawing in and staying
      for (let k = 0; k < 3; k++) {
        const p = smooth(ramp(T, 2.75 + k * 0.12, 3.1 + k * 0.12))
        if (p <= 0) continue
        const r = 44 + k * 13
        ctx.strokeStyle = C.pink; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.globalAlpha = 1 - k * 0.22
        for (const side of [0, Math.PI]) {
          ctx.beginPath(); ctx.arc(SP.x, SP.y, r, side - 0.42 * p, side + 0.42 * p); ctx.stroke()
        }
      }
      ctx.globalAlpha = 1
    }
  }

  // type: serif rises out of a mask, mono types on
  const X = 102, maxW = 470
  const lines = ['Women Techmakers', 'Ambassador']
  const size = fit(ctx, lines, F.display, 60, maxW)
  const base = [292, 292 + size * 1.12]
  lines.forEach((l, i) => {
    const p = spring(T - 3.2 - i * 0.14, 190, 22)
    if (p <= 0.001) return
    ctx.save(); ctx.beginPath(); ctx.rect(X - 10, base[i] - size * 1.05, maxW + 40, size * 1.32); ctx.clip()
    ctx.fillStyle = C.navy; ctx.textBaseline = 'alphabetic'
    ctx.fillText(l, X, base[i] + (1 - p) * size * 1.2)
    ctx.restore()
  })
  // pink tick under the title
  const tick = smooth(ramp(T, 3.6, 4.0))
  ctx.fillStyle = C.pink; ctx.fillRect(X, base[1] + 24, 56 * tick, 4)

  const sub = ['Google, workshops and talks', 'for UT Dallas builders']
  const ms = fit(ctx, sub, F.mono, 20, maxW)
  const total = sub.join('').length
  const shown = Math.floor(ramp(T, 3.9, 4.75) * total)
  let used = 0
  ctx.fillStyle = 'rgba(15,23,51,0.72)'
  sub.forEach((l, i) => {
    const n = clamp(shown - used, 0, l.length)
    const y = base[1] + 70 + i * ms * 1.55
    ctx.fillText(l.slice(0, n), X, y)
    const active = shown < total && shown >= used && (shown < used + l.length || i === sub.length - 1)
    if (active && T > 3.9) {
      const w = ctx.measureText(l.slice(0, n)).width
      ctx.fillStyle = C.pink; ctx.fillRect(X + w + 3, y - ms * 0.8, ms * 0.55, ms); ctx.fillStyle = 'rgba(15,23,51,0.72)'
    }
    used += l.length
  })
}

export const piece: Piece = { slug: 'wtm', title: 'Google Women Techmakers Ambassador', duration: 6, seek }
