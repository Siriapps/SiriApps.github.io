import { useEffect, useRef } from 'react'
import { reduced } from './hooks'
import type { Piece } from './pieces/motion'

/* Plays one highlight piece on a canvas: seek(t) each frame from the moment the slug changes, then holds the last frame.
   Under reduced motion it paints the final frame once. The pieces load lazily so the page does not carry them until needed. */
export default function Player({ slug, still = false }: { slug: string; still?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    let raf = 0, alive = true
    const mods = import.meta.glob<{ piece: Piece }>('./pieces/*.ts')
    const load = mods[`./pieces/${slug}.ts`]
    if (!load) return
    load().then(({ piece }) => {
      if (!alive) return
      const ctx = c.getContext('2d'); if (!piece || !ctx) return
      const W = c.width, H = c.height
      if (still || reduced()) { piece.seek(piece.duration - 0.01, ctx, W, H); return }
      const t0 = performance.now()
      const frame = (now: number) => { const t = Math.min(piece.duration, (now - t0) / 1000); piece.seek(t, ctx, W, H); if (t < piece.duration && alive) raf = requestAnimationFrame(frame) }
      raf = requestAnimationFrame(frame)
    })
    return () => { alive = false; cancelAnimationFrame(raf) }
  }, [slug, still])
  return <canvas ref={ref} width={1280} height={720} className="piece" aria-hidden="true" />
}
