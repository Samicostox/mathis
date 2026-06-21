import { useState, useRef } from 'react'
import { MC_VIDEOS } from '../data'
import Section from './Section'
import Reveal from './Reveal'
import Icon from './Icon'
import PhotoPlaceholder from './PhotoPlaceholder'

// Aspect ratios per format
const FORMAT_RATIO = {
  youtube:   '16/9',
  short:     '9/16',
  instagram: '1/1',
}

function VideoCard({ v, seed }) {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)

  const handleMouseEnter = () => {
    if (v.url && videoRef.current) {
      videoRef.current.play().catch(() => {})
      setPlaying(true)
    }
  }

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
    setPlaying(false)
  }

  const ratio = FORMAT_RATIO[v.format] || '16/9'

  return (
    <div
      className="video-card relative cursor-pointer"
      style={{ transition: 'transform .3s ease' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: ratio }}>
        {/* Placeholder visible when not playing */}
        <div style={{ position: 'absolute', inset: 0, opacity: playing ? 0 : 1, transition: 'opacity .3s' }}>
          <PhotoPlaceholder label={v.tag.toUpperCase()} seed={seed} ratio={ratio} />
        </div>

        {/* Actual video for hover preview */}
        {v.url && (
          <video
            ref={videoRef}
            src={v.url}
            muted
            loop
            playsInline
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: playing ? 1 : 0,
              transition: 'opacity .3s',
            }}
          />
        )}

        {/* Overlays */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 50%)',
            opacity: playing ? 0 : 1,
            transition: 'opacity .3s',
          }}
        >
          <div
            className="inline-flex items-center justify-center play-btn"
            style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--accent)', color: '#000', transition: 'transform .3s' }}
          >
            <Icon name="play" size={22} />
          </div>
        </div>

        {/* Tag badge — top left */}
        <div
          className="mono-ish absolute"
          style={{ top: 14, left: 14, background: 'rgba(0,0,0,0.7)', color: 'var(--fg)', padding: '5px 10px', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' }}
        >
          {v.tag}
        </div>

        {/* Duration — bottom right */}
        <div
          className="mono-ish absolute"
          style={{ bottom: 14, right: 14, background: 'rgba(0,0,0,0.7)', color: 'var(--fg)', padding: '5px 10px', fontSize: 11, letterSpacing: '0.08em', fontVariantNumeric: 'tabular-nums' }}
        >
          {v.duration}
        </div>
      </div>
    </div>
  )
}

export default function Videos() {
  return (
    <Section
      id="videos"
      eyebrow="03"
      title="Vidéos"
      kicker="Quelques trucs marrants."
    >
      <Reveal>
        {/*
          Bento grid:
          - YouTube (16:9) → col-span 2
          - Short (9:16)   → 1 col, 2 rows
          - Instagram (1:1) → 1 col
          Layout (3 columns): [YT wide][Short tall] / [YT wide][Short tall] / [Insta][Insta][...]
        */}
        <div
          className="videos-bento"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(10px, 1.5vw, 20px)',
            alignItems: 'start',
          }}
        >
          {MC_VIDEOS.map((v, i) => {
            const spanStyle =
              v.format === 'youtube'
                ? { gridColumn: 'span 2' }
                : v.format === 'short'
                ? { gridRow: 'span 2' }
                : {}
            return (
              <Reveal key={v.title} delay={i * 60} style={spanStyle}>
                <VideoCard v={v} seed={11 + i} />
              </Reveal>
            )
          })}
        </div>
      </Reveal>
    </Section>
  )
}
