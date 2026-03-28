import { supabase } from '@/lib/supabase'
import MealSummary from '@/components/MealSummary'
import { redirect } from 'next/navigation'

export default async function MealSummaryPage() {
  // Note: In a real implementation, we'd get the meal selections from context
  // For now, we'll show a placeholder or redirect if no meal is selected

  // This page needs to be client-side to access meal context
  // Let's make it a client component wrapper

  return <MealSummary />
}
