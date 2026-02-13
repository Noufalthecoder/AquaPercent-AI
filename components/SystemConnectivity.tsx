'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeMode } from './Dashboard'

interface Props {
  theme: ThemeMode
  isOpen: boolean
  onClose: () => void
}

export default function SystemConnectivity({ theme, isOpen, onClose }: Props) {
  const [dataRate, setDataRate] = useState(1247)
  const [signalStrength, setSignalStrength] = useState(94)
  const [uptime, setUptime] = useState(99.8)
  const [packetsPerSec, setPacketsPerSec] = useState(342)
  const [predictionConfidence, setPredictionConfidence] = useState(87.3)
  const [logs, setLogs] = useState<string[]>([
    '[14:23:45] Sensor data synchronized',
    '[14:23:42] Weather API connected',
    '[14:23:38] Prediction model loaded',
    '[14:23:35] System initialized'
  ])

  const sensors = [
    { name: 'Pressure Sensor', rate: '120 Hz', lastUpdate: '0.2s ago' },
    { name: 'Flow Sensor', rate: '60 Hz', lastUpdate: '0.1s ago' },
    { name: 'Soil Moisture Sensor', rate: '30 Hz', lastUpdate: '0.3s ago' },
    { name: 'Leak Detection Module', rate: '240 Hz', lastUpdate: '0.1s ago' }
  ]

  const [apiStatus, setApiStatus] = useState([
    { name: 'Weather API', status: 'connected', responseTime: 45, sync: true },
    { name: 'Map API', status: 'connected', responseTime: 32, sync: true },
    { name: 'Prediction Engine API', status: 'connected', responseTime: 78, sync: true },
    { name: 'Notification API', status: 'connected', responseTime: 23, sync: true }
  ])

  useEffect(() => {
    if (!isOpen) return

    const interval = setInterval(() => {
      setDataRate(prev => prev + Math.floor(Math.random() * 20) - 10)
      setSignalStrength(prev => Math.max(85, Math.min(100, prev + (Math.random() - 0.5) * 2)))
      setUptime(prev => Math.min(100, prev + 0.001))
      setPacketsPerSec(prev => prev + Math.floor(Math.random() * 40) - 20)
      setPredictionConfidence(prev => Math.max(80, Math.min(95, prev + (Math.random() - 0.5) * 2)))

      // Update API response times
      setApiStatus(prev => prev.map(api => ({
        ...api,
        responseTime: Math.max(10, api.responseTime + Math.floor(Math.random() * 20) - 10)
      })))

      // Add new log occasionally
      if (Math.random() > 0.7) {
        const time = new Date().toLocaleTimeString('en-US', { hour12: false })
        const messages = [
          'Data packet received',
          'Sensor calibration complete',
          'AI model prediction updated',
          'System health check passed',
          'Cache synchronized',
          'Anomaly detection scan complete'
        ]
        const newLog = `[${time}] ${messages[Math.floor(Math.random() * messages.length)]}`
        setLogs(prev => [newLog, ...prev.slice(0, 9)])
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className={`w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl border ${
            theme === 'dark' 
              ? 'glass-dark border-cyan-500/30' 
              : 'glass-eco border-emerald-500/30'
          } p-8 relative`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-400 flex items-center justify-center transition-colors"
          >
            ✕
          </button>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                System Data & Connectivity Monitor
              </h2>
            </div>
            <p className="text-gray-500 text-sm">Real-time infrastructure monitoring console</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SECTION 1 - SENSOR STATUS */}
            <div className={`rounded-xl p-6 border ${
              theme === 'dark' 
                ? 'bg-gray-900/50 border-cyan-500/20' 
                : 'bg-white/50 border-emerald-500/20'
            }`}>
              <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${
                theme === 'dark' ? 'text-cyan-400' : 'text-emerald-600'
              }`}>
                <span className="text-2xl">📡</span>
                Sensor Status
              </h3>
              <div className="space-y-3">
                {sensors.map((sensor, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-3 rounded-lg ${
                      theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className={`font-semibold text-sm ${
                          theme === 'dark' ? 'text-white' : 'text-gray-800'
                        }`}>
                          {sensor.name}
                        </span>
                      </div>
                      <span className="text-xs text-green-400 font-mono">ACTIVE</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Rate: {sensor.rate}</span>
                      <span>Updated: {sensor.lastUpdate}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* SECTION 2 - API STATUS */}
            <div className={`rounded-xl p-6 border ${
              theme === 'dark' 
                ? 'bg-gray-900/50 border-cyan-500/20' 
                : 'bg-white/50 border-emerald-500/20'
            }`}>
              <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${
                theme === 'dark' ? 'text-cyan-400' : 'text-emerald-600'
              }`}>
                <span className="text-2xl">🔌</span>
                API Status
              </h3>
              <div className="space-y-3">
                {apiStatus.map((api, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-3 rounded-lg ${
                      theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className={`font-semibold text-sm ${
                          theme === 'dark' ? 'text-white' : 'text-gray-800'
                        }`}>
                          {api.name}
                        </span>
                      </div>
                      {api.sync && (
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          className="text-xs"
                        >
                          🔄
                        </motion.span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="text-green-400 uppercase font-mono">{api.status}</span>
                      <span>{api.responseTime}ms</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* SECTION 3 - DATA TRANSMISSION */}
            <div className={`rounded-xl p-6 border ${
              theme === 'dark' 
                ? 'bg-gray-900/50 border-cyan-500/20' 
                : 'bg-white/50 border-emerald-500/20'
            }`}>
              <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${
                theme === 'dark' ? 'text-cyan-400' : 'text-emerald-600'
              }`}>
                <span className="text-2xl">📊</span>
                Data Transmission
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Packets/Second</span>
                    <motion.span
                      key={packetsPerSec}
                      initial={{ scale: 1.2, color: '#06b6d4' }}
                      animate={{ scale: 1, color: theme === 'dark' ? '#fff' : '#000' }}
                      className="text-xl font-bold font-mono"
                    >
                      {packetsPerSec}
                    </motion.span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      animate={{ width: `${(packetsPerSec / 500) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Signal Strength</span>
                    <motion.span
                      key={signalStrength.toFixed(1)}
                      initial={{ scale: 1.2, color: '#10b981' }}
                      animate={{ scale: 1, color: theme === 'dark' ? '#fff' : '#000' }}
                      className="text-xl font-bold font-mono"
                    >
                      {signalStrength.toFixed(1)}%
                    </motion.span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                      animate={{ width: `${signalStrength}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">System Uptime</span>
                    <motion.span
                      key={uptime.toFixed(2)}
                      initial={{ scale: 1.2, color: '#a855f7' }}
                      animate={{ scale: 1, color: theme === 'dark' ? '#fff' : '#000' }}
                      className="text-xl font-bold font-mono"
                    >
                      {uptime.toFixed(2)}%
                    </motion.span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      animate={{ width: `${uptime}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-700">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Last Sync</span>
                    <span className="text-green-400 font-mono">Just now</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 4 - AI PROCESSING STATUS */}
            <div className={`rounded-xl p-6 border ${
              theme === 'dark' 
                ? 'bg-gray-900/50 border-cyan-500/20' 
                : 'bg-white/50 border-emerald-500/20'
            }`}>
              <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${
                theme === 'dark' ? 'text-cyan-400' : 'text-emerald-600'
              }`}>
                <span className="text-2xl">🤖</span>
                AI Processing Status
              </h3>
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-green-500/10 border border-green-500/30' : 'bg-green-50 border border-green-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-green-400">Model Status</span>
                    <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-mono">LOADED</span>
                  </div>
                  <div className="text-xs text-gray-500">Neural network initialized and ready</div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Prediction Confidence</span>
                    <motion.span
                      key={predictionConfidence.toFixed(1)}
                      initial={{ scale: 1.2, color: '#f59e0b' }}
                      animate={{ scale: 1, color: theme === 'dark' ? '#fff' : '#000' }}
                      className="text-xl font-bold font-mono"
                    >
                      {predictionConfidence.toFixed(1)}%
                    </motion.span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
                      animate={{ width: `${predictionConfidence}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-blue-400">Anomaly Detection</span>
                    <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full font-mono">ACTIVE</span>
                  </div>
                  <div className="text-xs text-gray-500">Continuous monitoring enabled</div>
                </div>

                <div className={`p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-purple-500/10 border border-purple-500/30' : 'bg-purple-50 border border-purple-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-purple-400">Data Processing</span>
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-xs bg-purple-500 text-white px-2 py-1 rounded-full font-mono"
                    >
                      RUNNING
                    </motion.span>
                  </div>
                  <div className="text-xs text-gray-500">{dataRate} records/min processed</div>
                </div>
              </div>
            </div>
          </div>

          {/* System Logs */}
          <div className={`mt-6 rounded-xl p-6 border ${
            theme === 'dark' 
              ? 'bg-gray-900/50 border-cyan-500/20' 
              : 'bg-white/50 border-emerald-500/20'
          }`}>
            <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${
              theme === 'dark' ? 'text-cyan-400' : 'text-emerald-600'
            }`}>
              <span className="text-2xl">📋</span>
              System Logs
            </h3>
            <div className={`rounded-lg p-4 font-mono text-xs space-y-1 max-h-40 overflow-y-auto ${
              theme === 'dark' ? 'bg-black/50' : 'bg-gray-100'
            }`}>
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-green-400"
                >
                  {log}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
