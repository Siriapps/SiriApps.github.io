import { useEffect, useRef, useState } from 'react'
import { mountReel } from './reel-engine'
import { REEL_HTML } from './reel-markup'
import './reel.css'

/* The opening reel plays once per session (skip button or Escape; ?reel replays it). When it ends, the same
   stage moves into the pinned section below the hero, where scrolling scrubs it from 0 to 15 s. */
export function ReelScrub() {
  return (
    <section id="reel" className="sec dark scrub" aria-label="The reel, scrubbed by scrolling">
      <div className="track" id="scrubTrack">
        <div className="sticky">
          <div className="cap"><h2>The reel, at your pace.</h2><p className="mono">Scroll to scrub it</p></div>
          <div className="frame" id="scrubFrame" />
          <div className="bar" aria-hidden="true"><i id="scrubBar" /></div>
        </div>
      </div>
    </section>
  )
}

export default function Reel({ onEnd }: { onEnd: () => void }) {
  const host = useRef<HTMLDivElement>(null)
  const [gone, setGone] = useState(false)
  useEffect(() => {
    if (!host.current) return
    host.current.innerHTML = REEL_HTML
    const force = /[?&]reel/.test(location.search)
    document.documentElement.classList.add('js')
    const opts = { force, scrubFrame: document.getElementById('scrubFrame'), scrubTrack: document.getElementById('scrubTrack'), scrubBar: document.getElementById('scrubBar'), onEnd: () => { setGone(true); onEnd() } }
    try { mountReel(opts) } catch { setGone(true); onEnd() }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <div ref={host} style={gone ? { position: 'absolute', width: 0, height: 0, overflow: 'hidden' } : undefined} />
}
