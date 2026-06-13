import Link from 'next/link'
import styles from './Logo.module.css'

export type LogoSize = 'sm' | 'md' | 'lg'

type LogoProps = {
  size?: LogoSize
  href?: string
  className?: string
}

const sizeClass: Record<LogoSize, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
}

function LogoMark({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span className={styles.iconGlow} aria-hidden="true" />
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="mb-grad" x1="8" y1="34" x2="34" y2="6" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ff2d78" />
            <stop offset="1" stopColor="#c026d3" />
          </linearGradient>
          <linearGradient id="mb-grad-soft" x1="0" y1="20" x2="40" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ff2d78" stopOpacity="0.15" />
            <stop offset="1" stopColor="#c026d3" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="38" height="38" rx="12" fill="url(#mb-grad-soft)" />
        <rect
          x="1"
          y="1"
          width="38"
          height="38"
          rx="12"
          stroke="url(#mb-grad)"
          strokeWidth="1.2"
          strokeOpacity="0.45"
        />
        {/* Sound waves — animated via CSS */}
        <g className={styles.waves}>
          <path
            d="M26 14C28.5 16 28.5 20 26 22"
            stroke="#ff79a8"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.5"
          />
          <path
            d="M28.5 11.5C32 15 32 21 28.5 24.5"
            stroke="#ff2d78"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.75"
          />
          <path
            d="M31 9C35.5 13.5 35.5 22.5 31 27"
            stroke="#e879f9"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>
        {/* Bird body */}
        <ellipse cx="16" cy="22" rx="7" ry="5.5" fill="url(#mb-grad)" />
        {/* Head */}
        <circle cx="20.5" cy="16.5" r="4.2" fill="url(#mb-grad)" />
        {/* Beak open — singing */}
        <path d="M23.5 16.5L26.5 15.2V17.8L23.5 16.5Z" fill="#e879f9" />
        {/* Eye */}
        <circle cx="21.5" cy="15.8" r="0.9" fill="#0b0e1a" />
        <circle cx="21.8" cy="15.5" r="0.35" fill="#f0eee8" />
        {/* Wing */}
        <path
          d="M13 21C11 19 11.5 16 14 15.5C15.5 17 15 19.5 13 21Z"
          fill="#ff79a8"
          opacity="0.9"
        />
        {/* Perch */}
        <path
          d="M6 27.5H24"
          stroke="url(#mb-grad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    </span>
  )
}

function LogoContent() {
  return (
    <>
      <LogoMark className={styles.mark} />
      <span className={styles.wordmark}>
        Mockingbird<span className={styles.tld}>.ai</span>
      </span>
    </>
  )
}

export function Logo({ size = 'md', href, className }: LogoProps) {
  const classes = [styles.logo, sizeClass[size], className].filter(Boolean).join(' ')

  if (href) {
    return (
      <Link href={href} className={classes} aria-label="Mockingbird.ai home">
        <LogoContent />
      </Link>
    )
  }

  return (
    <span className={classes} aria-label="Mockingbird.ai">
      <LogoContent />
    </span>
  )
}

const EMAIL_SVG = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40' fill='none'><defs><linearGradient id='g' x1='8' y1='34' x2='34' y2='6'><stop stop-color='%23ff2d78'/><stop offset='1' stop-color='%23c026d3'/></linearGradient></defs><rect x='1' y='1' width='38' height='38' rx='12' fill='%23ff2d78' fill-opacity='0.12'/><rect x='1' y='1' width='38' height='38' rx='12' stroke='url(%23g)' stroke-width='1.2' stroke-opacity='0.45'/><path d='M28.5 11.5C32 15 32 21 28.5 24.5' stroke='%23ff2d78' stroke-width='1.5' stroke-linecap='round' fill='none'/><ellipse cx='16' cy='22' rx='7' ry='5.5' fill='url(%23g)'/><circle cx='20.5' cy='16.5' r='4.2' fill='url(%23g)'/><path d='M23.5 16.5L26.5 15.2V17.8L23.5 16.5Z' fill='%23e879f9'/></svg>`

export function getLogoEmailHtml(size: LogoSize = 'md'): string {
  const iconSize = size === 'sm' ? '32' : size === 'lg' ? '40' : '36'

  return `
<table cellpadding="0" cellspacing="0" border="0" role="presentation">
  <tr>
    <td style="vertical-align:middle;padding-right:12px;">
      <img src="data:image/svg+xml,${encodeURIComponent(EMAIL_SVG)}"
           width="${iconSize}" height="${iconSize}" alt="" style="display:block;" />
    </td>
    <td style="vertical-align:middle;font-family:'Manrope',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:${size === 'sm' ? '18' : size === 'lg' ? '24' : '20'}px;font-weight:700;letter-spacing:-0.03em;line-height:1;">
      <span style="color:#f0eee8;">Mockingbird</span><span style="color:#ff2d78;">.ai</span>
    </td>
  </tr>
</table>`.trim()
}
