"use client"

import Link from "next/link"
import { useState } from "react"
import { ProductFilter } from "@/components/features/product/product-filter"
import { ProductComparison } from "@/components/features/product/product-comparison"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
// import { sampleProducts } from "@/lib/data/products"
import { useProductFilter } from "@/components/features/product/hooks/use-product-filter"
import { Product } from "@/lib/types/product"

function ProductCard({
  product,
}: {
  product: Product
}) {
  // Determine placeholder gradient/icon based on category
  const getCategoryVisuals = (category: string) => {
    const lowerCat = category.toLowerCase();

    // Vegetables
    if (lowerCat.includes('vegetable')) {
      return {
        gradient: "bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-900/30 dark:to-emerald-800/30",
        icon: "🥬",
        color: "text-emerald-600 dark:text-emerald-400"
      };
    }

    // Cotton
    if (lowerCat.includes('cotton')) {
      return {
        gradient: "bg-gradient-to-br from-slate-100 to-gray-200 dark:from-slate-800/30 dark:to-gray-700/30",
        icon: "☁️",
        color: "text-slate-600 dark:text-slate-400"
      };
    }

    // Wheat
    if (lowerCat.includes('wheat')) {
      return {
        gradient: "bg-gradient-to-br from-amber-100 to-yellow-200 dark:from-amber-900/30 dark:to-yellow-800/30",
        icon: "🌾",
        color: "text-amber-600 dark:text-amber-400"
      };
    }

    // Groundnut
    if (lowerCat.includes('groundnut')) {
      return {
        gradient: "bg-gradient-to-br from-orange-100 to-amber-200 dark:from-orange-900/30 dark:to-amber-800/30",
        icon: "🥜",
        color: "text-orange-600 dark:text-orange-400"
      };
    }

    // Cumin / Sesame / Coriander (Spices)
    if (lowerCat.includes('cumin') || lowerCat.includes('sesame') || lowerCat.includes('coriander')) {
      return {
        gradient: "bg-gradient-to-br from-yellow-100 to-orange-200 dark:from-yellow-900/30 dark:to-orange-800/30",
        icon: "🧂",
        color: "text-yellow-600 dark:text-yellow-400"
      };
    }

    // Castor
    if (lowerCat.includes('castor')) {
      return {
        gradient: "bg-gradient-to-br from-lime-100 to-green-200 dark:from-lime-900/30 dark:to-green-800/30",
        icon: "🌿",
        color: "text-lime-600 dark:text-lime-400"
      };
    }

    // Maize / Millet
    if (lowerCat.includes('maize') || lowerCat.includes('millet')) {
      return {
        gradient: "bg-gradient-to-br from-yellow-100 to-amber-200 dark:from-yellow-900/30 dark:to-amber-800/30",
        icon: "🌽",
        color: "text-yellow-600 dark:text-yellow-400"
      };
    }

    // Default / Crop
    return {
      gradient: "bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-800/30 dark:to-stone-700/30",
      icon: "🌱",
      color: "text-stone-600 dark:text-stone-400"
    };
  };

  const visuals = getCategoryVisuals(product.category);

  return (
    <Link href={`/products/${product.id}`} className="block h-full group">
      <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 border-border/50 hover:-translate-y-1 cursor-pointer overflow-hidden bg-card">
        {/* Image / Visual Header */}
        <div className={`relative aspect-[4/3] w-full overflow-hidden ${visuals.gradient} flex items-center justify-center`}>
          {product.images?.[0]?.url ? (
            <img
              src={product.images[0].url}
              alt={product.images[0].altText || product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-6 group-hover:scale-110 transition-transform duration-500">
              <span className="text-6xl mb-2 filter drop-shadow-sm">{visuals.icon}</span>
              <span className={`text-sm font-semibold uppercase tracking-wider ${visuals.color} opacity-80`}>
                {product.category}
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
            <span className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-3 shadow-lg translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              View Details
            </span>
          </div>

          {product.featured && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-primary/90 hover:bg-primary shadow-sm backdrop-blur-md">
                Featured
              </Badge>
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1 p-5 space-y-4">
          {/* Title & basic info */}
          <div>
            <div className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">
              {product.subcategory !== 'General' ? product.subcategory : product.category}
            </div>
            <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-200 text-balance">
              {product.name}
            </CardTitle>
          </div>

          {/* Excel Data Fields - Highlighted */}
          <div className="space-y-3 bg-muted/30 p-3 rounded-lg border border-border/50">
            {product.morphologicalCharacters && (
              <div className="space-y-1">
                <p className="text-sm leading-snug text-foreground/90 font-medium line-clamp-2" title={product.morphologicalCharacters}>
                  {product.morphologicalCharacters}
                </p>
              </div>
            )}

            {product.seedColor && (
              <div className="flex items-center gap-2 text-sm border-t border-border/40 pt-2 mt-2">
                <span className="text-muted-foreground text-xs font-medium">Color:</span>
                <span className="font-medium text-foreground">{product.seedColor}</span>
              </div>
            )}
          </div>

          <div className="mt-auto pt-2 flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-background/50">{product.seasonality[0]}</Badge>
            <Badge variant="outline" className="bg-background/50">{product.difficultyLevel}</Badge>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export function ProductsContent({ initialProducts }: { initialProducts: Product[] }) {
  const {
    filters,
    sort,
    filteredProducts,
    filterStats,
    setFilters,
    setSort,
    clearFilters
  } = useProductFilter({
    products: initialProducts
  })

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
              <ProductComparison availableProducts={initialProducts} />
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
              <div className="space-y-8">
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}