import { supabase } from '@/lib/supabase'
import ProteinGrid from '@/components/ProteinGrid'

interface Protein {
  id: string
  name: string
  slug: string
  image_url: string
  sort_order: number
}

export default async function Home() {
  // Fetch proteins from Supabase
  const { data: proteins, error } = await supabase
    .from('proteins')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching proteins:', error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Error loading proteins. Please try again.</p>
      </div>
    )
  }

  if (!proteins || proteins.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-600">No proteins available yet.</p>
      </div>
    )
  }

  return <ProteinGrid proteins={proteins as Protein[]} />
}
