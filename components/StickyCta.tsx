'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function StickyCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('consumer-hero')
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.05, rootMargin: '-80px 0px 0px 0px' }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={`sticky-cta ${visible ? 'sticky-cta--visible' : ''}`} aria-hidden={!visible}>
      <div className="sticky-cta-inner">
        <div className="sticky-cta-copy">
          <span className="sticky-cta-price">$19</span>
          <span className="sticky-cta-label">Personalised song · ~15 min</span>
        </div>
        <Link href="/create" className="sticky-cta-btn">
          Create My Song →
        </Link>
      </div>
    </div>
  )
}
