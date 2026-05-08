import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { isAdmin } from '../lib/supabase'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    isAdmin().then((admin) => {
      setAuthorized(admin)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950">
        <div className="text-neutral-400 text-sm">Checking authorization...</div>
      </div>
    )
  }

  return authorized ? <>{children}</> : <Navigate to="/admin/login" replace />
}
