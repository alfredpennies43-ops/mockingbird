import { createClient } from 'redis'
import { loadRedisUrl } from './load-redis-url.mjs'

const client = createClient({ url: loadRedisUrl() })
await client.connect()

const songKeys = await client.keys('song:*')
const orderKeys = await client.keys('order:*')
const pendingKeys = await client.keys('pending:*')
const processedKeys = await client.keys('processed:*')

console.log(
  `\nFound ${songKeys.length} song(s), ${orderKeys.length} order(s), ${pendingKeys.length} pending checkout(s), ${processedKeys.length} processed webhook(s)\n`
)

if (pendingKeys.length > 0) {
  console.log('⏳ Pending (paid but webhook may not have finished):')
  for (const key of pendingKeys.sort()) {
    console.log(`   ${key}`)
  }
  console.log('')
}

if (processedKeys.length > 0) {
  console.log('🔁 Processed webhook refs (Stripe already notified us):')
  for (const key of processedKeys.sort()) {
    console.log(`   ${key}`)
  }
  console.log('')
}

for (const key of songKeys.sort()) {
  const raw = await client.get(key)
  if (!raw) continue
  const song = JSON.parse(raw)
  console.log(`✅ ${key}`)
  console.log(`   ${song.recipientName} — ${song.occasion}`)
  console.log(`   https://mockingbird-umber-alpha.vercel.app/song/${song.id}\n`)
}

for (const key of orderKeys.sort()) {
  const raw = await client.get(key)
  if (!raw) continue
  const order = JSON.parse(raw)
  console.log(`📦 ${key} — status: ${order.status}`)
  if (order.songPageId) {
    console.log(`   https://mockingbird-umber-alpha.vercel.app/song/${order.songPageId}`)
  }
}

await client.quit()
