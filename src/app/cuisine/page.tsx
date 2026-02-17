export default function CuisinePage({
  searchParams,
}: {
  searchParams: { protein?: string }
}) {
  const protein = searchParams.protein || 'unknown'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Cuisine Selection
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            You selected: <span className="font-semibold capitalize">{protein}</span>
          </p>
          <p className="text-slate-500">
            Cuisine grid coming soon! (Issue #7)
          </p>
        </div>
      </div>
    </div>
  )
}
