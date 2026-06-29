// Stripe Price IDs are safe to expose client-side
export const PRICE_IDS = {
  ONE_SONG: process.env.NEXT_PUBLIC_STRIPE_PRICE_ONE_SONG ?? 'price_REPLACE_WITH_YOUR_1_SONG_PRICE_ID',
} as const
