import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const categories = [
  {
    title: 'Languages',
    accent: '#c2a4ff',
    skills: ['Python', 'C++', 'Java', 'JavaScript', 'TypeScript', 'SQL', 'Bash'],
  },
  {
    title: 'ML & Research',
    accent: '#f472b6',
    skills: ['PyTorch', 'scikit-learn', 'XGBoost', 'CatBoost', 'Physics-Informed NNs', 'LSTM', 'SHAP', 'FAISS', 'Qiskit'],
  },
  {
    title: 'Agentic & LLM',
    accent: '#fbbf24',
    skills: ['LangChain', 'Google ADK', 'MCP', 'Gemini API', 'RAG Pipelines', 'Multi-Agent Orchestration'],
  },
  {
    title: 'Web & Infrastructure',
    accent: '#34d399',
    skills: ['FastAPI', 'Flask', 'React', 'Node.js', 'Tailwind', 'MongoDB', 'DuckDB', 'GCS', 'Cloud Run', 'Docker'],
  },
  {
    title: 'Quantum Computing',
    accent: '#60a5fa',
    skills: ['Qiskit', 'pyZX', 'ZX Calculus', 'Circuit Design', 'Variational Algorithms'],
  },
]

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skills-title', {
        y: 40, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '#skills', start: 'top 80%' },
      })
      gsap.from('.skill-category', {
        y: 30, duration: 0.5, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.skills-grid', start: 'top 90%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-28 md:py-40 relative"
      style={{ background: '#0b080c' }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="skills-title mb-16">
          <p className="section-label">TOOLKIT</p>
          <h2 className="font-display text-5xl md:text-7xl text-white tracking-tight">
            Technical{' '}
            <span className="gradient-text" style={{ fontStyle: 'italic' }}>Stack</span>
          </h2>
        </div>

        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map(({ title, accent, skills }) => (
            <div
              key={title}
              className="skill-category group relative rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: `1px solid ${accent}20`,
              }}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 0%, ${accent}20, transparent 70%)` }}
              />
              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: accent, boxShadow: `0 0 10px ${accent}80` }} />
                  <h3 className="text-lg font-bold tracking-tight" style={{ color: accent }}>{title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium text-white/70 hover:text-white transition-colors duration-300"
                      style={{
                        background: `${accent}10`,
                        border: `1px solid ${accent}18`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
