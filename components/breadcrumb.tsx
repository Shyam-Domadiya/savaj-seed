"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  className?: string
  customTitle?: string // For dynamic pages like blog posts
}

export function Breadcrumb({ className, customTitle }: BreadcrumbProps) {
  const pathname = usePathname()

  // Don't show breadcrumbs on homepage
  if (pathname === "/") {
    return null
  }

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split("/").filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = [
      { label: "Home", href: "/" }
    ]

    let currentPath = ""
    
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      
      // Convert segment to readable label
      let label = segment
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

      // Handle special cases for better labels
      if (segment === "blog" && index === pathSegments.length - 1) {
        label = "Blog"
      } else if (segment === "products") {
        label = "Products"
      } else if (segment === "contact") {
        label = "Contact"
      } else if (segment === "about") {
        label = "About"
      } else if (index === pathSegments.length - 1 && customTitle) {
        // Use custom title for the last segment (current page)
        label = customTitle
      }

      breadcrumbs.push({
        label,
        href: currentPath
      })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={cn(
        "flex items-center space-x-1 text-sm text-muted-foreground py-4",
        className
      )}
    >
      <ol className="flex items-center space-x-1">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className="flex items-center">
            {index > 0 && (
              <ChevronRight 
                className="h-4 w-4 mx-2 text-muted-foreground/60" 
                aria-hidden="true"
              />
            )}
            {index === breadcrumbs.length - 1 ? (
              // Current page - not a link
              <span 
                className="font-medium text-foreground flex items-center gap-1"
                aria-current="page"
              >
                {index === 0 && <Home className="h-4 w-4" />}
                <span className="truncate max-w-[200px] md:max-w-[300px]">
                  {breadcrumb.label}
                </span>
              </span>
            ) : (
              // Link to previous pages
              <Link
                href={breadcrumb.href}
                className="hover:text-foreground transition-colors duration-200 flex items-center gap-1 hover:underline underline-offset-4"
              >
                {index === 0 && <Home className="h-4 w-4" />}
                {breadcrumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}