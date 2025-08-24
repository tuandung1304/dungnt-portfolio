import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TuanDung - Portfolio',
  icons: [{ url: '/images//dva-c02-badge.png' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
