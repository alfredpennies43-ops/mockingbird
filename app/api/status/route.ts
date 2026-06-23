import { getAppUrl, getAppUrlDebug, getCanonicalSiteUrl } from '@/lib/app-url'
import { isKvConfigured } from '@/lib/kv'
import { NextResponse } from 'next/server'
import { PRICE_IDS } from '@/lib/pricing'

export async function GET() {
  const priceOne = PRICE_IDS.ONE_SONG
  const priceThree = PRICE_IDS.THREE_SONGS

  return NextResponse.json({
    ok: true,
    canonicalSiteUrl: getCanonicalSiteUrl(),
    database: isKvConfigured(),
    databaseMode: process.env.REDIS_URL
      ? 'redis-url'
      : process.env.KV_REST_API_URL
        ? 'rest'
        : 'none',
    stripeSecretKey: Boolean(process.env.STRIPE_SECRET_KEY),
    stripeWebhookSecret: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
    appUrl: getAppUrl(),
    urlSources: getAppUrlDebug(),
    priceOneSongConfigured: !priceOne.includes('REPLACE'),
    priceThreeSongsConfigured: !priceThree.includes('REPLACE'),
    priceOneSongPrefix: priceOne.slice(0, 10),
  })
}
