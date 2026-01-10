import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ScreenReaderOnlyProps {
  children: ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export function ScreenReaderOnly({ 
  children, 
  className,
  as: Component = "span" 
}: ScreenReaderOnlyProps) {
  return (
    <Component 
      className={cn(
        "sr-only",
        // Additional styles for better screen reader support
        "absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0",
        className
      )}
    >
      {children}
    </Component>
  )
}