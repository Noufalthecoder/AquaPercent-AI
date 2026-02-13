'use client'

import { useEffect, useState } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ThemeMode } from '../Dashboard'

interface Props {
  theme: ThemeMode
}

export default function AIInsightsLab({ theme }: Props) {
  const [modelAccuracy, setModelAccuracy] = useState(98.7)
  const [confidence, setConfidence] = useState(94.2)
  const [learningRate, setLearningRate] = useState(0.0023)

  const accuracyData = Array.from({ length: 12 }, (_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    accuracy: 92 + Math.random() * 7
  }))

  const predictionData = Array.from({ length: 7 }, (_, i) => ({
    category: ['Leaks', 'Pressure', 'Flow', 'Quality', 'Demand', 'Failure', 'Anomaly'][i],
    score: 85 + Math.random() * 15
  }))

  useEffect(() => {
    const interval = setInterval(() => {
      setModelAccuracy(prev => Math.max(97, Math.min(99.5, prev + (Math.random() - 0.5) * 0.2)))
      setConfidence(prev => Math.max(92, Math.min(96, prev + (Math.random() - 0.5) * 0.5)))
      setLearningRate(prev => Math.max(0.002, Math.min(0.003, prev + (Math.random() - 0.5) * 0.0001)))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const accentColor = theme === 'dark' ? '#00d4ff' : '#10b981'

  return (
    <div className="space-y-6 pb-16">
      <div>
        <h2 className="text-3xl font-bold mb-2">AI Insights Lab</h2>
        <p className="text-gray-500">Machine learning model performance and analytics</p>
      </div>

      {/* Model Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-6">
          <div className="text-sm text-gray-400 mb-2">Model Accuracy</div>
          <div className={`text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-cyber-blue' : 'text-eco-green'}`}>
            {modelAccuracy.toFixed(1)}%
          </div>
          <div className="text-xs text-green-400">↑ 0.3% from last week</div>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="text-sm text-gray-400 mb-2">Prediction Confidence</div>
          <div className="text-4xl font-bold text-purple-400 mb-2">
            {confidence.toFixed(1)}%
          </div>
          <div className="text-xs text-green-400">↑ 1.2% from last week</div>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="text-sm text-gray-400 mb-2">Learning Rate</div>
          <div className="text-4xl font-bold text-yellow-400 mb-2">
            {learningRate.toFixed(4)}
          </div>
          <div className="text-xs text-gray-500">Adaptive optimization</div>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="text-sm text-gray-400 mb-2">Training Samples</div>
          <div className={`text-4xl font-bold ${theme === 'dark' ? 'text-cyan-400' : 'text-teal-400'}`}>
            2.4M
          </div>
          <div className="text-xs text-green-400">+47K this week</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Model Accuracy Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={accuracyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" domain={[90, 100]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
              />
              <Line type="monotone" dataKey="accuracy" stroke={accentColor} strokeWidth={3} dot={{ fill: accentColor, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Prediction Performance by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={predictionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="category" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
              />
              <Bar dataKey="score" fill={theme === 'dark' ? '#a855f7' : '#14b8a6'} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Data Sources */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Active Data Sources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'IoT Sensors', count: '1,247', status: 'online', color: 'green' },
            { name: 'Weather APIs', count: '12', status: 'online', color: 'green' },
            { name: 'Historical Data', count: '8.2TB', status: 'synced', color: 'blue' },
            { name: 'Satellite Imagery', count: '3', status: 'online', color: 'green' },
          ].map((source, i) => (
            <div key={i} className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-semibold">{source.name}</div>
                <div className={`w-2 h-2 rounded-full ${
                  source.color === 'green' ? 'bg-green-500' : 'bg-blue-500'
                } animate-pulse`}></div>
              </div>
              <div className="text-2xl font-bold mb-1">{source.count}</div>
              <div className="text-xs text-gray-500 capitalize">{source.status}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Model Architecture */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Neural Network Architecture</h3>
        <div className="space-y-4">
          {[
            { layer: 'Input Layer', neurons: 128, activation: 'ReLU' },
            { layer: 'Hidden Layer 1', neurons: 256, activation: 'ReLU' },
            { layer: 'Hidden Layer 2', neurons: 512, activation: 'ReLU' },
            { layer: 'Hidden Layer 3', neurons: 256, activation: 'ReLU' },
            { layer: 'Output Layer', neurons: 64, activation: 'Softmax' },
          ].map((layer, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-40 text-sm font-semibold">{layer.layer}</div>
              <div className="flex-1 bg-gray-800 rounded-full h-4 overflow-hidden">
                <div 
                  className={`h-4 rounded-full ${theme === 'dark' ? 'bg-gradient-to-r from-cyber-blue to-purple-500' : 'bg-gradient-to-r from-eco-green to-teal-500'}`}
                  style={{ width: `${(layer.neurons / 512) * 100}%` }}
                />
              </div>
              <div className="w-24 text-sm text-gray-400">{layer.neurons} neurons</div>
              <div className="w-24 text-sm text-gray-500">{layer.activation}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Discoveries */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Recent AI Discoveries</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <span className="text-2xl">🎯</span>
            <div>
              <div className="font-semibold text-green-400 mb-1">New Pattern Identified</div>
              <div className="text-sm text-gray-400">Correlation between ambient temperature and pipe expansion detected. Accuracy improved by 2.3%.</div>
              <div className="text-xs text-gray-600 mt-2">Discovered 2 hours ago</div>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <span className="text-2xl">📈</span>
            <div>
              <div className="font-semibold text-blue-400 mb-1">Model Optimization</div>
              <div className="text-sm text-gray-400">Hyperparameter tuning completed. Prediction speed increased by 18% with no accuracy loss.</div>
              <div className="text-xs text-gray-600 mt-2">Completed 5 hours ago</div>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
            <span className="text-2xl">🔬</span>
            <div>
              <div className="font-semibold text-purple-400 mb-1">Anomaly Detection Enhancement</div>
              <div className="text-sm text-gray-400">New ensemble method reduces false positives by 34% while maintaining 99.1% true positive rate.</div>
              <div className="text-xs text-gray-600 mt-2">Deployed yesterday</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
