import { MC_SOCIAL } from '../data'
import Section from './Section'
import Icon from './Icon'

export default function Socials() {
  return (
    <Section id="socials" eyebrow="03" title="Ailleurs.">
      <div className="socials-grid grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: '1px solid var(--line)' }}>
        {MC_SOCIAL.map((s, i) => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-cell flex flex-col justify-between"
            style={{
              padding: '40px 28px',
              borderRight: i < MC_SOCIAL.length - 1 ? '1px solid var(--line)' : 'none',
              gap: 28, transition: 'background .2s, color .2s', minHeight: 200,
            }}
          >
            <div style={{ color: 'var(--fg)' }}><Icon name={s.icon} size={40} stroke={1.2} /></div>
            <div>
              <div className="display" style={{ fontSize: 24, marginBottom: 6 }}>{s.name}</div>
              <div className="mono-ish" style={{ fontSize: 12, color: 'var(--fg-dim)', letterSpacing: '0.04em' }}>{s.handle}</div>
            </div>
          </a>
        ))}
      </div>
    </Section>
  )
}
