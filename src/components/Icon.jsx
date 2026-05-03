export default function Icon({ name, size = 20, stroke = 1.5, style = {} }) {
  const props = {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: stroke,
    strokeLinecap: 'round', strokeLinejoin: 'round', style,
  }
  switch (name) {
    case 'instagram': return (
      <svg {...props}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    )
    case 'tiktok': return (
      <svg {...props}>
        <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
        <path d="M14 3c.3 2.7 2.3 4.7 5 5" />
      </svg>
    )
    case 'youtube': return (
      <svg {...props}>
        <rect x="2.5" y="5.5" width="19" height="13" rx="3" />
        <path d="M10.5 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" />
      </svg>
    )
    case 'x': return (
      <svg {...props}><path d="M4 4l16 16M20 4L4 20" /></svg>
    )
    case 'arrow-right': return (
      <svg {...props}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
    )
    case 'arrow-up-right': return (
      <svg {...props}><path d="M7 17L17 7M9 7h8v8" /></svg>
    )
    case 'play': return (
      <svg {...props}><path d="M6 4v16l14-8z" fill="currentColor" stroke="currentColor" strokeLinejoin="round" /></svg>
    )
    case 'copy': return (
      <svg {...props}>
        <rect x="8" y="8" width="12" height="12" rx="2" />
        <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
      </svg>
    )
    case 'check': return (
      <svg {...props}><path d="M5 12l5 5L20 7" /></svg>
    )
    case 'plus': return (
      <svg {...props}><path d="M12 5v14M5 12h14" /></svg>
    )
    case 'minus': return (
      <svg {...props}><path d="M5 12h14" /></svg>
    )
    case 'close': return (
      <svg {...props}><path d="M6 6l12 12M18 6L6 18" /></svg>
    )
    case 'mail': return (
      <svg {...props}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 7 9-7" />
      </svg>
    )
    case 'menu': return (
      <svg {...props}><path d="M4 7h16M4 17h16" /></svg>
    )
    default: return null
  }
}
