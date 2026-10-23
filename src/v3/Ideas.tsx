import { useRef } from 'react'
import { ideas } from './data'
import { useReveals } from './hooks'

export default function Ideas() {
  const ref = useRef<HTMLElement>(null)
  useReveals(ref)
  return (
    <section id="ideas" className="sec light" ref={ref}>
      <div className="wrap">
        <h2 className="masked">Startup ideas</h2>
        <p className="lede" data-reveal>Three sketches pinned to the board. Each one starts with a moment where a person needs a second pair of eyes.</p>
        <div className="sheets">
          {ideas.map((d, i) => (
            <article className="sketch" key={d.name} data-reveal style={{ ['--n' as string]: i }}>
              <span className="pin" aria-hidden="true" />
              <h3>{d.name}</h3>
              <span className="for mono">{d.who}</span>
              <p>{d.what}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
