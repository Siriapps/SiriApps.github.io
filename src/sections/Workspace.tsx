import { useEffect, useRef } from 'react'
import { Play } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LINKS = {
  streamsignPaper: 'https://drive.google.com/file/d/1915V6HxYJMyWBWL4UR-oAaacmqgb9hEG/view?usp=sharing',
  radaPaper: '/RaDA_Hydropower_PILSTM_Draft.pdf', // ponytail: drop the PDF at public/RaDA_Hydropower_PILSTM_Draft.pdf
  blog: 'https://medium.com/@siriapps3/quantum-journey-of-a-13-year-old-b1d15beb22f1',
  linkedinPost: 'https://www.linkedin.com/posts/innovation-thrives-where-industry-and-education-ugcPost-7407129224500854786-PR2b/',
  youtube: 'https://www.youtube.com/watch?v=6YrF4kUaUWQ',
}

// A desk at the observatory: whiteboard with pinned papers, a monitor
// playing the interview, a tablet open to the blog, and a framed post.
export default function Workspace() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.desk-item', {
        y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const youtubeId = LINKS.youtube.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/)?.[1]

  return (
    <section id="workspace" ref={sectionRef} className="relative py-24 md:py-36">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <p className="obs-label">
          OBS 07 <span className="obs-dim">/ the desk</span>
        </p>
        <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight mb-3">
          Around my workspace
        </h2>
        <p className="text-white/45 font-light text-lg mb-14 max-w-2xl">
          Papers on the whiteboard, an interview on the monitor, the blog on
          the tablet, and one framed moment. Everything is clickable.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* Whiteboard with two pinned papers */}
          <div className="desk-item lg:col-span-3 rounded-2xl p-6 md:p-8 relative"
            style={{ background: 'rgba(250,250,248,0.96)', border: '10px solid #8a8f98', boxShadow: '0 20px 60px rgba(0,0,0,0.35)' }}>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-black/35 mb-5">Research in progress</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  href: LINKS.radaPaper,
                  title: 'Physics-Informed LSTM Surrogates for Hydropower Digital Twins',
                  venue: 'RaDA Lab · in preparation for NAPS 2026',
                  rotate: '-1.5deg',
                  pin: '#ff7a3d',
                },
                {
                  href: LINKS.streamsignPaper,
                  title: 'StreamSign: Real-Time Speech to Indian Sign Language',
                  venue: 'TRAIN AI · research paper',
                  rotate: '1.8deg',
                  pin: '#a78bfa',
                },
              ].map(paper => (
                <a key={paper.title} href={paper.href} target="_blank" rel="noopener noreferrer"
                  className="relative block bg-white p-5 pt-7 transition-transform duration-300 hover:-translate-y-1.5 hover:rotate-0"
                  style={{ transform: `rotate(${paper.rotate})`, boxShadow: '0 6px 18px rgba(0,0,0,0.18)', border: '1px solid rgba(0,0,0,0.08)' }}>
                  {/* push pin */}
                  <span className="absolute left-1/2 -top-2 -translate-x-1/2 w-4 h-4 rounded-full"
                    style={{ background: paper.pin, boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }} />
                  <p className="font-display font-bold text-sm text-black/85 leading-snug mb-2">{paper.title}</p>
                  {/* fake abstract lines */}
                  <div className="space-y-1.5 mb-3">
                    {[100, 92, 96, 60].map((wd, i) => (
                      <div key={i} className="h-1.5 rounded bg-black/10" style={{ width: `${wd}%` }} />
                    ))}
                  </div>
                  <p className="font-mono text-[9px] tracking-wider text-black/40">{paper.venue}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Monitor with the interview */}
          <div className="desk-item lg:col-span-2">
            <a
              href={youtubeId ? `https://www.youtube.com/watch?v=${youtubeId}` : 'https://www.youtube.com/results?search_query=lakshmi+siri+appalaneni'}
              target="_blank" rel="noopener noreferrer" className="block group"
            >
              <div className="rounded-xl overflow-hidden" style={{ border: '10px solid #14161c', boxShadow: '0 20px 60px rgba(0,0,0,0.35)' }}>
                {youtubeId ? (
                  <iframe
                    className="w-full aspect-video"
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title="Video interview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full aspect-video relative flex flex-col items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #1a1020, #2a1420)' }}>
                    <img src="/logos/youtube.svg" alt="" className="w-8 h-8 mb-3 opacity-80" style={{ filter: 'invert(0.35) sepia(1) saturate(30) hue-rotate(-15deg)' }} />
                    <span className="w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ background: '#ff0000' }}>
                      <Play size={22} fill="#fff" color="#fff" />
                    </span>
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/60 mt-4">Video interview</p>
                  </div>
                )}
              </div>
              {/* monitor stand */}
              <div className="mx-auto w-16 h-5" style={{ background: '#14161c' }} />
              <div className="mx-auto w-32 h-2 rounded-b-lg" style={{ background: '#14161c' }} />
            </a>

            {/* Tablet with the blog + framed post, side by side under the monitor */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <a href={LINKS.blog} target="_blank" rel="noopener noreferrer"
                className="block rounded-2xl p-1 transition-transform duration-300 hover:-translate-y-1.5"
                style={{ background: '#14161c', boxShadow: '0 12px 30px rgba(0,0,0,0.3)' }}>
                <div className="rounded-xl h-full p-4 flex flex-col justify-between min-h-[170px]"
                  style={{ background: '#faf9f6' }}>
                  <img src="/logos/medium.svg" alt="Medium" className="w-5 h-5 opacity-80" />
                  <div>
                    <p className="font-display font-bold text-[13px] leading-snug text-black/85 mb-1">
                      Quantum journey of a 13-year-old
                    </p>
                    <p className="font-mono text-[9px] text-black/40">medium.com/@siriapps3</p>
                  </div>
                </div>
              </a>

              <a href={LINKS.linkedinPost} target="_blank" rel="noopener noreferrer"
                className="block p-3 transition-transform duration-300 hover:-translate-y-1.5 hover:rotate-1"
                style={{ background: '#3d2f1e', border: '6px solid #5a4426', boxShadow: '0 12px 30px rgba(0,0,0,0.35)' }}>
                <div className="h-full p-4 flex flex-col justify-between min-h-[152px]" style={{ background: '#f4f1ea' }}>
                  <img src="/logos/linkedin.svg" alt="LinkedIn" className="w-5 h-5" style={{ filter: 'invert(0.4) sepia(1) saturate(20) hue-rotate(180deg)' }} />
                  <div>
                    <p className="font-display font-bold text-[12px] leading-snug text-black/85 mb-1">
                      Innovation thrives where industry and education meet
                    </p>
                    <p className="font-mono text-[9px] text-black/40">Featured post · T-Mobile win</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
