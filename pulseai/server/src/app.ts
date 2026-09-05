import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import config from './config/env';
import apiRoutes from './routes/api';
import { errorHandler, notFound } from './middleware/errorHandler';

const app: Application = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", config.apiBaseUrl],
    },
  },
}));

// CORS configuration
app.use(cors({
  origin: config.corsOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Rate limiting (basic implementation)
const requestCount = new Map<string, number>();
app.use((req: Request, res: Response, next) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const count = requestCount.get(ip) || 0;
  
  if (count > config.rateLimitMaxRequests) {
    return res.status(429).json({
      success: false,
      error: 'Too many requests',
      details: 'Please try again later',
    });
  }
  
  requestCount.set(ip, count + 1);
  next();
});

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use((req: Request, res: Response, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.path} - ` +
      `${res.statusCode} - ${duration}ms`
    );
  });
  next();
});

// API routes
app.use('/api', apiRoutes);

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'PulseAI API Server',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      dashboard: '/api/dashboard/stats',
      analytics: '/api/analytics',
      projects: '/api/projects',
      assistant: '/api/assistant/chat',
      activity: '/api/activity',
    },
  });
});

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

// Start server
const server = app.listen(config.port, () => {
  console.log(`🚀 PulseAI Server running on port ${config.port}`);
  console.log(`📡 API available at http://localhost:${config.port}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export default app;
