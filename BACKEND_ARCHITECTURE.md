# AquaPercent AI - Backend Architecture

## Overview
Production-style backend configuration and service abstraction layer for AquaPercent AI water infrastructure monitoring system.

## Architecture Layers

### 1. Environment Configuration (`.env.local`)
Centralized environment variables for all external service endpoints and system configuration.

**Key Variables:**
- `NEXT_PUBLIC_SENSOR_DATA_SOURCE_URL` - Real-time sensor data endpoint
- `NEXT_PUBLIC_WEATHER_API_KEY` - Weather service API key
- `NEXT_PUBLIC_MAP_SERVICE_KEY` - Map service API key
- `NEXT_PUBLIC_PREDICTION_ENGINE_URL` - AI prediction engine endpoint
- `NEXT_PUBLIC_NOTIFICATION_SERVICE_URL` - Notification service endpoint
- `NEXT_PUBLIC_DATA_STREAM_INTERVAL` - Data polling interval (ms)
- `NEXT_PUBLIC_SYSTEM_HEARTBEAT_INTERVAL` - Health check interval (ms)

### 2. Configuration Layer (`config/systemConfig.ts`)
Structured configuration management that reads from environment variables.

**Exports:**
- `systemConfig` - Complete system configuration
- `sensorConfig` - Sensor-specific configuration
- `apiConfig` - External API configuration
- `aiEngineConfig` - AI/ML engine configuration
- `monitoringConfig` - System monitoring configuration

**Features:**
- Type-safe configuration interfaces
- Default fallback values
- Environment variable validation
- Centralized configuration access

### 3. Service Abstraction Layer

#### Sensor Service (`services/sensorService.ts`)
Manages sensor data retrieval with automatic fallback to simulation.

**Key Methods:**
- `fetchSensorData()` - Get current sensor readings
- `getConnectionStatus()` - Check if using real or simulated data
- `getCurrentReadings()` - Get latest sensor values
- `getPollingInterval()` - Get configured polling interval

**Behavior:**
- Attempts to connect to real sensor endpoint if configured
- Automatically falls back to simulated data if endpoint unavailable
- Generates realistic simulated sensor values with variations
- Frontend receives identical data structure regardless of source

#### API Service (`services/apiService.ts`)
Manages external API connections with health checks and retry logic.

**Key Methods:**
- `checkApiHealth(apiKey)` - Verify API connectivity
- `getAllApiStatuses()` - Get status of all APIs
- `fetchWeatherData(location)` - Get weather information
- `sendNotification(message, type)` - Send notifications
- `updateResponseTimes()` - Update simulated response times

**Features:**
- Automatic retry with configurable max attempts
- Response time tracking
- Connection status monitoring (connected/simulated)
- Graceful degradation to simulated data

#### AI Service (`services/aiService.ts`)
Manages AI/ML model interactions and predictions.

**Key Methods:**
- `runPrediction(inputData)` - Execute prediction
- `detectAnomalies(data)` - Detect anomalies in data
- `getModelStatus()` - Get AI model status
- `getPredictionConfidence()` - Get current confidence level
- `getAnomalyDetectionStatus()` - Get anomaly detection status

**Features:**
- Real-time prediction confidence tracking
- Anomaly detection with configurable thresholds
- Model version management
- Automatic fallback to simulated predictions

#### Monitoring Service (`services/monitoringService.ts`)
Centralized system monitoring and health checks.

**Key Methods:**
- `getSystemHealth()` - Overall system health status
- `getDataTransmission()` - Data transmission metrics
- `addLog(message, level)` - Add system log entry
- `getSystemLogs(limit)` - Retrieve recent logs
- `performHealthCheck()` - Check all service health
- `updateDataTransmission()` - Update transmission metrics

**Features:**
- Real-time system logging
- Log retention management
- Health score calculation
- Data transmission monitoring
- Uptime tracking

## Data Flow

```
Frontend Component
       ↓
Service Layer (sensorService, apiService, aiService)
       ↓
Configuration Layer (systemConfig)
       ↓
Environment Variables (.env.local)
       ↓
External Services OR Simulated Data
```

## Automatic Fallback Mechanism

Each service implements intelligent fallback:

1. **Check Configuration**: Read endpoint URL from config
2. **Attempt Connection**: Try to connect to real endpoint
3. **Handle Failure**: On timeout/error, log warning
4. **Fallback to Simulation**: Generate realistic simulated data
5. **Return Data**: Frontend receives data in identical format

**Status Indicators:**
- `connected` - Using real external service
- `simulated` - Using fallback simulation

## Frontend Integration

**No Frontend Changes Required:**
- Components continue to work exactly as before
- Data structure remains identical
- UI rendering logic unchanged
- Only data source changes internally

**Backend Status Visibility:**
- System Connectivity Panel shows connection status
- Logs indicate when fallback is used
- Health checks report service availability

## Deployment Configuration

### Development
```bash
# .env.local (empty endpoints = simulation mode)
NEXT_PUBLIC_SENSOR_DATA_SOURCE_URL=
NEXT_PUBLIC_WEATHER_API_KEY=
```

### Staging
```bash
# .env.local (staging endpoints)
NEXT_PUBLIC_SENSOR_DATA_SOURCE_URL=https://staging-sensors.aquapercent.ai
NEXT_PUBLIC_WEATHER_API_KEY=staging_key_12345
```

### Production
```bash
# .env.local (production endpoints)
NEXT_PUBLIC_SENSOR_DATA_SOURCE_URL=https://sensors.aquapercent.ai
NEXT_PUBLIC_WEATHER_API_KEY=prod_key_67890
NEXT_PUBLIC_PREDICTION_ENGINE_URL=https://ai.aquapercent.ai
```

## Benefits

1. **Environment-Driven**: Easy configuration per deployment
2. **Service-Oriented**: Clean separation of concerns
3. **Deployment-Scalable**: Ready for production infrastructure
4. **Graceful Degradation**: Works with or without real endpoints
5. **Type-Safe**: Full TypeScript support
6. **Maintainable**: Centralized configuration management
7. **Testable**: Easy to mock services for testing
8. **Production-Ready**: Follows enterprise architecture patterns

## Usage Example

```typescript
// In a component
import { sensorService } from '@/services/sensorService'

// Fetch sensor data (automatically uses real or simulated)
const sensorData = await sensorService.fetchSensorData()

// Check connection status
const status = sensorService.getConnectionStatus()
// Returns: 'connected' or 'simulated'
```

## Monitoring

The System Connectivity Panel displays:
- Real-time connection status for all services
- Response times and health metrics
- System logs showing service activity
- Automatic updates every 2-3 seconds

## Future Enhancements

- WebSocket support for real-time streaming
- Advanced caching strategies
- Circuit breaker pattern for failing services
- Metrics collection and analytics
- Service discovery and load balancing
- Authentication and authorization layer
