export interface KPI {
  id: string;
  label: string;
  value: number;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'neutral';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'pending' | 'completed';
  progress: number;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectInput {
  title: string;
  description: string;
  status?: 'active' | 'pending' | 'completed';
  progress?: number;
  dueDate?: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  type: 'user_action' | 'system' | 'ai_generation' | 'error';
  message: string;
  metadata?: Record<string, unknown>;
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
  timestamp: string;
}

export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  pendingProjects: number;
  totalRevenue: number;
  totalUsers: number;
  kpis: KPI[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  details?: string;
  meta?: Record<string, unknown>;
}

export interface ProjectFilters {
  status?: 'active' | 'pending' | 'completed';
  search?: string;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export interface NotificationContextType {
  notificationsEnabled: boolean;
  toggleNotifications: () => void;
}
