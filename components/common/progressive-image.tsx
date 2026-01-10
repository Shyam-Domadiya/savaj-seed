"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProgressiveImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
  sizes?: string
  quality?: number
  lowQualitySrc?: string
  placeholder?: string
  onLoad?: () => void
  onError?: () => void
}

export function ProgressiveImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  priority = false,
  sizes,
  quality = 75,
  lowQualitySrc,
  placeholder,
  onLoad,
  onError,
  ...props
}: ProgressiveImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [highQualityLoaded, setHighQualityLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const imgRef = useRef<HTMLDivElement>(null)

  // Generate low quality placeholder if not provided
  const lowQualityPlaceholder = lowQualitySrc || (
    typeof src === 'string' && src.includes('?') 
      ? `${src}&q=10&blur=10` 
      : `${src}?q=10&blur=10`
  )

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority, isInView])

  const handleLowQualityLoad = () => {
    setIsLoading(false)
  }

  const handleHighQualityLoad = () => {
    setHighQualityLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
    onError?.()
  }

  const imageProps = {
    alt,
    quality,
    ...(fill ? { fill: true } : { width, height }),
    ...(sizes && { sizes }),
    ...props,
  }

  return (
    <div
      ref={imgRef}
      className={cn(
        "relative overflow-hidden bg-muted",
        fill ? "w-full h-full" : "",
        className
      )}
      style={!fill ? { width, height } : undefined}
    >
      {/* Loading state with placeholder */}
      {isLoading && !hasError && (
        <div 
          className={cn(
            "absolute inset-0 flex items-center justify-center animate-pulse",
            fill ? "w-full h-full" : ""
          )}
          style={!fill ? { width, height } : undefined}
        >
          {placeholder ? (
            <div className="text-muted-foreground text-center">
              <div className="text-4xl mb-2">🌱</div>
              <p className="text-sm">{placeholder}</p>
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 animate-shimmer" />
          )}
        </div>
      )}

      {/* Error fallback */}
      {hasError && (
        <div 
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground",
            fill ? "w-full h-full" : ""
          )}
          style={!fill ? { width, height } : undefined}
        >
          <div className="text-center">
            <div className="text-4xl mb-2">🖼️</div>
            <p className="text-sm">Image not available</p>
          </div>
        </div>
      )}

      {/* Low quality image (loads first) */}
      {(isInView || priority) && !hasError && (
        <Image
          {...imageProps}
          src={lowQualityPlaceholder}
          onLoad={handleLowQualityLoad}
          onError={handleError}
          className={cn(
            "transition-opacity duration-300 filter blur-sm scale-110",
            highQualityLoaded ? "opacity-0" : "opacity-100"
          )}
          quality={10}
        />
      )}

      {/* High quality image (loads after low quality) */}
      {(isInView || priority) && !hasError && !isLoading && (
        <Image
          {...imageProps}
          src={src}
          onLoad={handleHighQualityLoad}
          onError={handleError}
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            highQualityLoaded ? "opacity-100" : "opacity-0"
          )}
          quality={quality}
        />
      )}
    </div>
  )
}