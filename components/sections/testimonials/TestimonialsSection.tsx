"use client"

import { useState, useEffect } from 'react';
import { TestimonialsCarousel } from '@/components/sections/testimonials/TestimonialsCarousel';
import { Button } from '@/components/ui/button';
import { Testimonial } from '@/lib/types/testimonials';
import Link from 'next/link';
import { ArrowRight, Users } from 'lucide-react';

interface TestimonialsSectionProps {
  showFeaturedOnly?: boolean;
  limit?: number;
  showViewAllButton?: boolean;
  className?: string;
}

export function TestimonialsSection({
  showFeaturedOnly = true,
  limit = 5,
  showViewAllButton = true,
  className
}: TestimonialsSectionProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, [showFeaturedOnly, limit]);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (showFeaturedOnly) params.append('featured', 'true');
      if (limit) params.append('limit', limit.toString());

      const response = await fetch(`/api/testimonials?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setTestimonials(data.data);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className={`py-20 md:py-28 lg:py-32 ${className || ''}`}>
        <div className="container">
          <div className="animate-pulse space-y-8">
            <div className="text-center space-y-4">
              <div className="h-12 bg-muted rounded w-1/2 mx-auto"></div>
              <div className="h-6 bg-muted rounded w-2/3 mx-auto"></div>
            </div>
            <div className="h-96 bg-muted rounded-lg"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!testimonials.length) {
    return null;
  }

  return (
    <section className={`py-20 md:py-28 lg:py-32 bg-muted/30 ${className || ''}`}>
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-16 animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
            <Users className="w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance leading-tight">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-light">
            Hear from farmers and gardeners who have transformed their harvests with Savaj Seeds.
          </p>
        </div>

        <div className="animate-in fade-in-50 slide-in-from-bottom-6 duration-700 delay-200">
          <TestimonialsCarousel
            testimonials={testimonials}
            autoPlay={true}
            autoPlayInterval={6000}
          />
        </div>

        {showViewAllButton && (
          <div className="text-center mt-12 animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-400">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="hover:scale-105 transition-all duration-300 hover:shadow-lg"
            >
              <Link href="/testimonials" className="inline-flex items-center gap-2">
                View All Testimonials
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}