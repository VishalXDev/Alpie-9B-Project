import {
  DashboardStats,
  Project,
  CreateProjectInput,
  ActivityLog,
  RevenueDataPoint,
  UserAcquisitionDataPoint,
  ApiResponse,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Helper function to make API requests
async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

// Dashboard Stats
export async function getDashboardStats(): Promise<DashboardStats> {
  const response = await apiRequest<DashboardStats>('/dashboard/stats');
  if (!response.success) throw new Error(response.error || 'Failed to fetch dashboard stats');
  return response.data!;
}

// Revenue Analytics
export async function getRevenueData(): Promise<RevenueDataPoint[]> {
  const response = await apiRequest<RevenueDataPoint[]>('/analytics/revenue');
  if (!response.success) throw new Error(response.error || 'Failed to fetch revenue data');
  return response.data!;
}

// User Acquisition Analytics
export async function getUserAcquisitionData(): Promise<UserAcquisitionDataPoint[]> {
  const response = await apiRequest<UserAcquisitionDataPoint[]>('/analytics/users');
  if (!response.success) throw new Error(response.error || 'Failed to fetch user acquisition data');
  return response.data!;
}

// Projects: List
export async function getProjects(filters?: { status?: string; search?: string }): Promise<{
  data: Project[];
  meta: { total: number; filters: Record<string, unknown> };
}> {
  const params = new URLSearchParams();
  if (filters?.status) params.append('status', filters.status);
  if (filters?.search) params.append('search', filters.search);
  
  const endpoint = params.toString() ? `?${params.toString()}` : '';
  const response = await apiRequest<Project[]>(
    `/projects${endpoint}`
  );
  if (!response.success) throw new Error(response.error || 'Failed to fetch projects');
  return {
    data: response.data || [],
    meta: (response.meta as { total: number; filters: Record<string, unknown> }) || {
      total: response.data?.length || 0,
      filters: {},
    },
  };
}

// Projects: Create
export async function createProject(data: CreateProjectInput): Promise<Project> {
  const response = await apiRequest<Project>('/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (!response.success) throw new Error(response.error || 'Failed to create project');
  return response.data!;
}

// Projects: Update
export async function updateProject(id: string, updates: Partial<Project>): Promise<Project> {
  const response = await apiRequest<Project>(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
  if (!response.success) throw new Error(response.error || 'Failed to update project');
  return response.data!;
}

// Projects: Delete
export async function deleteProject(id: string): Promise<boolean> {
  const response = await apiRequest<{ message: string }>(`/projects/${id}`, {
    method: 'DELETE',
  });
  if (!response.success) throw new Error(response.error || 'Failed to delete project');
  return true;
}

// Activity Logs
export async function getActivityLogs(limit: number = 10): Promise<ActivityLog[]> {
  const response = await apiRequest<ActivityLog[]>(`/activity?limit=${limit}`);
  if (!response.success) throw new Error(response.error || 'Failed to fetch activity logs');
  return response.data!;
}

// AI Chat
export async function sendChatMessage(message: string): Promise<{ response: string }> {
  const response = await apiRequest<{ response: string }>('/assistant/chat', {
    method: 'POST',
    body: JSON.stringify({ message }),
  });
  if (!response.success) throw new Error(response.error || 'Failed to send message');
  return response.data!;
}

// Health Check
export async function checkHealth(): Promise<{ status: string; uptime: number }> {
  const response = await apiRequest<{ status: string; uptime: number }>('/health');
  if (!response.success) throw new Error(response.error || 'Failed to check health');
  return response.data!;
}

export default {
  getDashboardStats,
  getRevenueData,
  getUserAcquisitionData,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getActivityLogs,
  sendChatMessage,
  checkHealth,
};
