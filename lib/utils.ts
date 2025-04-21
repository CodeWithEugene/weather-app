import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Formats a date object to a readable string format
 * @param date - The date to format
 * @returns Formatted date string (e.g., "Monday, 15 Apr")
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
  })
}

/**
 * Converts temperature between Celsius and Fahrenheit
 * @param kelvin - Temperature in Kelvin
 * @param isCelsius - Whether to convert to Celsius (true) or Fahrenheit (false)
 * @returns Converted temperature rounded to one decimal place
 */
export function convertTemperature(kelvin: number, isCelsius: boolean): number {
  if (isCelsius) {
    // Kelvin to Celsius
    return Math.round((kelvin - 273.15) * 10) / 10
  } else {
    // Kelvin to Fahrenheit
    return Math.round((((kelvin - 273.15) * 9) / 5 + 32) * 10) / 10
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
