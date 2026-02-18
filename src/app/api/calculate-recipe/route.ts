import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

interface CalculateRecipeRequest {
  recipeId: string
  servings: number
}

interface Ingredient {
  id: string
  ingredient: string
  amount: number | null
  unit: string | null
  category: string | null
  is_secondary: boolean
  notes: string | null
  sort_order: number
}

interface Instruction {
  id: string
  phase: string
  step_number: number
  instruction: string
  has_quantity: boolean
  clean_as_you_go: string | null
}

export async function POST(request: NextRequest) {
  try {
    const body: CalculateRecipeRequest = await request.json()
    const { recipeId, servings } = body

    // Validate input
    if (!recipeId || !servings) {
      return NextResponse.json(
        { error: 'Missing required fields: recipeId and servings' },
        { status: 400 }
      )
    }

    if (servings < 1 || servings > 12) {
      return NextResponse.json(
        { error: 'Servings must be between 1 and 12' },
        { status: 400 }
      )
    }

    // Fetch complete recipe from Supabase
    const { data: recipe, error } = await supabase
      .from('recipes')
      .select(`
        *,
        recipe_equipment (*),
        recipe_ingredients (*),
        recipe_instructions (*)
      `)
      .eq('id', recipeId)
      .single()

    if (error || !recipe) {
      return NextResponse.json(
        { error: 'Recipe not found' },
        { status: 404 }
      )
    }

    // Calculate multiplier
    const multiplier = servings / recipe.default_servings

    // Scale ingredients
    const scaledIngredients = recipe.recipe_ingredients.map((ing: Ingredient) => ({
      ...ing,
      amount: ing.amount ? ing.amount * multiplier : null,
    }))

    // Scale instructions (only for those with quantities)
    // For MVP, we'll scale numeric values in instruction text using regex
    const scaledInstructions = recipe.recipe_instructions.map((inst: Instruction) => {
      if (!inst.has_quantity) {
        return inst
      }

      // Simple number scaling in instruction text
      // Matches patterns like "1 lb", "2 tbsp", "1/2 cup", etc.
      let scaledText = inst.instruction

      // Match fractions like "1/2" or whole numbers followed by units
      scaledText = scaledText.replace(
        /(\d+(?:\/\d+)?)\s*(lb|lbs|oz|cup|cups|tbsp|tsp|can|cans|g|kg|ml|l)/gi,
        (match, amount, unit) => {
          // Parse fraction or decimal
          let numericAmount: number
          if (amount.includes('/')) {
            const [numerator, denominator] = amount.split('/').map(Number)
            numericAmount = numerator / denominator
          } else {
            numericAmount = parseFloat(amount)
          }

          const scaledAmount = numericAmount * multiplier

          // Format output
          let formattedAmount: string
          if (scaledAmount % 1 === 0) {
            // Whole number
            formattedAmount = scaledAmount.toString()
          } else if (scaledAmount < 1) {
            // Try to represent as fraction for common values
            if (scaledAmount === 0.5) formattedAmount = '1/2'
            else if (scaledAmount === 0.25) formattedAmount = '1/4'
            else if (scaledAmount === 0.75) formattedAmount = '3/4'
            else if (scaledAmount === 0.33) formattedAmount = '1/3'
            else if (scaledAmount === 0.67) formattedAmount = '2/3'
            else formattedAmount = scaledAmount.toFixed(2)
          } else {
            formattedAmount = scaledAmount.toFixed(1).replace(/\.0$/, '')
          }

          return `${formattedAmount} ${unit}`
        }
      )

      return {
        ...inst,
        instruction: scaledText,
      }
    })

    // Return scaled recipe
    return NextResponse.json({
      ...recipe,
      servings,
      recipe_ingredients: scaledIngredients,
      recipe_instructions: scaledInstructions,
    })
  } catch (error) {
    console.error('Error calculating recipe:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
