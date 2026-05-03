import { useMemo } from 'react'

export default function PhotoPlaceholder({ label = 'PHOTO', seed = 1, ratio = '3/4', style = {} }) {
  const dots = useMemo(() => {
    const a = []
    let s = seed * 9301 + 49297
    for (let i = 0; i < 70; i++) {
      s = (s * 9301 + 49297) % 233280; const x = (s / 233280) * 100
      s = (s * 9301 + 49297) % 233280; const y = (s / 233280) * 100
      s = (s * 9301 + 49297) % 233280; const r = (s / 233280) * 2 + 0.3
      a.push({ x, y, r })
    }
    return a
  }, [seed])

  const bands = useMemo(() => {
    let s = seed * 131 + 7
    const a = []
    for (let i = 0; i < 4; i++) { s = (s * 9301 + 49297) % 233280; a.push((s / 233280) * 100) }
    return a
  }, [seed])

  return (
    <div
      className="photo relative overflow-hidden"
      style={{ aspectRatio: ratio, background: '#0F0F0F', ...style }}
    >
      <div className="absolute inset-0" style={{
        background: `radial-gradient(ellipse at ${30 + bands[0] * 0.4}% ${20 + bands[1] * 0.4}%, #2a2a2a 0%, #111 40%, #050505 100%)`
      }} />
      <div className="absolute" style={{
        left: `${15 + bands[2] * 0.2}%`, top: `${30 + bands[3] * 0.15}%`,
        width: '35%', height: '55%',
        background: 'linear-gradient(180deg, rgba(0,0,0,0.85), rgba(0,0,0,0.98))',
        filter: 'blur(1px)',
      }} />
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.4, mixBlendMode: 'screen' }} viewBox="0 0 100 100" preserveAspectRatio="none">
        {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={d.r * 0.15} fill="#fff" />)}
      </svg>
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.25, mixBlendMode: 'overlay' }}>
        <filter id={`grain-${seed}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={seed} />
          <feColorMatrix values="0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 1 0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${seed})`} />
      </svg>
      <div className="absolute" style={{
        bottom: 12, left: 12,
        fontFamily: 'Space Grotesk, sans-serif', fontSize: 10, letterSpacing: '0.2em',
        color: 'rgba(245,245,245,0.4)', textTransform: 'uppercase',
      }}>{label}</div>
    </div>
  )
}
