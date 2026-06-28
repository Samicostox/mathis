import PhotoPlaceholder from './PhotoPlaceholder'

// Renders a real image when `src` is set, otherwise the procedural
// placeholder. Keeps the same aspect ratio in both cases.
export default function Img({ src, alt = '', label = 'PHOTO', seed = 1, ratio = '3/4', style = {}, position = 'center' }) {
  if (src) {
    return (
      <div className="photo relative overflow-hidden" style={{ aspectRatio: ratio, background: '#0F0F0F', ...style }}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: position, display: 'block' }}
        />
      </div>
    )
  }
  return <PhotoPlaceholder label={label} seed={seed} ratio={ratio} style={style} />
}
