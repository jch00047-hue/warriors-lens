import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import type { BlogArticle } from '../../lib/types'

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function ArticlesAdmin() {
  const [articles, setArticles] = useState<BlogArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', excerpt: '', content: '' })

  function load() {
    supabase
      .from('blog_articles')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => { setArticles(data ?? []); setLoading(false) })
  }

  useEffect(load, [])

  async function handleAdd() {
    if (!form.title || !form.content) return
    const slug = slugify(form.title)
    await supabase.from('blog_articles').insert([{ ...form, slug, published: false, featured: false }])
    setForm({ title: '', excerpt: '', content: '' })
    setShowForm(false)
    load()
  }

  async function togglePublish(article: BlogArticle) {
    await supabase.from('blog_articles').update({ published: !article.published }).eq('id', article.id)
    load()
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this article?')) return
    await supabase.from('blog_articles').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-neutral-100 font-medium">Articles ({articles.length})</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-neutral-950 text-sm font-semibold rounded-md transition-colors"
        >
          {showForm ? 'Cancel' : 'New Article'}
        </button>
      </div>

      {showForm && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 mb-6 space-y-4">
          <h3 className="text-neutral-200 font-medium mb-2">New Article</h3>
          <div>
            <label className="block text-neutral-400 text-xs mb-1">Title *</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Article title" className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-neutral-100 text-sm focus:outline-none focus:border-amber-600 transition-colors" />
            {form.title && <p className="text-neutral-600 text-xs mt-1">Slug: {slugify(form.title)}</p>}
          </div>
          <div>
            <label className="block text-neutral-400 text-xs mb-1">Excerpt</label>
            <input type="text" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Short summary" className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-neutral-100 text-sm focus:outline-none focus:border-amber-600 transition-colors" />
          </div>
          <div>
            <label className="block text-neutral-400 text-xs mb-1">Content *</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={8} placeholder="Write your article here..." className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-neutral-100 text-sm focus:outline-none focus:border-amber-600 transition-colors resize-y" />
          </div>
          <button onClick={handleAdd} className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-neutral-950 text-sm font-semibold rounded-md transition-colors">Save Article</button>
        </div>
      )}

      {loading && <p className="text-neutral-500 text-sm">Loading...</p>}

      <div className="space-y-3">
        {articles.map((article) => (
          <div key={article.id} className="flex items-center gap-4 bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3">
            <div className="flex-1 min-w-0">
              <p className="text-neutral-100 text-sm font-medium truncate">{article.title}</p>
              <p className="text-neutral-600 text-xs">/{article.slug}</p>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${ article.published ? 'bg-green-900 text-green-400' : 'bg-neutral-800 text-neutral-500' }`}>{article.published ? 'Live' : 'Draft'}</span>
            <button onClick={() => togglePublish(article)} title={article.published ? 'Unpublish' : 'Publish'} className="text-neutral-500 hover:text-amber-400 transition-colors" aria-label={article.published ? 'Unpublish' : 'Publish'}>
              {article.published
                ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              }
            </button>
            <button onClick={() => handleDelete(article.id)} aria-label="Delete article" className="text-neutral-600 hover:text-red-400 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
