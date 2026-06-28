import { getAppUrl } from './app-url'
import { kv } from '@/lib/kv'
import { generateLyricsAndPrompt } from './claude'
import { generateSong } from './mureka'
import { sendSongEmail } from './resend'
import { Order, PendingOrder, QuestionnaireData, SongPage } from './types'

export async function processOrder(
  questionnaireData: QuestionnaireData,
  orderRef: string
): Promise<void> {
  const orderId = crypto.randomUUID()
  const songPageId = crypto.randomUUID()

  const order: Order = {
    id: orderId,
    questionnaireData,
    status: 'generating',
    songUrls: [],
    songPageId,
    createdAt: Date.now(),
    paidAt: Date.now(),
  }

  await kv.set(`order:${orderId}`, order)
  await kv.del(`pending:${orderRef}`)

  console.log(`Order ${orderId} started for ${questionnaireData.recipientName}`)

  try {
    const { lyrics, murekaPrompt } = await generateLyricsAndPrompt(questionnaireData)

    const songCount = questionnaireData.versions === 3 ? 3 : 1
    const songPromises = Array.from({ length: songCount }, () =>
      generateSong(murekaPrompt, lyrics)
    )
    const songUrls = await Promise.all(songPromises)

    const songPage: SongPage = {
      id: songPageId,
      orderId,
      recipientName: questionnaireData.recipientName,
      occasion: questionnaireData.occasion,
      artistStyle: questionnaireData.artistStyle,
      songUrls,
      createdAt: Date.now(),
    }

    await kv.set(`song:${songPageId}`, songPage)
    await kv.set(`order:${orderId}`, { ...order, status: 'complete', songUrls })

    const songPageUrl = `${getAppUrl()}/song/${songPageId}`
    console.log(`Order ${orderId} complete — song page: ${songPageUrl}`)

    try {
      const result = await sendSongEmail({
        customerEmail: questionnaireData.customerEmail,
        recipientName: questionnaireData.recipientName,
        occasion: questionnaireData.occasion,
        songPageUrl,
        songUrls,
      })
      console.log(`Order ${orderId} email sent to ${questionnaireData.customerEmail} (id: ${result.id})`)
    } catch (emailError) {
      console.error(`Order ${orderId} email failed (song is still live):`, emailError)
    }
  } catch (error) {
    console.error(`Order ${orderId} failed:`, error)
    await kv.set(`order:${orderId}`, { ...order, status: 'failed' })
    throw error
  }
}

export async function getPendingOrder(orderRef: string): Promise<PendingOrder | null> {
  return kv.get<PendingOrder>(`pending:${orderRef}`)
}

export async function storePendingOrder(
  orderRef: string,
  questionnaireData: QuestionnaireData
): Promise<void> {
  const pending: PendingOrder = {
    questionnaireData,
    createdAt: Date.now(),
  }
  await kv.set(`pending:${orderRef}`, pending, { ex: 60 * 60 * 24 })
}
