'use client'

import { motion } from 'framer-motion'

interface SecondaryIngredient {
  ingredient: string
  slug: string
}

interface IngredientWheelProps {
  ingredients: SecondaryIngredient[]
  selectedIngredient: string | null
  onSelect: (slug: string | null) => void
}

export default function IngredientWheel({
  ingredients,
  selectedIngredient,
  onSelect,
}: IngredientWheelProps) {
  if (ingredients.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-12 pb-8"
    >
      <h3 className="text-center text-lg font-heading font-semibold text-neutral-800 mb-6">
        Filter by ingredient
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-4 px-4 scrollbar-hide">
        <button
          onClick={() => onSelect(null)}
          className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all duration-300 shadow ${
            selectedIngredient === null ? 'text-white scale-105' : 'text-white'
          }`}
          style={{
            backgroundColor: selectedIngredient === null ? '#3a5a52' : '#8d2831'
          }}
        >
          All
        </button>
        {ingredients.map((item) => (
          <motion.button
            key={item.slug}
            onClick={() => onSelect(item.slug)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all duration-300 shadow ${
              selectedIngredient === item.slug ? 'text-white scale-105' : 'text-white'
            }`}
            style={{
              backgroundColor: selectedIngredient === item.slug ? '#3a5a52' : '#8d2831'
            }}
          >
            {item.ingredient}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
