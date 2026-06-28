import { useState } from 'react'
import { MC_POSTAL_CITIES } from '../data'
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
  const [sent, setSent]           = useState(false)
  const [postal, setPostal]       = useState('')
  const [cityName, setCityName]   = useState(null)   // resolved city from postal
  const [email, setEmail]         = useState('')
  const [focused, setFocused]     = useState(null)

  const resolveCity = (code) => {
    if (code.length === 5) {
      setCityName(MC_POSTAL_CITIES[code] || null)
    } else {
      setCityName(null)
    }
  }

  const handlePostalChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 5)
    setPostal(val)
    resolveCity(val)
  }

  const submit = (e) => {
    e.preventDefault()
    if (!postal || !email) return
    setSent(true)
  }

  return (
    <Section
      id="demande-ville"
      eyebrow="03"
      tone="accent"
      title={<>Demande ta<br />ville</>}
      kicker="Pas de date chez toi ? Dis-moi où. Je t'écris dès que je passe."
    >
      <Reveal>
        {!sent ? (
          <form onSubmit={submit} style={{ maxWidth: 560 }}>
            {/* Postal code field */}
            <label style={{ display: 'block', marginBottom: 8 }}>
              <div
                className="eyebrow"
                style={{ marginBottom: 6, transition: 'color .2s', color: focused === 'postal' ? 'var(--accent)' : 'var(--fg-dim)' }}
              >
                Ton code postal
              </div>
              <input
                type="text"
                inputMode="numeric"
                placeholder="75011"
                value={postal}
                required
                onChange={handlePostalChange}
                onFocus={() => setFocused('postal')}
                onBlur={() => setFocused(null)}
                style={{
                  ...inputStyle,
                  borderBottomColor: focused === 'postal' ? 'var(--accent)' : 'var(--line)',
                  letterSpacing: '0.08em',
                }}
              />
              {/* City suggestion chip */}
              {cityName && (
                <div style={{ marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <span
                    data-accent-chip
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: 13,
                      padding: '5px 12px',
                      border: '1px solid var(--accent)',
                      color: 'var(--accent)',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {cityName}
                  </span>
                  <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 12, color: 'var(--fg-dim)' }}>
                    c'est bien ça ?
                  </span>
                </div>
              )}
              {postal.length === 5 && !cityName && (
                <div style={{ marginTop: 10, fontFamily: 'Space Grotesk, sans-serif', fontSize: 13, color: 'var(--fg-dim)' }}>
                  Code postal non reconnu — on notera quand même.
                </div>
              )}
            </label>

            {/* Email field */}
            <label style={{ display: 'block', marginBottom: 8, marginTop: 24 }}>
              <div
                className="eyebrow"
                style={{ marginBottom: 6, transition: 'color .2s', color: focused === 'email' ? 'var(--accent)' : 'var(--fg-dim)' }}
              >
                Ton email
              </div>
              <input
                type="email"
                placeholder="ton@email.com"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                style={{
                  ...inputStyle,
                  borderBottomColor: focused === 'email' ? 'var(--accent)' : 'var(--line)',
                }}
              />
            </label>

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
            data-accent-box
            className="flex items-center gap-5"
            style={{ border: '1px solid var(--accent)', padding: '32px 28px', maxWidth: 560 }}
          >
            <div
              data-accent-icon
              className="inline-flex items-center justify-center shrink-0"
              style={{ width: 40, height: 40, background: 'var(--accent)', color: '#000' }}
            >
              <Icon name="check" size={20} stroke={2.5} />
            </div>
            <div>
              <div className="display" style={{ fontSize: 28 }}>
                Reçu — {cityName || postal}.
              </div>
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
