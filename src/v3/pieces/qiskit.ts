import { C, F, clamp, ramp, smooth, spring, type Piece } from './motion'

// Device: a circuit builds gate by gate; the measured classical bit runs down as a double wire and writes the title.
const lerp = (a: number, b: number, k: number) => a + (b - a) * k
const WX0 = 170, WX1 = 1040
const WY = [170, 255, 340]
const HOLD = 5.2
const G = 58 // gate size

type Gate = { at: number; x: number; q: number; label: string; c: string }
const GATES: Gate[] = [
  { at: 0.95, x: 300, q: 0, label: 'H', c: C.orange },
  { at: 1.25, x: 430, q: 1, label: 'X', c: C.pink },
  { at: 1.55, x: 300 + 270, q: 2, label: 'H', c: C.orange },
]
const CNOT = { at: 1.9, x: 730, c: 0, tg: 2 }
const CNOT2 = { at: 2.2, x: 860, c: 1, tg: 2 }
const METER_X = 1040

function seek(time: number, ctx: CanvasRenderingContext2D, W: number, H: number) {
  const t = Math.min(time, HOLD)
  ctx.save()
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.fillStyle = C.navy
  ctx.fillRect(0, 0, W, H)
  const s = Math.min(W / 1280, H / 720)
  ctx.setTransform(s, 0, 0, s, (W - 1280 * s) / 2, (H - 720 * s) / 2)
  ctx.textBaseline = 'middle'
  ctx.lineCap = 'round'

  // wires draw left to right
  for (let q = 0; q < 3; q++) {
    const k = smooth(ramp(t, 0.1 + q * 0.12, 0.9 + q * 0.12))
    ctx.globalAlpha = 1
    ctx.strokeStyle = 'rgba(255,255,255,0.55)'
    ctx.lineWidth = 2
    ctx.beginPath(); ctx.moveTo(WX0, WY[q]); ctx.lineTo(lerp(WX0, WX1, k), WY[q]); ctx.stroke()
    ctx.globalAlpha = clamp(k * 3)
    ctx.fillStyle = 'rgba(255,255,255,0.6)'
    ctx.font = `400 18px ${F.mono}`
    ctx.textAlign = 'right'
    ctx.fillText(`q${q}`, WX0 - 46, WY[q])
    ctx.fillStyle = 'rgba(255,255,255,0.35)'
    ctx.fillText('|0⟩', WX0 - 8, WY[q])
  }
  ctx.globalAlpha = 1

  // single-qubit gates drop in from above, alternate ones from below
  GATES.forEach((g, i) => {
    const k = spring(t - g.at, 200, 16)
    if (k <= 0) return
    const dir = i % 2 ? 1 : -1
    const y = WY[g.q] + dir * (1 - k) * 160
    ctx.globalAlpha = clamp((t - g.at) * 6)
    gateBox(ctx, g.x, y, g.label, g.c)
  })
  ctx.globalAlpha = 1

  // CNOTs: the vertical link grows, then dot and target pop
  for (const cn of [CNOT, CNOT2]) {
    const lk = smooth(ramp(t, cn.at, cn.at + 0.25))
    if (lk <= 0) continue
    const yc = WY[cn.c], yt = WY[cn.tg]
    ctx.strokeStyle = C.blue
    ctx.lineWidth = 3
    ctx.beginPath(); ctx.moveTo(cn.x, yc); ctx.lineTo(cn.x, lerp(yc, yt, lk)); ctx.stroke()
    const dk = spring(t - cn.at, 300, 14)
    ctx.fillStyle = C.blue
    ctx.beginPath(); ctx.arc(cn.x, yc, 9 * dk, 0, Math.PI * 2); ctx.fill()
    const tk = spring(t - cn.at - 0.2, 300, 14)
    if (tk > 0) {
      const r = 22 * tk
      ctx.fillStyle = C.navy
      ctx.beginPath(); ctx.arc(cn.x, yt, r, 0, Math.PI * 2); ctx.fill()
      ctx.lineWidth = 3
      ctx.beginPath(); ctx.arc(cn.x, yt, r, 0, Math.PI * 2); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(cn.x - r, yt); ctx.lineTo(cn.x + r, yt); ctx.moveTo(cn.x, yt - r); ctx.lineTo(cn.x, yt + r); ctx.stroke()
    }
  }

  // measurement meters land at the end of each wire
  for (let q = 0; q < 3; q++) {
    const at = 2.55 + q * 0.12
    const k = spring(t - at, 260, 15)
    if (k <= 0) continue
    const y = WY[q] - (1 - k) * 90
    ctx.globalAlpha = clamp((t - at) * 6)
    // needle swings from left, settles at a seeded angle
    const settle = [-0.35, 0.3, 0.5][q]
    const ang = lerp(-1.2, settle, spring(t - at - 0.1, 90, 7))
    meter(ctx, METER_X, y, ang)
  }
  ctx.globalAlpha = 1

  // classical double wire: from the q2 meter down, then left along the title baseline
  const TY = 560
  const down = smooth(ramp(t, 3.0, 3.35))
  const left = smooth(ramp(t, 3.35, 4.15))
  const bx = METER_X
  if (down > 0) {
    ctx.strokeStyle = C.sun
    ctx.lineWidth = 1.6
    const by0 = WY[2] + G / 2
    const by = lerp(by0, TY, down)
    const lx = lerp(bx, WX0 - 46 - 20, left)
    for (const o of [-3, 3]) {
      ctx.beginPath()
      ctx.moveTo(bx + o, by0)
      ctx.lineTo(bx + o, by + (left > 0 ? o : 0))
      if (left > 0) ctx.lineTo(lx, TY + o)
      ctx.stroke()
    }
    if (left > 0 && left < 1) { ctx.fillStyle = C.sun; ctx.beginPath(); ctx.arc(lx, TY, 5, 0, Math.PI * 2); ctx.fill() }
  }

  // title written by the passing bit (revealed right to left, behind the wire head)
  if (left > 0) {
    const lx = lerp(bx, WX0 - 66, left)
    ctx.save()
    ctx.beginPath(); ctx.rect(lx, 380, 1280 - lx, 200); ctx.clip()
    ctx.fillStyle = '#fff'
    ctx.font = `400 104px ${F.display}`
    ctx.textAlign = 'left'
    ctx.textBaseline = 'alphabetic'
    ctx.fillText('Qiskit Advocate', WX0 - 66, TY - 22)
    ctx.restore()
  }

  const ck = smooth(ramp(t, 4.15, 4.7))
  if (ck > 0) {
    ctx.globalAlpha = ck
    ctx.fillStyle = 'rgba(255,255,255,0.8)'
    ctx.font = `400 21px ${F.mono}`
    ctx.textAlign = 'left'
    ctx.textBaseline = 'alphabetic'
    ctx.fillText('IBM Quantum, certified at 13, advocate since 2025', WX0 - 66, TY + 50 - (1 - ck) * 10)
    ctx.globalAlpha = 1
  }
  ctx.restore()
}

function gateBox(ctx: CanvasRenderingContext2D, x: number, y: number, label: string, c: string) {
  ctx.fillStyle = C.navy2
  ctx.fillRect(x - G / 2, y - G / 2, G, G)
  ctx.strokeStyle = c
  ctx.lineWidth = 2.5
  ctx.strokeRect(x - G / 2, y - G / 2, G, G)
  ctx.fillStyle = c
  ctx.font = `400 32px ${F.display}`
  ctx.textAlign = 'center'
  ctx.fillText(label, x, y + 2)
}

function meter(ctx: CanvasRenderingContext2D, x: number, y: number, ang: number) {
  const w = 74, h = G
  ctx.fillStyle = C.navy2
  ctx.fillRect(x - w / 2, y - h / 2, w, h)
  ctx.strokeStyle = C.sun
  ctx.lineWidth = 2.5
  ctx.strokeRect(x - w / 2, y - h / 2, w, h)
  const cx = x, cy = y + 14
  ctx.beginPath(); ctx.arc(cx, cy, 22, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.sin(ang) * 30, cy - Math.cos(ang) * 30); ctx.stroke()
  ctx.fillStyle = C.sun
  ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill()
}

export const piece: Piece = { slug: 'qiskit', title: 'IBM Qiskit Advocate', duration: 6, seek }
