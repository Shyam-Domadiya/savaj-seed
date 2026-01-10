"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Headphones,
  CheckCircle,
  Star,
  Award,
  Users,
  Truck,
  Shield,
  Zap
} from "lucide-react"
import { businessInfo } from "@/lib/data/team"
import { businessInformation } from "@/lib/data/faq"

export function BusinessInformation() {
  const responseTimeData = [
    {
      method: "Phone Call",
      time: businessInformation.responseTime.phone,
      icon: <Phone className="w-4 h-4" />,
      color: "bg-green-100 text-green-700",
      available: "Mon-Fri 9AM-6PM, Sat 9AM-2PM"
    },
    {
      method: "WhatsApp",
      time: businessInformation.responseTime.whatsapp,
      icon: <MessageCircle className="w-4 h-4" />,
      color: "bg-green-100 text-green-700",
      available: "24/7 automated, Live chat 9AM-6PM"
    },
    {
      method: "Email",
      time: businessInformation.responseTime.email,
      icon: <Mail className="w-4 h-4" />,
      color: "bg-blue-100 text-blue-700",
      available: "24/7"
    },
    {
      method: "Live Chat",
      time: businessInformation.responseTime.liveChat,
      icon: <Headphones className="w-4 h-4" />,
      color: "bg-purple-100 text-purple-700",
      available: "Mon-Fri 9AM-6PM"
    },
    {
      method: "Emergency Hotline",
      time: businessInformation.responseTime.emergencyHotline,
      icon: <Zap className="w-4 h-4" />,
      color: "bg-red-100 text-red-700",
      available: "24/7 for urgent agricultural issues"
    }
  ]

  const companyStats = [
    { label: "Years in Business", value: "14+", icon: <Award className="w-5 h-5" /> },
    { label: "Happy Customers", value: "10,000+", icon: <Users className="w-5 h-5" /> },
    { label: "Seed Varieties", value: "500+", icon: <Star className="w-5 h-5" /> },
    { label: "States Served", value: "8+", icon: <Truck className="w-5 h-5" /> },
  ]

  return (
    <div className="space-y-8">
      {/* Company Overview */}
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle className="text-2xl">About Savaj Seeds</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            Established in {businessInfo.establishedYear}, Savaj Seeds has been a trusted partner for farmers 
            and gardeners across India. We specialize in providing high-quality seeds, expert agricultural 
            guidance, and comprehensive farming support to help you achieve optimal yields.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {companyStats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-white/50 rounded-lg">
                <div className="flex items-center justify-center text-primary mb-2">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Response Time Expectations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Response Time Expectations
          </CardTitle>
          <p className="text-muted-foreground">
            We're committed to providing timely responses across all communication channels.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {responseTimeData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${item.color}`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{item.method}</h4>
                    <p className="text-sm text-muted-foreground">{item.available}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="font-medium">
                  {item.time}
                </Badge>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-start gap-2">
              <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">Our Commitment</h4>
                <p className="text-sm text-muted-foreground">
                  We guarantee response within the stated timeframes during business hours. 
                  For urgent agricultural emergencies, our 24/7 hotline ensures immediate assistance.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Areas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Service Areas & Delivery
          </CardTitle>
          <p className="text-muted-foreground">
            We serve customers across multiple states with reliable delivery and local support.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Delivery Locations</h4>
              <div className="space-y-2">
                {businessInformation.serviceAreas.map((area, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{area}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Delivery Options</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Standard Delivery</span>
                  <Badge variant="outline">5-7 days</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Express Delivery</span>
                  <Badge variant="outline">2-3 days</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Same Day (Local)</span>
                  <Badge variant="outline">Same day</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Bulk Orders</span>
                  <Badge variant="outline">Custom</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Special Services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            Special Services & Support
          </CardTitle>
          <p className="text-muted-foreground">
            Beyond seeds, we offer comprehensive agricultural support services.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {businessInformation.specialServices.map((service, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">{service}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Button size="lg" className="mr-4">
              <Phone className="w-4 h-4 mr-2" />
              Contact Our Experts
            </Button>
            <Button variant="outline" size="lg">
              <Mail className="w-4 h-4 mr-2" />
              Request Consultation
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Business Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Office Hours</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Monday - Friday</span>
                  <span className="text-muted-foreground">{businessInfo.businessHours.weekdays}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Saturday</span>
                  <span className="text-muted-foreground">{businessInfo.businessHours.saturday}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Sunday</span>
                  <span className="text-muted-foreground">{businessInfo.businessHours.sunday}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Emergency Support</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-red-500" />
                  <span className="text-sm">24/7 Emergency Hotline</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">WhatsApp Support Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Email Support 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}