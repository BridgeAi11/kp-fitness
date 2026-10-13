import { useEffect } from 'react'
import Lenis from 'lenis'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Services from './components/sections/Services'
import Membership from './components/sections/Membership'
import Testimonials from './components/sections/Testimonials'
import BMICalculator from './components/sections/BMICalculator'
import CalorieCalculator from './components/sections/CalorieCalculator'
import FAQ from './components/sections/FAQ'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis()
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <main className="bg-[#070707] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Membership />
      <Testimonials />
      <BMICalculator />
      <CalorieCalculator />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}