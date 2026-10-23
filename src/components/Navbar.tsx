import { useState, useEffect } from 'react'
import { Download } from 'lucide-react'

const navLinks = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Certifications', id: 'certifications' },
  { label: 'Contact', id: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    // stays out of the way until the intro has landed
    const onScroll = () => setScrolled((document.getElementById('home')?.getBoundingClientRect().bottom ?? 0) < window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <>
      {/* Centered floating pill */}
      <nav className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-fit transition-all duration-500 ${scrolled ? '' : 'opacity-0 -translate-y-6 pointer-events-none'}`}>
        <div
          className="flex items-center gap-1 md:gap-2 rounded-full px-3 md:px-4 py-2.5 transition-all duration-500"
          style={{
            background: scrolled ? 'rgba(10, 8, 14, 0.88)' : 'rgba(10, 8, 14, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.5)' : 'none',
          }}
        >
          <button
            onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="font-display font-bold text-sm text-white/90 hover:text-white transition-colors flex items-center gap-1.5 px-2 whitespace-nowrap"
          >
            siri <span className="font-normal text-white/50 hidden sm:inline">/ somewhere, building.</span>
          </button>

          <span className="hidden lg:block w-px h-4 bg-white/15 mx-1" />

          <div className="hidden lg:flex items-center">
            {navLinks.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="font-mono text-[11px] tracking-[0.12em] uppercase text-white/50 hover:text-[#ffb020] transition-colors duration-300 px-3 py-1.5 rounded-full hover:bg-white/[0.04] whitespace-nowrap"
              >
                {label}
              </button>
            ))}
          </div>

          <span className="hidden lg:block w-px h-4 bg-white/15 mx-1" />

          <a
            href="/Lakshmi_Siri_Appalaneni_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.08em] uppercase px-4 py-1.5 rounded-full text-[#070609] font-medium transition-transform hover:scale-105 whitespace-nowrap"
            style={{ background: 'linear-gradient(100deg, #ffb020, #ff7a3d)' }}
          >
            <Download size={12} />
            Resume
          </a>

          {/* Hamburger, below lg */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 z-[60]"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="block w-5 h-[2px] transition-all duration-300"
              style={{ background: 'var(--starlight)', transform: menuOpen ? 'rotate(45deg) translateY(4px)' : 'none' }} />
            <span className="block w-5 h-[2px] transition-all duration-300"
              style={{ background: 'var(--starlight)', opacity: menuOpen ? 0 : 1 }} />
            <span className="block w-5 h-[2px] transition-all duration-300"
              style={{ background: 'var(--starlight)', transform: menuOpen ? 'rotate(-45deg) translateY(-4px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`mobile-menu-overlay fixed inset-0 z-[45] backdrop-blur-xl flex flex-col items-center justify-center gap-6 transition-all duration-500 lg:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {navLinks.map(({ label, id }, i) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="font-mono text-xl tracking-[0.18em] uppercase text-white/75 hover:text-[#ffb020] transition-colors duration-300"
          >
            <span className="text-white/25 mr-3 text-sm">{String(i + 1).padStart(2, '0')}</span>
            {label}
          </button>
        ))}
        <a
          href="/Lakshmi_Siri_Appalaneni_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-sm tracking-[0.1em] uppercase px-6 py-3 rounded-full text-[#070609] font-medium mt-4"
          style={{ background: 'linear-gradient(100deg, #ffb020, #ff7a3d)' }}
        >
          <Download size={14} />
          Resume
        </a>
      </div>
    </>
  )
}
