'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Ingredient {
  id: string
  ingredient: string
  amount: number | null
  unit: string | null
  category: string | null
  notes: string | null
}

interface ShoppingListPanelProps {
  isOpen: boolean
  onClose: () => void
  ingredients: Ingredient[]
  recipeName: string
  servings: number
}

export default function ShoppingListPanel({
  isOpen,
  onClose,
  ingredients,
  recipeName,
  servings,
}: ShoppingListPanelProps) {
  // Track which items user already has (checked = have it, unchecked = need to buy)
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

  const handleToggle = (id: string) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(id)) {
      newChecked.delete(id)
    } else {
      newChecked.add(id)
    }
    setCheckedItems(newChecked)
  }

  const handleSendToPhone = () => {
    // Get unchecked items (what they need to buy)
    const itemsToSend = ingredients.filter(ing => !checkedItems.has(ing.id))

    // Group by category
    const grouped: Record<string, Ingredient[]> = {}
    itemsToSend.forEach(ing => {
      const category = ing.category || 'Other'
      if (!grouped[category]) {
        grouped[category] = []
      }
      grouped[category].push(ing)
    })

    // Create message
    let message = `Shopping List for ${recipeName} (${servings} servings):\n\n`
    Object.keys(grouped).sort().forEach(category => {
      message += `${category}:\n`
      grouped[category].forEach(ing => {
        const amount = ing.amount && ing.unit ? `${ing.amount} ${ing.unit}` : ''
        message += `  • ${amount} ${ing.ingredient}\n`
      })
      message += '\n'
    })

    alert(message)
  }

  // Group ingredients by category
  const groupedIngredients: Record<string, Ingredient[]> = {}
  ingredients.forEach(ing => {
    const category = ing.category || 'Other'
    if (!groupedIngredients[category]) {
      groupedIngredients[category] = []
    }
    groupedIngredients[category].push(ing)
  })

  const categories = Object.keys(groupedIngredients).sort()
  const uncheckedCount = ingredients.length - checkedItems.size

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

          {/* Side Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-heading font-bold text-neutral-900">
                  Shopping List
                </h2>
                <button
                  onClick={onClose}
                  className="text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-6">
                <p className="text-sm text-neutral-600">
                  {recipeName} • {servings} servings
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  Check items you already have
                </p>
              </div>

              {/* Ingredients by Category */}
              <div className="space-y-6 mb-6">
                {categories.map(category => (
                  <div key={category}>
                    <h3 className="font-heading font-semibold text-neutral-900 mb-3 text-sm uppercase tracking-wide">
                      {category}
                    </h3>
                    <ul className="space-y-2">
                      {groupedIngredients[category].map(ing => {
                        const isChecked = checkedItems.has(ing.id)
                        return (
                          <li key={ing.id} className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              id={`item-${ing.id}`}
                              checked={isChecked}
                              onChange={() => handleToggle(ing.id)}
                              className="mt-1 w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                            />
                            <label
                              htmlFor={`item-${ing.id}`}
                              className={`flex-1 cursor-pointer ${isChecked ? 'line-through text-neutral-400' : 'text-neutral-900'}`}
                            >
                              {ing.amount && ing.unit && (
                                <span className="font-semibold">
                                  {ing.amount} {ing.unit}{' '}
                                </span>
                              )}
                              <span className="capitalize">{ing.ingredient}</span>
                              {ing.notes && (
                                <span className="text-neutral-500 text-sm ml-2">({ing.notes})</span>
                              )}
                            </label>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Send Button */}
              <div className="sticky bottom-0 bg-white pt-4 border-t border-neutral-200">
                <button
                  onClick={handleSendToPhone}
                  disabled={uncheckedCount === 0}
                  style={{ backgroundColor: '#1e2f2c' }}
                  className="w-full py-3 px-4 text-base font-semibold rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity shadow-lg hover:opacity-90"
                >
                  Send {uncheckedCount} {uncheckedCount === 1 ? 'item' : 'items'} to iPhone
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
