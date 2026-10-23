// Closed-form springs, so any frame can be painted without history.
export const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x))
export function spring(t: number, k = 170, d = 26) {
  if (t <= 0) return 0
  const w0 = Math.sqrt(k), z = d / (2 * w0)
  if (z < 1) { const wd = w0 * Math.sqrt(1 - z * z); return 1 - Math.exp(-z * w0 * t) * (Math.cos(wd * t) + (z * w0 / wd) * Math.sin(wd * t)) }
  return 1 - Math.exp(-w0 * t) * (1 + w0 * t)
}
export function track(t: number, keys: [number, number][], k = 170, d = 26) {
  let v = keys[0][1]
  for (let i = 1; i < keys.length; i++) v += (keys[i][1] - keys[i - 1][1]) * spring(t - keys[i][0], k, d)
  return v
}
export const ramp = (t: number, a: number, b: number) => clamp((t - a) / (b - a))
export const smooth = (x: number) => x * x * (3 - 2 * x)
export const C = { navy: '#0f1733', navy2: '#1c2a5e', white: '#ffffff', orange: '#ff8a3d', pink: '#f06ab0', violet: '#7c5cff', blue: '#2f5bff', sun: '#ffd166', ink: '#121a2f', paper: '#ffffff' }
export const F = { display: '"Gloock", Georgia, serif', text: '"Inter", system-ui, sans-serif', mono: '"DM Mono", ui-monospace, monospace' }
export type Piece = { slug: string; title: string; duration: number; seek: (t: number, ctx: CanvasRenderingContext2D, W: number, H: number) => void }
