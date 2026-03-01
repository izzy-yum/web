import { supabase } from '@/lib/supabase'
import RecipeDiscovery from '@/components/RecipeDiscovery'

interface Recipe {
  id: string
  name: string
  slug: string
  image_url: string
  total_time_min: number
  difficulty: string
  secondary_ingredients?: { ingredient: string; slug: string }[]
}

export default async function RecipesPage({
  searchParams,
}: {
  searchParams: Promise<{ protein?: string; cuisine?: string }>
}) {
  const params = await searchParams
  const protein = params.protein || 'unknown'
  const cuisine = params.cuisine || 'unknown'

  // Fetch recipes filtered by protein and cuisine
  const { data: recipes, error } = await supabase
    .from('recipes')
    .select(`
      id,
      name,
      slug,
      image_url,
      total_time_min,
      difficulty,
      proteins!inner(slug),
      cuisines!inner(slug),
      secondary_ingredients(ingredient, slug)
    `)
    .eq('proteins.slug', protein)
    .eq('cuisines.slug', cuisine)
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching recipes:', error)
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center px-4 pt-20">
        <div className="max-w-md w-full text-center">
          <div className="rounded-2xl shadow-lg p-8" style={{ backgroundColor: '#8d2831' }}>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">
              Couldn't Load Recipes
            </h2>
            <p className="text-neutral-100 mb-6">
              We had trouble loading the recipes. This might be a temporary network issue.
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

  if (!recipes || recipes.length === 0) {
    return (
      <div className="min-h-screen bg-primary-50 py-12 px-4 pt-20">
        <div className="max-w-md mx-auto text-center">
          <div className="rounded-2xl shadow-lg p-8" style={{ backgroundColor: '#8d2831' }}>
            <p className="text-sm font-medium text-primary-200 uppercase tracking-wide mb-2">
              <span className="capitalize">{protein}</span> • <span className="capitalize">{cuisine}</span>
            </p>
            <h1 className="text-4xl font-heading font-bold text-white mb-4">
              No Recipes Found
            </h1>
            <p className="text-lg text-neutral-100 mb-6">
              We don't have any {cuisine} recipes with {protein} yet. Check back soon or try a different combination!
            </p>
            <div className="space-y-3">
              <a
                href={`/cuisine?protein=${protein}`}
                style={{ backgroundColor: '#1e2f2c' }}
                className="block w-full py-3 px-4 text-base font-semibold rounded-lg text-white hover:opacity-90 transition-opacity"
              >
                Try Different Cuisine
              </a>
              <a
                href="/"
                className="block w-full py-3 px-4 text-base font-semibold rounded-lg text-white bg-neutral-700 hover:bg-neutral-600 transition-colors"
              >
                Choose Different Protein
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <RecipeDiscovery recipes={recipes as Recipe[]} protein={protein} cuisine={cuisine} />
}
