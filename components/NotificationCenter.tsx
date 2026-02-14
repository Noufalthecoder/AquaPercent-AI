'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNotifications, Notification } from '@/contexts/NotificationContext'
import { useLanguage } from '@/contexts/LanguageContext'
import NotificationDetail from './NotificationDetail'
import { ThemeMode } from './Dashboard'

interface Props {
  theme: ThemeMode
  isOpen: boolean
  onClose: () => void
}

export default function NotificationCenter({ theme, isOpen, onClose }: Props) {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotification, clearAll } = useNotifications()
  const { t } = useLanguage()
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return '✓'
      case 'error': return '✕'
      case 'warning': return '⚠'
      case 'alert': return '🔔'
      default: return 'ℹ'
    }
  }

  const getColors = (type: string) => {
    switch (type) {
      case 'success': return 'from-green-500 to-emerald-500'
      case 'error': return 'from-red-500 to-rose-500'
      case 'warning': return 'from-yellow-500 to-orange-500'
      case 'alert': return 'from-purple-500 to-pink-500'
      default: return 'from-blue-500 to-cyan-500'
    }
  }

  const formatTime = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className={`fixed right-0 top-0 bottom-0 w-full max-w-md ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          } shadow-2xl overflow-hidden flex flex-col`}
        >
          {/* Header */}
          <div className={`p-6 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {t('notifications')}
                </h2>
                {unreadCount > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    {unreadCount} {unreadCount === 1 ? t('unread.notification') : t('unread.notifications')}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className={`w-10 h-10 rounded-full ${
                  theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                } flex items-center justify-center transition-colors`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                  filter === 'all'
                    ? theme === 'dark'
                      ? 'bg-cyan-500 text-white'
                      : 'bg-emerald-500 text-white'
                    : theme === 'dark'
                      ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t('all')} ({notifications.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                  filter === 'unread'
                    ? theme === 'dark'
                      ? 'bg-cyan-500 text-white'
                      : 'bg-emerald-500 text-white'
                    : theme === 'dark'
                      ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t('unread')} ({unreadCount})
              </button>
            </div>

            {/* Actions */}
            {notifications.length > 0 && (
              <div className="flex gap-2 mt-4">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                  >
                    {t('mark.all.read')}
                  </button>
                )}
                <button
                  onClick={clearAll}
                  className="text-xs text-red-400 hover:text-red-300 font-semibold ml-auto"
                >
                  {t('clear.all')}
                </button>
              </div>
            )}
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm">
                  {filter === 'unread' ? t('no.unread') : t('no.notifications')}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-800">
                {filteredNotifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className={`p-4 hover:bg-gray-800/50 transition-colors cursor-pointer ${
                      !notification.read ? 'bg-cyan-500/5' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getColors(notification.type)} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className={`font-semibold text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0 mt-1"></div>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">
                            {formatTime(notification.timestamp)}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedNotification(notification)
                              }}
                              className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
                            >
                              {t('details')}
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                clearNotification(notification.id)
                              }}
                              className="text-xs text-gray-600 hover:text-red-400 transition-colors"
                            >
                              {t('dismiss')}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Notification Detail Modal */}
      {selectedNotification && (
        <NotificationDetail
          notification={selectedNotification}
          onClose={() => setSelectedNotification(null)}
        />
      )}
    </AnimatePresence>
  )
}
