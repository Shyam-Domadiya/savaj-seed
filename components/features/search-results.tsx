"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Sprout, FileText, ArrowRight, Package } from "lucide-react"
import { sampleProducts } from "@/lib/data/products"
import { BlogPost } from "@/lib/blog"
import Image from "next/image"

interface SearchResultsProps {
    initialPosts: BlogPost[]
}

export function SearchResults({ initialPosts }: SearchResultsProps) {
    const searchParams = useSearchParams()
    const initialQuery = searchParams.get("q") || ""
    const [query, setQuery] = useState(initialQuery)
    const [activeTab, setActiveTab] = useState("all")

    // Filter Products
    const filteredProducts = sampleProducts.filter(product => {
        const searchTerm = query.toLowerCase()
        return (
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        )
    })

    // Filter Blog Posts
    const filteredPosts = initialPosts.filter(post => {
        const searchTerm = query.toLowerCase()
        return (
            post.title.toLowerCase().includes(searchTerm) ||
            post.description.toLowerCase().includes(searchTerm)
        )
    })

    const totalResults = filteredProducts.length + filteredPosts.length

    useEffect(() => {
        setQuery(searchParams.get("q") || "")
    }, [searchParams])

    return (
        <div className="space-y-8">
            {/* Search Header */}
            <div className="space-y-6">
                <h1 className="text-3xl font-bold tracking-tight">Search Results</h1>
                <div className="relative max-w-xl">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search products, guides, articles..."
                        className="pl-10 h-12 text-lg"
                    />
                </div>
                <p className="text-muted-foreground">
                    Found {totalResults} result{totalResults !== 1 ? 's' : ''} for "{query}"
                </p>
            </div>

            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                <TabsList>
                    <TabsTrigger value="all">All Results ({totalResults})</TabsTrigger>
                    <TabsTrigger value="products">Products ({filteredProducts.length})</TabsTrigger>
                    <TabsTrigger value="articles">Articles ({filteredPosts.length})</TabsTrigger>
                </TabsList>

                {/* ALL CONTENT */}
                <TabsContent value="all" className="space-y-10">

                    {/* Products Section in All */}
                    {filteredProducts.length > 0 && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b pb-4">
                                <h2 className="text-2xl font-semibold flex items-center gap-2">
                                    <Package className="h-6 w-6 text-primary" /> Products
                                </h2>
                                {filteredProducts.length > 3 && (
                                    <Button variant="ghost" onClick={() => setActiveTab("products")} className="text-primary hover:text-primary">
                                        View All Products <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.slice(0, 3).map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Articles Section in All */}
                    {filteredPosts.length > 0 && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b pb-4">
                                <h2 className="text-2xl font-semibold flex items-center gap-2">
                                    <FileText className="h-6 w-6 text-primary" /> Articles & Guides
                                </h2>
                                {filteredPosts.length > 3 && (
                                    <Button variant="ghost" onClick={() => setActiveTab("articles")} className="text-primary hover:text-primary">
                                        View All Articles <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                            <div className="grid gap-6">
                                {filteredPosts.slice(0, 3).map(post => (
                                    <ArticleCard key={post.slug} post={post} />
                                ))}
                            </div>
                        </div>
                    )}

                    {totalResults === 0 && <NoResults />}
                </TabsContent>

                {/* PRODUCTS TAB */}
                <TabsContent value="products" className="space-y-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    {filteredProducts.length === 0 && <NoResults />}
                </TabsContent>

                {/* ARTICLES TAB */}
                <TabsContent value="articles" className="space-y-6">
                    <div className="grid gap-6">
                        {filteredPosts.map(post => (
                            <ArticleCard key={post.slug} post={post} />
                        ))}
                    </div>
                    {filteredPosts.length === 0 && <NoResults />}
                </TabsContent>
            </Tabs>
        </div>
    )
}

function ProductCard({ product }: { product: any }) {
    return (
        <Link href={`/products/${product.id}`} className="group">
            <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative h-48 bg-muted">
                    <img
                        src={product.images[0]?.url || '/placeholder.jpg'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2">
                        <Badge className="bg-white/90 text-foreground backdrop-blur hover:bg-white">{product.category}</Badge>
                    </div>
                </div>
                <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">{product.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {product.seasonality?.slice(0, 2).map((season: string) => (
                            <Badge key={season} variant="secondary" className="text-xs">{season}</Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

function ArticleCard({ post }: { post: BlogPost }) {
    return (
        <Link href={`/blog/${post.slug}`} className="group">
            <Card className="hover:shadow-md transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-6 p-6">
                    <div className="relative w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0 bg-muted">
                        {post.image ? (
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-primary/5">
                                <Sprout className="w-8 h-8 text-primary/40" />
                            </div>
                        )}
                    </div>
                    <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">{post.date} • {post.author}</div>
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{post.title}</h3>
                        <p className="text-muted-foreground line-clamp-2">{post.description}</p>
                    </div>
                </div>
            </Card>
        </Link>
    )
}

function NoResults() {
    return (
        <div className="text-center py-20 bg-muted/30 rounded-lg">
            <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No results found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms or browse our categories.</p>
            <div className="mt-6 flex justify-center gap-4">
                <Button variant="outline" asChild><Link href="/products">View All Products</Link></Button>
                <Button variant="outline" asChild><Link href="/blog">Read Articles</Link></Button>
            </div>
        </div>
    )
}
