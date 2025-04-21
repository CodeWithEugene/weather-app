import { Wind, Droplets, Thermometer, Eye, Gauge, Sunrise, Sunset } from "lucide-react"
import { convertTemperature } from "@/lib/utils"

interface WeatherDetailsProps {
  windSpeed: number
  humidity: number
  pressure: number
  feelsLike: number
  visibility: number
  sunrise: number
  sunset: number
  isCelsius: boolean
}

export default function WeatherDetails({
  windSpeed,
  humidity,
  pressure,
  feelsLike,
  visibility,
  sunrise,
  sunset,
  isCelsius,
}: WeatherDetailsProps) {
  const displayFeelsLike = convertTemperature(feelsLike, isCelsius)
  const unit = isCelsius ? "°C" : "°F"

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Weather Details</h3>

      <div className="space-y-6">
        <div className="flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Wind className="text-blue-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500">Wind Status</p>
            <p className="text-xl font-semibold">{windSpeed} m/s</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Droplets className="text-blue-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500">Humidity</p>
            <p className="text-xl font-semibold">{humidity}%</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Thermometer className="text-blue-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500">Feels Like</p>
            <p className="text-xl font-semibold">
              {displayFeelsLike}
              {unit}
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Gauge className="text-blue-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500">Pressure</p>
            <p className="text-xl font-semibold">{pressure} hPa</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Eye className="text-blue-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500">Visibility</p>
            <p className="text-xl font-semibold">{(visibility / 1000).toFixed(1)} km</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Sunrise className="text-blue-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500">Sunrise</p>
            <p className="text-xl font-semibold">{formatTime(sunrise)}</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Sunset className="text-blue-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500">Sunset</p>
            <p className="text-xl font-semibold">{formatTime(sunset)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
