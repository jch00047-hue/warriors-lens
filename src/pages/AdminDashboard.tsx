import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut } from '../lib/supabase'
import PhotosAdmin from '../components/admin/PhotosAdmin'
import ArticlesAdmin from '../components/admin/ArticlesAdmin'
import VideosAdmin from '../components/admin/VideosAdmin'

type Tab = 'photos' | 'articles' | 'videos'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<Tab>('photos')

  async function handleSignOut() {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Admin Header */}
      <header className="bg-neutral-900 border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
        <h1 className="font-display text-xl text-amber-400">Warrior's Lens — CMS</h1>
        <button
          onClick={handleSignOut}
          className="text-neutral-400 hover:text-neutral-100 text-sm transition-colors"
        >
          Sign Out
        </button>
      </header>

      {/* Tabs */}
      <div className="border-b border-neutral-800 px-6">
        <nav className="flex gap-1 -mb-px" aria-label="Admin sections">
          {(['photos', 'articles', 'videos'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium capitalize border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-amber-500 text-amber-400'
                  : 'border-transparent text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'photos' && <PhotosAdmin />}
        {activeTab === 'articles' && <ArticlesAdmin />}
        {activeTab === 'videos' && <VideosAdmin />}
      </div>
    </div>
  )
}
