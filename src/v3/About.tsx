import { useRef } from 'react'
import { useReveals } from './hooks'
import { recent } from './data'

export default function About() {
  const ref = useRef<HTMLElement>(null)
  useReveals(ref)
  const now = recent.filter(e => e.status === 'NOW')
  return (
    <section id="about" className="sec light about" ref={ref}>
      <div className="wrap about-grid">
        <div data-reveal>
          <div className="portrait">
            <img src="/images/siri-bust.webp" width="280" alt="Siri Appalaneni smiling, wearing a grey hoodie with a backpack strap over one shoulder" />
            <span className="tape" aria-hidden="true" /><span className="tape b" aria-hidden="true" />
          </div>
        </div>
        <div>
          <h2 className="masked">About Me</h2>
          <p className="lede" data-reveal>I am a Computer Science Honors student at UT Dallas, minoring in Business Intelligence and Analytics. I am curious about how agents will reshape the web, and passionate about deep learning, quantum computing, agentic AI, algorithm design, and computer vision. I love building things that are technically rigorous and actually meaningful.</p>
          <p data-reveal style={{ ['--n' as string]: 1 }}>In October 2026 I founded Quantum Comet (QComet), UT Dallas's first quantum student organization, and took it from an idea to a registered club with a faculty advisor and a six-officer board. I am an AES Merit Scholar on the Dean's List (Spring 2026), the founder and software engineer at Vizent, an IBM Qiskit Advocate, a Google Women Techmakers Ambassador, and I was selected for YC AI Startup School 2026. I grew up in Hyderabad, finished high school in Toronto and Prosper, Texas, and I speak Telugu, English and Hindi.</p>
          <ul className="roles" aria-label="Current roles">
            {now.map((e, i) => (
              <li key={e.role + e.dates} data-reveal style={{ ['--n' as string]: i }}>
                <span className="when">{e.dates}</span>
                <span><strong>{e.role}</strong>, <span className="org">{e.company}</span>. {e.desc}</span>
              </li>
            ))}
          </ul>
          <dl className="specs">
            {[['GPA', '3.97'], ['Projects shipped', '15+'], ['Hackathon wins', '4x'], ['Research efforts', '5+']].map(([k, v], i) => (
              <div key={k} data-reveal style={{ ['--n' as string]: i }}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
