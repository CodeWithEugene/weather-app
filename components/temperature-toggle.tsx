"use client"

interface TemperatureToggleProps {
  isCelsius: boolean
  setIsCelsius: (value: boolean) => void
}

export default function TemperatureToggle({ isCelsius, setIsCelsius }: TemperatureToggleProps) {
  return (
    <div className="flex items-center bg-white rounded-lg shadow p-1">
      <button
        onClick={() => setIsCelsius(true)}
        className={`px-3 py-2 rounded-md transition-colors ${
          isCelsius ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-100"
        }`}
        aria-pressed={isCelsius}
        aria-label="Celsius"
      >
        °C
      </button>
      <button
        onClick={() => setIsCelsius(false)}
        className={`px-3 py-2 rounded-md transition-colors ${
          !isCelsius ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-100"
        }`}
        aria-pressed={!isCelsius}
        aria-label="Fahrenheit"
      >
        °F
      </button>
    </div>
  )
}
