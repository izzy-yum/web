import { supabase } from '@/lib/supabase'
import RecipeHeader from '@/components/RecipeHeader'
import EquipmentList from '@/components/EquipmentList'
import IngredientList from '@/components/IngredientList'
import InstructionSteps from '@/components/InstructionSteps'

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
            className="inline-block px-6 py-3 bg-primary-500 text-white rounded-full font-medium hover:bg-primary-600 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <RecipeHeader
          name={recipe.name}
          image_url={recipe.image_url}
          description={recipe.description}
          prep_time_min={recipe.prep_time_min}
          cook_time_min={recipe.cook_time_min}
          total_time_min={recipe.total_time_min}
          difficulty={recipe.difficulty}
          default_servings={recipe.default_servings}
        />

        <EquipmentList equipment={recipe.recipe_equipment || []} />

        <IngredientList
          ingredients={recipe.recipe_ingredients || []}
          showAmounts={false}
        />

        <InstructionSteps instructions={recipe.recipe_instructions || []} />

        {/* Serving size selector and Send to Phone button will be added in Issues #10-11 */}
        <div className="mt-12 p-6 bg-neutral-100 rounded-2xl text-center">
          <p className="text-neutral-600">
            Serving size selector and shopping list features coming soon! (Issues #10-11)
          </p>
        </div>
      </div>
    </div>
  )
}
