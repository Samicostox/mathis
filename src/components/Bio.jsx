import Section from './Section'
import Reveal from './Reveal'

const BIO_PARAGRAPHS = [
  "J'ai commencé le stand-up et la vidéo en 2023. Trois ans plus tard, vous êtes de plus en plus à me suivre sur scène et à regarder ce que je fais en ligne.",
  "Assez pour que je puisse quitter mon travail et devenir humoriste à temps plein. Sincèrement, merci.",
  "Je travaille sur un premier spectacle. Il n'a pas d'autre prétention que de faire rire — mais j'espère que vous y trouverez un peu plus.",
]

export default function Bio() {
  return (
    <Section id="bio" eyebrow="07" title="Bio">
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
          {BIO_PARAGRAPHS[0]}
        </p>
      </Reveal>
      <Reveal delay={100}>
        <div style={{ maxWidth: 640, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {BIO_PARAGRAPHS.slice(1).map((p, i) => (
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
