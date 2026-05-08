-- Warrior's Lens — Supabase Database Schema
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard
-- Project > SQL Editor > New Query

-- ============================================================
-- CATEGORIES
-- ============================================================
CREATE TABLE IF NOT EXISTS portfolio_categories (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  slug        text NOT NULL UNIQUE,
  created_at  timestamptz DEFAULT now()
);

ALTER TABLE portfolio_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read categories"
  ON portfolio_categories FOR SELECT
  USING (true);

CREATE POLICY "Admin manage categories"
  ON portfolio_categories FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- PORTFOLIO PHOTOS
-- ============================================================
CREATE TABLE IF NOT EXISTS portfolio_photos (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title        text NOT NULL,
  description  text,
  image_url    text NOT NULL,
  category_id  uuid REFERENCES portfolio_categories(id) ON DELETE SET NULL,
  published    boolean NOT NULL DEFAULT false,
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now()
);

ALTER TABLE portfolio_photos ENABLE ROW LEVEL SECURITY;

-- Public can only see published photos
CREATE POLICY "Public read published photos"
  ON portfolio_photos FOR SELECT
  USING (published = true);

-- Admins can do everything
CREATE POLICY "Admin full access to photos"
  ON portfolio_photos FOR ALL
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER photos_updated_at
  BEFORE UPDATE ON portfolio_photos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- BLOG ARTICLES
-- ============================================================
CREATE TABLE IF NOT EXISTS blog_articles (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text NOT NULL,
  slug        text NOT NULL UNIQUE,
  excerpt     text,
  content     text NOT NULL,
  published   boolean NOT NULL DEFAULT false,
  featured    boolean NOT NULL DEFAULT false,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

ALTER TABLE blog_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published articles"
  ON blog_articles FOR SELECT
  USING (published = true);

CREATE POLICY "Admin full access to articles"
  ON blog_articles FOR ALL
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON blog_articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Indexes for performance
CREATE INDEX IF NOT EXISTS blog_articles_slug_idx ON blog_articles (slug);
CREATE INDEX IF NOT EXISTS blog_articles_published_idx ON blog_articles (published, created_at DESC);

-- ============================================================
-- PORTFOLIO VIDEOS
-- ============================================================
CREATE TABLE IF NOT EXISTS portfolio_videos (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title          text NOT NULL,
  description    text,
  video_url      text NOT NULL,
  thumbnail_url  text,
  category_id    uuid REFERENCES portfolio_categories(id) ON DELETE SET NULL,
  published      boolean NOT NULL DEFAULT false,
  created_at     timestamptz DEFAULT now(),
  updated_at     timestamptz DEFAULT now()
);

ALTER TABLE portfolio_videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published videos"
  ON portfolio_videos FOR SELECT
  USING (published = true);

CREATE POLICY "Admin full access to videos"
  ON portfolio_videos FOR ALL
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE TRIGGER videos_updated_at
  BEFORE UPDATE ON portfolio_videos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- DONE
-- Note: After running this schema, go to Supabase Dashboard >
-- Authentication > Users > create a user > set app_metadata:
-- { "role": "admin" }
-- ============================================================
