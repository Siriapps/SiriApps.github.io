import { C, F, clamp, ramp, smooth, spring, type Piece } from './motion'

// Device: a leaderboard whose fifth rank label detaches from its row and becomes the hero numeral.
const hash = (n: number) => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s) }
const lerp = (a: number, b: number, k: number) => a + (b - a) * k
const ROWS = 8
const ROW_Y0 = 150, ROW_GAP = 58
const BAR_X = 160, BAR_MAX = 400
// descending scores with a little seeded unevenness
const LEN = Array.from({ length: ROWS }, (_, i) => 1 - i * 0.085 - hash(i) * 0.04)
const HOLD = 5.2

function seek(time: number, ctx: CanvasRenderingContext2D, W: number, H: number) {
  const t = Math.min(time, HOLD)
  ctx.save()
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.fillStyle = C.navy
  ctx.fillRect(0, 0, W, H)
  const s = Math.min(W / 1280, H / 720)
  ctx.setTransform(s, 0, 0, s, (W - 1280 * s) / 2, (H - 720 * s) / 2)
  ctx.textBaseline = 'alphabetic'

  const lit = smooth(ramp(t, 1.7, 2.3))     // fifth bar fills with sun
  const lift = spring(t - 2.2, 120, 15)     // rank 5 flies out and grows
  const dim = smooth(ramp(t, 2.0, 2.8))

  // leaderboard
  for (let i = 0; i < ROWS; i++) {
    const y = ROW_Y0 + i * ROW_GAP
    const enter = spring(t - 0.15 - i * 0.09, 160, 20)
    const isFive = i === 4
    const alpha = clamp(enter * 1.4) * (isFive ? 1 : 1 - dim * 0.6)
    ctx.globalAlpha = alpha
    // rank label (row 5's label leaves home, the slot keeps a faint ghost)
    ctx.font = `400 18px ${F.mono}`
    ctx.fillStyle = 'rgba(255,255,255,0.55)'
    ctx.textAlign = 'right'
    const off = (1 - enter) * -80
    if (!isFive || lift < 0.02) ctx.fillText(String(i + 1).padStart(2, '0'), BAR_X - 22 + off, y + 6)
    else { ctx.globalAlpha = alpha * 0.25; ctx.fillText('05', BAR_X - 22, y + 6); ctx.globalAlpha = alpha }
    // track
    ctx.fillStyle = 'rgba(255,255,255,0.08)'
    ctx.fillRect(BAR_X, y - 1, BAR_MAX, 2)
    // bar
    const len = BAR_MAX * LEN[i] * enter
    ctx.fillStyle = isFive ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.75)'
    ctx.fillRect(BAR_X, y - 3, len, 6)
    if (isFive && lit > 0) {
      ctx.fillStyle = C.sun
      ctx.fillRect(BAR_X, y - 4, len * lit, 8)
      // glint head while filling
      if (lit < 1) { ctx.fillStyle = '#fff'; ctx.fillRect(BAR_X + len * lit - 3, y - 7, 3, 14) }
    }
    // tiny seeded score ticks at the bar end
    ctx.fillStyle = 'rgba(255,255,255,0.35)'
    ctx.font = `400 13px ${F.mono}`
    ctx.textAlign = 'left'
    ctx.fillText(String(Math.round(980 - i * 61 - hash(i + 9) * 30)), BAR_X + len + 12, y + 5)
  }
  ctx.globalAlpha = 1

  // the hero 5: starts as the row label, ends as a big serif numeral
  if (lift > 0.0) {
    const y5 = ROW_Y0 + 4 * ROW_GAP
    const x = lerp(BAR_X - 22, 640, lift)
    const y = lerp(y5 + 6, 470, lift)
    const size = lerp(18, 400, lift)
    ctx.font = `400 ${size}px ${lift < 0.05 ? F.mono : F.display}`
    ctx.textAlign = lift < 0.05 ? 'right' : 'left'
    ctx.fillStyle = C.sun
    ctx.fillText('5', lift < 0.05 ? x : x - lerp(10, 0, lift), y)
    // leader line from the bar to the numeral
    const lineK = smooth(ramp(t, 2.3, 2.9))
    if (lineK > 0) {
      ctx.strokeStyle = 'rgba(255,209,102,0.5)'
      ctx.lineWidth = 1.5
      ctx.setLineDash([3, 6])
      ctx.beginPath()
      const ax = BAR_X + BAR_MAX * LEN[4] + 60, ay = y5
      ctx.moveTo(ax, ay)
      ctx.lineTo(lerp(ax, 620, lineK), ay)
      ctx.stroke()
      ctx.setLineDash([])
    }
  }

  // Gold stamp
  const st = t - 2.95
  if (st > 0) {
    const k = spring(st, 420, 18)
    const sc = lerp(2.2, 1, k)
    ctx.save()
    ctx.translate(1010, 300)
    ctx.rotate(-0.12)
    ctx.scale(sc, sc)
    ctx.globalAlpha = clamp(st * 8)
    ctx.strokeStyle = C.sun
    ctx.lineWidth = 3
    ctx.strokeRect(-92, -46, 184, 92)
    ctx.lineWidth = 1
    ctx.strokeRect(-84, -38, 168, 76)
    ctx.fillStyle = C.sun
    ctx.font = `400 64px ${F.display}`
    ctx.textAlign = 'center'
    ctx.fillText('Gold', 0, 22)
    ctx.restore()
    // impact ring, once
    const ring = ramp(st, 0.05, 0.5)
    if (ring > 0 && ring < 1) {
      ctx.save()
      ctx.translate(1010, 300)
      ctx.rotate(-0.12)
      ctx.globalAlpha = (1 - ring) * 0.5
      ctx.strokeStyle = C.sun
      ctx.lineWidth = 2
      const g = 1 + ring * 0.25
      ctx.strokeRect(-92 * g, -46 * g, 184 * g, 92 * g)
      ctx.restore()
    }
  }

  // mono caption types on
  const msg = 'ICPC AlgoQueen 2023, global top five'
  const n = Math.floor(clamp((t - 3.6) / 1.1) * msg.length)
  if (n > 0) {
    ctx.globalAlpha = 1
    ctx.font = `400 21px ${F.mono}`
    ctx.textAlign = 'left'
    ctx.fillStyle = 'rgba(255,255,255,0.9)'
    const shown = msg.slice(0, n)
    ctx.fillText(shown, 650, 560)
    if (n < msg.length) { const w = ctx.measureText(shown).width; ctx.fillStyle = C.sun; ctx.fillRect(652 + w, 543, 11, 21) }
    ctx.fillStyle = 'rgba(255,209,102,0.6)'
    ctx.fillRect(650, 580, Math.min(1, n / msg.length) * 120, 2)
  }
  ctx.restore()
}

export const piece: Piece = { slug: 'icpc', title: 'Gold, Rank 5, ICPC AlgoQueen 2023', duration: 6, seek }
