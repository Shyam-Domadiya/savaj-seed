"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScreenReaderOnly } from "@/components/shared/screen-reader-only"

import { MobileNav } from "@/components/layout/mobile-nav"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/context/AuthContext"

import { ThemeToggle } from "@/components/layout/theme-toggle"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },

]

export function SiteHeader() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="container flex h-24 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-3 transition-all duration-300 hover:opacity-80 hover:scale-105"
          aria-label="Savaj Seeds - Go to homepage"
        >
          <Image
            src="/images/logo.png"
            alt="Savaj Seeds logo"
            width={180}
            height={80}
            className="h-14 w-auto dark:brightness-0 dark:invert"
            priority
          />
          <ScreenReaderOnly>
            Savaj Seeds - Happiness from the Farmer's Field
          </ScreenReaderOnly>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2" aria-label="Main navigation" id="navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-5 py-2.5 text-[15px] font-medium transition-all duration-300 hover:text-foreground rounded-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                pathname === item.href ? "text-foreground bg-muted/70" : "text-muted-foreground hover:bg-muted/40",
              )}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              <Link href="/user">
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex font-medium">
                  Dashboard
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={() => logout()} className="hidden sm:inline-flex text-muted-foreground hover:text-foreground">
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                Login
              </Button>
            </Link>
          )}

          <ThemeToggle />

          <Link href="/search">
            <div className="inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </div>
          </Link>
          {/* Calculator removed as per user request */}
          <Button asChild size="sm" className="hidden sm:inline-flex rounded-full shadow-md hover:shadow-lg transition-all duration-300">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </header>
  )
}
