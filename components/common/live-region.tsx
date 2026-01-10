"use client"

import { useEffect, useRef, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface LiveRegionProps {
  children: ReactNode
  politeness?: "polite" | "assertive" | "off"
  atomic?: boolean
  relevant?: "additions" | "removals" | "text" | "all"
  className?: string
  id?: string
}

export function LiveRegion({
  children,
  politeness = "polite",
  atomic = false,
  relevant = "additions text",
  className,
  id,
}: LiveRegionProps) {
  const regionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Ensure the live region is properly announced by screen readers
    if (regionRef.current) {
      const region = regionRef.current
      
      // Force screen readers to re-read the content when it changes
      if (politeness !== "off") {
        const originalContent = region.textContent
        region.textContent = ""
        
        // Use a small delay to ensure screen readers pick up the change
        setTimeout(() => {
          region.textContent = originalContent
        }, 10)
      }
    }
  }, [children, politeness])

  return (
    <div
      ref={regionRef}
      className={cn("sr-only", className)}
      aria-live={politeness}
      aria-atomic={atomic}
      aria-relevant={relevant}
      id={id}
      role="status"
    >
      {children}
    </div>
  )
}

// Convenience components for common use cases
export function PoliteAnnouncement({ children, className, id }: {
  children: ReactNode
  className?: string
  id?: string
}) {
  return (
    <LiveRegion 
      politeness="polite" 
      className={className} 
      id={id}
    >
      {children}
    </LiveRegion>
  )
}

export function AssertiveAnnouncement({ children, className, id }: {
  children: ReactNode
  className?: string
  id?: string
}) {
  return (
    <LiveRegion 
      politeness="assertive" 
      className={className} 
      id={id}
    >
      {children}
    </LiveRegion>
  )
}