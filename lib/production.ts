import { getAppUrl, getCanonicalSiteUrl } from './app-url'
import { isKvConfigured } from './kv'
import { PRICE_IDS } from './pricing'
import { getResendStatus } from './resend-config'

export type StripeMode = 'live' | 'test' | 'unconfigured'

export function getStripeMode(): StripeMode {
  const key = process.env.STRIPE_SECRET_KEY ?? ''
  if (key.startsWith('sk_live_')) return 'live'
  if (key.startsWith('sk_test_')) return 'test'
  return 'unconfigured'
}

export function getPublishableKeyMode(): StripeMode {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''
  if (key.startsWith('pk_live_')) return 'live'
  if (key.startsWith('pk_test_')) return 'test'
  return 'unconfigured'
}

export function getProductionReadiness() {
  const canonical = getCanonicalSiteUrl()
  const appUrl = getAppUrl()
  const stripeMode = getStripeMode()
  const publishableMode = getPublishableKeyMode()
  const resend = getResendStatus()
  const priceOne = PRICE_IDS.ONE_SONG

  const blockers: string[] = []
  const warnings: string[] = []

  if (!isKvConfigured()) blockers.push('Database not connected (REDIS_URL)')
  if (!process.env.STRIPE_SECRET_KEY) blockers.push('STRIPE_SECRET_KEY missing')
  if (!process.env.STRIPE_WEBHOOK_SECRET) blockers.push('STRIPE_WEBHOOK_SECRET missing')
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    blockers.push('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY missing')
  }
  if (priceOne.includes('REPLACE')) blockers.push('NEXT_PUBLIC_STRIPE_PRICE_ONE_SONG not set')
  if (!process.env.ANTHROPIC_API_KEY) blockers.push('ANTHROPIC_API_KEY missing')
  if (!process.env.MUREKA_API_KEY) blockers.push('MUREKA_API_KEY missing')
  if (!resend.configured) blockers.push('Resend not configured (RESEND_API_KEY + RESEND_FROM_EMAIL)')

  if (stripeMode === 'test') warnings.push('STRIPE_SECRET_KEY is test mode (sk_test_) — use sk_live_ for production')
  if (publishableMode === 'test') {
    warnings.push('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is test mode (pk_test_) — use pk_live_ for production')
  }
  if (stripeMode !== 'unconfigured' && publishableMode !== 'unconfigured' && stripeMode !== publishableMode) {
    blockers.push('Stripe secret and publishable keys must both be live or both be test')
  }
  if (resend.mode === 'test') {
    warnings.push('Resend is in test mode (@resend.dev) — verify mockingbird.ai and use songs@mockingbird.ai')
  }

  const siteUrl = process.env.SITE_URL?.replace(/\/$/, '')
  const publicUrl = process.env.NEXT_PUBLIC_URL?.replace(/\/$/, '')

  if (!siteUrl || siteUrl !== canonical) {
    warnings.push(`Set SITE_URL to ${canonical} in Vercel Production`)
  }
  if (!publicUrl || publicUrl !== canonical) {
    warnings.push(`Set NEXT_PUBLIC_URL to ${canonical} in Vercel Production`)
  }
  if (appUrl !== canonical) {
    warnings.push(`Runtime appUrl is ${appUrl} — expected ${canonical}`)
  }

  return {
    ready: blockers.length === 0 && stripeMode === 'live' && publishableMode === 'live',
    blockers,
    warnings,
    stripeMode,
    publishableKeyMode: publishableMode,
    resendMode: resend.mode,
    canonicalSiteUrl: canonical,
    appUrl,
    webhookUrl: `${canonical}/api/webhook`,
  }
}
