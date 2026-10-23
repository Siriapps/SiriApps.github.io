import { C, F, clamp, ramp, smooth, spring, type Piece } from './motion'

// Device: a live sentiment line that flattens and contracts into the underline of the result.
const lerp = (a: number, b: number, k: number) => a + (b - a) * k
const hash = (n: number) => { const s = Math.sin(n * 91.3 + 17.1) * 43758.5453; return s - Math.floor(s) }
const X0 = 102, X1 = 1178, MID = 330, AMP = 120
const HOLD = 5.2
// sentiment in [-1, 1] at u in [0, 1], seeded and smooth
function senti(u: number) {
  let v = 0.55 * Math.sin(u * 7.1 + 0.4) + 0.3 * Math.sin(u * 15.3 + 1.9) + 0.12 * Math.sin(u * 31 + 0.7)
  const i = Math.floor(u * 24), f = u * 24 - i, sf = f * f * (3 - 2 * f)
  v += 0.18 * (lerp(hash(i), hash(i + 1), sf) - 0.5)
  return clamp(v, -1, 1)
}
const DOTS: { u: number; label: string; c: string }[] = [
  { u: 0.2, label: 'calm +0.41', c: C.blue },
  { u: 0.52, label: 'tense -0.38', c: C.pink },
  { u: 0.8, label: 'upbeat +0.77', c: C.violet },
]

function seek(time: number, ctx: CanvasRenderingContext2D, W: number, H: number) {
  const t = Math.min(time, HOLD)
  ctx.save()
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.fillStyle = C.paper
  ctx.fillRect(0, 0, W, H)
  const s = Math.min(W / 1280, H / 720)
  ctx.setTransform(s, 0, 0, s, (W - 1280 * s) / 2, (H - 720 * s) / 2)

  // measure the result word first; the line lands exactly under it
  ctx.font = `400 250px ${F.display}`
  const wordW = ctx.measureText('3rd').width
  const UX0 = X0, UX1 = X0 + wordW, UY = 452

  const draw = smooth(ramp(t, 0.2, 2.6))     // left to right reveal
  const r = smooth(ramp(t, 3.0, 3.75))        // resolve into underline
  const grid = 1 - r

  // baselines
  ctx.globalAlpha = 0.9 * grid
  ctx.strokeStyle = 'rgba(18,26,47,0.08)'
  ctx.lineWidth = 1
  for (const gy of [MID - AMP, MID, MID + AMP]) { ctx.beginPath(); ctx.moveTo(X0, gy); ctx.lineTo(X1, gy); ctx.stroke() }
  ctx.fillStyle = 'rgba(18,26,47,0.4)'
  ctx.font = `400 13px ${F.mono}`
  ctx.textAlign = 'left'
  ctx.fillText('+1', X0, MID - AMP - 8)
  ctx.fillText('0', X0, MID - 8)
  ctx.fillText('-1', X0, MID + AMP - 8)
  ctx.globalAlpha = 1

  // line geometry, morphing from chart to underline
  const N = 220
  const pts: [number, number][] = []
  const head = draw
  for (let i = 0; i <= N; i++) {
    const u = (i / N) * head
    const cx = lerp(X0 + 40, X1, u), cy = MID - senti(u) * AMP
    // during resolve, the drawn span maps onto the underline span
    const ux = lerp(UX0, UX1, i / N)
    pts.push([lerp(cx, ux, r), lerp(cy, UY, r)])
  }

  // soft fill
  if (head > 0) {
    const g = ctx.createLinearGradient(0, MID - AMP, 0, MID + AMP + 60)
    g.addColorStop(0, 'rgba(124,92,255,0.22)')
    g.addColorStop(1, 'rgba(124,92,255,0)')
    ctx.globalAlpha = 1 - r
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.moveTo(pts[0][0], MID + AMP + 60)
    for (const p of pts) ctx.lineTo(p[0], p[1])
    ctx.lineTo(pts[N][0], MID + AMP + 60)
    ctx.closePath()
    ctx.fill()
    ctx.globalAlpha = 1
  }

  // the line itself
  if (head > 0) {
    ctx.strokeStyle = C.violet
    ctx.lineWidth = lerp(3, 10, r)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])))
    ctx.stroke()
    // live head
    if (draw < 1) {
      const p = pts[N]
      ctx.fillStyle = C.violet
      ctx.beginPath(); ctx.arc(p[0], p[1], 6, 0, Math.PI * 2); ctx.fill()
      ctx.globalAlpha = 0.25
      ctx.beginPath(); ctx.arc(p[0], p[1], 6 + 10 * ((t * 2.5) % 1), 0, Math.PI * 2); ctx.fill()
      ctx.globalAlpha = 1
    }
  }

  // dots pop as the head passes them
  for (const d of DOTS) {
    const passT = 0.2 + 2.4 * invSmooth(d.u)
    const k = spring(t - passT, 260, 14)
    const fade = 1 - smooth(ramp(t, 3.0, 3.35))
    if (k <= 0 || fade <= 0) continue
    // ride the line as it morphs
    const [x, y] = r > 0 ? pts[Math.round(d.u * N)] : [X0 + 40 + (X1 - X0 - 40) * d.u, MID - senti(d.u) * AMP]
    ctx.globalAlpha = fade
    ctx.fillStyle = C.paper
    ctx.strokeStyle = d.c
    ctx.lineWidth = 3
    ctx.beginPath(); ctx.arc(x, y, 9 * k, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
    // label tag above or below, away from the curve
    const up = senti(d.u) < 0.2
    const ly = up ? y - 34 : y + 44
    const lk = clamp(spring(t - passT - 0.08, 220, 18))
    ctx.font = `500 15px ${F.mono}`
    const tw = ctx.measureText(d.label).width
    ctx.globalAlpha = fade * lk
    ctx.fillStyle = d.c
    roundRect(ctx, x - tw / 2 - 10, ly - 18 + (1 - lk) * 8, tw + 20, 28, 6)
    ctx.fill()
    ctx.fillStyle = '#fff'
    ctx.textAlign = 'center'
    ctx.fillText(d.label, x, ly + 1 + (1 - lk) * 8)
    ctx.globalAlpha = 1
  }

  // the result, rising out of the underline
  const rise = spring(t - 3.55, 150, 17)
  if (rise > 0) {
    ctx.save()
    ctx.beginPath(); ctx.rect(0, 0, 1280, UY - 10); ctx.clip()
    ctx.fillStyle = C.ink
    ctx.font = `400 250px ${F.display}`
    ctx.textAlign = 'left'
    ctx.fillText('3rd', UX0, UY - 22 + (1 - rise) * 230)
    ctx.restore()
  }

  // mono captions
  const cap = 'HackUTD 2025, T-Mobile track, HarmoniQ'
  const ck = smooth(ramp(t, 4.1, 4.6))
  if (ck > 0) {
    ctx.globalAlpha = ck
    ctx.fillStyle = C.ink
    ctx.font = `400 22px ${F.mono}`
    ctx.textAlign = 'left'
    ctx.fillText(cap, UX0 + (1 - ck) * -24, 520)
    const k2 = smooth(ramp(t, 4.4, 4.9))
    ctx.globalAlpha = k2
    ctx.fillStyle = C.violet
    ctx.font = `500 18px ${F.mono}`
    ctx.fillText('plus the MLH Auth0 prize', UX0 + (1 - k2) * -24, 558)
    ctx.globalAlpha = 1
  }
  ctx.restore()
}

// time fraction at which smooth(x) reaches u
function invSmooth(u: number) { let lo = 0, hi = 1; for (let i = 0; i < 20; i++) { const m = (lo + hi) / 2; if (smooth(m) < u) lo = m; else hi = m } return (lo + hi) / 2 }
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath()
}

export const piece: Piece = { slug: 'hackutd', title: '3rd Place and MLH Auth0, HackUTD 2025', duration: 6, seek }
