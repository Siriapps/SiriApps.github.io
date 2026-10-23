// Adobe Certified Professional: the pen tool draws a closed shape anchor by anchor
// (handles pulled, curve traced), it fills pink to violet, chips stamp, the title rises.
import { C, F, ramp, smooth, spring, type Piece } from './motion'

const HOLD = 5.2
type P = [number, number]
const A: P[] = [[410, 128], [588, 352], [410, 592], [258, 420]]
const OUT: P[] = [[540, 168], [588, 486], [318, 590], [262, 300]]
const IN: P[] = [[316, 196], [588, 250], [500, 594], [254, 520]]
const SEG = (i: number) => 0.35 + i * 0.55 // segment i starts
const SEL = '#2f7bff'

function stage(ctx: CanvasRenderingContext2D, W: number, H: number, bg: string) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H)
  const s = Math.min(W / 1280, H / 720)
  ctx.setTransform(s, 0, 0, s, (W - 1280 * s) / 2, (H - 720 * s) / 2)
}
const L = (a: P, b: P, u: number): P => [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u]
// first part [0,u] of a cubic, as control points
function split(p0: P, p1: P, p2: P, p3: P, u: number): [P, P, P, P] {
  const a = L(p0, p1, u), b = L(p1, p2, u), c = L(p2, p3, u), d = L(a, b, u), e = L(b, c, u)
  return [p0, a, d, L(d, e, u)]
}
const seg = (i: number): [P, P, P, P] => [A[i], OUT[i], IN[(i + 1) % 4], A[(i + 1) % 4]]
function shape(ctx: CanvasRenderingContext2D) {
  ctx.beginPath(); ctx.moveTo(...A[0])
  for (let i = 0; i < 4; i++) { const s = seg(i); ctx.bezierCurveTo(...s[1], ...s[2], ...s[3]) }
  ctx.closePath()
}
function fit(ctx: CanvasRenderingContext2D, lines: string[], fam: string, size: number, maxW: number) {
  ctx.font = `${size}px ${fam}`
  const w = Math.max(...lines.map(l => ctx.measureText(l).width))
  const s = w > maxW ? (size * maxW) / w : size
  ctx.font = `${s}px ${fam}`
  return s
}

function seek(t: number, ctx: CanvasRenderingContext2D, W: number, H: number) {
  const T = Math.min(t, HOLD)
  stage(ctx, W, H, C.white)

  // faint artboard grid behind the drawing
  ctx.strokeStyle = 'rgba(15,23,51,0.05)'; ctx.lineWidth = 1
  for (let x = 140; x <= 680; x += 40) { ctx.beginPath(); ctx.moveTo(x, 90); ctx.lineTo(x, 630); ctx.stroke() }
  for (let y = 90; y <= 630; y += 40) { ctx.beginPath(); ctx.moveTo(140, y); ctx.lineTo(680, y); ctx.stroke() }

  const handlesA = 1 - smooth(ramp(T, 2.65, 3.0))
  const anchorsA = 1 - smooth(ramp(T, 3.25, 3.6))

  // fill: radial wipe out from the closing anchor
  const fill = smooth(ramp(T, 2.6, 3.4))
  if (fill > 0) {
    ctx.save(); shape(ctx); ctx.clip()
    const gr = ctx.createLinearGradient(270, 130, 560, 590)
    gr.addColorStop(0, C.pink); gr.addColorStop(1, C.violet)
    ctx.fillStyle = gr
    ctx.beginPath(); ctx.arc(A[0][0], A[0][1], 520 * fill, 0, Math.PI * 2); ctx.fill()
    // soft inner highlight
    const hl = ctx.createRadialGradient(360, 300, 10, 360, 300, 220)
    hl.addColorStop(0, `rgba(255,255,255,${0.22 * fill})`); hl.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = hl; ctx.fillRect(200, 100, 420, 520)
    ctx.restore()
  }

  // traced stroke
  let tip: P | null = null
  ctx.strokeStyle = C.navy; ctx.lineWidth = 2.5; ctx.lineJoin = 'round'; ctx.lineCap = 'round'
  ctx.beginPath(); ctx.moveTo(...A[0])
  for (let i = 0; i < 4; i++) {
    const u = smooth(ramp(T, SEG(i) + 0.12, SEG(i) + 0.55))
    if (u <= 0) break
    const s = split(...seg(i), u)
    ctx.bezierCurveTo(...s[1], ...s[2], ...s[3])
    if (u < 1) tip = s[3]
  }
  ctx.globalAlpha = 1 - 0.6 * fill
  ctx.stroke(); ctx.globalAlpha = 1

  // handles: pulled out of each anchor as the pen lands on it
  for (let i = 0; i < 4; i++) {
    const land = i === 0 ? 0.2 : SEG(i - 1) + 0.55
    const pull = smooth(ramp(T, land, land + 0.18))
    if (pull <= 0 || handlesA <= 0) continue
    ctx.globalAlpha = handlesA
    for (const h of [OUT[i], IN[i]]) {
      const e = L(A[i], h, pull)
      ctx.strokeStyle = SEL; ctx.lineWidth = 1.2
      ctx.beginPath(); ctx.moveTo(...A[i]); ctx.lineTo(...e); ctx.stroke()
      ctx.fillStyle = SEL; ctx.beginPath(); ctx.arc(e[0], e[1], 4.5, 0, Math.PI * 2); ctx.fill()
    }
    ctx.globalAlpha = 1
  }

  // anchors pop
  for (let i = 0; i < 4; i++) {
    const land = i === 0 ? 0.2 : SEG(i - 1) + 0.55
    const s = spring(T - land, 420, 14)
    if (s <= 0.001 || anchorsA <= 0) continue
    const z = 9 * s
    ctx.globalAlpha = anchorsA
    ctx.fillStyle = C.white; ctx.strokeStyle = SEL; ctx.lineWidth = 2
    ctx.fillRect(A[i][0] - z / 2, A[i][1] - z / 2, z, z); ctx.strokeRect(A[i][0] - z / 2, A[i][1] - z / 2, z, z)
    ctx.globalAlpha = 1
  }
  // closing ring on the first anchor
  const close = ramp(T, 2.5, 2.9)
  if (close > 0 && close < 1) {
    ctx.strokeStyle = `rgba(47,123,255,${1 - close})`; ctx.lineWidth = 2
    ctx.beginPath(); ctx.arc(A[0][0], A[0][1], 8 + close * 26, 0, Math.PI * 2); ctx.stroke()
  }

  // pen cursor riding the tip
  const penA = 1 - smooth(ramp(T, 2.55, 2.85))
  let last = 0
  for (let i = 1; i < 4; i++) if (T >= SEG(i - 1) + 0.55) last = i
  const pen: P = tip ?? (T >= SEG(3) + 0.55 ? A[0] : A[last])
  if (penA > 0 && T > 0.1) {
    ctx.save(); ctx.globalAlpha = penA * smooth(ramp(T, 0.1, 0.3)); ctx.translate(pen[0] + 3, pen[1] + 3); ctx.rotate(-0.6)
    ctx.fillStyle = C.navy
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(9, 16); ctx.lineTo(6, 26); ctx.lineTo(-6, 26); ctx.lineTo(-9, 16); ctx.closePath(); ctx.fill()
    ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(0, 15, 2.6, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = C.navy; ctx.fillRect(-7, 29, 14, 5)
    ctx.restore()
  }

  // chips stamp, then the title rises above them
  const X = 680, maxW = 1178 - X
  const lines = ['Adobe Certified', 'Professional']
  const size = fit(ctx, lines, F.display, 60, maxW)
  const base = [292, 292 + size * 1.1]
  lines.forEach((l, i) => {
    const p = spring(T - 3.95 - i * 0.14, 190, 22)
    if (p <= 0.001) return
    ctx.save(); ctx.beginPath(); ctx.rect(X - 10, base[i] - size * 1.05, maxW + 20, size * 1.3); ctx.clip()
    ctx.fillStyle = C.navy; ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left'
    ctx.fillText(l, X, base[i] + (1 - p) * size * 1.2)
    ctx.restore()
  })

  const chips = ['Illustrator', 'Photoshop', 'Visual Design']
  ctx.font = `16px ${F.mono}`; ctx.textBaseline = 'middle'; ctx.textAlign = 'center'
  let cx = X
  const cyChip = base[1] + 62
  chips.forEach((c, i) => {
    const w = ctx.measureText(c).width + 30
    const at = 3.35 + i * 0.2
    const press = smooth(ramp(T, at, at + 0.12))
    if (press > 0) {
      const settle = spring(T - at - 0.12, 400, 18)
      const rot = (i % 2 ? 1 : -1) * 0.12 * (1 - press) + (i % 2 ? -1 : 1) * 0.03 * (1 - settle) * (press >= 1 ? 1 : 0)
      const sc = 1.6 - 0.6 * press
      ctx.save(); ctx.translate(cx + w / 2, cyChip); ctx.rotate(rot); ctx.scale(sc, sc); ctx.globalAlpha = press
      ctx.fillStyle = i === 2 ? C.navy : C.white; ctx.strokeStyle = C.navy; ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.roundRect(-w / 2, -17, w, 34, 17); ctx.fill(); ctx.stroke()
      ctx.fillStyle = i === 2 ? C.white : C.navy; ctx.fillText(c, 0, 1)
      ctx.restore()
    }
    cx += w + 12
  })
  ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.globalAlpha = 1
}

export const piece: Piece = { slug: 'adobe', title: 'Adobe Certified Professional', duration: 6, seek }
