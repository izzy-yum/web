'use client'

import { motion } from 'framer-motion'
import React from 'react'

interface Instruction {
  id: string
  phase: string
  step_number: number
  instruction: string
  has_quantity: boolean
  clean_as_you_go: string | null
}

interface InstructionStepsProps {
  instructions: Instruction[]
}

const phaseLabels: Record<string, string> = {
  mise_en_place: 'Mise en Place (Prep First)',
  cooking: 'Cooking',
  plating: 'Plating',
}

const phaseIcons: Record<string, React.ReactNode> = {
  mise_en_place: (
    <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
    </svg>
  ),
  cooking: (
    <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
    </svg>
  ),
  plating: (
    <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
      <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
    </svg>
  ),
}

export default function InstructionSteps({ instructions }: InstructionStepsProps) {
  if (!instructions || instructions.length === 0) {
    return null
  }

  // Group instructions by phase
  const groupedInstructions: Record<string, Instruction[]> = {}
  instructions.forEach((inst) => {
    const phase = inst.phase || 'other'
    if (!groupedInstructions[phase]) {
      groupedInstructions[phase] = []
    }
    groupedInstructions[phase].push(inst)
  })

  // Order phases
  const phaseOrder = ['mise_en_place', 'cooking', 'plating']
  const orderedPhases = phaseOrder.filter((phase) => groupedInstructions[phase])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-6 flex items-center gap-2">
        <svg className="w-6 h-6 text-primary-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
        </svg>
        Instructions
      </h2>

      <div className="space-y-8">
        {orderedPhases.map((phase, phaseIndex) => (
          <div key={phase} className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-xl font-heading font-bold text-primary-700 mb-4 flex items-center gap-2">
              {phaseIcons[phase]}
              {phaseLabels[phase]}
            </h3>

            <ol className="space-y-4">
              {groupedInstructions[phase]
                .sort((a, b) => a.step_number - b.step_number)
                .map((inst, index) => (
                  <li key={inst.id} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-semibold flex items-center justify-center">
                        {inst.step_number}
                      </div>
                    </div>
                    <div className="flex-1 pt-0.5">
                      <p className="text-neutral-700 leading-relaxed">
                        {inst.instruction}
                      </p>
                      {inst.clean_as_you_go && (
                        <p className="mt-2 text-sm italic text-primary-600 bg-primary-50 rounded-lg px-3 py-2 inline-block">
                          Clean: {inst.clean_as_you_go}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
            </ol>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
