import { getAppUrl, getCanonicalSiteUrl } from '@/lib/app-url'
import { isKvConfigured } from '@/lib/kv'
import { NextRequest, NextResponse } from 'next/server'
import { storePendingOrder } from '@/lib/process-order'
import { stripe } from '@/lib/stripe'
import { QuestionnaireData } from '@/lib/types'

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String((error as { message: unknown }).message)
  }

  return String(error)
}

function checkoutErrorMessage(error: unknown, step: 'database' | 'stripe'): string {
  const message = getErrorMessage(error)

  if (
    message.includes('KV_REST_API_URL') ||
    message.includes('KV_REST_API_TOKEN') ||
    message.includes('WRONGPASS') ||
    message.includes('invalid token')
  ) {
    return 'Database connection failed. Check REDIS_URL is set for Production in Vercel, then redeploy.'
  }

  if (message.includes('No such price')) {
    return 'Invalid Stripe price ID. Check NEXT_PUBLIC_STRIPE_PRICE_ONE_SONG in Vercel, then redeploy.'
  }

  if (message.includes('Invalid API Key')) {
    return 'Invalid Stripe secret key. Check STRIPE_SECRET_KEY in Vercel matches your Sandbox test key.'
  }

  if (message.includes('Not a valid URL') || message.includes('success_url')) {
    return `App URL not configured. Set SITE_URL to ${getCanonicalSiteUrl()} in Vercel, then redeploy.`
  }

  return step === 'database'
    ? `Database error: ${message}`
    : `Stripe error: ${message}`
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
            'Stripe price IDs are not configured in this build. Set NEXT_PUBLIC_STRIPE_PRICE_ONE_SONG in Vercel, then redeploy.',
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

    try {
      await storePendingOrder(orderRef, questionnaireData)
    } catch (error) {
      console.error('Checkout database error:', error)
      return NextResponse.json({ error: checkoutErrorMessage(error, 'database') }, { status: 500 })
    }

    let session
    try {
      session = await stripe.checkout.sessions.create({
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
    } catch (error) {
      console.error('Checkout stripe error:', error)
      return NextResponse.json({ error: checkoutErrorMessage(error, 'stripe') }, { status: 500 })
    }

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 })
  }
}
