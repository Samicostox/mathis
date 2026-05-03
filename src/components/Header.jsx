import { useState, useEffect } from 'react'
import Icon from './Icon'

const links = [
  { href: '#dates',   label: 'Dates' },
  { href: '#videos',  label: 'Vidéos' },
  { href: '#bio',     label: 'Bio' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: open ? 'rgba(10,10,10,0.98)' : scrolled ? 'rgba(10,10,10,0.82)' : 'transparent',
        backdropFilter: (scrolled || open) ? 'blur(14px) saturate(1.2)' : 'none',
        WebkitBackdropFilter: (scrolled || open) ? 'blur(14px) saturate(1.2)' : 'none',
        borderBottom: (scrolled || open) ? '1px solid var(--line)' : '1px solid transparent',
        transition: 'background .3s, border-color .3s',
      }}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between gap-6"
        style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '18px var(--pad-x)' }}
      >
        <a
          href="#top"
          className="mono-ish"
          style={{ fontSize: 15, fontWeight: 600, letterSpacing: '0.02em', display: 'inline-flex', alignItems: 'baseline', gap: 8 }}
          onClick={() => setOpen(false)}
        >
          mathis<span style={{ color: 'var(--accent)' }}>·</span>chrb
        </a>

        <nav className="desktop-nav flex gap-9">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="mono-ish hover-line"
              style={{ fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg)' }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="mobile-toggle items-center justify-center cursor-pointer"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          style={{
            display: 'none',
            background: 'transparent',
            border: '1px solid var(--line)',
            color: 'var(--fg)',
            width: 40, height: 40,
            transition: 'border-color .2s',
          }}
        >
          {/* Animated hamburger → X */}
          <span style={{ position: 'relative', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{
              position: 'absolute', width: 18, transition: 'opacity .2s, transform .3s',
              opacity: open ? 0 : 1, transform: open ? 'rotate(45deg) scale(0.5)' : 'none',
            }}>
              <Icon name="menu" size={18} />
            </span>
            <span style={{
              position: 'absolute', width: 18, transition: 'opacity .2s, transform .3s',
              opacity: open ? 1 : 0, transform: open ? 'none' : 'rotate(-45deg) scale(0.5)',
            }}>
              <Icon name="close" size={18} />
            </span>
          </span>
        </button>
      </div>

      {/* Mobile drawer — always rendered, animated with grid-template-rows */}
      <div
        className="mobile-drawer-outer"
        style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: 'grid-template-rows .4s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div
            style={{
              borderTop: '1px solid var(--line)',
              padding: 'var(--pad-x)',
              paddingTop: 32,
              paddingBottom: 40,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              opacity: open ? 1 : 0,
              transform: open ? 'none' : 'translateY(-12px)',
              transition: 'opacity .35s .08s ease, transform .35s .08s ease',
            }}
          >
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="display"
                style={{
                  fontSize: 'clamp(40px, 10vw, 56px)',
                  color: 'var(--fg)',
                  padding: '10px 0',
                  borderBottom: '1px solid var(--line)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  opacity: open ? 1 : 0,
                  transform: open ? 'none' : 'translateY(10px)',
                  transition: `opacity .4s ${0.1 + i * 0.06}s ease, transform .4s ${0.1 + i * 0.06}s ease`,
                }}
              >
                <span>{l.label}</span>
                <span style={{ fontSize: '0.45em', color: 'var(--accent)', letterSpacing: '0.1em' }}>→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
