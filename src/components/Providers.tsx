'use client'

import { MealProvider } from '@/contexts/MealContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return <MealProvider>{children}</MealProvider>
}
