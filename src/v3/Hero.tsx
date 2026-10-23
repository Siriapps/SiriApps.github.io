import { useEffect, useRef } from 'react'
import Gradient, { type Pointer } from './Gradient'
import { useReveals } from './hooks'

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const pointer = useRef<Pointer>({ x: 0, y: 0, on: 0 })
  useReveals(ref, [ready])
  useEffect(() => {
    const el = ref.current; if (!el) return
    // the plane is 18 by 12 world units; map the pointer across it so the ripple sits under the cursor
    const move = (e: PointerEvent) => { const r = el.getBoundingClientRect(); pointer.current = { x: ((e.clientX - r.left) / r.width - 0.5) * 18, y: -((e.clientY - r.top) / r.height - 0.5) * 12, on: 1 } }
    const leave = () => { pointer.current = { ...pointer.current, on: 0 } }
    el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave)
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave) }
  }, [])
  return (
    <section id="top" className="hero sec dark" ref={ref}>
      <Gradient className="gl" pointer={pointer} />
      <div className="wrap">
        <p className="mono" data-reveal>Lakshmi Siri Appalaneni</p>
        <h1><span className="line masked">Live in the future,</span><span className="line masked">then build what's missing.</span></h1>
        <p className="lede" data-reveal style={{ ['--n' as string]: 1 }}>Building intelligent systems across agentic AI, physics-informed ML, and quantum computing, from research papers to production deployments.</p>
        <div className="tags" data-reveal style={{ ['--n' as string]: 2 }}>
          <span className="mono">CS Honors, UT Dallas</span>
          <span className="mono">Founding President, Quantum Comet</span>
          <span className="mono">YC AI Startup School 2026</span>
          <span className="mono">IBM Qiskit Advocate</span>
        </div>
        <div className="links" data-reveal style={{ ['--n' as string]: 3 }}>
          <a className="btn btn-white" href="https://linkedin.com/in/a-lakshmi-siri" target="_blank" rel="noopener noreferrer">Connect on LinkedIn</a>
          <a className="btn btn-ghost" href="https://github.com/Siriapps" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
      <div className="meta mono" data-reveal style={{ ['--n' as string]: 4 }}>Hyderabad, Toronto, Dallas, San Francisco</div>
    </section>
  )
}
