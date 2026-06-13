import { useState, useEffect } from 'react'

const navLinks = ['About', 'Experience', 'Work', 'Skills', 'Awards', 'Contact']

const idMap: Record<string, string> = {
  About: 'about',
  Experience: 'experience',
  Work: 'projects',
  Skills: 'skills',
  Awards: 'awards',
  Contact: 'contact',
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = (link: string) => {
    setMenuOpen(false)
    setTimeout(() => {
      document.getElementById(idMap[link])?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-5 md:px-10 py-5 md:py-6 flex items-center justify-between transition-all duration-700 ${
          scrolled ? 'backdrop-blur-2xl bg-[#0b080c]/60' : ''
        }`}
      >
        <button
          onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="font-display text-2xl text-white/90 hover:text-white transition-colors z-[60]"
        >
          Siri.dev
        </button>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map(link => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-sm font-medium tracking-[0.15em] uppercase text-white/40 hover:text-[#c2a4ff] transition-colors duration-300"
            >
              {link}
            </button>
          ))}
        </div>

        <a
          href="mailto:lakshmisiri783@gmail.com"
          className="hidden md:block text-sm text-white/40 hover:text-[#c2a4ff] transition-colors"
        >
          lakshmisiri783@gmail.com
        </a>

        {/* Hamburger button — mobile only */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden z-[60] w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-[2px] bg-white transition-all duration-300"
            style={{
              transform: menuOpen ? 'rotate(45deg) translateY(4px)' : 'none',
            }}
          />
          <span
            className="block w-6 h-[2px] bg-white transition-all duration-300"
            style={{
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-[2px] bg-white transition-all duration-300"
            style={{
              transform: menuOpen ? 'rotate(-45deg) translateY(-4px)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[55] bg-[#0b080c]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {navLinks.map(link => (
          <button
            key={link}
            onClick={() => scrollTo(link)}
            className="text-2xl font-medium tracking-[0.15em] uppercase text-white/70 hover:text-[#c2a4ff] transition-colors duration-300"
          >
            {link}
          </button>
        ))}
        <a
          href="mailto:lakshmisiri783@gmail.com"
          className="text-sm text-white/40 hover:text-[#c2a4ff] transition-colors mt-4"
        >
          lakshmisiri783@gmail.com
        </a>
      </div>
    </>
  )
}
