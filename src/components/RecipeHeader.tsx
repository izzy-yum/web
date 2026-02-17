'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface RecipeHeaderProps {
  name: string
  image_url: string
  description: string | null
  prep_time_min: number
  cook_time_min: number
  total_time_min: number
  difficulty: string
  default_servings: number
}

export default function RecipeHeader({
  name,
  image_url,
  description,
  prep_time_min,
  cook_time_min,
  total_time_min,
  difficulty,
  default_servings,
}: RecipeHeaderProps) {
  return (
    <div className="mb-12">
      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl mb-8"
      >
        <Image
          src={image_url}
          alt={name}
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Recipe Title and Metadata */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h1 className="text-5xl font-heading font-bold text-neutral-900 mb-4">
          {name}
        </h1>

        {/* Time and Difficulty */}
        <div className="flex flex-wrap items-center gap-6 text-neutral-600 mb-6">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-primary-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="font-medium">{total_time_min} minutes</span>
            <span className="text-neutral-400">•</span>
            <span className="text-sm">Prep: {prep_time_min} min, Cook: {cook_time_min} min</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              difficulty === 'Easy' ? 'bg-green-500' :
              difficulty === 'Medium' ? 'bg-yellow-500' :
              'bg-orange-500'
            }`} />
            <span className="font-medium">{difficulty}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-primary-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span className="font-medium">Serves {default_servings}</span>
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="text-lg text-neutral-700 leading-relaxed max-w-3xl">
            {description}
          </p>
        )}
      </motion.div>
    </div>
  )
}
