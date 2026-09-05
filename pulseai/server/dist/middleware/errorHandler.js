"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
exports.notFound = notFound;
exports.validateRequest = validateRequest;
// Global error handling middleware
function errorHandler(err, req, res, next) {
    console.error(`[ERROR] ${req.method} ${req.path}:`, err);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    const errorResponse = {
        success: false,
        error: message,
        details: err.stack,
        statusCode,
        timestamp: new Date().toISOString(),
    };
    res.status(statusCode).json(errorResponse);
}
// Not found middleware
function notFound(req, res, next) {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
}
// Request validation middleware
function validateRequest(schema) {
    return (req, res, next) => {
        const { body } = req;
        if (!body) {
            return next(new Error('Request body is required'));
        }
        const validated = body;
        for (const [key, value] of Object.entries(schema)) {
            if (!(key in validated)) {
                return next(new Error(`Missing required field: ${key}`));
            }
            if (typeof value === 'function') {
                const result = value(validated[key]);
                if (result !== true) {
                    return next(new Error(`Invalid value for field: ${key}`));
                }
            }
        }
        next();
    };
}
//# sourceMappingURL=errorHandler.js.map