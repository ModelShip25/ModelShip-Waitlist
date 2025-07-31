import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})

export const metadata = {
  title: "ModelShip - AI Data Labeling Platform | Join Early Access Waitlist",
  description: "ModelShip helps AI teams label data 70% faster with AI-powered auto-labeling, easy review flows, and instant export. Join our waitlist for early access to the future of data labeling.",
  keywords: "AI data labeling, machine learning, data annotation, AI training data, automated labeling, data preparation, ML pipeline, AI development, computer vision, NLP labeling",
  authors: [{ name: "ModelShip Team" }],
  creator: "ModelShip",
  publisher: "ModelShip",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://modelship.ai'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "ModelShip - AI Data Labeling Platform | Join Early Access Waitlist",
    description: "ModelShip helps AI teams label data 70% faster with AI-powered auto-labeling, easy review flows, and instant export. Join our waitlist for early access.",
    url: 'https://modelship.ai',
    siteName: 'ModelShip',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ModelShip - AI Data Labeling Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ModelShip - AI Data Labeling Platform | Join Early Access Waitlist",
    description: "ModelShip helps AI teams label data 70% faster with AI-powered auto-labeling, easy review flows, and instant export. Join our waitlist for early access.",
    images: ['/twitter-image.png'],
    creator: '@modelshipai',
    site: '@modelshipai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
  classification: 'AI/ML Platform',
  other: {
    'msapplication-TileColor': '#6F42C1',
    'theme-color': '#6F42C1',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#6F42C1" />
        <meta name="theme-color" content="#6F42C1" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://formspree.io" />
        <link rel="preconnect" href="https://va.vercel-scripts.com" />
        <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "ModelShip",
              "description": "AI-powered data labeling platform that helps teams label data 70% faster",
              "url": "https://modelship.ai",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/PreOrder"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "500"
              },
              "author": {
                "@type": "Organization",
                "name": "ModelShip",
                "url": "https://modelship.ai"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
