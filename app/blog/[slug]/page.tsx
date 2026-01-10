import Link from "next/link"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/common/breadcrumb"
import { StructuredData } from "@/components/providers/structured-data"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getBlogPost, getBlogPosts, formatDate } from "@/lib/blog"
import { generateMetadata as generateSEOMetadata, generateArticleSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { Calendar, Share2, BookOpen, Clock, Tag, ChevronRight } from "lucide-react"

export const dynamic = "force-dynamic"

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: "Blog Post Not Found",
    }
  }

  return generateSEOMetadata({
    title: `${post.title} - Agricultural Insights`,
    description: post.description,
    keywords: [
      'farming blog', 'agricultural insights', 'farming tips', 'seed knowledge',
      'sustainable agriculture', 'organic farming', 'crop management', 'seasonal farming',
      'plant care', 'farming techniques', 'agricultural research', 'farming guides'
    ],
    url: `/blog/${slug}`,
    type: 'article',
    publishedTime: post.date,
    author: post.author,
    tags: ['agriculture', 'farming', 'seeds'],
  })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  // Generate structured data for the article
  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.description,
    author: post.author,
    publishedTime: post.date,
    image: '/images/logo.png', // Default image for blog posts
    url: `/blog/${slug}`,
    tags: ['agriculture', 'farming', 'seeds'],
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${slug}` },
  ])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <StructuredData data={[articleSchema, breadcrumbSchema]} />
      <SiteHeader />

      <div className="container">
        <Breadcrumb customTitle={post.title} />
      </div>

      <main className="flex-1">
        <div className="relative overflow-hidden bg-muted/30 py-12 md:py-24">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div className="absolute inset-0 bg-[grid_var(--primary)_1px_transparent_0] [background-size:40px_40px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          </div>

          <div className="container max-w-7xl relative z-10 px-4">
            <div className="max-w-6xl">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold tracking-wider uppercase mb-8 ring-1 ring-primary/20 backdrop-blur-sm">
                <Tag className="h-3.5 w-3.5" />
                Agricultural Excellence
              </div>

              <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-balance leading-[1.05] mb-8 lg:mb-12">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-8 pt-4 border-t border-border/50">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-primary/30 to-accent/30 flex items-center justify-center font-bold text-primary-foreground text-xl shadow-xl shadow-primary/10">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-base font-bold text-foreground leading-tight">{post.author}</p>
                    <p className="text-sm text-muted-foreground font-medium">Chief Agronomist</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <div className="flex items-center gap-2.5 text-sm font-medium text-muted-foreground bg-background/50 px-4 py-2 rounded-xl ring-1 ring-border/50">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm font-medium text-muted-foreground bg-background/50 px-4 py-2 rounded-xl ring-1 ring-border/50">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>8 min read</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <article className="py-16 md:py-24">
          <div className="container max-w-7xl px-4">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-16 md:gap-24">
              <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-strong:text-foreground">
                <p className="text-2xl md:text-3xl font-semibold text-foreground leading-[1.4] mb-16 relative">
                  <span className="absolute -left-6 top-0 bottom-0 w-1.5 bg-accent rounded-full hidden md:block" />
                  {post.description}
                </p>

                <div className="space-y-10 text-foreground/90 leading-relaxed font-sans text-lg md:text-xl">
                  <p>
                    {`In the ever-evolving world of agriculture, understanding the fundamentals of seed quality and selection is crucial for farmers seeking to maximize their yields and ensure sustainable farming practices. This comprehensive guide explores the key concepts and practical applications that every farmer should know.`}
                  </p>

                  <div className="relative group my-20">
                    <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000" />
                    <div className="relative aspect-[21/9] bg-muted/30 rounded-[2rem] overflow-hidden border border-border/50 shadow-2xl flex items-center justify-center">
                      <div className="text-[10rem] md:text-[12rem] filter drop-shadow-2xl animate-pulse">🌾</div>
                      <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                        <div className="space-y-1">
                          <p className="text-xs font-black uppercase tracking-[0.2em] text-primary/80">Visualization</p>
                          <p className="text-sm font-medium text-foreground/60">Optimized Hybrid Growth Patterns</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center text-primary">
                          <Share2 className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-4xl font-bold text-foreground tracking-tight mt-20 mb-8 border-b pb-4">
                    Fundamental Principles
                  </h2>

                  <p>
                    Quality seeds form the foundation of successful agriculture. When selecting seeds, farmers must
                    consider multiple factors including germination rates, disease resistance, adaptability to local
                    climate conditions, and market demand for the eventual produce.
                  </p>

                  <p>
                    The seed industry has made tremendous advances in recent years, developing varieties that not only
                    produce higher yields but also require fewer inputs such as water, fertilizers, and pesticides.
                  </p>

                  <blockquote className="my-16 border-none p-0 relative">
                    <div className="absolute -left-4 top-0 bottom-0 w-2 bg-gradient-to-b from-primary to-accent rounded-full" />
                    <div className="pl-10 space-y-4">
                      <p className="text-3xl md:text-4xl font-bold leading-tight italic text-foreground tracking-tight">
                        "Agriculture is our wisest pursuit, because it will in the end contribute most to real wealth,
                        good morals, and happiness."
                      </p>
                      <cite className="block text-base font-bold text-muted-foreground not-italic tracking-wider uppercase">
                        — Thomas Jefferson
                      </cite>
                    </div>
                  </blockquote>

                  <h2 className="text-4xl font-bold text-foreground tracking-tight mt-20 mb-8 border-b pb-4">
                    Sustainable Practices
                  </h2>

                  <p>
                    Implementing best practices in seed selection and management requires careful planning and attention
                    to detail. Farmers should always purchase seeds from reputable suppliers who provide proper
                    certification and guarantee the quality of their products.
                  </p>

                  <div className="p-10 rounded-[2rem] bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 my-16 shadow-inner relative overflow-hidden group">
                    <div className="absolute -right-10 -bottom-10 opacity-[0.05] group-hover:scale-110 transition-transform duration-700">
                      <BookOpen className="h-64 w-64" />
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                      <div className="h-14 w-14 shrink-0 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                        <Tag className="h-6 w-6" />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-2xl font-black text-primary uppercase tracking-tight">Strategic Insight</h3>
                        <p className="text-xl text-foreground/90 font-medium leading-relaxed">
                          Always conduct a small-scale trial before committing to a new seed variety across your entire
                          acreage. Local soil conditions can vary significantly even within the same district.
                        </p>
                      </div>
                    </div>
                  </div>

                  <p>
                    As we look toward the future of agriculture, the role of quality seeds becomes even more critical.
                    Climate change, water scarcity, and growing populations demand that we continually improve our
                    agricultural practices.
                  </p>
                </div>
              </div>

              <aside className="hidden md:block">
                <div className="sticky top-24 space-y-12">
                  <div className="space-y-6">
                    <h5 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
                      Share Article
                    </h5>
                    <div className="flex gap-3">
                      {["Twitter", "LinkedIn", "Copy Link"].map((label) => (
                        <Button
                          key={label}
                          variant="outline"
                          size="sm"
                          className="rounded-xl font-bold text-xs bg-transparent"
                        >
                          {label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="p-8 rounded-[2rem] bg-muted/50 border border-border/50 space-y-6">
                    <div className="h-12 w-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-lg leading-tight">Expert Consultation</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Need personalized advice for your crop season?
                      </p>
                    </div>
                    <Button
                      asChild
                      variant="secondary"
                      size="lg"
                      className="w-full rounded-2xl px-10 font-black h-14 bg-background text-primary hover:bg-background/90 shadow-xl"
                    >
                      <Link href="/contact">Book Call</Link>
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h5 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Tags</h5>
                    <div className="flex flex-wrap gap-2">
                      {["Yield", "Hybrid", "Sustainability", "Farming"].map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-lg bg-background border text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:border-primary hover:text-primary transition-colors cursor-pointer"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            </div>

            <Separator className="my-24" />

            <div className="flex flex-col md:flex-row justify-between items-center gap-8 p-12 rounded-[2.5rem] bg-gradient-to-tr from-primary to-accent text-primary-foreground shadow-2xl shadow-primary/20 overflow-hidden relative group">
              <div className="absolute inset-0 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--background)_1px,_transparent_1px)] [background-size:32px_32px]" />
              </div>

              <div className="space-y-2 text-center md:text-left relative z-10">
                <h4 className="font-black text-3xl md:text-4xl tracking-tight">Ready to boost your yield?</h4>
                <p className="text-primary-foreground/80 font-medium text-lg">
                  Join 10,000+ farmers using Savaj Seeds excellence.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full md:w-auto">
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="rounded-2xl px-10 font-black h-14 bg-background text-primary hover:bg-background/90 shadow-xl"
                >
                  <Link href="/contact">Inquiry Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  )
}
