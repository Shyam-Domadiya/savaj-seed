export interface Testimonial {
  id: string;
  customerName: string;
  customerImage: string;
  customerLocation: string;
  customerType: 'Individual' | 'Commercial' | 'Institutional';
  rating: number;
  testimonial: string;
  productUsed: string;
  dateSubmitted: Date;
  verified: boolean;
  featured: boolean;
}

export interface ProductReview {
  id: string;
  productId: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  title: string;
  review: string;
  verified: boolean;
  helpful: number;
  dateSubmitted: Date;
}

export interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}