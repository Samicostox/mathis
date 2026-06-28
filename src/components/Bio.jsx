import Section from './Section'
import Reveal from './Reveal'
import { useConfig } from '../config/ConfigContext'

export default function Bio() {
  const { bio } = useConfig()
  const paragraphs = bio.paragraphs || []

  return (
    <Section id="bio" eyebrow="08" title="Bio">
      <Reveal>
        {/* Large accent quote — dominates the section */}
        <p
          className="display"
          style={{
            fontSize: 'clamp(28px, 4vw, 56px)',
            color: 'var(--accent)',
            lineHeight: 1.1,
            margin: '0 0 clamp(32px, 4vw, 56px)',
            maxWidth: 900,
            textTransform: 'none',
            fontWeight: 900,
            letterSpacing: '-0.02em',
          }}
        >
          {paragraphs[0]}
        </p>
      </Reveal>
      <Reveal delay={100}>
        <div style={{ maxWidth: 640, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {paragraphs.slice(1).map((p, i) => (
            <p
              key={i}
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(17px, 1.5vw, 21px)',
                lineHeight: 1.6,
                color: 'var(--fg-dim)',
                margin: 0,
              }}
            >
              {p}
            </p>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
