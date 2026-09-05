"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dataService_1 = require("../services/dataService");
const router = (0, express_1.Router)();
// Middleware to log requests
router.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});
// Dashboard Stats
router.get('/dashboard/stats', (req, res) => {
    try {
        const stats = (0, dataService_1.getDashboardStats)();
        const kpis = (0, dataService_1.getKPIS)();
        res.json({
            success: true,
            data: {
                ...stats,
                kpis,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch dashboard stats',
            details: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
// Revenue Analytics
router.get('/analytics/revenue', (req, res) => {
    try {
        const data = (0, dataService_1.getRevenueData)();
        res.json({
            success: true,
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch revenue data',
            details: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
// User Acquisition Analytics
router.get('/analytics/users', (req, res) => {
    try {
        const data = (0, dataService_1.getUserAcquisitionData)();
        res.json({
            success: true,
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch user acquisition data',
            details: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
// Projects with filtering
router.get('/projects', (req, res) => {
    try {
        const { status, search } = req.query;
        const projects = (0, dataService_1.getProjects)(status, search);
        res.json({
            success: true,
            data: projects,
            meta: {
                total: projects.length,
                filters: { status, search },
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch projects',
            details: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
// Activity Log
router.get('/activity', (req, res) => {
    try {
        const { limit } = req.query;
        const logs = (0, dataService_1.getActivityLogs)(limit ? parseInt(limit) : 10);
        res.json({
            success: true,
            data: logs,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch activity logs',
            details: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
// AI Chat
router.post('/assistant/chat', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message || typeof message !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'Invalid request',
                details: 'Message is required and must be a string',
            });
        }
        // Add user message to activity log
        (0, dataService_1.addActivityLog)({
            type: 'user_action',
            message: `User sent message: "${message.substring(0, 50)}..."`,
        });
        // Simulate AI response
        const aiResponse = await (0, dataService_1.simulateAIResponse)(message);
        // Add to chat history
        (0, dataService_1.addActivityLog)({
            type: 'ai_generation',
            message: 'AI generated response',
            metadata: { messageLength: message.length },
        });
        res.json({
            success: true,
            data: {
                response: aiResponse,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to process chat request',
            details: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
// Health check
router.get('/health', (req, res) => {
    res.json({
        success: true,
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});
// Reset data (for testing)
router.post('/admin/reset', (req, res) => {
    try {
        (0, dataService_1.resetData)();
        res.json({
            success: true,
            message: 'Data reset successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to reset data',
            details: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.default = router;
//# sourceMappingURL=api.js.map