import { type NextRequest, NextResponse } from "next/server"

/**
 * API route handler for reverse geocoding (coordinates to city name)
 * Proxies requests to OpenWeatherMap Geocoding API
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")

  if (!lat || !lon) {
    return NextResponse.json({ error: "Latitude and longitude parameters are required" }, { status: 400 })
  }

  const apiKey = process.env.OPENWEATHER_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 })
  }

  try {
    const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error("Reverse geocoding API error")
    }

    const data = await response.json()

    if (!data.length) {
      return NextResponse.json({ error: "Location not found" }, { status: 404 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error("Error in reverse geocoding:", error)
    return NextResponse.json({ error: "Failed to get location name" }, { status: 500 })
  }
}
