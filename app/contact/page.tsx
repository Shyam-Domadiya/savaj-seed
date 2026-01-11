"use client"

import type React from "react"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { BusinessInfo } from "@/components/sections/contact/ContactDetails"
import { Breadcrumb } from "@/components/shared/breadcrumb"
import { EnhancedContactForm } from "@/components/sections/contact/EnhancedContactForm"
import { MultiContactMethods } from "@/components/sections/contact/MultiContactMethods"
import { LiveChatWidget } from "@/components/features/live-chat/live-chat-widget"
import { StructuredData } from "@/components/providers/structured-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { generateBreadcrumbSchema, generateLocalBusinessSchema } from "@/lib/seo"
import { MapPin } from "lucide-react"

export default function ContactPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ])

  // Enhanced local business schema for contact page
  const localBusinessSchema = generateLocalBusinessSchema({
    name: "Savaj Seeds - Ahmedabad Office",
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
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden animate-in fade-in duration-700">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/60 z-10" />
            <img
              src="/images/contact-hero.jpg"
              alt="Partnership in agriculture"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container relative z-20 text-center text-white space-y-7 animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-100 min-h-[40vh] flex flex-col items-center justify-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance leading-[1.1] drop-shadow-lg">
              Get in{" "}
              <span className="text-primary-foreground bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-300">Touch</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed font-light drop-shadow-md max-w-2xl">
              Have questions about our seeds or need expert advice? {"We're"} here to help you grow your success.
            </p>
          </div>
        </section>

        {/* Multiple Contact Methods Section */}
        <section className="py-20 md:py-28">
          <div className="container">
            <MultiContactMethods />
          </div>
        </section>

        {/* Contact Form and Business Info Section */}
        <section className="py-20 md:py-28 bg-muted/40">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12">
              <EnhancedContactForm />

              <div className="space-y-8">
                <BusinessInfo showRegistration={true} />

                <Card className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground border-0 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-in fade-in-50 slide-in-from-right-8 duration-700 delay-100">
                  <CardHeader>
                    <CardTitle className="text-2xl">Need Immediate Assistance?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <p className="leading-relaxed text-primary-foreground/90 text-[15px]">
                      Our agricultural experts are available to provide immediate guidance on seed selection and farming
                      practices.
                    </p>
                    <div className="space-y-3">
                      <Button
                        variant="secondary"
                        size="lg"
                        className="w-full h-12 text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                        onClick={() => window.open("tel:+917923456789")}
                      >
                        Call Now: +91 79 2345 6789
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full h-12 text-base bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                        onClick={() => window.open("https://wa.me/919173386405")}
                      >
                        WhatsApp: +91 91733 86405
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 animate-in fade-in-50 slide-in-from-bottom-8 duration-700 cursor-pointer">
          <div className="container">
            <div className="mx-auto max-w-4xl animate-in fade-in-50 slide-in-from-bottom-8 duration-700">
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/15 via-accent/10 to-secondary/15 flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 group">
                <div className="text-center space-y-5">
                  <MapPin className="h-20 w-20 text-primary mx-auto group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500" />
                  <p className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                    Visit Our Office
                  </p>
                  <p className="text-muted-foreground text-lg">123, Agricultural Complex, GIDC Estate<br />Ahmedabad, Gujarat 380015</p>
                  <Button
                    variant="outline"
                    size="lg"
                    className="mt-4"
                    onClick={() => window.open("https://maps.google.com/?q=Savaj+Seeds+Ahmedabad")}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      {/* Live Chat Widget */}
      <LiveChatWidget />
    </div>
  )
}
