"use client"

import { useEffect } from "react"
import ErrorAlert from "@/components/error-alert"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-50 p-4 md:p-8 flex flex-col items-center justify-center">
      <ErrorAlert message="Something went wrong! Please try again." />
      <button
        onClick={reset}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Try again
      </button>
    </div>
  )
}
