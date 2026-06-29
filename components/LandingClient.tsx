'use client'

import { useEffect } from 'react'

export default function LandingClient() {
  useEffect(() => {
    function buildWaveform(id: string, gradient: string) {
      const el = document.getElementById(id)
      if (!el || el.childElementCount > 0) return
      const hts = [18, 30, 24, 40, 28, 46, 34, 50, 38, 45, 30, 48, 36, 42, 26, 40, 32, 46, 24, 38, 28, 34, 20]
      hts.forEach((h, i) => {
        const b = document.createElement('div')
        b.className = 'wbar'
        b.style.cssText = `height:${h}px;--s:${0.7 + Math.random() * 0.9}s;--dl:${i * 0.055}s;background:${gradient};`
        el.appendChild(b)
      })
    }
    buildWaveform('wf1', 'linear-gradient(180deg, #7E3BFF, #FF2BB1)')

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 70)
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.07 }
    )
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el))

    return () => obs.disconnect()
  }, [])

  return null
}
