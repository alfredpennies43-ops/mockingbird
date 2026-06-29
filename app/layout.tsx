import type { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Outfit } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mockingbird.ai'),
  title: 'Mockingbird.ai — The Gift That Hits Different',
  description:
    'AI-powered personalised songs for birthdays, weddings, proposals and more. Delivered in 15 minutes.',
  openGraph: {
    url: 'https://mockingbird.ai',
    siteName: 'Mockingbird.ai',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bagel+Fat+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={outfit.className}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
