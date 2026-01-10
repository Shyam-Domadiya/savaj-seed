"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Cloud, Sun, CloudRain, Wind, Droplets, MapPin, Loader2 } from "lucide-react"

interface WeatherData {
    temperature: number
    windSpeed: number
    humidity: number
    weatherCode: number
}

// Simple weather code mapping for Open-Meteo
const getWeatherIcon = (code: number) => {
    if (code <= 1) return <Sun className="h-8 w-8 text-amber-500" />
    if (code <= 3) return <Cloud className="h-8 w-8 text-gray-500" />
    if (code <= 67) return <CloudRain className="h-8 w-8 text-blue-500" />
    return <Cloud className="h-8 w-8 text-gray-500" /> // Default
}

const getWeatherDescription = (code: number) => {
    if (code === 0) return "Clear Sky"
    if (code <= 3) return "Partly Cloudy"
    if (code <= 48) return "Foggy"
    if (code <= 67) return "Rainy"
    if (code <= 77) return "Snowy"
    if (code <= 82) return "Heavy Rain"
    if (code <= 99) return "Thunderstorm"
    return "Unknown"
}

export function WeatherWidget() {
    const [weather, setWeather] = useState<WeatherData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        // Defaulting to Rajkot, Gujarat for demo
        const lat = 22.3039
        const long = 70.8022

        async function fetchWeather() {
            try {
                const res = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true&hourly=relativehumidity_2m`
                )
                const data = await res.json()

                // Approximate humidity from hourly data (taking current hour)
                const hourIndex = new Date().getHours()
                const humidity = data.hourly.relativehumidity_2m[hourIndex] || 50

                setWeather({
                    temperature: data.current_weather.temperature,
                    windSpeed: data.current_weather.windspeed,
                    weatherCode: data.current_weather.weathercode,
                    humidity: humidity
                })
            } catch (err) {
                console.error("Failed to fetch weather", err)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchWeather()
    }, [])

    if (error) return null

    return (
        <Card className="bg-white/80 backdrop-blur-sm border-none shadow-sm min-w-[280px]">
            <CardContent className="p-4">
                {loading ? (
                    <div className="flex items-center justify-center h-20 text-muted-foreground">
                        <Loader2 className="h-6 w-6 animate-spin mr-2" />
                        Loading weather...
                    </div>
                ) : weather ? (
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium mb-1 uppercase tracking-wider">
                                <MapPin className="h-3 w-3" /> Rajkot, Gujarat
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-4xl font-bold tracking-tight text-foreground">
                                    {Math.round(weather.temperature)}°
                                </span>
                                <div>
                                    <div className="text-sm font-semibold capitalize leading-none mb-1">
                                        {getWeatherDescription(weather.weatherCode)}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        Wind: {weather.windSpeed} km/h
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-blue-50">
                            {getWeatherIcon(weather.weatherCode)}
                            <div className="flex items-center gap-1 text-xs font-medium text-blue-700 mt-1">
                                <Droplets className="h-3 w-3" />
                                {weather.humidity}%
                            </div>
                        </div>
                    </div>
                ) : null}
            </CardContent>
        </Card>
    )
}
