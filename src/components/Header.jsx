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

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? 'rgba(10,10,10,0.82)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px) saturate(1.2)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(1.2)' : 'none',
        borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
        transition: 'background .3s, border-color .3s',
      }}
    >
      <div
        className="flex items-center justify-between gap-6"
        style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '18px var(--pad-x)' }}
      >
        <a href="#top" className="mono-ish" style={{ fontSize: 15, fontWeight: 600, letterSpacing: '0.02em', display: 'inline-flex', alignItems: 'baseline', gap: 8 }}>
          mathis<span style={{ color: 'var(--accent)' }}>·</span>chrb
        </a>

        <nav className="desktop-nav flex gap-9">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="mono-ish hover-line" style={{ fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg)' }}>
              {l.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="mobile-toggle items-center justify-center cursor-pointer"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          style={{
            display: 'none',
            background: 'transparent',
            border: '1px solid var(--line)',
            color: 'var(--fg)',
            width: 40, height: 40,
          }}
        >
          <Icon name={open ? 'close' : 'menu'} size={18} />
        </button>
      </div>

      {open && (
        <div
          className="flex flex-col gap-4"
          style={{
            borderTop: '1px solid var(--line)',
            background: 'rgba(10,10,10,0.96)',
            backdropFilter: 'blur(14px)',
            padding: '24px var(--pad-x) 32px',
          }}
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="display" style={{ fontSize: 36, color: 'var(--fg)' }}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
