import { useEffect, useState } from 'react'
import { useConfigState } from '../config/ConfigContext'
import { DEFAULT_CONFIG } from '../config/defaults'
import { login, saveConfig, getStoredPassword, clearPassword } from './api'
import {
  TextField, TextArea, Select, Toggle, ImageField, StringList, Card,
  labelStyle, ghostBtn, addBtn, palette as c,
} from './ui.jsx'

const STATUS_OPTIONS = [
  { value: '', label: '— aucun —' },
  { value: 'complet', label: 'Complet' },
  { value: 'last', label: 'Dernières places' },
  { value: 'new', label: 'Nouveau' },
]
const VIDEO_FORMATS = [
  { value: 'youtube', label: 'YouTube (16:9)' },
  { value: 'short', label: 'Short (9:16)' },
  { value: 'instagram', label: 'Carré (1:1)' },
]
const ICON_OPTIONS = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'x', label: 'X / Twitter' },
]

// Generic list-of-objects editor.
function ObjectList({ label, value, onChange, fields, blank }) {
  const list = value || []
  const update = (i, key, v) => onChange(list.map((row, j) => (j === i ? { ...row, [key]: v } : row)))
  const remove = (i) => onChange(list.filter((_, j) => j !== i))
  const add = () => onChange([...list, { ...blank }])
  const move = (i, dir) => {
    const j = i + dir
    if (j < 0 || j >= list.length) return
    const copy = [...list]
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
    onChange(copy)
  }
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <span style={labelStyle}>{label}</span>}
      {list.map((row, i) => (
        <div key={i} style={{ border: c.border, borderRadius: 6, padding: 14, marginBottom: 12, background: '#0E0E0E' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 11, color: c.dim, fontFamily: 'Space Grotesk' }}>#{i + 1}</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button type="button" onClick={() => move(i, -1)} style={{ ...ghostBtn, marginTop: 0, padding: '2px 8px' }}>↑</button>
              <button type="button" onClick={() => move(i, 1)} style={{ ...ghostBtn, marginTop: 0, padding: '2px 8px' }}>↓</button>
              <button type="button" onClick={() => remove(i)} style={{ ...ghostBtn, marginTop: 0, padding: '2px 8px' }}>✕</button>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
            {fields.map((f) => {
              const val = row[f.key]
              if (f.type === 'textarea') return <div key={f.key} style={{ gridColumn: '1 / -1' }}><TextArea label={f.label} value={val} onChange={(v) => update(i, f.key, v)} rows={3} /></div>
              if (f.type === 'select') return <Select key={f.key} label={f.label} value={val} options={f.options} onChange={(v) => update(i, f.key, v)} />
              if (f.type === 'bool') return <Toggle key={f.key} label={f.label} value={val} onChange={(v) => update(i, f.key, v)} />
              if (f.type === 'image') return <div key={f.key} style={{ gridColumn: '1 / -1' }}><ImageField label={f.label} value={val} onChange={(v) => update(i, f.key, v)} accept={f.accept} /></div>
              return <TextField key={f.key} label={f.label} value={val} onChange={(v) => update(i, f.key, v)} placeholder={f.placeholder} />
            })}
          </div>
        </div>
      ))}
      <button type="button" onClick={add} style={addBtn}>+ Ajouter</button>
    </div>
  )
}

function LoginGate({ onSuccess }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true); setErr('')
    try {
      await login(pw)
      onSuccess()
    } catch (ex) {
      setErr(String(ex?.message || ex))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0A0A0A', padding: 20 }}>
      <form onSubmit={submit} style={{ width: '100%', maxWidth: 360, background: c.bg, border: c.border, borderRadius: 10, padding: 32 }}>
        <h1 style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 26, margin: '0 0 6px', textTransform: 'uppercase' }}>Admin</h1>
        <p style={{ color: c.dim, fontSize: 13, margin: '0 0 24px', fontFamily: 'Space Grotesk' }}>Espace de gestion du site.</p>
        <TextField label="Mot de passe" type="password" value={pw} onChange={setPw} />
        {err && <div style={{ color: '#FF6B6B', fontSize: 13, marginBottom: 12 }}>{err}</div>}
        <button type="submit" disabled={busy} style={{ width: '100%', background: c.accent, color: '#0A0A0A', border: 'none', padding: '14px', fontSize: 14, fontWeight: 700, cursor: 'pointer', borderRadius: 4, fontFamily: 'Space Grotesk', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {busy ? 'Connexion…' : 'Entrer'}
        </button>
      </form>
    </div>
  )
}

export default function Admin() {
  const { config, loading } = useConfigState()
  const [authed, setAuthed] = useState(!!getStoredPassword())
  const [draft, setDraft] = useState(null)
  const [saveState, setSaveState] = useState('idle') // idle | saving | saved | error
  const [saveErr, setSaveErr] = useState('')

  // Initialise the editable draft once config has hydrated.
  useEffect(() => {
    if (!loading && draft === null) setDraft(JSON.parse(JSON.stringify(config)))
  }, [loading, config, draft])

  if (!authed) return <LoginGate onSuccess={() => setAuthed(true)} />
  if (draft === null) {
    return <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0A0A0A', color: c.dim, fontFamily: 'Space Grotesk' }}>Chargement…</div>
  }

  const up = (section, value) => setDraft((d) => ({ ...d, [section]: value }))
  const upField = (section, key, value) => setDraft((d) => ({ ...d, [section]: { ...d[section], [key]: value } }))

  const save = async () => {
    setSaveState('saving'); setSaveErr('')
    try {
      await saveConfig(draft)
      setSaveState('saved')
      setTimeout(() => setSaveState('idle'), 2500)
    } catch (ex) {
      setSaveState('error')
      setSaveErr(String(ex?.message || ex))
    }
  }

  const resetDefaults = () => {
    if (confirm('Réinitialiser tout le contenu aux valeurs par défaut ? (non sauvegardé tant que tu ne cliques pas sur Sauvegarder)')) {
      setDraft(JSON.parse(JSON.stringify(DEFAULT_CONFIG)))
    }
  }

  const logout = () => { clearPassword(); setAuthed(false) }

  const h = draft.hero
  const sh = draft.show
  const nl = draft.newsletter
  const gal = draft.gallery
  const ct = draft.contacts

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', color: c.fg, fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Top bar */}
      <div style={{ position: 'sticky', top: 0, zIndex: 10, background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(12px)', borderBottom: c.border, padding: '14px var(--pad-x, 24px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ fontFamily: 'Archivo', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Mathis · Admin</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {saveState === 'saved' && <span style={{ color: c.accent, fontSize: 13 }}>Sauvegardé ✓</span>}
          {saveState === 'error' && <span style={{ color: '#FF6B6B', fontSize: 13 }}>{saveErr}</span>}
          <a href="/" style={{ ...ghostBtn, marginTop: 0, textDecoration: 'none', display: 'inline-block' }}>Voir le site</a>
          <button type="button" onClick={logout} style={{ ...ghostBtn, marginTop: 0 }}>Déconnexion</button>
          <button type="button" onClick={save} disabled={saveState === 'saving'} style={{ background: c.accent, color: '#0A0A0A', border: 'none', padding: '10px 22px', fontSize: 13, fontWeight: 700, cursor: 'pointer', borderRadius: 4, fontFamily: 'Space Grotesk', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {saveState === 'saving' ? 'Sauvegarde…' : 'Sauvegarder'}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px 120px' }}>

        <Card title="Hero">
          <ImageField label="Image de fond" value={h.image} onChange={(v) => upField('hero', 'image', v)} />
          <TextField label="Position de l'image (ex: center 20%)" value={h.imagePosition} onChange={(v) => upField('hero', 'imagePosition', v)} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <TextField label="Prénom" value={h.firstName} onChange={(v) => upField('hero', 'firstName', v)} />
            <TextField label="Nom (en vert)" value={h.lastName} onChange={(v) => upField('hero', 'lastName', v)} />
          </div>
          <StringList label="Annonces (point vert) — max 3" value={h.announcements} max={3} onChange={(v) => upField('hero', 'announcements', v)} placeholder="Texte de l'annonce" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <TextField label="Bouton 1 — texte" value={h.ctaPrimary?.label} onChange={(v) => upField('hero', 'ctaPrimary', { ...h.ctaPrimary, label: v })} />
              <TextField label="Bouton 1 — lien" value={h.ctaPrimary?.href} onChange={(v) => upField('hero', 'ctaPrimary', { ...h.ctaPrimary, href: v })} />
            </div>
            <div>
              <TextField label="Bouton 2 — texte" value={h.ctaSecondary?.label} onChange={(v) => upField('hero', 'ctaSecondary', { ...h.ctaSecondary, label: v })} />
              <TextField label="Bouton 2 — lien" value={h.ctaSecondary?.href} onChange={(v) => upField('hero', 'ctaSecondary', { ...h.ctaSecondary, href: v })} />
            </div>
          </div>
        </Card>

        <Card title="Bandeau défilant (ticker)">
          <ObjectList
            value={draft.ticker}
            onChange={(v) => up('ticker', v)}
            blank={{ text: '', accent: false }}
            fields={[
              { key: 'text', label: 'Texte' },
              { key: 'accent', label: 'En vert', type: 'bool' },
            ]}
          />
        </Card>

        <Card title="Dates">
          <ObjectList
            value={draft.dates}
            onChange={(v) => up('dates', v)}
            blank={{ date: '2026-01-01', city: '', venue: '', status: null, url: '#' }}
            fields={[
              { key: 'date', label: 'Date (AAAA-MM-JJ)', placeholder: '2026-05-14' },
              { key: 'city', label: 'Ville' },
              { key: 'venue', label: 'Salle' },
              { key: 'status', label: 'Statut', type: 'select', options: STATUS_OPTIONS },
              { key: 'url', label: 'Lien billetterie' },
            ]}
          />
        </Card>

        <Card title="Le Spectacle">
          <TextField label="Titre" value={sh.title} onChange={(v) => upField('show', 'title', v)} />
          <TextField label="Sous-titre" value={sh.subtitle} onChange={(v) => upField('show', 'subtitle', v)} />
          <TextArea label="Description" value={sh.description} onChange={(v) => upField('show', 'description', v)} rows={5} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <TextField label="Bouton — texte" value={sh.cta} onChange={(v) => upField('show', 'cta', v)} />
            <TextField label="Bouton — lien" value={sh.ctaUrl} onChange={(v) => upField('show', 'ctaUrl', v)} />
          </div>
          <ImageField label="Affiche du spectacle" value={sh.image} onChange={(v) => upField('show', 'image', v)} />
        </Card>

        <Card title="Vidéos">
          <ObjectList
            value={draft.videos}
            onChange={(v) => up('videos', v)}
            blank={{ title: '', tag: '', duration: '', views: '', format: 'youtube', url: null, poster: null }}
            fields={[
              { key: 'title', label: 'Titre' },
              { key: 'tag', label: 'Tag (ex: Scène)' },
              { key: 'duration', label: 'Durée (ex: 3:15)' },
              { key: 'views', label: 'Vues (ex: 840k)' },
              { key: 'format', label: 'Format', type: 'select', options: VIDEO_FORMATS },
              { key: 'poster', label: 'Vignette (image)', type: 'image' },
              { key: 'url', label: 'Vidéo aperçu au survol (mp4)', type: 'image', accept: 'video/*' },
            ]}
          />
        </Card>

        <Card title="Ailleurs (réseaux sociaux)">
          <ObjectList
            value={draft.socials}
            onChange={(v) => up('socials', v)}
            blank={{ name: '', handle: '', url: '#', icon: 'instagram' }}
            fields={[
              { key: 'name', label: 'Nom' },
              { key: 'handle', label: 'Pseudo / handle' },
              { key: 'url', label: 'Lien' },
              { key: 'icon', label: 'Icône', type: 'select', options: ICON_OPTIONS },
            ]}
          />
        </Card>

        <Card title="Newsletter">
          <TextField label="Accroche" value={nl.kicker} onChange={(v) => upField('newsletter', 'kicker', v)} />
        </Card>

        <Card title="Ils en parlent (presse)">
          <ObjectList
            value={draft.press}
            onChange={(v) => up('press', v)}
            blank={{ media: '', quote: null }}
            fields={[
              { key: 'media', label: 'Média' },
              { key: 'quote', label: 'Citation (vide = logo seul)', type: 'textarea' },
            ]}
          />
        </Card>

        <Card title="Bio">
          <StringList label="Paragraphes (le 1er est en gros, en vert)" value={draft.bio.paragraphs} onChange={(v) => upField('bio', 'paragraphs', v)} placeholder="Paragraphe…" />
        </Card>

        <Card title="Galerie">
          <TextField label="Nombre de placeholders (si aucune image)" type="number" value={gal.count} onChange={(v) => upField('gallery', 'count', Number(v) || 0)} />
          <ObjectList
            label="Images"
            value={(gal.images || []).map((url) => ({ url }))}
            onChange={(rows) => upField('gallery', 'images', rows.map((r) => r.url).filter(Boolean))}
            blank={{ url: null }}
            fields={[{ key: 'url', label: 'Photo', type: 'image' }]}
          />
        </Card>

        <Card title="Contact — Booking">
          <ObjectList
            value={ct.booking}
            onChange={(v) => upField('contacts', 'booking', v)}
            blank={{ name: '', role: '', email: '' }}
            fields={[
              { key: 'name', label: 'Nom' },
              { key: 'role', label: 'Rôle' },
              { key: 'email', label: 'Email' },
            ]}
          />
        </Card>

        <Card title="Contact — Presse">
          <ObjectList
            value={ct.press}
            onChange={(v) => upField('contacts', 'press', v)}
            blank={{ name: '', role: '', email: '' }}
            fields={[
              { key: 'name', label: 'Nom' },
              { key: 'role', label: 'Rôle' },
              { key: 'email', label: 'Email' },
            ]}
          />
        </Card>

        <div style={{ marginTop: 32, display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <button type="button" onClick={resetDefaults} style={{ ...ghostBtn, marginTop: 0 }}>Réinitialiser aux valeurs par défaut</button>
          <button type="button" onClick={save} disabled={saveState === 'saving'} style={{ background: c.accent, color: '#0A0A0A', border: 'none', padding: '12px 28px', fontSize: 13, fontWeight: 700, cursor: 'pointer', borderRadius: 4, fontFamily: 'Space Grotesk', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {saveState === 'saving' ? 'Sauvegarde…' : 'Sauvegarder'}
          </button>
        </div>
      </div>
    </div>
  )
}
