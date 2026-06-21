import { useState } from 'react'
import Section from './Section'
import Reveal from './Reveal'
import Icon from './Icon'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <Section
      id="newsletter"
      eyebrow="05"
      tone="accent"
      title={<>La newsletter,<br />sans spam.</>}
      kicker="Une dizaine d'envois par an, uniquement quand il y a du neuf — dates, vidéos, spectacles. Double opt-in, RGPD."
    >
      <Reveal>
        {!sent ? (
          <form
            data-accent-fill
            onSubmit={(e) => { e.preventDefault(); if (email) setSent(true) }}
            className="grid"
            style={{ gridTemplateColumns: '1fr auto', border: '1px solid var(--line)', maxWidth: 720 }}
          >
            <input
              type="email" placeholder="ton@email.com" required
              value={email} onChange={(e) => setEmail(e.target.value)}
              style={{ background: 'transparent', border: 'none', padding: '24px 24px', fontFamily: 'Space Grotesk, sans-serif', fontSize: 17, color: 'var(--fg)', outline: 'none' }}
            />
            <button type="submit" className="mono-ish inline-flex items-center gap-2 cursor-pointer" style={{ background: 'var(--fg)', color: '#0A0A0A', border: 'none', padding: '0 28px', fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>
              <span>S'inscrire</span>
              <Icon name="arrow-right" size={16} stroke={2} />
            </button>
          </form>
        ) : (
          <div data-accent-box className="flex items-center gap-5" style={{ border: '1px solid var(--accent)', padding: '28px', maxWidth: 720 }}>
            <div data-accent-icon className="inline-flex items-center justify-center shrink-0" style={{ width: 40, height: 40, background: 'var(--accent)', color: '#000' }}>
              <Icon name="check" size={20} stroke={2.5} />
            </div>
            <div>
              <div className="display" style={{ fontSize: 24 }}>Presque.</div>
              <div style={{ color: 'var(--fg-dim)', marginTop: 4, fontSize: 14 }}>Check ta boîte mail pour confirmer l'inscription.</div>
            </div>
          </div>
        )}
      </Reveal>
    </Section>
  )
}
