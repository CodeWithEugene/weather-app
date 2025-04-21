import Image from "next/image"
import { convertTemperature } from "@/lib/utils"

interface WeatherCardProps {
  city: string
  country: string
  date: string
  temperature: number
  description: string
  icon: string
  isCelsius: boolean
}

export default function WeatherCard({
  city,
  country,
  date,
  temperature,
  description,
  icon,
  isCelsius,
}: WeatherCardProps) {
  const displayTemp = convertTemperature(temperature, isCelsius)
  const unit = isCelsius ? "°C" : "°F"

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all hover:shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-gray-800 capitalize">{city}</h2>
            <span className="ml-2 text-gray-500">{country}</span>
          </div>
          <p className="text-gray-500">{date}</p>
          <div className="mt-4">
            <p className="text-5xl font-bold text-gray-800">
              {displayTemp}
              {unit}
            </p>
            <p className="text-gray-600 capitalize mt-1">{description}</p>
          </div>
        </div>

        <div className="mt-4 md:mt-0">
          <div className="relative w-32 h-32">
            <Image
              src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
              alt={description}
              fill
              sizes="128px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}
