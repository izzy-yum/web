'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface Ingredient {
  ingredient: string
  amount: number | null
  unit: string | null
  category: string | null
  source: string // Which dish it's from
}

interface CompleteMealShoppingListProps {
  isOpen: boolean
  onClose: () => void
  recipeIngredients: any[]
  grainIngredients: any[]
  vegetableIngredients: any[][]
  recipeName: string
  grainName: string | null
  vegetableNames: string[]
}

export default function CompleteMealShoppingList({
  isOpen,
  onClose,
  recipeIngredients,
  grainIngredients,
  vegetableIngredients,
  recipeName,
  grainName,
  vegetableNames,
}: CompleteMealShoppingListProps) {
  // Combine all ingredients with source
  const allIngredients: Ingredient[] = [
    ...recipeIngredients.map((ing: any) => ({ ...ing, source: recipeName })),
    ...grainIngredients.map((ing: any) => ({ ...ing, source: grainName || 'Grain' })),
    ...vegetableIngredients.flat().map((ing: any, idx: number) => ({
      ...ing,
      source: vegetableNames[Math.floor(idx / (vegetableIngredients[0]?.length || 1))] || 'Vegetable',
    })),
  ]

  // Group by category
  const grouped: Record<string, Ingredient[]> = {}
  allIngredients.forEach((ing) => {
    const category = ing.category || 'Other'
    if (!grouped[category]) {
      grouped[category] = []
    }
    grouped[category].push(ing)
  })

  const categories = Object.keys(grouped).sort()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[600px] md:max-h-[80vh] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-heading font-bold text-neutral-900">
                  🛒 Complete Meal Shopping List
                </h2>
                <button
                  onClick={onClose}
                  className="text-neutral-500 hover:text-neutral-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-neutral-600 mt-2">
                Ingredients from {recipeName}
                {grainName && ` + ${grainName}`}
                {vegetableNames.length > 0 && ` + ${vegetableNames.join(' + ')}`}
              </p>
            </div>

            {/* Shopping List Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {categories.map((category) => (
                <div key={category} className="mb-6">
                  <h3 className="font-bold text-lg mb-3 text-neutral-900 pb-2 border-b-2 border-neutral-200">
                    {category}
                  </h3>
                  <ul className="space-y-2">
                    {grouped[category].map((ing, idx) => (
                      <li key={idx} className="flex items-start gap-3 py-2">
                        <div className="mt-1">
                          <input type="checkbox" className="w-4 h-4 rounded border-neutral-300" />
                        </div>
                        <div className="flex-1">
                          {ing.amount && ing.unit && (
                            <span className="font-semibold text-neutral-900">
                              {ing.amount} {ing.unit}{' '}
                            </span>
                          )}
                          <span className="text-neutral-700">{ing.ingredient}</span>
                          <span className="text-xs text-neutral-500 ml-2">
                            ({ing.source})
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-neutral-200">
              <button
                onClick={onClose}
                style={{ backgroundColor: '#8d2831' }}
                className="w-full py-3 px-6 text-base font-semibold rounded-xl text-white hover:opacity-90 transition-opacity"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
