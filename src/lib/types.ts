export interface PortfolioPhoto {
  id: string
  title: string
  description: string | null
  image_url: string
  category_id: string | null
  published: boolean
  created_at: string
  updated_at: string
}

export interface BlogArticle {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  published: boolean
  featured: boolean
  created_at: string
  updated_at: string
}

export interface PortfolioVideo {
  id: string
  title: string
  description: string | null
  video_url: string
  thumbnail_url: string | null
  category_id: string | null
  published: boolean
  created_at: string
  updated_at: string
}

export interface PortfolioCategory {
  id: string
  name: string
  slug: string
  created_at: string
}
