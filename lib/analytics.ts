// Analytics and tracking utilities
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
    fbq: (...args: any[]) => void
    _linkedin_partner_id: string
    lintrk: (...args: any[]) => void
  }
}

// Google Analytics 4 Configuration
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX'

// Facebook Pixel Configuration
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '000000000000000'

// LinkedIn Insight Tag Configuration
export const LINKEDIN_PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID || '0000000'

// Analytics Events
export interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
  custom_parameters?: Record<string, any>
}

// Contact Form Events
export interface ContactFormEvent {
  form_type: 'contact' | 'newsletter' | 'quote_request'
  form_location: string
  user_type?: 'new' | 'returning'
}

// Product Events
export interface ProductEvent {
  product_id: string
  product_name: string
  product_category: string
  action: 'view' | 'download_guide' | 'contact_inquiry'
  value?: number
}

// Performance Events
export interface PerformanceEvent {
  page_load_time: number
  first_contentful_paint: number
  largest_contentful_paint: number
  cumulative_layout_shift: number
  first_input_delay: number
  page_path: string
}

// Initialize Google Analytics 4
export const initGA = () => {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return

  // Load gtag script
  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  script.async = true
  document.head.appendChild(script)

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }

  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
    send_page_view: true,
    // Enhanced ecommerce and conversion tracking
    allow_enhanced_conversions: true,
    allow_google_signals: true,
    // Privacy settings
    anonymize_ip: true,
    respect_dnt: true,
  })

  // Set user properties
  window.gtag('config', GA_MEASUREMENT_ID, {
    custom_map: {
      dimension1: 'user_type',
      dimension2: 'page_category',
      dimension3: 'content_group',
    },
  })
}

// Initialize Google Tag Manager
export const initGTM = () => {
  if (typeof window === 'undefined' || !GTM_ID) return

  // GTM script
  const script = document.createElement('script')
  script.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${GTM_ID}');
  `
  document.head.appendChild(script)

  // GTM noscript fallback
  const noscript = document.createElement('noscript')
  noscript.innerHTML = `
    <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
    height="0" width="0" style="display:none;visibility:hidden"></iframe>
  `
  document.body.appendChild(noscript)
}

// Initialize Facebook Pixel
export const initFacebookPixel = () => {
  if (typeof window === 'undefined' || !FB_PIXEL_ID) return

  window.fbq = window.fbq || function() {
    (window.fbq.q = window.fbq.q || []).push(arguments)
  }
  
  const script = document.createElement('script')
  script.src = 'https://connect.facebook.net/en_US/fbevents.js'
  script.async = true
  document.head.appendChild(script)

  window.fbq('init', FB_PIXEL_ID)
  window.fbq('track', 'PageView')
}

// Initialize LinkedIn Insight Tag
export const initLinkedInInsight = () => {
  if (typeof window === 'undefined' || !LINKEDIN_PARTNER_ID) return

  window._linkedin_partner_id = LINKEDIN_PARTNER_ID
  window.lintrk = window.lintrk || function() {
    (window.lintrk.q = window.lintrk.q || []).push(arguments)
  }

  const script = document.createElement('script')
  script.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js'
  script.async = true
  document.head.appendChild(script)
}

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window === 'undefined') return

  // Google Analytics 4
  if (window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title: title || document.title,
      page_location: url,
    })
  }

  // Facebook Pixel
  if (window.fbq) {
    window.fbq('track', 'PageView')
  }

  // LinkedIn Insight
  if (window.lintrk) {
    window.lintrk('track', { conversion_id: 'pageview' })
  }
}

// Track custom events
export const trackEvent = (event: AnalyticsEvent) => {
  if (typeof window === 'undefined') return

  const { action, category, label, value, custom_parameters } = event

  // Google Analytics 4
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...custom_parameters,
    })
  }

  // Facebook Pixel
  if (window.fbq) {
    window.fbq('trackCustom', action, {
      category,
      label,
      value,
      ...custom_parameters,
    })
  }

  // Send to custom analytics API
  sendToAnalyticsAPI('event', {
    action,
    category,
    label,
    value,
    custom_parameters,
    timestamp: new Date().toISOString(),
    page_url: window.location.href,
    user_agent: navigator.userAgent,
  })
}

// Track contact form submissions
export const trackContactForm = (event: ContactFormEvent) => {
  trackEvent({
    action: 'form_submission',
    category: 'contact',
    label: event.form_type,
    custom_parameters: {
      form_location: event.form_location,
      user_type: event.user_type,
    },
  })

  // Facebook Pixel conversion
  if (window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: event.form_type,
      content_category: 'contact_form',
    })
  }

  // LinkedIn conversion
  if (window.lintrk) {
    window.lintrk('track', { conversion_id: 'lead_generation' })
  }
}

// Track product interactions
export const trackProduct = (event: ProductEvent) => {
  trackEvent({
    action: event.action,
    category: 'product',
    label: event.product_name,
    value: event.value,
    custom_parameters: {
      product_id: event.product_id,
      product_category: event.product_category,
    },
  })

  // Enhanced ecommerce for GA4
  if (window.gtag && event.action === 'view') {
    window.gtag('event', 'view_item', {
      currency: 'INR',
      value: event.value || 0,
      items: [
        {
          item_id: event.product_id,
          item_name: event.product_name,
          item_category: event.product_category,
          quantity: 1,
        },
      ],
    })
  }
}

// Track performance metrics
export const trackPerformance = (metrics: PerformanceEvent) => {
  trackEvent({
    action: 'page_performance',
    category: 'performance',
    label: metrics.page_path,
    custom_parameters: {
      page_load_time: Math.round(metrics.page_load_time),
      first_contentful_paint: Math.round(metrics.first_contentful_paint),
      largest_contentful_paint: Math.round(metrics.largest_contentful_paint),
      cumulative_layout_shift: Math.round(metrics.cumulative_layout_shift * 1000) / 1000,
      first_input_delay: Math.round(metrics.first_input_delay),
    },
  })
}

// Track downloads
export const trackDownload = (fileName: string, fileType: string, category: string = 'download') => {
  trackEvent({
    action: 'file_download',
    category,
    label: fileName,
    custom_parameters: {
      file_type: fileType,
      file_name: fileName,
    },
  })

  // Facebook Pixel
  if (window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: fileName,
      content_type: fileType,
      content_category: category,
    })
  }
}

// Track search queries
export const trackSearch = (query: string, results_count: number) => {
  trackEvent({
    action: 'search',
    category: 'site_search',
    label: query,
    value: results_count,
    custom_parameters: {
      search_term: query,
      results_count,
    },
  })

  // GA4 search event
  if (window.gtag) {
    window.gtag('event', 'search', {
      search_term: query,
      results_count,
    })
  }
}

// Track scroll depth
export const trackScrollDepth = (depth: number, page_path: string) => {
  trackEvent({
    action: 'scroll_depth',
    category: 'engagement',
    label: `${depth}%`,
    value: depth,
    custom_parameters: {
      page_path,
      scroll_depth: depth,
    },
  })
}

// Track time on page
export const trackTimeOnPage = (seconds: number, page_path: string) => {
  trackEvent({
    action: 'time_on_page',
    category: 'engagement',
    label: page_path,
    value: seconds,
    custom_parameters: {
      time_seconds: seconds,
      page_path,
    },
  })
}

// Send data to custom analytics API
const sendToAnalyticsAPI = async (type: string, data: any) => {
  try {
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        data,
        timestamp: new Date().toISOString(),
      }),
    })
  } catch (error) {
    // Silently fail - analytics should not break the user experience
    console.debug('Analytics API error:', error)
  }
}

// Initialize all analytics services
export const initAnalytics = () => {
  if (typeof window === 'undefined') return

  // Only initialize in production or when explicitly enabled
  const isProduction = process.env.NODE_ENV === 'production'
  const forceAnalytics = process.env.NEXT_PUBLIC_FORCE_ANALYTICS === 'true'

  if (!isProduction && !forceAnalytics) {
    console.debug('Analytics disabled in development mode')
    return
  }

  // Initialize services
  initGA()
  initGTM()
  initFacebookPixel()
  initLinkedInInsight()

  // Track initial page view
  trackPageView(window.location.href, document.title)

  console.debug('Analytics initialized')
}

// Consent management
export const setAnalyticsConsent = (consent: {
  analytics: boolean
  marketing: boolean
  functional: boolean
}) => {
  if (typeof window === 'undefined') return

  // Update Google Analytics consent
  if (window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: consent.analytics ? 'granted' : 'denied',
      ad_storage: consent.marketing ? 'granted' : 'denied',
      functionality_storage: consent.functional ? 'granted' : 'denied',
      personalization_storage: consent.marketing ? 'granted' : 'denied',
    })
  }

  // Store consent preferences
  localStorage.setItem('analytics_consent', JSON.stringify(consent))
}

// Get consent preferences
export const getAnalyticsConsent = () => {
  if (typeof window === 'undefined') return null

  try {
    const consent = localStorage.getItem('analytics_consent')
    return consent ? JSON.parse(consent) : null
  } catch {
    return null
  }
}