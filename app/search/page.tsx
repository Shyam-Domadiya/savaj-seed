import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumb } from "@/components/breadcrumb"
import { getBlogPosts } from "@/lib/blog"
import { SearchResults } from "./search-results"

export const metadata = {
  title: "Search Results - Savaj Seeds",
  description: "Search results for products, articles, and information about Savaj Seeds.",
}

// Force dynamic rendering since we are using useSearchParams in the client component
export const dynamic = "force-dynamic"

export default async function SearchPage() {
  const posts = await getBlogPosts()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <div className="container">
        <Breadcrumb />
      </div>

      <main className="flex-1">
        <section className="py-12 md:py-16">
          <div className="container">
            <Suspense fallback={<SearchResultsSkeleton />}>
              <SearchResults initialPosts={posts} />
            </Suspense>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

function SearchResultsSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="h-8 bg-muted rounded w-64 animate-pulse" />
        <div className="h-4 bg-muted rounded w-48 animate-pulse" />
      </div>

      <div className="space-y-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border border-border rounded-lg p-6 space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-muted rounded animate-pulse" />
              <div className="h-5 bg-muted rounded w-48 animate-pulse" />
              <div className="h-4 bg-muted rounded w-16 animate-pulse" />
            </div>
            <div className="h-4 bg-muted rounded w-full animate-pulse" />
            <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}