import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Card } from '../ui/Card';
import { formatCurrency, formatDate } from '../../utils';

interface RevenueChartProps {
  data: Array<{ date: string; revenue: number; users: number }>;
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <Card title="Revenue Growth" subtitle="Last 30 days">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-dark-700" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => formatDate(value)}
              stroke="#6b7280"
              className="dark:stroke-dark-500"
            />
            <YAxis
              tickFormatter={(value) => formatCurrency(value)}
              stroke="#6b7280"
              className="dark:stroke-dark-500"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(17, 24, 39, 0.9)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
              }}
              formatter={(value: number) => [formatCurrency(value), 'Revenue']}
              labelFormatter={(label) => `Date: ${formatDate(label)}`}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#0ea5e9"
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
