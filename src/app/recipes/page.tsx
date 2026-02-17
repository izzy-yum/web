export default async function RecipesPage({
  searchParams,
}: {
  searchParams: Promise<{ protein?: string; cuisine?: string }>
}) {
  const params = await searchParams
  const protein = params.protein || 'unknown'
  const cuisine = params.cuisine || 'unknown'

  return (
    <div className="min-h-screen bg-primary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <p className="text-sm font-medium text-primary-600 uppercase tracking-wide mb-2">
            <span className="capitalize">{protein}</span> • <span className="capitalize">{cuisine}</span>
          </p>
          <h1 className="text-5xl font-heading font-bold text-neutral-900 mb-4">
            Recipe Discovery
          </h1>
          <p className="text-xl text-neutral-600 mb-8">
            Showing {cuisine} recipes with {protein}
          </p>
          <p className="text-neutral-500">
            Recipe grid and ingredient wheel coming soon! (Issue #8)
          </p>
        </div>
      </div>
    </div>
  )
}
