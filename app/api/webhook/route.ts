import { kv } from '@/lib/kv'
import { NextRequest, NextResponse } from 'next/server'
import { getOrderIdForRef, getPendingOrder, processOrder } from '@/lib/process-order'
import { Order } from '@/lib/types'
import { stripe } from '@/lib/stripe'

export const runtime = 'nodejs'
export const maxDuration = 300

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const orderRef = session.metadata?.orderRef

    if (!orderRef) {
      console.error('Webhook checkout.session.completed missing orderRef metadata')
      return NextResponse.json({ error: 'Missing orderRef' }, { status: 400 })
    }

    console.log(`Webhook checkout.session.completed — orderRef: ${orderRef}`)

    const alreadyProcessed = await kv.get(`processed:${orderRef}`)
    if (alreadyProcessed) {
      console.log(`Webhook skipped duplicate orderRef: ${orderRef}`)
      return NextResponse.json({ received: true, duplicate: true })
    }

    const pending = await getPendingOrder(orderRef)
    const existingOrderId = await getOrderIdForRef(orderRef)
    const existingOrder = existingOrderId
      ? await kv.get<Order>(`order:${existingOrderId}`)
      : null

    if (existingOrder?.status === 'complete') {
      await kv.set(`processed:${orderRef}`, true, { ex: 60 * 60 * 24 })
      console.log(`Webhook skipped already-complete orderRef: ${orderRef}`)
      return NextResponse.json({ received: true, duplicate: true })
    }

    if (existingOrder?.status === 'generating') {
      console.log(`Webhook skipped in-progress orderRef: ${orderRef} (order ${existingOrderId})`)
      return NextResponse.json({ received: true, inProgress: true })
    }

    const questionnaireData = pending?.questionnaireData ?? existingOrder?.questionnaireData
    if (!questionnaireData) {
      console.error(`No pending order found for ref: ${orderRef}`)
      return NextResponse.json({ error: 'No pending order' }, { status: 500 })
    }

    try {
      await processOrder(questionnaireData, orderRef, {
        retryOrderId: existingOrder?.status === 'failed' ? existingOrderId! : undefined,
      })
      await kv.set(`processed:${orderRef}`, true, { ex: 60 * 60 * 24 })
      console.log(`Webhook pipeline complete for orderRef: ${orderRef}`)
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      console.error(`Webhook pipeline failed for ${orderRef}: ${message}`, err)
      return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
