import { existsSync, readFileSync } from 'node:fs'

const ENV_FILES = ['.env.local', '.env.development.local', '.env.production.local']

function parseEnvValue(raw) {
  const value = raw.trim()
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1)
  }
  return value
}

function loadRedisUrl() {
  const fromEnv = process.env.REDIS_URL?.trim()
  if (fromEnv) return fromEnv

  for (const file of ENV_FILES) {
    if (!existsSync(file)) continue

    const env = readFileSync(file, 'utf8')
    const match = env.match(/^REDIS_URL=(.*)$/m)
    if (match?.[1] !== undefined) {
      const value = parseEnvValue(match[1])
      if (value) return value
    }
  }

  throw new Error(
    [
      'REDIS_URL is missing or empty in .env.local.',
      '',
      'vercel env pull often leaves Storage secrets empty.',
      'Copy it manually instead:',
      '  Vercel → mockingbird → Storage → redis-champagne-envelope → Show secret (REDIS_URL)',
      '',
      'Then in .env.local add:',
      '  REDIS_URL="rediss://default:...@....upstash.io:6379"',
      '',
      'Then run: npm run songs:list',
    ].join('\n')
  )
}

export { loadRedisUrl }
