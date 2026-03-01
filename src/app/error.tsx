'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-primary-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="rounded-2xl shadow-lg p-8" style={{ backgroundColor: '#8d2831' }}>
          <h2 className="text-3xl font-heading font-bold text-white mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-neutral-100 mb-6">
            We encountered an unexpected error. Don't worry, your data is safe.
          </p>
          <div className="space-y-3">
            <button
              onClick={reset}
              style={{ backgroundColor: '#1e2f2c' }}
              className="w-full py-3 px-4 text-base font-semibold rounded-lg text-white hover:opacity-90 transition-opacity"
            >
              Try Again
            </button>
            <a
              href="/"
              className="block w-full py-3 px-4 text-base font-semibold rounded-lg text-white bg-neutral-700 hover:bg-neutral-600 transition-colors"
            >
              Go Home
            </a>
          </div>
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-6 text-left">
              <summary className="text-sm text-neutral-200 cursor-pointer hover:text-white">
                Error Details (Development Only)
              </summary>
              <pre className="mt-2 text-xs text-neutral-300 bg-black/20 p-3 rounded overflow-auto">
                {error.message}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  )
}
