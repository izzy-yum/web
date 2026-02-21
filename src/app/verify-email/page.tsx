'use client'

import Link from 'next/link'

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50 px-4 pt-20">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-100">
            <svg
              className="h-8 w-8 text-primary-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-heading font-bold text-neutral-900">
            Check your email
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            We've sent you a verification email. Click the link in the email to verify your account.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <div className="rounded-lg bg-primary-100 border border-primary-200 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-primary-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm text-primary-800">
                  After verifying your email, you'll be able to sign in and start planning your meals.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-neutral-600">
              Didn't receive the email? Check your spam folder.
            </p>
          </div>

          <div className="pt-4 text-center">
            <Link
              href="/login"
              className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
