import { config } from 'dotenv';
import path from 'path';

config({ path: path.resolve(process.cwd(), '.env') });

export const config = {
  port: process.env.PORT || 3001,
  apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3001',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  corsOrigins: process.env.CORS_ORIGINS?.split(',') || [process.env.FRONTEND_URL || 'http://localhost:5173'],
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'),
  rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
};

export default config;
