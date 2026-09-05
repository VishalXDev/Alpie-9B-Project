import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getDashboardStats,
  getRevenueData,
  getUserAcquisitionData,
  getProjects,
  getActivityLogs,
  sendChatMessage,
  checkHealth,
} from '../services/api';

// Dashboard Stats Query
export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: getDashboardStats,
    staleTime: 30000,
    refetchInterval: 60000,
  });
}

// Revenue Data Query
export function useRevenueData() {
  return useQuery({
    queryKey: ['revenueData'],
    queryFn: getRevenueData,
    staleTime: 60000,
  });
}

// User Acquisition Data Query
export function useUserAcquisitionData() {
  return useQuery({
    queryKey: ['userAcquisitionData'],
    queryFn: getUserAcquisitionData,
    staleTime: 60000,
  });
}

// Projects Query
export function useProjects(filters?: { status?: string; search?: string }) {
  return useQuery({
    queryKey: ['projects', filters],
    queryFn: () => getProjects(filters),
    staleTime: 30000,
  });
}

// Activity Logs Query
export function useActivityLogs(limit: number = 10) {
  return useQuery({
    queryKey: ['activityLogs', limit],
    queryFn: () => getActivityLogs(limit),
    staleTime: 30000,
  });
}

// AI Chat Mutation
export function useChatMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendChatMessage,
    onSuccess: () => {
      // Refetch activity logs after sending a message
      queryClient.invalidateQueries({ queryKey: ['activityLogs'] });
    },
  });
}

// Health Check Query
export function useHealthCheck() {
  return useQuery({
    queryKey: ['health'],
    queryFn: checkHealth,
    staleTime: 10000,
  });
}
