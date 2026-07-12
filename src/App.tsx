import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import Loader from './components/Loader'
import NightSky from './components/NightSky'
import Navbar from './components/Navbar'
import CursorTrail from './components/CursorTrail'
import Hero from './sections/Hero'
import About from './sections/About'
import Focus from './sections/Focus'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Awards from './sections/Awards'
import Contact from './sections/Contact'

export type Theme = 'dark' | 'light'

export default function App() {
  const [entered, setEntered] = useState(false)
  const [theme, setTheme] = useState<Theme>(() =>
    (localStorage.getItem('theme') as Theme) || 'dark'
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  // Night to morning with a soft crossfade via the View Transitions API
  // where available; instant swap elsewhere.
  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    const doc = document as Document & { startViewTransition?: (cb: () => void) => void }
    if (doc.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      doc.startViewTransition(() => flushSync(() => setTheme(next)))
    } else {
      setTheme(next)
    }
  }

  // Loader finishes its own window-fly sequence, then hands over.
  const enter = () => setEntered(true)

  return (
    <>
      {!entered && <Loader onDone={enter} />}
      <div>
        <NightSky />
        <CursorTrail />
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <main className="relative z-10">
          <Hero />
          <About />
          <Focus />
          <Experience />
          <Projects />
          <Skills />
          <Awards />
          <Contact />
        </main>
      </div>
    </>
  )
}
