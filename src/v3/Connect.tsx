import { useRef } from 'react'
import Gradient from './Gradient'
import { useReveals } from './hooks'

export default function Connect() {
  const ref = useRef<HTMLElement>(null)
  useReveals(ref)
  return (
    <>
      <section id="connect" className="sec dark connect" ref={ref}>
        <Gradient className="gl" colors={['#3b2bb3', '#f06ab0', '#ff8a3d']} speed={0.25} />
        <div className="wrap">
          <h2 className="masked">Say hello.</h2>
          <p className="lede" data-reveal>Open to AI/ML research, full-stack engineering, and quantum computing opportunities. I answer on LinkedIn first. The code lives on GitHub.</p>
          <div className="actions" data-reveal style={{ ['--n' as string]: 1 }}>
            <a className="btn btn-white" href="https://linkedin.com/in/a-lakshmi-siri" target="_blank" rel="noopener noreferrer">Connect on LinkedIn</a>
            <a className="btn btn-ghost" href="https://github.com/Siriapps" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="btn btn-ghost" href="/Lakshmi_Siri_Appalaneni_Resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
          </div>
        </div>
      </section>
      <footer className="foot">
        <span>Designed and built by Siri Appalaneni. City photos via Wikimedia Commons: Hyderabad by iMahesh and Toronto by Maksim Sokolov (CC BY-SA 4.0), Dallas by IcedCowboyCoffee (CC0), San Francisco by Carol M. Highsmith (public domain).</span>
        <span>Richardson, Texas</span>
      </footer>
    </>
  )
}
