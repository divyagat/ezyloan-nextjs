import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import VoiceAssistant from '@/components/VoiceAssistant'

export const metadata: Metadata = {
  metadataBase: new URL('https://ezyloan.co.in'),
  title: {
    default: 'EzyLoan - Quick & Easy Loans',
    template: '%s | EzyLoan',
  },
  description:
    'Get instant loans with EzyLoan - Personal loans, business loans, and more. Quick approval, competitive rates, and hassle-free process.',
  keywords:
    'EzyLoan, instant loans, personal loans, business loans, car loans, property loans, commercial vehicle loans, loan refinancing, quick loans, easy loans, low interest loans, online loans, loan application, loan approval, EMI calculator, loan eligibility, India',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://ezyloan.co.in',
    siteName: 'EzyLoan',
    images: [
      {
        url: '/ezy-logo.png',
        width: 1200,
        height: 630,
        alt: 'EzyLoan Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EzyLoan - Quick & Easy Loans',
    description: 'Fast and easy loan solutions with EzyLoan.',
    images: ['/ezy-logo.png'],
  },
  alternates: {
    canonical: 'https://ezyloan.co.in',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <VoiceAssistant/>
      </body>
    </html>
  )
}
