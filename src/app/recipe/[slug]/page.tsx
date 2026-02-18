import { supabase } from '@/lib/supabase'
import RecipeDetail from '@/components/RecipeDetail'

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // Fetch complete recipe data with all related tables
  const { data: recipe, error } = await supabase
    .from('recipes')
    .select(`
      *,
      proteins (name, slug),
      cuisines (name, slug),
      recipe_equipment (*),
      recipe_ingredients (*),
      recipe_instructions (*)
    `)
    .eq('slug', slug)
    .single()

  if (error || !recipe) {
    console.error('Error fetching recipe:', error)
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-heading font-bold text-neutral-900 mb-4">
            Recipe Not Found
          </h1>
          <p className="text-neutral-600 mb-6">
            We couldn&apos;t find the recipe you&apos;re looking for.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 text-white rounded-full font-medium transition-colors"
            style={{ backgroundColor: '#3a5a52' }}
          >
            Back to Home
          </a>
        </div>
      </div>
    )
  }

  return <RecipeDetail initialRecipe={recipe} />
}
