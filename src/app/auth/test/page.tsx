'use client'

// Scratch smoke-test page for Auth v2 OAuth providers. Lets us click through
// each provider end-to-end and verify that a row appears in auth.users +
// auth.identities. Not linked from anywhere in the main app nav.
// Delete once the real signup UI ships (web#41).

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Session, User } from '@supabase/supabase-js'

export default function AuthTestPage() {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setUser(data.session?.user ?? null)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
      setUser(s?.user ?? null)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  const signInWithApple = async () => {
    setError(null)
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: { redirectTo: `${window.location.origin}/auth/test` },
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setUser(null)
  }

  return (
    <main className="mx-auto max-w-2xl p-8 font-sans">
      <h1 className="mb-6 text-2xl font-semibold">Auth v2 OAuth smoke test</h1>

      <section className="mb-8 rounded-lg border border-gray-200 p-4">
        <h2 className="mb-2 text-lg font-medium">Status</h2>
        {session ? (
          <>
            <p className="text-sm text-green-700">Signed in.</p>
            <dl className="mt-3 space-y-1 text-sm">
              <div className="flex gap-2">
                <dt className="font-medium">User ID:</dt>
                <dd className="font-mono text-xs">{user?.id}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-medium">Email:</dt>
                <dd>{user?.email ?? <em>(none)</em>}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-medium">Provider:</dt>
                <dd>{user?.app_metadata?.provider ?? '—'}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-medium">Providers linked:</dt>
                <dd>{(user?.app_metadata?.providers as string[] | undefined)?.join(', ') ?? '—'}</dd>
              </div>
            </dl>
            <details className="mt-3">
              <summary className="cursor-pointer text-sm text-gray-600">Raw user JSON</summary>
              <pre className="mt-2 overflow-x-auto rounded bg-gray-50 p-3 text-xs">
                {JSON.stringify(user, null, 2)}
              </pre>
            </details>
          </>
        ) : (
          <p className="text-sm text-gray-600">Not signed in.</p>
        )}
      </section>

      <section className="space-y-3">
        <button
          type="button"
          onClick={signInWithApple}
          disabled={loading}
          className="w-full rounded-md bg-black px-4 py-3 text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? 'Redirecting…' : 'Continue with Apple'}
        </button>

        {session && (
          <button
            type="button"
            onClick={signOut}
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-700 hover:bg-gray-50"
          >
            Sign out
          </button>
        )}

        {error && (
          <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}
      </section>

      <p className="mt-8 text-xs text-gray-500">
        This page is a temporary smoke-test surface for <code>web#38</code>. It will be deleted
        once the real signup UI ships (<code>web#41</code>).
      </p>
    </main>
  )
}
