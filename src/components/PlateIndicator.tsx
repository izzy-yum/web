'use client'

import { motion } from 'framer-motion'

interface PlateIndicatorProps {
  protein?: { name: string; slug: string } | null
  grain?: { name: string; slug: string } | null
  vegetables?: Array<{ name: string; slug: string }>
  size?: 'small' | 'medium' | 'large'
  onClick?: () => void
  className?: string
}

export default function PlateIndicator({
  protein,
  grain,
  vegetables = [],
  size = 'medium',
  onClick,
  className = '',
}: PlateIndicatorProps) {
  const hasProtein = !!protein
  const hasGrain = !!grain
  const hasVegetables = vegetables.length > 0
  const isComplete = hasProtein && hasGrain && hasVegetables

  // Size configurations
  const sizeMap = {
    small: { width: 40, height: 40, checkSize: 12 },
    medium: { width: 48, height: 48, checkSize: 14 },
    large: { width: 64, height: 64, checkSize: 18 },
  }

  const { width, height, checkSize } = sizeMap[size]

  // Colors
  const vegetableColor = hasVegetables ? '#4ade80' : '#d1d5db' // green-400 : gray-300
  const grainColor = hasGrain ? '#fbbf24' : '#d1d5db' // yellow-400 : gray-300
  const proteinColor = hasProtein ? '#ef4444' : '#d1d5db' // red-400 : gray-300

  const opacity = (filled: boolean) => (filled ? 1 : 0.3)

  return (
    <motion.div
      className={`cursor-pointer group relative ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={isComplete ? 'Complete balanced plate!' : 'Build your balanced plate'}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className={isComplete ? 'filter drop-shadow-lg' : ''}
      >
        {/* Plate background circle */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="#ffffff"
          stroke="#e5e7eb"
          strokeWidth="2"
        />

        {/* Vegetable section (top half - 180°) */}
        <motion.path
          d="M 50 50 L 50 2 A 48 48 0 0 1 98 50 Z"
          fill={vegetableColor}
          opacity={opacity(hasVegetables)}
          initial={false}
          animate={{
            opacity: opacity(hasVegetables),
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Grain section (bottom left quarter - 90°) */}
        <motion.path
          d="M 50 50 L 2 50 A 48 48 0 0 0 50 98 Z"
          fill={grainColor}
          opacity={opacity(hasGrain)}
          initial={false}
          animate={{
            opacity: opacity(hasGrain),
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Protein section (bottom right quarter - 90°) */}
        <motion.path
          d="M 50 50 L 50 98 A 48 48 0 0 0 98 50 Z"
          fill={proteinColor}
          opacity={opacity(hasProtein)}
          initial={false}
          animate={{
            opacity: opacity(hasProtein),
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Divider lines */}
        <line x1="50" y1="50" x2="50" y2="2" stroke="#9ca3af" strokeWidth="1.5" opacity="0.5" />
        <line x1="50" y1="50" x2="2" y2="50" stroke="#9ca3af" strokeWidth="1.5" opacity="0.5" />
        <line x1="50" y1="50" x2="98" y2="50" stroke="#9ca3af" strokeWidth="1.5" opacity="0.5" />
        <line x1="50" y1="50" x2="50" y2="98" stroke="#9ca3af" strokeWidth="1.5" opacity="0.5" />

        {/* Checkmarks */}
        {hasVegetables && (
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          >
            <text
              x="50"
              y="28"
              fontSize={checkSize}
              fill="#ffffff"
              textAnchor="middle"
              dominantBaseline="middle"
              fontWeight="bold"
            >
              ✓
            </text>
          </motion.g>
        )}

        {hasGrain && (
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          >
            <text
              x="26"
              y="74"
              fontSize={checkSize}
              fill="#ffffff"
              textAnchor="middle"
              dominantBaseline="middle"
              fontWeight="bold"
            >
              ✓
            </text>
          </motion.g>
        )}

        {hasProtein && (
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          >
            <text
              x="74"
              y="74"
              fontSize={checkSize}
              fill="#ffffff"
              textAnchor="middle"
              dominantBaseline="middle"
              fontWeight="bold"
            >
              ✓
            </text>
          </motion.g>
        )}

        {/* Success glow effect when complete */}
        {isComplete && (
          <motion.circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="#22c55e"
            strokeWidth="3"
            opacity="0.6"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </svg>

      {/* Tooltip on hover */}
      <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        <div className="bg-neutral-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
          {isComplete ? (
            <span className="text-green-400">✓ Complete balanced plate!</span>
          ) : (
            <div className="space-y-1">
              <div className={hasVegetables ? 'text-green-400' : 'text-gray-400'}>
                {hasVegetables ? '✓' : '○'} Vegetables {hasVegetables && vegetables.length > 1 ? `(${vegetables.length})` : ''}
              </div>
              <div className={hasGrain ? 'text-yellow-400' : 'text-gray-400'}>
                {hasGrain ? '✓' : '○'} Grain/Starch
              </div>
              <div className={hasProtein ? 'text-red-400' : 'text-gray-400'}>
                {hasProtein ? '✓' : '○'} Protein
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
