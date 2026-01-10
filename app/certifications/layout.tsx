import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Certifications & Quality Standards - Savaj Seeds",
  description: "Discover Savaj Seeds' certifications including ISO 9001:2015, NPOP Organic Certification, and quality standards that ensure premium seed quality and agricultural excellence.",
  keywords: [
    "seed certifications", "ISO 9001 certification", "organic certification", "NPOP certification",
    "quality standards", "seed quality assurance", "agricultural certifications", "quality guarantee",
    "certified seeds", "quality control", "seed testing", "agricultural standards",
    "farming certifications", "seed supplier certifications", "quality management"
  ],
  openGraph: {
    title: "Certifications & Quality Standards - Savaj Seeds",
    description: "Certified quality standards ensuring premium seed quality and agricultural excellence.",
    url: "https://savajseeds.com/certifications",
    type: "website",
  },
}

export default function CertificationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}