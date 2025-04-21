import Image from "next/image"
import { convertTemperature } from "@/lib/utils"

interface ForecastCardProps {
  date: string
  temperature: number
  description: string
  icon: string
  isCelsius: boolean
}

export default function ForecastCard({ date, temperature, description, icon, isCelsius }: ForecastCardProps) {
  const displayTemp = convertTemperature(temperature, isCelsius)
  const unit = isCelsius ? "°C" : "°F"

  return (
    <div className="bg-white rounded-xl shadow p-4 transition-all hover:shadow-md">
      <div className="flex flex-col items-center">
        <p className="text-gray-600 font-medium">{date}</p>
        <div className="relative w-20 h-20 my-2">
          <Image
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description}
            fill
            sizes="80px"
            className="object-contain"
          />
        </div>
        <p className="text-2xl font-bold">
          {displayTemp}
          {unit}
        </p>
        <p className="text-gray-500 text-sm text-center capitalize">{description}</p>
      </div>
    </div>
  )
}
