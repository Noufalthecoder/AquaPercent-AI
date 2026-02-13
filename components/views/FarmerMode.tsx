'use client'

import { useEffect, useState } from 'react'
import { ThemeMode } from '../Dashboard'

interface Props {
  theme: ThemeMode
}

export default function FarmerMode({ theme }: Props) {
  const [groundwaterLevel, setGroundwaterLevel] = useState(68.5)
  const [pumpingLimit, setPumpingLimit] = useState(450)
  const [waterStress, setWaterStress] = useState(42)

  useEffect(() => {
    const interval = setInterval(() => {
      setGroundwaterLevel(prev => Math.max(65, Math.min(72, prev + (Math.random() - 0.5) * 0.5)))
      setPumpingLimit(prev => Math.max(400, Math.min(500, prev + (Math.random() - 0.5) * 10)))
      setWaterStress(prev => Math.max(35, Math.min(50, prev + (Math.random() - 0.5) * 2)))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6 pb-16 max-w-5xl">
      <div>
        <h2 className="text-3xl font-bold mb-2">Farmer Mode</h2>
        <p className="text-gray-500">Agricultural water management and irrigation intelligence</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">💧</span>
            <div className="text-sm text-gray-400">Groundwater Level</div>
          </div>
          <div className={`text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-cyber-blue' : 'text-eco-green'}`}>
            {groundwaterLevel.toFixed(1)}m
          </div>
          <div className="text-xs text-gray-500">Below surface</div>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">⚡</span>
            <div className="text-sm text-gray-400">Safe Pumping Limit</div>
          </div>
          <div className="text-4xl font-bold text-green-500 mb-2">
            {pumpingLimit}
          </div>
          <div className="text-xs text-gray-500">Liters/hour</div>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🌡️</span>
            <div className="text-sm text-gray-400">Water Stress Index</div>
          </div>
          <div className={`text-4xl font-bold mb-2 ${
            waterStress < 40 ? 'text-green-500' : 
            waterStress < 60 ? 'text-yellow-500' : 'text-red-500'
          }`}>
            {waterStress.toFixed(0)}%
          </div>
          <div className="text-xs text-gray-500">Moderate stress</div>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🌧️</span>
            <div className="text-sm text-gray-400">Recharge Forecast</div>
          </div>
          <div className={`text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-purple-400' : 'text-teal-400'}`}>
            +12%
          </div>
          <div className="text-xs text-gray-500">Next 30 days</div>
        </div>
      </div>

      {/* Irrigation Recommendations */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span>🌾</span>
          <span>Irrigation Recommendations</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <div className="font-semibold text-green-400 mb-2">Optimal Irrigation Window</div>
                <div className="text-sm text-gray-300 mb-3">Best time: 5:00 AM - 7:00 AM</div>
                <div className="text-sm text-gray-400">Low evaporation, optimal soil absorption. Recommended flow: 380 L/hr</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <div className="font-semibold text-blue-400 mb-2">Water Conservation Mode</div>
                <div className="text-sm text-gray-300 mb-3">Potential savings: 18%</div>
                <div className="text-sm text-gray-400">Switch to drip irrigation for vegetables. Reduce water usage while maintaining yield.</div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <div className="font-semibold text-yellow-400 mb-2">Stress Alert</div>
                <div className="text-sm text-gray-300 mb-3">Moderate water stress detected</div>
                <div className="text-sm text-gray-400">Consider reducing irrigation by 15% for non-critical crops. Prioritize high-value crops.</div>
              </div>
            </div>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📊</span>
              <div>
                <div className="font-semibold text-purple-400 mb-2">Soil Moisture Prediction</div>
                <div className="text-sm text-gray-300 mb-3">Next 7 days: Stable</div>
                <div className="text-sm text-gray-400">Current moisture levels adequate. No immediate irrigation required for established crops.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Crop-Specific Guidance */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Crop-Specific Water Guidance</h3>
        <div className="space-y-3">
          {[
            { crop: 'Wheat', icon: '🌾', status: 'Optimal', water: '85%', color: 'green' },
            { crop: 'Rice', icon: '🌾', status: 'Needs Water', water: '65%', color: 'yellow' },
            { crop: 'Vegetables', icon: '🥬', status: 'Good', water: '78%', color: 'green' },
            { crop: 'Fruits', icon: '🍎', status: 'Monitor', water: '72%', color: 'yellow' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
              <span className="text-3xl">{item.icon}</span>
              <div className="flex-1">
                <div className="font-semibold mb-1">{item.crop}</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-800 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        item.color === 'green' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: item.water }}
                    />
                  </div>
                  <span className="text-sm text-gray-400">{item.water}</span>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                item.color === 'green' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {item.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weather Integration */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">7-Day Weather & Irrigation Forecast</h3>
        <div className="grid grid-cols-7 gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
            <div key={i} className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-xs text-gray-400 mb-2">{day}</div>
              <div className="text-2xl mb-2">{i % 3 === 0 ? '🌧️' : '☀️'}</div>
              <div className="text-xs font-semibold mb-1">
                {i % 3 === 0 ? 'Rain' : 'Clear'}
              </div>
              <div className={`text-xs ${i % 3 === 0 ? 'text-blue-400' : 'text-yellow-400'}`}>
                {i % 3 === 0 ? 'Skip irrigation' : 'Irrigate'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
