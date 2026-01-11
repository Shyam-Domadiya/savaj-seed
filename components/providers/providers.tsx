"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AnalyticsProvider } from "@/components/providers/analytics-provider"
import { ConsentBanner } from "@/components/providers/consent-banner"

export function Providers({ children, ...props }: ThemeProviderProps) {
    return (
        <NextThemesProvider {...props}>
            <TooltipProvider>
                <AnalyticsProvider>
                    {children}
                </AnalyticsProvider>
                <ConsentBanner />
            </TooltipProvider>
        </NextThemesProvider>
    )
}
