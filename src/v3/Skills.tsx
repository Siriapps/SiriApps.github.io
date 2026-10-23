import { useRef } from 'react'
import { skills } from './data'
import { useReveals } from './hooks'

export default function Skills() {
  const ref = useRef<HTMLElement>(null)
  useReveals(ref)
  return (
    <section id="skills" className="sec light" ref={ref}>
      <div className="wrap">
        <h2 className="masked">Skills</h2>
        <p className="lede" data-reveal>Every tool on the bench, grouped the way I actually reach for them. The dark chip in each row is the one I use daily.</p>
        <div className="rows">
          {skills.map((g, i) => (
            <div className="row" key={g.title} data-reveal style={{ ['--n' as string]: i }}>
              <h3>{g.title}</h3>
              <ul>{g.items.map(s => <li key={s} className={s === g.primary ? 'daily' : ''}>{s}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
