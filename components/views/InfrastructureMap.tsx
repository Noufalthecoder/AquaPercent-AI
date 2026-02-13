'use client'

import { useState, useEffect } from 'react'
import { ThemeMode } from '../Dashboard'

interface Node {
  id: string
  x: number
  y: number
  type: 'source' | 'junction' | 'consumer' | 'alert'
  icon: string
  label: string
  capacity?: number
  lastMaintenance?: string
}

interface Pipeline {
  id: string
  from: string
  to: string
  status: 'healthy' | 'warning' | 'critical'
  risk: number
  flowSpeed: number
}

interface Props {
  theme: ThemeMode
}

export default function InfrastructureMap({ theme }: Props) {
  const [hoveredPipeline, setHoveredPipeline] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)

  const nodes: Node[] = [
    { id: 'N1', x: 150, y: 180, type: 'source', icon: '🏭', label: 'North Treatment Plant', capacity: 87, lastMaintenance: '3d ago' },
    { id: 'N2', x: 300, y: 120, type: 'junction', icon: '⚡', label: 'Central Junction', capacity: 92, lastMaintenance: '1w ago' },
    { id: 'N3', x: 450, y: 200, type: 'alert', icon: '⚠️', label: 'East Alert Station', capacity: 45, lastMaintenance: '2d ago' },
    { id: 'N4', x: 250, y: 280, type: 'junction', icon: '⚡', label: 'South Junction', capacity: 78, lastMaintenance: '5d ago' },
    { id: 'N5', x: 600, y: 280, type: 'consumer', icon: '🏢', label: 'Industrial District', capacity: 95, lastMaintenance: '1d ago' },
    { id: 'N6', x: 450, y: 380, type: 'source', icon: '💧', label: 'Main Reservoir', capacity: 88, lastMaintenance: '4d ago' },
  ]

  const pipelines: Pipeline[] = [
    { id: 'P1', from: 'N1', to: 'N2', status: 'healthy', risk: 25, flowSpeed: 2 },
    { id: 'P2', from: 'N2', to: 'N3', status: 'warning', risk: 65, flowSpeed: 1.5 },
    { id: 'P3', from: 'N3', to: 'N5', status: 'critical', risk: 92, flowSpeed: 0.8 },
    { id: 'P4', from: 'N1', to: 'N4', status: 'warning', risk: 55, flowSpeed: 1.8 },
    { id: 'P5', from: 'N4', to: 'N6', status: 'healthy', risk: 30, flowSpeed: 2.2 },
    { id: 'P6', from: 'N6', to: 'N5', status: 'warning', risk: 70, flowSpeed: 1.3 },
  ]

  const getNode = (id: string) => nodes.find(n => n.id === id)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return theme === 'dark' ? '#ef4444' : '#dc2626'
      case 'warning': return theme === 'dark' ? '#eab308' : '#ca8a04'
      case 'healthy': return theme === 'dark' ? '#10b981' : '#059669'
      default: return '#6b7280'
    }
  }

  const getPipelineInfo = (id: string) => pipelines.find(p => p.id === id)

  const healthyCount = pipelines.filter(p => p.status === 'healthy').length
  const warningCount = pipelines.filter(p => p.status === 'warning').length
  const criticalCount = pipelines.filter(p => p.status === 'critical').length

  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-3xl font-bold mb-2 ${theme === 'eco' ? 'text-gray-800' : ''}`}>Infrastructure Health Map</h2>
          <p className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>Interactive pipeline monitoring system</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full bg-green-500`}></div>
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Healthy ({healthyCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full bg-yellow-500`}></div>
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Warning ({warningCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full bg-red-500`}></div>
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Critical ({criticalCount})</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Visualization */}
        <div className={`lg:col-span-2 ${theme === 'dark' ? 'glass' : 'glass-eco'} rounded-xl p-6 relative overflow-hidden`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold flex items-center gap-2 ${theme === 'eco' ? 'text-gray-800' : ''}`}>
              <span>🗺️</span>
              Pipeline Network
            </h3>
            <div className="flex gap-2">
              <button className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-emerald-50'}`}>🔍</button>
              <button className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-emerald-50'}`}>100%</button>
              <button className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-emerald-50'}`}>🔍</button>
              <button className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-emerald-50'}`}>⛶</button>
            </div>
          </div>

          <div className={`rounded-xl overflow-hidden ${theme === 'dark' ? 'bg-gray-900/30' : 'bg-gradient-to-br from-emerald-50/50 to-teal-50/50'}`}>
          <svg width="100%" height="500" viewBox="0 0 800 500" className="w-full">
            <defs>
              {/* Animated gradient for water flow */}
              <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
                <stop offset="100%" stopColor="transparent" />
                <animate attributeName="x1" values="-100%;100%" dur="2s" repeatCount="indefinite" />
                <animate attributeName="x2" values="0%;200%" dur="2s" repeatCount="indefinite" />
              </linearGradient>

              {/* Glow filter */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              {/* Animated dash for flow */}
              {pipelines.map(pipeline => (
                <linearGradient key={`grad-${pipeline.id}`} id={`gradient-${pipeline.id}`} gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor={getStatusColor(pipeline.status)} stopOpacity="0.3" />
                  <stop offset="50%" stopColor={getStatusColor(pipeline.status)} stopOpacity="1" />
                  <stop offset="100%" stopColor={getStatusColor(pipeline.status)} stopOpacity="0.3" />
                  <animate attributeName="x1" values="0%;100%" dur={`${3 / pipeline.flowSpeed}s`} repeatCount="indefinite" />
                  <animate attributeName="x2" values="100%;200%" dur={`${3 / pipeline.flowSpeed}s`} repeatCount="indefinite" />
                </linearGradient>
              ))}
            </defs>

            {/* Grid Background */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(16,185,129,0.1)'} strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Pipelines with animated flow */}
            {pipelines.map((pipeline) => {
              const fromNode = getNode(pipeline.from)
              const toNode = getNode(pipeline.to)
              if (!fromNode || !toNode) return null

              return (
                <g key={pipeline.id}>
                  {/* Base pipeline */}
                  <line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke={getStatusColor(pipeline.status)}
                    strokeWidth={hoveredPipeline === pipeline.id ? "10" : "6"}
                    strokeLinecap="round"
                    opacity="0.4"
                    className="transition-all cursor-pointer"
                    onMouseEnter={() => setHoveredPipeline(pipeline.id)}
                    onMouseLeave={() => setHoveredPipeline(null)}
                  />
                  
                  {/* Animated flow line */}
                  <line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke={getStatusColor(pipeline.status)}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="20 20"
                    className="cursor-pointer"
                    filter="url(#glow)"
                    onMouseEnter={() => setHoveredPipeline(pipeline.id)}
                    onMouseLeave={() => setHoveredPipeline(null)}
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="40"
                      to="0"
                      dur={`${2 / pipeline.flowSpeed}s`}
                      repeatCount="indefinite"
                    />
                  </line>

                  {/* Flow particles */}
                  <circle r="4" fill={getStatusColor(pipeline.status)} filter="url(#glow)">
                    <animateMotion
                      dur={`${3 / pipeline.flowSpeed}s`}
                      repeatCount="indefinite"
                      path={`M ${fromNode.x} ${fromNode.y} L ${toNode.x} ${toNode.y}`}
                    />
                  </circle>
                </g>
              )
            })}

            {/* Nodes */}
            {nodes.map((node) => (
              <g 
                key={node.id}
                className="cursor-pointer"
                onClick={() => setSelectedNode(node)}
              >
                {/* Node glow */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="25"
                  fill={
                    node.type === 'alert' ? 'rgba(239, 68, 68, 0.2)' :
                    node.type === 'source' ? theme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.3)' :
                    theme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(20, 184, 166, 0.3)'
                  }
                  className="animate-pulse"
                />
                
                {/* Node background */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="20"
                  fill={theme === 'dark' ? '#1f2937' : 'white'}
                  stroke={
                    node.type === 'alert' ? '#ef4444' :
                    node.type === 'source' ? '#10b981' :
                    theme === 'dark' ? '#3b82f6' : '#14b8a6'
                  }
                  strokeWidth="3"
                  filter="url(#glow)"
                  className="transition-all hover:r-24"
                />
                
                {/* Icon */}
                <text
                  x={node.x}
                  y={node.y + 6}
                  textAnchor="middle"
                  fontSize="20"
                >
                  {node.icon}
                </text>
              </g>
            ))}
          </svg>

          {/* Pipeline Hover Tooltip */}
          {hoveredPipeline && (
            <div className={`absolute top-20 right-6 ${theme === 'dark' ? 'glass-dark' : 'glass-eco'} rounded-xl p-4 border ${theme === 'dark' ? 'border-gray-700' : 'border-emerald-200'} min-w-56 shadow-xl z-10`}>
              <div className="flex items-center gap-2 mb-3">
                <div 
                  className="w-3 h-3 rounded-full animate-pulse" 
                  style={{ backgroundColor: getStatusColor(getPipelineInfo(hoveredPipeline)?.status || 'healthy') }}
                ></div>
                <span className={`font-mono font-bold ${theme === 'eco' ? 'text-gray-800' : ''}`}>{hoveredPipeline}</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Status:</span>
                  <span className={`font-semibold capitalize ${theme === 'eco' ? 'text-gray-800' : ''}`}>
                    {getPipelineInfo(hoveredPipeline)?.status}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Risk Level:</span>
                  <span className={`font-semibold ${theme === 'eco' ? 'text-gray-800' : ''}`}>
                    {getPipelineInfo(hoveredPipeline)?.risk}%
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Flow Rate:</span>
                  <span className={`font-semibold ${theme === 'eco' ? 'text-gray-800' : ''}`}>
                    {getPipelineInfo(hoveredPipeline)?.flowSpeed.toFixed(1)}x
                  </span>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>

        {/* Station Details Panel */}
        <div className="space-y-6">
          <div className={`${theme === 'dark' ? 'glass' : 'glass-eco'} rounded-xl p-6`}>
            <h3 className={`text-lg font-semibold mb-4 ${theme === 'eco' ? 'text-gray-800' : ''}`}>Station Details</h3>
            
            {selectedNode ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-700">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    selectedNode.type === 'alert' ? 'bg-red-500/20' :
                    selectedNode.type === 'source' ? theme === 'dark' ? 'bg-emerald-500/20' : 'bg-emerald-100' :
                    theme === 'dark' ? 'bg-blue-500/20' : 'bg-teal-100'
                  }`}>
                    <span className="text-2xl">{selectedNode.icon}</span>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${theme === 'eco' ? 'text-gray-800' : ''}`}>{selectedNode.label}</h4>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} capitalize`}>{selectedNode.type}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Status</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        selectedNode.type === 'alert' ? 'bg-red-500' : 'bg-green-500'
                      } animate-pulse`}></div>
                      <span className={`text-sm font-semibold ${theme === 'eco' ? 'text-gray-800' : ''}`}>
                        {selectedNode.type === 'alert' ? 'Alert' : 'Active'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Capacity</span>
                    <span className={`text-sm font-semibold ${theme === 'eco' ? 'text-gray-800' : ''}`}>{selectedNode.capacity}%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Last Maintenance</span>
                    <span className={`text-sm font-semibold ${theme === 'eco' ? 'text-gray-800' : ''}`}>{selectedNode.lastMaintenance}</span>
                  </div>
                </div>

                <div className={`mt-4 p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-emerald-50'}`}>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Connected Pipelines</div>
                  <div className={`text-lg font-bold ${theme === 'eco' ? 'text-emerald-700' : 'text-emerald-400'}`}>
                    {selectedNode ? pipelines.filter(p => p.from === selectedNode.id || p.to === selectedNode.id).length : 0}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className={`text-4xl mb-3 ${theme === 'eco' ? 'opacity-40' : 'opacity-20'}`}>📍</div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>Select a station on the map</p>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className={`${theme === 'dark' ? 'glass' : 'glass-eco'} rounded-xl p-6`}>
            <h3 className={`text-lg font-semibold mb-4 ${theme === 'eco' ? 'text-gray-800' : ''}`}>Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Pipelines</span>
                <span className={`text-xl font-bold ${theme === 'eco' ? 'text-emerald-700' : 'text-emerald-400'}`}>{pipelines.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Active Stations</span>
                <span className={`text-xl font-bold ${theme === 'eco' ? 'text-teal-700' : 'text-teal-400'}`}>{nodes.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Network Length</span>
                <span className={`text-xl font-bold ${theme === 'eco' ? 'text-cyan-700' : 'text-cyan-400'}`}>847 km</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
