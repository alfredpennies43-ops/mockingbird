export function getAppUrl(): string {
  // Runtime Vercel vars — not baked in at build time, so they stay correct per deploy.
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`.replace(/\/$/, '')
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`.replace(/\/$/, '')
  }

  if (process.env.NEXT_PUBLIC_URL) {
    return process.env.NEXT_PUBLIC_URL.replace(/\/$/, '')
  }

  return 'http://localhost:3000'
}

export function getAppUrlDebug() {
  return {
    appUrl: getAppUrl(),
    vercelProductionUrl: process.env.VERCEL_PROJECT_PRODUCTION_URL ?? null,
    vercelUrl: process.env.VERCEL_URL ?? null,
    nextPublicUrl: process.env.NEXT_PUBLIC_URL ?? null,
  }
}
