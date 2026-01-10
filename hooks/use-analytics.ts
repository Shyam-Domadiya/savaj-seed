'use client'

import { useCallback, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import {
  trackEvent,
  trackContactForm,
  trackProduct,
  trackDownload,
  trackSearch,
  trackScrollDepth,
  trackTimeOnPage,
  type AnalyticsEvent,
  type ContactFormEvent,
  type ProductEvent,
} from '@/lib/analytics'

export function useAnalytics() {
  const pathname = usePathname()
  const startTimeRef = useRef<number>(Date.now())
  const scrollDepthRef = useRef<number>(0)
  const hasTrackedScrollRef = useRef<Set<number>>(new Set())

  // Reset tracking data on route change
  useEffect(() => {
    startTimeRef.current = Date.now()
    scrollDepthRef.current = 0
    hasTrackedScrollRef.current.clear()
  }, [pathname])

  // Track time on page when component unmounts or route changes
  useEffect(() => {
    return () => {
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000)
      if (timeSpent > 5) { // Only track if user spent more than 5 seconds
        trackTimeOnPage(timeSpent, pathname)
      }
    }
  }, [pathname])

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.round((scrollTop / documentHeight) * 100)

      // Track at 25%, 50%, 75%, and 100% scroll depths
      const milestones = [25, 50, 75, 100]
      
      for (const milestone of milestones) {
        if (scrollPercent >= milestone && !hasTrackedScrollRef.current.has(milestone)) {
          hasTrackedScrollRef.current.add(milestone)
          trackScrollDepth(milestone, pathname)
        }
      }

      scrollDepthRef.current = Math.max(scrollDepthRef.current, scrollPercent)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  // Analytics tracking functions
  const track = useCallback((event: AnalyticsEvent) => {
    trackEvent(event)
  }, [])

  const trackFormSubmission = useCallback((event: ContactFormEvent) => {
    trackContactForm(event)
  }, [])

  const trackProductInteraction = useCallback((event: ProductEvent) => {
    trackProduct(event)
  }, [])

  const trackFileDownload = useCallback((fileName: string, fileType: string, category?: string) => {
    trackDownload(fileName, fileType, category)
  }, [])

  const trackSiteSearch = useCallback((query: string, resultsCount: number) => {
    trackSearch(query, resultsCount)
  }, [])

  const trackButtonClick = useCallback((buttonName: string, location: string) => {
    track({
      action: 'button_click',
      category: 'engagement',
      label: buttonName,
      custom_parameters: {
        button_location: location,
        page_path: pathname,
      },
    })
  }, [track, pathname])

  const trackLinkClick = useCallback((linkText: string, linkUrl: string, isExternal: boolean = false) => {
    track({
      action: 'link_click',
      category: isExternal ? 'external_link' : 'internal_link',
      label: linkText,
      custom_parameters: {
        link_url: linkUrl,
        is_external: isExternal,
        page_path: pathname,
      },
    })
  }, [track, pathname])

  const trackVideoPlay = useCallback((videoTitle: string, videoDuration?: number) => {
    track({
      action: 'video_play',
      category: 'media',
      label: videoTitle,
      custom_parameters: {
        video_duration: videoDuration,
        page_path: pathname,
      },
    })
  }, [track, pathname])

  const trackError = useCallback((errorMessage: string, errorType: string) => {
    track({
      action: 'error',
      category: 'technical',
      label: errorType,
      custom_parameters: {
        error_message: errorMessage,
        page_path: pathname,
      },
    })
  }, [track, pathname])

  return {
    track,
    trackFormSubmission,
    trackProductInteraction,
    trackFileDownload,
    trackSiteSearch,
    trackButtonClick,
    trackLinkClick,
    trackVideoPlay,
    trackError,
  }
}

// Hook for tracking form interactions
export function useFormAnalytics(formType: string, formLocation: string) {
  const { trackFormSubmission, track } = useAnalytics()

  const trackFormStart = useCallback(() => {
    track({
      action: 'form_start',
      category: 'form_interaction',
      label: formType,
      custom_parameters: {
        form_location: formLocation,
      },
    })
  }, [track, formType, formLocation])

  const trackFormFieldFocus = useCallback((fieldName: string) => {
    track({
      action: 'form_field_focus',
      category: 'form_interaction',
      label: fieldName,
      custom_parameters: {
        form_type: formType,
        form_location: formLocation,
      },
    })
  }, [track, formType, formLocation])

  const trackFormSubmit = useCallback((userType?: 'new' | 'returning') => {
    trackFormSubmission({
      form_type: formType as any,
      form_location: formLocation,
      user_type: userType,
    })
  }, [trackFormSubmission, formType, formLocation])

  const trackFormError = useCallback((errorMessage: string, fieldName?: string) => {
    track({
      action: 'form_error',
      category: 'form_interaction',
      label: formType,
      custom_parameters: {
        error_message: errorMessage,
        field_name: fieldName,
        form_location: formLocation,
      },
    })
  }, [track, formType, formLocation])

  return {
    trackFormStart,
    trackFormFieldFocus,
    trackFormSubmit,
    trackFormError,
  }
}

// Hook for tracking e-commerce interactions
export function useEcommerceAnalytics() {
  const { trackProductInteraction } = useAnalytics()

  const trackProductView = useCallback((product: {
    id: string
    name: string
    category: string
    price?: number
  }) => {
    trackProductInteraction({
      product_id: product.id,
      product_name: product.name,
      product_category: product.category,
      action: 'view',
      value: product.price,
    })
  }, [trackProductInteraction])

  const trackProductInquiry = useCallback((product: {
    id: string
    name: string
    category: string
  }) => {
    trackProductInteraction({
      product_id: product.id,
      product_name: product.name,
      product_category: product.category,
      action: 'contact_inquiry',
    })
  }, [trackProductInteraction])

  const trackGuideDownload = useCallback((product: {
    id: string
    name: string
    category: string
  }) => {
    trackProductInteraction({
      product_id: product.id,
      product_name: product.name,
      product_category: product.category,
      action: 'download_guide',
    })
  }, [trackProductInteraction])

  return {
    trackProductView,
    trackProductInquiry,
    trackGuideDownload,
  }
}