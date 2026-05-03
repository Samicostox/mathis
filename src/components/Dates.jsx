import { useState, useMemo } from 'react'
import { MC_UPCOMING, MC_PAST } from '../data'
import Reveal from './Reveal'
import BigButton from './BigButton'
import Icon from './Icon'
import Section from './Section'

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
    complet: { label: 'Complet',          color: '#FF4D4D',       bg: 'transparent',   border: '#FF4D4D' },
    last:    { label: 'Dernières places',  color: 'var(--accent)', bg: 'transparent',   border: 'var(--accent)' },
    new:     { label: 'Nouveau',           color: '#0A0A0A',       bg: 'var(--accent)', border: 'var(--accent)' },
  }
  const s = map[status]
  return (
    <span
      className="mono-ish inline-flex items-center"
      style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '6px 10px', color: s.color, background: s.bg, border: `1px solid ${s.border}`, fontWeight: 600 }}
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
      style={{ gridTemplateColumns: '130px 1fr auto', gap: 24, padding: 'clamp(22px, 2.4vw, 32px) 0', borderBottom: '1px solid var(--line)', opacity: past ? 0.5 : 1 }}
    >
      <div className="flex items-baseline gap-2">
        <span className="display" style={{ fontSize: 'clamp(38px, 4.5vw, 58px)', color: past ? 'var(--fg-dim)' : 'var(--fg)', lineHeight: 0.85 }}>{d.day}</span>
        <div className="flex flex-col" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-dim)' }}>
          <span>{d.mon}</span>
          <span>{d.year}</span>
        </div>
      </div>

      <div className="date-info" style={{ minWidth: 0 }}>
        <div className="display" style={{ fontSize: 'clamp(22px, 2.6vw, 34px)', color: past ? 'var(--fg-dim)' : 'var(--fg)', marginBottom: 6 }}>{item.city}</div>
        <div className="flex flex-wrap items-center gap-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 14, color: 'var(--fg-dim)' }}>
          <span>{item.venue}</span>
          <span style={{ color: 'var(--fg-mute)' }}>·</span>
          <span className="mono-ish" style={{ letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 11 }}>{d.weekday} 20:30</span>
          {!past && item.status && <StatusBadge status={item.status} />}
        </div>
      </div>

      <div>
        {past ? (
          <span className="mono-ish" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-mute)' }}>Archive</span>
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
        padding: '12px 20px', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase',
        fontWeight: 600, transition: 'all .2s',
      }}
    >
      <span>{label}</span>
      <span style={{ opacity: 0.5, fontSize: 11 }}>{n}</span>
    </button>
  )

  return (
    <Section
      id="dates"
      eyebrow="01 — Tournée 2026"
      title="Dates"
      kicker="Toutes les dates en cours. La billetterie est gérée par chaque salle — clic = tu pars sur leur plateforme."
      action={
        <div className="flex flex-wrap gap-2">
          <Toggle value="all"   label="Toutes"  n={MC_UPCOMING.length} />
          <Toggle value="paris" label="Paris"   n={parisCount} />
          <Toggle value="tour"  label="Tournée" n={tourCount} />
        </div>
      }
    >
      <Reveal>
        <div style={{ borderTop: '1px solid var(--line)' }}>
          {filtered.map((item, i) => <DateRow key={item.date + item.city + i} item={item} />)}
        </div>
      </Reveal>

      <div style={{ marginTop: 40 }}>
        <button
          type="button"
          onClick={() => setShowPast((v) => !v)}
          className="mono-ish w-full flex justify-between items-center cursor-pointer"
          style={{
            background: 'transparent', color: 'var(--fg-dim)', border: 'none',
            borderBottom: '1px solid var(--line)', padding: '14px 0', textAlign: 'left',
            fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase',
          }}
        >
          <span>Dates passées ({MC_PAST.length})</span>
          <Icon name={showPast ? 'minus' : 'plus'} size={16} />
        </button>
        {showPast && (
          <div style={{ marginTop: 10 }}>
            {MC_PAST.map((item, i) => <DateRow key={i} item={item} past />)}
          </div>
        )}
      </div>
    </Section>
  )
}
