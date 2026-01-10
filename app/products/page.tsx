import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/common/breadcrumb"
import { ProductsContent } from "@/components/product/products-content"
import { StructuredData } from "@/components/providers/structured-data"
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from "@/lib/seo"

export const metadata = generateSEOMetadata({
  title: "Premium Quality Seeds - Vegetable, Crop & Hybrid Seeds",
  description: "Explore our comprehensive range of premium vegetable seeds, crop seeds, and hybrid varieties for optimal farming success. High-yielding, disease-resistant seeds for every season.",
  keywords: [
    "vegetable seeds", "crop seeds", "hybrid seeds", "organic seeds", "seasonal seeds",
    "tomato seeds", "cucumber seeds", "pepper seeds", "wheat seeds", "rice seeds",
    "high yield seeds", "disease resistant seeds", "drought tolerant seeds",
    "premium quality seeds", "certified seeds", "agricultural products"
  ],
  url: "/products",
  type: "website",
})

export default function ProductsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
  ])

  return (
    <div className="flex min-h-screen flex-col">
      <StructuredData data={breadcrumbSchema} />
      <SiteHeader />

      <div className="container">
        <Breadcrumb />
      </div>

      <main className="flex-1">
        <ProductsContent />

        <section className="py-20 md:py-28 bg-muted/40">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center space-y-7 animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
              <h2 className="text-4xl md:text-5xl font-bold text-balance leading-tight">
                {"Can't Find What You're Looking For?"}
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-light">
                Our team is here to help you find the perfect seeds for your specific needs and growing conditions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Contact Our Experts
                </a>
                <a
                  href="/search"
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Search Products
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}