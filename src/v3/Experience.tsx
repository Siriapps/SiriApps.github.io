import { useRef, useState } from 'react'
import { earlier, recent } from './data'
import { useReveals } from './hooks'

export default function Experience() {
  const ref = useRef<HTMLElement>(null)
  const [all, setAll] = useState(false)
  useReveals(ref, [all])
  const rows = all ? [...recent, ...earlier] : recent
  return (
    <section id="experience" className="sec light" ref={ref}>
      <div className="wrap xp-grid">
        <div className="xp-head">
          <h2 className="masked">Experience</h2>
          <p className="lede" data-reveal>What I do now first, then what came before, back to 2020.</p>
        </div>
        <div>
          <ol className="xp">
            {rows.map((e, i) => (
              <li key={e.role + e.dates} data-reveal style={{ ['--n' as string]: Math.min(i, 6) }}>
                <span className={`when ${e.status === 'NOW' ? 'now' : ''}`}>{e.dates}</span>
                <div><h3>{e.role}</h3><p className="org">{e.company}</p><p>{e.desc}</p></div>
              </li>
            ))}
          </ol>
          <button className="btn btn-ink xp-more" type="button" onClick={() => setAll(a => !a)} aria-expanded={all}>
            {all ? 'Show recent only' : `Show earlier work (${earlier.length})`}
          </button>
        </div>
      </div>
    </section>
  )
}
