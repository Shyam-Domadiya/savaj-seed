"use client"

import { useState, useRef, useEffect, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface LazySectionProps {
  children: ReactNode
  fallback?: ReactNode
  className?: string
  rootMargin?: string
  threshold?: number
  triggerOnce?: boolean
  delay?: number
}

export function LazySection({
  children,
  fallback,
  className,
  rootMargin = "100px",
  threshold = 0.1,
  triggerOnce = true,
  delay = 0,
}: LazySectionProps) {
  const [isInView, setIsInView] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          
          // Apply delay if specified
          if (delay > 0) {
            setTimeout(() => {
              setShouldRender(true)
            }, delay)
          } else {
            setShouldRender(true)
          }

          if (triggerOnce) {
            observer.disconnect()
          }
        } else if (!triggerOnce) {
          setIsInView(false)
          setShouldRender(false)
        }
      },
      {
        rootMargin,
        threshold,
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [rootMargin, threshold, triggerOnce, delay])

  const defaultFallback = (
    <div className="space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-32 w-full" />
    </div>
  )

  return (
    <div
      ref={sectionRef}
      className={cn(
        "transition-opacity duration-500",
        shouldRender ? "opacity-100" : "opacity-0",
        className
      )}
    >
      {shouldRender ? children : (fallback || defaultFallback)}
    </div>
  )
}