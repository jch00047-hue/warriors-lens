import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { BlogArticle } from '../lib/types'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const [article, setArticle] = useState<BlogArticle | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    supabase
      .from('blog_articles')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()
      .then(({ data }) => {
        if (data) setArticle(data)
        else setNotFound(true)
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 animate-pulse">
        <div className="h-10 bg-neutral-800 rounded w-3/4 mb-4" />
        <div className="h-4 bg-neutral-800 rounded w-1/4 mb-10" />
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-4 bg-neutral-800 rounded" />)}
        </div>
      </div>
    )
  }

  if (notFound || !article) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h1 className="font-display text-3xl text-neutral-100 mb-4">Article Not Found</h1>
        <p className="text-neutral-400 mb-8">This article doesn't exist or has been unpublished.</p>
        <Link to="/blog" className="text-amber-500 hover:text-amber-400 text-sm">← Back to Articles</Link>
      </div>
    )
  }

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <Link to="/blog" className="text-amber-600 hover:text-amber-400 text-sm mb-8 inline-block transition-colors">← Back to Articles</Link>
      <h1 className="font-display text-4xl sm:text-5xl text-neutral-100 mb-4 leading-tight">{article.title}</h1>
      {article.excerpt && <p className="text-neutral-400 text-lg mb-4 leading-relaxed">{article.excerpt}</p>}
      <p className="text-neutral-600 text-sm mb-10 border-b border-neutral-800 pb-6">
        {new Date(article.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
      <div className="prose prose-invert prose-amber max-w-none">
        {article.content.split('\n').map((paragraph, i) =>
          paragraph.trim() ? <p key={i} className="text-neutral-300 leading-relaxed mb-4">{paragraph}</p> : null
        )}
      </div>
    </article>
  )
}
