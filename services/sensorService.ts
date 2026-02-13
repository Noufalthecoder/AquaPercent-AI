/**
 * Sensor Service
 * Handles sensor data retrieval with automatic fallback to simulation
 */

import { sensorConfig } from '@/config/systemConfig'

export interface SensorData {
  id: string
  name: string
  status: 'connected' | 'simulated'
  rate: string
  lastUpdate: string
  value: number
  timestamp: number
}

export interface SensorReading {
  pressure: number
  flow: number
  soilMoisture: number
  leakDetection: number
}

class SensorService {
  private isRealEndpoint: boolean
  private simulationData: Map<string, number>

  constructor() {
    this.isRealEndpoint = !!sensorConfig.dataSourceUrl
    this.simulationData = new Map()
    this.initializeSimulation()
  }

  private initializeSimulation() {
    // Initialize simulated sensor values
    this.simulationData.set('pressure', 2.4)
    this.simulationData.set('flow', 342.5)
    this.simulationData.set('soilMoisture', 68.3)
    this.simulationData.set('leakDetection', 0)
  }

  /**
   * Get current sensor status
   */
  getConnectionStatus(): 'connected' | 'simulated' {
    return this.isRealEndpoint ? 'connected' : 'simulated'
  }

  /**
   * Fetch sensor data from real endpoint or simulation
   */
  async fetchSensorData(): Promise<SensorData[]> {
    if (this.isRealEndpoint) {
      try {
        const response = await fetch(sensorConfig.dataSourceUrl!, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })
        
        if (response.ok) {
          const data = await response.json()
          return this.formatSensorData(data, 'connected')
        }
      } catch (error) {
        console.warn('Sensor endpoint unavailable, falling back to simulation')
      }
    }

    // Fallback to simulation
    return this.generateSimulatedData()
  }

  /**
   * Generate simulated sensor data
   */
  private generateSimulatedData(): SensorData[] {
    const now = Date.now()
    const sensors = sensorConfig.sensors

    // Update simulated values with small variations
    this.simulationData.set('pressure', 
      Math.max(2.0, Math.min(3.0, this.simulationData.get('pressure')! + (Math.random() - 0.5) * 0.1))
    )
    this.simulationData.set('flow', 
      Math.max(300, Math.min(400, this.simulationData.get('flow')! + (Math.random() - 0.5) * 10))
    )
    this.simulationData.set('soilMoisture', 
      Math.max(60, Math.min(75, this.simulationData.get('soilMoisture')! + (Math.random() - 0.5) * 2))
    )
    this.simulationData.set('leakDetection', 
      Math.random() > 0.95 ? 1 : 0
    )

    return [
      {
        id: sensors.pressure.id,
        name: sensors.pressure.name,
        status: 'simulated',
        rate: sensors.pressure.rate,
        lastUpdate: this.getRandomUpdateTime(),
        value: this.simulationData.get('pressure')!,
        timestamp: now
      },
      {
        id: sensors.flow.id,
        name: sensors.flow.name,
        status: 'simulated',
        rate: sensors.flow.rate,
        lastUpdate: this.getRandomUpdateTime(),
        value: this.simulationData.get('flow')!,
        timestamp: now
      },
      {
        id: sensors.soilMoisture.id,
        name: sensors.soilMoisture.name,
        status: 'simulated',
        rate: sensors.soilMoisture.rate,
        lastUpdate: this.getRandomUpdateTime(),
        value: this.simulationData.get('soilMoisture')!,
        timestamp: now
      },
      {
        id: sensors.leakDetection.id,
        name: sensors.leakDetection.name,
        status: 'simulated',
        rate: sensors.leakDetection.rate,
        lastUpdate: this.getRandomUpdateTime(),
        value: this.simulationData.get('leakDetection')!,
        timestamp: now
      }
    ]
  }

  /**
   * Format sensor data from real endpoint
   */
  private formatSensorData(rawData: any, status: 'connected' | 'simulated'): SensorData[] {
    // Transform real API response to standard format
    return rawData.sensors?.map((sensor: any) => ({
      id: sensor.id,
      name: sensor.name,
      status,
      rate: sensor.rate,
      lastUpdate: sensor.lastUpdate,
      value: sensor.value,
      timestamp: Date.now()
    })) || []
  }

  /**
   * Get random update time for simulation
   */
  private getRandomUpdateTime(): string {
    const seconds = (Math.random() * 0.5).toFixed(1)
    return `${seconds}s ago`
  }

  /**
   * Get current sensor readings
   */
  getCurrentReadings(): SensorReading {
    return {
      pressure: this.simulationData.get('pressure')!,
      flow: this.simulationData.get('flow')!,
      soilMoisture: this.simulationData.get('soilMoisture')!,
      leakDetection: this.simulationData.get('leakDetection')!
    }
  }

  /**
   * Get polling interval from config
   */
  getPollingInterval(): number {
    return sensorConfig.pollingInterval
  }
}

// Export singleton instance
export const sensorService = new SensorService()
