'use client'

import { useEffect, useState } from 'react'
import { ThemeMode } from './Dashboard'
import { useAuth } from '@/contexts/AuthContext'
import { useNotifications } from '@/contexts/NotificationContext'
import { useLanguage } from '@/contexts/LanguageContext'

interface HeaderProps {
  theme: ThemeMode
  onThemeToggle: () => void
  onConnectivityOpen: () => void
  onNotificationOpen: () => void
}

export default function Header({ theme, onThemeToggle, onConnectivityOpen, onNotificationOpen }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState('')
  const [systemHealth, setSystemHealth] = useState(98.7)
  const { user, logout } = useAuth()
  const { unreadCount } = useNotifications()
  const { t } = useLanguage()

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    
    const healthInterval = setInterval(() => {
      setSystemHealth(prev => 97 + Math.random() * 2)
    }, 3000)

    return () => {
      clearInterval(interval)
      clearInterval(healthInterval)
    }
  }, [])

  const getRoleDisplay = (role: string) => {
    const roleMap: Record<string, string> = {
      'super-admin': 'Super Admin',
      'engineer': 'Engineer',
      'policy-maker': 'Policy Maker',
      'farmer': 'Farmer',
      'citizen': 'Citizen'
    }
    return roleMap[role] || role
  }

  const getRoleColor = (role: string) => {
    const colorMap: Record<string, string> = {
      'super-admin': 'from-purple-500 to-pink-500',
      'engineer': 'from-blue-500 to-cyan-500',
      'policy-maker': 'from-green-500 to-emerald-500',
      'farmer': 'from-yellow-500 to-orange-500',
      'citizen': 'from-gray-500 to-gray-600'
    }
    return colorMap[role] || 'from-gray-500 to-gray-600'
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${theme === 'dark' ? 'glass-dark border-gray-800' : 'glass-eco border-emerald-200'} border-b px-6 py-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${theme === 'dark' ? 'bg-gradient-to-br from-cyber-blue to-purple-500' : 'bg-gradient-to-br from-emerald-500 to-teal-500'} flex items-center justify-center`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M12 2 Q14 6 12 10 Q10 6 12 2 M12 10 Q14 14 12 18 Q10 14 12 10" />
                <circle cx="12" cy="12" r="2" fill="white" />
              </svg>
            </div>
            <div>
              <h1 className={`text-xl font-bold ${theme === 'eco' ? 'text-gray-800' : ''}`}>{t('app.title')}</h1>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>{t('app.subtitle') || 'AI Intelligence'}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* System Monitor Button */}
          <button
            onClick={onConnectivityOpen}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
              theme === 'dark'
                ? 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 border border-emerald-500/30'
            }`}
            title="System Connectivity Monitor"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold">{t('system.monitor')}</span>
          </button>

          {/* Secure Connection Indicator */}
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full bg-green-500 animate-pulse`}></div>
            <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{t('secure.connection').toUpperCase()}</span>
          </div>

          {/* System Health */}
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${systemHealth > 98 ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`}></div>
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{t('system.online')}</span>
          </div>

          {/* Time */}
          <div className={`text-sm font-mono ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{currentTime}</div>

          {/* Notification Bell */}
          <button
            onClick={onNotificationOpen}
            className={`relative p-2 rounded-lg transition-all ${
              theme === 'dark'
                ? 'hover:bg-gray-800 text-gray-400 hover:text-white'
                : 'hover:bg-emerald-100 text-gray-600 hover:text-emerald-700'
            }`}
            title={t('notifications')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onThemeToggle}
            className={`${theme === 'dark' ? 'glass' : 'bg-emerald-100 border border-emerald-300'} rounded-lg px-4 py-2 text-sm hover:bg-white/10 transition-all flex items-center gap-2 ${theme === 'eco' ? 'text-emerald-700' : ''}`}
          >
            <span>🌿</span>
            <span>{t('eco.mode')}</span>
          </button>

          {/* User Profile with Logout */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className={`text-sm font-semibold ${theme === 'eco' ? 'text-gray-800' : 'text-white'}`}>
                {user?.fullName || 'User'}
              </div>
              <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
                {user ? getRoleDisplay(user.role) : 'Guest'}
              </div>
            </div>
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${user ? getRoleColor(user.role) : 'from-gray-500 to-gray-600'} flex items-center justify-center text-sm font-bold text-white`}>
              {user?.fullName?.charAt(0) || 'U'}
            </div>
            <button
              onClick={logout}
              className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-red-500/20 text-red-400' : 'hover:bg-red-100 text-red-600'} transition-all`}
              title={t('logout')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
