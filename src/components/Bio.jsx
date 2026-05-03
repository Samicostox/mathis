import Section from './Section'
import Reveal from './Reveal'
import PhotoPlaceholder from './PhotoPlaceholder'

const stats = [
  ['40+', 'dates en 2026'],
  ['3', 'spectacles écrits'],
  ['1,2M', 'sur YouTube'],
]

export default function Bio() {
  return (
    <Section id="bio" eyebrow="05" title="Bio.">
      <div className="bio-grid grid items-start" style={{ gridTemplateColumns: '1fr 1.2fr', gap: 'clamp(30px, 5vw, 80px)' }}>
        <Reveal>
          <PhotoPlaceholder label="PORTRAIT — STUDIO 2026" seed={33} ratio="4/5" />
        </Reveal>
        <Reveal delay={100}>
          <div>
            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(22px, 2.2vw, 30px)', lineHeight: 1.35, margin: '0 0 28px', color: 'var(--fg)' }}>
              Né à Clermont en 1997. Monte sur scène en 2019, écrit le reste du temps. Premier spectacle joué au République en 2024, deuxième en tournée depuis janvier 2026.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--fg-dim)', maxWidth: 560, margin: '0 0 28px' }}>
              Un stand-up qui ne lâche rien. Ni sur la forme — textes ciselés, tempo serré — ni sur le fond : les gens, les lâchetés ordinaires, le pays tel qu'il va. Télérama parle d'une « voix qui cogne juste ». France Inter d'une « relève ».
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--fg-dim)', maxWidth: 560, margin: 0 }}>
              Aussi podcasteur (<em style={{ color: 'var(--fg)', fontStyle: 'normal' }}>Entre Deux</em>, 1,2M d'auditeurs mensuels) et accessoirement mauvais joueur de tennis.
            </p>
            <div className="flex flex-wrap gap-8" style={{ marginTop: 40 }}>
              {stats.map(([n, l]) => (
                <div key={l}>
                  <div className="display" style={{ fontSize: 42, color: 'var(--accent)' }}>{n}</div>
                  <div className="mono-ish" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-dim)', marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
