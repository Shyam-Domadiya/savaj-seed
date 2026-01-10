import { SeedCalculator } from "@/components/seed-calculator"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumb } from "@/components/breadcrumb"

export const metadata = {
    title: "Seed Rate Calculator - Savaj Seeds",
    description: "Calculate the exact amount of seeds needed for your farm with our easy-to-use calculator.",
}

export default function CalculatorPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />

            <div className="container">
                <Breadcrumb />
            </div>

            <main className="flex-1 py-12 md:py-20 bg-muted/30">
                <div className="container">
                    <div className="max-w-2xl mx-auto mb-10 text-center">
                        <h1 className="text-4xl font-bold mb-4">Precision Farming Tools</h1>
                        <p className="text-muted-foreground text-lg">
                            Use our calculator to prevent wastage and ensure optimal plant population.
                        </p>
                    </div>
                    <SeedCalculator />
                </div>
            </main>

            <SiteFooter />
        </div>
    )
}
