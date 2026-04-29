import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-inter',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
const DESCRIPTION =
  'Portfolio of Tuan Dung Nguyen — fullstack web developer based in Hanoi, Vietnam. TypeScript, React, Next.js, NestJS, AWS.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Tuan Dung Nguyen — Fullstack Developer',
    template: '%s · Tuan Dung Nguyen',
  },
  description: DESCRIPTION,
  keywords: [
    'Tuan Dung Nguyen',
    'Nguyen Tuan Dung',
    'Fullstack developer',
    'TypeScript',
    'React',
    'Next.js',
    'NestJS',
    'Hanoi',
    'Vietnam',
  ],
  authors: [{ name: 'Tuan Dung Nguyen' }],
  creator: 'Tuan Dung Nguyen',
  icons: [{ url: '/images/favicon.ico' }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Tuan Dung Nguyen',
    title: 'Tuan Dung Nguyen — Fullstack Developer',
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tuan Dung Nguyen — Fullstack Developer',
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Tuan Dung Nguyen',
  alternateName: 'Nguyen Tuan Dung',
  jobTitle: 'Fullstack Developer',
  url: SITE_URL,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Hanoi',
    addressCountry: 'VN',
  },
  sameAs: ['https://www.linkedin.com/in/dungnt1304/'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
