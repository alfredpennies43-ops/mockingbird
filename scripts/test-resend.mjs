import { existsSync, readFileSync } from 'node:fs'

const ENV_FILES = ['.env.local', '.env.development.local', '.env.production.local']

function loadEnv(name) {
  if (process.env[name]) return process.env[name]

  for (const file of ENV_FILES) {
    if (!existsSync(file)) continue
    const env = readFileSync(file, 'utf8')
    const match = env.match(new RegExp(`^${name}=(.*)$`, 'm'))
    if (match?.[1]) {
      let value = match[1].trim()
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }
      return value
    }
  }

  return null
}

const apiKey = loadEnv('RESEND_API_KEY')
const from = loadEnv('RESEND_FROM_EMAIL')
const to = process.argv[2] ?? loadEnv('RESEND_TEST_TO')

if (!apiKey || !from) {
  console.error('Missing RESEND_API_KEY or RESEND_FROM_EMAIL in .env.local')
  console.error('Run: npx vercel env pull .env.local --environment=production')
  process.exit(1)
}

if (!to) {
  console.error('Usage: npm run resend:test -- you@example.com')
  console.error('Tip: with onboarding@resend.dev, use your Resend signup email.')
  process.exit(1)
}

const res = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    from,
    to: [to],
    subject: 'Mockingbird.ai — Resend test',
    html: '<h1>Mockingbird email test ✅</h1><p>Resend is wired up.</p>',
  }),
})

const body = await res.json()

if (!res.ok) {
  console.error('Resend failed:', body)
  process.exit(1)
}

console.log(`✅ Email sent to ${to}`)
console.log(`   id: ${body.id}`)
console.log(`   from: ${from}`)
