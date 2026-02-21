'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Validation states
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const passwordValid = password.length >= 6

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Redirect to home page
      router.push('/')
    } catch (err: any) {
      setError(err.message || 'Invalid email or password')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50 px-4 pt-20">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-heading font-bold text-neutral-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-neutral-600">
            Welcome back to Izzy Yum
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div className="rounded-2xl shadow-md p-6 space-y-4" style={{ backgroundColor: '#8d2831' }}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`appearance-none rounded-lg relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-400 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent sm:text-sm ${emailValid && email ? 'font-bold' : ''}`}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`appearance-none rounded-lg relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-400 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent sm:text-sm ${passwordValid && password ? 'font-bold' : ''}`}
                placeholder="Password"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                style={{ backgroundColor: '#1e2f2c' }}
                className="w-full flex justify-center py-3 px-4 text-base font-semibold rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg hover:opacity-90"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-neutral-600">Don't have an account?</p>
          <Link
            href="/register"
            style={{ backgroundColor: '#8d2831' }}
            className="inline-block mt-2 px-6 py-2.5 text-sm font-medium text-white hover:opacity-90 rounded-lg transition-opacity shadow-sm"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}
