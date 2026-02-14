'use client'

import { motion } from 'framer-motion'
import { Notification } from '@/contexts/NotificationContext'
import { useLanguage } from '@/contexts/LanguageContext'

interface Props {
  notification: Notification
  onClose: () => void
}

export default function NotificationDetail({ notification, onClose }: Props) {
  const { t } = useLanguage()

  const getDetailedInfo = () => {
    switch (notification.type) {
      case 'alert':
        return {
          severity: 'Critical',
          location: 'Sector 7, Pipeline B-23',
          affectedUsers: '1,247 households',
          estimatedImpact: 'High',
          responseTime: '15 minutes',
          assignedTeam: 'Emergency Response Unit Alpha',
          recommendations: [
            'Immediate inspection required',
            'Notify affected residents',
            'Prepare backup water supply',
            'Deploy maintenance crew'
          ],
          technicalDetails: {
            'Pressure Reading': '2.1 bar (Normal: 3.5 bar)',
            'Flow Rate': '245 L/min (Normal: 380 L/min)',
            'Temperature': '18°C',
            'Last Maintenance': '12 days ago'
          }
        }
      case 'warning':
        return {
          severity: 'Medium',
          location: 'District 3, Multiple Zones',
          affectedUsers: '3,450 households',
          estimatedImpact: 'Medium',
          responseTime: '2 hours',
          assignedTeam: 'Water Management Team',
          recommendations: [
            'Monitor consumption patterns',
            'Send conservation alerts',
            'Check for unauthorized usage',
            'Review distribution schedule'
          ],
          technicalDetails: {
            'Current Usage': '2,847 m³/day',
            'Normal Usage': '2,450 m³/day',
            'Increase': '+15%',
            'Duration': '3 days'
          }
        }
      case 'success':
        return {
          severity: 'Resolved',
          location: 'Zone B, Pipeline Network',
          affectedUsers: '0 (Prevented)',
          estimatedImpact: 'None',
          responseTime: 'Automated',
          assignedTeam: 'AI Prediction System',
          recommendations: [
            'Continue monitoring',
            'Schedule preventive maintenance',
            'Update prediction models',
            'Document incident'
          ],
          technicalDetails: {
            'Anomaly Detected': 'Pressure fluctuation pattern',
            'Confidence Level': '94.7%',
            'Action Taken': 'Valve adjustment',
            'Water Saved': '~12,000 liters'
          }
        }
      default:
        return {
          severity: 'Info',
          location: 'System Wide',
          affectedUsers: 'All users',
          estimatedImpact: 'Low',
          responseTime: 'N/A',
          assignedTeam: 'System Administrator',
          recommendations: [
            'No action required',
            'Information only'
          ],
          technicalDetails: {
            'Status': 'Normal',
            'Last Update': 'Just now'
          }
        }
    }
  }

  const details = getDetailedInfo()

  const handleReportToGovernment = () => {
    // Open government portal in new tab
    window.open('https://www.india.gov.in/topics/infrastructure/water-resources', '_blank')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-dark rounded-2xl border border-white/10 p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{notification.title}</h2>
            <p className="text-gray-400">{notification.message}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors flex-shrink-0"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Severity Badge */}
        <div className="flex items-center gap-3 mb-6">
          <span className={`px-4 py-2 rounded-full text-sm font-bold ${
            details.severity === 'Critical' ? 'bg-red-500/20 text-red-400 border border-red-500/50' :
            details.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' :
            details.severity === 'Resolved' ? 'bg-green-500/20 text-green-400 border border-green-500/50' :
            'bg-blue-500/20 text-blue-400 border border-blue-500/50'
          }`}>
            {details.severity}
          </span>
          <span className="text-sm text-gray-500">
            {new Date(notification.timestamp).toLocaleString()}
          </span>
        </div>

        {/* Key Information Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="text-xs text-gray-500 mb-1">Location</div>
            <div className="text-white font-semibold">{details.location}</div>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="text-xs text-gray-500 mb-1">Affected Users</div>
            <div className="text-white font-semibold">{details.affectedUsers}</div>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="text-xs text-gray-500 mb-1">Estimated Impact</div>
            <div className="text-white font-semibold">{details.estimatedImpact}</div>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="text-xs text-gray-500 mb-1">Response Time</div>
            <div className="text-white font-semibold">{details.responseTime}</div>
          </div>
        </div>

        {/* Assigned Team */}
        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 mb-6">
          <div className="text-xs text-cyan-400 mb-1">Assigned Team</div>
          <div className="text-white font-semibold">{details.assignedTeam}</div>
        </div>

        {/* Recommendations */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-white mb-3">Recommended Actions</h3>
          <div className="space-y-2">
            {details.recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/5 rounded-lg p-3">
                <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <span className="text-gray-300 text-sm">{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Details */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-white mb-3">Technical Details</h3>
          <div className="bg-gray-900/50 rounded-xl p-4 border border-white/10">
            <div className="space-y-3">
              {Object.entries(details.technicalDetails).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <span className="text-sm text-gray-400">{key}</span>
                  <span className="text-sm text-white font-mono">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleReportToGovernment}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            {t('report.issue')}
          </button>
          <button
            onClick={() => window.open('mailto:support@aquapercent.io', '_blank')}
            className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {t('contact.support')}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
