"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumb } from "@/components/breadcrumb"
import { StructuredData } from "@/components/structured-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { generateBreadcrumbSchema } from "@/lib/seo"
import { Award, Shield, CheckCircle, ExternalLink } from "lucide-react"

export default function CertificationsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Certifications", url: "/certifications" },
  ])

  const certifications = [
    {
      name: "ISO 9001:2015",
      issuer: "Bureau of Indian Standards",
      category: "Quality Management",
      description: "International standard for quality management systems, ensuring consistent quality in our seed production and supply processes.",
      validUntil: "2025-12-31",
      verificationUrl: "https://www.bis.gov.in",
      benefits: [
        "Consistent quality processes",
        "Customer satisfaction focus",
        "Continuous improvement",
        "Risk-based thinking"
      ]
    },
    {
      name: "NPOP Organic Certification",
      issuer: "APEDA (Agricultural and Processed Food Products Export Development Authority)",
      category: "Organic Standards",
      description: "National Programme for Organic Production certification ensuring our organic seeds meet international organic standards.",
      validUntil: "2025-06-30",
      verificationUrl: "https://www.apeda.gov.in",
      benefits: [
        "Organic seed production",
        "Chemical-free processes",
        "Environmental sustainability",
        "Export quality standards"
      ]
    },
    {
      name: "Seed Certification",
      issuer: "State Seed Certification Agency, Gujarat",
      category: "Seed Quality",
      description: "Official certification for seed quality, purity, and germination standards as per Indian seed certification guidelines.",
      validUntil: "2025-03-31",
      verificationUrl: "https://www.seedcert.gujarat.gov.in",
      benefits: [
        "Guaranteed germination rates",
        "Genetic purity assurance",
        "Disease-free seeds",
        "Varietal authenticity"
      ]
    },
    {
      name: "FSSAI License",
      issuer: "Food Safety and Standards Authority of India",
      category: "Food Safety",
      description: "Food safety license ensuring our seed processing and packaging meets food safety standards.",
      validUntil: "2026-01-15",
      verificationUrl: "https://www.fssai.gov.in",
      benefits: [
        "Safe processing methods",
        "Hygienic packaging",
        "Contamination prevention",
        "Consumer safety"
      ]
    },
    {
      name: "Export Excellence Award",
      issuer: "Gujarat Chamber of Commerce",
      category: "Export Quality",
      description: "Recognition for excellence in agricultural exports and maintaining international quality standards.",
      validUntil: "Lifetime Achievement",
      verificationUrl: "https://www.gujaratchamber.org",
      benefits: [
        "International recognition",
        "Export quality standards",
        "Global market access",
        "Quality excellence"
      ]
    },
    {
      name: "Environmental Compliance",
      issuer: "Gujarat Pollution Control Board",
      category: "Environmental",
      description: "Certification for environmental compliance in our manufacturing and processing operations.",
      validUntil: "2025-09-30",
      verificationUrl: "https://www.gpcb.gov.in",
      benefits: [
        "Environmental protection",
        "Sustainable practices",
        "Waste management",
        "Eco-friendly operations"
      ]
    }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <StructuredData data={breadcrumbSchema} />
      <SiteHeader />
      
      <div className="container">
        <Breadcrumb />
      </div>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]" />
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center space-y-7">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4">
                <Award className="h-4 w-4" />
                <span>Quality Assured</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance leading-[1.1]">
                Certifications &{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Standards
                </span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light">
                Our commitment to quality is backed by internationally recognized certifications and rigorous quality standards that ensure every seed meets the highest agricultural excellence.
              </p>
            </div>
          </div>
        </section>

        {/* Certifications Grid */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certifications.map((cert, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="w-5 h-5 text-primary" />
                          <Badge variant="secondary">{cert.category}</Badge>
                        </div>
                        <CardTitle className="text-xl">{cert.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          Issued by: {cert.issuer}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {cert.description}
                    </p>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Key Benefits:</h4>
                      <ul className="space-y-1">
                        {cert.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Valid Until:</span>
                        <span className="font-medium">{cert.validUntil}</span>
                      </div>
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                      >
                        Verify Certificate
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Commitment */}
        <section className="py-20 md:py-28 bg-muted/40">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">Our Quality Commitment</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                These certifications represent our unwavering commitment to providing farmers with the highest quality seeds and agricultural solutions. Every certification is earned through rigorous testing, continuous improvement, and adherence to international standards.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold mb-2">Quality Assurance</h3>
                  <p className="text-sm text-muted-foreground">
                    Every batch tested for purity, germination, and disease resistance
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold mb-2">International Standards</h3>
                  <p className="text-sm text-muted-foreground">
                    Compliance with global quality and safety standards
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold mb-2">Continuous Improvement</h3>
                  <p className="text-sm text-muted-foreground">
                    Regular audits and process improvements for better quality
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}