import Reveal from './Reveal'

export default function Section({ id, eyebrow, title, bg, children, kicker, action }) {
  return (
    <section
      id={id}
      style={{ background: bg || 'transparent', padding: 'var(--pad-y) 0', borderTop: '1px solid var(--line)' }}
    >
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 var(--pad-x)' }}>
        {(eyebrow || title) && (
          <Reveal as="header">
            <div className="flex items-end justify-between flex-wrap gap-6" style={{ marginBottom: 'clamp(40px, 5vw, 72px)' }}>
              <div>
                {eyebrow && <div className="eyebrow" style={{ marginBottom: 18 }}>{eyebrow}</div>}
                {title && (
                  <h2 className="display" style={{ fontSize: 'clamp(44px, 7vw, 104px)', margin: 0 }}>
                    {title}
                  </h2>
                )}
                {kicker && (
                  <p style={{ maxWidth: 560, marginTop: 24, color: 'var(--fg-dim)', fontSize: 17, lineHeight: 1.5 }}>
                    {kicker}
                  </p>
                )}
              </div>
              {action && <div>{action}</div>}
            </div>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}
