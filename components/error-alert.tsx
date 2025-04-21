interface ErrorAlertProps {
  message: string
}

export default function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded" role="alert">
      <p className="font-medium">Error</p>
      <p>{message}</p>
    </div>
  )
}
