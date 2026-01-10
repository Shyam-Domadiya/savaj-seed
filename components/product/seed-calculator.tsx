"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calculator, RefreshCw } from "lucide-react"

// Seed Rate Data (approximate values for demo)
const seedRates: Record<string, { rate: number; unit: string; packetSize?: string }> = {
    "cotton": { rate: 2, unit: "packets/acre", packetSize: "450g" },
    "wheat": { rate: 40, unit: "kg/acre" },
    "groundnut": { rate: 60, unit: "kg/acre" },
    "cumin": { rate: 12, unit: "kg/acre" },
    "sesame": { rate: 1.5, unit: "kg/acre" },
    "castor": { rate: 2, unit: "kg/acre" },
    "maize": { rate: 8, unit: "kg/acre" },
    "gram": { rate: 30, unit: "kg/acre" },
}

export function SeedCalculator() {
    const [crop, setCrop] = useState<string>("")
    const [area, setArea] = useState<string>("")
    const [unit, setUnit] = useState<string>("acre")
    const [result, setResult] = useState<string | null>(null)

    const calculateRate = () => {
        if (!crop || !area) return

        const parsedArea = parseFloat(area)
        if (isNaN(parsedArea)) return

        // Convert area to acres if needed (simple conversion for demo)
        let areaInAcres = parsedArea
        if (unit === "hectare") areaInAcres = parsedArea * 2.47
        if (unit === "bigha") areaInAcres = parsedArea * 0.4 // Approx for Gujarat

        const rateData = seedRates[crop]
        const totalQty = rateData.rate * areaInAcres

        let resultText = ""
        if (crop === "cotton") {
            resultText = `${Math.ceil(totalQty)} Packets (${rateData.packetSize} each)`
        } else {
            resultText = `${totalQty.toFixed(1)} kg`
        }

        setResult(resultText)
    }

    const reset = () => {
        setCrop("")
        setArea("")
        setResult(null)
    }

    return (
        <Card className="w-full max-w-md mx-auto shadow-lg border-primary/20 bg-background/50 backdrop-blur-sm">
            <CardHeader className="bg-primary/5 rounded-t-xl pb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
                    <Calculator className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl">Seed Rate Calculator</CardTitle>
                <CardDescription>
                    Estimate exactly how much seed you need for your farm.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                <div className="space-y-2">
                    <Label htmlFor="crop">Select Crop</Label>
                    <Select value={crop} onValueChange={setCrop}>
                        <SelectTrigger id="crop" className="h-11">
                            <SelectValue placeholder="Choose a crop..." />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(seedRates).map((c) => (
                                <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="area">Land Area</Label>
                        <Input
                            id="area"
                            type="number"
                            placeholder="Enter size"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            className="h-11"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="unit">Unit</Label>
                        <Select value={unit} onValueChange={setUnit}>
                            <SelectTrigger id="unit" className="h-11">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="acre">Acres</SelectItem>
                                <SelectItem value="hectare">Hectares</SelectItem>
                                <SelectItem value="bigha">Bigha</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {result && (
                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-center animate-in zoom-in-95 duration-300">
                        <span className="text-sm font-medium text-green-700 block mb-1">Required Seed Quantity:</span>
                        <span className="text-3xl font-bold text-green-700">{result}</span>
                    </div>
                )}

                <div className="flex gap-3 pt-2">
                    <Button className="flex-1 h-11 text-base shadow-md" onClick={calculateRate} disabled={!crop || !area}>
                        Calculate
                    </Button>
                    <Button variant="outline" size="icon" className="h-11 w-11" onClick={reset}>
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
