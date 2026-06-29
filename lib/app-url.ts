const DEFAULT_PRODUCTION_URL = 'https://mockingbird.ai'

export function getCanonicalSiteUrl(): string {
  return DEFAULT_PRODUCTION_URL
}

export function getAppUrl(): string {
  // SITE_URL is read at runtime on the server — not baked in at build time.
  if (process.env.SITE_URL) {
    return process.env.SITE_URL.replace(/\/$/, '')
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`.replace(/\/$/, '')
  }

  if (process.env.NEXT_PUBLIC_URL) {
    return process.env.NEXT_PUBLIC_URL.replace(/\/$/, '')
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`.replace(/\/$/, '')
  }

  return 'http://localhost:3000'
}

export function getAppUrlDebug() {
  const appUrl = getAppUrl()
  const canonical = getCanonicalSiteUrl()

  return {
    appUrl,
    canonicalSiteUrl: canonical,
    siteUrlMatchesCanonical: appUrl === canonical,
    siteUrl: process.env.SITE_URL ?? null,
    vercelProductionUrl: process.env.VERCEL_PROJECT_PRODUCTION_URL ?? null,
    vercelUrl: process.env.VERCEL_URL ?? null,
    nextPublicUrl: process.env.NEXT_PUBLIC_URL ?? null,
  }
}
