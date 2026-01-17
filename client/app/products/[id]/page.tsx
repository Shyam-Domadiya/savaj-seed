// ... (keeping imports)
import { notFound } from "next/navigation"
import Link from "next/link"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/shared/breadcrumb"
import { ProductImageGallery } from "@/components/features/product/product-image-gallery"
import { ProductReviews } from "@/components/features/product/product-reviews"
import { ExpandableSection } from "@/components/shared/expandable-section"
import { DownloadableResources } from "@/components/sections/resources/DownloadableResources"
import { StructuredData } from "@/components/providers/structured-data"
import PageTransition from "@/components/layout/page-transition"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { getProductById } from "@/lib/actions/product"
import { generateMetadata as generateSEOMetadata, generateProductSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { Star, Download, Leaf, Clock, TrendingUp, Sprout, Wheat, Dna, Package } from "lucide-react"
import { DownloadGuideButton } from "@/components/features/product/download-guide-button"
import { ProductQRCode } from "@/components/features/product/product-qr"

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    return {
      title: "Product Not Found - Savaj Seeds",
      description: "The requested product could not be found.",
    }
  }

  return generateSEOMetadata({
    title: product.seoMetadata.title,
    description: product.seoMetadata.description,
    keywords: product.seoMetadata.keywords,
    url: `/products/${id}`,
    type: 'website',
    image: product.images[0]?.url || '/images/logo.png',
  })
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    notFound()
  }

  const basicSpecs = product.specifications.filter(spec => spec.category === 'Basic')
  const growingSpecs = product.specifications.filter(spec => spec.category === 'Growing')
  const harvestSpecs = product.specifications.filter(spec => spec.category === 'Harvest')

  // Visual Logic (Same as Card)
  const getCategoryVisuals = (category: string) => {
    const lowerCat = category.toLowerCase();
    if (lowerCat.includes('vegetable')) {
      return {
        gradient: "bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/40 dark:to-emerald-900/40",
        accent: "text-emerald-600 bg-emerald-100/50 border-emerald-200",
        icon: Sprout,
        iconColor: "text-emerald-600"
      };
    } else if (lowerCat.includes('crop')) {
      return {
        gradient: "bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-950/40 dark:to-yellow-900/40",
        accent: "text-amber-600 bg-amber-100/50 border-amber-200",
        icon: Wheat,
        iconColor: "text-amber-600"
      };
    } else if (lowerCat.includes('hybrid')) {
      return {
        gradient: "bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950/40 dark:to-pink-900/40",
        accent: "text-purple-600 bg-purple-100/50 border-purple-200",
        icon: Dna,
        iconColor: "text-purple-600"
      };
    }
    return {
      gradient: "bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-950/40 dark:to-slate-900/40",
      accent: "text-gray-600 bg-gray-100/50 border-gray-200",
      icon: Leaf,
      iconColor: "text-gray-600"
    };
  };

  const visuals = getCategoryVisuals(product.category);
  const CategoryIcon = visuals.icon;

  // Generate structured data for the product
  const productSchema = generateProductSchema({
    name: product.name,
    description: product.description,
    image: product.images[0]?.url || '/images/logo.png',
    category: product.category,
    brand: 'Savaj Seeds',
    sku: product.id,
    availability: product.availability ? 'InStock' : 'OutOfStock',
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: product.name, url: `/products/${id}` },
  ])

  return (
    <div className="flex min-h-screen flex-col bg-muted/10">
      <StructuredData data={[productSchema, breadcrumbSchema]} />
      <SiteHeader />

      <div className="container py-6">
        <Breadcrumb />
      </div>

      <main className="flex-1 container pb-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Visual Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`aspect-square sm:aspect-[4/3] lg:aspect-square relative rounded-3xl overflow-hidden shadow-xl border border-border/50 ${visuals.gradient} flex items-center justify-center group`}>
              {product.images?.[0]?.url ? (
                <ProductImageGallery images={product.images} productName={product.name} />
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-8 transition-transform duration-700 group-hover:scale-105">
                  <div className={`h-32 w-32 rounded-full bg-white/60 dark:bg-black/20 backdrop-blur-md flex items-center justify-center shadow-lg mb-6 ${visuals.iconColor}`}>
                    <CategoryIcon className="h-16 w-16" />
                  </div>
                  <h2 className={`text-4xl font-black tracking-tight ${visuals.iconColor} opacity-90`}>
                    {product.category}
                  </h2>
                  <p className="text-muted-foreground font-medium uppercase tracking-widest mt-2 text-sm">premium series</p>
                </div>
              )}
            </div>

            {/* QR Code for Desktop (Hidden on mobile) */}
            <div className="hidden lg:flex justify-end -mt-10 relative z-10 px-4">
              <ProductQRCode url={`https://savajseeds.com/products/${id}`} productName={product.name} />
            </div>

            {/* Quick stats for Mobile/Tablet (Stacked below image) */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card p-4 rounded-xl border border-border/50 shadow-sm flex flex-col justify-center items-center text-center">
                <Clock className="h-6 w-6 text-primary mb-2" />
                <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Maturity</span>
                <span className="font-semibold">{product.maturityTime}</span>
              </div>
              <div className="bg-card p-4 rounded-xl border border-border/50 shadow-sm flex flex-col justify-center items-center text-center">
                <Leaf className="h-6 w-6 text-primary mb-2" />
                <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Type</span>
                <span className="font-semibold">{product.category}</span>
              </div>
            </div>
          </div>

          {/* Info Column (Card Style) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-card rounded-3xl p-6 md:p-10 shadow-lg border border-border/50 relative overflow-hidden">
              <div className={`absolute top-0 right-0 p-6 opacity-10 -rotate-12 transform translate-x-4 -translate-y-4 pointer-events-none`}>
                <CategoryIcon className="h-48 w-48 text-primary" />
              </div>

              {/* Header info */}
              <div className="relative z-10 space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className={`px-3 py-1 text-sm font-medium ${visuals.accent}`}>
                      {product.subcategory !== 'General' ? product.subcategory : product.category}
                    </Badge>
                    {product.featured && (
                      <Badge className="bg-gradient-to-r from-primary to-accent text-white border-0 shadow-sm">
                        Featured Collection
                      </Badge>
                    )}
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
                    {product.name}
                  </h1>

                </div>


                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" className="h-14 px-8 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105 bg-primary text-primary-foreground flex-1" asChild>
                    <Link href={`/contact?subject=Order Request for ${product.name}`}>
                      Request Quote / Order
                    </Link>
                  </Button>
                  <DownloadGuideButton product={product} />
                </div>
              </div>
            </div>

            {/* Specifications Section (Directly visible, no tabs) */}
            <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader><CardTitle>Traits & Characteristics</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    {basicSpecs.map(spec => (
                      <div key={spec.id} className="grid grid-cols-2 gap-4 py-2 border-b border-border/40 last:border-0">
                        <span className="text-muted-foreground font-medium text-sm">{spec.name}</span>
                        <span className="font-semibold text-sm text-right capitalize">{spec.value}</span>
                      </div>
                    ))}
                    {product.seasonality && (
                      <div className="grid grid-cols-2 gap-4 py-2 border-b border-border/40 last:border-0">
                        <span className="text-muted-foreground font-medium text-sm">Season</span>
                        <div className="flex flex-wrap justify-end gap-1">
                          {product.seasonality.map(s => <span key={s} className="text-xs bg-muted px-2 py-1 rounded capitalize">{s}</span>)}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle>Cultivation Specs</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 py-2 border-b border-border/40">
                      <span className="text-muted-foreground font-medium text-sm">Maturity Time</span>
                      <span className="font-semibold text-sm text-right capitalize">{product.maturityTime}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 py-2 border-b border-border/40">
                      <span className="text-muted-foreground font-medium text-sm">Yield Potential</span>
                      <span className="font-semibold text-sm text-right capitalize">{product.yieldExpectation}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
