"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SearchResult {
  id: string
  title: string
  description: string
  type: "product" | "blog" | "page"
  url: string
}

interface SearchProps {
  className?: string
  placeholder?: string
  showResults?: boolean
}

export function SearchComponent({ className, placeholder = "Search products, articles...", showResults = true }: SearchProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Mock search data - in a real app, this would come from an API
  const searchData: SearchResult[] = [
    {
      id: "1",
      title: "Premium Tomato Seeds",
      description: "High-yielding hybrid tomato variety with excellent disease resistance",
      type: "product",
      url: "/products"
    },
    {
      id: "2", 
      title: "Sweet Pepper Seeds",
      description: "Colorful bell pepper variety with thick walls and excellent flavor",
      type: "product",
      url: "/products"
    },
    {
      id: "3",
      title: "Hybrid Wheat Seeds",
      description: "Premium wheat variety optimized for Indian climate",
      type: "product", 
      url: "/products"
    },
    {
      id: "4",
      title: "Seed Selection Guide",
      description: "Learn about quality seeds and selection for optimal farming success",
      type: "blog",
      url: "/blog"
    },
    {
      id: "5",
      title: "About Savaj Seeds",
      description: "Learn about our mission, vision, and commitment to quality",
      type: "page",
      url: "/about"
    },
    {
      id: "6",
      title: "Contact Us",
      description: "Get in touch with our agricultural experts",
      type: "page",
      url: "/contact"
    }
  ]

  // Perform search
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const filteredResults = searchData.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 6) // Limit to 6 results
    
    setResults(filteredResults)
    setIsLoading(false)
  }

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        performSearch(query)
      } else {
        setResults([])
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : prev
          )
          break
        case "ArrowUp":
          e.preventDefault()
          setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
          break
        case "Enter":
          e.preventDefault()
          if (selectedIndex >= 0 && results[selectedIndex]) {
            handleResultClick(results[selectedIndex])
          } else if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`)
            setIsOpen(false)
          }
          break
        case "Escape":
          setIsOpen(false)
          inputRef.current?.blur()
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, selectedIndex, results, query, router])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleResultClick = (result: SearchResult) => {
    router.push(result.url)
    setIsOpen(false)
    setQuery("")
  }

  const handleClear = () => {
    setQuery("")
    setResults([])
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

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

  return (
    <div ref={searchRef} className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className={cn(
            "pl-10 pr-10 h-10",
            "focus:ring-2 focus:ring-primary/20 transition-all duration-300",
            isOpen && "ring-2 ring-primary/20"
          )}
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 p-0 hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && showResults && (query || results.length > 0) && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-popover border border-border rounded-lg shadow-lg overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              <span className="text-sm text-muted-foreground">Searching...</span>
            </div>
          ) : results.length > 0 ? (
            <div className="max-h-80 overflow-y-auto">
              {results.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className={cn(
                    "w-full text-left p-4 hover:bg-muted/50 transition-colors duration-200 border-b border-border/50 last:border-b-0",
                    selectedIndex === index && "bg-muted/50"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">{getTypeIcon(result.type)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm truncate">{result.title}</h4>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full shrink-0">
                          {getTypeLabel(result.type)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {result.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
              
              {query.trim() && (
                <button
                  onClick={() => {
                    router.push(`/search?q=${encodeURIComponent(query)}`)
                    setIsOpen(false)
                  }}
                  className="w-full text-left p-4 hover:bg-muted/50 transition-colors duration-200 border-t border-border/50"
                >
                  <div className="flex items-center gap-3">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Search for "<span className="font-medium">{query}</span>"
                    </span>
                  </div>
                </button>
              )}
            </div>
          ) : query.trim() ? (
            <div className="p-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">No results found</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  router.push(`/search?q=${encodeURIComponent(query)}`)
                  setIsOpen(false)
                }}
              >
                Search for "{query}"
              </Button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}