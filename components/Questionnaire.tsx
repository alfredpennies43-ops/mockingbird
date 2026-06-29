'use client'

import { Logo } from './Logo'
import { FormEvent, useState } from 'react'
import { PRICE_IDS } from '@/lib/pricing'
import { QuestionnaireData } from '@/lib/types'
import styles from './Questionnaire.module.css'

const OCCASIONS = [
  'Birthday',
  'Wedding',
  'Proposal',
  'Anniversary',
  'New Baby',
  'Graduation',
  'Retirement',
  'Just Because',
  'Farewell',
  'Other',
]

const TOTAL_STEPS = 4

export default function Questionnaire() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<Partial<QuestionnaireData>>({
    occasion: 'Birthday',
    occasionDetails: '',
    recipientName: '',
    memories: '',
    artistStyle: '',
    customerEmail: '',
    versions: 1,
    priceId: PRICE_IDS.ONE_SONG,
  })

  const update = (fields: Partial<QuestionnaireData>) => {
    setFormData((prev) => ({ ...prev, ...fields }))
    setError('')
  }

  const validateStep = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!formData.occasion
      case 2:
        if (!formData.recipientName?.trim()) {
          setError('Please enter their name.')
          return false
        }
        if ((formData.memories?.length ?? 0) < 20) {
          setError('Please share at least 20 characters about what makes them special.')
          return false
        }
        return true
      case 3:
        if (!formData.artistStyle?.trim()) {
          setError('Please name an artist or style.')
          return false
        }
        return true
      case 4:
        if (!formData.customerEmail?.includes('@')) {
          setError('Please enter a valid email.')
          return false
        }
        return true
      default:
        return true
    }
  }

  const next = () => {
    if (!validateStep()) return
    setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS))
  }

  const back = () => setCurrentStep((s) => Math.max(s - 1, 1))

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault()

    if (currentStep < TOTAL_STEPS) {
      next()
      return
    }

    if (!validateStep()) return

    setIsLoading(true)
    setError('')
    try {
      const questionnaireData: QuestionnaireData = {
        ...(formData as QuestionnaireData),
        versions: 1,
        priceId: PRICE_IDS.ONE_SONG,
      }

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: PRICE_IDS.ONE_SONG,
          questionnaireData,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        setError(data.error ?? 'Checkout failed. Please try again.')
        setIsLoading(false)
        return
      }
      window.location.href = data.url
    } catch {
      setError('Network error. Please check your connection and try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.shell}>
      <div className={styles.bloom} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.logoWrap}>
          <Logo href="/" size="sm" />
        </div>

        <div className={styles.progress}>
          {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((step) => (
            <div
              key={step}
              className={`${styles.progressStep} ${
                step <= currentStep ? styles.progressStepActive : styles.progressStepInactive
              }`}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <div>
              <h1 className={styles.title}>The occasion</h1>
              <label className={styles.label}>Occasion</label>
              <select
                className={`${styles.select} ${styles.inputMb}`}
                value={formData.occasion}
                onChange={(e) => update({ occasion: e.target.value })}
              >
                {OCCASIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              <label className={styles.label}>Tell us a bit more (optional)</label>
              <input
                type="text"
                className={styles.input}
                placeholder="e.g. Her surprise 30th at the beach house"
                value={formData.occasionDetails}
                onChange={(e) => update({ occasionDetails: e.target.value })}
              />
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h1 className={styles.title}>About them</h1>
              <label className={styles.label}>Their name</label>
              <input
                type="text"
                required
                className={`${styles.input} ${styles.inputMb}`}
                placeholder="Mia"
                value={formData.recipientName}
                onChange={(e) => update({ recipientName: e.target.value })}
              />
              <label className={styles.label}>What makes them special?</label>
              <p className={styles.hint}>
                The more detail you share — memories, stories, inside jokes — the richer the lyrics
                will be. We can only work with what you give us.
              </p>
              <textarea
                required
                rows={5}
                className={styles.textarea}
                placeholder="Share a memory, an inside joke, something only you'd know..."
                value={formData.memories}
                onChange={(e) => update({ memories: e.target.value })}
              />
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h1 className={styles.title}>The sound</h1>
              <label className={styles.label}>Artist or vibe</label>
              <input
                type="text"
                required
                className={styles.input}
                placeholder="e.g. Taylor Swift, Frank Ocean, Fleetwood Mac"
                value={formData.artistStyle}
                onChange={(e) => update({ artistStyle: e.target.value })}
              />
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h1 className={styles.title}>Almost there</h1>
              <label className={styles.label}>Your email</label>
              <input
                type="email"
                required
                className={`${styles.input} ${styles.inputMb}`}
                placeholder="you@example.com"
                autoComplete="email"
                inputMode="email"
                value={formData.customerEmail}
                onChange={(e) => update({ customerEmail: e.target.value })}
              />
              <div className={styles.priceSummary}>
                <div className={styles.priceAmount}>$19</div>
                <div className={styles.priceDetail}>
                  One personalised song · MP3 · delivered in ~15 minutes
                </div>
              </div>
            </div>
          )}

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.actions}>
            {currentStep > 1 && (
              <button type="button" onClick={back} className={styles.btnBack}>
                Back
              </button>
            )}
            {currentStep < TOTAL_STEPS ? (
              <button type="button" onClick={next} className={styles.btnPrimary}>
                Next →
              </button>
            ) : (
              <button type="submit" disabled={isLoading} className={styles.btnPrimary}>
                {isLoading ? 'Redirecting to checkout...' : 'Create My Song — $19 →'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
