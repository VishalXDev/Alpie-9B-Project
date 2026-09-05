"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeData = initializeData;
exports.getKPIS = getKPIS;
exports.getRevenueData = getRevenueData;
exports.getUserAcquisitionData = getUserAcquisitionData;
exports.getProjects = getProjects;
exports.getActivityLogs = getActivityLogs;
exports.addActivityLog = addActivityLog;
exports.getChatMessages = getChatMessages;
exports.addChatMessage = addChatMessage;
exports.simulateAIResponse = simulateAIResponse;
exports.getDashboardStats = getDashboardStats;
exports.resetData = resetData;
const uuid_1 = require("uuid");
// In-memory stores
let activityLogs = [];
let projects = [];
let chatMessages = [];
// Initialize with sample data
function initializeData() {
    // Sample projects
    projects = [
        {
            id: (0, uuid_1.v4)(),
            title: 'Website Redesign',
            description: 'Complete overhaul of company website with new branding',
            status: 'active',
            progress: 65,
            dueDate: '2024-02-15',
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date(),
        },
        {
            id: (0, uuid_1.v4)(),
            title: 'Mobile App Development',
            description: 'iOS and Android app for customer engagement',
            status: 'pending',
            progress: 25,
            dueDate: '2024-03-01',
            createdAt: new Date('2024-01-10'),
            updatedAt: new Date(),
        },
        {
            id: (0, uuid_1.v4)(),
            title: 'Data Migration',
            description: 'Migrate legacy data to new cloud infrastructure',
            status: 'completed',
            progress: 100,
            dueDate: '2024-01-20',
            createdAt: new Date('2023-12-01'),
            updatedAt: new Date('2024-01-20'),
        },
        {
            id: (0, uuid_1.v4)(),
            title: 'API Integration',
            description: 'Integrate third-party payment gateway',
            status: 'active',
            progress: 45,
            dueDate: '2024-02-28',
            createdAt: new Date('2024-01-05'),
            updatedAt: new Date(),
        },
        {
            id: (0, uuid_1.v4)(),
            title: 'Security Audit',
            description: 'Comprehensive security assessment and remediation',
            status: 'pending',
            progress: 10,
            dueDate: '2024-03-15',
            createdAt: new Date('2024-01-15'),
            updatedAt: new Date(),
        },
    ];
    // Sample activity logs
    activityLogs = [
        {
            id: (0, uuid_1.v4)(),
            timestamp: new Date(),
            type: 'ai_generation',
            message: 'AI generated new dashboard component',
            metadata: { projectId: projects[0].id },
        },
        {
            id: (0, uuid_1.v4)(),
            timestamp: new Date(Date.now() - 3600000),
            type: 'user_action',
            message: 'User updated project status',
            metadata: { projectId: projects[1].id },
        },
        {
            id: (0, uuid_1.v4)(),
            timestamp: new Date(Date.now() - 7200000),
            type: 'system',
            message: 'System backup completed successfully',
        },
        {
            id: (0, uuid_1.v4)(),
            timestamp: new Date(Date.now() - 86400000),
            type: 'ai_generation',
            message: 'AI assistant responded to user query',
        },
        {
            id: (0, uuid_1.v4)(),
            timestamp: new Date(Date.now() - 172800000),
            type: 'error',
            message: 'Failed to connect to external API',
            metadata: { errorCode: 'ECONNREFUSED' },
        },
    ];
    // Sample chat messages
    chatMessages = [
        {
            id: (0, uuid_1.v4)(),
            role: 'assistant',
            content: 'Hello! I\'m PulseAI, your intelligent assistant. How can I help you today?',
            timestamp: new Date(Date.now() - 3600000),
        },
        {
            id: (0, uuid_1.v4)(),
            role: 'user',
            content: 'Show me the latest project updates',
            timestamp: new Date(Date.now() - 1800000),
        },
        {
            id: (0, uuid_1.v4)(),
            role: 'assistant',
            content: 'Here are your latest project updates:\n\n1. Website Redesign - 65% complete\n2. API Integration - 45% complete\n3. Security Audit - 10% complete\n\nWould you like more details on any of these?',
            timestamp: new Date(Date.now() - 1200000),
        },
    ];
}
// KPI Data
function getKPIS() {
    return [
        {
            id: 'revenue',
            label: 'Revenue',
            value: 125430,
            change: 12543,
            changePercent: 11.1,
            trend: 'up',
        },
        {
            id: 'users',
            label: 'Total Users',
            value: 8542,
            change: 342,
            changePercent: 4.2,
            trend: 'up',
        },
        {
            id: 'activeProjects',
            label: 'Active Projects',
            value: projects.filter(p => p.status === 'active').length,
            change: 2,
            changePercent: 28.6,
            trend: 'up',
        },
        {
            id: 'aiGenerations',
            label: 'AI Generations',
            value: 1247,
            change: 89,
            changePercent: 7.7,
            trend: 'up',
        },
    ];
}
// Revenue time-series data (last 30 days)
function getRevenueData() {
    const data = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const day = date.getDate();
        const revenue = 4500 + Math.random() * 3000 + (day * 150);
        const users = 280 + Math.floor(Math.random() * 50) + (day * 2);
        data.push({
            date: date.toISOString().split('T')[0],
            revenue: Math.round(revenue),
            users: users,
        });
    }
    return data;
}
// User acquisition data (last 30 days)
function getUserAcquisitionData() {
    const data = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const newUsers = 15 + Math.floor(Math.random() * 25);
        const activeUsers = 180 + Math.floor(Math.random() * 40);
        data.push({
            date: date.toISOString().split('T')[0],
            newUsers,
            activeUsers,
        });
    }
    return data;
}
// Get all projects with optional filtering
function getProjects(status, search) {
    let result = projects;
    if (status) {
        result = result.filter(p => p.status === status);
    }
    if (search) {
        const searchTerm = search.toLowerCase();
        result = result.filter(p => p.title.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm));
    }
    return result;
}
// Get recent activity logs
function getActivityLogs(limit = 10) {
    return activityLogs.slice(0, limit);
}
// Add activity log
function addActivityLog(log) {
    const newLog = {
        ...log,
        id: (0, uuid_1.v4)(),
        timestamp: new Date(),
    };
    activityLogs.unshift(newLog);
    return newLog;
}
// Get chat messages
function getChatMessages() {
    return chatMessages;
}
// Add chat message
function addChatMessage(message) {
    const newMessage = {
        ...message,
        id: (0, uuid_1.v4)(),
        timestamp: new Date(),
    };
    chatMessages.push(newMessage);
    return newMessage;
}
// Simulate AI response
async function simulateAIResponse(userMessage) {
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));
    const responses = [
        `I've analyzed your request: "${userMessage}". Based on our current data, I recommend focusing on the active projects first. The Website Redesign is at 65% completion and could benefit from additional resources.`,
        `Great question! Looking at the analytics, we've seen a ${Math.round(Math.random() * 20)}% increase in user engagement this week. The AI has generated ${Math.floor(Math.random() * 50)} new insights that might be relevant to your query.`,
        `Based on the project data, I can see you have ${projects.filter(p => p.status === 'active').length} active projects. The most critical one appears to be the API Integration, which is at 45% progress. Would you like me to generate a detailed timeline?`,
        `I've processed your request and found ${Math.floor(Math.random() * 10)} relevant insights. Our AI has identified potential opportunities for optimization in the revenue stream, showing a ${Math.round(Math.random() * 15)}% growth trend.`,
        `Here's what I found: The system shows ${projects.length} total projects with ${projects.filter(p => p.status === 'active').length} currently active. Revenue is up ${Math.round(Math.random() * 12)}% compared to last month. Would you like a detailed breakdown?`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}
// Get dashboard stats
function getDashboardStats() {
    return {
        totalProjects: projects.length,
        activeProjects: projects.filter(p => p.status === 'active').length,
        completedProjects: projects.filter(p => p.status === 'completed').length,
        pendingProjects: projects.filter(p => p.status === 'pending').length,
        totalRevenue: getKPIS().find(k => k.id === 'revenue')?.value || 0,
        totalUsers: getKPIS().find(k => k.id === 'users')?.value || 0,
    };
}
// Reset all data (for testing)
function resetData() {
    initializeData();
}
//# sourceMappingURL=dataService.js.map