import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { BackToTop } from "@/components/layout/back-to-top"
import { PerformanceMonitor } from "@/components/features/performance-monitor"
import { SkipNav } from "@/components/layout/skip-nav"
import { StructuredData } from "@/components/providers/structured-data"
import { AnalyticsProvider } from "@/components/providers/analytics-provider"
import { ConsentBanner } from "@/components/providers/consent-banner"
import { generateBusinessSchema, generateWebsiteSchema, generateOrganizationSchema, generateServiceSchema } from "@/lib/seo"
import { Providers } from "@/components/providers/providers"
import "./globals.css"

const _geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})
const _geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Savaj Seeds - Happiness from the Farmer's Field | Premium Quality Seeds",
  description:
    "Premium quality vegetable seeds, crop seeds, and hybrid seeds for optimal farming growth. Trusted seed supplier committed to farmer success with over a decade of agricultural excellence. Leading agricultural solutions provider in Gujarat, India.",
  generator: "Next.js",
  applicationName: "Savaj Seeds",
  referrer: "origin-when-cross-origin",
  keywords: [
    "seeds", "farming", "agriculture", "vegetables", "crops", "hybrid seeds", "gardening",
    "vegetable seeds", "crop seeds", "organic farming", "sustainable agriculture", "Gujarat",
    "India", "seed supplier", "agricultural products", "farming solutions", "quality seeds",
    "high yield seeds", "disease resistant seeds", "drought tolerant seeds", "premium seeds",
    "certified seeds", "plant breeding", "agricultural consulting", "farming technology",
    "seed testing", "agricultural research", "Savaj Seeds", "Ahmedabad", "GIDC",
    "tomato seeds", "cucumber seeds", "pepper seeds", "wheat seeds", "rice seeds", "maize seeds",
    "seasonal farming", "crop management", "agricultural innovation", "farming best practices",
    "seed technology", "plant genetics", "agricultural development", "farming equipment",
    "irrigation solutions", "soil management", "pest control", "fertilizer guidance",
    "harvest optimization", "post-harvest technology", "agricultural training", "farmer education"
  ],
  authors: [{ name: "Savaj Seeds", url: "https://savajseeds.com" }],
  creator: "Savaj Seeds",
  publisher: "Savaj Seeds",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://savajseeds.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'hi-IN': '/hi-IN',
      'gu-IN': '/gu-IN',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://savajseeds.com',
    title: 'Savaj Seeds - Happiness from the Farmer\'s Field | Premium Quality Seeds',
    description: 'Premium quality vegetable seeds, crop seeds, and hybrid seeds for optimal farming growth. Trusted seed supplier committed to farmer success with over a decade of agricultural excellence.',
    siteName: 'Savaj Seeds',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Savaj Seeds - Premium Quality Seeds for Optimal Farming Growth',
        type: 'image/png',
      },
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Savaj Seeds Agricultural Products - Vegetable, Crop & Hybrid Seeds',
        type: 'image/jpeg',
      },
      {
        url: '/images/og-image-square.jpg',
        width: 1080,
        height: 1080,
        alt: 'Savaj Seeds - Leading Agricultural Solutions Provider',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Savaj Seeds - Happiness from the Farmer\'s Field | Premium Quality Seeds',
    description: 'Premium quality vegetable seeds, crop seeds, and hybrid seeds for optimal farming growth. Trusted seed supplier committed to farmer success.',
    creator: '@SavajSeeds',
    site: '@SavajSeeds',
    images: ['/images/logo.png'],
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || '',
    yandex: process.env.YANDEX_VERIFICATION || '',
    yahoo: process.env.YAHOO_VERIFICATION || '',
    other: {
      'msvalidate.01': process.env.BING_VERIFICATION || '',
      'facebook-domain-verification': process.env.FACEBOOK_VERIFICATION || '',
      'pinterest-site-verification': process.env.PINTEREST_VERIFICATION || '',
    },
  },
  appleWebApp: {
    title: 'Savaj Seeds',
    statusBarStyle: 'default',
    capable: true,
  },
  category: 'Agriculture',
  classification: 'Agriculture, Seeds, Farming',
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  manifest: "/site.webmanifest",
  other: {
    'theme-color': '#22c55e',
    'color-scheme': 'light dark',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Savaj Seeds',
    'application-name': 'Savaj Seeds',
    'msapplication-TileColor': '#22c55e',
    'msapplication-config': '/browserconfig.xml',
    'geo.region': 'IN-GJ',
    'geo.placename': 'Ahmedabad, Gujarat, India',
    'geo.position': '23.0225;72.5714',
    'ICBM': '23.0225, 72.5714',
    'DC.title': 'Savaj Seeds - Premium Quality Seeds',
    'DC.creator': 'Savaj Seeds',
    'DC.subject': 'Agriculture, Seeds, Farming',
    'DC.description': 'Premium quality vegetable seeds, crop seeds, and hybrid seeds for optimal farming growth.',
    'DC.publisher': 'Savaj Seeds',
    'DC.contributor': 'Savaj Seeds Team',
    'DC.date': new Date().toISOString(),
    'DC.type': 'Text',
    'DC.format': 'text/html',
    'DC.identifier': 'https://savajseeds.com',
    'DC.language': 'en',
    'DC.coverage': 'India',
    'DC.rights': 'Copyright Savaj Seeds',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const businessSchema = generateBusinessSchema()
  const websiteSchema = generateWebsiteSchema()
  const organizationSchema = generateOrganizationSchema()
  const serviceSchema = generateServiceSchema()

  return (
    <html lang="en" className={`${_geist.variable} ${_geistMono.variable}`}>
      <head>
        <StructuredData data={[businessSchema, websiteSchema, organizationSchema, serviceSchema]} />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="width" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Savaj Seeds" />
        <meta name="application-name" content="Savaj Seeds" />
        <meta name="msapplication-TileColor" content="#22c55e" />
        <meta name="theme-color" content="#22c55e" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className={`font-sans antialiased`}>
        <AnalyticsProvider>
          <Providers>
            <SkipNav />
            {children}
            <BackToTop />
            <PerformanceMonitor enableConsoleLogging={false} />
            <Toaster />
            <Analytics />
            <ConsentBanner />
          </Providers>
        </AnalyticsProvider>
      </body>
    </html>
  )
}
