'use client'

import { useEffect, useState } from 'react'
import { ThemeMode } from '../Dashboard'

interface LeakData {
  id: string
  pressure: number
  anomaly: number
  risk: number
  prediction: string
  action: string
}

interface Props {
  theme: ThemeMode
}

export default function LeakPrediction({ theme }: Props) {
  const [leaks, setLeaks] = useState<LeakData[]>([
    { id: 'PL-2847', pressure: 68.2, anomaly: 0.87, risk: 92, prediction: '2.4 hours', action: 'Immediate inspection' },
    { id: 'PL-1923', pressure: 71.5, anomaly: 0.64, risk: 78, prediction: '6.1 hours', action: 'Schedule maintenance' },
    { id: 'PL-3456', pressure: 65.8, anomaly: 0.52, risk: 65, prediction: '12.3 hours', action: 'Monitor closely' },
    { id: 'PL-4521', pressure: 69.1, anomaly: 0.41, risk: 54, prediction: '18.7 hours', action: 'Routine check' },
    { id: 'PL-5678', pressure: 67.3, anomaly: 0.38, risk: 48, prediction: '24+ hours', action: 'Normal operation' },
  ])
  const [riskFilter, setRiskFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all')

  useEffect(() => {
    const interval = setInterval(() => {
      setLeaks(prev => prev.map(leak => ({
        ...leak,
        pressure: Math.max(60, Math.min(75, leak.pressure + (Math.random() - 0.5) * 2)),
        anomaly: Math.max(0.3, Math.min(0.9, leak.anomaly + (Math.random() - 0.5) * 0.05)),
        risk: Math.max(40, Math.min(95, leak.risk + (Math.random() - 0.5) * 3)),
      })))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getRiskColor = (risk: number) => {
    if (risk >= 80) return 'bg-red-500'
    if (risk >= 60) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getRiskTextColor = (risk: number) => {
    if (risk >= 80) return 'text-red-500'
    if (risk >= 60) return 'text-yellow-500'
    return 'text-green-500'
  }

  const filteredLeaks = leaks.filter(leak => {
    if (riskFilter === 'all') return true
    if (riskFilter === 'high') return leak.risk >= 80
    if (riskFilter === 'medium') return leak.risk >= 60 && leak.risk < 80
    if (riskFilter === 'low') return leak.risk < 60
    return true
  })

  return (
    <div className="space-y-6 pb-16">
      <div>
        <h2 className={`text-3xl font-bold mb-2 ${theme === 'eco' ? 'text-gray-800' : ''}`}>Leak Prediction Engine</h2>
        <p className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>AI-powered pipeline risk assessment</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`${theme === 'dark' ? 'glass' : 'glass-eco'} rounded-xl p-6`}>
          <div className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Average Risk Level</div>
          <div className={`text-4xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-emerald-600'}`}>
            42%
          </div>
          <div className="mt-4 flex items-center justify-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-green-500/20' : 'bg-emerald-100'}`}>
              <span className="text-2xl">⚠️</span>
            </div>
          </div>
        </div>
        <div className={`${theme === 'dark' ? 'glass' : 'glass-eco'} rounded-xl p-6`}>
          <div className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Critical Pipelines</div>
          <div className={`text-4xl font-bold ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
            1
          </div>
          <div className="mt-4 flex items-center justify-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-red-500/20' : 'bg-red-100'}`}>
              <span className="text-2xl">🔧</span>
            </div>
          </div>
        </div>
        <div className={`${theme === 'dark' ? 'glass' : 'glass-eco'} rounded-xl p-6`}>
          <div className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Monitored Pipelines</div>
          <div className={`text-4xl font-bold ${theme === 'dark' ? 'text-cyan-400' : 'text-teal-600'}`}>
            8
          </div>
          <div className="mt-4 flex items-center justify-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-cyan-500/20' : 'bg-teal-100'}`}>
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Distribution */}
      <div className={`${theme === 'dark' ? 'glass' : 'glass-eco'} rounded-xl p-6`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme === 'eco' ? 'text-gray-800' : ''}`}>System Risk Distribution</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className={`text-sm w-20 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Low Risk</span>
            <div className={`flex-1 h-8 rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
              <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 flex items-center justify-end pr-3" style={{ width: '35%' }}>
                <span className="text-xs font-semibold text-white">35%</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-sm w-20 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Medium</span>
            <div className={`flex-1 h-8 rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
              <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-end pr-3" style={{ width: '45%' }}>
                <span className="text-xs font-semibold text-white">45%</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-sm w-20 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>High Risk</span>
            <div className={`flex-1 h-8 rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
              <div className="h-full bg-gradient-to-r from-red-400 to-red-500 flex items-center justify-end pr-3" style={{ width: '20%' }}>
                <span className="text-xs font-semibold text-white">20%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prediction Table */}
      <div className={`${theme === 'dark' ? 'glass' : 'glass-eco'} rounded-xl overflow-hidden`}>
        <div className={`p-6 ${theme === 'dark' ? 'border-b border-gray-800' : 'border-b border-emerald-200'} flex items-center justify-between`}>
          <h3 className={`text-lg font-semibold ${theme === 'eco' ? 'text-gray-800' : ''}`}>All Risks</h3>
          <div className="flex gap-2">
            <button 
              onClick={() => setRiskFilter('all')}
              className={`px-3 py-1 rounded-lg text-sm transition-all ${
                riskFilter === 'all'
                  ? theme === 'dark' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-500 text-white'
                  : theme === 'dark' ? 'text-gray-400 hover:bg-white/5' : 'text-gray-600 hover:bg-emerald-50'
              }`}
            >
              All Risks
            </button>
            <button 
              onClick={() => setRiskFilter('high')}
              className={`px-3 py-1 rounded-lg text-sm transition-all ${
                riskFilter === 'high'
                  ? theme === 'dark' ? 'bg-red-500/20 text-red-400' : 'bg-red-500 text-white'
                  : theme === 'dark' ? 'text-gray-400 hover:bg-white/5' : 'text-gray-600 hover:bg-emerald-50'
              }`}
            >
              High Risk
            </button>
            <button 
              onClick={() => setRiskFilter('medium')}
              className={`px-3 py-1 rounded-lg text-sm transition-all ${
                riskFilter === 'medium'
                  ? theme === 'dark' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-500 text-white'
                  : theme === 'dark' ? 'text-gray-400 hover:bg-white/5' : 'text-gray-600 hover:bg-emerald-50'
              }`}
            >
              Medium Risk
            </button>
            <button 
              onClick={() => setRiskFilter('low')}
              className={`px-3 py-1 rounded-lg text-sm transition-all ${
                riskFilter === 'low'
                  ? theme === 'dark' ? 'bg-green-500/20 text-green-400' : 'bg-green-500 text-white'
                  : theme === 'dark' ? 'text-gray-400 hover:bg-white/5' : 'text-gray-600 hover:bg-emerald-50'
              }`}
            >
              Low Risk
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={theme === 'dark' ? 'bg-gray-900/50' : 'bg-emerald-50'}>
              <tr>
                <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>Pipeline ID</th>
                <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>Sector</th>
                <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>Pressure Trend</th>
                <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>Risk %</th>
                <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>Prediction Time</th>
                <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>Recommended Action</th>
              </tr>
            </thead>
            <tbody className={`${theme === 'dark' ? 'divide-y divide-gray-800' : 'divide-y divide-emerald-100'}`}>
              {filteredLeaks.map((leak, i) => (
                <tr key={leak.id} className={`${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-emerald-50/50'} transition-colors`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getRiskColor(leak.risk)} animate-pulse`}></div>
                      <span className={`font-mono font-semibold ${theme === 'eco' ? 'text-gray-800' : ''}`}>{leak.id}</span>
                    </div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${theme === 'eco' ? 'text-gray-700' : ''}`}>
                    {i === 0 ? 'Residential Block A' : i === 1 ? 'North District' : i === 2 ? 'East Corridor' : i === 3 ? 'South Zone' : 'West Sector'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-mono">
                    <div className="flex items-center gap-2">
                      <span className={theme === 'eco' ? 'text-gray-700' : ''}>{leak.pressure.toFixed(1)} PSI</span>
                      <span className="text-xs">{i % 2 === 0 ? '📈' : '📉'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className={`w-32 rounded-full h-3 overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
                        <div 
                          className={`h-3 rounded-full transition-all duration-500 ${getRiskColor(leak.risk)}`}
                          style={{ width: `${leak.risk}%` }}
                        />
                      </div>
                      <span className={`text-sm font-bold ${getRiskTextColor(leak.risk)}`}>
                        {leak.risk}%
                      </span>
                    </div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'eco' ? 'text-gray-700' : ''}`}>
                    <div className="flex items-center gap-1">
                      <span>⏱️</span>
                      <span>{leak.prediction}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      leak.risk >= 80 ? 'bg-red-500/20 text-red-400' :
                      leak.risk >= 60 ? 'bg-yellow-500/20 text-yellow-600' :
                      theme === 'dark' ? 'bg-green-500/20 text-green-400' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {leak.action}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
