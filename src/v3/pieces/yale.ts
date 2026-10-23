import { type Piece, spring, track, ramp, smooth, C, F } from './motion'

// A Bloch sphere draws itself in line, a circuit wire runs beneath it, an H gate
// ticks along the wire and, as it passes under the sphere, the state vector swings
// from |0> at the pole down to the equator. Then the title rises out of a mask.
const HOLD = 5.2
const TILT = 0.32          // view elevation, radians
const PHI = 0.62           // azimuth the state lands on

// project a point on the unit sphere (theta from +z, phi around z) to screen offsets
function proj(th: number, ph: number) {
  const x = Math.sin(th) * Math.cos(ph), y = Math.sin(th) * Math.sin(ph), z = Math.cos(th)
  return { x, y: -(z * Math.cos(TILT) - y * Math.sin(TILT)) }
}

function strokePath(ctx: CanvasRenderingContext2D, pts: { x: number; y: number }[], p: number) {
  if (p <= 0) return
  const n = Math.max(1, Math.floor((pts.length - 1) * p))
  ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y)
  for (let i = 1; i <= n; i++) ctx.lineTo(pts[i].x, pts[i].y)
  ctx.stroke()
}

function seek(t0: number, ctx: CanvasRenderingContext2D, W: number, H: number) {
  const t = Math.min(t0, HOLD)
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.globalAlpha = 1
  ctx.fillStyle = C.navy
  ctx.fillRect(0, 0, W, H)
  const s = Math.min(W / 1280, H / 720)
  ctx.setTransform(s, 0, 0, s, (W - 1280 * s) / 2, (H - 720 * s) / 2)

  const move = track(t, [[0, 0], [3.1, 1]], 80, 18)
  const cx = 640 + 320 * move, cy = 320 + 30 * move
  const R = 190 + 10 * move
  const line = (a: number) => `rgba(255,255,255,${a})`
  ctx.lineCap = 'round'; ctx.lineJoin = 'round'

  // outline circle, drawn clockwise from the top
  const N = 120
  const ring = Array.from({ length: N + 1 }, (_, i) => { const a = -Math.PI / 2 + (i / N) * Math.PI * 2; return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) } })
  ctx.strokeStyle = line(0.9); ctx.lineWidth = 2
  strokePath(ctx, ring, smooth(ramp(t, 0.05, 0.9)))

  // equator: back half dashed and dim, front half solid
  const eq = smooth(ramp(t, 0.35, 1.15))
  const eqBack = Array.from({ length: 61 }, (_, i) => { const q = proj(Math.PI / 2, Math.PI + (i / 60) * Math.PI); return { x: cx + R * q.x, y: cy + R * q.y } })
  const eqFront = Array.from({ length: 61 }, (_, i) => { const q = proj(Math.PI / 2, (i / 60) * Math.PI); return { x: cx + R * q.x, y: cy + R * q.y } })
  ctx.setLineDash([5, 7]); ctx.strokeStyle = line(0.35); ctx.lineWidth = 1.5
  strokePath(ctx, eqBack, eq)
  ctx.setLineDash([]); ctx.strokeStyle = line(0.75); ctx.lineWidth = 1.8
  strokePath(ctx, eqFront, eq)

  // meridian through the landing azimuth, top to bottom; its back half dashed
  const mer = smooth(ramp(t, 0.6, 1.4))
  const merPts = Array.from({ length: 81 }, (_, i) => { const q = proj((i / 80) * Math.PI, PHI); return { x: cx + R * q.x, y: cy + R * q.y } })
  ctx.strokeStyle = line(0.45); ctx.lineWidth = 1.4
  strokePath(ctx, merPts, mer)
  const merBack = Array.from({ length: 81 }, (_, i) => { const q = proj((i / 80) * Math.PI, PHI + Math.PI); return { x: cx + R * q.x, y: cy + R * q.y } })
  ctx.setLineDash([3, 7]); ctx.strokeStyle = line(0.22)
  strokePath(ctx, merBack, mer)
  ctx.setLineDash([])

  // z axis and pole labels
  const ax = smooth(ramp(t, 0.9, 1.4))
  if (ax > 0) {
    ctx.globalAlpha = ax
    ctx.strokeStyle = line(0.25); ctx.setLineDash([2, 6]); ctx.lineWidth = 1.2
    ctx.beginPath(); ctx.moveTo(cx, cy - R * Math.cos(TILT)); ctx.lineTo(cx, cy + R * Math.cos(TILT)); ctx.stroke()
    ctx.setLineDash([])
    ctx.font = `400 20px ${F.mono}`; ctx.fillStyle = line(0.85); ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'; ctx.fillText('|0⟩', cx, cy - R - 12)
    ctx.textBaseline = 'top'; ctx.fillText('|1⟩', cx, cy + R + 12)
    ctx.globalAlpha = 1
  }

  // state vector: theta springs from 0 to pi/2 when the gate passes, with overshoot
  const th = (Math.PI / 2) * spring(t - 2.2, 110, 7)
  const tip = proj(th, PHI)
  const vecA = smooth(ramp(t, 1.1, 1.4))
  if (vecA > 0) {
    // ghost arc of the path travelled, close to the centre
    if (th > 0.02) {
      ctx.strokeStyle = C.sun; ctx.globalAlpha = 0.5 * vecA; ctx.lineWidth = 2; ctx.setLineDash([2, 5])
      ctx.beginPath()
      for (let i = 0; i <= 30; i++) { const q = proj((i / 30) * th, PHI); const X = cx + R * 0.34 * q.x, Y = cy + R * 0.34 * q.y; if (i) ctx.lineTo(X, Y); else ctx.moveTo(X, Y) }
      ctx.stroke(); ctx.setLineDash([])
    }
    ctx.globalAlpha = vecA
    const ex = cx + R * tip.x, ey = cy + R * tip.y
    ctx.strokeStyle = C.sun; ctx.lineWidth = 4
    const ang = Math.atan2(ey - cy, ex - cx)
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ex - 10 * Math.cos(ang), ey - 10 * Math.sin(ang)); ctx.stroke()
    ctx.fillStyle = C.sun
    ctx.beginPath(); ctx.moveTo(ex + 4 * Math.cos(ang), ey + 4 * Math.sin(ang))
    ctx.lineTo(ex - 16 * Math.cos(ang) + 8 * Math.sin(ang), ey - 16 * Math.sin(ang) - 8 * Math.cos(ang))
    ctx.lineTo(ex - 16 * Math.cos(ang) - 8 * Math.sin(ang), ey - 16 * Math.sin(ang) + 8 * Math.cos(ang))
    ctx.closePath(); ctx.fill()
    ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2); ctx.fill()
    const lab = smooth(ramp(t, 2.6, 2.9)) * (1 - smooth(ramp(t, 3.0, 3.3)))
    if (lab > 0) { ctx.globalAlpha = lab; ctx.font = `400 20px ${F.mono}`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('|+⟩', ex + 18, ey + 4) }
    ctx.globalAlpha = 1
  }

  // circuit wire under the sphere, H gate ticks along it in discrete steps
  const wireA = smooth(ramp(t, 0.6, 1.1)) * (1 - smooth(ramp(t, 2.95, 3.3)))
  if (wireA > 0) {
    const wy = 610
    ctx.globalAlpha = wireA
    ctx.strokeStyle = line(0.4); ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.moveTo(103, wy); ctx.lineTo(103 + (1177 - 103) * smooth(ramp(t, 0.6, 1.2)), wy); ctx.stroke()
    ctx.font = `400 18px ${F.mono}`; ctx.fillStyle = line(0.6); ctx.textAlign = 'left'; ctx.textBaseline = 'bottom'
    ctx.fillText('q0', 103, wy - 10)
    // each step is a short stiff spring; the gate sits under the sphere at t = 2.2
    const ticks: [number, number][] = [[0, 180], [1.25, 330], [1.6, 480], [1.95, 640], [2.45, 800], [2.75, 960], [3.05, 1110]]
    const gx = track(t, ticks, 520, 30)
    for (let i = 0; i < ticks.length; i++) { ctx.fillStyle = line(0.3); ctx.fillRect(ticks[i][1] - 1, wy + 28, 2, 8) }
    const hot = Math.exp(-Math.pow((gx - 640) / 50, 2)) * (t > 1.9 && t < 2.6 ? 1 : 0)
    ctx.fillStyle = hot > 0.3 ? C.sun : C.navy
    ctx.strokeStyle = hot > 0.3 ? C.sun : line(0.9); ctx.lineWidth = 2
    ctx.fillRect(gx - 22, wy - 22, 44, 44); ctx.strokeRect(gx - 22, wy - 22, 44, 44)
    ctx.fillStyle = hot > 0.3 ? C.navy : C.white
    ctx.font = `500 24px ${F.mono}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText('H', gx, wy + 1)
    if (hot > 0.05) { ctx.strokeStyle = C.sun; ctx.globalAlpha = wireA * hot * 0.6; ctx.setLineDash([3, 5]); ctx.beginPath(); ctx.moveTo(640, wy - 26); ctx.lineTo(640, cy + R + 44); ctx.stroke(); ctx.setLineDash([]) }
    ctx.globalAlpha = 1
  }

  // title: each line slides up out of a mask at its own baseline
  const reveal = (text: string, x: number, base: number, size: number, font: string, color: string, at: number) => {
    const p = spring(t - at, 200, 24)
    if (p <= 0) return
    ctx.save()
    ctx.beginPath(); ctx.rect(x - 10, base - size * 1.1, 700, size * 1.4); ctx.clip()
    ctx.font = font; ctx.fillStyle = color; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'
    ctx.fillText(text, x, base + size * 1.25 * (1 - p))
    ctx.restore()
  }
  reveal('1st Place', 103, 330, 120, `120px ${F.display}`, C.white, 3.3)
  const rule = smooth(ramp(t, 3.75, 4.25))
  if (rule > 0) { ctx.fillStyle = C.sun; ctx.fillRect(106, 372, 120 * rule, 4) }
  reveal('Yale Quantum Hackathon 2025,', 106, 440, 26, `400 26px ${F.mono}`, line(0.92), 3.95)
  reveal('BlueQubit Challenge', 106, 478, 26, `400 26px ${F.mono}`, C.sun, 4.15)
}

export const piece: Piece = { slug: 'yale', title: '1st Place, Yale Quantum Hackathon 2025', duration: 6, seek }
