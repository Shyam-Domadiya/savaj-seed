"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { AlertCircle, ArrowLeft, RefreshCcw, Home } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ErrorDisplayProps {
    title?: string
    message?: string
    error?: Error & { digest?: string }
    reset?: () => void
    showHome?: boolean
    showBack?: boolean
    type?: "error" | "404" | "global"
}

export function ErrorDisplay({
    title = "Something went wrong",
    message = "We apologize for the inconvenience. Our team has been notified and is working to fix the issue.",
    error,
    reset,
    showHome = true,
    showBack = true,
    type = "error",
}: ErrorDisplayProps) {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center p-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md"
            >
                <div className="mb-6 flex justify-center">
                    <div className={cn(
                        "rounded-full p-4",
                        type === "404" ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" : "bg-destructive/10 text-destructive"
                    )}>
                        <AlertCircle className="h-12 w-12" />
                    </div>
                </div>

                <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    {title}
                </h1>

                <p className="mb-8 text-muted-foreground">
                    {message}
                </p>

                {error?.digest && (
                    <div className="mb-8 rounded-md bg-muted p-2 text-xs font-mono text-muted-foreground">
                        Error ID: {error.digest}
                    </div>
                )}

                <div className="flex flex-wrap justify-center gap-4">
                    {reset && (
                        <Button
                            onClick={reset}
                            variant="default"
                            className="group flex items-center gap-2"
                        >
                            <RefreshCcw className="h-4 w-4 transition-transform group-hover:rotate-180" />
                            Try Again
                        </Button>
                    )}

                    {showHome && (
                        <Button variant="outline" asChild>
                            <Link href="/" className="flex items-center gap-2">
                                <Home className="h-4 w-4" />
                                Back to Home
                            </Link>
                        </Button>
                    )}

                    {showBack && !reset && (
                        <Button
                            variant="ghost"
                            onClick={() => window.history.back()}
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Go Back
                        </Button>
                    )}
                </div>
            </motion.div>
        </div>
    )
}
