"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface LazyImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
  sizes?: string
  placeholder?: "blur" | "empty"
  blurDataURL?: string
  onLoad?: () => void
  onError?: () => void
  quality?: number
  unoptimized?: boolean
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  priority = false,
  sizes,
  placeholder = "empty",
  blurDataURL,
  onLoad,
  onError,
  quality = 75,
  unoptimized = false,
  ...props
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const imgRef = useRef<HTMLDivElement>(null)

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
        rootMargin: "50px", // Start loading 50px before the image enters viewport
        threshold: 0.1,
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority, isInView])

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    onError?.()
  }

  const imageProps = {
    src,
    alt,
    onLoad: handleLoad,
    onError: handleError,
    quality,
    unoptimized,
    ...(fill ? { fill: true } : { width, height }),
    ...(sizes && { sizes }),
    ...(placeholder === "blur" && blurDataURL && { 
      placeholder: "blur" as const, 
      blurDataURL 
    }),
    className: cn(
      "transition-opacity duration-300",
      isLoading ? "opacity-0" : "opacity-100",
      className
    ),
    ...props,
  }

  return (
    <div
      ref={imgRef}
      className={cn(
        "relative overflow-hidden",
        fill ? "w-full h-full" : "",
        className
      )}
      style={!fill ? { width, height } : undefined}
    >
      {/* Loading skeleton */}
      {isLoading && !hasError && (
        <Skeleton 
          className={cn(
            "absolute inset-0 z-10",
            fill ? "w-full h-full" : ""
          )}
          style={!fill ? { width, height } : undefined}
        />
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

      {/* Actual image - only render when in view or priority */}
      {(isInView || priority) && !hasError && (
        <Image {...imageProps} />
      )}
    </div>
  )
}