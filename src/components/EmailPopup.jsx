import { useState, useEffect } from 'react'
import Icon from './Icon'

const DELAY_MS = 40_000
const SESSION_KEY = 'mc_popup_dismissed'

export default function EmailPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return
    const t = setTimeout(() => setVisible(true), DELAY_MS)
    return () => clearTimeout(t)
  }, [])

  const dismiss = () => {
    setVisible(false)
    sessionStorage.setItem(SESSION_KEY, '1')
  }

  const submit = (e) => {
    e.preventDefault()
    if (!email) return
    setSent(true)
    setTimeout(dismiss, 2200)
  }

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--pad-x)',
        background: 'rgba(10,10,10,0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss() }}
    >
      <div
        style={{
          background: '#111',
          border: '1px solid var(--line)',
          maxWidth: 480,
          width: '100%',
          padding: 'clamp(32px, 5vw, 56px)',
          position: 'relative',
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Fermer"
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'transparent',
            border: '1px solid var(--line)',
            color: 'var(--fg)',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'border-color .2s',
          }}
        >
          <Icon name="close" size={16} />
        </button>

        {!sent ? (
          <>
            <div className="eyebrow" style={{ marginBottom: 16, color: 'var(--accent)' }}>Newsletter</div>
            <h2
              className="display"
              style={{ fontSize: 'clamp(28px, 4vw, 44px)', margin: '0 0 16px' }}
            >
              Rester dans la boucle
            </h2>
            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 15, color: 'var(--fg-dim)', lineHeight: 1.55, margin: '0 0 32px' }}>
              Quelques mails par an. Nouvelles dates, vidéos, coulisses. Rien de plus.
            </p>
            <form onSubmit={submit}>
              <input
                type="email"
                placeholder="ton@email.com"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid var(--line)',
                  padding: '14px 0',
                  width: '100%',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 16,
                  color: 'var(--fg)',
                  outline: 'none',
                  marginBottom: 28,
                }}
              />
              <div className="flex gap-3 flex-wrap">
                <button
                  type="submit"
                  className="mono-ish inline-flex items-center gap-3 cursor-pointer big-btn"
                  style={{
                    background: 'var(--accent)',
                    color: '#0A0A0A',
                    border: '1px solid var(--accent)',
                    padding: '16px 28px',
                    fontSize: 12,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    transition: 'all .25s ease',
                  }}
                >
                  S'inscrire
                  <Icon name="arrow-right" size={14} stroke={2} />
                </button>
                <button
                  type="button"
                  onClick={dismiss}
                  className="mono-ish cursor-pointer"
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--line)',
                    color: 'var(--fg-dim)',
                    padding: '16px 20px',
                    fontSize: 12,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                  }}
                >
                  Non merci
                </button>
              </div>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div
              className="inline-flex items-center justify-center"
              style={{ width: 56, height: 56, background: 'var(--accent)', color: '#000', borderRadius: '50%', marginBottom: 20 }}
            >
              <Icon name="check" size={24} stroke={2.5} />
            </div>
            <h2 className="display" style={{ fontSize: 36, margin: '0 0 12px' }}>C'est bon</h2>
            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 15, color: 'var(--fg-dim)', margin: 0 }}>
              À bientôt dans ta boîte.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
