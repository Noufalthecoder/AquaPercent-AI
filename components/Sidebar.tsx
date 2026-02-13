'use client'

import { ThemeMode } from './Dashboard'
import { useAuth } from '@/contexts/AuthContext'

interface SidebarProps {
  activeView: string
  onViewChange: (view: string) => void
  theme: ThemeMode
}

const allMenuItems = [
  { id: 'command', label: 'Global Command Center', icon: '🌐', roles: ['super-admin', 'engineer', 'policy-maker'] },
  { id: 'leak', label: 'Leak Prediction Engine', icon: '🔍', roles: ['super-admin', 'engineer'] },
  { id: 'map', label: 'Infrastructure Map', icon: '🗺️', roles: ['super-admin', 'engineer'] },
  { id: 'decision', label: 'Decision Intelligence', icon: '🧠', roles: ['super-admin', 'policy-maker'] },
  { id: 'citizen', label: 'Citizen Portal', icon: '👥', roles: ['super-admin', 'citizen'] },
  { id: 'farmer', label: 'Farmer Mode', icon: '🌾', roles: ['super-admin', 'farmer'] },
  { id: 'insights', label: 'AI Insights Lab', icon: '⚡', roles: ['super-admin', 'engineer', 'policy-maker'] },
  { id: 'analytics', label: 'System Analytics', icon: '📊', roles: ['super-admin', 'policy-maker'] },
  { id: 'settings', label: 'Settings', icon: '⚙️', roles: ['super-admin', 'engineer', 'policy-maker', 'farmer', 'citizen'] },
]

export default function Sidebar({ activeView, onViewChange, theme }: SidebarProps) {
  const { user } = useAuth()
  
  // Filter menu items based on user role
  const menuItems = user 
    ? allMenuItems.filter(item => item.roles.includes(user.role))
    : allMenuItems

  return (
    <aside className={`fixed left-0 top-16 bottom-0 w-64 ${theme === 'dark' ? 'glass-dark border-gray-800' : 'glass-eco border-emerald-200'} border-r p-4 overflow-y-auto`}>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
              activeView === item.id
                ? theme === 'dark'
                  ? 'bg-gradient-to-r from-cyber-blue/20 to-purple-500/20 border border-cyber-blue/50 text-white glow-blue'
                  : 'bg-gradient-to-r from-emerald-400/30 to-teal-400/30 border border-emerald-500 text-emerald-900 font-semibold'
                : theme === 'dark'
                  ? 'hover:bg-white/5 text-gray-400 hover:text-white'
                  : 'hover:bg-emerald-50 text-gray-600 hover:text-emerald-800'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      
      {/* Role Badge */}
      {user && (
        <div className={`mt-6 p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-emerald-50'} border ${theme === 'dark' ? 'border-gray-700' : 'border-emerald-200'}`}>
          <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Access Level</div>
          <div className={`text-sm font-bold ${theme === 'dark' ? 'text-cyan-400' : 'text-emerald-700'}`}>
            {user.role.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </div>
        </div>
      )}
    </aside>
  )
}
