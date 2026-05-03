import Icon from './Icon'

const variants = {
  solid:   { background: 'var(--accent)', color: '#0A0A0A', borderColor: 'var(--accent)' },
  outline: { background: 'transparent', color: 'var(--fg)', borderColor: 'var(--fg)' },
  ghost:   { background: 'transparent', color: 'var(--fg-dim)', borderColor: 'var(--fg-mute)' },
  dead:    { background: 'transparent', color: 'var(--fg-mute)', borderColor: 'var(--fg-mute)', textDecoration: 'line-through' },
}

export default function BigButton({ children, onClick, href, variant = 'solid', full = false, disabled = false, icon = 'arrow-right', target }) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: full ? 'space-between' : 'center',
    gap: 14,
    padding: '18px 28px',
    fontFamily: 'Space Grotesk, sans-serif',
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    border: '1px solid currentColor',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all .25s ease',
    width: full ? '100%' : 'auto',
    borderRadius: 0,
    background: 'transparent',
    opacity: disabled ? 0.6 : 1,
    ...variants[variant],
  }

  const content = (
    <>
      <span>{children}</span>
      {icon && <Icon name={icon} size={16} stroke={2} />}
    </>
  )

  if (href && !disabled) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        style={base}
        className="big-btn"
      >
        {content}
      </a>
    )
  }
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={base}
      className="big-btn"
    >
      {content}
    </button>
  )
}
