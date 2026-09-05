import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/Card';
import { formatNumber } from '../../utils';

interface UserAcquisitionChartProps {
  data: Array<{ date: string; newUsers: number; activeUsers: number }>;
}

export function UserAcquisitionChart({ data }: UserAcquisitionChartProps) {
  return (
    <Card title="User Acquisition" subtitle="New vs Active Users">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-dark-700" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => formatDate(value)}
              stroke="#6b7280"
              className="dark:stroke-dark-500"
            />
            <YAxis stroke="#6b7280" className="dark:stroke-dark-500" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(17, 24, 39, 0.9)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
              }}
              formatter={(value: number, name: string) => [formatNumber(value), name]}
              labelFormatter={(label) => `Date: ${formatDate(label)}`}
            />
            <Bar dataKey="newUsers" fill="#10b981" name="New Users" radius={[4, 4, 0, 0]} />
            <Bar dataKey="activeUsers" fill="#3b82f6" name="Active Users" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
