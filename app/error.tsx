'use client'

import { Button } from '@/components/shared/Button'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center pt-[72px]">
      <div className="text-center px-4">
        <h1 className="font-heading text-[80px] md:text-[120px] font-bold text-accent-500/20 leading-none">
          500
        </h1>
        <h2 className="font-heading text-2xl font-bold text-text-primary mt-4">
          Something went wrong.
        </h2>
        <p className="text-base font-body text-text-secondary mt-3 max-w-md mx-auto">
          We&apos;ve been notified. In the meantime, go back to the homepage.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <Button variant="primary" href="/">
            Go to Homepage
          </Button>
          <button
            onClick={reset}
            className="text-sm font-body font-semibold text-accent-500 hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  )
}
