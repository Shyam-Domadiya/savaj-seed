import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Savaj Seeds Ahmedabad - Premium Quality Seeds in Gujarat",
  description: "Visit Savaj Seeds in Ahmedabad, Gujarat for premium quality vegetable, crop, and hybrid seeds. Located in GIDC Estate with expert agricultural consulting and technical support services.",
  keywords: [
    "Savaj Seeds Ahmedabad", "seeds supplier Ahmedabad", "agricultural products Gujarat",
    "vegetable seeds Ahmedabad", "crop seeds Gujarat", "hybrid seeds Ahmedabad",
    "farming solutions Gujarat", "agricultural consulting Ahmedabad", "GIDC Estate seeds",
    "Gujarat seed supplier", "Ahmedabad farming", "agricultural products GIDC"
  ],
  openGraph: {
    title: "Savaj Seeds Ahmedabad - Premium Quality Seeds in Gujarat",
    description: "Visit our Ahmedabad location for premium quality seeds and expert agricultural consulting services.",
    url: "https://savajseeds.com/locations/ahmedabad",
    type: "website",
  },
}

export default function AhmedabadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}