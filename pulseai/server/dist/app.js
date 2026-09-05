"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const env_1 = __importDefault(require("./config/env"));
const api_1 = __importDefault(require("./routes/api"));
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
// Security middleware
app.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", 'data:', 'https:'],
            connectSrc: ["'self'", env_1.default.apiBaseUrl],
        },
    },
}));
// CORS configuration
app.use((0, cors_1.default)({
    origin: env_1.default.corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
// Rate limiting (basic implementation)
const requestCount = new Map();
app.use((req, res, next) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const count = requestCount.get(ip) || 0;
    if (count > env_1.default.rateLimitMaxRequests) {
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
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// Request logging
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - ` +
            `${res.statusCode} - ${duration}ms`);
    });
    next();
});
// API routes
app.use('/api', api_1.default);
// Root endpoint
app.get('/', (req, res) => {
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
app.use(errorHandler_1.notFound);
// Global error handler
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map