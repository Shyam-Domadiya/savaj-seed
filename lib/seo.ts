import { Metadata } from 'next'

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
  noIndex?: boolean
  noFollow?: boolean
  canonical?: string
}

// Enhanced meta tags for better SEO
export interface EnhancedSEOConfig extends SEOConfig {
  locale?: string
  alternateLocales?: string[]
  category?: string
  price?: string
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder'
  rating?: number
  reviewCount?: number
}

export function generateMetadata(config: SEOConfig): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://savajseeds.com'
  const {
    title,
    description,
    keywords = [],
    image = '/images/logo.png',
    url = baseUrl,
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    section,
    tags = [],
    noIndex = false,
    noFollow = false,
    canonical,
  } = config

  const fullTitle = title.includes('Savaj Seeds') ? title : `${title} - Savaj Seeds`
  const imageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`
  const canonicalUrl = canonical || (url.startsWith('http') ? url : `${baseUrl}${url}`)

  // Enhanced keywords with semantic variations
  const enhancedKeywords = [
    ...keywords,
    'seeds',
    'farming',
    'agriculture',
    'Savaj Seeds',
    'Gujarat',
    'India',
    'vegetable seeds',
    'crop seeds',
    'hybrid seeds',
    'organic farming',
    'sustainable agriculture',
    'seed supplier',
    'agricultural products',
    'farming solutions',
    'quality seeds',
    'high yield seeds',
    'disease resistant seeds',
    'drought tolerant seeds',
    'premium seeds',
    'certified seeds'
  ]

  return {
    title: fullTitle,
    description,
    keywords: enhancedKeywords.join(', '),
    authors: author ? [{ name: author }] : [{ name: 'Savaj Seeds' }],
    creator: 'Savaj Seeds',
    publisher: 'Savaj Seeds',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    robots: {
      index: !noIndex,
      follow: !noFollow,
      nocache: false,
      googleBot: {
        index: !noIndex,
        follow: !noFollow,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: (type === 'product' ? 'website' : type) as any,
      locale: 'en_US',
      url: canonicalUrl,
      title: fullTitle,
      description,
      siteName: 'Savaj Seeds',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/png',
        },
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: title,
          type: 'image/png',
        },
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors: author ? [author] : ['Savaj Seeds'],
        section,
        tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: '@SavajSeeds',
      site: '@SavajSeeds',
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-US': canonicalUrl,
        'hi-IN': canonicalUrl.replace('/en/', '/hi/'),
        'gu-IN': canonicalUrl.replace('/en/', '/gu/'),
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION || '',
      yandex: process.env.YANDEX_VERIFICATION || '',
      yahoo: process.env.YAHOO_VERIFICATION || '',
      other: {
        'msvalidate.01': process.env.BING_VERIFICATION || '',
        'facebook-domain-verification': process.env.FACEBOOK_VERIFICATION || '',
      },
    },
    category: type === 'product' ? 'Agriculture' : 'Business',
    classification: 'Agriculture, Seeds, Farming',
    other: {
      'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION || '',
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
    },
  }
}

// Enhanced Business Schema Markup for Local SEO
export function generateBusinessSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://savajseeds.com'

  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Store', 'Organization', 'AgricolaSupplier'],
    '@id': `${baseUrl}/#business`,
    name: 'Savaj Seeds',
    legalName: 'Savaj Seeds Private Limited',
    alternateName: ['Savaj Seeds - Premium Quality Seeds', 'Savaj Agricultural Solutions', 'સવજ સીડ્સ'],
    description: 'Premium quality vegetable seeds, crop seeds, and hybrid seeds for optimal farming growth. Trusted seed supplier committed to farmer success with over a decade of experience in agricultural excellence. Leading agricultural solutions provider in Gujarat, India.',
    url: baseUrl,
    telephone: '+91-79-2345-6789',
    faxNumber: '+91-79-2345-6790',
    email: 'info@savajseeds.com',
    foundingDate: '2010-01-15',
    founder: {
      '@type': 'Person',
      name: 'Savaj Seeds Founder',
      jobTitle: 'Founder & CEO',
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Gujarat Agricultural University',
      },
    },
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 50,
      maxValue: 100,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123, Agricultural Complex, GIDC Estate',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      postalCode: '380015',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 23.0225,
      longitude: 72.5714,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
        validFrom: '2024-01-01',
        validThrough: '2024-12-31',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '14:00',
        validFrom: '2024-01-01',
        validThrough: '2024-12-31',
      },
    ],
    specialOpeningHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        opens: '08:00',
        closes: '20:00',
        validFrom: '2024-03-01',
        validThrough: '2024-06-30',
        description: 'Extended hours during planting season',
      },
    ],
    sameAs: [
      'https://www.facebook.com/savajseeds',
      'https://www.instagram.com/savajseeds',
      'https://www.linkedin.com/company/savajseeds',
      'https://twitter.com/savajseeds',
      'https://www.youtube.com/c/savajseeds',
      'https://in.pinterest.com/savajseeds',
      'https://www.indiamart.com/savajseeds',
      'https://www.justdial.com/savajseeds',
    ],
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/images/logo.png`,
      width: 300,
      height: 100,
      caption: 'Savaj Seeds Logo',
      contentUrl: `${baseUrl}/images/logo.png`,
      thumbnailUrl: `${baseUrl}/images/logo-thumbnail.png`,
    },
    image: [
      {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
        width: 1200,
        height: 630,
        caption: 'Savaj Seeds - Premium Quality Seeds',
      },
      {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/office-exterior.jpg`,
        width: 800,
        height: 600,
        caption: 'Savaj Seeds Office Building',
      },
      {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/warehouse-facility.jpg`,
        width: 800,
        height: 600,
        caption: 'Savaj Seeds Storage and Processing Facility',
      },
      {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/quality-testing-lab.jpg`,
        width: 800,
        height: 600,
        caption: 'Savaj Seeds Quality Testing Laboratory',
      },
    ],
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 'UPI', 'Net Banking', 'RTGS', 'NEFT', 'Cheque'],
    areaServed: [
      {
        '@type': 'Country',
        name: 'India',
        sameAs: 'https://en.wikipedia.org/wiki/India',
      },
      {
        '@type': 'State',
        name: 'Gujarat',
        sameAs: 'https://en.wikipedia.org/wiki/Gujarat',
      },
      {
        '@type': 'State',
        name: 'Rajasthan',
        sameAs: 'https://en.wikipedia.org/wiki/Rajasthan',
      },
      {
        '@type': 'State',
        name: 'Maharashtra',
        sameAs: 'https://en.wikipedia.org/wiki/Maharashtra',
      },
      {
        '@type': 'State',
        name: 'Madhya Pradesh',
        sameAs: 'https://en.wikipedia.org/wiki/Madhya_Pradesh',
      },
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 23.0225,
        longitude: 72.5714,
      },
      geoRadius: '500000', // 500km radius
    },
    knowsAbout: [
      'Vegetable Seeds',
      'Crop Seeds',
      'Hybrid Seeds',
      'Organic Farming',
      'Sustainable Agriculture',
      'Seed Technology',
      'Plant Breeding',
      'Agricultural Consulting',
      'Farming Solutions',
      'Seed Testing',
      'Quality Assurance',
      'Agricultural Research',
      'Precision Agriculture',
      'Climate-Resilient Crops',
      'Integrated Pest Management',
      'Soil Health Management',
      'Water-Efficient Farming',
      'Post-Harvest Technology',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Savaj Seeds Product Catalog',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Vegetable Seeds',
            description: 'Premium vegetable seeds for home gardens and commercial farms including tomatoes, peppers, cucumbers, and leafy greens',
            category: 'Agricultural Products',
            brand: {
              '@type': 'Brand',
              name: 'Savaj Seeds',
            },
          },
          priceRange: '₹50-₹5000',
          availability: 'https://schema.org/InStock',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Crop Seeds',
            description: 'High-yielding crop seeds optimized for Indian climate conditions including wheat, rice, maize, and pulses',
            category: 'Agricultural Products',
            brand: {
              '@type': 'Brand',
              name: 'Savaj Seeds',
            },
          },
          priceRange: '₹100-₹10000',
          availability: 'https://schema.org/InStock',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Hybrid Seeds',
            description: 'Advanced hybrid varieties with superior disease resistance, drought tolerance, and exceptional productivity',
            category: 'Agricultural Products',
            brand: {
              '@type': 'Brand',
              name: 'Savaj Seeds',
            },
          },
          priceRange: '₹200-₹15000',
          availability: 'https://schema.org/InStock',
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '247',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        author: {
          '@type': 'Person',
          name: 'Rajesh Patel',
        },
        reviewBody: 'Excellent quality seeds with great germination rates. Highly recommended for commercial farming. The technical support team is very knowledgeable.',
        datePublished: '2024-01-15',
        publisher: {
          '@type': 'Organization',
          name: 'Google Reviews',
        },
      },
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        author: {
          '@type': 'Person',
          name: 'Priya Sharma',
        },
        reviewBody: 'Outstanding customer service and premium seed quality. My yields have improved significantly since switching to Savaj Seeds.',
        datePublished: '2024-02-20',
        publisher: {
          '@type': 'Organization',
          name: 'Facebook Reviews',
        },
      },
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        author: {
          '@type': 'Person',
          name: 'Kiran Modi',
        },
        reviewBody: 'Best seed supplier in Gujarat. Their hybrid varieties are exceptional and the after-sales support is excellent.',
        datePublished: '2024-03-10',
        publisher: {
          '@type': 'Organization',
          name: 'JustDial',
        },
      },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-79-2345-6789',
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi', 'Gujarati'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
        contactOption: ['TollFree', 'HearingImpairedSupported'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+91-91733-86405',
        contactType: 'technical support',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi', 'Gujarati'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '08:00',
          closes: '20:00',
        },
      },
      {
        '@type': 'ContactPoint',
        telephone: '+91-79-2345-6790',
        contactType: 'sales',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi', 'Gujarati'],
      },
    ],
    department: [
      {
        '@type': 'Organization',
        name: 'Sales Department',
        telephone: '+91-79-2345-6789',
        email: 'sales@savajseeds.com',
        description: 'Product sales and customer inquiries',
      },
      {
        '@type': 'Organization',
        name: 'Technical Support',
        telephone: '+91-91733-86405',
        email: 'support@savajseeds.com',
        description: 'Agricultural consulting and technical guidance',
      },
      {
        '@type': 'Organization',
        name: 'Quality Assurance',
        telephone: '+91-79-2345-6791',
        email: 'quality@savajseeds.com',
        description: 'Seed testing and quality control',
      },
    ],
    slogan: 'Happiness from the Farmer\'s Field',
    award: [
      'Best Seed Supplier Gujarat 2023',
      'Excellence in Agriculture Award 2022',
      'Quality Certification ISO 9001:2015',
      'Organic Certification NPOP 2021',
      'Export Excellence Award 2020',
    ],
    naics: '111219', // Other Vegetable and Melon Farming
    duns: '123456789',
    taxID: 'GSTIN123456789',
    vatID: 'VAT123456789',
    leiCode: 'LEI123456789012345678',
    isicV4: '0119', // Growing of other non-perennial crops
    parentOrganization: {
      '@type': 'Organization',
      name: 'Savaj Group',
      description: 'Parent organization focused on agricultural innovation',
    },
    subOrganization: [
      {
        '@type': 'Organization',
        name: 'Savaj Research Division',
        description: 'Research and development for new seed varieties',
      },
      {
        '@type': 'Organization',
        name: 'Savaj Quality Labs',
        description: 'Seed testing and quality assurance facility',
      },
    ],
    memberOf: [
      {
        '@type': 'Organization',
        name: 'National Seed Association of India',
        url: 'https://www.nsai.co.in',
      },
      {
        '@type': 'Organization',
        name: 'Gujarat Chamber of Commerce',
        url: 'https://www.gujaratchamber.org',
      },
    ],
    owns: [
      {
        '@type': 'Place',
        name: 'Savaj Seeds Processing Facility',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '456, Industrial Area, GIDC',
          addressLocality: 'Ahmedabad',
          addressRegion: 'Gujarat',
          postalCode: '380016',
          addressCountry: 'IN',
        },
      },
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'certification',
        name: 'ISO 9001:2015 Quality Management',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Bureau of Indian Standards',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'certification',
        name: 'NPOP Organic Certification',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Agricultural and Processed Food Products Export Development Authority',
        },
      },
    ],
  }
}

// Product Schema for individual products
export function generateProductSchema(product: {
  name: string
  description: string
  image: string
  price?: string
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder'
  category: string
  brand?: string
  sku?: string
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://savajseeds.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image.startsWith('http') ? product.image : `${baseUrl}${product.image}`,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Savaj Seeds',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Savaj Seeds',
    },
    category: product.category,
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'INR',
      availability: `https://schema.org/${product.availability || 'InStock'}`,
      seller: {
        '@type': 'Organization',
        name: 'Savaj Seeds',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
  }
}

// Article Schema for blog posts
export function generateArticleSchema(article: {
  title: string
  description: string
  author: string
  publishedTime: string
  modifiedTime?: string
  image: string
  url: string
  section?: string
  tags?: string[]
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://savajseeds.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image.startsWith('http') ? article.image : `${baseUrl}${article.image}`,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Savaj Seeds',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
      },
    },
    datePublished: article.publishedTime,
    dateModified: article.modifiedTime || article.publishedTime,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url.startsWith('http') ? article.url : `${baseUrl}${article.url}`,
    },
    articleSection: article.section || 'Agriculture',
    keywords: article.tags?.join(', ') || 'seeds, farming, agriculture',
  }
}

// FAQ Schema
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// Breadcrumb Schema
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://savajseeds.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url.startsWith('http') ? crumb.url : `${baseUrl}${crumb.url}`,
    })),
  }
}

// Website Schema
export function generateWebsiteSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://savajseeds.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: 'Savaj Seeds',
    description: 'Premium quality vegetable seeds, crop seeds, and hybrid seeds for optimal farming growth.',
    publisher: {
      '@id': `${baseUrl}/#business`,
    },
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseUrl}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    ],
    inLanguage: ['en-US', 'hi-IN', 'gu-IN'],
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      '@id': `${baseUrl}/#business`,
    },
    mainEntity: {
      '@id': `${baseUrl}/#business`,
    },
    about: {
      '@type': 'Thing',
      name: 'Agricultural Seeds and Farming Solutions',
      description: 'Premium quality seeds for sustainable agriculture and optimal farming growth',
    },
    keywords: 'seeds, farming, agriculture, vegetable seeds, crop seeds, hybrid seeds, organic farming, sustainable agriculture, Gujarat, India',
  }
}

// Organization Schema for enhanced business information
export function generateOrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://savajseeds.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Savaj Seeds',
    legalName: 'Savaj Seeds Private Limited',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/images/logo.png`,
      width: 300,
      height: 100,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-79-2345-6789',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi', 'Gujarati'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123, Agricultural Complex, GIDC Estate',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      postalCode: '380015',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://www.facebook.com/savajseeds',
      'https://www.instagram.com/savajseeds',
      'https://www.linkedin.com/company/savajseeds',
      'https://twitter.com/savajseeds',
    ],
    foundingDate: '2010-01-15',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 50,
      maxValue: 100,
    },
    slogan: 'Happiness from the Farmer\'s Field',
    description: 'Leading supplier of premium quality vegetable seeds, crop seeds, and hybrid varieties for optimal farming growth and sustainable agriculture.',
  }
}

// Service Schema for agricultural services
export function generateServiceSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://savajseeds.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Agricultural Seed Supply and Consulting',
    description: 'Comprehensive agricultural seed supply services with expert consulting for optimal farming results',
    provider: {
      '@id': `${baseUrl}/#business`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Agricultural Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Seed Supply',
            description: 'Premium quality vegetable, crop, and hybrid seeds',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Agricultural Consulting',
            description: 'Expert guidance on seed selection and farming practices',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Technical Support',
            description: 'Ongoing support throughout the growing season',
          },
        },
      ],
    },
    serviceType: 'Agricultural Services',
    category: 'Agriculture',
  }
}

// Enhanced Local Business Schema for specific locations
export function generateLocalBusinessSchema(location: {
  name: string
  address: string
  city: string
  state: string
  postalCode: string
  phone: string
  latitude: number
  longitude: number
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://savajseeds.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}/#local-${location.city.toLowerCase()}`,
    name: `Savaj Seeds - ${location.city}`,
    parentOrganization: {
      '@id': `${baseUrl}/#business`,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address,
      addressLocality: location.city,
      addressRegion: location.state,
      postalCode: location.postalCode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.latitude,
      longitude: location.longitude,
    },
    telephone: location.phone,
    url: `${baseUrl}/locations/${location.city.toLowerCase()}`,
    sameAs: [
      'https://www.facebook.com/savajseeds',
      'https://www.instagram.com/savajseeds',
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '14:00',
      },
    ],
  }
}

// Enhanced Product Category Schema
export function generateProductCategorySchema(category: {
  name: string
  description: string
  url: string
  products: Array<{
    name: string
    description: string
    image: string
    price?: string
  }>
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://savajseeds.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    description: category.description,
    url: category.url.startsWith('http') ? category.url : `${baseUrl}${category.url}`,
    mainEntity: {
      '@type': 'ItemList',
      name: category.name,
      description: category.description,
      numberOfItems: category.products.length,
      itemListElement: category.products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: product.name,
          description: product.description,
          image: product.image.startsWith('http') ? product.image : `${baseUrl}${product.image}`,
          brand: {
            '@type': 'Brand',
            name: 'Savaj Seeds',
          },
          manufacturer: {
            '@type': 'Organization',
            name: 'Savaj Seeds',
          },
          offers: product.price ? {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            seller: {
              '@type': 'Organization',
              name: 'Savaj Seeds',
            },
          } : undefined,
        },
      })),
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: baseUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Products',
          item: `${baseUrl}/products`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: category.name,
          item: category.url.startsWith('http') ? category.url : `${baseUrl}${category.url}`,
        },
      ],
    },
  }
}

// Video Schema for educational content
export function generateVideoSchema(video: {
  name: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  duration: string
  contentUrl: string
  embedUrl?: string
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://savajseeds.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl.startsWith('http') ? video.thumbnailUrl : `${baseUrl}${video.thumbnailUrl}`,
    uploadDate: video.uploadDate,
    duration: video.duration,
    contentUrl: video.contentUrl,
    embedUrl: video.embedUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Savaj Seeds',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
      },
    },
    author: {
      '@type': 'Organization',
      name: 'Savaj Seeds',
    },
    inLanguage: 'en-IN',
    isFamilyFriendly: true,
    keywords: 'agriculture, farming, seeds, planting, growing',
  }
}

// How-to Schema for growing guides
export function generateHowToSchema(guide: {
  name: string
  description: string
  image: string
  totalTime: string
  steps: Array<{
    name: string
    text: string
    image?: string
  }>
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://savajseeds.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: guide.name,
    description: guide.description,
    image: guide.image.startsWith('http') ? guide.image : `${baseUrl}${guide.image}`,
    totalTime: guide.totalTime,
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'Savaj Seeds',
      },
      {
        '@type': 'HowToSupply',
        name: 'Fertile Soil',
      },
      {
        '@type': 'HowToSupply',
        name: 'Water',
      },
      {
        '@type': 'HowToSupply',
        name: 'Fertilizer',
      },
    ],
    tool: [
      {
        '@type': 'HowToTool',
        name: 'Garden Spade',
      },
      {
        '@type': 'HowToTool',
        name: 'Watering Can',
      },
      {
        '@type': 'HowToTool',
        name: 'Measuring Tape',
      },
    ],
    step: guide.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image ? (step.image.startsWith('http') ? step.image : `${baseUrl}${step.image}`) : undefined,
    })),
    author: {
      '@type': 'Organization',
      name: 'Savaj Seeds',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Savaj Seeds',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
      },
    },
    inLanguage: 'en-IN',
    about: {
      '@type': 'Thing',
      name: 'Agriculture',
    },
  }
}

// Event Schema for agricultural events and workshops
export function generateEventSchema(event: {
  name: string
  description: string
  startDate: string
  endDate: string
  location: {
    name: string
    address: string
    city: string
    state: string
  }
  image?: string
  offers?: {
    price: string
    currency: string
    availability: string
  }
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://savajseeds.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: event.location.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.location.address,
        addressLocality: event.location.city,
        addressRegion: event.location.state,
        addressCountry: 'IN',
      },
    },
    image: event.image ? (event.image.startsWith('http') ? event.image : `${baseUrl}${event.image}`) : `${baseUrl}/images/logo.png`,
    organizer: {
      '@type': 'Organization',
      name: 'Savaj Seeds',
      url: baseUrl,
    },
    offers: event.offers ? {
      '@type': 'Offer',
      price: event.offers.price,
      priceCurrency: event.offers.currency,
      availability: event.offers.availability,
      url: `${baseUrl}/events/${event.name.toLowerCase().replace(/\s+/g, '-')}`,
    } : undefined,
    performer: {
      '@type': 'Organization',
      name: 'Savaj Seeds Agricultural Experts',
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Farmers and Agricultural Professionals',
    },
    inLanguage: ['en-IN', 'hi-IN', 'gu-IN'],
  }
}