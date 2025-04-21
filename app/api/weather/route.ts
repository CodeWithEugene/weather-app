import { type NextRequest, NextResponse } from "next/server"

/**
 * API route handler for fetching current weather data
 * Proxies requests to OpenWeatherMap API
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const city = searchParams.get("city")

  if (!city) {
    return NextResponse.json({ error: "City parameter is required" }, { status: 400 })
  }

  const apiKey = process.env.OPENWEATHER_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 })
  }

  try {
    // First get coordinates using geocoding API
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`
    const geoResponse = await fetch(geoUrl)

    if (!geoResponse.ok) {
      throw new Error("Geocoding API error")
    }

    const geoData = await geoResponse.json()

    if (!geoData.length) {
      return NextResponse.json({ error: "City not found" }, { status: 404 })
    }

    const { lat, lon } = geoData[0]

    // Then get weather data using coordinates
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    const weatherResponse = await fetch(weatherUrl, {
      next: { revalidate: 1800 }, // Cache for 30 minutes
    })

    if (!weatherResponse.ok) {
      throw new Error("Weather API error")
    }

    const weatherData = await weatherResponse.json()

    return NextResponse.json(weatherData)
  } catch (error) {
    console.error("Error fetching weather data:", error)
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 })
  }
}
