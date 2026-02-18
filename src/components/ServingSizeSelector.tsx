'use client'

import { motion } from 'framer-motion'

interface ServingSizeSelectorProps {
  selectedServings: number | null
  onSelect: (servings: number) => void
  isLoading?: boolean
}

export default function ServingSizeSelector({
  selectedServings,
  onSelect,
  isLoading = false,
}: ServingSizeSelectorProps) {
  const servingOptions = [1, 2, 3, 4, 5, 6]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mb-12"
    >
      <div className="rounded-2xl shadow-md p-6" style={{ backgroundColor: '#8d2831' }}>
        <h2 className="text-2xl font-heading font-bold text-white mb-6 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          How many servings?
        </h2>

        <div className="flex flex-wrap gap-3">
          {servingOptions.map((size) => (
            <button
              key={size}
              onClick={() => onSelect(size)}
              disabled={isLoading}
              className={`px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
                selectedServings === size
                  ? 'scale-110 shadow-lg'
                  : 'hover:scale-105'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{
                backgroundColor: selectedServings === size ? '#3a5a52' : '#ffffff',
                color: selectedServings === size ? '#ffffff' : '#2b2825',
              }}
            >
              {size}
            </button>
          ))}
        </div>

        {isLoading && (
          <div className="mt-4 flex items-center gap-2 text-white">
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-sm">Calculating amounts...</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
