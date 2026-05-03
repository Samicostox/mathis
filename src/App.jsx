import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Dates from './components/Dates'
import AskCity from './components/AskCity'
import Socials from './components/Socials'
import Videos from './components/Videos'
import Bio from './components/Bio'
import Gallery from './components/Gallery'
import Press from './components/Press'
import Newsletter from './components/Newsletter'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  // Apply grayscale photo treatment on mount (design default: b&w)
  useEffect(() => {
    const style = document.createElement('style')
    style.id = 'photo-treatment'
    style.textContent = '.photo { filter: grayscale(1) contrast(1.05); }'
    document.head.appendChild(style)
    return () => style.remove()
  }, [])

  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Dates />
        <AskCity />
        <Socials />
        <Videos />
        <Bio />
        <Gallery />
        <Press />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
