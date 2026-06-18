import { getAppUrl } from '@/lib/app-url'
import { isKvConfigured } from '@/lib/kv'
import { NextRequest, NextResponse } from 'next/server'
import { storePendingOrder } from '@/lib/process-order'
import { stripe } from '@/lib/stripe'
import { QuestionnaireData } from '@/lib/types'

function checkoutErrorMessage(error: unknown): string {
  if (!(error instanceof Error)) {
    return 'Failed to create checkout session'
  }

  if (
    error.message.includes('KV_REST_API_URL') ||
    error.message.includes('KV_REST_API_TOKEN')
  ) {
    return 'Database not connected. In Vercel go to Storage, connect Upstash Redis to this project, then redeploy.'
  }

  if (error.message.includes('No such price')) {
    return 'Invalid Stripe price ID. Check NEXT_PUBLIC_STRIPE_PRICE_ONE_SONG / THREE_SONGS in Vercel, then redeploy.'
  }

  if (error.message.includes('Invalid API Key')) {
    return 'Invalid Stripe secret key. Check STRIPE_SECRET_KEY in Vercel matches your Sandbox test key.'
  }

  return error.message || 'Failed to create checkout session'
}

export async function POST(req: NextRequest) {
  try {
    const { priceId, questionnaireData }: { priceId: string; questionnaireData: QuestionnaireData } =
      await req.json()

    if (!priceId || !questionnaireData?.customerEmail || !questionnaireData?.recipientName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (priceId.includes('REPLACE')) {
      return NextResponse.json(
        {
          error:
            'Stripe price IDs are not configured in this build. Set NEXT_PUBLIC_STRIPE_PRICE_ONE_SONG and NEXT_PUBLIC_STRIPE_PRICE_THREE_SONGS in Vercel, then redeploy.',
        },
        { status: 500 }
      )
    }

    if (!isKvConfigured()) {
      return NextResponse.json(
        {
          error:
            'Database not connected. In Vercel go to Storage, connect Redis to this project, then redeploy.',
        },
        { status: 500 }
      )
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'STRIPE_SECRET_KEY is missing in Vercel environment variables.' },
        { status: 500 }
      )
    }

    const appUrl = getAppUrl()

    const orderRef = crypto.randomUUID()
    await storePendingOrder(orderRef, questionnaireData)

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: questionnaireData.customerEmail,
      success_url: `${appUrl}/create?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/create`,
      metadata: { orderRef },
      payment_intent_data: {
        metadata: { orderRef },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: checkoutErrorMessage(error) }, { status: 500 })
  }
}
