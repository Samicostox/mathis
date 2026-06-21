import Reveal from './Reveal'
import BigButton from './BigButton'
import { MC_ANNOUNCEMENTS, MC_TICKER } from '../data'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex flex-col"
      style={{ minHeight: '100vh', minHeight: '100svh' }}
    >
      {/* Full-bleed background image — lighter overlay so photo breathes */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/780425_8.jpg"
          alt=""
          aria-hidden="true"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 20%',
            display: 'block',
            filter: 'grayscale(1) contrast(1.05)',
          }}
        />
        {/* Subtle overlay — keeps text readable without masking the photo */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.2) 60%, rgba(10,10,10,0.05) 100%), linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 35%)',
          }}
        />
      </div>

      {/* Content — pinned to bottom-left, text rides over the photo */}
      <div
        className="relative flex flex-col justify-end flex-1"
        style={{ paddingTop: 120, paddingBottom: 0 }}
      >
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', width: '100%', padding: '0 var(--pad-x) clamp(48px, 7vw, 80px)' }}>

          {/* Announcements — up to 3 green-dot lines */}
          {MC_ANNOUNCEMENTS.length > 0 && (
            <Reveal>
              <div style={{ marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 9 }}>
                {MC_ANNOUNCEMENTS.map((line, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3"
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--fg)',
                      textShadow: '0 1px 12px rgba(0,0,0,0.6)',
                    }}
                  >
                    <span style={{ width: 8, height: 8, background: 'var(--accent)', display: 'inline-block', flexShrink: 0, boxShadow: '0 0 10px var(--accent)' }} />
                    {line}
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {/* H1 — Eden Strader style: large display text overlaid on photo */}
          <Reveal delay={80}>
            <h1
              className="display"
              style={{
                fontSize: 'clamp(40px, 8.5vw, 128px)',
                margin: '0 0 28px',
                hyphens: 'none',
                lineHeight: 0.9,
                textShadow: '0 2px 30px rgba(0,0,0,0.4)',
              }}
            >
              <span className="block">Mathis</span>
              <span className="block" style={{ color: 'var(--accent)' }}>Charbonnier</span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(16px, 1.4vw, 20px)',
              lineHeight: 1.45,
              maxWidth: 420,
              margin: '0 0 40px',
              color: 'var(--fg)',
              textShadow: '0 1px 12px rgba(0,0,0,0.5)',
            }}>
              Humoriste. Scène. Vidéos.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="flex flex-wrap gap-4">
              <BigButton href="#dates" icon="arrow-right">Les prochaines dates</BigButton>
              <BigButton href="#videos" variant="outline" icon="play">Mes vidéos</BigButton>
            </div>
          </Reveal>
        </div>

        {/* Ticker */}
        <div
          className="ticker-wrap overflow-hidden relative cursor-default"
          style={{
            borderTop: '1px solid var(--line)',
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 13,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
          }}
        >
          <div className="ticker-track" style={{ display: 'inline-flex', gap: 48, padding: '18px 0', whiteSpace: 'nowrap' }}>
            {[0, 1].map((i) => (
              <span key={i} style={{ display: 'inline-flex', gap: 48 }}>
                {MC_TICKER.map((item, j) => (
                  <span key={j} style={{ color: item.accent ? 'var(--accent)' : 'var(--fg-dim)' }}>
                    {item.text}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
