import { type Piece, spring, ramp, smooth, clamp, C, F } from './motion'

// A parity-check lattice fills in on a diagonal wave. A decoder threads one pink path
// across it, trying dead ends that go cold, while a serif counter beside the lattice
// climbs to 30x. The caption is swept on by a pink rule.
const hash = (n: number) => { const x = Math.sin(n * 91.7 + 17.3) * 43758.5453; return x - Math.floor(x) }
const HOLD = 5.2
const COLS = 12, ROWS = 8
const X0 = 112, Y0 = 118, DX = 44, DY = 44
const at = (c: number, r: number) => ({ x: X0 + c * DX, y: Y0 + r * DY })

// decoder path from the left edge to the right edge
const PATH: [number, number][] = (() => {
  let r = 4
  const out: [number, number][] = [[0, r]]
  for (let c = 1; c < COLS; c++) {
    const v = hash(c * 7 + 3)
    if (v < 0.34 && r > 1) { r--; out.push([c - 1, r]) }
    else if (v > 0.62 && r < ROWS - 2) { r++; out.push([c - 1, r]) }
    out.push([c, r])
  }
  return out
})()
const onPath = (c: number, r: number) => PATH.some(([pc, pr]) => pc === c && pr === r)
// dead ends the decoder tries and abandons: [path index, dc, dr, length]
const PROBES: [number, number, number, number][] = [[3, 0, 1, 2], [7, 0, -1, 2], [11, 1, 1, 1], [14, 0, 1, 2]]

const PATH_T0 = 1.15, PATH_T1 = 3.1

function seek(t0: number, ctx: CanvasRenderingContext2D, W: number, H: number) {
  const t = Math.min(t0, HOLD)
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.globalAlpha = 1
  ctx.fillStyle = C.white
  ctx.fillRect(0, 0, W, H)
  const s = Math.min(W / 1280, H / 720)
  ctx.setTransform(s, 0, 0, s, (W - 1280 * s) / 2, (H - 720 * s) / 2)
  ctx.lineCap = 'round'; ctx.lineJoin = 'round'

  const born = (c: number, r: number) => 0.08 + (c + r * 1.4) * 0.045 + hash(c * 31 + r) * 0.06
  const settle = smooth(ramp(t, 3.2, 3.8)) // lattice recedes once the path is found

  // lattice edges (right and down neighbours) and check squares in each cell
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    const a = at(c, r)
    const e = smooth(ramp(t, born(c, r) + 0.15, born(c, r) + 0.5))
    if (e <= 0) continue
    ctx.strokeStyle = `rgba(18,26,47,${0.13 - 0.05 * settle})`; ctx.lineWidth = 1.2
    ctx.beginPath()
    if (c < COLS - 1) { ctx.moveTo(a.x, a.y); ctx.lineTo(a.x + DX * e, a.y) }
    if (r < ROWS - 1) { ctx.moveTo(a.x, a.y); ctx.lineTo(a.x, a.y + DY * e) }
    ctx.stroke()
    if (c < COLS - 1 && r < ROWS - 1 && (c + r) % 2 === 0) {
      ctx.fillStyle = `rgba(124,92,255,${(0.28 - 0.12 * settle) * e})`
      ctx.fillRect(a.x + DX / 2 - 4, a.y + DY / 2 - 4, 8, 8)
    }
  }

  // probes: a short pink feeler that goes cold
  const head = clamp((t - PATH_T0) / (PATH_T1 - PATH_T0)) * (PATH.length - 1)
  for (const [i, dc, dr, len] of PROBES) {
    const tStart = PATH_T0 + (i / (PATH.length - 1)) * (PATH_T1 - PATH_T0)
    const grow = smooth(ramp(t, tStart, tStart + 0.18))
    const cold = smooth(ramp(t, tStart + 0.22, tStart + 0.5))
    if (grow <= 0 || i >= PATH.length) continue
    const [pc, pr] = PATH[i]
    let ec = pc + dc * len, er = pr + dr * len
    if (dc && dr) { ec = pc + dc; er = pr + dr * len }
    const A = at(pc, pr), B = at(dc && dr ? pc : ec, er)
    ctx.strokeStyle = cold < 1 ? `rgba(240,106,176,${0.85 * (1 - cold) + 0.0})` : 'transparent'
    ctx.lineWidth = 4
    ctx.setLineDash([2, 6])
    ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(A.x + (B.x - A.x) * grow, A.y + (B.y - A.y) * grow); ctx.stroke()
    ctx.setLineDash([])
    // a small cross where it gave up
    if (cold > 0 && cold < 1) {
      ctx.strokeStyle = `rgba(18,26,47,${0.5 * Math.sin(cold * Math.PI)})`; ctx.lineWidth = 2
      ctx.beginPath(); ctx.moveTo(B.x - 6, B.y - 6); ctx.lineTo(B.x + 6, B.y + 6); ctx.moveTo(B.x + 6, B.y - 6); ctx.lineTo(B.x - 6, B.y + 6); ctx.stroke()
    }
  }

  // the decoded path
  if (head > 0) {
    ctx.strokeStyle = C.pink; ctx.lineWidth = 5
    ctx.beginPath()
    const p0 = at(PATH[0][0], PATH[0][1]); ctx.moveTo(p0.x, p0.y)
    const whole = Math.floor(head)
    for (let i = 1; i <= whole; i++) { const p = at(PATH[i][0], PATH[i][1]); ctx.lineTo(p.x, p.y) }
    let hx = at(PATH[whole][0], PATH[whole][1]).x, hy = at(PATH[whole][0], PATH[whole][1]).y
    if (whole < PATH.length - 1) {
      const f = head - whole, a = at(PATH[whole][0], PATH[whole][1]), b = at(PATH[whole + 1][0], PATH[whole + 1][1])
      hx = a.x + (b.x - a.x) * f; hy = a.y + (b.y - a.y) * f
      ctx.lineTo(hx, hy)
    }
    ctx.stroke()
    // head halo while searching
    const searching = 1 - smooth(ramp(t, PATH_T1, PATH_T1 + 0.3))
    if (searching > 0) {
      ctx.fillStyle = `rgba(240,106,176,${0.18 * searching})`
      ctx.beginPath(); ctx.arc(hx, hy, 18, 0, Math.PI * 2); ctx.fill()
    }
  }

  // dots
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    const sc = spring(t - born(c, r), 320, 16)
    if (sc <= 0.001) continue
    const p = at(c, r)
    const idx = PATH.findIndex(([pc, pr]) => pc === c && pr === r)
    const lit = idx >= 0 && head >= idx
    const pop = lit ? 1 + 0.5 * Math.max(0, 1 - (head - idx) * 1.2) : 1
    const rad = (lit ? 6.5 : 4.2) * sc * pop
    ctx.fillStyle = lit ? C.pink : onPath(c, r) ? C.ink : `rgba(18,26,47,${1 - 0.55 * settle})`
    ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(0, rad), 0, Math.PI * 2); ctx.fill()
    if (lit) { ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(0, rad * 0.38), 0, Math.PI * 2); ctx.fill() }
  }

  // counter: climbs while the decoder runs, eases into 30, then pops once
  const cv = 1 + 29 * (1 - Math.pow(1 - clamp((t - 1.5) / 2.1), 3))
  const show = smooth(ramp(t, 1.35, 1.6))
  if (show > 0) {
    const n = Math.round(cv)
    const pop = 1 + 0.08 * Math.sin(Math.PI * clamp((t - 3.6) / 0.35)) * (t > 3.6 ? 1 : 0)
    const settleIn = spring(t - 3.6, 260, 14)
    ctx.save()
    ctx.globalAlpha = show
    ctx.translate(712, 400)
    ctx.scale(pop, pop)
    ctx.font = `230px ${F.display}`; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'
    ctx.fillStyle = C.navy
    const num = String(n)
    ctx.fillText(num, 0, 0)
    const w = ctx.measureText(num).width
    ctx.fillStyle = C.pink
    ctx.font = `150px ${F.display}`
    ctx.fillText('x', w + 8, 0)
    ctx.restore()
    // label under the counter
    const lab = smooth(ramp(t, 3.7, 4.0))
    if (lab > 0) {
      ctx.globalAlpha = lab * clamp(settleIn)
      ctx.font = `400 20px ${F.mono}`; ctx.fillStyle = C.ink; ctx.textAlign = 'left'
      ctx.fillText('faster decoding', 718, 448)
      ctx.globalAlpha = 1
    }
  }

  // caption: a pink rule sweeps right, the words are uncovered behind it
  const sweep = smooth(ramp(t, 3.85, 4.65))
  if (sweep > 0) {
    const x0 = 112, x1 = 1168
    const sx = x0 + (x1 - x0) * sweep
    ctx.save()
    ctx.beginPath(); ctx.rect(x0 - 4, 500, sx - x0 + 4, 140); ctx.clip()
    ctx.fillStyle = C.navy; ctx.font = `56px ${F.display}`; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'
    ctx.fillText('1st Place', x0, 568)
    ctx.fillStyle = C.ink; ctx.font = `400 22px ${F.mono}`
    ctx.fillText('ACM UTD Research Symposium, Fall 2025, post-quantum cryptography', x0 + 2, 612)
    ctx.restore()
    ctx.fillStyle = C.pink
    ctx.fillRect(x0, 630, (sx - x0), 3)
    if (sweep < 1) ctx.fillRect(sx - 2, 520, 4, 112)
  }
}

export const piece: Piece = { slug: 'acm', title: '1st Place, ACM UTD Research Symposium', duration: 6, seek }
