import { Metadata } from 'next';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { TestimonialsSection } from '@/components/sections/testimonials/TestimonialsSection';
import { Breadcrumb } from '@/components/shared/breadcrumb';

export const metadata: Metadata = {
  title: 'Customer Testimonials - Savaj Seeds',
  description: 'Read what our customers say about Savaj Seeds. Real reviews and testimonials from farmers and gardeners who trust our quality seeds.',
};

export default function TestimonialsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="container py-8">
          <Breadcrumb />
        </div>

        <section className="py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance leading-tight">
                Customer Testimonials
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                Discover why thousands of farmers and gardeners trust Savaj Seeds for their growing success.
              </p>
            </div>
          </div>
        </section>

        <TestimonialsSection
          showFeaturedOnly={false}
          limit={20}
          showViewAllButton={false}
          className="py-0"
        />
      </main>

      <SiteFooter />
    </div>
  );
}