import { supabase } from '@/lib/supabase'
import CuisineGrid from '@/components/CuisineGrid'

interface Cuisine {
  id: string
  name: string
  slug: string
  image_url: string
  description: string | null
  sort_order: number
}

export default async function CuisinePage({
  searchParams,
}: {
  searchParams: Promise<{ protein?: string }>
}) {
  const params = await searchParams
  const protein = params.protein || 'unknown'

  // Fetch all cuisines from Supabase
  // For MVP, we show all cuisines regardless of protein
  // Future: filter cuisines by protein compatibility
  const { data: cuisines, error } = await supabase
    .from('cuisines')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching cuisines:', error)
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center px-4 pt-20">
        <div className="max-w-md w-full text-center">
          <div className="rounded-2xl shadow-lg p-8" style={{ backgroundColor: '#8d2831' }}>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">
              Couldn't Load Cuisines
            </h2>
            <p className="text-neutral-100 mb-6">
              We had trouble loading the cuisine options. This might be a temporary network issue.
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

  if (!cuisines || cuisines.length === 0) {
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center px-4 pt-20">
        <div className="max-w-md w-full text-center">
          <div className="rounded-2xl shadow-lg p-8" style={{ backgroundColor: '#8d2831' }}>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">
              No Cuisines Available
            </h2>
            <p className="text-neutral-100 mb-6">
              We're still setting up the cuisine options. Please check back soon!
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

  return <CuisineGrid cuisines={cuisines as Cuisine[]} protein={protein} />
}
