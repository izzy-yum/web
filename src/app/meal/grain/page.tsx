import { supabase } from '@/lib/supabase'
import GrainSelection from '@/components/GrainSelection'

export default async function GrainPage() {
  // Fetch all grain/starch side dishes
  const { data: grains, error } = await supabase
    .from('side_dishes')
    .select(`
      *,
      dish_categories!inner(slug)
    `)
    .eq('dish_categories.slug', 'grain')
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching grains:', error)
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center px-4 pt-20">
        <div className="max-w-md w-full text-center">
          <div className="rounded-2xl shadow-lg p-8" style={{ backgroundColor: '#8d2831' }}>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">
              Couldn't Load Grains
            </h2>
            <p className="text-neutral-100 mb-6">
              We had trouble loading the grain options. This might be a temporary network issue.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                style={{ backgroundColor: '#1e2f2c' }}
                className="w-full py-3 px-4 text-base font-semibold rounded-lg text-white hover:opacity-90 transition-opacity"
              >
                Try Again
              </button>
              <a
                href="/"
                className="block w-full py-3 px-4 text-base font-semibold rounded-lg text-white bg-neutral-700 hover:bg-neutral-600 transition-colors"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!grains || grains.length === 0) {
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center px-4 pt-20">
        <div className="max-w-md w-full text-center">
          <div className="rounded-2xl shadow-lg p-8" style={{ backgroundColor: '#8d2831' }}>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">
              No Grains Available Yet
            </h2>
            <p className="text-neutral-100 mb-6">
              We're still adding grain and starch options. Please check back soon!
            </p>
            <a
              href="/"
              style={{ backgroundColor: '#1e2f2c' }}
              className="inline-block w-full py-3 px-4 text-base font-semibold rounded-lg text-white hover:opacity-90 transition-opacity"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    )
  }

  return <GrainSelection grains={grains} />
}
