"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription, SheetHeader } from "@/components/ui/sheet"
import { SearchComponent } from "@/components/features/search/search"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/animations"
import { Menu, X, Home, Package, Phone, Info, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

import { ThemeToggle } from "@/components/layout/theme-toggle"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: Info },
  { href: "/products", label: "Products", icon: Package },

  { href: "/contact", label: "Contact", icon: Phone },
]

interface MobileNavProps {
  className?: string
}

export function MobileNav({ className }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const pathname = usePathname()

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])



  // Handle swipe gestures
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && isOpen) {
      setIsOpen(false)
    }
    if (isRightSwipe && !isOpen) {
      setIsOpen(true)
    }
  }

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isMounted) {
    return null
  }

  if (!isMounted) {
    return null
  }

  return (
    <div className={cn("lg:hidden", className)}>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-11 w-11 transition-all duration-300 relative",
              "hover:scale-110 hover:bg-muted/50",
              "active:scale-95",
              "focus:ring-2 focus:ring-primary/20"
            )}
            aria-label="Toggle navigation menu"
          >
            <div className="relative">
              <Menu
                className={cn(
                  "h-6 w-6 transition-all duration-300",
                  isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                )}
              />
              <X
                className={cn(
                  "h-6 w-6 absolute inset-0 transition-all duration-300",
                  isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                )}
              />
            </div>
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className={cn(
            "w-[320px] p-0 border-l-2 border-primary/10",
            "bg-background/95 backdrop-blur-xl"
          )}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
          </SheetHeader>

          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold">Navigation</h2>
                <ThemeToggle />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 hover:bg-muted/50 transition-colors duration-200"
                aria-label="Close navigation menu"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Search */}
            <div className="p-6 border-b border-border/50">
              <SearchComponent
                placeholder="Search..."
                className="w-full"
                showResults={false}
              />
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 p-6 space-y-2">
              {navItems.map((item, index) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300",
                      "hover:bg-muted/50 hover:translate-x-2 hover:scale-105",
                      "active:scale-95 active:translate-x-1",
                      "focus:ring-2 focus:ring-primary/20 focus:outline-none",
                      "group relative overflow-hidden",
                      isActive
                        ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    {/* Background animation */}
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0",
                      "group-hover:opacity-100 transition-opacity duration-300",
                      "rounded-xl"
                    )} />

                    <Icon className={cn(
                      "h-5 w-5 transition-all duration-300 relative z-10",
                      "group-hover:scale-110",
                      isActive ? "text-primary" : "group-hover:text-primary"
                    )} />

                    <span className={cn(
                      "font-medium text-base relative z-10 transition-all duration-300",
                      "group-hover:font-semibold",
                      isActive && "font-semibold"
                    )}>
                      {item.label}
                    </span>

                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full animate-pulse" />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Footer Actions */}
            <div className="p-6 border-t border-border/50 space-y-4">
              <Button
                asChild
                size="lg"
                className={cn(
                  "w-full h-12 text-base font-medium shadow-lg",
                  "hover:shadow-xl hover:scale-105 active:scale-95",
                  "transition-all duration-300",
                  "bg-gradient-to-r from-primary to-primary/90",
                  "hover:from-primary/90 hover:to-primary"
                )}
              >
                <Link href="/contact">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Us
                </Link>
              </Button>

              {/* Swipe hint */}
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  Swipe left to close menu
                </p>
                <div className="flex justify-center mt-2">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-muted-foreground/30 rounded-full animate-pulse" />
                    <div className="w-1 h-1 bg-muted-foreground/30 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
                    <div className="w-1 h-1 bg-muted-foreground/30 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}