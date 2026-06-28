import { useState } from 'react'
import { uploadFile } from './api'

const c = {
  border: '1px solid rgba(255,255,255,0.14)',
  bg: '#141414',
  bgInput: '#0E0E0E',
  fg: '#F5F5F5',
  dim: 'rgba(245,245,245,0.5)',
  accent: '#B6FF3C',
}

export const labelStyle = {
  display: 'block',
  fontSize: 11,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: c.dim,
  marginBottom: 6,
  fontFamily: 'Space Grotesk, sans-serif',
}

const inputBase = {
  width: '100%',
  background: c.bgInput,
  border: c.border,
  color: c.fg,
  padding: '10px 12px',
  fontSize: 14,
  fontFamily: 'Space Grotesk, sans-serif',
  outline: 'none',
  borderRadius: 4,
}

export function TextField({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <label style={{ display: 'block', marginBottom: 14 }}>
      {label && <span style={labelStyle}>{label}</span>}
      <input
        type={type}
        value={value ?? ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={inputBase}
      />
    </label>
  )
}

export function TextArea({ label, value, onChange, rows = 4 }) {
  return (
    <label style={{ display: 'block', marginBottom: 14 }}>
      {label && <span style={labelStyle}>{label}</span>}
      <textarea
        rows={rows}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        style={{ ...inputBase, resize: 'vertical', lineHeight: 1.5 }}
      />
    </label>
  )
}

export function Select({ label, value, onChange, options }) {
  return (
    <label style={{ display: 'block', marginBottom: 14 }}>
      {label && <span style={labelStyle}>{label}</span>}
      <select
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value || null)}
        style={{ ...inputBase, appearance: 'auto' }}
      >
        {options.map((o) => (
          <option key={String(o.value)} value={o.value ?? ''}>{o.label}</option>
        ))}
      </select>
    </label>
  )
}

export function Toggle({ label, value, onChange }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, cursor: 'pointer' }}>
      <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
      <span style={{ ...labelStyle, marginBottom: 0 }}>{label}</span>
    </label>
  )
}

export function ImageField({ label, value, onChange, accept = 'image/*' }) {
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  const handle = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setBusy(true); setErr('')
    try {
      const url = await uploadFile(file)
      onChange(url)
    } catch (ex) {
      setErr(String(ex?.message || ex))
    } finally {
      setBusy(false)
    }
  }

  const isVideo = value && /\.(mp4|webm|mov)(\?|$)/i.test(value)

  return (
    <div style={{ marginBottom: 14 }}>
      {label && <span style={labelStyle}>{label}</span>}
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {value && (
          isVideo ? (
            <video src={value} muted style={{ width: 96, height: 96, objectFit: 'cover', border: c.border, borderRadius: 4 }} />
          ) : (
            <img src={value} alt="" style={{ width: 96, height: 96, objectFit: 'cover', border: c.border, borderRadius: 4 }} />
          )
        )}
        <div style={{ flex: 1, minWidth: 180 }}>
          <input type="file" accept={accept} onChange={handle} disabled={busy} style={{ fontSize: 13, color: c.dim }} />
          {busy && <div style={{ fontSize: 12, color: c.accent, marginTop: 6 }}>Téléversement…</div>}
          {err && <div style={{ fontSize: 12, color: '#FF6B6B', marginTop: 6 }}>{err}</div>}
          {value && (
            <button type="button" onClick={() => onChange(null)} style={ghostBtn}>Retirer</button>
          )}
        </div>
      </div>
    </div>
  )
}

export const ghostBtn = {
  marginTop: 8,
  background: 'transparent',
  border: c.border,
  color: c.fg,
  padding: '6px 12px',
  fontSize: 12,
  cursor: 'pointer',
  borderRadius: 4,
  fontFamily: 'Space Grotesk, sans-serif',
}

export const addBtn = {
  background: 'transparent',
  border: `1px dashed rgba(255,255,255,0.3)`,
  color: c.accent,
  padding: '10px 16px',
  fontSize: 13,
  cursor: 'pointer',
  borderRadius: 4,
  fontFamily: 'Space Grotesk, sans-serif',
  width: '100%',
}

// Editable list of plain strings.
export function StringList({ label, value, onChange, placeholder, max }) {
  const list = value || []
  const update = (i, v) => onChange(list.map((x, j) => (j === i ? v : x)))
  const remove = (i) => onChange(list.filter((_, j) => j !== i))
  const add = () => onChange([...list, ''])
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <span style={labelStyle}>{label}</span>}
      {list.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <input value={item} placeholder={placeholder} onChange={(e) => update(i, e.target.value)} style={{ ...inputBase, flex: 1 }} />
          <button type="button" onClick={() => remove(i)} style={{ ...ghostBtn, marginTop: 0 }}>✕</button>
        </div>
      ))}
      {(!max || list.length < max) && (
        <button type="button" onClick={add} style={addBtn}>+ Ajouter</button>
      )}
    </div>
  )
}

// Card wrapper for a section.
export function Card({ title, children }) {
  return (
    <div style={{ background: c.bg, border: c.border, borderRadius: 8, padding: 24, marginBottom: 20 }}>
      <h2 style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: 20, margin: '0 0 18px', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>{title}</h2>
      {children}
    </div>
  )
}

export const palette = c
