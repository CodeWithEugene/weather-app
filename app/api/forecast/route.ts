import { type NextRequest, NextResponse } from "next/server"

/**
 * API route handler for fetching weather forecast data
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

    // Then get forecast data using coordinates
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    const forecastResponse = await fetch(forecastUrl, {
      next: { revalidate: 1800 }, // Cache for 30 minutes
    })

    if (!forecastResponse.ok) {
      throw new Error("Forecast API error")
    }

    const forecastData = await forecastResponse.json()

    // Process forecast data to get one forecast per day
    const processedData = processForecastData(forecastData)

    return NextResponse.json(processedData)
  } catch (error) {
    console.error("Error fetching forecast data:", error)
    return NextResponse.json({ error: "Failed to fetch forecast data" }, { status: 500 })
  }
}

/**
 * Process the forecast data to get one forecast per day
 * OpenWeatherMap returns forecasts in 3-hour intervals
 */
function processForecastData(data: any) {
  const dailyForecasts: Record<string, any> = {}

  // Group forecasts by day
  data.list.forEach((forecast: any) => {
    const date = new Date(forecast.dt * 1000)
    const day = date.toISOString().split("T")[0]

    if (!dailyForecasts[day]) {
      dailyForecasts[day] = forecast
    }
  })

  // Convert back to array format similar to original API response
  return {
    ...data,
    list: Object.values(dailyForecasts),
  }
}
