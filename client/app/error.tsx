"use client"

import { useEffect } from "react"
import { ErrorDisplay } from "@/components/ui/error-display"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <ErrorDisplay
            error={error}
            reset={reset}
        />
    )
}
