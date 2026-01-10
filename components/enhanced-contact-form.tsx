"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useFormAnalytics } from "@/hooks/use-analytics"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  category: string
  message: string
}

interface FormErrors {
  [key: string]: string
}

const contactCategories = [
  { value: "product-inquiry", label: "Product Inquiry" },
  { value: "technical-support", label: "Technical Support" },
  { value: "bulk-order", label: "Bulk Order" },
  { value: "partnership", label: "Partnership Opportunity" },
  { value: "complaint", label: "Complaint/Issue" },
  { value: "general", label: "General Inquiry" },
]

export function EnhancedContactForm() {
  const { toast } = useToast()
  const { trackFormStart, trackFormFieldFocus, trackFormSubmit, trackFormError } = useFormAnalytics('contact', 'contact_page')
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required"
        if (value.trim().length < 2) return "Name must be at least 2 characters"
        return ""
      case "email":
        if (!value.trim()) return "Email is required"
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) return "Please enter a valid email address"
        return ""
      case "phone":
        if (value && !/^[\+]?[0-9\s\-\(\)]{10,15}$/.test(value.replace(/\s/g, ""))) {
          return "Please enter a valid phone number"
        }
        return ""
      case "subject":
        if (!value.trim()) return "Subject is required"
        if (value.trim().length < 5) return "Subject must be at least 5 characters"
        return ""
      case "category":
        if (!value) return "Please select a category"
        return ""
      case "message":
        if (!value.trim()) return "Message is required"
        if (value.trim().length < 10) return "Message must be at least 10 characters"
        return ""
      default:
        return ""
    }
  }

  const handleChange = (name: string, value: string) => {
    // Track form start on first interaction
    if (!hasStarted) {
      trackFormStart()
      setHasStarted(true)
    }

    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const handleFocus = (name: string) => {
    trackFormFieldFocus(name)
  }

  const handleBlur = (name: string, value: string) => {
    const error = validateField(name, value)
    if (error) {
      trackFormError(error, name)
    }
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof FormData])
      if (error) newErrors[key] = error
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      trackFormError("Form validation failed", "form_validation")
      toast({
        title: "Please fix the errors",
        description: "Check the form for validation errors and try again.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Track successful form submission
      trackFormSubmit()

      toast({
        title: "Message Sent Successfully!",
        description: `Thank you ${formData.name}! We'll respond within 24 hours to your ${formData.category.replace('-', ' ')} inquiry.`,
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        category: "",
        message: "",
      })
      setErrors({})
      setHasStarted(false)
    } catch (error) {
      trackFormError("Form submission failed", "api_error")
      toast({
        title: "Failed to send message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getFieldIcon = (fieldName: string) => {
    if (errors[fieldName]) {
      return <AlertCircle className="w-4 h-4 text-destructive" />
    }
    if (formData[fieldName as keyof FormData] && !errors[fieldName]) {
      return <CheckCircle className="w-4 h-4 text-green-500" />
    }
    return null
  }

  return (
    <Card className="border-border/50 shadow-sm hover:shadow-lg transition-all duration-300">
      <CardHeader className="space-y-3">
        <CardTitle className="text-3xl">Send Us a Message</CardTitle>
        <CardDescription className="text-[15px]">
          Fill out the form below and we'll respond as soon as possible. Fields marked with * are required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[15px] flex items-center gap-2">
                Full Name *
                {getFieldIcon("name")}
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onFocus={() => handleFocus("name")}
                onBlur={(e) => handleBlur("name", e.target.value)}
                className={cn(
                  "h-11 focus:ring-2 focus:ring-primary/20 transition-all duration-300",
                  errors.name && "border-destructive focus:ring-destructive/20"
                )}
              />
              {errors.name && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[15px] flex items-center gap-2">
                Email Address *
                {getFieldIcon("email")}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onFocus={() => handleFocus("email")}
                onBlur={(e) => handleBlur("email", e.target.value)}
                className={cn(
                  "h-11 focus:ring-2 focus:ring-primary/20 transition-all duration-300",
                  errors.email && "border-destructive focus:ring-destructive/20"
                )}
              />
              {errors.email && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-[15px] flex items-center gap-2">
                Phone Number
                {getFieldIcon("phone")}
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 123 456 7890"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                onBlur={(e) => handleBlur("phone", e.target.value)}
                className={cn(
                  "h-11 focus:ring-2 focus:ring-primary/20 transition-all duration-300",
                  errors.phone && "border-destructive focus:ring-destructive/20"
                )}
              />
              {errors.phone && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-[15px] flex items-center gap-2">
                Category *
                {getFieldIcon("category")}
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleChange("category", value)}
              >
                <SelectTrigger className={cn(
                  "h-11 focus:ring-2 focus:ring-primary/20 transition-all duration-300",
                  errors.category && "border-destructive focus:ring-destructive/20"
                )}>
                  <SelectValue placeholder="Select inquiry type" />
                </SelectTrigger>
                <SelectContent>
                  {contactCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.category}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-[15px] flex items-center gap-2">
              Subject *
              {getFieldIcon("subject")}
            </Label>
            <Input
              id="subject"
              name="subject"
              placeholder="Brief description of your inquiry"
              value={formData.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              onBlur={(e) => handleBlur("subject", e.target.value)}
              className={cn(
                "h-11 focus:ring-2 focus:ring-primary/20 transition-all duration-300",
                errors.subject && "border-destructive focus:ring-destructive/20"
              )}
            />
            {errors.subject && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.subject}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-[15px] flex items-center gap-2">
              Message *
              {getFieldIcon("message")}
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Please provide detailed information about your inquiry..."
              rows={5}
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              onBlur={(e) => handleBlur("message", e.target.value)}
              className={cn(
                "focus:ring-2 focus:ring-primary/20 transition-all duration-300",
                errors.message && "border-destructive focus:ring-destructive/20"
              )}
            />
            {errors.message && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.message}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              {formData.message.length}/500 characters
            </p>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full h-12 text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Sending Message...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}