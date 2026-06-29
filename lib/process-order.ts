import { getAppUrl } from './app-url'
import { kv } from '@/lib/kv'
import { generateLyricsAndPrompt } from './claude'
import { generateSong } from './mureka'
import { sendSongEmail } from './resend'
import { Order, PendingOrder, QuestionnaireData, SongPage } from './types'

function orderRefKey(orderRef: string) {
  return `orderRef:${orderRef}`
}

export async function getOrderIdForRef(orderRef: string): Promise<string | null> {
  return kv.get<string>(orderRefKey(orderRef))
}

export async function processOrder(
  questionnaireData: QuestionnaireData,
  orderRef: string,
  options?: { retryOrderId?: string }
): Promise<void> {
  const mappedOrderId = options?.retryOrderId ?? (await getOrderIdForRef(orderRef))
  const orderId = mappedOrderId ?? crypto.randomUUID()
  const previousOrder = mappedOrderId ? await kv.get<Order>(`order:${orderId}`) : null
  const songPageId = previousOrder?.songPageId ?? crypto.randomUUID()

  const order: Order = {
    id: orderId,
    questionnaireData,
    status: 'generating',
    songUrls: [],
    songPageId,
    createdAt: previousOrder?.createdAt ?? Date.now(),
    paidAt: Date.now(),
  }

  await kv.set(`order:${orderId}`, order)
  await kv.set(orderRefKey(orderRef), orderId, { ex: 60 * 60 * 24 })

  console.log(
    `Order ${orderId} ${mappedOrderId ? 'retrying' : 'started'} for ${questionnaireData.recipientName}`
  )

  try {
    const { lyrics, murekaPrompt } = await generateLyricsAndPrompt(questionnaireData)

    const songUrls = [await generateSong(murekaPrompt, lyrics)]

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
    await kv.del(`pending:${orderRef}`)

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
    const message = error instanceof Error ? error.message : String(error)
    console.error(`Order ${orderId} failed: ${message}`, error)
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
