import { type Piece, spring, track, ramp, smooth, clamp, C, F } from './motion'

// A knowledge graph builds itself, one concept goes grey (forgotten), Pondr pulls it back,
// then the graph steps aside and a serif "1st" stamps down onto the page.
const hash = (n: number) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x) }

const LABELS = ['gradient', 'chain rule', 'Bayes rule', 'priors', 'entropy', 'eigenvector', 'loss', 'softmax', 'KL div', 'likelihood', 'Markov', 'attention', 'basis', 'variance']
const COLS = 5
const NODES = LABELS.map((label, i) => {
  const c = i % COLS, r = Math.floor(i / COLS)
  const x = 150 + c * 205 + (hash(i) - 0.5) * 100 + (r % 2) * 60
  const y = 165 + r * 200 + (hash(i + 40) - 0.5) * 90
  return { x, y, label, rad: 9 + hash(i + 80) * 7, at: 0.1 + (x - 150) / 1100 * 1.3 }
})
const TARGET = 2 // 'Bayes rule'
// Each node joins its two nearest neighbours; edge appears once both ends exist.
const EDGES: [number, number][] = []
NODES.forEach((a, i) => {
  const near = NODES.map((b, j) => ({ j, d: Math.hypot(a.x - b.x, a.y - b.y) })).filter(o => o.j !== i).sort((p, q) => p.d - q.d).slice(0, 2)
  near.forEach(({ j }) => { if (!EDGES.some(([p, q]) => (p === i && q === j) || (p === j && q === i))) EDGES.push([i, j]) })
})

const HOLD = 5.2

function seek(t0: number, ctx: CanvasRenderingContext2D, W: number, H: number) {
  const t = Math.min(t0, HOLD)
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.globalAlpha = 1
  ctx.fillStyle = C.white
  ctx.fillRect(0, 0, W, H)
  const s = Math.min(W / 1280, H / 720)
  ctx.setTransform(s, 0, 0, s, (W - 1280 * s) / 2, (H - 720 * s) / 2)

  // Graph camera: full frame, then it slides right and shrinks to make room for the stamp.
  const move = track(t, [[0, 0], [3.0, 1]], 90, 19)
  const gs = 1 - 0.47 * move
  const gx = 0 + 610 * move, gy = 0 + 130 * move
  const P = (n: { x: number; y: number }) => ({ x: gx + n.x * gs, y: gy + n.y * gs })

  const forget = smooth(ramp(t, 1.3, 1.6))     // target node greys out
  const back = smooth(ramp(t, 2.1, 2.45))     // and comes back
  const pink = forget * (1 - back) < 0.5 && back > 0

  // edges
  ctx.lineCap = 'round'
  EDGES.forEach(([i, j], k) => {
    const a = NODES[i], b = NODES[j]
    const start = Math.max(a.at, b.at) + 0.12 + hash(k + 200) * 0.2
    const p = smooth(ramp(t, start, start + 0.45))
    if (p <= 0) return
    const A = P(a), B = P(b)
    const touches = i === TARGET || j === TARGET
    ctx.setLineDash(touches && forget > 0.5 && !pink ? [4 * gs, 6 * gs] : [])
    ctx.strokeStyle = touches && pink ? C.pink : touches && forget > 0.5 ? '#c9cfdd' : '#b7bfd3'
    ctx.lineWidth = (touches && pink ? 3 : 1.6) * gs
    ctx.globalAlpha = touches ? 1 - 0.55 * forget * (1 - back) : 1
    ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(A.x + (B.x - A.x) * p, A.y + (B.y - A.y) * p); ctx.stroke()
  })
  ctx.setLineDash([]); ctx.globalAlpha = 1

  // resurfacing rings: three, finite, all gone before the hold
  const T = P(NODES[TARGET])
  for (let r = 0; r < 3; r++) {
    const p = ramp(t, 2.15 + r * 0.22, 2.95 + r * 0.22)
    if (p <= 0 || p >= 1) continue
    ctx.strokeStyle = C.pink; ctx.globalAlpha = (1 - p) * 0.8; ctx.lineWidth = 2.5 * gs
    ctx.beginPath(); ctx.arc(T.x, T.y, (16 + p * 80) * gs, 0, Math.PI * 2); ctx.stroke()
  }
  ctx.globalAlpha = 1

  // nodes
  ctx.textBaseline = 'middle'
  NODES.forEach((n, i) => {
    const sc = spring(t - n.at, 300, 13)
    if (sc <= 0.001) return
    const p = P(n)
    const isT = i === TARGET
    let r = n.rad * sc * gs
    if (isT) r *= 1 + 0.6 * back * (1 - ramp(t, 2.6, 3.0)) + 0.25 * back
    const grey = isT ? forget * (1 - back) : 0
    ctx.fillStyle = isT && back > 0 ? C.pink : grey > 0.5 ? '#ffffff' : C.navy
    ctx.strokeStyle = grey > 0.5 ? '#aab2c6' : 'transparent'
    ctx.lineWidth = 2 * gs
    ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(0, r), 0, Math.PI * 2); ctx.fill()
    if (grey > 0.5) { ctx.setLineDash([3 * gs, 3 * gs]); ctx.stroke(); ctx.setLineDash([]) }
    // labels fade out once the graph is shrinking
    const la = clamp(sc) * (1 - smooth(ramp(t, 2.9, 3.3))) * (isT ? 1 - 0.6 * grey : 0.75)
    if (la > 0.01) {
      ctx.globalAlpha = la
      ctx.font = `${isT && back > 0 ? 500 : 400} ${15 * gs}px ${F.mono}`
      ctx.fillStyle = isT && back > 0 ? C.pink : C.ink
      ctx.textAlign = 'left'
      ctx.fillText(n.label, p.x + r + 9 * gs, p.y + 1)
      ctx.globalAlpha = 1
    }
  })

  // "resurfaced" tag next to the target
  const tagA = smooth(ramp(t, 2.3, 2.5)) * (1 - smooth(ramp(t, 2.9, 3.2)))
  if (tagA > 0.01) {
    ctx.globalAlpha = tagA
    ctx.font = `500 ${13 * gs}px ${F.mono}`
    ctx.textAlign = 'left'
    const tx = T.x + 30 * gs, ty = T.y - 52 * gs
    const w = ctx.measureText('RESURFACED 14d').width
    ctx.fillStyle = C.pink
    ctx.fillRect(tx - 8 * gs, ty - 13 * gs, w + 16 * gs, 26 * gs)
    ctx.fillStyle = C.white
    ctx.fillText('RESURFACED 14d', tx, ty + 1)
    ctx.globalAlpha = 1
  }

  // the stamp: big serif "1st" drops from oversize, lands with a small recoil
  const st = t - 3.15
  ctx.font = `300px ${F.display}`
  const half = ctx.measureText('1st').width / 2
  if (st > 0) {
    const land = spring(st, 420, 22)
    const sc = 1 + 0.9 * (1 - land)
    const rot = (-0.06) * (1 - land) - 0.035
    const a = clamp(st / 0.08)
    ctx.save()
    ctx.translate(108 + half, 400)
    ctx.rotate(rot)
    ctx.scale(sc, sc)
    ctx.globalAlpha = a
    ctx.font = `300px ${F.display}`
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'
    ctx.fillStyle = C.navy
    ctx.fillText('1st', 0, 0)
    ctx.restore()
    // impact ring: ink squash line under the letters
    const imp = ramp(t, 3.22, 3.6)
    if (imp > 0 && imp < 1) {
      ctx.strokeStyle = C.navy; ctx.globalAlpha = (1 - imp) * 0.35; ctx.lineWidth = 2
      ctx.beginPath(); ctx.ellipse(108 + half, 405, 150 + imp * 90, 10 + imp * 6, 0, 0, Math.PI * 2); ctx.stroke()
      ctx.globalAlpha = 1
    }
  }

  // pink underline drawn left to right, slightly angled like a marker stroke
  const ul = smooth(ramp(t, 3.55, 4.0))
  if (ul > 0) {
    ctx.strokeStyle = C.pink; ctx.lineWidth = 12; ctx.lineCap = 'round'
    ctx.beginPath(); ctx.moveTo(108, 446); ctx.lineTo(108 + 300 * ul, 446 - 8 * ul); ctx.stroke()
  }

  // mono line types on, character by character
  const line = 'HackAI Dallas 2026, Pondr'
  const n = Math.floor(clamp((t - 3.95) / 0.75) * line.length + 0.0001)
  if (n > 0) {
    ctx.font = `400 28px ${F.mono}`
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'
    ctx.fillStyle = C.ink
    ctx.fillText(line.slice(0, n), 108, 520)
    if (n < line.length) { const w = ctx.measureText(line.slice(0, n)).width; ctx.fillStyle = C.pink; ctx.fillRect(112 + w, 497, 3, 28) }
  }
}

export const piece: Piece = { slug: 'hackai', title: '1st Place, HackAI Dallas 2026', duration: 6, seek }
