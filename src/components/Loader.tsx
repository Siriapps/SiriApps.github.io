import { useEffect, useState } from 'react'

// The entrance: progress ring, then "Scroll". On scroll or click a warm
// gradient sweeps up the screen, settles into a solid (black at night,
// white in the morning), and an airplane window opens through it onto
// the site. The hole is a window-shaped div whose box-shadow paints the
// rest of the screen; scaling it up flies you through.
export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)
  // idle -> sweep (gradient rises) -> open (window expands)
  const [phase, setPhase] = useState<'idle' | 'sweep' | 'open'>('idle')

  const light = document.documentElement.dataset.theme === 'light'
  const endColor = light ? '#ffffff' : '#000000'

  useEffect(() => {
    let alive = true
    const creep = setInterval(() => {
      setProgress(p => (p < 90 ? p + Math.random() * 7 : p))
    }, 120)

    const finish = () => {
      if (!alive) return
      clearInterval(creep)
      setProgress(100)
      setTimeout(() => alive && setReady(true), 350)
    }
    const fonts = 'fonts' in document ? document.fonts.ready : Promise.resolve()
    if (document.readyState === 'complete') {
      fonts.then(finish)
    } else {
      window.addEventListener('load', () => fonts.then(finish), { once: true })
    }
    return () => { alive = false; clearInterval(creep) }
  }, [])

  const enter = () => {
    setPhase('sweep')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      onDone()
      return
    }
    setTimeout(() => setPhase('open'), 900)
    setTimeout(onDone, 2400)
  }

  // "Scroll" means scroll: a wheel tick, swipe, or key also opens the gate.
  useEffect(() => {
    if (!ready || phase !== 'idle') return
    const go = () => enter()
    window.addEventListener('wheel', go, { once: true, passive: true })
    window.addEventListener('touchmove', go, { once: true, passive: true })
    window.addEventListener('keydown', go, { once: true })
    return () => {
      window.removeEventListener('wheel', go)
      window.removeEventListener('touchmove', go)
      window.removeEventListener('keydown', go)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, phase])

  const pct = Math.min(100, Math.round(progress))
  const dash = 264 * (1 - pct / 100)

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Stage 1: the waiting room */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500"
        style={{
          background: light ? '#f5f2e8' : '#040306',
          opacity: phase === 'idle' ? 1 : 0,
          pointerEvents: phase === 'idle' ? 'auto' : 'none',
        }}
        aria-live="polite"
      >
        <div className="relative w-40 h-40 mb-10">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none"
              stroke={light ? 'rgba(34,48,28,0.12)' : 'rgba(245,242,234,0.08)'} strokeWidth="1.5" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="#ffb020" strokeWidth="1.5"
              strokeDasharray="264" strokeDashoffset={dash}
              style={{ transition: 'stroke-dashoffset 0.3s ease' }} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-mono text-sm"
            style={{ color: light ? 'rgba(34,48,28,0.6)' : 'rgba(245,242,234,0.6)' }}>
            {pct}%
          </div>
        </div>

        <p className="font-display font-bold text-2xl md:text-3xl tracking-tight mb-2"
          style={{ color: light ? '#22301c' : '#f5f2ea' }}>
          Siri Appalaneni
        </p>
        <p className="font-mono text-[10px] tracking-[0.35em] uppercase mb-10"
          style={{ color: light ? 'rgba(34,48,28,0.4)' : 'rgba(245,242,234,0.35)' }}>
          Preparing the view
        </p>

        <button
          onClick={enter}
          disabled={!ready}
          className="font-mono text-xs tracking-[0.25em] uppercase px-8 py-3.5 rounded-full transition-all duration-500"
          style={{
            background: ready ? 'linear-gradient(100deg, #ffb020, #ff7a3d)' : 'transparent',
            color: ready ? '#070609' : (light ? 'rgba(34,48,28,0.35)' : 'rgba(245,242,234,0.25)'),
            border: ready ? '1px solid transparent' : `1px solid ${light ? 'rgba(34,48,28,0.2)' : 'rgba(245,242,234,0.15)'}`,
            cursor: ready ? 'pointer' : 'default',
          }}
        >
          {ready ? 'Enter' : 'Aligning the view'}
        </button>
      </div>

      {/* Stage 2: gradient sweeps up and resolves into the end color */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, #ffb020, #ff7a3d 30%, ${endColor} 75%)`,
          transform: phase === 'idle' ? 'translateY(100%)' : 'translateY(0)',
          transition: 'transform 0.9s cubic-bezier(0.5, 0, 0.2, 1)',
          opacity: phase === 'open' ? 0 : 1,
          transitionProperty: 'transform, opacity',
          transitionDuration: '0.9s, 0.5s',
        }}
      />

      {/* Stage 3: the airplane window opens through the solid color */}
      {phase === 'open' && (
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute left-1/2 top-1/2"
            style={{
              width: 'min(300px, 60vw)',
              height: 'min(420px, 56vh)',
              marginLeft: 'calc(min(300px, 60vw) / -2)',
              marginTop: 'calc(min(420px, 56vh) / -2)',
              borderRadius: '48% 48% 48% 48% / 42% 42% 42% 42%',
              boxShadow: `0 0 0 300vmax ${endColor}`,
              animation: 'window-fly 1.5s cubic-bezier(0.55, 0, 0.6, 1) forwards',
            }}
          />
        </div>
      )}
    </div>
  )
}
