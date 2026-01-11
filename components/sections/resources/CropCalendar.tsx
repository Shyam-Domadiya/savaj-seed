"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Sprout, Wheat, Droplets, Sun, CloudRain, Snowflake } from "lucide-react"
import { cn } from "@/lib/utils"

// Crop data structure
interface CropData {
    month: string
    season: "Kharif" | "Rabi" | "Zaid"
    sowing: string[]
    harvesting: string[]
    tips: string
    icon: any
}

const cropCalendar: CropData[] = [
    {
        month: "January",
        season: "Rabi",
        sowing: ["Summer Groundnut", "Watermelon", "Muskmelon", "Vegetables (Okra, Brinjal)"],
        harvesting: ["Sugarcane", "Pigeon Pea (Tur)", "Early Potato"],
        tips: "Protect sensitive crops from cold waves. Start land preparation for summer crops.",
        icon: Snowflake,
    },
    {
        month: "February",
        season: "Zaid",
        sowing: ["Fodder Crops", "Summer Vegetables", "Sunflower", "Sesame"],
        harvesting: ["Wheat (Early)", "Mustard", "Gram", "Coriander", "Cumin"],
        tips: "Ideal time for sowing summer vegetables. Monitor irrigation for rabi crops.",
        icon: Sun,
    },
    {
        month: "March",
        season: "Zaid",
        sowing: ["Green Gram (Moong)", "Black Gram", "Fodder Sorghum"],
        harvesting: ["Wheat", "Chickpea", "Cumin", "Garlic", "Onion"],
        tips: "Harvest rabi crops at physiological maturity. Begin summer crop irrigation.",
        icon: Sun,
    },
    {
        month: "April",
        season: "Zaid",
        sowing: ["Cotton (Desi)", "Summer Vegetables"],
        harvesting: ["Wheat (Late)", "Summer Vegetables", "Castor"],
        tips: "Deep ploughing to kill soil-borne pests. Prepare fields for Kharif.",
        icon: Sun,
    },
    {
        month: "May",
        season: "Zaid",
        sowing: ["Bt Cotton (Pre-monsoon)", "Ginger", "Turmeric"],
        harvesting: ["Summer Groundnut", "Sunflower", "Sesame", "Bajra (Summer)"],
        tips: "Apply organic manure (FYM) in fields. Test soil samples now.",
        icon: Sun,
    },
    {
        month: "June",
        season: "Kharif",
        sowing: ["Cotton", "Groundnut", "Soybean", "Rice (Nursery)", "Bajra", "Maize"],
        harvesting: ["Summer Vegetables", "Fodder"],
        tips: "Sow Kharif crops after the first good monsoon rain. Treat seeds before sowing.",
        icon: CloudRain,
    },
    {
        month: "July",
        season: "Kharif",
        sowing: ["Rice (Transplanting)", "Castor", "Sesame", "Pulses (Moong, Urad)"],
        harvesting: ["Mango (Late varieties)"],
        tips: "Complete transplanting of rice. Weeding and hoeing in early sown crops.",
        icon: CloudRain,
    },
    {
        month: "August",
        season: "Kharif",
        sowing: ["Castor (Late)", "Fodder Crops"],
        harvesting: ["Green Cob Maize"],
        tips: "Monitor for pests like aphids and bollworms. Maintain drainage in fields.",
        icon: CloudRain,
    },
    {
        month: "September",
        season: "Kharif",
        sowing: ["Tobacco", "Fodder", "Rabi Sorghum (Early)"],
        harvesting: ["Green Gram", "Black Gram", "Sesame", "Bajra"],
        tips: "Harvest matured Kharif crops. Prepare land for early Rabi sowing.",
        icon: Droplets,
    },
    {
        month: "October",
        season: "Rabi",
        sowing: ["Gram (Chickpea)", "Mustard", "Garlic", "Rabi Maize"],
        harvesting: ["Groundnut", "Rice", "Cotton (First Picking)", "Soybean", "Maize"],
        tips: "Sow Rabi crops when temperature drops. Harvest and dry Kharif produce clearly.",
        icon: Wheat,
    },
    {
        month: "November",
        season: "Rabi",
        sowing: ["Wheat", "Cumin", "Coriander", "Fennel", "Potato", "Onion (Nursery)"],
        harvesting: ["Cotton", "Rice (Late)", "Pigeon Pea (Early)"],
        tips: "Peak sowing time for most Rabi crops (Wheat/Spices). Apply basal fertilizer.",
        icon: Wheat,
    },
    {
        month: "December",
        season: "Rabi",
        sowing: ["Late Wheat", "Vegetables", "Isabgol"],
        harvesting: ["Cotton", "Tur", "Custard Apple"],
        tips: "Apply irrigation to wheat/spices. Protect crops from frost if needed.",
        icon: Snowflake,
    },
]

export function CropCalendar({ className }: { className?: string }) {
    const [currentMonthIndex, setCurrentMonthIndex] = useState(0)

    useEffect(() => {
        const date = new Date()
        setCurrentMonthIndex(date.getMonth())
    }, [])

    const currentData = cropCalendar[currentMonthIndex]
    const nextMonthIndex = (currentMonthIndex + 1) % 12
    const nextData = cropCalendar[nextMonthIndex]

    const SeasonIcon = currentData.icon

    return (
        <section className={cn("py-12 md:py-16 bg-muted/20", className)}>
            <div className="container">
                <div className="text-center mb-10 animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4 font-medium text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>Farming Insights</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Farmer's Crop Calendar</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Timely recommendations for farmers in Gujarat to maximize yield and success.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-stretch">
                    {/* Current Month Card */}
                    <Card className="border-primary/20 shadow-lg relative overflow-hidden group hover:shadow-xl transition-all duration-300 animate-in fade-in-50 slide-in-from-left-8 duration-700 delay-100">
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <SeasonIcon className="w-32 h-32" />
                        </div>

                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Badge variant="outline" className="mb-2 bg-background/50 backdrop-blur text-primary border-primary/20">
                                        Current Period
                                    </Badge>
                                    <CardTitle className="text-3xl font-bold flex items-center gap-2 text-primary">
                                        {currentData.month}
                                        <span className="text-lg font-normal text-muted-foreground">({currentData.season} Season)</span>
                                    </CardTitle>
                                </div>
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    <SeasonIcon className="w-6 h-6" />
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                                <div className="flex items-center gap-2 mb-3 text-green-700 dark:text-green-400 font-semibold">
                                    <Sprout className="w-5 h-5" />
                                    <h4>Sowing Now</h4>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {currentData.sowing.map((crop, i) => (
                                        <Badge key={i} className="bg-white hover:bg-white text-green-800 border-green-200 shadow-sm pointer-events-none">
                                            {crop}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                                <div className="flex items-center gap-2 mb-3 text-amber-700 dark:text-amber-400 font-semibold">
                                    <Wheat className="w-5 h-5" />
                                    <h4>Harvesting Now</h4>
                                </div>
                                <div className="flex flex-wrap gap-2 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
                                    {currentData.harvesting.map((crop, i) => (
                                        <Badge key={i} className="bg-white hover:bg-white text-amber-800 border-amber-200 shadow-sm pointer-events-none">
                                            {crop}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="text-sm text-muted-foreground bg-muted p-4 rounded-lg border border-border/50 italic">
                                <span className="font-semibold not-italic text-foreground">💡 Tip of the Month: </span>
                                {currentData.tips}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Next Month Preview & General Advice */}
                    <div className="space-y-8 flex flex-col">
                        <Card className="flex-1 border-border/50 shadow-md hover:shadow-xl transition-all duration-300 animate-in fade-in-50 slide-in-from-right-8 duration-700 delay-200 relative overflow-hidden bg-gradient-to-br from-background to-muted/20">
                            <CardHeader className="pb-2">
                                <Badge variant="secondary" className="w-fit mb-2">Coming Up Next</Badge>
                                <CardTitle className="text-xl">{nextData.month} Forecast</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground mb-2">Prepare for Sowing:</p>
                                        <p className="text-foreground">{nextData.sowing.join(", ")}</p>
                                    </div>
                                    <div className="h-px w-full bg-border/50" />
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground mb-2">Expected Harvest:</p>
                                        <p className="text-foreground">{nextData.harvesting.join(", ")}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="flex-1 bg-primary text-primary-foreground border-none shadow-xl hover:shadow-2xl transition-all duration-300 animate-in fade-in-50 slide-in-from-right-8 duration-700 delay-300">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Droplets className="w-5 h-5" />
                                    Need Sowing Advice?
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="opacity-90 leading-relaxed">
                                    Unsure about the best seed variety for your soil type this season? Our experts are here to help you choose the right seeds for maximum yield.
                                </p>
                                <a
                                    href="/contact"
                                    className="inline-flex items-center justify-center rounded-lg bg-background text-primary px-4 py-2 text-sm font-bold shadow-lg hover:bg-background/90 transition-colors gap-2"
                                >
                                    Talk to an Expert
                                </a>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}
