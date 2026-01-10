import { NextRequest, NextResponse } from 'next/server';
import { mockTestimonials } from '@/lib/data/testimonials';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    let testimonials = mockTestimonials;

    // Filter by featured if requested
    if (featured === 'true') {
      testimonials = testimonials.filter(t => t.featured);
    }

    // Apply limit if specified
    if (limit) {
      const limitNum = parseInt(limit, 10);
      testimonials = testimonials.slice(0, limitNum);
    }

    return NextResponse.json({
      success: true,
      data: testimonials,
      total: testimonials.length,
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Basic validation
    const requiredFields = ['customerName', 'customerLocation', 'rating', 'testimonial', 'productUsed'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // In a real application, you would save to database
    const newTestimonial = {
      id: Date.now().toString(),
      customerName: body.customerName,
      customerImage: body.customerImage || '/placeholder-user.jpg',
      customerLocation: body.customerLocation,
      customerType: body.customerType || 'Individual',
      rating: body.rating,
      testimonial: body.testimonial,
      productUsed: body.productUsed,
      dateSubmitted: new Date(),
      verified: false,
      featured: false,
    };

    return NextResponse.json({
      success: true,
      data: newTestimonial,
      message: 'Testimonial submitted successfully',
    });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}