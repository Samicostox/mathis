import { MC_SOCIAL } from '../data'

const siteLinks = [
  { href: '#dates',   label: 'Dates' },
  { href: '#videos',  label: 'Vidéos' },
  { href: '#bio',     label: 'Bio' },
  { href: '#contact', label: 'Contact' },
]

const legalLinks = [
  { href: '#', label: 'Mentions légales' },
  { href: '#', label: 'Confidentialité' },
  { href: '#', label: 'Cookies' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="overflow-hidden" style={{ borderTop: '1px solid var(--line)', padding: 'var(--pad-y) 0 40px', background: '#070707' }}>
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 var(--pad-x)' }}>
        <div style={{ lineHeight: 0.88, margin: '0 0 60px' }}>
          <div className="display" style={{ fontSize: 'clamp(72px, 14vw, 240px)' }}>MATHIS</div>
          <div className="display" style={{ fontSize: 'clamp(42px, 7.8vw, 134px)', color: 'var(--accent)' }}>CHARBONNIER</div>
        </div>

        <div className="footer-grid grid gap-10" style={{ gridTemplateColumns: 'repeat(4, 1fr)', paddingTop: 40, borderTop: '1px solid var(--line)' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Suivre</div>
            <div className="flex flex-col gap-2">
              {MC_SOCIAL.map((s) => (
                <a key={s.name} href={s.url} className="hover-line" style={{ fontSize: 14, color: 'var(--fg)' }}>{s.name}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Site</div>
            <div className="flex flex-col gap-2">
              {siteLinks.map((l) => (
                <a key={l.href} href={l.href} className="hover-line" style={{ fontSize: 14, color: 'var(--fg)' }}>{l.label}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Légal</div>
            <div className="flex flex-col gap-2">
              {legalLinks.map((l) => (
                <a key={l.label} href={l.href} className="hover-line" style={{ fontSize: 14, color: 'var(--fg-dim)' }}>{l.label}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Crédits</div>
            <div style={{ fontSize: 13, color: 'var(--fg-dim)', lineHeight: 1.7 }}>
              Photos — Camille Vivier<br />
              Design &amp; dev — Studio Pli<br />
              Typo — Archivo, Space Grotesk
            </div>
          </div>
        </div>

        <div
          className="flex justify-between items-center flex-wrap gap-5"
          style={{ marginTop: 60, paddingTop: 20, borderTop: '1px solid var(--line)', fontSize: 12, color: 'var(--fg-mute)', letterSpacing: '0.1em', fontFamily: 'Space Grotesk, sans-serif', textTransform: 'uppercase' }}
        >
          <span>© {year} Mathis Charbonnier</span>
          <span>Fait à Paris — ni Wix, ni Linktree.</span>
        </div>
      </div>
    </footer>
  )
}
