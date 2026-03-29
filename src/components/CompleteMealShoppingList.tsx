'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { decimalToFraction } from '@/lib/fractions'
import { consolidateIngredients } from '@/lib/ingredientConsolidation'

interface Ingredient {
  ingredient: string
  amount: number | null
  unit: string | null
  category: string | null
  source: string
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
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

  // Combine all ingredients with source
  const allIngredients: Ingredient[] = [
    ...recipeIngredients.map((ing: any) => ({ ...ing, source: recipeName })),
    ...grainIngredients.map((ing: any) => ({ ...ing, source: grainName || 'Grain' })),
    ...vegetableIngredients.flat().map((ing: any, idx: number) => {
      const vegIndex = vegetableIngredients.findIndex((vegIngs) => vegIngs.includes(ing))
      return {
        ...ing,
        source: vegetableNames[vegIndex] || 'Vegetable',
      }
    }),
  ]

  // Consolidate duplicate ingredients
  const consolidatedIngredients = consolidateIngredients(allIngredients)

  // Group by category
  const grouped: Record<string, typeof consolidatedIngredients> = {}
  consolidatedIngredients.forEach((ing) => {
    const category = ing.category || 'Other'
    if (!grouped[category]) {
      grouped[category] = []
    }
    grouped[category].push(ing)
  })

  const categories = Object.keys(grouped).sort()

  const handleToggle = (key: string) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(key)) {
      newChecked.delete(key)
    } else {
      newChecked.add(key)
    }
    setCheckedItems(newChecked)
  }

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

          {/* Side Panel - Legal Pad Style (matching ShoppingListPanel) */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            style={{ backgroundColor: '#FFF9C4' }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 shadow-2xl z-50 overflow-y-auto border-l-8 border-red-400 font-[var(--font-handwriting)]"
          >
            <div className="p-6 pl-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-blue-300">
                <h2 className="text-3xl font-bold text-black">
                  Complete Meal
                </h2>
                <button
                  onClick={onClose}
                  className="text-black hover:text-neutral-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-6 pb-3 border-b border-blue-200">
                <p className="text-lg text-black font-semibold">
                  {recipeName}
                </p>
                {grainName && (
                  <p className="text-base text-black">+ {grainName}</p>
                )}
                {vegetableNames.map((veg) => (
                  <p key={veg} className="text-base text-black">+ {veg}</p>
                ))}
                <p className="text-sm text-black mt-3 italic">
                  ✓ Check items you already have
                </p>
              </div>

              {/* Ingredients by Category */}
              <div className="space-y-6 mb-6">
                {categories.map((category) => (
                  <div key={category}>
                    <h3 className="font-bold text-black mb-3 text-xl pb-2 border-b-2 border-blue-300">
                      {category}
                    </h3>
                    <ul className="space-y-0">
                      {grouped[category].map((ing, idx) => {
                        const itemKey = `${category}-${ing.ingredient}-${idx}`
                        const isChecked = checkedItems.has(itemKey)
                        return (
                          <li key={itemKey} className="flex items-start gap-3 py-3 border-b border-blue-200">
                            <input
                              type="checkbox"
                              id={itemKey}
                              checked={isChecked}
                              onChange={() => handleToggle(itemKey)}
                              className="mt-1 w-5 h-5 rounded-none border-2 border-black text-black focus:ring-neutral-500 cursor-pointer"
                            />
                            <label
                              htmlFor={itemKey}
                              className={`flex-1 cursor-pointer text-lg text-black ${isChecked ? 'line-through' : ''}`}
                            >
                              {ing.amount && ing.unit && (
                                <span className="font-bold">
                                  {decimalToFraction(ing.amount)} {ing.unit}{' '}
                                </span>
                              )}
                              <span className="capitalize">{ing.ingredient}</span>
                              {ing.sources && ing.sources.length > 1 && (
                                <span className="text-sm text-black/70 ml-2">
                                  (for {ing.sources.join(', ')})
                                </span>
                              )}
                            </label>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Close Button */}
              <div className="sticky bottom-0 pt-6 pb-2 border-t-2 border-blue-300" style={{ backgroundColor: '#FFF9C4' }}>
                <button
                  onClick={onClose}
                  style={{ backgroundColor: '#1e2f2c' }}
                  className="w-full py-4 px-4 text-xl font-bold rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 transition-opacity shadow-lg hover:opacity-90"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
