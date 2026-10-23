import { useEffect, useState } from 'react'

const links = [['about', 'About'], ['reel', 'Reel'], ['highlights', 'Highlights'], ['experience', 'Experience'], ['projects', 'Projects'], ['skills', 'Skills'], ['connect', 'Connect']]

/* Top: the name and three buttons on a transparent bar. Left: a quiet vertical rail of section links. */
export default function Nav() {
  const [on, setOn] = useState('')
  const [light, setLight] = useState(false)
  useEffect(() => {
    const f = () => {
      const mid = window.innerHeight * 0.4
      let best = ''
      for (const [id] of links) { const r = document.getElementById(id)?.getBoundingClientRect(); if (r && r.top <= mid) best = id }
      setOn(best)
      const el = document.elementFromPoint(24, 40)
      setLight(!!el?.closest('.sec.light'))
    }
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  return (
    <>
      <header className={`nav ${light ? 'on-light' : ''}`}>
        <a className="brand" href="#top">Siri Appalaneni</a>
        <div className="cta">
          <a className="btn btn-sun" href="/Lakshmi_Siri_Appalaneni_Resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
          <a className="btn btn-ghost" href="https://github.com/Siriapps" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="btn btn-white" href="https://linkedin.com/in/a-lakshmi-siri" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </header>
      <nav className={`rail ${light ? 'on-light' : ''}`} aria-label="Sections">
        {links.map(([id, label]) => <a key={id} href={`#${id}`} className={on === id ? 'on' : ''}><i /><span>{label}</span></a>)}
      </nav>
    </>
  )
}
