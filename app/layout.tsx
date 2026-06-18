import type { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mockingbird.ai — The Gift That Hits Different',
  description:
    'AI-powered personalised songs for birthdays, weddings, proposals and more. Delivered in 15 minutes.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className={manrope.className}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
