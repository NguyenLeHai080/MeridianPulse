/**
 * Global Environment Configuration - MeridianPulse Frontend
 */

export const ENV_CONFIG = {
  APP_NAME: 'MeridianPulse',
  APP_VERSION: '1.0.0',
  API_BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  WS_BASE_URL: import.meta.env.VITE_WS_URL || 'ws://localhost:8000/api/v1/telemetry/ws',
  STORAGE_PREFIX: 'meridian_pulse_',
  ENABLE_OFFLINE_MOCK: true, // Auto-fallback when backend is not running
  REFRESH_INTERVAL_MS: 1000,
} as const;
