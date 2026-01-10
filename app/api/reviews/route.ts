import { NextRequest, NextResponse } from 'next/server';
import { mockProductReviews } from '@/lib/data/testimonials';
import { ReviewSummary } from '@/lib/types/testimonials';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const limit = searchParams.get('limit');

    let reviews = mockProductReviews;

    // Filter by product ID if specified
    if (productId) {
      reviews = reviews.filter(r => r.productId === productId);
    }

    // Apply limit if specified
    if (limit) {
      const limitNum = parseInt(limit, 10);
      reviews = reviews.slice(0, limitNum);
    }

    // Calculate review summary
    const summary: ReviewSummary = {
      averageRating: reviews.length > 0 
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
        : 0,
      totalReviews: reviews.length,
      ratingDistribution: {
        5: reviews.filter(r => r.rating === 5).length,
        4: reviews.filter(r => r.rating === 4).length,
        3: reviews.filter(r => r.rating === 3).length,
        2: reviews.filter(r => r.rating === 2).length,
        1: reviews.filter(r => r.rating === 1).length,
      },
    };

    return NextResponse.json({
      success: true,
      data: reviews,
      summary,
      total: reviews.length,
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Basic validation
    const requiredFields = ['productId', 'customerName', 'customerEmail', 'rating', 'title', 'review'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // In a real application, you would save to database
    const newReview = {
      id: Date.now().toString(),
      productId: body.productId,
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      rating: body.rating,
      title: body.title,
      review: body.review,
      verified: false,
      helpful: 0,
      dateSubmitted: new Date(),
    };

    return NextResponse.json({
      success: true,
      data: newReview,
      message: 'Review submitted successfully',
    });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create review' },
      { status: 500 }
    );
  }
}