"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Plus, Minus, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Product } from "@/lib/types/product"
import { cn } from "@/lib/utils"

interface ProductComparisonProps {
  availableProducts: Product[]
  className?: string
}

export function ProductComparison({ availableProducts, className }: ProductComparisonProps) {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const addProduct = (product: Product) => {
    if (selectedProducts.length < 3 && !selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product])
    }
  }

  const removeProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId))
  }

  const clearAll = () => {
    setSelectedProducts([])
  }

  const getComparisonRows = () => {
    if (selectedProducts.length === 0) return []

    const rows = [
      {
        label: 'Category',
        getValue: (product: Product) => product.category,
        type: 'badge' as const
      },
      {
        label: 'Subcategory',
        getValue: (product: Product) => product.subcategory,
        type: 'text' as const
      },
      {
        label: 'Difficulty Level',
        getValue: (product: Product) => product.difficultyLevel,
        type: 'badge' as const
      },
      {
        label: 'Maturity Time',
        getValue: (product: Product) => product.maturityTime,
        type: 'text' as const
      },
      {
        label: 'Expected Yield',
        getValue: (product: Product) => product.yieldExpectation,
        type: 'text' as const
      },
      {
        label: 'Seasonality',
        getValue: (product: Product) => product.seasonality.join(', '),
        type: 'text' as const
      },
      {
        label: 'Certifications',
        getValue: (product: Product) => product.certifications.join(', '),
        type: 'text' as const
      },
      {
        label: 'Availability',
        getValue: (product: Product) => product.availability ? 'Available' : 'Out of Stock',
        type: 'status' as const
      }
    ]

    return rows
  }

  return (
    <div className={className}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="relative">
            Compare Products
            {selectedProducts.length > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {selectedProducts.length}
              </Badge>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-6xl w-full h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Product Comparison
              {selectedProducts.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearAll}>
                  Clear All
                </Button>
              )}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-hidden">
            {selectedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center space-y-4">
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold">No products selected</h3>
                  <p className="text-muted-foreground">
                    Select up to 3 products to compare their features side by side
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl w-full">
                  {availableProducts.slice(0, 6).map(product => (
                    <Card key={product.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-2">
                          <div className="text-4xl">🌱</div>
                        </div>
                        <CardTitle className="text-sm">{product.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Button
                          size="sm"
                          className="w-full"
                          onClick={() => addProduct(product)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add to Compare
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <ScrollArea className="h-full">
                <div className="space-y-6">
                  {/* Product Headers */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedProducts.map(product => (
                      <Card key={product.id} className="relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 h-6 w-6 p-0"
                          onClick={() => removeProduct(product.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <CardHeader className="pb-2">
                          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-2">
                            {product.images.length > 0 ? (
                              <Image
                                src={product.images[0].url}
                                alt={product.images[0].altText}
                                fill
                                className="object-cover rounded-lg"
                              />
                            ) : (
                              <div className="text-4xl">🌱</div>
                            )}
                          </div>
                          <CardTitle className="text-lg">{product.name}</CardTitle>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {product.description}
                          </p>
                        </CardHeader>
                        <CardContent>
                          <Button asChild size="sm" className="w-full">
                            <a href={`/products/${product.id}`}>
                              View Details
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {/* Add more products slot */}
                    {selectedProducts.length < 3 && (
                      <Card className="border-dashed border-2 border-muted-foreground/25">
                        <CardContent className="flex flex-col items-center justify-center h-full min-h-[200px] space-y-4">
                          <div className="text-muted-foreground">
                            <Plus className="h-8 w-8" />
                          </div>
                          <div className="text-center space-y-2">
                            <p className="font-medium">Add another product</p>
                            <p className="text-sm text-muted-foreground">
                              Compare up to 3 products
                            </p>
                          </div>
                          <div className="grid grid-cols-1 gap-2 w-full">
                            {availableProducts
                              .filter(p => !selectedProducts.find(sp => sp.id === p.id))
                              .slice(0, 3)
                              .map(product => (
                                <Button
                                  key={product.id}
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addProduct(product)}
                                  className="justify-start text-left"
                                >
                                  <Plus className="h-3 w-3 mr-2" />
                                  {product.name}
                                </Button>
                              ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  <Separator />

                  {/* Comparison Table */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Feature Comparison</h3>
                    <div className="space-y-3">
                      {getComparisonRows().map((row, index) => (
                        <div key={index} className="grid grid-cols-4 gap-4 py-3 border-b border-border/50">
                          <div className="font-medium text-sm">
                            {row.label}
                          </div>
                          {selectedProducts.map(product => (
                            <div key={product.id} className="text-sm">
                              {row.type === 'badge' ? (
                                <Badge variant="secondary">
                                  {row.getValue(product)}
                                </Badge>
                              ) : row.type === 'status' ? (
                                <Badge 
                                  variant={product.availability ? "default" : "destructive"}
                                >
                                  {row.getValue(product)}
                                </Badge>
                              ) : (
                                <span className="text-muted-foreground">
                                  {row.getValue(product) || 'N/A'}
                                </span>
                              )}
                            </div>
                          ))}
                          {/* Empty cell for add product slot */}
                          {selectedProducts.length < 3 && (
                            <div className="text-muted-foreground text-sm">
                              -
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Specifications Comparison */}
                  {selectedProducts.length > 0 && selectedProducts[0].specifications.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Detailed Specifications</h3>
                      <div className="space-y-3">
                        {selectedProducts[0].specifications.map((spec, index) => (
                          <div key={spec.id} className="grid grid-cols-4 gap-4 py-3 border-b border-border/50">
                            <div className="font-medium text-sm">
                              {spec.name}
                            </div>
                            {selectedProducts.map(product => {
                              const productSpec = product.specifications.find(s => s.name === spec.name)
                              return (
                                <div key={product.id} className="text-sm text-muted-foreground">
                                  {productSpec?.value || 'N/A'}
                                </div>
                              )
                            })}
                            {selectedProducts.length < 3 && (
                              <div className="text-muted-foreground text-sm">
                                -
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}