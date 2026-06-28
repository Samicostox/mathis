import { useState, useRef } from 'react'
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
  const [progress, setProgress] = useState(0)
  const [err, setErr] = useState('')
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef(null)

  const doUpload = async (file) => {
    if (!file) return
    setBusy(true); setErr(''); setProgress(0)
    // Fake progress tick so the UI feels responsive
    const ticker = setInterval(() => setProgress((p) => Math.min(p + 8, 90)), 180)
    try {
      const url = await uploadFile(file)
      clearInterval(ticker); setProgress(100)
      onChange(url)
      setTimeout(() => { setBusy(false); setProgress(0) }, 600)
    } catch (ex) {
      clearInterval(ticker); setBusy(false); setProgress(0)
      setErr(String(ex?.message || ex))
    }
  }

  const onFile = (e) => doUpload(e.target.files?.[0])
  const onDrop = (e) => {
    e.preventDefault(); setDragging(false)
    doUpload(e.dataTransfer.files?.[0])
  }

  const isVideo = value && /\.(mp4|webm|mov)(\?|$)/i.test(value)
  const hasValue = !!value

  return (
    <div style={{ marginBottom: 18 }}>
      {label && <span style={labelStyle}>{label}</span>}

      {/* Drop zone */}
      <div
        onClick={() => !busy && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        style={{
          position: 'relative',
          border: `2px dashed ${dragging ? c.accent : err ? '#FF6B6B' : hasValue ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.15)'}`,
          borderRadius: 8,
          background: dragging ? 'rgba(182,255,60,0.05)' : c.bgInput,
          cursor: busy ? 'wait' : 'pointer',
          overflow: 'hidden',
          transition: 'border-color .15s, background .15s',
          minHeight: hasValue ? 'auto' : 96,
          display: 'flex',
          flexDirection: hasValue ? 'row' : 'column',
          alignItems: 'center',
          justifyContent: hasValue ? 'flex-start' : 'center',
          gap: 16,
          padding: hasValue ? 12 : 20,
        }}
      >
        {/* Progress bar overlay */}
        {busy && (
          <div style={{ position: 'absolute', bottom: 0, left: 0, height: 3, background: c.accent, width: `${progress}%`, transition: 'width .2s' }} />
        )}

        {hasValue ? (
          <>
            {/* Thumbnail */}
            {isVideo ? (
              <video src={value} muted style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 4, flexShrink: 0 }} />
            ) : (
              <img src={value} alt="" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 4, flexShrink: 0 }} />
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, color: c.fg, fontFamily: 'Space Grotesk', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {value.split('/').pop()?.split('?')[0]}
              </div>
              <div style={{ fontSize: 11, color: c.dim, fontFamily: 'Space Grotesk' }}>
                {busy ? `Remplacement… ${progress}%` : 'Cliquer ou glisser pour remplacer'}
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange(null) }}
              style={{ background: 'rgba(255,80,80,0.15)', border: '1px solid rgba(255,80,80,0.35)', color: '#FF6B6B', padding: '6px 12px', fontSize: 11, cursor: 'pointer', borderRadius: 4, fontFamily: 'Space Grotesk', flexShrink: 0 }}
            >
              Retirer
            </button>
          </>
        ) : (
          <>
            <div style={{ fontSize: 28, opacity: 0.4 }}>↑</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: c.fg, fontFamily: 'Space Grotesk', marginBottom: 4 }}>
                {busy ? `Téléversement… ${progress}%` : 'Cliquer ou glisser un fichier ici'}
              </div>
              <div style={{ fontSize: 11, color: c.dim, fontFamily: 'Space Grotesk' }}>
                {accept === 'video/*' ? 'MP4, WebM, MOV' : 'JPG, PNG, WebP, GIF'}
              </div>
            </div>
          </>
        )}
      </div>

      {err && (
        <div style={{ marginTop: 8, padding: '8px 12px', background: 'rgba(255,80,80,0.12)', border: '1px solid rgba(255,80,80,0.3)', borderRadius: 4, fontSize: 12, color: '#FF9090', fontFamily: 'Space Grotesk' }}>
          ⚠ {err}
        </div>
      )}

      <input ref={inputRef} type="file" accept={accept} onChange={onFile} disabled={busy} style={{ display: 'none' }} />
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
