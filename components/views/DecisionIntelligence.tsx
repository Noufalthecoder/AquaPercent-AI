'use client'

import { useEffect, useState } from 'react'
import { ThemeMode } from '../Dashboard'

interface Alert {
  id: string
  problem: string
  severity: 'critical' | 'high' | 'medium'
  action: string
  urgency: number
}

interface Props {
  theme: ThemeMode
}

export default function DecisionIntelligence({ theme }: Props) {
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: 'A-001', problem: 'Pressure spike detected in North District', severity: 'critical', action: 'Deploy emergency team to PL-2847', urgency: 180 },
    { id: 'A-002', problem: 'Anomalous flow pattern in Central Hub', severity: 'high', action: 'Initiate remote diagnostics', urgency: 420 },
    { id: 'A-003', problem: 'Predicted leak in East Pipeline', severity: 'high', action: 'Schedule preventive maintenance', urgency: 600 },
    { id: 'A-004', problem: 'Water quality variance detected', severity: 'medium', action: 'Increase monitoring frequency', urgency: 900 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setAlerts(prev => prev.map(alert => ({
        ...alert,
        urgency: Math.max(0, alert.urgency - 1)
      })))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-500 bg-red-500/10'
      case 'high': return 'border-yellow-500 bg-yellow-500/10'
      case 'medium': return 'border-blue-500 bg-blue-500/10'
      default: return 'border-gray-500 bg-gray-500/10'
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-6 pb-16">
      <div>
        <h2 className="text-3xl font-bold mb-2">Decision Intelligence</h2>
        <p className="text-gray-500">AI-powered recommendations and automated decision support</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-6">
          <div className="text-sm text-gray-400 mb-2">Active Alerts</div>
          <div className="text-4xl font-bold text-red-500">{alerts.length}</div>
        </div>
        <div className="glass rounded-xl p-6">
          <div className="text-sm text-gray-400 mb-2">Critical Issues</div>
          <div className="text-4xl font-bold text-red-500">
            {alerts.filter(a => a.severity === 'critical').length}
          </div>
        </div>
        <div className="glass rounded-xl p-6">
          <div className="text-sm text-gray-400 mb-2">Avg Response Time</div>
          <div className={`text-4xl font-bold ${theme === 'dark' ? 'text-cyber-blue' : 'text-eco-green'}`}>
            4.2m
          </div>
        </div>
        <div className="glass rounded-xl p-6">
          <div className="text-sm text-gray-400 mb-2">Actions Taken</div>
          <div className={`text-4xl font-bold ${theme === 'dark' ? 'text-purple-400' : 'text-teal-400'}`}>
            127
          </div>
        </div>
      </div>

      {/* Alert Cards */}
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div 
            key={alert.id}
            className={`glass rounded-xl p-6 border-2 ${getSeverityColor(alert.severity)} ${
              alert.severity === 'critical' ? 'animate-pulse-slow' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-sm text-gray-400">{alert.id}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    alert.severity === 'critical' ? 'bg-red-500 text-white' :
                    alert.severity === 'high' ? 'bg-yellow-500 text-black' :
                    'bg-blue-500 text-white'
                  }`}>
                    {alert.severity}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{alert.problem}</h3>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">Recommended Action:</span>
                  <span className="font-semibold">{alert.action}</span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-gray-400 mb-1">Time Remaining</div>
                <div className={`text-3xl font-mono font-bold ${
                  alert.urgency < 300 ? 'text-red-500' :
                  alert.urgency < 600 ? 'text-yellow-500' :
                  'text-green-500'
                }`}>
                  {formatTime(alert.urgency)}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                theme === 'dark' 
                  ? 'bg-cyber-blue text-black hover:bg-cyan-400' 
                  : 'bg-eco-green text-white hover:bg-emerald-600'
              }`}>
                Execute Action
              </button>
              <button className="px-6 py-3 rounded-lg font-semibold bg-gray-800 hover:bg-gray-700 transition-all">
                Dismiss
              </button>
              <button className="px-6 py-3 rounded-lg font-semibold bg-gray-800 hover:bg-gray-700 transition-all">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* AI Insights */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">AI-Generated Insights</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
            <span className="text-2xl">💡</span>
            <div>
              <div className="font-semibold mb-1">Pattern Detected</div>
              <div className="text-sm text-gray-400">Pressure anomalies correlate with temperature changes. Consider thermal expansion compensation.</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
            <span className="text-2xl">📊</span>
            <div>
              <div className="font-semibold mb-1">Efficiency Opportunity</div>
              <div className="text-sm text-gray-400">Optimizing valve timing in Central Hub could reduce water loss by 12%.</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
            <span className="text-2xl">⚠️</span>
            <div>
              <div className="font-semibold mb-1">Maintenance Prediction</div>
              <div className="text-sm text-gray-400">Pipeline PL-3456 shows early signs of degradation. Recommend inspection within 30 days.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
