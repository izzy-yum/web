'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface TimelineStep {
  time: string
  dish: string
  dishType: 'protein' | 'grain' | 'vegetable'
  action: string
  duration: string
  isComplete?: boolean
}

interface CookingTimelineProps {
  isOpen: boolean
  onClose: () => void
  recipeName: string
  recipeTime: number
  grainName: string | null
  grainTime: number
  vegetableNames: string[]
  vegetableTimes: number[]
}

export default function CookingTimeline({
  isOpen,
  onClose,
  recipeName,
  recipeTime,
  grainName,
  grainTime,
  vegetableNames,
  vegetableTimes,
}: CookingTimelineProps) {
  // Calculate timeline (work backwards from target finish time)
  const targetTime = new Date()
  targetTime.setHours(18, 50, 0) // Default 6:50 PM finish

  const longestTime = Math.max(recipeTime, grainTime, ...vegetableTimes)

  const steps: TimelineStep[] = []

  // Add vegetable steps
  vegetableNames.forEach((vegName, idx) => {
    const vegTime = vegetableTimes[idx] || 10
    const startTime = new Date(targetTime)
    startTime.setMinutes(startTime.getMinutes() - longestTime + (longestTime - vegTime))

    steps.push({
      time: startTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      dish: vegName,
      dishType: 'vegetable',
      action: `Prep and cook ${vegName.toLowerCase()}`,
      duration: `${vegTime} minutes • Can be made ahead`,
    })
  })

  // Add grain step
  if (grainName && grainTime > 0) {
    const startTime = new Date(targetTime)
    startTime.setMinutes(startTime.getMinutes() - grainTime)

    steps.push({
      time: startTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      dish: grainName,
      dishType: 'grain',
      action: `Start ${grainName.toLowerCase()}`,
      duration: `${grainTime} minutes • Keeps warm`,
    })
  }

  // Add protein step
  const proteinStartTime = new Date(targetTime)
  proteinStartTime.setMinutes(proteinStartTime.getMinutes() - recipeTime)

  steps.push({
    time: proteinStartTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    dish: recipeName,
    dishType: 'protein',
    action: `Cook ${recipeName}`,
    duration: `${recipeTime} minutes • Best served immediately`,
  })

  // Add completion step
  steps.push({
    time: targetTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    dish: 'Ready to Serve!',
    dishType: 'protein',
    action: 'All dishes complete. Plate and enjoy your balanced meal!',
    duration: '',
    isComplete: true,
  })

  // Sort by time
  steps.sort((a, b) => {
    const timeA = new Date(`2000-01-01 ${a.time}`)
    const timeB = new Date(`2000-01-01 ${b.time}`)
    return timeA.getTime() - timeB.getTime()
  })

  const dishTypeColors = {
    protein: '#ef4444',
    grain: '#fbbf24',
    vegetable: '#4ade80',
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[700px] md:max-h-[80vh] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-heading font-bold text-neutral-900">
                  ⏰ Cooking Timeline
                </h2>
                <button
                  onClick={onClose}
                  className="text-neutral-500 hover:text-neutral-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <p className="text-sm text-yellow-800">
                  <strong>💡 Tip:</strong> Most dishes can be prepared in parallel for maximum efficiency!
                </p>
              </div>
            </div>

            {/* Timeline Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {steps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-4 p-4 rounded-xl ${
                      step.isComplete
                        ? 'bg-green-50 border-2 border-green-400'
                        : 'bg-neutral-50 border-l-4'
                    }`}
                    style={{
                      borderLeftColor: step.isComplete ? undefined : dishTypeColors[step.dishType],
                    }}
                  >
                    <div className="min-w-[80px]">
                      <div className="text-lg font-bold" style={{ color: step.isComplete ? '#16a34a' : '#1e2f2c' }}>
                        {step.time}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div
                        className="font-semibold text-base mb-1"
                        style={{ color: step.isComplete ? '#16a34a' : dishTypeColors[step.dishType] }}
                      >
                        {step.isComplete ? '🎉 ' : ''}{step.dish}
                      </div>
                      <div className="text-sm text-neutral-700 mb-1">{step.action}</div>
                      {step.duration && (
                        <div className="text-xs text-neutral-500">{step.duration}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-neutral-200">
              <button
                onClick={onClose}
                style={{ backgroundColor: '#8d2831' }}
                className="w-full py-3 px-6 text-base font-semibold rounded-xl text-white hover:opacity-90 transition-opacity"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
