'use client'

import { useEffect } from 'react'

export default function LandingClient() {
  useEffect(() => {
    const starsEl = document.getElementById('stars')
    if (starsEl && starsEl.childElementCount === 0) {
      for (let i = 0; i < 140; i++) {
        const s = document.createElement('div')
        s.className = 'star'
        const size = Math.random() > 0.85 ? 2 : 1
        s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;width:${size}px;height:${size}px;--d:${2 + Math.random() * 4}s;--dl:${Math.random() * 5}s;opacity:${0.1 + Math.random() * 0.4}`
        starsEl.appendChild(s)
      }
    }

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
    buildWaveform('wf1', 'linear-gradient(180deg, #ff2d78, #ff2d78)')

    const chips = document.querySelectorAll('.price-chip')
    const cta = document.getElementById('cardCta')
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        chips.forEach((c) => c.classList.remove('active'))
        chip.classList.add('active')
        const price = (chip as HTMLElement).dataset.price
        if (cta && price) {
          cta.textContent = `Create My Song for $${price} →`
          cta.setAttribute('href', `/create?package=${price === '29' ? '3' : '1'}`)
        }
      })
    })

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
