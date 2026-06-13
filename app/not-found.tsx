import Link from 'next/link'
import { Logo } from '@/components/Logo'

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0b0e1a',
        color: '#f0eee8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <div style={{ marginBottom: '2.5rem' }}>
        <Logo href="/" size="lg" />
      </div>
      <h1
        style={{
          fontFamily: 'var(--font-manrope), sans-serif',
          fontSize: '3rem',
          fontWeight: 700,
          letterSpacing: '-0.04em',
          marginBottom: '0.5rem',
        }}
      >
        404
      </h1>
      <Link
        href="/"
        style={{
          marginTop: '2rem',
          background: 'linear-gradient(135deg,#ff2d78,#c026d3)',
          color: 'white',
          textDecoration: 'none',
          padding: '0.9rem 2rem',
          borderRadius: '100px',
          fontWeight: 800,
        }}
      >
        Back home
      </Link>
    </div>
  )
}
