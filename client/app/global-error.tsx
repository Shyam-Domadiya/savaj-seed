"use client"

import { ErrorDisplay } from "@/components/ui/error-display"
import { Geist, Geist_Mono } from "next/font/google"
import "@/app/globals.css"

const geist = Geist({
    subsets: ["latin"],
    variable: "--font-sans",
})
const geistMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
})

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
            <body className="font-sans antialiased">
                <ErrorDisplay
                    type="global"
                    title="A Critical Error Occurred"
                    message="We're sorry, but a critical error has occurred. Please try refreshing the page or contact support if the problem persists."
                    error={error}
                    reset={reset}
                />
            </body>
        </html>
    )
}
