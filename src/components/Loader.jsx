import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useConfig } from '../config/ConfigContext'

const SESSION_KEY = 'mc_intro_seen'
const PANELS = 12

const EASE_OUT = [0.16, 1, 0.3, 1]
const EASE_WIPE = [0.76, 0, 0.24, 1]

// Sine-staggered delay so the columns rise in undulating waves
// rather than a flat sweep — like paint peeling upward.
function waveDelay(i) {
  const phase = (i / PANELS) * Math.PI * 3 // ~1.5 wave cycles across the screen
  return 0.1 + (Math.sin(phase) * 0.5 + 0.5) * 0.25
}

export default function Loader() {
  const { hero } = useConfig()
  const [visible, setVisible] = useState(() => !sessionStorage.getItem(SESSION_KEY))

  // Animated 000 → 100 counter
  const count = useMotionValue(0)
  const display = useTransform(count, (v) => String(Math.round(v)).padStart(3, '0'))
  const barWidth = useTransform(count, [0, 100], ['0%', '100%'])

  useEffect(() => {
    if (!visible) return
    const controls = animate(count, 100, { duration: 1.0, ease: EASE_OUT })
    const t = setTimeout(() => setVisible(false), 1200)
    return () => { controls.stop(); clearTimeout(t) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const cleanup = () => {
    sessionStorage.setItem(SESSION_KEY, '1')
  }

  const words = [
    { text: hero.firstName, accent: false },
    { text: hero.lastName, accent: true },
  ]

  return (
    <AnimatePresence onExitComplete={cleanup}>
      {visible && (
        <motion.div
          key="loader"
          style={{ position: 'fixed', inset: 0, zIndex: 1000, overflow: 'hidden' }}
        >
          {/* Background wipe panels — rise in waves with rounded paint-like edges */}
          <div style={{ position: 'absolute', inset: 0 }}>
            {Array.from({ length: PANELS }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: 0, borderBottomLeftRadius: '0%', borderBottomRightRadius: '0%' }}
                exit={{ y: '-102%', borderBottomLeftRadius: '100%', borderBottomRightRadius: '100%' }}
                transition={{ duration: 0.7, ease: EASE_WIPE, delay: waveDelay(i) }}
                style={{
                  position: 'absolute',
                  top: 0,
                  height: '100%',
                  // 1px overlap hides seams between columns during the wipe
                  left: `${(i * 100) / PANELS}%`,
                  width: `calc(${100 / PANELS}% + 1px)`,
                  background: '#0A0A0A',
                }}
              />
            ))}
          </div>

          {/* Content layer — fades up and out before the panels wipe */}
          <motion.div
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4, ease: 'easeIn' }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'flex-end',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: 'var(--container)',
                margin: '0 auto',
                padding: '0 var(--pad-x) clamp(40px, 8vw, 90px)',
                position: 'relative',
              }}
            >
              {/* Name + counter side by side */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  gap: 'clamp(16px, 3vw, 40px)',
                  marginBottom: 'clamp(24px, 4vw, 44px)',
                }}
              >
                {/* Name — masked, staggered rise */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  {words.map((w, i) => (
                    <div key={i} style={{ overflow: 'hidden', paddingBottom: '0.12em', marginBottom: '-0.12em' }}>
                      <motion.span
                        className="display"
                        initial={{ y: '110%' }}
                        animate={{ y: '0%' }}
                        transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.05 + i * 0.1 }}
                        style={{
                          display: 'block',
                          fontSize: 'clamp(36px, 8vw, 110px)',
                          lineHeight: 0.95,
                          color: w.accent ? 'var(--accent)' : 'var(--fg)',
                        }}
                      >
                        {w.text}
                      </motion.span>
                    </div>
                  ))}
                </div>

                {/* Counter — right of the name, bottom-aligned */}
                <motion.div
                  className="mono-ish"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                  style={{
                    fontSize: 'clamp(32px, 5.5vw, 72px)',
                    color: 'var(--accent)',
                    fontVariantNumeric: 'tabular-nums',
                    lineHeight: 1,
                    flexShrink: 0,
                    paddingBottom: '0.05em',
                  }}
                >
                  <motion.span>{display}</motion.span>
                </motion.div>
              </div>

              {/* Progress bar */}
              <motion.div
                initial={{ scaleX: 1, opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                style={{ height: 2, width: '100%', background: 'rgba(245,245,245,0.12)', transformOrigin: 'left' }}
              >
                <motion.div style={{ height: '100%', background: 'var(--accent)', width: barWidth }} />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
