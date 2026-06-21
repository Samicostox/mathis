import { useState, useMemo } from 'react'
import { MC_UPCOMING } from '../data'
import Reveal from './Reveal'
import BigButton from './BigButton'

function formatDate(iso) {
  const d = new Date(iso)
  const day = d.getDate().toString().padStart(2, '0')
  const months = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc']
  return {
    day,
    mon: months[d.getMonth()],
    weekday: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'][d.getDay()],
    year: d.getFullYear(),
  }
}

function StatusBadge({ status }) {
  if (!status) return null
  const map = {
    complet: { label: 'Complet',         color: '#FF4D4D',       bg: 'transparent',   border: '#FF4D4D' },
    last:    { label: 'Dernières places', color: 'var(--accent)', bg: 'transparent',   border: 'var(--accent)' },
    new:     { label: 'Nouveau',          color: '#0A0A0A',       bg: 'var(--accent)', border: 'var(--accent)' },
  }
  const s = map[status]
  return (
    <span
      className="mono-ish inline-flex items-center"
      style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '5px 8px', color: s.color, background: s.bg, border: `1px solid ${s.border}`, fontWeight: 600, whiteSpace: 'nowrap' }}
    >
      {s.label}
    </span>
  )
}

function DateRow({ item }) {
  const d = formatDate(item.date)
  const soldOut = item.status === 'complet'
  return (
    <div
      className="date-row grid items-center"
      style={{
        gridTemplateColumns: '110px 1fr auto',
        gap: 'clamp(12px, 2vw, 28px)',
        padding: 'clamp(14px, 1.8vw, 22px) 0',
        borderBottom: '1px solid var(--line)',
      }}
    >
      {/* Date */}
      <div className="flex items-baseline gap-2">
        <span className="display" style={{ fontSize: 'clamp(32px, 4vw, 52px)', color: 'var(--fg)', lineHeight: 1 }}>
          {d.day}
        </span>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-dim)', lineHeight: 1.4 }}>
          <div>{d.mon}</div>
          <div>{d.year}</div>
        </div>
      </div>

      {/* City + venue */}
      <div className="date-info" style={{ minWidth: 0 }}>
        <div className="display" style={{ fontSize: 'clamp(20px, 2.4vw, 30px)', color: 'var(--fg)', marginBottom: 4 }}>
          {item.city}
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 13, color: 'var(--fg-dim)' }}>
          <span>{item.venue}</span>
          <span style={{ color: 'var(--fg-mute)' }}>·</span>
          <span className="mono-ish" style={{ letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 11 }}>{d.weekday} 20h30</span>
          {item.status && <StatusBadge status={item.status} />}
        </div>
      </div>

      {/* CTA — sold out shows only show the badge, no dead button */}
      <div className="flex items-center">
        {!soldOut && (
          <BigButton href={item.url} target="_blank" variant={item.status === 'last' ? 'solid' : 'outline'} icon="arrow-up-right">
            Billetterie
          </BigButton>
        )}
      </div>
    </div>
  )
}

const INITIAL_LIMIT = 8

export default function Dates() {
  const [filter, setFilter] = useState('all')
  const [showAll, setShowAll] = useState(false)

  const filtered = useMemo(() => {
    if (filter === 'paris') return MC_UPCOMING.filter((d) => d.city === 'Paris')
    if (filter === 'tour')  return MC_UPCOMING.filter((d) => d.city !== 'Paris')
    return MC_UPCOMING
  }, [filter])

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_LIMIT)
  const hasMore = filtered.length > INITIAL_LIMIT && !showAll

  const parisCount = MC_UPCOMING.filter((d) => d.city === 'Paris').length
  const tourCount  = MC_UPCOMING.length - parisCount

  const Toggle = ({ value, label, n }) => (
    <button
      type="button"
      onClick={() => { setFilter(value); setShowAll(false) }}
      className="mono-ish inline-flex items-baseline gap-2 cursor-pointer"
      style={{
        background: filter === value ? 'var(--fg)' : 'transparent',
        color: filter === value ? '#0A0A0A' : 'var(--fg)',
        border: '1px solid ' + (filter === value ? 'var(--fg)' : 'var(--line)'),
        padding: '10px 16px',
        fontSize: 11,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        fontWeight: 600,
        transition: 'all .2s',
      }}
    >
      <span>{label}</span>
      <span style={{ opacity: 0.45, fontSize: 10 }}>{n}</span>
    </button>
  )

  return (
    <section
      id="dates"
      style={{ padding: 'var(--pad-y) 0', borderTop: '1px solid var(--line)' }}
    >
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 var(--pad-x)' }}>

        {/* Section header */}
        <Reveal as="header" style={{ marginBottom: 'clamp(32px, 4vw, 56px)' }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>01 — Tournée 2026</div>
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <h2 className="display" style={{ fontSize: 'clamp(44px, 7vw, 104px)', margin: 0 }}>
                Dates
              </h2>
              <p style={{ maxWidth: 520, marginTop: 16, color: 'var(--fg-dim)', fontSize: 16, lineHeight: 1.5, marginBottom: 0 }}>
                Si t'es dans le coin.
              </p>
            </div>
            <div className="flex flex-wrap gap-2" style={{ flexShrink: 0 }}>
              <Toggle value="all"   label="Toutes"  n={MC_UPCOMING.length} />
              <Toggle value="paris" label="Paris"   n={parisCount} />
              <Toggle value="tour"  label="Tournée" n={tourCount} />
            </div>
          </div>
        </Reveal>

        {/* Date list */}
        <Reveal>
          <div style={{ borderTop: '1px solid var(--line)' }}>
            {visible.length === 0 ? (
              <div style={{ padding: 'clamp(32px, 5vw, 64px) 0', color: 'var(--fg-dim)', fontFamily: 'Space Grotesk, sans-serif', fontSize: 17 }}>
                Rien pour l'instant. Mais ça va revenir.
              </div>
            ) : (
              visible.map((item, i) => (
                <DateRow key={item.date + item.city + i} item={item} />
              ))
            )}
          </div>
        </Reveal>

        {/* Show all button */}
        {hasMore && (
          <div style={{ marginTop: 28 }}>
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="mono-ish cursor-pointer"
              style={{
                background: 'transparent',
                border: '1px solid var(--line)',
                color: 'var(--fg)',
                padding: '14px 28px',
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: 600,
                transition: 'all .2s',
              }}
            >
              Afficher toutes les dates ({filtered.length - INITIAL_LIMIT} de plus) →
            </button>
          </div>
        )}

      </div>
    </section>
  )
}
