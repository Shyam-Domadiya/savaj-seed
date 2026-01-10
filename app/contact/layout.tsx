import { generateMetadata as generateSEOMetadata } from "@/lib/seo"

export const metadata = generateSEOMetadata({
  title: "Contact Us - Get Expert Agricultural Advice",
  description: "Contact Savaj Seeds for expert agricultural advice, seed selection guidance, and farming solutions. Multiple contact methods available including phone, WhatsApp, email, and live chat support.",
  keywords: [
    "contact savaj seeds", "agricultural advice", "farming consultation", "seed selection help",
    "agricultural experts", "farming support", "seed supplier contact", "agricultural guidance",
    "farming questions", "seed technology support", "agricultural consulting", "farming solutions",
    "contact agricultural experts", "seed advice", "farming help", "agricultural support"
  ],
  url: "/contact",
  type: "website",
})

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}