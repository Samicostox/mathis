import { useState } from 'react'
import { MC_GALLERY_COUNT } from '../data'
import Section from './Section'
import Reveal from './Reveal'
import PhotoPlaceholder from './PhotoPlaceholder'
import Icon from './Icon'

export default function Gallery() {
  const [open, setOpen] = useState(null)

  return (
    <Section id="gallery" eyebrow="06" title="Galerie." kicker="Scène, coulisses, tournées. Tout en noir et blanc.">
      <div className="gallery-grid grid gap-2" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {Array.from({ length: MC_GALLERY_COUNT }).map((_, i) => (
          <Reveal key={i} delay={i * 40}>
            <button type="button" onClick={() => setOpen(i)} className="w-full block cursor-pointer" style={{ background: 'transparent', border: 'none', padding: 0 }}>
              <PhotoPlaceholder label={`#${(i + 1).toString().padStart(2, '0')}`} seed={40 + i} ratio={i % 3 === 0 ? '4/5' : '1/1'} />
            </button>
          </Reveal>
        ))}
      </div>

      {open !== null && (
        <div
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center cursor-zoom-out"
          style={{ background: 'rgba(0,0,0,0.92)', padding: '5vw' }}
        >
          <div style={{ maxWidth: 1200, width: '100%', maxHeight: '90vh' }}>
            <PhotoPlaceholder label={`#${(open + 1).toString().padStart(2, '0')}`} seed={40 + open} ratio="3/2" />
          </div>
          <button
            onClick={() => setOpen(null)}
            className="absolute inline-flex items-center justify-center cursor-pointer"
            style={{ top: 24, right: 24, background: 'transparent', border: '1px solid var(--line)', color: 'var(--fg)', width: 48, height: 48 }}
          >
            <Icon name="close" size={20} />
          </button>
        </div>
      )}
    </Section>
  )
}
