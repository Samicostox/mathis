import { useEffect } from 'react'
import { useConfig } from './config/ConfigContext'
import { DEFAULT_CONFIG } from './config/defaults'
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
import Loader from './components/Loader'

const SECTIONS = {
  dates:      <Dates />,
  show:       <Show />,
  askCity:    <AskCity />,
  videos:     <Videos />,
  socials:    <Socials />,
  newsletter: <Newsletter />,
  press:      <Press />,
  bio:        <Bio />,
  gallery:    <Gallery />,
  contact:    <Contact />,
}

const DEFAULT_ORDER = DEFAULT_CONFIG.sectionOrder

export default function App() {
  const { sectionOrder } = useConfig()

  useEffect(() => {
    const style = document.createElement('style')
    style.id = 'photo-treatment'
    style.textContent = '.photo { filter: grayscale(1) contrast(1.05); }'
    document.head.appendChild(style)
    document.body.classList.add('accent-on')
    return () => style.remove()
  }, [])

  // Build the final ordered list: use config order, then append any keys
  // not included (safety net so no section ever disappears by accident).
  const order = Array.isArray(sectionOrder) && sectionOrder.length
    ? [...sectionOrder, ...DEFAULT_ORDER.filter((k) => !sectionOrder.includes(k))]
    : DEFAULT_ORDER

  return (
    <div>
      <Loader />
      <Header />
      <main>
        <Hero />
        {order.map((key) => SECTIONS[key] ? <div key={key}>{SECTIONS[key]}</div> : null)}
      </main>
      <Footer />
      <EmailPopup />
      {import.meta.env.DEV && <ColorPicker />}
    </div>
  )
}
