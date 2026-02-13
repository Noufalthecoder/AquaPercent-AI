'use client'

import { useState } from 'react'
import { ThemeMode } from '../Dashboard'

interface Props {
  theme: ThemeMode
}

export default function Settings({ theme }: Props) {
  const [alertSensitivity, setAlertSensitivity] = useState('medium')
  const [inAppNotifications, setInAppNotifications] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [emailAddress, setEmailAddress] = useState('')
  const [soundAlerts, setSoundAlerts] = useState(false)
  const [riskWarning, setRiskWarning] = useState(60)
  const [riskCritical, setRiskCritical] = useState(85)
  const [pipelineWarning, setPipelineWarning] = useState(70)
  const [pipelineCritical, setPipelineCritical] = useState(50)
  const [groundwaterWarning, setGroundwaterWarning] = useState(65)
  const [groundwaterCritical, setGroundwaterCritical] = useState(80)
  const [waterWarning, setWaterWarning] = useState(40)
  const [waterCritical, setWaterCritical] = useState(20)
  const [predictionWindow, setPredictionWindow] = useState(24)
  const [dataRefreshRate, setDataRefreshRate] = useState(30)
  const [serviceRegion, setServiceRegion] = useState('metro')
  const [autoBackup, setAutoBackup] = useState(true)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6 pb-16 max-w-5xl">
      <div>
        <h2 className="text-3xl font-bold mb-2">Settings</h2>
        <p className="text-gray-500">Configure system preferences and alerts</p>
      </div>

      {/* Save Button - Top */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className={`px-8 py-3 rounded-xl font-semibold transition-all ${
            saved
              ? 'bg-green-500 text-white'
              : theme === 'dark'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/30'
              : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg hover:shadow-emerald-500/30'
          }`}
        >
          {saved ? '✓ Saved!' : 'Save Changes'}
        </button>
      </div>

      {/* Alert Configuration */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-xl font-bold mb-6">Alert Configuration</h3>

        {/* Alert Sensitivity */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Alert Sensitivity</label>
          <p className="text-xs text-gray-500 mb-3">How sensitive the system is to potential issues</p>
          <div className="flex gap-3">
            {['low', 'medium', 'high'].map((level) => (
              <button
                key={level}
                onClick={() => setAlertSensitivity(level)}
                className={`flex-1 py-3 rounded-lg font-semibold capitalize transition-all ${
                  alertSensitivity === level
                    ? theme === 'dark'
                      ? 'bg-cyan-500 text-white'
                      : 'bg-emerald-500 text-white'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Notification Toggles */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <div className="font-semibold mb-1">In-App Banner Notifications</div>
              <div className="text-xs text-gray-500">Show alert banners in the application</div>
            </div>
            <button
              onClick={() => setInAppNotifications(!inAppNotifications)}
              className={`w-14 h-8 rounded-full transition-colors relative ${
                inAppNotifications ? 'bg-green-500' : 'bg-gray-700'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  inAppNotifications ? 'translate-x-7' : 'translate-x-1'
                }`}
              ></div>
            </button>
          </div>

          <div className="p-4 bg-white/5 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold mb-1">Email Notifications</div>
                <div className="text-xs text-gray-500">Receive alert notifications via email</div>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`w-14 h-8 rounded-full transition-colors relative ${
                  emailNotifications ? 'bg-green-500' : 'bg-gray-700'
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    emailNotifications ? 'translate-x-7' : 'translate-x-1'
                  }`}
                ></div>
              </button>
            </div>
            {emailNotifications && (
              <div>
                <label className="block text-xs text-gray-500 mb-2">Email Address</label>
                <input
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="Enter your email address"
                  className={`w-full px-4 py-2 rounded-lg border transition-all focus:outline-none ${
                    theme === 'dark'
                      ? 'bg-gray-900/50 border-cyan-500/20 focus:border-cyan-400 text-white placeholder-gray-600'
                      : 'bg-white border-emerald-500/20 focus:border-emerald-400 text-gray-800 placeholder-gray-400'
                  }`}
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <div className="font-semibold mb-1">Sound Alerts</div>
              <div className="text-xs text-gray-500">Enable audio notifications for alerts</div>
            </div>
            <button
              onClick={() => setSoundAlerts(!soundAlerts)}
              className={`w-14 h-8 rounded-full transition-colors relative ${
                soundAlerts ? 'bg-green-500' : 'bg-gray-700'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  soundAlerts ? 'translate-x-7' : 'translate-x-1'
                }`}
              ></div>
            </button>
          </div>
        </div>
      </div>

      {/* Alert Thresholds */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-xl font-bold mb-6">Alert Thresholds</h3>
        <p className="text-sm text-gray-500 mb-6">Configure when alerts trigger</p>

        <div className="space-y-6">
          {/* Risk Level Alerts */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">⚠️</span>
              <div>
                <div className="font-semibold">Risk Level Alerts</div>
                <div className="text-xs text-gray-500">Trigger alerts when risk exceeds thresholds</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">Warning Threshold (%)</label>
                <input
                  type="number"
                  value={riskWarning}
                  onChange={(e) => setRiskWarning(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Critical Threshold (%)</label>
                <input
                  type="number"
                  value={riskCritical}
                  onChange={(e) => setRiskCritical(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-red-400"
                />
              </div>
            </div>
          </div>

          {/* Pipeline Status Alerts */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🔧</span>
              <div>
                <div className="font-semibold">Pipeline Status Alerts</div>
                <div className="text-xs text-gray-500">Alert when pipeline status drops below thresholds</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">Warning Below (%)</label>
                <input
                  type="number"
                  value={pipelineWarning}
                  onChange={(e) => setPipelineWarning(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Critical Below (%)</label>
                <input
                  type="number"
                  value={pipelineCritical}
                  onChange={(e) => setPipelineCritical(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-red-400"
                />
              </div>
            </div>
          </div>

          {/* Groundwater Stress Alerts */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">💧</span>
              <div>
                <div className="font-semibold">Groundwater Stress Alerts</div>
                <div className="text-xs text-gray-500">Monitor groundwater stress levels</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">Warning Threshold (%)</label>
                <input
                  type="number"
                  value={groundwaterWarning}
                  onChange={(e) => setGroundwaterWarning(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Critical Threshold (%)</label>
                <input
                  type="number"
                  value={groundwaterCritical}
                  onChange={(e) => setGroundwaterCritical(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-red-400"
                />
              </div>
            </div>
          </div>

          {/* Water Availability Alerts */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌊</span>
              <div>
                <div className="font-semibold">Water Availability Alerts</div>
                <div className="text-xs text-gray-500">Alert when availability drops below thresholds</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">Warning Below (%)</label>
                <input
                  type="number"
                  value={waterWarning}
                  onChange={(e) => setWaterWarning(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Critical Below (%)</label>
                <input
                  type="number"
                  value={waterCritical}
                  onChange={(e) => setWaterCritical(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-red-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prediction & Analysis */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-xl font-bold mb-6">Prediction & Analysis</h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Prediction Window</label>
            <p className="text-xs text-gray-500 mb-3">How far ahead to predict (hours)</p>
            <input
              type="range"
              min="6"
              max="72"
              step="6"
              value={predictionWindow}
              onChange={(e) => setPredictionWindow(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-500">6h</span>
              <span className={theme === 'dark' ? 'text-cyan-400' : 'text-emerald-600'}>{predictionWindow}h</span>
              <span className="text-gray-500">72h</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Data Refresh Rate</label>
            <p className="text-xs text-gray-500 mb-3">How often to update data (seconds)</p>
            <input
              type="range"
              min="10"
              max="120"
              step="10"
              value={dataRefreshRate}
              onChange={(e) => setDataRefreshRate(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-500">10s</span>
              <span className={theme === 'dark' ? 'text-cyan-400' : 'text-emerald-600'}>{dataRefreshRate}s</span>
              <span className="text-gray-500">120s</span>
            </div>
          </div>
        </div>
      </div>

      {/* Region & Data */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-xl font-bold mb-6">Region & Data</h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Service Region</label>
            <p className="text-xs text-gray-500 mb-3">Select your primary monitoring region</p>
            <select
              value={serviceRegion}
              onChange={(e) => setServiceRegion(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400"
            >
              <option value="metro">Metro District</option>
              <option value="north">North Region</option>
              <option value="south">South Region</option>
              <option value="east">East Region</option>
              <option value="west">West Region</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <div className="font-semibold mb-1">Automatic Backup</div>
              <div className="text-xs text-gray-500">Enable automatic data backup</div>
            </div>
            <button
              onClick={() => setAutoBackup(!autoBackup)}
              className={`w-14 h-8 rounded-full transition-colors relative ${
                autoBackup ? 'bg-green-500' : 'bg-gray-700'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  autoBackup ? 'translate-x-7' : 'translate-x-1'
                }`}
              ></div>
            </button>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-xl font-bold mb-6">System Information</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Version</div>
            <div className="text-xl font-bold">v2.4.1</div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Build</div>
            <div className="text-xl font-bold">2026.02.10</div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">API Status</div>
            <div className="text-xl font-bold text-green-500 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Connected
            </div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">License</div>
            <div className="text-xl font-bold">Enterprise</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg">
          <div className="text-sm font-semibold mb-1">AI-Powered Water Intelligence System</div>
          <div className="text-xs text-gray-500">Advanced predictive analytics for sustainable water management</div>
        </div>
      </div>

      {/* Save Button - Bottom */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className={`px-8 py-3 rounded-xl font-semibold transition-all ${
            saved
              ? 'bg-green-500 text-white'
              : theme === 'dark'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/30'
              : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg hover:shadow-emerald-500/30'
          }`}
        >
          {saved ? '✓ Saved!' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}
