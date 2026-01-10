"use client"

import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import dynamic from "next/dynamic"
import { Product } from "@/lib/types/product"
import { ProductGuidePDF } from "@/components/pdf/product-guide-pdf"

// Dynamically import PDFDownloadLink to avoid SSR issues with @react-pdf/renderer
const PDFDownloadLink = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
        ssr: false,
        loading: () => (
            <Button variant="outline" size="lg" disabled>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Loading Guide...
            </Button>
        ),
    }
) as any // Cast to any to avoid TS errors with render props in dynamic import

interface DownloadGuideButtonProps {
    product: Product
}

export function DownloadGuideButton({ product }: DownloadGuideButtonProps) {
    return (
        <PDFDownloadLink
            document={<ProductGuidePDF product={product} />}
            fileName={`${product.name.replace(/\s+/g, '-').toLowerCase()}-guide.pdf`}
        >
            {({ blob, url, loading, error }) => (
                <Button variant="outline" size="lg" disabled={loading}>
                    {loading ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                        <Download className="h-4 w-4 mr-2" />
                    )}
                    {loading ? "Preparing PDF..." : "Download Guide PDF"}
                </Button>
            )}
        </PDFDownloadLink>
    )
}
