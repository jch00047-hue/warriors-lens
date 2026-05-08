import { Link, NavLink } from 'react-router-dom'

export default function Navigation() {
  return (
    <header className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-sm border-b border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-label="Warrior's Lens logo">
            <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="14" cy="14" r="7" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="14" cy="14" r="2.5" fill="currentColor" />
            <line x1="14" y1="2" x2="14" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="14" y1="22" x2="14" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="2" y1="14" x2="6" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="22" y1="14" x2="26" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="font-display text-lg font-bold tracking-wide">Warrior's Lens</span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-6" aria-label="Main navigation">
          {[
            { to: '/', label: 'Home' },
            { to: '/portfolio', label: 'Portfolio' },
            { to: '/blog', label: 'Blog' },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-amber-500'
                    : 'text-neutral-400 hover:text-neutral-100'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
