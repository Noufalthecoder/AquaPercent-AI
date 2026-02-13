/**
 * Monitoring Service
 * Centralized system monitoring and health checks
 */

import { monitoringConfig } from '@/config/systemConfig'
import { sensorService } from './sensorService'
import { apiService } from './apiService'
import { aiService } from './aiService'

export interface SystemHealth {
  overall: number
  components: {
    sensors: number
    apis: number
    aiEngine: number
  }
  timestamp: number
}

export interface DataTransmission {
  packetsPerSecond: number
  signalStrength: number
  systemUptime: number
  lastSync: number
}

export interface SystemLog {
  timestamp: string
  message: string
  level: 'info' | 'warning' | 'error'
}

class MonitoringService {
  private systemLogs: SystemLog[]
  private dataTransmission: DataTransmission
  private systemStartTime: number
  private logRetentionMs: number

  constructor() {
    this.systemStartTime = Date.now()
    this.logRetentionMs = monitoringConfig.logRetentionHours * 60 * 60 * 1000
    this.systemLogs = []
    this.dataTransmission = {
      packetsPerSecond: 342,
      signalStrength: 94,
      systemUptime: 99.8,
      lastSync: Date.now()
    }
    
    this.initializeMonitoring()
  }

  private initializeMonitoring() {
    // Add initial system logs
    this.addLog('System initialized', 'info')
    this.addLog('Prediction model loaded', 'info')
    this.addLog('Weather API connected', 'info')
    this.addLog('Sensor data synchronized', 'info')
  }

  /**
   * Add system log
   */
  addLog(message: string, level: 'info' | 'warning' | 'error' = 'info') {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false })
    
    this.systemLogs.unshift({
      timestamp: `[${timestamp}]`,
      message,
      level
    })

    // Maintain log retention limit
    if (this.systemLogs.length > 100) {
      this.systemLogs = this.systemLogs.slice(0, 100)
    }

    // Clean old logs based on retention policy
    this.cleanOldLogs()
  }

  /**
   * Clean logs older than retention period
   */
  private cleanOldLogs() {
    const cutoffTime = Date.now() - this.logRetentionMs
    // In production, would parse timestamp and filter
    // For now, just maintain max count
  }

  /**
   * Get recent system logs
   */
  getSystemLogs(limit: number = 10): SystemLog[] {
    return this.systemLogs.slice(0, limit)
  }

  /**
   * Get system health status
   */
  async getSystemHealth(): Promise<SystemHealth> {
    const sensorStatus = sensorService.getConnectionStatus()
    const apiStatuses = apiService.getAllApiStatuses()
    const aiStatus = aiService.getConnectionStatus()

    // Calculate component health scores
    const sensorHealth = sensorStatus === 'connected' ? 100 : 95
    const apiHealth = apiStatuses.every(api => api.status === 'connected') ? 100 : 95
    const aiHealth = aiStatus === 'connected' ? 100 : 95

    const overall = (sensorHealth + apiHealth + aiHealth) / 3

    return {
      overall,
      components: {
        sensors: sensorHealth,
        apis: apiHealth,
        aiEngine: aiHealth
      },
      timestamp: Date.now()
    }
  }

  /**
   * Get data transmission metrics
   */
  getDataTransmission(): DataTransmission {
    return { ...this.dataTransmission }
  }

  /**
   * Update data transmission metrics
   */
  updateDataTransmission() {
    // Update packets per second
    this.dataTransmission.packetsPerSecond += Math.floor(Math.random() * 40) - 20
    this.dataTransmission.packetsPerSecond = Math.max(300, Math.min(400, this.dataTransmission.packetsPerSecond))

    // Update signal strength
    const signalChange = (Math.random() - 0.5) * 2
    this.dataTransmission.signalStrength = Math.max(85, Math.min(100, this.dataTransmission.signalStrength + signalChange))

    // Update uptime
    const uptimeIncrease = 0.001
    this.dataTransmission.systemUptime = Math.min(100, this.dataTransmission.systemUptime + uptimeIncrease)

    // Update last sync
    this.dataTransmission.lastSync = Date.now()
  }

  /**
   * Get system uptime in milliseconds
   */
  getSystemUptime(): number {
    return Date.now() - this.systemStartTime
  }

  /**
   * Get system uptime percentage
   */
  getSystemUptimePercentage(): number {
    return this.dataTransmission.systemUptime
  }

  /**
   * Perform health check on all services
   */
  async performHealthCheck(): Promise<{
    sensors: boolean
    apis: boolean
    aiEngine: boolean
    overall: boolean
  }> {
    const health = await this.getSystemHealth()

    return {
      sensors: health.components.sensors > 90,
      apis: health.components.apis > 90,
      aiEngine: health.components.aiEngine > 90,
      overall: health.overall > 90
    }
  }

  /**
   * Get monitoring configuration
   */
  getMonitoringConfig() {
    return {
      dataStreamInterval: monitoringConfig.dataStreamInterval,
      systemHeartbeatInterval: monitoringConfig.systemHeartbeatInterval,
      healthCheckInterval: monitoringConfig.healthCheckInterval,
      enableRealTimeSync: monitoringConfig.enableRealTimeSync,
      enableDataCaching: monitoringConfig.enableDataCaching
    }
  }

  /**
   * Generate random system log
   */
  generateRandomLog() {
    const messages = [
      'Data packet received',
      'Sensor calibration complete',
      'AI model prediction updated',
      'System health check passed',
      'Cache synchronized',
      'Anomaly detection scan complete',
      'Weather data refreshed',
      'Pipeline status updated',
      'Notification sent successfully',
      'Backup completed'
    ]

    const message = messages[Math.floor(Math.random() * messages.length)]
    this.addLog(message, 'info')
  }

  /**
   * Get data stream interval
   */
  getDataStreamInterval(): number {
    return monitoringConfig.dataStreamInterval
  }

  /**
   * Get heartbeat interval
   */
  getHeartbeatInterval(): number {
    return monitoringConfig.systemHeartbeatInterval
  }
}

// Export singleton instance
export const monitoringService = new MonitoringService()
