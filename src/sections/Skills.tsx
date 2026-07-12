import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const groups = [
  {
    title: 'Languages',
    accent: '#ffb020',
    primary: 'Python',
    skills: ['Python', 'C++', 'Java', 'JavaScript', 'TypeScript', 'SQL', 'Bash'],
  },
  {
    title: 'ML and Research',
    accent: '#ff7a3d',
    primary: 'PyTorch',
    skills: ['PyTorch', 'scikit-learn', 'XGBoost', 'CatBoost', 'Physics-Informed NNs', 'LSTM', 'SHAP', 'FAISS'],
  },
  {
    title: 'Agentic and LLM',
    accent: '#a78bfa',
    primary: 'LangChain',
    skills: ['LangChain', 'Google ADK', 'MCP', 'Gemini API', 'RAG Pipelines', 'Multi-Agent Orchestration'],
  },
  {
    title: 'Web and Infrastructure',
    accent: '#ffb020',
    primary: 'FastAPI',
    skills: ['FastAPI', 'Flask', 'React', 'Node.js', 'Tailwind', 'MongoDB', 'DuckDB', 'Cloud Run', 'Docker'],
  },
  {
    title: 'Quantum Computing',
    accent: '#a78bfa',
    primary: 'Qiskit',
    skills: ['Qiskit', 'pyZX', 'ZX Calculus', 'Circuit Design', 'Variational Algorithms'],
  },
]

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skill-group', {
        y: 28, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.skills-grid', start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="relative py-24 md:py-36">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <p className="obs-label">
          OBS 05 <span className="obs-dim">/ instruments</span>
        </p>
        <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight mb-3">
          The instrument panel
        </h2>
        <p className="text-white/45 font-light text-lg mb-14 max-w-2xl">
          Every tool on the bench, grouped the way I actually reach for them.
          The brightest chip in each row gets used daily.
        </p>

        <div className="skills-grid flex flex-col gap-4">
          {groups.map(({ title, accent, primary, skills }) => (
            <div key={title} className="skill-group panel rounded-2xl px-6 md:px-8 py-6 md:flex md:items-start md:gap-10">
              <div className="md:w-56 shrink-0 mb-4 md:mb-0 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full" style={{ background: accent, boxShadow: `0 0 10px ${accent}` }} />
                <h3 className="font-display font-bold text-lg text-white">{title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => {
                  const daily = skill === primary
                  return (
                    <span
                      key={skill}
                      className={`px-3.5 py-1.5 rounded-full text-sm transition-colors duration-300 ${daily ? 'text-white' : 'chip text-white/65'}`}
                      style={daily
                        ? { background: `${accent}1e`, border: `1px solid ${accent}90`, boxShadow: `0 0 16px ${accent}30` }
                        : undefined}
                    >
                      {skill}
                    </span>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
