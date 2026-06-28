import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Dates from './components/Dates'
import Show from './components/Show'
import AskCity from './components/AskCity'
import Videos from './components/Videos'
import Socials from './components/Socials'
import Newsletter from './components/Newsletter'
import Press from './components/Press'
import Bio from './components/Bio'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'
import EmailPopup from './components/EmailPopup'
import ColorPicker from './components/ColorPicker'

export default function App() {
  useEffect(() => {
    const style = document.createElement('style')
    style.id = 'photo-treatment'
    style.textContent = '.photo { filter: grayscale(1) contrast(1.05); }'
    document.head.appendChild(style)
    // Green section alternation on by default (Design Picker can toggle off)
    document.body.classList.add('accent-on')
    return () => style.remove()
  }, [])

  return (
    <div>
      <Header />
      <main>
        <Hero />
        {/* 01 */} <Dates />
        {/* 02 */} <Show />
        {/* 03 */} <AskCity />
        {/* 04 */} <Videos />
        {/* 05 */} <Socials />
        {/* 06 */} <Newsletter />
        {/* 07 */} <Press />
        {/* 08 */} <Bio />
        {/* 09 */} <Gallery />
        {/* 10 */} <Contact />
      </main>
      <Footer />
      <EmailPopup />
      <ColorPicker />
    </div>
  )
}
