// Ingredient Consolidation Logic
// Merges duplicate ingredients and sums amounts

interface Ingredient {
  ingredient: string
  amount: number | null
  unit: string | null
  category: string | null
  source: string
}

interface ConsolidatedIngredient extends Ingredient {
  sources: string[] // Multiple dishes if consolidated
  originalAmount?: number // Store original for reference
}

export function consolidateIngredients(ingredients: Ingredient[]): ConsolidatedIngredient[] {
  const consolidated: Record<string, ConsolidatedIngredient> = {}

  ingredients.forEach((ing) => {
    // Create a key for matching: lowercase ingredient name + unit
    const key = `${ing.ingredient.toLowerCase().trim()}|${(ing.unit || '').toLowerCase().trim()}`

    if (consolidated[key]) {
      // Ingredient already exists - consolidate it
      const existing = consolidated[key]

      // Sum amounts if both have amounts and same unit
      if (existing.amount && ing.amount && existing.unit === ing.unit) {
        existing.amount += ing.amount
      }

      // Add source if not already included
      if (!existing.sources.includes(ing.source)) {
        existing.sources.push(ing.source)
      }
    } else {
      // First occurrence of this ingredient
      consolidated[key] = {
        ...ing,
        sources: [ing.source],
        originalAmount: ing.amount || undefined,
      }
    }
  })

  // Convert back to array and sort by category and name
  return Object.values(consolidated).sort((a, b) => {
    // Sort by category first
    const catA = a.category || 'Other'
    const catB = b.category || 'Other'
    if (catA !== catB) return catA.localeCompare(catB)
    // Then by ingredient name
    return a.ingredient.localeCompare(b.ingredient)
  })
}
