import { useState } from 'react'

const ACCENT_PRESETS = [
  { label: 'Lime (actuel)',    value: '#B6FF3C' },
  { label: 'Bottega Green',   value: '#00843D' },
  { label: 'Bottega foncé',   value: '#1A5C2E' },
  { label: 'Blanc',           value: '#F5F5F5' },
  { label: 'Rouge',           value: '#FF4D4D' },
]

const FONT_PRESETS = [
  { label: 'Archivo (actuel)',  value: '"Archivo", "Space Grotesk", sans-serif' },
  { label: 'Inter',             value: '"Inter", system-ui, sans-serif' },
  { label: 'SF Pro Display',    value: '"SF Pro Display", "Inter", system-ui, sans-serif' },
  { label: 'Space Grotesk',     value: '"Space Grotesk", sans-serif' },
]

const BG_ACCENT_PRESETS = [
  { label: 'Vert sur AskCity + Newsletter', value: 'accent' },
  { label: 'Tout noir (uniforme)', value: 'flat' },
]

const SECTION_BG_PRESETS = [
  { label: "Suivre l'accent", value: null },
  { label: 'Lime',          value: '#B6FF3C' },
  { label: 'Bottega Green', value: '#00843D' },
  { label: 'Crème',         value: '#EDE7D9' },
  { label: 'Noir doux',     value: '#141414' },
]

function setVar(name, value) {
  document.documentElement.style.setProperty(name, value)
}

function removeVar(name) {
  document.documentElement.style.removeProperty(name)
}

// Relative luminance to decide light vs dark foreground
function luminance(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex)
  if (!m) return 1
  const int = parseInt(m[1], 16)
  const r = (int >> 16) & 255, g = (int >> 8) & 255, b = int & 255
  const f = (c) => {
    c /= 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}

// Apply readable foreground vars for a given section background color
function applySectionFg(hex) {
  const dark = luminance(hex) < 0.4
  const base = dark ? '245, 245, 245' : '10, 10, 10'
  setVar('--section-fg', dark ? '#F5F5F5' : '#0A0A0A')
  setVar('--section-fg-dim', `rgba(${base}, 0.78)`)
  setVar('--section-fg-faint', `rgba(${base}, 0.55)`)
  setVar('--section-line', `rgba(${base}, 0.3)`)
}

export default function ColorPicker() {
  const [open, setOpen] = useState(false)
  const [accent, setAccent] = useState('#B6FF3C')
  const [customAccent, setCustomAccent] = useState('')
  const [font, setFont] = useState(FONT_PRESETS[0].value)
  const [bgAccent, setBgAccent] = useState('accent')
  const [sectionBg, setSectionBg] = useState(null) // null = follow accent
  const [customSection, setCustomSection] = useState('')

  const applyAccent = (hex) => {
    setAccent(hex)
    setVar('--accent', hex)
    // Keep Tailwind theme in sync
    setVar('--color-accent', hex)
    // If the section bg follows the accent, recompute its readable text
    if (sectionBg === null) applySectionFg(hex)
  }

  const applySectionBg = (hex) => {
    setSectionBg(hex)
    if (hex === null) {
      // Follow the accent color again
      removeVar('--section-bg')
      applySectionFg(accent)
    } else {
      setVar('--section-bg', hex)
      applySectionFg(hex)
    }
  }

  const applyFont = (val) => {
    setFont(val)
    setVar('--font-display', val)
    // Also update .display class font via inline override on root
    document.documentElement.style.setProperty('--font-display-override', val)
    // Inject/update an override style
    let el = document.getElementById('cp-font-override')
    if (!el) {
      el = document.createElement('style')
      el.id = 'cp-font-override'
      document.head.appendChild(el)
    }
    el.textContent = `.display { font-family: ${val} !important; }`
  }

  const applyBgAccent = (val) => {
    setBgAccent(val)
    // The green alternation lives in index.css, gated by body.accent-on
    document.body.classList.toggle('accent-on', val === 'accent')
  }

  const panelStyle = {
    position: 'fixed',
    bottom: 80,
    right: 16,
    zIndex: 9999,
    background: '#111',
    border: '1px solid rgba(255,255,255,0.15)',
    padding: 20,
    width: 'min(340px, calc(100vw - 32px))',
    maxHeight: 'calc(100vh - 110px)',
    overflowY: 'auto',
    boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
    fontFamily: 'Space Grotesk, sans-serif',
    fontSize: 13,
    display: open ? 'block' : 'none',
  }

  const labelStyle = {
    display: 'block',
    color: 'rgba(255,255,255,0.4)',
    fontSize: 10,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    marginBottom: 8,
    marginTop: 16,
  }

  return (
    <>
      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 9999,
          background: accent,
          color: '#0A0A0A',
          border: 'none',
          width: 52,
          height: 52,
          borderRadius: '50%',
          cursor: 'pointer',
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: '0.08em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          flexDirection: 'column',
          gap: 2,
        }}
        title="Design picker"
      >
        <span>🎨</span>
      </button>

      <div style={panelStyle}>
        <div style={{ color: '#fff', fontWeight: 700, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
          Design Picker
        </div>
        <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11 }}>Accent, police & fonds de section</div>

        {/* Accent color */}
        <span style={labelStyle}>Couleur accent</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {ACCENT_PRESETS.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => applyAccent(p.value)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: accent === p.value ? 'rgba(255,255,255,0.08)' : 'transparent',
                border: '1px solid ' + (accent === p.value ? 'rgba(255,255,255,0.2)' : 'transparent'),
                color: '#fff',
                padding: '7px 10px',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: 13,
                width: '100%',
                transition: 'background .15s',
              }}
            >
              <span style={{ width: 16, height: 16, background: p.value, display: 'inline-block', flexShrink: 0, border: '1px solid rgba(255,255,255,0.2)' }} />
              {p.label}
            </button>
          ))}
          {/* Custom hex */}
          <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
            <input
              type="text"
              placeholder="#hex"
              value={customAccent}
              onChange={(e) => setCustomAccent(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && /^#[0-9a-fA-F]{6}$/.test(customAccent)) applyAccent(customAccent) }}
              style={{
                flex: 1,
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff',
                padding: '7px 10px',
                fontSize: 13,
                fontFamily: 'inherit',
                outline: 'none',
              }}
            />
            <button
              type="button"
              onClick={() => { if (/^#[0-9a-fA-F]{6}$/.test(customAccent)) applyAccent(customAccent) }}
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '7px 12px', cursor: 'pointer', fontSize: 12 }}
            >
              OK
            </button>
          </div>
        </div>

        {/* Font */}
        <span style={labelStyle}>Police</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {FONT_PRESETS.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => applyFont(p.value)}
              style={{
                background: font === p.value ? 'rgba(255,255,255,0.08)' : 'transparent',
                border: '1px solid ' + (font === p.value ? 'rgba(255,255,255,0.2)' : 'transparent'),
                color: '#fff',
                padding: '7px 10px',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: 13,
                width: '100%',
                fontFamily: p.value,
                transition: 'background .15s',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Section alternation */}
        <span style={labelStyle}>Fond sections</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {BG_ACCENT_PRESETS.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => applyBgAccent(p.value)}
              style={{
                background: bgAccent === p.value ? 'rgba(255,255,255,0.08)' : 'transparent',
                border: '1px solid ' + (bgAccent === p.value ? 'rgba(255,255,255,0.2)' : 'transparent'),
                color: '#fff',
                padding: '7px 10px',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: 13,
                width: '100%',
                transition: 'background .15s',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Section background color (independent of accent) */}
        <span style={labelStyle}>Couleur fond section</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, opacity: bgAccent === 'accent' ? 1 : 0.4, pointerEvents: bgAccent === 'accent' ? 'auto' : 'none' }}>
          {SECTION_BG_PRESETS.map((p) => (
            <button
              key={String(p.value)}
              type="button"
              onClick={() => applySectionBg(p.value)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: sectionBg === p.value ? 'rgba(255,255,255,0.08)' : 'transparent',
                border: '1px solid ' + (sectionBg === p.value ? 'rgba(255,255,255,0.2)' : 'transparent'),
                color: '#fff',
                padding: '7px 10px',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: 13,
                width: '100%',
                transition: 'background .15s',
              }}
            >
              <span
                style={{
                  width: 16, height: 16, flexShrink: 0, border: '1px solid rgba(255,255,255,0.2)',
                  display: 'inline-block',
                  background: p.value || accent,
                  backgroundImage: p.value === null ? 'linear-gradient(135deg, transparent 45%, rgba(255,255,255,0.5) 45%, rgba(255,255,255,0.5) 55%, transparent 55%)' : undefined,
                }}
              />
              {p.label}
            </button>
          ))}
          {/* Custom hex for section bg */}
          <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
            <input
              type="text"
              placeholder="#hex"
              value={customSection}
              onChange={(e) => setCustomSection(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && /^#[0-9a-fA-F]{6}$/.test(customSection)) applySectionBg(customSection) }}
              style={{
                flex: 1,
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff',
                padding: '7px 10px',
                fontSize: 13,
                fontFamily: 'inherit',
                outline: 'none',
              }}
            />
            <button
              type="button"
              onClick={() => { if (/^#[0-9a-fA-F]{6}$/.test(customSection)) applySectionBg(customSection) }}
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '7px 12px', cursor: 'pointer', fontSize: 12 }}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
