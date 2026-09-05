import { useRevenueData, useUserAcquisitionData } from '../hooks/useData';
import { RevenueChart } from '../components/dashboard/RevenueChart';
import { UserAcquisitionChart } from '../components/dashboard/UserAcquisitionChart';
import { Card } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';

export function AnalyticsView() {
  const { data: revenueData, isLoading: loadingRevenue } = useRevenueData();
  const { data: userAcquisitionData, isLoading: loadingUsers } = useUserAcquisitionData();

  const revenue = revenueData?.data || [];
  const users = userAcquisitionData?.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Analytics</h2>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                ${revenue.reduce((sum, d) => sum + d.revenue, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {revenue.reduce((sum, d) => sum + d.users, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                ${(revenue.length > 0 ? revenue.reduce((sum, d) => sum + d.revenue, 0) / revenue.length : 0).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loadingRevenue ? (
          <Card>
            <Skeleton className="h-80 w-full" />
          </Card>
        ) : (
          <RevenueChart data={revenue} />
        )}

        {loadingUsers ? (
          <Card>
            <Skeleton className="h-80 w-full" />
          </Card>
        ) : (
          <UserAcquisitionChart data={users} />
        )}
      </div>

      {/* Additional Insights */}
      <Card title="Key Insights" subtitle="AI-generated insights">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">Revenue Growth</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Revenue has shown consistent growth over the past 30 days, with an average increase of 15% week-over-week.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">User Engagement</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Active users have increased by 23% compared to last month, indicating strong user retention and engagement.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-purple-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">Peak Activity</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Highest user activity occurs between 2 PM and 4 PM, suggesting optimal times for feature releases.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
