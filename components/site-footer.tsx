import Link from "next/link"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin
} from "lucide-react"
import { ScreenReaderOnly } from "@/components/screen-reader-only"
import { WeatherWidget } from "@/components/weather-widget"
import { businessInfo } from "@/lib/data/team"

export function SiteFooter() {
  const socialIcons = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    youtube: Youtube,
    linkedin: Linkedin,
  };

  return (
    <footer className="border-t bg-muted/20" id="footer">
      <div className="container py-16 md:py-20">
        <ScreenReaderOnly as="h2">
          Footer Navigation and Contact Information
        </ScreenReaderOnly>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Company Info */}
          <div className="space-y-5 lg:col-span-2 animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
            <Link href="/" aria-label="Savaj Seeds - Go to homepage">
              <Image
                src="/images/logo.png"
                alt="Savaj Seeds logo"
                width={200}
                height={132}
                className="h-14 w-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
              />
            </Link>
            <p className="text-[15px] text-muted-foreground leading-relaxed max-w-sm">
              {"Happiness from the Farmer's Field. Quality seeds for sustainable agriculture and better harvests since 2010."}
            </p>

            {/* Business Registration */}
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>{businessInfo.companyName}</p>
              {businessInfo.registrationNumber && <p>{businessInfo.registrationNumber}</p>}
              <p>{businessInfo.gstNumber}</p>
            </div>

            {/* Social Media */}
            <div className="flex gap-3">
              <ScreenReaderOnly>Follow us on social media:</ScreenReaderOnly>
              {Object.entries(businessInfo.socialMedia).map(([platform, url]) => {
                if (!url) return null;
                const IconComponent = socialIcons[platform as keyof typeof socialIcons];
                return (
                  <Button
                    key={platform}
                    variant="outline"
                    size="icon"
                    className="w-9 h-9 hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    asChild
                  >
                    <Link
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow us on ${platform.charAt(0).toUpperCase() + platform.slice(1)} (opens in new tab)`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </Link>
                  </Button>
                );
              })}
            </div>

            {/* Weather Widget */}
            <div className="pt-4">
              <WeatherWidget />
            </div>
          </div>

          {/* Quick Links */}
          <nav className="animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-100" aria-labelledby="footer-quick-links">
            <h3 id="footer-quick-links" className="font-semibold text-[17px] mb-5 text-foreground">Quick Links</h3>
            <ul className="space-y-3.5">
              <li>
                <Link
                  href="/"
                  className="text-[15px] text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[15px] text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-[15px] text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-[15px] text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="text-[15px] text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  Testimonials
                </Link>
              </li>
            </ul>
          </nav>

          {/* Product Categories */}
          <nav className="animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-200" aria-labelledby="footer-product-categories">
            <h3 id="footer-product-categories" className="font-semibold text-[17px] mb-5 text-foreground">Product Categories</h3>
            <ul className="space-y-3.5 text-[15px] text-muted-foreground">
              <li>
                <Link
                  href="/products?category=vegetable"
                  className="hover:text-primary hover:translate-x-1 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded inline-block"
                >
                  Vegetable Seeds
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=crop"
                  className="hover:text-primary hover:translate-x-1 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded inline-block"
                >
                  Crop Seeds
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=hybrid"
                  className="hover:text-primary hover:translate-x-1 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded inline-block"
                >
                  Hybrid Seeds
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=organic"
                  className="hover:text-primary hover:translate-x-1 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded inline-block"
                >
                  Organic Seeds
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact Information */}
          <address className="animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-300 not-italic">
            <h3 className="font-semibold text-[17px] mb-5 text-foreground">Contact Information</h3>
            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div className="text-[15px] text-muted-foreground">
                  <p>{businessInfo.address.street}</p>
                  <p>{businessInfo.address.city}, {businessInfo.address.state}</p>
                  <p>{businessInfo.address.pincode}, {businessInfo.address.country}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                {businessInfo.contact.phone.map((phone, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                    <Link
                      href={`tel:${phone}`}
                      className="text-[15px] text-muted-foreground hover:text-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                      aria-label={`Call us at ${phone}`}
                    >
                      {phone}
                    </Link>
                  </div>
                ))}
              </div>

              {/* Email */}
              <div className="space-y-2">
                {businessInfo.contact.email.map((email, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                    <Link
                      href={`mailto:${email}`}
                      className="text-[15px] text-muted-foreground hover:text-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                      aria-label={`Send email to ${email}`}
                    >
                      {email}
                    </Link>
                  </div>
                ))}
              </div>

              {/* WhatsApp */}
              {businessInfo.contact.whatsapp && (
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                  <Link
                    href={`https://wa.me/${businessInfo.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] text-muted-foreground hover:text-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                    aria-label={`Contact us on WhatsApp at ${businessInfo.contact.whatsapp} (opens in new tab)`}
                  >
                    {businessInfo.contact.whatsapp}
                  </Link>
                </div>
              )}


            </div>
          </address>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-5 animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-[400ms]">
          <p className="text-[15px] text-muted-foreground">
            © {new Date().getFullYear()} {businessInfo.companyName}. All rights reserved.
          </p>
          <nav className="flex gap-8" aria-label="Legal links">
            <Link
              href="/privacy-policy"
              className="text-[15px] text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-[15px] text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
            >
              Terms of Service
            </Link>
            <Link
              href="/refund-policy"
              className="text-[15px] text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
            >
              Refund Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
