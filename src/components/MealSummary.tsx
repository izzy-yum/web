'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMeal } from '@/contexts/MealContext'
import { supabase } from '@/lib/supabase'

interface RecipeData {
  recipe_ingredients: any[]
  recipe_equipment: any[]
}

interface SideDishData {
  side_dish_ingredients: any[]
  side_dish_equipment: any[]
}

export default function MealSummary() {
  const router = useRouter()
  const { protein, grain, vegetables, servings, clearMeal } = useMeal()
  const [loading, setLoading] = useState(true)
  const [recipeData, setRecipeData] = useState<RecipeData | null>(null)
  const [grainData, setGrainData] = useState<SideDishData | null>(null)
  const [vegetableData, setVegetableData] = useState<SideDishData[]>([])

  useEffect(() => {
    // Redirect if no protein selected
    if (!protein) {
      router.push('/')
      return
    }

    // Fetch complete data for all components
    async function fetchMealData() {
      setLoading(true)

      try {
        // Fetch recipe ingredients and equipment
        if (protein) {
          const { data } = await supabase
            .from('recipes')
            .select('recipe_ingredients(*), recipe_equipment(*)')
            .eq('id', protein.id)
            .single()

          if (data) setRecipeData(data)
        }

        // Fetch grain data if selected
        if (grain) {
          const { data } = await supabase
            .from('side_dishes')
            .select('side_dish_ingredients(*), side_dish_equipment(*)')
            .eq('id', grain.id)
            .single()

          if (data) setGrainData(data)
        }

        // Fetch vegetable data if selected
        if (vegetables.length > 0) {
          const vegData = await Promise.all(
            vegetables.map(async (veg) => {
              const { data } = await supabase
                .from('side_dishes')
                .select('side_dish_ingredients(*), side_dish_equipment(*)')
                .eq('id', veg.id)
                .single()
              return data
            })
          )
          setVegetableData(vegData.filter(Boolean) as SideDishData[])
        }
      } catch (error) {
        console.error('Error fetching meal data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMealData()
  }, [protein, grain, vegetables, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-2xl font-heading font-bold text-neutral-900 mb-4">
            Loading your complete meal...
          </div>
        </div>
      </div>
    )
  }

  if (!protein) {
    return null // Will redirect
  }

  // Calculate totals
  const totalIngredients =
    (recipeData?.recipe_ingredients?.length || 0) +
    (grainData?.side_dish_ingredients?.length || 0) +
    vegetableData.reduce((sum, veg) => sum + (veg.side_dish_ingredients?.length || 0), 0)

  const totalEquipment =
    (recipeData?.recipe_equipment?.length || 0) +
    (grainData?.side_dish_equipment?.length || 0) +
    vegetableData.reduce((sum, veg) => sum + (veg.side_dish_equipment?.length || 0), 0)

  // Estimate total time (longest dish, since some can be done in parallel)
  const proteinTime = 30 // Would get from recipe data
  const grainTime = grain ? 15 : 0 // Would get from side dish data
  const vegTime = vegetables.length > 0 ? 10 : 0 // Would get from side dish data
  const totalTime = Math.max(proteinTime, grainTime, vegTime) + 10 // +10 for buffer

  const handleSendToPhone = () => {
    // TODO: Implement shopping list sending
    alert('Shopping list would be sent to iPhone!\n\nIncludes:\n- ' + protein.name + '\n' +
          (grain ? '- ' + grain.name + '\n' : '') +
          vegetables.map(v => '- ' + v.name).join('\n'))
  }

  return (
    <div className="min-h-screen bg-primary-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-heading font-bold text-neutral-900 text-center mb-12">
          Your Complete Balanced Meal
        </h1>

        {/* Main Burgundy Panel */}
        <div className="rounded-2xl shadow-lg p-8 md:p-10 mb-6" style={{ backgroundColor: '#8d2831' }}>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-heading font-bold text-white mb-2">
              🍽️ Complete Balanced Plate
            </h2>
            <p className="text-neutral-200">
              {servings} servings • Ready in ~{totalTime} minutes
            </p>
          </div>

          {/* Components List */}
          <div className="space-y-3 mb-8">
            {/* Protein */}
            <div className="flex items-center gap-4 p-5 bg-white/15 rounded-xl">
              <div className="text-4xl min-w-[60px] text-center">🍖</div>
              <div className="flex-1">
                <div className="text-xl font-bold text-white">{protein.name}</div>
                <div className="text-sm text-neutral-200">Protein • Fills 1/4 of plate</div>
              </div>
              <a
                href={`/recipe/${protein.slug}`}
                className="text-yellow-300 hover:text-yellow-200 text-sm font-semibold px-4 py-2 border-2 border-yellow-300 rounded-lg hover:bg-yellow-300 hover:text-neutral-900 transition-all"
              >
                View Recipe
              </a>
            </div>

            {/* Grain */}
            {grain ? (
              <div className="flex items-center gap-4 p-5 bg-white/15 rounded-xl">
                <div className="text-4xl min-w-[60px] text-center">🌾</div>
                <div className="flex-1">
                  <div className="text-xl font-bold text-white">{grain.name}</div>
                  <div className="text-sm text-neutral-200">Grain • Fills 1/4 of plate</div>
                </div>
                <a
                  href="/meal/grain"
                  className="text-yellow-300 hover:text-yellow-200 text-sm font-semibold px-4 py-2 border-2 border-yellow-300 rounded-lg hover:bg-yellow-300 hover:text-neutral-900 transition-all"
                >
                  Change
                </a>
              </div>
            ) : (
              <div className="flex items-center gap-4 p-5 bg-white/10 rounded-xl border-2 border-dashed border-white/30">
                <div className="text-4xl min-w-[60px] text-center opacity-50">🌾</div>
                <div className="flex-1">
                  <div className="text-xl font-bold text-neutral-300">No grain selected</div>
                  <div className="text-sm text-neutral-400">Optional - adds balance</div>
                </div>
                <a
                  href="/meal/grain"
                  className="text-yellow-300 hover:text-yellow-200 text-sm font-semibold px-4 py-2 border-2 border-yellow-300 rounded-lg hover:bg-yellow-300 hover:text-neutral-900 transition-all"
                >
                  Add Grain
                </a>
              </div>
            )}

            {/* Vegetables */}
            {vegetables.length > 0 ? (
              <div className="flex items-center gap-4 p-5 bg-white/15 rounded-xl">
                <div className="text-4xl min-w-[60px] text-center">🥦</div>
                <div className="flex-1">
                  <div className="text-xl font-bold text-white">
                    {vegetables.map(v => v.name).join(' + ')}
                  </div>
                  <div className="text-sm text-neutral-200">
                    Vegetable{vegetables.length > 1 ? 's' : ''} • Fills 1/2 of plate
                  </div>
                </div>
                <a
                  href="/meal/vegetables"
                  className="text-yellow-300 hover:text-yellow-200 text-sm font-semibold px-4 py-2 border-2 border-yellow-300 rounded-lg hover:bg-yellow-300 hover:text-neutral-900 transition-all"
                >
                  Change
                </a>
              </div>
            ) : (
              <div className="flex items-center gap-4 p-5 bg-white/10 rounded-xl border-2 border-dashed border-white/30">
                <div className="text-4xl min-w-[60px] text-center opacity-50">🥦</div>
                <div className="flex-1">
                  <div className="text-xl font-bold text-neutral-300">No vegetables selected</div>
                  <div className="text-sm text-neutral-400">Recommended - fills half your plate</div>
                </div>
                <a
                  href="/meal/vegetables"
                  className="text-yellow-300 hover:text-yellow-200 text-sm font-semibold px-4 py-2 border-2 border-yellow-300 rounded-lg hover:bg-yellow-300 hover:text-neutral-900 transition-all"
                >
                  Add Vegetables
                </a>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-white/30 my-8"></div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white/15 rounded-xl p-4 text-center">
              <div className="text-sm text-neutral-200 mb-2">Total Time</div>
              <div className="text-3xl font-bold text-white">~{totalTime}m</div>
            </div>
            <div className="bg-white/15 rounded-xl p-4 text-center">
              <div className="text-sm text-neutral-200 mb-2">Ingredients</div>
              <div className="text-3xl font-bold text-white">{totalIngredients}</div>
            </div>
            <div className="bg-white/15 rounded-xl p-4 text-center">
              <div className="text-sm text-neutral-200 mb-2">Servings</div>
              <div className="text-3xl font-bold text-white">{servings}</div>
            </div>
          </div>

          {/* Cooking Tip */}
          <div className="bg-yellow-400/20 border-2 border-yellow-300 rounded-xl p-5 mb-8">
            <div className="text-yellow-300 font-bold mb-2">💡 Cooking Tip:</div>
            <p className="text-yellow-50 leading-relaxed">
              Start with vegetables (quick), then begin your grain. Finally, focus on the protein dish.
              Most components can be prepared in parallel for maximum efficiency!
            </p>
          </div>

          {/* Main Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleSendToPhone}
              style={{ backgroundColor: '#1e2f2c' }}
              className="w-full py-4 px-6 text-xl font-bold rounded-xl text-white hover:opacity-90 transition-opacity shadow-lg"
            >
              📱 Send Shopping List to iPhone
            </button>

            <button
              onClick={() => {/* TODO: Show expanded shopping list */}}
              className="w-full py-3 px-6 text-base font-semibold rounded-xl text-white bg-white/20 hover:bg-white/30 transition-colors"
            >
              📋 View Full Shopping List
            </button>

            <button
              onClick={() => {/* TODO: Show cooking timeline */}}
              className="w-full py-3 px-6 text-base font-semibold rounded-xl text-white bg-white/20 hover:bg-white/30 transition-colors"
            >
              ⏰ View Cooking Timeline
            </button>
          </div>
        </div>

        {/* Secondary Actions */}
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => {/* TODO: Save meal */}}
            className="px-6 py-3 text-base font-medium bg-white text-neutral-700 rounded-xl hover:bg-neutral-100 transition-colors shadow-md"
          >
            💾 Save This Meal
          </button>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 text-base font-medium bg-white text-neutral-700 rounded-xl hover:bg-neutral-100 transition-colors shadow-md"
          >
            ← Back to Edit
          </button>
          <button
            onClick={clearMeal}
            className="px-6 py-3 text-base font-medium bg-white text-neutral-700 rounded-xl hover:bg-neutral-100 transition-colors shadow-md"
          >
            🗑️ Start Over
          </button>
        </div>
      </div>
    </div>
  )
}
