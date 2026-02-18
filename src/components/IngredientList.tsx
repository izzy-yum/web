'use client'

import { motion } from 'framer-motion'

interface Ingredient {
  id: string
  ingredient: string
  amount: number | null
  unit: string | null
  category: string | null
  notes: string | null
  sort_order: number
}

interface IngredientListProps {
  ingredients: Ingredient[]
  showAmounts?: boolean
}

export default function IngredientList({ ingredients, showAmounts = false }: IngredientListProps) {
  if (!ingredients || ingredients.length === 0) {
    return null
  }

  // Group ingredients by category
  const groupedIngredients: Record<string, Ingredient[]> = {}
  ingredients.forEach((ing) => {
    const category = ing.category || 'Other'
    if (!groupedIngredients[category]) {
      groupedIngredients[category] = []
    }
    groupedIngredients[category].push(ing)
  })

  const categories = Object.keys(groupedIngredients).sort()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-6 flex items-center gap-2">
        <svg className="w-6 h-6 text-primary-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
        Ingredients
      </h2>

      {!showAmounts && (
        <div className="bg-primary-100 border border-primary-300 rounded-xl p-4 mb-6">
          <p className="text-sm text-primary-800">
            <span className="font-semibold">Select serving size below</span> to see ingredient amounts
          </p>
        </div>
      )}

      <div className="rounded-2xl shadow-md p-6 space-y-6" style={{ backgroundColor: '#8d2831' }}>
        {categories.map((category) => (
          <div key={category}>
            <h3 className="font-heading font-semibold text-neutral-100 mb-3 text-sm uppercase tracking-wide">
              {category}
            </h3>
            <ul className="space-y-2">
              {groupedIngredients[category].map((ing) => (
                <li key={ing.id} className="flex items-start gap-3 text-neutral-50">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-white flex-shrink-0" />
                  <div className="flex-1">
                    {showAmounts && ing.amount && (
                      <span className="font-semibold text-white">
                        {ing.amount} {ing.unit}{' '}
                      </span>
                    )}
                    <span className="capitalize">{ing.ingredient}</span>
                    {showAmounts && ing.notes && (
                      <span className="text-neutral-200 text-sm ml-2">({ing.notes})</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
