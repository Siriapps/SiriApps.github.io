import { useEffect, useRef, useState } from 'react'
import { mountReel } from './reel-engine'
import { REEL_HTML } from './reel-markup'
import './reel.css'

/* The opening reel. Plays once per session (skip button or Escape), never under reduced motion.
   ?reel in the URL replays it. The DOM and the seek(t) code are the AI1 page's, unchanged. */
export default function Reel({ onEnd }: { onEnd: () => void }) {
  const host = useRef<HTMLDivElement>(null)
  const [gone, setGone] = useState(false)
  useEffect(() => {
    if (!host.current) return
    host.current.innerHTML = REEL_HTML
    const force = /[?&]reel/.test(location.search)
    document.documentElement.classList.add('js')
    try { mountReel({ force, onEnd: () => { setGone(true); onEnd() } }) } catch { setGone(true); onEnd() }
    const reel = document.getElementById('reel')
    if (reel && reel.hidden) { setGone(true); onEnd() }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <div ref={host} style={gone ? { display: 'none' } : undefined} />
}
