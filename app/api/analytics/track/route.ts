import { NextRequest, NextResponse } from 'next/server'

// Analytics tracking endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data, timestamp } = body

    // Get client information
    const userAgent = request.headers.get('user-agent') || ''
    const referer = request.headers.get('referer') || ''
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'

    // Create analytics record
    const analyticsRecord = {
      type,
      data,
      timestamp: timestamp || new Date().toISOString(),
      client_info: {
        user_agent: userAgent,
        referer,
        ip: ip.split(',')[0].trim(), // Get first IP if multiple
      },
      session_id: generateSessionId(request),
    }

    // In a real application, you would store this in a database
    // For now, we'll just log it and return success
    console.log('Analytics Event:', JSON.stringify(analyticsRecord, null, 2))

    // You could also send to external analytics services here
    // await sendToExternalAnalytics(analyticsRecord)

    return NextResponse.json({ 
      success: true, 
      message: 'Event tracked successfully' 
    })

  } catch (error) {
    console.error('Analytics tracking error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to track event' 
      },
      { status: 500 }
    )
  }
}

// Generate a session ID based on request headers
function generateSessionId(request: NextRequest): string {
  const userAgent = request.headers.get('user-agent') || ''
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown'
  
  // Simple session ID generation (in production, use a more robust method)
  const sessionData = `${ip}-${userAgent}-${new Date().toDateString()}`
  
  // Create a simple hash
  let hash = 0
  for (let i = 0; i < sessionData.length; i++) {
    const char = sessionData.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(36)
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