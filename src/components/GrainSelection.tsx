'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useMeal } from '@/contexts/MealContext'

interface Grain {
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

interface GrainSelectionProps {
  grains: Grain[]
}

export default function GrainSelection({ grains }: GrainSelectionProps) {
  const router = useRouter()
  const { protein, vegetables, setGrain } = useMeal()
  const [selectedGrainId, setSelectedGrainId] = useState<string | null>(null)

  // Check if we're in editing mode (user already has vegetables selected)
  const isEditing = vegetables.length > 0

  const handleGrainSelect = (grain: Grain) => {
    setSelectedGrainId(grain.id)
    setGrain({
      id: grain.id,
      name: grain.name,
      slug: grain.slug,
      image_url: grain.image_url,
    })

    // Navigate based on context
    setTimeout(() => {
      if (isEditing) {
        // User is editing, return to meal summary
        router.push('/meal/summary')
      } else {
        // Initial flow, continue to vegetables
        router.push('/meal/vegetables')
      }
    }, 800)
  }

  const handleSkip = () => {
    // Skip grain selection, go straight to vegetables or recipe detail
    router.push('/meal/vegetables')
  }

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
            Complete Your Plate
          </h1>
          <p className="text-xl text-neutral-600 mb-2">
            Add a grain or starch to balance your meal
          </p>
          {protein && (
            <p className="text-sm text-neutral-500">
              Pairing with: <span className="font-semibold">{protein.name}</span>
            </p>
          )}
        </motion.div>

        {/* Grain Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {grains.map((grain, index) => (
            <motion.div
              key={grain.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -8 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleGrainSelect(grain)}
              className={`cursor-pointer group ${selectedGrainId === grain.id ? 'ring-4 ring-yellow-400' : ''}`}
            >
              <div className="rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300" style={{ backgroundColor: '#fbbf24' }}>
                <div className="relative aspect-[4/3]">
                  <Image
                    src={grain.image_url}
                    alt={grain.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-bold text-xl text-white mb-2 line-clamp-2">
                    {grain.name}
                  </h3>
                  {grain.description && (
                    <p className="text-sm text-neutral-50 mb-3 line-clamp-2">
                      {grain.description}
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
                      <span>{grain.total_time_min} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          grain.difficulty === 'Easy'
                            ? 'bg-green-500'
                            : grain.difficulty === 'Medium'
                              ? 'bg-yellow-500'
                              : 'bg-orange-500'
                        }`}
                      />
                      <span>{grain.difficulty}</span>
                    </div>
                  </div>
                  {grain.is_universal && (
                    <div className="mt-2">
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-white/20 text-white rounded">
                        Goes with everything
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skip Button */}
        <div className="text-center">
          <button
            onClick={handleSkip}
            style={{ backgroundColor: '#fbbf24' }}
            className="px-6 py-3 text-base font-semibold text-white rounded-xl hover:opacity-90 transition-opacity shadow-md"
          >
            Skip - I'll choose later
          </button>
        </div>
      </div>
    </div>
  )
}
