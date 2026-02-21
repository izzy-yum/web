'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RecipeCard from './RecipeCard'
import IngredientWheel from './IngredientWheel'
import Breadcrumb from './Breadcrumb'

interface Recipe {
  id: string
  name: string
  slug: string
  image_url: string
  total_time_min: number
  difficulty: string
  secondary_ingredients?: { ingredient: string; slug: string }[]
}

interface SecondaryIngredient {
  ingredient: string
  slug: string
}

interface RecipeDiscoveryProps {
  recipes: Recipe[]
  protein: string
  cuisine: string
}

export default function RecipeDiscovery({
  recipes,
  protein,
  cuisine,
}: RecipeDiscoveryProps) {
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null)

  // Extract unique secondary ingredients from all recipes
  const secondaryIngredients: SecondaryIngredient[] = []
  const seen = new Set<string>()

  recipes.forEach((recipe) => {
    recipe.secondary_ingredients?.forEach((ing) => {
      if (!seen.has(ing.slug)) {
        seen.add(ing.slug)
        secondaryIngredients.push({ ingredient: ing.ingredient, slug: ing.slug })
      }
    })
  })

  // Filter recipes by selected ingredient
  const filteredRecipes = selectedIngredient
    ? recipes.filter((recipe) =>
        recipe.secondary_ingredients?.some((ing) => ing.slug === selectedIngredient)
      )
    : recipes

  return (
    <div className="min-h-screen bg-primary-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb
          items={[
            { label: protein, href: `/cuisine?protein=${protein}` },
            { label: cuisine, href: `/recipes?protein=${protein}&cuisine=${cuisine}` },
          ]}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-heading font-bold text-neutral-900 mb-4">
            Discover Your Recipe
          </h1>
          <p className="text-xl text-neutral-600">
            {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'} found
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatePresence mode="popLayout">
            {filteredRecipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <RecipeCard
                  id={recipe.id}
                  name={recipe.name}
                  slug={recipe.slug}
                  image_url={recipe.image_url}
                  total_time_min={recipe.total_time_min}
                  difficulty={recipe.difficulty}
                  index={index}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredRecipes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-neutral-600 text-lg">
              No recipes found with this ingredient. Try selecting a different filter.
            </p>
          </motion.div>
        )}

        <IngredientWheel
          ingredients={secondaryIngredients}
          selectedIngredient={selectedIngredient}
          onSelect={setSelectedIngredient}
        />
      </div>
    </div>
  )
}
