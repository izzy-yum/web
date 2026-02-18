'use client'

import { useState } from 'react'
import RecipeHeader from './RecipeHeader'
import ServingSizeSelector from './ServingSizeSelector'
import EquipmentList from './EquipmentList'
import IngredientList from './IngredientList'
import InstructionSteps from './InstructionSteps'

interface Recipe {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string
  prep_time_min: number
  cook_time_min: number
  total_time_min: number
  difficulty: string
  default_servings: number
  recipe_equipment: any[]
  recipe_ingredients: any[]
  recipe_instructions: any[]
}

interface RecipeDetailProps {
  initialRecipe: Recipe
}

export default function RecipeDetail({ initialRecipe }: RecipeDetailProps) {
  const [selectedServings, setSelectedServings] = useState<number | null>(null)
  const [calculatedRecipe, setCalculatedRecipe] = useState<Recipe | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleServingSelect = async (servings: number) => {
    setSelectedServings(servings)
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/calculate-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipeId: initialRecipe.id,
          servings,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to calculate recipe')
      }

      const data = await response.json()
      setCalculatedRecipe(data)
    } catch (err) {
      console.error('Error calculating recipe:', err)
      setError('Failed to calculate serving sizes. Please try again.')
      setCalculatedRecipe(null)
    } finally {
      setIsLoading(false)
    }
  }

  const displayRecipe = calculatedRecipe || initialRecipe
  const showAmounts = selectedServings !== null && calculatedRecipe !== null

  return (
    <div className="min-h-screen bg-primary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <RecipeHeader
          name={displayRecipe.name}
          image_url={displayRecipe.image_url}
          description={displayRecipe.description}
          prep_time_min={displayRecipe.prep_time_min}
          cook_time_min={displayRecipe.cook_time_min}
          total_time_min={displayRecipe.total_time_min}
          difficulty={displayRecipe.difficulty}
          default_servings={displayRecipe.default_servings}
        />

        <ServingSizeSelector
          selectedServings={selectedServings}
          onSelect={handleServingSelect}
          isLoading={isLoading}
        />

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <EquipmentList equipment={displayRecipe.recipe_equipment || []} />

        <IngredientList
          ingredients={displayRecipe.recipe_ingredients || []}
          showAmounts={showAmounts}
        />

        <InstructionSteps instructions={displayRecipe.recipe_instructions || []} />

        {/* Send to Phone button will be added in Issue #11 */}
        <div className="mt-12 p-6 rounded-2xl text-center" style={{ backgroundColor: '#8d2831' }}>
          <p className="text-white">
            Send shopping list to phone feature coming soon! (Issue #11)
          </p>
        </div>
      </div>
    </div>
  )
}
