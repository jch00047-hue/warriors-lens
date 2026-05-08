import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import type { PortfolioPhoto } from '../../lib/types'

export default function PhotosAdmin() {
  const [photos, setPhotos] = useState<PortfolioPhoto[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', image_url: '' })

  function load() {
    supabase
      .from('portfolio_photos')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => { setPhotos(data ?? []); setLoading(false) })
  }

  useEffect(load, [])

  async function handleAdd() {
    if (!form.title || !form.image_url) return
    await supabase.from('portfolio_photos').insert([{ ...form, published: false }])
    setForm({ title: '', description: '', image_url: '' })
    setShowForm(false)
    load()
  }

  async function togglePublish(photo: PortfolioPhoto) {
    await supabase.from('portfolio_photos').update({ published: !photo.published }).eq('id', photo.id)
    load()
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this photo?')) return
    await supabase.from('portfolio_photos').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-neutral-100 font-medium">Photos ({photos.length})</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-neutral-950 text-sm font-semibold rounded-md transition-colors"
        >
          {showForm ? 'Cancel' : 'Add Photo'}
        </button>
      </div>

      {showForm && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 mb-6 space-y-4">
          <h3 className="text-neutral-200 font-medium mb-2">New Photo</h3>
          {[
            { label: 'Title *', key: 'title', type: 'text', placeholder: 'Photo title' },
            { label: 'Image URL *', key: 'image_url', type: 'url', placeholder: 'https://...' },
            { label: 'Description', key: 'description', type: 'text', placeholder: 'Optional description' },
          ].map(({ label, key, type, placeholder }) => (
            <div key={key}>
              <label className="block text-neutral-400 text-xs mb-1">{label}</label>
              <input
                type={type}
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
                className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-neutral-100 text-sm focus:outline-none focus:border-amber-600 transition-colors"
              />
            </div>
          ))}
          <button
            onClick={handleAdd}
            className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-neutral-950 text-sm font-semibold rounded-md transition-colors"
          >
            Save Photo
          </button>
        </div>
      )}

      {loading && <p className="text-neutral-500 text-sm">Loading...</p>}

      <div className="space-y-3">
        {photos.map((photo) => (
          <div key={photo.id} className="flex items-center gap-4 bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3">
            <img src={photo.image_url} alt={photo.title} className="w-14 h-10 object-cover rounded" />
            <div className="flex-1 min-w-0">
              <p className="text-neutral-100 text-sm font-medium truncate">{photo.title}</p>
              {photo.description && <p className="text-neutral-500 text-xs truncate">{photo.description}</p>}
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${ photo.published ? 'bg-green-900 text-green-400' : 'bg-neutral-800 text-neutral-500' }`}>
              {photo.published ? 'Live' : 'Draft'}
            </span>
            <button onClick={() => togglePublish(photo)} title={photo.published ? 'Unpublish' : 'Publish'} className="text-neutral-500 hover:text-amber-400 transition-colors" aria-label={photo.published ? 'Unpublish photo' : 'Publish photo'}>
              {photo.published
                ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              }
            </button>
            <button onClick={() => handleDelete(photo.id)} aria-label="Delete photo" className="text-neutral-600 hover:text-red-400 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
