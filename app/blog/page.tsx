import Link from "next/link"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/common/breadcrumb"
import { Badge } from "@/components/ui/badge"
import { StructuredData } from "@/components/providers/structured-data"
import { getBlogPosts, formatDate } from "@/lib/blog"
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from "@/lib/seo"
import { Calendar, ArrowRight, Sprout } from "lucide-react"

export const metadata = generateSEOMetadata({
  title: "Agricultural Blog - Farming Insights & Expert Tips",
  description: "Discover the latest insights, tips, and expert knowledge about seeds, farming practices, sustainable agriculture, and seasonal growing guides from Savaj Seeds agricultural experts.",
  keywords: [
    "farming blog", "agricultural insights", "farming tips", "seed knowledge",
    "sustainable agriculture", "organic farming", "crop management", "seasonal farming",
    "plant care", "farming techniques", "agricultural research", "farming guides",
    "seed technology", "farming best practices", "agricultural news"
  ],
  url: "/blog",
  type: "website",
})

// Force dynamic rendering to read CSV on each request
export const dynamic = "force-dynamic"

export default async function BlogPage() {
  const posts = await getBlogPosts()

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ])

  return (
    <div className="flex min-h-screen flex-col">
      <StructuredData data={breadcrumbSchema} />
      <SiteHeader />

      <div className="container">
        <Breadcrumb />
      </div>

      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#2e7d3215_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center space-y-7 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4">
                <Sprout className="h-4 w-4" />
                <span>Latest Articles & Insights</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance leading-[1.05]">
                Field{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Notes</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
                Discover the latest advancements in seed technology, sustainable farming practices, and expert advice
                for every season.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-background">
          <div className="container">
            {posts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No blog posts available at the moment.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col h-full bg-card rounded-[2rem] border border-border/40 overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      {post.image ? (
                        <>
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                        </>
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                      )}

                      {!post.image && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-primary/10 to-secondary/10 group-hover:scale-110 transition-transform duration-700">
                          <div className="p-8 rounded-full bg-white/80 backdrop-blur-sm shadow-inner group-hover:shadow-lg transition-all duration-500">
                            <Sprout className="h-12 w-12 text-primary opacity-80 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      )}

                      <div className="absolute top-6 left-6 z-20">
                        <Badge className="bg-white/90 text-primary hover:bg-white backdrop-blur-md border-none px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm">
                          Insights
                        </Badge>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col p-8 space-y-5">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground uppercase tracking-widest">
                          <Calendar className="h-3.5 w-3.5 text-accent" />
                          {formatDate(post.date)}
                        </div>
                        <h3 className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-[15px] leading-relaxed text-muted-foreground line-clamp-3 font-light">
                          {post.description}
                        </p>
                      </div>

                      <div className="pt-6 mt-auto border-t border-border/40 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                            {post.author.charAt(0)}
                          </div>
                          <span className="text-sm font-medium">{post.author}</span>
                        </div>
                        <div className="h-10 w-10 rounded-full border border-border/60 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300">
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
