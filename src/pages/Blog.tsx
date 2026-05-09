import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

type BlogListItem = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  created_at: string
  featured: boolean
}

export default function Blog() {
  const [articles, setArticles] = useState<BlogListItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('blog_articles')
      .select('id, title, slug, excerpt, created_at, featured')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setArticles(data ?? [])
        setLoading(false)
      })
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="font-display text-4xl text-neutral-100 mb-2">Articles</h1>
      <p className="text-neutral-400 mb-10">Stories from the field and behind the lens.</p>

      {loading && (
        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-neutral-900 rounded-lg p-6 animate-pulse">
              <div className="h-6 bg-neutral-800 rounded w-3/4 mb-3" />
              <div className="h-4 bg-neutral-800 rounded w-full mb-2" />
              <div className="h-4 bg-neutral-800 rounded w-2/3" />
            </div>
          ))}
        </div>
      )}

      {!loading && articles.length === 0 && (
        <div className="text-center py-24 text-neutral-500">
          <p className="text-lg mb-2">No articles published yet.</p>
          <p className="text-sm">Add articles via the admin dashboard.</p>
        </div>
      )}

      {!loading && articles.length > 0 && (
        <div className="space-y-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              to={`/blog/${article.slug}`}
              className="block bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-amber-700 transition-colors group"
            >
              <h2 className="font-display text-xl text-neutral-100 group-hover:text-amber-400 transition-colors mb-2">
                {article.title}
              </h2>

              {article.excerpt && (
                <p className="text-neutral-400 text-sm leading-relaxed mb-3">
                  {article.excerpt}
                </p>
              )}

              <p className="text-neutral-600 text-xs">
                {new Date(article.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
