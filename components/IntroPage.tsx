'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'

interface IntroPageProps {
  onEnter: () => void
}

const appModules = [
  {
    id: 'command',
    title: 'Global Command Center',
    icon: '🌐',
    color: 'from-blue-500 to-cyan-500',
    description: 'Your mission control for water infrastructure',
    details: 'Real-time monitoring of entire water network with instant alerts and system health tracking',
    stat: { value: '99.9%', label: 'System Uptime' }
  },
  {
    id: 'leak',
    title: 'Leak Prediction Engine',
    icon: '🔍',
    color: 'from-purple-500 to-pink-500',
    description: 'AI-powered predictive maintenance',
    details: 'Advanced machine learning algorithms detect anomalies before they become critical failures',
    stat: { value: '98.7%', label: 'Prediction Accuracy' }
  },
  {
    id: 'map',
    title: 'Infrastructure Map',
    icon: '🗺️',
    color: 'from-emerald-500 to-teal-500',
    description: 'Interactive network visualization',
    details: 'Live pipeline status with animated water flow and comprehensive station monitoring',
    stat: { value: '847', label: 'Active Sensors' }
  },
  {
    id: 'decision',
    title: 'Decision Intelligence',
    icon: '🧠',
    color: 'from-orange-500 to-red-500',
    description: 'Data-driven strategic insights',
    details: 'Transform complex data into actionable intelligence for optimal resource management',
    stat: { value: '2.4M', label: 'Data Points/Day' }
  },
  {
    id: 'citizen',
    title: 'Citizen Portal',
    icon: '👥',
    color: 'from-indigo-500 to-blue-500',
    description: 'Public engagement platform',
    details: 'Empower citizens with transparent water usage data and direct communication channels',
    stat: { value: '15K', label: 'Active Users' }
  },
  {
    id: 'farmer',
    title: 'Farmer Mode',
    icon: '🌾',
    color: 'from-green-500 to-lime-500',
    description: 'Agricultural water management',
    details: 'Smart irrigation planning with groundwater monitoring and weather-based recommendations',
    stat: { value: '847K', label: 'Liters Saved' }
  },
  {
    id: 'insights',
    title: 'AI Insights Lab',
    icon: '⚡',
    color: 'from-yellow-500 to-orange-500',
    description: 'Advanced analytics suite',
    details: 'Unlock hidden patterns with cutting-edge AI models and custom analytical frameworks',
    stat: { value: '24/7', label: 'Continuous Analysis' }
  },
  {
    id: 'analytics',
    title: 'System Analytics',
    icon: '📊',
    color: 'from-pink-500 to-rose-500',
    description: 'Comprehensive reporting',
    details: 'Generate detailed performance reports with historical trends and exportable insights',
    stat: { value: '100+', label: 'Report Types' }
  }
]

export default function IntroPage({ onEnter }: IntroPageProps) {
  const [animationStage, setAnimationStage] = useState(0)
  const [litersSaved, setLitersSaved] = useState(0)
  const [leaksPrevented, setLeaksPrevented] = useState(0)
  const [accuracy, setAccuracy] = useState(0)
  const { user } = useAuth()

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationStage(1), 100)
    const timer2 = setTimeout(() => setAnimationStage(2), 800)
    const timer3 = setTimeout(() => setAnimationStage(3), 1400)
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  // Fast counting animation from 0 to target
  useEffect(() => {
    if (animationStage >= 3) {
      const targetLiters = 17018
      const targetLeaks = 53
      const targetAccuracy = 44.5
      
      const duration = 2000 // 2 seconds
      const steps = 60
      const interval = duration / steps
      
      let currentStep = 0
      
      const counter = setInterval(() => {
        currentStep++
        const progress = currentStep / steps
        
        // Ease out effect for smooth deceleration
        const easeProgress = 1 - Math.pow(1 - progress, 3)
        
        setLitersSaved(Math.floor(targetLiters * easeProgress))
        setLeaksPrevented(Math.floor(targetLeaks * easeProgress))
        setAccuracy(targetAccuracy * easeProgress)
        
        if (currentStep >= steps) {
          clearInterval(counter)
          setLitersSaved(targetLiters)
          setLeaksPrevented(targetLeaks)
          setAccuracy(targetAccuracy)
          
          // After counting finishes, start slow incremental updates
          const slowUpdate = setInterval(() => {
            setLitersSaved(prev => prev + Math.floor(Math.random() * 15) + 5)
            setLeaksPrevented(prev => prev + (Math.random() > 0.7 ? 1 : 0))
            setAccuracy(prev => {
              const change = (Math.random() - 0.5) * 0.2
              return Math.max(40, Math.min(50, prev + change))
            })
          }, 3000)
          
          return () => clearInterval(slowUpdate)
        }
      }, interval)
      
      return () => clearInterval(counter)
    }
  }, [animationStage])

  return (
    <div className="relative bg-black overflow-x-hidden">
      {/* Initial black screen fade */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: animationStage >= 1 ? 0 : 1 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 bg-black z-50 pointer-events-none"
      />

      {/* Scanning light sweep */}
      <motion.div
        initial={{ x: '-100%', opacity: 0 }}
        animate={{ 
          x: animationStage >= 2 ? '100%' : '-100%',
          opacity: animationStage >= 2 ? [0, 1, 0] : 0
        }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="fixed inset-y-0 w-32 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent z-40 pointer-events-none blur-xl"
      />

      {/* Animated grid background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          animation: 'gridMove 30s linear infinite'
        }} />
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-1 h-1 bg-cyan-400 rounded-full pointer-events-none"
          initial={{ 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920), 
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
            opacity: 0 
          }}
          animate={{ 
            y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080)],
            opacity: [0, 0.3, 0]
          }}
          transition={{ 
            duration: Math.random() * 15 + 15, 
            repeat: Infinity,
            ease: 'linear',
            delay: 2
          }}
        />
      ))}

      {/* Hero Section - First Screen */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-8">
        <motion.div
          initial={{ y: -200, opacity: 0, scale: 0.5 }}
          animate={{ 
            y: animationStage >= 3 ? 0 : -200,
            opacity: animationStage >= 3 ? 1 : 0,
            scale: animationStage >= 3 ? 1 : 0.5
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center relative shadow-2xl shadow-cyan-500/50">
              <svg width="72" height="72" viewBox="0 0 24 24" fill="white">
                <path d="M12 2 Q14 6 12 10 Q10 6 12 2 M12 10 Q14 14 12 18 Q10 14 12 10" />
                <circle cx="12" cy="12" r="2" fill="white" />
              </svg>
              <div className="absolute inset-0 bg-cyan-400/30 rounded-2xl animate-pulse"></div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            AquaPercent AI
          </h1>
          
          {/* Tagline */}
          <p className="text-2xl text-gray-400 mb-12">
            Predicting Water. Preventing Crisis.
          </p>

          {/* Quick Stats */}
          <div className="flex gap-8 justify-center">
            <motion.div 
              className="glass-dark rounded-xl px-8 py-6 border border-cyan-500/20"
              animate={{ 
                boxShadow: ['0 0 20px rgba(6, 182, 212, 0.2)', '0 0 30px rgba(6, 182, 212, 0.4)', '0 0 20px rgba(6, 182, 212, 0.2)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div 
                className="text-4xl font-bold text-cyan-400 mb-2"
                key={litersSaved}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.3 }}
              >
                {litersSaved.toLocaleString()}
              </motion.div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Liters Saved Today</div>
            </motion.div>
            <motion.div 
              className="glass-dark rounded-xl px-8 py-6 border border-green-500/20"
              animate={{ 
                boxShadow: ['0 0 20px rgba(34, 197, 94, 0.2)', '0 0 30px rgba(34, 197, 94, 0.4)', '0 0 20px rgba(34, 197, 94, 0.2)']
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <motion.div 
                className="text-4xl font-bold text-green-400 mb-2"
                key={leaksPrevented}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.3 }}
              >
                {leaksPrevented}
              </motion.div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Leaks Prevented</div>
            </motion.div>
            <motion.div 
              className="glass-dark rounded-xl px-8 py-6 border border-purple-500/20"
              animate={{ 
                boxShadow: ['0 0 20px rgba(168, 85, 247, 0.2)', '0 0 30px rgba(168, 85, 247, 0.4)', '0 0 20px rgba(168, 85, 247, 0.2)']
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <motion.div 
                className="text-4xl font-bold text-purple-400 mb-2"
                key={accuracy.toFixed(1)}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.3 }}
              >
                {accuracy.toFixed(1)}%
              </motion.div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Prediction Accuracy</div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="mt-20"
          >
            <div className="text-gray-500 text-sm mb-4 uppercase tracking-wider">Scroll to explore</div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-cyan-400/50 rounded-full mx-auto flex justify-center pt-2"
            >
              <div className="w-1 h-3 bg-cyan-400 rounded-full"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Module Sections - Scroll Reveal */}
      {appModules.map((module, index) => (
        <section key={module.id} className="min-h-screen flex items-center justify-center px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-5xl w-full"
          >
            <div className="glass-dark rounded-3xl p-12 border border-white/10 relative overflow-hidden">
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-5`}></div>
              
              <div className="relative z-10">
                {/* Module number */}
                <div className="text-gray-700 text-sm font-mono mb-4">MODULE {String(index + 1).padStart(2, '0')}</div>
                
                {/* Icon and Title */}
                <div className="flex items-center gap-6 mb-6">
                  <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${module.color} flex items-center justify-center text-5xl shadow-2xl`}>
                    {module.icon}
                  </div>
                  <div>
                    <h2 className="text-5xl font-bold text-white mb-2">{module.title}</h2>
                    <p className={`text-xl font-semibold bg-gradient-to-r ${module.color} bg-clip-text text-transparent`}>
                      {module.description}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                  {module.details}
                </p>

                {/* Stat */}
                <div className="flex items-center gap-8">
                  <div className={`glass-dark rounded-xl px-8 py-6 border border-white/10 bg-gradient-to-br ${module.color} bg-opacity-10`}>
                    <div className={`text-5xl font-bold bg-gradient-to-r ${module.color} bg-clip-text text-transparent mb-2`}>
                      {module.stat.value}
                    </div>
                    <div className="text-sm text-gray-500 uppercase tracking-wider">{module.stat.label}</div>
                  </div>
                  
                  {/* Progress indicator */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {appModules.map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                            i <= index ? `bg-gradient-to-r ${module.color}` : 'bg-gray-800'
                          }`}
                        ></div>
                      ))}
                    </div>
                    <div className="text-xs text-gray-600 mt-2">
                      {index + 1} of {appModules.length} modules
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      ))}

      {/* Final Section - Launch Button */}
      <section className="min-h-screen flex flex-col items-center justify-center px-8 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* User welcome */}
          {user && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass-dark rounded-2xl px-10 py-6 border border-white/10 mb-12 inline-block"
            >
              <div className="text-sm text-gray-400 mb-2">Welcome back,</div>
              <div className="text-3xl font-bold text-white mb-1">{user.fullName}</div>
              <div className="text-cyan-400 font-mono text-sm">{user.role.toUpperCase()}</div>
            </motion.div>
          )}

          {/* Ready message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-6xl font-bold text-white mb-6">
              Ready to Begin?
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              All 8 modules are loaded and ready for your command
            </p>
          </motion.div>

          {/* Launch button */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={onEnter}
            className="relative group px-16 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xl font-bold rounded-2xl transition-all duration-300 overflow-hidden shadow-2xl shadow-cyan-500/50"
          >
            <span className="relative z-10 flex items-center gap-3">
              ENTER COMMAND CENTER
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
          </motion.button>

          {/* System status */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="mt-12 flex items-center justify-center gap-3 text-sm text-gray-500"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>ALL SYSTEMS OPERATIONAL</span>
          </motion.div>
        </motion.div>
      </section>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(60px); }
        }
      `}</style>
    </div>
  )
}
