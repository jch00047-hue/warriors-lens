import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { PortfolioPhoto } from '../lib/types'

export default function Portfolio() {
  const [photos, setPhotos] = useState<PortfolioPhoto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('portfolio_photos')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setPhotos(data ?? [])
        setLoading(false)
      })
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="font-display text-4xl text-neutral-100 mb-2">Portfolio</h1>
      <p className="text-neutral-400 mb-10">A collection of images from the field.</p>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[4/3] bg-neutral-800 rounded-lg animate-pulse" />
          ))}
        </div>
      )}

      {!loading && photos.length === 0 && (
        <div className="text-center py-24 text-neutral-500">
          <p className="text-lg mb-2">No photos published yet.</p>
          <p className="text-sm">Check back soon, or add photos via the admin dashboard.</p>
        </div>
      )}

      {!loading && photos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="group rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={photo.image_url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="text-neutral-100 font-medium text-sm">{photo.title}</h3>
                {photo.description && (
                  <p className="text-neutral-500 text-xs mt-1 line-clamp-2">{photo.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
