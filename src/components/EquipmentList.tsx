'use client'

import { motion } from 'framer-motion'

interface Equipment {
  id: string
  equipment: string
  category: string | null
  sort_order: number
}

interface EquipmentListProps {
  equipment: Equipment[]
}

export default function EquipmentList({ equipment }: EquipmentListProps) {
  if (!equipment || equipment.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-6 flex items-center gap-2">
        <svg className="w-6 h-6 text-primary-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
        </svg>
        Equipment Needed
      </h2>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {equipment.map((item) => (
            <li key={item.id} className="flex items-start gap-3">
              <div className="mt-1.5 w-2 h-2 rounded-full bg-primary-400 flex-shrink-0" />
              <span className="text-neutral-700">{item.equipment}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
