"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { LazyImage } from "@/components/common/lazy-image"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ProductImage } from "@/lib/types/product"
import { cn } from "@/lib/utils"

interface ProductImageGalleryProps {
  images: ProductImage[]
  productName: string
  className?: string
}

export function ProductImageGallery({ images, productName, className }: ProductImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Sort images by sortOrder, with primary image first
  const sortedImages = [...images].sort((a, b) => {
    if (a.isPrimary) return -1
    if (b.isPrimary) return 1
    return a.sortOrder - b.sortOrder
  })

  const currentImage = sortedImages[currentImageIndex]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % sortedImages.length)
    resetZoom()
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + sortedImages.length) % sortedImages.length)
    resetZoom()
  }

  const resetZoom = () => {
    setZoomLevel(1)
    setZoomPosition({ x: 0, y: 0 })
    setIsZoomed(false)
  }

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3))
    setIsZoomed(true)
  }

  const handleZoomOut = () => {
    const newZoomLevel = Math.max(zoomLevel - 0.5, 1)
    setZoomLevel(newZoomLevel)
    if (newZoomLevel === 1) {
      setIsZoomed(false)
      setZoomPosition({ x: 0, y: 0 })
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 100
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 100

    setZoomPosition({ x: -x, y: -y })
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevImage()
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "Escape") resetZoom()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  if (!sortedImages.length) {
    return (
      <div className={cn("aspect-square bg-muted rounded-lg flex items-center justify-center", className)}>
        <div className="text-6xl">🌱</div>
      </div>
    )
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main Image Display */}
      <div className="relative aspect-square bg-muted rounded-lg overflow-hidden group">
        <div
          ref={containerRef}
          className="relative w-full h-full cursor-zoom-in"
          onMouseMove={handleMouseMove}
          onClick={handleZoomIn}
        >
          <LazyImage
            ref={imageRef}
            src={currentImage.url}
            alt={currentImage.altText}
            fill
            className={cn(
              "object-cover transition-transform duration-300",
              isZoomed && "cursor-zoom-out"
            )}
            style={{
              transform: `scale(${zoomLevel}) translate(${zoomPosition.x}px, ${zoomPosition.y}px)`,
            }}
            priority={currentImageIndex === 0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Navigation Arrows */}
        {sortedImages.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/80 backdrop-blur-sm hover:bg-background/90"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/80 backdrop-blur-sm hover:bg-background/90"
              onClick={nextImage}
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Zoom Controls */}
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background/90"
            onClick={handleZoomIn}
            disabled={zoomLevel >= 3}
            aria-label="Zoom in"
          >
            <ZoomIn className="h-3 w-3" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background/90"
            onClick={handleZoomOut}
            disabled={zoomLevel <= 1}
            aria-label="Zoom out"
          >
            <ZoomOut className="h-3 w-3" />
          </Button>
          {isZoomed && (
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background/90"
              onClick={resetZoom}
              aria-label="Reset zoom"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        {/* Image Counter */}
        {sortedImages.length > 1 && (
          <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-sm rounded-md px-2 py-1 text-xs font-medium">
            {currentImageIndex + 1} / {sortedImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {sortedImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {sortedImages.map((image, index) => (
            <button
              key={image.id}
              className={cn(
                "relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-200",
                index === currentImageIndex
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border hover:border-primary/50"
              )}
              onClick={() => {
                setCurrentImageIndex(index)
                resetZoom()
              }}
              aria-label={`View image ${index + 1}: ${image.altText}`}
            >
              <LazyImage
                src={image.url}
                alt={image.altText}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Caption */}
      {currentImage.caption && (
        <p className="text-sm text-muted-foreground text-center italic">
          {currentImage.caption}
        </p>
      )}

      {/* Fullscreen Modal */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full mt-2"
            aria-label="View in fullscreen"
          >
            View Fullscreen
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl w-full h-[80vh] p-0" aria-describedby={undefined}>
          <div className="sr-only">
            <DialogTitle>Fullscreen View - {currentImage.altText}</DialogTitle>
            <DialogDescription>
              Enlarged view of {currentImage.altText}. Use arrow keys to navigate between images.
            </DialogDescription>
          </div>
          <div className="relative w-full h-full">
            <Image
              src={currentImage.url}
              alt={currentImage.altText}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
            {sortedImages.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}