import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://savajseeds.com'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
          '/temp/',
          '/cache/',
          '*.json',
          '/search?*', // Prevent indexing of search result pages with parameters
          '/filter?*', // Prevent indexing of filtered pages
          '/sort?*', // Prevent indexing of sorted pages
          '/checkout/',
          '/cart/',
          '/account/',
          '/login/',
          '/register/',
          '/reset-password/',
          '/verify-email/',
          '/unsubscribe/',
          '/webhook/',
          '/health/',
          '/status/',
          '/*?utm_*', // Prevent indexing of UTM parameter URLs
          '/*?ref=*', // Prevent indexing of referral URLs
          '/*?source=*', // Prevent indexing of source tracking URLs
          '/*?fbclid=*', // Prevent indexing of Facebook click IDs
          '/*?gclid=*', // Prevent indexing of Google click IDs
          '/*?msclkid=*', // Prevent indexing of Microsoft click IDs
          '/test/',
          '/staging/',
          '/dev/',
          '/preview/',
          '/*.pdf$', // Allow PDF indexing for downloadable resources
        ],
        crawlDelay: 1, // 1 second delay between requests
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/temp/',
          '/cache/',
          '/checkout/',
          '/cart/',
          '/account/',
          '/login/',
          '/register/',
          '/webhook/',
          '/health/',
          '/status/',
          '/test/',
          '/staging/',
          '/dev/',
          '/preview/',
        ],
        crawlDelay: 0.5, // Faster crawling for Googlebot
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/temp/',
          '/cache/',
          '/checkout/',
          '/cart/',
          '/account/',
          '/webhook/',
          '/test/',
          '/staging/',
          '/dev/',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/test/',
          '/staging/',
        ],
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/test/',
          '/staging/',
        ],
      },
      {
        userAgent: 'LinkedInBot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/test/',
          '/staging/',
        ],
      },
      {
        userAgent: 'WhatsApp',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
        ],
      },
      {
        userAgent: 'TelegramBot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
        ],
      },
      // Block bad bots and scrapers
      {
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'MJ12bot',
          'DotBot',
          'BLEXBot',
          'DataForSeoBot',
          'SiteAuditBot',
          'MegaIndex',
          'PetalBot',
          'YandexBot',
          'CCBot',
          'ChatGPT-User',
          'GPTBot',
          'Google-Extended',
          'anthropic-ai',
          'Claude-Web',
        ],
        disallow: '/',
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-products.xml/route`,
      `${baseUrl}/sitemap-blog.xml/route`,
    ],
    host: baseUrl,
  }
}