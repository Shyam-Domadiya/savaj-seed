export interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  tags: string[]
  featured: boolean
  lastUpdated: Date
}

export interface FAQCategory {
  id: string
  name: string
  description: string
  icon: string
}

export const faqCategories: FAQCategory[] = [
  {
    id: "products",
    name: "Products & Seeds",
    description: "Questions about our seed varieties, quality, and specifications",
    icon: "Package"
  },
  {
    id: "ordering",
    name: "Ordering & Delivery",
    description: "Information about placing orders, payment, and delivery",
    icon: "ShoppingCart"
  },
  {
    id: "farming",
    name: "Farming & Growing",
    description: "Agricultural advice, planting guides, and growing tips",
    icon: "Sprout"
  },
  {
    id: "support",
    name: "Support & Services",
    description: "Technical support, warranties, and customer service",
    icon: "Headphones"
  },
  {
    id: "business",
    name: "Business & Partnership",
    description: "Bulk orders, partnerships, and business inquiries",
    icon: "Building"
  },
  {
    id: "general",
    name: "General Information",
    description: "Company information, policies, and general questions",
    icon: "Info"
  }
]

export const faqItems: FAQItem[] = []

export const businessInformation = {
  responseTime: {
    phone: "Immediate during business hours",
    whatsapp: "Within 5 minutes during business hours",
    email: "Within 4 hours",
    liveChat: "Within 2 minutes during business hours",
    emergencyHotline: "24/7 availability"
  },
  serviceAreas: [
    "Gujarat (Primary service area)",
    "Rajasthan",
    "Madhya Pradesh", 
    "Maharashtra",
    "Haryana",
    "Punjab",
    "All India (bulk orders)",
    "International (special arrangements)"
  ],
  specialServices: [
    "Free soil testing consultation",
    "Custom seed variety development",
    "Organic farming certification support",
    "Crop insurance guidance",
    "Market linkage assistance",
    "Post-harvest processing advice"
  ]
}