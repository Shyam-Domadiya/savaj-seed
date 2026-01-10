"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Filter, SortAsc, SortDesc } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatDate } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface SearchResult {
  id: string
  title: string
  description: string
  type: "product" | "blog" | "page"
  url: string
  category?: string
  date?: string
}

export function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  
  const [results, setResults] = useState<SearchResult[]>([])
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState<"relevance" | "date" | "title">("relevance")
  const [filterType, setFilterType] = useState<"all" | "product" | "blog" | "page">("all")
  const [currentPage, setCurrentPage] = useState(1)
  const resultsPerPage = 10

  // Mock search data - in a real app, this would come from an API
  const allSearchData: SearchResult[] = [
    {
      id: "1",
      title: "Premium Tomato Seeds",
      description: "High-yielding hybrid tomato variety with excellent disease resistance and shelf life. Perfect for both greenhouse and open field cultivation.",
      type: "product",
      url: "/products",
      category: "Vegetable Seeds",
      date: "2024-01-15"
    },
    {
      id: "2", 
      title: "Sweet Pepper Seeds",
      description: "Colorful bell pepper variety with thick walls and excellent flavor profile. Available in multiple colors including red, yellow, and orange.",
      type: "product",
      url: "/products",
      category: "Vegetable Seeds",
      date: "2024-01-10"
    },
    {
      id: "3",
      title: "Hybrid Wheat Seeds",
      description: "Premium wheat variety optimized for Indian climate with superior grain quality and high yield potential.",
      type: "product",
      url: "/products",
      category: "Crop Seeds",
      date: "2024-01-05"
    },
    {
      id: "4",
      title: "Cucumber Seeds",
      description: "Fast-growing cucumber variety ideal for both greenhouse and open field cultivation with high productivity.",
      type: "product",
      url: "/products",
      category: "Vegetable Seeds",
      date: "2024-01-12"
    },
    {
      id: "5",
      title: "Advanced Chili Hybrid",
      description: "High-performance chili hybrid with intense color, heat, and extended harvest period.",
      type: "product",
      url: "/products",
      category: "Hybrid Seeds",
      date: "2024-01-08"
    },
    {
      id: "6",
      title: "Seed Selection Guide",
      description: "Learn about quality seeds and selection for optimal farming success. Comprehensive guide covering all aspects of seed selection.",
      type: "blog",
      url: "/blog",
      category: "Farming Tips",
      date: "2024-01-20"
    },
    {
      id: "7",
      title: "Sustainable Farming Practices",
      description: "Discover eco-friendly farming methods that improve soil health and increase crop yields while protecting the environment.",
      type: "blog",
      url: "/blog",
      category: "Sustainability",
      date: "2024-01-18"
    },
    {
      id: "8",
      title: "About Savaj Seeds",
      description: "Learn about our mission, vision, and commitment to quality seeds and sustainable agriculture practices.",
      type: "page",
      url: "/about",
      date: "2024-01-01"
    },
    {
      id: "9",
      title: "Contact Us",
      description: "Get in touch with our agricultural experts for personalized advice and support for your farming needs.",
      type: "page",
      url: "/contact",
      date: "2024-01-01"
    },
    {
      id: "10",
      title: "Basmati Rice Seeds",
      description: "Aromatic basmati rice variety with excellent cooking quality and high market demand.",
      type: "product",
      url: "/products",
      category: "Crop Seeds",
      date: "2024-01-07"
    }
  ]

  // Perform search
  useEffect(() => {
    const performSearch = async () => {
      setIsLoading(true)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      let searchResults = allSearchData
      
      if (query.trim()) {
        searchResults = allSearchData.filter(item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category?.toLowerCase().includes(query.toLowerCase())
        )
      }
      
      setResults(searchResults)
      setIsLoading(false)
    }

    performSearch()
  }, [query])

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...results]
    
    // Apply type filter
    if (filterType !== "all") {
      filtered = filtered.filter(result => result.type === filterType)
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title)
        case "date":
          return new Date(b.date || "").getTime() - new Date(a.date || "").getTime()
        case "relevance":
        default:
          // Simple relevance scoring based on query match
          const aScore = query ? (
            (a.title.toLowerCase().includes(query.toLowerCase()) ? 2 : 0) +
            (a.description.toLowerCase().includes(query.toLowerCase()) ? 1 : 0)
          ) : 0
          const bScore = query ? (
            (b.title.toLowerCase().includes(query.toLowerCase()) ? 2 : 0) +
            (b.description.toLowerCase().includes(query.toLowerCase()) ? 1 : 0)
          ) : 0
          return bScore - aScore
      }
    })
    
    setFilteredResults(filtered)
    setCurrentPage(1)
  }, [results, filterType, sortBy, query])

  const getTypeIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "product":
        return "🌱"
      case "blog":
        return "📝"
      case "page":
        return "📄"
      default:
        return "🔍"
    }
  }

  const getTypeLabel = (type: SearchResult["type"]) => {
    switch (type) {
      case "product":
        return "Product"
      case "blog":
        return "Article"
      case "page":
        return "Page"
      default:
        return "Result"
    }
  }

  const getTypeBadgeVariant = (type: SearchResult["type"]) => {
    switch (type) {
      case "product":
        return "default"
      case "blog":
        return "secondary"
      case "page":
        return "outline"
      default:
        return "outline"
    }
  }

  // Pagination
  const totalPages = Math.ceil(filteredResults.length / resultsPerPage)
  const startIndex = (currentPage - 1) * resultsPerPage
  const endIndex = startIndex + resultsPerPage
  const currentResults = filteredResults.slice(startIndex, endIndex)

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="h-8 bg-muted rounded w-64 animate-pulse" />
          <div className="h-4 bg-muted rounded w-48 animate-pulse" />
        </div>
        
        <div className="space-y-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border border-border rounded-lg p-6 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-muted rounded animate-pulse" />
                <div className="h-5 bg-muted rounded w-48 animate-pulse" />
                <div className="h-4 bg-muted rounded w-16 animate-pulse" />
              </div>
              <div className="h-4 bg-muted rounded w-full animate-pulse" />
              <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">
          {query ? `Search Results for "${query}"` : "All Results"}
        </h1>
        <p className="text-muted-foreground">
          {filteredResults.length} {filteredResults.length === 1 ? "result" : "results"} found
        </p>
      </div>

      {/* Filters and Sorting */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
            <SelectTrigger className="w-32">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="product">Products</SelectItem>
              <SelectItem value="blog">Articles</SelectItem>
              <SelectItem value="page">Pages</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
          <SelectTrigger className="w-40">
            {sortBy === "title" ? <SortAsc className="h-4 w-4 mr-2" /> : <SortDesc className="h-4 w-4 mr-2" />}
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="title">Title</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Search Results */}
      {currentResults.length > 0 ? (
        <div className="space-y-6">
          {currentResults.map((result) => (
            <Card key={result.id} className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span className="text-xl">{getTypeIcon(result.type)}</span>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-lg hover:text-primary transition-colors">
                        <Link href={result.url} className="line-clamp-2">
                          {result.title}
                        </Link>
                      </CardTitle>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant={getTypeBadgeVariant(result.type)}>
                      {getTypeLabel(result.type)}
                    </Badge>
                    {result.category && (
                      <Badge variant="outline" className="text-xs">
                        {result.category}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-base leading-relaxed line-clamp-3">
                  {result.description}
                </CardDescription>
                <div className="flex items-center justify-between mt-4">
                  <Link
                    href={result.url}
                    className="text-primary hover:text-primary/80 font-medium text-sm hover:underline underline-offset-4"
                  >
                    View Details →
                  </Link>
                  {result.date && (
                    <span className="text-xs text-muted-foreground">
                      {formatDate(result.date)}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No results found</h3>
          <p className="text-muted-foreground mb-4">
            {query 
              ? `We couldn't find any results for "${query}". Try adjusting your search terms.`
              : "No results available at the moment."
            }
          </p>
          <Button asChild variant="outline">
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}
                  className="w-8 h-8 p-0"
                >
                  {pageNum}
                </Button>
              )
            })}
            {totalPages > 5 && (
              <>
                <span className="text-muted-foreground">...</span>
                <Button
                  variant={currentPage === totalPages ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  className="w-8 h-8 p-0"
                >
                  {totalPages}
                </Button>
              </>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}