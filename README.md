# Warrior's Lens — Backend CMS Setup Guide

## Overview

This is a complete rebuild of the Warrior's Lens portfolio website with a proper database backend and content management system (CMS). It replaces the static HTML/CSS/JS site with a modern React + Supabase solution that allows you to manage photos, articles, and videos without touching code.

## Architecture

- **Frontend**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (email/password)
- **Routing**: React Router v6

## What's Included

### Pages

- **Home** (`/`) - Hero section with key services
- **Portfolio** (`/portfolio`) - Gallery of published photos
- **Blog** (`/blog`) - List of published articles
- **Blog Post** (`/blog/:slug`) - Individual article view
- **Admin Dashboard** (`/admin`) - Manage content (photos, articles, videos)
- **Admin Login** (`/admin/login`) - Authentication for admins

### Database Tables

All tables have Row Level Security (RLS) enabled:

1. **portfolio_photos** - Stores photos with title, description, image URL
2. **blog_articles** - Stores blog posts with title, slug, excerpt, content
3. **portfolio_videos** - Stores video content (YouTube, Vimeo links)
4. **portfolio_categories** - Optional categorization for content

## Environment Setup

### Required Environment Variables

Create a `.env` file in the project root:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Find these values:
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click Settings → API
4. Copy the Project URL and anon key

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/jch00047-hue/warriors-lens.git
cd warriors-lens
npm install
```

### 2. Configure Environment Variables

Copy the example env file and fill in your Supabase credentials:

```bash
cp .env.example .env
```

### 3. Set Up Supabase Database

Run the SQL in `supabase/schema.sql` in your Supabase SQL editor.

### 4. Run Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### 5. Set Up Admin User

In Supabase:
1. Go to Authentication → Users
2. Create a new user with email/password
3. Once created, go to User Details
4. Scroll to "Raw app_metadata"
5. Add: `{ "role": "admin" }`
6. Save

## Deployment

```bash
npm run build
```

Deploy the `dist/` directory to Vercel, Netlify, or GitHub Pages.

> **Routing Note:** Configure your host to serve `dist/index.html` for all routes (SPA routing).

## Troubleshooting

- **"Missing Supabase environment variables"** — Check `.env` and restart dev server
- **Admin login not working** — Verify `role: admin` in Supabase app_metadata
- **Photos not showing** — Check image URL is public and photo is published
- **Articles not in blog** — Confirm article is published and slug is unique

## Support

- [Supabase Docs](https://supabase.com/docs)
- [React Router Docs](https://reactrouter.com/)
- [Tailwind Docs](https://tailwindcss.com/docs)
