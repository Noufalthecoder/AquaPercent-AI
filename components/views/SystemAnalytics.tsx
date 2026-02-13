'use client'

import { useEffect, useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ThemeMode } from '../Dashboard'

interface Props {
  theme: ThemeMode
}

export default function SystemAnalytics({ theme }: Props) {
  const [leaksPrevented, setLeaksPrevented] = useState(1847)
  const [waterSaved, setWaterSaved] = useState(847293)
  const [responseTime, setResponseTime] = useState(4.2)
  const [efficiency, setEfficiency] = useState(94.7)

  const impactData = Array.from({ length: 12 }, (_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    saved: 650000 + Math.random() * 250000,
    prevented: 1400 + Math.random() * 600
  }))

  useEffect(() => {
    const interval = setInterval(() => {
      setLeaksPrevented(prev => prev + Math.floor(Math.random() * 2))
      setWaterSaved(prev => prev + Math.floor(Math.random() * 500))
      setResponseTime(prev => Math.max(3.5, Math.min(5, prev + (Math.random() - 0.5) * 0.2)))
      setEfficiency(prev => Math.max(92, Math.min(97, prev + (Math.random() - 0.5) * 0.3)))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const accentColor = theme === 'dark' ? '#00d4ff' : '#10b981'

  return (
    <div className="space-y-6 pb-16">
      <div>
        <h2 className="text-3xl font-bold mb-2">System Analytics</h2>
        <p className="text-gray-500">Performance metrics and impact assessment</p>
      </div>

      {/* Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-6 hover:scale-105 transition-transform">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <span className="text-2xl">🛡️</span>
            </div>
            <div className="text-sm text-gray-400">Leaks Prevented</div>
          </div>
          <div className="text-4xl font-bold text-green-500 mb-2">
            {leaksPrevented.toLocaleString()}
          </div>
          <div className="flex items-center gap-2">
            <div className="px-2 py-1 bg-green-500/20 rounded text-xs font-semibold text-green-400">
              ↑ 23% vs last month
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6 hover:scale-105 transition-transform">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-12 h-12 rounded-full ${theme === 'dark' ? 'bg-cyber-blue/20' : 'bg-eco-green/20'} flex items-center justify-center`}>
              <span className="text-2xl">💧</span>
            </div>
            <div className="text-sm text-gray-400">Water Saved</div>
          </div>
          <div className={`text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-cyber-blue' : 'text-eco-green'}`}>
            {(waterSaved / 1000).toFixed(0)}K
          </div>
          <div className="text-xs text-gray-500">Liters this month</div>
        </div>

        <div className="glass rounded-xl p-6 hover:scale-105 transition-transform">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
            <div className="text-sm text-gray-400">Response Time</div>
          </div>
          <div className="text-4xl font-bold text-yellow-400 mb-2">
            {responseTime.toFixed(1)}m
          </div>
          <div className="flex items-center gap-2">
            <div className="px-2 py-1 bg-green-500/20 rounded text-xs font-semibold text-green-400">
              ↓ 18% faster
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6 hover:scale-105 transition-transform">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
            <div className="text-sm text-gray-400">System Efficiency</div>
          </div>
          <div className="text-4xl font-bold text-purple-400 mb-2">
            {efficiency.toFixed(1)}%
          </div>
          <div className="flex items-center gap-2">
            <div className="px-2 py-1 bg-green-500/20 rounded text-xs font-semibold text-green-400">
              ↑ 5.2% improved
            </div>
          </div>
        </div>
      </div>

      {/* Annual Impact Chart */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Annual Water Conservation Impact</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={impactData}>
            <defs>
              <linearGradient id="savedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={accentColor} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={accentColor} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="month" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
              formatter={(value: number) => `${(value / 1000).toFixed(0)}K L`}
            />
            <Area type="monotone" dataKey="saved" stroke={accentColor} fill="url(#savedGradient)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-6 text-center">
          <div className="text-5xl mb-3">🏆</div>
          <div className="text-2xl font-bold mb-2">Gold Tier</div>
          <div className="text-sm text-gray-400">System Performance</div>
        </div>

        <div className="glass rounded-xl p-6 text-center">
          <div className="text-5xl mb-3">⭐</div>
          <div className="text-2xl font-bold mb-2">99.2%</div>
          <div className="text-sm text-gray-400">Uptime This Year</div>
        </div>

        <div className="glass rounded-xl p-6 text-center">
          <div className="text-5xl mb-3">🎯</div>
          <div className="text-2xl font-bold mb-2">98.7%</div>
          <div className="text-sm text-gray-400">Prediction Accuracy</div>
        </div>

        <div className="glass rounded-xl p-6 text-center">
          <div className="text-5xl mb-3">💪</div>
          <div className="text-2xl font-bold mb-2">2.4M</div>
          <div className="text-sm text-gray-400">Data Points Analyzed</div>
        </div>
      </div>

      {/* Cost Savings */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Financial Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-lg p-6">
            <div className="text-sm text-gray-400 mb-2">Water Cost Savings</div>
            <div className="text-3xl font-bold text-green-500 mb-1">$127,450</div>
            <div className="text-xs text-gray-500">This year</div>
          </div>

          <div className="bg-white/5 rounded-lg p-6">
            <div className="text-sm text-gray-400 mb-2">Maintenance Cost Reduction</div>
            <div className="text-3xl font-bold text-green-500 mb-1">$89,320</div>
            <div className="text-xs text-gray-500">Preventive vs reactive</div>
          </div>

          <div className="bg-white/5 rounded-lg p-6">
            <div className="text-sm text-gray-400 mb-2">Total ROI</div>
            <div className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-cyber-blue' : 'text-eco-green'}`}>
              347%
            </div>
            <div className="text-xs text-gray-500">Since deployment</div>
          </div>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Environmental Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <span className="text-3xl">🌍</span>
            <div>
              <div className="font-semibold text-green-400 mb-1">Carbon Footprint Reduced</div>
              <div className="text-2xl font-bold mb-2">47 tons CO₂</div>
              <div className="text-sm text-gray-400">Equivalent to planting 2,150 trees</div>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <span className="text-3xl">💧</span>
            <div>
              <div className="font-semibold text-blue-400 mb-1">Water Bodies Protected</div>
              <div className="text-2xl font-bold mb-2">12 reservoirs</div>
              <div className="text-sm text-gray-400">Sustainable water management achieved</div>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
            <span className="text-3xl">⚡</span>
            <div>
              <div className="font-semibold text-purple-400 mb-1">Energy Saved</div>
              <div className="text-2xl font-bold mb-2">184 MWh</div>
              <div className="text-sm text-gray-400">From reduced pumping requirements</div>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <span className="text-3xl">🏘️</span>
            <div>
              <div className="font-semibold text-yellow-400 mb-1">Communities Served</div>
              <div className="text-2xl font-bold mb-2">847,000</div>
              <div className="text-sm text-gray-400">People with reliable water access</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
