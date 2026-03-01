import { supabase } from '@/lib/supabase'
import RecipeDetail from '@/components/RecipeDetail'
import { notFound } from 'next/navigation'

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
    console.error('Recipe not found:', slug, error?.message)
    notFound()
  }

  return <RecipeDetail initialRecipe={recipe} />
}
