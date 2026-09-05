"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
(0, exports.config)({ path: path_1.default.resolve(process.cwd(), '.env') });
exports.config = {
    port: process.env.PORT || 3001,
    apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3001',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
    corsOrigins: process.env.CORS_ORIGINS?.split(',') || [process.env.FRONTEND_URL || 'http://localhost:5173'],
    rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'),
    rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
};
exports.default = exports.config;
//# sourceMappingURL=env.js.map