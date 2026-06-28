import Section from './Section'
import Reveal from './Reveal'
import BigButton from './BigButton'
import Img from './Img'
import { useConfig } from '../config/ConfigContext'

export default function Show() {
  const { show } = useConfig()

  return (
    <Section id="spectacle" eyebrow="02" title={show.title}>
      <div
        className="show-grid grid items-start"
        style={{ gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px, 5vw, 80px)' }}
      >
        {/* Left — text block */}
        <Reveal>
          <div>
            {show.subtitle && (
              <p
                className="mono-ish"
                style={{
                  fontSize: 12,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  marginBottom: 24,
                }}
              >
                {show.subtitle}
              </p>
            )}
            <p
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(18px, 1.6vw, 22px)',
                lineHeight: 1.6,
                color: 'var(--fg-dim)',
                margin: '0 0 40px',
                maxWidth: 520,
              }}
            >
              {show.description}
            </p>
            {show.cta && (
              <BigButton href={show.ctaUrl} icon="arrow-right">
                {show.cta}
              </BigButton>
            )}
          </div>
        </Reveal>

        {/* Right — show poster */}
        <Reveal delay={120}>
          <Img src={show.image} label="AFFICHE — SPECTACLE" seed={77} ratio="2/3" alt={show.title} />
        </Reveal>
      </div>
    </Section>
  )
}
