import { useState } from 'react'
import { useConfig } from '../config/ConfigContext'
import Section from './Section'
import BigButton from './BigButton'
import Icon from './Icon'

function EmailRow({ person }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {}
  }

  return (
    <div className="grid items-center" style={{ gridTemplateColumns: '1fr auto', gap: 20, padding: '24px 0', borderBottom: '1px solid var(--line)' }}>
      <div>
        <div className="display" style={{ fontSize: 24, marginBottom: 4 }}>{person.name}</div>
        <div className="mono-ish" style={{ fontSize: 12, letterSpacing: '0.08em', color: 'var(--fg-dim)', textTransform: 'uppercase' }}>{person.role}</div>
        <a href={`mailto:${person.email}`} className="hover-line inline-block" style={{ marginTop: 10, fontSize: 15, color: 'var(--accent)', fontFamily: 'Space Grotesk, sans-serif' }}>
          {person.email}
        </a>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label="Copier l'email"
        className="mono-ish inline-flex items-center gap-2 cursor-pointer"
        style={{
          background: 'transparent',
          color: copied ? 'var(--accent)' : 'var(--fg)',
          border: '1px solid ' + (copied ? 'var(--accent)' : 'var(--line)'),
          padding: '10px 14px', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
          transition: 'all .2s',
        }}
      >
        <Icon name={copied ? 'check' : 'copy'} size={14} stroke={2} />
        <span>{copied ? 'Copié' : 'Copier'}</span>
      </button>
    </div>
  )
}

export default function Contact() {
  const { contacts } = useConfig()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  return (
    <Section id="contact" eyebrow="10" title="Contact">
      <div className="contact-grid grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 0, border: '1px solid var(--line)' }}>
        {/* Pros */}
        <div className="contact-cell" style={{ padding: 'clamp(28px, 4vw, 56px)', borderRight: '1px solid var(--line)', background: '#0D0D0D' }}>
          <div className="eyebrow" style={{ marginBottom: 24, color: 'var(--accent)' }}>Pros — booking & presse</div>
          <h3 className="display" style={{ fontSize: 'clamp(32px, 4vw, 48px)', margin: '0 0 12px' }}>Du direct.</h3>
          <p style={{ color: 'var(--fg-dim)', maxWidth: 380, margin: '0 0 32px' }}>
            Ni formulaire ni standard. Écris à la bonne personne, réponse sous 48h.
          </p>
          {[...(contacts.booking || []), ...(contacts.press || [])].map((p) => <EmailRow key={p.email} person={p} />)}
        </div>

        {/* Fans */}
        <div className="contact-cell" style={{ padding: 'clamp(28px, 4vw, 56px)' }}>
          <div className="eyebrow" style={{ marginBottom: 24 }}>Fans — un mot gentil</div>
          <h3 className="display" style={{ fontSize: 'clamp(32px, 4vw, 48px)', margin: '0 0 12px' }}>Dis-moi.</h3>
          <p style={{ color: 'var(--fg-dim)', maxWidth: 380, margin: '0 0 32px' }}>
            Une question, un retour, une engueulade, un dessin. Je lis tout. Je réponds quand je peux.
          </p>

          {!sent ? (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="flex flex-col">
              {[{ k: 'name', label: 'Ton nom', type: 'text' }, { k: 'email', label: 'Ton email', type: 'email' }].map((f) => (
                <label key={f.k} className="block" style={{ borderBottom: '1px solid var(--line)', padding: '14px 0' }}>
                  <div className="mono-ish" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--fg-dim)', marginBottom: 6 }}>{f.label}</div>
                  <input
                    type={f.type} required value={form[f.k]}
                    onChange={(e) => setForm((s) => ({ ...s, [f.k]: e.target.value }))}
                    style={{ background: 'transparent', border: 'none', padding: 0, width: '100%', fontFamily: 'Space Grotesk, sans-serif', fontSize: 17, color: 'var(--fg)', outline: 'none' }}
                  />
                </label>
              ))}
              <label className="block" style={{ borderBottom: '1px solid var(--line)', padding: '14px 0' }}>
                <div className="mono-ish" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--fg-dim)', marginBottom: 6 }}>Message</div>
                <textarea
                  required rows={4} value={form.message}
                  onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                  style={{ background: 'transparent', border: 'none', padding: 0, width: '100%', resize: 'vertical', fontFamily: 'Space Grotesk, sans-serif', fontSize: 17, color: 'var(--fg)', outline: 'none' }}
                />
              </label>
              <input type="text" name="company" className="absolute" style={{ left: '-9999px', width: 1, height: 1 }} tabIndex={-1} autoComplete="off" />
              <div style={{ marginTop: 28 }}>
                <BigButton icon="arrow-right">Envoyer</BigButton>
              </div>
            </form>
          ) : (
            <div className="flex items-center gap-4" style={{ border: '1px solid var(--accent)', padding: '28px 24px' }}>
              <div className="inline-flex items-center justify-center shrink-0" style={{ width: 40, height: 40, background: 'var(--accent)', color: '#000' }}>
                <Icon name="check" size={20} stroke={2.5} />
              </div>
              <div>
                <div className="display" style={{ fontSize: 24 }}>Bien reçu, {form.name || 'merci'}.</div>
                <div style={{ color: 'var(--fg-dim)', marginTop: 4, fontSize: 14 }}>Je te réponds quand je peux.</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
