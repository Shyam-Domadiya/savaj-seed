"use client"

import { useEffect } from "react"
import { trackPerformance } from '@/lib/analytics'

interface PerformanceMetrics {
  pageLoadTime: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  cumulativeLayoutShift: number
  firstInputDelay: number
  timestamp: Date
  userAgent: string
  connectionType: string
}

interface PerformanceMonitorProps {
  onMetricsCollected?: (metrics: PerformanceMetrics) => void
  enableConsoleLogging?: boolean
  enableAnalytics?: boolean
}

export function PerformanceMonitor({
  onMetricsCollected,
  enableConsoleLogging = false,
  enableAnalytics = true,
}: PerformanceMonitorProps) {
  useEffect(() => {
    // Wait for page to fully load before collecting metrics
    const collectMetrics = () => {
      if (typeof window === 'undefined' || !window.performance) return

      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      const paint = performance.getEntriesByType('paint')
      
      let firstContentfulPaint = 0
      let largestContentfulPaint = 0
      let cumulativeLayoutShift = 0
      let firstInputDelay = 0

      // Get FCP
      const fcpEntry = paint.find(entry => entry.name === 'first-contentful-paint')
      if (fcpEntry) {
        firstContentfulPaint = fcpEntry.startTime
      }

      // Get LCP using PerformanceObserver
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const lastEntry = entries[entries.length - 1] as any
            if (lastEntry) {
              largestContentfulPaint = lastEntry.startTime
            }
          })
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

          // Get CLS
          const clsObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries() as any[]) {
              if (!entry.hadRecentInput) {
                cumulativeLayoutShift += entry.value
              }
            }
          })
          clsObserver.observe({ entryTypes: ['layout-shift'] })

          // Get FID
          const fidObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries() as any[]) {
              firstInputDelay = entry.processingStart - entry.startTime
            }
          })
          fidObserver.observe({ entryTypes: ['first-input'] })

          // Disconnect observers after 10 seconds
          setTimeout(() => {
            lcpObserver.disconnect()
            clsObserver.disconnect()
            fidObserver.disconnect()
          }, 10000)
        } catch (error) {
          console.warn('PerformanceObserver not fully supported:', error)
        }
      }

      // Get connection info
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
      const connectionType = connection ? `${connection.effectiveType || 'unknown'} (${connection.downlink || 'unknown'}Mbps)` : 'unknown'

      const metrics: PerformanceMetrics = {
        pageLoadTime: navigation.loadEventEnd - navigation.navigationStart,
        firstContentfulPaint,
        largestContentfulPaint,
        cumulativeLayoutShift,
        firstInputDelay,
        timestamp: new Date(),
        userAgent: navigator.userAgent,
        connectionType,
      }

      // Log to console if enabled
      if (enableConsoleLogging) {
        console.group('🚀 Performance Metrics')
        console.log('Page Load Time:', `${metrics.pageLoadTime.toFixed(2)}ms`)
        console.log('First Contentful Paint:', `${metrics.firstContentfulPaint.toFixed(2)}ms`)
        console.log('Largest Contentful Paint:', `${metrics.largestContentfulPaint.toFixed(2)}ms`)
        console.log('Cumulative Layout Shift:', metrics.cumulativeLayoutShift.toFixed(4))
        console.log('First Input Delay:', `${metrics.firstInputDelay.toFixed(2)}ms`)
        console.log('Connection:', metrics.connectionType)
        console.groupEnd()
      }

      // Send to analytics if enabled
      if (enableAnalytics) {
        trackPerformance({
          page_load_time: metrics.pageLoadTime,
          first_contentful_paint: metrics.firstContentfulPaint,
          largest_contentful_paint: metrics.largestContentfulPaint,
          cumulative_layout_shift: metrics.cumulativeLayoutShift,
          first_input_delay: metrics.firstInputDelay,
          page_path: window.location.pathname,
        })
      }

      // Call custom callback
      onMetricsCollected?.(metrics)
    }

    // Collect metrics after page load
    if (document.readyState === 'complete') {
      setTimeout(collectMetrics, 1000) // Wait 1 second after load
    } else {
      window.addEventListener('load', () => {
        setTimeout(collectMetrics, 1000)
      })
    }

    // Also collect metrics on page visibility change (when user returns to tab)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setTimeout(collectMetrics, 500)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [onMetricsCollected, enableConsoleLogging, enableAnalytics])

  // This component doesn't render anything
  return null
}