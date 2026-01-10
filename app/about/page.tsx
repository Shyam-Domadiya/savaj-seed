import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumb } from "@/components/breadcrumb"
import { StructuredData } from "@/components/structured-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { generateBreadcrumbSchema, generateOrganizationSchema } from "@/lib/seo"
import { Sprout, Users, Award, TrendingUp, Leaf, Shield } from "lucide-react"
import { Metadata } from "next"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations"

export const metadata: Metadata = {
  title: "About Savaj Seeds - Leading Agricultural Solutions Provider in Gujarat",
  description: "Learn about Savaj Seeds' mission to provide premium quality seeds, agricultural expertise, and commitment to farmer success across India. Discover our story, values, and team.",
  keywords: [
    "about Savaj Seeds", "company history", "agricultural expertise", "seed supplier Gujarat",
    "farming solutions", "agricultural consulting", "seed technology", "farming innovation",
    "agricultural research", "seed quality", "farming success", "agricultural development",
    "Gujarat agriculture", "seed industry leader", "farming community", "agricultural excellence"
  ],
  openGraph: {
    title: "About Savaj Seeds - Leading Agricultural Solutions Provider",
    description: "Discover our journey, mission, and commitment to agricultural excellence.",
    url: "https://savajseeds.com/about",
    type: "website",
  },
}

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ])

  const organizationSchema = generateOrganizationSchema()

  const stats = [
    { label: "Quality Focus", value: "100%", icon: Award },
    { label: "Happy Farmers", value: "Growing", icon: Users },
    { label: "Seed Varieties", value: "Premium", icon: Sprout },
    { label: "Service Area", value: "Pan India", icon: TrendingUp },
  ]

  const values = [
    {
      title: "Quality First",
      description: "Every seed undergoes rigorous testing to ensure the highest quality and germination rates.",
      icon: Shield,
    },
    {
      title: "Farmer Success",
      description: "Our success is measured by the success of the farmers who trust us with their crops.",
      icon: TrendingUp,
    },
    {
      title: "Innovation",
      description: "Continuous research and development to bring the latest agricultural innovations to farmers.",
      icon: Leaf,
    },
    {
      title: "Sustainability",
      description: "Promoting sustainable farming practices that protect the environment for future generations.",
      icon: Sprout,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <StructuredData data={[breadcrumbSchema, organizationSchema]} />
      <SiteHeader />

      <div className="container">
        <Breadcrumb />
      </div>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/60 z-10" />
            <img
              src="/images/about-hero.jpg"
              alt="Diverse group of farmers and experts"
              className="w-full h-full object-cover animate-zoom-in duration-700"
            />
          </div>
          <div className="container relative z-20 text-center text-white space-y-7">
            <FadeIn direction="up" duration={0.8}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-white mb-4 backdrop-blur-md hover:bg-white/20 transition-colors duration-300">
                <Sprout className="h-4 w-4" />
                <span>Our Story</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance leading-[1.1] drop-shadow-lg mb-6">
                Growing{" "}
                <span className="text-primary-foreground bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-300">
                  Together
                </span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed font-light max-w-3xl mx-auto drop-shadow-md">
                Dedicated to empowering farmers with premium quality seeds and expert agricultural guidance, fostering growth and prosperity in farming communities across India.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 md:py-28">
          <div className="container">
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <StaggerItem key={index}>
                  <Card className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 md:py-28 bg-muted/40">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <FadeIn className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Story</h2>
                <p className="text-lg text-muted-foreground">
                  A fresh vision for modern agriculture
                </p>
              </FadeIn>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <FadeIn direction="right" className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/images/our-story.jpg"
                    alt="Founder teaching younger farmer"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <p className="font-semibold text-lg">Knowledge Transfer</p>
                    <p className="text-sm opacity-90">Building the future of farming</p>
                  </div>
                </FadeIn>

                <FadeIn direction="left" delay={0.2} className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    Founded with a bold vision to revolutionize agriculture in Gujarat and beyond, Savaj Seeds is a new initiative driven by a passion for quality and farmer success. We saw the gap in the market for reliable, high-yield seeds and decided to step up.
                  </p>

                  <p className="text-lg leading-relaxed text-muted-foreground">
                    Our team brings together spirited agricultural experts and modern technological approaches to solve age-old farming challenges. We started by rigorously selecting obtaining the best genetics for vegetable and crop seeds, ensuring that every seed we offer is capable of unlocking potential.
                  </p>

                  <p className="text-lg leading-relaxed text-muted-foreground">
                    Today, as we launch our operations, we are committed to building lasting relationships with farmers. We are not just selling seeds; we are partnering with farmers to ensure their prosperity through expert guidance and premium products. This is just the beginning of our journey to grow together.
                  </p>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12">
              <FadeIn direction="right">
                <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <TrendingUp className="w-6 h-6 text-primary animate-pulse" />
                      Our Mission
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      To empower farmers with premium quality seeds, innovative agricultural solutions, and expert guidance that enables them to achieve higher yields, better quality crops, and sustainable farming practices. We are committed to being the trusted partner in every farmer's journey toward success and prosperity.
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>

              <FadeIn direction="left" delay={0.2}>
                <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Leaf className="w-6 h-6 text-primary animate-pulse" />
                      Our Vision
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      To be the leading agricultural solutions provider in India, recognized for our commitment to quality, innovation, and farmer success. We envision a future where every farmer has access to the best seeds, knowledge, and support needed to thrive in modern agriculture while preserving the environment for future generations.
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 md:py-28 bg-muted/40">
          <div className="container">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do and shape our relationships with farmers and partners
              </p>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <StaggerItem key={index}>
                  <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <value.icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Company Timeline */}
        <section className="py-20 md:py-28">
          <div className="container">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Key milestones in our growth and commitment to agricultural excellence
              </p>
            </FadeIn>
            <div className="max-w-4xl mx-auto">
              <StaggerContainer className="space-y-8">
                {[
                  {
                    title: "Inception",
                    desc: "The vision for Savaj Seeds was born out of a desire to bring better quality seeds to local farmers."
                  },
                  {
                    title: "Research & Development",
                    desc: "Extensive research and collaboration with breeders to select the highest performing varieties."
                  },
                  {
                    title: "Quality Assurance",
                    desc: "Establishing rigorous quality control processes to ensure 98%+ germination rates."
                  },
                  {
                    title: "Digital Innovation",
                    desc: "Building a modern digital platform to make high-quality seeds accessible to everyone."
                  },
                  {
                    title: "Official Launch",
                    desc: "Launching Savaj Seeds with a commitment to transform agriculture, one seed at a time."
                  }
                ].map((item, i) => (
                  <StaggerItem key={i}>
                    <div className="flex items-start gap-4">
                      <div className="w-4 h-4 bg-primary rounded-full mt-2 flex-shrink-0 animate-pulse" />
                      <div>
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </section>

        {/* Team Showcase */}
        <section className="py-20 md:py-28 bg-muted/40">
          <div className="container">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experienced agricultural experts dedicated to your farming success
              </p>
            </FadeIn>
            <StaggerContainer className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Agricultural Experts", desc: "Our team of experienced agronomists provides expert guidance on seed selection and farming practices.", icon: Users },
                { title: "Quality Specialists", desc: "Dedicated quality control team ensuring every seed meets our rigorous standards.", icon: Shield },
                { title: "Customer Support", desc: "Responsive customer service team providing ongoing support throughout your farming journey.", icon: TrendingUp }
              ].map((member, i) => (
                <StaggerItem key={i}>
                  <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                    <CardContent className="p-6">
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <member.icon className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{member.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {member.desc}
                      </p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-20 md:py-28">
          <div className="container">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Quality Certifications</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our commitment to quality is backed by internationally recognized certifications
              </p>
            </FadeIn>
            <StaggerContainer className="grid md:grid-cols-3 gap-8">
              {[
                { title: "ISO 9001:2015", desc: "Quality management system certification ensuring consistent quality processes.", icon: Award },
                { title: "NPOP Organic", desc: "Organic certification for environmentally sustainable seed production.", icon: Leaf },
                { title: "Seed Certification", desc: "Official seed quality certification ensuring purity and germination standards.", icon: Shield }
              ].map((cert, i) => (
                <StaggerItem key={i}>
                  <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <cert.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{cert.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {cert.desc}
                      </p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />
          <div className="container relative z-10">
            <FadeIn className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-balance leading-tight">
                Ready to Partner with Us?
              </h2>
              <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed font-light">
                Join thousands of successful farmers who trust Savaj Seeds for their agricultural needs. Let's grow together toward a more prosperous future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md bg-background text-primary px-8 py-3 text-base font-medium shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300"
                >
                  Get in Touch
                </a>
                <a
                  href="/products"
                  className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 hover:bg-primary-foreground/10 bg-transparent text-primary-foreground hover:text-primary-foreground px-8 py-3 text-base font-medium hover:scale-110 transition-all duration-300 hover:shadow-lg"
                >
                  Explore Our Products
                </a>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}