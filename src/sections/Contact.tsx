import { useRef, useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const infoLinks = [
  {
    label: 'Email',
    value: 'lakshmisiri783@gmail.com',
    href: 'mailto:lakshmisiri783@gmail.com',
  },
  {
    label: 'Location',
    value: 'Richardson, TX',
    href: null,
  },
]

const socialLinks = [
  {
    label: 'Github',
    url: 'github.com/Siriapps',
    href: 'https://github.com/Siriapps',
  },
  {
    label: 'Linkedin',
    url: 'linkedin.com/in/a-lakshmi-siri',
    href: 'https://linkedin.com/in/a-lakshmi-siri',
  },
]

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-title', {
        y: 40, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '#contact', start: 'top 80%' },
      })
      gsap.from('.contact-item', {
        y: 20, duration: 0.5, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-grid', start: 'top 90%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 md:py-28 relative"
      style={{ background: '#0b080c' }}
    >
      <div className="max-w-5xl mx-auto px-5 md:px-6">
        <div className="contact-title text-center mb-14">
          <p className="section-label">GET IN TOUCH</p>
          <h2 className="font-display text-5xl md:text-7xl text-white tracking-tight mb-4">Let's Connect</h2>
          <p className="text-white/90 text-lg md:text-xl font-light max-w-2xl mx-auto">
            Open to AI/ML research, full-stack engineering, and quantum computing opportunities.
          </p>
        </div>

        <div className="contact-grid grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left: Email + Location */}
          <div className="space-y-4">
            {infoLinks.map(({ label, value, href }) => {
              const inner = (
                <div
                  className="contact-item group flex items-center justify-between py-5 transition-all duration-300"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div>
                    <p className="text-white/30 text-xs uppercase tracking-wider mb-1">{label}</p>
                    <p className="text-white text-lg">{value}</p>
                  </div>
                  {href && (
                    <ArrowUpRight size={18} className="text-white/20 group-hover:text-white/60 transition-colors shrink-0" />
                  )}
                </div>
              )
              return href ? (
                <a key={label} href={href} className="block">
                  {inner}
                </a>
              ) : (
                <div key={label}>{inner}</div>
              )
            })}
          </div>

          {/* Right: Social links with full URLs */}
          <div>
            <p className="text-white/30 text-xs uppercase tracking-wider mb-4">Social</p>
            <div className="space-y-0">
              {socialLinks.map(({ label, url, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-item group flex items-center justify-between py-5 transition-all duration-300"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-white text-lg font-medium underline underline-offset-4 decoration-white/30">{label}</span>
                    <span className="text-white/30 text-sm hidden md:inline">{url}</span>
                  </div>
                  <ArrowUpRight size={18} className="text-white/20 group-hover:text-white/60 transition-colors shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <p className="text-white/15 text-xs">Designed & Built by Siri Appalaneni</p>
      </div>
    </section>
  )
}
