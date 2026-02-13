'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Dashboard from '@/components/Dashboard'
import IntroPage from '@/components/IntroPage'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth()
  const [showDashboard, setShowDashboard] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-cyan-400 font-mono">Loading System...</div>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      {!showDashboard ? (
        <IntroPage onEnter={() => setShowDashboard(true)} />
      ) : (
        <Dashboard />
      )}
    </ProtectedRoute>
  )
}
