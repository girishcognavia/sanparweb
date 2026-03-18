import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { syne, outfit } from '@/lib/fonts'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const CommandPalette = dynamic(
  () => import('@/components/layout/CommandPalette').then((m) => m.CommandPalette),
  { ssr: false }
)

export const metadata: Metadata = {
  title: {
    default: 'SANPAR Industries — Compressed Air Treatment & Industrial Cooling, Bengaluru',
    template: '%s | SANPAR Industries',
  },
  description:
    'Precision-engineered compressed air treatment and industrial cooling solutions. 32 years of engineering excellence. DGAQA & CEMILAC certified. Trusted by DRDO, HAL, and 40+ industry leaders.',
  openGraph: {
    type: 'website',
    siteName: 'SANPAR Industries',
    locale: 'en_IN',
  },
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${outfit.variable}`}>
      <head>
        <link rel="dns-prefetch" href="/_next/image" />
        <link rel="prefetch" href="/about" />
        <link rel="prefetch" href="/products" />
        <link rel="prefetch" href="/industries" />
        <link rel="prefetch" href="/contact" />
      </head>
      <body className="font-body text-text-primary antialiased overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-teal-600 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:font-semibold"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <CommandPalette />
      </body>
    </html>
  )
}
