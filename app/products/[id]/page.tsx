import { notFound } from "next/navigation"
import Link from "next/link"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/common/breadcrumb"
import { ProductImageGallery } from "@/components/product/product-image-gallery"
import { ExpandableSection } from "@/components/common/expandable-section"
import { DownloadableResources } from "@/components/sections/downloadable-resources"
import { StructuredData } from "@/components/providers/structured-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { getProductById } from "@/lib/data/products"
import { generateMetadata as generateSEOMetadata, generateProductSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { Star, Download, Leaf, Clock, TrendingUp } from "lucide-react"
import { DownloadGuideButton } from "@/components/product/download-guide-button"

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params
  const product = getProductById(id)

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
  const product = getProductById(id)

  if (!product) {
    notFound()
  }

  const basicSpecs = product.specifications.filter(spec => spec.category === 'Basic')
  const growingSpecs = product.specifications.filter(spec => spec.category === 'Growing')
  const harvestSpecs = product.specifications.filter(spec => spec.category === 'Harvest')

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
    <div className="flex min-h-screen flex-col">
      <StructuredData data={[productSchema, breadcrumbSchema]} />
      <SiteHeader />

      <div className="container">
        <Breadcrumb />
      </div>

      <main className="flex-1">
        <section className="py-8 md:py-12">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Product Images */}
              <div className="space-y-4">
                <ProductImageGallery
                  images={product.images}
                  productName={product.name}
                />
              </div>

              {/* Product Information */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                        {product.name}
                      </h1>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{product.category}</Badge>
                        <Badge variant="outline">{product.subcategory}</Badge>
                        {product.featured && (
                          <Badge className="bg-gradient-to-r from-primary to-accent">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-muted-foreground">(4.8)</span>
                    </div>
                  </div>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Key Features */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                    <Clock className="h-4 w-4 text-primary" />
                    <div className="text-sm">
                      <div className="font-medium">{product.maturityTime}</div>
                      <div className="text-muted-foreground">Maturity</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <div className="text-sm">
                      <div className="font-medium">{product.yieldExpectation}</div>
                      <div className="text-muted-foreground">Yield</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                    <Leaf className="h-4 w-4 text-primary" />
                    <div className="text-sm">
                      <div className="font-medium">{product.difficultyLevel}</div>
                      <div className="text-muted-foreground">Difficulty</div>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                {product.certifications.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-semibold">Certifications</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline" className="text-green-700 border-green-200">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button size="lg" className="flex-1" asChild>
                    <Link href={`/contact?subject=Pricing Request: {product.name}`}>
                      Contact for Pricing
                    </Link>
                  </Button>
                  <DownloadGuideButton product={product} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Information Tabs */}
        <section className="py-8 md:py-12 bg-muted/30">
          <div className="container">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="growing">Growing Guide</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Description</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {product.longDescription}
                    </p>
                    <Separator />
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Planting Instructions</h4>
                        <p className="text-sm text-muted-foreground">
                          {product.plantingInstructions}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Care Instructions</h4>
                        <p className="text-sm text-muted-foreground">
                          {product.careInstructions}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specifications" className="mt-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {basicSpecs.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Basic Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {basicSpecs.map((spec) => (
                          <div key={spec.id} className="flex justify-between">
                            <span className="text-muted-foreground">{spec.name}</span>
                            <span className="font-medium">{spec.value}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}

                  {growingSpecs.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Growing Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {growingSpecs.map((spec) => (
                          <div key={spec.id} className="flex justify-between">
                            <span className="text-muted-foreground">{spec.name}</span>
                            <span className="font-medium">{spec.value}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}

                  {harvestSpecs.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Harvest Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {harvestSpecs.map((spec) => (
                          <div key={spec.id} className="flex justify-between">
                            <span className="text-muted-foreground">{spec.name}</span>
                            <span className="font-medium">{spec.value}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="growing" className="mt-6">
                <div className="space-y-6">
                  {/* Growing Guide Sections as Expandable Cards */}
                  {product.growingGuide.sections.map((section, index) => (
                    <ExpandableSection
                      key={section.id}
                      title={section.title}
                      defaultExpanded={index === 0}
                    >
                      <p className="text-muted-foreground leading-relaxed">
                        {section.content}
                      </p>
                    </ExpandableSection>
                  ))}

                  {/* Additional Care Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <ExpandableSection
                      title="Harvesting Tips"
                      description="Best practices for harvesting"
                    >
                      <p className="text-muted-foreground leading-relaxed">
                        {product.harvestingTips}
                      </p>
                    </ExpandableSection>

                    <ExpandableSection
                      title="Storage Guidance"
                      description="How to store your harvest"
                    >
                      <p className="text-muted-foreground leading-relaxed">
                        {product.storageGuidance}
                      </p>
                    </ExpandableSection>
                  </div>

                  {/* Downloadable Resources */}
                  <DownloadableResources
                    resources={product.downloadableResources}
                    className="mt-6"
                  />
                </div>
              </TabsContent>

              <TabsContent value="resources" className="mt-6">
                <DownloadableResources
                  resources={product.downloadableResources}
                />
              </TabsContent>

              <TabsContent value="nutrition" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Nutritional Information</CardTitle>
                    <CardDescription>
                      Nutritional content per 100g of fresh produce
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {product.nutritionalInfo ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center p-4 rounded-lg bg-muted/50">
                            <div className="text-2xl font-bold text-primary">
                              {product.nutritionalInfo.calories}
                            </div>
                            <div className="text-sm text-muted-foreground">Calories</div>
                          </div>
                          <div className="text-center p-4 rounded-lg bg-muted/50">
                            <div className="text-2xl font-bold text-primary">
                              {product.nutritionalInfo.protein}g
                            </div>
                            <div className="text-sm text-muted-foreground">Protein</div>
                          </div>
                          <div className="text-center p-4 rounded-lg bg-muted/50">
                            <div className="text-2xl font-bold text-primary">
                              {product.nutritionalInfo.carbohydrates}g
                            </div>
                            <div className="text-sm text-muted-foreground">Carbs</div>
                          </div>
                          <div className="text-center p-4 rounded-lg bg-muted/50">
                            <div className="text-2xl font-bold text-primary">
                              {product.nutritionalInfo.fiber}g
                            </div>
                            <div className="text-sm text-muted-foreground">Fiber</div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Key Vitamins & Minerals</h4>
                          <div className="flex flex-wrap gap-2">
                            {product.nutritionalInfo.vitamins.map((vitamin, index) => (
                              <Badge key={index} variant="outline">
                                {vitamin}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">
                        Nutritional information not available for this product.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}