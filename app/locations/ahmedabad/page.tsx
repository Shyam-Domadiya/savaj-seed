"use client"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/common/breadcrumb"
import { StructuredData } from "@/components/providers/structured-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { generateBreadcrumbSchema, generateLocalBusinessSchema } from "@/lib/seo"
import { MapPin, Phone, Clock, Mail, Navigation } from "lucide-react"

export default function AhmedabadLocationPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Locations", url: "/locations" },
    { name: "Ahmedabad", url: "/locations/ahmedabad" },
  ])

  const localBusinessSchema = generateLocalBusinessSchema({
    name: "Savaj Seeds - Ahmedabad Headquarters",
    address: "123, Agricultural Complex, GIDC Estate",
    city: "Ahmedabad",
    state: "Gujarat",
    postalCode: "380015",
    phone: "+91-79-2345-6789",
    latitude: 23.0225,
    longitude: 72.5714,
  })

  return (
    <div className="flex min-h-screen flex-col">
      <StructuredData data={[breadcrumbSchema, localBusinessSchema]} />
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
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance leading-[1.1]">
                Savaj Seeds{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Ahmedabad
                </span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light">
                Our headquarters in the heart of Gujarat's agricultural hub, serving farmers across the region with premium quality seeds and expert guidance.
              </p>
            </div>
          </div>
        </section>

        {/* Location Details */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Visit Our Ahmedabad Office
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Address</p>
                          <p className="text-muted-foreground">
                            123, Agricultural Complex<br />
                            GIDC Estate, Ahmedabad<br />
                            Gujarat 380015, India
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-muted-foreground">+91 79 2345 6789</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-muted-foreground">ahmedabad@savajseeds.com</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Business Hours</p>
                          <div className="text-muted-foreground space-y-1">
                            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                            <p>Saturday: 9:00 AM - 2:00 PM</p>
                            <p>Sunday: Closed</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        className="flex-1"
                        onClick={() => window.open("https://maps.google.com/?q=Savaj+Seeds+GIDC+Ahmedabad")}
                      >
                        <Navigation className="w-4 h-4 mr-2" />
                        Get Directions
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => window.open("tel:+917923456789")}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Services Available */}
                <Card>
                  <CardHeader>
                    <CardTitle>Services Available</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        Premium Quality Seeds Supply
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        Agricultural Consulting
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        Technical Support & Guidance
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        Seed Testing & Quality Assurance
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        Bulk Orders & Commercial Sales
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        Seasonal Planning Assistance
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Map Placeholder */}
              <div className="space-y-8">
                <Card>
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <MapPin className="w-16 h-16 text-primary mx-auto" />
                        <div>
                          <h3 className="text-xl font-semibold">Interactive Map</h3>
                          <p className="text-muted-foreground">Click to view our location on Google Maps</p>
                        </div>
                        <Button
                          onClick={() => window.open("https://maps.google.com/?q=23.0225,72.5714")}
                        >
                          View on Google Maps
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Area Coverage */}
                <Card>
                  <CardHeader>
                    <CardTitle>Service Coverage Area</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Our Ahmedabad office serves farmers and agricultural businesses across:
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm">• Ahmedabad District</div>
                      <div className="text-sm">• Gandhinagar</div>
                      <div className="text-sm">• Kheda District</div>
                      <div className="text-sm">• Anand District</div>
                      <div className="text-sm">• Mehsana District</div>
                      <div className="text-sm">• Sabarkantha</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Our Ahmedabad Location */}
        <section className="py-20 md:py-28 bg-muted/40">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose Our Ahmedabad Location?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Strategic location in Gujarat's agricultural hub with comprehensive services and expert support.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Strategic Location</h3>
                  <p className="text-sm text-muted-foreground">
                    Located in GIDC Estate, easily accessible from all major areas of Ahmedabad and surrounding districts.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Extended Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Extended business hours during planting seasons to better serve our farming community.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Local Expertise</h3>
                  <p className="text-sm text-muted-foreground">
                    Our team understands local soil conditions, climate patterns, and farming practices specific to Gujarat.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}