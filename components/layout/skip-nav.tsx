"use client"

import { cn } from "@/lib/utils"

interface SkipNavProps {
  links?: Array<{
    href: string
    label: string
  }>
  className?: string
}

const defaultLinks = [
  { href: "#main-content", label: "Skip to main content" },
  { href: "#navigation", label: "Skip to navigation" },
  { href: "#footer", label: "Skip to footer" },
]

export function SkipNav({ links = defaultLinks, className }: SkipNavProps) {
  return (
    <div className={cn("sr-only focus-within:not-sr-only", className)}>
      <div className="fixed top-0 left-0 z-[9999] bg-primary text-primary-foreground p-2 rounded-br-md shadow-lg">
        <nav aria-label="Skip navigation">
          <ul className="flex gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-block px-3 py-2 text-sm font-medium bg-primary-foreground text-primary rounded focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-primary-foreground/90 transition-colors"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      const target = document.querySelector(link.href)
                      if (target) {
                        target.scrollIntoView({ behavior: 'smooth' })
                        // Focus the target element if it's focusable
                        if (target instanceof HTMLElement) {
                          target.focus()
                        }
                      }
                    }
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}