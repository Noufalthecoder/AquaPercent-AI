'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import GlobalCommandCenter from './views/GlobalCommandCenter'
import LeakPrediction from './views/LeakPrediction'
import InfrastructureMap from './views/InfrastructureMap'
import DecisionIntelligence from './views/DecisionIntelligence'
import CitizenPortal from './views/CitizenPortal'
import FarmerMode from './views/FarmerMode'
import AIInsightsLab from './views/AIInsightsLab'
import SystemAnalytics from './views/SystemAnalytics'
import Settings from './views/Settings'
import SystemConnectivity from './SystemConnectivity'
import NotificationCenter from './NotificationCenter'

export type ThemeMode = 'dark' | 'eco'

export default function Dashboard() {
  const [activeView, setActiveView] = useState('command')
  const [theme, setTheme] = useState<ThemeMode>('dark')
  const [showConnectivity, setShowConnectivity] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  // Scroll to top when view changes
  const handleViewChange = (view: string) => {
    setActiveView(view)
    // Scroll main content to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderView = () => {
    switch (activeView) {
      case 'command': return <GlobalCommandCenter theme={theme} />
      case 'leak': return <LeakPrediction theme={theme} />
      case 'map': return <InfrastructureMap theme={theme} />
      case 'decision': return <DecisionIntelligence theme={theme} />
      case 'citizen': return <CitizenPortal theme={theme} />
      case 'farmer': return <FarmerMode theme={theme} />
      case 'insights': return <AIInsightsLab theme={theme} />
      case 'analytics': return <SystemAnalytics theme={theme} />
      case 'settings': return <Settings theme={theme} />
      default: return <GlobalCommandCenter theme={theme} />
    }
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 text-gray-800'} transition-colors duration-500`}>
      <Header 
        theme={theme} 
        onThemeToggle={() => setTheme(theme === 'dark' ? 'eco' : 'dark')}
        onConnectivityOpen={() => setShowConnectivity(true)}
        onNotificationOpen={() => setShowNotifications(true)}
      />
      <div className="flex">
        <Sidebar activeView={activeView} onViewChange={handleViewChange} theme={theme} />
        <main className="flex-1 p-6 ml-64 mt-16">
          {renderView()}
        </main>
      </div>
      
      <SystemConnectivity 
        theme={theme} 
        isOpen={showConnectivity} 
        onClose={() => setShowConnectivity(false)} 
      />

      <NotificationCenter
        theme={theme}
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
      
      {/* Footer */}
      <footer className={`fixed bottom-0 left-64 right-0 ${theme === 'dark' ? 'glass-dark border-gray-800 text-gray-500' : 'glass-eco border-emerald-200 text-gray-600'} border-t px-6 py-3 text-xs flex justify-between items-center`}>
        <div>AquaPercent AI Infrastructure Platform • Version 1.0</div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>System Online</span>
        </div>
      </footer>
    </div>
  )
}
