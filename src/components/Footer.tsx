import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-neutral-500 text-sm">
          &copy; {new Date().getFullYear()} Warrior's Lens. All rights reserved.
        </p>
        <Link
          to="/admin/login"
          className="text-neutral-600 text-xs hover:text-neutral-400 transition-colors"
        >
          Admin
        </Link>
      </div>
    </footer>
  )
}
