'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useMeal } from '@/contexts/MealContext'

interface Vegetable {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string
  total_time_min: number
  difficulty: string
  is_universal: boolean
  pairing_notes: string | null
}

interface VegetableSelectionProps {
  vegetables: Vegetable[]
}

export default function VegetableSelection({ vegetables }: VegetableSelectionProps) {
  const router = useRouter()
  const { protein, grain, vegetables: selectedVegetables, addVegetable, removeVegetable } = useMeal()
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(selectedVegetables.map((v) => v.id))
  )

  const handleVegetableToggle = (vegetable: Vegetable) => {
    const newIds = new Set(selectedIds)

    if (newIds.has(vegetable.id)) {
      newIds.delete(vegetable.id)
      removeVegetable(vegetable.id)
    } else {
      newIds.add(vegetable.id)
      addVegetable({
        id: vegetable.id,
        name: vegetable.name,
        slug: vegetable.slug,
        image_url: vegetable.image_url,
      })
    }

    setSelectedIds(newIds)
  }

  const handleContinue = () => {
    // Navigate to complete meal view
    router.push('/meal/summary')
  }

  const handleSkip = () => {
    // Skip vegetables, go to meal summary or back to recipe
    router.push('/meal/summary')
  }

  const canContinue = selectedIds.size > 0

  return (
    <div className="min-h-screen bg-primary-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-heading font-bold text-neutral-900 mb-4">
            Almost Done!
          </h1>
          <p className="text-xl text-neutral-600 mb-2">
            Add vegetables to complete your balanced plate
          </p>
          <p className="text-sm text-neutral-500">
            You can select multiple vegetables for variety
          </p>
          {protein && grain && (
            <p className="text-sm text-neutral-500 mt-2">
              Meal: <span className="font-semibold">{protein.name}</span> + <span className="font-semibold">{grain.name}</span>
            </p>
          )}
        </motion.div>

        {/* Vegetable Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {vegetables.map((vegetable, index) => {
            const isSelected = selectedIds.has(vegetable.id)

            return (
              <motion.div
                key={vegetable.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -8 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleVegetableToggle(vegetable)}
                className={`cursor-pointer group relative ${isSelected ? 'ring-4 ring-green-400' : ''}`}
              >
                <div
                  className="rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
                  style={{ backgroundColor: '#4ade80' }}
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={vegetable.image_url}
                      alt={vegetable.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    {/* Selection checkmark overlay */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-green-500/30 flex items-center justify-center">
                        <div className="bg-white rounded-full p-2">
                          <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading font-bold text-xl text-white mb-2 line-clamp-2">
                      {vegetable.name}
                    </h3>
                    {vegetable.description && (
                      <p className="text-sm text-neutral-50 mb-3 line-clamp-2">
                        {vegetable.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-neutral-50">
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>{vegetable.total_time_min} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            vegetable.difficulty === 'Easy'
                              ? 'bg-green-500'
                              : vegetable.difficulty === 'Medium'
                                ? 'bg-yellow-500'
                                : 'bg-orange-500'
                          }`}
                        />
                        <span>{vegetable.difficulty}</span>
                      </div>
                    </div>
                    {vegetable.is_universal && (
                      <div className="mt-2">
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-white/20 text-white rounded">
                          Goes with everything
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-4">
          {selectedIds.size > 0 && (
            <p className="text-neutral-600">
              {selectedIds.size} vegetable{selectedIds.size > 1 ? 's' : ''} selected
            </p>
          )}

          <div className="flex gap-4">
            <button
              onClick={handleSkip}
              className="px-6 py-3 text-base font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Skip
            </button>
            <button
              onClick={handleContinue}
              disabled={!canContinue}
              style={{ backgroundColor: '#1e2f2c' }}
              className="px-8 py-3 text-base font-semibold rounded-lg text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {canContinue ? 'View Complete Meal' : 'Select at least one vegetable'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
