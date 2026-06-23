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
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL
  }

  for (const file of ENV_FILES) {
    if (!existsSync(file)) continue

    const env = readFileSync(file, 'utf8')
    const match = env.match(/^REDIS_URL=(.*)$/m)
    if (match?.[1]) {
      return parseEnvValue(match[1])
    }
  }

  throw new Error(
    [
      'REDIS_URL not found locally.',
      '',
      'Pull Production env vars from Vercel first:',
      '  npx vercel@latest login',
      '  npx vercel@latest link',
      '  npx vercel@latest env pull .env.local --environment=production',
      '',
      'Then run:',
      '  npm run songs:list',
    ].join('\n')
  )
}

export { loadRedisUrl }
