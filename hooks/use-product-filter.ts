"use client"

import { useState, useMemo, useEffect } from "react"
import { Product, ProductSort } from "@/lib/types/product"
import { ProductFilterState } from "@/components/product/product-filter"

interface UseProductFilterProps {
  products: Product[]
  initialFilters?: Partial<ProductFilterState>
  initialSort?: ProductSort
}

export function useProductFilter({
  products,
  initialFilters = {},
  initialSort = { field: 'name', direction: 'asc' }
}: UseProductFilterProps) {
  const [filters, setFilters] = useState<ProductFilterState>({
    categories: [],
    seasons: [],
    difficultyLevels: [],
    availability: undefined,
    featured: undefined,
    ...initialFilters
  })

  const [sort, setSort] = useState<ProductSort>(initialSort)

  // Filter products based on current filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false
      }

      // Season filter
      if (filters.seasons.length > 0) {
        const hasMatchingSeason = filters.seasons.some(season =>
          product.seasonality && product.seasonality.includes(season)
        )
        if (!hasMatchingSeason) return false
      }

      // Difficulty filter
      if (filters.difficultyLevels.length > 0 && !filters.difficultyLevels.includes(product.difficultyLevel)) {
        return false
      }

      // Availability filter
      if (filters.availability !== undefined && product.availability !== filters.availability) {
        return false
      }

      // Featured filter
      if (filters.featured !== undefined && product.featured !== filters.featured) {
        return false
      }

      return true
    })
  }, [products, filters])

  // Sort filtered products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts]

    sorted.sort((a, b) => {
      let aValue: any
      let bValue: any

      switch (sort.field) {
        case 'name':
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
        case 'category':
          aValue = a.category.toLowerCase()
          bValue = b.category.toLowerCase()
          break
        case 'createdAt':
          aValue = a.createdAt.getTime()
          bValue = b.createdAt.getTime()
          break
        case 'featured':
          aValue = a.featured ? 1 : 0
          bValue = b.featured ? 1 : 0
          break
        default:
          return 0
      }

      if (aValue < bValue) {
        return sort.direction === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sort.direction === 'asc' ? 1 : -1
      }
      return 0
    })

    return sorted
  }, [filteredProducts, sort])

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      categories: [],
      seasons: [],
      difficultyLevels: [],
      availability: undefined,
      featured: undefined
    })
  }

  // Get filter statistics
  const filterStats = useMemo(() => {
    const totalProducts = products.length
    const filteredCount = filteredProducts.length
    const availableCount = products.filter(p => p.availability).length
    const featuredCount = products.filter(p => p.featured).length

    const categoryStats = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const seasonStats = products.reduce((acc, product) => {
      if (product.seasonality) {
        product.seasonality.forEach(season => {
          acc[season] = (acc[season] || 0) + 1
        })
      }
      return acc
    }, {} as Record<string, number>)

    const difficultyStats = products.reduce((acc, product) => {
      acc[product.difficultyLevel] = (acc[product.difficultyLevel] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return {
      totalProducts,
      filteredCount,
      availableCount,
      featuredCount,
      categoryStats,
      seasonStats,
      difficultyStats
    }
  }, [products, filteredProducts])

  // Persist filters to localStorage (optional)
  useEffect(() => {
    // Skip localStorage in test environment
    if (typeof window === 'undefined' || process.env.NODE_ENV === 'test') {
      return
    }

    const hasActiveFilters =
      filters.categories.length > 0 ||
      filters.seasons.length > 0 ||
      filters.difficultyLevels.length > 0 ||
      filters.availability !== undefined ||
      filters.featured !== undefined

    if (hasActiveFilters) {
      localStorage.setItem('productFilters', JSON.stringify(filters))
      localStorage.setItem('productSort', JSON.stringify(sort))
    }
  }, [filters, sort])

  // Load filters from localStorage on mount
  useEffect(() => {
    // Skip localStorage in test environment
    if (typeof window === 'undefined' || process.env.NODE_ENV === 'test') {
      return
    }

    try {
      const savedFilters = localStorage.getItem('productFilters')
      const savedSort = localStorage.getItem('productSort')

      if (savedFilters) {
        setFilters(JSON.parse(savedFilters))
      }

      if (savedSort) {
        setSort(JSON.parse(savedSort))
      }
    } catch (error) {
      // Ignore localStorage errors
      console.warn('Failed to load saved filters:', error)
    }
  }, [])

  return {
    filters,
    sort,
    filteredProducts: sortedProducts,
    filterStats,
    setFilters,
    setSort,
    clearFilters
  }
}