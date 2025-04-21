"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import WeatherCard from "@/components/weather-card"
import ForecastCard from "@/components/forecast-card"
import WeatherDetails from "@/components/weather-details"
import TemperatureToggle from "@/components/temperature-toggle"
import LoadingSpinner from "@/components/loading-spinner"
import ErrorAlert from "@/components/error-alert"
import { formatDate } from "@/lib/utils"

export default function Home() {
  const [city, setCity] = useState("")
  const [searchedCity, setSearchedCity] = useState("London") // Default city
  const [weatherData, setWeatherData] = useState<any>(null)
  const [forecastData, setForecastData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isCelsius, setIsCelsius] = useState(true)

  const fetchWeatherData = async (cityName: string) => {
    setLoading(true)
    setError("")
    try {
      // Fetch current weather
      const weatherResponse = await fetch(`/api/weather?city=${encodeURIComponent(cityName)}`)
      if (!weatherResponse.ok) {
        throw new Error("City not found or weather data unavailable")
      }
      const weatherData = await weatherResponse.json()

      // Fetch forecast
      const forecastResponse = await fetch(`/api/forecast?city=${encodeURIComponent(cityName)}`)
      if (!forecastResponse.ok) {
        throw new Error("Forecast data not available")
      }
      const forecastData = await forecastResponse.json()

      setWeatherData(weatherData)
      setForecastData(forecastData)
      setSearchedCity(cityName)

      // Save last searched city to localStorage
      localStorage.setItem("lastSearchedCity", cityName)
    } catch (err: any) {
      setError(err.message || "Failed to fetch weather data")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (city.trim()) {
      fetchWeatherData(city)
    }
  }

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true)
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords
            const response = await fetch(`/api/geocode/reverse?lat=${latitude}&lon=${longitude}`)
            if (!response.ok) {
              throw new Error("Failed to get location name")
            }
            const data = await response.json()
            if (data.name) {
              setCity(data.name)
              fetchWeatherData(data.name)
            }
          } catch (err: any) {
            setError(err.message || "Failed to get your location")
            setLoading(false)
          }
        },
        (err) => {
          setError("Location access denied. Please search manually.")
          setLoading(false)
        },
      )
    } else {
      setError("Geolocation is not supported by your browser")
    }
  }

  useEffect(() => {
    // Try to load the last searched city from localStorage
    const lastCity = localStorage.getItem("lastSearchedCity")
    if (lastCity) {
      setSearchedCity(lastCity)
      fetchWeatherData(lastCity)
    } else {
      fetchWeatherData(searchedCity)
    }
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Weather App</h1>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
            <form onSubmit={handleSearch} className="relative flex-1 md:w-64 w-full">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Search for a city..."
                className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="City search"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </form>

            <button
              onClick={handleGetCurrentLocation}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-full md:w-auto"
              aria-label="Get current location"
            >
              Use My Location
            </button>

            <TemperatureToggle isCelsius={isCelsius} setIsCelsius={setIsCelsius} />
          </div>
        </div>

        {error && <ErrorAlert message={error} />}

        {loading ? (
          <LoadingSpinner />
        ) : weatherData && forecastData ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <WeatherCard
                city={searchedCity}
                country={weatherData.sys.country}
                date={formatDate(new Date())}
                temperature={weatherData.main.temp}
                description={weatherData.weather[0].description}
                icon={weatherData.weather[0].icon}
                isCelsius={isCelsius}
              />

              <div className="mt-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">3-Day Forecast</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {forecastData.list.slice(0, 3).map((forecast: any, index: number) => (
                    <ForecastCard
                      key={index}
                      date={formatDate(new Date(forecast.dt * 1000))}
                      temperature={forecast.main.temp}
                      description={forecast.weather[0].description}
                      icon={forecast.weather[0].icon}
                      isCelsius={isCelsius}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <WeatherDetails
                windSpeed={weatherData.wind.speed}
                humidity={weatherData.main.humidity}
                pressure={weatherData.main.pressure}
                feelsLike={weatherData.main.feels_like}
                visibility={weatherData.visibility}
                sunrise={weatherData.sys.sunrise}
                sunset={weatherData.sys.sunset}
                isCelsius={isCelsius}
              />
            </div>
          </div>
        ) : null}
      </div>
    </main>
  )
}
