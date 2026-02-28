'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

// Helper function to format phone number to E.164 format
function formatPhoneE164(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '')

  // If it starts with 1 and is 11 digits, it's already formatted
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`
  }

  // If it's 10 digits, assume US and add +1
  if (digits.length === 10) {
    return `+1${digits}`
  }

  // If it already starts with +, return as is
  if (phone.startsWith('+')) {
    return phone.replace(/\D/g, '').replace(/^(\d)/, '+$1')
  }

  // Default: assume US number
  return `+1${digits}`
}

export default function RegisterPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Verification step
  const [showVerification, setShowVerification] = useState(false)
  const [emailCode, setEmailCode] = useState('')
  const [phoneCode, setPhoneCode] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [emailVerified, setEmailVerified] = useState(false)
  const [phoneCodeSent, setPhoneCodeSent] = useState(false)

  // Validation states
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const passwordValid = password.length >= 6
  const phoneValid = /^\+?1?\s*\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(phone)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Format phone to E.164
      const formattedPhone = formatPhoneE164(phone)

      // Send email OTP (creates user account)
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          data: {
            phone: formattedPhone,
            password, // Store for later
          },
        },
      })

      if (error) throw error

      // Show verification panel
      setShowVerification(true)
      setLoading(false)
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration')
      setLoading(false)
    }
  }

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    setVerifying(true)
    setError(null)

    try {
      // Step 1: Verify email code (if not already verified)
      if (!emailVerified) {
        const { data: emailData, error: emailError } = await supabase.auth.verifyOtp({
          email,
          token: emailCode,
          type: 'email',
        })

        if (emailError) {
          setError(`Invalid email verification code: ${emailError.message}`)
          setVerifying(false)
          return
        }

        // Email verified! Mark it and send phone OTP
        setEmailVerified(true)

        // Format phone to E.164
        const formattedPhone = formatPhoneE164(phone)

        // Send phone OTP via SMS
        const { data: phoneData, error: phoneError } = await supabase.auth.signInWithOtp({
          phone: formattedPhone,
          options: {
            shouldCreateUser: false, // User already created via email
          },
        })

        if (phoneError) {
          setError(`Failed to send phone verification: ${phoneError.message}`)
          setVerifying(false)
          return
        }

        setPhoneCodeSent(true)
        setError(null)
        setVerifying(false)
        return
      }

      // Step 2: Verify phone code
      const formattedPhone = formatPhoneE164(phone)
      const { data: phoneVerifyData, error: phoneVerifyError } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: phoneCode,
        type: 'sms',
      })

      if (phoneVerifyError) {
        setError(`Invalid phone verification code: ${phoneVerifyError.message}`)
        setVerifying(false)
        return
      }

      // Both verified! User is now authenticated
      // Redirect to home page
      router.push('/')
    } catch (err: any) {
      setError(err.message || 'Verification failed')
      setVerifying(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50 px-4 pt-20">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-heading font-bold text-neutral-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-neutral-600">
            Join Izzy Yum for gluten-free recipe planning
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
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`appearance-none rounded-lg relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-400 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent sm:text-sm ${passwordValid && password ? 'font-bold' : ''}`}
                placeholder="Minimum 6 characters"
                minLength={6}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`appearance-none rounded-lg relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-400 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent sm:text-sm ${phoneValid && phone ? 'font-bold' : ''}`}
                placeholder="+1 (555) 123-4567"
              />
              <p className="mt-1 text-xs text-neutral-200">
                Required for iOS app push notifications
              </p>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                style={{ backgroundColor: '#1e2f2c' }}
                className="w-full flex justify-center py-3 px-4 text-base font-semibold rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg hover:opacity-90"
              >
                {loading ? 'Creating account...' : 'Sign Up'}
              </button>
            </div>
          </div>
        </form>

        {/* Verification Panel */}
        {showVerification && (
          <form className="mt-6" onSubmit={handleVerification}>
            <div className="rounded-2xl shadow-md p-6 space-y-4" style={{ backgroundColor: '#8d2831' }}>
              <h3 className="text-xl font-heading font-bold text-white mb-4">
                Verify your account
              </h3>

              <div>
                <label htmlFor="emailCode" className="block text-sm font-medium text-white mb-1">
                  Email verification code {emailVerified && <span className="text-green-300">✓ Verified</span>}
                </label>
                <input
                  id="emailCode"
                  name="emailCode"
                  type="text"
                  required
                  maxLength={6}
                  value={emailCode}
                  onChange={(e) => setEmailCode(e.target.value.replace(/\D/g, ''))}
                  disabled={emailVerified}
                  className={`appearance-none rounded-lg relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-400 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent sm:text-sm text-center font-mono text-lg tracking-wider ${emailVerified ? 'bg-green-50 border-green-500' : ''}`}
                  placeholder="123456"
                />
                <p className="mt-1 text-xs text-neutral-200">
                  {emailVerified ? 'Email verified!' : `Check your email (${email}) for the 6-digit code`}
                </p>
              </div>

              <div>
                <label htmlFor="phoneCode" className="block text-sm font-medium text-white mb-1">
                  Phone verification code
                </label>
                <input
                  id="phoneCode"
                  name="phoneCode"
                  type="text"
                  required
                  maxLength={6}
                  value={phoneCode}
                  onChange={(e) => setPhoneCode(e.target.value.replace(/\D/g, ''))}
                  disabled={!phoneCodeSent}
                  className={`appearance-none rounded-lg relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-400 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent sm:text-sm text-center font-mono text-lg tracking-wider ${!phoneCodeSent ? 'bg-neutral-100' : ''}`}
                  placeholder="123456"
                />
                <p className="mt-1 text-xs text-neutral-200">
                  {!phoneCodeSent
                    ? 'Verify email first, then we\'ll send phone code'
                    : `Check your phone (${phone}) for the 6-digit code`}
                </p>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={
                    verifying ||
                    (!emailVerified && emailCode.length !== 6) ||
                    (emailVerified && phoneCode.length !== 6)
                  }
                  style={{ backgroundColor: '#1e2f2c' }}
                  className="w-full flex justify-center py-3 px-4 text-base font-semibold rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg hover:opacity-90"
                >
                  {verifying
                    ? 'Verifying...'
                    : emailVerified
                      ? 'Verify Phone & Complete'
                      : 'Verify Email'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
