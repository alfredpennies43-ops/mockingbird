import { createClient as createKvClient } from '@vercel/kv'
import { createClient as createRedisClient, type RedisClientType } from 'redis'

type KvStore = {
  get: <T>(key: string) => Promise<T | null>
  set: (key: string, value: unknown, options?: { ex?: number }) => Promise<unknown>
  del: (key: string) => Promise<unknown>
}

declare global {
  var __mockingbirdRedis: RedisClientType | undefined
}

export function isKvConfigured(): boolean {
  return Boolean(
    process.env.REDIS_URL ||
      (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) ||
      (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
  )
}

async function getRedisClient(): Promise<RedisClientType> {
  if (!process.env.REDIS_URL) {
    throw new Error('REDIS_URL is not set')
  }

  if (!global.__mockingbirdRedis) {
    const client = createRedisClient({ url: process.env.REDIS_URL })
    client.on('error', (err) => console.error('Redis client error:', err))
    global.__mockingbirdRedis = client
    await client.connect()
  } else if (!global.__mockingbirdRedis.isOpen) {
    await global.__mockingbirdRedis.connect()
  }

  return global.__mockingbirdRedis
}

function createRedisStore(): KvStore {
  return {
    async get<T>(key: string): Promise<T | null> {
      const client = await getRedisClient()
      const value = await client.get(key)
      if (value === null) return null
      return JSON.parse(value) as T
    },
    async set(key: string, value: unknown, options?: { ex?: number }) {
      const client = await getRedisClient()
      const serialized = JSON.stringify(value)
      if (options?.ex) {
        return client.set(key, serialized, { EX: options.ex })
      }
      return client.set(key, serialized)
    },
    async del(key: string) {
      const client = await getRedisClient()
      return client.del(key)
    },
  }
}

let restClient: ReturnType<typeof createKvClient> | null = null

function getRestStore(): KvStore {
  const client = getRestClient()
  return {
    get: (key) => client.get(key),
    set: (key, value, options) =>
      options?.ex
        ? client.set(key, value, { ex: options.ex })
        : client.set(key, value),
    del: (key) => client.del(key),
  }
}

function getRestClient() {
  if (!restClient) {
    const url =
      process.env.KV_REST_API_URL ??
      process.env.UPSTASH_REDIS_REST_URL
    const token =
      process.env.KV_REST_API_TOKEN ??
      process.env.UPSTASH_REDIS_REST_TOKEN

    if (!url || !token) {
      throw new Error('REST Redis credentials are not set')
    }

    restClient = createKvClient({ url, token })
  }
  return restClient
}

function getStore(): KvStore {
  if (process.env.REDIS_URL) {
    return createRedisStore()
  }

  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    return getRestStore()
  }

  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    return getRestStore()
  }

  throw new Error(
    'Database not connected. Connect Redis in Vercel Storage or set KV_REST_API_URL and KV_REST_API_TOKEN.'
  )
}

export const kv: KvStore = {
  get: (key) => getStore().get(key),
  set: (key, value, options) => getStore().set(key, value, options),
  del: (key) => getStore().del(key),
}
