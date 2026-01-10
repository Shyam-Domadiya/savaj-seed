"use client"

import { useState } from "react"
import { ProductFilter } from "@/components/product/product-filter"
import { ProductComparison } from "@/components/product/product-comparison"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { sampleProducts } from "@/lib/data/products"
import { useProductFilter } from "@/hooks/use-product-filter"
import { Product } from "@/lib/types/product"

function ProductCard({
  product,
}: {
  product: Product
}) {
  return (
    <Card className="h-full hover:shadow-2xl transition-all duration-500 border-border/50 group hover:scale-105 hover:-translate-y-2 cursor-pointer">
      <CardHeader className="space-y-4">
        <div className="mb-4 aspect-video rounded-xl overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-500 relative">
          <img
            src={product.images[0]?.url || '/placeholder.jpg'}
            alt={product.images[0]?.altText || product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              variant="secondary"
              size="sm"
              className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 font-medium"
              asChild
            >
              <a href={`/products/${product.id}`}>
                View Details
              </a>
            </Button>
          </div>
        </div>
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300 leading-tight">
            {product.name}
          </CardTitle>
          <div className="flex flex-col gap-1">
            <Badge
              variant="secondary"
              className="shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300"
            >
              {product.category}
            </Badge>
            {product.featured && (
              <Badge className="shrink-0 bg-gradient-to-r from-primary to-accent text-xs">
                Featured
              </Badge>
            )}
          </div>
        </div>
        <CardDescription className="leading-relaxed text-[15px]">{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs font-normal">
            {product.difficultyLevel}
          </Badge>
          <Badge variant="outline" className="text-xs font-normal">
            {product.maturityTime}
          </Badge>
          {product.seasonality.slice(0, 2).map((season, index) => (
            <Badge key={index} variant="outline" className="text-xs font-normal">
              {season}
            </Badge>
          ))}
        </div>

      </CardContent>
    </Card>
  )
}

export function ProductsContent() {
  const [activeTab, setActiveTab] = useState("all")

  const {
    filters,
    sort,
    filteredProducts,
    filterStats,
    setFilters,
    setSort,
    clearFilters
  } = useProductFilter({
    products: sampleProducts
  })

  // Filter products by category for tabs
  const getProductsByCategory = (category: string) => {
    if (category === "all") return filteredProducts
    return filteredProducts.filter(product =>
      product.category.toLowerCase() === category.toLowerCase()
    )
  }

  const vegetableProducts = getProductsByCategory("vegetable")
  const cropProducts = getProductsByCategory("crop")
  const hybridProducts = getProductsByCategory("hybrid")

  return (
    <>
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 md:py-28 relative overflow-hidden animate-in fade-in duration-700">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center space-y-7 animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-100">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance leading-[1.1]">
              Our{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Seed Collection
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light">
              Discover premium quality seeds carefully selected and tested for optimal performance in diverse growing
              conditions.
            </p>
            <div className="flex items-center justify-center gap-4">
              <ProductComparison availableProducts={sampleProducts} />
              <div className="text-sm text-muted-foreground">
                {filterStats.filteredCount} of {filterStats.totalProducts} products
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filter Sidebar */}
            <div className="lg:col-span-1">
              <ProductFilter
                filters={filters}
                sort={sort}
                onFiltersChange={setFilters}
                onSortChange={setSort}
                onClearFilters={clearFilters}
              />
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex justify-center mb-16 animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
                  <TabsList className="grid w-full max-w-2xl grid-cols-4 h-12">
                    <TabsTrigger value="all" className="text-[15px] hover:scale-105 transition-transform duration-300">
                      All ({filteredProducts.length})
                    </TabsTrigger>
                    <TabsTrigger
                      value="vegetable"
                      className="text-[15px] hover:scale-105 transition-transform duration-300"
                    >
                      Vegetables ({vegetableProducts.length})
                    </TabsTrigger>
                    <TabsTrigger value="crop" className="text-[15px] hover:scale-105 transition-transform duration-300">
                      Crops ({cropProducts.length})
                    </TabsTrigger>
                    <TabsTrigger
                      value="hybrid"
                      className="text-[15px] hover:scale-105 transition-transform duration-300"
                    >
                      Hybrids ({hybridProducts.length})
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="all" className="space-y-8">
                  {filteredProducts.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                      {filteredProducts.map((product, index) => (
                        <div
                          key={product.id}
                          className="animate-in fade-in-50 slide-in-from-bottom-8 duration-700"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <ProductCard product={product} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">🔍</div>
                      <h3 className="text-xl font-semibold mb-2">No products found</h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your filters to see more results
                      </p>
                      <Button onClick={clearFilters} variant="outline">
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="vegetable">
                  {vegetableProducts.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                      {vegetableProducts.map((product, index) => (
                        <div
                          key={product.id}
                          className="animate-in fade-in-50 slide-in-from-bottom-8 duration-700"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <ProductCard product={product} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">🥬</div>
                      <h3 className="text-xl font-semibold mb-2">No vegetable seeds found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your filters to see vegetable products
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="crop">
                  {cropProducts.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                      {cropProducts.map((product, index) => (
                        <div
                          key={product.id}
                          className="animate-in fade-in-50 slide-in-from-bottom-8 duration-700"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <ProductCard product={product} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">🌾</div>
                      <h3 className="text-xl font-semibold mb-2">No crop seeds found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your filters to see crop products
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="hybrid">
                  {hybridProducts.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                      {hybridProducts.map((product, index) => (
                        <div
                          key={product.id}
                          className="animate-in fade-in-50 slide-in-from-bottom-8 duration-700"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <ProductCard product={product} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">🧬</div>
                      <h3 className="text-xl font-semibold mb-2">No hybrid seeds found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your filters to see hybrid products
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}