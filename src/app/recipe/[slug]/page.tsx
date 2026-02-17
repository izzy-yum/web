export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <div className="min-h-screen bg-primary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-heading font-bold text-neutral-900 mb-4">
          Recipe Detail
        </h1>
        <p className="text-xl text-neutral-600 mb-8">
          Recipe: <span className="font-semibold capitalize">{slug.replace(/-/g, ' ')}</span>
        </p>
        <p className="text-neutral-500">
          Recipe detail screen coming soon! (Issues #9-11)
        </p>
      </div>
    </div>
  )
}
