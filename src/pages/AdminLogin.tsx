import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../lib/supabase'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: signInError } = await signIn(email, password)
    if (signInError) {
      setError('Invalid email or password.')
      setLoading(false)
    } else {
      navigate('/admin')
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl text-amber-400 mb-2">Admin Access</h1>
          <p className="text-neutral-500 text-sm">Warrior's Lens CMS</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 space-y-5">
          <div>
            <label htmlFor="email" className="block text-neutral-300 text-sm font-medium mb-2">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-md text-neutral-100 text-sm placeholder-neutral-500 focus:outline-none focus:border-amber-600 transition-colors"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-neutral-300 text-sm font-medium mb-2">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-md text-neutral-100 text-sm placeholder-neutral-500 focus:outline-none focus:border-amber-600 transition-colors"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-neutral-950 font-semibold rounded-md text-sm transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
