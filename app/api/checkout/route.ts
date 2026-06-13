import { NextRequest, NextResponse } from 'next/server'
import { storePendingOrder } from '@/lib/process-order'
import { stripe } from '@/lib/stripe'
import { QuestionnaireData } from '@/lib/types'

export async function POST(req: NextRequest) {
  try {
    const { priceId, questionnaireData }: { priceId: string; questionnaireData: QuestionnaireData } =
      await req.json()

    if (!priceId || !questionnaireData?.customerEmail || !questionnaireData?.recipientName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const orderRef = crypto.randomUUID()
    await storePendingOrder(orderRef, questionnaireData)

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: questionnaireData.customerEmail,
      success_url: `${process.env.NEXT_PUBLIC_URL}/create?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/create`,
      metadata: { orderRef },
      payment_intent_data: {
        metadata: { orderRef },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
