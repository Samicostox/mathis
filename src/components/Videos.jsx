import { useState, useRef } from 'react'
import { useConfig } from '../config/ConfigContext'
import Section from './Section'
import Reveal from './Reveal'
import Icon from './Icon'
import Img from './Img'

// Aspect ratios per format
const FORMAT_RATIO = {
  youtube:   '16/9',
  short:     '9/16',
  instagram: '1/1',
}

// Convert a platform share URL into an embeddable iframe src
function getEmbedUrl(url) {
  if (!url) return null
  // YouTube: youtube.com/watch?v=ID  or  youtu.be/ID  or  youtube.com/shorts/ID
  let m = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([\w-]+)/)
  if (m) return `https://www.youtube.com/embed/${m[1]}?autoplay=1&rel=0`
  // Instagram post or reel
  m = url.match(/instagram\.com\/(?:p|reel)\/([\w-]+)/)
  if (m) return `https://www.instagram.com/p/${m[1]}/embed/`
  // TikTok
  m = url.match(/tiktok\.com\/@[\w.]+\/video\/(\d+)/)
  if (m) return `https://www.tiktok.com/embed/v2/${m[1]}`
  return null
}

function VideoCard({ v, seed }) {
  const [open, setOpen] = useState(false)
  const videoRef = useRef(null)

  const embedUrl = getEmbedUrl(v.url)
  // For direct video files (no recognised platform), use hover preview
  const isDirectVideo = v.url && !embedUrl

  const handleMouseEnter = () => {
    if (isDirectVideo && videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }
  const handleMouseLeave = () => {
    if (isDirectVideo && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  const ratio = FORMAT_RATIO[v.format] || '16/9'

  return (
    <div
      className="video-card relative cursor-pointer"
      style={{ transition: 'transform .3s ease' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => embedUrl && setOpen(true)}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: ratio }}>
        {/* Poster (or placeholder) */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <Img src={v.poster} label={v.tag.toUpperCase()} seed={seed} ratio={ratio} alt={v.title} />
        </div>

        {/* Hover preview for direct video files */}
        {isDirectVideo && (
          <video
            ref={videoRef}
            src={v.url}
            muted
            loop
            playsInline
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 50%)' }}
        >
          <div
            className="inline-flex items-center justify-center play-btn"
            style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--accent)', color: '#000', transition: 'transform .3s' }}
          >
            <Icon name="play" size={22} />
          </div>
        </div>

        {/* Tag badge */}
        <div className="mono-ish absolute"
          style={{ top: 14, left: 14, background: 'rgba(0,0,0,0.7)', color: 'var(--fg)', padding: '5px 10px', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' }}
        >
          {v.tag}
        </div>

        {/* Duration */}
        {v.duration && (
          <div className="mono-ish absolute"
            style={{ bottom: 14, right: 14, background: 'rgba(0,0,0,0.7)', color: 'var(--fg)', padding: '5px 10px', fontSize: 11, letterSpacing: '0.08em', fontVariantNumeric: 'tabular-nums' }}
          >
            {v.duration}
          </div>
        )}
      </div>

      {/* Lightbox embed — opens on click for platform videos */}
      {open && embedUrl && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={(e) => { e.stopPropagation(); setOpen(false) }}
        >
          <div
            style={{ position: 'relative', width: '90vw', maxWidth: 960, aspectRatio: ratio }}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={embedUrl}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
            />
            <button
              onClick={() => setOpen(false)}
              style={{ position: 'absolute', top: -40, right: 0, background: 'none', border: 'none', color: '#fff', fontSize: 28, cursor: 'pointer', lineHeight: 1 }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Videos() {
  const { videos } = useConfig()
  return (
    <Section
      id="videos"
      eyebrow="04"
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
          {videos.map((v, i) => {
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
