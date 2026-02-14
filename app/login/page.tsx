'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSelector from '@/components/LanguageSelector'
import type { UserRole } from '@/contexts/AuthContext'

export default function LoginPage() {
  const [mounted, setMounted] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<UserRole>('super-admin')
  const [showPassword, setShowPassword] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [authStage, setAuthStage] = useState('')
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  
  const { login, isAuthenticated } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) router.push('/')
  }, [isAuthenticated, router])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX / window.innerWidth)
      setMouseY(e.clientY / window.innerHeight)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsAuthenticating(true)

    setAuthStage('Verifying Identity...')
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const success = await login(username, password, role)
    
    if (success) {
      setAuthStage('Loading Role Environment...')
      await new Promise(resolve => setTimeout(resolve, 600))
      setAuthStage('Initializing System Modules...')
      await new Promise(resolve => setTimeout(resolve, 600))
      setAuthStage('Access Granted')
      await new Promise(resolve => setTimeout(resolve, 400))
      router.push('/')
    } else {
      setIsAuthenticating(false)
      setAuthStage('')
      setError('ACCESS DENIED — INVALID CREDENTIALS')
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex">
      {/* Language Selector - Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <LanguageSelector />
      </div>

      {/* Animated Water Infrastructure Ecosystem - Left Side */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Deep space background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-black to-cyan-950"></div>
        
        {/* Animated grid that morphs */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="0.5"/>
              </pattern>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#0891b2" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0e7490" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)">
              <animateTransform attributeName="transform" type="translate" values="0 0; 0 50; 0 0" dur="20s" repeatCount="indefinite"/>
            </rect>
          </svg>
        </div>

        {/* Floating particles with depth */}
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: `rgba(6, 182, 212, ${0.2 + Math.random() * 0.6})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float3d ${10 + Math.random() * 20}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `translateZ(${Math.random() * 100}px)`,
              filter: 'blur(1px)'
            }}
          ></div>
        ))}

        {/* Main Water Infrastructure Visualization */}
        <div className="relative w-full h-full flex items-center justify-center p-8">
          <svg width="100%" height="100%" viewBox="0 0 600 800" className="w-full h-full" style={{
            transform: `perspective(1000px) rotateX(${mouseY * 5 - 2.5}deg) rotateY(${mouseX * 5 - 2.5}deg)`
          }}>
            <defs>
              {/* Advanced gradients */}
              <radialGradient id="sourceGlow">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="pipeFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3">
                  <animate attributeName="offset" values="0;1;0" dur="3s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="#0891b2" stopOpacity="0.8">
                  <animate attributeName="offset" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#0e7490" stopOpacity="0.3">
                  <animate attributeName="offset" values="1;0;1" dur="3s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>

            {/* Water Source - Top */}
            <g transform="translate(300, 80)">
              <circle r="60" fill="url(#sourceGlow)" opacity="0.3" className="animate-pulse" />
              <circle r="45" fill="url(#sourceGlow)" opacity="0.5" />
              <circle r="30" fill="#06b6d4" opacity="0.8" filter="url(#glow)" />
              <text y="8" textAnchor="middle" fontSize="32" fill="white">💧</text>
              <text y="80" textAnchor="middle" fontSize="14" fill="#06b6d4" fontWeight="bold">WATER SOURCE</text>
            </g>

            {/* Main Distribution Pipeline Network */}
            {/* Central trunk */}
            <line x1="300" y1="140" x2="300" y2="350" stroke="url(#pipeFlow)" strokeWidth="20" strokeLinecap="round" filter="url(#glow)" />
            
            {/* Branch pipelines - animated flow */}
            {[
              { x1: 300, y1: 200, x2: 150, y2: 280, delay: 0 },
              { x1: 300, y1: 200, x2: 450, y2: 280, delay: 0.5 },
              { x1: 300, y1: 280, x2: 180, y2: 380, delay: 1 },
              { x1: 300, y1: 280, x2: 420, y2: 380, delay: 1.5 },
              { x1: 300, y1: 350, x2: 220, y2: 480, delay: 2 },
              { x1: 300, y1: 350, x2: 380, y2: 480, delay: 2.5 }
            ].map((pipe, i) => (
              <g key={i}>
                <line 
                  x1={pipe.x1} y1={pipe.y1} x2={pipe.x2} y2={pipe.y2} 
                  stroke="url(#pipeFlow)" strokeWidth="12" strokeLinecap="round" 
                  opacity="0.6" filter="url(#glow)"
                />
                {/* Flow particles */}
                {[...Array(3)].map((_, j) => (
                  <circle key={j} r="4" fill="#06b6d4" filter="url(#glow)">
                    <animateMotion 
                      dur="2s" 
                      repeatCount="indefinite" 
                      begin={`${pipe.delay + j * 0.7}s`}
                      path={`M ${pipe.x1} ${pipe.y1} L ${pipe.x2} ${pipe.y2}`}
                    />
                    <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin={`${pipe.delay + j * 0.7}s`} />
                  </circle>
                ))}
              </g>
            ))}

            {/* AI Monitoring Nodes */}
            {[
              { x: 150, y: 280, status: 'healthy', label: 'ZONE A' },
              { x: 450, y: 280, status: 'warning', label: 'ZONE B' },
              { x: 180, y: 380, status: 'healthy', label: 'ZONE C' },
              { x: 420, y: 380, status: 'critical', label: 'ZONE D' },
              { x: 220, y: 480, status: 'healthy', label: 'ZONE E' },
              { x: 380, y: 480, status: 'healthy', label: 'ZONE F' }
            ].map((node, i) => {
              const color = node.status === 'critical' ? '#ef4444' : node.status === 'warning' ? '#f59e0b' : '#10b981'
              return (
                <g key={i} transform={`translate(${node.x}, ${node.y})`}>
                  <circle r="35" fill="none" stroke={color} strokeWidth="2" opacity="0.2" />
                  <circle r="25" fill="none" stroke={color} strokeWidth="2" opacity="0.4">
                    <animate attributeName="r" values="25;30;25" dur="2s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
                  </circle>
                  <circle r="18" fill={color} opacity="0.3" className="animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                  <circle r="12" fill={color} filter="url(#glow)" />
                  
                  {/* Status indicator */}
                  {node.status === 'critical' && (
                    <>
                      <text y="5" textAnchor="middle" fontSize="16" fill="white">⚠️</text>
                      <circle r="40" fill="none" stroke="#ef4444" strokeWidth="2" className="animate-ping" />
                    </>
                  )}
                  {node.status === 'warning' && (
                    <text y="5" textAnchor="middle" fontSize="16" fill="white">⚡</text>
                  )}
                  {node.status === 'healthy' && (
                    <text y="5" textAnchor="middle" fontSize="16" fill="white">✓</text>
                  )}
                  
                  <text y="50" textAnchor="middle" fontSize="10" fill={color} fontWeight="bold">{node.label}</text>
                </g>
              )
            })}

            {/* Treatment Facility - Bottom */}
            <g transform="translate(300, 600)">
              <rect x="-60" y="-40" width="120" height="80" rx="8" fill="#0891b2" opacity="0.2" stroke="#06b6d4" strokeWidth="2" />
              <rect x="-50" y="-30" width="100" height="60" rx="4" fill="#06b6d4" opacity="0.3" />
              
              {/* Processing animation */}
              {[...Array(5)].map((_, i) => (
                <circle key={i} cx={-40 + i * 20} cy="0" r="4" fill="#06b6d4" opacity="0.8">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                </circle>
              ))}
              
              <text y="60" textAnchor="middle" fontSize="14" fill="#06b6d4" fontWeight="bold">TREATMENT FACILITY</text>
            </g>

            {/* Data streams */}
            {[...Array(20)].map((_, i) => (
              <g key={i}>
                <circle r="2" fill="#06b6d4" opacity="0.6">
                  <animateMotion 
                    dur={`${3 + Math.random() * 2}s`}
                    repeatCount="indefinite"
                    begin={`${Math.random() * 3}s`}
                    path={`M ${150 + Math.random() * 300} ${100 + Math.random() * 500} L ${150 + Math.random() * 300} ${100 + Math.random() * 500}`}
                  />
                  <animate attributeName="opacity" values="0;0.8;0" dur="3s" repeatCount="indefinite" begin={`${Math.random() * 3}s`} />
                </circle>
              </g>
            ))}

            {/* Real-time stats overlay */}
            <g transform="translate(50, 700)">
              <rect x="0" y="0" width="140" height="60" rx="8" fill="#000" opacity="0.6" />
              <text x="70" y="25" textAnchor="middle" fontSize="20" fill="#10b981" fontWeight="bold">98.7%</text>
              <text x="70" y="45" textAnchor="middle" fontSize="10" fill="#059669">SYSTEM HEALTH</text>
            </g>

            <g transform="translate(410, 700)">
              <rect x="0" y="0" width="140" height="60" rx="8" fill="#000" opacity="0.6" />
              <text x="70" y="25" textAnchor="middle" fontSize="20" fill="#06b6d4" fontWeight="bold">2.4M</text>
              <text x="70" y="45" textAnchor="middle" fontSize="10" fill="#0891b2">LITERS/DAY</text>
            </g>
          </svg>

          {/* Floating info cards */}
          <div className="absolute top-20 left-10 glass-dark rounded-xl p-4 border border-cyan-500/30 animate-float" style={{ animationDelay: '0s' }}>
            <div className="text-cyan-400 text-sm font-bold mb-1">AI Detection</div>
            <div className="text-xs text-gray-400">Real-time monitoring active</div>
          </div>

          <div className="absolute top-40 right-10 glass-dark rounded-xl p-4 border border-emerald-500/30 animate-float" style={{ animationDelay: '1s' }}>
            <div className="text-emerald-400 text-sm font-bold mb-1">Auto Response</div>
            <div className="text-xs text-gray-400">Leak prevention engaged</div>
          </div>

          <div className="absolute bottom-40 left-20 glass-dark rounded-xl p-4 border border-blue-500/30 animate-float" style={{ animationDelay: '2s' }}>
            <div className="text-blue-400 text-sm font-bold mb-1">Smart Network</div>
            <div className="text-xs text-gray-400">847 sensors connected</div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-950 via-black to-blue-950/30">
        {/* Subtle animated background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.3) 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
            animation: 'pulse 4s ease-in-out infinite'
          }}></div>
        </div>

        {/* Ambient light effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>

        <div className="relative z-10 w-full max-w-md px-6">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-block relative mb-6">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-transparent animate-pulse"></div>
                <svg width="56" height="56" viewBox="0 0 24 24" fill="white" className="relative z-10">
                  <path d="M12 2 Q14 6 12 10 Q10 6 12 2 M12 10 Q14 14 12 18 Q10 14 12 10" />
                  <circle cx="12" cy="12" r="2" fill="white" />
                </svg>
              </div>
              <div className="absolute -inset-8 bg-cyan-400/10 rounded-full blur-2xl"></div>
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              {t('app.title')}
            </h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-cyan-400 to-transparent mb-2"></div>
            <p className="text-gray-400 text-sm">{t('secure.access') || 'Secure Infrastructure Access'}</p>
          </div>

          {/* Login Panel */}
          <div className={`glass-dark rounded-2xl p-8 border border-cyan-500/20 relative overflow-hidden ${shake ? 'animate-shake' : ''}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>
            
            {error && (
              <div className="absolute inset-0 bg-red-900/20 border-2 border-red-500/50 rounded-2xl flex items-center justify-center backdrop-blur-sm z-20">
                <div className="text-center p-6">
                  <div className="text-red-400 text-3xl mb-3">⚠</div>
                  <div className="text-red-400 font-bold text-sm">{error}</div>
                </div>
              </div>
            )}

            {isAuthenticating && (
              <div className="absolute inset-0 bg-black/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center z-30">
                <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                <div className="text-cyan-400 font-mono text-sm animate-pulse mb-4">{authStage}</div>
                <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-progress"></div>
                </div>
              </div>
            )}

            <div className="relative z-10">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-1">{t('login.title')}</h2>
                <p className="text-cyan-400 text-xs font-mono uppercase tracking-wider">{t('login.subtitle')}</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">{t('user.id')}</label>
                  <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    className="w-full bg-gray-900/50 border border-cyan-500/20 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all placeholder-gray-600" 
                    placeholder={t('user.id.placeholder') || 'Enter user identification'} 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">{t('password')}</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      className="w-full bg-gray-900/50 border border-cyan-500/20 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all pr-12 placeholder-gray-600" 
                      placeholder={t('password.placeholder') || 'Enter secure password'} 
                      required 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)} 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-400 transition-colors text-lg"
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">{t('access.role')}</label>
                  <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value as UserRole)} 
                    className="w-full bg-gray-900/50 border border-cyan-500/20 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all appearance-none cursor-pointer"
                  >
                    <option value="super-admin">Super Admin</option>
                    <option value="engineer">Engineer</option>
                    <option value="policy-maker">Policy Maker</option>
                    <option value="farmer">Farmer</option>
                    <option value="citizen">Citizen</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  disabled={isAuthenticating} 
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3.5 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group mt-6"
                >
                  <span className="relative z-10 text-sm uppercase tracking-wider">{t('authenticate')}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                </button>
              </form>

              <div className="mt-6 p-3 bg-gray-900/30 rounded-lg border border-gray-800">
                <p className="text-xs text-gray-500 mb-2 font-semibold">{t('demo.credentials')}</p>
                <div className="text-xs text-gray-600 space-y-0.5 font-mono">
                  <div>admin/admin123 • engineer/eng123 • policy/policy123</div>
                  <div>farmer/farm123 • citizen/citizen123</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-xs">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-500 uppercase tracking-wider">{t('secure.connection')}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float3d {
          0%, 100% { 
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.3;
          }
          50% { 
            transform: translate3d(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px, ${Math.random() * 50}px) scale(1.5);
            opacity: 0.8;
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
