"use client"

import React, { useRef } from "react"
import QRCode from "react-qr-code"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface ProductQRCodeProps {
    url: string
    productName: string
}

export function ProductQRCode({ url, productName }: ProductQRCodeProps) {
    const qrRef = useRef<HTMLDivElement>(null)

    const handleDownload = () => {
        const svg = qrRef.current?.querySelector("svg")
        if (svg) {
            const svgData = new XMLSerializer().serializeToString(svg)
            const canvas = document.createElement("canvas")
            const ctx = canvas.getContext("2d")
            const img = new Image()

            img.onload = () => {
                canvas.width = img.width + 40 // Add padding
                canvas.height = img.height + 40
                if (ctx) {
                    ctx.fillStyle = "white"
                    ctx.fillRect(0, 0, canvas.width, canvas.height)
                    ctx.drawImage(img, 20, 20)

                    const pngFile = canvas.toDataURL("image/png")
                    const downloadLink = document.createElement("a")
                    downloadLink.download = `${productName.replace(/\s+/g, "-")}-qr.png`
                    downloadLink.href = pngFile
                    downloadLink.click()
                }
            }

            img.src = "data:image/svg+xml;base64," + btoa(svgData)
        }
    }

    return (
        <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-border/50 max-w-fit">
            <div ref={qrRef} className="bg-white p-2">
                <QRCode
                    value={url}
                    size={128}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    viewBox={`0 0 128 128`}
                />
            </div>
            <div className="text-center space-y-2">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Scan for details</p>
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2 text-xs h-8"
                    onClick={handleDownload}
                >
                    <Download className="h-3.5 w-3.5" />
                    Save QR
                </Button>
            </div>
        </div>
    )
}
