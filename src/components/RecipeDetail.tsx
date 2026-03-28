'use client'

import { useState, useEffect } from 'react'
import RecipeHeader from './RecipeHeader'
import ServingSizeSelector from './ServingSizeSelector'
import EquipmentList from './EquipmentList'
import IngredientList from './IngredientList'
import InstructionSteps from './InstructionSteps'
import Breadcrumb from './Breadcrumb'
import ShoppingListPanel from './ShoppingListPanel'
import { useMeal } from '@/contexts/MealContext'

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
  proteins?: { name: string; slug: string }
  cuisines?: { name: string; slug: string }
}

interface RecipeDetailProps {
  initialRecipe: Recipe
}

export default function RecipeDetail({ initialRecipe }: RecipeDetailProps) {
  const [selectedServings, setSelectedServings] = useState<number | null>(null)
  const [calculatedRecipe, setCalculatedRecipe] = useState<Recipe | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isShoppingListOpen, setIsShoppingListOpen] = useState(false)
  const [showCompletePlatePrompt, setShowCompletePlatePrompt] = useState(true)
  const { setProtein } = useMeal()

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

      // Update meal context with selected protein
      setProtein(
        {
          id: initialRecipe.id,
          name: initialRecipe.name,
          slug: initialRecipe.slug,
          image_url: initialRecipe.image_url,
        },
        servings
      )
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

  const proteinSlug = initialRecipe.proteins?.slug
  const proteinName = initialRecipe.proteins?.name
  const cuisineSlug = initialRecipe.cuisines?.slug
  const cuisineName = initialRecipe.cuisines?.name

  return (
    <div className="min-h-screen bg-primary-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {proteinSlug && cuisineSlug && (
          <Breadcrumb
            items={[
              { label: proteinName || proteinSlug, href: `/cuisine?protein=${proteinSlug}` },
              { label: cuisineName || cuisineSlug, href: `/recipes?protein=${proteinSlug}&cuisine=${cuisineSlug}` },
              { label: displayRecipe.name, href: `/recipe/${displayRecipe.slug}` },
            ]}
          />
        )}

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

        {/* Complete Your Plate Suggestion */}
        {showCompletePlatePrompt && selectedServings && calculatedRecipe && (
          <div className="mb-6">
            <div className="rounded-xl p-6 text-center" style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #4ade80 100%)' }}>
              <h3 className="text-xl font-heading font-bold text-white mb-2">
                🍽️ Complete Your Balanced Plate?
              </h3>
              <p className="text-white/90 mb-4 text-sm">
                Add a grain and vegetables for a nutritionally complete meal (optional)
              </p>
              <div className="flex gap-3 justify-center">
                <a
                  href="/meal/grain"
                  style={{ backgroundColor: '#1e2f2c' }}
                  className="px-6 py-2 text-base font-semibold rounded-lg text-white hover:opacity-90 transition-opacity"
                >
                  Yes, Complete Plate →
                </a>
                <button
                  onClick={() => setShowCompletePlatePrompt(false)}
                  className="px-6 py-2 text-base font-medium bg-white/30 text-white rounded-lg hover:bg-white/40 transition-colors"
                >
                  No Thanks
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Shopping List Button */}
        {selectedServings && calculatedRecipe && (
          <div className="mb-6 flex justify-center">
            <button
              onClick={() => setIsShoppingListOpen(true)}
              style={{ backgroundColor: '#1e2f2c' }}
              className="px-6 py-3 text-base font-semibold rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-opacity shadow-lg hover:opacity-90 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Generate Shopping List
            </button>
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-2xl shadow-md p-6" style={{ backgroundColor: '#8d2831' }}>
            <h3 className="text-lg font-heading font-bold text-white mb-2">
              Calculation Error
            </h3>
            <p className="text-neutral-100 mb-4">{error}</p>
            <button
              onClick={() => selectedServings && handleServingSelect(selectedServings)}
              style={{ backgroundColor: '#1e2f2c' }}
              className="px-4 py-2 text-sm font-semibold rounded-lg text-white hover:opacity-90 transition-opacity"
            >
              Retry
            </button>
          </div>
        )}

        <EquipmentList equipment={displayRecipe.recipe_equipment || []} />

        <IngredientList
          ingredients={displayRecipe.recipe_ingredients || []}
          showAmounts={showAmounts}
        />

        <InstructionSteps instructions={displayRecipe.recipe_instructions || []} />
      </div>

      {/* Shopping List Side Panel */}
      <ShoppingListPanel
        isOpen={isShoppingListOpen}
        onClose={() => setIsShoppingListOpen(false)}
        ingredients={calculatedRecipe?.recipe_ingredients || []}
        recipeName={initialRecipe.name}
        servings={selectedServings || initialRecipe.default_servings}
      />
    </div>
  )
}
