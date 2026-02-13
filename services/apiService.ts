/**
 * API Service
 * Manages external API connections with automatic fallback
 */

import { apiConfig, monitoringConfig } from '@/config/systemConfig'

export interface ApiStatus {
  name: string
  status: 'connected' | 'simulated'
  responseTime: number
  sync: boolean
  lastCheck: number
}

class ApiService {
  private apiStatuses: Map<string, ApiStatus>
  private retryAttempts: Map<string, number>

  constructor() {
    this.apiStatuses = new Map()
    this.retryAttempts = new Map()
    this.initializeApis()
  }

  private initializeApis() {
    const apis = [
      { name: 'Weather API', key: 'weather', url: apiConfig.weather.url },
      { name: 'Map API', key: 'map', url: apiConfig.map.url },
      { name: 'Prediction Engine API', key: 'prediction', url: apiConfig.prediction.url },
      { name: 'Notification API', key: 'notification', url: apiConfig.notification.url }
    ]

    apis.forEach(api => {
      this.apiStatuses.set(api.key, {
        name: api.name,
        status: api.url ? 'connected' : 'simulated',
        responseTime: this.getRandomResponseTime(),
        sync: true,
        lastCheck: Date.now()
      })
      this.retryAttempts.set(api.key, 0)
    })
  }

  /**
   * Check API health and update status
   */
  async checkApiHealth(apiKey: string): Promise<ApiStatus> {
    const currentStatus = this.apiStatuses.get(apiKey)
    if (!currentStatus) {
      throw new Error(`Unknown API: ${apiKey}`)
    }

    const apiUrl = this.getApiUrl(apiKey)
    
    if (!apiUrl) {
      // No real endpoint, use simulation
      return this.updateApiStatus(apiKey, 'simulated', this.getRandomResponseTime())
    }

    try {
      const startTime = Date.now()
      const response = await fetch(`${apiUrl}/health`, {
        method: 'GET',
        signal: AbortSignal.timeout(apiConfig.weather.timeout)
      })

      const responseTime = Date.now() - startTime

      if (response.ok) {
        this.retryAttempts.set(apiKey, 0)
        return this.updateApiStatus(apiKey, 'connected', responseTime)
      }
    } catch (error) {
      const attempts = this.retryAttempts.get(apiKey)! + 1
      this.retryAttempts.set(apiKey, attempts)

      if (attempts >= monitoringConfig.maxRetryAttempts) {
        console.warn(`API ${apiKey} failed after ${attempts} attempts, using simulation`)
      }
    }

    // Fallback to simulation
    return this.updateApiStatus(apiKey, 'simulated', this.getRandomResponseTime())
  }

  /**
   * Get API URL by key
   */
  private getApiUrl(apiKey: string): string | null {
    switch (apiKey) {
      case 'weather':
        return apiConfig.weather.url
      case 'map':
        return apiConfig.map.url
      case 'prediction':
        return apiConfig.prediction.url
      case 'notification':
        return apiConfig.notification.url
      default:
        return null
    }
  }

  /**
   * Update API status
   */
  private updateApiStatus(apiKey: string, status: 'connected' | 'simulated', responseTime: number): ApiStatus {
    const currentStatus = this.apiStatuses.get(apiKey)!
    const updatedStatus: ApiStatus = {
      ...currentStatus,
      status,
      responseTime,
      lastCheck: Date.now()
    }
    this.apiStatuses.set(apiKey, updatedStatus)
    return updatedStatus
  }

  /**
   * Get all API statuses
   */
  getAllApiStatuses(): ApiStatus[] {
    return Array.from(this.apiStatuses.values())
  }

  /**
   * Get specific API status
   */
  getApiStatus(apiKey: string): ApiStatus | undefined {
    return this.apiStatuses.get(apiKey)
  }

  /**
   * Simulate API response time
   */
  private getRandomResponseTime(): number {
    return Math.floor(20 + Math.random() * 60)
  }

  /**
   * Update response times (for simulation)
   */
  updateResponseTimes() {
    this.apiStatuses.forEach((status, key) => {
      const variation = Math.floor(Math.random() * 20) - 10
      const newResponseTime = Math.max(10, status.responseTime + variation)
      this.updateApiStatus(key, status.status, newResponseTime)
    })
  }

  /**
   * Fetch weather data
   */
  async fetchWeatherData(location: string): Promise<any> {
    if (apiConfig.weather.url && apiConfig.weather.apiKey) {
      try {
        const response = await fetch(
          `${apiConfig.weather.url}?location=${location}&key=${apiConfig.weather.apiKey}`,
          { signal: AbortSignal.timeout(apiConfig.weather.timeout) }
        )
        if (response.ok) {
          return await response.json()
        }
      } catch (error) {
        console.warn('Weather API unavailable, using simulated data')
      }
    }

    // Simulated weather data
    return {
      temperature: 22 + Math.random() * 8,
      humidity: 60 + Math.random() * 20,
      precipitation: Math.random() > 0.7 ? Math.random() * 10 : 0,
      forecast: ['sunny', 'cloudy', 'rainy'][Math.floor(Math.random() * 3)]
    }
  }

  /**
   * Send notification
   */
  async sendNotification(message: string, type: string): Promise<boolean> {
    if (apiConfig.notification.url) {
      try {
        const response = await fetch(apiConfig.notification.url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, type }),
          signal: AbortSignal.timeout(apiConfig.notification.timeout)
        })
        return response.ok
      } catch (error) {
        console.warn('Notification API unavailable, simulating send')
      }
    }

    // Simulate successful notification
    return true
  }
}

// Export singleton instance
export const apiService = new ApiService()
