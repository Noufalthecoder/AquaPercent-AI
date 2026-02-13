# AquaPercent AI - Setup Guide

## Quick Start

### 1. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env.local
```

### 2. Configure Your Environment

Edit `.env.local` with your actual API keys and endpoints:

```bash
# Example: Add your Weather API key
NEXT_PUBLIC_WEATHER_API_KEY=your_actual_api_key_here

# Example: Add your Map service key
NEXT_PUBLIC_MAP_SERVICE_KEY=your_actual_map_key_here
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Modes

### Development Mode (Simulated Data)

Leave endpoints empty in `.env.local`:

```bash
NEXT_PUBLIC_SENSOR_DATA_SOURCE_URL=
NEXT_PUBLIC_WEATHER_API_KEY=
```

**Result:** System automatically uses simulated data. Perfect for development and testing.

### Staging Mode (Test Endpoints)

Configure staging endpoints:

```bash
NEXT_PUBLIC_SENSOR_DATA_SOURCE_URL=https://staging-sensors.aquapercent.io
NEXT_PUBLIC_WEATHER_API_KEY=staging_key_12345
NEXT_PUBLIC_ENVIRONMENT=staging
```

**Result:** System connects to staging infrastructure with fallback to simulation if unavailable.

### Production Mode (Real Endpoints)

Configure production endpoints:

```bash
NEXT_PUBLIC_SENSOR_DATA_SOURCE_URL=https://sensors.aquapercent.io
NEXT_PUBLIC_WEATHER_API_KEY=prod_key_67890
NEXT_PUBLIC_PREDICTION_ENGINE_URL=https://ai.aquapercent.io
NEXT_PUBLIC_ENVIRONMENT=production
```

**Result:** System uses real production services with automatic fallback if services are down.

## API Key Setup

### Weather API

1. Sign up at [WeatherAPI.com](https://www.weatherapi.com/) or [OpenWeatherMap](https://openweathermap.org/)
2. Get your API key
3. Add to `.env.local`:
   ```bash
   NEXT_PUBLIC_WEATHER_API_KEY=your_key_here
   NEXT_PUBLIC_WEATHER_API_URL=https://api.weatherapi.com/v1
   ```

### Map Service

1. Sign up at [Mapbox](https://www.mapbox.com/) or [Google Maps Platform](https://cloud.google.com/maps-platform)
2. Get your API key/token
3. Add to `.env.local`:
   ```bash
   NEXT_PUBLIC_MAP_SERVICE_KEY=your_token_here
   NEXT_PUBLIC_MAP_SERVICE_URL=https://api.mapbox.com/v4
   ```

### Custom Sensor Endpoints

If you have real sensor infrastructure:

```bash
NEXT_PUBLIC_SENSOR_DATA_SOURCE_URL=https://your-sensor-api.com/v1/data
```

Expected response format:
```json
{
  "sensors": [
    {
      "id": "sensor_01",
      "name": "Pressure Sensor",
      "rate": "120 Hz",
      "value": 2.4,
      "lastUpdate": "0.2s ago"
    }
  ]
}
```

## Monitoring System Status

### Check Connection Status

1. Login to the application
2. Click "Monitor" button in the header
3. View System Connectivity Panel

**Status Indicators:**
- 🟢 **CONNECTED** - Using real external service
- 🟡 **SIMULATED** - Using fallback simulation

### System Logs

The monitoring panel shows real-time logs:
- Service connections
- Data synchronization
- Health checks
- System events

## Configuration Options

### Polling Intervals

Adjust how often data updates:

```bash
# Update sensor data every 2 seconds
NEXT_PUBLIC_SENSOR_POLLING_INTERVAL=2000

# System heartbeat every 3 seconds
NEXT_PUBLIC_SYSTEM_HEARTBEAT_INTERVAL=3000
```

### Retry Configuration

Configure automatic retry behavior:

```bash
# Maximum retry attempts before fallback
NEXT_PUBLIC_MAX_RETRY_ATTEMPTS=3

# API timeout in milliseconds
NEXT_PUBLIC_API_TIMEOUT=5000
```

### Feature Flags

Enable/disable features:

```bash
# Enable real-time data synchronization
NEXT_PUBLIC_ENABLE_REAL_TIME_SYNC=true

# Enable data caching
NEXT_PUBLIC_ENABLE_DATA_CACHING=true
```

## Troubleshooting

### Issue: All services show "SIMULATED"

**Cause:** No real endpoints configured or endpoints are unreachable.

**Solution:**
1. Check `.env.local` has valid URLs
2. Verify API keys are correct
3. Test endpoints are accessible
4. Check network connectivity

### Issue: High response times

**Cause:** Slow external services or network issues.

**Solution:**
1. Increase timeout: `NEXT_PUBLIC_API_TIMEOUT=10000`
2. Check service status
3. Consider using CDN or caching

### Issue: Environment variables not loading

**Cause:** File not named correctly or server not restarted.

**Solution:**
1. Ensure file is named `.env.local` (not `.env`)
2. Restart development server: `npm run dev`
3. Clear Next.js cache: `rm -rf .next`

## Production Deployment

### Vercel

1. Add environment variables in Vercel dashboard
2. Deploy: `vercel --prod`

### Docker

```dockerfile
# Copy environment file
COPY .env.local .env.local

# Build and run
docker build -t aquapercent-ai .
docker run -p 3000:3000 aquapercent-ai
```

### Environment Variables in CI/CD

Add to your CI/CD pipeline:

```yaml
env:
  NEXT_PUBLIC_SENSOR_DATA_SOURCE_URL: ${{ secrets.SENSOR_URL }}
  NEXT_PUBLIC_WEATHER_API_KEY: ${{ secrets.WEATHER_KEY }}
  NEXT_PUBLIC_ENVIRONMENT: production
```

## Security Best Practices

1. ✅ Never commit `.env.local` to version control
2. ✅ Use different keys for dev/staging/production
3. ✅ Rotate API keys regularly
4. ✅ Use environment-specific endpoints
5. ✅ Enable HTTPS for all external services
6. ✅ Monitor API usage and rate limits
7. ✅ Implement API key rotation strategy

## Support

For issues or questions:
- Check [BACKEND_ARCHITECTURE.md](./BACKEND_ARCHITECTURE.md) for technical details
- Review system logs in the monitoring panel
- Contact: support@aquapercent.io

## Next Steps

1. Configure your environment variables
2. Test with simulated data first
3. Integrate real services one at a time
4. Monitor system health in the connectivity panel
5. Deploy to staging for testing
6. Deploy to production

Happy monitoring! 💧
