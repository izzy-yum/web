'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Types
interface Recipe {
  id: string
  name: string
  slug: string
  image_url?: string
}

interface SideDish {
  id: string
  name: string
  slug: string
  image_url?: string
  category?: string
}

interface MealState {
  protein: Recipe | null
  grain: SideDish | null
  vegetables: SideDish[]
  servings: number
}

interface MealContextType extends MealState {
  setProtein: (recipe: Recipe, servings: number) => void
  setGrain: (grain: SideDish) => void
  addVegetable: (vegetable: SideDish) => void
  removeVegetable: (vegetableId: string) => void
  clearMeal: () => void
  isComplete: boolean
}

// Create context
const MealContext = createContext<MealContextType | undefined>(undefined)

// Provider component
export function MealProvider({ children }: { children: ReactNode }) {
  const [mealState, setMealState] = useState<MealState>(() => {
    // Load from localStorage on init
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('izzy-yum-meal')
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch (e) {
          console.error('Error loading saved meal:', e)
        }
      }
    }
    return {
      protein: null,
      grain: null,
      vegetables: [],
      servings: 4,
    }
  })

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('izzy-yum-meal', JSON.stringify(mealState))
    }
  }, [mealState])

  const setProtein = (recipe: Recipe, servings: number) => {
    setMealState((prev) => ({
      ...prev,
      protein: recipe,
      servings,
    }))
  }

  const setGrain = (grain: SideDish) => {
    setMealState((prev) => ({
      ...prev,
      grain,
    }))
  }

  const addVegetable = (vegetable: SideDish) => {
    setMealState((prev) => ({
      ...prev,
      vegetables: [...prev.vegetables, vegetable],
    }))
  }

  const removeVegetable = (vegetableId: string) => {
    setMealState((prev) => ({
      ...prev,
      vegetables: prev.vegetables.filter((v) => v.id !== vegetableId),
    }))
  }

  const clearMeal = () => {
    setMealState({
      protein: null,
      grain: null,
      vegetables: [],
      servings: 4,
    })
  }

  const isComplete = !!(mealState.protein && mealState.grain && mealState.vegetables.length > 0)

  const value: MealContextType = {
    ...mealState,
    setProtein,
    setGrain,
    addVegetable,
    removeVegetable,
    clearMeal,
    isComplete,
  }

  return <MealContext.Provider value={value}>{children}</MealContext.Provider>
}

// Custom hook to use the context
export function useMeal() {
  const context = useContext(MealContext)
  if (context === undefined) {
    throw new Error('useMeal must be used within a MealProvider')
  }
  return context
}
