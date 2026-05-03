import { useState } from 'react'
import Section from './Section'
import Reveal from './Reveal'
import Icon from './Icon'

export default function AskCity() {
  const [sent, setSent] = useState(false)
  const [city, setCity] = useState('')
  const [email, setEmail] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!city || !email) return
    setSent(true)
  }

  return (
    <Section
      id="demande-ville"
      eyebrow="02"
      title={<>Demande ta<br />ville.</>}
      kicker="Pas de date chez toi ? Dis-nous où. Je t'écris dès que je passe."
    >
      <Reveal>
        {!sent ? (
          <form
            onSubmit={submit}
            className="ask-form grid"
            style={{ gridTemplateColumns: '1.2fr 1.5fr auto', gap: 0, border: '1px solid var(--line)', maxWidth: 900 }}
          >
            <input
              type="text" placeholder="Ta ville" value={city} onChange={(e) => setCity(e.target.value)} required
              style={{ background: 'transparent', border: 'none', borderRight: '1px solid var(--line)', padding: '22px 24px', fontFamily: 'Space Grotesk, sans-serif', fontSize: 16, color: 'var(--fg)', outline: 'none' }}
            />
            <input
              type="email" placeholder="ton@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required
              style={{ background: 'transparent', border: 'none', borderRight: '1px solid var(--line)', padding: '22px 24px', fontFamily: 'Space Grotesk, sans-serif', fontSize: 16, color: 'var(--fg)', outline: 'none' }}
            />
            <button type="submit" className="mono-ish inline-flex items-center gap-2 cursor-pointer" style={{ background: 'var(--accent)', color: '#0A0A0A', border: 'none', padding: '0 28px', fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>
              <span>Envoyer</span>
              <Icon name="arrow-right" size={16} stroke={2} />
            </button>
          </form>
        ) : (
          <div className="flex items-center gap-5" style={{ border: '1px solid var(--accent)', padding: '32px 28px', maxWidth: 900 }}>
            <div className="inline-flex items-center justify-center shrink-0" style={{ width: 40, height: 40, background: 'var(--accent)', color: '#000' }}>
              <Icon name="check" size={20} stroke={2.5} />
            </div>
            <div>
              <div className="display" style={{ fontSize: 28 }}>Reçu — {city}.</div>
              <div style={{ color: 'var(--fg-dim)', marginTop: 4, fontSize: 14 }}>Je t'écris dès qu'une date se débloque.</div>
            </div>
          </div>
        )}
      </Reveal>
    </Section>
  )
}
