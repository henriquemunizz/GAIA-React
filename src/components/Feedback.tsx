interface FeedbackProps {
  error?: string
  message?: string
}

export function Feedback({ error, message }: FeedbackProps) {
  return (
    <>
      {error && <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700" role="alert">{error}</p>}
      {message && <p className="rounded-xl bg-gaia-100 p-4 text-sm text-gaia-800" role="status">{message}</p>}
    </>
  )
}
