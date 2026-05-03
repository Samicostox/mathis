import Reveal from './Reveal'
import BigButton from './BigButton'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex flex-col"
      style={{ minHeight: '100vh' }}
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/780425_8.jpg"
          alt=""
          aria-hidden="true"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
            filter: 'grayscale(1) contrast(1.05)',
          }}
        />
        {/* Gradient overlay: dark on left & bottom, transparent on right */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(105deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.75) 45%, rgba(10,10,10,0.15) 100%), linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 40%)',
          }}
        />
      </div>

      {/* Content */}
      <div
        className="relative flex flex-col justify-end flex-1"
        style={{ paddingTop: 120, paddingBottom: 0 }}
      >
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', width: '100%', padding: '0 var(--pad-x) clamp(48px, 7vw, 80px)' }}>
          <Reveal>
            <div className="eyebrow flex items-center gap-3" style={{ marginBottom: 28 }}>
              <span style={{ width: 8, height: 8, background: 'var(--accent)', display: 'inline-block', flexShrink: 0 }} />
              Nouveau spectacle — Tournée 2026
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1
              className="display"
              style={{
                fontSize: 'clamp(36px, 11vw, 160px)',
                margin: '0 0 32px',
                hyphens: 'none',
              }}
            >
              <span className="block">Mathis</span>
              <span className="block">Charbon<span style={{ color: 'var(--accent)' }}>·</span>nier</span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(17px, 1.5vw, 21px)',
              lineHeight: 1.45,
              maxWidth: 480,
              margin: '0 0 40px',
              color: 'var(--fg)',
            }}>
              Humoriste. Stand-up sec, précis, sans filet.{' '}
              <span style={{ color: 'var(--fg-dim)' }}>40 dates entre mai et novembre. Paris complet.</span>
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="flex flex-wrap gap-4">
              <BigButton href="#dates" icon="arrow-right">Voir les dates</BigButton>
              <BigButton href="#videos" variant="outline" icon="play">Regarder un extrait</BigButton>
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
            color: 'var(--fg-dim)',
          }}
        >
          <div className="ticker-track" style={{ display: 'inline-flex', gap: 48, padding: '18px 0', whiteSpace: 'nowrap' }}>
            {[0, 1].map((i) => (
              <span key={i} style={{ display: 'inline-flex', gap: 48 }}>
                <span>★ Paris · Lyon · Bordeaux · Toulouse · Marseille · Nantes · Lille · Strasbourg · Bruxelles · Genève · Montréal ★</span>
                <span style={{ color: 'var(--accent)' }}>Tournée 2026 — en cours</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
