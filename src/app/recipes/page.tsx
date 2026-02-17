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
      <div className="min-h-screen bg-primary-50 flex items-center justify-center">
        <p className="text-red-600">Error loading recipes. Please try again.</p>
      </div>
    )
  }

  if (!recipes || recipes.length === 0) {
    return (
      <div className="min-h-screen bg-primary-50 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm font-medium text-primary-600 uppercase tracking-wide mb-2">
            <span className="capitalize">{protein}</span> • <span className="capitalize">{cuisine}</span>
          </p>
          <h1 className="text-5xl font-heading font-bold text-neutral-900 mb-4">
            No Recipes Found
          </h1>
          <p className="text-xl text-neutral-600 mb-8">
            We don&apos;t have any {cuisine} recipes with {protein} yet.
          </p>
          <a
            href="/cuisine"
            className="inline-block px-6 py-3 bg-primary-500 text-white rounded-full font-medium hover:bg-primary-600 transition-colors"
          >
            Try a Different Cuisine
          </a>
        </div>
      </div>
    )
  }

  return <RecipeDiscovery recipes={recipes as Recipe[]} protein={protein} cuisine={cuisine} />
}
