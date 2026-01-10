"use client"

import { useState, useEffect } from "react"
import { Filter, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ProductCategory, Season, DifficultyLevel, ProductSort } from "@/lib/types/product"
import { cn } from "@/lib/utils"

export interface ProductFilterState {
  categories: ProductCategory[]
  seasons: Season[]
  difficultyLevels: DifficultyLevel[]
  availability?: boolean
  featured?: boolean
}

interface ProductFilterProps {
  filters: ProductFilterState
  sort: ProductSort
  onFiltersChange: (filters: ProductFilterState) => void
  onSortChange: (sort: ProductSort) => void
  onClearFilters: () => void
  className?: string
}

const categories: ProductCategory[] = ['Vegetable', 'Crop', 'Hybrid']
const seasons: Season[] = ['Spring', 'Summer', 'Monsoon', 'Winter', 'All-Season']
const difficultyLevels: DifficultyLevel[] = ['Beginner', 'Intermediate', 'Advanced']

export function ProductFilter({
  filters,
  sort,
  onFiltersChange,
  onSortChange,
  onClearFilters,
  className
}: ProductFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(true)
  const [seasonOpen, setSeasonOpen] = useState(false)
  const [difficultyOpen, setDifficultyOpen] = useState(false)

  // Count active filters
  const activeFilterCount = 
    filters.categories.length + 
    filters.seasons.length + 
    filters.difficultyLevels.length +
    (filters.availability ? 1 : 0) +
    (filters.featured ? 1 : 0)

  const handleCategoryChange = (category: ProductCategory, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category)
    
    onFiltersChange({ ...filters, categories: newCategories })
  }

  const handleSeasonChange = (season: Season, checked: boolean) => {
    const newSeasons = checked
      ? [...filters.seasons, season]
      : filters.seasons.filter(s => s !== season)
    
    onFiltersChange({ ...filters, seasons: newSeasons })
  }

  const handleDifficultyChange = (difficulty: DifficultyLevel, checked: boolean) => {
    const newDifficulties = checked
      ? [...filters.difficultyLevels, difficulty]
      : filters.difficultyLevels.filter(d => d !== difficulty)
    
    onFiltersChange({ ...filters, difficultyLevels: newDifficulties })
  }

  const handleAvailabilityChange = (checked: boolean) => {
    onFiltersChange({ ...filters, availability: checked ? true : undefined })
  }

  const handleFeaturedChange = (checked: boolean) => {
    onFiltersChange({ ...filters, featured: checked ? true : undefined })
  }

  return (
    <div className={className}>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full justify-between"
        >
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFilterCount}
              </Badge>
            )}
          </div>
          <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
        </Button>
      </div>

      {/* Filter Panel */}
      <div className={cn("space-y-4", "lg:block", !isOpen && "hidden lg:block")}>
        {/* Sort Controls */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Sort By</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Select
              value={`${sort.field}-${sort.direction}`}
              onValueChange={(value) => {
                const [field, direction] = value.split('-') as [ProductSort['field'], ProductSort['direction']]
                onSortChange({ field, direction })
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="category-asc">Category (A-Z)</SelectItem>
                <SelectItem value="category-desc">Category (Z-A)</SelectItem>
                <SelectItem value="createdAt-desc">Newest First</SelectItem>
                <SelectItem value="createdAt-asc">Oldest First</SelectItem>
                <SelectItem value="featured-desc">Featured First</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Active Filters */}
        {activeFilterCount > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Active Filters</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearFilters}
                  className="h-auto p-1 text-muted-foreground hover:text-foreground"
                >
                  Clear All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {filters.categories.map(category => (
                  <Badge key={category} variant="secondary" className="gap-1">
                    {category}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 hover:bg-transparent"
                      onClick={() => handleCategoryChange(category, false)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                {filters.seasons.map(season => (
                  <Badge key={season} variant="secondary" className="gap-1">
                    {season}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 hover:bg-transparent"
                      onClick={() => handleSeasonChange(season, false)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                {filters.difficultyLevels.map(difficulty => (
                  <Badge key={difficulty} variant="secondary" className="gap-1">
                    {difficulty}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 hover:bg-transparent"
                      onClick={() => handleDifficultyChange(difficulty, false)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                {filters.availability && (
                  <Badge variant="secondary" className="gap-1">
                    Available Only
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 hover:bg-transparent"
                      onClick={() => handleAvailabilityChange(false)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                {filters.featured && (
                  <Badge variant="secondary" className="gap-1">
                    Featured Only
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 hover:bg-transparent"
                      onClick={() => handleFeaturedChange(false)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Category Filter */}
        <Card>
          <Collapsible open={categoryOpen} onOpenChange={setCategoryOpen}>
            <CollapsibleTrigger asChild>
              <CardHeader className="pb-3 cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Category</CardTitle>
                  <ChevronDown className={cn("h-4 w-4 transition-transform", categoryOpen && "rotate-180")} />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-3">
                {categories.map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                    />
                    <Label htmlFor={`category-${category}`} className="text-sm font-normal">
                      {category}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Season Filter */}
        <Card>
          <Collapsible open={seasonOpen} onOpenChange={setSeasonOpen}>
            <CollapsibleTrigger asChild>
              <CardHeader className="pb-3 cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Season</CardTitle>
                  <ChevronDown className={cn("h-4 w-4 transition-transform", seasonOpen && "rotate-180")} />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-3">
                {seasons.map(season => (
                  <div key={season} className="flex items-center space-x-2">
                    <Checkbox
                      id={`season-${season}`}
                      checked={filters.seasons.includes(season)}
                      onCheckedChange={(checked) => handleSeasonChange(season, checked as boolean)}
                    />
                    <Label htmlFor={`season-${season}`} className="text-sm font-normal">
                      {season}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Difficulty Filter */}
        <Card>
          <Collapsible open={difficultyOpen} onOpenChange={setDifficultyOpen}>
            <CollapsibleTrigger asChild>
              <CardHeader className="pb-3 cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Difficulty Level</CardTitle>
                  <ChevronDown className={cn("h-4 w-4 transition-transform", difficultyOpen && "rotate-180")} />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-3">
                {difficultyLevels.map(difficulty => (
                  <div key={difficulty} className="flex items-center space-x-2">
                    <Checkbox
                      id={`difficulty-${difficulty}`}
                      checked={filters.difficultyLevels.includes(difficulty)}
                      onCheckedChange={(checked) => handleDifficultyChange(difficulty, checked as boolean)}
                    />
                    <Label htmlFor={`difficulty-${difficulty}`} className="text-sm font-normal">
                      {difficulty}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Additional Filters */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Additional Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="availability"
                checked={filters.availability || false}
                onCheckedChange={handleAvailabilityChange}
              />
              <Label htmlFor="availability" className="text-sm font-normal">
                Available only
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={filters.featured || false}
                onCheckedChange={handleFeaturedChange}
              />
              <Label htmlFor="featured" className="text-sm font-normal">
                Featured products
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}