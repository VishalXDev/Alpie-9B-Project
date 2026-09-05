import { KPICard } from '../components/dashboard/KPICard';
import { RevenueChart } from '../components/dashboard/RevenueChart';
import { UserAcquisitionChart } from '../components/dashboard/UserAcquisitionChart';
import { ActivityTable } from '../components/dashboard/ActivityTable';
import { useDashboardStats, useRevenueData, useUserAcquisitionData, useActivityLogs } from '../hooks/useData';
import { Card } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';
import { DashboardStats, KPI } from '../types';

interface DashboardViewProps {
  stats?: DashboardStats | null;
}

export function DashboardView({ stats }: DashboardViewProps) {
  const { data: kpiData, isLoading: loadingKPIs } = useDashboardStats();
  const { data: revenueData } = useRevenueData();
  const { data: userAcquisitionData } = useUserAcquisitionData();
  const { data: activityData } = useActivityLogs(5);

  const kpis: KPI[] = stats?.kpis || kpiData?.kpis || [];
  const revenue = revenueData || [];
  const users = userAcquisitionData || [];
  const activities = activityData || [];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loadingKPIs && !stats ? (
          Array(4).fill(0).map((_, i) => (
            <Card key={i}>
              <div className="space-y-3">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-10 w-2/3" />
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </Card>
          ))
        ) : (
          <>
            <KPICard
              label="Revenue"
              value={kpis.find((k: KPI) => k.id === 'revenue')?.value || 0}
              change={kpis.find((k: KPI) => k.id === 'revenue')?.change || 0}
              changePercent={kpis.find((k: KPI) => k.id === 'revenue')?.changePercent || 0}
              trend={kpis.find((k: KPI) => k.id === 'revenue')?.trend || 'up'}
              icon={
                <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            <KPICard
              label="Total Users"
              value={kpis.find((k: KPI) => k.id === 'users')?.value || 0}
              change={kpis.find((k: KPI) => k.id === 'users')?.change || 0}
              changePercent={kpis.find((k: KPI) => k.id === 'users')?.changePercent || 0}
              trend={kpis.find((k: KPI) => k.id === 'users')?.trend || 'up'}
              icon={
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
            />
            <KPICard
              label="Active Projects"
              value={kpis.find((k: KPI) => k.id === 'activeProjects')?.value || 0}
              change={kpis.find((k: KPI) => k.id === 'activeProjects')?.change || 0}
              changePercent={kpis.find((k: KPI) => k.id === 'activeProjects')?.changePercent || 0}
              trend={kpis.find((k: KPI) => k.id === 'activeProjects')?.trend || 'up'}
              icon={
                <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              }
            />
            <KPICard
              label="AI Generations"
              value={kpis.find((k: KPI) => k.id === 'aiGenerations')?.value || 0}
              change={kpis.find((k: KPI) => k.id === 'aiGenerations')?.change || 0}
              changePercent={kpis.find((k: KPI) => k.id === 'aiGenerations')?.changePercent || 0}
              trend={kpis.find((k: KPI) => k.id === 'aiGenerations')?.trend || 'up'}
              icon={
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              }
            />
          </>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={revenue} />
        <UserAcquisitionChart data={users} />
      </div>

      {/* Activity Feed */}
      <ActivityTable logs={activities} />
    </div>
  );
}
