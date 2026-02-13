'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

export type UserRole = 'super-admin' | 'engineer' | 'policy-maker' | 'farmer' | 'citizen'

interface User {
  id: string
  username: string
  role: UserRole
  fullName: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string, role: UserRole) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo credentials for each role
const DEMO_USERS = {
  'super-admin': { username: 'admin', password: 'admin123', fullName: 'System Administrator' },
  'engineer': { username: 'engineer', password: 'eng123', fullName: 'Infrastructure Engineer' },
  'policy-maker': { username: 'policy', password: 'policy123', fullName: 'Policy Director' },
  'farmer': { username: 'farmer', password: 'farm123', fullName: 'Agricultural Manager' },
  'citizen': { username: 'citizen', password: 'citizen123', fullName: 'Public User' },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('aquapercent_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string, role: UserRole): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    const roleCredentials = DEMO_USERS[role]
    
    if (roleCredentials && username === roleCredentials.username && password === roleCredentials.password) {
      const newUser: User = {
        id: `${role}-${Date.now()}`,
        username,
        role,
        fullName: roleCredentials.fullName,
      }
      
      setUser(newUser)
      localStorage.setItem('aquapercent_user', JSON.stringify(newUser))
      return true
    }
    
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('aquapercent_user')
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
