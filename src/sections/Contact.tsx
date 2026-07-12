import { useRef, useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const routes = [
  { label: 'GitHub', value: 'github.com/Siriapps', href: 'https://github.com/Siriapps' },
  { label: 'LinkedIn', value: 'linkedin.com/in/a-lakshmi-siri', href: 'https://linkedin.com/in/a-lakshmi-siri' },
  { label: 'Email', value: 'lakshmisiri783@gmail.com', href: 'mailto:lakshmisiri783@gmail.com' },
]

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.visitor-pass', {
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '#contact', start: 'top 75%' },
      })
      gsap.from('.route-row', {
        y: 16, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.routes-list', start: 'top 88%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 md:py-36">
      <div className="max-w-5xl mx-auto px-5 md:px-6">
        <p className="obs-label">
          OBS 08 <span className="obs-dim">/ send a signal</span>
        </p>
        <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight mb-3">
          The dome is always open
        </h2>
        <p className="text-white/50 font-light text-lg mb-14 max-w-2xl">
          Open to AI/ML research, full-stack engineering, and quantum computing opportunities.
          Your visitor pass is already printed.
        </p>

        {/* The boarding pass */}
        <div className="visitor-pass panel rounded-2xl overflow-hidden mb-14">
          <div className="px-7 py-4 flex items-center justify-between font-mono text-[10px] tracking-[0.3em] uppercase"
            style={{ borderBottom: '1px solid rgba(167,139,250,0.12)', background: 'rgba(255,176,32,0.05)' }}>
            <span className="text-[#ffb020]">Visitor pass</span>
            <span className="text-white/35">Night session · Always open</span>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* main body */}
            <div className="flex-1 p-7 md:p-9">
              <div className="flex items-center gap-6 md:gap-10 mb-8">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/35 mb-1">From</p>
                  <p className="font-display font-bold text-3xl md:text-4xl text-white">YOU</p>
                  <p className="text-white/40 text-sm">Wherever you are hiring</p>
                </div>
                <div className="flex-1 relative h-px" style={{ background: 'rgba(167,139,250,0.25)' }}>
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#a78bfa] text-lg">✈</span>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/35 mb-1">To</p>
                  <p className="font-display font-bold text-3xl md:text-4xl accent-text">SIRI</p>
                  <p className="text-white/40 text-sm">Richardson, TX</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/35 mb-1">Passenger</p>
                  <p className="text-white/85 text-sm">Future collaborator</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/35 mb-1">Gate</p>
                  <p className="text-white/85 text-sm">Inbox</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/35 mb-1">Bench</p>
                  <p className="text-white/85 text-sm">Eyepiece 2</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/35 mb-1">Status</p>
                  <p className="text-[#ff7a3d] text-sm">Dome open</p>
                </div>
              </div>
            </div>

            {/* perforation */}
            <div className="perforation hidden md:block my-6" />
            <div className="perforation-h md:hidden mx-6" />

            {/* stub */}
            <div className="md:w-64 p-7 md:p-9 flex flex-col justify-between gap-6">
              <div>
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/35 mb-2">Scan to board</p>
                <div className="barcode h-16 rounded-sm" />
                <p className="font-mono text-[10px] tracking-[0.2em] text-white/30 mt-2">LSA · 2026 · NIGHT</p>
              </div>
              <a
                href="mailto:lakshmisiri783@gmail.com"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-medium text-[#070609] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: 'linear-gradient(100deg, #ffb020, #ff7a3d)' }}
              >
                Send a signal
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* alternate routes */}
        <div className="routes-list max-w-2xl">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/35 mb-4">Alternate routes</p>
          {routes.map(({ label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="route-row group flex items-center justify-between py-5"
              style={{ borderBottom: '1px solid rgba(167,139,250,0.1)' }}
            >
              <div className="flex items-baseline gap-4">
                <span className="text-white font-medium">{label}</span>
                <span className="text-white/35 text-sm hidden sm:inline font-mono">{value}</span>
              </div>
              <ArrowUpRight size={18} className="text-white/25 group-hover:text-[#ffb020] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          ))}
        </div>
      </div>

      <div className="mt-20 text-center">
        <p className="font-mono text-white/20 text-[11px] tracking-[0.2em]">
          DESIGNED AND BUILT BY SIRI APPALANENI · FROM A ROOFTOP IN TEXAS
        </p>
      </div>
    </section>
  )
}
