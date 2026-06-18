import { createClient } from '@vercel/kv'

let kvClient: ReturnType<typeof createClient> | null = null

function parseRedisUrl(redisUrl: string): { url: string; token: string } {
  const parsed = new URL(redisUrl)
  const token = decodeURIComponent(parsed.password)

  if (!token || !parsed.hostname) {
    throw new Error('Invalid REDIS_URL format')
  }

  return {
    url: `https://${parsed.hostname}`,
    token,
  }
}

function getKvConfig(): { url: string; token: string } | null {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    return {
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    }
  }

  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    return {
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    }
  }

  if (process.env.REDIS_URL) {
    return parseRedisUrl(process.env.REDIS_URL)
  }

  return null
}

export function isKvConfigured(): boolean {
  return getKvConfig() !== null
}

function getClient() {
  if (!kvClient) {
    const config = getKvConfig()
    if (!config) {
      throw new Error(
        'Database not connected. Connect Redis in Vercel Storage or set KV_REST_API_URL and KV_REST_API_TOKEN.'
      )
    }
    kvClient = createClient(config)
  }
  return kvClient
}

export const kv = new Proxy({} as ReturnType<typeof createClient>, {
  get(_target, prop) {
    return Reflect.get(getClient(), prop)
  },
})
