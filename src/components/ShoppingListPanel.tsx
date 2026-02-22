'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { decimalToFraction } from '@/lib/fractions'

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
        const amount = ing.amount && ing.unit ? `${decimalToFraction(ing.amount)} ${ing.unit}` : ''
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

          {/* Side Panel - Legal Pad Style */}
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
                  Shopping List
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
                <p className="text-lg text-black">
                  {recipeName}
                </p>
                <p className="text-base text-black">
                  {servings} servings
                </p>
                <p className="text-sm text-black mt-2 italic">
                  ✓ Check items you already have
                </p>
              </div>

              {/* Ingredients by Category */}
              <div className="space-y-6 mb-6">
                {categories.map(category => (
                  <div key={category}>
                    <h3 className="font-bold text-black mb-3 text-xl pb-2 border-b-2 border-blue-300">
                      {category}
                    </h3>
                    <ul className="space-y-0">
                      {groupedIngredients[category].map(ing => {
                        const isChecked = checkedItems.has(ing.id)
                        return (
                          <li key={ing.id} className="flex items-start gap-3 py-3 border-b border-blue-200">
                            <input
                              type="checkbox"
                              id={`item-${ing.id}`}
                              checked={isChecked}
                              onChange={() => handleToggle(ing.id)}
                              className="mt-1 w-5 h-5 rounded-none border-2 border-black text-black focus:ring-neutral-500 cursor-pointer"
                            />
                            <label
                              htmlFor={`item-${ing.id}`}
                              className={`flex-1 cursor-pointer text-lg text-black ${isChecked ? 'line-through' : ''}`}
                            >
                              {ing.amount && ing.unit && (
                                <span className="font-bold">
                                  {decimalToFraction(ing.amount)} {ing.unit}{' '}
                                </span>
                              )}
                              <span className="capitalize">{ing.ingredient}</span>
                              {ing.notes && (
                                <span className="text-black text-base ml-2">({ing.notes})</span>
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
              <div className="sticky bottom-0 pt-6 pb-2 border-t-2 border-blue-300" style={{ backgroundColor: '#FFF9C4' }}>
                <button
                  onClick={handleSendToPhone}
                  disabled={uncheckedCount === 0}
                  style={{ backgroundColor: '#1e2f2c' }}
                  className="w-full py-4 px-4 text-xl font-bold rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity shadow-lg hover:opacity-90"
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
