"use client"

import { useEffect, useState } from "react"
import { Cloud, CloudRain, CloudSnow, Sun, Loader2, MapPin } from "lucide-react"

interface WeatherData {
    temperature: number
    weatherCode: number
    locationName: string
}

export function WeatherWidget() {
    const [weather, setWeather] = useState<WeatherData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords

                        // Parallel fetch for weather and location
                        const [weatherRes, locationRes] = await Promise.all([
                            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`),
                            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                        ])

                        const weatherData = await weatherRes.json()
                        const locationData = await locationRes.json()

                        let locationName = "Unknown Location"
                        if (locationData.address) {
                            // Try to find the most relevant city name
                            locationName = locationData.address.city ||
                                locationData.address.town ||
                                locationData.address.village ||
                                locationData.address.suburb ||
                                locationData.address.county ||
                                locationData.address.state ||
                                "Unknown Location"
                        }

                        if (weatherData.current_weather) {
                            setWeather({
                                temperature: weatherData.current_weather.temperature,
                                weatherCode: weatherData.current_weather.weathercode,
                                locationName
                            })
                        } else {
                            setError(true)
                        }
                    } catch (err) {
                        console.error("Error fetching data:", err)
                        setError(true)
                    } finally {
                        setLoading(false)
                    }
                },
                (err) => {
                    console.error("Geolocation error:", err)
                    setError(true)
                    setLoading(false)
                }
            )
        } else {
            setError(true)
            setLoading(false)
        }
    }, [])

    if (error) return null

    if (loading) {
        return (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground bg-muted/30 rounded-full animate-pulse">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
            </div>
        )
    }

    if (!weather) return null

    const getWeatherIcon = (code: number) => {
        if (code <= 1) return <Sun className="h-4 w-4 text-orange-500" />
        if (code <= 3) return <Cloud className="h-4 w-4 text-gray-500" />
        if (code <= 67) return <CloudRain className="h-4 w-4 text-blue-500" />
        if (code <= 77) return <CloudSnow className="h-4 w-4 text-blue-300" />
        return <Cloud className="h-4 w-4 text-gray-500" />
    }

    return (
        <div className="hidden md:flex items-center gap-3 px-3 py-1.5 text-sm font-medium border rounded-full bg-background/50 hover:bg-muted/50 transition-colors cursor-default" title={`Current weather in ${weather.locationName}`}>
            <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <span className="max-w-[100px] truncate">{weather.locationName}</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-1.5">
                {getWeatherIcon(weather.weatherCode)}
                <span>{Math.round(weather.temperature)}°C</span>
            </div>
        </div>
    )
}
