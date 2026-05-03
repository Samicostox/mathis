import { useState, useMemo } from 'react'
import { MC_UPCOMING, MC_PAST } from '../data'
import Reveal from './Reveal'
import BigButton from './BigButton'
import Icon from './Icon'

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

function DateRow({ item, past = false }) {
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
        opacity: past ? 0.45 : 1,
      }}
    >
      {/* Date */}
      <div className="flex items-baseline gap-2">
        <span className="display" style={{ fontSize: 'clamp(32px, 4vw, 52px)', color: past ? 'var(--fg-dim)' : 'var(--fg)', lineHeight: 1 }}>
          {d.day}
        </span>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-dim)', lineHeight: 1.4 }}>
          <div>{d.mon}</div>
          <div>{d.year}</div>
        </div>
      </div>

      {/* City + venue */}
      <div className="date-info" style={{ minWidth: 0 }}>
        <div className="display" style={{ fontSize: 'clamp(20px, 2.4vw, 30px)', color: past ? 'var(--fg-dim)' : 'var(--fg)', marginBottom: 4 }}>
          {item.city}
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 13, color: 'var(--fg-dim)' }}>
          <span>{item.venue}</span>
          <span style={{ color: 'var(--fg-mute)' }}>·</span>
          <span className="mono-ish" style={{ letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 11 }}>{d.weekday} 20h30</span>
          {!past && item.status && <StatusBadge status={item.status} />}
        </div>
      </div>

      {/* CTA */}
      <div className="flex items-center">
        {past ? (
          <span className="mono-ish" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-mute)' }}>Archive</span>
        ) : soldOut ? (
          <BigButton variant="dead" disabled icon={null}>Complet</BigButton>
        ) : (
          <BigButton href={item.url} target="_blank" variant={item.status === 'last' ? 'solid' : 'outline'} icon="arrow-up-right">
            Billetterie
          </BigButton>
        )}
      </div>
    </div>
  )
}

export default function Dates() {
  const [filter, setFilter] = useState('all')
  const [showPast, setShowPast] = useState(false)

  const filtered = useMemo(() => {
    if (filter === 'paris') return MC_UPCOMING.filter((d) => d.city === 'Paris')
    if (filter === 'tour')  return MC_UPCOMING.filter((d) => d.city !== 'Paris')
    return MC_UPCOMING
  }, [filter])

  const parisCount = MC_UPCOMING.filter((d) => d.city === 'Paris').length
  const tourCount  = MC_UPCOMING.length - parisCount

  const Toggle = ({ value, label, n }) => (
    <button
      type="button"
      onClick={() => setFilter(value)}
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
              <p style={{ maxWidth: 520, marginTop: 20, color: 'var(--fg-dim)', fontSize: 16, lineHeight: 1.5 }}>
                Toutes les dates en cours. La billetterie est gérée par chaque salle.
              </p>
            </div>
            {/* Toggles sit beside the title block */}
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
            {filtered.map((item, i) => (
              <DateRow key={item.date + item.city + i} item={item} />
            ))}
          </div>
        </Reveal>

        {/* Past dates */}
        <div style={{ marginTop: 32 }}>
          <button
            type="button"
            onClick={() => setShowPast((v) => !v)}
            className="mono-ish w-full flex justify-between items-center cursor-pointer"
            style={{
              background: 'transparent', color: 'var(--fg-dim)', border: 'none',
              borderBottom: '1px solid var(--line)', padding: '13px 0',
              fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
            }}
          >
            <span>Dates passées ({MC_PAST.length})</span>
            <Icon name={showPast ? 'minus' : 'plus'} size={15} />
          </button>
          <div style={{
            display: 'grid',
            gridTemplateRows: showPast ? '1fr' : '0fr',
            transition: 'grid-template-rows .35s ease',
            overflow: 'hidden',
          }}>
            <div style={{ overflow: 'hidden' }}>
              {MC_PAST.map((item, i) => <DateRow key={i} item={item} past />)}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
