import { config as dotenvConfig } from 'dotenv';
import path from 'path';

dotenvConfig({ path: path.resolve(process.cwd(), '.env') });

export interface AppConfig {
  port: number;
  apiBaseUrl: string;
  frontendUrl: string;
  corsOrigins: string[];
  rateLimitWindowMs: number;
  rateLimitMaxRequests: number;
}

export const config: AppConfig = {
  port: parseInt(process.env.PORT || '3001', 10),
  apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3001',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  corsOrigins: process.env.CORS_ORIGINS?.split(',') || [process.env.FRONTEND_URL || 'http://localhost:5173'],
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
  rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
};

export default config;
