import { useRef } from 'react'
import Gradient from './Gradient'
import { useReveals } from './hooks'

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  useReveals(ref, [ready])
  return (
    <section id="top" className="hero sec dark" ref={ref}>
      <Gradient className="gl" />
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
