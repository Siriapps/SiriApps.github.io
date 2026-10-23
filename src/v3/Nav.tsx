import { useEffect, useState } from 'react'

const links = [['about', 'About'], ['cities', 'Cities'], ['highlights', 'Highlights'], ['experience', 'Experience'], ['projects', 'Projects'], ['skills', 'Skills'], ['ideas', 'Ideas'], ['connect', 'Connect']]

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [on, setOn] = useState('')
  useEffect(() => {
    const f = () => {
      setSolid(window.scrollY > 40)
      const mid = window.innerHeight * 0.4
      let best = ''
      for (const [id] of links) { const r = document.getElementById(id)?.getBoundingClientRect(); if (r && r.top <= mid) best = id }
      setOn(best)
    }
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  return (
    <header className={`nav ${solid ? 'solid' : ''}`}>
      <a className="brand" href="#top">Siri Appalaneni</a>
      <nav className="links" aria-label="Sections">
        {links.map(([id, label]) => <a key={id} href={`#${id}`} className={on === id ? 'on' : ''}>{label}</a>)}
      </nav>
      <div className="cta">
        <a className="btn btn-ghost" href="/Lakshmi_Siri_Appalaneni_Resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
        <a className="btn btn-white" href="https://linkedin.com/in/a-lakshmi-siri" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </header>
  )
}
