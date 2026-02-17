import { supabase } from '@/lib/supabase'
import CuisineGrid from '@/components/CuisineGrid'

interface Cuisine {
  id: string
  name: string
  slug: string
  image_url: string
  description: string | null
  sort_order: number
}

export default async function CuisinePage({
  searchParams,
}: {
  searchParams: Promise<{ protein?: string }>
}) {
  const params = await searchParams
  const protein = params.protein || 'unknown'

  // Fetch all cuisines from Supabase
  // For MVP, we show all cuisines regardless of protein
  // Future: filter cuisines by protein compatibility
  const { data: cuisines, error } = await supabase
    .from('cuisines')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching cuisines:', error)
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center">
        <p className="text-red-600">Error loading cuisines. Please try again.</p>
      </div>
    )
  }

  if (!cuisines || cuisines.length === 0) {
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center">
        <p className="text-neutral-600">No cuisines available yet.</p>
      </div>
    )
  }

  return <CuisineGrid cuisines={cuisines as Cuisine[]} protein={protein} />
}
