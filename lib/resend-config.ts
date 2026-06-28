export type ResendMode = 'test' | 'production' | 'unconfigured'

export function getResendMode(): ResendMode {
  if (!process.env.RESEND_API_KEY) return 'unconfigured'

  const from = process.env.RESEND_FROM_EMAIL ?? ''
  if (from.includes('@resend.dev')) return 'test'
  if (from.includes('@mockingbird.ai') || from.includes('.')) return 'production'

  return 'unconfigured'
}

export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL)
}

export function getResendFromEmail(): string | null {
  return process.env.RESEND_FROM_EMAIL ?? null
}

export function getResendStatus() {
  const mode = getResendMode()
  const from = getResendFromEmail()

  return {
    configured: isResendConfigured(),
    apiKeySet: Boolean(process.env.RESEND_API_KEY),
    fromEmail: from,
    mode,
    testModeNote:
      mode === 'test'
        ? 'Using @resend.dev — emails only deliver to your Resend account email.'
        : null,
    productionNote:
      mode === 'production' && from?.includes('mockingbird.ai')
        ? 'Using mockingbird.ai — domain must be Verified in Resend.'
        : null,
  }
}
