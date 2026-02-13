'use client'

import { useEffect, useState } from 'react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ThemeMode } from '../Dashboard'

interface Props {
  theme: ThemeMode
}

export default function GlobalCommandCenter({ theme }: Props) {
  const [waterAvailability, setWaterAvailability] = useState(78.4)
  const [systemHealth, setSystemHealth] = useState(98.7)
  const [activeAlerts, setActiveAlerts] = useState(3)
  const [pipelineStatus, setPipelineStatus] = useState(94.2)
  const [flowData, setFlowData] = useState<any[]>([])
  const [pressureData, setPressureData] = useState<any[]>([])

  useEffect(() => {
    // Initialize chart data
    const initFlow = Array.from({ length: 20 }, (_, i) => ({
      time: i,
      flow: 450 + Math.random() * 100
    }))
    const initPressure = Array.from({ length: 20 }, (_, i) => ({
      time: i,
      pressure: 65 + Math.random() * 15
    }))
    setFlowData(initFlow)
    setPressureData(initPressure)

    // Update metrics
    const interval = setInterval(() => {
      setWaterAvailability(prev => Math.max(75, Math.min(82, prev + (Math.random() - 0.5) * 2)))
      setSystemHealth(prev => Math.max(96, Math.min(99, prev + (Math.random() - 0.5) * 0.5)))
      setPipelineStatus(prev => Math.max(92, Math.min(96, prev + (Math.random() - 0.5) * 1)))
      
      setFlowData(prev => [...prev.slice(1), { 
        time: prev[prev.length - 1].time + 1, 
        flow: 450 + Math.random() * 100 
      }])
      
      setPressureData(prev => [...prev.slice(1), { 
        time: prev[prev.length - 1].time + 1, 
        pressure: 65 + Math.random() * 15 
      }])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const accentColor = theme === 'dark' ? '#00d4ff' : '#10b981'

  return (
    <div className="space-y-6 pb-16">
      <div>
        <h2 className="text-3xl font-bold mb-2">Global Command Center</h2>
        <p className="text-gray-500">Real-time infrastructure monitoring and control</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-6 hover:scale-105 transition-transform">
          <div className="text-sm text-gray-400 mb-2">Water Availability</div>
          <div className={`text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-cyber-blue' : 'text-eco-green'}`}>
            {waterAvailability.toFixed(1)}%
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${theme === 'dark' ? 'bg-cyber-blue' : 'bg-eco-green'}`}
              style={{ width: `${waterAvailability}%` }}
            />
          </div>
        </div>

        <div className="glass rounded-xl p-6 hover:scale-105 transition-transform">
          <div className="text-sm text-gray-400 mb-2">System Health</div>
          <div className="text-4xl font-bold text-green-500 mb-2">
            {systemHealth.toFixed(1)}%
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${systemHealth}%` }}
            />
          </div>
        </div>

        <div className="glass rounded-xl p-6 hover:scale-105 transition-transform">
          <div className="text-sm text-gray-400 mb-2">Active Alerts</div>
          <div className="text-4xl font-bold text-yellow-500 mb-2">
            {activeAlerts}
          </div>
          <div className="text-xs text-gray-500">2 Medium • 1 Low</div>
        </div>

        <div className="glass rounded-xl p-6 hover:scale-105 transition-transform">
          <div className="text-sm text-gray-400 mb-2">Pipeline Status</div>
          <div className={`text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-purple-400' : 'text-teal-400'}`}>
            {pipelineStatus.toFixed(1)}%
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${theme === 'dark' ? 'bg-purple-400' : 'bg-teal-400'}`}
              style={{ width: `${pipelineStatus}%` }}
            />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Flow Rate (L/min)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={flowData}>
              <defs>
                <linearGradient id="flowGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={accentColor} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={accentColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="time" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
              />
              <Area type="monotone" dataKey="flow" stroke={accentColor} fill="url(#flowGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Pressure Trend (PSI)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={pressureData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="time" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
              />
              <Line type="monotone" dataKey="pressure" stroke={theme === 'dark' ? '#a855f7' : '#14b8a6'} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Risk Levels */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Infrastructure Risk Levels</h3>
        <div className="space-y-4">
          {[
            { zone: 'North District', risk: 23, color: 'green' },
            { zone: 'Central Hub', risk: 58, color: 'yellow' },
            { zone: 'East Pipeline', risk: 82, color: 'red' },
            { zone: 'South Network', risk: 34, color: 'green' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-32 text-sm text-gray-400">{item.zone}</div>
              <div className="flex-1 bg-gray-800 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-3 rounded-full transition-all duration-1000 ${
                    item.color === 'green' ? 'bg-green-500' :
                    item.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${item.risk}%` }}
                />
              </div>
              <div className="w-16 text-right text-sm font-semibold">{item.risk}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
