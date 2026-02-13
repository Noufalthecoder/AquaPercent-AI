/**
 * AquaPercent AI - System Configuration
 * Centralized configuration management for production deployment
 * Reads from environment variables and provides structured config
 */

export interface SensorConfig {
  dataSourceUrl: string | null
  pollingInterval: number
  sensors: {
    pressure: { id: string; name: string; rate: string }
    flow: { id: string; name: string; rate: string }
    soilMoisture: { id: string; name: string; rate: string }
    leakDetection: { id: string; name: string; rate: string }
  }
}

export interface ApiConfig {
  weather: {
    url: string | null
    apiKey: string | null
    timeout: number
  }
  map: {
    url: string | null
    apiKey: string | null
    timeout: number
  }
  prediction: {
    url: string | null
    timeout: number
  }
  notification: {
    url: string | null
    timeout: number
  }
}

export interface AiEngineConfig {
  predictionEngineUrl: string | null
  modelVersion: string
  confidenceThreshold: number
  anomalyDetectionEnabled: boolean
}

export interface MonitoringConfig {
  dataStreamInterval: number
  systemHeartbeatInterval: number
  healthCheckInterval: number
  logRetentionHours: number
  enableRealTimeSync: boolean
  enableDataCaching: boolean
  maxRetryAttempts: number
}

export interface SystemConfig {
  environment: string
  apiTimeout: number
  sensor: SensorConfig
  api: ApiConfig
  aiEngine: AiEngineConfig
  monitoring: MonitoringConfig
}

// Helper to safely get environment variable
const getEnvVar = (key: string, defaultValue: string = ''): string => {
  if (typeof window !== 'undefined') {
    return (process.env[key] as string) || defaultValue
  }
  return defaultValue
}

const getEnvNumber = (key: string, defaultValue: number): number => {
  const value = getEnvVar(key)
  return value ? parseInt(value, 10) : defaultValue
}

const getEnvBoolean = (key: string, defaultValue: boolean): boolean => {
  const value = getEnvVar(key)
  return value ? value === 'true' : defaultValue
}

// Centralized System Configuration
const systemConfig: SystemConfig = {
  environment: getEnvVar('NEXT_PUBLIC_ENVIRONMENT', 'production'),
  apiTimeout: getEnvNumber('NEXT_PUBLIC_API_TIMEOUT', 5000),

  sensor: {
    dataSourceUrl: getEnvVar('NEXT_PUBLIC_SENSOR_DATA_SOURCE_URL') || null,
    pollingInterval: getEnvNumber('NEXT_PUBLIC_SENSOR_POLLING_INTERVAL', 2000),
    sensors: {
      pressure: { id: 'sensor_pressure_01', name: 'Pressure Sensor', rate: '120 Hz' },
      flow: { id: 'sensor_flow_01', name: 'Flow Sensor', rate: '60 Hz' },
      soilMoisture: { id: 'sensor_soil_01', name: 'Soil Moisture Sensor', rate: '30 Hz' },
      leakDetection: { id: 'sensor_leak_01', name: 'Leak Detection Module', rate: '240 Hz' }
    }
  },

  api: {
    weather: {
      url: getEnvVar('NEXT_PUBLIC_WEATHER_API_URL') || null,
      apiKey: getEnvVar('NEXT_PUBLIC_WEATHER_API_KEY') || null,
      timeout: getEnvNumber('NEXT_PUBLIC_API_TIMEOUT', 5000)
    },
    map: {
      url: getEnvVar('NEXT_PUBLIC_MAP_SERVICE_URL') || null,
      apiKey: getEnvVar('NEXT_PUBLIC_MAP_SERVICE_KEY') || null,
      timeout: getEnvNumber('NEXT_PUBLIC_API_TIMEOUT', 5000)
    },
    prediction: {
      url: getEnvVar('NEXT_PUBLIC_PREDICTION_ENGINE_URL') || null,
      timeout: getEnvNumber('NEXT_PUBLIC_API_TIMEOUT', 5000)
    },
    notification: {
      url: getEnvVar('NEXT_PUBLIC_NOTIFICATION_SERVICE_URL') || null,
      timeout: getEnvNumber('NEXT_PUBLIC_API_TIMEOUT', 5000)
    }
  },

  aiEngine: {
    predictionEngineUrl: getEnvVar('NEXT_PUBLIC_PREDICTION_ENGINE_URL') || null,
    modelVersion: getEnvVar('NEXT_PUBLIC_AI_MODEL_VERSION', 'v2.4.1'),
    confidenceThreshold: 0.85,
    anomalyDetectionEnabled: true
  },

  monitoring: {
    dataStreamInterval: getEnvNumber('NEXT_PUBLIC_DATA_STREAM_INTERVAL', 2000),
    systemHeartbeatInterval: getEnvNumber('NEXT_PUBLIC_SYSTEM_HEARTBEAT_INTERVAL', 3000),
    healthCheckInterval: getEnvNumber('NEXT_PUBLIC_HEALTH_CHECK_INTERVAL', 5000),
    logRetentionHours: getEnvNumber('NEXT_PUBLIC_LOG_RETENTION_HOURS', 24),
    enableRealTimeSync: getEnvBoolean('NEXT_PUBLIC_ENABLE_REAL_TIME_SYNC', true),
    enableDataCaching: getEnvBoolean('NEXT_PUBLIC_ENABLE_DATA_CACHING', true),
    maxRetryAttempts: getEnvNumber('NEXT_PUBLIC_MAX_RETRY_ATTEMPTS', 3)
  }
}

export default systemConfig

// Export individual configs for convenience
export const sensorConfig = systemConfig.sensor
export const apiConfig = systemConfig.api
export const aiEngineConfig = systemConfig.aiEngine
export const monitoringConfig = systemConfig.monitoring
