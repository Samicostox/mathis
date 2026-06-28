import { useConfig } from '../config/ConfigContext'
import Section from './Section'
import Reveal from './Reveal'

export default function Press() {
  const { press } = useConfig()
  const quoted = press.filter((p) => p.quote)

  return (
    <Section id="press" eyebrow="07" title="Ils en parlent">
      <div className="grid gap-12" style={{ gridTemplateColumns: '1fr', gap: 'clamp(40px, 6vw, 72px)' }}>
        <Reveal>
          <div className="press-quotes grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid var(--line)' }}>
            {quoted.map((p, i) => (
              <div
                key={p.media}
                className="quote-cell flex flex-col justify-between"
                style={{ padding: 'clamp(24px, 3vw, 40px)', borderRight: i < quoted.length - 1 ? '1px solid var(--line)' : 'none', minHeight: 220 }}
              >
                <p style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 500, fontSize: 'clamp(18px, 1.5vw, 22px)', lineHeight: 1.35, margin: '0 0 24px', color: 'var(--fg)' }}>
                  « {p.quote} »
                </p>
                <div className="mono-ish" style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)' }}>— {p.media}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="flex flex-wrap" style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
            {press.map((p, i) => (
              <div
                key={p.media + i}
                style={{ flex: '1 1 180px', padding: '28px 20px', textAlign: 'center', borderRight: i < press.length - 1 ? '1px solid var(--line)' : 'none', fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 20, letterSpacing: '-0.02em', color: 'var(--fg)' }}
              >
                {p.media}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
