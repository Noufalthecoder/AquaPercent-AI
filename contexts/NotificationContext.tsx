'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'alert'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: number
  read: boolean
  action?: {
    label: string
    onClick: () => void
  }
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearNotification: (id: string) => void
  clearAll: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [toasts, setToasts] = useState<Notification[]>([])

  // Simulate real-time notifications
  useEffect(() => {
    const notificationTypes = [
      { type: 'info' as NotificationType, title: 'System Update', message: 'Sensor data synchronized successfully' },
      { type: 'success' as NotificationType, title: 'Leak Prevented', message: 'AI detected and prevented potential leak in Zone B' },
      { type: 'warning' as NotificationType, title: 'High Water Usage', message: 'Water consumption 15% above normal in District 3' },
      { type: 'alert' as NotificationType, title: 'Pressure Alert', message: 'Pipeline pressure dropping in Sector 7' },
      { type: 'info' as NotificationType, title: 'Weather Update', message: 'Heavy rainfall expected in next 6 hours' },
      { type: 'success' as NotificationType, title: 'Optimization Complete', message: 'Water distribution optimized, saving 12% resources' },
    ]

    const interval = setInterval(() => {
      // Random notification every 15-30 seconds
      if (Math.random() > 0.5) {
        const randomNotif = notificationTypes[Math.floor(Math.random() * notificationTypes.length)]
        addNotification(randomNotif)
      }
    }, 20000) // Every 20 seconds

    // Initial notifications
    setTimeout(() => {
      addNotification({
        type: 'success',
        title: 'System Online',
        message: 'All systems operational. Welcome back!'
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
      read: false
    }

    setNotifications(prev => [newNotification, ...prev])
    
    // Add to toast queue
    setToasts(prev => [...prev, newNotification])

    // Auto-remove toast after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== newNotification.id))
    }, 5000)

    // Play sound for critical alerts
    if (notification.type === 'error' || notification.type === 'alert') {
      playNotificationSound()
    }
  }

  const playNotificationSound = () => {
    // In production, you'd play an actual sound file
    // For now, we'll use the browser's beep (if enabled in settings)
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.value = 800
        oscillator.type = 'sine'
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
        
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.5)
      } catch (error) {
        // Silent fail if audio not supported
      }
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
    setToasts([])
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotification,
        clearAll
      }}
    >
      {children}
      <ToastContainer toasts={toasts} onClose={clearNotification} />
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

// Toast Container Component
function ToastContainer({ toasts, onClose }: { toasts: Notification[], onClose: (id: string) => void }) {
  return (
    <div className="fixed top-20 right-6 z-[100] space-y-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            className="pointer-events-auto"
          >
            <Toast notification={toast} onClose={() => onClose(toast.id)} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// Individual Toast Component
function Toast({ notification, onClose }: { notification: Notification, onClose: () => void }) {
  const getIcon = () => {
    switch (notification.type) {
      case 'success': return '✓'
      case 'error': return '✕'
      case 'warning': return '⚠'
      case 'alert': return '🔔'
      default: return 'ℹ'
    }
  }

  const getColors = () => {
    switch (notification.type) {
      case 'success': return 'from-green-500 to-emerald-500 border-green-500/50'
      case 'error': return 'from-red-500 to-rose-500 border-red-500/50'
      case 'warning': return 'from-yellow-500 to-orange-500 border-yellow-500/50'
      case 'alert': return 'from-purple-500 to-pink-500 border-purple-500/50'
      default: return 'from-blue-500 to-cyan-500 border-blue-500/50'
    }
  }

  return (
    <div className="glass-dark rounded-xl border p-4 shadow-2xl max-w-sm backdrop-blur-xl">
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getColors()} flex items-center justify-center text-white font-bold flex-shrink-0`}>
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="font-semibold text-white text-sm">{notification.title}</h4>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">{notification.message}</p>
          {notification.action && (
            <button
              onClick={notification.action.onClick}
              className="mt-2 text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              {notification.action.label} →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
