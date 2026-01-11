"use client"

import React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Linkedin,
  Clock,
  MapPin,
  Headphones,
  MessageSquare,
  Video,
  Calendar
} from "lucide-react"
import { businessInfo } from "@/lib/data/team"

interface ContactMethod {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  action: () => void
  availability: string
  responseTime: string
  preferred?: boolean
}

export function MultiContactMethods() {
  const contactMethods: ContactMethod[] = [
    {
      id: "phone",
      name: "Phone Call",
      description: "Speak directly with our agricultural experts",
      icon: <Phone className="w-5 h-5" />,
      action: () => window.open(`tel:${businessInfo.contact.phone[0]}`),
      availability: "Mon-Fri 9AM-6PM, Sat 9AM-2PM",
      responseTime: "Immediate",
      preferred: true,
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      description: "Quick messaging with instant responses",
      icon: <MessageCircle className="w-5 h-5" />,
      action: () => window.open(`https://wa.me/${businessInfo.contact.whatsapp?.replace(/[^0-9]/g, '')}`),
      availability: "24/7 automated, Live chat 9AM-6PM",
      responseTime: "Within 5 minutes",
      preferred: true,
    },
    {
      id: "email",
      name: "Email Support",
      description: "Detailed inquiries and documentation",
      icon: <Mail className="w-5 h-5" />,
      action: () => window.open(`mailto:${businessInfo.contact.email[0]}`),
      availability: "24/7",
      responseTime: "Within 4 hours",
    },
    {
      id: "video-call",
      name: "Video Consultation",
      description: "Face-to-face consultation with experts",
      icon: <Video className="w-5 h-5" />,
      action: () => window.open("https://calendly.com/savajseeds/consultation"),
      availability: "By appointment",
      responseTime: "Schedule within 24 hours",
    },
    {
      id: "live-chat",
      name: "Live Chat",
      description: "Instant messaging on our website",
      icon: <MessageSquare className="w-5 h-5" />,
      action: () => {
        // This would trigger the live chat widget
        const event = new CustomEvent('openLiveChat')
        window.dispatchEvent(event)
      },
      availability: "Mon-Fri 9AM-6PM",
      responseTime: "Within 2 minutes",
    },
    {
      id: "callback",
      name: "Request Callback",
      description: "We'll call you at your preferred time",
      icon: <Headphones className="w-5 h-5" />,
      action: () => window.open("/contact#callback-form"),
      availability: "Schedule anytime",
      responseTime: "Within 1 hour",
    },
  ]

  const socialMethods = [
    {
      name: "Facebook",
      icon: <Facebook className="w-4 h-4" />,
      url: businessInfo.socialMedia.facebook,
      color: "hover:text-blue-600",
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-4 h-4" />,
      url: businessInfo.socialMedia.instagram,
      color: "hover:text-pink-600",
    },
    {
      name: "Twitter",
      icon: <Twitter className="w-4 h-4" />,
      url: businessInfo.socialMedia.twitter,
      color: "hover:text-blue-400",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-4 h-4" />,
      url: businessInfo.socialMedia.linkedin,
      color: "hover:text-blue-700",
    },
    {
      name: "YouTube",
      icon: <Youtube className="w-4 h-4" />,
      url: businessInfo.socialMedia.youtube,
      color: "hover:text-red-600",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Primary Contact Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Choose Your Preferred Contact Method</CardTitle>
          <p className="text-muted-foreground">
            We offer multiple ways to get in touch. Select the method that works best for you.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contactMethods.map((method) => (
              <Card
                key={method.id}
                className="relative cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                onClick={method.action}
              >
                {method.preferred && (
                  <Badge className="absolute -top-2 -right-2 bg-green-500 hover:bg-green-600">
                    Recommended
                  </Badge>
                )}
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      {method.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm mb-1">{method.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                        {method.description}
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{method.availability}</span>
                        </div>
                        <div className="text-xs font-medium text-green-600">
                          Response: {method.responseTime}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardHeader>
          <CardTitle className="text-xl text-orange-800 flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Emergency Agricultural Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-orange-700 mb-4">
            For urgent agricultural emergencies or time-sensitive crop issues, contact our 24/7 emergency hotline.
          </p>
          <Button
            variant="outline"
            className="border-orange-300 text-orange-700 hover:bg-orange-100"
            onClick={() => window.open("tel:+919173386405")}
          >
            <Phone className="w-4 h-4 mr-2" />
            Emergency Hotline: +91 91733 86405
          </Button>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Follow Us on Social Media</CardTitle>
          <p className="text-muted-foreground">
            Stay updated with farming tips, product launches, and agricultural insights.
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {socialMethods.map((social) => (
              <Button
                key={social.name}
                variant="outline"
                size="sm"
                className={`hover:scale-105 transition-all duration-300 ${social.color}`}
                asChild
              >
                <Link href={social.url || "#"} target="_blank" rel="noopener noreferrer">
                  {social.icon}
                  <span className="ml-2">{social.name}</span>
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Office Visit */}
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Visit Our Office
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Address</h4>
              <p className="text-muted-foreground mb-4">
                {businessInfo.address.street}<br />
                {businessInfo.address.city}, {businessInfo.address.state}<br />
                {businessInfo.address.pincode}, {businessInfo.address.country}
              </p>
              <Button
                variant="outline"
                onClick={() => window.open("https://maps.google.com/?q=Savaj+Seeds+Ahmedabad")}
              >
                <MapPin className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Office Hours</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-muted-foreground">{businessInfo.businessHours.weekdays}</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-muted-foreground">{businessInfo.businessHours.saturday}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-muted-foreground">{businessInfo.businessHours.sunday}</span>
                </div>
              </div>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => window.open("https://calendly.com/savajseeds/office-visit")}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Visit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}