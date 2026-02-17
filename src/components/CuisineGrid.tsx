'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Cuisine {
  id: string
  name: string
  slug: string
  image_url: string
  description: string | null
  sort_order: number
}

interface CuisineGridProps {
  cuisines: Cuisine[]
  protein: string
}

export default function CuisineGrid({ cuisines, protein }: CuisineGridProps) {
  const router = useRouter()

  const handleCuisineClick = (cuisineSlug: string) => {
    router.push(`/recipes?protein=${protein}&cuisine=${cuisineSlug}`)
  }

  return (
    <div className="min-h-screen bg-primary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-primary-600 uppercase tracking-wide mb-2">
            Selected: <span className="capitalize">{protein}</span>
          </p>
          <h1 className="text-5xl font-heading font-bold text-neutral-900 mb-4">
            What cuisine sounds good?
          </h1>
          <p className="text-xl text-neutral-600">
            Choose a cuisine to explore recipes
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {cuisines.map((cuisine, index) => (
            <motion.div
              key={cuisine.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCuisineClick(cuisine.slug)}
              className="cursor-pointer group"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                <Image
                  src={cuisine.image_url}
                  alt={cuisine.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover"
                  priority={index < 5}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 px-4">
                  <h3 className="text-white text-2xl font-heading font-bold drop-shadow-lg mb-1">
                    {cuisine.name}
                  </h3>
                  {cuisine.description && (
                    <p className="text-white/90 text-sm text-center drop-shadow-md line-clamp-2">
                      {cuisine.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
