'use client'

import { ThemeMode } from '../Dashboard'

interface Props {
  theme: ThemeMode
}

export default function CitizenPortal({ theme }: Props) {
  return (
    <div className="space-y-6 pb-16 max-w-4xl">
      <div>
        <h2 className="text-3xl font-bold mb-2">Citizen Portal</h2>
        <p className="text-gray-500">Public water information and community updates</p>
      </div>

      {/* Current Status */}
      <div className="glass rounded-xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
            <span className="text-3xl">💧</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold">Water Supply: Normal</h3>
            <p className="text-gray-400">Your area has stable water availability</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Local Availability</div>
            <div className="text-3xl font-bold text-green-500">94%</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Supply Reliability</div>
            <div className="text-3xl font-bold text-green-500">98%</div>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Upcoming Maintenance</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <span className="text-2xl">🔧</span>
            <div className="flex-1">
              <div className="font-semibold mb-1">Scheduled Maintenance - Central District</div>
              <div className="text-sm text-gray-400 mb-2">March 15, 2026 • 2:00 AM - 6:00 AM</div>
              <div className="text-sm">Brief water pressure reduction expected. No service interruption.</div>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <span className="text-2xl">✅</span>
            <div className="flex-1">
              <div className="font-semibold mb-1">Infrastructure Upgrade Complete</div>
              <div className="text-sm text-gray-400 mb-2">Completed March 1, 2026</div>
              <div className="text-sm">New filtration system installed. Water quality improved by 15%.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Water Conservation Tips */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Water Conservation Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
            <span className="text-2xl">🚿</span>
            <div>
              <div className="font-semibold mb-1">Shorter Showers</div>
              <div className="text-sm text-gray-400">Save up to 150L per week</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
            <span className="text-2xl">🌱</span>
            <div>
              <div className="font-semibold mb-1">Smart Irrigation</div>
              <div className="text-sm text-gray-400">Water plants early morning</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
            <span className="text-2xl">🔧</span>
            <div>
              <div className="font-semibold mb-1">Fix Leaks</div>
              <div className="text-sm text-gray-400">Report drips immediately</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
            <span className="text-2xl">♻️</span>
            <div>
              <div className="font-semibold mb-1">Reuse Water</div>
              <div className="text-sm text-gray-400">Use greywater for gardens</div>
            </div>
          </div>
        </div>
      </div>

      {/* Local Alerts */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Local Alerts</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <div className="font-semibold">All Systems Normal</div>
              <div className="text-sm text-gray-400">No alerts in your area</div>
            </div>
            <div className="text-xs text-gray-500">Updated 2 min ago</div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className={`p-4 rounded-lg font-semibold transition-all ${
            theme === 'dark' 
              ? 'bg-cyber-blue/20 hover:bg-cyber-blue/30 border border-cyber-blue/50' 
              : 'bg-eco-green/20 hover:bg-eco-green/30 border border-eco-green/50'
          }`}>
            📞 Emergency: 911
          </button>
          <button className={`p-4 rounded-lg font-semibold transition-all ${
            theme === 'dark' 
              ? 'bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50' 
              : 'bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/50'
          }`}>
            💬 Report Issue
          </button>
          <button className="p-4 rounded-lg font-semibold bg-white/5 hover:bg-white/10 border border-gray-700 transition-all">
            📧 Contact Support
          </button>
        </div>
      </div>
    </div>
  )
}
