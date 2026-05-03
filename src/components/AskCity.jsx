import { useState } from 'react'
import Section from './Section'
import Reveal from './Reveal'
import Icon from './Icon'

const inputStyle = {
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid var(--line)',
  padding: '16px 0',
  width: '100%',
  fontFamily: 'Space Grotesk, sans-serif',
  fontSize: 17,
  color: 'var(--fg)',
  outline: 'none',
  transition: 'border-color .2s',
}

export default function AskCity() {
  const [sent, setSent] = useState(false)
  const [city, setCity] = useState('')
  const [email, setEmail] = useState('')
  const [focused, setFocused] = useState(null)

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
          <form onSubmit={submit} style={{ maxWidth: 560 }}>
            <div style={{ marginBottom: 0 }}>
              {[
                { key: 'city',  type: 'text',  label: 'Ta ville',       value: city,  set: setCity },
                { key: 'email', type: 'email', label: 'Ton email',       value: email, set: setEmail },
              ].map((f) => (
                <label key={f.key} style={{ display: 'block', marginBottom: 8 }}>
                  <div
                    className="eyebrow"
                    style={{ marginBottom: 6, transition: 'color .2s', color: focused === f.key ? 'var(--accent)' : 'var(--fg-dim)' }}
                  >
                    {f.label}
                  </div>
                  <input
                    type={f.type}
                    placeholder={f.key === 'city' ? 'Paris, Lyon, Bordeaux…' : 'ton@email.com'}
                    value={f.value}
                    required
                    onChange={(e) => f.set(e.target.value)}
                    onFocus={() => setFocused(f.key)}
                    onBlur={() => setFocused(null)}
                    style={{
                      ...inputStyle,
                      borderBottomColor: focused === f.key ? 'var(--accent)' : 'var(--line)',
                    }}
                  />
                </label>
              ))}
            </div>

            <div style={{ marginTop: 36 }}>
              <button
                type="submit"
                className="mono-ish inline-flex items-center gap-3 cursor-pointer big-btn"
                style={{
                  background: 'var(--accent)',
                  color: '#0A0A0A',
                  border: '1px solid var(--accent)',
                  padding: '18px 32px',
                  fontSize: 13,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  transition: 'all .25s ease',
                }}
              >
                <span>Envoyer</span>
                <Icon name="arrow-right" size={16} stroke={2} />
              </button>
            </div>
          </form>
        ) : (
          <div
            className="flex items-center gap-5"
            style={{ border: '1px solid var(--accent)', padding: '32px 28px', maxWidth: 560 }}
          >
            <div
              className="inline-flex items-center justify-center shrink-0"
              style={{ width: 40, height: 40, background: 'var(--accent)', color: '#000' }}
            >
              <Icon name="check" size={20} stroke={2.5} />
            </div>
            <div>
              <div className="display" style={{ fontSize: 28 }}>Reçu — {city}.</div>
              <div style={{ color: 'var(--fg-dim)', marginTop: 4, fontSize: 14 }}>
                Je t'écris dès qu'une date se débloque.
              </div>
            </div>
          </div>
        )}
      </Reveal>
    </Section>
  )
}
