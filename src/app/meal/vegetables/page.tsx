import { supabase } from '@/lib/supabase'
import VegetableSelection from '@/components/VegetableSelection'

export default async function VegetablesPage() {
  // Fetch all vegetable side dishes
  const { data: vegetables, error } = await supabase
    .from('side_dishes')
    .select(`
      *,
      dish_categories!inner(slug)
    `)
    .eq('dish_categories.slug', 'vegetable')
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching vegetables:', error)
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center px-4 pt-20">
        <div className="max-w-md w-full text-center">
          <div className="rounded-2xl shadow-lg p-8" style={{ backgroundColor: '#8d2831' }}>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">
              Couldn't Load Vegetables
            </h2>
            <p className="text-neutral-100 mb-6">
              We had trouble loading the vegetable options. This might be a temporary network issue.
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

  if (!vegetables || vegetables.length === 0) {
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center px-4 pt-20">
        <div className="max-w-md w-full text-center">
          <div className="rounded-2xl shadow-lg p-8" style={{ backgroundColor: '#8d2831' }}>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">
              No Vegetables Available Yet
            </h2>
            <p className="text-neutral-100 mb-6">
              We're still adding vegetable options. Please check back soon!
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

  return <VegetableSelection vegetables={vegetables} />
}
