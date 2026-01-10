import { NextRequest, NextResponse } from 'next/server'

// Performance metrics tracking endpoint
export async function POST(request: NextRequest) {
  try {
    const metrics = await request.json()

    // Validate required metrics
    const requiredFields = [
      'page_load_time',
      'first_contentful_paint',
      'largest_contentful_paint',
      'cumulative_layout_shift',
      'first_input_delay'
    ]

    for (const field of requiredFields) {
      if (typeof metrics[field] !== 'number') {
        return NextResponse.json(
          { 
            success: false, 
            error: `Missing or invalid field: ${field}` 
          },
          { status: 400 }
        )
      }
    }

    // Get client information
    const userAgent = request.headers.get('user-agent') || ''
    const referer = request.headers.get('referer') || ''
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'

    // Create performance record
    const performanceRecord = {
      ...metrics,
      timestamp: new Date().toISOString(),
      client_info: {
        user_agent: userAgent,
        referer,
        ip: ip.split(',')[0].trim(),
      },
      // Calculate performance score (similar to Lighthouse)
      performance_score: calculatePerformanceScore(metrics),
    }

    // Log performance data (in production, store in database)
    console.log('Performance Metrics:', JSON.stringify(performanceRecord, null, 2))

    // Check for performance issues and alert if necessary
    const issues = detectPerformanceIssues(metrics)
    if (issues.length > 0) {
      console.warn('Performance Issues Detected:', issues)
      // In production, you might want to send alerts or notifications
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Performance metrics recorded',
      performance_score: performanceRecord.performance_score,
      issues: issues.length > 0 ? issues : undefined
    })

  } catch (error) {
    console.error('Performance tracking error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to record performance metrics' 
      },
      { status: 500 }
    )
  }
}

// Calculate a performance score based on Core Web Vitals
function calculatePerformanceScore(metrics: any): number {
  const {
    first_contentful_paint: fcp,
    largest_contentful_paint: lcp,
    cumulative_layout_shift: cls,
    first_input_delay: fid
  } = metrics

  // Scoring based on Google's Core Web Vitals thresholds
  let score = 0

  // First Contentful Paint (0-40 points)
  if (fcp <= 1800) score += 40
  else if (fcp <= 3000) score += 20
  else score += 0

  // Largest Contentful Paint (0-25 points)
  if (lcp <= 2500) score += 25
  else if (lcp <= 4000) score += 15
  else score += 0

  // Cumulative Layout Shift (0-25 points)
  if (cls <= 0.1) score += 25
  else if (cls <= 0.25) score += 15
  else score += 0

  // First Input Delay (0-10 points)
  if (fid <= 100) score += 10
  else if (fid <= 300) score += 5
  else score += 0

  return Math.round(score)
}

// Detect performance issues
function detectPerformanceIssues(metrics: any): string[] {
  const issues: string[] = []

  if (metrics.first_contentful_paint > 3000) {
    issues.push('Slow First Contentful Paint (>3s)')
  }

  if (metrics.largest_contentful_paint > 4000) {
    issues.push('Slow Largest Contentful Paint (>4s)')
  }

  if (metrics.cumulative_layout_shift > 0.25) {
    issues.push('High Cumulative Layout Shift (>0.25)')
  }

  if (metrics.first_input_delay > 300) {
    issues.push('High First Input Delay (>300ms)')
  }

  if (metrics.page_load_time > 5000) {
    issues.push('Slow page load time (>5s)')
  }

  return issues
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}