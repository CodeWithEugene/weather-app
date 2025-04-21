import LoadingSpinner from "@/components/loading-spinner"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-50 p-4 md:p-8 flex items-center justify-center">
      <LoadingSpinner />
    </div>
  )
}
