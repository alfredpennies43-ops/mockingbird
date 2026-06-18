import { kv } from '@/lib/kv'
import { NextRequest, NextResponse } from 'next/server'
import { getPendingOrder, processOrder } from '@/lib/process-order'
import { stripe } from '@/lib/stripe'

export const runtime = 'nodejs'

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

    if (orderRef) {
      const alreadyProcessed = await kv.get(`processed:${orderRef}`)
      if (!alreadyProcessed) {
        await kv.set(`processed:${orderRef}`, true, { ex: 60 * 60 * 24 })
        handleCheckoutComplete(orderRef).catch(console.error)
      }
    }
  }

  return NextResponse.json({ received: true })
}

async function handleCheckoutComplete(orderRef: string) {
  const pending = await getPendingOrder(orderRef)
  if (!pending) {
    console.error(`No pending order found for ref: ${orderRef}`)
    return
  }

  await processOrder(pending.questionnaireData, orderRef)
}
