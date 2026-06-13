'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Questionnaire from '@/components/Questionnaire'

export default function CreatePage() {
  return (
    <Suspense fallback={<div style={{ background: '#0b0e1a', minHeight: '100vh' }} />}>
      <CreateContent />
    </Suspense>
  )
}

function CreateContent() {
  const params = useSearchParams()
  const success = params.get('success')

  if (success) {
    return (
      <div
        style={{
          minHeight: '100dvh',
          background: '#0b0e1a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'max(2rem, env(safe-area-inset-top)) max(1.2rem, env(safe-area-inset-right)) max(2rem, env(safe-area-inset-bottom)) max(1.2rem, env(safe-area-inset-left))',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🎵</div>
        <h1
          style={{
            fontFamily: 'var(--font-manrope), sans-serif',
            fontSize: 'clamp(1.8rem,5vw,3rem)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            color: '#f0eee8',
            marginBottom: '1rem',
            lineHeight: 1.1,
          }}
        >
          Your song is
          <br />
          being created.
        </h1>
        <p
          style={{
            color: 'rgba(240,238,232,0.6)',
            fontSize: '1rem',
            marginBottom: '2.5rem',
          }}
        >
          Check your inbox in about 15 minutes.
        </p>
        <a
          href="/create"
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg,#ff2d78,#c026d3)',
            color: 'white',
            textDecoration: 'none',
            padding: '0.9rem 2rem',
            minHeight: '48px',
            lineHeight: '1.4',
            borderRadius: '100px',
            fontWeight: 800,
            fontSize: '1rem',
          }}
        >
          Create Another Song
        </a>
      </div>
    )
  }

  return <Questionnaire />
}
