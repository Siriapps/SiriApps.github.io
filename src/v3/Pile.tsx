import { useEffect, useRef } from 'react'
import Matter from 'matter-js'
import { projects } from './data'
import { reduced } from './hooks'

/* The pile: when the close scrolls into view, cubes drop from above and settle at the bottom of the screen.
   Public project cubes carry their names. Idea cubes are sealed: only a number and a one-word area show,
   so the ideas themselves never ship with the page. Pointer can nudge the pile. Matter.js drives the physics;
   each body is a DOM cube with CSS faces so it reads as 3D. */
type Cube = { label: string; sub: string; tone: string; size: number; sealed?: boolean }

const IDEA_AREAS = ['assembly', 'wayfinding', 'family', 'campus', 'hardware']
const cubes: Cube[] = [
  ...projects.slice(0, 7).map((p, i) => ({ label: p.title, sub: 'project', tone: ['#ff8a3d', '#f06ab0', '#7c5cff', '#2f5bff', '#ffd166'][i % 5], size: 84 + (i % 3) * 14 })),
  ...IDEA_AREAS.map((a, i) => ({ label: `Idea ${String(i + 1).padStart(2, '0')}`, sub: `${a}, sealed`, tone: '#1c2a5e', size: 74 + (i % 2) * 18, sealed: true })),
]

export default function Pile() {
  const host = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = host.current
    if (!el || reduced()) return
    const { Engine, Bodies, Composite, Runner, Mouse, MouseConstraint, Body } = Matter
    const engine = Engine.create({ gravity: { x: 0, y: 1.1 } })
    const W = () => el.clientWidth, H = () => el.clientHeight
    const walls = [
      Bodies.rectangle(W() / 2, H() + 40, W() * 2, 80, { isStatic: true, friction: 0.9 }),
      Bodies.rectangle(-20, H() / 2, 80, H() * 4, { isStatic: true }),
      Bodies.rectangle(W() + 20, H() / 2, 80, H() * 4, { isStatic: true }),
    ]
    Composite.add(engine.world, walls)
    // the tilted faces draw above the box, so the floor sits a little below the edge
    const onResize = () => { Body.setPosition(walls[0], { x: W() / 2, y: H() - 24 }); Body.setPosition(walls[2], { x: W() + 20, y: H() / 2 }) }
    const nodes: { body: Matter.Body; dom: HTMLElement }[] = []
    let started = false
    const drop = () => {
      if (started) return; started = true
      onResize()   // the section has its final height by now; put the floor at its bottom
      cubes.forEach((c, i) => {
        setTimeout(() => {
          const x = W() * (0.12 + 0.76 * ((i * 0.618) % 1)), s = c.size
          const body = Bodies.rectangle(x, -s - 40, s, s, { restitution: 0.08, friction: 0.6, frictionAir: 0.012, density: 0.004, angle: (Math.random() - 0.5) * 0.6 })
          Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08)
          const dom = document.createElement('div')
          dom.className = `cube ${c.sealed ? 'sealed' : ''}`
          dom.style.setProperty('--s', `${s}px`); dom.style.setProperty('--tone', c.tone)
          dom.style.setProperty('--h', `${((i * 47) % 70) - 35}deg`)   // stay in the pink, violet, cyan family
          dom.style.setProperty('--spin', `${(Math.random() * 40 - 20).toFixed(1)}deg`)
          dom.innerHTML = `<span class="c3"><span class="f fz"><b>${c.label}</b><small>${c.sub}</small></span><span class="f bz"></span><span class="f rx"></span><span class="f lx"></span><span class="f ty"></span><span class="f by"></span></span>`
          el.appendChild(dom)
          Composite.add(engine.world, body)
          nodes.push({ body, dom })
        }, i * 260)
      })
    }
    const io = new IntersectionObserver(es => { if (es[0].isIntersecting) drop() }, { threshold: 0.35 })
    io.observe(el)
    // the pointer can push cubes around; keep the wheel free for scrolling
    const mouse = Mouse.create(el)
    mouse.element.removeEventListener('wheel', (mouse as unknown as { mousewheel: EventListener }).mousewheel)
    const mc = MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.12, damping: 0.1, render: { visible: false } } })
    Composite.add(engine.world, mc)
    const runner = Runner.create()
    Runner.run(runner, engine)
    let raf = 0
    const paint = () => {
      nodes.forEach(({ body, dom }) => { const s = parseFloat(dom.style.getPropertyValue('--s')); dom.style.transform = `translate(${body.position.x - s / 2}px, ${body.position.y - s / 2}px) rotate(${body.angle}rad)` })
      raf = requestAnimationFrame(paint)
    }
    paint()
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); io.disconnect(); Runner.stop(runner); Engine.clear(engine); window.removeEventListener('resize', onResize); nodes.forEach(n => n.dom.remove()) }
  }, [])
  return <div className="pile" ref={host} aria-hidden="true" />
}
