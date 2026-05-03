import { MC_VIDEOS } from '../data'
import Section from './Section'
import Reveal from './Reveal'
import Icon from './Icon'
import PhotoPlaceholder from './PhotoPlaceholder'

function VideoCard({ v, seed, featured }) {
  return (
    <div className="video-card relative cursor-pointer" style={{ transition: 'transform .3s ease' }}>
      <div className="relative">
        <PhotoPlaceholder label={v.tag.toUpperCase()} seed={seed} ratio={featured ? '16/9' : '4/3'} />
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0) 50%)' }}>
          <div
            className="inline-flex items-center justify-center play-btn"
            style={{ width: featured ? 88 : 64, height: featured ? 88 : 64, borderRadius: '50%', background: 'var(--accent)', color: '#000', transition: 'transform .3s' }}
          >
            <Icon name="play" size={featured ? 30 : 22} />
          </div>
        </div>
        <div className="mono-ish absolute" style={{ top: 14, left: 14, background: 'rgba(0,0,0,0.7)', color: 'var(--fg)', padding: '5px 10px', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{v.tag}</div>
        <div className="mono-ish absolute" style={{ bottom: 14, right: 14, background: 'rgba(0,0,0,0.7)', color: 'var(--fg)', padding: '5px 10px', fontSize: 11, letterSpacing: '0.08em', fontVariantNumeric: 'tabular-nums' }}>{v.duration}</div>
      </div>
      <div className="flex items-start justify-between gap-4" style={{ paddingTop: 18 }}>
        <h3 className="display" style={{ fontSize: featured ? 28 : 22, margin: 0, flex: 1 }}>{v.title}</h3>
        <span className="mono-ish whitespace-nowrap" style={{ fontSize: 11, color: 'var(--fg-dim)', letterSpacing: '0.1em' }}>{v.views} vues</span>
      </div>
    </div>
  )
}

export default function Videos() {
  const [featured, ...rest] = MC_VIDEOS
  return (
    <Section
      id="videos"
      eyebrow="04"
      title="Vidéos."
      kicker={<>Des extraits de scène, mon podcast <em style={{ color: 'var(--fg)', fontStyle: 'normal' }}>Entre Deux</em>, les coulisses.</>}
    >
      <div className="videos-grid grid" style={{ gridTemplateColumns: '1.4fr 1fr', gap: 'clamp(20px, 3vw, 40px)' }}>
        <Reveal><VideoCard v={featured} seed={11} featured /></Reveal>
        <div className="flex flex-col" style={{ gap: 'clamp(20px, 3vw, 36px)' }}>
          {rest.map((v, i) => (
            <Reveal key={v.title} delay={i * 80}>
              <div className="video-mini grid items-center" style={{ gridTemplateColumns: '160px 1fr', gap: 20 }}>
                <div className="relative">
                  <PhotoPlaceholder label={v.tag.toUpperCase()} seed={21 + i} ratio="16/9" />
                  <div className="absolute inline-flex items-center justify-center" style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 36, height: 36, borderRadius: '50%', background: 'var(--accent)', color: '#000' }}>
                    <Icon name="play" size={12} />
                  </div>
                </div>
                <div>
                  <div className="mono-ish" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--fg-dim)', textTransform: 'uppercase', marginBottom: 8 }}>{v.tag} · {v.duration}</div>
                  <h3 className="display" style={{ fontSize: 22, margin: 0 }}>{v.title}</h3>
                  <div className="mono-ish" style={{ fontSize: 11, color: 'var(--fg-dim)', letterSpacing: '0.1em', marginTop: 8 }}>{v.views} vues</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
