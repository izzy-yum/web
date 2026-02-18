'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface RecipeCardProps {
  id: string
  name: string
  slug: string
  image_url: string
  total_time_min: number
  difficulty: string
  index: number
}

export default function RecipeCard({
  id,
  name,
  slug,
  image_url,
  total_time_min,
  difficulty,
  index,
}: RecipeCardProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/recipe/${slug}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, y: -8 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      className="cursor-pointer group"
    >
      <div className="rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300" style={{ backgroundColor: '#8d2831' }}>
        <div className="relative aspect-[4/3]">
          <Image
            src={image_url}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="p-5">
          <h3 className="font-heading font-bold text-xl text-white mb-3 line-clamp-2">
            {name}
          </h3>
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
              <span>{total_time_min} min</span>
            </div>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${
                difficulty === 'Easy' ? 'bg-green-500' :
                difficulty === 'Medium' ? 'bg-yellow-500' :
                'bg-orange-500'
              }`} />
              <span>{difficulty}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
