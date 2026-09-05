export interface ActivityLog {
    id: string;
    timestamp: Date;
    type: 'user_action' | 'system' | 'ai_generation' | 'error';
    message: string;
    metadata?: Record<string, unknown>;
}
export interface Project {
    id: string;
    title: string;
    description: string;
    status: 'active' | 'pending' | 'completed';
    progress: number;
    dueDate: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface KPI {
    id: string;
    label: string;
    value: number;
    change: number;
    changePercent: number;
    trend: 'up' | 'down' | 'neutral';
}
export interface RevenueDataPoint {
    date: string;
    revenue: number;
    users: number;
}
export interface UserAcquisitionDataPoint {
    date: string;
    newUsers: number;
    activeUsers: number;
}
export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}
export declare function initializeData(): void;
export declare function getKPIS(): KPI[];
export declare function getRevenueData(): RevenueDataPoint[];
export declare function getUserAcquisitionData(): UserAcquisitionDataPoint[];
export declare function getProjects(status?: 'active' | 'pending' | 'completed', search?: string): Project[];
export declare function getActivityLogs(limit?: number): ActivityLog[];
export declare function addActivityLog(log: Omit<ActivityLog, 'id' | 'timestamp'>): ActivityLog;
export declare function getChatMessages(): ChatMessage[];
export declare function addChatMessage(message: Omit<ChatMessage, 'id' | 'timestamp'>): ChatMessage;
export declare function simulateAIResponse(userMessage: string): Promise<string>;
export declare function getDashboardStats(): {
    totalProjects: number;
    activeProjects: number;
    completedProjects: number;
    pendingProjects: number;
    totalRevenue: number;
    totalUsers: number;
};
export declare function resetData(): void;
//# sourceMappingURL=dataService.d.ts.map