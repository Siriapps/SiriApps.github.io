import ShootingStarCursor from './components/ShootingStarCursor'
import Navbar from './components/Navbar'
import SocialSidebar from './components/SocialSidebar'
import HeroFlight from './sections/HeroFlight'
import HeroPortrait from './sections/HeroPortrait'
import HeroWorking from './sections/HeroWorking'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Awards from './sections/Awards'
import Contact from './sections/Contact'

export default function App() {
  return (
    <>
      <ShootingStarCursor />
      <Navbar />
      <SocialSidebar />
      <main>
        <HeroFlight />
        <HeroPortrait />
        <HeroWorking />
        <Experience />
        <Projects />
        <Skills />
        <Awards />
        <Contact />
      </main>
    </>
  )
}
